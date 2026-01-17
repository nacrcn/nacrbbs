import { _ as __nuxt_component_0 } from './UserHeader-DU96A5FR.mjs';
import { Card, Tag, Divider, RadioGroup, Radio, Space, Button, Message } from '@arco-design/web-vue';
import { ref, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { a as useUserInfo, c as useRoute, u as useRouter, d as useApiFetch, n as navigateTo } from './server.mjs';
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
          Message.error(res.msg || "\u83B7\u53D6\u652F\u4ED8\u65B9\u5F0F\u5931\u8D25");
        }
      } catch (error) {
        console.error("\u83B7\u53D6\u652F\u4ED8\u65B9\u5F0F\u5931\u8D25:", error);
        Message.error("\u83B7\u53D6\u652F\u4ED8\u65B9\u5F0F\u5931\u8D25");
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
        "1": "\u5F85\u652F\u4ED8",
        "2": "\u5DF2\u652F\u4ED8",
        "3": "\u5DF2\u53D6\u6D88",
        "4": "\u5DF2\u5B8C\u6210"
      };
      return textMap[type] || "\u672A\u77E5\u72B6\u6001";
    };
    const handleBack = () => {
      router.go(-1);
    };
    const handlePayment = async () => {
      if (!selectedPayMethod.value) {
        Message.warning("\u8BF7\u9009\u62E9\u652F\u4ED8\u65B9\u5F0F");
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
          Message.success("\u652F\u4ED8\u8BF7\u6C42\u5DF2\u63D0\u4EA4");
          if (res.data.payUrl) {
            (void 0).open(res.data.payUrl, "_blank");
          } else if (res.data.qrCode) {
            Message.info("\u8BF7\u626B\u7801\u5B8C\u6210\u652F\u4ED8");
          } else {
            Message.success("\u652F\u4ED8\u6210\u529F");
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
        console.error("\u652F\u4ED8\u5931\u8D25:", error);
        Message.error("\u652F\u4ED8\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
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
      _push(ssrRenderComponent(_component_UserHeader, { title: "\u8BA2\u5355\u652F\u4ED8\u6838\u5BF9" }, null, _parent));
      _push(`<div class="Page" data-v-616d8a20><div class="PageContent" data-v-616d8a20>`);
      _push(ssrRenderComponent(_component_a_card, {
        title: "\u8BA2\u5355\u4FE1\u606F",
        class: "order-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="order-info" data-v-616d8a20${_scopeId}><div class="info-row" data-v-616d8a20${_scopeId}><span class="label" data-v-616d8a20${_scopeId}>\u8BA2\u5355\u7F16\u53F7\uFF1A</span><span class="value" data-v-616d8a20${_scopeId}>${ssrInterpolate(unref(orderDetail).n_no)}</span></div><div class="info-row" data-v-616d8a20${_scopeId}><span class="label" data-v-616d8a20${_scopeId}>\u521B\u5EFA\u65F6\u95F4\uFF1A</span><span class="value" data-v-616d8a20${_scopeId}>${ssrInterpolate(unref(orderDetail).n_creatertime)}</span></div><div class="info-row" data-v-616d8a20${_scopeId}><span class="label" data-v-616d8a20${_scopeId}>\u8BA2\u5355\u91D1\u989D\uFF1A</span><span class="value price" data-v-616d8a20${_scopeId}>\xA5${ssrInterpolate(unref(orderDetail).n_amount)}</span></div><div class="info-row" data-v-616d8a20${_scopeId}><span class="label" data-v-616d8a20${_scopeId}>\u8BA2\u5355\u72B6\u6001\uFF1A</span>`);
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
                  _push3(`\u5546\u54C1\u8BE6\u60C5`);
                } else {
                  return [
                    createTextVNode("\u5546\u54C1\u8BE6\u60C5")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(orderDetail).n_item && unref(orderDetail).n_item.length > 0) {
              _push2(`<div class="items-list" data-v-616d8a20${_scopeId}><!--[-->`);
              ssrRenderList(unref(orderDetail).n_item, (item) => {
                _push2(`<div class="item-row" data-v-616d8a20${_scopeId}><div class="item-name" data-v-616d8a20${_scopeId}>${ssrInterpolate(item.n_name)}</div><div class="item-detail" data-v-616d8a20${_scopeId}><span data-v-616d8a20${_scopeId}>\u6570\u91CF\uFF1A${ssrInterpolate(item.n_number)}</span><span class="item-price" data-v-616d8a20${_scopeId}>\xA5${ssrInterpolate(item.n_price)}</span></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "order-info" }, [
                createVNode("div", { class: "info-row" }, [
                  createVNode("span", { class: "label" }, "\u8BA2\u5355\u7F16\u53F7\uFF1A"),
                  createVNode("span", { class: "value" }, toDisplayString(unref(orderDetail).n_no), 1)
                ]),
                createVNode("div", { class: "info-row" }, [
                  createVNode("span", { class: "label" }, "\u521B\u5EFA\u65F6\u95F4\uFF1A"),
                  createVNode("span", { class: "value" }, toDisplayString(unref(orderDetail).n_creatertime), 1)
                ]),
                createVNode("div", { class: "info-row" }, [
                  createVNode("span", { class: "label" }, "\u8BA2\u5355\u91D1\u989D\uFF1A"),
                  createVNode("span", { class: "value price" }, "\xA5" + toDisplayString(unref(orderDetail).n_amount), 1)
                ]),
                createVNode("div", { class: "info-row" }, [
                  createVNode("span", { class: "label" }, "\u8BA2\u5355\u72B6\u6001\uFF1A"),
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
                  createTextVNode("\u5546\u54C1\u8BE6\u60C5")
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
                      createVNode("span", null, "\u6570\u91CF\uFF1A" + toDisplayString(item.n_number), 1),
                      createVNode("span", { class: "item-price" }, "\xA5" + toDisplayString(item.n_price), 1)
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
          title: "\u9009\u62E9\u652F\u4ED8\u65B9\u5F0F",
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
        _push(`<div class="payment-actions" data-v-616d8a20><div class="total-amount" data-v-616d8a20><span class="total-label" data-v-616d8a20>\u5E94\u4ED8\u91D1\u989D\uFF1A</span><span class="total-value" data-v-616d8a20>\xA5${ssrInterpolate(unref(orderDetail).n_amount)}</span></div>`);
        _push(ssrRenderComponent(_component_a_space, { size: "large" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_button, {
                size: "large",
                onClick: handleBack
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u8FD4\u56DE`);
                  } else {
                    return [
                      createTextVNode("\u8FD4\u56DE")
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
                    _push3(` \u786E\u8BA4\u652F\u4ED8 `);
                  } else {
                    return [
                      createTextVNode(" \u786E\u8BA4\u652F\u4ED8 ")
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
                    createTextVNode("\u8FD4\u56DE")
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
                    createTextVNode(" \u786E\u8BA4\u652F\u4ED8 ")
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

export { _id_ as default };
//# sourceMappingURL=_id_-CinBDwsG.mjs.map
