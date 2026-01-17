import { _ as __nuxt_component_2 } from "./UserBox-CKrUnuZ_.js";
import { _ as __nuxt_component_3 } from "./ClassItem-t4LUU3s9.js";
import { _ as __nuxt_component_3$1 } from "./TopicItem-CJGfqylf.js";
import { n as navigateTo, d as useApiFetch } from "../server.mjs";
import { ref, resolveComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from "vue";
import { Input, Button, Result, Pagination } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/pagination/style/css.js";
import "@arco-design/web-vue/es/result/style/css.js";
import "@arco-design/web-vue/es/button/style/css.js";
import "@arco-design/web-vue/es/input/style/css.js";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { _ as _imports_0 } from "./1-BLe-Ftx3.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
  __name: "uplist",
  __ssrInlineRender: true,
  setup(__props) {
    const CategoryList = ref([]);
    const TopicList = ref([]);
    const ThreadsList = ref([]);
    const from = ref({
      page: 1,
      pagesize: 10,
      total: 0,
      search: ""
    });
    const GetThreads = async () => {
      try {
        const res = await useApiFetch().post("/api/GetUser", from.value);
        if (res.code == 200) {
          ThreadsList.value = res.data;
          from.value.total = res.total;
        } else {
          Message.error(res.message || "获取文章列表失败");
        }
      } catch (error) {
        Message.error(error.message);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_input = Input;
      const _component_icon_search = resolveComponent("icon-search");
      const _component_a_button = Button;
      const _component_icon_send = resolveComponent("icon-send");
      const _component_UserBox = __nuxt_component_2;
      const _component_a_result = Result;
      const _component_IconFaceSmileFill = resolveComponent("IconFaceSmileFill");
      const _component_a_pagination = Pagination;
      const _component_ClassItem = __nuxt_component_3;
      const _component_TopicItem = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "MainBox" }, _attrs))} data-v-6bff154b><div class="MainContent" data-v-6bff154b><div class="TopB" data-v-6bff154b><div class="title" data-v-6bff154b><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-6bff154b><span data-v-6bff154b>热门UP主 谁的最爱</span></div><div class="TopBox" data-v-6bff154b>`);
      _push(ssrRenderComponent(_component_a_input, {
        class: "search-input",
        modelValue: from.value.search,
        "onUpdate:modelValue": ($event) => from.value.search = $event,
        placeholder: "UP主昵称",
        "allow-clear": ""
      }, {
        prefix: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_icon_search, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_icon_search)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_a_button, {
        type: "primary",
        class: "send-btn",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/add")
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_icon_send, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_icon_send)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`搜一下`);
          } else {
            return [
              createTextVNode("搜一下")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="content-box" data-v-6bff154b><!--[-->`);
      ssrRenderList(ThreadsList.value, (value) => {
        _push(ssrRenderComponent(_component_UserBox, {
          key: value.id,
          info: value
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
      if (ThreadsList.value.length == 0) {
        _push(`<div class="Isno" style="${ssrRenderStyle({ "width": "100%", "background-color": "#fff", "border-radius": "10px" })}" data-v-6bff154b>`);
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
      _push(`<div class="PageNav" data-v-6bff154b>`);
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
      _push(`</div></div><div class="SidebarRight" data-v-6bff154b><div class="NavBar" data-v-6bff154b><div class="title" data-v-6bff154b><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-6bff154b><span data-v-6bff154b>热门圈子</span></div><!--[-->`);
      ssrRenderList(CategoryList.value, (value) => {
        _push(ssrRenderComponent(_component_ClassItem, {
          key: value.n_name,
          data: value
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="NavBar" data-v-6bff154b><div class="title" data-v-6bff154b><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-6bff154b><span data-v-6bff154b>热门话题</span></div><!--[-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/index/uplist.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const uplist = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6bff154b"]]);
export {
  uplist as default
};
//# sourceMappingURL=uplist-D2NMQRaV.js.map
