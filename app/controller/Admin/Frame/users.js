export default {
    /* 获取用户列表 */
    userlist: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_nickname', pre.seach, 'like').build();
        const res = await global.db.getPaginatedData('n_users', sql.sql, sql.params, ['id', 'desc'], pre.page, pre.pagesize, [
            'n_password'
        ])
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
    /* 编辑用户信息 */
    edituser: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        delete pre.n_password;

        await global.db.update('n_users', pre, 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '编辑成功');
    }),
    /* 删除用户 */
    deluser: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.delete('n_users', 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '删除成功');
    }),



    /* 获取用户组列表 n_usergroup */
    usergroup: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_name', pre.seach, 'like').build();
        const res = await global.db.getPaginatedData('n_usergroup', sql.sql, sql.params, ['n_sort', 'desc'], pre.page, pre.pagesize)
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
    /* 新增用户组 */
    addusergroup: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.insert('n_usergroup', pre)
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 编辑用户组 */
    editusergroup: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.update('n_usergroup', pre, 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 删除用户组 */
    delusergroup: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.delete('n_usergroup', 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '删除成功');
    }),
    /* 设置默认用户组 */
    deftusergroup: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.update('n_usergroup', {
            n_deft: 0
        }, 'n_deft = 1')
        await global.db.update('n_usergroup', {
            n_deft: 1
        }, 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '设置成功');
    }),


    /* 获取用户组价格列表 */
    usergroup_price: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_name', pre.seach, 'like').add('n_gid', pre.n_gid).build();
        const res = await global.db.getPaginatedData('n_usergroup_price', sql.sql, sql.params, ['n_sort', 'desc'], pre.page, pre.pagesize)
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
    /* 新增用户组价格 */
    addusergroup_price: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.insert('n_usergroup_price', pre)
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 编辑用户组价格 */
    editusergroup_price: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.update('n_usergroup_price', pre, 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 删除用户组价格 */
    delusergroup_price: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.delete('n_usergroup_price', 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '删除成功');
    }),
}

