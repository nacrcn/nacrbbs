// stores/counter.ts
import {
  defineStore
} from 'pinia'

/* 站点配置信息1 */
export const useSiteConfig = defineStore('SiteConfig', {
  state: () => ({
    Config: {},
  }),
  actions: {
    increment(siteConfig) {
      this.Config = siteConfig
    }
  }
})

/* 用户信息 */
export const useUserInfo = defineStore('UserInfo', {

  state: () => ({
    UserInfo: {},
  }),
  actions: {
    increment(userInfo) {
      this.UserInfo = userInfo
    },
    async init(CallBack = () => { }) {
      const res = await useApiFetch().post('/api/myinfo')
      if (res.code == 200) {
        this.UserInfo = res.data

        CallBack(res.data)
      } else {
        CallBack(false)
        this.UserInfo = {
          n_avatar: 'https://q7.itc.cn/q_70/images03/20241119/7243e2d9d1a0434ab2c56bca7153c0d8.jpeg',
        }
      }
    }
  }
})