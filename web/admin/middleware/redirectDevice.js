export default defineNuxtRouteMiddleware((to, from) => {
  const ua = process.server
    ? useRequestHeaders()['user-agent']
    : navigator.userAgent

  if (!ua) return

  const isMobile = /Android|iPhone|Windows Phone/i.test(ua)
  const isTablet = /iPad/i.test(ua) || (process.client && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  console.log(isMobile);
  
  if (isMobile && to.path !== '/') {
    return navigateTo('/')
  } else if (!isMobile && !isTablet && to.path !== '/pc') {
    return navigateTo('/pc')
  }
})
