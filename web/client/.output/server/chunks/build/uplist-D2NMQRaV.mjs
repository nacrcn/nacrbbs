import { _ as __nuxt_component_2 } from './UserBox-CKrUnuZ_.mjs';
import { _ as __nuxt_component_3 } from './ClassItem-t4LUU3s9.mjs';
import { _ as __nuxt_component_3$1 } from './TopicItem-CJGfqylf.mjs';
import { n as navigateTo, d as useApiFetch } from './server.mjs';
import { ref, resolveComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { Input, Button, Result, Pagination } from '@arco-design/web-vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './1-BLe-Ftx3.mjs';
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
          Message.error(res.message || "\u83B7\u53D6\u6587\u7AE0\u5217\u8868\u5931\u8D25");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "MainBox" }, _attrs))} data-v-6bff154b><div class="MainContent" data-v-6bff154b><div class="TopB" data-v-6bff154b><div class="title" data-v-6bff154b><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-6bff154b><span data-v-6bff154b>\u70ED\u95E8UP\u4E3B \u8C01\u7684\u6700\u7231</span></div><div class="TopBox" data-v-6bff154b>`);
      _push(ssrRenderComponent(_component_a_input, {
        class: "search-input",
        modelValue: from.value.search,
        "onUpdate:modelValue": ($event) => from.value.search = $event,
        placeholder: "UP\u4E3B\u6635\u79F0",
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
            _push2(`\u641C\u4E00\u4E0B`);
          } else {
            return [
              createTextVNode("\u641C\u4E00\u4E0B")
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
      _push(`</div></div><div class="SidebarRight" data-v-6bff154b><div class="NavBar" data-v-6bff154b><div class="title" data-v-6bff154b><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-6bff154b><span data-v-6bff154b>\u70ED\u95E8\u5708\u5B50</span></div><!--[-->`);
      ssrRenderList(CategoryList.value, (value) => {
        _push(ssrRenderComponent(_component_ClassItem, {
          key: value.n_name,
          data: value
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="NavBar" data-v-6bff154b><div class="title" data-v-6bff154b><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-6bff154b><span data-v-6bff154b>\u70ED\u95E8\u8BDD\u9898</span></div><!--[-->`);
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

export { uplist as default };
//# sourceMappingURL=uplist-D2NMQRaV.mjs.map
