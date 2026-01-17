import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { ref, resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = {
  __name: "Tabbar",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const ShowIndex = ref("/");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_icon_home = resolveComponent("icon-home");
      const _component_icon_relation = resolveComponent("icon-relation");
      const _component_icon_user = resolveComponent("icon-user");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "Tabbar" }, _attrs))} data-v-370fdd24><div class="${ssrRenderClass(["TabbarItem", { active: ShowIndex.value == "/" }])}" data-v-370fdd24>`);
      _push(ssrRenderComponent(_component_icon_home, { class: "icon" }, null, _parent));
      _push(`<p data-v-370fdd24>\u74DC\u5B50</p></div><div class="${ssrRenderClass(["TabbarItem", { active: ShowIndex.value == "/class" }])}" data-v-370fdd24>`);
      _push(ssrRenderComponent(_component_icon_relation, { class: "icon" }, null, _parent));
      _push(`<p data-v-370fdd24>\u5708\u5B50</p></div><div class="${ssrRenderClass(["TabbarItem", { active: ShowIndex.value == "/user/home" }])}" data-v-370fdd24>`);
      _push(ssrRenderComponent(_component_icon_user, { class: "icon" }, null, _parent));
      _push(`<p data-v-370fdd24>\u6211\u7684</p></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tabbar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-370fdd24"]]);
const _imports_0 = "" + buildAssetsURL("logo.CH4FdCPt.png");

export { _imports_0 as _, __nuxt_component_2 as a };
//# sourceMappingURL=logo-Cu0czp98.mjs.map
