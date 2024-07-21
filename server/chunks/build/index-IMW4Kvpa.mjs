import { defineComponent, watchEffect, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { a2 as useRoute$1, h as useRouter$1, f as useGlobalStore } from './server.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import { V as VContainer } from './VContainer-BlVN2X13.mjs';
import { V as VRow, a as VCol } from './VRow-B-D5uMI5.mjs';
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
import 'consola/core';
import '@formkit/auto-animate/vue';
import 'awesome-phonenumber';

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
      _push(ssrRenderComponent(VContainer, mergeProps({ fluid: "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h1${_scopeId3}>Dashboard</h1>`);
                      } else {
                        return [
                          createVNode("h1", null, "Dashboard")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode("h1", null, "Dashboard")
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
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode("h1", null, "Dashboard")
                    ]),
                    _: 1
                  })
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
//# sourceMappingURL=index-IMW4Kvpa.mjs.map
