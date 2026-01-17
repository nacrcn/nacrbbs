export default {
    /* 获取支付配置列表 */
    getPayconfig: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_name', pre.seach, 'like').build();
        const res = await global.db.getPaginatedData('n_payconfig', sql.sql, sql.params, ['id', 'desc'], pre.page, pre.pagesize)
        for(let a in res.data){
            try {
                res.data[a].n_config = JSON.parse(res.data[a].n_config)
            } catch (error) {
                console.log(error);
            }
        }
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
     /* 新增支付配置信息 n_notices */
    addPayconfig: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        if(!pre.n_time || pre.n_time == ''){
            pre.n_time = new Date();
        }
        await global.db.insert('n_payconfig', pre)
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 编辑支付配置信息 */
    editPayconfig: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.update('n_payconfig', pre, 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 删除支付配置信息 */
    delePayconfig: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.delete('n_payconfig', 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '删除成功');
    }),

}
