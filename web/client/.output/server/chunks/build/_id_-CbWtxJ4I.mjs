import { _ as __nuxt_component_1 } from './ItemA-JWPSvwj-.mjs';
import { _ as __nuxt_component_3 } from './TopicItem-CJGfqylf.mjs';
import { Space, Button, Result, Pagination } from '@arco-design/web-vue';
import { ref, withAsyncContext, resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { _ as _imports_0 } from './1-BLe-Ftx3.mjs';
import { c as useRoute, e as useApiSsr, n as navigateTo, d as useApiFetch } from './server.mjs';
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
      cid: id
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "MainBox" }, _attrs))} data-v-0def1bb4><div class="Left" data-v-0def1bb4><div class="MainContent" style="${ssrRenderStyle({
        backgroundImage: `url(${Info.value.n_icon || "/default-banner.jpg"})`
      })}" data-v-0def1bb4><div class="ThreadInfo" data-v-0def1bb4><div class="TopBoxbACS" data-v-0def1bb4></div><div class="TopBox" data-v-0def1bb4><div class="Icon" data-v-0def1bb4><img${ssrRenderAttr("src", Info.value.n_icon)} alt="" data-v-0def1bb4></div><div class="Info" data-v-0def1bb4><h1 data-v-0def1bb4>${ssrInterpolate(Info.value.n_name)}</h1><p data-v-0def1bb4>${ssrInterpolate(Info.value.n_note)}</p>`);
      _push(ssrRenderComponent(_component_a_space, {
        wrap: "",
        class: "Category"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="Tag" data-v-0def1bb4${_scopeId}><span data-v-0def1bb4${_scopeId}>\u8D34\u5B50\uFF1A${ssrInterpolate(Info.value.n_threads)}</span></div><div class="Tag" data-v-0def1bb4${_scopeId}><span data-v-0def1bb4${_scopeId}>\u70ED\u5EA6\uFF1A${ssrInterpolate(Info.value.n_hotnum)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "Tag" }, [
                createVNode("span", null, "\u8D34\u5B50\uFF1A" + toDisplayString(Info.value.n_threads), 1)
              ]),
              createVNode("div", { class: "Tag" }, [
                createVNode("span", null, "\u70ED\u5EA6\uFF1A" + toDisplayString(Info.value.n_hotnum), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="ButtonSection" data-v-0def1bb4>`);
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
      _push(`</div></div></div><div class="NavLisbox" data-v-0def1bb4><div class="${ssrRenderClass(["Item", { active: active.value === 1 }])}" data-v-0def1bb4><span data-v-0def1bb4>\u6700\u65B0\u5E16\u5B50</span></div><div class="${ssrRenderClass(["Item", { active: active.value === 2 }])}" data-v-0def1bb4><span data-v-0def1bb4>\u70ED\u95E8\u5E16\u5B50</span></div><div class="${ssrRenderClass(["Item", { active: active.value === 3 }])}" data-v-0def1bb4><span data-v-0def1bb4>\u56FE\u7247</span></div><div class="${ssrRenderClass(["Item", { active: active.value === 4 }])}" data-v-0def1bb4><span data-v-0def1bb4>\u89C6\u9891</span></div><div class="${ssrRenderClass(["Item", { active: active.value === 5 }])}" data-v-0def1bb4><span data-v-0def1bb4>\u60AC\u8D4F\u8D34</span></div></div><div class="threads" data-v-0def1bb4><div class="content-box" data-v-0def1bb4><!--[-->`);
      ssrRenderList(ThreadsList.value, (value) => {
        _push(ssrRenderComponent(_component_ItemA, {
          key: value.id,
          data: value
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
      if (ThreadsList.value.length == 0) {
        _push(`<div class="Isno" style="${ssrRenderStyle({ "width": "100%", "background-color": "#fff", "border-radius": "10px" })}" data-v-0def1bb4>`);
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
      _push(`<div class="PageNav" data-v-0def1bb4>`);
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
      _push(`</div></div></div><div class="Right" data-v-0def1bb4><div class="UserInfo" data-v-0def1bb4></div><div class="NavBar" data-v-0def1bb4><div class="title" data-v-0def1bb4><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-0def1bb4><span data-v-0def1bb4>\u70ED\u95E8\u8BDD\u9898</span></div><!--[-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/index/plate/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0def1bb4"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CbWtxJ4I.mjs.map
