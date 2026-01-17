import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ClassItem",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const formatNumber = (num) => {
      if (num >= 1e3 && num < 1e6) {
        return (num / 1e3).toFixed(1) + "K";
      } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + "M";
      }
      return num;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "Itemlist" }, _attrs))} data-v-243aef17><div class="Avatar" data-v-243aef17><img${ssrRenderAttr("src", __props.data.n_icon)} alt="" data-v-243aef17></div><div class="UserDetail" data-v-243aef17><p class="nickname" data-v-243aef17>${ssrInterpolate(__props.data.n_name)}</p><div class="Interactions" data-v-243aef17><span class="item" data-v-243aef17><span class="label" data-v-243aef17>热度：</span><span class="value" data-v-243aef17>${ssrInterpolate(formatNumber(__props.data.n_hotnum || 0))}</span></span><span class="item" data-v-243aef17><span class="label" data-v-243aef17>动态：</span><span class="value" data-v-243aef17>${ssrInterpolate(formatNumber(__props.data.n_threads || 0))}</span></span></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ClassItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-243aef17"]]);
export {
  __nuxt_component_3 as _
};
//# sourceMappingURL=ClassItem-t4LUU3s9.js.map
