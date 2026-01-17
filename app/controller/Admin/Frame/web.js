export default {
    /* 编辑站点信息 */
    editweb: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.update('n_configuration', pre)
        global.sendMsg(reply, 200, '编辑成功');
    }),

    /* 重置后台密码 */
    changeadminpass: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.update('n_admins', {
            n_password: await global.Hash.bcryptStyle(pre.password),
            n_username: pre.username
        })
        global.sendMsg(reply, 200, '编辑成功');
    }),
    /* 获取站点信息 */
    getweb: (request, reply) => global.Fun(reply, async () => {
        const info = await global.db.query('SELECT * FROM n_configuration');
        global.sendMsg(reply, 200, '成功', info[0]);
    })


}

