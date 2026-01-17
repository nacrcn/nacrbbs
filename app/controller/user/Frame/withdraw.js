import UserInfo from './info.js';
export default {

    /* 获取提现方式 n_withdraw_method */
    GetWithdrawMethod: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;
        const method = await global.db.query('SELECT * FROM n_withdraw_method where n_off = 1');
        global.sendMsg(reply, 200, '获取成功', method);
    }),

    /* 申请提现接口 */
    UpWithdraw: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;

        const users = await global.db.query('SELECT * FROM n_users where id = ?', [Ware.id]);
        if (users.length === 0) {
            global.sendMsg(reply, 201, '用户不存在');
            return;
        }
        let Vinfo = await UserInfo.getVipInfo(Ware.id)

        if (!pre.n_amount) {
            global.sendMsg(reply, 201, '请输入提现金额');
            return;
        }
        pre.n_amount = Number(pre.n_amount)
        if (pre.n_amount <= 0) {
            global.sendMsg(reply, 201, '提现金额必须大于0');
            return;
        }
        if (!pre.n_method) {
            global.sendMsg(reply, 201, '请选择提现方式');
            return;
        }
        if (pre.n_amount < Vinfo.n_withdrawal_min) {
            global.sendMsg(reply, 201, '提现金额低于最低提现额度');
            return;
        }
        if (pre.n_amount > Vinfo.n_withdrawal_max) {
            global.sendMsg(reply, 201, '提现金额高于最高提现额度');
            return;
        }

        if (users[0].n_balance < pre.n_amount) {
            global.sendMsg(reply, 201, '余额不足');
            return;
        }
        if (!pre.n_acc || pre.n_acc == '') {
            global.sendMsg(reply, 201, '请输入正确的提现账号');
            return;
        }

        /* 获取用户手续费 */
        const fee = Number(Vinfo.n_withdrawal_fee) / 100


        pre.n_handling_fee = pre.n_amount * fee
        pre.n_received = pre.n_amount - pre.n_handling_fee
        pre.n_time = new Date()
        pre.n_no = global.Tools.generateOrderCode('WIT')
        pre.n_type = 1
        pre.n_uid = Ware.id
        console.log(pre);

        await global.db.insert('n_withdrawlog', pre);

        /* 减去用户余额 */
        await global.db.query('UPDATE n_users SET n_balance = n_balance - ? WHERE id = ?', [pre.n_amount, Ware.id]);

        /* 写入用户账单 */
        await global.db.insert('n_user_bill', {
            n_name: '在线提现',
            n_amount: pre.n_amount,
            n_uid: Ware.id,
            n_time: new Date(),
            n_type: 2,
            n_status: 2
        })

        global.sendMsg(reply, 200, '申请成功');
    }),

    /* 获取提现列表 */
    GetWithdrawList: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;
        if (pre.id) {
            const res = await global.db.query('SELECT * FROM n_withdrawlog WHERE id = ?', [pre.id])
            global.sendMsg(reply, 200, '获取成功', res[0]);
            return
        }
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_no', pre.seach, 'like').add('n_uid', Ware.id).build();
        const res = await global.db.getPaginatedData('n_withdrawlog', sql.sql, sql.params, ['id', 'desc'], pre.page, pre.pagesize)
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),


}
