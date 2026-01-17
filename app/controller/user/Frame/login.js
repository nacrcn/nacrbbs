/* 用户邀请逻辑 */
const InviteFun = async (uid, inv) => {
    const users = await global.db.query('SELECT * FROM n_users where n_encoding = ?', [inv]);
    if (users.length > 0) {
        await global.db.insert('n_activity_useracquisition_log', {
            n_uid: uid,
            n_time: new Date(),
            n_superior: users[0].n_uid
        })
    }
}

export default {
    /* 登录 */
    login: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        /* 验证字段 */
        if (global.Tools.VerifyField(reply, pre, [
            ['username', '用户名', 'required'],
            ['password', '密码', 'required']
        ])) return false;


        const users = await global.db.query('SELECT * FROM n_users where n_username = ?', [pre.username]);
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
        }, global.CONFIG.userToken.secretKey, global.CONFIG.userToken.expiresIn)

        global.sendMsg(reply, 200, '登录成功', Token);
    }),

    /* 注册 */
    register: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        /* 验证字段 */
        if (global.Tools.VerifyField(reply, pre, [
            ['username', '用户名', 'required'],
            ['password', '密码', 'required']
        ])) return false;


        const users = await global.db.query('SELECT * FROM n_users where n_username = ?', [pre.username]);

        if (users.length > 0) {
            global.sendMsg(reply, 201, '用户名已存在');
            return;
        }

        /* 验证码检验 */
        const verifyCode = await global.Tools.verifyCode(pre.code, pre.username);
        if (!verifyCode.status) {
            global.sendMsg(reply, 201, verifyCode.msg);
            return;
        }

        let From = {
            n_nickname: pre.nickname ?? '无名氏',
            n_avatar: '',
            n_username: pre.username,
            n_password: await global.Hash.bcryptStyle(pre.password),
            n_userback: '',
            n_registertime: new Date(),
            n_points: 0,
            n_signature: '这家伙很懒，什么都没留下',
            n_encoding: global.Tools.generateComplexCode(5),
            n_balance: 0,
            n_growth_value: 0

        }

        const res = await global.db.insert('n_users', From)

        /* 处理邀请码 */
        if (pre.inv) {
            await InviteFun(res.insertId, pre.inv)
        }

        global.sendMsg(reply, 200, '注册成功');
    }),


    /* 找回密码 */
    RetrievePassword: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        /* 验证字段 */
        if (global.Tools.VerifyField(reply, pre, [
            ['username', '用户名', 'required'],
            ['password', '密码', 'required']
        ])) return false;


        const users = await global.db.query('SELECT * FROM n_users where n_username = ?', [pre.username]);

        if (users.length == 0) {
            global.sendMsg(reply, 201, '用户名不存在');
            return;
        }

        /* 验证码检验 */
        const verifyCode = await global.Tools.verifyCode(pre.code, pre.username);
        if (!verifyCode.status) {
            global.sendMsg(reply, 201, verifyCode.msg);
            return;
        }
        let From = {
            n_password: await global.Hash.bcryptStyle(pre.password),
        }
        await global.db.update('n_users', From, 'id = ?', [users[0].id])
        global.sendMsg(reply, 200, '重置成功');
    }),


    /* 微信小程序登录 */
    WeChatMiniProgramLogin: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        /* 验证字段 */
        if (global.Tools.VerifyField(reply, pre, [
            ['code', 'code', 'required'],
        ])) return false;
        console.log(pre.code);
        /*  */
        /* 请求微信 */
        let res = await global.ThirdParty.WeChatMiniProgramLogin(pre.code)
        console.log(res);
        
        /* 获取是否有用户存在 */
        let users = await global.db.query('SELECT * FROM n_users where n_MiniProgramOpenid = ?', [res.openid]);
        if (users.length == 0) {
            /* 用户不存在 就创建新用户 */
            let From = {
                n_nickname: pre.nickname ?? '无名氏',
                n_avatar: '',
                n_userback: '',
                n_registertime: new Date(),
                n_points: 0,
                n_signature: '这家伙很懒，什么都没留下',
                n_encoding: global.Tools.generateComplexCode(5),
                n_balance: 0,
                n_growth_value: 0,
                n_MiniProgramOpenid: res.openid
            }

            const insertId = await global.db.insert('n_users', From)

            /* 处理邀请码 */
            if (pre.inv) {
                await InviteFun(insertId, pre.inv)
            }

            /* 更新users */
            users = await global.db.query('SELECT * FROM n_users where n_MiniProgramOpenid = ?', [res.openid]);
        }

        let Token = global.AuthGenerateToken({
            ...users[0], n_password: ''
        }, global.CONFIG.userToken.secretKey, global.CONFIG.userToken.expiresIn)

        global.sendMsg(reply, 200, '登录成功', Token);
    })


}

