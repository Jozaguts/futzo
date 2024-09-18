import { f as useGlobalStore, bW as ne$1, o as __nuxt_component_1$1 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, renderSlot, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { V as VApp, a as VFooter } from './VFooter-BgBQQQBY.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "blank",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_1$1;
      _push(ssrRenderComponent(VApp, mergeProps({ app: "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            if (unref(useGlobalStore)().showFooter) {
              _push2(ssrRenderComponent(VFooter, {
                absolute: "",
                app: "",
                style: { "max-width": "50%" },
                color: "background"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} \xA9 Futzo `);
                  } else {
                    return [
                      createTextVNode(toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " \xA9 Futzo ", 1)
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
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(unref(ne$1), { position: "top-right" })
                ]),
                _: 1
              }),
              renderSlot(_ctx.$slots, "default"),
              unref(useGlobalStore)().showFooter ? (openBlock(), createBlock(VFooter, {
                key: 0,
                absolute: "",
                app: "",
                style: { "max-width": "50%" },
                color: "background"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " \xA9 Futzo ", 1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/blank.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=blank-DA3irosP.mjs.map
