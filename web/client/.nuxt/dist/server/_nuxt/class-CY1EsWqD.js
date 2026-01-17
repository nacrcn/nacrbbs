import { _ as __nuxt_component_3 } from "./ClassItem-t4LUU3s9.js";
import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { _ as _imports_0 } from "./1-BLe-Ftx3.js";
import "E:/Cpenx/bbs/web/client/node_modules/klona/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
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
  __name: "class",
  __ssrInlineRender: true,
  setup(__props) {
    const ThreadsList = ref([]);
    ref({
      page: 1,
      pagesize: 10,
      total: 0
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClassItem = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "MainBox" }, _attrs))} data-v-edbeaf9a><div class="MainContent" data-v-edbeaf9a><div data-v-edbeaf9a><div class="title" data-v-edbeaf9a><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-edbeaf9a><span data-v-edbeaf9a>热门圈子</span></div></div><div class="ListBox" data-v-edbeaf9a><!--[-->`);
      ssrRenderList(ThreadsList.value, (value) => {
        _push(ssrRenderComponent(_component_ClassItem, {
          key: value.n_name,
          data: value
        }, null, _parent));
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/index/class.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _class = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-edbeaf9a"]]);
export {
  _class as default
};
//# sourceMappingURL=class-CY1EsWqD.js.map
