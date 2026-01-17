
export default {
    /* 获取分类 */
    getCategory: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_name', pre.seach, 'like').add('n_type', pre.type ?? 1).build();
        const res = await global.db.getPaginatedData('n_class', sql.sql, sql.params, ['n_sort', 'desc'], pre.page, pre.pagesize)
        /* 获取分类下帖子数量 */
        for(let a in res.data){
            const count = await global.db.query(`SELECT COUNT(*) FROM n_threads WHERE id IN (SELECT n_tid FROM n_tclist WHERE n_cid = ${res.data[a].id})`);
            res.data[a].n_threads = count[0]['COUNT(*)'];
        }
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
    /* 编辑分类信息 */
    editCategory: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        delete pre.n_threads
        const res = await global.db.update('n_class', pre, 'id = ?',[pre.id])
        global.sendMsg(reply, 200, '编辑成功');
    }),
    /* 删除分类信息 */
    delCategory: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        await global.db.delete('n_tclist', 'n_cid = ?', [pre.id])
        const res = await global.db.delete('n_class', 'id = ?',[pre.id])
        global.sendMsg(reply, 200, '删除成功');
    }),
    /* 新增分类信息 */
    addCategory: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        delete pre.n_threads
        const res = await global.db.insert('n_class', pre)
        global.sendMsg(reply, 200, '新增成功');
    })
}