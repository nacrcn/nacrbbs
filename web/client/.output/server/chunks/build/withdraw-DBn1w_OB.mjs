import { InputNumber, Button, Message } from '@arco-design/web-vue';
import { ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { a as useUserInfo, d as useApiFetch, n as navigateTo } from './server.mjs';
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
  __name: "withdraw",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const UserInfo = useUserInfo();
    UserInfo.init();
    const currentBalance = ref(((_a = UserInfo.$state.UserInfo) == null ? void 0 : _a.n_balance) || "0.00");
    const selectedAmount = ref(0);
    const customAmount = ref(null);
    const loading = ref(false);
    const presetAmounts = ref([
      { amount: 10, bonus: 0 },
      { amount: 50, bonus: 5 },
      { amount: 100, bonus: 12 },
      { amount: 200, bonus: 30 },
      { amount: 500, bonus: 80 },
      { amount: 1e3, bonus: 200 }
    ]);
    const finalAmount = computed(() => {
      if (selectedAmount.value > 0) {
        return selectedAmount.value;
      }
      if (customAmount.value && customAmount.value > 0) {
        return customAmount.value;
      }
      return 0;
    });
    computed(() => {
      const amount = finalAmount.value;
      const matched = presetAmounts.value.find((item) => item.amount === amount);
      return matched ? matched.bonus : 0;
    });
    const from = ref({
      type: 1,
      price: 10
    });
    const handleSubmit = async () => {
      loading.value = true;
      const res = await useApiFetch().post("/api/CreateOrder", {
        from: JSON.stringify([from.value])
      });
      if (res.code === 200) {
        navigateTo("/user/order/" + res.data.order);
      } else {
        Message.error(res.msg);
      }
      loading.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_input_number = InputNumber;
      const _component_a_button = Button;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "TopUpPage" }, _attrs))} data-v-f4ee8487><div class="Page" data-v-f4ee8487><div class="PageHeader" data-v-f4ee8487><h2 data-v-f4ee8487>\u4F59\u989D\u63D0\u73B0</h2><p class="current-balance" data-v-f4ee8487>\u5F53\u524D\u4F59\u989D\uFF1A<span class="amount" data-v-f4ee8487>\xA5${ssrInterpolate(unref(currentBalance))}</span></p></div><div class="Pagecontent" data-v-f4ee8487><div class="section" data-v-f4ee8487><h3 data-v-f4ee8487>\u9009\u62E9\u5145\u503C\u91D1\u989D</h3><div class="amount-grid" data-v-f4ee8487><!--[-->`);
      ssrRenderList(unref(presetAmounts), (item) => {
        _push(`<div class="${ssrRenderClass(["amount-item", { active: unref(from).price === item.amount }])}" data-v-f4ee8487><div class="amount-value" data-v-f4ee8487>\xA5${ssrInterpolate(item.amount)}</div></div>`);
      });
      _push(`<!--]--></div><div class="custom-amount" data-v-f4ee8487>`);
      _push(ssrRenderComponent(_component_a_input_number, {
        modelValue: unref(from).price,
        "onUpdate:modelValue": ($event) => unref(from).price = $event,
        placeholder: "\u81EA\u5B9A\u4E49\u91D1\u989D",
        min: 1,
        max: 1e4,
        style: { "width": "200px" }
      }, null, _parent));
      _push(`<span class="unit" data-v-f4ee8487>\u5143</span></div></div><div class="section" data-v-f4ee8487>`);
      _push(ssrRenderComponent(_component_a_button, {
        type: "primary",
        size: "large",
        loading: unref(loading),
        onClick: handleSubmit,
        class: "submit-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u7ACB\u5373\u5145\u503C \xA5${ssrInterpolate(unref(from).price)}`);
          } else {
            return [
              createTextVNode(" \u7ACB\u5373\u5145\u503C \xA5" + toDisplayString(unref(from).price), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="tips" data-v-f4ee8487><p data-v-f4ee8487>\u2022 \u5145\u503C\u6210\u529F\u540E\u4F59\u989D\u5C06\u7ACB\u5373\u5230\u8D26</p><p data-v-f4ee8487>\u2022 \u5982\u9047\u95EE\u9898\u8BF7\u8054\u7CFB\u5BA2\u670D</p></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/user/index/withdraw.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const withdraw = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f4ee8487"]]);

export { withdraw as default };
//# sourceMappingURL=withdraw-DBn1w_OB.mjs.map
