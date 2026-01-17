import { _ as _sfc_main$1 } from "./RichInput-Cb98n3LG.js";
import { Message, Form, FormItem, Input, Textarea, Select, Option, Space, Button } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/button/style/css.js";
import "@arco-design/web-vue/es/space/style/css.js";
import "@arco-design/web-vue/es/select/style/css.js";
import "@arco-design/web-vue/es/textarea/style/css.js";
import "@arco-design/web-vue/es/input/style/css.js";
import "@arco-design/web-vue/es/form/style/css.js";
import { ref, withAsyncContext, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _imports_0 } from "./1-BLe-Ftx3.js";
import { c as useRoute, b as useSiteConfig, a as useUserInfo, n as navigateTo, d as useApiFetch } from "../server.mjs";
import { u as useSeoSet } from "./useSeoSet-ri8aJ8nG.js";
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
import "./v3-DUQAjvLz.js";
import "E:/Cpenx/bbs/web/client/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const id = route.params.id;
    const SiteConfig = useSiteConfig();
    const UserInfo = useUserInfo();
    UserInfo.init((res) => {
      if (!res) {
        Message.error("请先登录");
        navigateTo("/login");
      }
    });
    useSeoSet({
      title: "添加内容 - " + SiteConfig.$state.Config.n_web_title
    });
    const ShowEditor = ref(false);
    const form = ref({
      n_name: "",
      n_profile: "",
      n_html: "",
      n_category: [],
      n_topic: [],
      n_permission: "1"
    });
    const resources = ref([]);
    const handleResourcesUpdate = (newResources) => {
      resources.value = newResources;
      console.log("当前资源列表:", resources.value);
    };
    const SubmitForm = async () => {
      let subFrom = {
        ...form.value,
        n_category: JSON.stringify(form.value.n_category),
        n_topic: JSON.stringify(form.value.n_topic),
        n_resources: JSON.stringify(resources.value),
        n_haveimage: 2,
        n_havevideo: 2
      };
      if (resources.value.length > 0) {
        for (let a in resources.value) {
          if (resources.value[a].type == 1) {
            subFrom.n_haveimage = 1;
          }
          if (resources.value[a].type == 2) {
            subFrom.n_havevideo = 1;
          }
        }
      }
      try {
        let res;
        if (id == "add") {
          res = await useApiFetch().post("/api/AddThreads", subFrom);
        } else {
          res = await useApiFetch().post("/api/EditThreads", subFrom);
        }
        if (res.code == 200) {
          Message.success("提交成功");
        } else {
          Message.error(res.message || "提交失败");
        }
      } catch (error) {
        Message.error(error.message);
      }
    };
    const CategoryList = ref([]);
    const TopicList = ref([]);
    if (id == "add") ;
    else {
      const res = ([__temp, __restore] = withAsyncContext(() => useApiFetch().post("/api/GetThreads", {
        id
      })), __temp = await __temp, __restore(), __temp);
      if (res.code === 200) {
        form.value = res.data;
        form.value.n_category = [];
        form.value.n_topic = [];
        for (let a in res.data.category) {
          if (res.data.category[a].n_type == "1") {
            form.value.n_category.push(res.data.category[a].id);
          } else {
            form.value.n_topic.push(res.data.category[a].id);
          }
        }
      } else {
        navigateTo("/threads/404");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_form = Form;
      const _component_a_form_item = FormItem;
      const _component_a_input = Input;
      const _component_a_textarea = Textarea;
      const _component_RichInput = _sfc_main$1;
      const _component_a_select = Select;
      const _component_a_option = Option;
      const _component_a_space = Space;
      const _component_a_button = Button;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "Pageas" }, _attrs))} data-v-aa5f98ec><div class="PageContent" data-v-aa5f98ec><div class="ConBox" data-v-aa5f98ec><div class="title" data-v-aa5f98ec><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-aa5f98ec><span data-v-aa5f98ec>我有话要说</span></div>`);
      _push(ssrRenderComponent(_component_a_form, {
        model: unref(form),
        layout: "vertical"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_form_item, {
              field: "name",
              label: "标题"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_input, {
                    class: "road",
                    modelValue: unref(form).n_name,
                    "onUpdate:modelValue": ($event) => unref(form).n_name = $event,
                    placeholder: "请输入标题"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_input, {
                      class: "road",
                      modelValue: unref(form).n_name,
                      "onUpdate:modelValue": ($event) => unref(form).n_name = $event,
                      placeholder: "请输入标题"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_a_form_item, {
              field: "post",
              label: "简介"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_textarea, {
                    class: "road",
                    modelValue: unref(form).n_profile,
                    "onUpdate:modelValue": ($event) => unref(form).n_profile = $event,
                    placeholder: "请输入简介",
                    "max-length": 200,
                    "allow-clear": "",
                    "show-word-limit": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_textarea, {
                      class: "road",
                      modelValue: unref(form).n_profile,
                      "onUpdate:modelValue": ($event) => unref(form).n_profile = $event,
                      placeholder: "请输入简介",
                      "max-length": 200,
                      "allow-clear": "",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_a_form_item, {
              field: "post",
              label: "详情"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(ShowEditor)) {
                    _push3(ssrRenderComponent(_component_RichInput, {
                      modelValue: unref(form).n_html,
                      "onUpdate:modelValue": ($event) => unref(form).n_html = $event,
                      height: 200,
                      "onUpdate:resources": handleResourcesUpdate
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(ShowEditor) ? (openBlock(), createBlock(_component_RichInput, {
                      key: 0,
                      modelValue: unref(form).n_html,
                      "onUpdate:modelValue": ($event) => unref(form).n_html = $event,
                      height: 200,
                      "onUpdate:resources": handleResourcesUpdate
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_a_form_item, {
                field: "name",
                label: "标题"
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_input, {
                    class: "road",
                    modelValue: unref(form).n_name,
                    "onUpdate:modelValue": ($event) => unref(form).n_name = $event,
                    placeholder: "请输入标题"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_a_form_item, {
                field: "post",
                label: "简介"
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_textarea, {
                    class: "road",
                    modelValue: unref(form).n_profile,
                    "onUpdate:modelValue": ($event) => unref(form).n_profile = $event,
                    placeholder: "请输入简介",
                    "max-length": 200,
                    "allow-clear": "",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_a_form_item, {
                field: "post",
                label: "详情"
              }, {
                default: withCtx(() => [
                  unref(ShowEditor) ? (openBlock(), createBlock(_component_RichInput, {
                    key: 0,
                    modelValue: unref(form).n_html,
                    "onUpdate:modelValue": ($event) => unref(form).n_html = $event,
                    height: 200,
                    "onUpdate:resources": handleResourcesUpdate
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="RightBox" data-v-aa5f98ec><div class="Items" data-v-aa5f98ec><div class="title" data-v-aa5f98ec><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-aa5f98ec><span data-v-aa5f98ec>确认信息</span></div>`);
      _push(ssrRenderComponent(_component_a_form, {
        model: unref(form),
        layout: "vertical"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_form_item, {
              field: "post",
              label: "分类"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_select, {
                    multiple: "",
                    class: "road",
                    "max-tag-count": 2,
                    "allow-clear": "",
                    modelValue: unref(form).n_category,
                    "onUpdate:modelValue": ($event) => unref(form).n_category = $event,
                    placeholder: "请选择分类"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(CategoryList), (item) => {
                          _push4(ssrRenderComponent(_component_a_option, {
                            key: item.id,
                            value: item.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(item.n_name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(item.n_name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(CategoryList), (item) => {
                            return openBlock(), createBlock(_component_a_option, {
                              key: item.id,
                              value: item.id
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.n_name), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_select, {
                      multiple: "",
                      class: "road",
                      "max-tag-count": 2,
                      "allow-clear": "",
                      modelValue: unref(form).n_category,
                      "onUpdate:modelValue": ($event) => unref(form).n_category = $event,
                      placeholder: "请选择分类"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(CategoryList), (item) => {
                          return openBlock(), createBlock(_component_a_option, {
                            key: item.id,
                            value: item.id
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.n_name), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_a_form_item, {
              field: "post",
              label: "话题"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_select, {
                    multiple: "",
                    class: "road",
                    "max-tag-count": 2,
                    "allow-clear": "",
                    modelValue: unref(form).n_topic,
                    "onUpdate:modelValue": ($event) => unref(form).n_topic = $event,
                    placeholder: "请选择话题"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(TopicList), (item) => {
                          _push4(ssrRenderComponent(_component_a_option, {
                            key: item.id,
                            value: item.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(item.n_name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(item.n_name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(TopicList), (item) => {
                            return openBlock(), createBlock(_component_a_option, {
                              key: item.id,
                              value: item.id
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.n_name), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_select, {
                      multiple: "",
                      class: "road",
                      "max-tag-count": 2,
                      "allow-clear": "",
                      modelValue: unref(form).n_topic,
                      "onUpdate:modelValue": ($event) => unref(form).n_topic = $event,
                      placeholder: "请选择话题"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(TopicList), (item) => {
                          return openBlock(), createBlock(_component_a_option, {
                            key: item.id,
                            value: item.id
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.n_name), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_a_form_item, {
              field: "post",
              label: "权限"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_space, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_select, {
                          class: "road",
                          modelValue: unref(form).n_permission,
                          "onUpdate:modelValue": ($event) => unref(form).n_permission = $event,
                          placeholder: "请选择"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_a_option, { value: "1" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`免费公开`);
                                  } else {
                                    return [
                                      createTextVNode("免费公开")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_a_option, { value: "2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`积分公开`);
                                  } else {
                                    return [
                                      createTextVNode("积分公开")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_a_option, { value: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`付费公开`);
                                  } else {
                                    return [
                                      createTextVNode("付费公开")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_a_option, { value: "1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("免费公开")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_a_option, { value: "2" }, {
                                  default: withCtx(() => [
                                    createTextVNode("积分公开")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_a_option, { value: "3" }, {
                                  default: withCtx(() => [
                                    createTextVNode("付费公开")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(form).n_permission !== "1") {
                          _push4(ssrRenderComponent(_component_a_input, {
                            class: "road",
                            modelValue: unref(form).n_price,
                            "onUpdate:modelValue": ($event) => unref(form).n_price = $event,
                            placeholder: "请输入价格"
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(_component_a_select, {
                            class: "road",
                            modelValue: unref(form).n_permission,
                            "onUpdate:modelValue": ($event) => unref(form).n_permission = $event,
                            placeholder: "请选择"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_a_option, { value: "1" }, {
                                default: withCtx(() => [
                                  createTextVNode("免费公开")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_a_option, { value: "2" }, {
                                default: withCtx(() => [
                                  createTextVNode("积分公开")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_a_option, { value: "3" }, {
                                default: withCtx(() => [
                                  createTextVNode("付费公开")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(form).n_permission !== "1" ? (openBlock(), createBlock(_component_a_input, {
                            key: 0,
                            class: "road",
                            modelValue: unref(form).n_price,
                            "onUpdate:modelValue": ($event) => unref(form).n_price = $event,
                            placeholder: "请输入价格"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_space, null, {
                      default: withCtx(() => [
                        createVNode(_component_a_select, {
                          class: "road",
                          modelValue: unref(form).n_permission,
                          "onUpdate:modelValue": ($event) => unref(form).n_permission = $event,
                          placeholder: "请选择"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_a_option, { value: "1" }, {
                              default: withCtx(() => [
                                createTextVNode("免费公开")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_a_option, { value: "2" }, {
                              default: withCtx(() => [
                                createTextVNode("积分公开")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_a_option, { value: "3" }, {
                              default: withCtx(() => [
                                createTextVNode("付费公开")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        unref(form).n_permission !== "1" ? (openBlock(), createBlock(_component_a_input, {
                          key: 0,
                          class: "road",
                          modelValue: unref(form).n_price,
                          "onUpdate:modelValue": ($event) => unref(form).n_price = $event,
                          placeholder: "请输入价格"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_a_form_item, {
              field: "post",
              label: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_button, {
                    type: "primary",
                    class: "road",
                    onClick: ($event) => SubmitForm()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`提交`);
                      } else {
                        return [
                          createTextVNode("提交")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_button, {
                      type: "primary",
                      class: "road",
                      onClick: ($event) => SubmitForm()
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_a_form_item, {
                field: "post",
                label: "分类"
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_select, {
                    multiple: "",
                    class: "road",
                    "max-tag-count": 2,
                    "allow-clear": "",
                    modelValue: unref(form).n_category,
                    "onUpdate:modelValue": ($event) => unref(form).n_category = $event,
                    placeholder: "请选择分类"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(CategoryList), (item) => {
                        return openBlock(), createBlock(_component_a_option, {
                          key: item.id,
                          value: item.id
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.n_name), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_a_form_item, {
                field: "post",
                label: "话题"
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_select, {
                    multiple: "",
                    class: "road",
                    "max-tag-count": 2,
                    "allow-clear": "",
                    modelValue: unref(form).n_topic,
                    "onUpdate:modelValue": ($event) => unref(form).n_topic = $event,
                    placeholder: "请选择话题"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(TopicList), (item) => {
                        return openBlock(), createBlock(_component_a_option, {
                          key: item.id,
                          value: item.id
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.n_name), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_a_form_item, {
                field: "post",
                label: "权限"
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_space, null, {
                    default: withCtx(() => [
                      createVNode(_component_a_select, {
                        class: "road",
                        modelValue: unref(form).n_permission,
                        "onUpdate:modelValue": ($event) => unref(form).n_permission = $event,
                        placeholder: "请选择"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_a_option, { value: "1" }, {
                            default: withCtx(() => [
                              createTextVNode("免费公开")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_a_option, { value: "2" }, {
                            default: withCtx(() => [
                              createTextVNode("积分公开")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_a_option, { value: "3" }, {
                            default: withCtx(() => [
                              createTextVNode("付费公开")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(form).n_permission !== "1" ? (openBlock(), createBlock(_component_a_input, {
                        key: 0,
                        class: "road",
                        modelValue: unref(form).n_price,
                        "onUpdate:modelValue": ($event) => unref(form).n_price = $event,
                        placeholder: "请输入价格"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_a_form_item, {
                field: "post",
                label: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_button, {
                    type: "primary",
                    class: "road",
                    onClick: ($event) => SubmitForm()
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
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/index/threadInfo/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-aa5f98ec"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-CXnviqWv.js.map
