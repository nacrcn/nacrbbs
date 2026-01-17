import axios from "axios"
/* 微信小程序登录相关功能 */
export const WeChatLogin = async (code) => {
    try {
        /* 获取系统配置 */
        const config = await global.db.query('SELECT * FROM n_configuration')
        const appid = config[0].n_wechat_miniProgram_appid
        const secret = config[0].n_wechat_miniProgram_secret
        const res = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`)
        if (!res.data.errcode) {
            return res.data
        } else {
            return {
                code: 201,
                msg: res.data.errmsg
            }
        }
    } catch (error) {
        console.log('微信登录错误:', error);
        return {
            code: 201,
            msg: '微信登录失败:' + error
        }
    }
}
