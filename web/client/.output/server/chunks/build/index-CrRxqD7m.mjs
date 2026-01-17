import { b as useSiteConfig, _ as __nuxt_component_1 } from './server.mjs';
import { ref, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { u as useSeoSet } from './useSeoSet-ri8aJ8nG.mjs';
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
import './v3-DUQAjvLz.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const SiteConfig = useSiteConfig();
    useSeoSet({
      title: SiteConfig.$state.Config.n_web_title,
      description: SiteConfig.$state.Config.n_web_desc,
      keywords: SiteConfig.$state.Config.n_web_keys
    });
    const IndexShow = ref(2);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_icon_heart = resolveComponent("icon-heart");
      const _component_icon_fire = resolveComponent("icon-fire");
      const _component_icon_branch = resolveComponent("icon-branch");
      const _component_icon_image = resolveComponent("icon-image");
      const _component_icon_user = resolveComponent("icon-user");
      const _component_NuxtPage = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "PageBox" }, _attrs))} data-v-a7bfde19><div class="PageContent" data-v-a7bfde19><div class="Sidebar" data-v-a7bfde19><div class="NavBar" data-v-a7bfde19><div class="${ssrRenderClass(["Item", { active: unref(IndexShow) === 1 }])}" data-v-a7bfde19>`);
      _push(ssrRenderComponent(_component_icon_heart, { class: "icon" }, null, _parent));
      _push(`<p data-v-a7bfde19>\u6211\u7684\u5173\u6CE8</p></div><div class="${ssrRenderClass(["Item", { active: unref(IndexShow) === 2 }])}" data-v-a7bfde19>`);
      _push(ssrRenderComponent(_component_icon_fire, { class: "icon" }, null, _parent));
      _push(`<p data-v-a7bfde19>\u70ED\u95E8\u74DC\u5B50</p></div><div class="${ssrRenderClass(["Item", { active: unref(IndexShow) === 3 }])}" data-v-a7bfde19>`);
      _push(ssrRenderComponent(_component_icon_branch, { class: "icon" }, null, _parent));
      _push(`<p data-v-a7bfde19>\u70ED\u95E8\u5708\u5B50</p></div><div class="${ssrRenderClass(["Item", { active: unref(IndexShow) === 4 }])}" data-v-a7bfde19>`);
      _push(ssrRenderComponent(_component_icon_image, { class: "icon" }, null, _parent));
      _push(`<p data-v-a7bfde19>\u89C6\u9891\u56FE\u7247</p></div><div class="${ssrRenderClass(["Item", { active: unref(IndexShow) === 6 }])}" data-v-a7bfde19>`);
      _push(ssrRenderComponent(_component_icon_user, { class: "icon" }, null, _parent));
      _push(`<p data-v-a7bfde19>\u70ED\u95E8UP\u4E3B</p></div></div></div><div class="Content" data-v-a7bfde19>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a7bfde19"]]);

export { index as default };
//# sourceMappingURL=index-CrRxqD7m.mjs.map
