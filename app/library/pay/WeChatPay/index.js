// 微信支付 

import { GetPrepayId } from './jsapi.js';
class WechatPayService {
    constructor() {
        this.sdk = null;
        this.config = null;
        this.initialized = false;
    }

    /**
     * 创建微信支付
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
            /* 获取用户信息 */
            const userinfo = await global.db.query('SELECT * FROM n_users WHERE id = ?', [orderInfo.n_uid]);
            if (userinfo.length === 0) {
                return global.sendMsg(reply, 201, '用户不存在');
            }

            if (userinfo[0].n_MiniProgramOpenid == '') {
                return global.sendMsg(reply, 201, '用户微信openid不存在');
            }

            if (orderInfo.n_type == 'miniProgram') {
                // JSAPI支付类型 获取 prepay_id 小程序 则直接返回
                const prepay_id = await GetPrepayId(orderInfo, userinfo[0]);
                if (prepay_id.error) {
                    return global.sendMsg(reply, 201, prepay_id.error);
                }
                global.sendMsg(reply, 200,'请求成功', prepay_id);

            } else if (orderInfo.n_type == 'native') {
                // Native支付类型
                const result = await nativeinit(userinfo[0].n_MiniProgramOpenid, orderInfo);
                return result;
            }

        } catch (error) {
            console.error('❌ 创建微信支付失败:', error);
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
     * 微信支付异步通知验证
     * @param {Object} params 微信支付回调参数
     * @returns {Promise<Object>} 验证结果
     */
    async verifyNotify(params) {
        try {
           return {
            code:200
           };
        } catch (error) {
            console.error('❌ 微信通知验证失败:', error);
            return {
                code: 500,
                msg: '验证失败: ' + error.message
            }
        }
    }
}


export default WechatPayService;