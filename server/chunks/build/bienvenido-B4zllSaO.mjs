import { _ as _sfc_main$3 } from './Logo-C2r9fRFb.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, createVNode, resolveDynamicComponent, unref, withCtx, isRef, createTextVNode, withModifiers } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import { g as useGlobalStore, V as VCard, b as VCardItem, c as VCardTitle, d as VCardText, e as VTextField, h as useSanctumAuth, i as useRouter$1, _ as __nuxt_component_1$1, f as _export_sfc, j as useSanctumClient, k as useToast } from './server.mjs';
import { V as VForm } from './VForm-CU_3-Bq2.mjs';
import { V as VBtn } from './VBtn-sH8DNEZb.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "create-league",
  __ssrInlineRender: true,
  setup(__props) {
    const leagueName = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(ssrRenderComponent(VCard, mergeProps({ class: "welcome-card" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardItem, { class: "d-flex align-center justify-center pt-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "d-flex justify-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="icon-container"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_Icon, { name: "futzo-icon:trophy-01" }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "icon-container" }, [
                            createVNode(_component_Icon, { name: "futzo-icon:trophy-01" })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardTitle, { class: "welcome-card__subtitle" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span${_scopeId3}> Vamos a crear tu primer liga</span>`);
                      } else {
                        return [
                          createVNode("span", null, " Vamos a crear tu primer liga")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "d-flex justify-center" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "icon-container" }, [
                          createVNode(_component_Icon, { name: "futzo-icon:trophy-01" })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCardTitle, { class: "welcome-card__subtitle" }, {
                      default: withCtx(() => [
                        createVNode("span", null, " Vamos a crear tu primer liga")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, { class: "w-100 d-flex flex-column align-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VForm, {
                    class: "w-100",
                    onSubmit: ($event) => _ctx.$emit("event", { action: "create-league", params: { leagueName: unref(leagueName) } }),
                    "fast-fail": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<label for="league"${_scopeId3}> Nombra tu liga </label>`);
                        _push4(ssrRenderComponent(VTextField, {
                          rules: [
                            (value) => {
                              if (value.length > 5) return true;
                              return "El nombre debe tener al menos 6 caracteres.";
                            }
                          ],
                          modelValue: unref(leagueName),
                          "onUpdate:modelValue": ($event) => isRef(leagueName) ? leagueName.value = $event : null,
                          variant: "outlined",
                          placeholder: "P. ej. Liga Vallarta",
                          width: "100%",
                          class: "create-league-input",
                          density: "compact"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          class: "ml-auto mb-5 create-league-btn",
                          color: "primary",
                          variant: "elevated",
                          size: "x-large",
                          density: "compact",
                          block: "",
                          type: "submit",
                          disabled: unref(leagueName).length < 5
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Crear liga `);
                            } else {
                              return [
                                createTextVNode(" Crear liga ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("label", { for: "league" }, " Nombra tu liga "),
                          createVNode(VTextField, {
                            rules: [
                              (value) => {
                                if (value.length > 5) return true;
                                return "El nombre debe tener al menos 6 caracteres.";
                              }
                            ],
                            modelValue: unref(leagueName),
                            "onUpdate:modelValue": ($event) => isRef(leagueName) ? leagueName.value = $event : null,
                            variant: "outlined",
                            placeholder: "P. ej. Liga Vallarta",
                            width: "100%",
                            class: "create-league-input",
                            density: "compact"
                          }, null, 8, ["rules", "modelValue", "onUpdate:modelValue"]),
                          createVNode(VBtn, {
                            class: "ml-auto mb-5 create-league-btn",
                            color: "primary",
                            variant: "elevated",
                            size: "x-large",
                            density: "compact",
                            block: "",
                            type: "submit",
                            disabled: unref(leagueName).length < 5
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Crear liga ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VForm, {
                      class: "w-100",
                      onSubmit: withModifiers(($event) => _ctx.$emit("event", { action: "create-league", params: { leagueName: unref(leagueName) } }), ["prevent"]),
                      "fast-fail": ""
                    }, {
                      default: withCtx(() => [
                        createVNode("label", { for: "league" }, " Nombra tu liga "),
                        createVNode(VTextField, {
                          rules: [
                            (value) => {
                              if (value.length > 5) return true;
                              return "El nombre debe tener al menos 6 caracteres.";
                            }
                          ],
                          modelValue: unref(leagueName),
                          "onUpdate:modelValue": ($event) => isRef(leagueName) ? leagueName.value = $event : null,
                          variant: "outlined",
                          placeholder: "P. ej. Liga Vallarta",
                          width: "100%",
                          class: "create-league-input",
                          density: "compact"
                        }, null, 8, ["rules", "modelValue", "onUpdate:modelValue"]),
                        createVNode(VBtn, {
                          class: "ml-auto mb-5 create-league-btn",
                          color: "primary",
                          variant: "elevated",
                          size: "x-large",
                          density: "compact",
                          block: "",
                          type: "submit",
                          disabled: unref(leagueName).length < 5
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Crear liga ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
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
              createVNode(VCardItem, { class: "d-flex align-center justify-center pt-0" }, {
                default: withCtx(() => [
                  createVNode(VCardTitle, { class: "d-flex justify-center" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "icon-container" }, [
                        createVNode(_component_Icon, { name: "futzo-icon:trophy-01" })
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCardTitle, { class: "welcome-card__subtitle" }, {
                    default: withCtx(() => [
                      createVNode("span", null, " Vamos a crear tu primer liga")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCardText, { class: "w-100 d-flex flex-column align-center" }, {
                default: withCtx(() => [
                  createVNode(VForm, {
                    class: "w-100",
                    onSubmit: withModifiers(($event) => _ctx.$emit("event", { action: "create-league", params: { leagueName: unref(leagueName) } }), ["prevent"]),
                    "fast-fail": ""
                  }, {
                    default: withCtx(() => [
                      createVNode("label", { for: "league" }, " Nombra tu liga "),
                      createVNode(VTextField, {
                        rules: [
                          (value) => {
                            if (value.length > 5) return true;
                            return "El nombre debe tener al menos 6 caracteres.";
                          }
                        ],
                        modelValue: unref(leagueName),
                        "onUpdate:modelValue": ($event) => isRef(leagueName) ? leagueName.value = $event : null,
                        variant: "outlined",
                        placeholder: "P. ej. Liga Vallarta",
                        width: "100%",
                        class: "create-league-input",
                        density: "compact"
                      }, null, 8, ["rules", "modelValue", "onUpdate:modelValue"]),
                      createVNode(VBtn, {
                        class: "ml-auto mb-5 create-league-btn",
                        color: "primary",
                        variant: "elevated",
                        size: "x-large",
                        density: "compact",
                        block: "",
                        type: "submit",
                        disabled: unref(leagueName).length < 5
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Crear liga ")
                        ]),
                        _: 1
                      }, 8, ["disabled"])
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/bienvenido/cards/create-league.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Icon = __nuxt_component_1$1;
  _push(ssrRenderComponent(VCard, mergeProps({
    class: "welcome-card",
    width: "490"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCardItem, { class: "d-flex align-center justify-center pt-0" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCardTitle, { class: "d-flex justify-center" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_Icon, {
                      class: "check-verified-green",
                      name: "futzo-icon:check-verified-green"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        class: "check-verified-green",
                        name: "futzo-icon:check-verified-green"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardTitle, { class: "welcome-card__subtitle" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<span${_scopeId3}>Tu liga ha sido creada</span><p class="welcome-card__subtitle__"${_scopeId3}> Ya puedes empezar a planificar tu liga. </p>`);
                  } else {
                    return [
                      createVNode("span", null, "Tu liga ha sido creada"),
                      createVNode("p", { class: "welcome-card__subtitle__" }, " Ya puedes empezar a planificar tu liga. ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCardTitle, { class: "d-flex justify-center" }, {
                  default: withCtx(() => [
                    createVNode(_component_Icon, {
                      class: "check-verified-green",
                      name: "futzo-icon:check-verified-green"
                    })
                  ]),
                  _: 1
                }),
                createVNode(VCardTitle, { class: "welcome-card__subtitle" }, {
                  default: withCtx(() => [
                    createVNode("span", null, "Tu liga ha sido creada"),
                    createVNode("p", { class: "welcome-card__subtitle__" }, " Ya puedes empezar a planificar tu liga. ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VCardText, { class: "w-100 d-flex flex-column align-center" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VForm, {
                class: "w-100",
                onSubmit: ($event) => _ctx.$emit("event", { action: "league-created" }),
                "fast-fail": ""
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VBtn, {
                      class: "ml-auto create-league-btn",
                      color: "primary",
                      variant: "elevated",
                      size: "x-large",
                      density: "compact",
                      block: "",
                      type: "submit"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(` Empezar `);
                        } else {
                          return [
                            createTextVNode(" Empezar ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VBtn, {
                        class: "ml-auto create-league-btn",
                        color: "primary",
                        variant: "elevated",
                        size: "x-large",
                        density: "compact",
                        block: "",
                        type: "submit"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Empezar ")
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
                  class: "w-100",
                  onSubmit: withModifiers(($event) => _ctx.$emit("event", { action: "league-created" }), ["prevent"]),
                  "fast-fail": ""
                }, {
                  default: withCtx(() => [
                    createVNode(VBtn, {
                      class: "ml-auto create-league-btn",
                      color: "primary",
                      variant: "elevated",
                      size: "x-large",
                      density: "compact",
                      block: "",
                      type: "submit"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Empezar ")
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
          createVNode(VCardItem, { class: "d-flex align-center justify-center pt-0" }, {
            default: withCtx(() => [
              createVNode(VCardTitle, { class: "d-flex justify-center" }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    class: "check-verified-green",
                    name: "futzo-icon:check-verified-green"
                  })
                ]),
                _: 1
              }),
              createVNode(VCardTitle, { class: "welcome-card__subtitle" }, {
                default: withCtx(() => [
                  createVNode("span", null, "Tu liga ha sido creada"),
                  createVNode("p", { class: "welcome-card__subtitle__" }, " Ya puedes empezar a planificar tu liga. ")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VCardText, { class: "w-100 d-flex flex-column align-center" }, {
            default: withCtx(() => [
              createVNode(VForm, {
                class: "w-100",
                onSubmit: withModifiers(($event) => _ctx.$emit("event", { action: "league-created" }), ["prevent"]),
                "fast-fail": ""
              }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    class: "ml-auto create-league-btn",
                    color: "primary",
                    variant: "elevated",
                    size: "x-large",
                    density: "compact",
                    block: "",
                    type: "submit"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Empezar ")
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
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/bienvenido/cards/created-league.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CreatedLeague = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "bienvenido",
  __ssrInlineRender: true,
  setup(__props) {
    useGlobalStore();
    const currentComponent = ref("CreateLeague");
    const initLeague = (name) => {
      useSanctumClient()(`/api/v1/admin/leagues`, {
        credentials: "include",
        method: "POST",
        body: {
          name
        }
      }).then((response) => {
        useToast().toast(
          "success",
          "Liga Registrada",
          "Tu liga ha sido registrada con \xE9xito. \xA1Comienza a jugar!"
        );
        currentComponent.value = "CreatedLeague";
      }).catch((error) => console.error(error)).catch((error) => {
        var _a2;
        var _a;
        useToast().toast(
          "error",
          "Error al Registrar Liga",
          (_a2 = (_a = error == null ? void 0 : error.data) == null ? void 0 : _a.message) != null ? _a2 : "No se pudo registrar la liga. Por favor, intenta nuevamente."
        );
      }).finally(() => {
      });
    };
    const components = {
      CreateLeague: _sfc_main$2,
      CreatedLeague
    };
    const eventHandler = (event) => {
      if (event.action === "create-league") {
        initLeague(event.params.leagueName);
      }
      if (event.action === "league-created") {
        const { refreshIdentity, isAuthenticated } = useSanctumAuth();
        refreshIdentity().catch((error) => console.error(error)).then(() => {
          if (isAuthenticated.value) {
            useRouter$1().push({ name: "index" });
          }
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Logo = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "welcome-main-container" }, _attrs))}><div class="welcome-logo-container">`);
      _push(ssrRenderComponent(_component_Logo, { "max-width": "165" }, null, _parent));
      _push(`</div><div class="welcome-email-container">`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(components[unref(currentComponent)]), { onEvent: eventHandler }, null), _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/bienvenido.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=bienvenido-B4zllSaO.mjs.map