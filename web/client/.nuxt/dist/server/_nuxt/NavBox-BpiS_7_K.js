import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { c as useRoute } from "../server.mjs";
const _sfc_main = {
  __name: "NavBox",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    Item: {
      type: Array,
      default: []
    }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    useRoute();
    ref(1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))} data-v-3418dfa3><div class="NavLisbox" data-v-3418dfa3><!--[-->`);
      ssrRenderList(__props.Item, (value) => {
        _push(`<div class="${ssrRenderClass(["Item", { active: __props.modelValue === value.value }])}" data-v-3418dfa3><span data-v-3418dfa3>${ssrInterpolate(value.name)}</span></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavBox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3418dfa3"]]);
export {
  __nuxt_component_0 as _
};
//# sourceMappingURL=NavBox-BpiS_7_K.js.map
