import { createVNode, defineComponent, watchEffect, withCtx, useSSRContext, mergeProps, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList } from 'vue';
import { p as propsFactory, q as makeComponentProps, ah as makeGroupProps, ai as makeTagProps, aj as makeThemeProps, L as genericComponent, ak as provideTheme, al as useGroup, am as makeGroupItemProps, an as useGroupItem, ao as useRoute$1, h as useRouter$1, f as useGlobalStore, _ as _export_sfc, e as VBtn } from './server.mjs';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$2, a as _sfc_main$3 } from './app-bar-vuUpVYZ5.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'vue3-perfect-scrollbar';
import 'consola/core';
import '@formkit/auto-animate/vue';
import 'awesome-phonenumber';
import './layout-BllP2C0g.mjs';

const VItemGroupSymbol = Symbol.for("vuetify:v-item-group");
const makeVItemGroupProps = propsFactory({
  ...makeComponentProps(),
  ...makeGroupProps({
    selectedClass: "v-item--selected"
  }),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VItemGroup");
const VItemGroup = genericComponent()({
  name: "VItemGroup",
  props: makeVItemGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VItemGroupSymbol);
    return () => createVNode(props.tag, {
      "class": ["v-item-group", themeClasses.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots, {
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })];
      }
    });
  }
});
const VItem = genericComponent()({
  name: "VItem",
  props: makeGroupItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      select,
      toggle,
      selectedClass,
      value,
      disabled
    } = useGroupItem(props, VItemGroupSymbol);
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots, {
        isSelected: isSelected.value,
        selectedClass: selectedClass.value,
        select,
        toggle,
        value: value.value,
        disabled: disabled.value
      });
    };
  }
});
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(ssrRenderComponent(VItemGroup, mergeProps({
    mandatory: "",
    "model-value": "1",
    class: "mr-8"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList([
          { id: 1, name: "12 meses" },
          { id: 2, name: "30 d\xEDas" },
          { id: 3, name: "7 d\xEDas" },
          { id: 4, name: "24 horas" }
        ], (item) => {
          _push2(ssrRenderComponent(VItem, mergeProps({
            key: item.id,
            ref_for: true
          }, item), {
            default: withCtx(({ isSelected, toggle }, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(VBtn, {
                  onClick: toggle,
                  rounded: "0",
                  color: isSelected ? "primary" : "",
                  class: ["dashboard-app-bar-btn dashboard-app-bar-btn-" + item.id]
                }, {
                  default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`${ssrInterpolate(item.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(item.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(VBtn, {
                    onClick: toggle,
                    rounded: "0",
                    color: isSelected ? "primary" : "",
                    class: ["dashboard-app-bar-btn dashboard-app-bar-btn-" + item.id]
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(item.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick", "color", "class"])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(), createBlock(Fragment, null, renderList([
            { id: 1, name: "12 meses" },
            { id: 2, name: "30 d\xEDas" },
            { id: 3, name: "7 d\xEDas" },
            { id: 4, name: "24 horas" }
          ], (item) => {
            return createVNode(VItem, mergeProps({
              key: item.id,
              ref_for: true
            }, item), {
              default: withCtx(({ isSelected, toggle }) => [
                createVNode(VBtn, {
                  onClick: toggle,
                  rounded: "0",
                  color: isSelected ? "primary" : "",
                  class: ["dashboard-app-bar-btn dashboard-app-bar-btn-" + item.id]
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(item.name), 1)
                  ]),
                  _: 2
                }, 1032, ["onClick", "color", "class"])
              ]),
              _: 2
            }, 1040);
          }), 64))
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/app-bar-btn.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppBarBtn = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    watchEffect(() => {
      var _a;
      const route = useRoute$1();
      const router = useRouter$1();
      const globalStore = useGlobalStore();
      if (((_a = route.query) == null ? void 0 : _a.code) === "USER_NOT_VERIFIED") {
        globalStore.showErrorNotification({
          message: "Correo electr\xF3nico no ha sido verificado"
        });
        router.replace("/");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, _attrs, {
        "app-bar": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, null, {
              buttons: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(AppBarBtn, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(AppBarBtn)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3, null, {
                buttons: withCtx(() => [
                  createVNode(AppBarBtn)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D_Xevho4.mjs.map
