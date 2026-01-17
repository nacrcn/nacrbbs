<template>
  <div>
    <NuxtPage />
  </div>
</template>


<script setup>
const SiteConfig = useSiteConfig()

const res = await useApiSsr('config', '/api/webinfo')
if (res && res.code == 200) {
  SiteConfig.increment(res.data)
} else {
  navigateTo('/error')
}


</script>

<style>
@font-face {
  font-family: 'AlimamaFangYuan';
  /* src: url('/assets/AlimamaShuHeiTi-Bold.woff2') format('woff2'),
       url('/assets/AlimamaShuHeiTi-Bold.woff') format('woff'); */
  src: url('/assets/AlimamaFangYuanTiVF-Thin.woff2') format('woff2'),
    url('/assets/AlimamaFangYuanTiVF-Thin.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

* {
  margin: 0;
  padding: 0;
  transition: all 0.4s;
  font-family: 'AlimamaFangYuan', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}
</style>
