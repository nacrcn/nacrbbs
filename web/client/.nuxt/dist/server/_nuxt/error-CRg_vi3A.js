import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { u as useHead } from "./v3-DUQAjvLz.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { u as useRouter } from "../server.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/@unhead/vue/dist/index.mjs";
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
import "@vueuse/core";
import "E:/Cpenx/bbs/web/client/node_modules/cookie-es/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/destr/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/ohash/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = {
  __name: "error",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const errorDetails = ref(null);
    useHead({
      title: "系统配置错误"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "error-page" }, _attrs))} data-v-6da9917f><div class="error-container" data-v-6da9917f><div class="error-icon" data-v-6da9917f><svg width="80" height="80" viewBox="0 0 24 24" fill="none" data-v-6da9917f><circle cx="12" cy="12" r="10" stroke="#ff6b6b" stroke-width="2" data-v-6da9917f></circle><line x1="15" y1="9" x2="9" y2="15" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" data-v-6da9917f></line><line x1="9" y1="9" x2="15" y2="15" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" data-v-6da9917f></line></svg></div><h1 class="error-title" data-v-6da9917f>系统配置加载失败</h1><p class="error-description" data-v-6da9917f> config接口返回错误，无法读取系统配置 </p><div class="error-details" data-v-6da9917f><h3 data-v-6da9917f>可能的原因：</h3><ul data-v-6da9917f><li data-v-6da9917f>服务器连接异常</li><li data-v-6da9917f>配置文件不存在或损坏</li><li data-v-6da9917f>网络连接问题</li><li data-v-6da9917f>权限不足</li></ul></div><div class="error-actions" data-v-6da9917f><button class="btn btn-secondary" data-v-6da9917f><svg width="16" height="16" viewBox="0 0 24 24" fill="none" data-v-6da9917f><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-6da9917f></path><polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-6da9917f></polyline></svg> 返回首页 </button></div>`);
      if (errorDetails.value) {
        _push(`<div class="error-info" data-v-6da9917f><details data-v-6da9917f><summary data-v-6da9917f>技术详情</summary><pre data-v-6da9917f>${ssrInterpolate(errorDetails.value)}</pre></details></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const error = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6da9917f"]]);
export {
  error as default
};
//# sourceMappingURL=error-CRg_vi3A.js.map
