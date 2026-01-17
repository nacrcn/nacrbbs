import { _ as __nuxt_component_0 } from './UserHeader-DU96A5FR.mjs';
import { a as useUserInfo, n as navigateTo } from './server.mjs';
import { ref, resolveComponent, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { Button, Space } from '@arco-design/web-vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
  __name: "home",
  __ssrInlineRender: true,
  setup(__props) {
    const UserInfo = useUserInfo();
    const ActivityList = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const _component_UserHeader = __nuxt_component_0;
      const _component_a_button = Button;
      const _component_icon_pen_fill = resolveComponent("icon-pen-fill");
      const _component_a_space = Space;
      const _component_icon_safe = resolveComponent("icon-safe");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-a9281949><div data-v-a9281949>`);
      _push(ssrRenderComponent(_component_UserHeader, { title: "\u6211\u7684\u4FE1\u606F" }, null, _parent));
      _push(`</div><div class="Page" data-v-a9281949><div class="Pagecontent" data-v-a9281949><div class="useravatar" data-v-a9281949><img${ssrRenderAttr("src", unref(UserInfo).$state.UserInfo.n_avatar)} data-v-a9281949></div><div class="userinfo" data-v-a9281949><p class="userinfoname" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_nickname)}</p><p class="usersignature" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_signature)}</p></div><div class="right-buttons" data-v-a9281949>`);
      _push(ssrRenderComponent(_component_a_button, {
        type: "primary",
        size: "small",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/editInfo")
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_icon_pen_fill, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_icon_pen_fill)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u4FEE\u6539\u8D44\u6599 `);
          } else {
            return [
              createTextVNode(" \u4FEE\u6539\u8D44\u6599 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="Content" data-v-a9281949><div class="VipBox" data-v-a9281949><p class="VipBoxTitle" data-v-a9281949>${ssrInterpolate((_b = (_a = unref(UserInfo).$state.UserInfo) == null ? void 0 : _a.VipInfo) == null ? void 0 : _b.n_name)}</p><p class="VipBoxConte" data-v-a9281949>${ssrInterpolate(((_d = (_c = unref(UserInfo).$state.UserInfo) == null ? void 0 : _c.VipInfo) == null ? void 0 : _d.n_deft) == "1" ? "\u65E0\u671F\u9650" : ((_e = unref(UserInfo).$state.UserInfo) == null ? void 0 : _e.n_group_time) + " \u5230\u671F")}</p></div><div class="BanBox" data-v-a9281949><p class="BanBoxTitle" data-v-a9281949>\u6211\u7684\u79EF\u5206</p><p class="BanBoxConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_points)}</p></div><div class="BanBox" data-v-a9281949><p class="BanBoxTitle" data-v-a9281949>\u6211\u7684\u4F59\u989D</p><p class="BanBoxConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_balance)}</p><div data-v-a9281949>`);
      _push(ssrRenderComponent(_component_a_space, { class: "BanBoxButtons" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_button, {
              type: "primary",
              size: "small",
              status: "success",
              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/topup")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_icon_safe, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_icon_safe)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` \u5145\u503C `);
                } else {
                  return [
                    createTextVNode(" \u5145\u503C ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_a_button, {
                type: "primary",
                size: "small",
                status: "success",
                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/topup")
              }, {
                icon: withCtx(() => [
                  createVNode(_component_icon_safe)
                ]),
                default: withCtx(() => [
                  createTextVNode(" \u5145\u503C ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="Infobox" data-v-a9281949><div class="InfoItem" data-v-a9281949><span class="InfoItemTitle" data-v-a9281949>\u6211\u7684\u90AE\u7BB1:</span><span class="InfoItemConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_username)}</span></div><div class="InfoItem" data-v-a9281949><span class="InfoItemTitle" data-v-a9281949>\u6CE8\u518C\u65F6\u95F4:</span><span class="InfoItemConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_registertime)}</span></div><div class="InfoItem" data-v-a9281949><span class="InfoItemTitle" data-v-a9281949>\u6211\u7684\u6027\u522B:</span><span class="InfoItemConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_gender === "1" ? "\u7537" : "\u5973")}</span></div><div class="InfoItem" data-v-a9281949><span class="InfoItemTitle" data-v-a9281949>\u6211\u7684\u7F16\u7801:</span><span class="InfoItemConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_encoding)}</span></div><div class="InfoItem" data-v-a9281949><span class="InfoItemTitle" data-v-a9281949>\u8054\u7CFB\u7535\u8BDD:</span><span class="InfoItemConte" data-v-a9281949>${ssrInterpolate((_f = unref(UserInfo).$state.UserInfo.n_phone) != null ? _f : "\u672A\u8BBE\u7F6E")}</span></div><div class="InfoItem" data-v-a9281949><span class="InfoItemTitle" data-v-a9281949>\u6211\u7684QQ:</span><span class="InfoItemConte" data-v-a9281949>${ssrInterpolate((_g = unref(UserInfo).$state.UserInfo.n_qqnumber) != null ? _g : "\u672A\u8BBE\u7F6E")}</span></div><div class="InfoItem" data-v-a9281949><span class="InfoItemTitle" data-v-a9281949>\u6211\u7684\u5FAE\u4FE1:</span><span class="InfoItemConte" data-v-a9281949>${ssrInterpolate((_h = unref(UserInfo).$state.UserInfo.n_wxnumber) != null ? _h : "\u672A\u8BBE\u7F6E")}</span></div></div><div class="ActiveBox" data-v-a9281949><!--[-->`);
      ssrRenderList(unref(ActivityList), (value) => {
        _push(`<div class="InfoItem" data-v-a9281949><img class="InfoItemIcon"${ssrRenderAttr("src", value.n_icon)} alt="" data-v-a9281949><div class="InfoItemContent" data-v-a9281949><p class="InfoItemTitle" data-v-a9281949>${ssrInterpolate(value.n_name)}</p><p class="InfoItemConte" data-v-a9281949>${ssrInterpolate(value.n_note)}</p></div>`);
        _push(ssrRenderComponent(_component_a_button, {
          class: "ActiveBoxBut",
          type: "primary",
          size: "small",
          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(value.n_path)
        }, {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_icon_safe, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_icon_safe)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ${ssrInterpolate(value.n_buttext || "\u67E5\u770B\u8BE6\u60C5")}`);
            } else {
              return [
                createTextVNode(" " + toDisplayString(value.n_buttext || "\u67E5\u770B\u8BE6\u60C5"), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/user/index/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a9281949"]]);

export { home as default };
//# sourceMappingURL=home-DRQ12nYo.mjs.map
