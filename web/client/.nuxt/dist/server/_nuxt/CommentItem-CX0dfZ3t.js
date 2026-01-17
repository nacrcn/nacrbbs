import { Tag, Popconfirm, Button, Message } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/button/style/css.js";
import "@arco-design/web-vue/es/popconfirm/style/css.js";
import "@arco-design/web-vue/es/tag/style/css.js";
import { resolveComponent, mergeProps, withCtx, createTextVNode, unref, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { a as useUserInfo, d as useApiFetch } from "../server.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
        return "刚刚";
      } else if (diff < hour) {
        return Math.floor(diff / minute) + "分钟前";
      } else if (diff < day) {
        return Math.floor(diff / hour) + "小时前";
      } else if (diff < day * 7) {
        return Math.floor(diff / day) + "天前";
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
          Message.success("删除评论成功");
          emit("reload");
        } else {
          Message.error(res.message || "删除评论失败");
        }
      } catch (error) {
        Message.error(error.message);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_tag = Tag;
      const _component_a_popconfirm = Popconfirm;
      const _component_a_button = Button;
      const _component_icon_delete = resolveComponent("icon-delete");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "comment-item" }, _attrs))} data-v-d12ed6f4><div class="comment-avatar" data-v-d12ed6f4><img${ssrRenderAttr("src", __props.data.user?.n_avatar || "/default-avatar.png")}${ssrRenderAttr("alt", __props.data.user?.n_nickname)} data-v-d12ed6f4></div><div class="comment-content" data-v-d12ed6f4><div class="comment-header" data-v-d12ed6f4><span class="comment-author" data-v-d12ed6f4>${ssrInterpolate(__props.data.user?.n_nickname || "匿名用户")}</span>`);
      if (__props.isAuthor) {
        _push(ssrRenderComponent(_component_a_tag, {
          size: "mini",
          color: "arcoblue"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`作者`);
            } else {
              return [
                createTextVNode("作者")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="comment-time" data-v-d12ed6f4>${ssrInterpolate(formatTime(__props.data.n_time))}</span></div><div class="comment-body" data-v-d12ed6f4>${__props.data.n_html ?? ""}</div>`);
      if (__props.data.thread) {
        _push(`<div class="Hbs" data-v-d12ed6f4> 回复帖子：<span data-v-d12ed6f4>${ssrInterpolate(__props.data.thread.n_name)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="comment-actions" data-v-d12ed6f4>`);
      _push(ssrRenderComponent(_component_a_popconfirm, {
        onOk: ($event) => DelComments(__props.data.id),
        content: "确定删除吗?",
        type: "error"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(UserInfo).$state.UserInfo?.id == __props.data.n_uid) {
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
                    _push3(` 删除评论 `);
                  } else {
                    return [
                      createTextVNode(" 删除评论 ")
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
              unref(UserInfo).$state.UserInfo?.id == __props.data.n_uid ? (openBlock(), createBlock(_component_a_button, {
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
                  createTextVNode(" 删除评论 ")
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
export {
  __nuxt_component_1 as _
};
//# sourceMappingURL=CommentItem-CX0dfZ3t.js.map
