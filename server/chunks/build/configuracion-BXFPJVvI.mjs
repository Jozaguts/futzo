import { useSSRContext, defineAsyncComponent, defineComponent, computed, ref, mergeProps, withCtx, createVNode, unref, createTextVNode, toDisplayString, isRef, openBlock, createBlock, withModifiers } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer';
import _sfc_main$3 from './nuxt-icon-D0x-uBOo.mjs';
import { j as useAuthStore, V as VCard, a as VCardItem, b as VCardTitle, n as VCardSubtitle, c as VCardText, s as storeToRefs, k as VProgressCircular, l as VAvatar, m as VImg, e as VBtn, d as VTextField, G as Gl, o as __nuxt_component_1$1 } from './server.mjs';
import { V as VSheet, a as VFileInput, u as useSchemas } from './useSchemas-DRmKLgdK.mjs';
import { V as VForm } from './VForm-lymKa9z5.mjs';
import { V as VRow, a as VCol } from './VRow-mjWiXyjQ.mjs';
import { V as VTabs, a as VTab, b as VTabsWindow, c as VTabsWindowItem } from './VTabs-58Xred3X.mjs';
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
import 'vee-validate';
import 'yup';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "avatar",
  __ssrInlineRender: true,
  setup(__props) {
    const { avatar } = storeToRefs(useAuthStore());
    const imageRef = ref(null);
    const loading = ref(false);
    const eventHandler = (event) => {
      var _a;
      const file = (_a = event.target.files) == null ? void 0 : _a[0];
      if (file) {
        loading.value = true;
        useAuthStore().updateAvatar(file).finally(() => {
          loading.value = false;
        });
      }
    };
    const showInput = () => {
      const input = imageRef.value.$el.querySelector("input");
      input.click();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$3;
      if (unref(loading)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex align-center justify-center fill-height" }, _attrs))}>`);
        _push(ssrRenderComponent(VProgressCircular, {
          color: "grey-lighten-2",
          indeterminate: ""
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "position-relative" }, _attrs))}>`);
        _push(ssrRenderComponent(VAvatar, { size: "64" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VImg, { src: unref(avatar) }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(VImg, { src: unref(avatar) }, null, 8, ["src"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(VBtn, {
          class: "image-plus-avatar__btn",
          icon: "true",
          size: "x-small",
          color: "background",
          width: "28",
          height: "28",
          onClick: showInput
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_nuxt_icon, {
                class: "image-plus-avatar",
                name: "image-plus-avatar",
                filled: ""
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_nuxt_icon, {
                  class: "image-plus-avatar",
                  name: "image-plus-avatar",
                  filled: ""
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(VFileInput, {
          class: "d-none",
          ref_key: "imageRef",
          ref: imageRef,
          onChange: eventHandler
        }, null, _parent));
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/configuration/avatar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "personal-data-card",
  __ssrInlineRender: true,
  setup(__props) {
    const { fields, resetForm, handleSubmit } = useSchemas("edit-user");
    const user = computed(() => useAuthStore().user);
    const submit = handleSubmit((values) => {
      const updateUserForm = {
        id: user.value.id,
        name: values.name,
        phone: values.phone,
        email: values.email
      };
      useAuthStore().updateUser(updateUserForm);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_1$1;
      _push(ssrRenderComponent(VCard, mergeProps({
        class: "secondary-card",
        variant: "text"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardItem, { class: "secondary-card-item" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardText, { class: "secondary-card__title" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Edita tus datos personales`);
                      } else {
                        return [
                          createTextVNode("Edita tus datos personales")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardSubtitle, { class: "secondary-card__subtitle" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Estos son tus datos personales, puedes editarlos debajo.`);
                      } else {
                        return [
                          createTextVNode(" Estos son tus datos personales, puedes editarlos debajo.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardText, { class: "secondary-card__title" }, {
                      default: withCtx(() => [
                        createTextVNode("Edita tus datos personales")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardSubtitle, { class: "secondary-card__subtitle" }, {
                      default: withCtx(() => [
                        createTextVNode(" Estos son tus datos personales, puedes editarlos debajo.")
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
                    class: "user-data-configuration-form",
                    onSubmit: unref(submit)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="label-form"${_scopeId5}>Nombre completo</p>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "label-form" }, "Nombre completo")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: unref(fields).name.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<small class="text-error"${_scopeId5}>${ssrInterpolate(unref(fields).name.fieldPropsValue["error-messages"][0])}</small>`);
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: unref(fields).name.fieldValue,
                                        "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                        variant: "plain",
                                        class: "user-data-configuration-form__input"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).name.fieldPropsValue["error-messages"][0]), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "label-form" }, "Nombre completo")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(fields).name.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).name.fieldPropsValue["error-messages"][0]), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="label-form"${_scopeId5}>Tel\xE9fono</p>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "label-form" }, "Tel\xE9fono")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_client_only, null, {}, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_client_only, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Gl), {
                                            variant: "plain",
                                            singleLine: true,
                                            modelValue: unref(fields).phone.fieldValue,
                                            "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                            class: "user-data-configuration-form__input",
                                            invalidMessage: ({ label, example }) => {
                                              return `${label} debe ser un numero valido (${example}).`;
                                            }
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "invalidMessage"]),
                                          createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
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
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "label-form" }, "Tel\xE9fono")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_client_only, null, {
                                      default: withCtx(() => [
                                        createVNode(unref(Gl), {
                                          variant: "plain",
                                          singleLine: true,
                                          modelValue: unref(fields).phone.fieldValue,
                                          "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                          class: "user-data-configuration-form__input",
                                          invalidMessage: ({ label, example }) => {
                                            return `${label} debe ser un numero valido (${example}).`;
                                          }
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "invalidMessage"]),
                                        createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
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
                        _push4(ssrRenderComponent(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="label-form"${_scopeId5}>Correo electr\xF3nico</p>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "label-form" }, "Correo electr\xF3nico")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      type: "email",
                                      modelValue: unref(fields).email.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<small class="text-error"${_scopeId5}>${ssrInterpolate(unref(fields).email.fieldPropsValue["error-messages"][0])}</small>`);
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        type: "email",
                                        modelValue: unref(fields).email.fieldValue,
                                        "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                        variant: "plain",
                                        class: "user-data-configuration-form__input"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).email.fieldPropsValue["error-messages"][0]), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "label-form" }, "Correo electr\xF3nico")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      type: "email",
                                      modelValue: unref(fields).email.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).email.fieldPropsValue["error-messages"][0]), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "4",
                                offset: "3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="d-flex justify-end align-center pt-4"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(VBtn, {
                                      type: "submit",
                                      class: "user-data-configuration-form__button",
                                      color: "primary",
                                      dark: ""
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Guardar cambios `);
                                        } else {
                                          return [
                                            createTextVNode(" Guardar cambios ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "d-flex justify-end align-center pt-4" }, [
                                        createVNode(VBtn, {
                                          type: "submit",
                                          class: "user-data-configuration-form__button",
                                          color: "primary",
                                          dark: ""
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Guardar cambios ")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "4",
                                  offset: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "d-flex justify-end align-center pt-4" }, [
                                      createVNode(VBtn, {
                                        type: "submit",
                                        class: "user-data-configuration-form__button",
                                        color: "primary",
                                        dark: ""
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Guardar cambios ")
                                        ]),
                                        _: 1
                                      })
                                    ])
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
                          createVNode(VRow, {
                            class: "row-border-bottom",
                            "no-gutters": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "label-form" }, "Nombre completo")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(fields).name.fieldValue,
                                    "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                    variant: "plain",
                                    class: "user-data-configuration-form__input"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).name.fieldPropsValue["error-messages"][0]), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, {
                            class: "row-border-bottom",
                            "no-gutters": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "label-form" }, "Tel\xE9fono")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "4" }, {
                                default: withCtx(() => [
                                  createVNode(_component_client_only, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(Gl), {
                                        variant: "plain",
                                        singleLine: true,
                                        modelValue: unref(fields).phone.fieldValue,
                                        "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                        class: "user-data-configuration-form__input",
                                        invalidMessage: ({ label, example }) => {
                                          return `${label} debe ser un numero valido (${example}).`;
                                        }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "invalidMessage"]),
                                      createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, {
                            class: "row-border-bottom",
                            "no-gutters": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "label-form" }, "Correo electr\xF3nico")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    type: "email",
                                    modelValue: unref(fields).email.fieldValue,
                                    "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                    variant: "plain",
                                    class: "user-data-configuration-form__input"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).email.fieldPropsValue["error-messages"][0]), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "4",
                                offset: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "d-flex justify-end align-center pt-4" }, [
                                    createVNode(VBtn, {
                                      type: "submit",
                                      class: "user-data-configuration-form__button",
                                      color: "primary",
                                      dark: ""
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Guardar cambios ")
                                      ]),
                                      _: 1
                                    })
                                  ])
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
                      class: "user-data-configuration-form",
                      onSubmit: withModifiers(unref(submit), ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createVNode(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "3" }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "label-form" }, "Nombre completo")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "4" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(fields).name.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                  variant: "plain",
                                  class: "user-data-configuration-form__input"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).name.fieldPropsValue["error-messages"][0]), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "3" }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "label-form" }, "Tel\xE9fono")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "4" }, {
                              default: withCtx(() => [
                                createVNode(_component_client_only, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(Gl), {
                                      variant: "plain",
                                      singleLine: true,
                                      modelValue: unref(fields).phone.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                      class: "user-data-configuration-form__input",
                                      invalidMessage: ({ label, example }) => {
                                        return `${label} debe ser un numero valido (${example}).`;
                                      }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "invalidMessage"]),
                                    createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "3" }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "label-form" }, "Correo electr\xF3nico")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "4" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  type: "email",
                                  modelValue: unref(fields).email.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                  variant: "plain",
                                  class: "user-data-configuration-form__input"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).email.fieldPropsValue["error-messages"][0]), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "4",
                              offset: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex justify-end align-center pt-4" }, [
                                  createVNode(VBtn, {
                                    type: "submit",
                                    class: "user-data-configuration-form__button",
                                    color: "primary",
                                    dark: ""
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Guardar cambios ")
                                    ]),
                                    _: 1
                                  })
                                ])
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
              createVNode(VCardItem, { class: "secondary-card-item" }, {
                default: withCtx(() => [
                  createVNode(VCardText, { class: "secondary-card__title" }, {
                    default: withCtx(() => [
                      createTextVNode("Edita tus datos personales")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardSubtitle, { class: "secondary-card__subtitle" }, {
                    default: withCtx(() => [
                      createTextVNode(" Estos son tus datos personales, puedes editarlos debajo.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(VForm, {
                    class: "user-data-configuration-form",
                    onSubmit: withModifiers(unref(submit), ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createVNode(VRow, {
                        class: "row-border-bottom",
                        "no-gutters": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "3" }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "label-form" }, "Nombre completo")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "4" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: unref(fields).name.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                variant: "plain",
                                class: "user-data-configuration-form__input"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).name.fieldPropsValue["error-messages"][0]), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, {
                        class: "row-border-bottom",
                        "no-gutters": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "3" }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "label-form" }, "Tel\xE9fono")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "4" }, {
                            default: withCtx(() => [
                              createVNode(_component_client_only, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Gl), {
                                    variant: "plain",
                                    singleLine: true,
                                    modelValue: unref(fields).phone.fieldValue,
                                    "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                    class: "user-data-configuration-form__input",
                                    invalidMessage: ({ label, example }) => {
                                      return `${label} debe ser un numero valido (${example}).`;
                                    }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalidMessage"]),
                                  createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, {
                        class: "row-border-bottom",
                        "no-gutters": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "3" }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "label-form" }, "Correo electr\xF3nico")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "4" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                type: "email",
                                modelValue: unref(fields).email.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                variant: "plain",
                                class: "user-data-configuration-form__input"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).email.fieldPropsValue["error-messages"][0]), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "4",
                            offset: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex justify-end align-center pt-4" }, [
                                createVNode(VBtn, {
                                  type: "submit",
                                  class: "user-data-configuration-form__button",
                                  color: "primary",
                                  dark: ""
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Guardar cambios ")
                                  ]),
                                  _: 1
                                })
                              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/configuration/personal-data-card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0_lazy = defineAsyncComponent(() => import('./password-data-card-iJwWPZ1G.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "configuracion",
  __ssrInlineRender: true,
  setup(__props) {
    const user = computed(() => useAuthStore().user);
    const tab = ref(1);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_lazy_pages_configuration_password_data_card = __nuxt_component_0_lazy;
      _push(ssrRenderComponent(VSheet, mergeProps({
        height: "100%",
        color: "white",
        class: "pa-10 full-height configuration-v-sheet"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, { variant: "text" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardItem, { class: "mb-12" }, {
                    prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$2)
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, { class: "card-title ml-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a, _b;
                            if (_push5) {
                              _push5(`${ssrInterpolate((_a = unref(user)) == null ? void 0 : _a.name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString((_b = unref(user)) == null ? void 0 : _b.name), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardSubtitle, { class: "card-subtitle ml-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a, _b;
                            if (_push5) {
                              _push5(`${ssrInterpolate((_a = unref(user)) == null ? void 0 : _a.email)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString((_b = unref(user)) == null ? void 0 : _b.email), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardTitle, { class: "card-title ml-2" }, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.name), 1)
                              ];
                            }),
                            _: 1
                          }),
                          createVNode(VCardSubtitle, { class: "card-subtitle ml-2" }, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.email), 1)
                              ];
                            }),
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
                        _push4(ssrRenderComponent(VTabs, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTab, { value: 1 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Datos personales `);
                                  } else {
                                    return [
                                      createTextVNode(" Datos personales ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTab, { value: 2 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Contrase\xF1a `);
                                  } else {
                                    return [
                                      createTextVNode(" Contrase\xF1a ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTab, { value: 1 }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Datos personales ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VTab, { value: 2 }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Contrase\xF1a ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindow, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTabsWindowItem, {
                                value: 1,
                                key: 1
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
                              _push5(ssrRenderComponent(VTabsWindowItem, {
                                value: 2,
                                key: 2
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_lazy_pages_configuration_password_data_card, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_lazy_pages_configuration_password_data_card)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                (openBlock(), createBlock(VTabsWindowItem, {
                                  value: 1,
                                  key: 1
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$1)
                                  ]),
                                  _: 1
                                })),
                                (openBlock(), createBlock(VTabsWindowItem, {
                                  value: 2,
                                  key: 2
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_lazy_pages_configuration_password_data_card)
                                  ]),
                                  _: 1
                                }))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTabs, {
                            modelValue: unref(tab),
                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                          }, {
                            default: withCtx(() => [
                              createVNode(VTab, { value: 1 }, {
                                default: withCtx(() => [
                                  createTextVNode(" Datos personales ")
                                ]),
                                _: 1
                              }),
                              createVNode(VTab, { value: 2 }, {
                                default: withCtx(() => [
                                  createTextVNode(" Contrase\xF1a ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VTabsWindow, {
                            modelValue: unref(tab),
                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(VTabsWindowItem, {
                                value: 1,
                                key: 1
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$1)
                                ]),
                                _: 1
                              })),
                              (openBlock(), createBlock(VTabsWindowItem, {
                                value: 2,
                                key: 2
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_lazy_pages_configuration_password_data_card)
                                ]),
                                _: 1
                              }))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardItem, { class: "mb-12" }, {
                      prepend: withCtx(() => [
                        createVNode(_sfc_main$2)
                      ]),
                      default: withCtx(() => [
                        createVNode(VCardTitle, { class: "card-title ml-2" }, {
                          default: withCtx(() => {
                            var _a;
                            return [
                              createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.name), 1)
                            ];
                          }),
                          _: 1
                        }),
                        createVNode(VCardSubtitle, { class: "card-subtitle ml-2" }, {
                          default: withCtx(() => {
                            var _a;
                            return [
                              createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.email), 1)
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VTabs, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx(() => [
                            createVNode(VTab, { value: 1 }, {
                              default: withCtx(() => [
                                createTextVNode(" Datos personales ")
                              ]),
                              _: 1
                            }),
                            createVNode(VTab, { value: 2 }, {
                              default: withCtx(() => [
                                createTextVNode(" Contrase\xF1a ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VTabsWindow, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(VTabsWindowItem, {
                              value: 1,
                              key: 1
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$1)
                              ]),
                              _: 1
                            })),
                            (openBlock(), createBlock(VTabsWindowItem, {
                              value: 2,
                              key: 2
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_lazy_pages_configuration_password_data_card)
                              ]),
                              _: 1
                            }))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
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
              createVNode(VCard, { variant: "text" }, {
                default: withCtx(() => [
                  createVNode(VCardItem, { class: "mb-12" }, {
                    prepend: withCtx(() => [
                      createVNode(_sfc_main$2)
                    ]),
                    default: withCtx(() => [
                      createVNode(VCardTitle, { class: "card-title ml-2" }, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.name), 1)
                          ];
                        }),
                        _: 1
                      }),
                      createVNode(VCardSubtitle, { class: "card-subtitle ml-2" }, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.email), 1)
                          ];
                        }),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VTabs, {
                        modelValue: unref(tab),
                        "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                      }, {
                        default: withCtx(() => [
                          createVNode(VTab, { value: 1 }, {
                            default: withCtx(() => [
                              createTextVNode(" Datos personales ")
                            ]),
                            _: 1
                          }),
                          createVNode(VTab, { value: 2 }, {
                            default: withCtx(() => [
                              createTextVNode(" Contrase\xF1a ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VTabsWindow, {
                        modelValue: unref(tab),
                        "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(VTabsWindowItem, {
                            value: 1,
                            key: 1
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$1)
                            ]),
                            _: 1
                          })),
                          (openBlock(), createBlock(VTabsWindowItem, {
                            value: 2,
                            key: 2
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_lazy_pages_configuration_password_data_card)
                            ]),
                            _: 1
                          }))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/configuracion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=configuracion-BXFPJVvI.mjs.map
