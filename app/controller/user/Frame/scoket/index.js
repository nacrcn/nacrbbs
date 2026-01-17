export default {
    /* 创建房间接口 */
    CreateRooms: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;

        /* 创建房间 n_wrooms */
        const pre = request.body
        pre.n_code = global.Tools.generateComplexCode(16)
        const redisKey = `Room:${pre.n_code}`;
        let data = {
            pass:pre.n_pass || '',
            name:pre.n_name,
            max:pre.n_max || 2,
        }
        await global.RedisUtils.setCache(redisKey, JSON.stringify(data), pre.n_time * 60);

        await global.db.insert('n_wrooms', pre)

        global.sendMsg(reply, 200, '创建房间成功',pre.n_code);
    }),

    /* 获取我的房间 */
    GetMyRooms: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        /* 获取我的房间 n_wrooms */
        const pre = request.body
        const res = await global.db.query('SELECT * FROM n_wrooms WHERE n_uid = ?', [Ware.id])

        global.sendMsg(reply, 200, '获取房间成功', res);
    }),

    /* 获取房间信息 */
    GetRoomInfo: (request, reply) => global.Fun(reply, async () => {
        const Ware = request.Ware;
        /* 获取我的房间 n_wrooms */
        const pre = request.body
        const res = await global.db.query('SELECT * FROM n_wrooms WHERE n_uid = ?', [Ware.id])
        let info = await global.RedisUtils.getCache(`Room:${pre.code}`)
        if(info){
          info = JSON.parse(info)
          info.info = res[0]
          return global.sendMsg(reply, 200, '获取房间成功', info);
        }else{
          return global.sendMsg(reply, 201, '房间不存在');

        }
    }),

}

