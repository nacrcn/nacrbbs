/* n_medal_log */
export default {
    /* 分配勋章 */
    AssignMedal: async (id) => {
        /* 使用单次查询获取用户统计数据 */
        const userStats = await global.db.query(`
            SELECT
                (SELECT COUNT(*) FROM n_threads WHERE n_uid = ?) AS n_posts,
                (SELECT COUNT(*) FROM n_user_like WHERE n_tid = ?) AS n_followers,
                (SELECT COUNT(*) FROM n_user_like WHERE n_uid = ?) AS n_following,
                (SELECT COUNT(*) FROM n_comment WHERE n_uid = ?) AS n_comment,
                (SELECT SUM(n_starts) FROM n_threads WHERE n_uid = ?) AS n_likes
        `, [id, id, id, id, id]);

        let posts = userStats[0].n_posts || 0;
        let followers = userStats[0].n_followers || 0;
        let following = userStats[0].n_following || 0;
        let comment = userStats[0].n_comment || 0;
        let likes = userStats[0].n_likes || 0;

        /* 获取勋章列表 */
        const medals = await global.db.query(`SELECT * FROM n_medal`);

        /* 检查用户已获得的勋章 */
        const userMedals = await global.db.query(`
            SELECT n_mid FROM n_medal_log WHERE n_uid = ?
        `, [id]);
        const userMedalIds = new Set(userMedals.map(m => m.n_mid));

        /* 遍历勋章列表，判断是否满足条件 */
        for (const medal of medals) {
            let shouldAward = false;

            /* 根据勋章类型判断是否达到阈值 */
            switch (medal.n_type) {
                case '1': // 发帖数
                    shouldAward = posts >= medal.n_threshold;
                    break;
                case '2': // 获赞数
                    shouldAward = likes >= medal.n_threshold;
                    break;
                case '3': // 评论数
                    shouldAward = comment >= medal.n_threshold;
                    break;
                case '4': // 粉丝数
                    shouldAward = followers >= medal.n_threshold;
                    break;
            }
            console.log(posts , medal.n_threshold);
            
            /* 如果满足条件且用户未获得该勋章，则颁发 */
            if (shouldAward && !userMedalIds.has(medal.id)) {
                await global.db.insert('n_medal_log', {
                    n_uid: id,
                    n_mid: medal.id,
                    n_time: new Date()
                });

                /* 发送信息 n_msg */
                await global.db.insert('n_msg', {
                    n_uid: id,
                    n_html: `恭喜您获得勋章「${medal.n_name}」`,
                    n_time: new Date(),
                    n_name:'恭喜您获得勋章',
                    n_tid:0
                });
            }
        }
    },
    /* 获取勋章列表 */
     getMedal: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const Ware = request.Ware;

        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_name', pre.seach, 'like');
        const res = await global.db.getPaginatedData('n_medal', sql.sql, sql.params, ['n_sort', 'desc'], pre.page, pre.pagesize)
        
        /* 获取用户已获得的勋章 */
        const userMedals = await global.db.query(`
            SELECT n_mid FROM n_medal_log WHERE n_uid = ?
        `, [Ware.id]);
        const userMedalIds = new Set(userMedals.map(m => m.n_mid));
        
        /* 将用户已获得的勋章ID添加到结果中 */
        res.data.forEach(medal => {
            medal.isEarned = userMedalIds.has(medal.id);
        });
        
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
}