import { WeChatLogin } from './WeChat/index.js'

class Tripartite {
    constructor(parameters) {

    }

    /* 引出微信小程序登录 */
    WeChatMiniProgramLogin(code) {
        return WeChatLogin(code)
    }
}

export default Tripartite;