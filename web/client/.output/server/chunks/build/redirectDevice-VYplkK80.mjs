import { k as defineNuxtRouteMiddleware, l as useRequestHeaders, n as navigateTo } from './server.mjs';
import 'vue';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import '@vueuse/core';

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

export { redirectDevice as default };
//# sourceMappingURL=redirectDevice-VYplkK80.mjs.map
