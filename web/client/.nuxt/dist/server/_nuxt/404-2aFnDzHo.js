import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "error-page" }, _attrs))} data-v-ddf98d06><div class="error-container" data-v-ddf98d06><div class="error-icon" data-v-ddf98d06><svg width="80" height="80" viewBox="0 0 24 24" fill="none" data-v-ddf98d06><circle cx="12" cy="12" r="10" stroke="#ff6b6b" stroke-width="2" data-v-ddf98d06></circle><line x1="15" y1="9" x2="9" y2="15" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" data-v-ddf98d06></line><line x1="9" y1="9" x2="15" y2="15" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" data-v-ddf98d06></line></svg></div><h1 class="error-title" data-v-ddf98d06>贴贴不存在，可能被删除啦...</h1><div class="error-actions" data-v-ddf98d06><button class="btn btn-secondary" data-v-ddf98d06><svg width="16" height="16" viewBox="0 0 24 24" fill="none" data-v-ddf98d06><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ddf98d06></path><polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ddf98d06></polyline></svg> 返回首页 </button></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/index/threads/404.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _404 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ddf98d06"]]);
export {
  _404 as default
};
//# sourceMappingURL=404-2aFnDzHo.js.map
