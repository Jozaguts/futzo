import { computed, createVNode, mergeProps, useSSRContext, defineComponent, ref, unref, withCtx, watch, resolveDirective, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Transition, withDirectives, withModifiers } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrGetDirectiveProps } from 'vue/server-renderer';
import { _ as _sfc_main$4 } from './Logo-CrZVdvyd.mjs';
import _sfc_main$3 from './nuxt-icon-BuDW_oT6.mjs';
import { _ as __nuxt_component_2 } from './nuxt-link-syZZOUo0.mjs';
import { B as propsFactory, ax as makeVInputProps, aw as omit, aQ as makeVCheckboxBtnProps, O as genericComponent, P as useProxiedModel, aA as useFocus, aK as getUid, ah as useRender, aB as filterInputAttrs, aC as VInput, ar as VCheckboxBtn, av as useTheme, e as VBtn, V as VCard, a as VCardItem, b as VCardTitle, v as VCardSubtitle, c as VCardText, au as VDivider, d as VTextField, f as useGlobalStore, i as useSanctumClient, h as useRouter$1, g as useSanctumAuth } from './server.mjs';
import { V as VForm } from './VForm-CVR8aYB2.mjs';
import { V as VRow, a as VCol } from './VRow-B-D5uMI5.mjs';
import { V as VContainer } from './VContainer-BlVN2X13.mjs';
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
const useApiError = (error) => {
  return {
    code: error.response.status,
    message: error.data.message
  };
};
function useAuth() {
  const { showSuccessNotification } = useGlobalStore();
  const showRegisterForm = ref(false);
  const form = ref({
    name: "test",
    email: "test@test.com",
    password: "password",
    password_confirmation: "password",
    remember: false
  });
  const isLoading = ref(false);
  const errorMessage = ref("");
  const showVerificationLink = ref(false);
  async function signIn(email, password, remember) {
    const { login } = useSanctumAuth();
    return await login({ email, password, remember });
  }
  async function signUp(name, email, password, password_confirmation) {
    const client = useSanctumClient();
    return await client("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation
      })
    });
  }
  function signUpHandler() {
    errorMessage.value = "";
    isLoading.value = true;
    signUp(form.value.name, form.value.email, form.value.password, form.value.password_confirmation).then(() => {
      showSuccessNotification({
        message: "Por favor, revisa tu correo y sigue las instrucciones para verificar tu cuenta."
      });
      useRouter$1().push("/verify-email?email=" + form.value.email);
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
  function signInHandler() {
    errorMessage.value = "";
    isLoading.value = true;
    signIn(form.value.email, form.value.password, true).catch((error) => {
      const { code, message } = useApiError(error);
      if (message === "Su direcci\xF3n de correo electr\xF3nico no est\xE1 verificada.") {
        showVerificationLink.value = true;
      }
      errorMessage.value = message;
    }).finally(() => {
      isLoading.value = false;
    });
  }
  const submitHandler = () => {
    if (!showRegisterForm.value) {
      signInHandler();
    } else {
      signUpHandler();
    }
  };
  const showRegisterFormHandler = () => {
    errorMessage.value = "";
    showRegisterForm.value = !showRegisterForm.value;
  };
  return {
    isLoading,
    form,
    showRegisterForm,
    errorMessage,
    showRegisterFormHandler,
    submitHandler
  };
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AuthProvider",
  __ssrInlineRender: true,
  setup(__props) {
    useTheme();
    const authProviders = [
      {
        icon: "google",
        color: "#E7E3FC",
        colorInDark: "#db4437",
        provider: "google"
      },
      {
        icon: "facebook",
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
      const _component_nuxt_icon = _sfc_main$3;
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
              _push2(ssrRenderComponent(_component_nuxt_icon, {
                name: link.icon,
                filled: ""
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_nuxt_icon, {
                  name: link.icon,
                  filled: ""
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/authentication/AuthProvider.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuthForm",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      isLoading,
      form,
      errorMessage,
      showRegisterForm,
      showRegisterFormHandler,
      submitHandler
    } = useAuth();
    const atLest8Characters = ref(false);
    const containSpecialCharacter = ref(false);
    const isPasswordVisible = ref(false);
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const disabledButton = ref(true);
    const validateIsEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };
    watch(
      form,
      (value) => {
        if (value.password) {
          atLest8Characters.value = value.password.length >= 8;
          containSpecialCharacter.value = specialCharacters.test(value.password);
        }
        if (showRegisterForm.value) {
          disabledButton.value = !atLest8Characters.value || !containSpecialCharacter.value;
        } else {
          disabledButton.value = form.value.email === "" || form.value.password === "" || !validateIsEmail(form.value.email);
        }
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Logo = _sfc_main$4;
      const _component_nuxt_icon = _sfc_main$3;
      const _component_nuxt_link = __nuxt_component_2;
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
                        _push4(`${ssrInterpolate(unref(showRegisterForm) ? "Crea tu cuenta" : "Iniciar sesi\xF3n")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(showRegisterForm) ? "Crea tu cuenta" : "Iniciar sesi\xF3n"), 1)
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
                        createTextVNode(toDisplayString(unref(showRegisterForm) ? "Crea tu cuenta" : "Iniciar sesi\xF3n"), 1)
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
                                class: "text-center mt-8"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$2, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$2)
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
                                    _push6(`<span class="mx-4"${_scopeId5}>o</span>`);
                                    _push6(ssrRenderComponent(VDivider, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VDivider),
                                      createVNode("span", { class: "mx-4" }, "o"),
                                      createVNode(VDivider)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(``);
                              if (unref(showRegisterForm)) {
                                _push5(ssrRenderComponent(VCol, {
                                  key: "name",
                                  cols: "12"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<label for="nombre" class="text-caption"${_scopeId5}>Nombre*</label>`);
                                      _push6(ssrRenderComponent(VTextField, {
                                        modelValue: unref(form).name,
                                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                        type: "text",
                                        placeholder: "Escribe tu nombre",
                                        density: "compact"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode("label", {
                                          for: "nombre",
                                          class: "text-caption"
                                        }, "Nombre*"),
                                        createVNode(VTextField, {
                                          modelValue: unref(form).name,
                                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                          type: "text",
                                          placeholder: "Escribe tu nombre",
                                          density: "compact"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(ssrRenderComponent(VCol, { cols: "12" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<label for="correo" class="text-caption"${_scopeId5}>Correo electr\xF3nico*</label>`);
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: unref(form).email,
                                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                      type: "email",
                                      placeholder: "Tu correo@futzo.io",
                                      density: "compact"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("label", {
                                        for: "correo",
                                        class: "text-caption"
                                      }, "Correo electr\xF3nico*"),
                                      createVNode(VTextField, {
                                        modelValue: unref(form).email,
                                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                        type: "email",
                                        placeholder: "Tu correo@futzo.io",
                                        density: "compact"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "12" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<label for="password" class="text-caption"${_scopeId5}>Contrase\xF1a*</label>`);
                                    _push6(ssrRenderComponent(VTextField, {
                                      density: "compact",
                                      placeholder: "Crea una contrase\xF1a",
                                      modelValue: unref(form).password,
                                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                      type: unref(isPasswordVisible) ? "text" : "password",
                                      "append-inner-icon": unref(isPasswordVisible) ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                      "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("label", {
                                        for: "password",
                                        class: "text-caption"
                                      }, "Contrase\xF1a*"),
                                      createVNode(VTextField, {
                                        density: "compact",
                                        placeholder: "Crea una contrase\xF1a",
                                        modelValue: unref(form).password,
                                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                        type: unref(isPasswordVisible) ? "text" : "password",
                                        "append-inner-icon": unref(isPasswordVisible) ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                        "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, mergeProps({ cols: "12" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 600 })), {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (unref(showRegisterForm)) {
                                      _push6(`<div class="d-flex flex-column mb-4"${_scopeId5}><span${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_component_nuxt_icon, {
                                        name: "check-circle",
                                        filled: ""
                                      }, null, _parent6, _scopeId5));
                                      _push6(` Al menos 8 caracteres </span><span${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_component_nuxt_icon, {
                                        name: "check-circle",
                                        filled: ""
                                      }, null, _parent6, _scopeId5));
                                      _push6(` Debe contener un car\xE1cter especial </span></div>`);
                                    } else {
                                      _push6(`<div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(VCheckbox, {
                                        modelValue: unref(form).remember,
                                        "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                        label: "Recu\xE9rdame"
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_nuxt_link, {
                                        class: "text-primary ms-2 mb-1",
                                        href: "javascript:void(0)"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` \xBFOlvidaste tu contrase\xF1a? `);
                                          } else {
                                            return [
                                              createTextVNode(" \xBFOlvidaste tu contrase\xF1a? ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                    }
                                    _push6(ssrRenderComponent(VBtn, {
                                      block: "",
                                      type: "submit",
                                      size: "40",
                                      loading: unref(isLoading),
                                      disabled: unref(isLoading) || unref(disabledButton),
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
                                  } else {
                                    return [
                                      unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "d-flex flex-column mb-4"
                                      }, [
                                        createVNode("span", null, [
                                          createVNode(_component_nuxt_icon, {
                                            name: "check-circle",
                                            filled: ""
                                          }),
                                          createTextVNode(" Al menos 8 caracteres ")
                                        ]),
                                        createVNode("span", null, [
                                          createVNode(_component_nuxt_icon, {
                                            name: "check-circle",
                                            filled: ""
                                          }),
                                          createTextVNode(" Debe contener un car\xE1cter especial ")
                                        ])
                                      ])) : (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                                      }, [
                                        createVNode(VCheckbox, {
                                          modelValue: unref(form).remember,
                                          "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                          label: "Recu\xE9rdame"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(_component_nuxt_link, {
                                          class: "text-primary ms-2 mb-1",
                                          href: "javascript:void(0)"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" \xBFOlvidaste tu contrase\xF1a? ")
                                          ]),
                                          _: 1
                                        })
                                      ])),
                                      createVNode(VBtn, {
                                        block: "",
                                        type: "submit",
                                        size: "40",
                                        loading: unref(isLoading),
                                        disabled: unref(isLoading) || unref(disabledButton),
                                        class: "text-capitalize"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(showRegisterForm) ? "Empezar" : "Iniciar sesi\xF3n"), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["loading", "disabled"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { class: "d-flex align-content-center justify-start py-0" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (unref(errorMessage)) {
                                      _push6(`<small class="text-red pl-2 font-weight-bold"${_scopeId5}> * ${ssrInterpolate(unref(errorMessage))} <span${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_component_nuxt_link, {
                                        class: "text-primary",
                                        to: "/verify-email?email=" + unref(form).email
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Verificar`);
                                          } else {
                                            return [
                                              createTextVNode("Verificar")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</span></small>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                  } else {
                                    return [
                                      unref(errorMessage) ? (openBlock(), createBlock("small", {
                                        key: 0,
                                        class: "text-red pl-2 font-weight-bold"
                                      }, [
                                        createTextVNode(" * " + toDisplayString(unref(errorMessage)) + " ", 1),
                                        createVNode("span", null, [
                                          createVNode(_component_nuxt_link, {
                                            class: "text-primary",
                                            to: "/verify-email?email=" + unref(form).email
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Verificar")
                                            ]),
                                            _: 1
                                          }, 8, ["to"])
                                        ])
                                      ])) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                class: "text-center text-base"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span${_scopeId5}>${ssrInterpolate(unref(showRegisterForm) ? "\xBFYa tienes cuenta?" : "\xBFNo tienes cuenta? ")}</span><a href="#" class="text-primary ms-2"${_scopeId5}>${ssrInterpolate(unref(showRegisterForm) ? "Iniciar sesi\xF3n" : "Crea una cuenta")}</a>`);
                                  } else {
                                    return [
                                      createVNode("span", null, toDisplayString(unref(showRegisterForm) ? "\xBFYa tienes cuenta?" : "\xBFNo tienes cuenta? "), 1),
                                      createVNode("a", {
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
                                  class: "text-center mt-8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$2)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  class: "d-flex align-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VDivider),
                                    createVNode("span", { class: "mx-4" }, "o"),
                                    createVNode(VDivider)
                                  ]),
                                  _: 1
                                }),
                                createVNode(Transition, {
                                  "enter-active-class": "scale-up-vertical-top-enter-active",
                                  "leave-active-class": "scale-down-vertical-center-leave-active",
                                  mode: "out-in"
                                }, {
                                  default: withCtx(() => [
                                    unref(showRegisterForm) ? (openBlock(), createBlock(VCol, {
                                      key: "name",
                                      cols: "12"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("label", {
                                          for: "nombre",
                                          class: "text-caption"
                                        }, "Nombre*"),
                                        createVNode(VTextField, {
                                          modelValue: unref(form).name,
                                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                          type: "text",
                                          placeholder: "Escribe tu nombre",
                                          density: "compact"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode("label", {
                                      for: "correo",
                                      class: "text-caption"
                                    }, "Correo electr\xF3nico*"),
                                    createVNode(VTextField, {
                                      modelValue: unref(form).email,
                                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                      type: "email",
                                      placeholder: "Tu correo@futzo.io",
                                      density: "compact"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode("label", {
                                      for: "password",
                                      class: "text-caption"
                                    }, "Contrase\xF1a*"),
                                    createVNode(VTextField, {
                                      density: "compact",
                                      placeholder: "Crea una contrase\xF1a",
                                      modelValue: unref(form).password,
                                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                      type: unref(isPasswordVisible) ? "text" : "password",
                                      "append-inner-icon": unref(isPasswordVisible) ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                      "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                  ]),
                                  _: 1
                                }),
                                withDirectives((openBlock(), createBlock(VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "d-flex flex-column mb-4"
                                    }, [
                                      createVNode("span", null, [
                                        createVNode(_component_nuxt_icon, {
                                          name: "check-circle",
                                          filled: ""
                                        }),
                                        createTextVNode(" Al menos 8 caracteres ")
                                      ]),
                                      createVNode("span", null, [
                                        createVNode(_component_nuxt_icon, {
                                          name: "check-circle",
                                          filled: ""
                                        }),
                                        createTextVNode(" Debe contener un car\xE1cter especial ")
                                      ])
                                    ])) : (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                                    }, [
                                      createVNode(VCheckbox, {
                                        modelValue: unref(form).remember,
                                        "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                        label: "Recu\xE9rdame"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(_component_nuxt_link, {
                                        class: "text-primary ms-2 mb-1",
                                        href: "javascript:void(0)"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" \xBFOlvidaste tu contrase\xF1a? ")
                                        ]),
                                        _: 1
                                      })
                                    ])),
                                    createVNode(VBtn, {
                                      block: "",
                                      type: "submit",
                                      size: "40",
                                      loading: unref(isLoading),
                                      disabled: unref(isLoading) || unref(disabledButton),
                                      class: "text-capitalize"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(showRegisterForm) ? "Empezar" : "Iniciar sesi\xF3n"), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["loading", "disabled"])
                                  ]),
                                  _: 1
                                })), [
                                  [_directive_auto_animate, { duration: 600 }]
                                ]),
                                createVNode(VCol, { class: "d-flex align-content-center justify-start py-0" }, {
                                  default: withCtx(() => [
                                    unref(errorMessage) ? (openBlock(), createBlock("small", {
                                      key: 0,
                                      class: "text-red pl-2 font-weight-bold"
                                    }, [
                                      createTextVNode(" * " + toDisplayString(unref(errorMessage)) + " ", 1),
                                      createVNode("span", null, [
                                        createVNode(_component_nuxt_link, {
                                          class: "text-primary",
                                          to: "/verify-email?email=" + unref(form).email
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Verificar")
                                          ]),
                                          _: 1
                                        }, 8, ["to"])
                                      ])
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  class: "text-center text-base"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", null, toDisplayString(unref(showRegisterForm) ? "\xBFYa tienes cuenta?" : "\xBFNo tienes cuenta? "), 1),
                                    createVNode("a", {
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
                                class: "text-center mt-8"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$2)
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                class: "d-flex align-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VDivider),
                                  createVNode("span", { class: "mx-4" }, "o"),
                                  createVNode(VDivider)
                                ]),
                                _: 1
                              }),
                              createVNode(Transition, {
                                "enter-active-class": "scale-up-vertical-top-enter-active",
                                "leave-active-class": "scale-down-vertical-center-leave-active",
                                mode: "out-in"
                              }, {
                                default: withCtx(() => [
                                  unref(showRegisterForm) ? (openBlock(), createBlock(VCol, {
                                    key: "name",
                                    cols: "12"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("label", {
                                        for: "nombre",
                                        class: "text-caption"
                                      }, "Nombre*"),
                                      createVNode(VTextField, {
                                        modelValue: unref(form).name,
                                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                        type: "text",
                                        placeholder: "Escribe tu nombre",
                                        density: "compact"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "12" }, {
                                default: withCtx(() => [
                                  createVNode("label", {
                                    for: "correo",
                                    class: "text-caption"
                                  }, "Correo electr\xF3nico*"),
                                  createVNode(VTextField, {
                                    modelValue: unref(form).email,
                                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                    type: "email",
                                    placeholder: "Tu correo@futzo.io",
                                    density: "compact"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "12" }, {
                                default: withCtx(() => [
                                  createVNode("label", {
                                    for: "password",
                                    class: "text-caption"
                                  }, "Contrase\xF1a*"),
                                  createVNode(VTextField, {
                                    density: "compact",
                                    placeholder: "Crea una contrase\xF1a",
                                    modelValue: unref(form).password,
                                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                    type: unref(isPasswordVisible) ? "text" : "password",
                                    "append-inner-icon": unref(isPasswordVisible) ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                    "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                ]),
                                _: 1
                              }),
                              withDirectives((openBlock(), createBlock(VCol, { cols: "12" }, {
                                default: withCtx(() => [
                                  unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "d-flex flex-column mb-4"
                                  }, [
                                    createVNode("span", null, [
                                      createVNode(_component_nuxt_icon, {
                                        name: "check-circle",
                                        filled: ""
                                      }),
                                      createTextVNode(" Al menos 8 caracteres ")
                                    ]),
                                    createVNode("span", null, [
                                      createVNode(_component_nuxt_icon, {
                                        name: "check-circle",
                                        filled: ""
                                      }),
                                      createTextVNode(" Debe contener un car\xE1cter especial ")
                                    ])
                                  ])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                                  }, [
                                    createVNode(VCheckbox, {
                                      modelValue: unref(form).remember,
                                      "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                      label: "Recu\xE9rdame"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode(_component_nuxt_link, {
                                      class: "text-primary ms-2 mb-1",
                                      href: "javascript:void(0)"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" \xBFOlvidaste tu contrase\xF1a? ")
                                      ]),
                                      _: 1
                                    })
                                  ])),
                                  createVNode(VBtn, {
                                    block: "",
                                    type: "submit",
                                    size: "40",
                                    loading: unref(isLoading),
                                    disabled: unref(isLoading) || unref(disabledButton),
                                    class: "text-capitalize"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(showRegisterForm) ? "Empezar" : "Iniciar sesi\xF3n"), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["loading", "disabled"])
                                ]),
                                _: 1
                              })), [
                                [_directive_auto_animate, { duration: 600 }]
                              ]),
                              createVNode(VCol, { class: "d-flex align-content-center justify-start py-0" }, {
                                default: withCtx(() => [
                                  unref(errorMessage) ? (openBlock(), createBlock("small", {
                                    key: 0,
                                    class: "text-red pl-2 font-weight-bold"
                                  }, [
                                    createTextVNode(" * " + toDisplayString(unref(errorMessage)) + " ", 1),
                                    createVNode("span", null, [
                                      createVNode(_component_nuxt_link, {
                                        class: "text-primary",
                                        to: "/verify-email?email=" + unref(form).email
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Verificar")
                                        ]),
                                        _: 1
                                      }, 8, ["to"])
                                    ])
                                  ])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                class: "text-center text-base"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", null, toDisplayString(unref(showRegisterForm) ? "\xBFYa tienes cuenta?" : "\xBFNo tienes cuenta? "), 1),
                                  createVNode("a", {
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
                              class: "text-center mt-8"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$2)
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              class: "d-flex align-center"
                            }, {
                              default: withCtx(() => [
                                createVNode(VDivider),
                                createVNode("span", { class: "mx-4" }, "o"),
                                createVNode(VDivider)
                              ]),
                              _: 1
                            }),
                            createVNode(Transition, {
                              "enter-active-class": "scale-up-vertical-top-enter-active",
                              "leave-active-class": "scale-down-vertical-center-leave-active",
                              mode: "out-in"
                            }, {
                              default: withCtx(() => [
                                unref(showRegisterForm) ? (openBlock(), createBlock(VCol, {
                                  key: "name",
                                  cols: "12"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("label", {
                                      for: "nombre",
                                      class: "text-caption"
                                    }, "Nombre*"),
                                    createVNode(VTextField, {
                                      modelValue: unref(form).name,
                                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                      type: "text",
                                      placeholder: "Escribe tu nombre",
                                      density: "compact"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode("label", {
                                  for: "correo",
                                  class: "text-caption"
                                }, "Correo electr\xF3nico*"),
                                createVNode(VTextField, {
                                  modelValue: unref(form).email,
                                  "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                  type: "email",
                                  placeholder: "Tu correo@futzo.io",
                                  density: "compact"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode("label", {
                                  for: "password",
                                  class: "text-caption"
                                }, "Contrase\xF1a*"),
                                createVNode(VTextField, {
                                  density: "compact",
                                  placeholder: "Crea una contrase\xF1a",
                                  modelValue: unref(form).password,
                                  "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                  type: unref(isPasswordVisible) ? "text" : "password",
                                  "append-inner-icon": unref(isPasswordVisible) ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                  "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                              ]),
                              _: 1
                            }),
                            withDirectives((openBlock(), createBlock(VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "d-flex flex-column mb-4"
                                }, [
                                  createVNode("span", null, [
                                    createVNode(_component_nuxt_icon, {
                                      name: "check-circle",
                                      filled: ""
                                    }),
                                    createTextVNode(" Al menos 8 caracteres ")
                                  ]),
                                  createVNode("span", null, [
                                    createVNode(_component_nuxt_icon, {
                                      name: "check-circle",
                                      filled: ""
                                    }),
                                    createTextVNode(" Debe contener un car\xE1cter especial ")
                                  ])
                                ])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                                }, [
                                  createVNode(VCheckbox, {
                                    modelValue: unref(form).remember,
                                    "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                    label: "Recu\xE9rdame"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(_component_nuxt_link, {
                                    class: "text-primary ms-2 mb-1",
                                    href: "javascript:void(0)"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" \xBFOlvidaste tu contrase\xF1a? ")
                                    ]),
                                    _: 1
                                  })
                                ])),
                                createVNode(VBtn, {
                                  block: "",
                                  type: "submit",
                                  size: "40",
                                  loading: unref(isLoading),
                                  disabled: unref(isLoading) || unref(disabledButton),
                                  class: "text-capitalize"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(showRegisterForm) ? "Empezar" : "Iniciar sesi\xF3n"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["loading", "disabled"])
                              ]),
                              _: 1
                            })), [
                              [_directive_auto_animate, { duration: 600 }]
                            ]),
                            createVNode(VCol, { class: "d-flex align-content-center justify-start py-0" }, {
                              default: withCtx(() => [
                                unref(errorMessage) ? (openBlock(), createBlock("small", {
                                  key: 0,
                                  class: "text-red pl-2 font-weight-bold"
                                }, [
                                  createTextVNode(" * " + toDisplayString(unref(errorMessage)) + " ", 1),
                                  createVNode("span", null, [
                                    createVNode(_component_nuxt_link, {
                                      class: "text-primary",
                                      to: "/verify-email?email=" + unref(form).email
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Verificar")
                                      ]),
                                      _: 1
                                    }, 8, ["to"])
                                  ])
                                ])) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              class: "text-center text-base"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", null, toDisplayString(unref(showRegisterForm) ? "\xBFYa tienes cuenta?" : "\xBFNo tienes cuenta? "), 1),
                                createVNode("a", {
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
                      createTextVNode(toDisplayString(unref(showRegisterForm) ? "Crea tu cuenta" : "Iniciar sesi\xF3n"), 1)
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
                            class: "text-center mt-8"
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$2)
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            class: "d-flex align-center"
                          }, {
                            default: withCtx(() => [
                              createVNode(VDivider),
                              createVNode("span", { class: "mx-4" }, "o"),
                              createVNode(VDivider)
                            ]),
                            _: 1
                          }),
                          createVNode(Transition, {
                            "enter-active-class": "scale-up-vertical-top-enter-active",
                            "leave-active-class": "scale-down-vertical-center-leave-active",
                            mode: "out-in"
                          }, {
                            default: withCtx(() => [
                              unref(showRegisterForm) ? (openBlock(), createBlock(VCol, {
                                key: "name",
                                cols: "12"
                              }, {
                                default: withCtx(() => [
                                  createVNode("label", {
                                    for: "nombre",
                                    class: "text-caption"
                                  }, "Nombre*"),
                                  createVNode(VTextField, {
                                    modelValue: unref(form).name,
                                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                    type: "text",
                                    placeholder: "Escribe tu nombre",
                                    density: "compact"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode("label", {
                                for: "correo",
                                class: "text-caption"
                              }, "Correo electr\xF3nico*"),
                              createVNode(VTextField, {
                                modelValue: unref(form).email,
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                type: "email",
                                placeholder: "Tu correo@futzo.io",
                                density: "compact"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode("label", {
                                for: "password",
                                class: "text-caption"
                              }, "Contrase\xF1a*"),
                              createVNode(VTextField, {
                                density: "compact",
                                placeholder: "Crea una contrase\xF1a",
                                modelValue: unref(form).password,
                                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                type: unref(isPasswordVisible) ? "text" : "password",
                                "append-inner-icon": unref(isPasswordVisible) ? "mdi-eye-off-outline" : "mdi-eye-outline",
                                "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                            ]),
                            _: 1
                          }),
                          withDirectives((openBlock(), createBlock(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              unref(showRegisterForm) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "d-flex flex-column mb-4"
                              }, [
                                createVNode("span", null, [
                                  createVNode(_component_nuxt_icon, {
                                    name: "check-circle",
                                    filled: ""
                                  }),
                                  createTextVNode(" Al menos 8 caracteres ")
                                ]),
                                createVNode("span", null, [
                                  createVNode(_component_nuxt_icon, {
                                    name: "check-circle",
                                    filled: ""
                                  }),
                                  createTextVNode(" Debe contener un car\xE1cter especial ")
                                ])
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                              }, [
                                createVNode(VCheckbox, {
                                  modelValue: unref(form).remember,
                                  "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                  label: "Recu\xE9rdame"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_nuxt_link, {
                                  class: "text-primary ms-2 mb-1",
                                  href: "javascript:void(0)"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" \xBFOlvidaste tu contrase\xF1a? ")
                                  ]),
                                  _: 1
                                })
                              ])),
                              createVNode(VBtn, {
                                block: "",
                                type: "submit",
                                size: "40",
                                loading: unref(isLoading),
                                disabled: unref(isLoading) || unref(disabledButton),
                                class: "text-capitalize"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(showRegisterForm) ? "Empezar" : "Iniciar sesi\xF3n"), 1)
                                ]),
                                _: 1
                              }, 8, ["loading", "disabled"])
                            ]),
                            _: 1
                          })), [
                            [_directive_auto_animate, { duration: 600 }]
                          ]),
                          createVNode(VCol, { class: "d-flex align-content-center justify-start py-0" }, {
                            default: withCtx(() => [
                              unref(errorMessage) ? (openBlock(), createBlock("small", {
                                key: 0,
                                class: "text-red pl-2 font-weight-bold"
                              }, [
                                createTextVNode(" * " + toDisplayString(unref(errorMessage)) + " ", 1),
                                createVNode("span", null, [
                                  createVNode(_component_nuxt_link, {
                                    class: "text-primary",
                                    to: "/verify-email?email=" + unref(form).email
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Verificar")
                                    ]),
                                    _: 1
                                  }, 8, ["to"])
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            class: "text-center text-base"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", null, toDisplayString(unref(showRegisterForm) ? "\xBFYa tienes cuenta?" : "\xBFNo tienes cuenta? "), 1),
                              createVNode("a", {
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
//# sourceMappingURL=login-CVZbHsL5.mjs.map
