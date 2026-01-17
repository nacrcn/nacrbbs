import { _ as __nuxt_component_0 } from "./UserHeader-DU96A5FR.js";
import { a as useUserInfo, n as navigateTo } from "../server.mjs";
import { ref, resolveComponent, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { Button, Space } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/space/style/css.js";
import "@arco-design/web-vue/es/button/style/css.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import "E:/Cpenx/bbs/web/client/node_modules/klona/dist/index.mjs";
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
import "@arco-design/web-vue/es/icon/index.js";
import "@vueuse/core";
import "E:/Cpenx/bbs/web/client/node_modules/cookie-es/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/destr/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/ohash/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = {
  __name: "home",
  __ssrInlineRender: true,
  setup(__props) {
    const UserInfo = useUserInfo();
    const ActivityList = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UserHeader = __nuxt_component_0;
      const _component_a_button = Button;
      const _component_icon_pen_fill = resolveComponent("icon-pen-fill");
      const _component_a_space = Space;
      const _component_icon_safe = resolveComponent("icon-safe");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-a9281949><div data-v-a9281949>`);
      _push(ssrRenderComponent(_component_UserHeader, { title: "我的信息" }, null, _parent));
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
            _push2(` 修改资料 `);
          } else {
            return [
              createTextVNode(" 修改资料 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="Content" data-v-a9281949><div class="VipBox" data-v-a9281949><p class="VipBoxTitle" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo?.VipInfo?.n_name)}</p><p class="VipBoxConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo?.VipInfo?.n_deft == "1" ? "无期限" : unref(UserInfo).$state.UserInfo?.n_group_time + " 到期")}</p></div><div class="BanBox" data-v-a9281949><p class="BanBoxTitle" data-v-a9281949>我的积分</p><p class="BanBoxConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_points)}</p></div><div class="BanBox" data-v-a9281949><p class="BanBoxTitle" data-v-a9281949>我的余额</p><p class="BanBoxConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_balance)}</p><div data-v-a9281949>`);
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
                  _push3(` 充值 `);
                } else {
                  return [
                    createTextVNode(" 充值 ")
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
                  createTextVNode(" 充值 ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="Infobox" data-v-a9281949><div class="InfoItem" data-v-a9281949><span class="InfoItemTitle" data-v-a9281949>我的邮箱:</span><span class="InfoItemConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_username)}</span></div><div class="InfoItem" data-v-a9281949><span class="InfoItemTitle" data-v-a9281949>注册时间:</span><span class="InfoItemConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_registertime)}</span></div><div class="InfoItem" data-v-a9281949><span class="InfoItemTitle" data-v-a9281949>我的性别:</span><span class="InfoItemConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_gender === "1" ? "男" : "女")}</span></div><div class="InfoItem" data-v-a9281949><span class="InfoItemTitle" data-v-a9281949>我的编码:</span><span class="InfoItemConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_encoding)}</span></div><div class="InfoItem" data-v-a9281949><span class="InfoItemTitle" data-v-a9281949>联系电话:</span><span class="InfoItemConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_phone ?? "未设置")}</span></div><div class="InfoItem" data-v-a9281949><span class="InfoItemTitle" data-v-a9281949>我的QQ:</span><span class="InfoItemConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_qqnumber ?? "未设置")}</span></div><div class="InfoItem" data-v-a9281949><span class="InfoItemTitle" data-v-a9281949>我的微信:</span><span class="InfoItemConte" data-v-a9281949>${ssrInterpolate(unref(UserInfo).$state.UserInfo.n_wxnumber ?? "未设置")}</span></div></div><div class="ActiveBox" data-v-a9281949><!--[-->`);
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
              _push2(` ${ssrInterpolate(value.n_buttext || "查看详情")}`);
            } else {
              return [
                createTextVNode(" " + toDisplayString(value.n_buttext || "查看详情"), 1)
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
export {
  home as default
};
//# sourceMappingURL=home-DRQ12nYo.js.map
