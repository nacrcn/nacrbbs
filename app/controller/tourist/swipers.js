export default {
    /* 获取轮播图 */
    swipers: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        if(pre.id){
            const res = await global.db.query('SELECT * FROM n_swipers WHERE id = ?', [pre.id])
            global.sendMsg(reply, 200, '获取成功', res[0]);
            return
        }
       const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_name', pre.seach, 'like').add('n_pos', pre.pos).build();
        const res = await global.db.getPaginatedData('n_swipers', sql.sql, sql.params, ['n_sort', 'desc'], pre.page, pre.pagesize)
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    })

}