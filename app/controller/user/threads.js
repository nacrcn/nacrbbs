import AssignMedal from "./medal.js";
export default {
    /*  */
    AddThreads: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;

        let Form = {
            n_name: pre.n_name,
            n_uid: Ware.id,
            n_time: new Date(),
            n_html: pre.n_html,
            n_read: 0,
            n_starts: 0,
            n_msgs: 0,
            n_profile: pre.n_profile,
            n_permission: pre.n_permission,
            n_price: pre.n_price == null || pre.n_price == undefined || !pre.n_price || pre.n_price == '' || pre.n_price == 'null' ? 0 : pre.n_price,
            n_resources: pre.n_resources,
            n_haveimage: pre.n_haveimage,
            n_havevideo: pre.n_havevideo
        }

        const Threads = await global.db.insert('n_threads', Form)

        /*  */

        /* 写入分类以及话题 */
        try {
            const Category = JSON.parse(pre.n_category);
            for (let a in Category) {
                await global.db.insert('n_tclist', {
                    n_tid: Threads,
                    n_cid: Category[a],
                    n_type: 1
                })

                /* 增加分类热度 */
                await global.db.query('UPDATE n_class SET n_hotnum = n_hotnum + 1 WHERE id = ?', [Category[a]])
            }
        } catch (error) {
            console.log(error);
        }

        try {
            const Topic = JSON.parse(pre.n_topic);
            for (let a in Topic) {
                await global.db.insert('n_tclist', {
                    n_tid: Threads,
                    n_cid: Topic[a],
                    n_type: 2
                })
                await global.db.query('UPDATE n_class SET n_hotnum = n_hotnum + 1 WHERE id = ?', [Category[a]])
            }
        } catch (error) {
            console.log(error);
        }
        AssignMedal.AssignMedal(Ware.id)
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 编辑贴贴 */
    EditThreads: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;

        /* 获取帖子详情 */
        const Threads = await global.db.query('SELECT * FROM n_threads WHERE id = ?', [pre.id]);
        if (!Threads || Threads.length === 0) {
            return global.sendMsg(reply, 404, '帖子不存在');
        }
        if (Threads[0].n_uid !== Ware.id) {
            return global.sendMsg(reply, 403, '无权限');
        }

        let Form = {
            n_name: pre.n_name,
            n_html: pre.n_html,
            n_profile: pre.n_profile,
            n_permission: pre.n_permission,
            n_price: pre.n_price == null || pre.n_price == undefined || !pre.n_price || pre.n_price == '' || pre.n_price == 'null' ? 0 : pre.n_price,
            n_resources: pre.n_resources,
            n_haveimage: pre.n_haveimage,
            n_havevideo: pre.n_havevideo
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
    /* 删除帖子 */
    DelThreads: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;
        /* 获取帖子信息 */
        const Threads = await global.db.query('SELECT * FROM n_threads WHERE id = ?', [pre.id]);
        if (!Threads || Threads.length === 0) {
            return global.sendMsg(reply, 404, '帖子不存在');
        }
        if (Threads[0].n_uid !== Ware.id) {
            return global.sendMsg(reply, 403, '无权限');
        }

        /* 删除tclist */
        await global.db.delete('n_tclist', 'n_tid = ?', [pre.id])
        /* 删除评论 */
        await global.db.delete('n_comment', 'n_tid = ?', [pre.id]);
        await global.db.delete('n_threads', 'id = ? ', [pre.id]);
        global.sendMsg(reply, 200, '删除成功');

    }),

    /* 点赞 */
    LikeThreads: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;
        /* 获取帖子信息 */
        const Threads = await global.db.query('SELECT * FROM n_threads WHERE id = ?', [pre.id]);
        if (!Threads || Threads.length === 0) {
            return global.sendMsg(reply, 404, '帖子不存在');
        }

        /* 检查是否点赞过 */
        const Like = await global.db.query('SELECT * FROM n_threads_like WHERE n_tid = ? AND n_uid = ?', [pre.id, Ware.id]);
        if (Like && Like.length > 0) {
            /* 删除点赞 */
            await global.db.delete('n_threads_like', 'n_tid = ? AND n_uid = ?', [pre.id, Ware.id]);
            /* 更新帖子点赞数 */
            await global.db.query('UPDATE n_threads SET n_starts = n_starts - 1 WHERE id = ?', [pre.id]);
            return global.sendMsg(reply, 200, '取消点赞成功');
        }
        await global.db.insert('n_threads_like', {
            n_tid: pre.id,
            n_uid: Ware.id,
            n_time: new Date()
        });

        /* 更新帖子点赞数 */
        await global.db.query('UPDATE n_threads SET n_starts = n_starts + 1 WHERE id = ?', [pre.id]);
        AssignMedal.AssignMedal(Threads[0].n_uid)

        global.sendMsg(reply, 200, '点赞成功');
    }),
    /* 评论帖子 */
    CommentThreads: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;
        /* 获取帖子信息 */
        const Threads = await global.db.query('SELECT * FROM n_threads WHERE id = ?', [pre.id]);
        if (!Threads || Threads.length === 0) {
            return global.sendMsg(reply, 404, '帖子不存在');
        }

        if (!pre.n_html || pre.n_html.length < 1) {
            return global.sendMsg(reply, 400, '评论内容不能为空');
        }


        let from = {
            n_tid: pre.id,
            n_uid: Ware.id,
            n_html: pre.n_html,
            n_cid: pre.n_cid ?? 0,
            n_time: new Date()
        }
        await global.db.insert('n_comment', from);

        /* 写入分类热度 */
        await global.db.query('UPDATE n_class SET n_hotnum = n_hotnum + 1 WHERE id in (select n_cid from n_tclist where n_tid = ?)', [pre.id])
        /* 写入评论数量 */
        await global.db.query('UPDATE n_threads SET n_msgs = n_msgs + 1,n_msglastTime = ? WHERE id = ?', [new Date(), pre.id])
        global.sendMsg(reply, 200, '评论成功');
        AssignMedal.AssignMedal(Ware.id)

    }),


    /* 删除评论 */
    DelComment: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;
        /* 获取评论信息 */
        const Comment = await global.db.query('SELECT * FROM n_comment WHERE id = ?', [pre.id]);
        if (!Comment || Comment.length === 0) {
            return global.sendMsg(reply, 404, '评论不存在');
        }
        if (Comment[0].n_uid !== Ware.id) {
            return global.sendMsg(reply, 403, '无权限');
        }
        /* 删除评论数量 */
        await global.db.query('UPDATE n_threads SET n_msgs = n_msgs - 1 WHERE id = ?', [Comment[0].n_tid])
        await global.db.delete('n_comment', 'id = ? ', [pre.id]);
        global.sendMsg(reply, 200, '删除成功');

    }),

    /* 举报帖子 n_report */
    ReportThreads: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;
        /* 获取帖子信息 */
        const Threads = await global.db.query('SELECT * FROM n_threads WHERE id = ?', [pre.n_tid]);
        if (!Threads || Threads.length === 0) {
            return global.sendMsg(reply, 404, '帖子不存在');
        }

        let report = {
            n_tid: pre.n_tid,
            n_uid: Ware.id,
            n_html: pre.n_html,
            n_time: new Date()
        }
        console.log(report);

        await global.db.insert('n_report', report);
        global.sendMsg(reply, 200, '举报成功');
    }),

  
}