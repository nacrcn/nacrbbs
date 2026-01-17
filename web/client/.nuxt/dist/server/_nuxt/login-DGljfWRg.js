import { Form, Input, FormItem, Button, Message } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/button/style/css.js";
import "@arco-design/web-vue/es/form/style/css.js";
import "@arco-design/web-vue/es/input/style/css.js";
import { ref, resolveComponent, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { f as useCookie, b as useSiteConfig, d as useApiFetch, n as navigateTo } from "../server.mjs";
import { s as setInterval } from "./interval-Cu-4gskx.js";
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
        Message.success("登录成功");
        UToken.value = res.data;
        navigateTo("/");
      } else {
        Message.error(res.msg);
      }
    };
    const register = async () => {
      const res = await useApiFetch().post("/api/register", form.value);
      if (res.code == 200) {
        Message.success("注册成功");
        showIndex.value = 0;
      } else {
        Message.error(res.msg);
      }
    };
    const RetrievePassword = async () => {
      const res = await useApiFetch().post("/api/RetrievePassword", form.value);
      if (res.code == 200) {
        Message.success("找回成功");
        showIndex.value = 0;
      } else {
        Message.error(res.msg);
      }
    };
    const loading = ref(false);
    const SendVerificationCode = async () => {
      if (countdown.value > 0) {
        Message.warning(`请等待 ${countdown.value} 秒后重试`);
        return;
      }
      if (!form.value.username || form.value.username.length < 1) {
        Message.warning("请输入邮箱");
        return;
      }
      loading.value = true;
      const res = await useApiFetch().post("/api/sendVerificationCode", {
        to: form.value.username
      });
      loading.value = false;
      if (res.code == 200) {
        Message.success("发送成功");
        startCountdown();
      } else {
        Message.error(res.msg);
      }
    };
    const countdown = ref(0);
    const countdownText = ref("获取验证码");
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
        _push(`<div class="LoginBox" data-v-a391bbf2><div class="LoginTopInfo" data-v-a391bbf2><p class="LoginTopInfocs" data-v-a391bbf2>Hi! User!</p><p class="LoginTopInfoTitle" data-v-a391bbf2>欢迎回来，尊敬的用户</p></div>`);
        _push(ssrRenderComponent(_component_a_form, {
          model: unref(form),
          layout: "vertical",
          onSubmit: login2
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_input, {
                placeholder: "请输入账号",
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
                placeholder: "请输入密码",
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
                          _push4(`立即登录`);
                        } else {
                          return [
                            createTextVNode("立即登录")
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
                          createTextVNode("立即登录")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p data-v-a391bbf2${_scopeId}><span data-v-a391bbf2${_scopeId}>没有账号？</span>`);
              _push2(ssrRenderComponent(_component_a_button, {
                type: "text",
                onClick: ($event) => showIndex.value = 1
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`立即注册`);
                  } else {
                    return [
                      createTextVNode("立即注册")
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
                      _push3(`忘记密码?`);
                    } else {
                      return [
                        createTextVNode("忘记密码?")
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
                  placeholder: "请输入账号",
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
                  placeholder: "请输入密码",
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
                        createTextVNode("立即登录")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("p", null, [
                  createVNode("span", null, "没有账号？"),
                  createVNode(_component_a_button, {
                    type: "text",
                    onClick: ($event) => showIndex.value = 1
                  }, {
                    default: withCtx(() => [
                      createTextVNode("立即注册")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  unref(SiteConfig).$state.Config.n_captcha_type == "1" ? (openBlock(), createBlock(_component_a_button, {
                    key: 0,
                    type: "text",
                    onClick: ($event) => showIndex.value = 2
                  }, {
                    default: withCtx(() => [
                      createTextVNode("忘记密码?")
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
        _push(`<div class="LoginBox" data-v-a391bbf2><div class="LoginTopInfo" data-v-a391bbf2><p class="LoginTopInfocs" data-v-a391bbf2>Hi! User!</p><p class="LoginTopInfoTitle" data-v-a391bbf2>欢迎注册！</p></div>`);
        _push(ssrRenderComponent(_component_a_form, {
          model: unref(form),
          layout: "vertical",
          onSubmit: register
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_input, {
                placeholder: "请输入昵称",
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
                placeholder: "请输入邮箱",
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
                placeholder: "请输入密码",
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
                  placeholder: "请输入验证码",
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
                          _push4(`立即登录`);
                        } else {
                          return [
                            createTextVNode("立即登录")
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
                          createTextVNode("立即登录")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p data-v-a391bbf2${_scopeId}><span data-v-a391bbf2${_scopeId}>已有账号？</span>`);
              _push2(ssrRenderComponent(_component_a_button, {
                type: "text",
                onClick: ($event) => showIndex.value = 0
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`返回登录`);
                  } else {
                    return [
                      createTextVNode("返回登录")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</p>`);
            } else {
              return [
                createVNode(_component_a_input, {
                  placeholder: "请输入昵称",
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
                  placeholder: "请输入邮箱",
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
                  placeholder: "请输入密码",
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
                  placeholder: "请输入验证码",
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
                        createTextVNode("立即登录")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("p", null, [
                  createVNode("span", null, "已有账号？"),
                  createVNode(_component_a_button, {
                    type: "text",
                    onClick: ($event) => showIndex.value = 0
                  }, {
                    default: withCtx(() => [
                      createTextVNode("返回登录")
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
        _push(`<div class="LoginBox" data-v-a391bbf2><div class="LoginTopInfo" data-v-a391bbf2><p class="LoginTopInfocs" data-v-a391bbf2>Hi! User!</p><p class="LoginTopInfoTitle" data-v-a391bbf2>下次可不能忘记密码了哦！</p></div>`);
        _push(ssrRenderComponent(_component_a_form, {
          model: unref(form),
          layout: "vertical",
          onSubmit: RetrievePassword
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_input, {
                placeholder: "请输入邮箱",
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
                  placeholder: "请输入验证码",
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
                placeholder: "请输入新密码",
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
                          _push4(`立即登录`);
                        } else {
                          return [
                            createTextVNode("立即登录")
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
                          createTextVNode("立即登录")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p data-v-a391bbf2${_scopeId}><span data-v-a391bbf2${_scopeId}>已有账号？</span>`);
              _push2(ssrRenderComponent(_component_a_button, {
                type: "text",
                onClick: ($event) => showIndex.value = 0
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`返回登录`);
                  } else {
                    return [
                      createTextVNode("返回登录")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</p>`);
            } else {
              return [
                createVNode(_component_a_input, {
                  placeholder: "请输入邮箱",
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
                  placeholder: "请输入验证码",
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
                  placeholder: "请输入新密码",
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
                        createTextVNode("立即登录")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("p", null, [
                  createVNode("span", null, "已有账号？"),
                  createVNode(_component_a_button, {
                    type: "text",
                    onClick: ($event) => showIndex.value = 0
                  }, {
                    default: withCtx(() => [
                      createTextVNode("返回登录")
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
export {
  login as default
};
//# sourceMappingURL=login-DGljfWRg.js.map
