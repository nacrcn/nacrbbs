import { resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = {
  __name: "popupMob",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    BackText: {
      type: String,
      default: "\u53D6\u6D88"
    },
    SuccessText: {
      type: String,
      default: "\u786E\u5B9A"
    },
    Nook: {
      type: Boolean,
      default: false
    },
    Title: {
      type: String,
      default: "\u63D0\u793A"
    }
  },
  emits: ["update:modelValue", "close", "ok"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_icon_close = resolveComponent("icon-close");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "HeaderBox" }, _attrs))} data-v-936d06d7><div class="${ssrRenderClass({ downBoxTos: true, downBoxTosavtive: props.modelValue })}" data-v-936d06d7><div class="Neibox" data-v-936d06d7><div class="AppBtnList" data-v-936d06d7><p class="AppBtnListTitle" data-v-936d06d7>${ssrInterpolate(props.Title)}</p>`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`<div class="closeBtn" data-v-936d06d7>`);
      _push(ssrRenderComponent(_component_icon_close, { class: "icon" }, null, _parent));
      _push(`</div></div><div class="BtnList" data-v-936d06d7><div class="cancel" data-v-936d06d7>${ssrInterpolate(props.BackText)}</div>`);
      if (!props.Nook) {
        _push(`<div class="success" data-v-936d06d7>${ssrInterpolate(props.SuccessText)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/popupMob.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-936d06d7"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=popupMob-OgSg-8hC.mjs.map
