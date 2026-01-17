
export default {
    /* 获取轮播图 */
    class: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        if (pre.id) {
            const res = await global.db.query('SELECT * FROM n_class WHERE id = ?', [pre.id])
            /* 获取分类下帖子数量 */
            const count = await global.db.query(`SELECT COUNT(*) FROM n_threads WHERE id IN (SELECT n_tid FROM n_tclist WHERE n_cid = ${pre.id})`);
            res[0].n_threads = count[0]['COUNT(*)'];
            global.sendMsg(reply, 200, '获取成功', res[0]);
            return
        }
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_name', pre.seach, 'like').add('n_type', pre.type ?? 1).build();
        const res = await global.db.getPaginatedData('n_class', sql.sql, sql.params, ['n_sort', 'desc'], pre.page, pre.pagesize)
        /* 获取分类下帖子数量 */
        for(let a in res.data){
            const count = await global.db.query(`SELECT COUNT(*) FROM n_threads WHERE id IN (SELECT n_tid FROM n_tclist WHERE n_cid = ${res.data[a].id})`);
            res.data[a].n_threads = count[0]['COUNT(*)'];
        }

        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    })

}