export default {
    /* 登录 */
    login: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        /* 验证字段 */
        if (global.Tools.VerifyField(reply,pre, [
            ['username', '用户名', 'required'],
            ['password', '密码', 'required']
        ])) return false;


        const users = await global.db.query('SELECT * FROM n_admins where n_username = ?', [pre.username]);

        if (users.length === 0) {
            global.sendMsg(reply, 201, '用户名不存在');
            return;
        }

        if (!(await global.Hash.verifyBcryptStyle(pre.password, users[0].n_password))) {
            global.sendMsg(reply, 201, '密码错误');
            return;
        }

        let Token = global.AuthGenerateToken({
            ...users[0], n_password: ''
        }, global.CONFIG.adminToken.secretKey, global.CONFIG.adminToken.expiresIn)

        global.sendMsg(reply, 200, '登录成功', Token);
    }),
}

