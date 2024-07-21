import { ref, useSSRContext, defineComponent, reactive, watch, computed, resolveDirective, mergeProps, withCtx, createVNode, unref, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, withDirectives, createCommentVNode, isRef } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList } from 'vue/server-renderer';
import { j as defineStore, s as storeToRefs, m as useTournamentStore, i as useSanctumClient, k as VSelect, l as VChip, n as useAuthStore, o as onBeforeRouteLeave, e as VBtn, p as VIcon, _ as _export_sfc, V as VCard } from './server.mjs';
import { V as VRow, a as VCol } from './VRow-B-D5uMI5.mjs';
import { V as VSheet } from './VSheet-CZRJSEtw.mjs';
import { u as useTeamStore } from './useTeamStore-v88rBx6j.mjs';
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
import './index-pTp1Ji9-.mjs';

const useScheduleStore = defineStore("scheduleStore", () => {
  const schedules = ref([]);
  const scheduleParams = ref({ leagueId: null, tournamentId: null });
  const daysToPlay = ref([
    { days: ["lunes", "martes", "mi\xE9rcoles", "jueves", "viernes", "s\xE1bado", "domingo"], key: "all-days", text: "Toda la semana" },
    { days: ["viernes", "s\xE1bado", "domingo"], key: "weekend-days", text: "Viernes | S\xE1bado | Domingo" },
    { days: ["s\xE1bado", "domingo"], key: "weekend", text: "S\xE1bado | Domingo" },
    { days: ["domingo"], key: "sunday", text: "Domingo" },
    { days: [], key: "other", text: "Otro" }
  ]);
  const daysToPlaySelected = ref();
  const daysToPlayCustomSelected = ref();
  const fetchSchedules = async () => {
    const client = useSanctumClient();
    schedules.value = await client("/api/v1/admin/schedules");
  };
  const generateSchedule = async (params) => {
    const client = useSanctumClient();
    await client("/api/v1/admin/schedules", {
      method: "POST",
      body: JSON.stringify(params)
    });
  };
  return {
    schedules,
    daysToPlay,
    scheduleParams,
    daysToPlayCustomSelected,
    daysToPlaySelected,
    fetchSchedules,
    generateSchedule
  };
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "custom-days-select-component",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean },
    cols: {}
  },
  setup(__props) {
    const { schedules, daysToPlaySelected, daysToPlayCustomSelected } = storeToRefs(useScheduleStore());
    const daysOfTheWeek = [
      { name: "Lunes", value: "lunes" },
      { name: "Martes", value: "martes" },
      { name: "Mi\xE9rcoles", value: "mi\xE9rcoles" },
      { name: "Jueves", value: "jueves" },
      { name: "Viernes", value: "viernes" },
      { name: "S\xE1bado", value: "s\xE1bado" },
      { name: "Domingo", value: "domingo" }
    ];
    watch(() => daysToPlayCustomSelected.value, (newValue) => {
      daysToPlaySelected.value = { days: newValue, key: "other", text: "Otro" };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCol, mergeProps({
        cols: "12",
        md: _ctx.cols,
        lg: _ctx.cols
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.show) {
              _push2(ssrRenderComponent(VSelect, {
                multiple: "",
                items: daysOfTheWeek,
                modelValue: unref(daysToPlayCustomSelected),
                "onUpdate:modelValue": ($event) => isRef(daysToPlayCustomSelected) ? daysToPlayCustomSelected.value = $event : null,
                "item-title": "name",
                clearable: "",
                label: "Selecciona los dias de juego"
              }, {
                selection: withCtx(({ item, index }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (index < 2) {
                      _push3(ssrRenderComponent(VChip, null, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span${_scopeId3}>${ssrInterpolate(item.title)}</span>`);
                          } else {
                            return [
                              createVNode("span", null, toDisplayString(item.title), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (index === 2) {
                      _push3(`<span class="text-grey text-caption align-self-center"${_scopeId2}> (+${ssrInterpolate(unref(daysToPlayCustomSelected).length - 2)} otros) </span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      index < 2 ? (openBlock(), createBlock(VChip, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode("span", null, toDisplayString(item.title), 1)
                        ]),
                        _: 2
                      }, 1024)) : createCommentVNode("", true),
                      index === 2 ? (openBlock(), createBlock("span", {
                        key: 1,
                        class: "text-grey text-caption align-self-center"
                      }, " (+" + toDisplayString(unref(daysToPlayCustomSelected).length - 2) + " otros) ", 1)) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              _ctx.show ? (openBlock(), createBlock(VSelect, {
                key: 0,
                multiple: "",
                items: daysOfTheWeek,
                modelValue: unref(daysToPlayCustomSelected),
                "onUpdate:modelValue": ($event) => isRef(daysToPlayCustomSelected) ? daysToPlayCustomSelected.value = $event : null,
                "item-title": "name",
                clearable: "",
                label: "Selecciona los dias de juego"
              }, {
                selection: withCtx(({ item, index }) => [
                  index < 2 ? (openBlock(), createBlock(VChip, { key: 0 }, {
                    default: withCtx(() => [
                      createVNode("span", null, toDisplayString(item.title), 1)
                    ]),
                    _: 2
                  }, 1024)) : createCommentVNode("", true),
                  index === 2 ? (openBlock(), createBlock("span", {
                    key: 1,
                    class: "text-grey text-caption align-self-center"
                  }, " (+" + toDisplayString(unref(daysToPlayCustomSelected).length - 2) + " otros) ", 1)) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/calendario/custom-days-select-component.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const useLeaguesStore = defineStore("leaguesStore", () => {
  const leagues = ref([]);
  const footballTypes = ref([]);
  const fetchLeagues = async () => {
    const client = useSanctumClient();
    leagues.value = await client("/api/v1/admin/leagues");
  };
  const getFootballTypes = async () => {
    const client = useSanctumClient();
    footballTypes.value = await client("/api/v1/admin/leagues/football/types");
  };
  return {
    leagues,
    getFootballTypes,
    fetchLeagues,
    footballTypes
  };
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "selects-section",
  __ssrInlineRender: true,
  setup(__props) {
    const { tournaments } = storeToRefs(useTournamentStore());
    const { leagues } = storeToRefs(useLeaguesStore());
    const { isSuperAdmin } = storeToRefs(useAuthStore());
    const { scheduleParams, schedules, daysToPlay, daysToPlaySelected } = storeToRefs(useScheduleStore());
    const loadingTournaments = ref(false);
    watch(() => scheduleParams.value.leagueId, async (newValue) => {
      if (newValue) {
        try {
          loadingTournaments.value = true;
          scheduleParams.value.tournamentId = null;
          await useTournamentStore().fetchTournamentsByLeagueId(newValue);
        } catch (e) {
          console.error(e);
        } finally {
          scheduleParams.value.tournamentId = null;
          loadingTournaments.value = false;
        }
      }
    });
    onBeforeRouteLeave((to, from, next) => {
      if (to.name !== "calendario") {
        scheduleParams.value.tournamentId = null;
      }
      next();
    });
    watch(() => leagues.value, async (newValue) => {
      if (!isSuperAdmin.value && newValue.length) {
        scheduleParams.value.leagueId = newValue[0].id;
      }
    });
    const numberOfColumns = computed(() => {
      return showCustomDaysSelect.value ? 6 : 4;
    });
    const showCustomDaysSelect = computed(() => {
      var _a;
      return ((_a = daysToPlaySelected.value) == null ? void 0 : _a.key) === "other" && !!scheduleParams.value.tournamentId;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(ssrRenderComponent(VRow, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              md: unref(numberOfColumns),
              lg: unref(numberOfColumns)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VSelect, {
                    disabled: !unref(isSuperAdmin),
                    label: "Selecciona una liga",
                    modelValue: unref(scheduleParams).leagueId,
                    "onUpdate:modelValue": ($event) => unref(scheduleParams).leagueId = $event,
                    "item-value": "id",
                    "item-title": "name",
                    variant: "outlined",
                    items: unref(leagues)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VSelect, {
                      disabled: !unref(isSuperAdmin),
                      label: "Selecciona una liga",
                      modelValue: unref(scheduleParams).leagueId,
                      "onUpdate:modelValue": ($event) => unref(scheduleParams).leagueId = $event,
                      "item-value": "id",
                      "item-title": "name",
                      variant: "outlined",
                      items: unref(leagues)
                    }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue", "items"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              md: unref(numberOfColumns),
              lg: unref(numberOfColumns)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VSelect, {
                    modelValue: unref(scheduleParams).tournamentId,
                    "onUpdate:modelValue": ($event) => unref(scheduleParams).tournamentId = $event,
                    label: "Selecciona un torneo",
                    "item-value": "id",
                    "item-title": "name",
                    variant: "outlined",
                    items: unref(tournaments),
                    loading: unref(loadingTournaments),
                    "no-data-text": "No existen torneos para esta liga",
                    clearable: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VSelect, {
                      modelValue: unref(scheduleParams).tournamentId,
                      "onUpdate:modelValue": ($event) => unref(scheduleParams).tournamentId = $event,
                      label: "Selecciona un torneo",
                      "item-value": "id",
                      "item-title": "name",
                      variant: "outlined",
                      items: unref(tournaments),
                      loading: unref(loadingTournaments),
                      "no-data-text": "No existen torneos para esta liga",
                      clearable: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, mergeProps({
              cols: "12",
              md: unref(numberOfColumns),
              lg: unref(numberOfColumns)
            }, ssrGetDirectiveProps(_ctx, _directive_auto_animate)), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(scheduleParams).tournamentId) {
                    _push3(ssrRenderComponent(VSelect, {
                      label: "Dias de juego",
                      placeholder: "Selecciona los dias de juego",
                      modelValue: unref(daysToPlaySelected),
                      "onUpdate:modelValue": ($event) => isRef(daysToPlaySelected) ? daysToPlaySelected.value = $event : null,
                      items: unref(daysToPlay),
                      "return-object": "",
                      "item-title": "text"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(scheduleParams).tournamentId ? (openBlock(), createBlock(VSelect, {
                      key: 0,
                      label: "Dias de juego",
                      placeholder: "Selecciona los dias de juego",
                      modelValue: unref(daysToPlaySelected),
                      "onUpdate:modelValue": ($event) => isRef(daysToPlaySelected) ? daysToPlaySelected.value = $event : null,
                      items: unref(daysToPlay),
                      "return-object": "",
                      "item-title": "text"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              cols: unref(numberOfColumns),
              show: unref(showCustomDaysSelect)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, {
                cols: "12",
                md: unref(numberOfColumns),
                lg: unref(numberOfColumns)
              }, {
                default: withCtx(() => [
                  createVNode(VSelect, {
                    disabled: !unref(isSuperAdmin),
                    label: "Selecciona una liga",
                    modelValue: unref(scheduleParams).leagueId,
                    "onUpdate:modelValue": ($event) => unref(scheduleParams).leagueId = $event,
                    "item-value": "id",
                    "item-title": "name",
                    variant: "outlined",
                    items: unref(leagues)
                  }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue", "items"])
                ]),
                _: 1
              }, 8, ["md", "lg"]),
              createVNode(VCol, {
                cols: "12",
                md: unref(numberOfColumns),
                lg: unref(numberOfColumns)
              }, {
                default: withCtx(() => [
                  createVNode(VSelect, {
                    modelValue: unref(scheduleParams).tournamentId,
                    "onUpdate:modelValue": ($event) => unref(scheduleParams).tournamentId = $event,
                    label: "Selecciona un torneo",
                    "item-value": "id",
                    "item-title": "name",
                    variant: "outlined",
                    items: unref(tournaments),
                    loading: unref(loadingTournaments),
                    "no-data-text": "No existen torneos para esta liga",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading"])
                ]),
                _: 1
              }, 8, ["md", "lg"]),
              withDirectives((openBlock(), createBlock(VCol, {
                cols: "12",
                md: unref(numberOfColumns),
                lg: unref(numberOfColumns)
              }, {
                default: withCtx(() => [
                  unref(scheduleParams).tournamentId ? (openBlock(), createBlock(VSelect, {
                    key: 0,
                    label: "Dias de juego",
                    placeholder: "Selecciona los dias de juego",
                    modelValue: unref(daysToPlaySelected),
                    "onUpdate:modelValue": ($event) => isRef(daysToPlaySelected) ? daysToPlaySelected.value = $event : null,
                    items: unref(daysToPlay),
                    "return-object": "",
                    "item-title": "text"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["md", "lg"])), [
                [_directive_auto_animate]
              ]),
              createVNode(_sfc_main$4, {
                cols: unref(numberOfColumns),
                show: unref(showCustomDaysSelect)
              }, null, 8, ["cols", "show"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/calendario/selects-section.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "number-of-days-component",
  __ssrInlineRender: true,
  props: {
    name: {},
    value: {},
    size: {},
    maxForDay: { type: Function }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VSheet, mergeProps({
        class: "grid-container",
        color: "transparent",
        width: "130",
        height: "130",
        border: "",
        rounded: "",
        variant: "text"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="text-body-1 grid-container__title text-capitalize" data-v-eb42d546${_scopeId}>${ssrInterpolate(_ctx.name)}</h3><span class="text-h3 grid-container__value mb-1" data-v-eb42d546${_scopeId}>${ssrInterpolate(_ctx.value)}</span>`);
            _push2(ssrRenderComponent(VBtn, {
              class: "grid-container__plus-btn",
              disabled: _ctx.maxForDay(_ctx.value) === 0,
              onClick: ($event) => _ctx.$emit("plus", _ctx.name),
              width: _ctx.size,
              height: _ctx.size,
              size: "small",
              small: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VIcon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`mdi-plus`);
                      } else {
                        return [
                          createTextVNode("mdi-plus")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VIcon, null, {
                      default: withCtx(() => [
                        createTextVNode("mdi-plus")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VBtn, {
              class: "grid-container__minus-btn",
              onClick: ($event) => _ctx.$emit("minus", _ctx.name),
              width: _ctx.size,
              height: _ctx.size,
              size: "small",
              small: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VIcon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`mdi-minus`);
                      } else {
                        return [
                          createTextVNode("mdi-minus")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VIcon, null, {
                      default: withCtx(() => [
                        createTextVNode("mdi-minus")
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
              createVNode("h3", { class: "text-body-1 grid-container__title text-capitalize" }, toDisplayString(_ctx.name), 1),
              createVNode("span", { class: "text-h3 grid-container__value mb-1" }, toDisplayString(_ctx.value), 1),
              createVNode(VBtn, {
                class: "grid-container__plus-btn",
                disabled: _ctx.maxForDay(_ctx.value) === 0,
                onClick: ($event) => _ctx.$emit("plus", _ctx.name),
                width: _ctx.size,
                height: _ctx.size,
                size: "small",
                small: ""
              }, {
                default: withCtx(() => [
                  createVNode(VIcon, null, {
                    default: withCtx(() => [
                      createTextVNode("mdi-plus")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "onClick", "width", "height"]),
              createVNode(VBtn, {
                class: "grid-container__minus-btn",
                onClick: ($event) => _ctx.$emit("minus", _ctx.name),
                width: _ctx.size,
                height: _ctx.size,
                size: "small",
                small: ""
              }, {
                default: withCtx(() => [
                  createVNode(VIcon, null, {
                    default: withCtx(() => [
                      createTextVNode("mdi-minus")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["onClick", "width", "height"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/calendario/number-of-days-component.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const NumberOfDaysComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-eb42d546"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "days-to-play-form",
  __ssrInlineRender: true,
  setup(__props) {
    const { matchesByRound } = storeToRefs(useTournamentStore());
    storeToRefs(useTeamStore());
    const daysToPlayToCols = ref([]);
    const gamesAlreadyTaken = computed(() => {
      return daysToPlayToCols.value.reduce((acc, day) => Number(acc) + Number(day.value), 0);
    });
    computed(() => {
      return matchesByRound.value - gamesAlreadyTaken.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VRow, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` eliminar days-to-play-form `);
                      } else {
                        return [
                          createTextVNode(" eliminar days-to-play-form ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createTextVNode(" eliminar days-to-play-form ")
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
              createVNode(VCol, { cols: "6" }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createTextVNode(" eliminar days-to-play-form ")
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/calendario/days-to-play-form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "calendario",
  __ssrInlineRender: true,
  setup(__props) {
    storeToRefs(useLeaguesStore());
    ref(1);
    ref(false);
    const { daysToPlaySelected } = storeToRefs(useScheduleStore());
    storeToRefs(useTeamStore());
    const { matchesByRound, teamsCount } = storeToRefs(useTournamentStore());
    const schedule = reactive({
      league_id: null,
      tournament_id: null,
      days_to_play: null,
      days: []
    });
    watch(() => daysToPlaySelected.value, (newValue, oldValue) => {
      if ((oldValue == null ? void 0 : oldValue.key) === "other") {
        schedule.days = [];
      }
      schedule.days = newValue.days.map((day) => ({ name: day, value: 0 }));
    });
    const addGameToDay = (day) => {
      day.value = day.value + 1;
    };
    const removeGameToDay = (day) => {
      if (day.value > 0) {
        day.value = day.value - 1;
      }
    };
    const gamesAlreadyTaken = computed(() => {
      return schedule.days.reduce((acc, day) => Number(acc) + Number(day.value), 0);
    });
    const remainingGames = computed(() => {
      return Math.floor(matchesByRound.value - gamesAlreadyTaken.value);
    });
    const maxForDay = (day) => {
      return Math.floor(matchesByRound.value) - gamesAlreadyTaken.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(ssrRenderComponent(VSheet, mergeProps({
        elevation: "20",
        "max-width": "800px",
        class: "mx-auto py-6 px-8"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VContainer, { fluid: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<p class="text-body-1 text-bold text-disabled text-capitalize font-weight-bold"${_scopeId4}>partidos por jornada</p>`);
                            } else {
                              return [
                                createVNode("p", { class: "text-body-1 text-bold text-disabled text-capitalize font-weight-bold" }, "partidos por jornada")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode("p", { class: "text-body-1 text-bold text-disabled text-capitalize font-weight-bold" }, "partidos por jornada")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(unref(teamsCount))} `);
                  if (unref(schedule).days.length) {
                    _push3(ssrRenderComponent(VRow, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 400 }), {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(schedule).days, (day) => {
                            _push4(ssrRenderComponent(VCol, {
                              cols: 6,
                              lg: "3",
                              md: "3"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(NumberOfDaysComponent, {
                                    onPlus: ($event) => addGameToDay(day),
                                    onMinus: ($event) => removeGameToDay(day),
                                    name: day.name,
                                    value: day.value,
                                    size: 40,
                                    maxForDay
                                  }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(NumberOfDaysComponent, {
                                      onPlus: ($event) => addGameToDay(day),
                                      onMinus: ($event) => removeGameToDay(day),
                                      name: day.name,
                                      value: day.value,
                                      size: 40,
                                      maxForDay
                                    }, null, 8, ["onPlus", "onMinus", "name", "value"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]--> ${ssrInterpolate(unref(remainingGames))} ${ssrInterpolate(unref(matchesByRound))}`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(schedule).days, (day) => {
                              return openBlock(), createBlock(VCol, {
                                cols: 6,
                                lg: "3",
                                md: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode(NumberOfDaysComponent, {
                                    onPlus: ($event) => addGameToDay(day),
                                    onMinus: ($event) => removeGameToDay(day),
                                    name: day.name,
                                    value: day.value,
                                    size: 40,
                                    maxForDay
                                  }, null, 8, ["onPlus", "onMinus", "name", "value"])
                                ]),
                                _: 2
                              }, 1024);
                            }), 256)),
                            createTextVNode(" " + toDisplayString(unref(remainingGames)) + " " + toDisplayString(unref(matchesByRound)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VContainer, { fluid: "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VRow, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VRow)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VContainer, { fluid: "" }, {
                                  default: withCtx(() => [
                                    createVNode(VRow)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, { cols: "10" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VContainer, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VRow, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VCol, {
                                            cols: "12",
                                            md: "6",
                                            lg: "6"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VCol, {
                                              cols: "12",
                                              md: "6",
                                              lg: "6"
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_sfc_main$1, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VRow, null, {
                                        default: withCtx(() => [
                                          createVNode(VCol, {
                                            cols: "12",
                                            md: "6",
                                            lg: "6"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VContainer, null, {
                                  default: withCtx(() => [
                                    createVNode(VRow, null, {
                                      default: withCtx(() => [
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6",
                                          lg: "6"
                                        })
                                      ]),
                                      _: 1
                                    }),
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
                          createVNode(VCol, { cols: "2" }, {
                            default: withCtx(() => [
                              createVNode(VContainer, { fluid: "" }, {
                                default: withCtx(() => [
                                  createVNode(VRow)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "10" }, {
                            default: withCtx(() => [
                              createVNode(VContainer, null, {
                                default: withCtx(() => [
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6",
                                        lg: "6"
                                      })
                                    ]),
                                    _: 1
                                  }),
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
                    createVNode(_sfc_main$3),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, null, {
                          default: withCtx(() => [
                            createVNode("p", { class: "text-body-1 text-bold text-disabled text-capitalize font-weight-bold" }, "partidos por jornada")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createTextVNode(" " + toDisplayString(unref(teamsCount)) + " ", 1),
                    unref(schedule).days.length ? withDirectives((openBlock(), createBlock(VRow, { key: 0 }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(schedule).days, (day) => {
                          return openBlock(), createBlock(VCol, {
                            cols: 6,
                            lg: "3",
                            md: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode(NumberOfDaysComponent, {
                                onPlus: ($event) => addGameToDay(day),
                                onMinus: ($event) => removeGameToDay(day),
                                name: day.name,
                                value: day.value,
                                size: 40,
                                maxForDay
                              }, null, 8, ["onPlus", "onMinus", "name", "value"])
                            ]),
                            _: 2
                          }, 1024);
                        }), 256)),
                        createTextVNode(" " + toDisplayString(unref(remainingGames)) + " " + toDisplayString(unref(matchesByRound)), 1)
                      ]),
                      _: 1
                    })), [
                      [_directive_auto_animate, { duration: 400 }]
                    ]) : createCommentVNode("", true),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "2" }, {
                          default: withCtx(() => [
                            createVNode(VContainer, { fluid: "" }, {
                              default: withCtx(() => [
                                createVNode(VRow)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, { cols: "10" }, {
                          default: withCtx(() => [
                            createVNode(VContainer, null, {
                              default: withCtx(() => [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6",
                                      lg: "6"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_sfc_main$1)
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
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VContainer, { fluid: "" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode("p", { class: "text-body-1 text-bold text-disabled text-capitalize font-weight-bold" }, "partidos por jornada")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createTextVNode(" " + toDisplayString(unref(teamsCount)) + " ", 1),
                  unref(schedule).days.length ? withDirectives((openBlock(), createBlock(VRow, { key: 0 }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(schedule).days, (day) => {
                        return openBlock(), createBlock(VCol, {
                          cols: 6,
                          lg: "3",
                          md: "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(NumberOfDaysComponent, {
                              onPlus: ($event) => addGameToDay(day),
                              onMinus: ($event) => removeGameToDay(day),
                              name: day.name,
                              value: day.value,
                              size: 40,
                              maxForDay
                            }, null, 8, ["onPlus", "onMinus", "name", "value"])
                          ]),
                          _: 2
                        }, 1024);
                      }), 256)),
                      createTextVNode(" " + toDisplayString(unref(remainingGames)) + " " + toDisplayString(unref(matchesByRound)), 1)
                    ]),
                    _: 1
                  })), [
                    [_directive_auto_animate, { duration: 400 }]
                  ]) : createCommentVNode("", true),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "2" }, {
                        default: withCtx(() => [
                          createVNode(VContainer, { fluid: "" }, {
                            default: withCtx(() => [
                              createVNode(VRow)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "10" }, {
                        default: withCtx(() => [
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6",
                                    lg: "6"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_sfc_main$1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/calendario.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=calendario-B8EuI2yE.mjs.map
