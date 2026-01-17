import { k as defineNuxtRouteMiddleware, l as useRequestHeaders, n as navigateTo } from "../server.mjs";
import "vue";
import "E:/Cpenx/bbs/web/client/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "E:/Cpenx/bbs/web/client/node_modules/hookable/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/unctx/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/h3/dist/index.mjs";
import "pinia";
import "E:/Cpenx/bbs/web/client/node_modules/defu/dist/defu.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/radix3/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/ufo/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/klona/dist/index.mjs";
import "@arco-design/web-vue/es/icon/index.js";
import "vue/server-renderer";
import "@vueuse/core";
import "E:/Cpenx/bbs/web/client/node_modules/cookie-es/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/destr/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/ohash/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/perfect-debounce/dist/index.mjs";
const redirectDevice = defineNuxtRouteMiddleware((to, from) => {
  const ua = useRequestHeaders()["user-agent"];
  if (!ua) return;
  const isMobile = /Android|iPhone|Windows Phone/i.test(ua);
  const isTablet = /iPad/i.test(ua) || false;
  console.log(isMobile);
  if (isMobile && to.path !== "/") {
    return navigateTo("/");
  } else if (!isMobile && !isTablet && to.path !== "/pc") {
    return navigateTo("/pc");
  }
});
export {
  redirectDevice as default
};
//# sourceMappingURL=redirectDevice-VYplkK80.js.map
