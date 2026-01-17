import { Button, Message } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/button/style/css.js";
import { ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { a as useUserInfo, c as useRoute, d as useApiFetch } from "../server.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "UserBox",
  __ssrInlineRender: true,
  props: ["id", "info"],
  setup(__props) {
    const UserInfo = useUserInfo();
    useRoute();
    const props = __props;
    let id = props.id;
    const Users = ref({});
    const GetUser = async () => {
      try {
        const res = await useApiFetch().post("/api/GetUser", {
          id
        });
        if (res.code == 200) {
          Users.value = res.data;
        } else {
          Message.error(res.message || "获取用户信息失败");
        }
      } catch (error) {
        Message.error(error.message);
      }
    };
    const loading = ref(false);
    const LikeUser = async () => {
      try {
        loading.value = true;
        const res = await useApiFetch().post("/api/LikeUser", {
          id: Users.value.id
        });
        loading.value = false;
        if (res.code == 200) {
          Message.success(res.msg);
          Users.value.isLiked = true;
          GetUser();
        } else {
          Message.error(res.msg || "关注失败");
        }
      } catch (error) {
        Message.error(error.message);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_button = Button;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))} data-v-bdc5d15e><div class="UserInfo" data-v-bdc5d15e><div style="${ssrRenderStyle({ backgroundImage: `url(${Users.value?.n_userback})` })}" class="UserBack" data-v-bdc5d15e></div><img${ssrRenderAttr("src", Users.value.n_avatar)} alt="用户头像" data-v-bdc5d15e><p class="nickname" data-v-bdc5d15e>${ssrInterpolate(Users.value?.n_nickname)}</p><div class="UserDetail" data-v-bdc5d15e><div class="Item" data-v-bdc5d15e><p class="Value" data-v-bdc5d15e>${ssrInterpolate(Users.value?.posts || 0)}</p><p class="Label" data-v-bdc5d15e>发帖数</p></div><div class="Item" data-v-bdc5d15e><p class="Value" data-v-bdc5d15e>${ssrInterpolate(Users.value?.followers || 0)}</p><p class="Label" data-v-bdc5d15e>粉丝数</p></div><div class="Item" data-v-bdc5d15e><p class="Value" data-v-bdc5d15e>${ssrInterpolate(Users.value?.following || 0)}</p><p class="Label" data-v-bdc5d15e>关注数</p></div></div>`);
      if (unref(UserInfo).$state.UserInfo?.id !== Users.value.id) {
        _push(`<div class="Follow" data-v-bdc5d15e>`);
        _push(ssrRenderComponent(_component_a_button, {
          loading: loading.value,
          onClick: ($event) => LikeUser(),
          class: ["FollowBtn", { "Close": Users.value.isLiked }],
          type: "primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(Users.value.isLiked ? "取消关注" : "关注")}`);
            } else {
              return [
                createTextVNode(toDisplayString(Users.value.isLiked ? "取消关注" : "关注"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UserBox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bdc5d15e"]]);
export {
  __nuxt_component_2 as _
};
//# sourceMappingURL=UserBox-CKrUnuZ_.js.map
