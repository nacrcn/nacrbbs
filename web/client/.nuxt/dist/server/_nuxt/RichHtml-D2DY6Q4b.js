import { watch, mergeProps, nextTick, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import hljs from "highlight.js";
const _sfc_main = {
  __name: "RichHtml",
  __ssrInlineRender: true,
  props: { html: String },
  setup(__props) {
    const props = __props;
    const highlight = async () => {
      await nextTick();
      (void 0).querySelectorAll(".rich-html pre code").forEach((block) => {
        hljs.highlightElement(block);
      });
    };
    watch(() => props.html, highlight);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rich-html" }, _attrs))}>${__props.html ?? ""}</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RichHtml.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=RichHtml-D2DY6Q4b.js.map
