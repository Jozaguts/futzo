import { p as publicAssetsURL } from './renderer.mjs';
import { useSSRContext, defineComponent, ref, resolveComponent, mergeProps, withCtx, unref, renderSlot, openBlock, createBlock } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { f as useLocalStorage, g as useHead } from './server.mjs';
import 'vue-bundle-renderer/runtime';
import 'h3';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'defu';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'unctx';
import 'vue-router';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import '@iconify/vue';

const _imports_0 = "" + publicAssetsURL("logo.png");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "loader",
  __ssrInlineRender: true,
  setup(__props) {
    const loaderColor = useLocalStorage("futzo-initial-loader-bg", "#FFFFFF");
    const primaryColor = useLocalStorage("futzo-initial-loader-color", "#9155FD");
    useHead({
      htmlAttrs: {
        style: `--initial-loader-bg: ${loaderColor.value}; --initial-loader-color: ${primaryColor.value};`
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "loading-bg" }, _attrs))}><div class="loading-logo"><img${ssrRenderAttr("src", _imports_0)} height="50" alt="Logo"></div><div class="loading"><div class="effect-1 effects"></div><div class="effect-2 effects"></div><div class="effect-3 effects"></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/loader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "blank",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_app = resolveComponent("v-app");
      const _component_shared_loader = _sfc_main$1;
      const _component_v_main = resolveComponent("v-main");
      _push(ssrRenderComponent(_component_v_app, mergeProps({ class: "layout-wrapper layout-nav-type-vertical" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isLoading)) {
              _push2(ssrRenderComponent(_component_shared_loader, null, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_v_main, { class: "layout-wrapper layout-blank" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default")
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            }
          } else {
            return [
              unref(isLoading) ? (openBlock(), createBlock(_component_shared_loader, { key: 0 })) : (openBlock(), createBlock(_component_v_main, {
                key: 1,
                class: "layout-wrapper layout-blank"
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }))
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
//# sourceMappingURL=blank-94937d80.mjs.map
