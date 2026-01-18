/* 对内 获取用户会员信息函数 */
const getVipInfo = async (id) => {
    let groupInfo = {};
    const users = await global.db.query('SELECT * FROM n_users where id = ?', [id]);

    if (users.length === 0) {
        const info = await global.db.query('SELECT * FROM n_usergroup where n_deft = 1');
        if (info.length === 0) {
            groupInfo = info[0];
        }
    } else {
        if (users[0].n_group_id && users[0].n_group_id > 0) {
            const info = await global.db.query('SELECT * FROM n_usergroup where id = ?', [users[0].n_group_id]);
            if (info.length > 0) {
                groupInfo = info[0];
            } else {
                const info = await global.db.query('SELECT * FROM n_usergroup where n_deft = 1');
                if (info.length > 0) {
                    groupInfo = info[0];
                }
            }
        } else {
            const info = await global.db.query('SELECT * FROM n_usergroup where n_deft = 1');
            if (info.length > 0) {
                groupInfo = info[0];
            }
        }
    }

    return groupInfo;
}

export default {
    getVipInfo,
    /* 获取我的信息 */
    info: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;

        const users = await global.db.query('SELECT * FROM n_users where id = ?', [Ware.id]);

        if (users.length === 0) {
            global.sendMsg(reply, 201, '用户不存在');
            return;
        }
        delete users[0].n_password;
        const VipInfo = await getVipInfo(Ware.id);
        global.sendMsg(reply, 200, '获取成功', {
            ...users[0],
            VipInfo: VipInfo,
        });
    }),

    /* 修改我的信息 */
    editinfo: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;

        const users = await global.db.query('SELECT * FROM n_users where id = ?', [Ware.id]);

        if (users.length === 0) {
            global.sendMsg(reply, 201, '用户不存在');
            return;
        }

        delete pre.n_points;
        delete pre.n_password;
        delete pre.n_registertime;
        delete pre.n_username;
        delete pre.n_captcha
        delete pre.n_group_id
        delete pre.n_group_time
        delete pre.n_administrator
        delete pre.n_encoding
        delete pre.n_balance

        await global.db.update('n_users', pre, 'id = ?', [Ware.id])

        global.sendMsg(reply, 200, '修改成功');
    }),
    /* 积分转余额 */
    pointsToBalance: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;

        const users = await global.db.query('SELECT * FROM n_users where id = ?', [Ware.id]);
        if (users.length === 0) {
            global.sendMsg(reply, 201, '用户不存在');
            return;
        }

        const VipInfo = await getVipInfo(Ware.id);

        /* 积分转余额 */
        if(users[0].n_points < pre.points) {
            global.sendMsg(reply, 201, '积分不足');
            return;
        }


        /* 计算可以换多少余额 */
        const balance = pre.points / VipInfo.n_pointsRatio;
        users[0].n_points -= pre.points;
        users[0].n_balance += balance;
        await global.db.update('n_users', users[0], 'id = ?', [Ware.id])

        /* 写入账单 */
        await global.db.insert('n_user_bill', {
            n_name: '积分转余额',
            n_amount: balance,
            n_uid: Ware.id,
            n_time: new Date(),
            n_type: 1,
            n_status: 2
        })
        await global.db.insert('n_user_bill', {
            n_name: '积分转余额',
            n_amount: pre.points,
            n_uid: Ware.id,
            n_time: new Date(),
            n_type: 2,
            n_status: 1
        })
        global.sendMsg(reply, 200, '操作成功');

    }),
      /* 关注用户 */
    LikeUser: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;
        /* 获取帖子信息 */
        const Threads = await global.db.query('SELECT * FROM n_users WHERE id = ?', [pre.id]);
        if (!Threads || Threads.length === 0) {
            return global.sendMsg(reply, 404, '用户不存在');
        }

        /* 检查是否点赞过 */
        const Like = await global.db.query('SELECT * FROM n_user_like WHERE n_tid = ? AND n_uid = ?', [pre.id, Ware.id]);
        
        if (Like && Like.length > 0) {
            /* 删除点赞 */
            await global.db.delete('n_user_like', 'n_tid = ? AND n_uid = ?', [pre.id, Ware.id]);
            return global.sendMsg(reply, 200, '取消关注成功');
        }
        await global.db.insert('n_user_like', {
            n_tid: pre.id,
            n_uid: Ware.id,
        });

        global.sendMsg(reply, 200, '关注成功');
    }),
}
