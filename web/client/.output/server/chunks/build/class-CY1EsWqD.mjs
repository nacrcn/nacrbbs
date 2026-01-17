import { _ as __nuxt_component_3 } from './ClassItem-t4LUU3s9.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './1-BLe-Ftx3.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "MainBox" }, _attrs))} data-v-edbeaf9a><div class="MainContent" data-v-edbeaf9a><div data-v-edbeaf9a><div class="title" data-v-edbeaf9a><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-edbeaf9a><span data-v-edbeaf9a>\u70ED\u95E8\u5708\u5B50</span></div></div><div class="ListBox" data-v-edbeaf9a><!--[-->`);
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

export { _class as default };
//# sourceMappingURL=class-CY1EsWqD.mjs.map
