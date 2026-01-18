// composables/useApiFetch.js
import Config from '../app-config.js'

export function useApiFetch() {
  // const config = useRuntimeConfig()
  const token = useCookie('AToken').value
  const apiBase = Config.apiBase
  const toUrlEncoded = (obj) =>
    Object.keys(obj)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&')


  const request = async (method, url, data = {}, headers = {}) => {
    const res = await useFetch(apiBase + url, {
      method,
      query: method === 'GET' ? data : undefined,
      body: method === 'POST' ?
        toUrlEncoded(data) :
        undefined,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...(token ? {
          admintoken: token
        } : {}),
        ...headers,
      }
    })
    try {
      if (JSON.parse(res.data.value).code == 401) {
        navigateTo('/login')
      }

      return JSON.parse(res.data.value) // 如果返回的是 JSON，Nuxt 会自动解析
    } catch (e) {
      return res.data.value
    }
  }


  return {
    get: (url, data = {}, headers = {}) => request('GET', url, data, headers),
    post: (url, data = {}, headers = {}) => request('POST', url, data, headers),
  }
}