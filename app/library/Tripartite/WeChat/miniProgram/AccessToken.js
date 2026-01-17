/* 获取AccessToken */
const axios = require('axios');

export const getAccessToken = async () => {
    try {
        /* 获取系统配置 */
        const config = await global.db.query('SELECT * FROM n_configuration')
        const appid = config[0].n_wechat_miniProgram_appid
        const secret = config[0].n_wechat_miniProgram_secret
        const res = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
        if (res.data.access_token) {
            return res.data.access_token
        } else {
            return {
                code: 201,
                msg: '获取AccessToken失败: 未返回access_token'
            }
        }
    } catch (error) {
        console.log('获取AccessToken失败:', error);
        return {
            code: 201,
            msg: '获取AccessToken失败:' + error
        }
    }

}

