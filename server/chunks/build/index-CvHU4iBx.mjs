import { _ as _sfc_main$a } from './Dialog-BzXGl2GM.mjs';
import { defineComponent, ref, computed, mergeProps, unref, isRef, withCtx, createTextVNode, toDisplayString, createVNode, useModel, createBlock, createCommentVNode, openBlock, resolveDirective, withDirectives, watch, Fragment, renderList, mergeModels, watchEffect, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './TransitionSlide-d5qGX2mN.mjs';
import { ae as useAutoAnimate, af as VSelect, aH as VChip, K as __nuxt_component_0$1, C as VTextField, aP as VChipGroup, A as VList, B as VListItem, D as VListItemTitle, q as VIcon, c5 as VListItemSubtitle, V as VCard, e as VCardTitle, E as VCardSubtitle, F as VCardText } from './server.mjs';
import { _ as _sfc_main$b } from './BaseCalendarInput-D8pdf43z.mjs';
import { _ as __nuxt_component_0$2 } from './index-DkcY5wU8.mjs';
import { j as useScheduleStore, c as useApiError, e as useTournamentStore, d as useLocationStore } from './useScheduleStore-DBhAIDF3.mjs';
import { storeToRefs } from 'pinia';
import { u as useDebounceFn } from './index-DU0YTrEL.mjs';
import { u as useSchemas } from './useSchemas-CFMbNxa_.mjs';
import { V as VContainer } from './VContainer-C0Se5csP.mjs';
import { V as VRow, a as VCol } from './VRow-CwLG7ojV.mjs';
import { V as VTooltip } from './VTooltip-BQZt6HQd.mjs';
import { V as VSpacer } from './VSpacer-DPtFzEIu.mjs';
import { b as VSwitch, V as VStepperVertical, a as VStepperVerticalItem } from './VStepperVertical-BelP9G9C.mjs';
import { V as VBtn } from './VBtn-_od1f1mx.mjs';
import { I as IndicatorStep } from './IndicatorStep-DKaB2dCI.mjs';
import { u as useToast } from './useToast-m9XhiEp3.mjs';
import './VDialog-BeIjnChI.mjs';
import './VSheet-DVv3ytGE.mjs';
import './vue-transitions-gDOXGptb.mjs';
import '@morev/utils';
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
import './main-BplioMC0.mjs';
import 'date-fns';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import '@vue/reactivity';
import './vee-validate-DglmwfQ_.mjs';
import 'yup';
import './VWindowItem-DPPZL2sh.mjs';

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "SelectLocation",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    multiple: {
      type: Boolean,
      default: true
    },
    chips: {
      type: Boolean,
      default: true
    },
    closableChips: {
      type: Boolean,
      default: true
    },
    locations: {
      type: Array,
      default: () => []
    }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const search = ref("");
    const { locations } = storeToRefs(useLocationStore());
    const { scheduleStoreRequest } = storeToRefs(useTournamentStore());
    const searchHandler = useDebounceFn((place) => {
      useLocationStore().getLocations(place);
    }, 500);
    watchEffect(() => {
      if (search.value.length > 2) {
        searchHandler(search.value);
      }
    });
    computed(() => {
      var _a;
      return (_a = locations.value) != null ? _a : [];
    });
    const model = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$2;
      _push(ssrRenderComponent(VSelect, mergeProps({
        modelValue: model.value,
        "onUpdate:modelValue": [($event) => model.value = $event, ($event) => _ctx.$emit("update:modelValue", $event)],
        "max-width": "400px",
        items: props.locations,
        multiple: true,
        chips: props.chips,
        "closable-chips": props.closableChips,
        "item-title": "name",
        "item-value": "id",
        "return-object": ""
      }, _attrs), {
        "prepend-item": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="select-search"${_scopeId}>`);
            _push2(ssrRenderComponent(VTextField, {
              "prepend-inner-icon": "mdi-magnify",
              variant: "plain",
              class: "search-input",
              modelValue: unref(search),
              "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
              placeholder: "Buscar ubicaci\xF3n"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="create-location"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "futzo-icon:black-plus",
              size: "24"
            }, null, _parent2, _scopeId));
            _push2(`<span class="create-location__text"${_scopeId}>Crear nueva ubicaci\xF3n</span></div></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "select-search" }, [
                  createVNode(VTextField, {
                    "prepend-inner-icon": "mdi-magnify",
                    variant: "plain",
                    class: "search-input",
                    modelValue: unref(search),
                    "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                    placeholder: "Buscar ubicaci\xF3n"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "create-location" }, [
                  createVNode(_component_Icon, {
                    name: "futzo-icon:black-plus",
                    size: "24"
                  }),
                  createVNode("span", { class: "create-location__text" }, "Crear nueva ubicaci\xF3n")
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendario/SelectLocation.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "01-general",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const [parent] = useAutoAnimate();
    const { setValues, fields, meta, validate } = useSchemas(
      "calendar-general-step"
    );
    const { tournament } = storeToRefs(useTournamentStore());
    const { scheduleSettings, scheduleStoreRequest } = storeToRefs(useScheduleStore());
    const locationHandler = (value) => {
      if (value) {
        const locations = value.map((location) => ({
          id: location.id,
          name: location.name
        }));
        setValues({ locations });
        scheduleStoreRequest.value.general.locations = locations;
      }
    };
    const isValid = computed(() => {
      return meta.value.valid;
    });
    __expose({
      isValid,
      validate
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$1;
      const _component_BaseCalendarInput = _sfc_main$b;
      const _component_Icon = __nuxt_component_0$2;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "container" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1"${_scopeId3}> Nombre del torneo </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Nombre del torneo ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VSelect, mergeProps({
                          density: "compact",
                          "item-value": "id",
                          "item-title": "name",
                          items: [unref(tournament)],
                          "return-object": "",
                          disabled: "",
                          variant: "outlined",
                          modelValue: unref(fields).tournament_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                        }, unref(fields).tournament_id.fieldPropsValue), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSelect, mergeProps({
                            density: "compact",
                            "item-value": "id",
                            "item-title": "name",
                            items: [unref(tournament)],
                            "return-object": "",
                            disabled: "",
                            variant: "outlined",
                            modelValue: unref(fields).tournament_id.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                          }, unref(fields).tournament_id.fieldPropsValue), null, 16, ["items", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, " Nombre del torneo ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VSelect, mergeProps({
                          density: "compact",
                          "item-value": "id",
                          "item-title": "name",
                          items: [unref(tournament)],
                          "return-object": "",
                          disabled: "",
                          variant: "outlined",
                          modelValue: unref(fields).tournament_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                        }, unref(fields).tournament_id.fieldPropsValue), null, 16, ["items", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1"${_scopeId3}>Formato del torneo </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, "Formato del torneo ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b, _c, _d;
                      if (_push4) {
                        _push4(ssrRenderComponent(VSelect, mergeProps({
                          density: "compact",
                          "item-value": "id",
                          "item-title": "name",
                          items: [unref(scheduleSettings).format],
                          "return-object": "",
                          disabled: "",
                          variant: "outlined",
                          modelValue: unref(fields).tournament_format_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).tournament_format_id.fieldValue = $event
                        }, unref(fields).tournament_format_id.fieldPropsValue), null, _parent4, _scopeId3));
                        _push4(`<p class="ml-2 text-caption text-medium-emphasis"${_scopeId3}>${ssrInterpolate((_b = (_a = unref(scheduleSettings)) == null ? void 0 : _a.format) == null ? void 0 : _b.description)}</p>`);
                      } else {
                        return [
                          createVNode(VSelect, mergeProps({
                            density: "compact",
                            "item-value": "id",
                            "item-title": "name",
                            items: [unref(scheduleSettings).format],
                            "return-object": "",
                            disabled: "",
                            variant: "outlined",
                            modelValue: unref(fields).tournament_format_id.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).tournament_format_id.fieldValue = $event
                          }, unref(fields).tournament_format_id.fieldPropsValue), null, 16, ["items", "modelValue", "onUpdate:modelValue"]),
                          createVNode("p", { class: "ml-2 text-caption text-medium-emphasis" }, toDisplayString((_d = (_c = unref(scheduleSettings)) == null ? void 0 : _c.format) == null ? void 0 : _d.description), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, "Formato del torneo ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => {
                        var _a, _b;
                        return [
                          createVNode(VSelect, mergeProps({
                            density: "compact",
                            "item-value": "id",
                            "item-title": "name",
                            items: [unref(scheduleSettings).format],
                            "return-object": "",
                            disabled: "",
                            variant: "outlined",
                            modelValue: unref(fields).tournament_format_id.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).tournament_format_id.fieldValue = $event
                          }, unref(fields).tournament_format_id.fieldPropsValue), null, 16, ["items", "modelValue", "onUpdate:modelValue"]),
                          createVNode("p", { class: "ml-2 text-caption text-medium-emphasis" }, toDisplayString((_b = (_a = unref(scheduleSettings)) == null ? void 0 : _a.format) == null ? void 0 : _b.description), 1)
                        ];
                      }),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1"${_scopeId3}>Estilo</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, "Estilo")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b;
                      if (_push4) {
                        _push4(ssrRenderComponent(VSelect, mergeProps({
                          density: "compact",
                          "item-value": "id",
                          "item-title": "name",
                          items: [unref(scheduleSettings).footballType],
                          "return-object": "",
                          disabled: "",
                          variant: "outlined",
                          modelValue: unref(fields).football_type_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).football_type_id.fieldValue = $event
                        }, unref(fields).football_type_id.fieldPropsValue), null, _parent4, _scopeId3));
                        _push4(`<p class="ml-2 text-caption text-medium-emphasis"${_scopeId3}>${ssrInterpolate((_a = unref(scheduleSettings)) == null ? void 0 : _a.footballType.description)}</p>`);
                      } else {
                        return [
                          createVNode(VSelect, mergeProps({
                            density: "compact",
                            "item-value": "id",
                            "item-title": "name",
                            items: [unref(scheduleSettings).footballType],
                            "return-object": "",
                            disabled: "",
                            variant: "outlined",
                            modelValue: unref(fields).football_type_id.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).football_type_id.fieldValue = $event
                          }, unref(fields).football_type_id.fieldPropsValue), null, 16, ["items", "modelValue", "onUpdate:modelValue"]),
                          createVNode("p", { class: "ml-2 text-caption text-medium-emphasis" }, toDisplayString((_b = unref(scheduleSettings)) == null ? void 0 : _b.footballType.description), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, "Estilo")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createVNode(VSelect, mergeProps({
                            density: "compact",
                            "item-value": "id",
                            "item-title": "name",
                            items: [unref(scheduleSettings).footballType],
                            "return-object": "",
                            disabled: "",
                            variant: "outlined",
                            modelValue: unref(fields).football_type_id.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).football_type_id.fieldValue = $event
                          }, unref(fields).football_type_id.fieldPropsValue), null, 16, ["items", "modelValue", "onUpdate:modelValue"]),
                          createVNode("p", { class: "ml-2 text-caption text-medium-emphasis" }, toDisplayString((_a = unref(scheduleSettings)) == null ? void 0 : _a.footballType.description), 1)
                        ];
                      }),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1 d-block"${_scopeId3}>Total de equipos registrados:</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1 d-block" }, "Total de equipos registrados:")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p class="text-body-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VChip, {
                          color: "primary",
                          readonly: "",
                          variant: "outlined"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(scheduleSettings).teams)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(scheduleSettings).teams), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</p>`);
                      } else {
                        return [
                          createVNode("p", { class: "text-body-1" }, [
                            createVNode(VChip, {
                              color: "primary",
                              readonly: "",
                              variant: "outlined"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(scheduleSettings).teams), 1)
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1 d-block" }, "Total de equipos registrados:")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", { class: "text-body-1" }, [
                          createVNode(VChip, {
                            color: "primary",
                            readonly: "",
                            variant: "outlined"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(scheduleSettings).teams), 1)
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1"${_scopeId3}> Fecha de inicio del torneo* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Fecha de inicio del torneo* ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8",
                    ref_key: "parent",
                    ref: parent
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_client_only, null, {}, _parent4, _scopeId3));
                        if (unref(fields).start_date.fieldPropsValue["error-messages"]) {
                          _push4(`<small class="text-error text-caption"${_scopeId3}>${ssrInterpolate(unref(fields).start_date.fieldPropsValue["error-messages"][0])}</small>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(_component_client_only, null, {
                            default: withCtx(() => [
                              createVNode(_component_BaseCalendarInput, {
                                onStart_date_updated: (value) => unref(scheduleStoreRequest).general.start_date = value,
                                start_date: unref(fields).start_date.fieldValue,
                                "onUpdate:start_date": ($event) => unref(fields).start_date.fieldValue = $event,
                                multiCalendar: false
                              }, null, 8, ["onStart_date_updated", "start_date", "onUpdate:start_date"])
                            ]),
                            _: 1
                          }),
                          unref(fields).start_date.fieldPropsValue["error-messages"] ? (openBlock(), createBlock("small", {
                            key: 0,
                            class: "text-error text-caption"
                          }, toDisplayString(unref(fields).start_date.fieldPropsValue["error-messages"][0]), 1)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, " Fecha de inicio del torneo* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8",
                      ref_key: "parent",
                      ref: parent
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_client_only, null, {
                          default: withCtx(() => [
                            createVNode(_component_BaseCalendarInput, {
                              onStart_date_updated: (value) => unref(scheduleStoreRequest).general.start_date = value,
                              start_date: unref(fields).start_date.fieldValue,
                              "onUpdate:start_date": ($event) => unref(fields).start_date.fieldValue = $event,
                              multiCalendar: false
                            }, null, 8, ["onStart_date_updated", "start_date", "onUpdate:start_date"])
                          ]),
                          _: 1
                        }),
                        unref(fields).start_date.fieldPropsValue["error-messages"] ? (openBlock(), createBlock("small", {
                          key: 0,
                          class: "text-error text-caption"
                        }, toDisplayString(unref(fields).start_date.fieldPropsValue["error-messages"][0]), 1)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 512)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1"${_scopeId3}> Duraci\xF3n del partido* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Duraci\xF3n del partido* ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          type: "number",
                          variant: "outlined",
                          density: "compact",
                          min: 0,
                          "onUpdate:modelValue": [
                            (value) => unref(scheduleStoreRequest).general.game_time = value,
                            ($event) => unref(fields).game_time.fieldValue = $event
                          ],
                          modelValue: unref(fields).game_time.fieldValue
                        }, unref(fields).game_time.fieldPropsValue), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            type: "number",
                            variant: "outlined",
                            density: "compact",
                            min: 0,
                            "onUpdate:modelValue": [
                              (value) => unref(scheduleStoreRequest).general.game_time = value,
                              ($event) => unref(fields).game_time.fieldValue = $event
                            ],
                            modelValue: unref(fields).game_time.fieldValue
                          }, unref(fields).game_time.fieldPropsValue), null, 16, ["onUpdate:modelValue", "modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, " Duraci\xF3n del partido* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, mergeProps({
                          type: "number",
                          variant: "outlined",
                          density: "compact",
                          min: 0,
                          "onUpdate:modelValue": [
                            (value) => unref(scheduleStoreRequest).general.game_time = value,
                            ($event) => unref(fields).game_time.fieldValue = $event
                          ],
                          modelValue: unref(fields).game_time.fieldValue
                        }, unref(fields).game_time.fieldPropsValue), null, 16, ["onUpdate:modelValue", "modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1"${_scopeId3}> Tiempo entre partidos* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Tiempo entre partidos* ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          type: "number",
                          variant: "outlined",
                          density: "compact",
                          "onUpdate:modelValue": [
                            (value) => unref(scheduleStoreRequest).general.time_between_games = value,
                            ($event) => unref(fields).time_between_games.fieldValue = $event
                          ],
                          modelValue: unref(fields).time_between_games.fieldValue
                        }, unref(fields).time_between_games.fieldPropsValue, { min: "0" }), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            type: "number",
                            variant: "outlined",
                            density: "compact",
                            "onUpdate:modelValue": [
                              (value) => unref(scheduleStoreRequest).general.time_between_games = value,
                              ($event) => unref(fields).time_between_games.fieldValue = $event
                            ],
                            modelValue: unref(fields).time_between_games.fieldValue
                          }, unref(fields).time_between_games.fieldPropsValue, { min: "0" }), null, 16, ["onUpdate:modelValue", "modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, " Tiempo entre partidos* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, mergeProps({
                          type: "number",
                          variant: "outlined",
                          density: "compact",
                          "onUpdate:modelValue": [
                            (value) => unref(scheduleStoreRequest).general.time_between_games = value,
                            ($event) => unref(fields).time_between_games.fieldValue = $event
                          ],
                          modelValue: unref(fields).time_between_games.fieldValue
                        }, unref(fields).time_between_games.fieldPropsValue, { min: "0" }), null, 16, ["onUpdate:modelValue", "modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1"${_scopeId3}> Ubicaciones* `);
                        _push4(ssrRenderComponent(VTooltip, {
                          text: "Ubicaci\xF3n de los campos de juego",
                          location: "bottom"
                        }, {
                          activator: withCtx(({ props }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Icon, mergeProps(props, { name: "futzo-icon:help-circle" }), null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Icon, mergeProps(props, { name: "futzo-icon:help-circle" }), null, 16)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, [
                            createTextVNode(" Ubicaciones* "),
                            createVNode(VTooltip, {
                              text: "Ubicaci\xF3n de los campos de juego",
                              location: "bottom"
                            }, {
                              activator: withCtx(({ props }) => [
                                createVNode(_component_Icon, mergeProps(props, { name: "futzo-icon:help-circle" }), null, 16)
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$9, {
                          locations: unref(scheduleSettings).locations,
                          modelValue: unref(fields).locations.fieldValue,
                          "onUpdate:modelValue": [($event) => unref(fields).locations.fieldValue = $event, locationHandler]
                        }, null, _parent4, _scopeId3));
                        _push4(`<div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_auto_animate))}${_scopeId3}>`);
                        if (!!unref(fields).locations.fieldPropsValue["error-messages"]) {
                          _push4(`<small class="text-red ml-4"${_scopeId3}>${ssrInterpolate(unref(fields).locations.fieldPropsValue["error-messages"][0])}</small>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode(_sfc_main$9, {
                            locations: unref(scheduleSettings).locations,
                            modelValue: unref(fields).locations.fieldValue,
                            "onUpdate:modelValue": [($event) => unref(fields).locations.fieldValue = $event, locationHandler]
                          }, null, 8, ["locations", "modelValue", "onUpdate:modelValue"]),
                          withDirectives((openBlock(), createBlock("div", null, [
                            !!unref(fields).locations.fieldPropsValue["error-messages"] ? (openBlock(), createBlock("small", {
                              key: 0,
                              class: "text-red ml-4"
                            }, toDisplayString(unref(fields).locations.fieldPropsValue["error-messages"][0]), 1)) : createCommentVNode("", true)
                          ])), [
                            [_directive_auto_animate]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, [
                          createTextVNode(" Ubicaciones* "),
                          createVNode(VTooltip, {
                            text: "Ubicaci\xF3n de los campos de juego",
                            location: "bottom"
                          }, {
                            activator: withCtx(({ props }) => [
                              createVNode(_component_Icon, mergeProps(props, { name: "futzo-icon:help-circle" }), null, 16)
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$9, {
                          locations: unref(scheduleSettings).locations,
                          modelValue: unref(fields).locations.fieldValue,
                          "onUpdate:modelValue": [($event) => unref(fields).locations.fieldValue = $event, locationHandler]
                        }, null, 8, ["locations", "modelValue", "onUpdate:modelValue"]),
                        withDirectives((openBlock(), createBlock("div", null, [
                          !!unref(fields).locations.fieldPropsValue["error-messages"] ? (openBlock(), createBlock("small", {
                            key: 0,
                            class: "text-red ml-4"
                          }, toDisplayString(unref(fields).locations.fieldPropsValue["error-messages"][0]), 1)) : createCommentVNode("", true)
                        ])), [
                          [_directive_auto_animate]
                        ])
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
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, " Nombre del torneo ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VSelect, mergeProps({
                        density: "compact",
                        "item-value": "id",
                        "item-title": "name",
                        items: [unref(tournament)],
                        "return-object": "",
                        disabled: "",
                        variant: "outlined",
                        modelValue: unref(fields).tournament_id.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                      }, unref(fields).tournament_id.fieldPropsValue), null, 16, ["items", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, "Formato del torneo ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => {
                      var _a, _b;
                      return [
                        createVNode(VSelect, mergeProps({
                          density: "compact",
                          "item-value": "id",
                          "item-title": "name",
                          items: [unref(scheduleSettings).format],
                          "return-object": "",
                          disabled: "",
                          variant: "outlined",
                          modelValue: unref(fields).tournament_format_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).tournament_format_id.fieldValue = $event
                        }, unref(fields).tournament_format_id.fieldPropsValue), null, 16, ["items", "modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "ml-2 text-caption text-medium-emphasis" }, toDisplayString((_b = (_a = unref(scheduleSettings)) == null ? void 0 : _a.format) == null ? void 0 : _b.description), 1)
                      ];
                    }),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, "Estilo")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createVNode(VSelect, mergeProps({
                          density: "compact",
                          "item-value": "id",
                          "item-title": "name",
                          items: [unref(scheduleSettings).footballType],
                          "return-object": "",
                          disabled: "",
                          variant: "outlined",
                          modelValue: unref(fields).football_type_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).football_type_id.fieldValue = $event
                        }, unref(fields).football_type_id.fieldPropsValue), null, 16, ["items", "modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "ml-2 text-caption text-medium-emphasis" }, toDisplayString((_a = unref(scheduleSettings)) == null ? void 0 : _a.footballType.description), 1)
                      ];
                    }),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1 d-block" }, "Total de equipos registrados:")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", { class: "text-body-1" }, [
                        createVNode(VChip, {
                          color: "primary",
                          readonly: "",
                          variant: "outlined"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(scheduleSettings).teams), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, " Fecha de inicio del torneo* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8",
                    ref_key: "parent",
                    ref: parent
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_client_only, null, {
                        default: withCtx(() => [
                          createVNode(_component_BaseCalendarInput, {
                            onStart_date_updated: (value) => unref(scheduleStoreRequest).general.start_date = value,
                            start_date: unref(fields).start_date.fieldValue,
                            "onUpdate:start_date": ($event) => unref(fields).start_date.fieldValue = $event,
                            multiCalendar: false
                          }, null, 8, ["onStart_date_updated", "start_date", "onUpdate:start_date"])
                        ]),
                        _: 1
                      }),
                      unref(fields).start_date.fieldPropsValue["error-messages"] ? (openBlock(), createBlock("small", {
                        key: 0,
                        class: "text-error text-caption"
                      }, toDisplayString(unref(fields).start_date.fieldPropsValue["error-messages"][0]), 1)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 512)
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, " Duraci\xF3n del partido* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, mergeProps({
                        type: "number",
                        variant: "outlined",
                        density: "compact",
                        min: 0,
                        "onUpdate:modelValue": [
                          (value) => unref(scheduleStoreRequest).general.game_time = value,
                          ($event) => unref(fields).game_time.fieldValue = $event
                        ],
                        modelValue: unref(fields).game_time.fieldValue
                      }, unref(fields).game_time.fieldPropsValue), null, 16, ["onUpdate:modelValue", "modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, " Tiempo entre partidos* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, mergeProps({
                        type: "number",
                        variant: "outlined",
                        density: "compact",
                        "onUpdate:modelValue": [
                          (value) => unref(scheduleStoreRequest).general.time_between_games = value,
                          ($event) => unref(fields).time_between_games.fieldValue = $event
                        ],
                        modelValue: unref(fields).time_between_games.fieldValue
                      }, unref(fields).time_between_games.fieldPropsValue, { min: "0" }), null, 16, ["onUpdate:modelValue", "modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, [
                        createTextVNode(" Ubicaciones* "),
                        createVNode(VTooltip, {
                          text: "Ubicaci\xF3n de los campos de juego",
                          location: "bottom"
                        }, {
                          activator: withCtx(({ props }) => [
                            createVNode(_component_Icon, mergeProps(props, { name: "futzo-icon:help-circle" }), null, 16)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$9, {
                        locations: unref(scheduleSettings).locations,
                        modelValue: unref(fields).locations.fieldValue,
                        "onUpdate:modelValue": [($event) => unref(fields).locations.fieldValue = $event, locationHandler]
                      }, null, 8, ["locations", "modelValue", "onUpdate:modelValue"]),
                      withDirectives((openBlock(), createBlock("div", null, [
                        !!unref(fields).locations.fieldPropsValue["error-messages"] ? (openBlock(), createBlock("small", {
                          key: 0,
                          class: "text-red ml-4"
                        }, toDisplayString(unref(fields).locations.fieldPropsValue["error-messages"][0]), 1)) : createCommentVNode("", true)
                      ])), [
                        [_directive_auto_animate]
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
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendario/stepper/01-general.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Tiebreakers",
  __ssrInlineRender: true,
  props: {
    "modelValue": {},
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const tiebreakers = useModel(__props, "modelValue");
    const sortedItems = computed(() => {
      var _a;
      return (_a = tiebreakers.value) == null ? void 0 : _a.slice().sort((a, b) => a.priority - b.priority);
    });
    let draggedIndex = null;
    const onDragStart = (index) => {
      draggedIndex = index;
    };
    const onDragOver = (index) => {
      var _a, _b;
      if (draggedIndex === null || draggedIndex === index) return;
      const draggedItem = (_a = tiebreakers.value) == null ? void 0 : _a.splice(draggedIndex, 1)[0];
      (_b = tiebreakers.value) == null ? void 0 : _b.splice(index, 0, draggedItem);
      draggedIndex = index;
      updatePriorities();
    };
    const onDrop = () => {
      draggedIndex = null;
    };
    const updatePriorities = () => {
      var _a;
      (_a = tiebreakers.value) == null ? void 0 : _a.forEach((item, index) => {
        item.priority = index + 1;
      });
    };
    const [parent] = useAutoAnimate();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VList, mergeProps({
        density: "compact",
        lines: "one",
        slim: "",
        ref_key: "parent",
        ref: parent
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(sortedItems), (tiebreaker, index) => {
              _push2(ssrRenderComponent(VListItem, {
                class: "draggable-item futzo-rounded",
                draggable: true,
                density: "compact",
                onDrop,
                onDragstart: ($event) => onDragStart(index),
                onDragover: ($event) => onDragOver(index),
                key: index
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VListItemTitle, { density: "compact" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="w-100 d-flex py-1"${_scopeId3}><span class="${ssrRenderClass(!tiebreaker.is_active ? "text-disabled" : "")}"${_scopeId3}>${ssrInterpolate(tiebreaker.rule)}</span>`);
                          _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VSwitch, {
                            inset: "",
                            density: "compact",
                            "false-icon": "mdi-lightbulb-off",
                            "true-icon": "mdi-lightbulb-on",
                            modelValue: tiebreaker.is_active,
                            "onUpdate:modelValue": ($event) => tiebreaker.is_active = $event,
                            "base-color": "white",
                            color: "white",
                            class: "futzo-rounded"
                          }, {
                            thumb: withCtx(({ icon }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (icon) {
                                  _push5(ssrRenderComponent(VIcon, {
                                    color: "primary",
                                    size: "14"
                                  }, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(icon)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(icon), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  icon ? (openBlock(), createBlock(VIcon, {
                                    key: 0,
                                    color: "primary",
                                    size: "14"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(icon), 1)
                                    ]),
                                    _: 2
                                  }, 1024)) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "w-100 d-flex py-1" }, [
                              createVNode("span", {
                                class: !tiebreaker.is_active ? "text-disabled" : ""
                              }, toDisplayString(tiebreaker.rule), 3),
                              createVNode(VSpacer),
                              createVNode(VSwitch, {
                                inset: "",
                                density: "compact",
                                "false-icon": "mdi-lightbulb-off",
                                "true-icon": "mdi-lightbulb-on",
                                modelValue: tiebreaker.is_active,
                                "onUpdate:modelValue": ($event) => tiebreaker.is_active = $event,
                                "base-color": "white",
                                color: "white",
                                class: "futzo-rounded"
                              }, {
                                thumb: withCtx(({ icon }) => [
                                  icon ? (openBlock(), createBlock(VIcon, {
                                    key: 0,
                                    color: "primary",
                                    size: "14"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(icon), 1)
                                    ]),
                                    _: 2
                                  }, 1024)) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1032, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VListItemSubtitle, {
                      class: [!tiebreaker.is_active ? "text-disabled" : "", "text-caption"],
                      tag: "small"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Prioridad: ${ssrInterpolate(tiebreaker.priority)}`);
                        } else {
                          return [
                            createTextVNode(" Prioridad: " + toDisplayString(tiebreaker.priority), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VListItemTitle, { density: "compact" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "w-100 d-flex py-1" }, [
                            createVNode("span", {
                              class: !tiebreaker.is_active ? "text-disabled" : ""
                            }, toDisplayString(tiebreaker.rule), 3),
                            createVNode(VSpacer),
                            createVNode(VSwitch, {
                              inset: "",
                              density: "compact",
                              "false-icon": "mdi-lightbulb-off",
                              "true-icon": "mdi-lightbulb-on",
                              modelValue: tiebreaker.is_active,
                              "onUpdate:modelValue": ($event) => tiebreaker.is_active = $event,
                              "base-color": "white",
                              color: "white",
                              class: "futzo-rounded"
                            }, {
                              thumb: withCtx(({ icon }) => [
                                icon ? (openBlock(), createBlock(VIcon, {
                                  key: 0,
                                  color: "primary",
                                  size: "14"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(icon), 1)
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(VListItemSubtitle, {
                        class: [!tiebreaker.is_active ? "text-disabled" : "", "text-caption"],
                        tag: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Prioridad: " + toDisplayString(tiebreaker.priority), 1)
                        ]),
                        _: 2
                      }, 1032, ["class"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(sortedItems), (tiebreaker, index) => {
                return openBlock(), createBlock(VListItem, {
                  class: "draggable-item futzo-rounded",
                  draggable: true,
                  density: "compact",
                  onDrop,
                  onDragstart: ($event) => onDragStart(index),
                  onDragover: withModifiers(($event) => onDragOver(index), ["prevent"]),
                  key: index
                }, {
                  default: withCtx(() => [
                    createVNode(VListItemTitle, { density: "compact" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "w-100 d-flex py-1" }, [
                          createVNode("span", {
                            class: !tiebreaker.is_active ? "text-disabled" : ""
                          }, toDisplayString(tiebreaker.rule), 3),
                          createVNode(VSpacer),
                          createVNode(VSwitch, {
                            inset: "",
                            density: "compact",
                            "false-icon": "mdi-lightbulb-off",
                            "true-icon": "mdi-lightbulb-on",
                            modelValue: tiebreaker.is_active,
                            "onUpdate:modelValue": ($event) => tiebreaker.is_active = $event,
                            "base-color": "white",
                            color: "white",
                            class: "futzo-rounded"
                          }, {
                            thumb: withCtx(({ icon }) => [
                              icon ? (openBlock(), createBlock(VIcon, {
                                key: 0,
                                color: "primary",
                                size: "14"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(icon), 1)
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1032, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(VListItemSubtitle, {
                      class: [!tiebreaker.is_active ? "text-disabled" : "", "text-caption"],
                      tag: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Prioridad: " + toDisplayString(tiebreaker.priority), 1)
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ]),
                  _: 2
                }, 1032, ["onDragstart", "onDragover"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendario/Tiebreakers.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "02-regular-phase",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    var _a, _b, _c, _d;
    const { scheduleStoreRequest } = storeToRefs(useScheduleStore());
    const { fields, meta, validate } = useSchemas("calendar-regular-step", {
      round_trip: (_b = (_a = scheduleStoreRequest.value) == null ? void 0 : _a.regular_phase) == null ? void 0 : _b.round_trip,
      tiebreakers: (_d = (_c = scheduleStoreRequest.value) == null ? void 0 : _c.regular_phase) == null ? void 0 : _d.tiebreakers
    });
    const isValid = computed(() => {
      return meta.value.valid;
    });
    __expose({
      isValid,
      validate
    });
    watch(fields.tiebreakers, (value) => {
      if (value == null ? void 0 : value.fieldValue) {
        scheduleStoreRequest.value.regular_phase.tiebreakers = value.fieldValue;
      }
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "container" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1"${_scopeId3}> Ida y Vuelta? </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Ida y Vuelta? ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VSwitch, mergeProps({
                          modelValue: unref(fields).round_trip.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).round_trip.fieldValue = $event
                        }, unref(fields).round_trip.fieldPropsValue, {
                          "onUpdate:modelValue": (value) => unref(scheduleStoreRequest).regular_phase.round_trip = value
                        }), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSwitch, mergeProps({
                            modelValue: unref(fields).round_trip.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).round_trip.fieldValue = $event
                          }, unref(fields).round_trip.fieldPropsValue, {
                            "onUpdate:modelValue": (value) => unref(scheduleStoreRequest).regular_phase.round_trip = value
                          }), null, 16, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, " Ida y Vuelta? ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VSwitch, mergeProps({
                          modelValue: unref(fields).round_trip.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).round_trip.fieldValue = $event
                        }, unref(fields).round_trip.fieldPropsValue, {
                          "onUpdate:modelValue": (value) => unref(scheduleStoreRequest).regular_phase.round_trip = value
                        }), null, 16, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1 d-block"${_scopeId3}> Reglas de desempate</span><small${_scopeId3}>Ordena en orden ascendente la prioridad de desempate</small>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1 d-block" }, " Reglas de desempate"),
                          createVNode("small", null, "Ordena en orden ascendente la prioridad de desempate")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$7, {
                          modelValue: unref(fields).tiebreakers.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).tiebreakers.fieldValue = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$7, {
                            modelValue: unref(fields).tiebreakers.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).tiebreakers.fieldValue = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1 d-block" }, " Reglas de desempate"),
                        createVNode("small", null, "Ordena en orden ascendente la prioridad de desempate")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$7, {
                          modelValue: unref(fields).tiebreakers.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).tiebreakers.fieldValue = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, " Ida y Vuelta? ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VSwitch, mergeProps({
                        modelValue: unref(fields).round_trip.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).round_trip.fieldValue = $event
                      }, unref(fields).round_trip.fieldPropsValue, {
                        "onUpdate:modelValue": (value) => unref(scheduleStoreRequest).regular_phase.round_trip = value
                      }), null, 16, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1 d-block" }, " Reglas de desempate"),
                      createVNode("small", null, "Ordena en orden ascendente la prioridad de desempate")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$7, {
                        modelValue: unref(fields).tiebreakers.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).tiebreakers.fieldValue = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendario/stepper/02-regular-phase.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "03-elimination-phase",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    var _a;
    const { scheduleSettings } = storeToRefs(useScheduleStore());
    const chipEventHandler = (value) => {
      var _a2, _b;
      (_a2 = scheduleSettings.value) == null ? void 0 : _a2.phases.map(
        (phase) => phase.is_active = value.includes(phase.id)
      );
      fields.eliminationPhases.fieldValue = (_b = scheduleSettings.value) == null ? void 0 : _b.phases.filter((phase) => phase.is_active);
    };
    const { fields, meta, validate } = useSchemas("calendar-elimination-step", {
      elimination_round_trip: scheduleSettings.value.elimination_round_trip,
      eliminationPhases: scheduleSettings.value.phases
    });
    const activePhases = ref(
      (_a = scheduleSettings.value) == null ? void 0 : _a.phases.filter((phase) => phase.is_active).map((phase) => phase.id)
    );
    const totalTeams = computed(() => {
      var _a2;
      return (_a2 = scheduleSettings.value) == null ? void 0 : _a2.teams;
    });
    const disabledOption = (phase) => {
      return phase.name === "Fase de grupos" || phase.name === "Tabla general" || totalTeams.value < 16 && phase.name === "Octavos de Final" || totalTeams.value < 8 && phase.name === "Cuartos de Final";
    };
    const teamsToNextRound = computed(() => {
      const phases = scheduleSettings.value.phases;
      const getPhase = (name) => phases.find((phase) => phase.name === name);
      const roundOfSixteen = getPhase("Octavos de Final");
      const quarterFinals = getPhase("Cuartos de Final");
      const semiFinals = getPhase("Semifinales");
      const final = getPhase("Final");
      if (totalTeams.value > 16 && (roundOfSixteen == null ? void 0 : roundOfSixteen.is_active)) return 16;
      if (totalTeams.value > 8 && (quarterFinals == null ? void 0 : quarterFinals.is_active)) return 8;
      if (totalTeams.value > 4 && (semiFinals == null ? void 0 : semiFinals.is_active)) return 4;
      if (totalTeams.value > 2 && (final == null ? void 0 : final.is_active)) return 2;
      return 1;
    });
    const isValid = computed(() => {
      return meta.value.valid;
    });
    __expose({
      isValid,
      validate
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "container" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1 d-block"${_scopeId3}>Avanzan a la siguiente ronda:</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1 d-block" }, "Avanzan a la siguiente ronda:")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p${_scopeId3}>${ssrInterpolate(unref(teamsToNextRound))}</p>`);
                      } else {
                        return [
                          createVNode("p", null, toDisplayString(unref(teamsToNextRound)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1 d-block" }, "Avanzan a la siguiente ronda:")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, toDisplayString(unref(teamsToNextRound)), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1"${_scopeId3}> Ida y Vuelta? </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Ida y Vuelta? ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VSwitch, {
                          modelValue: unref(fields).elimination_round_trip.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).elimination_round_trip.fieldValue = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSwitch, {
                            modelValue: unref(fields).elimination_round_trip.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).elimination_round_trip.fieldValue = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, " Ida y Vuelta? ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VSwitch, {
                          modelValue: unref(fields).elimination_round_trip.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).elimination_round_trip.fieldValue = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1 d-block"${_scopeId3}>Fases:</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1 d-block" }, "Fases:")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VChipGroup, {
                          multiple: "",
                          column: "",
                          filter: "",
                          modelValue: unref(activePhases),
                          "onUpdate:modelValue": [($event) => isRef(activePhases) ? activePhases.value = $event : null, chipEventHandler]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(scheduleSettings).phases, (phase) => {
                                _push5(ssrRenderComponent(VChip, {
                                  key: phase.id,
                                  disabled: disabledOption(phase),
                                  value: phase.id
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(phase.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(phase.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(scheduleSettings).phases, (phase) => {
                                  return openBlock(), createBlock(VChip, {
                                    key: phase.id,
                                    disabled: disabledOption(phase),
                                    value: phase.id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(phase.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["disabled", "value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(scheduleSettings).format.name === "Liga y Eliminatoria") {
                          _push4(`<small class="text-caption"${_scopeId3}> *Fase de grupos es obligatoria </small>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(VChipGroup, {
                            multiple: "",
                            column: "",
                            filter: "",
                            modelValue: unref(activePhases),
                            "onUpdate:modelValue": [($event) => isRef(activePhases) ? activePhases.value = $event : null, chipEventHandler]
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(scheduleSettings).phases, (phase) => {
                                return openBlock(), createBlock(VChip, {
                                  key: phase.id,
                                  disabled: disabledOption(phase),
                                  value: phase.id
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(phase.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["disabled", "value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(scheduleSettings).format.name === "Liga y Eliminatoria" ? (openBlock(), createBlock("small", {
                            key: 0,
                            class: "text-caption"
                          }, " *Fase de grupos es obligatoria ")) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1 d-block" }, "Fases:")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VChipGroup, {
                          multiple: "",
                          column: "",
                          filter: "",
                          modelValue: unref(activePhases),
                          "onUpdate:modelValue": [($event) => isRef(activePhases) ? activePhases.value = $event : null, chipEventHandler]
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(scheduleSettings).phases, (phase) => {
                              return openBlock(), createBlock(VChip, {
                                key: phase.id,
                                disabled: disabledOption(phase),
                                value: phase.id
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(phase.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["disabled", "value"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        unref(scheduleSettings).format.name === "Liga y Eliminatoria" ? (openBlock(), createBlock("small", {
                          key: 0,
                          class: "text-caption"
                        }, " *Fase de grupos es obligatoria ")) : createCommentVNode("", true)
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
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1 d-block" }, "Avanzan a la siguiente ronda:")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, toDisplayString(unref(teamsToNextRound)), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, " Ida y Vuelta? ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VSwitch, {
                        modelValue: unref(fields).elimination_round_trip.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).elimination_round_trip.fieldValue = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1 d-block" }, "Fases:")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VChipGroup, {
                        multiple: "",
                        column: "",
                        filter: "",
                        modelValue: unref(activePhases),
                        "onUpdate:modelValue": [($event) => isRef(activePhases) ? activePhases.value = $event : null, chipEventHandler]
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(scheduleSettings).phases, (phase) => {
                            return openBlock(), createBlock(VChip, {
                              key: phase.id,
                              disabled: disabledOption(phase),
                              value: phase.id
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(phase.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["disabled", "value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(scheduleSettings).format.name === "Liga y Eliminatoria" ? (openBlock(), createBlock("small", {
                        key: 0,
                        class: "text-caption"
                      }, " *Fase de grupos es obligatoria ")) : createCommentVNode("", true)
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendario/stepper/03-elimination-phase.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "InputAvailabilityDate",
  __ssrInlineRender: true,
  props: {
    day: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  emits: ["input-date-changed", "day-disabled"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const selected = ref([]);
    const selectableValues = computed(
      () => props.day.intervals.filter((i) => !i.disabled).map((i) => i.value)
    );
    const allSelected = computed({
      get: () => selected.value.length > 0 && selected.value.length === selectableValues.value.length,
      set(value) {
        if (value) {
          selected.value = [...selectableValues.value];
        } else {
          selected.value = [];
        }
      }
    });
    watch(selected, (newSlots) => {
      emits("input-date-changed", { id: props.id, value: newSlots });
    });
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "pa-0 pb-1" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { "no-gutters": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    class: "pr-2 pt-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, { class: "futzo-rounded" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCardTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(props.label)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(props.label), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCardSubtitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Horas disponibles ${ssrInterpolate(props.day.available_range)}`);
                                  } else {
                                    return [
                                      createTextVNode("Horas disponibles " + toDisplayString(props.day.available_range), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCardText, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VSwitch, {
                                      modelValue: unref(allSelected),
                                      "onUpdate:modelValue": ($event) => isRef(allSelected) ? allSelected.value = $event : null,
                                      label: "Todo el d\xEDa"
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VChipGroup, {
                                      column: "",
                                      multiple: "",
                                      "selected-class": "text-primary",
                                      modelValue: unref(selected),
                                      "onUpdate:modelValue": ($event) => isRef(selected) ? selected.value = $event : null
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<!--[-->`);
                                          ssrRenderList(props.day.intervals, (interval, index) => {
                                            _push7(ssrRenderComponent(VChip, {
                                              key: index,
                                              filter: "",
                                              value: interval.value,
                                              disabled: interval.disabled,
                                              class: "ma-1",
                                              text: interval.text
                                            }, null, _parent7, _scopeId6));
                                          });
                                          _push7(`<!--]-->`);
                                        } else {
                                          return [
                                            (openBlock(true), createBlock(Fragment, null, renderList(props.day.intervals, (interval, index) => {
                                              return openBlock(), createBlock(VChip, {
                                                key: index,
                                                filter: "",
                                                value: interval.value,
                                                disabled: interval.disabled,
                                                class: "ma-1",
                                                text: interval.text
                                              }, null, 8, ["value", "disabled", "text"]);
                                            }), 128))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VSwitch, {
                                        modelValue: unref(allSelected),
                                        "onUpdate:modelValue": ($event) => isRef(allSelected) ? allSelected.value = $event : null,
                                        label: "Todo el d\xEDa"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(VChipGroup, {
                                        column: "",
                                        multiple: "",
                                        "selected-class": "text-primary",
                                        modelValue: unref(selected),
                                        "onUpdate:modelValue": ($event) => isRef(selected) ? selected.value = $event : null
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(props.day.intervals, (interval, index) => {
                                            return openBlock(), createBlock(VChip, {
                                              key: index,
                                              filter: "",
                                              value: interval.value,
                                              disabled: interval.disabled,
                                              class: "ma-1",
                                              text: interval.text
                                            }, null, 8, ["value", "disabled", "text"]);
                                          }), 128))
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(props.label), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardSubtitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Horas disponibles " + toDisplayString(props.day.available_range), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createVNode(VSwitch, {
                                      modelValue: unref(allSelected),
                                      "onUpdate:modelValue": ($event) => isRef(allSelected) ? allSelected.value = $event : null,
                                      label: "Todo el d\xEDa"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode(VChipGroup, {
                                      column: "",
                                      multiple: "",
                                      "selected-class": "text-primary",
                                      modelValue: unref(selected),
                                      "onUpdate:modelValue": ($event) => isRef(selected) ? selected.value = $event : null
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(props.day.intervals, (interval, index) => {
                                          return openBlock(), createBlock(VChip, {
                                            key: index,
                                            filter: "",
                                            value: interval.value,
                                            disabled: interval.disabled,
                                            class: "ma-1",
                                            text: interval.text
                                          }, null, 8, ["value", "disabled", "text"]);
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCard, { class: "futzo-rounded" }, {
                            default: withCtx(() => [
                              createVNode(VCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(props.label), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(VCardSubtitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Horas disponibles " + toDisplayString(props.day.available_range), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createVNode(VSwitch, {
                                    modelValue: unref(allSelected),
                                    "onUpdate:modelValue": ($event) => isRef(allSelected) ? allSelected.value = $event : null,
                                    label: "Todo el d\xEDa"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(VChipGroup, {
                                    column: "",
                                    multiple: "",
                                    "selected-class": "text-primary",
                                    modelValue: unref(selected),
                                    "onUpdate:modelValue": ($event) => isRef(selected) ? selected.value = $event : null
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(props.day.intervals, (interval, index) => {
                                        return openBlock(), createBlock(VChip, {
                                          key: index,
                                          filter: "",
                                          value: interval.value,
                                          disabled: interval.disabled,
                                          class: "ma-1",
                                          text: interval.text
                                        }, null, 8, ["value", "disabled", "text"]);
                                      }), 128))
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      class: "pr-2 pt-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, { class: "futzo-rounded" }, {
                          default: withCtx(() => [
                            createVNode(VCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(props.label), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(VCardSubtitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Horas disponibles " + toDisplayString(props.day.available_range), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createVNode(VSwitch, {
                                  modelValue: unref(allSelected),
                                  "onUpdate:modelValue": ($event) => isRef(allSelected) ? allSelected.value = $event : null,
                                  label: "Todo el d\xEDa"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(VChipGroup, {
                                  column: "",
                                  multiple: "",
                                  "selected-class": "text-primary",
                                  modelValue: unref(selected),
                                  "onUpdate:modelValue": ($event) => isRef(selected) ? selected.value = $event : null
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(props.day.intervals, (interval, index) => {
                                      return openBlock(), createBlock(VChip, {
                                        key: index,
                                        filter: "",
                                        value: interval.value,
                                        disabled: interval.disabled,
                                        class: "ma-1",
                                        text: interval.text
                                      }, null, 8, ["value", "disabled", "text"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
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
              createVNode(VRow, { "no-gutters": "" }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    class: "pr-2 pt-2"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCard, { class: "futzo-rounded" }, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(props.label), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VCardSubtitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Horas disponibles " + toDisplayString(props.day.available_range), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(VSwitch, {
                                modelValue: unref(allSelected),
                                "onUpdate:modelValue": ($event) => isRef(allSelected) ? allSelected.value = $event : null,
                                label: "Todo el d\xEDa"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(VChipGroup, {
                                column: "",
                                multiple: "",
                                "selected-class": "text-primary",
                                modelValue: unref(selected),
                                "onUpdate:modelValue": ($event) => isRef(selected) ? selected.value = $event : null
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(props.day.intervals, (interval, index) => {
                                    return openBlock(), createBlock(VChip, {
                                      key: index,
                                      filter: "",
                                      value: interval.value,
                                      disabled: interval.disabled,
                                      class: "ma-1",
                                      text: interval.text
                                    }, null, 8, ["value", "disabled", "text"]);
                                  }), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/ubicaciones/stepper/InputAvailabilityDate.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "location-form-step",
  __ssrInlineRender: true,
  props: {
    field: {
      type: Object,
      required: true
    },
    isLastStep: {
      type: Boolean,
      required: true
    }
  },
  emits: ["back", "next", "field-disabled"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { scheduleStoreRequest } = storeToRefs(useScheduleStore());
    const form = ref({
      field_id: props.field.field_id,
      name: props.field.field_name,
      isCompleted: false,
      availability: props.field.availability
    });
    const inputDateChangedHandler = ({ id: day, value: selectedSlots }) => {
      scheduleStoreRequest.value.fields_phase.forEach((field) => {
        if (field.location_id === props.field.location_id && field.field_id === props.field.field_id) {
          field.availability[day].intervals.forEach((interval) => {
            interval.selected = selectedSlots.includes(interval.value);
          });
        }
      });
    };
    const availabilities = computed(() => {
      let data = {};
      for (const key in props.field.availability) {
        if (typeof props.field.availability[key] === "object") {
          data[key] = props.field.availability[key];
        }
      }
      return data;
    });
    const emits = __emit;
    const dayDisabledHandler = (day) => {
      form.value.availability[day].enabled = !form.value.availability[day].enabled;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$2;
      _push(`<!--[--><!--[-->`);
      ssrRenderList(unref(availabilities), (item, key) => {
        _push(ssrRenderComponent(_sfc_main$4, {
          disabled: __props.field.disabled,
          day: props.field.availability[key],
          key,
          "data-value": key,
          id: key,
          label: item.label,
          onInputDateChanged: inputDateChangedHandler,
          onDayDisabled: dayDisabledHandler
        }, null, _parent));
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    color: "secondary",
                    variant: "outlined",
                    class: "vertical-stepper-button back",
                    onClick: ($event) => emits("back"),
                    disabled: __props.isLastStep
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Anterior `);
                      } else {
                        return [
                          createTextVNode("Anterior ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    color: "primary",
                    variant: "outlined",
                    class: "vertical-stepper-button next",
                    onClick: ($event) => emits("next", unref(form))
                  }, {
                    append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, { name: "mdi-arrow-right" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Icon, { name: "mdi-arrow-right" })
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Marcar como completado `);
                      } else {
                        return [
                          createTextVNode("Marcar como completado ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      color: "secondary",
                      variant: "outlined",
                      class: "vertical-stepper-button back",
                      onClick: ($event) => emits("back"),
                      disabled: __props.isLastStep
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Anterior ")
                      ]),
                      _: 1
                    }, 8, ["onClick", "disabled"]),
                    createVNode(VBtn, {
                      color: "primary",
                      variant: "outlined",
                      class: "vertical-stepper-button next",
                      onClick: ($event) => emits("next", unref(form))
                    }, {
                      append: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi-arrow-right" })
                      ]),
                      default: withCtx(() => [
                        createTextVNode("Marcar como completado ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    color: "secondary",
                    variant: "outlined",
                    class: "vertical-stepper-button back",
                    onClick: ($event) => emits("back"),
                    disabled: __props.isLastStep
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Anterior ")
                    ]),
                    _: 1
                  }, 8, ["onClick", "disabled"]),
                  createVNode(VBtn, {
                    color: "primary",
                    variant: "outlined",
                    class: "vertical-stepper-button next",
                    onClick: ($event) => emits("next", unref(form))
                  }, {
                    append: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi-arrow-right" })
                    ]),
                    default: withCtx(() => [
                      createTextVNode("Marcar como completado ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendario/location-form-step.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "04-fields-phase",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const { tournamentId } = storeToRefs(useTournamentStore());
    const { scheduleStoreRequest } = storeToRefs(useScheduleStore());
    const { meta, validate } = useSchemas("calendar-location-step", {
      tournament_id: tournamentId.value,
      fields: scheduleStoreRequest.value.fields_phase
    });
    const isValid = computed(() => {
      return meta.value.valid;
    });
    __expose({
      isValid,
      validate
    });
    const currentStep = ref();
    const fields = ref([]);
    const nextHandler = (value) => {
      scheduleStoreRequest.value.fields_phase.map((field) => {
        if (field.field_id === value.field_id) {
          field.availability.isCompleted = true;
        }
      });
      if (currentStep.value < fields.value.length) {
        currentStep.value += 1;
      }
    };
    const backHandler = () => {
      if (currentStep.value > 1) {
        currentStep.value -= 1;
      }
    };
    const fieldDisableHandler = (data) => {
      fields.value.map((field) => {
        if (field.field_id === data.field_id) {
          field.disabled = !field.disabled;
          for (let key in field.availability) {
            field.availability[key].enabled = field.availability[key].enabled === true ? false : field.availability[key].enabled;
          }
        }
      });
      const _field = fields.value.filter((field) => field.field_id === data.field_id)[0];
      nextHandler({
        availability: _field.availability,
        field_id: _field.field_id,
        name: _field.field_name
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VStepperVertical, {
                          class: "pa-0 ma-0",
                          flat: "",
                          modelValue: unref(currentStep),
                          "onUpdate:modelValue": ($event) => isRef(currentStep) ? currentStep.value = $event : null,
                          "item-value": "step",
                          "item-title": "location_name",
                          "item-subtitle": "field_name"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(fields), (field, index) => {
                                _push5(ssrRenderComponent(VStepperVerticalItem, {
                                  key: index + 1,
                                  value: field.step,
                                  title: field.location_name,
                                  subtitle: field.field_name,
                                  "complete-icon": "mdi-check-circle",
                                  "edit-icon": "mdi-check-circle",
                                  "expand-icon": "mdi-chevron-down"
                                }, {
                                  actions: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<small class="text-caption"${_scopeId5}>* Marcar como completado para avanzar/finalizar</small>`);
                                    } else {
                                      return [
                                        createVNode("small", { class: "text-caption" }, "* Marcar como completado para avanzar/finalizar")
                                      ];
                                    }
                                  }),
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_sfc_main$3, {
                                        field,
                                        isLastStep: unref(fields).length === unref(currentStep) - 1,
                                        onNext: nextHandler,
                                        onBack: backHandler,
                                        onFieldDisabled: fieldDisableHandler
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_sfc_main$3, {
                                          field,
                                          isLastStep: unref(fields).length === unref(currentStep) - 1,
                                          onNext: nextHandler,
                                          onBack: backHandler,
                                          onFieldDisabled: fieldDisableHandler
                                        }, null, 8, ["field", "isLastStep"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(fields), (field, index) => {
                                  return openBlock(), createBlock(VStepperVerticalItem, {
                                    key: index + 1,
                                    value: field.step,
                                    title: field.location_name,
                                    subtitle: field.field_name,
                                    "complete-icon": "mdi-check-circle",
                                    "edit-icon": "mdi-check-circle",
                                    "expand-icon": "mdi-chevron-down"
                                  }, {
                                    actions: withCtx(() => [
                                      createVNode("small", { class: "text-caption" }, "* Marcar como completado para avanzar/finalizar")
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$3, {
                                        field,
                                        isLastStep: unref(fields).length === unref(currentStep) - 1,
                                        onNext: nextHandler,
                                        onBack: backHandler,
                                        onFieldDisabled: fieldDisableHandler
                                      }, null, 8, ["field", "isLastStep"])
                                    ]),
                                    _: 2
                                  }, 1032, ["value", "title", "subtitle"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VStepperVertical, {
                            class: "pa-0 ma-0",
                            flat: "",
                            modelValue: unref(currentStep),
                            "onUpdate:modelValue": ($event) => isRef(currentStep) ? currentStep.value = $event : null,
                            "item-value": "step",
                            "item-title": "location_name",
                            "item-subtitle": "field_name"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(fields), (field, index) => {
                                return openBlock(), createBlock(VStepperVerticalItem, {
                                  key: index + 1,
                                  value: field.step,
                                  title: field.location_name,
                                  subtitle: field.field_name,
                                  "complete-icon": "mdi-check-circle",
                                  "edit-icon": "mdi-check-circle",
                                  "expand-icon": "mdi-chevron-down"
                                }, {
                                  actions: withCtx(() => [
                                    createVNode("small", { class: "text-caption" }, "* Marcar como completado para avanzar/finalizar")
                                  ]),
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$3, {
                                      field,
                                      isLastStep: unref(fields).length === unref(currentStep) - 1,
                                      onNext: nextHandler,
                                      onBack: backHandler,
                                      onFieldDisabled: fieldDisableHandler
                                    }, null, 8, ["field", "isLastStep"])
                                  ]),
                                  _: 2
                                }, 1032, ["value", "title", "subtitle"]);
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
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VStepperVertical, {
                          class: "pa-0 ma-0",
                          flat: "",
                          modelValue: unref(currentStep),
                          "onUpdate:modelValue": ($event) => isRef(currentStep) ? currentStep.value = $event : null,
                          "item-value": "step",
                          "item-title": "location_name",
                          "item-subtitle": "field_name"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(fields), (field, index) => {
                              return openBlock(), createBlock(VStepperVerticalItem, {
                                key: index + 1,
                                value: field.step,
                                title: field.location_name,
                                subtitle: field.field_name,
                                "complete-icon": "mdi-check-circle",
                                "edit-icon": "mdi-check-circle",
                                "expand-icon": "mdi-chevron-down"
                              }, {
                                actions: withCtx(() => [
                                  createVNode("small", { class: "text-caption" }, "* Marcar como completado para avanzar/finalizar")
                                ]),
                                default: withCtx(() => [
                                  createVNode(_sfc_main$3, {
                                    field,
                                    isLastStep: unref(fields).length === unref(currentStep) - 1,
                                    onNext: nextHandler,
                                    onBack: backHandler,
                                    onFieldDisabled: fieldDisableHandler
                                  }, null, 8, ["field", "isLastStep"])
                                ]),
                                _: 2
                              }, 1032, ["value", "title", "subtitle"]);
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
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VStepperVertical, {
                        class: "pa-0 ma-0",
                        flat: "",
                        modelValue: unref(currentStep),
                        "onUpdate:modelValue": ($event) => isRef(currentStep) ? currentStep.value = $event : null,
                        "item-value": "step",
                        "item-title": "location_name",
                        "item-subtitle": "field_name"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(fields), (field, index) => {
                            return openBlock(), createBlock(VStepperVerticalItem, {
                              key: index + 1,
                              value: field.step,
                              title: field.location_name,
                              subtitle: field.field_name,
                              "complete-icon": "mdi-check-circle",
                              "edit-icon": "mdi-check-circle",
                              "expand-icon": "mdi-chevron-down"
                            }, {
                              actions: withCtx(() => [
                                createVNode("small", { class: "text-caption" }, "* Marcar como completado para avanzar/finalizar")
                              ]),
                              default: withCtx(() => [
                                createVNode(_sfc_main$3, {
                                  field,
                                  isLastStep: unref(fields).length === unref(currentStep) - 1,
                                  onNext: nextHandler,
                                  onBack: backHandler,
                                  onFieldDisabled: fieldDisableHandler
                                }, null, 8, ["field", "isLastStep"])
                              ]),
                              _: 2
                            }, 1032, ["value", "title", "subtitle"]);
                          }), 128))
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendario/stepper/04-fields-phase.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    "stepRef": {},
    "stepRefModifiers": {}
  },
  emits: ["update:stepRef"],
  setup(__props, { expose: __expose }) {
    const {
      calendarSteps
    } = storeToRefs(useScheduleStore());
    const stepRef = useModel(__props, "stepRef");
    const hasValidForm = () => {
      var _a;
      return (_a = stepRef.value) == null ? void 0 : _a.isValid;
    };
    const validate = async () => await stepRef.value.validate();
    __expose({
      hasValidForm,
      validate
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_transition_slide = __nuxt_component_0;
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "pa-0" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(IndicatorStep, { "form-steps": unref(calendarSteps) }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(IndicatorStep, { "form-steps": unref(calendarSteps) }, null, 8, ["form-steps"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(IndicatorStep, { "form-steps": unref(calendarSteps) }, null, 8, ["form-steps"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_transition_slide, {
                          group: "",
                          offset: {
                            enter: ["-100%", 0],
                            leave: ["100%", 0]
                          }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(calendarSteps).current === "general") {
                                _push5(ssrRenderComponent(_sfc_main$8, {
                                  ref_key: "stepRef",
                                  ref: stepRef,
                                  key: unref(calendarSteps).current
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(calendarSteps).current === "regular") {
                                _push5(ssrRenderComponent(_sfc_main$6, {
                                  ref_key: "stepRef",
                                  ref: stepRef,
                                  key: unref(calendarSteps).current
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(calendarSteps).current === "elimination") {
                                _push5(ssrRenderComponent(_sfc_main$5, {
                                  ref_key: "stepRef",
                                  ref: stepRef,
                                  key: unref(calendarSteps).current
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(calendarSteps).current === "fields") {
                                _push5(ssrRenderComponent(_sfc_main$2, {
                                  ref_key: "stepRef",
                                  ref: stepRef,
                                  key: unref(calendarSteps).current
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                unref(calendarSteps).current === "general" ? (openBlock(), createBlock(_sfc_main$8, {
                                  ref_key: "stepRef",
                                  ref: stepRef,
                                  key: unref(calendarSteps).current
                                })) : createCommentVNode("", true),
                                unref(calendarSteps).current === "regular" ? (openBlock(), createBlock(_sfc_main$6, {
                                  ref_key: "stepRef",
                                  ref: stepRef,
                                  key: unref(calendarSteps).current
                                })) : createCommentVNode("", true),
                                unref(calendarSteps).current === "elimination" ? (openBlock(), createBlock(_sfc_main$5, {
                                  ref_key: "stepRef",
                                  ref: stepRef,
                                  key: unref(calendarSteps).current
                                })) : createCommentVNode("", true),
                                unref(calendarSteps).current === "fields" ? (openBlock(), createBlock(_sfc_main$2, {
                                  ref_key: "stepRef",
                                  ref: stepRef,
                                  key: unref(calendarSteps).current
                                })) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_transition_slide, {
                            group: "",
                            offset: {
                              enter: ["-100%", 0],
                              leave: ["100%", 0]
                            }
                          }, {
                            default: withCtx(() => [
                              unref(calendarSteps).current === "general" ? (openBlock(), createBlock(_sfc_main$8, {
                                ref_key: "stepRef",
                                ref: stepRef,
                                key: unref(calendarSteps).current
                              })) : createCommentVNode("", true),
                              unref(calendarSteps).current === "regular" ? (openBlock(), createBlock(_sfc_main$6, {
                                ref_key: "stepRef",
                                ref: stepRef,
                                key: unref(calendarSteps).current
                              })) : createCommentVNode("", true),
                              unref(calendarSteps).current === "elimination" ? (openBlock(), createBlock(_sfc_main$5, {
                                ref_key: "stepRef",
                                ref: stepRef,
                                key: unref(calendarSteps).current
                              })) : createCommentVNode("", true),
                              unref(calendarSteps).current === "fields" ? (openBlock(), createBlock(_sfc_main$2, {
                                ref_key: "stepRef",
                                ref: stepRef,
                                key: unref(calendarSteps).current
                              })) : createCommentVNode("", true)
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
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(_component_transition_slide, {
                          group: "",
                          offset: {
                            enter: ["-100%", 0],
                            leave: ["100%", 0]
                          }
                        }, {
                          default: withCtx(() => [
                            unref(calendarSteps).current === "general" ? (openBlock(), createBlock(_sfc_main$8, {
                              ref_key: "stepRef",
                              ref: stepRef,
                              key: unref(calendarSteps).current
                            })) : createCommentVNode("", true),
                            unref(calendarSteps).current === "regular" ? (openBlock(), createBlock(_sfc_main$6, {
                              ref_key: "stepRef",
                              ref: stepRef,
                              key: unref(calendarSteps).current
                            })) : createCommentVNode("", true),
                            unref(calendarSteps).current === "elimination" ? (openBlock(), createBlock(_sfc_main$5, {
                              ref_key: "stepRef",
                              ref: stepRef,
                              key: unref(calendarSteps).current
                            })) : createCommentVNode("", true),
                            unref(calendarSteps).current === "fields" ? (openBlock(), createBlock(_sfc_main$2, {
                              ref_key: "stepRef",
                              ref: stepRef,
                              key: unref(calendarSteps).current
                            })) : createCommentVNode("", true)
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
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(IndicatorStep, { "form-steps": unref(calendarSteps) }, null, 8, ["form-steps"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(_component_transition_slide, {
                        group: "",
                        offset: {
                          enter: ["-100%", 0],
                          leave: ["100%", 0]
                        }
                      }, {
                        default: withCtx(() => [
                          unref(calendarSteps).current === "general" ? (openBlock(), createBlock(_sfc_main$8, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(calendarSteps).current
                          })) : createCommentVNode("", true),
                          unref(calendarSteps).current === "regular" ? (openBlock(), createBlock(_sfc_main$6, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(calendarSteps).current
                          })) : createCommentVNode("", true),
                          unref(calendarSteps).current === "elimination" ? (openBlock(), createBlock(_sfc_main$5, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(calendarSteps).current
                          })) : createCommentVNode("", true),
                          unref(calendarSteps).current === "fields" ? (openBlock(), createBlock(_sfc_main$2, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(calendarSteps).current
                          })) : createCommentVNode("", true)
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendario/stepper/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const useDialog = (steps, dialog) => {
  const settings = ref({});
  const stepRef = ref({
    validate: Function,
    handleSubmit: Function
  });
  const lastItem = steps.value.steps[steps.value.steps.length - 1];
  const firstItem = steps.value.steps[0];
  const stepsOrder = steps.value.steps.map((step) => step.step).join(",").split(",");
  const secondaryTextBtn = computed(() => {
    return steps.value.current === firstItem.step ? "Cancelar" : "Regresar";
  });
  const primaryTextBtn = computed(() => {
    return steps.value.current === lastItem.step ? "Crear" : "Siguiente";
  });
  const backHandler = () => {
    if (steps.value.current === firstItem.step) {
      dialog.value = false;
      return;
    }
    const currentStepIndex = stepsOrder.indexOf(steps.value.current);
    steps.value.steps.forEach((step, index) => {
      if (currentStepIndex < index + 1) {
        step.completed = false;
      }
    });
    steps.value.current = stepsOrder[currentStepIndex - 1];
  };
  const nextHandler = async () => {
    const statusForm = await stepRef.value.validate();
    const formValues = stepRef.value.handleSubmit(
      (values) => values
    );
    const teamStoreRequestValues = await formValues();
    console.log(teamStoreRequestValues);
    if (statusForm.valid) ;
  };
  return {
    settings,
    secondaryTextBtn,
    primaryTextBtn,
    stepRef,
    backHandler,
    nextHandler
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      calendarSteps,
      scheduleDialog,
      scheduleStoreRequest,
      schedulePagination
    } = storeToRefs(useScheduleStore());
    const { secondaryTextBtn, primaryTextBtn, backHandler } = useDialog(
      calendarSteps,
      scheduleDialog
    );
    const stepContainerRef = ref();
    const isFetching = ref(false);
    const leaveHandler = () => {
      calendarSteps.value.steps.forEach((step) => step.completed = false);
      calendarSteps.value.current = "general";
    };
    const handleChange = async () => {
      let hasErrors = !stepContainerRef.value.hasValidForm();
      if (calendarSteps.value.current === "general") {
        await stepContainerRef.value.validate();
      } else if (calendarSteps.value.current === "regular") {
        await stepContainerRef.value.validate();
      } else if (calendarSteps.value.current === "elimination") {
        await stepContainerRef.value.validate();
      } else if (calendarSteps.value.current === "fields") {
        await stepContainerRef.value.validate();
      }
      if (!hasErrors) {
        nextStep();
      }
    };
    const disabledButton = computed(() => {
      if (calendarSteps.value.current !== "fields") {
        return false;
      } else {
        return !scheduleStoreRequest.value.fields_phase.every(
          (field) => field.availability.isCompleted
        );
      }
    });
    const nextStep = () => {
      const stepsOrder = [
        "general",
        "regular",
        "elimination",
        "fields"
      ];
      const currentStepIndex = stepsOrder.indexOf(calendarSteps.value.current);
      if (!calendarSteps.value.steps[currentStepIndex].completed) {
        calendarSteps.value.steps[currentStepIndex].completed = true;
      }
      if (calendarSteps.value.current !== "fields") {
        calendarSteps.value.current = stepsOrder[currentStepIndex + 1];
      } else {
        isFetching.value = true;
        useScheduleStore().generateSchedule().then(() => {
          useScheduleStore().getTournamentSchedules().finally(() => {
            isFetching.value = false;
            scheduleDialog.value = false;
            schedulePagination.value.currentPage = 1;
            useToast().toast(
              "success",
              "Calendario creado",
              "El calendario se ha creado correctamente"
            );
          });
        }).finally(() => isFetching.value = false).catch((error) => {
          isFetching.value = false;
          const { message } = useApiError(error);
          useToast().toast(
            "error",
            "Error al crear el calendario",
            message || "Ha ocurrido un error al crear el calendario"
          );
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = _sfc_main$a;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        title: "Crear un calendario",
        subtitle: "Completa los detalles del calendario.",
        actions: {
          primary: unref(primaryTextBtn),
          secondary: unref(secondaryTextBtn)
        },
        loading: false,
        modelValue: unref(scheduleDialog),
        "onUpdate:modelValue": ($event) => isRef(scheduleDialog) ? scheduleDialog.value = $event : null,
        onLeaving: leaveHandler
      }, _attrs), {
        "v-card-text": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "stepContainerRef",
              ref: stepContainerRef
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, {
                ref_key: "stepContainerRef",
                ref: stepContainerRef
              }, null, 512)
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              width: "50%",
              "min-height": "44",
              variant: "outlined",
              color: "secondary",
              density: "comfortable",
              size: "large",
              onClick: unref(backHandler)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(secondaryTextBtn))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(secondaryTextBtn)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VBtn, {
              width: "50%",
              "min-height": "44",
              variant: "elevated",
              color: "primary",
              density: "comfortable",
              size: "large",
              loading: unref(isFetching),
              disabled: unref(disabledButton) || unref(isFetching),
              onClick: handleChange
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(primaryTextBtn))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(primaryTextBtn)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                width: "50%",
                "min-height": "44",
                variant: "outlined",
                color: "secondary",
                density: "comfortable",
                size: "large",
                onClick: unref(backHandler)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(secondaryTextBtn)), 1)
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(VBtn, {
                width: "50%",
                "min-height": "44",
                variant: "elevated",
                color: "primary",
                density: "comfortable",
                size: "large",
                loading: unref(isFetching),
                disabled: unref(disabledButton) || unref(isFetching),
                onClick: handleChange
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(primaryTextBtn)), 1)
                ]),
                _: 1
              }, 8, ["loading", "disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendario/dialog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CvHU4iBx.mjs.map
