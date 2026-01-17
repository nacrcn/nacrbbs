import { InputNumber, Button, Message } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/button/style/css.js";
import "@arco-design/web-vue/es/input-number/style/css.js";
import { ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { a as useUserInfo, d as useApiFetch, n as navigateTo } from "../server.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "E:/Cpenx/bbs/web/client/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "E:/Cpenx/bbs/web/client/node_modules/hookable/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/unctx/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/h3/dist/index.mjs";
import "pinia";
import "E:/Cpenx/bbs/web/client/node_modules/defu/dist/defu.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/radix3/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/ufo/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/klona/dist/index.mjs";
import "@arco-design/web-vue/es/icon/index.js";
import "@vueuse/core";
import "E:/Cpenx/bbs/web/client/node_modules/cookie-es/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/destr/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/ohash/dist/index.mjs";
import "E:/Cpenx/bbs/web/client/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = {
  __name: "withdraw",
  __ssrInlineRender: true,
  setup(__props) {
    const UserInfo = useUserInfo();
    UserInfo.init();
    const currentBalance = ref(UserInfo.$state.UserInfo?.n_balance || "0.00");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "TopUpPage" }, _attrs))} data-v-f4ee8487><div class="Page" data-v-f4ee8487><div class="PageHeader" data-v-f4ee8487><h2 data-v-f4ee8487>余额提现</h2><p class="current-balance" data-v-f4ee8487>当前余额：<span class="amount" data-v-f4ee8487>¥${ssrInterpolate(unref(currentBalance))}</span></p></div><div class="Pagecontent" data-v-f4ee8487><div class="section" data-v-f4ee8487><h3 data-v-f4ee8487>选择充值金额</h3><div class="amount-grid" data-v-f4ee8487><!--[-->`);
      ssrRenderList(unref(presetAmounts), (item) => {
        _push(`<div class="${ssrRenderClass(["amount-item", { active: unref(from).price === item.amount }])}" data-v-f4ee8487><div class="amount-value" data-v-f4ee8487>¥${ssrInterpolate(item.amount)}</div></div>`);
      });
      _push(`<!--]--></div><div class="custom-amount" data-v-f4ee8487>`);
      _push(ssrRenderComponent(_component_a_input_number, {
        modelValue: unref(from).price,
        "onUpdate:modelValue": ($event) => unref(from).price = $event,
        placeholder: "自定义金额",
        min: 1,
        max: 1e4,
        style: { "width": "200px" }
      }, null, _parent));
      _push(`<span class="unit" data-v-f4ee8487>元</span></div></div><div class="section" data-v-f4ee8487>`);
      _push(ssrRenderComponent(_component_a_button, {
        type: "primary",
        size: "large",
        loading: unref(loading),
        onClick: handleSubmit,
        class: "submit-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 立即充值 ¥${ssrInterpolate(unref(from).price)}`);
          } else {
            return [
              createTextVNode(" 立即充值 ¥" + toDisplayString(unref(from).price), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="tips" data-v-f4ee8487><p data-v-f4ee8487>• 充值成功后余额将立即到账</p><p data-v-f4ee8487>• 如遇问题请联系客服</p></div></div></div></div></div>`);
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
export {
  withdraw as default
};
//# sourceMappingURL=withdraw-DBn1w_OB.js.map
