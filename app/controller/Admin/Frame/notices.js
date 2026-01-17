export default {
    /* 新增公告信息 n_notices */
    addnotices: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        if(!pre.n_time || pre.n_time == ''){
            pre.n_time = new Date();
        }
        pre.n_read = 0

        await global.db.insert('n_notices', pre)
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 编辑公告信息 */
    editnotices: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.update('n_notices', pre, 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 删除公告信息 */
    delnotices: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.delete('n_notices', 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '删除成功');
    }),


}

