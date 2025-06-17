import { h as useRoute$1, y as useSanctumClient, K as __nuxt_component_0$1, F as VCardText, V as VCard, i as useRouter$1 } from './server.mjs';
import { _ as _sfc_main$2 } from './Logo-D65Z66Oc.mjs';
import { _ as _sfc_main$1 } from './Dialog-BzXGl2GM.mjs';
import { defineComponent, ref, computed, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { e as useTournamentStore, a as useTeamStore } from './useScheduleStore-DBhAIDF3.mjs';
import { _ as _sfc_main$6, a as _sfc_main$3 } from './index-F4o0OShX.mjs';
import { storeToRefs } from 'pinia';
import { V as VContainer } from './VContainer-C0Se5csP.mjs';
import { V as VBtn } from './VBtn-_od1f1mx.mjs';
import { V as VRow, a as VCol } from './VRow-CwLG7ojV.mjs';
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
import 'vue-router';
import '@iconify/vue';
import 'perfect-scrollbar';
import 'deep-pick-omit';
import 'dayjs';
import 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/es.js';
import 'awesome-phonenumber';
import './index-DkcY5wU8.mjs';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './VDialog-BeIjnChI.mjs';
import './VSheet-DVv3ytGE.mjs';
import './useToast-m9XhiEp3.mjs';
import '@vue/reactivity';
import './TransitionSlide-d5qGX2mN.mjs';
import './vue-transitions-gDOXGptb.mjs';
import '@morev/utils';
import './CategoriesSelect-D1ehrnKL.mjs';
import './drag-drop-image-DRFieU2I.mjs';
import './interval-DSlygkzF.mjs';
import './VFileInput-gw90YVbK.mjs';
import './useSchemas-CFMbNxa_.mjs';
import './vee-validate-DglmwfQ_.mjs';
import 'yup';
import './googleSearch-Dzva-T1R.mjs';
import './index-DU0YTrEL.mjs';
import './VAutocomplete-P_wP5bep.mjs';
import './filter-PqGpj4I-.mjs';
import './IndicatorStep-DKaB2dCI.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "inscripcion",
  __ssrInlineRender: true,
  setup(__props) {
    const { tournament } = storeToRefs(useTournamentStore());
    const { steps } = storeToRefs(useTeamStore());
    const registeredTeam = ref(false);
    const teamRequest = ref();
    const tournamentId = useRoute$1().query.tournament;
    useSanctumClient()("/api/v1/admin/tournaments/" + tournamentId, {
      method: "GET"
    }).then(async (data) => {
      var _a;
      const leagueId = (_a = data == null ? void 0 : data.league) == null ? void 0 : _a.id;
      if (leagueId) {
        await useTournamentStore().fetchTournamentsByLeagueId(leagueId);
        tournament.value = data;
      } else {
        console.error("League ID is not available in the tournament data.");
      }
    });
    const registeredTeamHandler = async (value) => {
      registeredTeam.value = true;
      teamRequest.value = value;
    };
    const finisHandler = () => {
      registeredTeam.value = false;
      useRouter$1().push({ name: "login" });
    };
    const tournamentReady = computed(() => {
      return tournament.value && tournament.value.league && tournament.value.league.name;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$1;
      const _component_Logo = _sfc_main$2;
      const _component_Dialog = _sfc_main$1;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_client_only, null, {}, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Dialog, {
              loading: false,
              "model-value": unref(registeredTeam),
              title: "Equipo registrado con \xE9xito",
              subtitle: "El equipo ha sido creado y la solicitud de registro fue enviada correctamente.",
              "icon-name": "game-icons:babyfoot-players"
            }, {
              "v-card-text": withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                class: "text-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="text-body-2"${_scopeId5}> Actualmente se encuentra en proceso de revisi\xF3n por parte de la administraci\xF3n del torneo. Una vez aprobada, recibir\xE1s una notificaci\xF3n con los siguientes pasos para continuar con la participaci\xF3n. </p>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "text-body-2" }, " Actualmente se encuentra en proceso de revisi\xF3n por parte de la administraci\xF3n del torneo. Una vez aprobada, recibir\xE1s una notificaci\xF3n con los siguientes pasos para continuar con la participaci\xF3n. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  class: "text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-body-2" }, " Actualmente se encuentra en proceso de revisi\xF3n por parte de la administraci\xF3n del torneo. Una vez aprobada, recibir\xE1s una notificaci\xF3n con los siguientes pasos para continuar con la participaci\xF3n. ")
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
                                class: "text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "text-body-2" }, " Actualmente se encuentra en proceso de revisi\xF3n por parte de la administraci\xF3n del torneo. Una vez aprobada, recibir\xE1s una notificaci\xF3n con los siguientes pasos para continuar con la participaci\xF3n. ")
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
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              class: "text-center"
                            }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "text-body-2" }, " Actualmente se encuentra en proceso de revisi\xF3n por parte de la administraci\xF3n del torneo. Una vez aprobada, recibir\xE1s una notificaci\xF3n con los siguientes pasos para continuar con la participaci\xF3n. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    class: "futzo-button ml-auto",
                    onClick: finisHandler,
                    loading: false,
                    variant: "flat"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Terminar `);
                      } else {
                        return [
                          createTextVNode(" Terminar ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      class: "futzo-button ml-auto",
                      onClick: finisHandler,
                      loading: false,
                      variant: "flat"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Terminar ")
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
              createVNode(_component_client_only, null, {
                default: withCtx(() => [
                  unref(tournamentReady) ? (openBlock(), createBlock(VRow, { key: 0 }, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "6",
                        "offset-md": "3",
                        "offset-lg": "3"
                      }, {
                        default: withCtx(() => {
                          var _a, _b, _c;
                          return [
                            createVNode("div", { class: "d-flex align-center" }, [
                              createVNode("div", null, [
                                createVNode(_component_Logo, { "max-width": "140" }),
                                createVNode("div", null, [
                                  createVNode("span", { class: "text-body-2 font-weight-bold" }, " Pre inscripci\xF3n de equipos "),
                                  createTextVNode(" | "),
                                  createVNode("span", { class: "text-body-2 font-weight-bold" }, toDisplayString((_b = (_a = unref(tournament)) == null ? void 0 : _a.league) == null ? void 0 : _b.name), 1),
                                  createTextVNode(" | "),
                                  createVNode("span", { class: "text-body-2 font-weight-bold" }, toDisplayString((_c = unref(tournament)) == null ? void 0 : _c.name), 1)
                                ])
                              ])
                            ])
                          ];
                        }),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        "offset-md": "3",
                        md: "6",
                        "offset-lg": "3",
                        lg: "6",
                        class: "text-center"
                      }, {
                        default: withCtx(() => {
                          var _a, _b;
                          return [
                            createVNode(VCard, {
                              class: "create-tournament-card futzo-rounded",
                              style: { overflow: ((_b = (_a = _ctx.$vuetify) == null ? void 0 : _a.display) == null ? void 0 : _b.mobile) ? "" : "hidden" }
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$6),
                                createVNode(_sfc_main$3, {
                                  step: unref(steps).current,
                                  onRegisteredTeam: registeredTeamHandler
                                }, null, 8, ["step"])
                              ]),
                              _: 1
                            }, 8, ["style"])
                          ];
                        }),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(_component_Dialog, {
                loading: false,
                "model-value": unref(registeredTeam),
                title: "Equipo registrado con \xE9xito",
                subtitle: "El equipo ha sido creado y la solicitud de registro fue enviada correctamente.",
                "icon-name": "game-icons:babyfoot-players"
              }, {
                "v-card-text": withCtx(() => [
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "text-body-2" }, " Actualmente se encuentra en proceso de revisi\xF3n por parte de la administraci\xF3n del torneo. Una vez aprobada, recibir\xE1s una notificaci\xF3n con los siguientes pasos para continuar con la participaci\xF3n. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                actions: withCtx(() => [
                  createVNode(VBtn, {
                    class: "futzo-button ml-auto",
                    onClick: finisHandler,
                    loading: false,
                    variant: "flat"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Terminar ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model-value"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/torneos/[torneo]/inscripcion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=inscripcion-q5Hbx8GT.mjs.map
