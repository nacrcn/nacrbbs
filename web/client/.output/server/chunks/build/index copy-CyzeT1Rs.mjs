import { _ as __nuxt_component_0 } from './nuxt-link-BlOL6H2m.mjs';
import { a as useUserInfo, _ as __nuxt_component_1 } from './server.mjs';
import { _ as _imports_0, a as __nuxt_component_2 } from './logo-Cu0czp98.mjs';
import { Space, Badge, Button } from '@arco-design/web-vue';
import { ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "index copy",
  __ssrInlineRender: true,
  setup(__props) {
    const UserInfo = useUserInfo();
    UserInfo.init();
    const MobShow = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_a_space = Space;
      const _component_a_badge = Badge;
      const _component_a_button = Button;
      const _component_icon_message = resolveComponent("icon-message");
      const _component_NuxtPage = __nuxt_component_1;
      const _component_Tabbar = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-3dc951f8><div class="bg-decoration" data-v-3dc951f8><div class="circle circle-1" data-v-3dc951f8></div><div class="circle circle-2" data-v-3dc951f8></div><div class="circle circle-3" data-v-3dc951f8></div></div><div class="layout" data-v-3dc951f8><div class="headerBox" data-v-3dc951f8><div class="header" data-v-3dc951f8><div class="menu-btn" data-v-3dc951f8><span data-v-3dc951f8></span><span data-v-3dc951f8></span><span data-v-3dc951f8></span></div><img class="logo"${ssrRenderAttr("src", _imports_0)} alt="" data-v-3dc951f8><div class="NavBox" data-v-3dc951f8>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u9996\u9875`);
          } else {
            return [
              createTextVNode("\u9996\u9875")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="Icon" data-v-3dc951f8>`);
      _push(ssrRenderComponent(_component_a_space, { size: 20 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_badge, { count: 9 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_button, { shape: "circle" }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_icon_message, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_icon_message)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_button, { shape: "circle" }, {
                      icon: withCtx(() => [
                        createVNode(_component_icon_message)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_a_badge, { count: 9 }, {
                default: withCtx(() => [
                  createVNode(_component_a_button, { shape: "circle" }, {
                    icon: withCtx(() => [
                      createVNode(_component_icon_message)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="user" data-v-3dc951f8><img class="avatar"${ssrRenderAttr("src", (_a = unref(UserInfo).$state.UserInfo) == null ? void 0 : _a.n_avatar)} alt="" data-v-3dc951f8><span class="nickname" data-v-3dc951f8>${ssrInterpolate((_b = unref(UserInfo).$state.UserInfo) == null ? void 0 : _b.n_nickname)}</span></div></div><div class="${ssrRenderClass([{ "show": unref(MobShow) }, "sidebar"])}" data-v-3dc951f8><div class="sidebar-content" data-v-3dc951f8><img class="logo"${ssrRenderAttr("src", _imports_0)} alt="" data-v-3dc951f8><div class="sidebar-close" data-v-3dc951f8><span data-v-3dc951f8></span><span data-v-3dc951f8></span></div><div class="sidebar-nav" data-v-3dc951f8>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "sidebar-link",
        to: "/",
        onClick: ($event) => MobShow.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u9996\u9875`);
          } else {
            return [
              createTextVNode("\u9996\u9875")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      if (unref(MobShow)) {
        _push(`<div class="sidebar-overlay" style="${ssrRenderStyle({
          opacity: unref(MobShow) ? 0.5 : 0
        })}" data-v-3dc951f8></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="page-container" data-v-3dc951f8><div class="main-content" data-v-3dc951f8><div class="content" data-v-3dc951f8>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index copy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index_copy = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3dc951f8"]]);

export { index_copy as default };
//# sourceMappingURL=index copy-CyzeT1Rs.mjs.map
