import { b as useTheme, u as useNuxtApp, n as navigateTo, d as useRuntimeConfig } from './server.mjs';
import { useSSRContext, defineComponent, ref, computed, resolveComponent, mergeProps, withCtx, unref, createVNode, createTextVNode, withModifiers } from 'vue';
import destr from 'destr';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { parse, serialize } from 'cookie-es';
import { appendHeader } from 'h3';
import { isEqual } from 'ohash';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'defu';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'ufo';
import '@iconify/vue';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a2;
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  const cookie = ref((_a2 = cookies[name]) != null ? _a2 : (_a = opts.default) == null ? void 0 : _a.call(opts));
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (!isEqual(cookie.value, cookies[name])) {
        writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
      }
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:redirected", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  var _a;
  {
    return parse(((_a = useRequestEvent()) == null ? void 0 : _a.req.headers.cookie) || "", opts);
  }
}
function serializeCookie(name, value, opts = {}) {
  if (value === null || value === void 0) {
    return serialize(name, value, { ...opts, maxAge: -1 });
  }
  return serialize(name, value, opts);
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    appendHeader(event, "Set-Cookie", serializeCookie(name, value, opts));
  }
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuthProvider",
  __ssrInlineRender: true,
  setup(__props) {
    const vuetifyTheme = useTheme();
    const authProviders = [
      {
        icon: "mdi-facebook",
        color: "#4267b2",
        colorInDark: "#4267b2",
        provider: "facebook"
      },
      {
        icon: "mdi-twitter",
        color: "#1da1f2",
        colorInDark: "#1da1f2",
        provider: "twitter"
      },
      {
        icon: "mdi-google",
        color: "#db4437",
        colorInDark: "#db4437",
        provider: "google"
      }
    ];
    const PROVIDERS = {
      facebook: "facebook",
      twitter: "twitter",
      google: "google"
    };
    const launchProvider = (provider) => {
      if (provider === PROVIDERS.facebook) {
        try {
          useCookie("XSRF-TOKEN").value = null;
          window.location.href = useRuntimeConfig().public.baseURLBackend + "/auth/facebook/redirect";
        } catch (error) {
          console.log(error);
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VBtn = resolveComponent("VBtn");
      _push(`<!--[-->`);
      ssrRenderList(authProviders, (link) => {
        _push(ssrRenderComponent(_component_VBtn, {
          key: link.icon,
          icon: link.icon,
          variant: "text",
          onClick: ($event) => launchProvider(link.provider),
          color: unref(vuetifyTheme).global.name.value === "dark" ? link.colorInDark : link.color
        }, null, _parent));
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/AuthProvider.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const logo = '<svg width="1.875em" height="1.5em" viewBox="0 0 250 196" fill="none" xmlns="http://www.w3.org/2000/svg">\r\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3002 1.25469L56.655 28.6432C59.0349 30.1128 60.4839 32.711 60.4839 35.5089V160.63C60.4839 163.468 58.9941 166.097 56.5603 167.553L12.2055 194.107C8.3836 196.395 3.43136 195.15 1.14435 191.327C0.395485 190.075 0 188.643 0 187.184V8.12039C0 3.66447 3.61061 0.0522461 8.06452 0.0522461C9.56056 0.0522461 11.0271 0.468577 12.3002 1.25469Z" fill="#9155FD"/>\r\n    <path opacity="0.077704" fill-rule="evenodd" clip-rule="evenodd" d="M0 65.2656L60.4839 99.9629V133.979L0 65.2656Z" fill="black"/>\r\n    <path opacity="0.077704" fill-rule="evenodd" clip-rule="evenodd" d="M0 65.2656L60.4839 99.0795V119.859L0 65.2656Z" fill="black"/>\r\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M237.71 1.22393L193.355 28.5207C190.97 29.9889 189.516 32.5905 189.516 35.3927V160.631C189.516 163.469 191.006 166.098 193.44 167.555L237.794 194.108C241.616 196.396 246.569 195.151 248.856 191.328C249.605 190.076 250 188.644 250 187.185V8.09597C250 3.64006 246.389 0.027832 241.935 0.027832C240.444 0.027832 238.981 0.441882 237.71 1.22393Z" fill="#9155FD"/>\r\n    <path opacity="0.077704" fill-rule="evenodd" clip-rule="evenodd" d="M250 65.2656L189.516 99.8897V135.006L250 65.2656Z" fill="black"/>\r\n    <path opacity="0.077704" fill-rule="evenodd" clip-rule="evenodd" d="M250 65.2656L189.516 99.0497V120.886L250 65.2656Z" fill="black"/>\r\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2787 1.18923L125 70.3075V136.87L0 65.2465V8.06814C0 3.61223 3.61061 0 8.06452 0C9.552 0 11.0105 0.411583 12.2787 1.18923Z" fill="#9155FD"/>\r\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2787 1.18923L125 70.3075V136.87L0 65.2465V8.06814C0 3.61223 3.61061 0 8.06452 0C9.552 0 11.0105 0.411583 12.2787 1.18923Z" fill="white" fill-opacity="0.15"/>\r\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M237.721 1.18923L125 70.3075V136.87L250 65.2465V8.06814C250 3.61223 246.389 0 241.935 0C240.448 0 238.99 0.411583 237.721 1.18923Z" fill="#9155FD"/>\r\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M237.721 1.18923L125 70.3075V136.87L250 65.2465V8.06814C250 3.61223 246.389 0 241.935 0C240.448 0 238.99 0.411583 237.721 1.18923Z" fill="white" fill-opacity="0.3"/>\r\n</svg>\r\n';
const authV1MaskDark = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACz4AAAFaBAMAAACX3HTLAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAPUExURUdwTC0pRC4qRSwoQywoQ4Cl7k8AAAAEdFJOUwB7PbhEZZIrAAAFUklEQVR42u3b0W2DMBSG0agboEwQVjAjeP+Z+tC+QAmChMIfc84IjvLp6trcbgCE6ftHd3cMABm++r7r7qXUX04E4OxRuStlqH84G4CkKuszwFlRLnUdBwZw+qiszwAHmd71vcIpAuw8Kr9VZX0G2HlUHurOHC3ASQsMfQbYeYEx1CM4boCTFhj6DJA+KuszQHyV9RlgGuVSs/hhAFXO5CcCruSAZ3H6DNBklfUZuEyUh/qh/ISAUVmfAf5J0rM4fQaMyp++wNBnoMVRudTm+a0BCwx9Bti4wHi0ctenz4BZWZ8BzMr6DLQ+KquyPgMZo3JvVNZnQJX1GeB5lAe11WfAqKzPACOexekzYIGhzwBLo7IFhj4DFhj6DDC/wJBLfQYsMNBnwKisz4Aqo8/A+ii769NnwKiMPgNjnsXpM6DK6DOwFGULDH0GjMroMzDmrk+fAQsM9BlYHJUtMPQZCOmyBYY+A3nTsjzpMxBUZRsM9Bky/Fz3KRH6DEZl9BmYHZVVGX0GCwz0GZiLsgUG+gwWGOgzMOWxMvoMeVU2KqPPYFRGnwFVRp/BXR/oMxiV0WcwKoM+gyqjz2CBAfoMRmXQZ4zKoM+gyqDPXDPKFhjoMxiVQZ9h9q5PldFnSKly5wUG+gxGZdBneFZlozLoM15ggD6DBQboM0Zl0GfYUGX/ONBngqKsyqDPWGCAPoO7PtBnVBn0GTZE2QID9BmjMugzuOsDfcYCA9Bn1o/KFhigz1hgAPqMuz7QZywwAH3GXR/oMxYYgD7zbpRVGfQZCwxAn3HXB/pMcpWNyqDPxI3Kqgz6jAUGoM+46wP02agM6DNGZUCfVRnQZ3zXB+izURnQZ9z1AfqsygD67Ls+QJ+NygD67K4P0GcsMAB99lgZQJ8tMAB9dtcHoM9GZUCfjcoA+qzKgD57Fgegz0ZlgPb77K4P0OesKltgAPrsuz4AfbbAAMjus7s+gGqBAaDPRmWA9D6rMkBQn33XB5DUZ1UGSOqzZ3EASX1WZYCgPnsWB5DUZ6MyQFCfPYsDSOqzBQZAUJ89iwNI6rMFBkBSn931AQT2WZUBMvvsCAD0GQB9BtBnAPQZQJ8B0GcA9BlAnwHQZwB9BkCfAfQZAH0GQJ8B9BkAfQbQZwD0GQB9BtBnAPQZQJ8B0GcAfQZAnwHQZwB9BkCfAfQZAH0GQJ8B9BkAfQbQZwD0GUCfAdBnAPQZQJ8B0GcAfQZAnwH02REA6DMA+gygzwDoM4A+A6DPAOgzgD4DoM8A+gyAPgPoMwD6DIA+A+gzAPoMoM8A6DMA+gygzwDoM4A+A6DPAPoMgD4DoM8A+gyAPgPoMwD6DIA+A+gzAPoMoM8A6DOAPgOgzwDoM4A+A6DPAPoMgD4D6LMjANBnAPQZQJ8B0GcAfQZAnwHQZwB9BkCfAfQZAH0G0GcA9BkAfQbQZwD0GUCfAdBnAPQZQJ8B0GcAfQZAnwH0GQB9BkCfAfQZAH0G0GcA9BkAfQbQZwD0GUCfAdBnAH0GQJ8B0GcAfQZAnwH0GQB9BtBnRwCgzwDoM4A+A6DPAPoMgD4DoM8A+gyAPgPoMwD6DKDPAOgzAPoMoM8A6DOAPgOgzwDoM4A+A6DPAPoMgD4D6DMA+gyAPgPoMwD6DKDPAOgzAPoMoM8A6DOAPgOgzwD6DIA+A6DPAPoMgD4D6DMA+gygz44AQJ8B0GcAfQZAnwH0GQB9BkCfAfQZAH0G0GcA9BlAnwHQZwD0GUCfAdBnAH0GQJ8B0GcAfQZAnwH0GQB9BtBnAPQZAH0G0GcA9BlAnwHQZwD0GUCfAdBngCZ8A2ywbuR66ljNAAAAAElFTkSuQmCC";
const authV1MaskLight = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAACtBAMAAAC0KMWCAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAVUExURUdwTPHx9vDx9vDx9vHy9/Pz+e/w9XrTQnAAAAAGdFJOUwB7ptFPJqEDGaYAAAKASURBVHja7d3NacNAFIVRb1KAUoJUgkB7g0qIW1D/JcSEkEVwyJ/BulfnlKB8DO/NGHI6QYHLyzoM4zT7EuR6uqzr8HzNePvgoxB4GJ+HcZyX7Qafh5DD+H2muJmxoEmZKc7XmWKet5/yzciaKQRN6oK3CZq0w/jXM4WgSV3wBE3Vgido9rjgDX9d8ARN1YInaHaQ8fyAjAXNbu8pBE3VPYWg6R+NBU3qPYWgOeZhLGi+P4zffhUUl7Gg+TxTTCEzhaD5YqbY022boPnPTLFsrfyNLXiCJuEwLp0pBH2s07hpwRP04S8qtsPTQvxFxbTIWND5FxXaFXT+RYXDWNAFjx8yFrQFT9CYKQSNBU/QRz+MzRSCzj+MLXiCNlMg6P284MlY0AWHsZlC0OELnsNY0F7wEPROXvBkLOj8FzwzhaAteAjaCx6CvseCJ2NBmykQtAUPQd/jV0EyFnTBgmemELQFD0E//AXPgkdy0BY8CoJ220ZB0BY88oO24FEQtJmC/KAteBQE7QWP/KC94FEQtJmCgqC94JEftMOYgqAL/kc0grbgkR+0FzwKgvaCR37QFjwKgvaCR0HQFjw6gjZTUBW0T4CgQdAgaBA0ggZBg6BB0CBoBA2CBkGDoEHQCBoEDYIGQYOgETQIGgQNggZBI2gQNAgaBA2CRtAgaBA0CBoEjaBB0CBoEDSCBkGDoEHQIGgEDYIGQYOgQdAIGgQNggZBg6ARNAgaBA2CBkEjaBA0CBoEDYJG0CBoEDQIGgSNoEHQIGgQNAgaQYOgQdAgaAQNggZBg6BB0AgaBA2CBkGDoBE0CBoEDYIGQSNoEDQIGgQNgkbQIGgQNAgaBE2rV8fAx8SI153KAAAAAElFTkSuQmCC";
const authV1Tree2 = "data:image/png;base64,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";
const authV1Tree = "data:image/png;base64,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";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const form = ref({
      email: "admin@sls.com",
      password: "password",
      remember: false
    });
    const vuetifyTheme = useTheme();
    const authThemeMask = computed(() => {
      return vuetifyTheme.global.name.value === "light" ? authV1MaskLight : authV1MaskDark;
    });
    const isPasswordVisible = ref(false);
    const isLoading = ref(false);
    const signInHandler = async () => {
      isLoading.value = true;
      await useNuxtApp().$api.auth.login(form.value);
      isLoading.value = false;
      navigateTo({ name: "index" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VCard = resolveComponent("VCard");
      const _component_VCardItem = resolveComponent("VCardItem");
      const _component_VCardTitle = resolveComponent("VCardTitle");
      const _component_VCardText = resolveComponent("VCardText");
      const _component_VForm = resolveComponent("VForm");
      const _component_VRow = resolveComponent("VRow");
      const _component_VCol = resolveComponent("VCol");
      const _component_VTextField = resolveComponent("VTextField");
      const _component_VCheckbox = resolveComponent("VCheckbox");
      const _component_VBtn = resolveComponent("VBtn");
      const _component_RouterLink = resolveComponent("RouterLink");
      const _component_VDivider = resolveComponent("VDivider");
      const _component_VImg = resolveComponent("VImg");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-wrapper d-flex align-center justify-center pa-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_VCard, {
        class: "auth-card pa-4 pt-7",
        "max-width": "448"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_VCardItem, { class: "justify-center" }, {
              prepend: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="d-flex"${_scopeId2}><div${_scopeId2}>${unref(logo)}</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "d-flex" }, [
                      createVNode("div", { innerHTML: unref(logo) }, null, 8, ["innerHTML"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_VCardTitle, { class: "font-weight-semibold text-2xl text-uppercase" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Futzo `);
                      } else {
                        return [
                          createTextVNode(" Futzo ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_VCardTitle, { class: "font-weight-semibold text-2xl text-uppercase" }, {
                      default: withCtx(() => [
                        createTextVNode(" Futzo ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_VCardText, { class: "pt-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h5 class="text-h5 font-weight-semibold mb-1"${_scopeId2}> Welcome to Futzo! \u{1F44B}\u{1F3FB} </h5><p class="mb-0"${_scopeId2}> Please sign-in to your account and start the adventure </p>`);
                } else {
                  return [
                    createVNode("h5", { class: "text-h5 font-weight-semibold mb-1" }, " Welcome to Futzo! \u{1F44B}\u{1F3FB} "),
                    createVNode("p", { class: "mb-0" }, " Please sign-in to your account and start the adventure ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_VForm, {
                    onSubmit: ($event) => signInHandler()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_VCol, { cols: "12" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_VTextField, {
                                      modelValue: unref(form).email,
                                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                      label: "Email",
                                      type: "email"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_VTextField, {
                                        modelValue: unref(form).email,
                                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                        label: "Email",
                                        type: "email"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_VCol, { cols: "12" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_VTextField, {
                                      modelValue: unref(form).password,
                                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                      label: "Password",
                                      type: unref(isPasswordVisible) ? "text" : "password",
                                      "append-inner-icon": unref(isPasswordVisible) ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                      "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_VCheckbox, {
                                      modelValue: unref(form).remember,
                                      "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                      label: "Remember me"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<a class="ms-2 mb-1" href="javascript:void(0)"${_scopeId5}> Forgot Password? </a></div>`);
                                    _push6(ssrRenderComponent(_component_VBtn, {
                                      block: "",
                                      type: "submit",
                                      loading: unref(isLoading),
                                      disabled: unref(isLoading)
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Login `);
                                        } else {
                                          return [
                                            createTextVNode(" Login ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_VTextField, {
                                        modelValue: unref(form).password,
                                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                        label: "Password",
                                        type: unref(isPasswordVisible) ? "text" : "password",
                                        "append-inner-icon": unref(isPasswordVisible) ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                        "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                      createVNode("div", { class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4" }, [
                                        createVNode(_component_VCheckbox, {
                                          modelValue: unref(form).remember,
                                          "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                          label: "Remember me"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode("a", {
                                          class: "ms-2 mb-1",
                                          href: "javascript:void(0)"
                                        }, " Forgot Password? ")
                                      ]),
                                      createVNode(_component_VBtn, {
                                        block: "",
                                        type: "submit",
                                        loading: unref(isLoading),
                                        disabled: unref(isLoading)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Login ")
                                        ]),
                                        _: 1
                                      }, 8, ["loading", "disabled"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_VCol, {
                                cols: "12",
                                class: "text-center text-base"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span${_scopeId5}>New on our platform?</span>`);
                                    _push6(ssrRenderComponent(_component_RouterLink, {
                                      class: "text-primary ms-2",
                                      to: { name: "register" }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Create an account `);
                                        } else {
                                          return [
                                            createTextVNode(" Create an account ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("span", null, "New on our platform?"),
                                      createVNode(_component_RouterLink, {
                                        class: "text-primary ms-2",
                                        to: { name: "register" }
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Create an account ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_VCol, {
                                cols: "12",
                                class: "d-flex align-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_VDivider, null, null, _parent6, _scopeId5));
                                    _push6(`<span class="mx-4"${_scopeId5}>or</span>`);
                                    _push6(ssrRenderComponent(_component_VDivider, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_VDivider),
                                      createVNode("span", { class: "mx-4" }, "or"),
                                      createVNode(_component_VDivider)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_VCol, {
                                cols: "12",
                                class: "text-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$1, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_VTextField, {
                                      modelValue: unref(form).email,
                                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                      label: "Email",
                                      type: "email"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_VTextField, {
                                      modelValue: unref(form).password,
                                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                      label: "Password",
                                      type: unref(isPasswordVisible) ? "text" : "password",
                                      "append-inner-icon": unref(isPasswordVisible) ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                      "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                    createVNode("div", { class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4" }, [
                                      createVNode(_component_VCheckbox, {
                                        modelValue: unref(form).remember,
                                        "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                        label: "Remember me"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("a", {
                                        class: "ms-2 mb-1",
                                        href: "javascript:void(0)"
                                      }, " Forgot Password? ")
                                    ]),
                                    createVNode(_component_VBtn, {
                                      block: "",
                                      type: "submit",
                                      loading: unref(isLoading),
                                      disabled: unref(isLoading)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Login ")
                                      ]),
                                      _: 1
                                    }, 8, ["loading", "disabled"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_VCol, {
                                  cols: "12",
                                  class: "text-center text-base"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", null, "New on our platform?"),
                                    createVNode(_component_RouterLink, {
                                      class: "text-primary ms-2",
                                      to: { name: "register" }
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Create an account ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_VCol, {
                                  cols: "12",
                                  class: "d-flex align-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_VDivider),
                                    createVNode("span", { class: "mx-4" }, "or"),
                                    createVNode(_component_VDivider)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_VCol, {
                                  cols: "12",
                                  class: "text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_VRow, null, {
                            default: withCtx(() => [
                              createVNode(_component_VCol, { cols: "12" }, {
                                default: withCtx(() => [
                                  createVNode(_component_VTextField, {
                                    modelValue: unref(form).email,
                                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                    label: "Email",
                                    type: "email"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_VCol, { cols: "12" }, {
                                default: withCtx(() => [
                                  createVNode(_component_VTextField, {
                                    modelValue: unref(form).password,
                                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                    label: "Password",
                                    type: unref(isPasswordVisible) ? "text" : "password",
                                    "append-inner-icon": unref(isPasswordVisible) ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                    "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                  createVNode("div", { class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4" }, [
                                    createVNode(_component_VCheckbox, {
                                      modelValue: unref(form).remember,
                                      "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                      label: "Remember me"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("a", {
                                      class: "ms-2 mb-1",
                                      href: "javascript:void(0)"
                                    }, " Forgot Password? ")
                                  ]),
                                  createVNode(_component_VBtn, {
                                    block: "",
                                    type: "submit",
                                    loading: unref(isLoading),
                                    disabled: unref(isLoading)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Login ")
                                    ]),
                                    _: 1
                                  }, 8, ["loading", "disabled"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_VCol, {
                                cols: "12",
                                class: "text-center text-base"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", null, "New on our platform?"),
                                  createVNode(_component_RouterLink, {
                                    class: "text-primary ms-2",
                                    to: { name: "register" }
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Create an account ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_VCol, {
                                cols: "12",
                                class: "d-flex align-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_VDivider),
                                  createVNode("span", { class: "mx-4" }, "or"),
                                  createVNode(_component_VDivider)
                                ]),
                                _: 1
                              }),
                              createVNode(_component_VCol, {
                                cols: "12",
                                class: "text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$1)
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_VForm, {
                      onSubmit: withModifiers(($event) => signInHandler(), ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_VRow, null, {
                          default: withCtx(() => [
                            createVNode(_component_VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode(_component_VTextField, {
                                  modelValue: unref(form).email,
                                  "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                  label: "Email",
                                  type: "email"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode(_component_VTextField, {
                                  modelValue: unref(form).password,
                                  "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                  label: "Password",
                                  type: unref(isPasswordVisible) ? "text" : "password",
                                  "append-inner-icon": unref(isPasswordVisible) ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                  "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                createVNode("div", { class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4" }, [
                                  createVNode(_component_VCheckbox, {
                                    modelValue: unref(form).remember,
                                    "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                    label: "Remember me"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("a", {
                                    class: "ms-2 mb-1",
                                    href: "javascript:void(0)"
                                  }, " Forgot Password? ")
                                ]),
                                createVNode(_component_VBtn, {
                                  block: "",
                                  type: "submit",
                                  loading: unref(isLoading),
                                  disabled: unref(isLoading)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Login ")
                                  ]),
                                  _: 1
                                }, 8, ["loading", "disabled"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_VCol, {
                              cols: "12",
                              class: "text-center text-base"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", null, "New on our platform?"),
                                createVNode(_component_RouterLink, {
                                  class: "text-primary ms-2",
                                  to: { name: "register" }
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Create an account ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_VCol, {
                              cols: "12",
                              class: "d-flex align-center"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_VDivider),
                                createVNode("span", { class: "mx-4" }, "or"),
                                createVNode(_component_VDivider)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_VCol, {
                              cols: "12",
                              class: "text-center"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["onSubmit"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_VCardItem, { class: "justify-center" }, {
                prepend: withCtx(() => [
                  createVNode("div", { class: "d-flex" }, [
                    createVNode("div", { innerHTML: unref(logo) }, null, 8, ["innerHTML"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(_component_VCardTitle, { class: "font-weight-semibold text-2xl text-uppercase" }, {
                    default: withCtx(() => [
                      createTextVNode(" Futzo ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_VCardText, { class: "pt-2" }, {
                default: withCtx(() => [
                  createVNode("h5", { class: "text-h5 font-weight-semibold mb-1" }, " Welcome to Futzo! \u{1F44B}\u{1F3FB} "),
                  createVNode("p", { class: "mb-0" }, " Please sign-in to your account and start the adventure ")
                ]),
                _: 1
              }),
              createVNode(_component_VCardText, null, {
                default: withCtx(() => [
                  createVNode(_component_VForm, {
                    onSubmit: withModifiers(($event) => signInHandler(), ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_VRow, null, {
                        default: withCtx(() => [
                          createVNode(_component_VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode(_component_VTextField, {
                                modelValue: unref(form).email,
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                label: "Email",
                                type: "email"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode(_component_VTextField, {
                                modelValue: unref(form).password,
                                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                label: "Password",
                                type: unref(isPasswordVisible) ? "text" : "password",
                                "append-inner-icon": unref(isPasswordVisible) ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                              createVNode("div", { class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4" }, [
                                createVNode(_component_VCheckbox, {
                                  modelValue: unref(form).remember,
                                  "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                  label: "Remember me"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("a", {
                                  class: "ms-2 mb-1",
                                  href: "javascript:void(0)"
                                }, " Forgot Password? ")
                              ]),
                              createVNode(_component_VBtn, {
                                block: "",
                                type: "submit",
                                loading: unref(isLoading),
                                disabled: unref(isLoading)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Login ")
                                ]),
                                _: 1
                              }, 8, ["loading", "disabled"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_VCol, {
                            cols: "12",
                            class: "text-center text-base"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", null, "New on our platform?"),
                              createVNode(_component_RouterLink, {
                                class: "text-primary ms-2",
                                to: { name: "register" }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Create an account ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_VCol, {
                            cols: "12",
                            class: "d-flex align-center"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_VDivider),
                              createVNode("span", { class: "mx-4" }, "or"),
                              createVNode(_component_VDivider)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_VCol, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["onSubmit"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_VImg, {
        class: "auth-footer-start-tree d-none d-md-block",
        src: unref(authV1Tree),
        width: 250
      }, null, _parent));
      _push(ssrRenderComponent(_component_VImg, {
        src: unref(authV1Tree2),
        class: "auth-footer-end-tree d-none d-md-block",
        width: 350
      }, null, _parent));
      _push(ssrRenderComponent(_component_VImg, {
        class: "auth-footer-mask d-none d-md-block",
        src: unref(authThemeMask)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-15b0c0aa.mjs.map
