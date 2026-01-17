import { _ as _sfc_main$1 } from './RichHtml-D2DY6Q4b.mjs';
import { _ as __nuxt_component_1 } from './CommentItem-CX0dfZ3t.mjs';
import { _ as __nuxt_component_2 } from './UserBox-CKrUnuZ_.mjs';
import { _ as __nuxt_component_3 } from './TopicItem-CJGfqylf.mjs';
import { _ as __nuxt_component_1$1 } from './popupMob-OgSg-8hC.mjs';
import { c as useRoute, a as useUserInfo, b as useSiteConfig, e as useApiSsr, n as navigateTo, d as useApiFetch } from './server.mjs';
import { ref, withAsyncContext, resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { Space, Button, Result, Typography, TypographyParagraph, Textarea, Pagination, Popconfirm, Form, FormItem, Message } from '@arco-design/web-vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './1-BLe-Ftx3.mjs';
import { u as useSeoSet } from './useSeoSet-ri8aJ8nG.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'highlight.js';
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
import './v3-DUQAjvLz.mjs';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const UserInfo = useUserInfo();
    UserInfo.init();
    const id = route.params.id;
    const SiteConfig = useSiteConfig();
    const formatNumber = (num) => {
      if (num >= 1e3 && num < 1e6) {
        return (num / 1e3).toFixed(1) + "K";
      } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + "M";
      }
      return num;
    };
    const Info = ref({});
    const res = ([__temp, __restore] = withAsyncContext(() => useApiSsr("GetThreadsInfo" + id, "/api/GetThreads", {
      id
    })), __temp = await __temp, __restore(), __temp);
    if (res.code === 200) {
      Info.value = res.data;
    } else {
      navigateTo("/threads/404");
    }
    useSeoSet({
      title: Info.value.n_name + "-" + SiteConfig.$state.Config.n_web_title,
      description: Info.value.n_profile
    });
    const TopicList = ref([]);
    const DelThreads = async () => {
      try {
        const res2 = await useApiFetch().post("/api/DelThreads", {
          id
        });
        if (res2.code == 200) {
          Message.success("\u5220\u9664\u6210\u529F");
          navigateTo("/");
        } else {
          Message.error(res2.message || "\u5220\u9664\u5931\u8D25");
        }
      } catch (error) {
        Message.error(error.message);
      }
    };
    const PopShow = ref(false);
    const form = ref({
      id,
      n_html: "",
      n_cid: 0,
      n_html: ""
    });
    const CommentThreads = async () => {
      try {
        const res2 = await useApiFetch().post("/api/CommentThreads", form.value);
        if (res2.code == 200) {
          Message.success("\u8BC4\u8BBA\u6210\u529F");
          form.value.n_html = "";
          GetCommentList();
        } else {
          Message.error(res2.message || "\u8BC4\u8BBA\u5931\u8D25");
        }
      } catch (error) {
        Message.error(error.message);
      }
    };
    const GetCommentsFrom = ref({
      page: 1,
      pagesize: 20,
      id
    });
    const CommentList = ref([]);
    const GetCommentList = async () => {
      try {
        const res2 = await useApiFetch().post("/api/GetComments", GetCommentsFrom.value);
        if (res2.code == 200) {
          CommentList.value = res2.data;
          GetCommentsFrom.value.total = res2.total;
        } else {
        }
      } catch (error) {
        Message.error(error.message);
      }
    };
    const from = ref({
      price: Info.value.n_price,
      type: 3,
      id: Info.value.id
    });
    const loading = ref(false);
    const handleSubmit = async () => {
      loading.value = true;
      const res2 = await useApiFetch().post("/api/CreateOrder", {
        from: JSON.stringify([from.value]),
        path: (void 0).location.href
      });
      if (res2.code === 200) {
        navigateTo("/user/order/" + res2.data.order + "?return=/threads/" + Info.value.id);
      } else {
        Message.error(res2.msg);
      }
      loading.value = false;
    };
    const reportThreadsFrom = ref({
      n_tid: Info.value.id,
      n_html: ""
    });
    const reportThreadsShow = ref(false);
    const reportThreads = async () => {
      const res2 = await useApiFetch().post("/api/ReportThreads", reportThreadsFrom.value);
      if (res2.code === 200) {
        reportThreadsShow.value = false;
        Message.success(res2.msg);
      } else {
        Message.error(res2.msg);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_space = Space;
      const _component_icon_eye = resolveComponent("icon-eye");
      const _component_a_button = Button;
      const _component_icon_more = resolveComponent("icon-more");
      const _component_a_result = Result;
      const _component_IconFaceFrownFill = resolveComponent("IconFaceFrownFill");
      const _component_a_typography = Typography;
      const _component_a_typography_paragraph = TypographyParagraph;
      const _component_RichHtml = _sfc_main$1;
      const _component_icon_thumb_up = resolveComponent("icon-thumb-up");
      const _component_icon_message = resolveComponent("icon-message");
      const _component_icon_share_internal = resolveComponent("icon-share-internal");
      const _component_a_textarea = Textarea;
      const _component_icon_send = resolveComponent("icon-send");
      const _component_CommentItem = __nuxt_component_1;
      const _component_IconFaceSmileFill = resolveComponent("IconFaceSmileFill");
      const _component_a_pagination = Pagination;
      const _component_UserBox = __nuxt_component_2;
      const _component_TopicItem = __nuxt_component_3;
      const _component_popupMob = __nuxt_component_1$1;
      const _component_icon_edit = resolveComponent("icon-edit");
      const _component_icon_info_circle = resolveComponent("icon-info-circle");
      const _component_a_popconfirm = Popconfirm;
      const _component_icon_delete = resolveComponent("icon-delete");
      const _component_a_form = Form;
      const _component_a_form_item = FormItem;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "MainBox" }, _attrs))} data-v-da43c83b><div class="Left" data-v-da43c83b><div class="MainContent" data-v-da43c83b><div class="ThreadInfo" data-v-da43c83b><h1 data-v-da43c83b>${ssrInterpolate(Info.value.n_name)}</h1><div data-v-da43c83b>`);
      _push(ssrRenderComponent(_component_a_space, { wrap: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<p class="User" data-v-da43c83b${_scopeId}><img${ssrRenderAttr("src", (_a = Info.value.user) == null ? void 0 : _a.n_avatar)} alt="\u7528\u6237\u5934\u50CF" data-v-da43c83b${_scopeId}><span data-v-da43c83b${_scopeId}>${ssrInterpolate((_b = Info.value.user) == null ? void 0 : _b.n_nickname)}</span></p><p class="Time" data-v-da43c83b${_scopeId}>${ssrInterpolate(Info.value.n_time)}</p><p class="Read" data-v-da43c83b${_scopeId}>`);
            _push2(ssrRenderComponent(_component_icon_eye, { class: "icon" }, null, _parent2, _scopeId));
            _push2(`<span data-v-da43c83b${_scopeId}>${ssrInterpolate(formatNumber(Info.value.n_read || 0))}</span></p>`);
          } else {
            return [
              createVNode("p", { class: "User" }, [
                createVNode("img", {
                  src: (_c = Info.value.user) == null ? void 0 : _c.n_avatar,
                  alt: "\u7528\u6237\u5934\u50CF"
                }, null, 8, ["src"]),
                createVNode("span", null, toDisplayString((_d = Info.value.user) == null ? void 0 : _d.n_nickname), 1)
              ]),
              createVNode("p", { class: "Time" }, toDisplayString(Info.value.n_time), 1),
              createVNode("p", { class: "Read" }, [
                createVNode(_component_icon_eye, { class: "icon" }),
                createVNode("span", null, toDisplayString(formatNumber(Info.value.n_read || 0)), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="Category" data-v-da43c83b>`);
      _push(ssrRenderComponent(_component_a_space, { wrap: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(Info.value.category, (value) => {
              _push2(`<div class="Tag" data-v-da43c83b${_scopeId}>`);
              if (value.n_type == 2) {
                _push2(`<span data-v-da43c83b${_scopeId}>#</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(` ${ssrInterpolate(value.n_name)}</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(Info.value.category, (value) => {
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
      _push(`</div><div class="ButtonSection" data-v-da43c83b>`);
      _push(ssrRenderComponent(_component_a_button, null, {
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
      _push(`</div></div>`);
      if (!Info.value.IsBuy) {
        _push(`<div class="Buy" data-v-da43c83b>`);
        _push(ssrRenderComponent(_component_a_result, {
          status: "error",
          title: "\u8BF7\u5148\u8D2D\u4E70"
        }, {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_IconFaceFrownFill, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_IconFaceFrownFill)
              ];
            }
          }),
          subtitle: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u5F53\u524D\u94C1\u5B50\u9700\u8981\u652F\u4ED8${ssrInterpolate(Info.value.n_price || 0)}${ssrInterpolate(Info.value.n_permission == "2" ? "\u79EF\u5206" : "\u5143")}`);
            } else {
              return [
                createTextVNode(" \u5F53\u524D\u94C1\u5B50\u9700\u8981\u652F\u4ED8" + toDisplayString(Info.value.n_price || 0) + toDisplayString(Info.value.n_permission == "2" ? "\u79EF\u5206" : "\u5143"), 1)
              ];
            }
          }),
          extra: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_button, {
                loading: loading.value,
                type: "primary",
                onClick: ($event) => handleSubmit()
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u7ACB\u5373\u8D2D\u4E70`);
                  } else {
                    return [
                      createTextVNode("\u7ACB\u5373\u8D2D\u4E70")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_a_button, {
                  loading: loading.value,
                  type: "primary",
                  onClick: ($event) => handleSubmit()
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u7ACB\u5373\u8D2D\u4E70")
                  ]),
                  _: 1
                }, 8, ["loading", "onClick"])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_typography, { style: { "background": "var(--color-fill-2)", "padding": "24px" } }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_a_typography_paragraph, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u8BF4\u660E:`);
                        } else {
                          return [
                            createTextVNode("\u8BF4\u660E:")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<ul data-v-da43c83b${_scopeId2}><li data-v-da43c83b${_scopeId2}>\u8D2D\u4E70\u540E\u5373\u53EF\u67E5\u770B\u5185\u5BB9</li><li data-v-da43c83b${_scopeId2}>\u5982\u6709\u95EE\u9898\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458</li></ul>`);
                  } else {
                    return [
                      createVNode(_component_a_typography_paragraph, null, {
                        default: withCtx(() => [
                          createTextVNode("\u8BF4\u660E:")
                        ]),
                        _: 1
                      }),
                      createVNode("ul", null, [
                        createVNode("li", null, "\u8D2D\u4E70\u540E\u5373\u53EF\u67E5\u770B\u5185\u5BB9"),
                        createVNode("li", null, "\u5982\u6709\u95EE\u9898\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_a_typography, { style: { "background": "var(--color-fill-2)", "padding": "24px" } }, {
                  default: withCtx(() => [
                    createVNode(_component_a_typography_paragraph, null, {
                      default: withCtx(() => [
                        createTextVNode("\u8BF4\u660E:")
                      ]),
                      _: 1
                    }),
                    createVNode("ul", null, [
                      createVNode("li", null, "\u8D2D\u4E70\u540E\u5373\u53EF\u67E5\u770B\u5185\u5BB9"),
                      createVNode("li", null, "\u5982\u6709\u95EE\u9898\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458")
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div data-v-da43c83b>`);
        _push(ssrRenderComponent(_component_RichHtml, {
          html: Info.value.n_html
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`<div class="CommentSection" data-v-da43c83b><div class="${ssrRenderClass(["Item", { active: Info.value.isLiked }])}" data-v-da43c83b>`);
      _push(ssrRenderComponent(_component_icon_thumb_up, { class: "icon" }, null, _parent));
      _push(`<span data-v-da43c83b>${ssrInterpolate(Info.value.n_starts || 0)}</span></div><div class="Item" data-v-da43c83b>`);
      _push(ssrRenderComponent(_component_icon_message, { class: "icon" }, null, _parent));
      _push(`<span data-v-da43c83b>${ssrInterpolate(Info.value.n_msgs || 0)}</span></div><div class="Item" data-v-da43c83b>`);
      _push(ssrRenderComponent(_component_icon_share_internal, { class: "icon" }, null, _parent));
      _push(`<span data-v-da43c83b>\u5206\u4EAB</span></div></div></div><div class="comment" data-v-da43c83b><div class="title" data-v-da43c83b><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-da43c83b><span data-v-da43c83b>\u6211\u6709\u8BDD\u8981\u8BF4</span></div><div class="content" data-v-da43c83b>`);
      _push(ssrRenderComponent(_component_a_textarea, {
        class: "road",
        modelValue: form.value.n_html,
        "onUpdate:modelValue": ($event) => form.value.n_html = $event,
        placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
        "max-length": 100,
        "allow-clear": "",
        "show-word-limit": ""
      }, null, _parent));
      _push(`<div class="ButtonSection" data-v-da43c83b>`);
      _push(ssrRenderComponent(_component_a_button, {
        type: "primary",
        class: "send-btn",
        onClick: ($event) => CommentThreads()
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_icon_send, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_icon_send)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u53D1\u9001`);
          } else {
            return [
              createTextVNode("\u53D1\u9001")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="comment" data-v-da43c83b><div class="title" data-v-da43c83b><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-da43c83b><span data-v-da43c83b>\u5927\u5BB6\u90FD\u518D\u8BF4</span></div><!--[-->`);
      ssrRenderList(CommentList.value, (value) => {
        _push(ssrRenderComponent(_component_CommentItem, {
          key: value.id,
          data: value,
          isAuthor: value.n_uid == Info.value.n_uid,
          onReload: GetCommentList
        }, null, _parent));
      });
      _push(`<!--]-->`);
      if (CommentList.value.length == 0) {
        _push(`<div class="Isno" style="${ssrRenderStyle({ "width": "100%", "background-color": "#fff", "border-radius": "10px" })}" data-v-da43c83b>`);
        _push(ssrRenderComponent(_component_a_result, {
          status: null,
          title: "\u65E0\u5185\u5BB9",
          subtitle: "\u54CE\u5440\uFF0C\u6CA1\u6709\u5185\u5BB9\u4E86"
        }, {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_IconFaceSmileFill, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_IconFaceSmileFill)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="PageNav" data-v-da43c83b>`);
      _push(ssrRenderComponent(_component_a_pagination, {
        onChange: GetCommentList,
        onPageSizeChange: GetCommentList,
        current: GetCommentsFrom.value.page,
        "onUpdate:current": ($event) => GetCommentsFrom.value.page = $event,
        pageSize: GetCommentsFrom.value.pagesize,
        "onUpdate:pageSize": ($event) => GetCommentsFrom.value.pagesize = $event,
        total: GetCommentsFrom.value.total,
        size: "mini",
        "show-total": ""
      }, null, _parent));
      _push(`</div></div></div><div class="Right" data-v-da43c83b><div class="UserInfo" data-v-da43c83b>`);
      _push(ssrRenderComponent(_component_UserBox, {
        id: Info.value.n_uid
      }, null, _parent));
      _push(`</div><div class="NavBar" data-v-da43c83b><div class="title" data-v-da43c83b><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-da43c83b><span data-v-da43c83b>\u70ED\u95E8\u8BDD\u9898</span></div><!--[-->`);
      ssrRenderList(TopicList.value, (value) => {
        _push(ssrRenderComponent(_component_TopicItem, {
          key: value.n_name,
          data: value
        }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(_component_popupMob, {
        modelValue: PopShow.value,
        "onUpdate:modelValue": ($event) => PopShow.value = $event,
        Title: "\u64CD\u4F5C",
        Nook: ""
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_space, { wrap: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  if (((_a = unref(UserInfo).$state.UserInfo) == null ? void 0 : _a.id) == Info.value.n_uid) {
                    _push3(ssrRenderComponent(_component_a_button, {
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/threadInfo/" + unref(id)),
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
                          _push4(` \u7F16\u8F91\u8D34\u8D34 `);
                        } else {
                          return [
                            createTextVNode(" \u7F16\u8F91\u8D34\u8D34 ")
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
                        _push4(` \u4E3E\u62A5\u5E16\u5B50 `);
                      } else {
                        return [
                          createTextVNode(" \u4E3E\u62A5\u5E16\u5B50 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (((_b = unref(UserInfo).$state.UserInfo) == null ? void 0 : _b.id) == Info.value.n_uid) {
                    _push3(ssrRenderComponent(_component_a_popconfirm, {
                      onOk: ($event) => DelThreads(),
                      content: "\u786E\u5B9A\u5220\u9664\u5417?",
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
                                _push5(` \u5220\u9664\u8D34\u8D34 `);
                              } else {
                                return [
                                  createTextVNode(" \u5220\u9664\u8D34\u8D34 ")
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
                                createTextVNode(" \u5220\u9664\u8D34\u8D34 ")
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
                    ((_c = unref(UserInfo).$state.UserInfo) == null ? void 0 : _c.id) == Info.value.n_uid ? (openBlock(), createBlock(_component_a_button, {
                      key: 0,
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/threadInfo/" + unref(id)),
                      style: { "border-radius": "20px" }
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_icon_edit)
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" \u7F16\u8F91\u8D34\u8D34 ")
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
                        createTextVNode(" \u4E3E\u62A5\u5E16\u5B50 ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    ((_d = unref(UserInfo).$state.UserInfo) == null ? void 0 : _d.id) == Info.value.n_uid ? (openBlock(), createBlock(_component_a_popconfirm, {
                      key: 1,
                      onOk: ($event) => DelThreads(),
                      content: "\u786E\u5B9A\u5220\u9664\u5417?",
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
                            createTextVNode(" \u5220\u9664\u8D34\u8D34 ")
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
                default: withCtx(() => {
                  var _a, _b;
                  return [
                    ((_a = unref(UserInfo).$state.UserInfo) == null ? void 0 : _a.id) == Info.value.n_uid ? (openBlock(), createBlock(_component_a_button, {
                      key: 0,
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/threadInfo/" + unref(id)),
                      style: { "border-radius": "20px" }
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_icon_edit)
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" \u7F16\u8F91\u8D34\u8D34 ")
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
                        createTextVNode(" \u4E3E\u62A5\u5E16\u5B50 ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    ((_b = unref(UserInfo).$state.UserInfo) == null ? void 0 : _b.id) == Info.value.n_uid ? (openBlock(), createBlock(_component_a_popconfirm, {
                      key: 1,
                      onOk: ($event) => DelThreads(),
                      content: "\u786E\u5B9A\u5220\u9664\u5417?",
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
                            createTextVNode(" \u5220\u9664\u8D34\u8D34 ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["onOk"])) : createCommentVNode("", true)
                  ];
                }),
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
        Title: "\u4E3E\u62A5",
        Nook: ""
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_form, {
              model: form.value,
              layout: "vertical"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_form_item, {
                    field: "post",
                    label: "\u4E3E\u62A5\u539F\u56E0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_textarea, {
                          class: "road",
                          modelValue: reportThreadsFrom.value.n_html,
                          "onUpdate:modelValue": ($event) => reportThreadsFrom.value.n_html = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u4E3E\u62A5\u539F\u56E0",
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
                            placeholder: "\u8BF7\u8F93\u5165\u4E3E\u62A5\u539F\u56E0",
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
                            type: "primary",
                            class: "road",
                            onClick: ($event) => reportThreads()
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
                      field: "post",
                      label: "\u4E3E\u62A5\u539F\u56E0"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_a_textarea, {
                          class: "road",
                          modelValue: reportThreadsFrom.value.n_html,
                          "onUpdate:modelValue": ($event) => reportThreadsFrom.value.n_html = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u4E3E\u62A5\u539F\u56E0",
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
                model: form.value,
                layout: "vertical"
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_form_item, {
                    field: "post",
                    label: "\u4E3E\u62A5\u539F\u56E0"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_textarea, {
                        class: "road",
                        modelValue: reportThreadsFrom.value.n_html,
                        "onUpdate:modelValue": ($event) => reportThreadsFrom.value.n_html = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u4E3E\u62A5\u539F\u56E0",
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
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/index/threads/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-da43c83b"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-C8FXVHvJ.mjs.map
