import { _ as __nuxt_component_0 } from "./nuxt-link-BlOL6H2m.js";
import { a as useUserInfo, b as useSiteConfig, _ as __nuxt_component_1 } from "../server.mjs";
import { _ as _imports_0, a as __nuxt_component_2 } from "./logo-Cu0czp98.js";
import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import "E:/Cpenx/bbs/web/client/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "E:/Cpenx/bbs/web/client/node_modules/ufo/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "E:/Cpenx/bbs/web/client/node_modules/unctx/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/h3/dist/index.mjs";
import "pinia";
import "E:/Cpenx/bbs/web/client/node_modules/defu/dist/defu.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/radix3/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/klona/dist/index.mjs";
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
    const UserInfo = useUserInfo();
    UserInfo.init();
    const SiteConfig = useSiteConfig();
    const MobShow = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      const _component_Tabbar = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-3a711b90><div class="bg-decoration" data-v-3a711b90><div class="circle circle-1" data-v-3a711b90></div><div class="circle circle-2" data-v-3a711b90></div><div class="circle circle-3" data-v-3a711b90></div></div><div class="layout" data-v-3a711b90><div class="headerBox" data-v-3a711b90><div class="header" data-v-3a711b90><div class="menu-btn" data-v-3a711b90><span data-v-3a711b90></span><span data-v-3a711b90></span><span data-v-3a711b90></span></div><img class="logo"${ssrRenderAttr("src", unref(SiteConfig).$state.Config.n_web_logo)} alt="" data-v-3a711b90><div class="NavBox" data-v-3a711b90>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`首页`);
          } else {
            return [
              createTextVNode("首页")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="user" data-v-3a711b90><img class="avatar"${ssrRenderAttr("src", unref(UserInfo).$state.UserInfo?.n_avatar)} alt="" data-v-3a711b90><span class="nickname" data-v-3a711b90>${ssrInterpolate(unref(UserInfo).$state.UserInfo?.n_nickname)}</span></div></div><div class="${ssrRenderClass([{ "show": unref(MobShow) }, "sidebar"])}" data-v-3a711b90><div class="sidebar-content" data-v-3a711b90><img class="logo"${ssrRenderAttr("src", _imports_0)} alt="" data-v-3a711b90><div class="sidebar-close" data-v-3a711b90><span data-v-3a711b90></span><span data-v-3a711b90></span></div><div class="sidebar-nav" data-v-3a711b90>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "sidebar-link",
        to: "/",
        onClick: ($event) => MobShow.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`首页`);
          } else {
            return [
              createTextVNode("首页")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      if (unref(MobShow)) {
        _push(`<div class="sidebar-overlay" style="${ssrRenderStyle({
          opacity: unref(MobShow) ? 0.5 : 0
        })}" data-v-3a711b90></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="page-container" data-v-3a711b90><div class="main-content" data-v-3a711b90><div class="content" data-v-3a711b90>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Tabbar, null, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3a711b90"]]);
export {
  index as default
};
//# sourceMappingURL=index-DrgsVNit.js.map
