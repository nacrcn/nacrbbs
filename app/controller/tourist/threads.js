
export default {
    /*  */
    GetThreads: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const Ware = request.Ware;
        if (pre.id) {
            const res = await global.db.query('SELECT * FROM n_threads WHERE id = ?', [pre.id])
            if (res.length == 0) {
                global.sendMsg(reply, 404, '帖子不存在');
                return;
            }
            const thread = res[0];

            // 获取用户信息
            const User = await global.db.query(`SELECT * FROM n_users WHERE id = ?`, [thread.n_uid]);
            thread.user = {
                ...User[0],
                n_password: ''
            };

            // 获取分类关系
            const Tclist = await global.db.query(`SELECT n_cid FROM n_tclist WHERE n_tid = ?`, [pre.id]);

            // 获取分类信息
            if (Tclist.length > 0) {
                const CID = Tclist.map(item => item.n_cid);
                const Category = await global.db.query(`SELECT id,n_name,n_type,n_icon FROM n_class WHERE id IN (${CID.join(',')})`);
                thread.category = Category;
            } else {
                thread.category = [];
            }


            thread.IsBuy = true
            /* 获取是否点赞 */
            if (Ware && Ware.id) {
                const isLiked = await global.db.query(`SELECT COUNT(*) FROM n_threads_like WHERE n_tid = ? AND n_uid = ?`, [pre.id, Ware.id || 0]);
                thread.isLiked = isLiked[0]['COUNT(*)'] > 0;
            }
            if (thread.n_price > 0 && thread.n_permission !== '1') {
                if (Ware && Ware.id) {
                    /* 获取用户是否购买 n_threads_buy */
                    const buylog = await global.db.query('select * FROM n_threads_buy where n_tid = ? and n_uid = ?', [
                        pre.id, Ware.id
                    ])
                    console.log(buylog);

                    if (buylog.length == 0) {
                        thread.n_resources = []
                        thread.n_html = 'needBuy'
                        thread.IsBuy = false
                    }
                } else {
                    thread.IsBuy = false
                    thread.n_resources = []
                    thread.n_html = 'needBuy'
                }
            }

            global.sendMsg(reply, 200, '获取成功', thread);

            /* 写入阅读 */

            await global.db.query('UPDATE n_threads SET n_read = n_read + 1 WHERE id = ?', [pre.id]);
            return
        }
        let ordeSql = ``
        if (pre.cid) {
            ordeSql = ` and id in (select n_tid from n_tclist where n_cid = ${pre.cid} and n_type = 1)`
        }
        if (pre.cidt) {
            ordeSql = ` and id in (select n_tid from n_tclist where n_cid = ${pre.cidt} and n_type = 2)`
        }
        if (pre.isMyLike) {
            ordeSql += ` and n_uid in (select n_tid from n_user_like where n_uid = ${Ware.id || 0})`
        }
        if (pre.ismy) {
            ordeSql += ` and n_uid = ${Ware.id || 0}`
        }
        if (pre.isMyBuy) {
            ordeSql += ` and id in (select n_tid from n_threads_buy where n_uid = ${Ware.id || 0})`
        }
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder
            .add('n_name', pre.search, 'like')
            .add('n_uid', pre.uid)
            .add('n_haveimage', pre.image)
            .add('n_havevideo', pre.video)
            .build();
        const res = await global.db.getPaginatedData('n_threads', sql.sql + ordeSql, sql.params, [pre.sort ?? 'id', pre.sortType ?? 'desc'], pre.page, pre.pagesize)
        let Userid = []
        for (let a in res.data) {
            Userid.push(res.data[a].n_uid)

        }
        

        /* 获取分类以及话题 */
        const Tclist = await global.db.query(`SELECT n_cid,n_tid FROM n_tclist WHERE n_tid IN (${res.data.map(item => item.id).join(',')})`)
        let CID = []
        for (let a in Tclist) {
            CID.push(Tclist[a].n_cid)
        }

        if (CID.length > 0) {
            /* 获取分类 */
            const Category = await global.db.query(`SELECT id,n_name,n_type,n_icon FROM n_class WHERE id IN (${CID.join(',')})`)
            // 建立分类映射关系
            const threadCategoryMap = {};
            for (let item of Tclist) {
                if (!threadCategoryMap[item.n_tid]) {
                    threadCategoryMap[item.n_tid] = [];
                }
                const category = Category.find(cat => cat.id === item.n_cid);
                if (category) {
                    threadCategoryMap[item.n_tid].push(category);
                }
            }

            res.data = res.data.map(thread => {
                thread.category = threadCategoryMap[thread.id] || [];
                return thread;
            });

        }

        for (let a in res.data) {
            try {
                if (res.data[a].n_price > 0 && res.data[a].n_permission !== '1') {
                    res.data[a].n_resources = []
                    res.data[a].n_html = ''
                } else {
                    res.data[a].n_resources = JSON.parse(res.data[a].n_resources)
                }
            } catch (error) {
                res.data[a].n_resources = []
            }
        }



        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
    /* 获取评论列表 */
    GetComments: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const Ware = request.Ware;
        /* 获取评论列表 */
        const SqlBuilder = new global.SqlBuilder();
        let ordeSql = ``
        if (pre.ismy) {
            ordeSql += ` and n_uid = ${Ware.id || 0}`
        }

        const sql = SqlBuilder
            .add('n_tid', pre.id)
            .add('n_uid', pre.uid)
            .build();
        const res = await global.db.getPaginatedData('n_comment', sql.sql + ordeSql, sql.params, ['id', 'desc'], pre.page, pre.pagesize)
        /* 获取用户信息 */
        let Userid = []
        let Tid = []
        for (let a in res.data) {
            Userid.push(res.data[a].n_uid)
            Tid.push(res.data[a].n_tid)
        }
        const User = await global.db.query(`SELECT id,n_nickname,n_avatar FROM n_users WHERE id IN (${Userid.join(',')})`)
        // 将用户信息添加到评论数据中
        const userMap = User.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
        }, {});

        res.data = res.data.map(comment => {
            comment.user = userMap[comment.n_uid];
            return comment;
        });

        if (pre.uid) {
            /* 获取帖子信息 */
            const Thread = await global.db.query(`SELECT * FROM n_threads WHERE id IN (${Tid.join(',')})`)
            const threadMap = Thread.reduce((acc, thread) => {
                acc[thread.id] = thread;
                return acc;
            }, {});

            res.data = res.data.map(comment => {
                comment.thread = threadMap[comment.n_tid];
                return comment;
            });
        }

        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    })

}