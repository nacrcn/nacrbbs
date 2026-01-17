import "vue";
import "E:/Cpenx/bbs/web/client/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
export {
  setInterval as s
};
//# sourceMappingURL=interval-Cu-4gskx.js.map
