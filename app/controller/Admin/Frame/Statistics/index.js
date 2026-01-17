export default {
    // 获取首页统计数据
    GetIndexStatistics: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        // 基础统计 - 总量数据
        const totalUsers = await global.db.query('SELECT COUNT(*) as count FROM n_users');
        const totalThreads = await global.db.query('SELECT COUNT(*) as count FROM n_threads');
        const totalComments = await global.db.query('SELECT COUNT(*) as count FROM n_comment');

        // 今日数据
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toISOString().slice(0, 19).replace('T', ' ');

        const todayRegister = await global.db.query(
            'SELECT COUNT(*) as count FROM n_users WHERE n_registertime >= ?',
            [todayStr]
        );
        const todayThreads = await global.db.query(
            'SELECT COUNT(*) as count FROM n_threads WHERE n_time >= ?',
            [todayStr]
        );
        const todayComments = await global.db.query(
            'SELECT COUNT(*) as count FROM n_comment WHERE n_time >= ?',
            [todayStr]
        );

        // 昨日数据
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 19).replace('T', ' ');

        const yesterdayRegister = await global.db.query(
            'SELECT COUNT(*) as count FROM n_users WHERE n_registertime >= ? AND n_registertime < ?',
            [yesterdayStr, todayStr]
        );
        const yesterdayThreads = await global.db.query(
            'SELECT COUNT(*) as count FROM n_threads WHERE n_time >= ? AND n_time < ?',
            [yesterdayStr, todayStr]
        );
        const yesterdayComments = await global.db.query(
            'SELECT COUNT(*) as count FROM n_comment WHERE n_time >= ? AND n_time < ?',
            [yesterdayStr, todayStr]
        );

        // 今日流水 (只统计已支付的订单)
        const todayRevenue = await global.db.query(
            'SELECT COALESCE(SUM(CAST(n_amount AS DECIMAL(10,2))), 0) as amount FROM n_payorder WHERE n_paytime >= ? AND n_type = "2"',
            [todayStr]
        );
        const todayRevenueTotal = parseFloat(todayRevenue[0].amount) || 0;

        // 昨日流水
        const yesterdayRevenue = await global.db.query(
            'SELECT COALESCE(SUM(CAST(n_amount AS DECIMAL(10,2))), 0) as amount FROM n_payorder WHERE n_paytime >= ? AND n_paytime < ? AND n_type = "2"',
            [yesterdayStr, todayStr]
        );
        const yesterdayRevenueTotal = parseFloat(yesterdayRevenue[0].amount) || 0;

        // 今日和昨日流水明细
        const todayBillList = await global.db.query(
            'SELECT * FROM n_payorder WHERE n_paytime >= ? ORDER BY n_paytime DESC LIMIT 10',
            [todayStr]
        );
        const yesterdayBillList = await global.db.query(
            'SELECT * FROM n_payorder WHERE n_paytime >= ? AND n_paytime < ? ORDER BY n_paytime DESC LIMIT 10',
            [yesterdayStr, todayStr]
        );

        const result = {
            // 基础统计
            total: {
                users: totalUsers[0].count,
                threads: totalThreads[0].count,
                comments: totalComments[0].count
            },
            // 今日统计
            today: {
                register: todayRegister[0].count,
                threads: todayThreads[0].count,
                comments: todayComments[0].count,
                revenue: todayRevenueTotal
            },
            // 昨日统计
            yesterday: {
                register: yesterdayRegister[0].count,
                threads: yesterdayThreads[0].count,
                comments: yesterdayComments[0].count,
                revenue: yesterdayRevenueTotal
            },
            // 流水列表
            billList: {
                today: todayBillList,
                yesterday: yesterdayBillList
            }
        };

        global.sendMsg(reply, 200, '成功', result);
    }),



    // 获取综合趋势数据(指定天数)
    GetComprehensiveTrend: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const days = parseInt(pre.days) || 30; // 默认30天

        const result = [];
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStart = new Date(date);
            dateStart.setHours(0, 0, 0, 0);

            const dateStr = dateStart.toISOString().slice(0, 19).replace('T', ' ');
            const dateEnd = date.toISOString().slice(0, 19).replace('T', ' ');

            // 并行查询各项数据
            const [users, threads, comments, revenue] = await Promise.all([
                global.db.query('SELECT COUNT(*) as count FROM n_users WHERE n_registertime >= ? AND n_registertime <= ?', [dateStr, dateEnd]),
                global.db.query('SELECT COUNT(*) as count FROM n_threads WHERE n_time >= ? AND n_time <= ?', [dateStr, dateEnd]),
                global.db.query('SELECT COUNT(*) as count FROM n_comment WHERE n_time >= ? AND n_time <= ?', [dateStr, dateEnd]),
                global.db.query('SELECT COALESCE(SUM(CAST(n_amount AS DECIMAL(10,2))), 0) as amount FROM n_payorder WHERE n_paytime >= ? AND n_paytime <= ? AND n_type = "2"', [dateStr, dateEnd])
            ]);

            result.push({
                date: dateStart.toISOString().slice(0, 10),
                register: users[0].count,
                threads: threads[0].count,
                comments: comments[0].count,
                revenue: parseFloat(revenue[0].amount) || 0
            });
        }

        global.sendMsg(reply, 200, '成功', result);
    })
}