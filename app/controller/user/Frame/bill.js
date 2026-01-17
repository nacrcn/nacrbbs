export default {
    /* 获取账单列表 */
    getuserbill: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const Ware = request.Ware;
        if (pre.id) {
            const res = await global.db.query('SELECT * FROM n_user_bill WHERE id = ? and n_uid = ?', [pre.id,Ware.id])
            global.sendMsg(reply, 200, '获取成功', res[0]);
            return
        }
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_no', pre.seach, 'like').add('n_uid', Ware.id).add('n_status',pre.status).build();
        const res = await global.db.getPaginatedData('n_user_bill', sql.sql, sql.params, ['id', 'desc'], pre.page, pre.pagesize)
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    })

}