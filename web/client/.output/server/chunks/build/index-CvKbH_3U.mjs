import { a as useUserInfo, _ as __nuxt_component_1 } from './server.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import '@vueuse/core';

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
      }])}" data-v-e5ffefb3><p data-v-e5ffefb3>\u6211\u7684\u4FE1\u606F</p></div><div class="${ssrRenderClass(["Item", {
        active: unref(Key) === 3
      }])}" data-v-e5ffefb3><p data-v-e5ffefb3>\u6211\u7684\u8D26\u5355</p></div></div></div><div class="Content" data-v-e5ffefb3>`);
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

export { index as default };
//# sourceMappingURL=index-CvKbH_3U.mjs.map
