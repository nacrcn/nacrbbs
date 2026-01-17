
export default {
    /*  */
    GetThreads: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
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

            global.sendMsg(reply, 200, '获取成功', thread);

            return
        }
        let ordeSql = ``
        if (pre.cid) {
            ordeSql = `and id in (select n_tid from n_tclist where n_cid = ${pre.cid} and n_type = 1)`
        }
        if (pre.cidt) {
            ordeSql = `and id in (select n_tid from n_tclist where n_cid = ${pre.cidt} and n_type = 2)`
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
        const User = await global.db.query(`SELECT id,n_nickname,n_avatar FROM n_users WHERE id IN (${Userid.join(',')})`)
        // 将用户信息添加到帖子数据中
        const userMap = User.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
        }, {});

        res.data = res.data.map(thread => {
            thread.user = userMap[thread.n_uid];
            return thread;
        });

        /* 获取分类以及话题 */
        const Tclist = await global.db.query(`SELECT n_cid,n_tid FROM n_tclist WHERE n_tid IN (${res.data.map(item => item.id).join(',')})`)
        let CID = []
        for (let a in Tclist) {
            CID.push(Tclist[a].n_cid)
        }
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

        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
    /* 删除帖子 */
    DeleteThread: (request, reply) => global.Fun(reply, async () => {
        const id = request.body.id;
        await global.db.delete('n_tclist', 'n_tid = ?', [pre.id])
        /* 删除评论 */
        await global.db.delete('n_comments', 'n_tid = ?', [pre.id]);
        await global.db.delete('n_threads', 'id = ? ', [pre.id]);
        global.sendMsg(reply, 200, '删除成功');
    }),
    /* 编辑帖子 */
    EditThreads: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;

        /* 获取帖子详情 */
        const Threads = await global.db.query('SELECT * FROM n_threads WHERE id = ?', [pre.id]);
        if (!Threads || Threads.length === 0) {
            return global.sendMsg(reply, 404, '帖子不存在');
        }

        let Form = {
            n_name: pre.n_name,
            n_html: pre.n_html,
            n_profile: pre.n_profile,
            n_permission: pre.n_permission,
            n_price: pre.n_price == null || pre.n_price == undefined || !pre.n_price || pre.n_price == '' || pre.n_price == 'null' ? 0 : pre.n_price,
            n_resources: pre.n_resources,
            n_haveimage: pre.n_haveimage,
            n_havevideo: pre.n_havevideo,
            n_starts: pre.n_starts,
            n_read: pre.n_read,

        }

        await global.db.update('n_threads', Form, 'id = ?', [pre.id])
        await global.db.delete('n_tclist', 'n_tid = ?', [pre.id])

        /* 写入分类以及话题 */
        try {
            const Category = JSON.parse(pre.n_category);
            for (let a in Category) {
                await global.db.insert('n_tclist', {
                    n_tid: pre.id,
                    n_cid: Category[a],
                    n_type: 1
                })
            }
        } catch (error) {
            console.log(error);
        }

        try {
            const Topic = JSON.parse(pre.n_topic);
            for (let a in Topic) {
                await global.db.insert('n_tclist', {
                    n_tid: pre.id,
                    n_cid: Topic[a],
                    n_type: 2
                })
            }
        } catch (error) {
            console.log(error);
        }
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 获取评论列表 */
    GetComments: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        /* 获取评论列表 */
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder
            .add('n_tid', pre.id)
            .add('n_uid', pre.uid)
            .build();
        const res = await global.db.getPaginatedData('n_comment', sql.sql, sql.params, ['id', 'desc'], pre.page, pre.pagesize)
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

        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
    /* 删除评论 */
    DeleteComment: (request, reply) => global.Fun(reply, async () => {
        const id = request.body.id;
        await global.db.delete('n_comment', 'id = ?', [id]);
        global.sendMsg(reply, 200, '删除成功');
    }),
    /* 获取举报记录 */
    GetReport: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder
            .add('n_tid', pre.id)
            .build();
        const res = await global.db.getPaginatedData('n_report', sql.sql, sql.params, ['id', 'desc'], pre.page, pre.pagesize)
        /* 获取帖子信息 */
        let Tid = []
        for (let a in res.data) {
            Tid.push(res.data[a].n_tid)
        }
        const Thread = await global.db.query(`SELECT * FROM n_threads WHERE id IN (${Tid.join(',')})`)
        const threadMap = Thread.reduce((acc, thread) => {
            acc[thread.id] = thread;
            return acc;
        }, {});

        res.data = res.data.map(report => {
            report.thread = threadMap[report.n_tid];
            return report;
        });

        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),

}