import { _ as __nuxt_component_1 } from "./ItemA-JWPSvwj-.js";
import { _ as __nuxt_component_3 } from "./TopicItem-CJGfqylf.js";
import { Space, Button, Result, Pagination } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/pagination/style/css.js";
import "@arco-design/web-vue/es/result/style/css.js";
import "@arco-design/web-vue/es/button/style/css.js";
import "@arco-design/web-vue/es/space/style/css.js";
import { ref, withAsyncContext, resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { _ as _imports_0 } from "./1-BLe-Ftx3.js";
import { c as useRoute, e as useApiSsr, n as navigateTo, d as useApiFetch } from "../server.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./popupMob-OgSg-8hC.js";
import "@arco-design/web-vue/es/textarea/style/css.js";
import "@arco-design/web-vue/es/form/style/css.js";
import "@arco-design/web-vue/es/popconfirm/style/css.js";
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
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const id = route.params.id;
    const active = ref(1);
    const Info = ref({});
    const res = ([__temp, __restore] = withAsyncContext(() => useApiSsr("GetCategoryInfo" + id, "/api/GetCategory", {
      id
    })), __temp = await __temp, __restore(), __temp);
    if (res.code === 200) {
      Info.value = res.data;
    } else {
      navigateTo("/tools/error");
    }
    const ThreadsList = ref([]);
    const from = ref({
      page: 1,
      pagesize: 10,
      total: 0,
      cidt: id
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
    const TopicList = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_space = Space;
      const _component_a_button = Button;
      const _component_icon_more = resolveComponent("icon-more");
      const _component_ItemA = __nuxt_component_1;
      const _component_a_result = Result;
      const _component_IconFaceSmileFill = resolveComponent("IconFaceSmileFill");
      const _component_a_pagination = Pagination;
      const _component_TopicItem = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "MainBox" }, _attrs))} data-v-b608d8a0><div class="Left" data-v-b608d8a0><div class="MainContent" style="${ssrRenderStyle({
        backgroundImage: `url(${Info.value.n_icon || "/default-banner.jpg"})`
      })}" data-v-b608d8a0><div class="ThreadInfo" data-v-b608d8a0><div class="TopBoxbACS" data-v-b608d8a0></div><div class="TopBox" data-v-b608d8a0><div class="Icon" data-v-b608d8a0><img${ssrRenderAttr("src", Info.value.n_icon)} alt="" data-v-b608d8a0></div><div class="Info" data-v-b608d8a0><h1 data-v-b608d8a0>${ssrInterpolate(Info.value.n_name)}</h1><p data-v-b608d8a0>${ssrInterpolate(Info.value.n_note)}</p>`);
      _push(ssrRenderComponent(_component_a_space, {
        wrap: "",
        class: "Category"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="Tag" data-v-b608d8a0${_scopeId}><span data-v-b608d8a0${_scopeId}>贴子：${ssrInterpolate(Info.value.n_threads)}</span></div><div class="Tag" data-v-b608d8a0${_scopeId}><span data-v-b608d8a0${_scopeId}>热度：${ssrInterpolate(Info.value.n_hotnum)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "Tag" }, [
                createVNode("span", null, "贴子：" + toDisplayString(Info.value.n_threads), 1)
              ]),
              createVNode("div", { class: "Tag" }, [
                createVNode("span", null, "热度：" + toDisplayString(Info.value.n_hotnum), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="ButtonSection" data-v-b608d8a0>`);
      _push(ssrRenderComponent(_component_a_button, null, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_icon_more, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_icon_more)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="NavLisbox" data-v-b608d8a0><div class="${ssrRenderClass(["Item", { active: active.value === 1 }])}" data-v-b608d8a0><span data-v-b608d8a0>最新帖子</span></div><div class="${ssrRenderClass(["Item", { active: active.value === 2 }])}" data-v-b608d8a0><span data-v-b608d8a0>热门帖子</span></div><div class="${ssrRenderClass(["Item", { active: active.value === 3 }])}" data-v-b608d8a0><span data-v-b608d8a0>图片</span></div><div class="${ssrRenderClass(["Item", { active: active.value === 4 }])}" data-v-b608d8a0><span data-v-b608d8a0>视频</span></div><div class="${ssrRenderClass(["Item", { active: active.value === 5 }])}" data-v-b608d8a0><span data-v-b608d8a0>悬赏贴</span></div></div><div class="threads" data-v-b608d8a0><div class="content-box" data-v-b608d8a0><!--[-->`);
      ssrRenderList(ThreadsList.value, (value) => {
        _push(ssrRenderComponent(_component_ItemA, {
          key: value.id,
          data: value
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
      if (ThreadsList.value.length == 0) {
        _push(`<div class="Isno" style="${ssrRenderStyle({ "width": "100%", "background-color": "#fff", "border-radius": "10px" })}" data-v-b608d8a0>`);
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
      _push(`<div class="PageNav" data-v-b608d8a0>`);
      _push(ssrRenderComponent(_component_a_pagination, {
        onChange: GetThreads,
        onPageSizeChange: GetThreads,
        current: from.value.page,
        "onUpdate:current": ($event) => from.value.page = $event,
        pageSize: from.value.pagesize,
        "onUpdate:pageSize": ($event) => from.value.pagesize = $event,
        total: from.value.total,
        size: "mini",
        "show-total": ""
      }, null, _parent));
      _push(`</div></div></div><div class="Right" data-v-b608d8a0><div class="UserInfo" data-v-b608d8a0></div><div class="NavBar" data-v-b608d8a0><div class="title" data-v-b608d8a0><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-b608d8a0><span data-v-b608d8a0>热门话题</span></div><!--[-->`);
      ssrRenderList(TopicList.value, (value) => {
        _push(ssrRenderComponent(_component_TopicItem, {
          key: value.n_name,
          data: value
        }, null, _parent));
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/index/topic/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b608d8a0"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-BQi9rAX6.js.map
