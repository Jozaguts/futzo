import { aw as useTournamentStore, V as VCard, b as VCardItem, c as VCardTitle, W as VCardSubtitle, bv as VProgressLinear, av as VDivider, d as VCardText, bN as VCardActions, e as VTextField, bY as useLocationStore, ay as VListItem, az as VListItemTitle, bZ as VChipGroup, bm as VChip, b_ as VResponsive, _ as __nuxt_component_0$1, f as _export_sfc } from './server.mjs';
import { useSSRContext, defineComponent, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, mergeModels, useModel, renderSlot, openBlock, createBlock, ref, Fragment, renderList, withKeys, watch, createCommentVNode, computed } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { V as VDialog, a as VAutocomplete, I as IndicatorStep } from './IndicatorStep-DmifF57j.mjs';
import { V as VSheet } from './VSheet-UXYurn5r.mjs';
import { _ as __nuxt_component_0 } from './TransitionSlide-BfR1-sQr.mjs';
import { u as useSchemas } from './useSchemas-CqEBlE8b.mjs';
import { V as Vn } from './main-Cx90S_O0.mjs';
import { storeToRefs } from 'pinia';
import { V as VContainer } from './VContainer-DNC4AmJg.mjs';
import { V as VRow, a as VCol } from './VRow-BbW5rOE9.mjs';
import { V as VBtn } from './VBtn-DMHWn55H.mjs';
import { u as useDebounceFn } from './index-93-MdpO_.mjs';
import { useAutoAnimate } from '@formkit/auto-animate/vue';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import '@vue/reactivity';
import 'vue3-perfect-scrollbar';
import 'awesome-phonenumber';
import './filter-DQQ8xlhl.mjs';
import '@morev/vue-transitions';
import './vee-validate-DdIKuPJn.mjs';
import 'yup';
import 'date-fns';

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Dialog",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  }, {
    "modelValue": { type: Boolean },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["leaving"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const dialog = useModel(__props, "modelValue");
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      _push(ssrRenderComponent(VDialog, mergeProps({
        modelValue: dialog.value,
        "onUpdate:modelValue": ($event) => dialog.value = $event,
        "max-width": "690",
        onAfterLeave: ($event) => emits("leaving"),
        scrollable: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, {
              loading: __props.loading,
              class: "create-tournament-card futzo-rounded",
              height: "100%",
              style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
            }, {
              loader: withCtx(({ isActive }, _push3, _parent3, _scopeId2) => {
                if (_push3) ;
                else {
                  return [];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardItem, null, {
                    prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VSheet, {
                          border: "primary thin",
                          class: "mx-auto d-flex justify-center align-center mr-2 rounded-lg",
                          height: "45",
                          width: "45"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Icon, { name: "line-md:map-marker-loop" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Icon, { name: "line-md:map-marker-loop" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSheet, {
                            border: "primary thin",
                            class: "mx-auto d-flex justify-center align-center mr-2 rounded-lg",
                            height: "45",
                            width: "45"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Icon, { name: "line-md:map-marker-loop" })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "futzo-icon:x-dialog",
                          onClick: ($event) => dialog.value = false
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "futzo-icon:x-dialog",
                            onClick: ($event) => dialog.value = false
                          }, null, 8, ["onClick"])
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span${_scopeId4}>${ssrInterpolate(__props.title)}</span>`);
                            } else {
                              return [
                                createVNode("span", null, toDisplayString(__props.title), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardSubtitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a;
                            if (_push5) {
                              _push5(`<span${_scopeId4}>${(_a = __props.subtitle) != null ? _a : ""}</span>`);
                            } else {
                              return [
                                createVNode("span", { innerHTML: __props.subtitle }, null, 8, ["innerHTML"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createVNode("span", null, toDisplayString(__props.title), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VCardSubtitle, null, {
                            default: withCtx(() => [
                              createVNode("span", { innerHTML: __props.subtitle }, null, 8, ["innerHTML"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (__props.loading) {
                    _push3(ssrRenderComponent(VProgressLinear, {
                      active: __props.loading,
                      color: "primary",
                      height: "4",
                      indeterminate: ""
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                  }
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "v-card-text", {}, null, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "v-card-text")
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, { class: "d-flex px-6 pb-6 justify-space-between" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "actions")
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardItem, null, {
                      prepend: withCtx(() => [
                        createVNode(VSheet, {
                          border: "primary thin",
                          class: "mx-auto d-flex justify-center align-center mr-2 rounded-lg",
                          height: "45",
                          width: "45"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Icon, { name: "line-md:map-marker-loop" })
                          ]),
                          _: 1
                        })
                      ]),
                      append: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "futzo-icon:x-dialog",
                          onClick: ($event) => dialog.value = false
                        }, null, 8, ["onClick"])
                      ]),
                      default: withCtx(() => [
                        createVNode(VCardTitle, null, {
                          default: withCtx(() => [
                            createVNode("span", null, toDisplayString(__props.title), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VCardSubtitle, null, {
                          default: withCtx(() => [
                            createVNode("span", { innerHTML: __props.subtitle }, null, 8, ["innerHTML"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    __props.loading ? (openBlock(), createBlock(VProgressLinear, {
                      key: 0,
                      active: __props.loading,
                      color: "primary",
                      height: "4",
                      indeterminate: ""
                    }, null, 8, ["active"])) : (openBlock(), createBlock(VDivider, { key: 1 })),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "v-card-text")
                      ]),
                      _: 3
                    }),
                    createVNode(VCardActions, { class: "d-flex px-6 pb-6 justify-space-between" }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "actions")
                      ]),
                      _: 3
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, {
                loading: __props.loading,
                class: "create-tournament-card futzo-rounded",
                height: "100%",
                style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
              }, {
                loader: withCtx(({ isActive }) => []),
                default: withCtx(() => [
                  createVNode(VCardItem, null, {
                    prepend: withCtx(() => [
                      createVNode(VSheet, {
                        border: "primary thin",
                        class: "mx-auto d-flex justify-center align-center mr-2 rounded-lg",
                        height: "45",
                        width: "45"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, { name: "line-md:map-marker-loop" })
                        ]),
                        _: 1
                      })
                    ]),
                    append: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "futzo-icon:x-dialog",
                        onClick: ($event) => dialog.value = false
                      }, null, 8, ["onClick"])
                    ]),
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createVNode("span", null, toDisplayString(__props.title), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(VCardSubtitle, null, {
                        default: withCtx(() => [
                          createVNode("span", { innerHTML: __props.subtitle }, null, 8, ["innerHTML"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  __props.loading ? (openBlock(), createBlock(VProgressLinear, {
                    key: 0,
                    active: __props.loading,
                    color: "primary",
                    height: "4",
                    indeterminate: ""
                  }, null, 8, ["active"])) : (openBlock(), createBlock(VDivider, { key: 1 })),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "v-card-text")
                    ]),
                    _: 3
                  }),
                  createVNode(VCardActions, { class: "d-flex px-6 pb-6 justify-space-between" }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "actions")
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              }, 8, ["loading", "style"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/Dialog.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const formatDate = (date) => {
  if (Array.isArray(date)) {
    return date.map((date2) => {
      return new Date(date2).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    });
  } else {
    return new Date(date).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "calendar",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    paddingBottom: {
      type: String,
      required: false
    },
    paddingTop: {
      type: String,
      required: false
    },
    multiCalendar: {
      type: Boolean,
      default: () => false
    },
    positionValues: {
      type: Object,
      default: () => ({ top: 300, left: 200, transform: "translate(50%)" })
    }
  }, {
    "dates": {},
    "datesModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["selected-dates"], ["update:dates"]),
  setup(__props, { emit: __emit }) {
    const dates = useModel(__props, "dates");
    const props = __props;
    const emits = __emit;
    const dp = ref();
    const getDate = (value, index) => {
      if (!value) return;
      const dates2 = value.map((date) => formatDate(date));
      return dates2[index - 1];
    };
    const selectDate = () => {
      dp.value.selectDate();
      emits("selected-dates", dates.value);
    };
    const customPosition = (inputElement) => {
      const inputRect = inputElement == null ? void 0 : inputElement.getBoundingClientRect();
      return {
        top: inputRect.top - props.positionValues.top,
        left: inputRect.left - props.positionValues.left,
        transform: props.positionValues.transform
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        "--08a3eef0": __props.paddingTop,
        "--22bf2218": __props.paddingBottom
      } };
      _push(ssrRenderComponent(unref(Vn), mergeProps({
        ref_key: "dp",
        ref: dp,
        modelValue: dates.value,
        "onUpdate:modelValue": ($event) => dates.value = $event,
        position: "left",
        range: props.multiCalendar,
        format: unref(formatDate),
        locale: "es",
        teleport: true,
        "min-date": /* @__PURE__ */ new Date(),
        "multi-calendars": { solo: true },
        "hide-input-icon": "",
        "enable-time-picker": false,
        "month-name-format": "long",
        "alt-position": customPosition,
        ui: {
          input: "v-field__input",
          menu: "border rounded-lg calendar-custom-width",
          calendarCell: "dp-custom-cell"
        },
        placeholder: "Selecciona las fechas del torneo"
      }, _attrs, _cssVars), {
        "dp-input": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VTextField, {
              value,
              density: "compact",
              variant: "outlined"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VTextField, {
                value,
                density: "compact",
                variant: "outlined"
              }, null, 8, ["value"])
            ];
          }
        }),
        "action-preview": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="d-flex w-100 justify-between align-center"${_scopeId}><span class="custom-field-date border-thin border-secondary border-opacity-100 px-4 py-2 mr-2 rounded text-body-2"${_scopeId}>${ssrInterpolate(getDate(value, 1))}</span><span${_scopeId}>-</span><span class="custom-field-date border-thin border-secondary border-opacity-100 px-4 py-2 ml-2 rounded text-body-2"${_scopeId}>${ssrInterpolate(getDate(value, 2))}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "d-flex w-100 justify-between align-center" }, [
                createVNode("span", { class: "custom-field-date border-thin border-secondary border-opacity-100 px-4 py-2 mr-2 rounded text-body-2" }, toDisplayString(getDate(value, 1)), 1),
                createVNode("span", null, "-"),
                createVNode("span", { class: "custom-field-date border-thin border-secondary border-opacity-100 px-4 py-2 ml-2 rounded text-body-2" }, toDisplayString(getDate(value, 2)), 1)
              ])
            ];
          }
        }),
        "action-buttons": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="mx-2 bg-surface border-thin border-secondary px-4 py-1 rounded"${_scopeId}> Cancelar </button><button class="bg-primary border-primary border-thin px-4 py-1 rounded"${_scopeId}> Aplicar </button>`);
          } else {
            return [
              createVNode("button", {
                onClick: () => unref(dp).closeMenu(),
                class: "mx-2 bg-surface border-thin border-secondary px-4 py-1 rounded"
              }, " Cancelar ", 8, ["onClick"]),
              createVNode("button", {
                class: "bg-primary border-primary border-thin px-4 py-1 rounded",
                onClick: selectDate
              }, " Aplicar ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendar.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "add-location",
  __ssrInlineRender: true,
  setup(__props) {
    const { locationDialog } = storeToRefs(useLocationStore());
    const { tournamentLocationStoreRequest, tournamentId } = storeToRefs(useTournamentStore());
    const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas("create-location");
    const tags = ref([]);
    const tag = ref();
    let foundedLocations = ref([]);
    const handleSelectLocation = (place) => {
      const placeId = place == null ? void 0 : place.place_id;
      if (!placeId) {
        fields.address.fieldValue = "";
        fields.city.fieldValue = "";
        return;
      }
      if (!(void 0).google || !(void 0).google.maps || !(void 0).google.maps.places) {
        console.error("Google Maps JavaScript API library is not loaded.");
        return;
      }
      const placesService = new (void 0).google.maps.places.PlacesService(
        (void 0).createElement("div")
      );
      placesService.getDetails(
        { placeId },
        (place2, status) => {
          if (status !== (void 0).google.maps.places.PlacesServiceStatus.OK) {
            console.error("Error fetching place details:", status);
            return;
          }
          const addressComponents = place2.address_components;
          const address = place2.formatted_address;
          let city = "";
          for (const component of addressComponents) {
            if (component.types.includes("locality")) {
              city = component.long_name;
              break;
            }
          }
          fields.address.fieldValue = address;
          fields.city.fieldValue = city;
        }
      );
    };
    const searchHandler = async (place) => {
      const response = await search(place);
      if (response) {
        foundedLocations.value = response;
      }
    };
    const search = useDebounceFn(async (place) => {
      if (!(void 0).google || !(void 0).google.maps || !(void 0).google.maps.places) {
        console.error("Google Maps JavaScript API library is not loaded.");
        return [];
      }
      const autocompleteService = new (void 0).google.maps.places.AutocompleteService();
      return new Promise((resolve) => {
        autocompleteService.getPlacePredictions(
          { input: place },
          (predictions, status) => {
            if (status !== (void 0).google.maps.places.PlacesServiceStatus.OK) {
              console.error("Error fetching place predictions:", status);
              resolve([]);
              return;
            }
            resolve(predictions);
          }
        );
      });
    }, 400);
    const saveLocationHandler = handleSubmit(async (values) => {
      tournamentLocationStoreRequest.value = {
        tournamentId: tournamentId.value,
        location: values,
        tags: tags.value
      };
      await useTournamentStore().storeTournamentLocation().finally(() => {
        tournamentLocationStoreRequest.value = {};
        locationDialog.value = false;
        fields.location.fieldValue = null;
        Object.keys(fields).forEach((key) => {
          fields[key].fieldValue = null;
        });
        tag.value = "";
        tags.value = [];
      });
    });
    const tagHandler = () => {
      if (!tag.value) return;
      if (!tags.value.includes(tag.value)) {
        tags.value.push(tag.value);
        tag.value = "";
      }
    };
    const removeTag = (tag2) => {
      tags.value = tags.value.filter((t) => t !== tag2);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = _sfc_main$8;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        "max-width": "600",
        title: "Crear Nueva Locaci\xF3n",
        subtitle: "Registra una nueva locaci\xF3n para el torneo.<br/>  Una vez creada, podr\xE1s configurar su disponibilidad."
      }, _attrs), {
        "v-card-text": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          lg: "4",
                          md: "4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="text-body-1"${_scopeId4}> Club/Lugar* </span>`);
                            } else {
                              return [
                                createVNode("span", { class: "text-body-1" }, " Club/Lugar* ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          lg: "8",
                          md: "8"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VAutocomplete, mergeProps({
                                modelValue: unref(fields).location.fieldValue,
                                "onUpdate:modelValue": [($event) => unref(fields).location.fieldValue = $event, handleSelectLocation],
                                onBlur: ($event) => _ctx.$emit("update:modelValue", $event),
                                items: unref(foundedLocations),
                                "no-data-text": "No hay resultados",
                                outlined: "",
                                "return-object": "",
                                "hide-selected": "",
                                "clear-on-select": "",
                                clearable: "",
                                "no-filter": ""
                              }, unref(fields).location.fieldPropsValue, {
                                "onUpdate:search": ($event) => searchHandler($event)
                              }), {
                                item: withCtx(({ props, item }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VListItem, mergeProps(props, {
                                      "two-line": "",
                                      title: item.value.structured_formatting.main_text,
                                      subtitle: item.value.structured_formatting.secondary_text
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VListItem, mergeProps(props, {
                                        "two-line": "",
                                        title: item.value.structured_formatting.main_text,
                                        subtitle: item.value.structured_formatting.secondary_text
                                      }), null, 16, ["title", "subtitle"])
                                    ];
                                  }
                                }),
                                selection: withCtx(({ item }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VListItem, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VListItemTitle, null, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListItemTitle, {
                                              textContent: toDisplayString(item.value.structured_formatting.main_text)
                                            }, null, 8, ["textContent"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VListItem, null, {
                                        default: withCtx(() => [
                                          createVNode(VListItemTitle, {
                                            textContent: toDisplayString(item.value.structured_formatting.main_text)
                                          }, null, 8, ["textContent"])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VAutocomplete, mergeProps({
                                  modelValue: unref(fields).location.fieldValue,
                                  "onUpdate:modelValue": [($event) => unref(fields).location.fieldValue = $event, handleSelectLocation],
                                  onBlur: ($event) => _ctx.$emit("update:modelValue", $event),
                                  items: unref(foundedLocations),
                                  "no-data-text": "No hay resultados",
                                  outlined: "",
                                  "return-object": "",
                                  "hide-selected": "",
                                  "clear-on-select": "",
                                  clearable: "",
                                  "no-filter": ""
                                }, unref(fields).location.fieldPropsValue, {
                                  "onUpdate:search": ($event) => searchHandler($event)
                                }), {
                                  item: withCtx(({ props, item }) => [
                                    createVNode(VListItem, mergeProps(props, {
                                      "two-line": "",
                                      title: item.value.structured_formatting.main_text,
                                      subtitle: item.value.structured_formatting.secondary_text
                                    }), null, 16, ["title", "subtitle"])
                                  ]),
                                  selection: withCtx(({ item }) => [
                                    createVNode(VListItem, null, {
                                      default: withCtx(() => [
                                        createVNode(VListItemTitle, {
                                          textContent: toDisplayString(item.value.structured_formatting.main_text)
                                        }, null, 8, ["textContent"])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 1
                                }, 16, ["modelValue", "onUpdate:modelValue", "onBlur", "items", "onUpdate:search"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, {
                            cols: "12",
                            lg: "4",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-body-1" }, " Club/Lugar* ")
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
                                modelValue: unref(fields).location.fieldValue,
                                "onUpdate:modelValue": [($event) => unref(fields).location.fieldValue = $event, handleSelectLocation],
                                onBlur: ($event) => _ctx.$emit("update:modelValue", $event),
                                items: unref(foundedLocations),
                                "no-data-text": "No hay resultados",
                                outlined: "",
                                "return-object": "",
                                "hide-selected": "",
                                "clear-on-select": "",
                                clearable: "",
                                "no-filter": ""
                              }, unref(fields).location.fieldPropsValue, {
                                "onUpdate:search": ($event) => searchHandler($event)
                              }), {
                                item: withCtx(({ props, item }) => [
                                  createVNode(VListItem, mergeProps(props, {
                                    "two-line": "",
                                    title: item.value.structured_formatting.main_text,
                                    subtitle: item.value.structured_formatting.secondary_text
                                  }), null, 16, ["title", "subtitle"])
                                ]),
                                selection: withCtx(({ item }) => [
                                  createVNode(VListItem, null, {
                                    default: withCtx(() => [
                                      createVNode(VListItemTitle, {
                                        textContent: toDisplayString(item.value.structured_formatting.main_text)
                                      }, null, 8, ["textContent"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 1
                              }, 16, ["modelValue", "onUpdate:modelValue", "onBlur", "items", "onUpdate:search"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          lg: "4",
                          md: "4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="text-body-1"${_scopeId4}>Ciudad*</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "text-body-1" }, "Ciudad*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          lg: "8",
                          md: "8"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, mergeProps({
                                onBlur: ($event) => _ctx.$emit("update:modelValue", $event),
                                placeholder: "p.ej. Puerto Vallarta",
                                density: "compact",
                                variant: "outlined",
                                disabled: "",
                                modelValue: unref(fields).city.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).city.fieldValue = $event
                              }, unref(fields).city.fieldPropsValue), null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, mergeProps({
                                  onBlur: ($event) => _ctx.$emit("update:modelValue", $event),
                                  placeholder: "p.ej. Puerto Vallarta",
                                  density: "compact",
                                  variant: "outlined",
                                  disabled: "",
                                  modelValue: unref(fields).city.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).city.fieldValue = $event
                                }, unref(fields).city.fieldPropsValue), null, 16, ["onBlur", "modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, {
                            cols: "12",
                            lg: "4",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-body-1" }, "Ciudad*")
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
                                onBlur: ($event) => _ctx.$emit("update:modelValue", $event),
                                placeholder: "p.ej. Puerto Vallarta",
                                density: "compact",
                                variant: "outlined",
                                disabled: "",
                                modelValue: unref(fields).city.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).city.fieldValue = $event
                              }, unref(fields).city.fieldPropsValue), null, 16, ["onBlur", "modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          lg: "4",
                          md: "4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="text-body-1"${_scopeId4}>Direcci\xF3n*</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "text-body-1" }, "Direcci\xF3n*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          lg: "8",
                          md: "8"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, mergeProps({
                                onBlur: ($event) => _ctx.$emit("update:modelValue", $event),
                                placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                                density: "compact",
                                variant: "outlined",
                                disabled: "",
                                modelValue: unref(fields).address.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                              }, unref(fields).address.fieldPropsValue), null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, mergeProps({
                                  onBlur: ($event) => _ctx.$emit("update:modelValue", $event),
                                  placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                                  density: "compact",
                                  variant: "outlined",
                                  disabled: "",
                                  modelValue: unref(fields).address.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                                }, unref(fields).address.fieldPropsValue), null, 16, ["onBlur", "modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, {
                            cols: "12",
                            lg: "4",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-body-1" }, "Direcci\xF3n*")
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
                                onBlur: ($event) => _ctx.$emit("update:modelValue", $event),
                                placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                                density: "compact",
                                variant: "outlined",
                                disabled: "",
                                modelValue: unref(fields).address.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                              }, unref(fields).address.fieldPropsValue), null, 16, ["onBlur", "modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          lg: "4",
                          md: "4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="text-body-1"${_scopeId4}>Etiquetas </span>`);
                            } else {
                              return [
                                createVNode("span", { class: "text-body-1" }, "Etiquetas ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          lg: "8",
                          md: "8"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, {
                                placeholder: "p.ej. Campo 1.",
                                density: "compact",
                                variant: "outlined",
                                hint: "Presiona ENTER o + para agregar",
                                modelValue: unref(tag),
                                "onUpdate:modelValue": ($event) => isRef(tag) ? tag.value = $event : null,
                                modelModifiers: { trim: true },
                                onKeyup: tagHandler,
                                "persistent-hint": ""
                              }, {
                                append: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, {
                                      onClick: tagHandler,
                                      size: "small",
                                      density: "compact",
                                      icon: ""
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`+ `);
                                        } else {
                                          return [
                                            createTextVNode("+ ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VBtn, {
                                        onClick: tagHandler,
                                        size: "small",
                                        density: "compact",
                                        icon: ""
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("+ ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VChipGroup, {
                                colum: "",
                                variant: "outlined"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(unref(tags), (tag2, index) => {
                                      _push6(ssrRenderComponent(VChip, {
                                        color: "primary",
                                        key: index,
                                        value: tag2,
                                        "onClick:close": ($event) => removeTag(tag2),
                                        closable: ""
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(tag2)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(tag2), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(tags), (tag2, index) => {
                                        return openBlock(), createBlock(VChip, {
                                          color: "primary",
                                          key: index,
                                          value: tag2,
                                          "onClick:close": ($event) => removeTag(tag2),
                                          closable: ""
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(tag2), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value", "onClick:close"]);
                                      }), 128))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, {
                                  placeholder: "p.ej. Campo 1.",
                                  density: "compact",
                                  variant: "outlined",
                                  hint: "Presiona ENTER o + para agregar",
                                  modelValue: unref(tag),
                                  "onUpdate:modelValue": ($event) => isRef(tag) ? tag.value = $event : null,
                                  modelModifiers: { trim: true },
                                  onKeyup: withKeys(tagHandler, ["enter"]),
                                  "persistent-hint": ""
                                }, {
                                  append: withCtx(() => [
                                    createVNode(VBtn, {
                                      onClick: tagHandler,
                                      size: "small",
                                      density: "compact",
                                      icon: ""
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("+ ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(VChipGroup, {
                                  colum: "",
                                  variant: "outlined"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(tags), (tag2, index) => {
                                      return openBlock(), createBlock(VChip, {
                                        color: "primary",
                                        key: index,
                                        value: tag2,
                                        "onClick:close": ($event) => removeTag(tag2),
                                        closable: ""
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(tag2), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value", "onClick:close"]);
                                    }), 128))
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
                          createVNode(VCol, {
                            cols: "12",
                            lg: "4",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-body-1" }, "Etiquetas ")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            lg: "8",
                            md: "8"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                placeholder: "p.ej. Campo 1.",
                                density: "compact",
                                variant: "outlined",
                                hint: "Presiona ENTER o + para agregar",
                                modelValue: unref(tag),
                                "onUpdate:modelValue": ($event) => isRef(tag) ? tag.value = $event : null,
                                modelModifiers: { trim: true },
                                onKeyup: withKeys(tagHandler, ["enter"]),
                                "persistent-hint": ""
                              }, {
                                append: withCtx(() => [
                                  createVNode(VBtn, {
                                    onClick: tagHandler,
                                    size: "small",
                                    density: "compact",
                                    icon: ""
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("+ ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(VChipGroup, {
                                colum: "",
                                variant: "outlined"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(tags), (tag2, index) => {
                                    return openBlock(), createBlock(VChip, {
                                      color: "primary",
                                      key: index,
                                      value: tag2,
                                      "onClick:close": ($event) => removeTag(tag2),
                                      closable: ""
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(tag2), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value", "onClick:close"]);
                                  }), 128))
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
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, {
                          cols: "12",
                          lg: "4",
                          md: "4"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-body-1" }, " Club/Lugar* ")
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
                              modelValue: unref(fields).location.fieldValue,
                              "onUpdate:modelValue": [($event) => unref(fields).location.fieldValue = $event, handleSelectLocation],
                              onBlur: ($event) => _ctx.$emit("update:modelValue", $event),
                              items: unref(foundedLocations),
                              "no-data-text": "No hay resultados",
                              outlined: "",
                              "return-object": "",
                              "hide-selected": "",
                              "clear-on-select": "",
                              clearable: "",
                              "no-filter": ""
                            }, unref(fields).location.fieldPropsValue, {
                              "onUpdate:search": ($event) => searchHandler($event)
                            }), {
                              item: withCtx(({ props, item }) => [
                                createVNode(VListItem, mergeProps(props, {
                                  "two-line": "",
                                  title: item.value.structured_formatting.main_text,
                                  subtitle: item.value.structured_formatting.secondary_text
                                }), null, 16, ["title", "subtitle"])
                              ]),
                              selection: withCtx(({ item }) => [
                                createVNode(VListItem, null, {
                                  default: withCtx(() => [
                                    createVNode(VListItemTitle, {
                                      textContent: toDisplayString(item.value.structured_formatting.main_text)
                                    }, null, 8, ["textContent"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 1
                            }, 16, ["modelValue", "onUpdate:modelValue", "onBlur", "items", "onUpdate:search"])
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
                            createVNode("span", { class: "text-body-1" }, "Ciudad*")
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
                              onBlur: ($event) => _ctx.$emit("update:modelValue", $event),
                              placeholder: "p.ej. Puerto Vallarta",
                              density: "compact",
                              variant: "outlined",
                              disabled: "",
                              modelValue: unref(fields).city.fieldValue,
                              "onUpdate:modelValue": ($event) => unref(fields).city.fieldValue = $event
                            }, unref(fields).city.fieldPropsValue), null, 16, ["onBlur", "modelValue", "onUpdate:modelValue"])
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
                            createVNode("span", { class: "text-body-1" }, "Direcci\xF3n*")
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
                              onBlur: ($event) => _ctx.$emit("update:modelValue", $event),
                              placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                              density: "compact",
                              variant: "outlined",
                              disabled: "",
                              modelValue: unref(fields).address.fieldValue,
                              "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                            }, unref(fields).address.fieldPropsValue), null, 16, ["onBlur", "modelValue", "onUpdate:modelValue"])
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
                            createVNode("span", { class: "text-body-1" }, "Etiquetas ")
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          lg: "8",
                          md: "8"
                        }, {
                          default: withCtx(() => [
                            createVNode(VTextField, {
                              placeholder: "p.ej. Campo 1.",
                              density: "compact",
                              variant: "outlined",
                              hint: "Presiona ENTER o + para agregar",
                              modelValue: unref(tag),
                              "onUpdate:modelValue": ($event) => isRef(tag) ? tag.value = $event : null,
                              modelModifiers: { trim: true },
                              onKeyup: withKeys(tagHandler, ["enter"]),
                              "persistent-hint": ""
                            }, {
                              append: withCtx(() => [
                                createVNode(VBtn, {
                                  onClick: tagHandler,
                                  size: "small",
                                  density: "compact",
                                  icon: ""
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("+ ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(VChipGroup, {
                              colum: "",
                              variant: "outlined"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(tags), (tag2, index) => {
                                  return openBlock(), createBlock(VChip, {
                                    color: "primary",
                                    key: index,
                                    value: tag2,
                                    "onClick:close": ($event) => removeTag(tag2),
                                    closable: ""
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(tag2), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value", "onClick:close"]);
                                }), 128))
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
              createVNode(VContainer, null, {
                default: withCtx(() => [
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        lg: "4",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-body-1" }, " Club/Lugar* ")
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
                            modelValue: unref(fields).location.fieldValue,
                            "onUpdate:modelValue": [($event) => unref(fields).location.fieldValue = $event, handleSelectLocation],
                            onBlur: ($event) => _ctx.$emit("update:modelValue", $event),
                            items: unref(foundedLocations),
                            "no-data-text": "No hay resultados",
                            outlined: "",
                            "return-object": "",
                            "hide-selected": "",
                            "clear-on-select": "",
                            clearable: "",
                            "no-filter": ""
                          }, unref(fields).location.fieldPropsValue, {
                            "onUpdate:search": ($event) => searchHandler($event)
                          }), {
                            item: withCtx(({ props, item }) => [
                              createVNode(VListItem, mergeProps(props, {
                                "two-line": "",
                                title: item.value.structured_formatting.main_text,
                                subtitle: item.value.structured_formatting.secondary_text
                              }), null, 16, ["title", "subtitle"])
                            ]),
                            selection: withCtx(({ item }) => [
                              createVNode(VListItem, null, {
                                default: withCtx(() => [
                                  createVNode(VListItemTitle, {
                                    textContent: toDisplayString(item.value.structured_formatting.main_text)
                                  }, null, 8, ["textContent"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 1
                          }, 16, ["modelValue", "onUpdate:modelValue", "onBlur", "items", "onUpdate:search"])
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
                          createVNode("span", { class: "text-body-1" }, "Ciudad*")
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
                            onBlur: ($event) => _ctx.$emit("update:modelValue", $event),
                            placeholder: "p.ej. Puerto Vallarta",
                            density: "compact",
                            variant: "outlined",
                            disabled: "",
                            modelValue: unref(fields).city.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).city.fieldValue = $event
                          }, unref(fields).city.fieldPropsValue), null, 16, ["onBlur", "modelValue", "onUpdate:modelValue"])
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
                          createVNode("span", { class: "text-body-1" }, "Direcci\xF3n*")
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
                            onBlur: ($event) => _ctx.$emit("update:modelValue", $event),
                            placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                            density: "compact",
                            variant: "outlined",
                            disabled: "",
                            modelValue: unref(fields).address.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                          }, unref(fields).address.fieldPropsValue), null, 16, ["onBlur", "modelValue", "onUpdate:modelValue"])
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
                          createVNode("span", { class: "text-body-1" }, "Etiquetas ")
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        lg: "8",
                        md: "8"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            placeholder: "p.ej. Campo 1.",
                            density: "compact",
                            variant: "outlined",
                            hint: "Presiona ENTER o + para agregar",
                            modelValue: unref(tag),
                            "onUpdate:modelValue": ($event) => isRef(tag) ? tag.value = $event : null,
                            modelModifiers: { trim: true },
                            onKeyup: withKeys(tagHandler, ["enter"]),
                            "persistent-hint": ""
                          }, {
                            append: withCtx(() => [
                              createVNode(VBtn, {
                                onClick: tagHandler,
                                size: "small",
                                density: "compact",
                                icon: ""
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("+ ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VChipGroup, {
                            colum: "",
                            variant: "outlined"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(tags), (tag2, index) => {
                                return openBlock(), createBlock(VChip, {
                                  color: "primary",
                                  key: index,
                                  value: tag2,
                                  "onClick:close": ($event) => removeTag(tag2),
                                  closable: ""
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(tag2), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value", "onClick:close"]);
                              }), 128))
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
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              block: "",
              variant: "elevated",
              onClick: unref(saveLocationHandler)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Crear locaci\xF3n `);
                } else {
                  return [
                    createTextVNode("Crear locaci\xF3n ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                block: "",
                variant: "elevated",
                onClick: unref(saveLocationHandler)
              }, {
                default: withCtx(() => [
                  createTextVNode("Crear locaci\xF3n ")
                ]),
                _: 1
              }, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendario/add-location.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "available-locations",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    locations: {
      type: Array,
      required: true
    }
  }, {
    "selectedLocations": { default: [] },
    "selectedLocationsModifiers": {}
  }),
  emits: ["update:selectedLocations"],
  setup(__props) {
    const { locationDialog } = storeToRefs(useLocationStore());
    const { selectedLocationsHasError } = storeToRefs(useTournamentStore());
    const selectedLocations = useModel(
      __props,
      "selectedLocations"
    );
    function selectLocationHandler(location, isSelected) {
      if (location) {
        if (!selectedLocations.value.some((_location) => _location.id === location.id)) {
          selectedLocations.value.push(location);
        }
        if (!isSelected.value) {
          removeTag(location);
        }
      }
    }
    function removeTag(location) {
      selectedLocations.value = selectedLocations.value.filter(
        (_location) => _location.id !== location.id
      );
    }
    watch(
      selectedLocations,
      () => {
        if (selectedLocations.value.length > 0) {
          selectedLocationsHasError.value = false;
        }
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VSheet, { rounded: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="pa-4"${_scopeId}><p class="text-caption"${_scopeId}><span class="${ssrRenderClass(unref(selectedLocationsHasError) ? "text-error" : "")}"${_scopeId}>Selecciona las locaciones donde se jugar\xE1n los partidos.</span> Si necesitas agregar una nueva locaci\xF3n, haz clic en &#39;Agregar Locaci\xF3n&#39;. </p>`);
            _push2(ssrRenderComponent(VResponsive, {
              class: "overflow-y-auto",
              "max-height": "280"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VChipGroup, {
                    filter: "",
                    multiple: "",
                    class: "mt-3",
                    column: "",
                    v: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(__props.locations, (location) => {
                          _push4(ssrRenderComponent(VChip, {
                            key: location.id,
                            value: location.id,
                            "selected-class": "text-primary",
                            "onGroup:selected": (e) => selectLocationHandler(location, e)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              var _a, _b;
                              if (_push5) {
                                _push5(`<span class="d-inline-block text-truncate" style="${ssrRenderStyle({ "max-width": "100px" })}"${_scopeId4}>${ssrInterpolate(((_a = location == null ? void 0 : location.tags) == null ? void 0 : _a.length) ? location.tags[0].name.es : location == null ? void 0 : location.name)}</span>`);
                              } else {
                                return [
                                  createVNode("span", {
                                    class: "d-inline-block text-truncate",
                                    style: { "max-width": "100px" }
                                  }, toDisplayString(((_b = location == null ? void 0 : location.tags) == null ? void 0 : _b.length) ? location.tags[0].name.es : location == null ? void 0 : location.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.locations, (location) => {
                            return openBlock(), createBlock(VChip, {
                              key: location.id,
                              value: location.id,
                              "selected-class": "text-primary",
                              "onGroup:selected": (e) => selectLocationHandler(location, e)
                            }, {
                              default: withCtx(() => {
                                var _a;
                                return [
                                  createVNode("span", {
                                    class: "d-inline-block text-truncate",
                                    style: { "max-width": "100px" }
                                  }, toDisplayString(((_a = location == null ? void 0 : location.tags) == null ? void 0 : _a.length) ? location.tags[0].name.es : location == null ? void 0 : location.name), 1)
                                ];
                              }),
                              _: 2
                            }, 1032, ["value", "onGroup:selected"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VChipGroup, {
                      filter: "",
                      multiple: "",
                      class: "mt-3",
                      column: "",
                      v: ""
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.locations, (location) => {
                          return openBlock(), createBlock(VChip, {
                            key: location.id,
                            value: location.id,
                            "selected-class": "text-primary",
                            "onGroup:selected": (e) => selectLocationHandler(location, e)
                          }, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createVNode("span", {
                                  class: "d-inline-block text-truncate",
                                  style: { "max-width": "100px" }
                                }, toDisplayString(((_a = location == null ? void 0 : location.tags) == null ? void 0 : _a.length) ? location.tags[0].name.es : location == null ? void 0 : location.name), 1)
                              ];
                            }),
                            _: 2
                          }, 1032, ["value", "onGroup:selected"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(VDivider, null, null, _parent2, _scopeId));
            _push2(`<div class="pa-2"${_scopeId}>`);
            _push2(ssrRenderComponent(VBtn, {
              color: "primary",
              size: "small",
              block: "",
              text: "Agregar Nueva Locaci\xF3n",
              variant: "outlined",
              onClick: ($event) => locationDialog.value = !unref(locationDialog)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "pa-4" }, [
                createVNode("p", { class: "text-caption" }, [
                  createVNode("span", {
                    class: unref(selectedLocationsHasError) ? "text-error" : ""
                  }, "Selecciona las locaciones donde se jugar\xE1n los partidos.", 2),
                  createTextVNode(" Si necesitas agregar una nueva locaci\xF3n, haz clic en 'Agregar Locaci\xF3n'. ")
                ]),
                createVNode(VResponsive, {
                  class: "overflow-y-auto",
                  "max-height": "280"
                }, {
                  default: withCtx(() => [
                    createVNode(VChipGroup, {
                      filter: "",
                      multiple: "",
                      class: "mt-3",
                      column: "",
                      v: ""
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.locations, (location) => {
                          return openBlock(), createBlock(VChip, {
                            key: location.id,
                            value: location.id,
                            "selected-class": "text-primary",
                            "onGroup:selected": (e) => selectLocationHandler(location, e)
                          }, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createVNode("span", {
                                  class: "d-inline-block text-truncate",
                                  style: { "max-width": "100px" }
                                }, toDisplayString(((_a = location == null ? void 0 : location.tags) == null ? void 0 : _a.length) ? location.tags[0].name.es : location == null ? void 0 : location.name), 1)
                              ];
                            }),
                            _: 2
                          }, 1032, ["value", "onGroup:selected"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              createVNode(VDivider),
              createVNode("div", { class: "pa-2" }, [
                createVNode(VBtn, {
                  color: "primary",
                  size: "small",
                  block: "",
                  text: "Agregar Nueva Locaci\xF3n",
                  variant: "outlined",
                  onClick: ($event) => locationDialog.value = !unref(locationDialog)
                }, null, 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$6, {
        modelValue: unref(locationDialog),
        "onUpdate:modelValue": ($event) => isRef(locationDialog) ? locationDialog.value = $event : null
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendario/available-locations.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "01-general",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const [parent] = useAutoAnimate();
    const { tournamentLocations, selectedLocations } = storeToRefs(useTournamentStore());
    const { handleSubmit, resetForm, fields, validate, setValues, meta } = useSchemas("create-calendar");
    const datesModel = ref([]);
    __expose({
      validate,
      handleSubmit
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Fechas del torneo* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Fechas del torneo* ")
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
                          dates: unref(datesModel),
                          "onUpdate:dates": [
                            ($event) => isRef(datesModel) ? datesModel.value = $event : null,
                            (dates) => {
                              const start = dates ? dates[0] : null;
                              const end = dates ? dates[1] : null;
                              unref(fields).start_date.fieldValue = start;
                              unref(fields).end_date.fieldValue = end;
                            }
                          ],
                          "multi-calendar": true,
                          "position-values": {
                            top: -45,
                            left: 193,
                            transform: "translate(0)"
                          }
                        }, null, _parent4, _scopeId3));
                        _push4(`<div${_scopeId3}>`);
                        if (unref(fields).start_date.fieldPropsValue["error-messages"][0]) {
                          _push4(`<small class="text-red ml-4"${_scopeId3}>${ssrInterpolate(unref(fields).start_date.fieldPropsValue["error-messages"][0])}</small>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode(_sfc_main$7, {
                            dates: unref(datesModel),
                            "onUpdate:dates": [
                              ($event) => isRef(datesModel) ? datesModel.value = $event : null,
                              (dates) => {
                                const start = dates ? dates[0] : null;
                                const end = dates ? dates[1] : null;
                                unref(fields).start_date.fieldValue = start;
                                unref(fields).end_date.fieldValue = end;
                              }
                            ],
                            "multi-calendar": true,
                            "position-values": {
                              top: -45,
                              left: 193,
                              transform: "translate(0)"
                            }
                          }, null, 8, ["dates", "onUpdate:dates"]),
                          createVNode("div", {
                            ref_key: "parent",
                            ref: parent
                          }, [
                            unref(fields).start_date.fieldPropsValue["error-messages"][0] ? (openBlock(), createBlock("small", {
                              key: 0,
                              class: "text-red ml-4"
                            }, toDisplayString(unref(fields).start_date.fieldPropsValue["error-messages"][0]), 1)) : createCommentVNode("", true)
                          ], 512)
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
                        createVNode("span", { class: "text-body-1" }, " Fechas del torneo* ")
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
                          dates: unref(datesModel),
                          "onUpdate:dates": [
                            ($event) => isRef(datesModel) ? datesModel.value = $event : null,
                            (dates) => {
                              const start = dates ? dates[0] : null;
                              const end = dates ? dates[1] : null;
                              unref(fields).start_date.fieldValue = start;
                              unref(fields).end_date.fieldValue = end;
                            }
                          ],
                          "multi-calendar": true,
                          "position-values": {
                            top: -45,
                            left: 193,
                            transform: "translate(0)"
                          }
                        }, null, 8, ["dates", "onUpdate:dates"]),
                        createVNode("div", {
                          ref_key: "parent",
                          ref: parent
                        }, [
                          unref(fields).start_date.fieldPropsValue["error-messages"][0] ? (openBlock(), createBlock("small", {
                            key: 0,
                            class: "text-red ml-4"
                          }, toDisplayString(unref(fields).start_date.fieldPropsValue["error-messages"][0]), 1)) : createCommentVNode("", true)
                        ], 512)
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
                          outlined: "",
                          density: "compact",
                          modelValue: unref(fields).game_time.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).game_time.fieldValue = $event
                        }, unref(fields).game_time.fieldPropsValue, { min: "0" }), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            type: "number",
                            outlined: "",
                            density: "compact",
                            modelValue: unref(fields).game_time.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).game_time.fieldValue = $event
                          }, unref(fields).game_time.fieldPropsValue, { min: "0" }), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                          outlined: "",
                          density: "compact",
                          modelValue: unref(fields).game_time.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).game_time.fieldValue = $event
                        }, unref(fields).game_time.fieldPropsValue, { min: "0" }), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                          outlined: "",
                          density: "compact",
                          modelValue: unref(fields).time_between_games.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).time_between_games.fieldValue = $event
                        }, unref(fields).time_between_games.fieldPropsValue, { min: "0" }), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            type: "number",
                            outlined: "",
                            density: "compact",
                            modelValue: unref(fields).time_between_games.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).time_between_games.fieldValue = $event
                          }, unref(fields).time_between_games.fieldPropsValue, { min: "0" }), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                          outlined: "",
                          density: "compact",
                          modelValue: unref(fields).time_between_games.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).time_between_games.fieldValue = $event
                        }, unref(fields).time_between_games.fieldPropsValue, { min: "0" }), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1"${_scopeId3}> Selecciona las locaciones para el torneo</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Selecciona las locaciones para el torneo")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$5, {
                          locations: unref(tournamentLocations),
                          selectedLocations: unref(selectedLocations),
                          "onUpdate:selectedLocations": ($event) => isRef(selectedLocations) ? selectedLocations.value = $event : null
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$5, {
                            locations: unref(tournamentLocations),
                            selectedLocations: unref(selectedLocations),
                            "onUpdate:selectedLocations": ($event) => isRef(selectedLocations) ? selectedLocations.value = $event : null
                          }, null, 8, ["locations", "selectedLocations", "onUpdate:selectedLocations"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, " Selecciona las locaciones para el torneo")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$5, {
                          locations: unref(tournamentLocations),
                          selectedLocations: unref(selectedLocations),
                          "onUpdate:selectedLocations": ($event) => isRef(selectedLocations) ? selectedLocations.value = $event : null
                        }, null, 8, ["locations", "selectedLocations", "onUpdate:selectedLocations"])
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
                      createVNode("span", { class: "text-body-1" }, " Fechas del torneo* ")
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
                        dates: unref(datesModel),
                        "onUpdate:dates": [
                          ($event) => isRef(datesModel) ? datesModel.value = $event : null,
                          (dates) => {
                            const start = dates ? dates[0] : null;
                            const end = dates ? dates[1] : null;
                            unref(fields).start_date.fieldValue = start;
                            unref(fields).end_date.fieldValue = end;
                          }
                        ],
                        "multi-calendar": true,
                        "position-values": {
                          top: -45,
                          left: 193,
                          transform: "translate(0)"
                        }
                      }, null, 8, ["dates", "onUpdate:dates"]),
                      createVNode("div", {
                        ref_key: "parent",
                        ref: parent
                      }, [
                        unref(fields).start_date.fieldPropsValue["error-messages"][0] ? (openBlock(), createBlock("small", {
                          key: 0,
                          class: "text-red ml-4"
                        }, toDisplayString(unref(fields).start_date.fieldPropsValue["error-messages"][0]), 1)) : createCommentVNode("", true)
                      ], 512)
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
                        outlined: "",
                        density: "compact",
                        modelValue: unref(fields).game_time.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).game_time.fieldValue = $event
                      }, unref(fields).game_time.fieldPropsValue, { min: "0" }), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                        outlined: "",
                        density: "compact",
                        modelValue: unref(fields).time_between_games.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).time_between_games.fieldValue = $event
                      }, unref(fields).time_between_games.fieldPropsValue, { min: "0" }), null, 16, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, " Selecciona las locaciones para el torneo")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$5, {
                        locations: unref(tournamentLocations),
                        selectedLocations: unref(selectedLocations),
                        "onUpdate:selectedLocations": ($event) => isRef(selectedLocations) ? selectedLocations.value = $event : null
                      }, null, 8, ["locations", "selectedLocations", "onUpdate:selectedLocations"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendario/stepper/01-general.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`Regular`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendario/stepper/02-regular-phase.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Regular = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`Elimination`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendario/stepper/03-elimination-phase.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Elimination = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    "stepRef": {},
    "stepRefModifiers": {}
  },
  emits: ["update:stepRef"],
  setup(__props) {
    ref(false);
    const {
      calendarSteps,
      isCalendarEdition,
      calendarStoreRequest,
      calendarDialog
    } = storeToRefs(useTournamentStore());
    const stepRef = useModel(__props, "stepRef");
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
                                _push5(ssrRenderComponent(_sfc_main$4, {
                                  ref_key: "stepRef",
                                  ref: stepRef,
                                  key: unref(calendarSteps).current
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(calendarSteps).current === "regular") {
                                _push5(ssrRenderComponent(Regular, {
                                  ref_key: "stepRef",
                                  ref: stepRef,
                                  key: unref(calendarSteps).current
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(calendarSteps).current === "elimination") {
                                _push5(ssrRenderComponent(Elimination, {
                                  ref_key: "stepRef",
                                  ref: stepRef,
                                  key: unref(calendarSteps).current
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                unref(calendarSteps).current === "general" ? (openBlock(), createBlock(_sfc_main$4, {
                                  ref_key: "stepRef",
                                  ref: stepRef,
                                  key: unref(calendarSteps).current
                                })) : createCommentVNode("", true),
                                unref(calendarSteps).current === "regular" ? (openBlock(), createBlock(Regular, {
                                  ref_key: "stepRef",
                                  ref: stepRef,
                                  key: unref(calendarSteps).current
                                })) : createCommentVNode("", true),
                                unref(calendarSteps).current === "elimination" ? (openBlock(), createBlock(Elimination, {
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
                              unref(calendarSteps).current === "general" ? (openBlock(), createBlock(_sfc_main$4, {
                                ref_key: "stepRef",
                                ref: stepRef,
                                key: unref(calendarSteps).current
                              })) : createCommentVNode("", true),
                              unref(calendarSteps).current === "regular" ? (openBlock(), createBlock(Regular, {
                                ref_key: "stepRef",
                                ref: stepRef,
                                key: unref(calendarSteps).current
                              })) : createCommentVNode("", true),
                              unref(calendarSteps).current === "elimination" ? (openBlock(), createBlock(Elimination, {
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
                            unref(calendarSteps).current === "general" ? (openBlock(), createBlock(_sfc_main$4, {
                              ref_key: "stepRef",
                              ref: stepRef,
                              key: unref(calendarSteps).current
                            })) : createCommentVNode("", true),
                            unref(calendarSteps).current === "regular" ? (openBlock(), createBlock(Regular, {
                              ref_key: "stepRef",
                              ref: stepRef,
                              key: unref(calendarSteps).current
                            })) : createCommentVNode("", true),
                            unref(calendarSteps).current === "elimination" ? (openBlock(), createBlock(Elimination, {
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
                          unref(calendarSteps).current === "general" ? (openBlock(), createBlock(_sfc_main$4, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(calendarSteps).current
                          })) : createCommentVNode("", true),
                          unref(calendarSteps).current === "regular" ? (openBlock(), createBlock(Regular, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(calendarSteps).current
                          })) : createCommentVNode("", true),
                          unref(calendarSteps).current === "elimination" ? (openBlock(), createBlock(Elimination, {
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
    steps.value.current = stepsOrder[currentStepIndex - 1];
  };
  const nextHandler = async () => {
    const statusForm = await stepRef.value.validate();
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
      calendarDialog,
      selectedLocations,
      selectedLocationsHasError
    } = storeToRefs(useTournamentStore());
    const {
      settings,
      secondaryTextBtn,
      primaryTextBtn,
      stepRef,
      backHandler,
      nextHandler
    } = useDialog(calendarSteps, calendarDialog);
    const handleChange = () => {
      if (selectedLocations.value.length === 0) {
        selectedLocationsHasError.value = true;
      } else {
        nextHandler();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = _sfc_main$8;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        title: "Crear un calendario",
        subtitle: "Completa los detalles del calendario.",
        actions: {
          primary: unref(primaryTextBtn),
          secondary: unref(secondaryTextBtn)
        },
        loading: false,
        modelValue: unref(calendarDialog),
        "onUpdate:modelValue": ($event) => isRef(calendarDialog) ? calendarDialog.value = $event : null
      }, _attrs), {
        "v-card-text": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              "step-ref": unref(stepRef),
              "onUpdate:stepRef": ($event) => isRef(stepRef) ? stepRef.value = $event : null
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, {
                "step-ref": unref(stepRef),
                "onUpdate:stepRef": ($event) => isRef(stepRef) ? stepRef.value = $event : null
              }, null, 8, ["step-ref", "onUpdate:stepRef"])
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
                onClick: handleChange
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(primaryTextBtn)), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendario/dialog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BgKUvBZk.mjs.map
