import { PageHeader, Space, Input, Button, Tabs, TabPane, Table, Pagination, Tag, Message } from '@arco-design/web-vue';
import { ref, withCtx, unref, createTextVNode, createVNode, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "bill",
  __ssrInlineRender: true,
  setup(__props) {
    const UserList = ref([]);
    const GetFrom = ref({
      page: 1,
      pagesize: 20,
      status: 1,
      total: 0
    });
    const loading = ref(false);
    const GetUserList = async () => {
      loading.value = true;
      const res = await useApiFetch().post("/api/getuserbill", GetFrom.value);
      if (res.code === 200) {
        UserList.value = res.data;
        GetFrom.value.total = res.total;
      } else {
        Message.error(res.msg);
      }
      loading.value = false;
    };
    const columns = [
      {
        title: "\u65F6\u95F4",
        dataIndex: "n_time",
        ellipsis: true,
        tooltip: true
      },
      {
        title: "\u91D1\u989D",
        dataIndex: "n_amount"
      },
      {
        title: "\u53BB\u5411",
        dataIndex: "n_name",
        ellipsis: true,
        tooltip: true
      },
      {
        title: "\u6743\u91CD",
        slotName: "n_type"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_page_header = PageHeader;
      const _component_a_space = Space;
      const _component_a_input = Input;
      const _component_a_button = Button;
      const _component_a_tabs = Tabs;
      const _component_a_tab_pane = TabPane;
      const _component_a_table = Table;
      const _component_a_tag = Tag;
      const _component_a_pagination = Pagination;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-0a64b346><div class="Page" data-v-0a64b346>`);
      _push(ssrRenderComponent(_component_a_page_header, {
        title: "\u6211\u7684\u8D26\u5355",
        "show-back": false
      }, {
        subtitle: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_input, {
                    modelValue: unref(GetFrom).search,
                    "onUpdate:modelValue": ($event) => unref(GetFrom).search = $event,
                    placeholder: "\u6A21\u7CCA\u641C\u7D22",
                    "allow-clear": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_a_button, {
                    type: "primary",
                    onClick: ($event) => GetUserList()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u68C0\u7D22`);
                      } else {
                        return [
                          createTextVNode("\u68C0\u7D22")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_input, {
                      modelValue: unref(GetFrom).search,
                      "onUpdate:modelValue": ($event) => unref(GetFrom).search = $event,
                      placeholder: "\u6A21\u7CCA\u641C\u7D22",
                      "allow-clear": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_a_button, {
                      type: "primary",
                      onClick: ($event) => GetUserList()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u68C0\u7D22")
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
              createVNode(_component_a_space, null, {
                default: withCtx(() => [
                  createVNode(_component_a_input, {
                    modelValue: unref(GetFrom).search,
                    "onUpdate:modelValue": ($event) => unref(GetFrom).search = $event,
                    placeholder: "\u6A21\u7CCA\u641C\u7D22",
                    "allow-clear": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_a_button, {
                    type: "primary",
                    onClick: ($event) => GetUserList()
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u68C0\u7D22")
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
      _push(`<div class="Pagecontent" data-v-0a64b346>`);
      _push(ssrRenderComponent(_component_a_tabs, {
        "active-key": unref(GetFrom).status,
        "onUpdate:activeKey": ($event) => unref(GetFrom).status = $event,
        onChange: GetUserList
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_tab_pane, {
              key: "1",
              title: "\u79EF\u5206\u8D26\u5355"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_a_tab_pane, {
              key: "2",
              title: "\u4F59\u989D\u8D26\u5355"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_a_tab_pane, {
                key: "1",
                title: "\u79EF\u5206\u8D26\u5355"
              }),
              createVNode(_component_a_tab_pane, {
                key: "2",
                title: "\u4F59\u989D\u8D26\u5355"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_a_table, {
        style: { "height": "calc(100vh - 230px)" },
        columns,
        data: unref(UserList),
        pagination: false,
        loading: unref(loading)
      }, {
        n_type: withCtx(({ record }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (record.n_type == 1) {
              _push2(ssrRenderComponent(_component_a_tag, { color: "#00b42a" }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u6536\u5165`);
                  } else {
                    return [
                      createTextVNode("\u6536\u5165")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_a_tag, { color: "#0fc6c2" }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u652F\u51FA`);
                  } else {
                    return [
                      createTextVNode("\u652F\u51FA")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            }
          } else {
            return [
              record.n_type == 1 ? (openBlock(), createBlock(_component_a_tag, {
                key: 0,
                color: "#00b42a"
              }, {
                default: withCtx(() => [
                  createTextVNode("\u6536\u5165")
                ]),
                _: 1
              })) : (openBlock(), createBlock(_component_a_tag, {
                key: 1,
                color: "#0fc6c2"
              }, {
                default: withCtx(() => [
                  createTextVNode("\u652F\u51FA")
                ]),
                _: 1
              }))
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_pagination, {
              onChange: GetUserList,
              onPageSizeChange: GetUserList,
              current: unref(GetFrom).page,
              "onUpdate:current": ($event) => unref(GetFrom).page = $event,
              pageSize: unref(GetFrom).pagesize,
              "onUpdate:pageSize": ($event) => unref(GetFrom).pagesize = $event,
              total: unref(GetFrom).total,
              size: "mini",
              "show-total": "",
              "show-page-size": "",
              "page-size-options": [50, 100, 200, 500, 1e3]
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_a_pagination, {
                onChange: GetUserList,
                onPageSizeChange: GetUserList,
                current: unref(GetFrom).page,
                "onUpdate:current": ($event) => unref(GetFrom).page = $event,
                pageSize: unref(GetFrom).pagesize,
                "onUpdate:pageSize": ($event) => unref(GetFrom).pagesize = $event,
                total: unref(GetFrom).total,
                size: "mini",
                "show-total": "",
                "show-page-size": "",
                "page-size-options": [50, 100, 200, 500, 1e3]
              }, null, 8, ["current", "onUpdate:current", "pageSize", "onUpdate:pageSize", "total"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/user/index/bill.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const bill = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0a64b346"]]);

export { bill as default };
//# sourceMappingURL=bill-DmQNMt88.mjs.map
