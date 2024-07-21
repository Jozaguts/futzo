import { useSSRContext, defineComponent, computed, ref, mergeProps, withCtx, unref, createVNode, isRef, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { V as VAlert } from './VAlert-DP6HnRfZ.mjs';
import { u as useTeamStore } from './useTeamStore-v88rBx6j.mjs';
import { s as storeToRefs, V as VCard, a as VCardItem, b as VCardTitle, c as VCardText } from './server.mjs';
import { V as VContainer } from './VContainer-BlVN2X13.mjs';
import { V as VRow, a as VCol } from './VRow-B-D5uMI5.mjs';
import { V as VTabs, a as VTab, d as VWindow, e as VWindowItem } from './VTabs-CS7OIIzr.mjs';
import './index-pTp1Ji9-.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "no-team-registered-card",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VAlert, mergeProps({
        icon: "mdi-info",
        closable: "",
        type: "info",
        color: "surface"
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-body-1"${_scopeId}>No se encontraron equipos inscritos en tu liga</h1>`);
          } else {
            return [
              createVNode("h1", { class: "text-body-1" }, "No se encontraron equipos inscritos en tu liga")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/no-team-registered-card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const teamStore = storeToRefs(useTeamStore());
    const { teams } = teamStore;
    const noTeams = computed(() => {
      var _a;
      return ((_a = teams.value) == null ? void 0 : _a.length) === 0;
    });
    const tab = ref(1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ fluid: "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(noTeams)) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      class: "text-center"
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
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTabs, {
                            modelValue: unref(tab),
                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(teams), (team) => {
                                  _push5(ssrRenderComponent(VTab, {
                                    value: team.id,
                                    key: team.id
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(team.name)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(team.name), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(teams), (team) => {
                                    return openBlock(), createBlock(VTab, {
                                      value: team.id,
                                      key: team.id
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(team.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VWindow, {
                            modelValue: unref(tab),
                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(teams), (team) => {
                                  _push5(ssrRenderComponent(VWindowItem, {
                                    value: team.id,
                                    key: team.id
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VCard, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VCardItem, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VCardTitle, null, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(team.name)}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(team.name), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(VCardTitle, null, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(team.name), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(VCardText, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(team)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(team), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(VCardItem, null, {
                                                  default: withCtx(() => [
                                                    createVNode(VCardTitle, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(team.name), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(VCardText, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(team), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VCard, null, {
                                            default: withCtx(() => [
                                              createVNode(VCardItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(VCardTitle, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(team.name), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(VCardText, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(team), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(teams), (team) => {
                                    return openBlock(), createBlock(VWindowItem, {
                                      value: team.id,
                                      key: team.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VCard, null, {
                                          default: withCtx(() => [
                                            createVNode(VCardItem, null, {
                                              default: withCtx(() => [
                                                createVNode(VCardTitle, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(team.name), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(VCardText, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(team), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
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
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(teams), (team) => {
                                  return openBlock(), createBlock(VTab, {
                                    value: team.id,
                                    key: team.id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(team.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(VWindow, {
                              modelValue: unref(tab),
                              "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(teams), (team) => {
                                  return openBlock(), createBlock(VWindowItem, {
                                    value: team.id,
                                    key: team.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VCard, null, {
                                        default: withCtx(() => [
                                          createVNode(VCardItem, null, {
                                            default: withCtx(() => [
                                              createVNode(VCardTitle, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(team.name), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(VCardText, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(team), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
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
                      createVNode(VCol, { cols: "12" }, {
                        default: withCtx(() => [
                          createVNode(VTabs, {
                            modelValue: unref(tab),
                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(teams), (team) => {
                                return openBlock(), createBlock(VTab, {
                                  value: team.id,
                                  key: team.id
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(team.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VWindow, {
                            modelValue: unref(tab),
                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(teams), (team) => {
                                return openBlock(), createBlock(VWindowItem, {
                                  value: team.id,
                                  key: team.id
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCard, null, {
                                      default: withCtx(() => [
                                        createVNode(VCardItem, null, {
                                          default: withCtx(() => [
                                            createVNode(VCardTitle, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(team.name), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(VCardText, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(team), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
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
            }
          } else {
            return [
              unref(noTeams) ? (openBlock(), createBlock(VRow, { key: 0 }, {
                default: withCtx(() => [
                  createVNode(VCol, {
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
              })) : (openBlock(), createBlock(VRow, { key: 1 }, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VTabs, {
                        modelValue: unref(tab),
                        "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(teams), (team) => {
                            return openBlock(), createBlock(VTab, {
                              value: team.id,
                              key: team.id
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(team.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VWindow, {
                        modelValue: unref(tab),
                        "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(teams), (team) => {
                            return openBlock(), createBlock(VWindowItem, {
                              value: team.id,
                              key: team.id
                            }, {
                              default: withCtx(() => [
                                createVNode(VCard, null, {
                                  default: withCtx(() => [
                                    createVNode(VCardItem, null, {
                                      default: withCtx(() => [
                                        createVNode(VCardTitle, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(team.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(team), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/equipos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CYjHFDkb.mjs.map
