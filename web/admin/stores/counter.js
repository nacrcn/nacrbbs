// stores/counter.ts
import {
  defineStore
} from 'pinia'

export const UserLoginShow = defineStore('counter', {
  state: () => ({
    count: false
  }),
  actions: {
    increment() {
      this.count = !this.count
    }
  }
})

/* 任务Token检测 */
export const TaskToken = defineStore('TaskToken', {
  state: () => ({
    token1: '',
    /* 后端返回的token值 */
    token2: '',
    /* 跳转之前的 指纹md5值 */
    ip: '',
  }),
  actions: {
    increment(token, type) {
      if (type == 1) {
        this.token1 = token
      } else if (type == 2) {
        this.token2 = token
      } else {
        this.ip = token
      }
    }
  }
})

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


/* 用户信息 getuserinfo */
export const useUserInfo = defineStore('UserInfo', {
  state: () => ({
    userInfo: {},
  }),
  actions: {
    increment(userInfo) {
      this.userInfo = userInfo
    },
    async init() {
      const res = await useApiFetch().post('/dapi/getmyinfo')
      if (res.code == 200) {
        this.userInfo = res.data
      }else{
        navigateTo('/login')
      }
    }
  }
})

/* 面包屑 */
export const useBreadcrumb = defineStore('Breadcrumb', {
  state: () => ({
    breadcrumb: [],
  }),
  actions: {
    increment(breadcrumb) {
      /* 查找id是否存在 */
      const findIndex = this.breadcrumb.findIndex(item => item.id === breadcrumb.id)
      if (findIndex > -1) {
        this.breadcrumb.splice(findIndex, 1, breadcrumb)
      } else {
        this.breadcrumb.push(breadcrumb)
      }
    }
  }
})