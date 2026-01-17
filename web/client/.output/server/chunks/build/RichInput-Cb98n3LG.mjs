import { ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer';
import { ref, useSSRContext } from 'vue';

const _sfc_main = {
  __name: "RichInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u5185\u5BB9..."
    },
    height: {
      type: Number,
      default: 300
    }
  },
  emits: ["update:modelValue", "update:resources"],
  setup(__props, { emit: __emit }) {
    ref(null);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div style="${ssrRenderStyle({ "border-bottom": "1px solid #ccc" })}"></div><div style="${ssrRenderStyle(`min-height: ${__props.height}px; padding: 10px;`)}"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RichInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=RichInput-Cb98n3LG.mjs.map
