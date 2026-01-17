import { _ as _sfc_main$1 } from './RichHtml-D2DY6Q4b.mjs';
import { ref, withAsyncContext, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { Message } from '@arco-design/web-vue';
import { c as useRoute, b as useSiteConfig, d as useApiFetch } from './server.mjs';
import { u as useSeoSet } from './useSeoSet-ri8aJ8nG.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'highlight.js';
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
import './v3-DUQAjvLz.mjs';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const id = route.params.id;
    const SiteConfig = useSiteConfig();
    const Info = ref({});
    const res = ([__temp, __restore] = withAsyncContext(() => useApiFetch().post("/api/noticeList", {
      id
    })), __temp = await __temp, __restore(), __temp);
    if (res.code == 200) {
      Info.value = res.data;
    } else {
      Message.error(res.msg);
    }
    useSeoSet({
      title: Info.value.n_name + "-" + SiteConfig.$state.Config.n_web_title,
      description: Info.value.n_desc,
      keywords: Info.value.n_keys,
      image: Info.value.n_image,
      icon: Info.value.n_image
    });
    const toolList = ref([]);
    const Form = ref({
      page: 1,
      pageSize: 10,
      search: "",
      total: 0
    });
    const GetTools = ([__temp, __restore] = withAsyncContext(() => useApiFetch().post("/api/GetTools", Form.value)), __temp = await __temp, __restore(), __temp);
    if (GetTools.code == 200) {
      toolList.value = GetTools.data;
      Form.value.total = GetTools.total;
    } else {
      Message.error(GetTools.msg);
    }
    const noticeList = ref([]);
    const getnoticeList = ([__temp, __restore] = withAsyncContext(() => useApiFetch().post("/api/noticeList", Form.value)), __temp = await __temp, __restore(), __temp);
    if (getnoticeList.code == 200) {
      noticeList.value = getnoticeList.data;
    } else {
      Message.error(getnoticeList.msg);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_icon_eye = resolveComponent("icon-eye");
      const _component_RichHtml = _sfc_main$1;
      const _component_ApiItemHeng = resolveComponent("ApiItemHeng");
      const _component_NoticeItem = resolveComponent("NoticeItem");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "Pageas" }, _attrs))} data-v-36b8e75e><div class="bg-decoration" data-v-36b8e75e><div class="circle circle-1" data-v-36b8e75e></div><div class="circle circle-2" data-v-36b8e75e></div><div class="circle circle-3" data-v-36b8e75e></div></div><div class="PageContent" data-v-36b8e75e><div class="ConBox" data-v-36b8e75e><div class="TopBox" data-v-36b8e75e><div class="Image" data-v-36b8e75e><img${ssrRenderAttr("src", unref(Info).n_image)} alt="\u65B0\u95FB\u8D44\u8BAF\u7F29\u7565\u56FE" data-v-36b8e75e></div><div class="Info" data-v-36b8e75e><h1 data-v-36b8e75e>${ssrInterpolate(unref(Info).n_name)}</h1><h3 class="desc" data-v-36b8e75e>${ssrInterpolate(unref(Info).n_desc)}</h3><p class="desc" data-v-36b8e75e>${ssrInterpolate(unref(Info).n_time)} <p class="n_read" data-v-36b8e75e>`);
      _push(ssrRenderComponent(_component_icon_eye, null, null, _parent));
      _push(`${ssrInterpolate(unref(Info).n_read)}</p></p></div></div><div class="ContentBox" data-v-36b8e75e>`);
      _push(ssrRenderComponent(_component_RichHtml, {
        html: unref(Info).n_html
      }, null, _parent));
      _push(`</div></div><div class="RegtBox" data-v-36b8e75e><div class="moreTools" data-v-36b8e75e><p class="title" data-v-36b8e75e>\u66F4\u591A\u63A8\u8350</p><!--[-->`);
      ssrRenderList(unref(toolList), (value) => {
        _push(ssrRenderComponent(_component_ApiItemHeng, {
          key: value.id,
          Info: value
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="moreTools" data-v-36b8e75e><p class="title" data-v-36b8e75e>\u70ED\u95E8\u6587\u7AE0</p><!--[-->`);
      ssrRenderList(unref(noticeList), (value) => {
        _push(ssrRenderComponent(_component_NoticeItem, {
          key: value.id,
          Info: value
        }, null, _parent));
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/notic/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-36b8e75e"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Cp7UvmNs.mjs.map
