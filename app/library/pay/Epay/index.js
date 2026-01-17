import axios from "axios";
import Hash from "../../../imp/Hash.js";

/* 易支付逻辑 */
class EpayService {
    constructor() {
        this.config = null;
        this.initialized = false;
    }

    /**
     * 初始化易支付配置
     * @private
     */
    async initConfig() {
        if (this.initialized) return;

        try {
            const payconfig = await global.db.query('SELECT * FROM n_payconfig where n_code = "Epay"');
            if (payconfig.length === 0) {
                throw new Error('易支付配置不存在');
            }

            const config = JSON.parse(payconfig[0].n_config);

            const configObj = {};
            config.forEach(item => {
                configObj[item.key] = item.value;
            });

            if (!configObj.pid || !configObj.key || !configObj.apiUrl) {
                throw new Error('易支付配置缺少必要参数');
            }

            this.config = configObj;
            this.initialized = true;
        } catch (error) {
            console.error('❌ 易支付配置初始化失败:', error);
            throw error;
        }
    }

    /**
     * 将对象转换为表单格式字符串
     * @param {Object} params - 参数对象
     * @returns {string} 表单字符串
     */
    toFormData(params) {
        return Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
    }

    /**
     * 生成MD5签名
     * @param {Object} params - 待签名参数对象
     * @returns {string} 签名字符串
     */
    generateSign(params) {
        const { key } = this.config;

        // 过滤并排序参数,不进行URL编码
        const filteredParams = Object.keys(params)
            .filter(key => params[key] !== '' && params[key] !== null && key !== 'sign' && key !== 'sign_type')
            .sort()
            .map(key => `${key}=${params[key]}`)
            .join('&');

        const signString = filteredParams + key;
        const sign = Hash.md5(signString);
        console.log('签名原始字符串:', signString);
        console.log('生成签名:', sign);
        return sign;
    }

    /**
     * 验证回调签名
     * @param {Object} params - 回调参数
     * @returns {boolean} 验证结果
     */
    verifySign(params) {
        const { key } = this.config;
        const receivedSign = params.sign;

        // 过滤并排序参数
        const filteredParams = Object.keys(params)
            .filter(key => params[key] !== '' && params[key] !== null && key !== 'sign' && key !== 'sign_type')
            .sort()
            .map(key => `${key}=${params[key]}`)
            .join('&');

        const signString = filteredParams + key;
        const calculatedSign = Hash.md5(signString);

        return receivedSign === calculatedSign;
    }

    /**
    * 创建易支付发起逻辑
    * @param {Object} orderInfo 订单信息
    * @param {string} orderInfo.n_no 订单号
    * @param {string} orderInfo.n_amount 订单金额
    * @param {string} orderInfo.n_subject 订单主题
    * @param {string} orderInfo.n_body 订单描述
    * @param {string} orderInfo.n_return_url 同步回调地址
    * @param {string} orderInfo.n_notify_url 异步回调地址
    * @param {string} orderInfo.n_type 支付方式(alipay|wxpay|qqpay)
    * @param {string} orderInfo.n_path 支付成功后跳转地址
    * @param {Object} reply Fastify回复对象
    * @returns {Promise<Object>} 支付结果
    */
    async CreatePay(orderInfo, reply) {
        try {

            await this.initConfig();

            const { pid, key, apiUrl, notify_url } = this.config;

            let paytype = ''

            if (orderInfo.n_paymethod == '1') {
                paytype = 'alipay'
            }
            if (orderInfo.n_paymethod == '2') {
                paytype = 'wxpay'
            }
            // 构建请求参数
            const params = {
                pid: pid,
                type: paytype || 'alipay',
                out_trade_no: orderInfo.n_no,
                notify_url: orderInfo.n_notify_url ?? notify_url,
                return_url: orderInfo.n_path ?? this.config.return_url,
                name: orderInfo.n_subject || '商品订单',
                money: orderInfo.n_amount,
                sign_type: 'MD5'
            };

            // 生成签名(不进行URL编码)
            const sign = this.generateSign(params);
            params.sign = sign;


            // 转换为表单格式(此时进行URL编码)
            const formData = this.toFormData(params);

            // 发送POST请求到 submit.php (页面跳转)
            const response = await axios.post(apiUrl + 'submit.php', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });


            if (response.status === 200) {
                const result = {
                    code: 200,
                    msg: '支付订单创建成功',
                    data: {
                        payUrl: apiUrl + 'submit.php', // 支付网关URL
                        orderNo: orderInfo.n_no,
                        formData: params // 表单数据
                    }
                };

                if (reply) {
                    reply.send(`
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <title>正在跳转支付...</title>
                        </head>
                        <body>
                            <form id="payForm" action="${apiUrl}submit.php" method="POST">
                                ${Object.keys(params).map(key =>
                        `<input type="hidden" name="${key}" value="${params[key]}">`
                    ).join('')}
                            </form>
                            <script>document.getElementById('payForm').submit();</script>
                            <p>正在跳转到支付页面...</p>
                        </body>
                        </html>
                    `);
                }

                return result;
            } else {
                throw new Error(`支付请求失败,状态码: ${response.status}`);
            }

        } catch (error) {
            console.error('❌ 创建易支付订单失败:', error);

            const errorResult = {
                code: 500,
                msg: '创建支付订单失败: ' + error.message
            };

            if (reply) {
                global.sendMsg(reply, 201, '❌ 创建支付订单失败: ' + error.message);
            }

            throw errorResult;
        }
    }

    /**
     * 支付异步通知验证
     * @param {Object} params 易支付回调参数
     * @returns {Promise<Object>} 验证结果
     */
    async verifyNotify(params) {
        try {
            await this.initConfig();

            // 验证签名
            const isValid = this.verifySign(params);

            if (isValid) {
                // 检查交易状态
                if (params.trade_status === 'TRADE_SUCCESS' || params.trade_status === 'TRADE_FINISHED') {
                    return {
                        code: 200,
                        msg: '验证成功',
                        data: {
                            out_trade_no: params.out_trade_no, // 商户订单号
                            trade_no: params.trade_no, // 平台交易号
                            total_fee: params.money, // 交易金额
                            trade_status: params.trade_status, // 交易状态
                            type: params.type, // 支付方式
                            name: params.name // 商品名称
                        }
                    };
                } else {
                    return {
                        code: 400,
                        msg: '交易未成功',
                        data: params
                    };
                }
            } else {
                console.error('❌ 易支付签名验证失败');
                return {
                    code: 400,
                    msg: '签名验证失败'
                };
            }
        } catch (error) {
            console.error('❌ 易支付通知验证失败:', error);
            return {
                code: 500,
                msg: '验证失败: ' + error.message
            };
        }
    }

    /**
     * 查询易支付订单状态
     * @param {string} orderNo 订单号
     * @returns {Promise<Object>} 查询结果
     */
    async queryOrder(orderNo) {
        try {
            await this.initConfig();

            const { pid, key, apiUrl } = this.config;

            // 构建查询参数
            const params = {
                pid: pid,
                out_trade_no: orderNo,
                act: 'query',
                sign_type: 'MD5'
            };

            const sign = this.generateSign(params);
            params.sign = sign;

            const formData = this.toFormData(params);

            const response = await axios.post(apiUrl + '/mapi.php', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            console.log('易支付API响应:', response.data);

            if (response.data.code === 1) {
                return {
                    code: 200,
                    msg: '查询成功',
                    data: response.data.data
                };
            } else {
                return {
                    code: 400,
                    msg: response.data.msg || '查询失败'
                };
            }
        } catch (error) {
            console.error('❌ 查询易支付订单失败:', error);
            return {
                code: 500,
                msg: '查询失败: ' + error.message
            };
        }
    }
}

export default EpayService;
