
export default {
    /*  */
    GetUser: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const Ware = request.Ware;
        if (pre.id) {
            if (pre.id == 'me') {
                pre.id = Ware.id;
            }
            const res = await global.db.query('SELECT * FROM n_users WHERE id = ?', [pre.id])
            if (res.length == 0) {
                global.sendMsg(reply, 404, '用户不存在');
                return;
            }
            const thread = res[0];
            /* 使用单次查询获取用户统计数据 */
            const userStats = await global.db.query(`
                SELECT
                    (SELECT COUNT(*) FROM n_threads WHERE n_uid = ?) AS n_posts,
                    (SELECT COUNT(*) FROM n_user_like WHERE n_tid = ?) AS n_followers,
                    (SELECT COUNT(*) FROM n_user_like WHERE n_uid = ?) AS n_following,
                    (SELECT COUNT(*) FROM n_comment WHERE n_uid = ?) AS n_comment
            `, [thread.id, thread.id, thread.id, thread.id]);
            thread.posts = userStats[0].n_posts;
            thread.followers = userStats[0].n_followers;
            thread.following = userStats[0].n_following;
            thread.n_comment = userStats[0].n_comment;


            /* 是否关注 */
            if (Ware && Ware.id) {
                const isLiked = await global.db.query(`SELECT COUNT(*) FROM n_user_like WHERE n_tid = ? AND n_uid = ?`, [pre.id, Ware.id || 0]);
                thread.isLiked = isLiked[0]['COUNT(*)'] > 0;
            }

            global.sendMsg(reply, 200, '获取成功', thread);
            return;
        }
        const SqlBuilder = new global.SqlBuilder();

        let OSql = ``
        /* 请求我的粉丝 */
        if(pre.uid == 'me'){
            pre.uid = Ware.id;
        }
        if (pre.followers && pre.uid) {
            OSql = OSql + ` and id in (select n_uid from n_user_like where n_tid = ${pre.uid})`
        }
        /* 请求我的关注 */
        if (pre.following && pre.uid) {
            OSql = OSql + ` and id in (select n_tid from n_user_like where n_uid = ${pre.uid})`
        }
        const sql = SqlBuilder
            .add('n_name', pre.seach, 'like')
            .add('id', Ware && Ware.id ? Ware.id : 0, '!=')
            .build();
        const res = await global.db.getPaginatedData('n_users', sql.sql + OSql, sql.params, ['id', 'desc'], pre.page, pre.pagesize);

        /* 批量获取所有用户的统计数据 */
        if (res.data && res.data.length > 0) {
            const userIds = res.data.map(user => user.id);

            /* 批量查询帖子数 */
            const postCounts = await global.db.query(`
                SELECT n_uid, COUNT(*) AS count
                FROM n_threads
                WHERE n_uid IN (${userIds.map(() => '?').join(',')})
                GROUP BY n_uid
            `, userIds);

            /* 批量查询粉丝数 */
            const followerCounts = await global.db.query(`
                SELECT n_tid, COUNT(*) AS count
                FROM n_user_like
                WHERE n_tid IN (${userIds.map(() => '?').join(',')})
                GROUP BY n_tid
            `, userIds);

            /* 批量查询关注数 */
            const followingCounts = await global.db.query(`
                SELECT n_uid, COUNT(*) AS count
                FROM n_user_like
                WHERE n_uid IN (${userIds.map(() => '?').join(',')})
                GROUP BY n_uid
            `, userIds);

            /* 批量查询评论数 */
            const commentCounts = await global.db.query(`
                SELECT n_uid, COUNT(*) AS count
                FROM n_comment
                WHERE n_uid IN (${userIds.map(() => '?').join(',')})
                GROUP BY n_uid
            `, userIds);

            /* 将统计数据映射到每个用户 */
            const getCountMap = (data, keyField) => {
                const map = {};
                data.forEach(item => map[item[keyField]] = item.count);
                return map;
            };

            const postMap = getCountMap(postCounts, 'n_uid');
            const followerMap = getCountMap(followerCounts, 'n_tid');
            const followingMap = getCountMap(followingCounts, 'n_uid');
            const commentMap = getCountMap(commentCounts, 'n_uid');

            res.data.forEach(user => {
                user.posts = postMap[user.id] || 0;
                user.followers = followerMap[user.id] || 0;
                user.following = followingMap[user.id] || 0;
                user.n_comment = commentMap[user.id] || 0;
            });

            /* 批量查询当前用户是否关注了这些用户 */
            if (Ware && Ware.id) {
                const likedUsers = await global.db.query(`
                    SELECT n_tid
                    FROM n_user_like
                    WHERE n_uid = ? AND n_tid IN (${userIds.map(() => '?').join(',')})
                `, [Ware.id, ...userIds]);

                const likedSet = new Set(likedUsers.map(item => item.n_tid));
                res.data.forEach(user => {
                    user.isLiked = likedSet.has(user.id);
                });
            }
        }

        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    })

}