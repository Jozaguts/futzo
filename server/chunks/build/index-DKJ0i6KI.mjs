import { _ as _sfc_main$3 } from './Logo-C2r9fRFb.mjs';
import { computed, ref, watch, nextTick, createVNode, mergeProps, Fragment, useSSRContext, defineComponent, resolveDynamicComponent, unref, withCtx, createTextVNode, toDisplayString, isRef } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { p as propsFactory, bA as makeDimensionProps, ah as makeFocusProps, bO as only, bc as makeVFieldProps, q as genericComponent, bE as useDimension, aj as useFocus, I as useProxiedModel, t as useLocale, P as provideDefaults, w as useRender, aI as filterInputAttrs, bf as VField, by as VOverlay, k as useToast, aD as useRoute$1, bP as focusChild, V as VCard, b as VCardItem, c as VCardTitle, W as VCardSubtitle, d as VCardText, i as useRouter$1, _ as __nuxt_component_1$1, f as _export_sfc, j as useSanctumClient } from './server.mjs';
import { a as VProgressCircular, V as VBtn } from './VBtn-sH8DNEZb.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';
import 'node:module';
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

const makeVOtpInputProps = propsFactory({
  autofocus: Boolean,
  divider: String,
  focusAll: Boolean,
  label: {
    type: String,
    default: "$vuetify.input.otp"
  },
  length: {
    type: [Number, String],
    default: 6
  },
  modelValue: {
    type: [Number, String],
    default: void 0
  },
  placeholder: String,
  type: {
    type: String,
    default: "number"
  },
  ...makeDimensionProps(),
  ...makeFocusProps(),
  ...only(makeVFieldProps({
    variant: "outlined"
  }), ["baseColor", "bgColor", "class", "color", "disabled", "error", "loading", "rounded", "style", "theme", "variant"])
}, "VOtpInput");
const VOtpInput = genericComponent()({
  name: "VOtpInput",
  props: makeVOtpInputProps(),
  emits: {
    finish: (val) => true,
    "update:focused": (val) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const model = useProxiedModel(props, "modelValue", "", (val) => val == null ? [] : String(val).split(""), (val) => val.join(""));
    const {
      t
    } = useLocale();
    const length = computed(() => Number(props.length));
    const fields = computed(() => Array(length.value).fill(0));
    const focusIndex = ref(-1);
    const contentRef = ref();
    const inputRef = ref([]);
    const current = computed(() => inputRef.value[focusIndex.value]);
    function onInput() {
      if (isValidNumber(current.value.value)) {
        current.value.value = "";
        return;
      }
      const array = model.value.slice();
      const value = current.value.value;
      array[focusIndex.value] = value;
      let target = null;
      if (focusIndex.value > model.value.length) {
        target = model.value.length + 1;
      } else if (focusIndex.value + 1 !== length.value) {
        target = "next";
      }
      model.value = array;
      if (target) focusChild(contentRef.value, target);
    }
    function onKeydown(e) {
      const array = model.value.slice();
      const index = focusIndex.value;
      let target = null;
      if (!["ArrowLeft", "ArrowRight", "Backspace", "Delete"].includes(e.key)) return;
      e.preventDefault();
      if (e.key === "ArrowLeft") {
        target = "prev";
      } else if (e.key === "ArrowRight") {
        target = "next";
      } else if (["Backspace", "Delete"].includes(e.key)) {
        array[focusIndex.value] = "";
        model.value = array;
        if (focusIndex.value > 0 && e.key === "Backspace") {
          target = "prev";
        } else {
          requestAnimationFrame(() => {
            var _a;
            (_a = inputRef.value[index]) == null ? void 0 : _a.select();
          });
        }
      }
      requestAnimationFrame(() => {
        if (target != null) {
          focusChild(contentRef.value, target);
        }
      });
    }
    function onPaste(index, e) {
      var _a2;
      var _a, _b;
      e.preventDefault();
      e.stopPropagation();
      const clipboardText = (_a2 = (_a = e == null ? void 0 : e.clipboardData) == null ? void 0 : _a.getData("Text").slice(0, length.value)) != null ? _a2 : "";
      if (isValidNumber(clipboardText)) return;
      model.value = clipboardText.split("");
      (_b = inputRef.value) == null ? void 0 : _b[index].blur();
    }
    function reset() {
      model.value = [];
    }
    function onFocus(e, index) {
      focus();
      focusIndex.value = index;
    }
    function onBlur() {
      blur();
      focusIndex.value = -1;
    }
    function isValidNumber(value) {
      return props.type === "number" && /[^0-9]/g.test(value);
    }
    provideDefaults({
      VField: {
        color: computed(() => props.color),
        bgColor: computed(() => props.color),
        baseColor: computed(() => props.baseColor),
        disabled: computed(() => props.disabled),
        error: computed(() => props.error),
        variant: computed(() => props.variant)
      }
    }, {
      scoped: true
    });
    watch(model, (val) => {
      if (val.length === length.value) emit("finish", val.join(""));
    }, {
      deep: true
    });
    watch(focusIndex, (val) => {
      if (val < 0) return;
      nextTick(() => {
        var _a;
        (_a = inputRef.value[val]) == null ? void 0 : _a.select();
      });
    });
    useRender(() => {
      var _a;
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      return createVNode("div", mergeProps({
        "class": ["v-otp-input", {
          "v-otp-input--divided": !!props.divider
        }, props.class],
        "style": [props.style]
      }, rootAttrs), [createVNode("div", {
        "ref": contentRef,
        "class": "v-otp-input__content",
        "style": [dimensionStyles.value]
      }, [fields.value.map((_, i) => createVNode(Fragment, null, [props.divider && i !== 0 && createVNode("span", {
        "class": "v-otp-input__divider"
      }, [props.divider]), createVNode(VField, {
        "focused": isFocused.value && props.focusAll || focusIndex.value === i,
        "key": i
      }, {
        ...slots,
        loader: void 0,
        default: () => {
          return createVNode("input", {
            "ref": (val) => inputRef.value[i] = val,
            "aria-label": t(props.label, i + 1),
            "autofocus": i === 0 && props.autofocus,
            "autocomplete": "one-time-code",
            "class": ["v-otp-input__field"],
            "disabled": props.disabled,
            "inputmode": props.type === "number" ? "numeric" : "text",
            "min": props.type === "number" ? 0 : void 0,
            "maxlength": "1",
            "placeholder": props.placeholder,
            "type": props.type === "number" ? "text" : props.type,
            "value": model.value[i],
            "onInput": onInput,
            "onFocus": (e) => onFocus(e, i),
            "onBlur": onBlur,
            "onKeydown": onKeydown,
            "onPaste": (event) => onPaste(i, event)
          }, null);
        }
      })])), createVNode("input", mergeProps({
        "class": "v-otp-input-input",
        "type": "hidden"
      }, inputAttrs, {
        "value": model.value.join("")
      }), null), createVNode(VOverlay, {
        "contained": true,
        "content-class": "v-otp-input__loader",
        "model-value": !!props.loading,
        "persistent": true
      }, {
        default: () => {
          var _a3;
          var _a2;
          return [(_a3 = (_a2 = slots.loader) == null ? void 0 : _a2.call(slots)) != null ? _a3 : createVNode(VProgressCircular, {
            "color": typeof props.loading === "boolean" ? void 0 : props.loading,
            "indeterminate": true,
            "size": "24",
            "width": "2"
          }, null)];
        }
      }), (_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    });
    return {
      blur: () => {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.some((input) => input.blur());
      },
      focus: () => {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a[0].focus();
      },
      reset,
      isFocused
    };
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "otp-card",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const code = ref("");
    const email = (_a = useRoute$1().query.email) != null ? _a : "";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(ssrRenderComponent(VCard, mergeProps({
        width: "100%",
        "max-width": "540",
        "max-height": "550",
        class: "verify-card"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardItem, { class: "d-flex justify-center align-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "d-flex justify-center align-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="icon-container"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "futzo-icon:inbox-02",
                          class: "mx-auto envelop-icon"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "icon-container" }, [
                            createVNode(_component_Icon, {
                              name: "futzo-icon:inbox-02",
                              class: "mx-auto envelop-icon"
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardTitle, { class: "text-center verify-card-title" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Revisa tu correo `);
                      } else {
                        return [
                          createTextVNode(" Revisa tu correo ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardSubtitle, { class: "text-center verify-card-subtitle" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Te enviamos un correo de verificaci\xF3n al <br${_scopeId3}> correo <strong class="font-weight-bold text-black"${_scopeId3}>${ssrInterpolate(unref(email))}</strong>. `);
                      } else {
                        return [
                          createTextVNode(" Te enviamos un correo de verificaci\xF3n al "),
                          createVNode("br"),
                          createTextVNode(" correo "),
                          createVNode("strong", { class: "font-weight-bold text-black" }, toDisplayString(unref(email)), 1),
                          createTextVNode(". ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "d-flex justify-center align-center" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "icon-container" }, [
                          createVNode(_component_Icon, {
                            name: "futzo-icon:inbox-02",
                            class: "mx-auto envelop-icon"
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCardTitle, { class: "text-center verify-card-title" }, {
                      default: withCtx(() => [
                        createTextVNode(" Revisa tu correo ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardSubtitle, { class: "text-center verify-card-subtitle" }, {
                      default: withCtx(() => [
                        createTextVNode(" Te enviamos un correo de verificaci\xF3n al "),
                        createVNode("br"),
                        createTextVNode(" correo "),
                        createVNode("strong", { class: "font-weight-bold text-black" }, toDisplayString(unref(email)), 1),
                        createTextVNode(". ")
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
                  _push3(`<div class="w-75 mx-auto"${_scopeId2}>`);
                  _push3(ssrRenderComponent(VOtpInput, {
                    modelValue: unref(code),
                    "onUpdate:modelValue": ($event) => isRef(code) ? code.value = $event : null,
                    placeholder: "0",
                    length: "4",
                    width: "356px",
                    "min-height": "80px"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    class: "my-5",
                    rounded: "lg",
                    disabled: unref(code).length < 4,
                    size: "large",
                    block: "",
                    onClick: ($event) => _ctx.$emit("event", { action: "verify-email", code: unref(code) })
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Verificar correo `);
                      } else {
                        return [
                          createTextVNode("Verificar correo ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="verify-card-options-container"${_scopeId2}><p class="verify-card-didnt-get-email"${_scopeId2}>\xBFNo recibiste el correo?</p>`);
                  _push3(ssrRenderComponent(VBtn, {
                    variant: "text",
                    class: "mx-0 px-0"
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
                  _push3(`</div><div class="d-flex justify-center align-center my-5 cursor-pointer"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "futzo-icon:arrow-left",
                    class: "arrow-left mx-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-body-1 font-weight-bold"${_scopeId2}>Regresar a registrarme</p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-75 mx-auto" }, [
                      createVNode(VOtpInput, {
                        modelValue: unref(code),
                        "onUpdate:modelValue": ($event) => isRef(code) ? code.value = $event : null,
                        placeholder: "0",
                        length: "4",
                        width: "356px",
                        "min-height": "80px"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VBtn, {
                        class: "my-5",
                        rounded: "lg",
                        disabled: unref(code).length < 4,
                        size: "large",
                        block: "",
                        onClick: ($event) => _ctx.$emit("event", { action: "verify-email", code: unref(code) })
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Verificar correo ")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"]),
                      createVNode("div", { class: "verify-card-options-container" }, [
                        createVNode("p", { class: "verify-card-didnt-get-email" }, "\xBFNo recibiste el correo?"),
                        createVNode(VBtn, {
                          variant: "text",
                          class: "mx-0 px-0"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Reenviar")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", {
                        class: "d-flex justify-center align-center my-5 cursor-pointer",
                        onClick: ($event) => _ctx.$router.push("/login")
                      }, [
                        createVNode(_component_Icon, {
                          name: "futzo-icon:arrow-left",
                          class: "arrow-left mx-1"
                        }),
                        createVNode("p", { class: "text-body-1 font-weight-bold" }, "Regresar a registrarme")
                      ], 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardItem, { class: "d-flex justify-center align-center" }, {
                default: withCtx(() => [
                  createVNode(VCardTitle, { class: "d-flex justify-center align-center" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "icon-container" }, [
                        createVNode(_component_Icon, {
                          name: "futzo-icon:inbox-02",
                          class: "mx-auto envelop-icon"
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCardTitle, { class: "text-center verify-card-title" }, {
                    default: withCtx(() => [
                      createTextVNode(" Revisa tu correo ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardSubtitle, { class: "text-center verify-card-subtitle" }, {
                    default: withCtx(() => [
                      createTextVNode(" Te enviamos un correo de verificaci\xF3n al "),
                      createVNode("br"),
                      createTextVNode(" correo "),
                      createVNode("strong", { class: "font-weight-bold text-black" }, toDisplayString(unref(email)), 1),
                      createTextVNode(". ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "w-75 mx-auto" }, [
                    createVNode(VOtpInput, {
                      modelValue: unref(code),
                      "onUpdate:modelValue": ($event) => isRef(code) ? code.value = $event : null,
                      placeholder: "0",
                      length: "4",
                      width: "356px",
                      "min-height": "80px"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(VBtn, {
                      class: "my-5",
                      rounded: "lg",
                      disabled: unref(code).length < 4,
                      size: "large",
                      block: "",
                      onClick: ($event) => _ctx.$emit("event", { action: "verify-email", code: unref(code) })
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Verificar correo ")
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"]),
                    createVNode("div", { class: "verify-card-options-container" }, [
                      createVNode("p", { class: "verify-card-didnt-get-email" }, "\xBFNo recibiste el correo?"),
                      createVNode(VBtn, {
                        variant: "text",
                        class: "mx-0 px-0"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Reenviar")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", {
                      class: "d-flex justify-center align-center my-5 cursor-pointer",
                      onClick: ($event) => _ctx.$router.push("/login")
                    }, [
                      createVNode(_component_Icon, {
                        name: "futzo-icon:arrow-left",
                        class: "arrow-left mx-1"
                      }),
                      createVNode("p", { class: "text-body-1 font-weight-bold" }, "Regresar a registrarme")
                    ], 8, ["onClick"])
                  ])
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/verify-email/cards/otp-card.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Icon = __nuxt_component_1$1;
  _push(ssrRenderComponent(VCard, mergeProps({
    width: "100%",
    "max-width": "540",
    "max-height": "550",
    class: "verify-card"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="d-flex justify-center align-center"${_scopeId}></div>`);
        _push2(ssrRenderComponent(VCardItem, { class: "d-flex justify-center align-center" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCardTitle, { class: "d-flex justify-center align-center" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="icon-container"${_scopeId3}>`);
                    _push4(ssrRenderComponent(_component_Icon, {
                      name: "futzo-icon:check-circle",
                      class: "mx-auto envelop-icon"
                    }, null, _parent4, _scopeId3));
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "icon-container" }, [
                        createVNode(_component_Icon, {
                          name: "futzo-icon:check-circle",
                          class: "mx-auto envelop-icon"
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardTitle, { class: "text-center verify-card-title" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Correo verificado `);
                  } else {
                    return [
                      createTextVNode(" Correo verificado ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardSubtitle, { class: "text-center verify-card-subtitle" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Gracias por confirmar tu correo, ahora puedes <br${_scopeId3}> iniciar sesi\xF3n con tu correo y contrase\xF1a. `);
                  } else {
                    return [
                      createTextVNode(" Gracias por confirmar tu correo, ahora puedes "),
                      createVNode("br"),
                      createTextVNode(" iniciar sesi\xF3n con tu correo y contrase\xF1a. ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCardTitle, { class: "d-flex justify-center align-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "icon-container" }, [
                      createVNode(_component_Icon, {
                        name: "futzo-icon:check-circle",
                        class: "mx-auto envelop-icon"
                      })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(VCardTitle, { class: "text-center verify-card-title" }, {
                  default: withCtx(() => [
                    createTextVNode(" Correo verificado ")
                  ]),
                  _: 1
                }),
                createVNode(VCardSubtitle, { class: "text-center verify-card-subtitle" }, {
                  default: withCtx(() => [
                    createTextVNode(" Gracias por confirmar tu correo, ahora puedes "),
                    createVNode("br"),
                    createTextVNode(" iniciar sesi\xF3n con tu correo y contrase\xF1a. ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VCardText, { class: "my-5" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="w-75 mx-auto my-5"${_scopeId2}>`);
              _push3(ssrRenderComponent(VBtn, {
                class: "my-5",
                rounded: "lg",
                size: "large",
                block: "",
                onClick: ($event) => _ctx.$emit("event", { action: "email-verified" })
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Continuar `);
                  } else {
                    return [
                      createTextVNode(" Continuar ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`<div class="d-flex justify-center align-center my-5 cursor-pointer"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_Icon, {
                name: "futzo-icon:arrow-left",
                class: "arrow-left mx-1"
              }, null, _parent3, _scopeId2));
              _push3(`<p class="text-body-1 font-weight-bold"${_scopeId2}>Regresar a registrarme</p></div></div>`);
            } else {
              return [
                createVNode("div", { class: "w-75 mx-auto my-5" }, [
                  createVNode(VBtn, {
                    class: "my-5",
                    rounded: "lg",
                    size: "large",
                    block: "",
                    onClick: ($event) => _ctx.$emit("event", { action: "email-verified" })
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Continuar ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode("div", {
                    class: "d-flex justify-center align-center my-5 cursor-pointer",
                    onClick: ($event) => _ctx.$router.push("/login")
                  }, [
                    createVNode(_component_Icon, {
                      name: "futzo-icon:arrow-left",
                      class: "arrow-left mx-1"
                    }),
                    createVNode("p", { class: "text-body-1 font-weight-bold" }, "Regresar a registrarme")
                  ], 8, ["onClick"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("div", { class: "d-flex justify-center align-center" }),
          createVNode(VCardItem, { class: "d-flex justify-center align-center" }, {
            default: withCtx(() => [
              createVNode(VCardTitle, { class: "d-flex justify-center align-center" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "icon-container" }, [
                    createVNode(_component_Icon, {
                      name: "futzo-icon:check-circle",
                      class: "mx-auto envelop-icon"
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(VCardTitle, { class: "text-center verify-card-title" }, {
                default: withCtx(() => [
                  createTextVNode(" Correo verificado ")
                ]),
                _: 1
              }),
              createVNode(VCardSubtitle, { class: "text-center verify-card-subtitle" }, {
                default: withCtx(() => [
                  createTextVNode(" Gracias por confirmar tu correo, ahora puedes "),
                  createVNode("br"),
                  createTextVNode(" iniciar sesi\xF3n con tu correo y contrase\xF1a. ")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VCardText, { class: "my-5" }, {
            default: withCtx(() => [
              createVNode("div", { class: "w-75 mx-auto my-5" }, [
                createVNode(VBtn, {
                  class: "my-5",
                  rounded: "lg",
                  size: "large",
                  block: "",
                  onClick: ($event) => _ctx.$emit("event", { action: "email-verified" })
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Continuar ")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode("div", {
                  class: "d-flex justify-center align-center my-5 cursor-pointer",
                  onClick: ($event) => _ctx.$router.push("/login")
                }, [
                  createVNode(_component_Icon, {
                    name: "futzo-icon:arrow-left",
                    class: "arrow-left mx-1"
                  }),
                  createVNode("p", { class: "text-body-1 font-weight-bold" }, "Regresar a registrarme")
                ], 8, ["onClick"])
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/verify-email/cards/verified-card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const VerifiedCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const { toast } = useToast();
    const email = (_a = useRoute$1().query.email) != null ? _a : "";
    const currentComponent = ref("OtpCard");
    const verifyEmail = (code) => {
      const client = useSanctumClient();
      client(`/verify-email`, {
        method: "POST",
        body: {
          code,
          email
        }
      }).then((response) => {
        toast(
          "success",
          "Correo Verificado",
          "Tu correo ha sido verificado exitosamente."
        );
        currentComponent.value = "VerifiedCard";
      }).catch((error) => {
        var _a3;
        var _a2;
        const errorMessage = (_a3 = (_a2 = error == null ? void 0 : error.data) == null ? void 0 : _a2.message) != null ? _a3 : "La verificaci\xF3n de tu correo electr\xF3nico ha fallado. Por favor, vuelve a intentarlo.";
        if (error.response.status === 401) {
          toast(
            "info",
            "Redirigiendo...",
            "Por favor, espera mientras te llevamos a la siguiente p\xE1gina."
          );
          setTimeout(() => {
            useRouter$1().push({ name: "login", params: { email } });
          }, 3e3);
        } else {
          toast("error", "Correo No Verificado", errorMessage);
        }
      });
    };
    const components = {
      OtpCard: _sfc_main$2,
      VerifiedCard
    };
    const eventHandler = (event) => {
      if (event.action === "verify-email") {
        verifyEmail(event == null ? void 0 : event.code);
      }
      if (event.action === "email-verified") {
        useRouter$1().push({ name: "login", params: { email } });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Logo = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "verify-email-main-container" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Logo, {
        width: "200",
        class: "mx-auto"
      }, null, _parent));
      _push(`<div class="verify-email-container">`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(components[unref(currentComponent)]), { onEvent: eventHandler }, null), _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/verify-email/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DKJ0i6KI.mjs.map
