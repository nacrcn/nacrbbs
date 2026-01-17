export default {
    /* 获取秘钥列表 */
    getApiKeys: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_key', pre.seach, 'like').build();
        const res = await global.db.getPaginatedData('n_apikeys', sql.sql, sql.params, ['id', 'desc'], pre.page, pre.pagesize)
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
     /* 新增活动信息 */
    addApiKeys: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;

        let Form = {
            n_key: global.Tools.generateComplexCode(15),
            n_uid: Ware.id,
            n_time: new Date(),
            n_type: 1,
            n_white: pre.n_white || '',
            n_black: pre.n_black || '',
            n_name: pre.n_name || '手动创建',
            n_ipstatus: pre.n_ipstatus || 0
        }

        await global.db.insert('n_apikeys', Form)
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 编辑活动信息 */
    editApiKeys: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        delete pre.n_key;
        delete pre.n_uid;
        delete pre.n_time;

        await global.db.update('n_apikeys', pre, 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '操作成功');
    }),
    /* 删除活动信息 */
    deleApiKeys: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.delete('n_apikeys', 'id = ?', [pre.id])
        global.sendMsg(reply, 200, '删除成功');
    }),

}