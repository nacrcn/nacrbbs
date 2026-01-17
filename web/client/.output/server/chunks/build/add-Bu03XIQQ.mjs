import { _ as _sfc_main$1 } from './RichInput-Cb98n3LG.mjs';
import { Message, Form, FormItem, Input, Textarea, Select, Option, Space, Button } from '@arco-design/web-vue';
import { ref, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './1-BLe-Ftx3.mjs';
import { c as useRoute, b as useSiteConfig, a as useUserInfo, n as navigateTo, d as useApiFetch } from './server.mjs';
import { u as useSeoSet } from './useSeoSet-ri8aJ8nG.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import '@vueuse/core';
import './v3-DUQAjvLz.mjs';

const _sfc_main = {
  __name: "add",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    route.params.id;
    const SiteConfig = useSiteConfig();
    const UserInfo = useUserInfo();
    UserInfo.init((res) => {
      if (!res) {
        Message.error("\u8BF7\u5148\u767B\u5F55");
        navigateTo("/login");
      }
    });
    useSeoSet({
      title: "\u6DFB\u52A0\u5185\u5BB9 - " + SiteConfig.$state.Config.n_web_title
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
      console.log("\u5F53\u524D\u8D44\u6E90\u5217\u8868:", resources.value);
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
        const res = await useApiFetch().post("/api/AddThreads", subFrom);
        if (res.code == 200) {
          Message.success("\u63D0\u4EA4\u6210\u529F");
        } else {
          Message.error(res.message || "\u63D0\u4EA4\u5931\u8D25");
        }
      } catch (error) {
        Message.error(error.message);
      }
    };
    const CategoryList = ref([]);
    const TopicList = ref([]);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "Pageas" }, _attrs))} data-v-75ef484e><div class="PageContent" data-v-75ef484e><div class="ConBox" data-v-75ef484e><div class="title" data-v-75ef484e><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-75ef484e><span data-v-75ef484e>\u53D1\u5E03\u8D34\u8D34</span></div>`);
      _push(ssrRenderComponent(_component_a_form, {
        model: unref(form),
        layout: "vertical"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_form_item, {
              field: "name",
              label: "\u6807\u9898"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_input, {
                    class: "road",
                    modelValue: unref(form).n_name,
                    "onUpdate:modelValue": ($event) => unref(form).n_name = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u6807\u9898"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_input, {
                      class: "road",
                      modelValue: unref(form).n_name,
                      "onUpdate:modelValue": ($event) => unref(form).n_name = $event,
                      placeholder: "\u8BF7\u8F93\u5165\u6807\u9898"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_a_form_item, {
              field: "post",
              label: "\u7B80\u4ECB"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_textarea, {
                    class: "road",
                    modelValue: unref(form).n_profile,
                    "onUpdate:modelValue": ($event) => unref(form).n_profile = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u7B80\u4ECB",
                    "max-length": 100,
                    "allow-clear": "",
                    "show-word-limit": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_textarea, {
                      class: "road",
                      modelValue: unref(form).n_profile,
                      "onUpdate:modelValue": ($event) => unref(form).n_profile = $event,
                      placeholder: "\u8BF7\u8F93\u5165\u7B80\u4ECB",
                      "max-length": 100,
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
              label: "\u8BE6\u60C5"
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
                label: "\u6807\u9898"
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_input, {
                    class: "road",
                    modelValue: unref(form).n_name,
                    "onUpdate:modelValue": ($event) => unref(form).n_name = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u6807\u9898"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_a_form_item, {
                field: "post",
                label: "\u7B80\u4ECB"
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_textarea, {
                    class: "road",
                    modelValue: unref(form).n_profile,
                    "onUpdate:modelValue": ($event) => unref(form).n_profile = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u7B80\u4ECB",
                    "max-length": 100,
                    "allow-clear": "",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_a_form_item, {
                field: "post",
                label: "\u8BE6\u60C5"
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
      _push(`</div><div class="RightBox" data-v-75ef484e><div class="Items" data-v-75ef484e><div class="title" data-v-75ef484e><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-75ef484e><span data-v-75ef484e>\u786E\u8BA4\u4FE1\u606F</span></div>`);
      _push(ssrRenderComponent(_component_a_form, {
        model: unref(form),
        layout: "vertical"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_form_item, {
              field: "post",
              label: "\u5206\u7C7B"
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
                    placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B"
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
                      placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B"
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
              label: "\u8BDD\u9898"
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
                    placeholder: "\u8BF7\u9009\u62E9\u8BDD\u9898"
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
                      placeholder: "\u8BF7\u9009\u62E9\u8BDD\u9898"
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
              label: "\u6743\u9650"
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
                          placeholder: "\u8BF7\u9009\u62E9"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_a_option, { value: "1" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`\u514D\u8D39\u516C\u5F00`);
                                  } else {
                                    return [
                                      createTextVNode("\u514D\u8D39\u516C\u5F00")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_a_option, { value: "2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`\u79EF\u5206\u516C\u5F00`);
                                  } else {
                                    return [
                                      createTextVNode("\u79EF\u5206\u516C\u5F00")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_a_option, { value: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`\u4ED8\u8D39\u516C\u5F00`);
                                  } else {
                                    return [
                                      createTextVNode("\u4ED8\u8D39\u516C\u5F00")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_a_option, { value: "1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u514D\u8D39\u516C\u5F00")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_a_option, { value: "2" }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u79EF\u5206\u516C\u5F00")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_a_option, { value: "3" }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u4ED8\u8D39\u516C\u5F00")
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
                            placeholder: "\u8BF7\u8F93\u5165\u4EF7\u683C"
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
                            placeholder: "\u8BF7\u9009\u62E9"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_a_option, { value: "1" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u514D\u8D39\u516C\u5F00")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_a_option, { value: "2" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u79EF\u5206\u516C\u5F00")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_a_option, { value: "3" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u4ED8\u8D39\u516C\u5F00")
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
                            placeholder: "\u8BF7\u8F93\u5165\u4EF7\u683C"
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
                          placeholder: "\u8BF7\u9009\u62E9"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_a_option, { value: "1" }, {
                              default: withCtx(() => [
                                createTextVNode("\u514D\u8D39\u516C\u5F00")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_a_option, { value: "2" }, {
                              default: withCtx(() => [
                                createTextVNode("\u79EF\u5206\u516C\u5F00")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_a_option, { value: "3" }, {
                              default: withCtx(() => [
                                createTextVNode("\u4ED8\u8D39\u516C\u5F00")
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
                          placeholder: "\u8BF7\u8F93\u5165\u4EF7\u683C"
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
                        _push4(`\u63D0\u4EA4`);
                      } else {
                        return [
                          createTextVNode("\u63D0\u4EA4")
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
                        createTextVNode("\u63D0\u4EA4")
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
                label: "\u5206\u7C7B"
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_select, {
                    multiple: "",
                    class: "road",
                    "max-tag-count": 2,
                    "allow-clear": "",
                    modelValue: unref(form).n_category,
                    "onUpdate:modelValue": ($event) => unref(form).n_category = $event,
                    placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B"
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
                label: "\u8BDD\u9898"
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_select, {
                    multiple: "",
                    class: "road",
                    "max-tag-count": 2,
                    "allow-clear": "",
                    modelValue: unref(form).n_topic,
                    "onUpdate:modelValue": ($event) => unref(form).n_topic = $event,
                    placeholder: "\u8BF7\u9009\u62E9\u8BDD\u9898"
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
                label: "\u6743\u9650"
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_space, null, {
                    default: withCtx(() => [
                      createVNode(_component_a_select, {
                        class: "road",
                        modelValue: unref(form).n_permission,
                        "onUpdate:modelValue": ($event) => unref(form).n_permission = $event,
                        placeholder: "\u8BF7\u9009\u62E9"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_a_option, { value: "1" }, {
                            default: withCtx(() => [
                              createTextVNode("\u514D\u8D39\u516C\u5F00")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_a_option, { value: "2" }, {
                            default: withCtx(() => [
                              createTextVNode("\u79EF\u5206\u516C\u5F00")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_a_option, { value: "3" }, {
                            default: withCtx(() => [
                              createTextVNode("\u4ED8\u8D39\u516C\u5F00")
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
                        placeholder: "\u8BF7\u8F93\u5165\u4EF7\u683C"
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
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/index/add.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-75ef484e"]]);

export { add as default };
//# sourceMappingURL=add-Bu03XIQQ.mjs.map
