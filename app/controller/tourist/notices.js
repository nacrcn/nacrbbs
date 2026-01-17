export default {
    /* 获取公告 */
    notices: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        if (pre.id) {
            const res = await global.db.query('SELECT * FROM n_notices WHERE id = ?', [pre.id])
            global.sendMsg(reply, 200, '获取成功', res[0]);
            return
        }
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_name', pre.seach, 'like').build();
        const res = await global.db.getPaginatedData('n_notices', sql.sql, sql.params, ['id', 'desc'], pre.page, pre.pagesize)
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    })

}