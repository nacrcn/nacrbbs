/* 微信jsapi逻辑 */
import axios from "axios"
import crypto from "crypto"

/* 私钥格式处理函数 */
const formatPrivateKey = (privateKey) => {
    if (!privateKey) {
        throw new Error('私钥为空');
    }

    // 移除多余的空白字符
    privateKey = privateKey.trim();

    // 如果没有PEM头尾，添加它们
    if (!privateKey.includes('-----BEGIN')) {
        // 假设是base64编码的私钥
        try {
            // 如果是base64格式，先解码
            const decoded = Buffer.from(privateKey, 'base64').toString();
            if (decoded.includes('-----BEGIN')) {
                privateKey = decoded;
            } else {
                // 如果解码后还是没有PEM格式，强制添加
                privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
            }
        } catch (e) {
            // 如果base64解码失败，强制添加PEM格式
            privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
        }
    }

    // 确保有正确的换行符
    if (!privateKey.includes('\n')) {
        // 在64个字符后插入换行符（PEM标准格式）
        const pemContent = privateKey.replace(/-----[^-]+-----/g, '').trim();
        const formattedContent = pemContent.replace(/(.{64})/g, '$1\n');

        const matches = privateKey.match(/-----[^-]+-----/g);
        if (matches && matches.length >= 2) {
            privateKey = `${matches[0]}\n${formattedContent}\n${matches[1]}`;
        }
    }

    return privateKey;
};

/* 微信支付V3签名计算函数 */
const signV3 = (method, url, timestamp, nonceStr, body, privateKey) => {
    try {
        // 构造签名串
        const signatureStr = [
            method,
            url,
            timestamp.toString(),
            nonceStr,
            body,
            ''
        ].join('\n');


        // 使用商户API私钥对签名串进行SHA256 with RSA签名
        const sign = crypto
            .createSign('RSA-SHA256')
            .update(signatureStr)
            .sign(privateKey, 'base64');

        return sign;
    } catch (error) {

        // 尝试不同的私钥格式
        try {
            const sign = crypto
                .createSign('RSA-SHA256')
                .update(signatureStr)
                .sign({
                    key: privateKey,
                    passphrase: undefined, // 如果私钥有密码，在这里设置
                    padding: crypto.constants.RSA_PKCS1_PSS_PADDING
                }, 'base64');
            return sign;
        } catch (error2) {
            console.error('备用签名方法也失败:', error2.message);
            throw new Error('私钥格式错误或签名算法失败: ' + error.message);
        }
    }
}

/* 微信小程序支付签名计算函数 */
const signWxpay = (prepay_id, appid, privateKey, nonce_str) => {
    try {
        // 生成时间戳
        const timestamp = Math.floor(Date.now() / 1000);
        
        // 如果没有传入随机串，生成一个
        if (!nonce_str) {
            nonce_str = Math.random().toString(36).substr(2, 15);
        }
        
        // 构造签名串（4行格式）
        const signatureStr = [
            appid,
            timestamp.toString(),
            nonce_str,
            `prepay_id=${prepay_id}`,
            ''
        ].join('\n');
        
        
        // 格式化私钥
        privateKey = formatPrivateKey(privateKey);
        
        
        // 使用商户API私钥对签名串进行SHA256 with RSA签名
        const sign = crypto
            .createSign('RSA-SHA256')
            .update(signatureStr)
            .sign(privateKey, 'base64');
        
        return {
            appId: appid,
            timeStamp: timestamp.toString(),
            nonceStr: nonce_str,
            package: `prepay_id=${prepay_id}`,
            signType: 'RSA',
            paySign: sign
        };
        
    } catch (error) {
        console.error('小程序支付签名计算错误:', error.message);
        throw new Error('小程序支付签名计算失败: ' + error.message);
    }
};

/* 获取prepay_id */
const GetPrepayId = async (order, user) => {

    try {
        // 获取微信支付配置
        const payconfig = await global.db.query('SELECT * FROM n_payconfig where n_code = "WeChatPay"');
        if (payconfig.length === 0) {
            throw new Error('微信支付配置不存在');
        }
        const config = JSON.parse(payconfig[0].n_config);

        // 将配置数组转换为对象格式
        const configObj = {};
        config.forEach(item => {
            configObj[item.key] = item.value;
        });

        // https://api.mch.weixin.qq.com
        // 将金额从元转换为分（微信支付要求以分为单位）
        const totalInCents = Math.round(parseFloat(order.n_amount) * 100);

        let from = {
            appid: configObj.appid,
            mchid: configObj.mchid,
            description: '订单' + order.n_no,
            out_trade_no: order.n_no,
            amount: {
                total: totalInCents,
                currency: 'CNY'
            },
            payer: {
                openid: user.n_MiniProgramOpenid
            },
            notify_url: configObj.notify_url
        }

        // 生成随机串和时间戳
        const nonce_str = Math.random().toString(36).substr(2, 15);
        const timestamp = Math.floor(Date.now() / 1000);

        // 构造请求URL（去除域名部分）
        const requestUrl = '/v3/pay/transactions/jsapi';

        // 请求报文主体
        const requestBody = JSON.stringify(from);

        // 使用V3签名算法计算签名
        // 注意：请确认配置中的私钥字段名，通常是privateKey或api_client_key
        let privateKey = configObj.privateKey || configObj.api_client_key;
        if (!privateKey) {
            throw new Error('微信支付私钥配置缺失，请检查配置中的privateKey字段');
        }

        // 格式化私钥
        privateKey = formatPrivateKey(privateKey);

        const signature = signV3('POST', requestUrl, timestamp, nonce_str, requestBody, privateKey);

        // 构造Authorization头
        const Authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${configObj.mchid}",nonce_str="${nonce_str}",timestamp="${timestamp}",serial_no="${configObj.serial_no}",signature="${signature}"`

        const res = await axios.post('https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi', requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': Authorization
            }
        })

        // console.log('微信支付响应:', res.data);

        // 如果请求成功，返回响应数据
        if (res.data && res.data.prepay_id) {


            /* 计算微信小程序支付签名 */
            const wxpaySignData = signWxpay(res.data.prepay_id, configObj.appid, configObj.privateKey, nonce_str);

            return {
                prepay_id: res.data.prepay_id,
                wxpaySignData:wxpaySignData
            };

        } else {
            return {
                error: res.data
            };
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export {
    GetPrepayId
}