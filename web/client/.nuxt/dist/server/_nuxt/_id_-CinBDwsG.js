import { _ as __nuxt_component_0 } from "./UserHeader-DU96A5FR.js";
import { Card, Tag, Divider, RadioGroup, Radio, Space, Button, Message } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/button/style/css.js";
import "@arco-design/web-vue/es/space/style/css.js";
import "@arco-design/web-vue/es/radio/style/css.js";
import "@arco-design/web-vue/es/divider/style/css.js";
import "@arco-design/web-vue/es/tag/style/css.js";
import "@arco-design/web-vue/es/card/style/css.js";
import { ref, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, isRef, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { a as useUserInfo, c as useRoute, u as useRouter, d as useApiFetch, n as navigateTo } from "../server.mjs";
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const UserInfo = useUserInfo();
    const route = useRoute();
    const router = useRouter();
    console.log(route);
    const orderId = route.params.id;
    const orderDetail = ref({});
    const selectedPayMethod = ref("alipay");
    const paying = ref(false);
    const payMethods = ref([]);
    const getPayMethods = async () => {
      try {
        const res = await useApiFetch().post("/api/GetPayMethod", {
          no: orderId
        });
        if (res.code === 200) {
          payMethods.value = res.data;
        } else {
          Message.error(res.msg || "获取支付方式失败");
        }
      } catch (error) {
        console.error("获取支付方式失败:", error);
        Message.error("获取支付方式失败");
      }
    };
    getPayMethods();
    const getStatusColor = (type) => {
      const colorMap = {
        "1": "orange",
        // 待支付
        "2": "green",
        // 已支付
        "3": "red",
        // 已取消
        "4": "blue"
        // 已完成
      };
      return colorMap[type] || "gray";
    };
    const getStatusText = (type) => {
      const textMap = {
        "1": "待支付",
        "2": "已支付",
        "3": "已取消",
        "4": "已完成"
      };
      return textMap[type] || "未知状态";
    };
    const handleBack = () => {
      router.go(-1);
    };
    const handlePayment = async () => {
      if (!selectedPayMethod.value) {
        Message.warning("请选择支付方式");
        return;
      }
      paying.value = true;
      try {
        const res = await useApiFetch().post("/api/PayOrder", {
          no: orderDetail.value.n_no,
          paymethod: selectedPayMethod.value,
          /* paydevice : 1：电脑，2：手机 */
          paydevice: (void 0).navigator.userAgent.toLowerCase().includes("mobile") ? 2 : 1
        });
        if (res.code === 200) {
          Message.success("支付请求已提交");
          if (res.data.payUrl) {
            (void 0).open(res.data.payUrl, "_blank");
          } else if (res.data.qrCode) {
            Message.info("请扫码完成支付");
          } else {
            Message.success("支付成功");
            UserInfo.init();
            navigateTo(route.query.return);
          }
        }
        if (!res.code) {
          const html = res;
          const div = (void 0).createElement("div");
          div.innerHTML = html;
          (void 0).body.appendChild(div);
          div.querySelector("form").submit();
        }
      } catch (error) {
        console.error("支付失败:", error);
        Message.error("支付失败，请重试");
      } finally {
        paying.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UserHeader = __nuxt_component_0;
      const _component_a_card = Card;
      const _component_a_tag = Tag;
      const _component_a_divider = Divider;
      const _component_a_radio_group = RadioGroup;
      const _component_a_radio = Radio;
      const _component_a_space = Space;
      const _component_a_button = Button;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "PayVerifyPage" }, _attrs))} data-v-616d8a20>`);
      _push(ssrRenderComponent(_component_UserHeader, { title: "订单支付核对" }, null, _parent));
      _push(`<div class="Page" data-v-616d8a20><div class="PageContent" data-v-616d8a20>`);
      _push(ssrRenderComponent(_component_a_card, {
        title: "订单信息",
        class: "order-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="order-info" data-v-616d8a20${_scopeId}><div class="info-row" data-v-616d8a20${_scopeId}><span class="label" data-v-616d8a20${_scopeId}>订单编号：</span><span class="value" data-v-616d8a20${_scopeId}>${ssrInterpolate(unref(orderDetail).n_no)}</span></div><div class="info-row" data-v-616d8a20${_scopeId}><span class="label" data-v-616d8a20${_scopeId}>创建时间：</span><span class="value" data-v-616d8a20${_scopeId}>${ssrInterpolate(unref(orderDetail).n_creatertime)}</span></div><div class="info-row" data-v-616d8a20${_scopeId}><span class="label" data-v-616d8a20${_scopeId}>订单金额：</span><span class="value price" data-v-616d8a20${_scopeId}>¥${ssrInterpolate(unref(orderDetail).n_amount)}</span></div><div class="info-row" data-v-616d8a20${_scopeId}><span class="label" data-v-616d8a20${_scopeId}>订单状态：</span>`);
            _push2(ssrRenderComponent(_component_a_tag, {
              color: getStatusColor(unref(orderDetail).n_type)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(getStatusText(unref(orderDetail).n_type))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(getStatusText(unref(orderDetail).n_type)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_a_divider, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`商品详情`);
                } else {
                  return [
                    createTextVNode("商品详情")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(orderDetail).n_item && unref(orderDetail).n_item.length > 0) {
              _push2(`<div class="items-list" data-v-616d8a20${_scopeId}><!--[-->`);
              ssrRenderList(unref(orderDetail).n_item, (item) => {
                _push2(`<div class="item-row" data-v-616d8a20${_scopeId}><div class="item-name" data-v-616d8a20${_scopeId}>${ssrInterpolate(item.n_name)}</div><div class="item-detail" data-v-616d8a20${_scopeId}><span data-v-616d8a20${_scopeId}>数量：${ssrInterpolate(item.n_number)}</span><span class="item-price" data-v-616d8a20${_scopeId}>¥${ssrInterpolate(item.n_price)}</span></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "order-info" }, [
                createVNode("div", { class: "info-row" }, [
                  createVNode("span", { class: "label" }, "订单编号："),
                  createVNode("span", { class: "value" }, toDisplayString(unref(orderDetail).n_no), 1)
                ]),
                createVNode("div", { class: "info-row" }, [
                  createVNode("span", { class: "label" }, "创建时间："),
                  createVNode("span", { class: "value" }, toDisplayString(unref(orderDetail).n_creatertime), 1)
                ]),
                createVNode("div", { class: "info-row" }, [
                  createVNode("span", { class: "label" }, "订单金额："),
                  createVNode("span", { class: "value price" }, "¥" + toDisplayString(unref(orderDetail).n_amount), 1)
                ]),
                createVNode("div", { class: "info-row" }, [
                  createVNode("span", { class: "label" }, "订单状态："),
                  createVNode(_component_a_tag, {
                    color: getStatusColor(unref(orderDetail).n_type)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(getStatusText(unref(orderDetail).n_type)), 1)
                    ]),
                    _: 1
                  }, 8, ["color"])
                ])
              ]),
              createVNode(_component_a_divider, null, {
                default: withCtx(() => [
                  createTextVNode("商品详情")
                ]),
                _: 1
              }),
              unref(orderDetail).n_item && unref(orderDetail).n_item.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "items-list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(orderDetail).n_item, (item) => {
                  return openBlock(), createBlock("div", {
                    key: item.id,
                    class: "item-row"
                  }, [
                    createVNode("div", { class: "item-name" }, toDisplayString(item.n_name), 1),
                    createVNode("div", { class: "item-detail" }, [
                      createVNode("span", null, "数量：" + toDisplayString(item.n_number), 1),
                      createVNode("span", { class: "item-price" }, "¥" + toDisplayString(item.n_price), 1)
                    ])
                  ]);
                }), 128))
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(orderDetail).n_type === "1") {
        _push(ssrRenderComponent(_component_a_card, {
          title: "选择支付方式",
          class: "payment-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_radio_group, {
                modelValue: unref(selectedPayMethod),
                "onUpdate:modelValue": ($event) => isRef(selectedPayMethod) ? selectedPayMethod.value = $event : null,
                direction: "vertical",
                class: "payment-methods"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(payMethods), (method) => {
                      _push3(`<div class="payment-option" data-v-616d8a20${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_a_radio, {
                        value: method.id
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="payment-info" data-v-616d8a20${_scopeId3}><div class="payment-icon" data-v-616d8a20${_scopeId3}><img style="${ssrRenderStyle({ "width": "25px" })}"${ssrRenderAttr("src", method.n_icon)} alt="" data-v-616d8a20${_scopeId3}></div><div class="payment-details" data-v-616d8a20${_scopeId3}><div class="payment-name" data-v-616d8a20${_scopeId3}>${ssrInterpolate(method.n_name)}</div></div></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "payment-info" }, [
                                createVNode("div", { class: "payment-icon" }, [
                                  createVNode("img", {
                                    style: { "width": "25px" },
                                    src: method.n_icon,
                                    alt: ""
                                  }, null, 8, ["src"])
                                ]),
                                createVNode("div", { class: "payment-details" }, [
                                  createVNode("div", { class: "payment-name" }, toDisplayString(method.n_name), 1)
                                ])
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(payMethods), (method) => {
                        return openBlock(), createBlock("div", {
                          class: "payment-option",
                          key: method.id
                        }, [
                          createVNode(_component_a_radio, {
                            value: method.id
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "payment-info" }, [
                                createVNode("div", { class: "payment-icon" }, [
                                  createVNode("img", {
                                    style: { "width": "25px" },
                                    src: method.n_icon,
                                    alt: ""
                                  }, null, 8, ["src"])
                                ]),
                                createVNode("div", { class: "payment-details" }, [
                                  createVNode("div", { class: "payment-name" }, toDisplayString(method.n_name), 1)
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["value"])
                        ]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_a_radio_group, {
                  modelValue: unref(selectedPayMethod),
                  "onUpdate:modelValue": ($event) => isRef(selectedPayMethod) ? selectedPayMethod.value = $event : null,
                  direction: "vertical",
                  class: "payment-methods"
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(payMethods), (method) => {
                      return openBlock(), createBlock("div", {
                        class: "payment-option",
                        key: method.id
                      }, [
                        createVNode(_component_a_radio, {
                          value: method.id
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "payment-info" }, [
                              createVNode("div", { class: "payment-icon" }, [
                                createVNode("img", {
                                  style: { "width": "25px" },
                                  src: method.n_icon,
                                  alt: ""
                                }, null, 8, ["src"])
                              ]),
                              createVNode("div", { class: "payment-details" }, [
                                createVNode("div", { class: "payment-name" }, toDisplayString(method.n_name), 1)
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["value"])
                      ]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(orderDetail).n_type === "1") {
        _push(`<div class="payment-actions" data-v-616d8a20><div class="total-amount" data-v-616d8a20><span class="total-label" data-v-616d8a20>应付金额：</span><span class="total-value" data-v-616d8a20>¥${ssrInterpolate(unref(orderDetail).n_amount)}</span></div>`);
        _push(ssrRenderComponent(_component_a_space, { size: "large" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_button, {
                size: "large",
                onClick: handleBack
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`返回`);
                  } else {
                    return [
                      createTextVNode("返回")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_a_button, {
                type: "primary",
                size: "large",
                loading: unref(paying),
                onClick: handlePayment
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 确认支付 `);
                  } else {
                    return [
                      createTextVNode(" 确认支付 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_a_button, {
                  size: "large",
                  onClick: handleBack
                }, {
                  default: withCtx(() => [
                    createTextVNode("返回")
                  ]),
                  _: 1
                }),
                createVNode(_component_a_button, {
                  type: "primary",
                  size: "large",
                  loading: unref(paying),
                  onClick: handlePayment
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 确认支付 ")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/user/index/order/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-616d8a20"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-CinBDwsG.js.map
