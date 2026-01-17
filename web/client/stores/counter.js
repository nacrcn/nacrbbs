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
          n_avatar: 'https://imgsbad.semoun.com/uploads/2025/12/16/69411eb600dc1.png',
        }
      }
    }
  }
})