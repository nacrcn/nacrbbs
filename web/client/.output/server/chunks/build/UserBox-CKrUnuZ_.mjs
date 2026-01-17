import { Button, Message } from '@arco-design/web-vue';
import { ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { a as useUserInfo, c as useRoute, d as useApiFetch } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

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
          Message.error(res.message || "\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25");
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
          Message.error(res.msg || "\u5173\u6CE8\u5931\u8D25");
        }
      } catch (error) {
        Message.error(error.message);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_a_button = Button;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))} data-v-bdc5d15e><div class="UserInfo" data-v-bdc5d15e><div style="${ssrRenderStyle({ backgroundImage: `url(${(_a = Users.value) == null ? void 0 : _a.n_userback})` })}" class="UserBack" data-v-bdc5d15e></div><img${ssrRenderAttr("src", Users.value.n_avatar)} alt="\u7528\u6237\u5934\u50CF" data-v-bdc5d15e><p class="nickname" data-v-bdc5d15e>${ssrInterpolate((_b = Users.value) == null ? void 0 : _b.n_nickname)}</p><div class="UserDetail" data-v-bdc5d15e><div class="Item" data-v-bdc5d15e><p class="Value" data-v-bdc5d15e>${ssrInterpolate(((_c = Users.value) == null ? void 0 : _c.posts) || 0)}</p><p class="Label" data-v-bdc5d15e>\u53D1\u5E16\u6570</p></div><div class="Item" data-v-bdc5d15e><p class="Value" data-v-bdc5d15e>${ssrInterpolate(((_d = Users.value) == null ? void 0 : _d.followers) || 0)}</p><p class="Label" data-v-bdc5d15e>\u7C89\u4E1D\u6570</p></div><div class="Item" data-v-bdc5d15e><p class="Value" data-v-bdc5d15e>${ssrInterpolate(((_e = Users.value) == null ? void 0 : _e.following) || 0)}</p><p class="Label" data-v-bdc5d15e>\u5173\u6CE8\u6570</p></div></div>`);
      if (((_f = unref(UserInfo).$state.UserInfo) == null ? void 0 : _f.id) !== Users.value.id) {
        _push(`<div class="Follow" data-v-bdc5d15e>`);
        _push(ssrRenderComponent(_component_a_button, {
          loading: loading.value,
          onClick: ($event) => LikeUser(),
          class: ["FollowBtn", { "Close": Users.value.isLiked }],
          type: "primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(Users.value.isLiked ? "\u53D6\u6D88\u5173\u6CE8" : "\u5173\u6CE8")}`);
            } else {
              return [
                createTextVNode(toDisplayString(Users.value.isLiked ? "\u53D6\u6D88\u5173\u6CE8" : "\u5173\u6CE8"), 1)
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

export { __nuxt_component_2 as _ };
//# sourceMappingURL=UserBox-CKrUnuZ_.mjs.map
