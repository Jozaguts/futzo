import { u as useSchemas } from './useSchemas-DRmKLgdK.mjs';
import { defineComponent, computed, reactive, mergeProps, withCtx, createTextVNode, createVNode, unref, openBlock, createBlock, toDisplayString, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { j as useAuthStore, V as VCard, a as VCardItem, c as VCardText, n as VCardSubtitle, d as VTextField, a5 as VIcon, e as VBtn } from './server.mjs';
import { V as VForm } from './VForm-lymKa9z5.mjs';
import { V as VRow, a as VCol } from './VRow-mjWiXyjQ.mjs';
import 'vee-validate';
import 'yup';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "password-data-card",
  __ssrInlineRender: true,
  setup(__props) {
    const { fields, handleSubmit } = useSchemas("edit-password");
    const user = computed(() => useAuthStore().user);
    const states = reactive({
      showPassword: false,
      showNewPassword: false,
      showNewPasswordConfirmation: false
    });
    const submit = handleSubmit((values) => {
      const updateUserPasswordForm = {
        id: user.value.id,
        password: values.password,
        new_password: values.new_password,
        new_password_confirmation: values.new_password_confirmation
      };
      useAuthStore().updatePassword(updateUserPasswordForm);
    });
    return (_ctx, _push, _parent, _attrs) => {
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
                        _push4(`Contrase\xF1a`);
                      } else {
                        return [
                          createTextVNode("Contrase\xF1a")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardSubtitle, { class: "secondary-card__subtitle" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Por favor ingresa tu contrase\xF1a actual para cambiar su contrase\xF1a.`);
                      } else {
                        return [
                          createTextVNode(" Por favor ingresa tu contrase\xF1a actual para cambiar su contrase\xF1a.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardText, { class: "secondary-card__title" }, {
                      default: withCtx(() => [
                        createTextVNode("Contrase\xF1a")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardSubtitle, { class: "secondary-card__subtitle" }, {
                      default: withCtx(() => [
                        createTextVNode(" Por favor ingresa tu contrase\xF1a actual para cambiar su contrase\xF1a.")
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
                                    _push6(`<p class="label-form"${_scopeId5}>Contrase\xF1a actual</p>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "label-form" }, "Contrase\xF1a actual")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      type: unref(states).showPassword ? "text" : "password",
                                      modelValue: unref(fields).password.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).password.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, {
                                      append: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          if (unref(states).showPassword) {
                                            _push7(ssrRenderComponent(VIcon, {
                                              onClick: ($event) => unref(states).showPassword = !unref(states).showPassword,
                                              class: "icon-password"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` mdi-eye-off-outline`);
                                                } else {
                                                  return [
                                                    createTextVNode(" mdi-eye-off-outline")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            _push7(ssrRenderComponent(VIcon, {
                                              onClick: ($event) => unref(states).showPassword = !unref(states).showPassword,
                                              class: "icon-password"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`mdi-eye-outline`);
                                                } else {
                                                  return [
                                                    createTextVNode("mdi-eye-outline")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          }
                                        } else {
                                          return [
                                            unref(states).showPassword ? (openBlock(), createBlock(VIcon, {
                                              key: 0,
                                              onClick: ($event) => unref(states).showPassword = !unref(states).showPassword,
                                              class: "icon-password"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" mdi-eye-off-outline")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                              key: 1,
                                              onClick: ($event) => unref(states).showPassword = !unref(states).showPassword,
                                              class: "icon-password"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-eye-outline")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"]))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<small class="text-error"${_scopeId5}>${ssrInterpolate(unref(fields).password.fieldPropsValue["error-messages"][0])}</small>`);
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        type: unref(states).showPassword ? "text" : "password",
                                        modelValue: unref(fields).password.fieldValue,
                                        "onUpdate:modelValue": ($event) => unref(fields).password.fieldValue = $event,
                                        variant: "plain",
                                        class: "user-data-configuration-form__input"
                                      }, {
                                        append: withCtx(() => [
                                          unref(states).showPassword ? (openBlock(), createBlock(VIcon, {
                                            key: 0,
                                            onClick: ($event) => unref(states).showPassword = !unref(states).showPassword,
                                            class: "icon-password"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" mdi-eye-off-outline")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                            key: 1,
                                            onClick: ($event) => unref(states).showPassword = !unref(states).showPassword,
                                            class: "icon-password"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-eye-outline")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"]))
                                        ]),
                                        _: 1
                                      }, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                                      createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).password.fieldPropsValue["error-messages"][0]), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "label-form" }, "Contrase\xF1a actual")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      type: unref(states).showPassword ? "text" : "password",
                                      modelValue: unref(fields).password.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).password.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, {
                                      append: withCtx(() => [
                                        unref(states).showPassword ? (openBlock(), createBlock(VIcon, {
                                          key: 0,
                                          onClick: ($event) => unref(states).showPassword = !unref(states).showPassword,
                                          class: "icon-password"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" mdi-eye-off-outline")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                          key: 1,
                                          onClick: ($event) => unref(states).showPassword = !unref(states).showPassword,
                                          class: "icon-password"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-eye-outline")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"]))
                                      ]),
                                      _: 1
                                    }, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                                    createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).password.fieldPropsValue["error-messages"][0]), 1)
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
                                    _push6(`<p class="label-form"${_scopeId5}>Nueva contrase\xF1a</p>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "label-form" }, "Nueva contrase\xF1a")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      type: unref(states).showNewPassword ? "text" : "password",
                                      modelValue: unref(fields).new_password.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).new_password.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, {
                                      append: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          if (unref(states).showNewPassword) {
                                            _push7(ssrRenderComponent(VIcon, {
                                              onClick: ($event) => unref(states).showNewPassword = !unref(states).showNewPassword,
                                              class: "icon-password"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`mdi-eye-off-outline`);
                                                } else {
                                                  return [
                                                    createTextVNode("mdi-eye-off-outline")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            _push7(ssrRenderComponent(VIcon, {
                                              onClick: ($event) => unref(states).showNewPassword = !unref(states).showNewPassword,
                                              class: "icon-password"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`mdi-eye-outline`);
                                                } else {
                                                  return [
                                                    createTextVNode("mdi-eye-outline")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          }
                                        } else {
                                          return [
                                            unref(states).showNewPassword ? (openBlock(), createBlock(VIcon, {
                                              key: 0,
                                              onClick: ($event) => unref(states).showNewPassword = !unref(states).showNewPassword,
                                              class: "icon-password"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-eye-off-outline")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                              key: 1,
                                              onClick: ($event) => unref(states).showNewPassword = !unref(states).showNewPassword,
                                              class: "icon-password"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-eye-outline")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"]))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<small class="text-error"${_scopeId5}>${ssrInterpolate(unref(fields).new_password.fieldPropsValue["error-messages"][0])}</small>`);
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        type: unref(states).showNewPassword ? "text" : "password",
                                        modelValue: unref(fields).new_password.fieldValue,
                                        "onUpdate:modelValue": ($event) => unref(fields).new_password.fieldValue = $event,
                                        variant: "plain",
                                        class: "user-data-configuration-form__input"
                                      }, {
                                        append: withCtx(() => [
                                          unref(states).showNewPassword ? (openBlock(), createBlock(VIcon, {
                                            key: 0,
                                            onClick: ($event) => unref(states).showNewPassword = !unref(states).showNewPassword,
                                            class: "icon-password"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-eye-off-outline")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                            key: 1,
                                            onClick: ($event) => unref(states).showNewPassword = !unref(states).showNewPassword,
                                            class: "icon-password"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-eye-outline")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"]))
                                        ]),
                                        _: 1
                                      }, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                                      createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).new_password.fieldPropsValue["error-messages"][0]), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "label-form" }, "Nueva contrase\xF1a")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      type: unref(states).showNewPassword ? "text" : "password",
                                      modelValue: unref(fields).new_password.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).new_password.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, {
                                      append: withCtx(() => [
                                        unref(states).showNewPassword ? (openBlock(), createBlock(VIcon, {
                                          key: 0,
                                          onClick: ($event) => unref(states).showNewPassword = !unref(states).showNewPassword,
                                          class: "icon-password"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-eye-off-outline")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                          key: 1,
                                          onClick: ($event) => unref(states).showNewPassword = !unref(states).showNewPassword,
                                          class: "icon-password"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-eye-outline")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"]))
                                      ]),
                                      _: 1
                                    }, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                                    createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).new_password.fieldPropsValue["error-messages"][0]), 1)
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
                                    _push6(`<p class="label-form"${_scopeId5}>Confirma tu nueva contrase\xF1a</p>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "label-form" }, "Confirma tu nueva contrase\xF1a")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      type: unref(states).showNewPasswordConfirmation ? "text" : "password",
                                      modelValue: unref(fields).new_password_confirmation.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).new_password_confirmation.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, {
                                      append: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          if (unref(states).showNewPasswordConfirmation) {
                                            _push7(ssrRenderComponent(VIcon, {
                                              onClick: ($event) => unref(states).showNewPasswordConfirmation = !unref(states).showNewPasswordConfirmation,
                                              class: "icon-password"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`mdi-eye-off-outline`);
                                                } else {
                                                  return [
                                                    createTextVNode("mdi-eye-off-outline")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            _push7(ssrRenderComponent(VIcon, {
                                              onClick: ($event) => unref(states).showNewPasswordConfirmation = !unref(states).showNewPasswordConfirmation,
                                              class: "icon-password"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`mdi-eye-outline`);
                                                } else {
                                                  return [
                                                    createTextVNode("mdi-eye-outline")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          }
                                        } else {
                                          return [
                                            unref(states).showNewPasswordConfirmation ? (openBlock(), createBlock(VIcon, {
                                              key: 0,
                                              onClick: ($event) => unref(states).showNewPasswordConfirmation = !unref(states).showNewPasswordConfirmation,
                                              class: "icon-password"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-eye-off-outline")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                              key: 1,
                                              onClick: ($event) => unref(states).showNewPasswordConfirmation = !unref(states).showNewPasswordConfirmation,
                                              class: "icon-password"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-eye-outline")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"]))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<small class="text-error"${_scopeId5}>${ssrInterpolate(unref(fields).new_password_confirmation.fieldPropsValue["error-messages"][0])}</small>`);
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        type: unref(states).showNewPasswordConfirmation ? "text" : "password",
                                        modelValue: unref(fields).new_password_confirmation.fieldValue,
                                        "onUpdate:modelValue": ($event) => unref(fields).new_password_confirmation.fieldValue = $event,
                                        variant: "plain",
                                        class: "user-data-configuration-form__input"
                                      }, {
                                        append: withCtx(() => [
                                          unref(states).showNewPasswordConfirmation ? (openBlock(), createBlock(VIcon, {
                                            key: 0,
                                            onClick: ($event) => unref(states).showNewPasswordConfirmation = !unref(states).showNewPasswordConfirmation,
                                            class: "icon-password"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-eye-off-outline")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                            key: 1,
                                            onClick: ($event) => unref(states).showNewPasswordConfirmation = !unref(states).showNewPasswordConfirmation,
                                            class: "icon-password"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-eye-outline")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"]))
                                        ]),
                                        _: 1
                                      }, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                                      createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).new_password_confirmation.fieldPropsValue["error-messages"][0]), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "label-form" }, "Confirma tu nueva contrase\xF1a")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      type: unref(states).showNewPasswordConfirmation ? "text" : "password",
                                      modelValue: unref(fields).new_password_confirmation.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).new_password_confirmation.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, {
                                      append: withCtx(() => [
                                        unref(states).showNewPasswordConfirmation ? (openBlock(), createBlock(VIcon, {
                                          key: 0,
                                          onClick: ($event) => unref(states).showNewPasswordConfirmation = !unref(states).showNewPasswordConfirmation,
                                          class: "icon-password"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-eye-off-outline")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                          key: 1,
                                          onClick: ($event) => unref(states).showNewPasswordConfirmation = !unref(states).showNewPasswordConfirmation,
                                          class: "icon-password"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-eye-outline")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"]))
                                      ]),
                                      _: 1
                                    }, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                                    createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).new_password_confirmation.fieldPropsValue["error-messages"][0]), 1)
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
                                  createVNode("p", { class: "label-form" }, "Contrase\xF1a actual")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    type: unref(states).showPassword ? "text" : "password",
                                    modelValue: unref(fields).password.fieldValue,
                                    "onUpdate:modelValue": ($event) => unref(fields).password.fieldValue = $event,
                                    variant: "plain",
                                    class: "user-data-configuration-form__input"
                                  }, {
                                    append: withCtx(() => [
                                      unref(states).showPassword ? (openBlock(), createBlock(VIcon, {
                                        key: 0,
                                        onClick: ($event) => unref(states).showPassword = !unref(states).showPassword,
                                        class: "icon-password"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" mdi-eye-off-outline")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                        key: 1,
                                        onClick: ($event) => unref(states).showPassword = !unref(states).showPassword,
                                        class: "icon-password"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-eye-outline")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"]))
                                    ]),
                                    _: 1
                                  }, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                                  createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).password.fieldPropsValue["error-messages"][0]), 1)
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
                                  createVNode("p", { class: "label-form" }, "Nueva contrase\xF1a")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    type: unref(states).showNewPassword ? "text" : "password",
                                    modelValue: unref(fields).new_password.fieldValue,
                                    "onUpdate:modelValue": ($event) => unref(fields).new_password.fieldValue = $event,
                                    variant: "plain",
                                    class: "user-data-configuration-form__input"
                                  }, {
                                    append: withCtx(() => [
                                      unref(states).showNewPassword ? (openBlock(), createBlock(VIcon, {
                                        key: 0,
                                        onClick: ($event) => unref(states).showNewPassword = !unref(states).showNewPassword,
                                        class: "icon-password"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-eye-off-outline")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                        key: 1,
                                        onClick: ($event) => unref(states).showNewPassword = !unref(states).showNewPassword,
                                        class: "icon-password"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-eye-outline")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"]))
                                    ]),
                                    _: 1
                                  }, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                                  createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).new_password.fieldPropsValue["error-messages"][0]), 1)
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
                                  createVNode("p", { class: "label-form" }, "Confirma tu nueva contrase\xF1a")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    type: unref(states).showNewPasswordConfirmation ? "text" : "password",
                                    modelValue: unref(fields).new_password_confirmation.fieldValue,
                                    "onUpdate:modelValue": ($event) => unref(fields).new_password_confirmation.fieldValue = $event,
                                    variant: "plain",
                                    class: "user-data-configuration-form__input"
                                  }, {
                                    append: withCtx(() => [
                                      unref(states).showNewPasswordConfirmation ? (openBlock(), createBlock(VIcon, {
                                        key: 0,
                                        onClick: ($event) => unref(states).showNewPasswordConfirmation = !unref(states).showNewPasswordConfirmation,
                                        class: "icon-password"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-eye-off-outline")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                        key: 1,
                                        onClick: ($event) => unref(states).showNewPasswordConfirmation = !unref(states).showNewPasswordConfirmation,
                                        class: "icon-password"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-eye-outline")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"]))
                                    ]),
                                    _: 1
                                  }, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                                  createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).new_password_confirmation.fieldPropsValue["error-messages"][0]), 1)
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
                                createVNode("p", { class: "label-form" }, "Contrase\xF1a actual")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "4" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  type: unref(states).showPassword ? "text" : "password",
                                  modelValue: unref(fields).password.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).password.fieldValue = $event,
                                  variant: "plain",
                                  class: "user-data-configuration-form__input"
                                }, {
                                  append: withCtx(() => [
                                    unref(states).showPassword ? (openBlock(), createBlock(VIcon, {
                                      key: 0,
                                      onClick: ($event) => unref(states).showPassword = !unref(states).showPassword,
                                      class: "icon-password"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" mdi-eye-off-outline")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                      key: 1,
                                      onClick: ($event) => unref(states).showPassword = !unref(states).showPassword,
                                      class: "icon-password"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-eye-outline")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]))
                                  ]),
                                  _: 1
                                }, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                                createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).password.fieldPropsValue["error-messages"][0]), 1)
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
                                createVNode("p", { class: "label-form" }, "Nueva contrase\xF1a")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "4" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  type: unref(states).showNewPassword ? "text" : "password",
                                  modelValue: unref(fields).new_password.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).new_password.fieldValue = $event,
                                  variant: "plain",
                                  class: "user-data-configuration-form__input"
                                }, {
                                  append: withCtx(() => [
                                    unref(states).showNewPassword ? (openBlock(), createBlock(VIcon, {
                                      key: 0,
                                      onClick: ($event) => unref(states).showNewPassword = !unref(states).showNewPassword,
                                      class: "icon-password"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-eye-off-outline")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                      key: 1,
                                      onClick: ($event) => unref(states).showNewPassword = !unref(states).showNewPassword,
                                      class: "icon-password"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-eye-outline")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]))
                                  ]),
                                  _: 1
                                }, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                                createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).new_password.fieldPropsValue["error-messages"][0]), 1)
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
                                createVNode("p", { class: "label-form" }, "Confirma tu nueva contrase\xF1a")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "4" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  type: unref(states).showNewPasswordConfirmation ? "text" : "password",
                                  modelValue: unref(fields).new_password_confirmation.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).new_password_confirmation.fieldValue = $event,
                                  variant: "plain",
                                  class: "user-data-configuration-form__input"
                                }, {
                                  append: withCtx(() => [
                                    unref(states).showNewPasswordConfirmation ? (openBlock(), createBlock(VIcon, {
                                      key: 0,
                                      onClick: ($event) => unref(states).showNewPasswordConfirmation = !unref(states).showNewPasswordConfirmation,
                                      class: "icon-password"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-eye-off-outline")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                      key: 1,
                                      onClick: ($event) => unref(states).showNewPasswordConfirmation = !unref(states).showNewPasswordConfirmation,
                                      class: "icon-password"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-eye-outline")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]))
                                  ]),
                                  _: 1
                                }, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                                createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).new_password_confirmation.fieldPropsValue["error-messages"][0]), 1)
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
                      createTextVNode("Contrase\xF1a")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardSubtitle, { class: "secondary-card__subtitle" }, {
                    default: withCtx(() => [
                      createTextVNode(" Por favor ingresa tu contrase\xF1a actual para cambiar su contrase\xF1a.")
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
                              createVNode("p", { class: "label-form" }, "Contrase\xF1a actual")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "4" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                type: unref(states).showPassword ? "text" : "password",
                                modelValue: unref(fields).password.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).password.fieldValue = $event,
                                variant: "plain",
                                class: "user-data-configuration-form__input"
                              }, {
                                append: withCtx(() => [
                                  unref(states).showPassword ? (openBlock(), createBlock(VIcon, {
                                    key: 0,
                                    onClick: ($event) => unref(states).showPassword = !unref(states).showPassword,
                                    class: "icon-password"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" mdi-eye-off-outline")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                    key: 1,
                                    onClick: ($event) => unref(states).showPassword = !unref(states).showPassword,
                                    class: "icon-password"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-eye-outline")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]))
                                ]),
                                _: 1
                              }, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                              createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).password.fieldPropsValue["error-messages"][0]), 1)
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
                              createVNode("p", { class: "label-form" }, "Nueva contrase\xF1a")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "4" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                type: unref(states).showNewPassword ? "text" : "password",
                                modelValue: unref(fields).new_password.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).new_password.fieldValue = $event,
                                variant: "plain",
                                class: "user-data-configuration-form__input"
                              }, {
                                append: withCtx(() => [
                                  unref(states).showNewPassword ? (openBlock(), createBlock(VIcon, {
                                    key: 0,
                                    onClick: ($event) => unref(states).showNewPassword = !unref(states).showNewPassword,
                                    class: "icon-password"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-eye-off-outline")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                    key: 1,
                                    onClick: ($event) => unref(states).showNewPassword = !unref(states).showNewPassword,
                                    class: "icon-password"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-eye-outline")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]))
                                ]),
                                _: 1
                              }, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                              createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).new_password.fieldPropsValue["error-messages"][0]), 1)
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
                              createVNode("p", { class: "label-form" }, "Confirma tu nueva contrase\xF1a")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "4" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                type: unref(states).showNewPasswordConfirmation ? "text" : "password",
                                modelValue: unref(fields).new_password_confirmation.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).new_password_confirmation.fieldValue = $event,
                                variant: "plain",
                                class: "user-data-configuration-form__input"
                              }, {
                                append: withCtx(() => [
                                  unref(states).showNewPasswordConfirmation ? (openBlock(), createBlock(VIcon, {
                                    key: 0,
                                    onClick: ($event) => unref(states).showNewPasswordConfirmation = !unref(states).showNewPasswordConfirmation,
                                    class: "icon-password"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-eye-off-outline")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])) : (openBlock(), createBlock(VIcon, {
                                    key: 1,
                                    onClick: ($event) => unref(states).showNewPasswordConfirmation = !unref(states).showNewPasswordConfirmation,
                                    class: "icon-password"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-eye-outline")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]))
                                ]),
                                _: 1
                              }, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                              createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).new_password_confirmation.fieldPropsValue["error-messages"][0]), 1)
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/configuration/password-data-card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=password-data-card-iJwWPZ1G.mjs.map
