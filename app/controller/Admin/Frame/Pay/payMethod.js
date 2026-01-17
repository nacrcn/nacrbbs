export default {
     /* 新增支付方式信息 n_notices */
    addPaymethod: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        await global.db.insert('n_paymethod', pre)
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 编辑支付方式信息 */
    editPaymethod: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.update('n_paymethod', pre, 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 删除支付方式信息 */
    delePaymethod: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.delete('n_paymethod', 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '删除成功');
    }),
     /* 获取支付方式列表 */
    GetPayMethod: (request, reply) => global.Fun(reply, async () => {
        try {
            const pre = request.body;
            let sql = 'SELECT * FROM n_paymethod order by n_index desc'
            const paymethod = await global.db.query(sql);
            global.sendMsg(reply, 200, '成功', paymethod);
        } catch (error) {
            console.log(error);
            global.sendMsg(reply, 201, '❌ 支付方式获取失败  : ' + error.message);

        }
    }),

}

