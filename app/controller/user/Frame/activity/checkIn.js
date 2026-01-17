/* 生成当前年月日 */
const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}
/* 获取连续签到天数 */
const getContinuousDays = async (userId) => {
    // 获取近60天的签到记录，按时间倒序
    const records = await global.db.query(
        'SELECT DATE(n_time) as check_date FROM n_activity_checkin_log WHERE n_uid = ? AND n_time >= DATE_SUB(CURDATE(), INTERVAL 60 DAY) ORDER BY n_time DESC',
        [userId]
    );

    if (records.length === 0) {
        return 0;
    }

    let continuousDays = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let expectedDate = new Date(today);

    for (let record of records) {
        const recordDate = new Date(record.check_date);
        recordDate.setHours(0, 0, 0, 0);

        // 检查记录日期是否是期望的日期
        if (recordDate.getTime() === expectedDate.getTime()) {
            continuousDays++;
            // 期望日期减1天
            expectedDate.setDate(expectedDate.getDate() - 1);
        } else {
            // 如果日期不匹配，说明连续签到中断了
            break;
        }
    }

    return continuousDays;
}
/* 获取奖励 */
const getReward = async (userId) => {
    const Config = await global.db.query('SELECT * FROM n_activity where n_code = "checkIn"');
    if (Config.length == 0) {
        global.sendMsg(reply, 201, '签到活动未开启');
        return;
    }
    let Info = Config[0];

    const config = JSON.parse(Config[0].n_reward_config);

    // 获取当前连续签到天数
    let continuousDays = await getContinuousDays(userId);
    if (continuousDays == 0 || !continuousDays) {
        continuousDays = 1
    }
    /* 获取今日和明日的签到奖励 */
    let Today = 0
    let Tomorrow = 0

    for (let a in config) {
        if (Number(config[a].min) <= continuousDays && Number(config[a].max) >= continuousDays) {
            Today = config[a].price;
        }
        if (Number(config[a].min) <= (continuousDays + 1) && Number(config[a].max) >= (continuousDays + 1)) {
            Tomorrow = config[a].price;
        }
    }

    return { Today, Tomorrow, Info };
}
export default {

    /* 获取签到信息 */
    checkIn: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;

        // 使用更严格的日期比较逻辑，确保只比较日期部分
        const users = await global.db.query('SELECT * FROM n_activity_checkin_log where n_uid = ? and DATE(n_time) = CURDATE()', [Ware.id]);

        if (users.length > 0) {
            global.sendMsg(reply, 201, '今天已经签到');
            return;
        }
        let reward = await getReward(Ware.id);
        console.log(reward);
        
        await global.db.insert('n_activity_checkin_log', {
            n_uid: Ware.id,
            n_time: getCurrentDate(),
            n_reward_number: reward.Today,
            n_reward_type: reward.Info.n_reward_type,
        })

        /* 获取用户信息 */
        const user = await global.db.query('SELECT * FROM n_users WHERE id = ?', [Ware.id]);
        /* 写入用户奖励 */
        if (reward.Info.n_reward_type == '2') {
            await global.db.update('n_users', { n_money: user[0].n_money + Number(reward.Today) }, 'id = ?', [Ware.id]);
        } else {
            await global.db.update('n_users', { n_points: Number(user[0].n_points) + Number(reward.Today) }, 'id = ?', [Ware.id]);
        }

        await global.db.insert('n_user_bill', {
            n_name: '签到奖励',
            n_amount: reward.Today,
            n_uid: Ware.id,
            n_time: new Date(),
            n_type: 1,
            n_status: reward.Info.n_reward_type
        })

        global.sendMsg(reply, 200, '签到成功');
    }),

    /* 获取签到信息 */
    checkInList: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const users = await global.db.query('SELECT * FROM n_activity_checkin_log where n_uid = ? and n_time >= DATE_SUB(CURDATE(), INTERVAL 40 DAY) ORDER BY n_time DESC', [Ware.id]);

        global.sendMsg(reply, 200, '获取成功', users);
    }),



    /* 获取签到奖励 */
    getCheckInReward: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const Config = await global.db.query('SELECT * FROM n_activity where n_code = "checkIn"');
        let Info = Config[0];
        if (Config.length == 0) {
            global.sendMsg(reply, 201, '签到活动未开启');
            return;
        }

        const config = JSON.parse(Config[0].n_reward_config);

        // 获取当前连续签到天数
        let continuousDays = await getContinuousDays(Ware.id);
        if (continuousDays == 0 || !continuousDays) {
            continuousDays = 1
        }
        /* 获取今日和明日的签到奖励 */
        let Today = 0
        let Tomorrow = 0

        for (let a in config) {
            if (Number(config[a].min) <= continuousDays && Number(config[a].max) >= continuousDays) {
                Today = config[a].price;
            }
            if (Number(config[a].min) <= (continuousDays + 1) && Number(config[a].max) >= (continuousDays + 1)) {
                Tomorrow = config[a].price;
            }
        }


        global.sendMsg(reply, 200, '获取成功', {
            continuousDays: continuousDays,
            Today: Today,
            Tomorrow: Tomorrow,
            Config: { ...Info, n_reward_config: '' }
        });
    })
}

