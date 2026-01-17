export default {
    /* 获取活动列表 */
    getActivity: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_name', pre.seach, 'like').build();
        const res = await global.db.getPaginatedData('n_activity', sql.sql, sql.params, ['n_index', 'asc'], pre.page, pre.pagesize)
         for(let a in res.data){
            try {
                res.data[a].n_reward_config = JSON.parse(res.data[a].n_reward_config)
            } catch (error) {
                console.log(error);
                
                res.data[a].n_reward_config = []
            }
        }
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
     /* 新增活动信息 */
    addActivity: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.insert('n_activity', pre)
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 编辑活动信息 */
    editActivity: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.update('n_activity', pre, 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 删除活动信息 */
    deleActivity: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.delete('n_activity', 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '删除成功');
    }),

}