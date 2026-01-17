import { Tag, Popconfirm, Button, Message } from '@arco-design/web-vue';
import { resolveComponent, mergeProps, withCtx, createTextVNode, unref, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { a as useUserInfo, d as useApiFetch } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = {
  __name: "CommentItem",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({})
    },
    isAuthor: {
      type: Boolean,
      default: false
    }
  },
  emits: ["reply", "like"],
  setup(__props, { emit: __emit }) {
    const UserInfo = useUserInfo();
    const emit = __emit;
    const formatTime = (timeStr) => {
      if (!timeStr) return "";
      const date = new Date(timeStr);
      const now = /* @__PURE__ */ new Date();
      const diff = now - date;
      const minute = 60 * 1e3;
      const hour = 60 * minute;
      const day = 24 * hour;
      if (diff < minute) {
        return "\u521A\u521A";
      } else if (diff < hour) {
        return Math.floor(diff / minute) + "\u5206\u949F\u524D";
      } else if (diff < day) {
        return Math.floor(diff / hour) + "\u5C0F\u65F6\u524D";
      } else if (diff < day * 7) {
        return Math.floor(diff / day) + "\u5929\u524D";
      } else {
        return date.toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        });
      }
    };
    const DelComments = async (id) => {
      try {
        const res = await useApiFetch().post("/api/DelComments", { id });
        if (res.code == 200) {
          Message.success("\u5220\u9664\u8BC4\u8BBA\u6210\u529F");
          emit("reload");
        } else {
          Message.error(res.message || "\u5220\u9664\u8BC4\u8BBA\u5931\u8D25");
        }
      } catch (error) {
        Message.error(error.message);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_a_tag = Tag;
      const _component_a_popconfirm = Popconfirm;
      const _component_a_button = Button;
      const _component_icon_delete = resolveComponent("icon-delete");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "comment-item" }, _attrs))} data-v-d12ed6f4><div class="comment-avatar" data-v-d12ed6f4><img${ssrRenderAttr("src", ((_a = __props.data.user) == null ? void 0 : _a.n_avatar) || "/default-avatar.png")}${ssrRenderAttr("alt", (_b = __props.data.user) == null ? void 0 : _b.n_nickname)} data-v-d12ed6f4></div><div class="comment-content" data-v-d12ed6f4><div class="comment-header" data-v-d12ed6f4><span class="comment-author" data-v-d12ed6f4>${ssrInterpolate(((_c = __props.data.user) == null ? void 0 : _c.n_nickname) || "\u533F\u540D\u7528\u6237")}</span>`);
      if (__props.isAuthor) {
        _push(ssrRenderComponent(_component_a_tag, {
          size: "mini",
          color: "arcoblue"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u4F5C\u8005`);
            } else {
              return [
                createTextVNode("\u4F5C\u8005")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="comment-time" data-v-d12ed6f4>${ssrInterpolate(formatTime(__props.data.n_time))}</span></div><div class="comment-body" data-v-d12ed6f4>${(_d = __props.data.n_html) != null ? _d : ""}</div>`);
      if (__props.data.thread) {
        _push(`<div class="Hbs" data-v-d12ed6f4> \u56DE\u590D\u5E16\u5B50\uFF1A<span data-v-d12ed6f4>${ssrInterpolate(__props.data.thread.n_name)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="comment-actions" data-v-d12ed6f4>`);
      _push(ssrRenderComponent(_component_a_popconfirm, {
        onOk: ($event) => DelComments(__props.data.id),
        content: "\u786E\u5B9A\u5220\u9664\u5417?",
        type: "error"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          if (_push2) {
            if (((_a2 = unref(UserInfo).$state.UserInfo) == null ? void 0 : _a2.id) == __props.data.n_uid) {
              _push2(ssrRenderComponent(_component_a_button, {
                status: "danger",
                class: "action-btn",
                size: "mini",
                style: { "border-radius": "20px" }
              }, {
                icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_icon_delete, null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_icon_delete)
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u5220\u9664\u8BC4\u8BBA `);
                  } else {
                    return [
                      createTextVNode(" \u5220\u9664\u8BC4\u8BBA ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              ((_b2 = unref(UserInfo).$state.UserInfo) == null ? void 0 : _b2.id) == __props.data.n_uid ? (openBlock(), createBlock(_component_a_button, {
                key: 0,
                status: "danger",
                class: "action-btn",
                size: "mini",
                style: { "border-radius": "20px" }
              }, {
                icon: withCtx(() => [
                  createVNode(_component_icon_delete)
                ]),
                default: withCtx(() => [
                  createTextVNode(" \u5220\u9664\u8BC4\u8BBA ")
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="comment-reply" data-v-d12ed6f4>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CommentItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d12ed6f4"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=CommentItem-CX0dfZ3t.mjs.map
