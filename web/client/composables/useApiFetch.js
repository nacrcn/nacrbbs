// composables/useApiFetch.js

export function useApiFetch() {
  // const config = useRuntimeConfig()
  const token = useCookie('UToken').value
  // const apiBase = 'http://127.0.0.1:9999'
  // const apiBase = 'http://192.168.10.157:9999'
  const apiBase = 'https://api.bbs.nacr.cn'

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
          Usertoken: token
        } : {}),
        ...headers,
      }
    })
    try {
      if (JSON.parse(res.data.value).code == 401) {
        // navigateTo('/login')
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