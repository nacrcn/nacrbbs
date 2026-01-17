import { calculatePrice, formatOrderGoods, getTransporter, upPayNotify, getOrderNo } from './logic.js'
class PayService {
    constructor() {
        this.transporters = new Map(); // 缓存多个transporter实例
    }


    /**
     * 创建订单
     * @param {Object} options 订单选项
     * @param {string} options.n_paymethod 支付方式,1:支付宝，2：微信，3：QQ，4:积分
     * @param {string} options.n_paydevice 支付设备（可选）
     * @param {number} options.n_uid 所属用户ID
     * @param {Object} options.n_from 支付详情（JSON格式，可选,[]数组模式）
     */
    async CreateOrder(options, reply) {
        try {
            /* 创建订单 */

            options.n_creatertime = new Date();
            options.n_type = 1;
            options.n_no = global.Tools.generateOrderCode('ORD');
            options.n_amount = await calculatePrice(options.n_from);

            delete options.n_paymethod;
            delete options.n_paydevice;
            console.log(options);
            
            const id = await global.db.insert('n_payorder', options)

            await formatOrderGoods(options.n_from, id)

            global.sendMsg(reply, 200, '成功', {
                order: options.n_no
            });

        } catch (error) {
            console.log(error);

            global.sendMsg(reply, 201, '❌ 订单创建失败  : ' + error.message);
        }
    }


    /**
     * 支付订单
     * @param {Object} options 支付选项
     * @param {string} options.n_paymethod 支付方式,1:支付宝，2：微信，3：QQ，4:积分
     * @param {string} options.n_paydevice 支付设备（可选）
     * @param {string} options.n_type 支付类型（可选, jsapi,h5等）
     * @param {string} options.n_no 订单号
     */
    async PayOrder(options, reply) {

        try {

            /* 查询订单 */
            const order = await global.db.query('SELECT * FROM n_payorder where n_no = ?', [options.n_no]);
            if (order.length === 0) {
                return global.sendMsg(reply, 201, '订单不存在');
            }

            /* 查询支付方式 */
            const paymethod = await global.db.query('SELECT * FROM n_paymethod where n_code = ?', [options.n_paymethod]);
            if (paymethod.length === 0) {
                return global.sendMsg(reply, 201, '支付方式不存在');
            }

            /* 判断是否 */

            /* 如果是余额支付 则调用余额支付逻辑分支 */
            if (paymethod[0].n_code === '4') {
                await this.BalancePay(order[0], reply)
                await global.db.update('n_payorder', { n_paycode: 'BalancePay' }, 'id = ?', [order[0].id])

                return false;
            }

            /* 如果是积分支付 则调用积分支付逻辑分支 */
            if (paymethod[0].n_code === '5' && order[0].n_balance === '3') {
                await this.PointsPay(order[0], reply)
                await global.db.update('n_payorder', { n_paycode: 'PointsPay' }, 'id = ?', [order[0].id])

                return false;
            }

            /* 获取支付方式对应的transporter */
            const transporter = await getTransporter(paymethod[0].n_code);
            if (!transporter) {
                return global.sendMsg(reply, 201, '支付方式不支持');
            }
            // console.log(transporter);

            let path = './' + transporter.n_code + '/index.js'
            console.log(path);
            
            // 动态导入模块
            const module = await import(path);
            const PayModuleClass = module.default;

            // 创建实例
            const payInstance = new PayModuleClass();
            options.n_amount = order[0].n_amount
            options.n_uid = order[0].n_uid
            options.n_path = order[0].n_path

            /* 写入订单 支付的插件 方便支付回调调用 */
            await global.db.update('n_payorder', { n_paycode: transporter.n_code }, 'id = ?', [order[0].id])


            await payInstance.CreatePay(options, reply)

        } catch (error) {
            console.log(error);
            global.sendMsg(reply, 201, '❌ 发起支付失败  : ' + error.message);
        }
    }

    /* 余额支付逻辑  */
    async BalancePay(options, reply) {
        try {

            /* 获取用户信息 */
            const user = await global.db.query('SELECT * FROM n_users where id = ?', [options.n_uid]);
            if (user.length === 0) {
                return global.sendMsg(reply, 201, '用户不存在');
            }
            options.n_amount = Number(options.n_amount)

            /* 检查用户余额是否足够 */
            if (user[0].n_balance < options.n_amount) {
                return global.sendMsg(reply, 201, '余额不足');
            }

            /* 扣除用户余额 */
            await global.db.update('n_users', { n_balance: user[0].n_balance - options.n_amount }, 'id = ?', [options.n_uid])

            await global.db.insert('n_user_bill', {
                n_name: '在线支付',
                n_amount: options.n_amount,
                n_uid: options.n_uid,
                n_time: new Date(),
                n_type: 2,
                n_status: 1
            })
            await global.db.update('n_payorder', { n_paytime: new Date(), n_type: 2 }, 'id = ?', [options.id])

            /* 调用回调 */
            await upPayNotify(options, reply)

        } catch (error) {
            console.log(error);
            global.sendMsg(reply, 201, '❌ 发起支付失败  : ' + error.message);
        }
    }

    /* 积分支付逻辑 PointsPay */
    async PointsPay(options, reply) {
        try {

            /* 获取用户信息 */
            const user = await global.db.query('SELECT * FROM n_users where id = ?', [options.n_uid]);
            if (user.length === 0) {
                return global.sendMsg(reply, 201, '用户不存在');
            }
            options.n_amount = Number(options.n_amount)

            /* 检查用户积分是否足够 */
            if (user[0].n_points < options.n_amount) {
                return global.sendMsg(reply, 201, '积分不足');
            }

            /* 扣除用户余额 */
            await global.db.update('n_users', { n_points: user[0].n_points - options.n_amount }, 'id = ?', [options.n_uid])

            await global.db.insert('n_user_bill', {
                n_name: '在线支付',
                n_amount: options.n_amount,
                n_uid: options.n_uid,
                n_time: new Date(),
                n_type: 2,
                n_status: 2
            })
            await global.db.update('n_payorder', { n_paytime: new Date(), n_type: 2 }, 'id = ?', [options.id])

            /* 调用回调 */
            await upPayNotify(options, reply)

        } catch (error) {
            console.log(error);
            global.sendMsg(reply, 201, '❌ 发起支付失败  : ' + error.message);
        }
    }


    /* 支付回调函数 */
    async PayNotify(options, reply, type = 1) {


        try {

            options.out_trade_no = await getOrderNo(options)
            /* 查询订单 */
            const order = await global.db.query('SELECT * FROM n_payorder where n_no = ?', [options.out_trade_no]);
            if (order.length === 0) {
                return global.sendMsg(reply, 201, '订单不存在');
            }
            if (order[0].n_paycode === '' || order[0].n_paycode === null) {
                return global.sendMsg(reply, 201, '支付插件错误');
            }
            if (order[0].n_type !== '1') {
                return global.sendMsg(reply, 201, '订单错误！');
            }


            let path = './' + order[0].n_paycode + '/index.js'
            let res = {
                code: 0,
                msg: 'success'
            }

            if (order[0].n_paycode !== 'BalancePay' && type !== 2) {
                // 动态导入模块
                const module = await import(path);
                const PayModuleClass = module.default;

                // 创建实例
                const payInstance = new PayModuleClass();
                res = await payInstance.verifyNotify(options)
            } else {
                res.code = 200
            }

            if (res.code === 200) {
                /* 修改订单状态 */
                await global.db.update('n_payorder', { n_paytime: new Date(), n_type: 2 }, 'id = ?', [order[0].id])
                /* 执行支付回调逻辑函数 */
                await upPayNotify(order[0])
                global.sendMsg(reply, 200);
            } else {
                global.sendMsg(reply, 201, '❌ 回调失败  : ' + res.msg);
            }


        } catch (error) {
            console.log(error);
            global.sendMsg(reply, 201, '❌ 回调失败  : ' + error.message);
        }
    }


}

export default PayService;