import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { u as useHead } from './v3-DUQAjvLz.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { u as useRouter } from './server.mjs';
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
import 'pinia';
import '@vueuse/core';

const _sfc_main = {
  __name: "error",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const errorDetails = ref(null);
    useHead({
      title: "\u7CFB\u7EDF\u914D\u7F6E\u9519\u8BEF"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "error-page" }, _attrs))} data-v-6da9917f><div class="error-container" data-v-6da9917f><div class="error-icon" data-v-6da9917f><svg width="80" height="80" viewBox="0 0 24 24" fill="none" data-v-6da9917f><circle cx="12" cy="12" r="10" stroke="#ff6b6b" stroke-width="2" data-v-6da9917f></circle><line x1="15" y1="9" x2="9" y2="15" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" data-v-6da9917f></line><line x1="9" y1="9" x2="15" y2="15" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" data-v-6da9917f></line></svg></div><h1 class="error-title" data-v-6da9917f>\u7CFB\u7EDF\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</h1><p class="error-description" data-v-6da9917f> config\u63A5\u53E3\u8FD4\u56DE\u9519\u8BEF\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u7CFB\u7EDF\u914D\u7F6E </p><div class="error-details" data-v-6da9917f><h3 data-v-6da9917f>\u53EF\u80FD\u7684\u539F\u56E0\uFF1A</h3><ul data-v-6da9917f><li data-v-6da9917f>\u670D\u52A1\u5668\u8FDE\u63A5\u5F02\u5E38</li><li data-v-6da9917f>\u914D\u7F6E\u6587\u4EF6\u4E0D\u5B58\u5728\u6216\u635F\u574F</li><li data-v-6da9917f>\u7F51\u7EDC\u8FDE\u63A5\u95EE\u9898</li><li data-v-6da9917f>\u6743\u9650\u4E0D\u8DB3</li></ul></div><div class="error-actions" data-v-6da9917f><button class="btn btn-secondary" data-v-6da9917f><svg width="16" height="16" viewBox="0 0 24 24" fill="none" data-v-6da9917f><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-6da9917f></path><polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-6da9917f></polyline></svg> \u8FD4\u56DE\u9996\u9875 </button></div>`);
      if (errorDetails.value) {
        _push(`<div class="error-info" data-v-6da9917f><details data-v-6da9917f><summary data-v-6da9917f>\u6280\u672F\u8BE6\u60C5</summary><pre data-v-6da9917f>${ssrInterpolate(errorDetails.value)}</pre></details></div>`);
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

export { error as default };
//# sourceMappingURL=error-CRg_vi3A.mjs.map
