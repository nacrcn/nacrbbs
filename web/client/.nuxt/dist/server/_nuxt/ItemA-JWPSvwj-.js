import { _ as __nuxt_component_1$1 } from "./popupMob-OgSg-8hC.js";
import { a as useUserInfo, n as navigateTo, d as useApiFetch } from "../server.mjs";
import { ref, resolveComponent, mergeProps, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, createTextVNode, toDisplayString, unref, useSSRContext } from "vue";
import { Button, Space, Popconfirm, Form, FormItem, Textarea, Message } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/textarea/style/css.js";
import "@arco-design/web-vue/es/form/style/css.js";
import "@arco-design/web-vue/es/popconfirm/style/css.js";
import "@arco-design/web-vue/es/space/style/css.js";
import "@arco-design/web-vue/es/button/style/css.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ItemA",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const UserInfo = useUserInfo();
    UserInfo.init();
    const formatNumber = (num) => {
      if (num >= 1e3 && num < 1e6) {
        return (num / 1e3).toFixed(1) + "K";
      } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + "M";
      }
      return num;
    };
    const PopShow = ref(false);
    const reportThreadsFrom = ref({
      n_tid: props.data.id,
      n_html: ""
    });
    const reportThreadsShow = ref(false);
    const reportThreads = async () => {
      const res = await useApiFetch().post("/api/ReportThreads", reportThreadsFrom.value);
      if (res.code === 200) {
        reportThreadsShow.value = false;
        Message.success(res.msg);
      } else {
        Message.error(res.msg);
      }
    };
    const DelThreads = async () => {
      try {
        const res = await useApiFetch().post("/api/DelThreads", {
          id: props.data.id
        });
        if (res.code == 200) {
          Message.success("删除成功");
          (void 0).location.reload();
        } else {
          Message.error(res.message || "删除失败");
        }
      } catch (error) {
        Message.error(error.message);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_button = Button;
      const _component_icon_more = resolveComponent("icon-more");
      const _component_icon_play_circle_fill = resolveComponent("icon-play-circle-fill");
      const _component_a_space = Space;
      const _component_icon_eye = resolveComponent("icon-eye");
      const _component_icon_message = resolveComponent("icon-message");
      const _component_icon_thumb_up = resolveComponent("icon-thumb-up");
      const _component_popupMob = __nuxt_component_1$1;
      const _component_icon_edit = resolveComponent("icon-edit");
      const _component_icon_info_circle = resolveComponent("icon-info-circle");
      const _component_a_popconfirm = Popconfirm;
      const _component_icon_delete = resolveComponent("icon-delete");
      const _component_a_form = Form;
      const _component_a_form_item = FormItem;
      const _component_a_textarea = Textarea;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "Itemlist" }, _attrs))} data-v-f870e63d><div class="ButtonSection" data-v-f870e63d>`);
      _push(ssrRenderComponent(_component_a_button, {
        onClick: ($event) => PopShow.value = true
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_icon_more, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_icon_more)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="UserInfo" data-v-f870e63d><div class="Avatar" data-v-f870e63d><img${ssrRenderAttr("src", __props.data.user?.n_avatar)} alt="" data-v-f870e63d></div><div class="UserDetail" data-v-f870e63d><p class="nickname" data-v-f870e63d>${ssrInterpolate(__props.data.user?.n_nickname)}</p><p class="time" data-v-f870e63d>${ssrInterpolate(__props.data.n_time)}</p></div></div><div class="Content" data-v-f870e63d><div class="PostContent" data-v-f870e63d><p class="Title" data-v-f870e63d>${ssrInterpolate(__props.data.n_name)}</p><p class="word" data-v-f870e63d>${ssrInterpolate(__props.data.n_profile)}</p></div><div class="${ssrRenderClass(["ImageList", {
        one: __props.data.n_resources && __props.data.n_resources.length === 1,
        two: __props.data.n_resources && __props.data.n_resources.length === 2
      }])}" data-v-f870e63d><!--[-->`);
      ssrRenderList(__props.data.n_resources, (value) => {
        _push(`<div class="media-item" data-v-f870e63d>`);
        if (value.type === 1) {
          _push(`<img${ssrRenderAttr("src", value.url)} alt="" data-v-f870e63d>`);
        } else {
          _push(`<!---->`);
        }
        if (value.type === 2) {
          _push(`<div class="video-container" data-v-f870e63d><video${ssrRenderAttr("src", value.url)} data-v-f870e63d></video><div class="play-button" data-v-f870e63d>`);
          _push(ssrRenderComponent(_component_icon_play_circle_fill, null, null, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="PostActions" data-v-f870e63d><div class="Category" data-v-f870e63d>`);
      _push(ssrRenderComponent(_component_a_space, { wrap: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.data.category, (value) => {
              _push2(`<div class="Tag" data-v-f870e63d${_scopeId}>`);
              if (value.n_type == 2) {
                _push2(`<span data-v-f870e63d${_scopeId}>#</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(` ${ssrInterpolate(value.n_name)}</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.data.category, (value) => {
                return openBlock(), createBlock("div", {
                  class: "Tag",
                  key: value
                }, [
                  value.n_type == 2 ? (openBlock(), createBlock("span", { key: 0 }, "#")) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(value.n_name), 1)
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="Interactions" data-v-f870e63d><span class="item" data-v-f870e63d>`);
      _push(ssrRenderComponent(_component_icon_eye, { class: "icon" }, null, _parent));
      _push(`<span data-v-f870e63d>${ssrInterpolate(formatNumber(__props.data.n_read || 0))}</span></span><span class="item" data-v-f870e63d>`);
      _push(ssrRenderComponent(_component_icon_message, { class: "icon" }, null, _parent));
      _push(`<span data-v-f870e63d>${ssrInterpolate(formatNumber(__props.data.n_msgs || 0))}</span></span><span class="item" data-v-f870e63d>`);
      _push(ssrRenderComponent(_component_icon_thumb_up, { class: "icon" }, null, _parent));
      _push(`<span data-v-f870e63d>${ssrInterpolate(formatNumber(__props.data.n_starts || 0))}</span></span></div></div>`);
      _push(ssrRenderComponent(_component_popupMob, {
        modelValue: PopShow.value,
        "onUpdate:modelValue": ($event) => PopShow.value = $event,
        Title: "操作",
        Nook: ""
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_space, { wrap: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(UserInfo).$state.UserInfo?.id == __props.data.n_uid) {
                    _push3(ssrRenderComponent(_component_a_button, {
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/threadInfo/" + __props.data.id),
                      style: { "border-radius": "20px" }
                    }, {
                      icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_icon_edit, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_icon_edit)
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` 编辑贴贴 `);
                        } else {
                          return [
                            createTextVNode(" 编辑贴贴 ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_a_button, {
                    status: "warning",
                    style: { "border-radius": "20px" },
                    onClick: ($event) => reportThreadsShow.value = true
                  }, {
                    icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_icon_info_circle, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_icon_info_circle)
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 举报帖子 `);
                      } else {
                        return [
                          createTextVNode(" 举报帖子 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(UserInfo).$state.UserInfo?.id == __props.data.n_uid) {
                    _push3(ssrRenderComponent(_component_a_popconfirm, {
                      onOk: ($event) => DelThreads(),
                      content: "确定删除吗?",
                      type: "error"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_a_button, {
                            status: "danger",
                            style: { "border-radius": "20px" }
                          }, {
                            icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_icon_delete, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_icon_delete)
                                ];
                              }
                            }),
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` 删除贴贴 `);
                              } else {
                                return [
                                  createTextVNode(" 删除贴贴 ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_a_button, {
                              status: "danger",
                              style: { "border-radius": "20px" }
                            }, {
                              icon: withCtx(() => [
                                createVNode(_component_icon_delete)
                              ]),
                              default: withCtx(() => [
                                createTextVNode(" 删除贴贴 ")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(UserInfo).$state.UserInfo?.id == __props.data.n_uid ? (openBlock(), createBlock(_component_a_button, {
                      key: 0,
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/threadInfo/" + __props.data.id),
                      style: { "border-radius": "20px" }
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_icon_edit)
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" 编辑贴贴 ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true),
                    createVNode(_component_a_button, {
                      status: "warning",
                      style: { "border-radius": "20px" },
                      onClick: ($event) => reportThreadsShow.value = true
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_icon_info_circle)
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" 举报帖子 ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    unref(UserInfo).$state.UserInfo?.id == __props.data.n_uid ? (openBlock(), createBlock(_component_a_popconfirm, {
                      key: 1,
                      onOk: ($event) => DelThreads(),
                      content: "确定删除吗?",
                      type: "error"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_a_button, {
                          status: "danger",
                          style: { "border-radius": "20px" }
                        }, {
                          icon: withCtx(() => [
                            createVNode(_component_icon_delete)
                          ]),
                          default: withCtx(() => [
                            createTextVNode(" 删除贴贴 ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["onOk"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_a_space, { wrap: "" }, {
                default: withCtx(() => [
                  unref(UserInfo).$state.UserInfo?.id == __props.data.n_uid ? (openBlock(), createBlock(_component_a_button, {
                    key: 0,
                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/threadInfo/" + __props.data.id),
                    style: { "border-radius": "20px" }
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_icon_edit)
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" 编辑贴贴 ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : createCommentVNode("", true),
                  createVNode(_component_a_button, {
                    status: "warning",
                    style: { "border-radius": "20px" },
                    onClick: ($event) => reportThreadsShow.value = true
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_icon_info_circle)
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" 举报帖子 ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  unref(UserInfo).$state.UserInfo?.id == __props.data.n_uid ? (openBlock(), createBlock(_component_a_popconfirm, {
                    key: 1,
                    onOk: ($event) => DelThreads(),
                    content: "确定删除吗?",
                    type: "error"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_button, {
                        status: "danger",
                        style: { "border-radius": "20px" }
                      }, {
                        icon: withCtx(() => [
                          createVNode(_component_icon_delete)
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" 删除贴贴 ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["onOk"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_popupMob, {
        modelValue: reportThreadsShow.value,
        "onUpdate:modelValue": ($event) => reportThreadsShow.value = $event,
        Title: "举报",
        Nook: ""
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_form, {
              model: _ctx.form,
              layout: "vertical"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_form_item, {
                    field: "post",
                    label: "举报原因"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_textarea, {
                          class: "road",
                          modelValue: reportThreadsFrom.value.n_html,
                          "onUpdate:modelValue": ($event) => reportThreadsFrom.value.n_html = $event,
                          placeholder: "请输入举报原因",
                          "max-length": 200,
                          "allow-clear": "",
                          "show-word-limit": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_a_textarea, {
                            class: "road",
                            modelValue: reportThreadsFrom.value.n_html,
                            "onUpdate:modelValue": ($event) => reportThreadsFrom.value.n_html = $event,
                            placeholder: "请输入举报原因",
                            "max-length": 200,
                            "allow-clear": "",
                            "show-word-limit": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_a_form_item, {
                    field: "post",
                    label: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_button, {
                          type: "primary",
                          class: "road",
                          onClick: ($event) => reportThreads()
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
                            type: "primary",
                            class: "road",
                            onClick: ($event) => reportThreads()
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
                      field: "post",
                      label: "举报原因"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_a_textarea, {
                          class: "road",
                          modelValue: reportThreadsFrom.value.n_html,
                          "onUpdate:modelValue": ($event) => reportThreadsFrom.value.n_html = $event,
                          placeholder: "请输入举报原因",
                          "max-length": 200,
                          "allow-clear": "",
                          "show-word-limit": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          onClick: ($event) => reportThreads()
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
                model: _ctx.form,
                layout: "vertical"
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_form_item, {
                    field: "post",
                    label: "举报原因"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_textarea, {
                        class: "road",
                        modelValue: reportThreadsFrom.value.n_html,
                        "onUpdate:modelValue": ($event) => reportThreadsFrom.value.n_html = $event,
                        placeholder: "请输入举报原因",
                        "max-length": 200,
                        "allow-clear": "",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        onClick: ($event) => reportThreads()
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
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ItemA.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f870e63d"]]);
export {
  __nuxt_component_1 as _
};
//# sourceMappingURL=ItemA-JWPSvwj-.js.map
