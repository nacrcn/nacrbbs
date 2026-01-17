import { a as useUserInfo, _ as __nuxt_component_1 } from "../server.mjs";
import { ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import "E:/Cpenx/bbs/web/client/node_modules/klona/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "E:/Cpenx/bbs/web/client/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "E:/Cpenx/bbs/web/client/node_modules/unctx/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/h3/dist/index.mjs";
import "pinia";
import "E:/Cpenx/bbs/web/client/node_modules/defu/dist/defu.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/radix3/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/ufo/dist/index.mjs";
import "@arco-design/web-vue/es/icon/index.js";
import "@vueuse/core";
import "E:/Cpenx/bbs/web/client/node_modules/cookie-es/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/destr/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/ohash/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useUserInfo();
    ref([]);
    const Key = ref(1);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "PageBox" }, _attrs))} data-v-e5ffefb3><div class="bg-decoration" data-v-e5ffefb3><div class="circle circle-1" data-v-e5ffefb3></div><div class="circle circle-2" data-v-e5ffefb3></div><div class="circle circle-3" data-v-e5ffefb3></div></div><div class="Page" data-v-e5ffefb3><div data-v-e5ffefb3><div class="Navlist" data-v-e5ffefb3><div class="${ssrRenderClass(["Item", {
        active: unref(Key) === 1
      }])}" data-v-e5ffefb3><p data-v-e5ffefb3>我的信息</p></div><div class="${ssrRenderClass(["Item", {
        active: unref(Key) === 3
      }])}" data-v-e5ffefb3><p data-v-e5ffefb3>我的账单</p></div></div></div><div class="Content" data-v-e5ffefb3>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/user/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e5ffefb3"]]);
export {
  index as default
};
//# sourceMappingURL=index-CvKbH_3U.js.map
