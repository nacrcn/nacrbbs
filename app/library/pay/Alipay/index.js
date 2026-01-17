import { AlipaySdk } from 'alipay-sdk';

class AlipayService {
    constructor() {
        this.sdk = null;
        this.config = null;
        this.initialized = false;
    }

    /**
     * 初始化支付宝SDK
     * @private
     */
    async initSDK() {
        if (this.initialized) return;

        try {
            // 获取支付宝支付配置
            const payconfig = await global.db.query('SELECT * FROM n_payconfig where n_code = "Alipay"');
            if (payconfig.length === 0) {
                throw new Error('支付宝支付配置不存在');
            }

            const config = JSON.parse(payconfig[0].n_config);

            // 将配置数组转换为对象格式
            const configObj = {};
            config.forEach(item => {
                configObj[item.key] = item.value;
            });


            // 检查必要配置
            if (!configObj.appId || !configObj.privateKey || !configObj.alipayPublicKey) {
                throw new Error('支付宝配置缺少必要参数');
            }

            this.config = configObj;

            // 实例化支付宝SDK
            this.sdk = new AlipaySdk({
                appId: configObj.appId,
                privateKey: configObj.privateKey,
                alipayPublicKey: configObj.alipayPublicKey,
                keyType: 'RSA2',
                endpoint: 'https://openapi.alipay.com',
            });


            this.initialized = true;
        } catch (error) {
            console.error('❌ 支付宝SDK初始化失败:', error);
            throw error;
        }
    }

    /**
     * 创建支付宝支付
     * @param {Object} orderInfo 订单信息
     * @param {string} orderInfo.n_no 订单号
     * @param {string} orderInfo.n_amount 订单金额
     * @param {string} orderInfo.n_subject 订单主题
     * @param {string} orderInfo.n_body 订单描述
     * @param {string} orderInfo.n_return_url 同步回调地址
     * @param {string} orderInfo.n_notify_url 异步回调地址
     * @param {Object} reply Fastify回复对象
     * @returns {Promise<Object>} 支付结果
     */
    async CreatePay(orderInfo, reply) {
        try {
            // 初始化SDK
            await this.initSDK();

            // 检查必要参数
            if (!orderInfo.n_notify_url || !orderInfo.n_return_url) {
                throw new Error('回调地址不能为空');
            }

            // 创建支付订单参数
            const payParams = {
                notify_url: config.notify_url,
                return_url: orderInfo.n_path ?? config.return_url,
                biz_content: {
                    out_trade_no: orderInfo.n_no,
                    product_code: 'FAST_INSTANT_TRADE_PAY',
                    total_amount: orderInfo.n_amount,
                    subject: orderInfo.n_subject || '商品订单',
                    body: orderInfo.n_body || '订单支付'
                }
            };

            let key = 'alipay.trade.wap.pay'
            if (orderInfo.n_paydevice === '1') {
                key = 'alipay.trade.page.pay'
            }

            const payResult = await this.sdk.pageExec(key, payParams);

            const result = {
                code: 200,
                msg: '支付订单创建成功',
                data: {
                    payUrl: payResult, // 支付链接
                    orderNo: orderInfo.n_no
                }
            };

            // 如果提供了reply对象，直接返回结果
            if (reply) {
                reply.send(payResult)
            }

            return result;

        } catch (error) {
            console.error('❌ 创建支付宝支付失败:', error);

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
     * 支付宝异步通知验证
     * @param {Object} params 支付宝回调参数
     * @returns {Promise<Object>} 验证结果
     */
    async verifyNotify(params) {
        try {
            await this.initSDK();

            // 验证签名
            const isValid = this.sdk.checkNotifySign(params);

            if (isValid) {
                return {
                    code: 200,
                    msg: '验证成功',
                    data: params
                };
            } else {
                return {
                    code: 400,
                    msg: '签名验证失败'
                };
            }
        } catch (error) {
            console.error('❌ 支付宝通知验证失败:', error);
            return {
                code: 500,
                msg: '验证失败: ' + error.message
            }
        }
    }

    /**
     * 查询支付宝订单状态
     * @param {string} orderNo 订单号
     * @returns {Promise<Object>} 查询结果
     */
    async queryOrder(orderNo) {
        try {
            await this.initSDK();

            const result = await this.sdk.exec('alipay.trade.query', {
                biz_content: {
                    out_trade_no: orderNo
                }
            });

            return {
                code: 200,
                msg: '查询成功',
                data: result
            };
        } catch (error) {
            console.error('❌ 查询支付宝订单失败:', error);
            return {
                code: 500,
                msg: '查询失败: ' + error.message
            }
        }
    }
}


export default AlipayService;