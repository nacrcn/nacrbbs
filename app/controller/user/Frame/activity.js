export default {
    /* 获取活动列表 */
    getActivity: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_name', pre.seach, 'like').build();
        const res = await global.db.getPaginatedData('n_activity', sql.sql, sql.params, ['n_index', 'asc'], pre.page, pre.pagesize)
         for(let a in res.data){
           delete res.data[a].n_reward_config
        }
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),


}