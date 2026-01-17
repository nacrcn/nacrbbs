import { Button } from '@arco-design/web-vue';
import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = {
  __name: "UserHeader",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "\u7528\u6237\u4E2D\u5FC3"
    }
  },
  setup(__props) {
    const goBack = () => {
      (void 0).history.back();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_button = Button;
      const _component_icon_left = resolveComponent("icon-left");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))} data-v-a55dde63>`);
      _push(ssrRenderComponent(_component_a_button, {
        shape: "circle",
        size: "mini",
        onClick: ($event) => goBack()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_icon_left, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_icon_left)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="title" data-v-a55dde63>${ssrInterpolate(__props.title)}</p></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UserHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a55dde63"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=UserHeader-DU96A5FR.mjs.map
