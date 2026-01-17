import { _ as __nuxt_component_0 } from "./UserHeader-DU96A5FR.js";
import { Button, Result, Message } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/result/style/css.js";
import "@arco-design/web-vue/es/button/style/css.js";
import { ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { d as useApiFetch } from "../server.mjs";
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
  __name: "sign",
  __ssrInlineRender: true,
  setup(__props) {
    const isTodayCheckedIn = ref(false);
    function getCurrentMonthDayList() {
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const daysInMonth = new Date(year, month, 0).getDate();
      const days = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return {
          day,
          date
        };
      });
      return {
        year,
        month,
        days
      };
    }
    function isCheckedInToday(date) {
      for (let i = 0; i < checkInList.value.length; i++) {
        if (checkInList.value[i].n_time === date) {
          return checkInList.value[i];
        }
      }
      return false;
    }
    const getCurrentDate = () => {
      const date = /* @__PURE__ */ new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    };
    const checkInList = ref([]);
    const currentMonthDayList = ref([]);
    const getCheckInList = async () => {
      const res = await useApiFetch().post("/api/checkInList");
      if (res.code === 200) {
        checkInList.value = res.data;
        currentMonthDayList.value = getCurrentMonthDayList();
        for (let a = 0; a < currentMonthDayList.value.days.length; a++) {
          currentMonthDayList.value.days[a].Info = isCheckedInToday(currentMonthDayList.value.days[a].date);
        }
        isTodayCheckedIn.value = isCheckedInToday(getCurrentDate());
      }
    };
    const loading = ref(false);
    const checkIn = async () => {
      loading.value = true;
      const res = await useApiFetch().post("/api/checkIn");
      if (res.code === 200) {
        getCheckInList();
      } else {
        Message.error(res.msg);
      }
      loading.value = false;
    };
    const checkInReward = ref({});
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UserHeader = __nuxt_component_0;
      const _component_a_button = Button;
      const _component_a_result = Result;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "vip-page" }, _attrs))} data-v-d4507812>`);
      _push(ssrRenderComponent(_component_UserHeader, { title: "每日签到" }, null, _parent));
      _push(`<div class="Page" data-v-d4507812><div class="Pagecontent" data-v-d4507812><p class="title" data-v-d4507812>每日签到</p><div class="TimeBox" data-v-d4507812><!--[-->`);
      ssrRenderList(unref(currentMonthDayList).days, (value) => {
        _push(`<div class="${ssrRenderClass(["TimeBoxTitle", { active: value.Info }])}" data-v-d4507812>${ssrInterpolate(value.day)} <p class="signstatus" data-v-d4507812>`);
        if (!value.Info) {
          _push(`<p data-v-d4507812>未签到</p>`);
        } else {
          _push(`<p class="signtrue" data-v-d4507812>${ssrInterpolate(value.Info.n_reward_type === "1" ? "积分" : "余额")}*${ssrInterpolate(value.Info.n_reward_number)}</p>`);
        }
        _push(`</p></div>`);
      });
      _push(`<!--]--></div><div data-v-d4507812>`);
      if (!unref(isTodayCheckedIn)) {
        _push(ssrRenderComponent(_component_a_button, {
          loading: unref(loading),
          type: "primary",
          class: "signbutton",
          size: "small",
          onClick: ($event) => checkIn()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 立即签到 (奖励 ${ssrInterpolate(unref(checkInReward)?.Config?.n_reward_type === "1" ? "积分" : "余额")}*${ssrInterpolate(unref(checkInReward).Today)}) `);
            } else {
              return [
                createTextVNode(" 立即签到 (奖励 " + toDisplayString(unref(checkInReward)?.Config?.n_reward_type === "1" ? "积分" : "余额") + "*" + toDisplayString(unref(checkInReward).Today) + ") ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(isTodayCheckedIn)) {
        _push(ssrRenderComponent(_component_a_result, {
          status: "success",
          title: "今日已签到"
        }, {
          subtitle: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="signsta" data-v-d4507812${_scopeId}>已发放 ${ssrInterpolate(unref(isTodayCheckedIn).n_reward_type === "1" ? "积分" : "余额")} * ${ssrInterpolate(unref(isTodayCheckedIn).n_reward_number)}</p><div class="continuousDays" data-v-d4507812${_scopeId}> 您已连续签到${ssrInterpolate(unref(isTodayCheckedIn).continuousDays ?? 1)}天，明日签到将获得${ssrInterpolate(unref(checkInReward).Tomorrow)}${ssrInterpolate(unref(checkInReward).Config.n_reward_type === "1" ? "积分" : "余额")}</div>`);
            } else {
              return [
                createVNode("p", { class: "signsta" }, "已发放 " + toDisplayString(unref(isTodayCheckedIn).n_reward_type === "1" ? "积分" : "余额") + " * " + toDisplayString(unref(isTodayCheckedIn).n_reward_number), 1),
                createVNode("div", { class: "continuousDays" }, " 您已连续签到" + toDisplayString(unref(isTodayCheckedIn).continuousDays ?? 1) + "天，明日签到将获得" + toDisplayString(unref(checkInReward).Tomorrow) + toDisplayString(unref(checkInReward).Config.n_reward_type === "1" ? "积分" : "余额"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/user/index/activity/sign.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sign = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d4507812"]]);
export {
  sign as default
};
//# sourceMappingURL=sign-Dj0FQ60N.js.map
