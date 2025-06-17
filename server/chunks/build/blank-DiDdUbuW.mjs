import { K as __nuxt_component_0$1, V as VCard, F as VCardText, a9 as VAvatar, aa as VImg, q as VIcon, aQ as VCardActions, J as VExpandTransition, bw as VProgressLinear } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, renderSlot, unref, createElementBlock, openBlock, Fragment, useSSRContext, markRaw, h, ref, createBlock, createElementVNode, normalizeClass, createCommentVNode, renderList, toDisplayString, createTextVNode, normalizeProps, withDirectives, vShow, watch, onMounted, onBeforeUnmount } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { V as VApp, a as Ve, K as Ke } from './vue-sonner-CaIlIz9M.mjs';
import { a as VProgressCircular, V as VBtn } from './VBtn-_od1f1mx.mjs';
import { V as VSpacer } from './VSpacer-DPtFzEIu.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'node:module';
import 'ipx';
import 'pinia';
import 'vue-router';
import '@iconify/vue';
import 'perfect-scrollbar';
import 'deep-pick-omit';
import 'dayjs';
import 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/es.js';
import 'awesome-phonenumber';
import './layout-Bel3IrLG.mjs';

const ne = /* @__PURE__ */ defineComponent({
  __name: "VSonner",
  props: {
    invert: { type: Boolean },
    position: { default: "bottom-center" },
    hotkey: { default: () => ["altKey", "KeyT"] },
    expand: { type: Boolean, default: false },
    duration: {},
    gap: {},
    visibleToasts: { default: 3 },
    toastOptions: {},
    class: {},
    offset: { default: 32 },
    dir: {},
    icons: {},
    containerAriaLabel: {},
    pauseWhenPageIsHidden: { type: Boolean },
    cn: {}
  },
  setup(o) {
    return (r, e) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(unref(Ve), {
        position: r.position,
        hotkey: r.hotkey,
        expand: r.expand,
        "visible-toasts": r.visibleToasts,
        duration: r.duration,
        "toast-options": r.toastOptions,
        offset: r.offset
      }, null, 8, ["position", "hotkey", "expand", "visible-toasts", "duration", "toast-options", "offset"]),
      renderSlot(r.$slots, "default")
    ], 64));
  }
}), G = /* @__PURE__ */ defineComponent({
  __name: "ProgressBar",
  props: {
    duration: { default: 5e3 },
    progressBarProps: {},
    isPaused: { type: Boolean, default: false },
    reverseProgressBar: { type: Boolean, default: false }
  },
  setup(o) {
    const r = o, e = r.reverseProgressBar ? ref(0) : ref(5e3);
    let s;
    watch(() => r.isPaused, (n) => {
      var g;
      !n && !((g = r.progressBarProps) != null && g.indeterminate) && a();
    });
    function a() {
      s = setTimeout(() => {
        r.isPaused || (r.reverseProgressBar ? e.value += 120 : e.value -= 120, e.value <= 0 && !r.reverseProgressBar ? (e.value = 0, clearInterval(s)) : e.value >= r.duration && r.reverseProgressBar ? (e.value = r.duration, clearInterval(s)) : a());
      }, 100);
    }
    return onMounted(() => {
      var n;
      (n = r.progressBarProps) != null && n.indeterminate || (e.value = r.reverseProgressBar ? 0 : r.duration, a());
    }), onBeforeUnmount(() => {
      clearInterval(s);
    }), (n, g) => (openBlock(), createBlock(unref(VProgressLinear), mergeProps(r.progressBarProps, {
      "model-value": Math.floor(100 * (unref(e) / r.duration))
    }), null, 16, ["model-value"]));
  }
}), J = { class: "d-flex align-center justify-center fill-height" }, Q = {
  key: 1,
  class: "d-flex align-center mr-8"
}, X = { class: "d-flex align-center justify-center fill-height" }, Y = { key: 3 }, Z = { class: "pb-1" }, x = ["innerHTML"], ee = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "Toast",
  props: {
    text: {},
    description: {},
    vertical: { type: Boolean, default: false },
    cardProps: {},
    cardTextProps: {},
    cardActionsProps: { default: () => ({}) },
    action: {},
    prependIcon: {},
    prependIconProps: {},
    avatar: {},
    multipleAvatars: {},
    avatarProps: {},
    progressBar: { type: Boolean, default: false },
    reverseProgressBar: { type: Boolean },
    progressDuration: { default: 5e3 },
    progressBarProps: {},
    loading: { type: Boolean }
  },
  emits: ["closeToast"],
  setup(o) {
    const r = ref(false);
    return (e, s) => (openBlock(), createBlock(unref(VCard), mergeProps({ class: "card-snackbar" }, e.cardProps, {
      onMouseenter: s[1] || (s[1] = (a) => r.value = true),
      onMouseleave: s[2] || (s[2] = (a) => r.value = false)
    }), {
      default: withCtx(() => [
        createElementVNode("div", {
          class: normalizeClass({ "d-flex flex-no-wrap justify-space-between": !e.vertical })
        }, [
          createVNode(unref(VCardText), mergeProps(e.cardTextProps, {
            class: { "d-flex align-center": e.prependIcon || e.avatar || e.multipleAvatars }
          }), {
            default: withCtx(() => [
              e.avatar ? (openBlock(), createBlock(unref(VAvatar), mergeProps({
                key: 0,
                class: "mr-2"
              }, e.avatarProps), {
                default: withCtx(() => [
                  createVNode(unref(VImg), {
                    src: e.avatar,
                    cover: ""
                  }, {
                    placeholder: withCtx(() => [
                      createElementVNode("div", J, [
                        createVNode(unref(VProgressCircular), {
                          color: "grey-lighten-2",
                          indeterminate: ""
                        })
                      ])
                    ]),
                    _: 1
                  }, 8, ["src"])
                ]),
                _: 1
              }, 16)) : e.multipleAvatars ? (openBlock(), createElementBlock("div", Q, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(e.multipleAvatars.length <= 5 ? e.multipleAvatars : e.multipleAvatars.slice(0, 5), (a, n) => (openBlock(), createBlock(unref(VAvatar), mergeProps({ ref_for: true }, e.avatarProps, {
                  key: n,
                  class: "mr-n6",
                  style: { zIndex: 5 - n }
                }), {
                  default: withCtx(() => [
                    createVNode(unref(VImg), {
                      src: a,
                      cover: ""
                    }, {
                      placeholder: withCtx(() => [
                        createElementVNode("div", X, [
                          createVNode(unref(VProgressCircular), {
                            color: "grey-lighten-2",
                            indeterminate: ""
                          })
                        ])
                      ]),
                      _: 2
                    }, 1032, ["src"])
                  ]),
                  _: 2
                }, 1040, ["style"]))), 128))
              ])) : createCommentVNode("", true),
              e.prependIcon ? (openBlock(), createBlock(unref(VIcon), mergeProps({
                key: 2,
                class: "mr-2",
                icon: e.prependIcon
              }, e.prependIconProps), null, 16, ["icon"])) : createCommentVNode("", true),
              e.description ? (openBlock(), createElementBlock("div", Y, [
                createElementVNode("div", Z, toDisplayString(e.text), 1),
                createElementVNode("p", {
                  class: "font-weight-light",
                  innerHTML: e.description
                }, null, 8, x)
              ])) : (openBlock(), createElementBlock(Fragment, { key: 4 }, [
                createTextVNode(toDisplayString(e.text), 1)
              ], 64))
            ]),
            _: 1
          }, 16, ["class"]),
          e.action ? (openBlock(), createBlock(unref(VCardActions), normalizeProps(mergeProps({ key: 0 }, e.cardActionsProps)), {
            default: withCtx(() => [
              createVNode(unref(VSpacer)),
              createVNode(unref(VBtn), mergeProps(e.action.buttonProps, {
                text: e.action.label,
                onClick: s[0] || (s[0] = () => {
                  var a, n;
                  e.$emit("closeToast"), (n = (a = e.action) == null ? void 0 : a.onClick) == null || n.call(a);
                })
              }), null, 16, ["text"])
            ]),
            _: 1
          }, 16)) : createCommentVNode("", true)
        ], 2),
        createVNode(unref(VExpandTransition), null, {
          default: withCtx(() => [
            withDirectives(createVNode(G, {
              duration: e.progressDuration,
              "progress-bar-props": e.progressBarProps,
              "is-paused": r.value,
              "reverse-progress-bar": e.reverseProgressBar
            }, null, 8, ["duration", "progress-bar-props", "is-paused", "reverse-progress-bar"]), [
              [vShow, e.progressBar]
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16));
  }
}), re = (o, r) => {
  const e = o.__vccOpts || o;
  for (const [s, a] of r)
    e[s] = a;
  return e;
}, se = /* @__PURE__ */ re(ee, [["__scopeId", "data-v-c014bbd8"]]);
function I(o, r) {
  var _a, _b;
  const { description: e, action: s, ...a } = r || {};
  return Ke.custom(markRaw(h(se, {
    ...a,
    progressBar: (_a = r == null ? void 0 : r.progressBar) != null ? _a : false,
    progressDuration: (_b = r == null ? void 0 : r.duration) != null ? _b : 5e3,
    progressBarProps: {
      ...r == null ? void 0 : r.progressBarProps,
      indeterminate: r == null ? void 0 : r.loading
    },
    description: e,
    action: s,
    text: o
  })), {
    ...a,
    unstyled: true
  });
}
function p(o, r) {
  return function(e, s) {
    return I(e, {
      prependIcon: r,
      cardProps: {
        color: o,
        ...s == null ? void 0 : s.cardProps
      },
      ...s
    });
  };
}
Object.assign(I, {
  success: p("success", "mdi-check-circle"),
  error: p("error", "mdi-cancel"),
  warning: p("warning", "mdi-alert"),
  info: p("info", "mdi-alert-circle"),
  primary: p("primary", "mdi-bell"),
  secondary: p("secondary", "mdi-bell"),
  dismiss(o) {
    return Ke.dismiss(o);
  },
  toastOriginal: Ke
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "blank",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(ssrRenderComponent(VApp, mergeProps({ app: "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(unref(ne), { position: "top-right" })
                ]),
                _: 1
              }),
              renderSlot(_ctx.$slots, "default")
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
//# sourceMappingURL=blank-DiDdUbuW.mjs.map
