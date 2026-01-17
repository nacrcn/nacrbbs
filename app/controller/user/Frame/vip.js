export default {
 
    /* 获取用户组列表 n_usergroup */
    usergroup: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const res = await global.db.query('SELECT * FROM n_usergroup where n_deft is null or n_deft != 1')
        global.sendMsg(reply, 200, '获取成功', res);
    }),
    /* 获取用户组价格列表 */
    usergroup_price: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_name', pre.seach, 'like').add('n_gid', pre.n_gid).build();
        const res = await global.db.getPaginatedData('n_usergroup_price', sql.sql, sql.params, ['n_sort', 'desc'], pre.page, pre.pagesize)
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
    
}

