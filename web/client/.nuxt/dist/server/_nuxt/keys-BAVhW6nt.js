import { _ as __nuxt_component_0 } from "./UserHeader-DU96A5FR.js";
import { _ as __nuxt_component_1 } from "./popupMob-OgSg-8hC.js";
import { Alert, Space, Button, Popconfirm, Pagination, Form, FormItem, Input, Textarea, RadioGroup, Radio, Message } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/radio/style/css.js";
import "@arco-design/web-vue/es/textarea/style/css.js";
import "@arco-design/web-vue/es/input/style/css.js";
import "@arco-design/web-vue/es/form/style/css.js";
import "@arco-design/web-vue/es/pagination/style/css.js";
import "@arco-design/web-vue/es/popconfirm/style/css.js";
import "@arco-design/web-vue/es/button/style/css.js";
import "@arco-design/web-vue/es/space/style/css.js";
import "@arco-design/web-vue/es/alert/style/css.js";
import { ref, resolveComponent, mergeProps, withCtx, createTextVNode, unref, createVNode, isRef, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { a as useUserInfo, d as useApiFetch } from "../server.mjs";
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
      _push(ssrRenderComponent(_component_UserHeader, { title: "我的API秘钥" }, null, _parent));
      _push(`<div class="Page" data-v-6d255f9e>`);
      _push(ssrRenderComponent(_component_a_alert, {
        type: "warning",
        class: "AlertBox"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`请不要将秘钥泄露给他人，这将可能对您造成损失！`);
          } else {
            return [
              createTextVNode("请不要将秘钥泄露给他人，这将可能对您造成损失！")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="KeyBox" data-v-6d255f9e><!--[-->`);
      ssrRenderList(unref(keys2), (value) => {
        _push(`<div class="KeyItem" data-v-6d255f9e><div class="KeyInfo" data-v-6d255f9e><div class="Title" data-v-6d255f9e>${ssrInterpolate(value.n_name || "未命名")}</div><div class="Key" data-v-6d255f9e>${ssrInterpolate(replaceKey(value.n_key))}</div><div class="Time" data-v-6d255f9e>${ssrInterpolate(value.n_time)}</div></div><div class="KeyAction" data-v-6d255f9e>`);
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
                    _push3(`编辑`);
                  } else {
                    return [
                      createTextVNode("编辑")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_a_popconfirm, {
                content: "确定删除此API密钥吗？删除后秘钥将立马失效！",
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
                          _push4(`删除`);
                        } else {
                          return [
                            createTextVNode("删除")
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
                          createTextVNode("删除")
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
                    createTextVNode("编辑")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_a_popconfirm, {
                  content: "确定删除此API密钥吗？删除后秘钥将立马失效！",
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
                        createTextVNode("删除")
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
      _push(`<p data-v-6d255f9e>创建新秘钥</p></div></div></div></div>`);
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
        Title: unref(type) === 1 ? "创建新秘钥" : "修改秘钥",
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
                    label: "名称"
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
                    label: "IP白名单"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_textarea, {
                          modelValue: unref(form).n_white,
                          "onUpdate:modelValue": ($event) => unref(form).n_white = $event,
                          placeholder: "请输入IP白名单，多个IP用逗号分隔",
                          "allow-clear": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_a_textarea, {
                            modelValue: unref(form).n_white,
                            "onUpdate:modelValue": ($event) => unref(form).n_white = $event,
                            placeholder: "请输入IP白名单，多个IP用逗号分隔",
                            "allow-clear": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_a_form_item, {
                    field: "ip_blacklist",
                    label: "IP黑名单"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_textarea, {
                          modelValue: unref(form).n_black,
                          "onUpdate:modelValue": ($event) => unref(form).n_black = $event,
                          placeholder: "请输入IP黑名单，多个IP用逗号分隔",
                          "allow-clear": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_a_textarea, {
                            modelValue: unref(form).n_black,
                            "onUpdate:modelValue": ($event) => unref(form).n_black = $event,
                            placeholder: "请输入IP黑名单，多个IP用逗号分隔",
                            "allow-clear": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_a_form_item, {
                    field: "name",
                    label: "仅白名单访问"
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
                                    _push6(`否`);
                                  } else {
                                    return [
                                      createTextVNode("否")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_a_radio, { value: "1" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`是`);
                                  } else {
                                    return [
                                      createTextVNode("是")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_a_radio, { value: "0" }, {
                                  default: withCtx(() => [
                                    createTextVNode("否")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_a_radio, { value: "1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("是")
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
                                  createTextVNode("否")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_a_radio, { value: "1" }, {
                                default: withCtx(() => [
                                  createTextVNode("是")
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
                              _push5(`提交`);
                            } else {
                              return [
                                createTextVNode("提交")
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
                              createTextVNode("提交")
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
                      label: "名称"
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
                      label: "IP白名单"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_a_textarea, {
                          modelValue: unref(form).n_white,
                          "onUpdate:modelValue": ($event) => unref(form).n_white = $event,
                          placeholder: "请输入IP白名单，多个IP用逗号分隔",
                          "allow-clear": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_a_form_item, {
                      field: "ip_blacklist",
                      label: "IP黑名单"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_a_textarea, {
                          modelValue: unref(form).n_black,
                          "onUpdate:modelValue": ($event) => unref(form).n_black = $event,
                          placeholder: "请输入IP黑名单，多个IP用逗号分隔",
                          "allow-clear": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_a_form_item, {
                      field: "name",
                      label: "仅白名单访问"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_a_radio_group, {
                          modelValue: unref(form).n_ipstatus,
                          "onUpdate:modelValue": ($event) => unref(form).n_ipstatus = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_a_radio, { value: "0" }, {
                              default: withCtx(() => [
                                createTextVNode("否")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_a_radio, { value: "1" }, {
                              default: withCtx(() => [
                                createTextVNode("是")
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
                            createTextVNode("提交")
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
                    label: "名称"
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
                    label: "IP白名单"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_textarea, {
                        modelValue: unref(form).n_white,
                        "onUpdate:modelValue": ($event) => unref(form).n_white = $event,
                        placeholder: "请输入IP白名单，多个IP用逗号分隔",
                        "allow-clear": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_a_form_item, {
                    field: "ip_blacklist",
                    label: "IP黑名单"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_textarea, {
                        modelValue: unref(form).n_black,
                        "onUpdate:modelValue": ($event) => unref(form).n_black = $event,
                        placeholder: "请输入IP黑名单，多个IP用逗号分隔",
                        "allow-clear": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_a_form_item, {
                    field: "name",
                    label: "仅白名单访问"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_radio_group, {
                        modelValue: unref(form).n_ipstatus,
                        "onUpdate:modelValue": ($event) => unref(form).n_ipstatus = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_a_radio, { value: "0" }, {
                            default: withCtx(() => [
                              createTextVNode("否")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_a_radio, { value: "1" }, {
                            default: withCtx(() => [
                              createTextVNode("是")
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
                          createTextVNode("提交")
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
        Title: "秘钥详情",
        Nook: ""
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="KeyInfo" data-v-6d255f9e${_scopeId}><div class="Title" data-v-6d255f9e${_scopeId}>${ssrInterpolate(unref(form).n_name || "未命名")}</div><div class="Key" data-v-6d255f9e${_scopeId}>${ssrInterpolate(unref(form).n_key)}</div><div class="Time" data-v-6d255f9e${_scopeId}>${ssrInterpolate(unref(form).n_time)}</div></div>`);
          } else {
            return [
              createVNode("div", { class: "KeyInfo" }, [
                createVNode("div", { class: "Title" }, toDisplayString(unref(form).n_name || "未命名"), 1),
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
export {
  keys as default
};
//# sourceMappingURL=keys-BAVhW6nt.js.map
