
export default {
    /* 获取勋章 */
    getMedal: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_name', pre.seach, 'like').add('n_type', pre.type ?? 1).build();
        const res = await global.db.getPaginatedData('n_medal', sql.sql, sql.params, ['n_sort', 'desc'], pre.page, pre.pagesize)
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
    /* 编辑勋章信息 */
    editMedal: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        delete pre.n_threads
        const res = await global.db.update('n_medal', pre, 'id = ?',[pre.id])
        global.sendMsg(reply, 200, '编辑成功');
    }),
    /* 删除勋章信息 */
    delMedal: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        await global.db.delete('n_tclist', 'n_cid = ?', [pre.id])
        const res = await global.db.delete('n_medal', 'id = ?',[pre.id])
        global.sendMsg(reply, 200, '删除成功');
    }),
    /* 新增勋章信息 */
    addMedal: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        delete pre.n_threads
        const res = await global.db.insert('n_medal', pre)
        global.sendMsg(reply, 200, '新增成功');
    })
}