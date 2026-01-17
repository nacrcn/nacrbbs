import { _ as __nuxt_component_0 } from './NavBox-BpiS_7_K.mjs';
import { _ as __nuxt_component_1 } from './ItemA-JWPSvwj-.mjs';
import { _ as __nuxt_component_1$1 } from './CommentItem-CX0dfZ3t.mjs';
import { _ as __nuxt_component_3 } from './ClassItem-t4LUU3s9.mjs';
import { _ as __nuxt_component_3$1 } from './TopicItem-CJGfqylf.mjs';
import { Message, Button, Result, Pagination } from '@arco-design/web-vue';
import { ref, withAsyncContext, resolveComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, isRef, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { _ as _imports_0 } from './1-BLe-Ftx3.mjs';
import { c as useRoute, b as useSiteConfig, a as useUserInfo, e as useApiSsr, d as useApiFetch } from './server.mjs';
import { u as useSeoSet } from './useSeoSet-ri8aJ8nG.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './popupMob-OgSg-8hC.mjs';
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
import './v3-DUQAjvLz.mjs';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const id = route.params.id;
    const SiteConfig = useSiteConfig();
    const UserInfo = useUserInfo();
    const Users = ref({});
    const res = ([__temp, __restore] = withAsyncContext(() => useApiSsr("GetUser" + id, "/api/GetUser", {
      id
    })), __temp = await __temp, __restore(), __temp);
    if (res.code == 200) {
      Users.value = res.data;
    } else {
      Message.error(res.message || "\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25");
    }
    useSeoSet({
      title: Users.value.n_nickname + " - " + SiteConfig.$state.Config.n_web_title
    });
    const CategoryList = ref([]);
    const TopicList = ref([]);
    const ThreadsList = ref([]);
    const from = ref({
      page: 1,
      pagesize: 10,
      total: 0,
      uid: id
    });
    const GetThreads = async () => {
      try {
        const res2 = await useApiFetch().post("/api/GetThreads", from.value);
        if (res2.code == 200) {
          ThreadsList.value = res2.data;
          from.value.total = res2.total;
        } else {
          Message.error(res2.message || "\u83B7\u53D6\u6587\u7AE0\u5217\u8868\u5931\u8D25");
        }
      } catch (error) {
        Message.error(error.message);
      }
    };
    const GetCommentsFrom = ref({
      page: 1,
      pagesize: 20,
      uid: id,
      total: 0
    });
    const CommentList = ref([]);
    const GetCommentList = async () => {
      try {
        const res2 = await useApiFetch().post("/api/GetComments", GetCommentsFrom.value);
        if (res2.code == 200) {
          CommentList.value = res2.data;
          GetCommentsFrom.value.total = res2.total;
        } else {
          Message.error(res2.message || "\u83B7\u53D6\u8BC4\u8BBA\u5217\u8868\u5931\u8D25");
        }
      } catch (error) {
        Message.error(error.message);
      }
    };
    const ShowIndex = ref("1");
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_a_button = Button;
      const _component_NavBox = __nuxt_component_0;
      const _component_ItemA = __nuxt_component_1;
      const _component_a_result = Result;
      const _component_IconFaceSmileFill = resolveComponent("IconFaceSmileFill");
      const _component_a_pagination = Pagination;
      const _component_CommentItem = __nuxt_component_1$1;
      const _component_ClassItem = __nuxt_component_3;
      const _component_TopicItem = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "Pageas" }, _attrs))} data-v-5a7ea233><div class="PageContent" data-v-5a7ea233><div class="UserInfo" data-v-5a7ea233><div class="TopBox" data-v-5a7ea233><div class="TopBoxbACS" style="${ssrRenderStyle({
        backgroundImage: `url(${unref(Users).n_userback || "/default-banner.jpg"})`
      })}" data-v-5a7ea233><div class="BackgroundImage" data-v-5a7ea233></div></div><div class="UserInfoBox" data-v-5a7ea233><div class="TInfo" data-v-5a7ea233><div class="n_avatar" data-v-5a7ea233><img${ssrRenderAttr("src", unref(Users).n_avatar)} alt="" data-v-5a7ea233></div><div class="UserInfos" data-v-5a7ea233><p class="nickname" data-v-5a7ea233>${ssrInterpolate(unref(Users).n_nickname)}</p><p class="signature" data-v-5a7ea233>${ssrInterpolate(unref(Users).n_signature)}</p>`);
      if (((_a = unref(UserInfo).$state.UserInfo) == null ? void 0 : _a.id) !== unref(Users).id) {
        _push(`<div class="Follow" data-v-5a7ea233>`);
        _push(ssrRenderComponent(_component_a_button, {
          loading: _ctx.loading,
          onClick: ($event) => _ctx.LikeUser(),
          class: ["FollowBtn", { "Close": unref(Users).isLiked }],
          type: "primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(Users).isLiked ? "\u53D6\u6D88\u5173\u6CE8" : "\u5173\u6CE8")}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(Users).isLiked ? "\u53D6\u6D88\u5173\u6CE8" : "\u5173\u6CE8"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="stats" data-v-5a7ea233><div class="Item" data-v-5a7ea233><p class="Value" data-v-5a7ea233>${ssrInterpolate(((_b = unref(Users)) == null ? void 0 : _b.posts) || 0)}</p><p class="Label" data-v-5a7ea233>\u53D1\u5E16\u6570</p></div><div class="Item" data-v-5a7ea233><p class="Value" data-v-5a7ea233>${ssrInterpolate(((_c = unref(Users)) == null ? void 0 : _c.n_comment) || 0)}</p><p class="Label" data-v-5a7ea233>\u8BC4\u8BBA\u6570</p></div><div class="Item" data-v-5a7ea233><p class="Value" data-v-5a7ea233>${ssrInterpolate(((_d = unref(Users)) == null ? void 0 : _d.followers) || 0)}</p><p class="Label" data-v-5a7ea233>\u7C89\u4E1D\u6570</p></div><div class="Item" data-v-5a7ea233><p class="Value" data-v-5a7ea233>${ssrInterpolate(((_e = unref(Users)) == null ? void 0 : _e.following) || 0)}</p><p class="Label" data-v-5a7ea233>\u5173\u6CE8\u6570</p></div></div></div></div><div class="NavBox" data-v-5a7ea233>`);
      _push(ssrRenderComponent(_component_NavBox, {
        Item: [
          {
            value: "1",
            name: "\u4ED6\u7684\u5E16\u5B50"
          },
          {
            value: "2",
            name: "\u4ED6\u7684\u8BC4\u8BBA"
          }
        ],
        modelValue: unref(ShowIndex),
        "onUpdate:modelValue": ($event) => isRef(ShowIndex) ? ShowIndex.value = $event : null
      }, null, _parent));
      _push(`</div>`);
      if (unref(ShowIndex) === "1") {
        _push(`<div data-v-5a7ea233><div class="content-box" data-v-5a7ea233><!--[-->`);
        ssrRenderList(unref(ThreadsList), (value) => {
          _push(ssrRenderComponent(_component_ItemA, {
            key: value.id,
            data: value
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
        if (unref(ThreadsList).length == 0) {
          _push(`<div class="Isno" style="${ssrRenderStyle({ "width": "100%", "background-color": "#fff", "border-radius": "10px" })}" data-v-5a7ea233>`);
          _push(ssrRenderComponent(_component_a_result, {
            status: null,
            title: "\u65E0\u5185\u5BB9",
            subtitle: "\u54CE\u5440\uFF0C\u6CA1\u6709\u5185\u5BB9\u4E86"
          }, {
            icon: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_IconFaceSmileFill, null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_IconFaceSmileFill)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="PageNav" data-v-5a7ea233>`);
        _push(ssrRenderComponent(_component_a_pagination, {
          onChange: GetThreads,
          onPageSizeChange: GetThreads,
          current: unref(from).page,
          "onUpdate:current": ($event) => unref(from).page = $event,
          pageSize: unref(from).pagesize,
          "onUpdate:pageSize": ($event) => unref(from).pagesize = $event,
          total: unref(from).total,
          size: "mini",
          "show-total": ""
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(ShowIndex) === "2") {
        _push(`<div data-v-5a7ea233><div class="content-box" data-v-5a7ea233><!--[-->`);
        ssrRenderList(unref(CommentList), (value) => {
          _push(ssrRenderComponent(_component_CommentItem, {
            key: value.id,
            data: value,
            onReload: GetCommentList
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
        if (unref(CommentList).length == 0) {
          _push(`<div class="Isno" style="${ssrRenderStyle({ "width": "100%", "background-color": "#fff", "border-radius": "10px" })}" data-v-5a7ea233>`);
          _push(ssrRenderComponent(_component_a_result, {
            status: null,
            title: "\u65E0\u5185\u5BB9",
            subtitle: "\u54CE\u5440\uFF0C\u6CA1\u6709\u5185\u5BB9\u4E86"
          }, {
            icon: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_IconFaceSmileFill, null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_IconFaceSmileFill)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="PageNav" data-v-5a7ea233>`);
        _push(ssrRenderComponent(_component_a_pagination, {
          onChange: GetCommentList,
          onPageSizeChange: GetCommentList,
          current: unref(GetCommentsFrom).page,
          "onUpdate:current": ($event) => unref(GetCommentsFrom).page = $event,
          pageSize: unref(GetCommentsFrom).pagesize,
          "onUpdate:pageSize": ($event) => unref(GetCommentsFrom).pagesize = $event,
          total: unref(GetCommentsFrom).total,
          size: "mini",
          "show-total": ""
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="Right" data-v-5a7ea233><div class="NavBar" data-v-5a7ea233><div class="title" data-v-5a7ea233><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-5a7ea233><span data-v-5a7ea233>\u70ED\u95E8\u5708\u5B50</span></div><!--[-->`);
      ssrRenderList(unref(CategoryList), (value) => {
        _push(ssrRenderComponent(_component_ClassItem, {
          key: value.n_name,
          data: value
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="NavBar" data-v-5a7ea233><div class="title" data-v-5a7ea233><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-5a7ea233><span data-v-5a7ea233>\u70ED\u95E8\u8BDD\u9898</span></div><!--[-->`);
      ssrRenderList(unref(TopicList), (value) => {
        _push(ssrRenderComponent(_component_TopicItem, {
          key: value.n_name,
          data: value
        }, null, _parent));
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/index/upinfo/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5a7ea233"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DKZQsXYX.mjs.map
