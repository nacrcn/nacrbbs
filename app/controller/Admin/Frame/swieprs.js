export default {
    /* 新增轮播信息 */
    addswipers: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.insert('n_swipers', pre)
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 编辑轮播信息 */
    editswipers: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.update('n_swipers', pre, 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 删除轮播信息 */
    delswipers: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.delete('n_swipers', 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '删除成功');
    }),

}