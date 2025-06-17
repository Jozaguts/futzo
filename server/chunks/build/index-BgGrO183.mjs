import { defineComponent, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, ref, computed, resolveComponent, createBlock, createCommentVNode, openBlock, watch, createElementVNode, Fragment, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './index-DkcY5wU8.mjs';
import { e as useTournamentStore, i as useLeaguesStore, g as useCategoryStore } from './useScheduleStore-DBhAIDF3.mjs';
import { V as VCard, f as VCardItem, H as VDivider, F as VCardText, af as VSelect, B as VListItem, g as genericComponent, C as VTextField, p as propsFactory, as as useRtl, O as useProxiedModel, N as useFocus, c as useRender, aR as VInput, b1 as VLabel, aS as makeVInputProps, U as makeFocusProps } from './server.mjs';
import { storeToRefs } from 'pinia';
import { V as VSheet } from './VSheet-DVv3ytGE.mjs';
import { _ as __nuxt_component_0$1 } from './TransitionSlide-d5qGX2mN.mjs';
import { _ as _sfc_main$5, V as VTextarea } from './BaseInput-CrKT6v3K.mjs';
import { _ as _sfc_main$6 } from './BaseCalendarInput-D8pdf43z.mjs';
import { _ as _sfc_main$7 } from './drag-drop-image-DRFieU2I.mjs';
import { u as useSchemas } from './useSchemas-CFMbNxa_.mjs';
import { _ as _sfc_main$8, u as useSteps, a as useSlider, V as VSliderTrack, b as VSliderThumb, m as makeSliderProps, g as getOffset } from './CategoriesSelect-D1ehrnKL.mjs';
import { V as VContainer } from './VContainer-C0Se5csP.mjs';
import { V as VTooltip } from './VTooltip-BQZt6HQd.mjs';
import { V as VRow, a as VCol } from './VRow-CwLG7ojV.mjs';
import { V as VAutocomplete } from './VAutocomplete-P_wP5bep.mjs';
import { I as IndicatorStep } from './IndicatorStep-DKaB2dCI.mjs';
import { V as VBtn } from './VBtn-_od1f1mx.mjs';
import { V as VDialog } from './VDialog-BeIjnChI.mjs';

const makeVRangeSliderProps = propsFactory({
  ...makeFocusProps(),
  ...makeVInputProps(),
  ...makeSliderProps(),
  strict: Boolean,
  modelValue: {
    type: Array,
    default: () => [0, 0]
  }
}, "VRangeSlider");
const VRangeSlider = genericComponent()({
  name: "VRangeSlider",
  props: makeVRangeSliderProps(),
  emits: {
    "update:focused": (value) => true,
    "update:modelValue": (value) => true,
    end: (value) => true,
    start: (value) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const startThumbRef = ref();
    const stopThumbRef = ref();
    const inputRef = ref();
    const {
      rtlClasses
    } = useRtl();
    function getActiveThumb(e) {
      if (!startThumbRef.value || !stopThumbRef.value) return;
      const startOffset = getOffset(e, startThumbRef.value.$el, props.direction);
      const stopOffset = getOffset(e, stopThumbRef.value.$el, props.direction);
      const a = Math.abs(startOffset);
      const b = Math.abs(stopOffset);
      return a < b || a === b && startOffset < 0 ? startThumbRef.value.$el : stopThumbRef.value.$el;
    }
    const steps = useSteps(props);
    const model = useProxiedModel(props, "modelValue", void 0, (arr) => {
      if (!(arr == null ? void 0 : arr.length)) return [0, 0];
      return arr.map((value) => steps.roundValue(value));
    });
    const {
      activeThumbRef,
      hasLabels,
      max,
      min,
      mousePressed,
      onSliderMousedown,
      onSliderTouchstart,
      position,
      trackContainerRef,
      readonly
    } = useSlider({
      props,
      steps,
      onSliderStart: () => {
        emit("start", model.value);
      },
      onSliderEnd: (_ref2) => {
        var _a;
        let {
          value
        } = _ref2;
        const newValue = activeThumbRef.value === ((_a = startThumbRef.value) == null ? void 0 : _a.$el) ? [value, model.value[1]] : [model.value[0], value];
        if (!props.strict && newValue[0] < newValue[1]) {
          model.value = newValue;
        }
        emit("end", model.value);
      },
      onSliderMove: (_ref3) => {
        var _a, _b, _c, _d;
        let {
          value
        } = _ref3;
        const [start, stop] = model.value;
        if (!props.strict && start === stop && start !== min.value) {
          activeThumbRef.value = value > start ? (_a = stopThumbRef.value) == null ? void 0 : _a.$el : (_b = startThumbRef.value) == null ? void 0 : _b.$el;
          (_c = activeThumbRef.value) == null ? void 0 : _c.focus();
        }
        if (activeThumbRef.value === ((_d = startThumbRef.value) == null ? void 0 : _d.$el)) {
          model.value = [Math.min(value, stop), stop];
        } else {
          model.value = [start, Math.max(start, value)];
        }
      },
      getActiveThumb
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const trackStart = computed(() => position(model.value[0]));
    const trackStop = computed(() => position(model.value[1]));
    useRender(() => {
      const inputProps = VInput.filterProps(props);
      const hasPrepend = !!(props.label || slots.label || slots.prepend);
      return createVNode(VInput, mergeProps({
        "class": ["v-slider", "v-range-slider", {
          "v-slider--has-labels": !!slots["tick-label"] || hasLabels.value,
          "v-slider--focused": isFocused.value,
          "v-slider--pressed": mousePressed.value,
          "v-slider--disabled": props.disabled
        }, rtlClasses.value, props.class],
        "style": props.style,
        "ref": inputRef
      }, inputProps, {
        "focused": isFocused.value
      }), {
        ...slots,
        prepend: hasPrepend ? (slotProps) => {
          var _a2;
          var _a, _b;
          return createElementVNode(Fragment, null, [(_a2 = (_a = slots.label) == null ? void 0 : _a.call(slots, slotProps)) != null ? _a2 : props.label ? createVNode(VLabel, {
            "class": "v-slider__label",
            "text": props.label
          }, null) : void 0, (_b = slots.prepend) == null ? void 0 : _b.call(slots, slotProps)]);
        } : void 0,
        default: (_ref4) => {
          var _a, _b;
          let {
            id,
            messagesId
          } = _ref4;
          return createElementVNode("div", {
            "class": "v-slider__container",
            "onMousedown": !readonly.value ? onSliderMousedown : void 0,
            "onTouchstartPassive": !readonly.value ? onSliderTouchstart : void 0
          }, [createElementVNode("input", {
            "id": `${id.value}_start`,
            "name": props.name || id.value,
            "disabled": !!props.disabled,
            "readonly": !!props.readonly,
            "tabindex": "-1",
            "value": model.value[0]
          }, null), createElementVNode("input", {
            "id": `${id.value}_stop`,
            "name": props.name || id.value,
            "disabled": !!props.disabled,
            "readonly": !!props.readonly,
            "tabindex": "-1",
            "value": model.value[1]
          }, null), createVNode(VSliderTrack, {
            "ref": trackContainerRef,
            "start": trackStart.value,
            "stop": trackStop.value
          }, {
            "tick-label": slots["tick-label"]
          }), createVNode(VSliderThumb, {
            "ref": startThumbRef,
            "aria-describedby": messagesId.value,
            "focused": isFocused && activeThumbRef.value === ((_a = startThumbRef.value) == null ? void 0 : _a.$el),
            "modelValue": model.value[0],
            "onUpdate:modelValue": (v) => model.value = [v, model.value[1]],
            "onFocus": (e) => {
              var _a2, _b2, _c, _d;
              focus();
              activeThumbRef.value = (_a2 = startThumbRef.value) == null ? void 0 : _a2.$el;
              if (max.value !== min.value && model.value[0] === model.value[1] && model.value[1] === min.value && e.relatedTarget !== ((_b2 = stopThumbRef.value) == null ? void 0 : _b2.$el)) {
                (_c = startThumbRef.value) == null ? void 0 : _c.$el.blur();
                (_d = stopThumbRef.value) == null ? void 0 : _d.$el.focus();
              }
            },
            "onBlur": () => {
              blur();
              activeThumbRef.value = void 0;
            },
            "min": min.value,
            "max": model.value[1],
            "position": trackStart.value,
            "ripple": props.ripple
          }, {
            "thumb-label": slots["thumb-label"]
          }), createVNode(VSliderThumb, {
            "ref": stopThumbRef,
            "aria-describedby": messagesId.value,
            "focused": isFocused && activeThumbRef.value === ((_b = stopThumbRef.value) == null ? void 0 : _b.$el),
            "modelValue": model.value[1],
            "onUpdate:modelValue": (v) => model.value = [model.value[0], v],
            "onFocus": (e) => {
              var _a2, _b2, _c, _d;
              focus();
              activeThumbRef.value = (_a2 = stopThumbRef.value) == null ? void 0 : _a2.$el;
              if (max.value !== min.value && model.value[0] === model.value[1] && model.value[0] === max.value && e.relatedTarget !== ((_b2 = startThumbRef.value) == null ? void 0 : _b2.$el)) {
                (_c = stopThumbRef.value) == null ? void 0 : _c.$el.blur();
                (_d = startThumbRef.value) == null ? void 0 : _d.$el.focus();
              }
            },
            "onBlur": () => {
              blur();
              activeThumbRef.value = void 0;
            },
            "min": model.value[0],
            "max": max.value,
            "position": trackStop.value,
            "ripple": props.ripple
          }, {
            "thumb-label": slots["thumb-label"]
          })]);
        }
      });
    });
    return {};
  }
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    const { dialog, isEdition } = storeToRefs(useTournamentStore());
    const title = isEdition.value ? "Editar Torneo" : "Crear un torneo";
    const subtitle = isEdition.value ? "Modifica los detalles del torneo." : "Completa los detalles del torneo.";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VCardItem, null, {
        prepend: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VSheet, {
              border: "primary thin",
              class: "mx-auto d-flex justify-center align-center mr-2 rounded-lg",
              height: "45",
              width: "45"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, { name: "mdi-light:trophy" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, { name: "mdi-light:trophy" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VSheet, {
                border: "primary thin",
                class: "mx-auto d-flex justify-center align-center mr-2 rounded-lg",
                height: "45",
                width: "45"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, { name: "mdi-light:trophy" })
                ]),
                _: 1
              })
            ];
          }
        }),
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class=""${_scopeId}>${ssrInterpolate(unref(title))}</span>`);
          } else {
            return [
              createVNode("span", { class: "" }, toDisplayString(unref(title)), 1)
            ];
          }
        }),
        subtitle: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(subtitle))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(subtitle)), 1)
            ];
          }
        }),
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "futzo-icon:x-dialog cursor-pointer",
              onClick: ($event) => dialog.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, {
                name: "futzo-icon:x-dialog cursor-pointer",
                onClick: ($event) => dialog.value = false
              }, null, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VDivider, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/dialog/header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "01-basicInfo",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const { footballTypes } = storeToRefs(useLeaguesStore());
    const { formats } = storeToRefs(useCategoryStore());
    const { isEdition, tournamentStoreRequest } = storeToRefs(useTournamentStore());
    const { handleSubmit, fields, validate } = useSchemas(
      isEdition.value ? "edit-tournament-basic-info" : "create-tournament-basic-info"
    );
    const minMax = ref();
    watch(minMax, (value) => {
      fields.minMax.fieldValue = value;
    });
    __expose({
      validate,
      handleSubmit
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseInput = _sfc_main$5;
      const _component_BaseCalendarInput = _sfc_main$6;
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "container" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_BaseInput, {
              modelValue: unref(fields).name,
              "onUpdate:modelValue": ($event) => unref(fields).name = $event,
              label: "Nombre del torneo*",
              placeholder: "p.ej. Torneo de verano"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseInput, { label: "Fecha de inicio*" }, {
              input: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_BaseCalendarInput, {
                    start_date: unref(fields).start_date.fieldValue,
                    "onUpdate:start_date": ($event) => unref(fields).start_date.fieldValue = $event,
                    end_date: unref(fields).end_date.fieldValue,
                    "onUpdate:end_date": ($event) => unref(fields).end_date.fieldValue = $event,
                    multiCalendar: unref(isEdition)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_BaseCalendarInput, {
                      start_date: unref(fields).start_date.fieldValue,
                      "onUpdate:start_date": ($event) => unref(fields).start_date.fieldValue = $event,
                      end_date: unref(fields).end_date.fieldValue,
                      "onUpdate:end_date": ($event) => unref(fields).end_date.fieldValue = $event,
                      multiCalendar: unref(isEdition)
                    }, null, 8, ["start_date", "onUpdate:start_date", "end_date", "onUpdate:end_date", "multiCalendar"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseInput, { label: "Imagen del torneo" }, {
              input: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$7, {
                    modelValue: unref(fields).image.fieldValue,
                    "onUpdate:modelValue": ($event) => unref(fields).image.fieldValue = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="${ssrRenderClass([
                    unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : "",
                    "text-error text-caption"
                  ])}"${_scopeId2}>${ssrInterpolate((_a = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a : "")}</span>`);
                } else {
                  return [
                    createVNode(_sfc_main$7, {
                      modelValue: unref(fields).image.fieldValue,
                      "onUpdate:modelValue": ($event) => unref(fields).image.fieldValue = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("span", {
                      class: [
                        "text-error text-caption",
                        unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : ""
                      ]
                    }, toDisplayString((_b = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _b : ""), 3)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseInput, { label: "Formato*" }, {
              input: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VSelect, mergeProps({
                    "no-data-text": "No hay formatos",
                    items: unref(formats),
                    density: "compact",
                    "item-title": "name",
                    "item-value": "id",
                    placeholder: "Formato",
                    "menu-icon": "mdi-chevron-down",
                    modelValue: unref(fields).tournament_format_id.fieldValue,
                    "onUpdate:modelValue": ($event) => unref(fields).tournament_format_id.fieldValue = $event
                  }, unref(fields).tournament_format_id.fieldPropsValue), {
                    item: withCtx(({ props, item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VListItem, props, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTooltip, {
                                activator: "parent",
                                location: "end",
                                "max-width": "300"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(item.raw.description)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(item.raw.description), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTooltip, {
                                  activator: "parent",
                                  location: "end",
                                  "max-width": "300"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.raw.description), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VListItem, props, {
                            default: withCtx(() => [
                              createVNode(VTooltip, {
                                activator: "parent",
                                location: "end",
                                "max-width": "300"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.raw.description), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1040)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VSelect, mergeProps({
                      "no-data-text": "No hay formatos",
                      items: unref(formats),
                      density: "compact",
                      "item-title": "name",
                      "item-value": "id",
                      placeholder: "Formato",
                      "menu-icon": "mdi-chevron-down",
                      modelValue: unref(fields).tournament_format_id.fieldValue,
                      "onUpdate:modelValue": ($event) => unref(fields).tournament_format_id.fieldValue = $event
                    }, unref(fields).tournament_format_id.fieldPropsValue), {
                      item: withCtx(({ props, item }) => [
                        createVNode(VListItem, props, {
                          default: withCtx(() => [
                            createVNode(VTooltip, {
                              activator: "parent",
                              location: "end",
                              "max-width": "300"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.raw.description), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1040)
                      ]),
                      _: 1
                    }, 16, ["items", "modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseInput, { label: "Tipo de torneo*" }, {
              input: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VSelect, mergeProps({
                    "no-data-text": "No hay formatos",
                    items: unref(footballTypes),
                    density: "compact",
                    "item-title": "name",
                    "item-value": "id",
                    placeholder: "Tipo",
                    "menu-icon": "mdi-chevron-down",
                    modelValue: unref(fields).football_type_id.fieldValue,
                    "onUpdate:modelValue": ($event) => unref(fields).football_type_id.fieldValue = $event
                  }, unref(fields).football_type_id.fieldPropsValue), {
                    item: withCtx(({ props, item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VListItem, props, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTooltip, {
                                activator: "parent",
                                location: "end",
                                "max-width": "300"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(item.raw.description)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(item.raw.description), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTooltip, {
                                  activator: "parent",
                                  location: "end",
                                  "max-width": "300"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.raw.description), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VListItem, props, {
                            default: withCtx(() => [
                              createVNode(VTooltip, {
                                activator: "parent",
                                location: "end",
                                "max-width": "300"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.raw.description), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1040)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VSelect, mergeProps({
                      "no-data-text": "No hay formatos",
                      items: unref(footballTypes),
                      density: "compact",
                      "item-title": "name",
                      "item-value": "id",
                      placeholder: "Tipo",
                      "menu-icon": "mdi-chevron-down",
                      modelValue: unref(fields).football_type_id.fieldValue,
                      "onUpdate:modelValue": ($event) => unref(fields).football_type_id.fieldValue = $event
                    }, unref(fields).football_type_id.fieldPropsValue), {
                      item: withCtx(({ props, item }) => [
                        createVNode(VListItem, props, {
                          default: withCtx(() => [
                            createVNode(VTooltip, {
                              activator: "parent",
                              location: "end",
                              "max-width": "300"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.raw.description), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1040)
                      ]),
                      _: 1
                    }, 16, ["items", "modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseInput, { label: "Categor\xEDa*" }, {
              input: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$8, {
                    disabled: false,
                    modelValue: unref(fields).category_id.fieldValue,
                    "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event,
                    errors: unref(fields).category_id.fieldPropsValue
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$8, {
                      disabled: false,
                      modelValue: unref(fields).category_id.fieldValue,
                      "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event,
                      errors: unref(fields).category_id.fieldPropsValue
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "errors"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseInput, {
              label: "Equipos*",
              sublabel: "M\xEDnimo y m\xE1ximo"
            }, {
              input: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRangeSlider, {
                    step: "1",
                    max: 40,
                    density: "comfortable",
                    "hide-spin-buttons": "",
                    hint: "Selecciona la cantidad de equipos requeridos para iniciar el torneo y el l\xEDmite de participantes permitidos.",
                    "persistent-hint": "",
                    modelValue: unref(minMax),
                    "onUpdate:modelValue": ($event) => isRef(minMax) ? minMax.value = $event : null,
                    strict: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VRangeSlider, {
                      step: "1",
                      max: 40,
                      density: "comfortable",
                      "hide-spin-buttons": "",
                      hint: "Selecciona la cantidad de equipos requeridos para iniciar el torneo y el l\xEDmite de participantes permitidos.",
                      "persistent-hint": "",
                      modelValue: unref(minMax),
                      "onUpdate:modelValue": ($event) => isRef(minMax) ? minMax.value = $event : null,
                      strict: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_BaseInput, {
                modelValue: unref(fields).name,
                "onUpdate:modelValue": ($event) => unref(fields).name = $event,
                label: "Nombre del torneo*",
                placeholder: "p.ej. Torneo de verano"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_BaseInput, { label: "Fecha de inicio*" }, {
                input: withCtx(() => [
                  createVNode(_component_BaseCalendarInput, {
                    start_date: unref(fields).start_date.fieldValue,
                    "onUpdate:start_date": ($event) => unref(fields).start_date.fieldValue = $event,
                    end_date: unref(fields).end_date.fieldValue,
                    "onUpdate:end_date": ($event) => unref(fields).end_date.fieldValue = $event,
                    multiCalendar: unref(isEdition)
                  }, null, 8, ["start_date", "onUpdate:start_date", "end_date", "onUpdate:end_date", "multiCalendar"])
                ]),
                _: 1
              }),
              createVNode(_component_BaseInput, { label: "Imagen del torneo" }, {
                input: withCtx(() => {
                  var _a;
                  return [
                    createVNode(_sfc_main$7, {
                      modelValue: unref(fields).image.fieldValue,
                      "onUpdate:modelValue": ($event) => unref(fields).image.fieldValue = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("span", {
                      class: [
                        "text-error text-caption",
                        unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : ""
                      ]
                    }, toDisplayString((_a = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a : ""), 3)
                  ];
                }),
                _: 1
              }),
              createVNode(_component_BaseInput, { label: "Formato*" }, {
                input: withCtx(() => [
                  createVNode(VSelect, mergeProps({
                    "no-data-text": "No hay formatos",
                    items: unref(formats),
                    density: "compact",
                    "item-title": "name",
                    "item-value": "id",
                    placeholder: "Formato",
                    "menu-icon": "mdi-chevron-down",
                    modelValue: unref(fields).tournament_format_id.fieldValue,
                    "onUpdate:modelValue": ($event) => unref(fields).tournament_format_id.fieldValue = $event
                  }, unref(fields).tournament_format_id.fieldPropsValue), {
                    item: withCtx(({ props, item }) => [
                      createVNode(VListItem, props, {
                        default: withCtx(() => [
                          createVNode(VTooltip, {
                            activator: "parent",
                            location: "end",
                            "max-width": "300"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.raw.description), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1040)
                    ]),
                    _: 1
                  }, 16, ["items", "modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_BaseInput, { label: "Tipo de torneo*" }, {
                input: withCtx(() => [
                  createVNode(VSelect, mergeProps({
                    "no-data-text": "No hay formatos",
                    items: unref(footballTypes),
                    density: "compact",
                    "item-title": "name",
                    "item-value": "id",
                    placeholder: "Tipo",
                    "menu-icon": "mdi-chevron-down",
                    modelValue: unref(fields).football_type_id.fieldValue,
                    "onUpdate:modelValue": ($event) => unref(fields).football_type_id.fieldValue = $event
                  }, unref(fields).football_type_id.fieldPropsValue), {
                    item: withCtx(({ props, item }) => [
                      createVNode(VListItem, props, {
                        default: withCtx(() => [
                          createVNode(VTooltip, {
                            activator: "parent",
                            location: "end",
                            "max-width": "300"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.raw.description), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1040)
                    ]),
                    _: 1
                  }, 16, ["items", "modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_BaseInput, { label: "Categor\xEDa*" }, {
                input: withCtx(() => [
                  createVNode(_sfc_main$8, {
                    disabled: false,
                    modelValue: unref(fields).category_id.fieldValue,
                    "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event,
                    errors: unref(fields).category_id.fieldPropsValue
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "errors"])
                ]),
                _: 1
              }),
              createVNode(_component_BaseInput, {
                label: "Equipos*",
                sublabel: "M\xEDnimo y m\xE1ximo"
              }, {
                input: withCtx(() => [
                  createVNode(VRangeSlider, {
                    step: "1",
                    max: 40,
                    density: "comfortable",
                    "hide-spin-buttons": "",
                    hint: "Selecciona la cantidad de equipos requeridos para iniciar el torneo y el l\xEDmite de participantes permitidos.",
                    "persistent-hint": "",
                    modelValue: unref(minMax),
                    "onUpdate:modelValue": ($event) => isRef(minMax) ? minMax.value = $event : null,
                    strict: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/stepper/01-basicInfo.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "02-detailsInfo",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const { isEdition, tournamentStoreRequest } = storeToRefs(useTournamentStore());
    const { handleSubmit, fields, validate } = useSchemas(
      isEdition.value ? "edit-tournament-details-info" : "create-tournament-details-info"
    );
    __expose({
      validate,
      handleSubmit
    });
    const search2 = ref("");
    const items = ref([]);
    const searchHandler2 = (term) => console.log(term);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Ubicaciones* </span><small class="d-block text-caption"${_scopeId3}> Donde se llevaran acabo los partidos </small>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Ubicaciones* "),
                          createVNode("small", { class: "d-block text-caption" }, " Donde se llevaran acabo los partidos ")
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
                        _push4(ssrRenderComponent(VAutocomplete, mergeProps({
                          multiple: "",
                          "item-value": "id",
                          "item-title": "name",
                          "item-props": (item) => ({ title: item == null ? void 0 : item.name, subtitle: `Campos disponibles :${item == null ? void 0 : item.field_count}` }),
                          search: unref(search2),
                          items: unref(items),
                          modelValue: unref(fields).locationIds.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).locationIds.fieldValue = $event
                        }, unref(fields).locationIds.fieldPropsValue, { "onUpdate:search": searchHandler2 }), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, mergeProps({
                            multiple: "",
                            "item-value": "id",
                            "item-title": "name",
                            "item-props": (item) => ({ title: item == null ? void 0 : item.name, subtitle: `Campos disponibles :${item == null ? void 0 : item.field_count}` }),
                            search: unref(search2),
                            items: unref(items),
                            modelValue: unref(fields).locationIds.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).locationIds.fieldValue = $event
                          }, unref(fields).locationIds.fieldPropsValue, { "onUpdate:search": searchHandler2 }), null, 16, ["item-props", "search", "items", "modelValue", "onUpdate:modelValue"])
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
                        createVNode("span", { class: "text-body-1" }, " Ubicaciones* "),
                        createVNode("small", { class: "d-block text-caption" }, " Donde se llevaran acabo los partidos ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, mergeProps({
                          multiple: "",
                          "item-value": "id",
                          "item-title": "name",
                          "item-props": (item) => ({ title: item == null ? void 0 : item.name, subtitle: `Campos disponibles :${item == null ? void 0 : item.field_count}` }),
                          search: unref(search2),
                          items: unref(items),
                          modelValue: unref(fields).locationIds.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).locationIds.fieldValue = $event
                        }, unref(fields).locationIds.fieldPropsValue, { "onUpdate:search": searchHandler2 }), null, 16, ["item-props", "search", "items", "modelValue", "onUpdate:modelValue"])
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Premio </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Premio ")
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
                          placeholder: "p.ej. trofeo y premio en efectivo...",
                          density: "compact",
                          variant: "outlined",
                          modelValue: unref(fields).prize.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).prize.fieldValue = $event
                        }, unref(fields).prize.fieldPropsValue), {
                          "append-inner": withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Icon, {
                                name: "futzo-icon:help-circle",
                                class: "cursor-pointer"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTooltip, { activator: "parent" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Este premio ser\xE1 otorgado al finalizar el torneo. `);
                                  } else {
                                    return [
                                      createTextVNode(" Este premio ser\xE1 otorgado al finalizar el torneo. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Icon, {
                                  name: "futzo-icon:help-circle",
                                  class: "cursor-pointer"
                                }),
                                createVNode(VTooltip, { activator: "parent" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Este premio ser\xE1 otorgado al finalizar el torneo. ")
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
                          createVNode(VTextField, mergeProps({
                            placeholder: "p.ej. trofeo y premio en efectivo...",
                            density: "compact",
                            variant: "outlined",
                            modelValue: unref(fields).prize.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).prize.fieldValue = $event
                          }, unref(fields).prize.fieldPropsValue), {
                            "append-inner": withCtx(() => [
                              createVNode(_component_Icon, {
                                name: "futzo-icon:help-circle",
                                class: "cursor-pointer"
                              }),
                              createVNode(VTooltip, { activator: "parent" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Este premio ser\xE1 otorgado al finalizar el torneo. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 16, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode("span", { class: "text-body-1" }, " Premio ")
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
                          placeholder: "p.ej. trofeo y premio en efectivo...",
                          density: "compact",
                          variant: "outlined",
                          modelValue: unref(fields).prize.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).prize.fieldValue = $event
                        }, unref(fields).prize.fieldPropsValue), {
                          "append-inner": withCtx(() => [
                            createVNode(_component_Icon, {
                              name: "futzo-icon:help-circle",
                              class: "cursor-pointer"
                            }),
                            createVNode(VTooltip, { activator: "parent" }, {
                              default: withCtx(() => [
                                createTextVNode(" Este premio ser\xE1 otorgado al finalizar el torneo. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 16, ["modelValue", "onUpdate:modelValue"])
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Descripci\xF3n </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Descripci\xF3n ")
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
                        _push4(ssrRenderComponent(VTextarea, mergeProps({
                          modelValue: unref(fields).description.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).description.fieldValue = $event
                        }, unref(fields).description.fieldPropsValue, {
                          placeholder: "Una breve descripci\xF3n del torneo...",
                          variant: "outlined",
                          dense: "",
                          rows: "2",
                          class: "rounded-lg"
                        }), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextarea, mergeProps({
                            modelValue: unref(fields).description.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).description.fieldValue = $event
                          }, unref(fields).description.fieldPropsValue, {
                            placeholder: "Una breve descripci\xF3n del torneo...",
                            variant: "outlined",
                            dense: "",
                            rows: "2",
                            class: "rounded-lg"
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
                        createVNode("span", { class: "text-body-1" }, " Descripci\xF3n ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextarea, mergeProps({
                          modelValue: unref(fields).description.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).description.fieldValue = $event
                        }, unref(fields).description.fieldPropsValue, {
                          placeholder: "Una breve descripci\xF3n del torneo...",
                          variant: "outlined",
                          dense: "",
                          rows: "2",
                          class: "rounded-lg"
                        }), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                      createVNode("span", { class: "text-body-1" }, " Ubicaciones* "),
                      createVNode("small", { class: "d-block text-caption" }, " Donde se llevaran acabo los partidos ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, mergeProps({
                        multiple: "",
                        "item-value": "id",
                        "item-title": "name",
                        "item-props": (item) => ({ title: item == null ? void 0 : item.name, subtitle: `Campos disponibles :${item == null ? void 0 : item.field_count}` }),
                        search: unref(search2),
                        items: unref(items),
                        modelValue: unref(fields).locationIds.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).locationIds.fieldValue = $event
                      }, unref(fields).locationIds.fieldPropsValue, { "onUpdate:search": searchHandler2 }), null, 16, ["item-props", "search", "items", "modelValue", "onUpdate:modelValue"])
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
                      createVNode("span", { class: "text-body-1" }, " Premio ")
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
                        placeholder: "p.ej. trofeo y premio en efectivo...",
                        density: "compact",
                        variant: "outlined",
                        modelValue: unref(fields).prize.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).prize.fieldValue = $event
                      }, unref(fields).prize.fieldPropsValue), {
                        "append-inner": withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "futzo-icon:help-circle",
                            class: "cursor-pointer"
                          }),
                          createVNode(VTooltip, { activator: "parent" }, {
                            default: withCtx(() => [
                              createTextVNode(" Este premio ser\xE1 otorgado al finalizar el torneo. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 16, ["modelValue", "onUpdate:modelValue"])
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
                      createVNode("span", { class: "text-body-1" }, " Descripci\xF3n ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextarea, mergeProps({
                        modelValue: unref(fields).description.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).description.fieldValue = $event
                      }, unref(fields).description.fieldPropsValue, {
                        placeholder: "Una breve descripci\xF3n del torneo...",
                        variant: "outlined",
                        dense: "",
                        rows: "2",
                        class: "rounded-lg"
                      }), null, 16, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/stepper/02-detailsInfo.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const { steps, isEdition, tournamentStoreRequest, dialog } = storeToRefs(useTournamentStore());
    const stepRef = ref({
      validate: Function,
      handleSubmit: Function
    });
    const backHandler = () => {
      if (steps.value.current === "basic-info") {
        dialog.value = false;
        return;
      }
      const stepsOrder = ["basic-info", "details-info"];
      const currentStepIndex = stepsOrder.indexOf(steps.value.current);
      steps.value.current = stepsOrder[currentStepIndex - 1];
    };
    const nextHandler = async () => {
      const statusForm = await stepRef.value.validate();
      if (statusForm.valid) {
        const tournamentStoreRequestValues = await getFormValues();
        fillTournamentStoreRequest(tournamentStoreRequestValues);
        const stepsOrder = ["basic-info", "details-info"];
        const currentStepIndex = stepsOrder.indexOf(steps.value.current);
        if (!steps.value.steps[currentStepIndex].completed) {
          steps.value.steps[currentStepIndex].completed = true;
        }
        const isLastStep = currentStepIndex === stepsOrder.length - 1;
        isLastStep ? await saveHandler() : steps.value.current = stepsOrder[currentStepIndex + 1];
      }
    };
    async function saveHandler() {
      loading.value = true;
      isEdition.value ? await useTournamentStore().updateTournament() : await useTournamentStore().storeTournament();
      loading.value = false;
    }
    async function getFormValues() {
      const formValues = stepRef.value.handleSubmit(
        (values) => values
      );
      return await formValues();
    }
    function fillTournamentStoreRequest(values) {
      if (steps.value.current === "basic-info") {
        tournamentStoreRequest.value = {
          ...tournamentStoreRequest.value,
          basic: { ...values }
        };
      }
      if (steps.value.current === "details-info") {
        tournamentStoreRequest.value = {
          ...tournamentStoreRequest.value,
          details: { ...values }
        };
      }
    }
    const textButtonCancel = computed(() => {
      if (steps.value.current === "basic-info") {
        return "Cancelar";
      } else {
        return "Regresar";
      }
    });
    const textButton = computed(() => {
      switch (steps.value.current) {
        case "basic-info":
          return "Siguiente";
        case "details-info":
          return "Crear torneo";
        default:
          return "Crear torneo";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PerfectScrollbar = resolveComponent("PerfectScrollbar");
      const _component_transition_slide = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_PerfectScrollbar, mergeProps({ options: {
        suppressScrollX: true
      } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, { class: "pa-0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(IndicatorStep, { "form-steps": unref(steps) }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(IndicatorStep, { "form-steps": unref(steps) }, null, 8, ["form-steps"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(IndicatorStep, { "form-steps": unref(steps) }, null, 8, ["form-steps"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_transition_slide, {
                                      group: "",
                                      offset: {
                                        enter: ["-100%", 0],
                                        leave: ["100%", 0]
                                      }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          if (unref(steps).current === "basic-info") {
                                            _push7(ssrRenderComponent(_sfc_main$3, {
                                              ref_key: "stepRef",
                                              ref: stepRef,
                                              key: unref(steps).current
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            _push7(`<!---->`);
                                          }
                                          if (unref(steps).current === "details-info") {
                                            _push7(ssrRenderComponent(_sfc_main$2, {
                                              ref_key: "stepRef",
                                              ref: stepRef,
                                              key: unref(steps).current
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            _push7(`<!---->`);
                                          }
                                        } else {
                                          return [
                                            unref(steps).current === "basic-info" ? (openBlock(), createBlock(_sfc_main$3, {
                                              ref_key: "stepRef",
                                              ref: stepRef,
                                              key: unref(steps).current
                                            })) : createCommentVNode("", true),
                                            unref(steps).current === "details-info" ? (openBlock(), createBlock(_sfc_main$2, {
                                              ref_key: "stepRef",
                                              ref: stepRef,
                                              key: unref(steps).current
                                            })) : createCommentVNode("", true)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
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
                                          unref(steps).current === "basic-info" ? (openBlock(), createBlock(_sfc_main$3, {
                                            ref_key: "stepRef",
                                            ref: stepRef,
                                            key: unref(steps).current
                                          })) : createCommentVNode("", true),
                                          unref(steps).current === "details-info" ? (openBlock(), createBlock(_sfc_main$2, {
                                            ref_key: "stepRef",
                                            ref: stepRef,
                                            key: unref(steps).current
                                          })) : createCommentVNode("", true)
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
                                        unref(steps).current === "basic-info" ? (openBlock(), createBlock(_sfc_main$3, {
                                          ref_key: "stepRef",
                                          ref: stepRef,
                                          key: unref(steps).current
                                        })) : createCommentVNode("", true),
                                        unref(steps).current === "details-info" ? (openBlock(), createBlock(_sfc_main$2, {
                                          ref_key: "stepRef",
                                          ref: stepRef,
                                          key: unref(steps).current
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "6" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, {
                                      variant: "outlined",
                                      block: "",
                                      color: "secondary",
                                      density: "comfortable",
                                      size: "large",
                                      onClick: backHandler
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(unref(textButtonCancel))}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(unref(textButtonCancel)), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VBtn, {
                                        variant: "outlined",
                                        block: "",
                                        color: "secondary",
                                        density: "comfortable",
                                        size: "large",
                                        onClick: backHandler
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(textButtonCancel)), 1)
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "6" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, {
                                      variant: "elevated",
                                      block: "",
                                      color: "primary",
                                      density: "comfortable",
                                      size: "large",
                                      loading: unref(loading),
                                      onClick: nextHandler
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(unref(textButton))}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(unref(textButton)), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VBtn, {
                                        variant: "elevated",
                                        block: "",
                                        color: "primary",
                                        density: "comfortable",
                                        size: "large",
                                        loading: unref(loading),
                                        onClick: nextHandler
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(textButton)), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["loading"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "6" }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      variant: "outlined",
                                      block: "",
                                      color: "secondary",
                                      density: "comfortable",
                                      size: "large",
                                      onClick: backHandler
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(textButtonCancel)), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "6" }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      variant: "elevated",
                                      block: "",
                                      color: "primary",
                                      density: "comfortable",
                                      size: "large",
                                      loading: unref(loading),
                                      onClick: nextHandler
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(textButton)), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["loading"])
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
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(IndicatorStep, { "form-steps": unref(steps) }, null, 8, ["form-steps"])
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
                                      unref(steps).current === "basic-info" ? (openBlock(), createBlock(_sfc_main$3, {
                                        ref_key: "stepRef",
                                        ref: stepRef,
                                        key: unref(steps).current
                                      })) : createCommentVNode("", true),
                                      unref(steps).current === "details-info" ? (openBlock(), createBlock(_sfc_main$2, {
                                        ref_key: "stepRef",
                                        ref: stepRef,
                                        key: unref(steps).current
                                      })) : createCommentVNode("", true)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "6" }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    variant: "outlined",
                                    block: "",
                                    color: "secondary",
                                    density: "comfortable",
                                    size: "large",
                                    onClick: backHandler
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(textButtonCancel)), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "6" }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    variant: "elevated",
                                    block: "",
                                    color: "primary",
                                    density: "comfortable",
                                    size: "large",
                                    loading: unref(loading),
                                    onClick: nextHandler
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(textButton)), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["loading"])
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
                    createVNode(VContainer, { class: "pa-0" }, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, null, {
                              default: withCtx(() => [
                                createVNode(IndicatorStep, { "form-steps": unref(steps) }, null, 8, ["form-steps"])
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
                                    unref(steps).current === "basic-info" ? (openBlock(), createBlock(_sfc_main$3, {
                                      ref_key: "stepRef",
                                      ref: stepRef,
                                      key: unref(steps).current
                                    })) : createCommentVNode("", true),
                                    unref(steps).current === "details-info" ? (openBlock(), createBlock(_sfc_main$2, {
                                      ref_key: "stepRef",
                                      ref: stepRef,
                                      key: unref(steps).current
                                    })) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "6" }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  variant: "outlined",
                                  block: "",
                                  color: "secondary",
                                  density: "comfortable",
                                  size: "large",
                                  onClick: backHandler
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(textButtonCancel)), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "6" }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  variant: "elevated",
                                  block: "",
                                  color: "primary",
                                  density: "comfortable",
                                  size: "large",
                                  loading: unref(loading),
                                  onClick: nextHandler
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(textButton)), 1)
                                  ]),
                                  _: 1
                                }, 8, ["loading"])
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
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(VContainer, { class: "pa-0" }, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(IndicatorStep, { "form-steps": unref(steps) }, null, 8, ["form-steps"])
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
                                  unref(steps).current === "basic-info" ? (openBlock(), createBlock(_sfc_main$3, {
                                    ref_key: "stepRef",
                                    ref: stepRef,
                                    key: unref(steps).current
                                  })) : createCommentVNode("", true),
                                  unref(steps).current === "details-info" ? (openBlock(), createBlock(_sfc_main$2, {
                                    ref_key: "stepRef",
                                    ref: stepRef,
                                    key: unref(steps).current
                                  })) : createCommentVNode("", true)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "6" }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                variant: "outlined",
                                block: "",
                                color: "secondary",
                                density: "comfortable",
                                size: "large",
                                onClick: backHandler
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(textButtonCancel)), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "6" }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                variant: "elevated",
                                block: "",
                                color: "primary",
                                density: "comfortable",
                                size: "large",
                                loading: unref(loading),
                                onClick: nextHandler
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(textButton)), 1)
                                ]),
                                _: 1
                              }, 8, ["loading"])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/stepper/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { steps, dialog } = storeToRefs(useTournamentStore());
    const leaveHandler = () => {
      useTournamentStore().$reset();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        modelValue: unref(dialog),
        "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
        "max-width": "690",
        onAfterLeave: leaveHandler,
        scrollable: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, {
              class: "create-tournament-card futzo-rounded",
              height: "100%",
              style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$4, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    step: unref(steps).current
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$4),
                    createVNode(_sfc_main$1, {
                      step: unref(steps).current
                    }, null, 8, ["step"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, {
                class: "create-tournament-card futzo-rounded",
                height: "100%",
                style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$4),
                  createVNode(_sfc_main$1, {
                    step: unref(steps).current
                  }, null, 8, ["step"])
                ]),
                _: 1
              }, 8, ["style"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/dialog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=index-BgGrO183.mjs.map
