export default {
    /* 获取邀请记录 */
    AcquisitionList: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        const pre = request.body;

        let sql = ` and id in (select n_uid from n_activity_useracquisition_log where n_superior = ?)`
        const res = await global.db.getPaginatedData('n_users', sql, [Ware.id], ['id', 'desc'], pre.page, pre.pagesize)

        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    })

}

