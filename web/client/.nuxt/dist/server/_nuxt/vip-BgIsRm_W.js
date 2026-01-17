import { _ as __nuxt_component_0 } from "./UserHeader-DU96A5FR.js";
import { Button, Message } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/button/style/css.js";
import { ref, mergeProps, unref, withCtx, createBlock, createTextVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { d as useApiFetch, n as navigateTo } from "../server.mjs";
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
  __name: "vip",
  __ssrInlineRender: true,
  setup(__props) {
    const Viplist = ref([]);
    const loading = ref(false);
    const GetVipList = async () => {
      loading.value = true;
      const res = await useApiFetch().post("/api/getVipList");
      if (res.code === 200) {
        Viplist.value = res.data;
        VipActive.value = res.data[0].id;
        VipInfo.value = res.data[0];
        GetVipPrice();
      } else {
        Message.error(res.msg);
      }
      loading.value = false;
    };
    const VipActive = ref(0);
    const from = ref({
      id: "",
      type: 2
    });
    const VipPrice = ref([]);
    const VipInfo = ref({});
    const GetVipPrice = async () => {
      const res = await useApiFetch().post("/api/getVipPrice", {
        n_gid: VipActive.value
      });
      if (res.code === 200) {
        VipPrice.value = res.data;
        from.value.id = res.data[0]?.id || "";
      } else {
        Message.error(res.msg);
      }
    };
    const BuyVip = async () => {
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
    GetVipList();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UserHeader = __nuxt_component_0;
      const _component_a_button = Button;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "vip-page" }, _attrs))} data-v-c4c84d0f>`);
      _push(ssrRenderComponent(_component_UserHeader, { title: "会员中心" }, null, _parent));
      _push(`<div class="Page" data-v-c4c84d0f><div class="Pagecontent" data-v-c4c84d0f><div class="section-title" data-v-c4c84d0f><h3 data-v-c4c84d0f>选择会员类型</h3><div class="title-line" data-v-c4c84d0f></div></div><div class="VipListBox" data-v-c4c84d0f><!--[-->`);
      ssrRenderList(unref(Viplist), (value) => {
        _push(`<div class="${ssrRenderClass(["VipList", {
          VipListActive: unref(VipActive) === value.id
        }])}" data-v-c4c84d0f><p class="VipName" data-v-c4c84d0f>${ssrInterpolate(value.n_name)}</p><p class="VipNote" data-v-c4c84d0f>${ssrInterpolate(value.n_note)}</p></div>`);
      });
      _push(`<!--]--></div><div class="section-title" data-v-c4c84d0f><h3 data-v-c4c84d0f>选择购买时长</h3><div class="title-line" data-v-c4c84d0f></div></div><div class="VipPriceBox" data-v-c4c84d0f><!--[-->`);
      ssrRenderList(unref(VipPrice), (price) => {
        _push(`<div class="${ssrRenderClass(["VipPrice", {
          VipPriceActive: unref(from).id === price.id
        }])}" data-v-c4c84d0f><div class="price-info" data-v-c4c84d0f><div class="duration-badge" data-v-c4c84d0f>${ssrInterpolate(price.n_day)}天</div><div class="price-container" data-v-c4c84d0f><span class="priceold" data-v-c4c84d0f>￥${ssrInterpolate(price.n_strikethroughprice)}</span><span class="pricenow" data-v-c4c84d0f>￥${ssrInterpolate(price.n_price)}</span></div></div><div class="give" data-v-c4c84d0f><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" data-v-c4c84d0f><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" data-v-c4c84d0f></path></svg> 赠送 ${ssrInterpolate(price.n_give)}积分 </div></div>`);
      });
      _push(`<!--]--></div><div class="OrderBox" data-v-c4c84d0f><div class="order-summary" data-v-c4c84d0f><div class="price-display" data-v-c4c84d0f><span class="total-label" data-v-c4c84d0f>预计支付：</span><span class="total-price" data-v-c4c84d0f>￥${ssrInterpolate(unref(from).id ? unref(VipPrice).find((item) => item.id === unref(from).id)?.n_price : "0")}</span></div>`);
      _push(ssrRenderComponent(_component_a_button, {
        type: "primary",
        class: "buy-button",
        loading: unref(loading),
        onClick: ($event) => BuyVip()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-v-c4c84d0f${_scopeId}><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" data-v-c4c84d0f${_scopeId}></path></svg> 立即购买 `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "currentColor"
              }, [
                createVNode("path", { d: "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" })
              ])),
              createTextVNode(" 立即购买 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="VipRightsBox" data-v-c4c84d0f><div class="section-title" data-v-c4c84d0f><h3 data-v-c4c84d0f>会员权益</h3><div class="title-line" data-v-c4c84d0f></div></div><div class="rights-content" data-v-c4c84d0f><div class="right-item" data-v-c4c84d0f><div class="right-text" data-v-c4c84d0f><h4 data-v-c4c84d0f>免费调用</h4><p data-v-c4c84d0f>海量接口免费调用</p></div></div><div class="right-item" data-v-c4c84d0f><div class="right-text" data-v-c4c84d0f><h4 data-v-c4c84d0f>超低折扣</h4><p data-v-c4c84d0f>付费接口享受${ssrInterpolate(unref(VipInfo).n_discount)}%优惠</p></div></div><div class="right-item" data-v-c4c84d0f><div class="right-text" data-v-c4c84d0f><h4 data-v-c4c84d0f>更稳定</h4><p data-v-c4c84d0f>VIP独立数据通道，更稳定更快速</p></div></div><div class="right-item" data-v-c4c84d0f><div class="right-text" data-v-c4c84d0f><h4 data-v-c4c84d0f>更多的QPS</h4><p data-v-c4c84d0f>在接口原基础上，增加${ssrInterpolate(unref(VipInfo).n_qps)}QPS</p></div></div><div class="right-item" data-v-c4c84d0f><div class="right-text" data-v-c4c84d0f><h4 data-v-c4c84d0f>更低的手续费</h4><p data-v-c4c84d0f>提现手续费仅需${ssrInterpolate(unref(VipInfo).n_withdrawal_fee)}%</p></div></div><div class="right-item" data-v-c4c84d0f><div class="right-text" data-v-c4c84d0f><h4 data-v-c4c84d0f>专业的技术支持</h4><p data-v-c4c84d0f>提供24/7专业技术支持服务</p></div></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/user/index/vip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vip = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c4c84d0f"]]);
export {
  vip as default
};
//# sourceMappingURL=vip-BgIsRm_W.js.map
