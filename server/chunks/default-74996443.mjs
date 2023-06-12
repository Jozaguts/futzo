import { _ as _export_sfc, u as useNuxtApp } from './server.mjs';
import { resolveComponent, withCtx, createTextVNode, unref, createVNode, withModifiers, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'defu';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'h3';
import 'ufo';
import '@iconify/vue';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_v_app = resolveComponent("v-app");
  const _component_v_app_bar = resolveComponent("v-app-bar");
  const _component_v_navigation_drawer = resolveComponent("v-navigation-drawer");
  const _component_v_btn = resolveComponent("v-btn");
  const _component_v_main = resolveComponent("v-main");
  const _component_v_footer = resolveComponent("v-footer");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_v_app, { class: "layout-wrapper layout-nav-type-vertical" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_v_app_bar, { app: "" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_v_navigation_drawer, { app: "" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_v_btn, {
                onClick: ($event) => _ctx.$router.push("/login")
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` login`);
                  } else {
                    return [
                      createTextVNode(" login")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_v_btn, {
                onClick: ($event) => _ctx.$router.push("/")
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` home`);
                  } else {
                    return [
                      createTextVNode(" home")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_v_btn, {
                onClick: ($event) => ("useNuxtApp" in _ctx ? _ctx.useNuxtApp : unref(useNuxtApp))().$api.auth.logout()
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`logout`);
                  } else {
                    return [
                      createTextVNode("logout")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_v_btn, {
                  onClick: ($event) => _ctx.$router.push("/login")
                }, {
                  default: withCtx(() => [
                    createTextVNode(" login")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_v_btn, {
                  onClick: ($event) => _ctx.$router.push("/")
                }, {
                  default: withCtx(() => [
                    createTextVNode(" home")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_v_btn, {
                  onClick: withModifiers(($event) => ("useNuxtApp" in _ctx ? _ctx.useNuxtApp : unref(useNuxtApp))().$api.auth.logout(), ["prevent"])
                }, {
                  default: withCtx(() => [
                    createTextVNode("logout")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_v_main, { app: "" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` default layout `);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
            } else {
              return [
                createTextVNode(" default layout "),
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_v_footer, { app: "" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_v_btn, { to: "/legales" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`legales`);
                  } else {
                    return [
                      createTextVNode("legales")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_v_btn, { to: "/legales" }, {
                  default: withCtx(() => [
                    createTextVNode("legales")
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
          createVNode(_component_v_app_bar, { app: "" }),
          createVNode(_component_v_navigation_drawer, { app: "" }, {
            default: withCtx(() => [
              createVNode(_component_v_btn, {
                onClick: ($event) => _ctx.$router.push("/login")
              }, {
                default: withCtx(() => [
                  createTextVNode(" login")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_v_btn, {
                onClick: ($event) => _ctx.$router.push("/")
              }, {
                default: withCtx(() => [
                  createTextVNode(" home")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_v_btn, {
                onClick: withModifiers(($event) => ("useNuxtApp" in _ctx ? _ctx.useNuxtApp : unref(useNuxtApp))().$api.auth.logout(), ["prevent"])
              }, {
                default: withCtx(() => [
                  createTextVNode("logout")
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 1
          }),
          createVNode(_component_v_main, { app: "" }, {
            default: withCtx(() => [
              createTextVNode(" default layout "),
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }),
          createVNode(_component_v_footer, { app: "" }, {
            default: withCtx(() => [
              createVNode(_component_v_btn, { to: "/legales" }, {
                default: withCtx(() => [
                  createTextVNode("legales")
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-74996443.mjs.map
