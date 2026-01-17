import { _ as __nuxt_component_0 } from './UserHeader-DU96A5FR.mjs';
import { _ as __nuxt_component_1 } from './popupMob-OgSg-8hC.mjs';
import { Alert, Space, Button, Popconfirm, Pagination, Form, FormItem, Input, Textarea, RadioGroup, Radio, Message } from '@arco-design/web-vue';
import { ref, resolveComponent, mergeProps, withCtx, createTextVNode, unref, createVNode, isRef, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { a as useUserInfo, d as useApiFetch } from './server.mjs';
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
  __name: "keys",
  __ssrInlineRender: true,
  setup(__props) {
    const UserInfo = useUserInfo();
    UserInfo.init();
    const keys2 = ref([]);
    const GetFrom = ref({
      page: 1,
      pagesize: 20,
      total: 0
    });
    async function getKeys() {
      const res = await useApiFetch().post("/api/getApiKeys", GetFrom.value);
      if (res.code === 200) {
        keys2.value = res.data;
        GetFrom.value.total = res.total;
      } else {
        Message.error(res.message);
      }
    }
    getKeys();
    const replaceKey = (key) => {
      if (key.length <= 5) return key;
      const start = key.substring(0, 3);
      const end = key.substring(key.length - 3);
      const middle = "*".repeat(key.length - 6);
      return start + middle + end;
    };
    const show = ref(false);
    const showInfo = ref(false);
    const type = ref(1);
    const form = ref({});
    const clickNewKey = async () => {
      let res;
      if (type.value == 1) {
        res = await useApiFetch().post("/api/addApiKey", form.value);
      } else {
        res = await useApiFetch().post("/api/editApiKey", form.value);
      }
      if (res.code === 200) {
        Message.success(res.message);
        show.value = false;
        getKeys();
      } else {
        Message.error(res.message);
      }
    };
    const deleteKey = async (id) => {
      const res = await useApiFetch().post("/api/delApiKey", { id });
      if (res.code === 200) {
        Message.success(res.message);
        getKeys();
      } else {
        Message.error(res.message);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UserHeader = __nuxt_component_0;
      const _component_a_alert = Alert;
      const _component_a_space = Space;
      const _component_a_button = Button;
      const _component_a_popconfirm = Popconfirm;
      const _component_icon_plus = resolveComponent("icon-plus");
      const _component_a_pagination = Pagination;
      const _component_popupMob = __nuxt_component_1;
      const _component_a_form = Form;
      const _component_a_form_item = FormItem;
      const _component_a_input = Input;
      const _component_a_textarea = Textarea;
      const _component_a_radio_group = RadioGroup;
      const _component_a_radio = Radio;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "TopUpPage" }, _attrs))} data-v-6d255f9e>`);
      _push(ssrRenderComponent(_component_UserHeader, { title: "\u6211\u7684API\u79D8\u94A5" }, null, _parent));
      _push(`<div class="Page" data-v-6d255f9e>`);
      _push(ssrRenderComponent(_component_a_alert, {
        type: "warning",
        class: "AlertBox"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u8BF7\u4E0D\u8981\u5C06\u79D8\u94A5\u6CC4\u9732\u7ED9\u4ED6\u4EBA\uFF0C\u8FD9\u5C06\u53EF\u80FD\u5BF9\u60A8\u9020\u6210\u635F\u5931\uFF01`);
          } else {
            return [
              createTextVNode("\u8BF7\u4E0D\u8981\u5C06\u79D8\u94A5\u6CC4\u9732\u7ED9\u4ED6\u4EBA\uFF0C\u8FD9\u5C06\u53EF\u80FD\u5BF9\u60A8\u9020\u6210\u635F\u5931\uFF01")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="KeyBox" data-v-6d255f9e><!--[-->`);
      ssrRenderList(unref(keys2), (value) => {
        _push(`<div class="KeyItem" data-v-6d255f9e><div class="KeyInfo" data-v-6d255f9e><div class="Title" data-v-6d255f9e>${ssrInterpolate(value.n_name || "\u672A\u547D\u540D")}</div><div class="Key" data-v-6d255f9e>${ssrInterpolate(replaceKey(value.n_key))}</div><div class="Time" data-v-6d255f9e>${ssrInterpolate(value.n_time)}</div></div><div class="KeyAction" data-v-6d255f9e>`);
        _push(ssrRenderComponent(_component_a_space, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_button, {
                size: "mini",
                type: "text",
                onClick: ($event) => (show.value = true, form.value = value, type.value = 2)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u7F16\u8F91`);
                  } else {
                    return [
                      createTextVNode("\u7F16\u8F91")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_a_popconfirm, {
                content: "\u786E\u5B9A\u5220\u9664\u6B64API\u5BC6\u94A5\u5417\uFF1F\u5220\u9664\u540E\u79D8\u94A5\u5C06\u7ACB\u9A6C\u5931\u6548\uFF01",
                type: "warning",
                onOk: ($event) => deleteKey(unref(form).id)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_a_button, {
                      size: "mini",
                      type: "text",
                      status: "danger"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u5220\u9664`);
                        } else {
                          return [
                            createTextVNode("\u5220\u9664")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_a_button, {
                        size: "mini",
                        type: "text",
                        status: "danger"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u5220\u9664")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_a_button, {
                  size: "mini",
                  type: "text",
                  onClick: ($event) => (show.value = true, form.value = value, type.value = 2)
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u7F16\u8F91")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_a_popconfirm, {
                  content: "\u786E\u5B9A\u5220\u9664\u6B64API\u5BC6\u94A5\u5417\uFF1F\u5220\u9664\u540E\u79D8\u94A5\u5C06\u7ACB\u9A6C\u5931\u6548\uFF01",
                  type: "warning",
                  onOk: ($event) => deleteKey(unref(form).id)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_a_button, {
                      size: "mini",
                      type: "text",
                      status: "danger"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u5220\u9664")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["onOk"])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--><div class="KeyItem" data-v-6d255f9e><div class="NewKey" data-v-6d255f9e><div class="NewKeyBox" data-v-6d255f9e>`);
      _push(ssrRenderComponent(_component_icon_plus, null, null, _parent));
      _push(`<p data-v-6d255f9e>\u521B\u5EFA\u65B0\u79D8\u94A5</p></div></div></div></div>`);
      _push(ssrRenderComponent(_component_a_pagination, {
        onChange: getKeys,
        onPageSizeChange: getKeys,
        current: unref(GetFrom).page,
        "onUpdate:current": ($event) => unref(GetFrom).page = $event,
        pageSize: unref(GetFrom).pagesize,
        "onUpdate:pageSize": ($event) => unref(GetFrom).pagesize = $event,
        total: unref(GetFrom).total,
        size: "mini",
        "show-total": "",
        "show-page-size": "",
        "page-size-options": [50, 100, 200, 500, 1e3]
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_popupMob, {
        modelValue: unref(show),
        "onUpdate:modelValue": ($event) => isRef(show) ? show.value = $event : null,
        Title: unref(type) === 1 ? "\u521B\u5EFA\u65B0\u79D8\u94A5" : "\u4FEE\u6539\u79D8\u94A5",
        Nook: ""
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_form, {
              model: unref(form),
              layout: "vertical"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_form_item, {
                    field: "name",
                    label: "\u540D\u79F0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_input, {
                          modelValue: unref(form).n_name,
                          "onUpdate:modelValue": ($event) => unref(form).n_name = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_a_input, {
                            modelValue: unref(form).n_name,
                            "onUpdate:modelValue": ($event) => unref(form).n_name = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_a_form_item, {
                    field: "ip_whitelist",
                    label: "IP\u767D\u540D\u5355"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_textarea, {
                          modelValue: unref(form).n_white,
                          "onUpdate:modelValue": ($event) => unref(form).n_white = $event,
                          placeholder: "\u8BF7\u8F93\u5165IP\u767D\u540D\u5355\uFF0C\u591A\u4E2AIP\u7528\u9017\u53F7\u5206\u9694",
                          "allow-clear": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_a_textarea, {
                            modelValue: unref(form).n_white,
                            "onUpdate:modelValue": ($event) => unref(form).n_white = $event,
                            placeholder: "\u8BF7\u8F93\u5165IP\u767D\u540D\u5355\uFF0C\u591A\u4E2AIP\u7528\u9017\u53F7\u5206\u9694",
                            "allow-clear": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_a_form_item, {
                    field: "ip_blacklist",
                    label: "IP\u9ED1\u540D\u5355"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_textarea, {
                          modelValue: unref(form).n_black,
                          "onUpdate:modelValue": ($event) => unref(form).n_black = $event,
                          placeholder: "\u8BF7\u8F93\u5165IP\u9ED1\u540D\u5355\uFF0C\u591A\u4E2AIP\u7528\u9017\u53F7\u5206\u9694",
                          "allow-clear": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_a_textarea, {
                            modelValue: unref(form).n_black,
                            "onUpdate:modelValue": ($event) => unref(form).n_black = $event,
                            placeholder: "\u8BF7\u8F93\u5165IP\u9ED1\u540D\u5355\uFF0C\u591A\u4E2AIP\u7528\u9017\u53F7\u5206\u9694",
                            "allow-clear": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_a_form_item, {
                    field: "name",
                    label: "\u4EC5\u767D\u540D\u5355\u8BBF\u95EE"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_radio_group, {
                          modelValue: unref(form).n_ipstatus,
                          "onUpdate:modelValue": ($event) => unref(form).n_ipstatus = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_a_radio, { value: "0" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`\u5426`);
                                  } else {
                                    return [
                                      createTextVNode("\u5426")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_a_radio, { value: "1" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`\u662F`);
                                  } else {
                                    return [
                                      createTextVNode("\u662F")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_a_radio, { value: "0" }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u5426")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_a_radio, { value: "1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u662F")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_a_radio_group, {
                            modelValue: unref(form).n_ipstatus,
                            "onUpdate:modelValue": ($event) => unref(form).n_ipstatus = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_a_radio, { value: "0" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u5426")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_a_radio, { value: "1" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u662F")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_a_form_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_button, {
                          class: "btn-primary",
                          type: "primary",
                          onClick: ($event) => clickNewKey()
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u63D0\u4EA4`);
                            } else {
                              return [
                                createTextVNode("\u63D0\u4EA4")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_a_button, {
                            class: "btn-primary",
                            type: "primary",
                            onClick: ($event) => clickNewKey()
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u63D0\u4EA4")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_form_item, {
                      field: "name",
                      label: "\u540D\u79F0"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_a_input, {
                          modelValue: unref(form).n_name,
                          "onUpdate:modelValue": ($event) => unref(form).n_name = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_a_form_item, {
                      field: "ip_whitelist",
                      label: "IP\u767D\u540D\u5355"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_a_textarea, {
                          modelValue: unref(form).n_white,
                          "onUpdate:modelValue": ($event) => unref(form).n_white = $event,
                          placeholder: "\u8BF7\u8F93\u5165IP\u767D\u540D\u5355\uFF0C\u591A\u4E2AIP\u7528\u9017\u53F7\u5206\u9694",
                          "allow-clear": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_a_form_item, {
                      field: "ip_blacklist",
                      label: "IP\u9ED1\u540D\u5355"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_a_textarea, {
                          modelValue: unref(form).n_black,
                          "onUpdate:modelValue": ($event) => unref(form).n_black = $event,
                          placeholder: "\u8BF7\u8F93\u5165IP\u9ED1\u540D\u5355\uFF0C\u591A\u4E2AIP\u7528\u9017\u53F7\u5206\u9694",
                          "allow-clear": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_a_form_item, {
                      field: "name",
                      label: "\u4EC5\u767D\u540D\u5355\u8BBF\u95EE"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_a_radio_group, {
                          modelValue: unref(form).n_ipstatus,
                          "onUpdate:modelValue": ($event) => unref(form).n_ipstatus = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_a_radio, { value: "0" }, {
                              default: withCtx(() => [
                                createTextVNode("\u5426")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_a_radio, { value: "1" }, {
                              default: withCtx(() => [
                                createTextVNode("\u662F")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_a_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_a_button, {
                          class: "btn-primary",
                          type: "primary",
                          onClick: ($event) => clickNewKey()
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u63D0\u4EA4")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_a_form, {
                model: unref(form),
                layout: "vertical"
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_form_item, {
                    field: "name",
                    label: "\u540D\u79F0"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_input, {
                        modelValue: unref(form).n_name,
                        "onUpdate:modelValue": ($event) => unref(form).n_name = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_a_form_item, {
                    field: "ip_whitelist",
                    label: "IP\u767D\u540D\u5355"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_textarea, {
                        modelValue: unref(form).n_white,
                        "onUpdate:modelValue": ($event) => unref(form).n_white = $event,
                        placeholder: "\u8BF7\u8F93\u5165IP\u767D\u540D\u5355\uFF0C\u591A\u4E2AIP\u7528\u9017\u53F7\u5206\u9694",
                        "allow-clear": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_a_form_item, {
                    field: "ip_blacklist",
                    label: "IP\u9ED1\u540D\u5355"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_textarea, {
                        modelValue: unref(form).n_black,
                        "onUpdate:modelValue": ($event) => unref(form).n_black = $event,
                        placeholder: "\u8BF7\u8F93\u5165IP\u9ED1\u540D\u5355\uFF0C\u591A\u4E2AIP\u7528\u9017\u53F7\u5206\u9694",
                        "allow-clear": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_a_form_item, {
                    field: "name",
                    label: "\u4EC5\u767D\u540D\u5355\u8BBF\u95EE"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_radio_group, {
                        modelValue: unref(form).n_ipstatus,
                        "onUpdate:modelValue": ($event) => unref(form).n_ipstatus = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_a_radio, { value: "0" }, {
                            default: withCtx(() => [
                              createTextVNode("\u5426")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_a_radio, { value: "1" }, {
                            default: withCtx(() => [
                              createTextVNode("\u662F")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_a_form_item, null, {
                    default: withCtx(() => [
                      createVNode(_component_a_button, {
                        class: "btn-primary",
                        type: "primary",
                        onClick: ($event) => clickNewKey()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u63D0\u4EA4")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_popupMob, {
        modelValue: unref(showInfo),
        "onUpdate:modelValue": ($event) => isRef(showInfo) ? showInfo.value = $event : null,
        Title: "\u79D8\u94A5\u8BE6\u60C5",
        Nook: ""
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="KeyInfo" data-v-6d255f9e${_scopeId}><div class="Title" data-v-6d255f9e${_scopeId}>${ssrInterpolate(unref(form).n_name || "\u672A\u547D\u540D")}</div><div class="Key" data-v-6d255f9e${_scopeId}>${ssrInterpolate(unref(form).n_key)}</div><div class="Time" data-v-6d255f9e${_scopeId}>${ssrInterpolate(unref(form).n_time)}</div></div>`);
          } else {
            return [
              createVNode("div", { class: "KeyInfo" }, [
                createVNode("div", { class: "Title" }, toDisplayString(unref(form).n_name || "\u672A\u547D\u540D"), 1),
                createVNode("div", { class: "Key" }, toDisplayString(unref(form).n_key), 1),
                createVNode("div", { class: "Time" }, toDisplayString(unref(form).n_time), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/user/index/keys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const keys = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6d255f9e"]]);

export { keys as default };
//# sourceMappingURL=keys-BAVhW6nt.mjs.map
