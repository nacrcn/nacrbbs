import { b as useSiteConfig, _ as __nuxt_component_1 } from "../server.mjs";
import { ref, resolveComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { u as useSeoSet } from "./useSeoSet-ri8aJ8nG.js";
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
import "E:/Cpenx/bbs/web/client/node_modules/klona/dist/index.mjs";
import "@arco-design/web-vue/es/icon/index.js";
import "@vueuse/core";
import "E:/Cpenx/bbs/web/client/node_modules/cookie-es/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/destr/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/ohash/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/perfect-debounce/dist/index.mjs";
import "./v3-DUQAjvLz.js";
import "E:/Cpenx/bbs/web/client/node_modules/@unhead/vue/dist/index.mjs";
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
      _push(`<p data-v-a7bfde19>我的关注</p></div><div class="${ssrRenderClass(["Item", { active: unref(IndexShow) === 2 }])}" data-v-a7bfde19>`);
      _push(ssrRenderComponent(_component_icon_fire, { class: "icon" }, null, _parent));
      _push(`<p data-v-a7bfde19>热门瓜子</p></div><div class="${ssrRenderClass(["Item", { active: unref(IndexShow) === 3 }])}" data-v-a7bfde19>`);
      _push(ssrRenderComponent(_component_icon_branch, { class: "icon" }, null, _parent));
      _push(`<p data-v-a7bfde19>热门圈子</p></div><div class="${ssrRenderClass(["Item", { active: unref(IndexShow) === 4 }])}" data-v-a7bfde19>`);
      _push(ssrRenderComponent(_component_icon_image, { class: "icon" }, null, _parent));
      _push(`<p data-v-a7bfde19>视频图片</p></div><div class="${ssrRenderClass(["Item", { active: unref(IndexShow) === 6 }])}" data-v-a7bfde19>`);
      _push(ssrRenderComponent(_component_icon_user, { class: "icon" }, null, _parent));
      _push(`<p data-v-a7bfde19>热门UP主</p></div></div></div><div class="Content" data-v-a7bfde19>`);
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
export {
  index as default
};
//# sourceMappingURL=index-CrRxqD7m.js.map
