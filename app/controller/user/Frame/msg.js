/* n_msg */
export default {
    /* 获取消息列表 */
    GetMsgs: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;
        if (pre.id) {
            const res = await global.db.query('SELECT * FROM n_msg WHERE id = ?', [pre.id])
            global.sendMsg(reply, 200, '获取成功', res[0]);
            return
        }
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_name', pre.seach, 'like').add('n_uid', Ware.id).build();
        const res = await global.db.getPaginatedData('n_msg', sql.sql, sql.params, ['id', 'desc'], pre.page, pre.pagesize)
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
    /* 获取消息人员列表 */
    


}
