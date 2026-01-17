import PayService from '../../../../library/pay/index.js'
export default {
    /* 获取支付配置列表 */
    getPayOrder: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;


        /* 如果有ID */
        if (pre.id) {
            let order = await global.db.query('select * from n_payorder where id = ?', [pre.id])
            const orderItem = await global.db.query('SELECT * FROM n_payorder_item where n_oid = ?', [order[0].id]);
            order[0].n_item = orderItem;

            /* 获取用户信息 */
            const user = await global.db.query('select * from n_users where id = ?', [order[0].n_uid])
            order[0].n_user_nickname = user[0].n_nickname
            order[0].n_user_username = user[0].n_username
            global.sendMsg(reply, 200, '获取成功', order[0]);
            return;
        }

        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder
            .add('n_no', pre.seach, 'like')
            .add('n_creatertime', [pre.starttime, pre.endtime], 'between')
            .build();

        const res = await global.db.getPaginatedData('n_payorder', sql.sql, sql.params, ['id', 'desc'], pre.page, pre.pagesize)
        const map = new Map();

        /* 获取用户信息 */
        const user = await global.db.query('select * from n_users')
        user.forEach(item => {
            map.set(item.id, item)
        })

        /* 匹配用户信息 */
        res.data.forEach(item => {
            let list = map.get(item.n_uid)
            item.n_user_nickname = list.n_nickname
            item.n_user_username = list.n_username
        })
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
    /* 删除订单 */
    delePayOrder: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        await global.db.delete('n_payorder', 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '删除成功');

    }),
    /* 支付回调 */
    upPayNotify: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const Pay = new PayService()
        await Pay.PayNotify(pre, reply, 2)
    }),
}
