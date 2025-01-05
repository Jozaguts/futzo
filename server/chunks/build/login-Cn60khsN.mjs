import { computed, createVNode, mergeProps, useSSRContext, defineComponent, ref, unref, withCtx, mergeModels, useModel, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, resolveDirective, createCommentVNode, isRef, withDirectives, createSlots, withModifiers, reactive } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrGetDirectiveProps } from 'vue/server-renderer';
import { _ as _sfc_main$6 } from './Logo-DOXQxoe9.mjs';
import { _ as __nuxt_component_0 } from './TransitionSlide-BfR1-sQr.mjs';
import { p as propsFactory, ai as makeVInputProps, D as omit, aV as makeVCheckboxBtnProps, q as genericComponent, I as useProxiedModel, aj as useFocus, aA as getUid, w as useRender, aQ as filterInputAttrs, ak as VInput, aW as VCheckboxBtn, aX as VMenu, aY as VList, ay as VListItem, e as VTextField, az as VListItemTitle, V as VCard, b as VCardItem, c as VCardTitle, W as VCardSubtitle, d as VCardText, av as VDivider, aI as VExpandTransition, j as useSanctumClient, _ as __nuxt_component_0$1, h as useSanctumAuth, k as useToast, i as useRouter$1 } from './server.mjs';
import { V as VBtn } from './VBtn-DMHWn55H.mjs';
import { countries } from 'countries-list';
import { V as VRow, a as VCol } from './VRow-BbW5rOE9.mjs';
import { u as useForm, i as isNotNestedPath, c as cleanupNonNestedPath } from './vee-validate-DdIKuPJn.mjs';
import { object, boolean, string } from 'yup';
import { V as VForm } from './VForm-C8SPeugr.mjs';
import { V as VContainer } from './VContainer-DNC4AmJg.mjs';
import '@morev/vue-transitions';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';
import 'pinia';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import '@vue/reactivity';
import 'vue3-perfect-scrollbar';
import '@formkit/auto-animate/vue';
import 'awesome-phonenumber';

const makeVCheckboxProps = propsFactory({
  ...makeVInputProps(),
  ...omit(makeVCheckboxBtnProps(), ["inline"])
}, "VCheckbox");
const VCheckbox = genericComponent()({
  name: "VCheckbox",
  inheritAttrs: false,
  props: makeVCheckboxProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:focused": (focused) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const uid = getUid();
    const id = computed(() => props.id || `checkbox-${uid}`);
    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs);
      const inputProps = VInput.filterProps(props);
      const checkboxProps = VCheckboxBtn.filterProps(props);
      return createVNode(VInput, mergeProps({
        "class": ["v-checkbox", props.class]
      }, rootAttrs, inputProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "id": id.value,
        "focused": isFocused.value,
        "style": props.style
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id: id2,
            messagesId,
            isDisabled,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VCheckboxBtn, mergeProps(checkboxProps, {
            "id": id2.value,
            "aria-describedby": messagesId.value,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value
          }, controlAttrs, {
            "error": isValid.value === false,
            "modelValue": model.value,
            "onUpdate:modelValue": ($event) => model.value = $event,
            "onFocus": focus,
            "onBlur": blur
          }), slots);
        }
      });
    });
    return {};
  }
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
      const _component_Icon = __nuxt_component_0$1;
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/AuthProvider.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
      const _component_Icon = __nuxt_component_0$1;
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/components/PasswordRules.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
      const _component_Icon = __nuxt_component_0$1;
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/components/SearchCountry.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/components/ErrorMessages.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
/**
  * vee-validate v4.14.7
  * (c) 2024 Abdelrahman Awad
  * @license MIT
  */
const isObject = (obj) => obj !== null && !!obj && typeof obj === "object" && !Array.isArray(obj);
function isIndex(value) {
  return Number(value) >= 0;
}
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
function getTag(value) {
  if (value == null) {
    return value === void 0 ? "[object Undefined]" : "[object Null]";
  }
  return Object.prototype.toString.call(value);
}
function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}
function merge(target, source) {
  Object.keys(source).forEach((key) => {
    if (isPlainObject(source[key]) && isPlainObject(target[key])) {
      if (!target[key]) {
        target[key] = {};
      }
      merge(target[key], source[key]);
      return;
    }
    target[key] = source[key];
  });
  return target;
}
function toTypedSchema(yupSchema, opts = { abortEarly: false }) {
  const schema = {
    __type: "VVTypedSchema",
    async parse(values) {
      var _a;
      try {
        const output = await yupSchema.validate(values, Object.assign({}, opts));
        return {
          value: output,
          errors: []
        };
      } catch (err) {
        const error = err;
        if (error.name !== "ValidationError") {
          throw err;
        }
        if (!((_a = error.inner) === null || _a === void 0 ? void 0 : _a.length) && error.errors.length) {
          return { errors: [{ path: error.path, errors: error.errors }] };
        }
        const errors = error.inner.reduce((acc, curr) => {
          const path = curr.path || "";
          if (!acc[path]) {
            acc[path] = { errors: [], path };
          }
          acc[path].errors.push(...curr.errors);
          return acc;
        }, {});
        return { errors: Object.values(errors) };
      }
    },
    cast(values) {
      try {
        return yupSchema.cast(values);
      } catch (_a) {
        const defaults = yupSchema.getDefault();
        if (isObject(defaults) && isObject(values)) {
          return merge(defaults, values);
        }
        return values;
      }
    },
    describe(path) {
      try {
        if (!path) {
          return getDescriptionFromYupSpec(yupSchema.spec);
        }
        const description = getSpecForPath(path, yupSchema);
        if (!description) {
          return {
            required: false,
            exists: false
          };
        }
        return getDescriptionFromYupSpec(description);
      } catch (_a) {
        return {
          required: false,
          exists: false
        };
      }
    }
  };
  return schema;
}
function getDescriptionFromYupSpec(spec) {
  return {
    required: !spec.optional,
    exists: true
  };
}
function getSpecForPath(path, schema) {
  if (!isObjectSchema(schema)) {
    return null;
  }
  if (isNotNestedPath(path)) {
    const field = schema.fields[cleanupNonNestedPath(path)];
    return (field === null || field === void 0 ? void 0 : field.spec) || null;
  }
  const paths = (path || "").split(/\.|\[(\d+)\]/).filter(Boolean);
  let currentSchema = schema;
  for (let i = 0; i < paths.length; i++) {
    const p = paths[i];
    if (isObjectSchema(currentSchema) && p in currentSchema.fields) {
      currentSchema = currentSchema.fields[p];
    } else if (isIndex(p) && isArraySchema(currentSchema)) {
      currentSchema = currentSchema.innerType;
    }
    if (i === paths.length - 1) {
      return currentSchema.spec;
    }
  }
  return null;
}
function isObjectSchema(schema) {
  return isObject(schema) && schema.type === "object";
}
function isArraySchema(schema) {
  return isObject(schema) && schema.type === "array";
}
const useApiError = (error) => {
  var _a;
  return {
    code: (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.status,
    message: error.data.message
  };
};
const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const phoneRegex = /^\d{10}$/;
function useAuth() {
  const isPhone = ref(false);
  const { handleSubmit, defineField, errors, meta } = useForm({
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
            context.parent.inputType = isPhone ? "phone" : isEmail ? "email" : null;
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
    await login({ ...form }).catch((error) => {
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
      await useRouter$1().push("/verificar?email=" + username.value);
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
    submitHandler
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
      showRegisterFormHandler,
      submitHandler
    } = useAuth();
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Logo = _sfc_main$6;
      const _component_transition_slide = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(ssrRenderComponent(VCard, mergeProps({
        class: "pa-2",
        "max-width": "448",
        elevation: "0",
        color: "background"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardItem, { class: "justify-center text-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Logo, {
                    width: "165",
                    class: "mx-auto"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardTitle, { class: "text-black text-h4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(title))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(title)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardSubtitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Administra torneos y ligas f\xE1cilmente.`);
                      } else {
                        return [
                          createTextVNode("Administra torneos y ligas f\xE1cilmente.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VForm, {
                    onSubmit: unref(submitHandler),
                    class: "px-4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                class: "text-center mt-8 pb-0"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$5, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$5)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                class: "d-flex align-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VDivider, null, null, _parent6, _scopeId5));
                                    _push6(`<span class="mx-4 separator-text"${_scopeId5}>o</span>`);
                                    _push6(ssrRenderComponent(VDivider, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VDivider),
                                      createVNode("span", { class: "mx-4 separator-text" }, "o"),
                                      createVNode(VDivider)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VExpandTransition, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (unref(showRegisterForm)) {
                                      _push6(ssrRenderComponent(VCol, {
                                        key: "name",
                                        cols: "12",
                                        class: "pb-0"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          var _a, _b, _c, _d;
                                          if (_push7) {
                                            _push7(`<label for="nombre" class="input-label"${_scopeId6}>Nombre*</label>`);
                                            _push7(ssrRenderComponent(VTextField, {
                                              tabindex: "1",
                                              class: "fz-auth-form__input",
                                              modelValue: unref(name),
                                              "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                                              placeholder: "Escribe tu nombre",
                                              density: "compact"
                                            }, null, _parent7, _scopeId6));
                                            _push7(`<div${ssrRenderAttrs(mergeProps({ class: "pl-2 mt-1" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })))}${_scopeId6}>`);
                                            if ((_a = unref(errors)) == null ? void 0 : _a.name) {
                                              _push7(`<small class="d-block text-error"${_scopeId6}>${ssrInterpolate((_b = unref(errors)) == null ? void 0 : _b.name)}</small>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            _push7(`</div>`);
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
                                      }, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
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
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                class: "pb-0"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  var _a, _b, _c, _d;
                                  if (_push6) {
                                    _push6(`<label for="correo" class="input-label"${_scopeId5}>Tel\xE9fono o Correo electr\xF3nico *</label>`);
                                    _push6(ssrRenderComponent(VTextField, {
                                      tabindex: "2",
                                      class: "fz-auth-form__input username",
                                      modelValue: unref(username),
                                      "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                                      placeholder: "tucorreo@futzo.io/+52 999 999 9999",
                                      density: "compact"
                                    }, createSlots({ _: 2 }, [
                                      unref(isPhoneNumber) ? {
                                        name: "prepend",
                                        fn: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_transition_slide, {
                                              duration: 400,
                                              offset: [-24, 0]
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                var _a3, _b3;
                                                var _a2, _b2;
                                                if (_push8) {
                                                  if (((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1) {
                                                    _push8(ssrRenderComponent(_sfc_main$3, { onUpdateAreaCode: areaCodeHandler }, null, _parent8, _scopeId7));
                                                  } else {
                                                    _push8(`<!---->`);
                                                  }
                                                } else {
                                                  return [
                                                    ((_b3 = (_b2 = unref(username)) == null ? void 0 : _b2.length) != null ? _b3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$3, {
                                                      key: 0,
                                                      onUpdateAreaCode: areaCodeHandler
                                                    })) : createCommentVNode("", true)
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
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
                                                    ((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$3, {
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
                                    ]), _parent6, _scopeId5));
                                    _push6(`<div${ssrRenderAttrs(mergeProps({ class: "pl-2 mt-1" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })))}${_scopeId5}>`);
                                    if ((_a = unref(errors)) == null ? void 0 : _a.username) {
                                      _push6(`<small class="d-block text-error"${_scopeId5}>${ssrInterpolate((_b = unref(errors)) == null ? void 0 : _b.username)}</small>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(`</div>`);
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
                                                  ((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$3, {
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
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                class: "pb-0"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  var _a, _b, _c, _d;
                                  if (_push6) {
                                    _push6(`<label for="password" class="input-label"${_scopeId5}>Contrase\xF1a*</label>`);
                                    _push6(ssrRenderComponent(VTextField, {
                                      tabindex: "3",
                                      class: "fz-auth-form__input",
                                      density: "compact",
                                      placeholder: "Crea una contrase\xF1a",
                                      modelValue: unref(password),
                                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                      type: showPassword.value ? "text" : "password",
                                      "append-inner-icon": showPassword.value ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                      "onClick:appendInner": ($event) => showPassword.value = !showPassword.value
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div${ssrRenderAttrs(mergeProps({ class: "pl-2 mt-1" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })))}${_scopeId5}>`);
                                    if ((_a = unref(errors)) == null ? void 0 : _a.password) {
                                      _push6(`<small class="d-block text-error"${_scopeId5}>${ssrInterpolate((_b = unref(errors)) == null ? void 0 : _b.password)}</small>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(`</div>`);
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
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                class: "pb-0"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VExpandTransition, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_sfc_main$4, {
                                            "model-value": unref(password),
                                            "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                            show: unref(showRegisterForm)
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_sfc_main$4, {
                                              "model-value": unref(password),
                                              "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                              show: unref(showRegisterForm)
                                            }, null, 8, ["model-value", "onUpdate:modelValue", "show"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    if (!unref(showRegisterForm)) {
                                      _push6(`<div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(VCheckbox, {
                                        modelValue: unref(remember),
                                        "onUpdate:modelValue": ($event) => isRef(remember) ? remember.value = $event : null,
                                        label: "Recu\xE9rdame"
                                      }, null, _parent6, _scopeId5));
                                      _push6(`<span class="forgot-password"${_scopeId5}> \xBFOlvidaste tu contrase\xF1a? </span></div>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex align-center justify-space-between flex-wrap" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })))}${_scopeId5}>`);
                                    if (unref(isSignUp)) {
                                      _push6(ssrRenderComponent(VCheckbox, {
                                        modelValue: terms.value,
                                        "onUpdate:modelValue": ($event) => terms.value = $event
                                      }, {
                                        label: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<span class="text-caption"${_scopeId6}> Entiendo que recibir\xE9 un c\xF3digo de verificaci\xF3n por WhatsApp `);
                                            _push7(ssrRenderComponent(_component_Icon, { name: "logos:whatsapp-icon" }, null, _parent7, _scopeId6));
                                            _push7(` si uso mi n\xFAmero o por correo si elijo esa opci\xF3n. </span>`);
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
                                      }, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(`</div>`);
                                    _push6(ssrRenderComponent(VBtn, {
                                      block: "",
                                      tabindex: "4",
                                      type: "submit",
                                      size: "40",
                                      loading: unref(isLoading),
                                      disabled: unref(isDisabled),
                                      class: "text-capitalize"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(unref(showRegisterForm) ? "Empezar" : "Iniciar sesi\xF3n")}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(unref(showRegisterForm) ? "Empezar" : "Iniciar sesi\xF3n"), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<div${ssrRenderAttrs(mergeProps({ class: "text-caption text-secondary text-justify mt-2 ml-1" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })))}${_scopeId5}>`);
                                    if (unref(showRegisterForm)) {
                                      _push6(`<p${_scopeId5}> Al crear una cuenta en Futzo aceptas los <span class="text-high-emphasis text-decoration-underline cursor-pointer text-justify"${_scopeId5}>T\xE9rminos de Servicio</span> y <span class="text-high-emphasis text-decoration-underline cursor-pointer text-justify"${_scopeId5}>Pol\xEDticas de privacidad.</span></p>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode(VExpandTransition, null, {
                                        default: withCtx(() => [
                                          createVNode(_sfc_main$4, {
                                            "model-value": unref(password),
                                            "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                            show: unref(showRegisterForm)
                                          }, null, 8, ["model-value", "onUpdate:modelValue", "show"])
                                        ]),
                                        _: 1
                                      }),
                                      !unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                                      }, [
                                        createVNode(VCheckbox, {
                                          modelValue: unref(remember),
                                          "onUpdate:modelValue": ($event) => isRef(remember) ? remember.value = $event : null,
                                          label: "Recu\xE9rdame"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode("span", { class: "forgot-password" }, " \xBFOlvidaste tu contrase\xF1a? ")
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
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_sfc_main$2, {
                                errors: unref(errorMessage),
                                "onUpdate:errors": ($event) => isRef(errorMessage) ? errorMessage.value = $event : null,
                                username: unref(username),
                                "area-code": unref(areaCode)
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                class: "text-center text-base pb-0"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span${_scopeId5}>${ssrInterpolate(unref(showRegisterForm) ? "\xBFYa tienes cuenta?" : "\xBFNo tienes cuenta? ")}</span><a tabindex="5" href="#" class="text-primary ms-2"${_scopeId5}>${ssrInterpolate(unref(showRegisterForm) ? "Iniciar sesi\xF3n" : "Crea una cuenta")}</a>`);
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  class: "text-center mt-8 pb-0"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$5)
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
                                                  ((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$3, {
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
                                    createVNode(VExpandTransition, null, {
                                      default: withCtx(() => [
                                        createVNode(_sfc_main$4, {
                                          "model-value": unref(password),
                                          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                          show: unref(showRegisterForm)
                                        }, null, 8, ["model-value", "onUpdate:modelValue", "show"])
                                      ]),
                                      _: 1
                                    }),
                                    !unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                                    }, [
                                      createVNode(VCheckbox, {
                                        modelValue: unref(remember),
                                        "onUpdate:modelValue": ($event) => isRef(remember) ? remember.value = $event : null,
                                        label: "Recu\xE9rdame"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("span", { class: "forgot-password" }, " \xBFOlvidaste tu contrase\xF1a? ")
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
                                createVNode(_sfc_main$2, {
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                class: "text-center mt-8 pb-0"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$5)
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
                                                ((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$3, {
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
                                  createVNode(VExpandTransition, null, {
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$4, {
                                        "model-value": unref(password),
                                        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                        show: unref(showRegisterForm)
                                      }, null, 8, ["model-value", "onUpdate:modelValue", "show"])
                                    ]),
                                    _: 1
                                  }),
                                  !unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                                  }, [
                                    createVNode(VCheckbox, {
                                      modelValue: unref(remember),
                                      "onUpdate:modelValue": ($event) => isRef(remember) ? remember.value = $event : null,
                                      label: "Recu\xE9rdame"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("span", { class: "forgot-password" }, " \xBFOlvidaste tu contrase\xF1a? ")
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
                              createVNode(_sfc_main$2, {
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
                  }, _parent3, _scopeId2));
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
                                createVNode(_sfc_main$5)
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
                                              ((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$3, {
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
                                createVNode(VExpandTransition, null, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$4, {
                                      "model-value": unref(password),
                                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                      show: unref(showRegisterForm)
                                    }, null, 8, ["model-value", "onUpdate:modelValue", "show"])
                                  ]),
                                  _: 1
                                }),
                                !unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                                }, [
                                  createVNode(VCheckbox, {
                                    modelValue: unref(remember),
                                    "onUpdate:modelValue": ($event) => isRef(remember) ? remember.value = $event : null,
                                    label: "Recu\xE9rdame"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("span", { class: "forgot-password" }, " \xBFOlvidaste tu contrase\xF1a? ")
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
                            createVNode(_sfc_main$2, {
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
            }, _parent2, _scopeId));
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
                              createVNode(_sfc_main$5)
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
                                            ((_a3 = (_a2 = unref(username)) == null ? void 0 : _a2.length) != null ? _a3 : 0) > 1 ? (openBlock(), createBlock(_sfc_main$3, {
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
                              createVNode(VExpandTransition, null, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$4, {
                                    "model-value": unref(password),
                                    "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                    show: unref(showRegisterForm)
                                  }, null, 8, ["model-value", "onUpdate:modelValue", "show"])
                                ]),
                                _: 1
                              }),
                              !unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                              }, [
                                createVNode(VCheckbox, {
                                  modelValue: unref(remember),
                                  "onUpdate:modelValue": ($event) => isRef(remember) ? remember.value = $event : null,
                                  label: "Recu\xE9rdame"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("span", { class: "forgot-password" }, " \xBFOlvidaste tu contrase\xF1a? ")
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
                          createVNode(_sfc_main$2, {
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
                      md: "6",
                      lg: "6",
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
                    _push3(ssrRenderComponent(VCol, {
                      class: "d-none d-md-flex d-lg-flex bg-auth-section",
                      md: "6",
                      lg: "6"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "6",
                        class: "d-flex justify-center align-center"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$1)
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        class: "d-none d-md-flex d-lg-flex bg-auth-section",
                        md: "6",
                        lg: "6"
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
                      md: "6",
                      lg: "6",
                      class: "d-flex justify-center align-center"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$1)
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      class: "d-none d-md-flex d-lg-flex bg-auth-section",
                      md: "6",
                      lg: "6"
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
//# sourceMappingURL=login-Cn60khsN.mjs.map
