export async function useApiSsr(key, url, body, method = 'post',fallback = 201) {
  // return 
  const res = await useAsyncData(key, async () => {
    try {
      const res = await useApiFetch()[method.toLowerCase()](url, body)
      return res
    } catch (e) {
      console.error('请求失败:', e)
      return fallback
    }
  })

  return res.data.value
}
