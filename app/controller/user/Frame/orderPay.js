import PayService from '../../../library/pay/index.js'
export default {
    /* 创建订单 */
    CreateOrder: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const Ware = request.Ware;

        const Pay = new PayService()

        await Pay.CreateOrder({
            n_paymethod: pre.paymethod,
            n_paydevice: pre.paydevice,
            n_uid: Ware.id,
            n_from: pre.from,
            n_path: pre.path ?? null
        }, reply)

    }),
    /* 获取订单详情 */
    GetOrder: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;


        try {
            const order = await global.db.query('SELECT * FROM n_payorder where n_no = ?', [pre.no]);
            if (order.length === 0) {
                return global.sendMsg(reply, 201, '订单不存在');
            }
            const orderItem = await global.db.query('SELECT * FROM n_payorder_item where n_oid = ?', [order[0].id]);
            order[0].n_item = orderItem;

            delete order[0].n_from;

            global.sendMsg(reply, 200, '成功', order[0]);

        } catch (error) {
            console.log(error);
            global.sendMsg(reply, 201, '❌ 订单详情获取失败  : ' + error.message);

        }
    }),
    /* 支付订单 */
    PayOrder: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const Pay = new PayService()

        await Pay.PayOrder({
            n_paymethod: pre.paymethod,
            n_paydevice: pre.paydevice,
            n_no: pre.no,
            n_type: pre.type
        }, reply)

    }),

    /* 获取支付方式列表 */
    GetPayMethod: (request, reply) => global.Fun(reply, async () => {
        try {
            const pre = request.body;
            const order = await global.db.query('SELECT * FROM n_payorder where n_no = ?', [pre.no]);
            if(order.length === 0) {
                return global.sendMsg(reply, 201, '订单不存在');
            }
            let sql = 'SELECT * FROM n_paymethod where n_code != 5 order by n_index desc'
            if (order[0].n_balance === '2') {
                sql = 'SELECT * FROM n_paymethod where n_code != 4 and n_code != 5 order by n_index desc'
            }
             if (order[0].n_balance === '3') {
                sql = 'SELECT * FROM n_paymethod where n_code = 5 order by n_index desc'
            }
            const paymethod = await global.db.query(sql);
            global.sendMsg(reply, 200, '成功', paymethod);
        } catch (error) {
            console.log(error);
            global.sendMsg(reply, 201, '❌ 支付方式获取失败  : ' + error.message);

        }
    }),

    /* 支付回调 */
    PayNotify: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body || request.query;
        const Pay = new PayService()
        await Pay.PayNotify(pre, reply)
    })


}

