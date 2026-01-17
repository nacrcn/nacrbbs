import { _ as __nuxt_component_0 } from './UserHeader-DU96A5FR.mjs';
import { Button, Result, Message } from '@arco-design/web-vue';
import { ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { d as useApiFetch } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
      _push(ssrRenderComponent(_component_UserHeader, { title: "\u6BCF\u65E5\u7B7E\u5230" }, null, _parent));
      _push(`<div class="Page" data-v-d4507812><div class="Pagecontent" data-v-d4507812><p class="title" data-v-d4507812>\u6BCF\u65E5\u7B7E\u5230</p><div class="TimeBox" data-v-d4507812><!--[-->`);
      ssrRenderList(unref(currentMonthDayList).days, (value) => {
        _push(`<div class="${ssrRenderClass(["TimeBoxTitle", { active: value.Info }])}" data-v-d4507812>${ssrInterpolate(value.day)} <p class="signstatus" data-v-d4507812>`);
        if (!value.Info) {
          _push(`<p data-v-d4507812>\u672A\u7B7E\u5230</p>`);
        } else {
          _push(`<p class="signtrue" data-v-d4507812>${ssrInterpolate(value.Info.n_reward_type === "1" ? "\u79EF\u5206" : "\u4F59\u989D")}*${ssrInterpolate(value.Info.n_reward_number)}</p>`);
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
            var _a, _b, _c, _d;
            if (_push2) {
              _push2(` \u7ACB\u5373\u7B7E\u5230 (\u5956\u52B1 ${ssrInterpolate(((_b = (_a = unref(checkInReward)) == null ? void 0 : _a.Config) == null ? void 0 : _b.n_reward_type) === "1" ? "\u79EF\u5206" : "\u4F59\u989D")}*${ssrInterpolate(unref(checkInReward).Today)}) `);
            } else {
              return [
                createTextVNode(" \u7ACB\u5373\u7B7E\u5230 (\u5956\u52B1 " + toDisplayString(((_d = (_c = unref(checkInReward)) == null ? void 0 : _c.Config) == null ? void 0 : _d.n_reward_type) === "1" ? "\u79EF\u5206" : "\u4F59\u989D") + "*" + toDisplayString(unref(checkInReward).Today) + ") ", 1)
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
          title: "\u4ECA\u65E5\u5DF2\u7B7E\u5230"
        }, {
          subtitle: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b;
            if (_push2) {
              _push2(`<p class="signsta" data-v-d4507812${_scopeId}>\u5DF2\u53D1\u653E ${ssrInterpolate(unref(isTodayCheckedIn).n_reward_type === "1" ? "\u79EF\u5206" : "\u4F59\u989D")} * ${ssrInterpolate(unref(isTodayCheckedIn).n_reward_number)}</p><div class="continuousDays" data-v-d4507812${_scopeId}> \u60A8\u5DF2\u8FDE\u7EED\u7B7E\u5230${ssrInterpolate((_a = unref(isTodayCheckedIn).continuousDays) != null ? _a : 1)}\u5929\uFF0C\u660E\u65E5\u7B7E\u5230\u5C06\u83B7\u5F97${ssrInterpolate(unref(checkInReward).Tomorrow)}${ssrInterpolate(unref(checkInReward).Config.n_reward_type === "1" ? "\u79EF\u5206" : "\u4F59\u989D")}</div>`);
            } else {
              return [
                createVNode("p", { class: "signsta" }, "\u5DF2\u53D1\u653E " + toDisplayString(unref(isTodayCheckedIn).n_reward_type === "1" ? "\u79EF\u5206" : "\u4F59\u989D") + " * " + toDisplayString(unref(isTodayCheckedIn).n_reward_number), 1),
                createVNode("div", { class: "continuousDays" }, " \u60A8\u5DF2\u8FDE\u7EED\u7B7E\u5230" + toDisplayString((_b = unref(isTodayCheckedIn).continuousDays) != null ? _b : 1) + "\u5929\uFF0C\u660E\u65E5\u7B7E\u5230\u5C06\u83B7\u5F97" + toDisplayString(unref(checkInReward).Tomorrow) + toDisplayString(unref(checkInReward).Config.n_reward_type === "1" ? "\u79EF\u5206" : "\u4F59\u989D"), 1)
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

export { sign as default };
//# sourceMappingURL=sign-Dj0FQ60N.mjs.map
