import { defineComponent, ref, unref, mergeProps, withCtx, createVNode, computed, resolveDirective, createTextVNode, toDisplayString, isRef, withDirectives, createBlock, openBlock, createCommentVNode, createSlots, withModifiers, reactive, Fragment, renderList, mergeModels, useModel, resolveComponent, renderSlot, createElementVNode, vShow, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1 } from './TransitionSlide-d5qGX2mN.mjs';
import { _ as _sfc_main$c } from './Logo-D65Z66Oc.mjs';
import { _ as __nuxt_component_0$2 } from './index-DkcY5wU8.mjs';
import { V as VCard, f as VCardItem, e as VCardTitle, E as VCardSubtitle, F as VCardText, H as VDivider, J as VExpandTransition, C as VTextField, K as __nuxt_component_0$1$1, z as VMenu, A as VList, B as VListItem, D as VListItemTitle, _ as _export_sfc, y as useSanctumClient, g as genericComponent, i as useRouter$1, G as useSanctumAuth, p as propsFactory, j as useBackgroundColor, k as useRounded, l as useLocale, d as useTextColor, m as useTheme, n as useLocation, c as useRender, o as pickWithRest, M as MaybeTransition, q as VIcon, r as makeTransitionProps, s as makeThemeProps, t as makeTagProps, v as makeRoundedProps, w as makeLocationProps, x as makeComponentProps, I as IconValue } from './server.mjs';
import { V as VBtn } from './VBtn-_od1f1mx.mjs';
import { countries } from 'countries-list';
import { V as VRow, a as VCol } from './VRow-CwLG7ojV.mjs';
import { T as TransitionExpand } from './vue-transitions-gDOXGptb.mjs';
import { object, string, boolean } from 'yup';
import { u as useForm } from './vee-validate-DglmwfQ_.mjs';
import { b as useAuthStore, p as phoneRegex, s as specialCharacters, c as useApiError, d as useLocationStore } from './useScheduleStore-DBhAIDF3.mjs';
import { storeToRefs } from 'pinia';
import { V as VCheckbox, t as toTypedSchema } from './vee-validate-yup-P4OcCFc2.mjs';
import { u as useToast } from './useToast-m9XhiEp3.mjs';
import { V as VOtpInput } from './VOtpInput-GP1HjK1o.mjs';
import { s as setInterval } from './interval-DSlygkzF.mjs';
import { V as VForm } from './VForm-JZ5ZyLTF.mjs';
import { V as VContainer } from './VContainer-C0Se5csP.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
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
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'perfect-scrollbar';
import 'deep-pick-omit';
import 'dayjs';
import 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/es.js';
import 'awesome-phonenumber';
import '@morev/utils';
import '@vue/reactivity';

const makeVBadgeProps = propsFactory({
  bordered: Boolean,
  color: String,
  content: [Number, String],
  dot: Boolean,
  floating: Boolean,
  icon: IconValue,
  inline: Boolean,
  label: {
    type: String,
    default: "$vuetify.badge"
  },
  max: [Number, String],
  modelValue: {
    type: Boolean,
    default: true
  },
  offsetX: [Number, String],
  offsetY: [Number, String],
  textColor: String,
  ...makeComponentProps(),
  ...makeLocationProps({
    location: "top end"
  }),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeTransitionProps({
    transition: "scale-rotate-transition"
  })
}, "VBadge");
const VBadge = genericComponent()({
  name: "VBadge",
  inheritAttrs: false,
  props: makeVBadgeProps(),
  setup(props, ctx) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      t
    } = useLocale();
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.textColor);
    const {
      themeClasses
    } = useTheme();
    const {
      locationStyles
    } = useLocation(props, true, (side) => {
      var _a, _b;
      const base = props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
      return base + (["top", "bottom"].includes(side) ? Number((_a = props.offsetY) != null ? _a : 0) : ["left", "right"].includes(side) ? Number((_b = props.offsetX) != null ? _b : 0) : 0);
    });
    useRender(() => {
      const value = Number(props.content);
      const content = !props.max || isNaN(value) ? props.content : value <= Number(props.max) ? value : `${props.max}+`;
      const [badgeAttrs, attrs] = pickWithRest(ctx.attrs, ["aria-atomic", "aria-label", "aria-live", "role", "title"]);
      return createVNode(props.tag, mergeProps({
        "class": ["v-badge", {
          "v-badge--bordered": props.bordered,
          "v-badge--dot": props.dot,
          "v-badge--floating": props.floating,
          "v-badge--inline": props.inline
        }, props.class]
      }, attrs, {
        "style": props.style
      }), {
        default: () => {
          var _a, _b;
          return [createElementVNode("div", {
            "class": "v-badge__wrapper"
          }, [(_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a), createVNode(MaybeTransition, {
            "transition": props.transition
          }, {
            default: () => {
              var _a2, _b2;
              return [withDirectives(createElementVNode("span", mergeProps({
                "class": ["v-badge__badge", themeClasses.value, backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
                "style": [backgroundColorStyles.value, textColorStyles.value, props.inline ? {} : locationStyles.value],
                "aria-atomic": "true",
                "aria-label": t(props.label, value),
                "aria-live": "polite",
                "role": "status"
              }, badgeAttrs), [props.dot ? void 0 : ctx.slots.badge ? (_b2 = (_a2 = ctx.slots).badge) == null ? void 0 : _b2.call(_a2) : props.icon ? createVNode(VIcon, {
                "icon": props.icon
              }, null) : content]), [[vShow, props.modelValue]])];
            }
          })])];
        }
      });
    });
    return {};
  }
});
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "AuthProvider",
  __ssrInlineRender: true,
  setup(__props) {
    const authProviders = [
      {
        icon: "futzo-icon:google",
        color: "#E7E3FC",
        colorInDark: "#db4437",
        provider: "google"
      },
      {
        icon: "futzo-icon:facebook",
        color: "#E7E3FC",
        colorInDark: "#4267b2",
        provider: "facebook"
      }
    ];
    const PROVIDERS = ["facebook", "google"];
    const launchProvider = async (provider) => {
      if (PROVIDERS.includes(provider)) {
        try {
          const client = useSanctumClient();
          const data = await client(`auth/${provider}/redirect`);
          let url = data.url;
          if (url) {
            (void 0).location.href = url;
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$2;
      _push(`<!--[-->`);
      ssrRenderList(authProviders, (link) => {
        _push(ssrRenderComponent(VBtn, {
          key: link.icon,
          variant: "outlined",
          class: "mx-3",
          density: "compact",
          size: "x-large",
          color: link.color,
          onClick: ($event) => launchProvider(link.provider)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: link.icon
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: link.icon
                }, null, 8, ["name"])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/AuthProvider.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "SearchCountry",
  __ssrInlineRender: true,
  emits: ["update-area-code"],
  setup(__props, { emit: __emit }) {
    const selectedCountry = ref();
    const close = ref(false);
    const country = ref(
      Object.entries(countries).map(([key, value]) => {
        return {
          phone: `${value.phone}`,
          name: value.name,
          value: key
        };
      })
    );
    const searchCountry = (value) => {
      country.value = Object.entries(countries).map(([key, value2]) => {
        return {
          phone: `${value2.phone}`,
          name: value2.name,
          value: key
        };
      }).filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });
    };
    const resetCountries = () => {
      country.value = Object.entries(countries).map(([key, value]) => {
        return {
          phone: `${value.phone}`,
          name: value.name,
          value: key
        };
      });
    };
    const selectHandler = (item) => {
      resetCountries();
      selectedCountry.value = `${item.value} +${item.phone}`;
      close.value = false;
      emits("update-area-code", `+${item.phone}`);
    };
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex justify-space-around" }, _attrs))}>`);
      _push(ssrRenderComponent(VMenu, {
        "min-width": "200px",
        "close-on-content-click": false,
        modelValue: close.value,
        "onUpdate:modelValue": ($event) => close.value = $event
      }, {
        activator: withCtx(({ props }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, mergeProps({
              variant: "text",
              tile: "",
              flat: "",
              slim: "",
              color: "primary"
            }, props, {
              "append-icon": "mdi-chevron-down",
              class: "text-caption"
            }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(selectedCountry.value)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(selectedCountry.value), 1)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, mergeProps({
                variant: "text",
                tile: "",
                flat: "",
                slim: "",
                color: "primary"
              }, props, {
                "append-icon": "mdi-chevron-down",
                class: "text-caption"
              }), {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(selectedCountry.value), 1)
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VList, {
              "min-width": "240px",
              density: "compact",
              slim: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VListItem, { density: "compact" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          density: "compact",
                          variant: "outlined",
                          placeholder: "Buscar pa\xEDs",
                          class: "rounded-lg border-sm",
                          onKeydown: ($event) => searchCountry($event.target.value)
                        }, {
                          "append-inner": withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Icon, { name: "hugeicons:search-02" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Icon, { name: "hugeicons:search-02" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            density: "compact",
                            variant: "outlined",
                            placeholder: "Buscar pa\xEDs",
                            class: "rounded-lg border-sm",
                            onKeydown: ($event) => searchCountry($event.target.value)
                          }, {
                            "append-inner": withCtx(() => [
                              createVNode(_component_Icon, { name: "hugeicons:search-02" })
                            ]),
                            _: 1
                          }, 8, ["onKeydown"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(country.value.slice(0, 4), (item, index) => {
                    _push3(ssrRenderComponent(VListItem, {
                      density: "compact",
                      key: index,
                      value: index,
                      onClick: ($event) => selectHandler(item)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VListItemTitle, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="d-flex align-center justify-space-between"${_scopeId4}><span class="d-inline-block text-truncate text-caption" style="${ssrRenderStyle({ "max-width": "150px" })}"${_scopeId4}>${ssrInterpolate(item.name)}</span><span class="text-caption"${_scopeId4}>+${ssrInterpolate(item.phone)}</span></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                                    createVNode("span", {
                                      class: "d-inline-block text-truncate text-caption",
                                      style: { "max-width": "150px" }
                                    }, toDisplayString(item.name), 1),
                                    createVNode("span", { class: "text-caption" }, "+" + toDisplayString(item.phone), 1)
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                                  createVNode("span", {
                                    class: "d-inline-block text-truncate text-caption",
                                    style: { "max-width": "150px" }
                                  }, toDisplayString(item.name), 1),
                                  createVNode("span", { class: "text-caption" }, "+" + toDisplayString(item.phone), 1)
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode(VListItem, { density: "compact" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          density: "compact",
                          variant: "outlined",
                          placeholder: "Buscar pa\xEDs",
                          class: "rounded-lg border-sm",
                          onKeydown: ($event) => searchCountry($event.target.value)
                        }, {
                          "append-inner": withCtx(() => [
                            createVNode(_component_Icon, { name: "hugeicons:search-02" })
                          ]),
                          _: 1
                        }, 8, ["onKeydown"])
                      ]),
                      _: 1
                    }),
                    (openBlock(true), createBlock(Fragment, null, renderList(country.value.slice(0, 4), (item, index) => {
                      return openBlock(), createBlock(VListItem, {
                        density: "compact",
                        key: index,
                        value: index,
                        onClick: ($event) => selectHandler(item)
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItemTitle, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                                createVNode("span", {
                                  class: "d-inline-block text-truncate text-caption",
                                  style: { "max-width": "150px" }
                                }, toDisplayString(item.name), 1),
                                createVNode("span", { class: "text-caption" }, "+" + toDisplayString(item.phone), 1)
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["value", "onClick"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VList, {
                "min-width": "240px",
                density: "compact",
                slim: ""
              }, {
                default: withCtx(() => [
                  createVNode(VListItem, { density: "compact" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        density: "compact",
                        variant: "outlined",
                        placeholder: "Buscar pa\xEDs",
                        class: "rounded-lg border-sm",
                        onKeydown: ($event) => searchCountry($event.target.value)
                      }, {
                        "append-inner": withCtx(() => [
                          createVNode(_component_Icon, { name: "hugeicons:search-02" })
                        ]),
                        _: 1
                      }, 8, ["onKeydown"])
                    ]),
                    _: 1
                  }),
                  (openBlock(true), createBlock(Fragment, null, renderList(country.value.slice(0, 4), (item, index) => {
                    return openBlock(), createBlock(VListItem, {
                      density: "compact",
                      key: index,
                      value: index,
                      onClick: ($event) => selectHandler(item)
                    }, {
                      default: withCtx(() => [
                        createVNode(VListItemTitle, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                              createVNode("span", {
                                class: "d-inline-block text-truncate text-caption",
                                style: { "max-width": "150px" }
                              }, toDisplayString(item.name), 1),
                              createVNode("span", { class: "text-caption" }, "+" + toDisplayString(item.phone), 1)
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1032, ["value", "onClick"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/components/SearchCountry.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "ErrorMessages",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    username: String,
    areaCode: String
  }, {
    "errors": {},
    "errorsModifiers": {}
  }),
  emits: ["update:errors"],
  setup(__props) {
    const errorMessage = useModel(__props, "errors");
    const props = __props;
    const urlVerification = computed(() => {
      const isPhone = /^\d/.test(props.username);
      const type = isPhone ? "phone" : "email";
      const identifier = isPhone ? `${props.areaCode}${props.username}` : props.username;
      return `/verificar?${type}=${identifier}`;
    });
    const showVerifyButton = computed(() => {
      return errorMessage.value === "Su direcci\xF3n de correo electr\xF3nico no est\xE1 verificada." || errorMessage.value === "Su n\xFAmero de tel\xE9fono no est\xE1 verificado.";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(ssrRenderComponent(VCol, mergeProps({ class: "d-flex align-content-center justify-start py-0" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (errorMessage.value) {
              _push2(`<small class="text-red pl-2 font-weight-bold"${_scopeId}> * ${ssrInterpolate(errorMessage.value)} `);
              if (unref(showVerifyButton)) {
                _push2(`<span${_scopeId}><a class="text-primary" href="javascript:void(0)"${_scopeId}>Verificar</a></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</small>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              errorMessage.value ? (openBlock(), createBlock("small", {
                key: 0,
                class: "text-red pl-2 font-weight-bold"
              }, [
                createTextVNode(" * " + toDisplayString(errorMessage.value) + " ", 1),
                unref(showVerifyButton) ? (openBlock(), createBlock("span", { key: 0 }, [
                  createVNode("a", {
                    class: "text-primary",
                    href: "javascript:void(0)",
                    onClick: () => _ctx.$router.push(unref(urlVerification))
                  }, "Verificar", 8, ["onClick"])
                ])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/components/ErrorMessages.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "PasswordRules",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    show: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String || void 0,
      required: true
    }
  }, {
    "modelValue": {
      type: String,
      default: ""
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const specialCharacters2 = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const modelValue = useModel(__props, "modelValue");
    const atLestIcon = computed(() => {
      return modelValue.value.length > 7 ? "futzo-icon:check-icon" : "futzo-icon:check-icon-secondary";
    });
    const specialCharacterIcon = computed(() => {
      return specialCharacters2.test(modelValue.value) ? "futzo-icon:check-icon" : "futzo-icon:check-icon-secondary";
    });
    const rules = computed(() => {
      return [
        {
          text: "Al menos 8 caracteres",
          icon: atLestIcon.value
        },
        {
          text: "Debe contener un car\xE1cter especial",
          icon: specialCharacterIcon.value
        }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex flex-column mt-2" }, _attrs))}>`);
      if (__props.show) {
        _push(`<div class="d-flex flex-column mb-4"><!--[-->`);
        ssrRenderList(unref(rules), (rule) => {
          _push(`<div class="rule-container">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: rule.icon,
            class: "text-primary",
            size: "20"
          }, null, _parent));
          _push(`<span class="rule-text">${ssrInterpolate(rule.text)}</span></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/components/PasswordRules.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = {
  name: "TransitionExpand",
  inheritAttrs: false,
  components: { TheTransition: TransitionExpand }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_the_transition = resolveComponent("the-transition");
  _push(ssrRenderComponent(_component_the_transition, mergeProps(_ctx.$attrs, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.vue-transitions/TransitionExpand.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ForgotPasswordCard",
  __ssrInlineRender: true,
  emits: ["backToLogin"],
  setup(__props, { emit: __emit }) {
    const { forgotPasswordState } = storeToRefs(useAuthStore());
    const emits = __emit;
    const { handleSubmit, defineField, errors, meta } = useForm({
      validationSchema: toTypedSchema(
        object({
          username: string().required("El correo o n\xFAmero tel\xE9fono  es obligatorio").test(
            "is-valid-username",
            "El campo debe ser un n\xFAmero de tel\xE9fono o un correo electr\xF3nico v\xE1lido",
            (value, context) => {
              const isEmail = string().email().isValidSync(value);
              forgotPasswordState.value.isPhone = phoneRegex.test(value);
              context.parent.inputType = forgotPasswordState.value.isPhone ? "phone" : isEmail ? "email" : null;
              forgotPasswordState.value.username = value;
              return isEmail || forgotPasswordState.value.isPhone;
            }
          )
        })
      )
    });
    const [username] = reactive(defineField("username"));
    const isPhoneNumber = computed(() => {
      var _a2;
      var _a;
      return ((_a2 = (_a = username.value) == null ? void 0 : _a.length) != null ? _a2 : 0) > 0 && /^\d/.test(username.value);
    });
    const areaCodeHandler = (code) => {
      forgotPasswordState.value.areaCode = code;
    };
    const isValid = computed(() => meta.value.valid);
    const resetHandler = handleSubmit(() => {
      forgotPasswordState.value.isFetching = true;
      const client = useSanctumClient();
      client("/forgot-password", {
        method: "POST",
        body: {
          [forgotPasswordState.value.isPhone ? "phone" : "email"]: forgotPasswordState.value.isPhone ? `${forgotPasswordState.value.areaCode}${username.value}` : username.value
        }
      }).then((response) => {
        if (response.code === 200) {
          forgotPasswordState.value.isPhone ? forgotPasswordState.value.step = "verify-code" : forgotPasswordState.value.step = "email-sent";
        }
      }).catch((error) => {
        var _a2;
        var _a;
        useToast().toast(
          "error",
          "Error",
          (_a2 = (_a = error == null ? void 0 : error.data) == null ? void 0 : _a.message) != null ? _a2 : "El correo o n\xFAmero de tel\xE9fono no es v\xE1lido"
        );
      }).finally(() => forgotPasswordState.value.isFetching = false);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Logo = _sfc_main$c;
      const _component_transition_slide = __nuxt_component_0$1;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(VCardItem, { class: "justify-center text-center mb-2" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Logo, {
              width: "165",
              class: "mx-auto"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardTitle, { class: "text-black text-h5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Olvidaste tu contrase\xF1a?`);
                } else {
                  return [
                    createTextVNode("Olvidaste tu contrase\xF1a?")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardSubtitle, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`No te preocupes, te enviaremos instrucciones para restablecerla`);
                } else {
                  return [
                    createTextVNode("No te preocupes, te enviaremos instrucciones para restablecerla")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Logo, {
                width: "165",
                class: "mx-auto"
              }),
              createVNode(VCardTitle, { class: "text-black text-h5" }, {
                default: withCtx(() => [
                  createTextVNode("Olvidaste tu contrase\xF1a?")
                ]),
                _: 1
              }),
              createVNode(VCardSubtitle, null, {
                default: withCtx(() => [
                  createTextVNode("No te preocupes, te enviaremos instrucciones para restablecerla")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCardText, { class: "d-flex flex-column" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="mb-4"${_scopeId}><label for="correo" class="input-label"${_scopeId}>Tel\xE9fono o Correo electr\xF3nico *</label>`);
            _push2(ssrRenderComponent(VTextField, {
              tabindex: "2",
              class: "fz-auth-form__input username",
              modelValue: unref(username),
              "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
              placeholder: "tucorreo@futzo.io/+52 999 999 9999",
              density: "compact"
            }, createSlots({ _: 2 }, [
              unref(isPhoneNumber) ? {
                name: "prepend",
                fn: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_transition_slide, {
                      duration: 400,
                      offset: [-24, 0]
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a3, _b3;
                        var _a2, _b2;
                        if (_push4) {
                          if (((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1) {
                            _push4(ssrRenderComponent(_sfc_main$a, { onUpdateAreaCode: areaCodeHandler }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            ((_b3 = (_b2 = unref(username)) == null ? void 0 : _b2.length) != null ? _b3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$a, {
                              key: 0,
                              onUpdateAreaCode: areaCodeHandler
                            })) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_transition_slide, {
                        duration: 400,
                        offset: [-24, 0]
                      }, {
                        default: withCtx(() => {
                          var _a3;
                          var _a2;
                          return [
                            ((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$a, {
                              key: 0,
                              onUpdateAreaCode: areaCodeHandler
                            })) : createCommentVNode("", true)
                          ];
                        }),
                        _: 1
                      })
                    ];
                  }
                }),
                key: "0"
              } : void 0
            ]), _parent2, _scopeId));
            _push2(`</div><div${ssrRenderAttrs(mergeProps({ class: "pl-2 mt-1" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })))}${_scopeId}>`);
            if ((_a = unref(errors)) == null ? void 0 : _a.username) {
              _push2(`<small class="d-block text-error"${_scopeId}>${ssrInterpolate((_b = unref(errors)) == null ? void 0 : _b.username)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(VBtn, {
              block: "",
              disabled: !unref(isValid) || unref(forgotPasswordState).isFetching,
              loading: unref(forgotPasswordState).isFetching,
              onClick: unref(resetHandler)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Restablecer contrase\xF1a`);
                } else {
                  return [
                    createTextVNode("Restablecer contrase\xF1a")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VBtn, {
              class: "my-2",
              variant: "text",
              color: "secondary",
              "prepend-icon": "mdi-arrow-left",
              onClick: ($event) => emits("backToLogin")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Regresar al login.`);
                } else {
                  return [
                    createTextVNode("Regresar al login.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "mb-4" }, [
                createVNode("label", {
                  for: "correo",
                  class: "input-label"
                }, "Tel\xE9fono o Correo electr\xF3nico *"),
                createVNode(VTextField, {
                  tabindex: "2",
                  class: "fz-auth-form__input username",
                  modelValue: unref(username),
                  "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                  placeholder: "tucorreo@futzo.io/+52 999 999 9999",
                  density: "compact"
                }, createSlots({ _: 2 }, [
                  unref(isPhoneNumber) ? {
                    name: "prepend",
                    fn: withCtx(() => [
                      createVNode(_component_transition_slide, {
                        duration: 400,
                        offset: [-24, 0]
                      }, {
                        default: withCtx(() => {
                          var _a3;
                          var _a2;
                          return [
                            ((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$a, {
                              key: 0,
                              onUpdateAreaCode: areaCodeHandler
                            })) : createCommentVNode("", true)
                          ];
                        }),
                        _: 1
                      })
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["modelValue", "onUpdate:modelValue"])
              ]),
              withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                ((_c = unref(errors)) == null ? void 0 : _c.username) ? (openBlock(), createBlock("small", {
                  key: 0,
                  class: "d-block text-error"
                }, toDisplayString((_d = unref(errors)) == null ? void 0 : _d.username), 1)) : createCommentVNode("", true)
              ])), [
                [_directive_auto_animate, { duration: 100 }]
              ]),
              createVNode(VBtn, {
                block: "",
                disabled: !unref(isValid) || unref(forgotPasswordState).isFetching,
                loading: unref(forgotPasswordState).isFetching,
                onClick: unref(resetHandler)
              }, {
                default: withCtx(() => [
                  createTextVNode("Restablecer contrase\xF1a")
                ]),
                _: 1
              }, 8, ["disabled", "loading", "onClick"]),
              createVNode(VBtn, {
                class: "my-2",
                variant: "text",
                color: "secondary",
                "prepend-icon": "mdi-arrow-left",
                onClick: ($event) => emits("backToLogin")
              }, {
                default: withCtx(() => [
                  createTextVNode("Regresar al login.")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/components/ForgotPasswordCard.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "OtpCad",
  __ssrInlineRender: true,
  setup(__props) {
    const { forgotPasswordState } = storeToRefs(useAuthStore());
    const counter = ref(60);
    ref();
    const subtitle = computed(() => {
      return forgotPasswordState.value.isPhone ? `Enviamos un c\xF3digo via <br/> <b>Whatsapp</b> al n\xFAmero: ${forgotPasswordState.value.areaCode}${forgotPasswordState.value.username}` : `Enviamos un c\xF3digo via Correo electr\xF3nico ${forgotPasswordState.value.username}`;
    });
    const verifyCode = () => {
      forgotPasswordState.value.isFetching = true;
      const client = useSanctumClient();
      client("/verify-reset-token", {
        method: "POST",
        body: {
          token: forgotPasswordState.value.code,
          phone: `${forgotPasswordState.value.areaCode}${forgotPasswordState.value.username}`
        }
      }).then((response) => {
        console.log(response);
        if (response.code === 200) {
          forgotPasswordState.value.step = "confirm-password";
        }
      }).catch((error) => {
        var _a2;
        var _a;
        useToast().toast(
          "error",
          "Error",
          (_a2 = (_a = error == null ? void 0 : error.data) == null ? void 0 : _a.message) != null ? _a2 : "El c\xF3digo de verificaci\xF3n no es v\xE1lido"
        );
      }).finally(() => forgotPasswordState.value.isFetching = false);
    };
    const resendCode = () => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(VCardItem, { class: "d-flex justify-center align-center" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardTitle, { class: "d-flex justify-center align-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="icon-container"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "futzo-icon:inbox-02",
                    class: "mx-auto envelop-icon",
                    size: "32"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "icon-container" }, [
                      createVNode(_component_Icon, {
                        name: "futzo-icon:inbox-02",
                        class: "mx-auto envelop-icon",
                        size: "32"
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardTitle, { class: "text-center verify-card-title" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Restablecer contrase\xF1a `);
                } else {
                  return [
                    createTextVNode(" Restablecer contrase\xF1a ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardSubtitle, { class: "text-center verify-card-subtitle" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardTitle, { class: "d-flex justify-center align-center" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "icon-container" }, [
                    createVNode(_component_Icon, {
                      name: "futzo-icon:inbox-02",
                      class: "mx-auto envelop-icon",
                      size: "32"
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(VCardTitle, { class: "text-center verify-card-title" }, {
                default: withCtx(() => [
                  createTextVNode(" Restablecer contrase\xF1a ")
                ]),
                _: 1
              }),
              createVNode(VCardSubtitle, {
                class: "text-center verify-card-subtitle",
                innerHTML: unref(subtitle)
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCardText, { class: "d-flex flex-column" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VOtpInput, {
              modelValue: unref(forgotPasswordState).code,
              "onUpdate:modelValue": ($event) => unref(forgotPasswordState).code = $event,
              placeholder: "0",
              length: "4",
              width: "356px",
              "min-height": "80px"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VBtn, {
              block: "",
              disabled: unref(forgotPasswordState).code.length < 4 || unref(forgotPasswordState).isFetching,
              onClick: verifyCode,
              loading: unref(forgotPasswordState).isFetching
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(forgotPasswordState).isPhone ? "Verificar" : "Ingresa tu c\xF3digo")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(forgotPasswordState).isPhone ? "Verificar" : "Ingresa tu c\xF3digo"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="verify-card-options-container d-flex justify-space-between align-center"${_scopeId}><span class="verify-card-didnt-get-email"${_scopeId}>\xBFNo recibiste el mensaje?</span><div class="d-flex align-center"${_scopeId}>`);
            _push2(ssrRenderComponent(VBtn, {
              disabled: !!unref(counter),
              variant: "text",
              class: "mx-0 px-0",
              onClick: resendCode
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Reenviar`);
                } else {
                  return [
                    createTextVNode("Reenviar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span class="ml-1 counter-container"${_scopeId}>${ssrInterpolate(unref(counter))}</span></div></div><div class="d-flex justify-center align-center my-5 cursor-pointer"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "futzo-icon:arrow-left",
              class: "arrow-left mx-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VBtn, {
              class: "my-2",
              variant: "text",
              color: "secondary",
              "prepend-icon": "mdi-arrow-left",
              onClick: ($event) => _ctx.$router.go(0)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Regresar al login.`);
                } else {
                  return [
                    createTextVNode("Regresar al login.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(VOtpInput, {
                modelValue: unref(forgotPasswordState).code,
                "onUpdate:modelValue": ($event) => unref(forgotPasswordState).code = $event,
                placeholder: "0",
                length: "4",
                width: "356px",
                "min-height": "80px"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VBtn, {
                block: "",
                disabled: unref(forgotPasswordState).code.length < 4 || unref(forgotPasswordState).isFetching,
                onClick: verifyCode,
                loading: unref(forgotPasswordState).isFetching
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(forgotPasswordState).isPhone ? "Verificar" : "Ingresa tu c\xF3digo"), 1)
                ]),
                _: 1
              }, 8, ["disabled", "loading"]),
              createVNode("div", { class: "verify-card-options-container d-flex justify-space-between align-center" }, [
                createVNode("span", { class: "verify-card-didnt-get-email" }, "\xBFNo recibiste el mensaje?"),
                createVNode("div", { class: "d-flex align-center" }, [
                  createVNode(VBtn, {
                    disabled: !!unref(counter),
                    variant: "text",
                    class: "mx-0 px-0",
                    onClick: resendCode
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Reenviar")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode("span", { class: "ml-1 counter-container" }, toDisplayString(unref(counter)), 1)
                ])
              ]),
              createVNode("div", {
                class: "d-flex justify-center align-center my-5 cursor-pointer",
                onClick: ($event) => _ctx.$router.push("/login")
              }, [
                createVNode(_component_Icon, {
                  name: "futzo-icon:arrow-left",
                  class: "arrow-left mx-1"
                }),
                createVNode(VBtn, {
                  class: "my-2",
                  variant: "text",
                  color: "secondary",
                  "prepend-icon": "mdi-arrow-left",
                  onClick: ($event) => _ctx.$router.go(0)
                }, {
                  default: withCtx(() => [
                    createTextVNode("Regresar al login.")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ], 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/components/OtpCad.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "EmailSend",
  __ssrInlineRender: true,
  setup(__props) {
    const { forgotPasswordState } = storeToRefs(useAuthStore());
    const counter = ref(60);
    const counterId = ref();
    const resendCode = () => {
      forgotPasswordState.value.isFetching = true;
      const client = useSanctumClient();
      client("/forgot-password", {
        method: "POST",
        body: {
          [forgotPasswordState.value.isPhone ? "phone" : "email"]: forgotPasswordState.value.isPhone ? `${forgotPasswordState.value.areaCode}${forgotPasswordState.value.username}` : forgotPasswordState.value.username
        }
      }).then((response) => {
        if (response.code === 200) {
          useToast().toast(
            "success",
            "\xC9xito",
            forgotPasswordState.value.isPhone ? "C\xF3digo reenviado correctamente" : "Correo reenviado correctamente"
          );
          counter.value = 60;
          initCounter();
        }
      }).catch((error) => {
        var _a2;
        var _a;
        useToast().toast(
          "error",
          "Error",
          (_a2 = (_a = error == null ? void 0 : error.data) == null ? void 0 : _a.message) != null ? _a2 : "El correo o n\xFAmero de tel\xE9fono no es v\xE1lido"
        );
      }).finally(() => forgotPasswordState.value.isFetching = false);
    };
    const initCounter = () => {
      counterId.value = setInterval();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(VCardItem, { class: "d-flex justify-center align-center" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardTitle, { class: "d-flex justify-center align-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="icon-container"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "futzo-icon:inbox-02",
                    class: "mx-auto envelop-icon",
                    size: "32"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "icon-container" }, [
                      createVNode(_component_Icon, {
                        name: "futzo-icon:inbox-02",
                        class: "mx-auto envelop-icon",
                        size: "32"
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardTitle, { class: "text-center verify-card-title" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` \xA1Recordatorio de contrase\xF1a enviado! `);
                } else {
                  return [
                    createTextVNode(" \xA1Recordatorio de contrase\xF1a enviado! ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardSubtitle, { class: "text-center verify-card-subtitle" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Revisa tu bandeja de entrada y sigue <br${_scopeId2}> las instrucciones para restablecer tu contrase\xF1a `);
                } else {
                  return [
                    createTextVNode(" Revisa tu bandeja de entrada y sigue "),
                    createVNode("br"),
                    createTextVNode(" las instrucciones para restablecer tu contrase\xF1a ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardTitle, { class: "d-flex justify-center align-center" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "icon-container" }, [
                    createVNode(_component_Icon, {
                      name: "futzo-icon:inbox-02",
                      class: "mx-auto envelop-icon",
                      size: "32"
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(VCardTitle, { class: "text-center verify-card-title" }, {
                default: withCtx(() => [
                  createTextVNode(" \xA1Recordatorio de contrase\xF1a enviado! ")
                ]),
                _: 1
              }),
              createVNode(VCardSubtitle, { class: "text-center verify-card-subtitle" }, {
                default: withCtx(() => [
                  createTextVNode(" Revisa tu bandeja de entrada y sigue "),
                  createVNode("br"),
                  createTextVNode(" las instrucciones para restablecer tu contrase\xF1a ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCardText, { class: "d-flex flex-column" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="verify-card-options-container d-flex justify-center align-center flex-column"${_scopeId}><span class="verify-card-didnt-get-email mb-4"${_scopeId}>\xBFNo recibiste el correo?</span><div class="d-flex align-center"${_scopeId}>`);
            _push2(ssrRenderComponent(VBadge, {
              content: unref(counter),
              location: "bottom right",
              "offset-x": -4
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    block: "",
                    disabled: !!unref(counter) || unref(forgotPasswordState).isFetching,
                    loading: unref(forgotPasswordState).isFetching,
                    onClick: resendCode
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Reenviar`);
                      } else {
                        return [
                          createTextVNode("Reenviar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      block: "",
                      disabled: !!unref(counter) || unref(forgotPasswordState).isFetching,
                      loading: unref(forgotPasswordState).isFetching,
                      onClick: resendCode
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Reenviar")
                      ]),
                      _: 1
                    }, 8, ["disabled", "loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="d-flex justify-center align-center my-5 cursor-pointer"${_scopeId}>`);
            _push2(ssrRenderComponent(VBtn, {
              class: "my-2",
              variant: "text",
              color: "secondary",
              "prepend-icon": "mdi-arrow-left",
              onClick: ($event) => _ctx.$router.go(0)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Regresar al login.`);
                } else {
                  return [
                    createTextVNode("Regresar al login.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "verify-card-options-container d-flex justify-center align-center flex-column" }, [
                createVNode("span", { class: "verify-card-didnt-get-email mb-4" }, "\xBFNo recibiste el correo?"),
                createVNode("div", { class: "d-flex align-center" }, [
                  createVNode(VBadge, {
                    content: unref(counter),
                    location: "bottom right",
                    "offset-x": -4
                  }, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        block: "",
                        disabled: !!unref(counter) || unref(forgotPasswordState).isFetching,
                        loading: unref(forgotPasswordState).isFetching,
                        onClick: resendCode
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Reenviar")
                        ]),
                        _: 1
                      }, 8, ["disabled", "loading"])
                    ]),
                    _: 1
                  }, 8, ["content"])
                ])
              ]),
              createVNode("div", {
                class: "d-flex justify-center align-center my-5 cursor-pointer",
                onClick: ($event) => _ctx.$router.push("/login")
              }, [
                createVNode(VBtn, {
                  class: "my-2",
                  variant: "text",
                  color: "secondary",
                  "prepend-icon": "mdi-arrow-left",
                  onClick: ($event) => _ctx.$router.go(0)
                }, {
                  default: withCtx(() => [
                    createTextVNode("Regresar al login.")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ], 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/components/EmailSend.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ResetPasswordCard",
  __ssrInlineRender: true,
  emits: ["backToLogin"],
  setup(__props, { emit: __emit }) {
    const authStore = useAuthStore();
    const { forgotPasswordState } = storeToRefs(authStore);
    const { handleSubmit, defineField, errors, meta } = useForm({
      validationSchema: toTypedSchema(
        object({
          password: string().required("La contrase\xF1a es obligatoria").min(8, "La contrase\xF1a debe tener al menos 8 caracteres").matches(specialCharacters, "La contrase\xF1a debe contener al menos un car\xE1cter especial")
        })
      )
    });
    const [password] = reactive(defineField("password"));
    const showPassword = ref(false);
    const resetPasswordHandler = handleSubmit((values) => {
      forgotPasswordState.value.isFetching = true;
      const client = useSanctumClient();
      client("/reset-password", {
        method: "POST",
        body: {
          password: values.password,
          token: forgotPasswordState.value.isPhone ? forgotPasswordState.value.code : forgotPasswordState.value.token,
          [forgotPasswordState.value.isPhone ? "phone" : "email"]: forgotPasswordState.value.isPhone ? `${forgotPasswordState.value.areaCode}${forgotPasswordState.value.username}` : forgotPasswordState.value.username
        }
      }).then((response) => {
        if (response.code === 200) {
          useToast().toast(
            "success",
            "\xC9xito",
            "Contrase\xF1a restablecida correctamente"
          );
          authStore.resetForgotPasswordState();
          useRouter$1().push({
            name: "login"
          });
          emits("backToLogin");
        }
      }).catch((error) => {
        var _a2;
        var _a;
        useToast().toast(
          "error",
          "Error",
          (_a2 = (_a = error == null ? void 0 : error.data) == null ? void 0 : _a.message) != null ? _a2 : "Error al restablecer la contrase\xF1a"
        );
      }).finally(() => forgotPasswordState.value.isFetching = false);
    });
    const emits = __emit;
    const backToLogin = () => {
      emits("backToLogin");
      forgotPasswordState.value.step = "reset-password";
    };
    const disabled = computed(() => {
      console.log(forgotPasswordState.value.isFetching, forgotPasswordState.value.code.length, forgotPasswordState.value.isPhone);
      return forgotPasswordState.value.isFetching || !meta.value.valid || forgotPasswordState.value.isPhone && forgotPasswordState.value.code.length < 4;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$2;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(VCardItem, { class: "d-flex justify-center align-center" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardTitle, { class: "d-flex justify-center align-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="icon-container"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "mdi-password-outline",
                    class: "mx-auto envelop-icon",
                    size: "32"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "icon-container" }, [
                      createVNode(_component_Icon, {
                        name: "mdi-password-outline",
                        class: "mx-auto envelop-icon",
                        size: "32"
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardTitle, { class: "text-center verify-card-title" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Configura tu nueva contrase\xF1a `);
                } else {
                  return [
                    createTextVNode(" Configura tu nueva contrase\xF1a ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardTitle, { class: "d-flex justify-center align-center" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "icon-container" }, [
                    createVNode(_component_Icon, {
                      name: "mdi-password-outline",
                      class: "mx-auto envelop-icon",
                      size: "32"
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(VCardTitle, { class: "text-center verify-card-title" }, {
                default: withCtx(() => [
                  createTextVNode(" Configura tu nueva contrase\xF1a ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCardText, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-100 mx-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              class: "pb-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  _push3(`<label for="password" class="input-label"${_scopeId2}>Contrase\xF1a*</label>`);
                  _push3(ssrRenderComponent(VTextField, {
                    tabindex: "3",
                    class: "fz-auth-form__input",
                    density: "compact",
                    placeholder: "Crea una contrase\xF1a",
                    modelValue: unref(password),
                    "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                    type: unref(showPassword) ? "text" : "password",
                    "append-inner-icon": unref(showPassword) ? "mdi-eye-off-outline" : "mdi-eye-outline",
                    "onClick:appendInner": ($event) => showPassword.value = !unref(showPassword)
                  }, null, _parent3, _scopeId2));
                  _push3(`<div${ssrRenderAttrs(mergeProps({ class: "pl-2 mt-1" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })))}${_scopeId2}>`);
                  if ((_a = unref(errors)) == null ? void 0 : _a.password) {
                    _push3(`<small class="d-block text-error"${_scopeId2}>${ssrInterpolate((_b = unref(errors)) == null ? void 0 : _b.password)}</small>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("label", {
                      for: "password",
                      class: "input-label"
                    }, "Contrase\xF1a*"),
                    createVNode(VTextField, {
                      tabindex: "3",
                      class: "fz-auth-form__input",
                      density: "compact",
                      placeholder: "Crea una contrase\xF1a",
                      modelValue: unref(password),
                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                      type: unref(showPassword) ? "text" : "password",
                      "append-inner-icon": unref(showPassword) ? "mdi-eye-off-outline" : "mdi-eye-outline",
                      "onClick:appendInner": ($event) => showPassword.value = !unref(showPassword)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                    withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                      ((_c = unref(errors)) == null ? void 0 : _c.password) ? (openBlock(), createBlock("small", {
                        key: 0,
                        class: "d-block text-error"
                      }, toDisplayString((_d = unref(errors)) == null ? void 0 : _d.password), 1)) : createCommentVNode("", true)
                    ])), [
                      [_directive_auto_animate, { duration: 100 }]
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VBtn, {
              class: "my-5",
              disabled: unref(disabled),
              block: "",
              onClick: unref(resetPasswordHandler),
              loading: unref(forgotPasswordState).isFetching
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Restablecer contrase\xF1a `);
                } else {
                  return [
                    createTextVNode("Restablecer contrase\xF1a ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VBtn, {
              block: "",
              variant: "text",
              color: "secondary",
              "prepend-icon": "mdi-arrow-left",
              onClick: backToLogin
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Regresar al login.`);
                } else {
                  return [
                    createTextVNode("Regresar al login.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "w-100 mx-auto" }, [
                createVNode(VCol, {
                  cols: "12",
                  class: "pb-0"
                }, {
                  default: withCtx(() => {
                    var _a, _b;
                    return [
                      createVNode("label", {
                        for: "password",
                        class: "input-label"
                      }, "Contrase\xF1a*"),
                      createVNode(VTextField, {
                        tabindex: "3",
                        class: "fz-auth-form__input",
                        density: "compact",
                        placeholder: "Crea una contrase\xF1a",
                        modelValue: unref(password),
                        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                        type: unref(showPassword) ? "text" : "password",
                        "append-inner-icon": unref(showPassword) ? "mdi-eye-off-outline" : "mdi-eye-outline",
                        "onClick:appendInner": ($event) => showPassword.value = !unref(showPassword)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                      withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                        ((_a = unref(errors)) == null ? void 0 : _a.password) ? (openBlock(), createBlock("small", {
                          key: 0,
                          class: "d-block text-error"
                        }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.password), 1)) : createCommentVNode("", true)
                      ])), [
                        [_directive_auto_animate, { duration: 100 }]
                      ])
                    ];
                  }),
                  _: 1
                }),
                createVNode(VBtn, {
                  class: "my-5",
                  disabled: unref(disabled),
                  block: "",
                  onClick: unref(resetPasswordHandler),
                  loading: unref(forgotPasswordState).isFetching
                }, {
                  default: withCtx(() => [
                    createTextVNode("Restablecer contrase\xF1a ")
                  ]),
                  _: 1
                }, 8, ["disabled", "onClick", "loading"]),
                createVNode(VBtn, {
                  block: "",
                  variant: "text",
                  color: "secondary",
                  "prepend-icon": "mdi-arrow-left",
                  onClick: backToLogin
                }, {
                  default: withCtx(() => [
                    createTextVNode("Regresar al login.")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/components/ResetPasswordCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    showForgotPassword: {
      type: Boolean,
      default: false
    }
  },
  emits: ["backToLogin"],
  setup(__props, { emit: __emit }) {
    const { forgotPasswordState } = storeToRefs(useAuthStore());
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_transition_expand = __nuxt_component_0;
      if (__props.showForgotPassword) {
        _push(ssrRenderComponent(VCard, mergeProps({
          class: "pa-2",
          "max-width": "100%",
          "min-width": "500",
          elevation: "0",
          color: "background"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_transition_expand, {
                offset: [100, 200],
                mode: "out-in"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(forgotPasswordState).step === "reset-password") {
                      _push3(ssrRenderComponent(_sfc_main$6, {
                        onBackToLogin: ($event) => emits("backToLogin")
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(forgotPasswordState).step === "verify-code") {
                      _push3(ssrRenderComponent(_sfc_main$5, null, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(forgotPasswordState).step === "email-sent") {
                      _push3(ssrRenderComponent(_sfc_main$4, null, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(forgotPasswordState).step === "confirm-password") {
                      _push3(ssrRenderComponent(_sfc_main$3, {
                        onBackToLogin: ($event) => emits("backToLogin")
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      unref(forgotPasswordState).step === "reset-password" ? (openBlock(), createBlock(_sfc_main$6, {
                        key: 0,
                        onBackToLogin: ($event) => emits("backToLogin")
                      }, null, 8, ["onBackToLogin"])) : createCommentVNode("", true),
                      unref(forgotPasswordState).step === "verify-code" ? (openBlock(), createBlock(_sfc_main$5, { key: 1 })) : createCommentVNode("", true),
                      unref(forgotPasswordState).step === "email-sent" ? (openBlock(), createBlock(_sfc_main$4, { key: 2 })) : createCommentVNode("", true),
                      unref(forgotPasswordState).step === "confirm-password" ? (openBlock(), createBlock(_sfc_main$3, {
                        key: 3,
                        onBackToLogin: ($event) => emits("backToLogin")
                      }, null, 8, ["onBackToLogin"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="forgot-password-steps-container"${_scopeId}><span class="${ssrRenderClass([unref(forgotPasswordState).step === "reset-password" ? "bg-primary" : "", "step"])}"${_scopeId}></span><span class="${ssrRenderClass([unref(forgotPasswordState).step === "verify-code" ? "bg-primary" : "", "step"])}"${_scopeId}></span><span class="${ssrRenderClass([[unref(forgotPasswordState).step === "confirm-password" ? "bg-primary" : "", unref(forgotPasswordState).step === "email-sent" ? "bg-primary" : ""], "step"])}"${_scopeId}></span></div>`);
            } else {
              return [
                createVNode(_component_transition_expand, {
                  offset: [100, 200],
                  mode: "out-in"
                }, {
                  default: withCtx(() => [
                    unref(forgotPasswordState).step === "reset-password" ? (openBlock(), createBlock(_sfc_main$6, {
                      key: 0,
                      onBackToLogin: ($event) => emits("backToLogin")
                    }, null, 8, ["onBackToLogin"])) : createCommentVNode("", true),
                    unref(forgotPasswordState).step === "verify-code" ? (openBlock(), createBlock(_sfc_main$5, { key: 1 })) : createCommentVNode("", true),
                    unref(forgotPasswordState).step === "email-sent" ? (openBlock(), createBlock(_sfc_main$4, { key: 2 })) : createCommentVNode("", true),
                    unref(forgotPasswordState).step === "confirm-password" ? (openBlock(), createBlock(_sfc_main$3, {
                      key: 3,
                      onBackToLogin: ($event) => emits("backToLogin")
                    }, null, 8, ["onBackToLogin"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "forgot-password-steps-container" }, [
                  createVNode("span", {
                    class: ["step", unref(forgotPasswordState).step === "reset-password" ? "bg-primary" : ""]
                  }, null, 2),
                  createVNode("span", {
                    class: ["step", unref(forgotPasswordState).step === "verify-code" ? "bg-primary" : ""]
                  }, null, 2),
                  createVNode("span", {
                    class: ["step", [unref(forgotPasswordState).step === "confirm-password" ? "bg-primary" : "", unref(forgotPasswordState).step === "email-sent" ? "bg-primary" : ""]]
                  }, null, 2)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/ForgotPassword.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
function useAuth() {
  const isPhone = ref(false);
  const { handleSubmit, defineField, errors, meta, resetForm } = useForm({
    validationSchema: toTypedSchema(
      object({
        isSignUp: boolean().nullable().default(true),
        remember: boolean().nullable(),
        name: string().nullable().when("isSignUp", {
          is: true,
          then: (schema) => schema.required("El nombre es obligatorio"),
          otherwise: (schema) => schema.nullable()
        }),
        inputType: string().nullable(),
        password: string().required("La contrase\xF1a es obligatoria").min(8, "La contrase\xF1a debe tener al menos 8 caracteres").matches(
          specialCharacters,
          "La contrase\xF1a debe contener al menos un car\xE1cter especial"
        ),
        username: string().required("El correo o n\xFAmero tel\xE9fono  es obligatorio").test(
          "is-valid-username",
          "El campo debe ser un n\xFAmero de tel\xE9fono o un correo electr\xF3nico v\xE1lido",
          (value, context) => {
            const isEmail = string().email().isValidSync(value);
            isPhone.value = phoneRegex.test(value);
            context.parent.inputType = isPhone.value ? "phone" : isEmail ? "email" : null;
            return isEmail || isPhone.value;
          }
        )
      })
    )
  });
  const [name] = reactive(defineField("name"));
  const [password] = reactive(defineField("password"));
  const [username] = reactive(defineField("username"));
  const [remember] = reactive(defineField("remember"));
  const [isSignUp] = reactive(defineField("isSignUp"));
  const showRegisterForm = ref(true);
  const isLoading = ref(false);
  const errorMessage = ref("");
  const areaCode = ref("+52");
  async function signIn(form) {
    errorMessage.value = "";
    const { login } = useSanctumAuth();
    await login({ ...form }).then(async () => {
      await useLocationStore().reloadLocations();
    }).catch((error) => {
      const { message } = useApiError(error);
      errorMessage.value = message;
    });
  }
  async function signUp(form) {
    const client = useSanctumClient();
    return await client("/auth/register", {
      method: "POST",
      body: JSON.stringify(form)
    });
  }
  function signUpHandler(form) {
    errorMessage.value = "";
    isLoading.value = true;
    signUp(form).then(async () => {
      useToast().toast(
        "info",
        "Verificaci\xF3n de Cuenta",
        "Por favor, revisa tu correo y sigue las instrucciones para completar la verificaci\xF3n de tu cuenta."
      );
      const url = isPhone.value ? `/verificar?phone=${encodeURIComponent(`${areaCode.value}${username.value}`)}` : `/verificar?email=${username.value}`;
      await useRouter$1().push(url);
      showRegisterForm.value = false;
    }).catch((error) => {
      let { message } = useApiError(error);
      if (message.startsWith("Error:")) {
        message = message.replace("Error:", "");
      }
      errorMessage.value = message;
    }).finally(() => {
      isLoading.value = false;
    });
  }
  const onSuccess = (values) => {
    let form = {
      [isPhone.value ? "phone" : "email"]: `${isPhone.value ? areaCode.value : ""}${values.username}`,
      password: values.password
    };
    if (values == null ? void 0 : values.isSignUp) {
      form.name = values.name;
      signUpHandler(form);
    } else {
      (async () => await signIn(form))();
    }
  };
  const onInvalidSubmit = (values) => {
    console.log(values);
  };
  const submitHandler = handleSubmit(onSuccess, onInvalidSubmit);
  const showRegisterFormHandler = () => {
    errorMessage.value = "";
    isSignUp.value = !isSignUp.value;
    showRegisterForm.value = !showRegisterForm.value;
  };
  return {
    isLoading,
    showRegisterForm,
    errorMessage,
    name,
    password,
    username,
    remember,
    errors,
    meta,
    areaCode,
    isSignUp,
    showRegisterFormHandler,
    submitHandler,
    resetForm
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuthForm",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      name,
      password,
      username,
      isLoading,
      remember,
      errors,
      meta,
      errorMessage,
      showRegisterForm,
      areaCode,
      isSignUp,
      resetForm,
      showRegisterFormHandler,
      submitHandler
    } = useAuth();
    const { forgotPasswordState } = storeToRefs(useAuthStore());
    const showPassword = ref(false);
    const title = computed(
      () => showRegisterForm.value ? "Crea tu cuenta" : "Iniciar sesi\xF3n"
    );
    const isPhoneNumber = computed(() => {
      var _a2;
      var _a;
      return ((_a2 = (_a = username.value) == null ? void 0 : _a.length) != null ? _a2 : 0) > 0 && /^\d/.test(username.value);
    });
    const areaCodeHandler = (code) => {
      areaCode.value = code;
    };
    const terms = ref(false);
    const isDisabled = computed(() => {
      if (isSignUp.value) {
        return isLoading.value || !meta.value.valid || !terms.value;
      } else {
        return isLoading.value || !meta.value.valid;
      }
    });
    const showForgotPassword = ref(false);
    const stepActive = ref(1);
    const returnBackClickHandler = () => {
      showForgotPassword.value = false;
      stepActive.value = 1;
      username.value = "";
      resetForm();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_transition_slide = __nuxt_component_0$1;
      const _component_Logo = _sfc_main$c;
      const _component_Icon = __nuxt_component_0$2;
      const _component_client_only = __nuxt_component_0$1$1;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(ssrRenderComponent(_component_transition_slide, mergeProps({
        offset: [-16, 0],
        mode: "out-in"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!showForgotPassword.value) {
              _push2(ssrRenderComponent(VCard, {
                class: "pa-2 pb-5 futzo-rounded",
                "max-width": "448",
                "min-height": "80%",
                elevation: "0",
                color: "on-background"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCardItem, { class: "justify-center text-center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Logo, {
                            width: "165",
                            class: "mx-auto"
                          }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VCardTitle, { class: "text-black text-h4" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unref(title))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(title)), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VCardSubtitle, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Administra torneos y ligas f\xE1cilmente.`);
                              } else {
                                return [
                                  createTextVNode("Administra torneos y ligas f\xE1cilmente.")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Logo, {
                              width: "165",
                              class: "mx-auto"
                            }),
                            createVNode(VCardTitle, { class: "text-black text-h4" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(title)), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(VCardSubtitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Administra torneos y ligas f\xE1cilmente.")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCardText, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VForm, {
                            onSubmit: unref(submitHandler),
                            class: "px-4"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VRow, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        class: "text-center mt-8 pb-0"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_sfc_main$b, null, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_sfc_main$b)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        class: "d-flex align-center"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VDivider, null, null, _parent7, _scopeId6));
                                            _push7(`<span class="mx-4 separator-text"${_scopeId6}>o</span>`);
                                            _push7(ssrRenderComponent(VDivider, null, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VDivider),
                                              createVNode("span", { class: "mx-4 separator-text" }, "o"),
                                              createVNode(VDivider)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VExpandTransition, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            if (unref(showRegisterForm)) {
                                              _push7(ssrRenderComponent(VCol, {
                                                key: "name",
                                                cols: "12",
                                                class: "pb-0"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  var _a, _b, _c, _d;
                                                  if (_push8) {
                                                    _push8(`<label for="nombre" class="input-label"${_scopeId7}>Nombre*</label>`);
                                                    _push8(ssrRenderComponent(VTextField, {
                                                      tabindex: "1",
                                                      class: "fz-auth-form__input",
                                                      modelValue: unref(name),
                                                      "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                                                      placeholder: "Escribe tu nombre",
                                                      density: "compact"
                                                    }, null, _parent8, _scopeId7));
                                                    _push8(`<div${ssrRenderAttrs(mergeProps({ class: "pl-2 mt-1" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })))}${_scopeId7}>`);
                                                    if ((_a = unref(errors)) == null ? void 0 : _a.name) {
                                                      _push8(`<small class="d-block text-error"${_scopeId7}>${ssrInterpolate((_b = unref(errors)) == null ? void 0 : _b.name)}</small>`);
                                                    } else {
                                                      _push8(`<!---->`);
                                                    }
                                                    _push8(`</div>`);
                                                  } else {
                                                    return [
                                                      createVNode("label", {
                                                        for: "nombre",
                                                        class: "input-label"
                                                      }, "Nombre*"),
                                                      createVNode(VTextField, {
                                                        tabindex: "1",
                                                        class: "fz-auth-form__input",
                                                        modelValue: unref(name),
                                                        "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                                                        placeholder: "Escribe tu nombre",
                                                        density: "compact"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                      withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                                        ((_c = unref(errors)) == null ? void 0 : _c.name) ? (openBlock(), createBlock("small", {
                                                          key: 0,
                                                          class: "d-block text-error"
                                                        }, toDisplayString((_d = unref(errors)) == null ? void 0 : _d.name), 1)) : createCommentVNode("", true)
                                                      ])), [
                                                        [_directive_auto_animate, { duration: 100 }]
                                                      ])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                          } else {
                                            return [
                                              unref(showRegisterForm) ? (openBlock(), createBlock(VCol, {
                                                key: "name",
                                                cols: "12",
                                                class: "pb-0"
                                              }, {
                                                default: withCtx(() => {
                                                  var _a, _b;
                                                  return [
                                                    createVNode("label", {
                                                      for: "nombre",
                                                      class: "input-label"
                                                    }, "Nombre*"),
                                                    createVNode(VTextField, {
                                                      tabindex: "1",
                                                      class: "fz-auth-form__input",
                                                      modelValue: unref(name),
                                                      "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                                                      placeholder: "Escribe tu nombre",
                                                      density: "compact"
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                    withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                                      ((_a = unref(errors)) == null ? void 0 : _a.name) ? (openBlock(), createBlock("small", {
                                                        key: 0,
                                                        class: "d-block text-error"
                                                      }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.name), 1)) : createCommentVNode("", true)
                                                    ])), [
                                                      [_directive_auto_animate, { duration: 100 }]
                                                    ])
                                                  ];
                                                }),
                                                _: 1
                                              })) : createCommentVNode("", true)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        class: "pb-0"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          var _a, _b, _c, _d;
                                          if (_push7) {
                                            _push7(`<label for="correo" class="input-label"${_scopeId6}>Tel\xE9fono o Correo electr\xF3nico *</label>`);
                                            _push7(ssrRenderComponent(VTextField, {
                                              tabindex: "2",
                                              class: "fz-auth-form__input username",
                                              modelValue: unref(username),
                                              "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                                              placeholder: "tucorreo@futzo.io/+52 999 999 9999",
                                              density: "compact"
                                            }, createSlots({ _: 2 }, [
                                              unref(isPhoneNumber) ? {
                                                name: "prepend",
                                                fn: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_transition_slide, {
                                                      duration: 400,
                                                      offset: [-24, 0]
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        var _a3, _b3;
                                                        var _a2, _b2;
                                                        if (_push9) {
                                                          if (((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1) {
                                                            _push9(ssrRenderComponent(_sfc_main$a, { onUpdateAreaCode: areaCodeHandler }, null, _parent9, _scopeId8));
                                                          } else {
                                                            _push9(`<!---->`);
                                                          }
                                                        } else {
                                                          return [
                                                            ((_b3 = (_b2 = unref(username)) == null ? void 0 : _b2.length) != null ? _b3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$a, {
                                                              key: 0,
                                                              onUpdateAreaCode: areaCodeHandler
                                                            })) : createCommentVNode("", true)
                                                          ];
                                                        }
                                                      }),
                                                      _: 1
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(_component_transition_slide, {
                                                        duration: 400,
                                                        offset: [-24, 0]
                                                      }, {
                                                        default: withCtx(() => {
                                                          var _a3;
                                                          var _a2;
                                                          return [
                                                            ((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$a, {
                                                              key: 0,
                                                              onUpdateAreaCode: areaCodeHandler
                                                            })) : createCommentVNode("", true)
                                                          ];
                                                        }),
                                                        _: 1
                                                      })
                                                    ];
                                                  }
                                                }),
                                                key: "0"
                                              } : void 0
                                            ]), _parent7, _scopeId6));
                                            _push7(`<div${ssrRenderAttrs(mergeProps({ class: "pl-2 mt-1" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })))}${_scopeId6}>`);
                                            if ((_a = unref(errors)) == null ? void 0 : _a.username) {
                                              _push7(`<small class="d-block text-error"${_scopeId6}>${ssrInterpolate((_b = unref(errors)) == null ? void 0 : _b.username)}</small>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            _push7(`</div>`);
                                          } else {
                                            return [
                                              createVNode("label", {
                                                for: "correo",
                                                class: "input-label"
                                              }, "Tel\xE9fono o Correo electr\xF3nico *"),
                                              createVNode(VTextField, {
                                                tabindex: "2",
                                                class: "fz-auth-form__input username",
                                                modelValue: unref(username),
                                                "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                                                placeholder: "tucorreo@futzo.io/+52 999 999 9999",
                                                density: "compact"
                                              }, createSlots({ _: 2 }, [
                                                unref(isPhoneNumber) ? {
                                                  name: "prepend",
                                                  fn: withCtx(() => [
                                                    createVNode(_component_transition_slide, {
                                                      duration: 400,
                                                      offset: [-24, 0]
                                                    }, {
                                                      default: withCtx(() => {
                                                        var _a3;
                                                        var _a2;
                                                        return [
                                                          ((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$a, {
                                                            key: 0,
                                                            onUpdateAreaCode: areaCodeHandler
                                                          })) : createCommentVNode("", true)
                                                        ];
                                                      }),
                                                      _: 1
                                                    })
                                                  ]),
                                                  key: "0"
                                                } : void 0
                                              ]), 1032, ["modelValue", "onUpdate:modelValue"]),
                                              withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                                ((_c = unref(errors)) == null ? void 0 : _c.username) ? (openBlock(), createBlock("small", {
                                                  key: 0,
                                                  class: "d-block text-error"
                                                }, toDisplayString((_d = unref(errors)) == null ? void 0 : _d.username), 1)) : createCommentVNode("", true)
                                              ])), [
                                                [_directive_auto_animate, { duration: 100 }]
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        class: "pb-0"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          var _a, _b, _c, _d;
                                          if (_push7) {
                                            _push7(`<label for="password" class="input-label"${_scopeId6}>Contrase\xF1a*</label>`);
                                            _push7(ssrRenderComponent(VTextField, {
                                              tabindex: "3",
                                              class: "fz-auth-form__input",
                                              density: "compact",
                                              placeholder: "Crea una contrase\xF1a",
                                              modelValue: unref(password),
                                              "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                              type: showPassword.value ? "text" : "password",
                                              "append-inner-icon": showPassword.value ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                              "onClick:appendInner": ($event) => showPassword.value = !showPassword.value
                                            }, null, _parent7, _scopeId6));
                                            _push7(`<div${ssrRenderAttrs(mergeProps({ class: "pl-2 mt-1" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })))}${_scopeId6}>`);
                                            if ((_a = unref(errors)) == null ? void 0 : _a.password) {
                                              _push7(`<small class="d-block text-error"${_scopeId6}>${ssrInterpolate((_b = unref(errors)) == null ? void 0 : _b.password)}</small>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            _push7(`</div>`);
                                          } else {
                                            return [
                                              createVNode("label", {
                                                for: "password",
                                                class: "input-label"
                                              }, "Contrase\xF1a*"),
                                              createVNode(VTextField, {
                                                tabindex: "3",
                                                class: "fz-auth-form__input",
                                                density: "compact",
                                                placeholder: "Crea una contrase\xF1a",
                                                modelValue: unref(password),
                                                "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                                type: showPassword.value ? "text" : "password",
                                                "append-inner-icon": showPassword.value ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                                "onClick:appendInner": ($event) => showPassword.value = !showPassword.value
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                              withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                                ((_c = unref(errors)) == null ? void 0 : _c.password) ? (openBlock(), createBlock("small", {
                                                  key: 0,
                                                  class: "d-block text-error"
                                                }, toDisplayString((_d = unref(errors)) == null ? void 0 : _d.password), 1)) : createCommentVNode("", true)
                                              ])), [
                                                [_directive_auto_animate, { duration: 100 }]
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        class: "pb-0"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            if (!unref(showRegisterForm)) {
                                              _push7(`<div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4"${_scopeId6}>`);
                                              _push7(ssrRenderComponent(VCheckbox, {
                                                modelValue: unref(remember),
                                                "onUpdate:modelValue": ($event) => isRef(remember) ? remember.value = $event : null,
                                                label: "Recu\xE9rdame"
                                              }, null, _parent7, _scopeId6));
                                              _push7(`<span class="forgot-password"${_scopeId6}> \xBFOlvidaste tu contrase\xF1a? </span></div>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            _push7(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex align-center justify-space-between flex-wrap" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })))}${_scopeId6}>`);
                                            if (unref(isSignUp)) {
                                              _push7(ssrRenderComponent(VCheckbox, {
                                                modelValue: terms.value,
                                                "onUpdate:modelValue": ($event) => terms.value = $event
                                              }, {
                                                label: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`<span class="text-caption"${_scopeId7}> Entiendo que recibir\xE9 un c\xF3digo de verificaci\xF3n por WhatsApp `);
                                                    _push8(ssrRenderComponent(_component_Icon, { name: "logos:whatsapp-icon" }, null, _parent8, _scopeId7));
                                                    _push8(` si uso mi n\xFAmero o por correo si elijo esa opci\xF3n. </span>`);
                                                  } else {
                                                    return [
                                                      createVNode("span", { class: "text-caption" }, [
                                                        createTextVNode(" Entiendo que recibir\xE9 un c\xF3digo de verificaci\xF3n por WhatsApp "),
                                                        createVNode(_component_Icon, { name: "logos:whatsapp-icon" }),
                                                        createTextVNode(" si uso mi n\xFAmero o por correo si elijo esa opci\xF3n. ")
                                                      ])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            _push7(`</div>`);
                                            _push7(ssrRenderComponent(VBtn, {
                                              block: "",
                                              tabindex: "4",
                                              type: "submit",
                                              size: "40",
                                              loading: unref(isLoading),
                                              disabled: unref(isDisabled),
                                              class: "text-capitalize"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(unref(showRegisterForm) ? "Empezar" : "Iniciar sesi\xF3n")}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(unref(showRegisterForm) ? "Empezar" : "Iniciar sesi\xF3n"), 1)
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(VExpandTransition, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_sfc_main$8, {
                                                    "model-value": unref(password),
                                                    "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                                    show: unref(showRegisterForm) && !!unref(password)
                                                  }, null, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_sfc_main$8, {
                                                      "model-value": unref(password),
                                                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                                      show: unref(showRegisterForm) && !!unref(password)
                                                    }, null, 8, ["model-value", "onUpdate:modelValue", "show"])
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(`<div${ssrRenderAttrs(mergeProps({ class: "text-caption text-secondary text-justify mt-2 ml-1" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })))}${_scopeId6}>`);
                                            if (unref(showRegisterForm)) {
                                              _push7(`<p${_scopeId6}> Al crear una cuenta en Futzo aceptas los <span class="text-high-emphasis text-decoration-underline cursor-pointer text-justify"${_scopeId6}>T\xE9rminos de Servicio</span> y <span class="text-high-emphasis text-decoration-underline cursor-pointer text-justify"${_scopeId6}>Pol\xEDticas de privacidad.</span></p>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            _push7(`</div>`);
                                          } else {
                                            return [
                                              !unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                                key: 0,
                                                class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                                              }, [
                                                createVNode(VCheckbox, {
                                                  modelValue: unref(remember),
                                                  "onUpdate:modelValue": ($event) => isRef(remember) ? remember.value = $event : null,
                                                  label: "Recu\xE9rdame"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                createVNode("span", {
                                                  class: "forgot-password",
                                                  onClick: ($event) => showForgotPassword.value = !showForgotPassword.value
                                                }, " \xBFOlvidaste tu contrase\xF1a? ", 8, ["onClick"])
                                              ])) : createCommentVNode("", true),
                                              withDirectives((openBlock(), createBlock("div", { class: "d-flex align-center justify-space-between flex-wrap" }, [
                                                unref(isSignUp) ? (openBlock(), createBlock(VCheckbox, {
                                                  key: 0,
                                                  modelValue: terms.value,
                                                  "onUpdate:modelValue": ($event) => terms.value = $event
                                                }, {
                                                  label: withCtx(() => [
                                                    createVNode("span", { class: "text-caption" }, [
                                                      createTextVNode(" Entiendo que recibir\xE9 un c\xF3digo de verificaci\xF3n por WhatsApp "),
                                                      createVNode(_component_Icon, { name: "logos:whatsapp-icon" }),
                                                      createTextVNode(" si uso mi n\xFAmero o por correo si elijo esa opci\xF3n. ")
                                                    ])
                                                  ]),
                                                  _: 1
                                                }, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                                              ])), [
                                                [_directive_auto_animate, { duration: 100 }]
                                              ]),
                                              createVNode(VBtn, {
                                                block: "",
                                                tabindex: "4",
                                                type: "submit",
                                                size: "40",
                                                loading: unref(isLoading),
                                                disabled: unref(isDisabled),
                                                class: "text-capitalize"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(unref(showRegisterForm) ? "Empezar" : "Iniciar sesi\xF3n"), 1)
                                                ]),
                                                _: 1
                                              }, 8, ["loading", "disabled"]),
                                              createVNode(VExpandTransition, null, {
                                                default: withCtx(() => [
                                                  createVNode(_sfc_main$8, {
                                                    "model-value": unref(password),
                                                    "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                                    show: unref(showRegisterForm) && !!unref(password)
                                                  }, null, 8, ["model-value", "onUpdate:modelValue", "show"])
                                                ]),
                                                _: 1
                                              }),
                                              withDirectives((openBlock(), createBlock("div", { class: "text-caption text-secondary text-justify mt-2 ml-1" }, [
                                                unref(showRegisterForm) ? (openBlock(), createBlock("p", { key: 0 }, [
                                                  createTextVNode(" Al crear una cuenta en Futzo aceptas los "),
                                                  createVNode("span", {
                                                    class: "text-high-emphasis text-decoration-underline cursor-pointer text-justify",
                                                    onClick: ($event) => _ctx.$router.push({ name: "terminos-de-servicio" })
                                                  }, "T\xE9rminos de Servicio", 8, ["onClick"]),
                                                  createTextVNode(" y "),
                                                  createVNode("span", {
                                                    onClick: ($event) => _ctx.$router.push({ name: "politica-de-privacidad" }),
                                                    class: "text-high-emphasis text-decoration-underline cursor-pointer text-justify"
                                                  }, "Pol\xEDticas de privacidad.", 8, ["onClick"])
                                                ])) : createCommentVNode("", true)
                                              ])), [
                                                [_directive_auto_animate, { duration: 100 }]
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_sfc_main$9, {
                                        errors: unref(errorMessage),
                                        "onUpdate:errors": ($event) => isRef(errorMessage) ? errorMessage.value = $event : null,
                                        username: unref(username),
                                        "area-code": unref(areaCode)
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        class: "text-center text-base pb-0"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<span${_scopeId6}>${ssrInterpolate(unref(showRegisterForm) ? "\xBFYa tienes cuenta?" : "\xBFNo tienes cuenta? ")}</span><a tabindex="5" href="#" class="text-primary ms-2"${_scopeId6}>${ssrInterpolate(unref(showRegisterForm) ? "Iniciar sesi\xF3n" : "Crea una cuenta")}</a>`);
                                          } else {
                                            return [
                                              createVNode("span", null, toDisplayString(unref(showRegisterForm) ? "\xBFYa tienes cuenta?" : "\xBFNo tienes cuenta? "), 1),
                                              createVNode("a", {
                                                tabindex: "5",
                                                href: "#",
                                                class: "text-primary ms-2",
                                                onClick: unref(showRegisterFormHandler)
                                              }, toDisplayString(unref(showRegisterForm) ? "Iniciar sesi\xF3n" : "Crea una cuenta"), 9, ["onClick"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VCol, {
                                          cols: "12",
                                          class: "text-center mt-8 pb-0"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_sfc_main$b)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          class: "d-flex align-center"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VDivider),
                                            createVNode("span", { class: "mx-4 separator-text" }, "o"),
                                            createVNode(VDivider)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VExpandTransition, null, {
                                          default: withCtx(() => [
                                            unref(showRegisterForm) ? (openBlock(), createBlock(VCol, {
                                              key: "name",
                                              cols: "12",
                                              class: "pb-0"
                                            }, {
                                              default: withCtx(() => {
                                                var _a, _b;
                                                return [
                                                  createVNode("label", {
                                                    for: "nombre",
                                                    class: "input-label"
                                                  }, "Nombre*"),
                                                  createVNode(VTextField, {
                                                    tabindex: "1",
                                                    class: "fz-auth-form__input",
                                                    modelValue: unref(name),
                                                    "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                                                    placeholder: "Escribe tu nombre",
                                                    density: "compact"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                  withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                                    ((_a = unref(errors)) == null ? void 0 : _a.name) ? (openBlock(), createBlock("small", {
                                                      key: 0,
                                                      class: "d-block text-error"
                                                    }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.name), 1)) : createCommentVNode("", true)
                                                  ])), [
                                                    [_directive_auto_animate, { duration: 100 }]
                                                  ])
                                                ];
                                              }),
                                              _: 1
                                            })) : createCommentVNode("", true)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          class: "pb-0"
                                        }, {
                                          default: withCtx(() => {
                                            var _a, _b;
                                            return [
                                              createVNode("label", {
                                                for: "correo",
                                                class: "input-label"
                                              }, "Tel\xE9fono o Correo electr\xF3nico *"),
                                              createVNode(VTextField, {
                                                tabindex: "2",
                                                class: "fz-auth-form__input username",
                                                modelValue: unref(username),
                                                "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                                                placeholder: "tucorreo@futzo.io/+52 999 999 9999",
                                                density: "compact"
                                              }, createSlots({ _: 2 }, [
                                                unref(isPhoneNumber) ? {
                                                  name: "prepend",
                                                  fn: withCtx(() => [
                                                    createVNode(_component_transition_slide, {
                                                      duration: 400,
                                                      offset: [-24, 0]
                                                    }, {
                                                      default: withCtx(() => {
                                                        var _a3;
                                                        var _a2;
                                                        return [
                                                          ((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$a, {
                                                            key: 0,
                                                            onUpdateAreaCode: areaCodeHandler
                                                          })) : createCommentVNode("", true)
                                                        ];
                                                      }),
                                                      _: 1
                                                    })
                                                  ]),
                                                  key: "0"
                                                } : void 0
                                              ]), 1032, ["modelValue", "onUpdate:modelValue"]),
                                              withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                                ((_a = unref(errors)) == null ? void 0 : _a.username) ? (openBlock(), createBlock("small", {
                                                  key: 0,
                                                  class: "d-block text-error"
                                                }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.username), 1)) : createCommentVNode("", true)
                                              ])), [
                                                [_directive_auto_animate, { duration: 100 }]
                                              ])
                                            ];
                                          }),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          class: "pb-0"
                                        }, {
                                          default: withCtx(() => {
                                            var _a, _b;
                                            return [
                                              createVNode("label", {
                                                for: "password",
                                                class: "input-label"
                                              }, "Contrase\xF1a*"),
                                              createVNode(VTextField, {
                                                tabindex: "3",
                                                class: "fz-auth-form__input",
                                                density: "compact",
                                                placeholder: "Crea una contrase\xF1a",
                                                modelValue: unref(password),
                                                "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                                type: showPassword.value ? "text" : "password",
                                                "append-inner-icon": showPassword.value ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                                "onClick:appendInner": ($event) => showPassword.value = !showPassword.value
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                              withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                                ((_a = unref(errors)) == null ? void 0 : _a.password) ? (openBlock(), createBlock("small", {
                                                  key: 0,
                                                  class: "d-block text-error"
                                                }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.password), 1)) : createCommentVNode("", true)
                                              ])), [
                                                [_directive_auto_animate, { duration: 100 }]
                                              ])
                                            ];
                                          }),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          class: "pb-0"
                                        }, {
                                          default: withCtx(() => [
                                            !unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                              key: 0,
                                              class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                                            }, [
                                              createVNode(VCheckbox, {
                                                modelValue: unref(remember),
                                                "onUpdate:modelValue": ($event) => isRef(remember) ? remember.value = $event : null,
                                                label: "Recu\xE9rdame"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                              createVNode("span", {
                                                class: "forgot-password",
                                                onClick: ($event) => showForgotPassword.value = !showForgotPassword.value
                                              }, " \xBFOlvidaste tu contrase\xF1a? ", 8, ["onClick"])
                                            ])) : createCommentVNode("", true),
                                            withDirectives((openBlock(), createBlock("div", { class: "d-flex align-center justify-space-between flex-wrap" }, [
                                              unref(isSignUp) ? (openBlock(), createBlock(VCheckbox, {
                                                key: 0,
                                                modelValue: terms.value,
                                                "onUpdate:modelValue": ($event) => terms.value = $event
                                              }, {
                                                label: withCtx(() => [
                                                  createVNode("span", { class: "text-caption" }, [
                                                    createTextVNode(" Entiendo que recibir\xE9 un c\xF3digo de verificaci\xF3n por WhatsApp "),
                                                    createVNode(_component_Icon, { name: "logos:whatsapp-icon" }),
                                                    createTextVNode(" si uso mi n\xFAmero o por correo si elijo esa opci\xF3n. ")
                                                  ])
                                                ]),
                                                _: 1
                                              }, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                                            ])), [
                                              [_directive_auto_animate, { duration: 100 }]
                                            ]),
                                            createVNode(VBtn, {
                                              block: "",
                                              tabindex: "4",
                                              type: "submit",
                                              size: "40",
                                              loading: unref(isLoading),
                                              disabled: unref(isDisabled),
                                              class: "text-capitalize"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(showRegisterForm) ? "Empezar" : "Iniciar sesi\xF3n"), 1)
                                              ]),
                                              _: 1
                                            }, 8, ["loading", "disabled"]),
                                            createVNode(VExpandTransition, null, {
                                              default: withCtx(() => [
                                                createVNode(_sfc_main$8, {
                                                  "model-value": unref(password),
                                                  "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                                  show: unref(showRegisterForm) && !!unref(password)
                                                }, null, 8, ["model-value", "onUpdate:modelValue", "show"])
                                              ]),
                                              _: 1
                                            }),
                                            withDirectives((openBlock(), createBlock("div", { class: "text-caption text-secondary text-justify mt-2 ml-1" }, [
                                              unref(showRegisterForm) ? (openBlock(), createBlock("p", { key: 0 }, [
                                                createTextVNode(" Al crear una cuenta en Futzo aceptas los "),
                                                createVNode("span", {
                                                  class: "text-high-emphasis text-decoration-underline cursor-pointer text-justify",
                                                  onClick: ($event) => _ctx.$router.push({ name: "terminos-de-servicio" })
                                                }, "T\xE9rminos de Servicio", 8, ["onClick"]),
                                                createTextVNode(" y "),
                                                createVNode("span", {
                                                  onClick: ($event) => _ctx.$router.push({ name: "politica-de-privacidad" }),
                                                  class: "text-high-emphasis text-decoration-underline cursor-pointer text-justify"
                                                }, "Pol\xEDticas de privacidad.", 8, ["onClick"])
                                              ])) : createCommentVNode("", true)
                                            ])), [
                                              [_directive_auto_animate, { duration: 100 }]
                                            ])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_sfc_main$9, {
                                          errors: unref(errorMessage),
                                          "onUpdate:errors": ($event) => isRef(errorMessage) ? errorMessage.value = $event : null,
                                          username: unref(username),
                                          "area-code": unref(areaCode)
                                        }, null, 8, ["errors", "onUpdate:errors", "username", "area-code"]),
                                        createVNode(VCol, {
                                          cols: "12",
                                          class: "text-center text-base pb-0"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("span", null, toDisplayString(unref(showRegisterForm) ? "\xBFYa tienes cuenta?" : "\xBFNo tienes cuenta? "), 1),
                                            createVNode("a", {
                                              tabindex: "5",
                                              href: "#",
                                              class: "text-primary ms-2",
                                              onClick: unref(showRegisterFormHandler)
                                            }, toDisplayString(unref(showRegisterForm) ? "Iniciar sesi\xF3n" : "Crea una cuenta"), 9, ["onClick"])
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      createVNode(VCol, {
                                        cols: "12",
                                        class: "text-center mt-8 pb-0"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_sfc_main$b)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        class: "d-flex align-center"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VDivider),
                                          createVNode("span", { class: "mx-4 separator-text" }, "o"),
                                          createVNode(VDivider)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VExpandTransition, null, {
                                        default: withCtx(() => [
                                          unref(showRegisterForm) ? (openBlock(), createBlock(VCol, {
                                            key: "name",
                                            cols: "12",
                                            class: "pb-0"
                                          }, {
                                            default: withCtx(() => {
                                              var _a, _b;
                                              return [
                                                createVNode("label", {
                                                  for: "nombre",
                                                  class: "input-label"
                                                }, "Nombre*"),
                                                createVNode(VTextField, {
                                                  tabindex: "1",
                                                  class: "fz-auth-form__input",
                                                  modelValue: unref(name),
                                                  "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                                                  placeholder: "Escribe tu nombre",
                                                  density: "compact"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                                  ((_a = unref(errors)) == null ? void 0 : _a.name) ? (openBlock(), createBlock("small", {
                                                    key: 0,
                                                    class: "d-block text-error"
                                                  }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.name), 1)) : createCommentVNode("", true)
                                                ])), [
                                                  [_directive_auto_animate, { duration: 100 }]
                                                ])
                                              ];
                                            }),
                                            _: 1
                                          })) : createCommentVNode("", true)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        class: "pb-0"
                                      }, {
                                        default: withCtx(() => {
                                          var _a, _b;
                                          return [
                                            createVNode("label", {
                                              for: "correo",
                                              class: "input-label"
                                            }, "Tel\xE9fono o Correo electr\xF3nico *"),
                                            createVNode(VTextField, {
                                              tabindex: "2",
                                              class: "fz-auth-form__input username",
                                              modelValue: unref(username),
                                              "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                                              placeholder: "tucorreo@futzo.io/+52 999 999 9999",
                                              density: "compact"
                                            }, createSlots({ _: 2 }, [
                                              unref(isPhoneNumber) ? {
                                                name: "prepend",
                                                fn: withCtx(() => [
                                                  createVNode(_component_transition_slide, {
                                                    duration: 400,
                                                    offset: [-24, 0]
                                                  }, {
                                                    default: withCtx(() => {
                                                      var _a3;
                                                      var _a2;
                                                      return [
                                                        ((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$a, {
                                                          key: 0,
                                                          onUpdateAreaCode: areaCodeHandler
                                                        })) : createCommentVNode("", true)
                                                      ];
                                                    }),
                                                    _: 1
                                                  })
                                                ]),
                                                key: "0"
                                              } : void 0
                                            ]), 1032, ["modelValue", "onUpdate:modelValue"]),
                                            withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                              ((_a = unref(errors)) == null ? void 0 : _a.username) ? (openBlock(), createBlock("small", {
                                                key: 0,
                                                class: "d-block text-error"
                                              }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.username), 1)) : createCommentVNode("", true)
                                            ])), [
                                              [_directive_auto_animate, { duration: 100 }]
                                            ])
                                          ];
                                        }),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        class: "pb-0"
                                      }, {
                                        default: withCtx(() => {
                                          var _a, _b;
                                          return [
                                            createVNode("label", {
                                              for: "password",
                                              class: "input-label"
                                            }, "Contrase\xF1a*"),
                                            createVNode(VTextField, {
                                              tabindex: "3",
                                              class: "fz-auth-form__input",
                                              density: "compact",
                                              placeholder: "Crea una contrase\xF1a",
                                              modelValue: unref(password),
                                              "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                              type: showPassword.value ? "text" : "password",
                                              "append-inner-icon": showPassword.value ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                              "onClick:appendInner": ($event) => showPassword.value = !showPassword.value
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                            withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                              ((_a = unref(errors)) == null ? void 0 : _a.password) ? (openBlock(), createBlock("small", {
                                                key: 0,
                                                class: "d-block text-error"
                                              }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.password), 1)) : createCommentVNode("", true)
                                            ])), [
                                              [_directive_auto_animate, { duration: 100 }]
                                            ])
                                          ];
                                        }),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        class: "pb-0"
                                      }, {
                                        default: withCtx(() => [
                                          !unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                            key: 0,
                                            class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                                          }, [
                                            createVNode(VCheckbox, {
                                              modelValue: unref(remember),
                                              "onUpdate:modelValue": ($event) => isRef(remember) ? remember.value = $event : null,
                                              label: "Recu\xE9rdame"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                            createVNode("span", {
                                              class: "forgot-password",
                                              onClick: ($event) => showForgotPassword.value = !showForgotPassword.value
                                            }, " \xBFOlvidaste tu contrase\xF1a? ", 8, ["onClick"])
                                          ])) : createCommentVNode("", true),
                                          withDirectives((openBlock(), createBlock("div", { class: "d-flex align-center justify-space-between flex-wrap" }, [
                                            unref(isSignUp) ? (openBlock(), createBlock(VCheckbox, {
                                              key: 0,
                                              modelValue: terms.value,
                                              "onUpdate:modelValue": ($event) => terms.value = $event
                                            }, {
                                              label: withCtx(() => [
                                                createVNode("span", { class: "text-caption" }, [
                                                  createTextVNode(" Entiendo que recibir\xE9 un c\xF3digo de verificaci\xF3n por WhatsApp "),
                                                  createVNode(_component_Icon, { name: "logos:whatsapp-icon" }),
                                                  createTextVNode(" si uso mi n\xFAmero o por correo si elijo esa opci\xF3n. ")
                                                ])
                                              ]),
                                              _: 1
                                            }, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                                          ])), [
                                            [_directive_auto_animate, { duration: 100 }]
                                          ]),
                                          createVNode(VBtn, {
                                            block: "",
                                            tabindex: "4",
                                            type: "submit",
                                            size: "40",
                                            loading: unref(isLoading),
                                            disabled: unref(isDisabled),
                                            class: "text-capitalize"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(unref(showRegisterForm) ? "Empezar" : "Iniciar sesi\xF3n"), 1)
                                            ]),
                                            _: 1
                                          }, 8, ["loading", "disabled"]),
                                          createVNode(VExpandTransition, null, {
                                            default: withCtx(() => [
                                              createVNode(_sfc_main$8, {
                                                "model-value": unref(password),
                                                "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                                show: unref(showRegisterForm) && !!unref(password)
                                              }, null, 8, ["model-value", "onUpdate:modelValue", "show"])
                                            ]),
                                            _: 1
                                          }),
                                          withDirectives((openBlock(), createBlock("div", { class: "text-caption text-secondary text-justify mt-2 ml-1" }, [
                                            unref(showRegisterForm) ? (openBlock(), createBlock("p", { key: 0 }, [
                                              createTextVNode(" Al crear una cuenta en Futzo aceptas los "),
                                              createVNode("span", {
                                                class: "text-high-emphasis text-decoration-underline cursor-pointer text-justify",
                                                onClick: ($event) => _ctx.$router.push({ name: "terminos-de-servicio" })
                                              }, "T\xE9rminos de Servicio", 8, ["onClick"]),
                                              createTextVNode(" y "),
                                              createVNode("span", {
                                                onClick: ($event) => _ctx.$router.push({ name: "politica-de-privacidad" }),
                                                class: "text-high-emphasis text-decoration-underline cursor-pointer text-justify"
                                              }, "Pol\xEDticas de privacidad.", 8, ["onClick"])
                                            ])) : createCommentVNode("", true)
                                          ])), [
                                            [_directive_auto_animate, { duration: 100 }]
                                          ])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$9, {
                                        errors: unref(errorMessage),
                                        "onUpdate:errors": ($event) => isRef(errorMessage) ? errorMessage.value = $event : null,
                                        username: unref(username),
                                        "area-code": unref(areaCode)
                                      }, null, 8, ["errors", "onUpdate:errors", "username", "area-code"]),
                                      createVNode(VCol, {
                                        cols: "12",
                                        class: "text-center text-base pb-0"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("span", null, toDisplayString(unref(showRegisterForm) ? "\xBFYa tienes cuenta?" : "\xBFNo tienes cuenta? "), 1),
                                          createVNode("a", {
                                            tabindex: "5",
                                            href: "#",
                                            class: "text-primary ms-2",
                                            onClick: unref(showRegisterFormHandler)
                                          }, toDisplayString(unref(showRegisterForm) ? "Iniciar sesi\xF3n" : "Crea una cuenta"), 9, ["onClick"])
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
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VForm, {
                              onSubmit: withModifiers(unref(submitHandler), ["prevent"]),
                              class: "px-4"
                            }, {
                              default: withCtx(() => [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      class: "text-center mt-8 pb-0"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_sfc_main$b)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      class: "d-flex align-center"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VDivider),
                                        createVNode("span", { class: "mx-4 separator-text" }, "o"),
                                        createVNode(VDivider)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VExpandTransition, null, {
                                      default: withCtx(() => [
                                        unref(showRegisterForm) ? (openBlock(), createBlock(VCol, {
                                          key: "name",
                                          cols: "12",
                                          class: "pb-0"
                                        }, {
                                          default: withCtx(() => {
                                            var _a, _b;
                                            return [
                                              createVNode("label", {
                                                for: "nombre",
                                                class: "input-label"
                                              }, "Nombre*"),
                                              createVNode(VTextField, {
                                                tabindex: "1",
                                                class: "fz-auth-form__input",
                                                modelValue: unref(name),
                                                "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                                                placeholder: "Escribe tu nombre",
                                                density: "compact"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                              withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                                ((_a = unref(errors)) == null ? void 0 : _a.name) ? (openBlock(), createBlock("small", {
                                                  key: 0,
                                                  class: "d-block text-error"
                                                }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.name), 1)) : createCommentVNode("", true)
                                              ])), [
                                                [_directive_auto_animate, { duration: 100 }]
                                              ])
                                            ];
                                          }),
                                          _: 1
                                        })) : createCommentVNode("", true)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      class: "pb-0"
                                    }, {
                                      default: withCtx(() => {
                                        var _a, _b;
                                        return [
                                          createVNode("label", {
                                            for: "correo",
                                            class: "input-label"
                                          }, "Tel\xE9fono o Correo electr\xF3nico *"),
                                          createVNode(VTextField, {
                                            tabindex: "2",
                                            class: "fz-auth-form__input username",
                                            modelValue: unref(username),
                                            "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                                            placeholder: "tucorreo@futzo.io/+52 999 999 9999",
                                            density: "compact"
                                          }, createSlots({ _: 2 }, [
                                            unref(isPhoneNumber) ? {
                                              name: "prepend",
                                              fn: withCtx(() => [
                                                createVNode(_component_transition_slide, {
                                                  duration: 400,
                                                  offset: [-24, 0]
                                                }, {
                                                  default: withCtx(() => {
                                                    var _a3;
                                                    var _a2;
                                                    return [
                                                      ((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$a, {
                                                        key: 0,
                                                        onUpdateAreaCode: areaCodeHandler
                                                      })) : createCommentVNode("", true)
                                                    ];
                                                  }),
                                                  _: 1
                                                })
                                              ]),
                                              key: "0"
                                            } : void 0
                                          ]), 1032, ["modelValue", "onUpdate:modelValue"]),
                                          withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                            ((_a = unref(errors)) == null ? void 0 : _a.username) ? (openBlock(), createBlock("small", {
                                              key: 0,
                                              class: "d-block text-error"
                                            }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.username), 1)) : createCommentVNode("", true)
                                          ])), [
                                            [_directive_auto_animate, { duration: 100 }]
                                          ])
                                        ];
                                      }),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      class: "pb-0"
                                    }, {
                                      default: withCtx(() => {
                                        var _a, _b;
                                        return [
                                          createVNode("label", {
                                            for: "password",
                                            class: "input-label"
                                          }, "Contrase\xF1a*"),
                                          createVNode(VTextField, {
                                            tabindex: "3",
                                            class: "fz-auth-form__input",
                                            density: "compact",
                                            placeholder: "Crea una contrase\xF1a",
                                            modelValue: unref(password),
                                            "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                            type: showPassword.value ? "text" : "password",
                                            "append-inner-icon": showPassword.value ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                            "onClick:appendInner": ($event) => showPassword.value = !showPassword.value
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                          withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                            ((_a = unref(errors)) == null ? void 0 : _a.password) ? (openBlock(), createBlock("small", {
                                              key: 0,
                                              class: "d-block text-error"
                                            }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.password), 1)) : createCommentVNode("", true)
                                          ])), [
                                            [_directive_auto_animate, { duration: 100 }]
                                          ])
                                        ];
                                      }),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      class: "pb-0"
                                    }, {
                                      default: withCtx(() => [
                                        !unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                                        }, [
                                          createVNode(VCheckbox, {
                                            modelValue: unref(remember),
                                            "onUpdate:modelValue": ($event) => isRef(remember) ? remember.value = $event : null,
                                            label: "Recu\xE9rdame"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                          createVNode("span", {
                                            class: "forgot-password",
                                            onClick: ($event) => showForgotPassword.value = !showForgotPassword.value
                                          }, " \xBFOlvidaste tu contrase\xF1a? ", 8, ["onClick"])
                                        ])) : createCommentVNode("", true),
                                        withDirectives((openBlock(), createBlock("div", { class: "d-flex align-center justify-space-between flex-wrap" }, [
                                          unref(isSignUp) ? (openBlock(), createBlock(VCheckbox, {
                                            key: 0,
                                            modelValue: terms.value,
                                            "onUpdate:modelValue": ($event) => terms.value = $event
                                          }, {
                                            label: withCtx(() => [
                                              createVNode("span", { class: "text-caption" }, [
                                                createTextVNode(" Entiendo que recibir\xE9 un c\xF3digo de verificaci\xF3n por WhatsApp "),
                                                createVNode(_component_Icon, { name: "logos:whatsapp-icon" }),
                                                createTextVNode(" si uso mi n\xFAmero o por correo si elijo esa opci\xF3n. ")
                                              ])
                                            ]),
                                            _: 1
                                          }, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                                        ])), [
                                          [_directive_auto_animate, { duration: 100 }]
                                        ]),
                                        createVNode(VBtn, {
                                          block: "",
                                          tabindex: "4",
                                          type: "submit",
                                          size: "40",
                                          loading: unref(isLoading),
                                          disabled: unref(isDisabled),
                                          class: "text-capitalize"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(showRegisterForm) ? "Empezar" : "Iniciar sesi\xF3n"), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["loading", "disabled"]),
                                        createVNode(VExpandTransition, null, {
                                          default: withCtx(() => [
                                            createVNode(_sfc_main$8, {
                                              "model-value": unref(password),
                                              "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                              show: unref(showRegisterForm) && !!unref(password)
                                            }, null, 8, ["model-value", "onUpdate:modelValue", "show"])
                                          ]),
                                          _: 1
                                        }),
                                        withDirectives((openBlock(), createBlock("div", { class: "text-caption text-secondary text-justify mt-2 ml-1" }, [
                                          unref(showRegisterForm) ? (openBlock(), createBlock("p", { key: 0 }, [
                                            createTextVNode(" Al crear una cuenta en Futzo aceptas los "),
                                            createVNode("span", {
                                              class: "text-high-emphasis text-decoration-underline cursor-pointer text-justify",
                                              onClick: ($event) => _ctx.$router.push({ name: "terminos-de-servicio" })
                                            }, "T\xE9rminos de Servicio", 8, ["onClick"]),
                                            createTextVNode(" y "),
                                            createVNode("span", {
                                              onClick: ($event) => _ctx.$router.push({ name: "politica-de-privacidad" }),
                                              class: "text-high-emphasis text-decoration-underline cursor-pointer text-justify"
                                            }, "Pol\xEDticas de privacidad.", 8, ["onClick"])
                                          ])) : createCommentVNode("", true)
                                        ])), [
                                          [_directive_auto_animate, { duration: 100 }]
                                        ])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$9, {
                                      errors: unref(errorMessage),
                                      "onUpdate:errors": ($event) => isRef(errorMessage) ? errorMessage.value = $event : null,
                                      username: unref(username),
                                      "area-code": unref(areaCode)
                                    }, null, 8, ["errors", "onUpdate:errors", "username", "area-code"]),
                                    createVNode(VCol, {
                                      cols: "12",
                                      class: "text-center text-base pb-0"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("span", null, toDisplayString(unref(showRegisterForm) ? "\xBFYa tienes cuenta?" : "\xBFNo tienes cuenta? "), 1),
                                        createVNode("a", {
                                          tabindex: "5",
                                          href: "#",
                                          class: "text-primary ms-2",
                                          onClick: unref(showRegisterFormHandler)
                                        }, toDisplayString(unref(showRegisterForm) ? "Iniciar sesi\xF3n" : "Crea una cuenta"), 9, ["onClick"])
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
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCardItem, { class: "justify-center text-center" }, {
                        default: withCtx(() => [
                          createVNode(_component_Logo, {
                            width: "165",
                            class: "mx-auto"
                          }),
                          createVNode(VCardTitle, { class: "text-black text-h4" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(title)), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VCardSubtitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Administra torneos y ligas f\xE1cilmente.")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode(VForm, {
                            onSubmit: withModifiers(unref(submitHandler), ["prevent"]),
                            class: "px-4"
                          }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    class: "text-center mt-8 pb-0"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$b)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    class: "d-flex align-center"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VDivider),
                                      createVNode("span", { class: "mx-4 separator-text" }, "o"),
                                      createVNode(VDivider)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VExpandTransition, null, {
                                    default: withCtx(() => [
                                      unref(showRegisterForm) ? (openBlock(), createBlock(VCol, {
                                        key: "name",
                                        cols: "12",
                                        class: "pb-0"
                                      }, {
                                        default: withCtx(() => {
                                          var _a, _b;
                                          return [
                                            createVNode("label", {
                                              for: "nombre",
                                              class: "input-label"
                                            }, "Nombre*"),
                                            createVNode(VTextField, {
                                              tabindex: "1",
                                              class: "fz-auth-form__input",
                                              modelValue: unref(name),
                                              "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                                              placeholder: "Escribe tu nombre",
                                              density: "compact"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                            withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                              ((_a = unref(errors)) == null ? void 0 : _a.name) ? (openBlock(), createBlock("small", {
                                                key: 0,
                                                class: "d-block text-error"
                                              }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.name), 1)) : createCommentVNode("", true)
                                            ])), [
                                              [_directive_auto_animate, { duration: 100 }]
                                            ])
                                          ];
                                        }),
                                        _: 1
                                      })) : createCommentVNode("", true)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    class: "pb-0"
                                  }, {
                                    default: withCtx(() => {
                                      var _a, _b;
                                      return [
                                        createVNode("label", {
                                          for: "correo",
                                          class: "input-label"
                                        }, "Tel\xE9fono o Correo electr\xF3nico *"),
                                        createVNode(VTextField, {
                                          tabindex: "2",
                                          class: "fz-auth-form__input username",
                                          modelValue: unref(username),
                                          "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                                          placeholder: "tucorreo@futzo.io/+52 999 999 9999",
                                          density: "compact"
                                        }, createSlots({ _: 2 }, [
                                          unref(isPhoneNumber) ? {
                                            name: "prepend",
                                            fn: withCtx(() => [
                                              createVNode(_component_transition_slide, {
                                                duration: 400,
                                                offset: [-24, 0]
                                              }, {
                                                default: withCtx(() => {
                                                  var _a3;
                                                  var _a2;
                                                  return [
                                                    ((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$a, {
                                                      key: 0,
                                                      onUpdateAreaCode: areaCodeHandler
                                                    })) : createCommentVNode("", true)
                                                  ];
                                                }),
                                                _: 1
                                              })
                                            ]),
                                            key: "0"
                                          } : void 0
                                        ]), 1032, ["modelValue", "onUpdate:modelValue"]),
                                        withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                          ((_a = unref(errors)) == null ? void 0 : _a.username) ? (openBlock(), createBlock("small", {
                                            key: 0,
                                            class: "d-block text-error"
                                          }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.username), 1)) : createCommentVNode("", true)
                                        ])), [
                                          [_directive_auto_animate, { duration: 100 }]
                                        ])
                                      ];
                                    }),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    class: "pb-0"
                                  }, {
                                    default: withCtx(() => {
                                      var _a, _b;
                                      return [
                                        createVNode("label", {
                                          for: "password",
                                          class: "input-label"
                                        }, "Contrase\xF1a*"),
                                        createVNode(VTextField, {
                                          tabindex: "3",
                                          class: "fz-auth-form__input",
                                          density: "compact",
                                          placeholder: "Crea una contrase\xF1a",
                                          modelValue: unref(password),
                                          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                          type: showPassword.value ? "text" : "password",
                                          "append-inner-icon": showPassword.value ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                          "onClick:appendInner": ($event) => showPassword.value = !showPassword.value
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                        withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                          ((_a = unref(errors)) == null ? void 0 : _a.password) ? (openBlock(), createBlock("small", {
                                            key: 0,
                                            class: "d-block text-error"
                                          }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.password), 1)) : createCommentVNode("", true)
                                        ])), [
                                          [_directive_auto_animate, { duration: 100 }]
                                        ])
                                      ];
                                    }),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    class: "pb-0"
                                  }, {
                                    default: withCtx(() => [
                                      !unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                                      }, [
                                        createVNode(VCheckbox, {
                                          modelValue: unref(remember),
                                          "onUpdate:modelValue": ($event) => isRef(remember) ? remember.value = $event : null,
                                          label: "Recu\xE9rdame"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode("span", {
                                          class: "forgot-password",
                                          onClick: ($event) => showForgotPassword.value = !showForgotPassword.value
                                        }, " \xBFOlvidaste tu contrase\xF1a? ", 8, ["onClick"])
                                      ])) : createCommentVNode("", true),
                                      withDirectives((openBlock(), createBlock("div", { class: "d-flex align-center justify-space-between flex-wrap" }, [
                                        unref(isSignUp) ? (openBlock(), createBlock(VCheckbox, {
                                          key: 0,
                                          modelValue: terms.value,
                                          "onUpdate:modelValue": ($event) => terms.value = $event
                                        }, {
                                          label: withCtx(() => [
                                            createVNode("span", { class: "text-caption" }, [
                                              createTextVNode(" Entiendo que recibir\xE9 un c\xF3digo de verificaci\xF3n por WhatsApp "),
                                              createVNode(_component_Icon, { name: "logos:whatsapp-icon" }),
                                              createTextVNode(" si uso mi n\xFAmero o por correo si elijo esa opci\xF3n. ")
                                            ])
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                                      ])), [
                                        [_directive_auto_animate, { duration: 100 }]
                                      ]),
                                      createVNode(VBtn, {
                                        block: "",
                                        tabindex: "4",
                                        type: "submit",
                                        size: "40",
                                        loading: unref(isLoading),
                                        disabled: unref(isDisabled),
                                        class: "text-capitalize"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(showRegisterForm) ? "Empezar" : "Iniciar sesi\xF3n"), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["loading", "disabled"]),
                                      createVNode(VExpandTransition, null, {
                                        default: withCtx(() => [
                                          createVNode(_sfc_main$8, {
                                            "model-value": unref(password),
                                            "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                            show: unref(showRegisterForm) && !!unref(password)
                                          }, null, 8, ["model-value", "onUpdate:modelValue", "show"])
                                        ]),
                                        _: 1
                                      }),
                                      withDirectives((openBlock(), createBlock("div", { class: "text-caption text-secondary text-justify mt-2 ml-1" }, [
                                        unref(showRegisterForm) ? (openBlock(), createBlock("p", { key: 0 }, [
                                          createTextVNode(" Al crear una cuenta en Futzo aceptas los "),
                                          createVNode("span", {
                                            class: "text-high-emphasis text-decoration-underline cursor-pointer text-justify",
                                            onClick: ($event) => _ctx.$router.push({ name: "terminos-de-servicio" })
                                          }, "T\xE9rminos de Servicio", 8, ["onClick"]),
                                          createTextVNode(" y "),
                                          createVNode("span", {
                                            onClick: ($event) => _ctx.$router.push({ name: "politica-de-privacidad" }),
                                            class: "text-high-emphasis text-decoration-underline cursor-pointer text-justify"
                                          }, "Pol\xEDticas de privacidad.", 8, ["onClick"])
                                        ])) : createCommentVNode("", true)
                                      ])), [
                                        [_directive_auto_animate, { duration: 100 }]
                                      ])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_sfc_main$9, {
                                    errors: unref(errorMessage),
                                    "onUpdate:errors": ($event) => isRef(errorMessage) ? errorMessage.value = $event : null,
                                    username: unref(username),
                                    "area-code": unref(areaCode)
                                  }, null, 8, ["errors", "onUpdate:errors", "username", "area-code"]),
                                  createVNode(VCol, {
                                    cols: "12",
                                    class: "text-center text-base pb-0"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", null, toDisplayString(unref(showRegisterForm) ? "\xBFYa tienes cuenta?" : "\xBFNo tienes cuenta? "), 1),
                                      createVNode("a", {
                                        tabindex: "5",
                                        href: "#",
                                        class: "text-primary ms-2",
                                        onClick: unref(showRegisterFormHandler)
                                      }, toDisplayString(unref(showRegisterForm) ? "Iniciar sesi\xF3n" : "Crea una cuenta"), 9, ["onClick"])
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
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_client_only, null, {}, _parent2, _scopeId));
          } else {
            return [
              !showForgotPassword.value ? (openBlock(), createBlock(VCard, {
                key: 0,
                class: "pa-2 pb-5 futzo-rounded",
                "max-width": "448",
                "min-height": "80%",
                elevation: "0",
                color: "on-background"
              }, {
                default: withCtx(() => [
                  createVNode(VCardItem, { class: "justify-center text-center" }, {
                    default: withCtx(() => [
                      createVNode(_component_Logo, {
                        width: "165",
                        class: "mx-auto"
                      }),
                      createVNode(VCardTitle, { class: "text-black text-h4" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(title)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(VCardSubtitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Administra torneos y ligas f\xE1cilmente.")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VForm, {
                        onSubmit: withModifiers(unref(submitHandler), ["prevent"]),
                        class: "px-4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                class: "text-center mt-8 pb-0"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$b)
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                class: "d-flex align-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VDivider),
                                  createVNode("span", { class: "mx-4 separator-text" }, "o"),
                                  createVNode(VDivider)
                                ]),
                                _: 1
                              }),
                              createVNode(VExpandTransition, null, {
                                default: withCtx(() => [
                                  unref(showRegisterForm) ? (openBlock(), createBlock(VCol, {
                                    key: "name",
                                    cols: "12",
                                    class: "pb-0"
                                  }, {
                                    default: withCtx(() => {
                                      var _a, _b;
                                      return [
                                        createVNode("label", {
                                          for: "nombre",
                                          class: "input-label"
                                        }, "Nombre*"),
                                        createVNode(VTextField, {
                                          tabindex: "1",
                                          class: "fz-auth-form__input",
                                          modelValue: unref(name),
                                          "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                                          placeholder: "Escribe tu nombre",
                                          density: "compact"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                          ((_a = unref(errors)) == null ? void 0 : _a.name) ? (openBlock(), createBlock("small", {
                                            key: 0,
                                            class: "d-block text-error"
                                          }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.name), 1)) : createCommentVNode("", true)
                                        ])), [
                                          [_directive_auto_animate, { duration: 100 }]
                                        ])
                                      ];
                                    }),
                                    _: 1
                                  })) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                class: "pb-0"
                              }, {
                                default: withCtx(() => {
                                  var _a, _b;
                                  return [
                                    createVNode("label", {
                                      for: "correo",
                                      class: "input-label"
                                    }, "Tel\xE9fono o Correo electr\xF3nico *"),
                                    createVNode(VTextField, {
                                      tabindex: "2",
                                      class: "fz-auth-form__input username",
                                      modelValue: unref(username),
                                      "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                                      placeholder: "tucorreo@futzo.io/+52 999 999 9999",
                                      density: "compact"
                                    }, createSlots({ _: 2 }, [
                                      unref(isPhoneNumber) ? {
                                        name: "prepend",
                                        fn: withCtx(() => [
                                          createVNode(_component_transition_slide, {
                                            duration: 400,
                                            offset: [-24, 0]
                                          }, {
                                            default: withCtx(() => {
                                              var _a3;
                                              var _a2;
                                              return [
                                                ((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$a, {
                                                  key: 0,
                                                  onUpdateAreaCode: areaCodeHandler
                                                })) : createCommentVNode("", true)
                                              ];
                                            }),
                                            _: 1
                                          })
                                        ]),
                                        key: "0"
                                      } : void 0
                                    ]), 1032, ["modelValue", "onUpdate:modelValue"]),
                                    withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                      ((_a = unref(errors)) == null ? void 0 : _a.username) ? (openBlock(), createBlock("small", {
                                        key: 0,
                                        class: "d-block text-error"
                                      }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.username), 1)) : createCommentVNode("", true)
                                    ])), [
                                      [_directive_auto_animate, { duration: 100 }]
                                    ])
                                  ];
                                }),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                class: "pb-0"
                              }, {
                                default: withCtx(() => {
                                  var _a, _b;
                                  return [
                                    createVNode("label", {
                                      for: "password",
                                      class: "input-label"
                                    }, "Contrase\xF1a*"),
                                    createVNode(VTextField, {
                                      tabindex: "3",
                                      class: "fz-auth-form__input",
                                      density: "compact",
                                      placeholder: "Crea una contrase\xF1a",
                                      modelValue: unref(password),
                                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                      type: showPassword.value ? "text" : "password",
                                      "append-inner-icon": showPassword.value ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                      "onClick:appendInner": ($event) => showPassword.value = !showPassword.value
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                    withDirectives((openBlock(), createBlock("div", { class: "pl-2 mt-1" }, [
                                      ((_a = unref(errors)) == null ? void 0 : _a.password) ? (openBlock(), createBlock("small", {
                                        key: 0,
                                        class: "d-block text-error"
                                      }, toDisplayString((_b = unref(errors)) == null ? void 0 : _b.password), 1)) : createCommentVNode("", true)
                                    ])), [
                                      [_directive_auto_animate, { duration: 100 }]
                                    ])
                                  ];
                                }),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                class: "pb-0"
                              }, {
                                default: withCtx(() => [
                                  !unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                                  }, [
                                    createVNode(VCheckbox, {
                                      modelValue: unref(remember),
                                      "onUpdate:modelValue": ($event) => isRef(remember) ? remember.value = $event : null,
                                      label: "Recu\xE9rdame"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("span", {
                                      class: "forgot-password",
                                      onClick: ($event) => showForgotPassword.value = !showForgotPassword.value
                                    }, " \xBFOlvidaste tu contrase\xF1a? ", 8, ["onClick"])
                                  ])) : createCommentVNode("", true),
                                  withDirectives((openBlock(), createBlock("div", { class: "d-flex align-center justify-space-between flex-wrap" }, [
                                    unref(isSignUp) ? (openBlock(), createBlock(VCheckbox, {
                                      key: 0,
                                      modelValue: terms.value,
                                      "onUpdate:modelValue": ($event) => terms.value = $event
                                    }, {
                                      label: withCtx(() => [
                                        createVNode("span", { class: "text-caption" }, [
                                          createTextVNode(" Entiendo que recibir\xE9 un c\xF3digo de verificaci\xF3n por WhatsApp "),
                                          createVNode(_component_Icon, { name: "logos:whatsapp-icon" }),
                                          createTextVNode(" si uso mi n\xFAmero o por correo si elijo esa opci\xF3n. ")
                                        ])
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                                  ])), [
                                    [_directive_auto_animate, { duration: 100 }]
                                  ]),
                                  createVNode(VBtn, {
                                    block: "",
                                    tabindex: "4",
                                    type: "submit",
                                    size: "40",
                                    loading: unref(isLoading),
                                    disabled: unref(isDisabled),
                                    class: "text-capitalize"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(showRegisterForm) ? "Empezar" : "Iniciar sesi\xF3n"), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["loading", "disabled"]),
                                  createVNode(VExpandTransition, null, {
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$8, {
                                        "model-value": unref(password),
                                        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                        show: unref(showRegisterForm) && !!unref(password)
                                      }, null, 8, ["model-value", "onUpdate:modelValue", "show"])
                                    ]),
                                    _: 1
                                  }),
                                  withDirectives((openBlock(), createBlock("div", { class: "text-caption text-secondary text-justify mt-2 ml-1" }, [
                                    unref(showRegisterForm) ? (openBlock(), createBlock("p", { key: 0 }, [
                                      createTextVNode(" Al crear una cuenta en Futzo aceptas los "),
                                      createVNode("span", {
                                        class: "text-high-emphasis text-decoration-underline cursor-pointer text-justify",
                                        onClick: ($event) => _ctx.$router.push({ name: "terminos-de-servicio" })
                                      }, "T\xE9rminos de Servicio", 8, ["onClick"]),
                                      createTextVNode(" y "),
                                      createVNode("span", {
                                        onClick: ($event) => _ctx.$router.push({ name: "politica-de-privacidad" }),
                                        class: "text-high-emphasis text-decoration-underline cursor-pointer text-justify"
                                      }, "Pol\xEDticas de privacidad.", 8, ["onClick"])
                                    ])) : createCommentVNode("", true)
                                  ])), [
                                    [_directive_auto_animate, { duration: 100 }]
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_sfc_main$9, {
                                errors: unref(errorMessage),
                                "onUpdate:errors": ($event) => isRef(errorMessage) ? errorMessage.value = $event : null,
                                username: unref(username),
                                "area-code": unref(areaCode)
                              }, null, 8, ["errors", "onUpdate:errors", "username", "area-code"]),
                              createVNode(VCol, {
                                cols: "12",
                                class: "text-center text-base pb-0"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", null, toDisplayString(unref(showRegisterForm) ? "\xBFYa tienes cuenta?" : "\xBFNo tienes cuenta? "), 1),
                                  createVNode("a", {
                                    tabindex: "5",
                                    href: "#",
                                    class: "text-primary ms-2",
                                    onClick: unref(showRegisterFormHandler)
                                  }, toDisplayString(unref(showRegisterForm) ? "Iniciar sesi\xF3n" : "Crea una cuenta"), 9, ["onClick"])
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
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_component_client_only, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$2, {
                    showForgotPassword: showForgotPassword.value,
                    onBackToLogin: returnBackClickHandler
                  }, null, 8, ["showForgotPassword"])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/AuthForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const loadingPage = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      if (!unref(loadingPage)) {
        _push(ssrRenderComponent(VContainer, mergeProps({
          fluid: "",
          class: "fill-height py-0"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, { class: "fill-height" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      class: "d-flex justify-center align-center"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$1, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, {
                        cols: "12",
                        class: "d-flex justify-center align-center"
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
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VRow, { class: "fill-height" }, {
                  default: withCtx(() => [
                    createVNode(VCol, {
                      cols: "12",
                      class: "d-flex justify-center align-center"
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
        }, _parent));
      } else {
        _push(`<!---->`);
      }
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
//# sourceMappingURL=login-Crpub_Wy.mjs.map
