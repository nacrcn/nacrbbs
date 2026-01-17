import { _ as __nuxt_component_0 } from "./NavBox-BpiS_7_K.js";
import { _ as __nuxt_component_1 } from "./ItemA-JWPSvwj-.js";
import { _ as __nuxt_component_1$1 } from "./CommentItem-CX0dfZ3t.js";
import { _ as __nuxt_component_3 } from "./ClassItem-t4LUU3s9.js";
import { _ as __nuxt_component_3$1 } from "./TopicItem-CJGfqylf.js";
import { Message, Button, Result, Pagination } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/pagination/style/css.js";
import "@arco-design/web-vue/es/result/style/css.js";
import "@arco-design/web-vue/es/button/style/css.js";
import { ref, withAsyncContext, resolveComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, isRef, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _imports_0 } from "./1-BLe-Ftx3.js";
import { c as useRoute, b as useSiteConfig, a as useUserInfo, e as useApiSsr, d as useApiFetch } from "../server.mjs";
import { u as useSeoSet } from "./useSeoSet-ri8aJ8nG.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./popupMob-OgSg-8hC.js";
import "@arco-design/web-vue/es/textarea/style/css.js";
import "@arco-design/web-vue/es/form/style/css.js";
import "@arco-design/web-vue/es/popconfirm/style/css.js";
import "@arco-design/web-vue/es/space/style/css.js";
import "@arco-design/web-vue/es/tag/style/css.js";
import "E:/Cpenx/bbs/web/client/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "E:/Cpenx/bbs/web/client/node_modules/hookable/dist/index.mjs";
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
      Message.error(res.message || "获取用户信息失败");
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
          Message.error(res2.message || "获取文章列表失败");
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
          Message.error(res2.message || "获取评论列表失败");
        }
      } catch (error) {
        Message.error(error.message);
      }
    };
    const ShowIndex = ref("1");
    return (_ctx, _push, _parent, _attrs) => {
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
      if (unref(UserInfo).$state.UserInfo?.id !== unref(Users).id) {
        _push(`<div class="Follow" data-v-5a7ea233>`);
        _push(ssrRenderComponent(_component_a_button, {
          loading: _ctx.loading,
          onClick: ($event) => _ctx.LikeUser(),
          class: ["FollowBtn", { "Close": unref(Users).isLiked }],
          type: "primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(Users).isLiked ? "取消关注" : "关注")}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(Users).isLiked ? "取消关注" : "关注"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="stats" data-v-5a7ea233><div class="Item" data-v-5a7ea233><p class="Value" data-v-5a7ea233>${ssrInterpolate(unref(Users)?.posts || 0)}</p><p class="Label" data-v-5a7ea233>发帖数</p></div><div class="Item" data-v-5a7ea233><p class="Value" data-v-5a7ea233>${ssrInterpolate(unref(Users)?.n_comment || 0)}</p><p class="Label" data-v-5a7ea233>评论数</p></div><div class="Item" data-v-5a7ea233><p class="Value" data-v-5a7ea233>${ssrInterpolate(unref(Users)?.followers || 0)}</p><p class="Label" data-v-5a7ea233>粉丝数</p></div><div class="Item" data-v-5a7ea233><p class="Value" data-v-5a7ea233>${ssrInterpolate(unref(Users)?.following || 0)}</p><p class="Label" data-v-5a7ea233>关注数</p></div></div></div></div><div class="NavBox" data-v-5a7ea233>`);
      _push(ssrRenderComponent(_component_NavBox, {
        Item: [
          {
            value: "1",
            name: "他的帖子"
          },
          {
            value: "2",
            name: "他的评论"
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
            title: "无内容",
            subtitle: "哎呀，没有内容了"
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
            title: "无内容",
            subtitle: "哎呀，没有内容了"
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
      _push(`</div><div class="Right" data-v-5a7ea233><div class="NavBar" data-v-5a7ea233><div class="title" data-v-5a7ea233><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-5a7ea233><span data-v-5a7ea233>热门圈子</span></div><!--[-->`);
      ssrRenderList(unref(CategoryList), (value) => {
        _push(ssrRenderComponent(_component_ClassItem, {
          key: value.n_name,
          data: value
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="NavBar" data-v-5a7ea233><div class="title" data-v-5a7ea233><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-5a7ea233><span data-v-5a7ea233>热门话题</span></div><!--[-->`);
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
export {
  _id_ as default
};
//# sourceMappingURL=_id_-DKZQsXYX.js.map
