import { Form, Input, FormItem, Button, Message } from '@arco-design/web-vue';
import { ref, resolveComponent, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { f as useCookie, b as useSiteConfig, d as useApiFetch, n as navigateTo } from './server.mjs';
import { s as setInterval } from './interval-Cu-4gskx.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const UToken = useCookie("UToken");
    const SiteConfig = useSiteConfig();
    const showIndex = ref(0);
    const form = ref({});
    const login2 = async () => {
      const res = await useApiFetch().post("/api/login", form.value);
      if (res.code == 200) {
        Message.success("\u767B\u5F55\u6210\u529F");
        UToken.value = res.data;
        navigateTo("/");
      } else {
        Message.error(res.msg);
      }
    };
    const register = async () => {
      const res = await useApiFetch().post("/api/register", form.value);
      if (res.code == 200) {
        Message.success("\u6CE8\u518C\u6210\u529F");
        showIndex.value = 0;
      } else {
        Message.error(res.msg);
      }
    };
    const RetrievePassword = async () => {
      const res = await useApiFetch().post("/api/RetrievePassword", form.value);
      if (res.code == 200) {
        Message.success("\u627E\u56DE\u6210\u529F");
        showIndex.value = 0;
      } else {
        Message.error(res.msg);
      }
    };
    const loading = ref(false);
    const SendVerificationCode = async () => {
      if (countdown.value > 0) {
        Message.warning(`\u8BF7\u7B49\u5F85 ${countdown.value} \u79D2\u540E\u91CD\u8BD5`);
        return;
      }
      if (!form.value.username || form.value.username.length < 1) {
        Message.warning("\u8BF7\u8F93\u5165\u90AE\u7BB1");
        return;
      }
      loading.value = true;
      const res = await useApiFetch().post("/api/sendVerificationCode", {
        to: form.value.username
      });
      loading.value = false;
      if (res.code == 200) {
        Message.success("\u53D1\u9001\u6210\u529F");
        startCountdown();
      } else {
        Message.error(res.msg);
      }
    };
    const countdown = ref(0);
    const countdownText = ref("\u83B7\u53D6\u9A8C\u8BC1\u7801");
    const startCountdown = () => {
      countdown.value = 60;
      setInterval();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_form = Form;
      const _component_a_input = Input;
      const _component_icon_user = resolveComponent("icon-user");
      const _component_icon_lock = resolveComponent("icon-lock");
      const _component_a_form_item = FormItem;
      const _component_a_button = Button;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-a391bbf2><div class="LoginTop" data-v-a391bbf2></div>`);
      if (unref(showIndex) == 0) {
        _push(`<div class="LoginBox" data-v-a391bbf2><div class="LoginTopInfo" data-v-a391bbf2><p class="LoginTopInfocs" data-v-a391bbf2>Hi! User!</p><p class="LoginTopInfoTitle" data-v-a391bbf2>\u6B22\u8FCE\u56DE\u6765\uFF0C\u5C0A\u656C\u7684\u7528\u6237</p></div>`);
        _push(ssrRenderComponent(_component_a_form, {
          model: unref(form),
          layout: "vertical",
          onSubmit: login2
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_input, {
                placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7",
                type: "text",
                "allow-clear": "",
                modelValue: unref(form).username,
                "onUpdate:modelValue": ($event) => unref(form).username = $event,
                class: "input"
              }, {
                prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_icon_user, null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_icon_user)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_a_input, {
                placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                "allow-clear": "",
                type: "password",
                modelValue: unref(form).password,
                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                class: "input"
              }, {
                prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_icon_lock, null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_icon_lock)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_a_form_item, { hideLabel: true }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_a_button, {
                      class: "loginbut",
                      type: "primary",
                      "html-type": "submit"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u7ACB\u5373\u767B\u5F55`);
                        } else {
                          return [
                            createTextVNode("\u7ACB\u5373\u767B\u5F55")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_a_button, {
                        class: "loginbut",
                        type: "primary",
                        "html-type": "submit"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u7ACB\u5373\u767B\u5F55")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p data-v-a391bbf2${_scopeId}><span data-v-a391bbf2${_scopeId}>\u6CA1\u6709\u8D26\u53F7\uFF1F</span>`);
              _push2(ssrRenderComponent(_component_a_button, {
                type: "text",
                onClick: ($event) => showIndex.value = 1
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u7ACB\u5373\u6CE8\u518C`);
                  } else {
                    return [
                      createTextVNode("\u7ACB\u5373\u6CE8\u518C")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(SiteConfig).$state.Config.n_captcha_type == "1") {
                _push2(ssrRenderComponent(_component_a_button, {
                  type: "text",
                  onClick: ($event) => showIndex.value = 2
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`\u5FD8\u8BB0\u5BC6\u7801?`);
                    } else {
                      return [
                        createTextVNode("\u5FD8\u8BB0\u5BC6\u7801?")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</p>`);
            } else {
              return [
                createVNode(_component_a_input, {
                  placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7",
                  type: "text",
                  "allow-clear": "",
                  modelValue: unref(form).username,
                  "onUpdate:modelValue": ($event) => unref(form).username = $event,
                  class: "input"
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_icon_user)
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_a_input, {
                  placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                  "allow-clear": "",
                  type: "password",
                  modelValue: unref(form).password,
                  "onUpdate:modelValue": ($event) => unref(form).password = $event,
                  class: "input"
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_icon_lock)
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_a_form_item, { hideLabel: true }, {
                  default: withCtx(() => [
                    createVNode(_component_a_button, {
                      class: "loginbut",
                      type: "primary",
                      "html-type": "submit"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u7ACB\u5373\u767B\u5F55")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("p", null, [
                  createVNode("span", null, "\u6CA1\u6709\u8D26\u53F7\uFF1F"),
                  createVNode(_component_a_button, {
                    type: "text",
                    onClick: ($event) => showIndex.value = 1
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u7ACB\u5373\u6CE8\u518C")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  unref(SiteConfig).$state.Config.n_captcha_type == "1" ? (openBlock(), createBlock(_component_a_button, {
                    key: 0,
                    type: "text",
                    onClick: ($event) => showIndex.value = 2
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u5FD8\u8BB0\u5BC6\u7801?")
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showIndex) == 1) {
        _push(`<div class="LoginBox" data-v-a391bbf2><div class="LoginTopInfo" data-v-a391bbf2><p class="LoginTopInfocs" data-v-a391bbf2>Hi! User!</p><p class="LoginTopInfoTitle" data-v-a391bbf2>\u6B22\u8FCE\u6CE8\u518C\uFF01</p></div>`);
        _push(ssrRenderComponent(_component_a_form, {
          model: unref(form),
          layout: "vertical",
          onSubmit: register
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_input, {
                placeholder: "\u8BF7\u8F93\u5165\u6635\u79F0",
                type: "text",
                "allow-clear": "",
                modelValue: unref(form).nickname,
                "onUpdate:modelValue": ($event) => unref(form).nickname = $event,
                class: "input"
              }, {
                prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_icon_user, null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_icon_user)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_a_input, {
                placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                type: "text",
                "allow-clear": "",
                modelValue: unref(form).username,
                "onUpdate:modelValue": ($event) => unref(form).username = $event,
                class: "input"
              }, {
                prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_icon_user, null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_icon_user)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_a_input, {
                placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                "allow-clear": "",
                type: "password",
                modelValue: unref(form).password,
                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                class: "input"
              }, {
                prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_icon_lock, null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_icon_lock)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(SiteConfig).$state.Config.n_captcha_type == "1") {
                _push2(ssrRenderComponent(_component_a_input, {
                  placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
                  "allow-clear": "",
                  type: "text",
                  modelValue: unref(form).code,
                  "onUpdate:modelValue": ($event) => unref(form).code = $event,
                  class: "input"
                }, {
                  prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_icon_lock, null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_icon_lock)
                      ];
                    }
                  }),
                  suffix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_a_button, {
                        type: "text",
                        loading: unref(loading),
                        onClick: SendVerificationCode,
                        disabled: unref(countdown) > 0
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(unref(countdownText))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(unref(countdownText)), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_a_button, {
                          type: "text",
                          loading: unref(loading),
                          onClick: SendVerificationCode,
                          disabled: unref(countdown) > 0
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(countdownText)), 1)
                          ]),
                          _: 1
                        }, 8, ["loading", "disabled"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_a_form_item, { hideLabel: true }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_a_button, {
                      class: "loginbut",
                      type: "primary",
                      "html-type": "submit"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u7ACB\u5373\u767B\u5F55`);
                        } else {
                          return [
                            createTextVNode("\u7ACB\u5373\u767B\u5F55")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_a_button, {
                        class: "loginbut",
                        type: "primary",
                        "html-type": "submit"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u7ACB\u5373\u767B\u5F55")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p data-v-a391bbf2${_scopeId}><span data-v-a391bbf2${_scopeId}>\u5DF2\u6709\u8D26\u53F7\uFF1F</span>`);
              _push2(ssrRenderComponent(_component_a_button, {
                type: "text",
                onClick: ($event) => showIndex.value = 0
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u8FD4\u56DE\u767B\u5F55`);
                  } else {
                    return [
                      createTextVNode("\u8FD4\u56DE\u767B\u5F55")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</p>`);
            } else {
              return [
                createVNode(_component_a_input, {
                  placeholder: "\u8BF7\u8F93\u5165\u6635\u79F0",
                  type: "text",
                  "allow-clear": "",
                  modelValue: unref(form).nickname,
                  "onUpdate:modelValue": ($event) => unref(form).nickname = $event,
                  class: "input"
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_icon_user)
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_a_input, {
                  placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                  type: "text",
                  "allow-clear": "",
                  modelValue: unref(form).username,
                  "onUpdate:modelValue": ($event) => unref(form).username = $event,
                  class: "input"
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_icon_user)
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_a_input, {
                  placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                  "allow-clear": "",
                  type: "password",
                  modelValue: unref(form).password,
                  "onUpdate:modelValue": ($event) => unref(form).password = $event,
                  class: "input"
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_icon_lock)
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                unref(SiteConfig).$state.Config.n_captcha_type == "1" ? (openBlock(), createBlock(_component_a_input, {
                  key: 0,
                  placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
                  "allow-clear": "",
                  type: "text",
                  modelValue: unref(form).code,
                  "onUpdate:modelValue": ($event) => unref(form).code = $event,
                  class: "input"
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_icon_lock)
                  ]),
                  suffix: withCtx(() => [
                    createVNode(_component_a_button, {
                      type: "text",
                      loading: unref(loading),
                      onClick: SendVerificationCode,
                      disabled: unref(countdown) > 0
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(countdownText)), 1)
                      ]),
                      _: 1
                    }, 8, ["loading", "disabled"])
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                createVNode(_component_a_form_item, { hideLabel: true }, {
                  default: withCtx(() => [
                    createVNode(_component_a_button, {
                      class: "loginbut",
                      type: "primary",
                      "html-type": "submit"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u7ACB\u5373\u767B\u5F55")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("p", null, [
                  createVNode("span", null, "\u5DF2\u6709\u8D26\u53F7\uFF1F"),
                  createVNode(_component_a_button, {
                    type: "text",
                    onClick: ($event) => showIndex.value = 0
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u8FD4\u56DE\u767B\u5F55")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showIndex) == 2) {
        _push(`<div class="LoginBox" data-v-a391bbf2><div class="LoginTopInfo" data-v-a391bbf2><p class="LoginTopInfocs" data-v-a391bbf2>Hi! User!</p><p class="LoginTopInfoTitle" data-v-a391bbf2>\u4E0B\u6B21\u53EF\u4E0D\u80FD\u5FD8\u8BB0\u5BC6\u7801\u4E86\u54E6\uFF01</p></div>`);
        _push(ssrRenderComponent(_component_a_form, {
          model: unref(form),
          layout: "vertical",
          onSubmit: RetrievePassword
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_input, {
                placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                type: "text",
                "allow-clear": "",
                modelValue: unref(form).username,
                "onUpdate:modelValue": ($event) => unref(form).username = $event,
                class: "input"
              }, {
                prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_icon_user, null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_icon_user)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(SiteConfig).$state.Config.n_captcha_type == "1") {
                _push2(ssrRenderComponent(_component_a_input, {
                  placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
                  "allow-clear": "",
                  type: "text",
                  modelValue: unref(form).code,
                  "onUpdate:modelValue": ($event) => unref(form).code = $event,
                  class: "input"
                }, {
                  prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_icon_lock, null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_icon_lock)
                      ];
                    }
                  }),
                  suffix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_a_button, {
                        type: "text",
                        loading: unref(loading),
                        onClick: SendVerificationCode,
                        disabled: unref(countdown) > 0
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(unref(countdownText))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(unref(countdownText)), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_a_button, {
                          type: "text",
                          loading: unref(loading),
                          onClick: SendVerificationCode,
                          disabled: unref(countdown) > 0
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(countdownText)), 1)
                          ]),
                          _: 1
                        }, 8, ["loading", "disabled"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_a_input, {
                placeholder: "\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801",
                "allow-clear": "",
                type: "password",
                modelValue: unref(form).password,
                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                class: "input"
              }, {
                prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_icon_lock, null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_icon_lock)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_a_form_item, { hideLabel: true }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_a_button, {
                      class: "loginbut",
                      type: "primary",
                      "html-type": "submit"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u7ACB\u5373\u767B\u5F55`);
                        } else {
                          return [
                            createTextVNode("\u7ACB\u5373\u767B\u5F55")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_a_button, {
                        class: "loginbut",
                        type: "primary",
                        "html-type": "submit"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u7ACB\u5373\u767B\u5F55")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p data-v-a391bbf2${_scopeId}><span data-v-a391bbf2${_scopeId}>\u5DF2\u6709\u8D26\u53F7\uFF1F</span>`);
              _push2(ssrRenderComponent(_component_a_button, {
                type: "text",
                onClick: ($event) => showIndex.value = 0
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u8FD4\u56DE\u767B\u5F55`);
                  } else {
                    return [
                      createTextVNode("\u8FD4\u56DE\u767B\u5F55")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</p>`);
            } else {
              return [
                createVNode(_component_a_input, {
                  placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                  type: "text",
                  "allow-clear": "",
                  modelValue: unref(form).username,
                  "onUpdate:modelValue": ($event) => unref(form).username = $event,
                  class: "input"
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_icon_user)
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                unref(SiteConfig).$state.Config.n_captcha_type == "1" ? (openBlock(), createBlock(_component_a_input, {
                  key: 0,
                  placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
                  "allow-clear": "",
                  type: "text",
                  modelValue: unref(form).code,
                  "onUpdate:modelValue": ($event) => unref(form).code = $event,
                  class: "input"
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_icon_lock)
                  ]),
                  suffix: withCtx(() => [
                    createVNode(_component_a_button, {
                      type: "text",
                      loading: unref(loading),
                      onClick: SendVerificationCode,
                      disabled: unref(countdown) > 0
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(countdownText)), 1)
                      ]),
                      _: 1
                    }, 8, ["loading", "disabled"])
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                createVNode(_component_a_input, {
                  placeholder: "\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801",
                  "allow-clear": "",
                  type: "password",
                  modelValue: unref(form).password,
                  "onUpdate:modelValue": ($event) => unref(form).password = $event,
                  class: "input"
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_icon_lock)
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_a_form_item, { hideLabel: true }, {
                  default: withCtx(() => [
                    createVNode(_component_a_button, {
                      class: "loginbut",
                      type: "primary",
                      "html-type": "submit"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u7ACB\u5373\u767B\u5F55")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("p", null, [
                  createVNode("span", null, "\u5DF2\u6709\u8D26\u53F7\uFF1F"),
                  createVNode(_component_a_button, {
                    type: "text",
                    onClick: ($event) => showIndex.value = 0
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u8FD4\u56DE\u767B\u5F55")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a391bbf2"]]);

export { login as default };
//# sourceMappingURL=login-DGljfWRg.mjs.map
