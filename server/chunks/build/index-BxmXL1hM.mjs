import { useSSRContext, defineComponent, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, createTextVNode, ref, computed, resolveComponent, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { aw as useTournamentStore, V as VCard, b as VCardItem, av as VDivider, e as VTextField, ax as VSelect, ay as VListItem, az as VListItemTitle, d as VCardText, _ as __nuxt_component_1$1 } from './server.mjs';
import { storeToRefs } from 'pinia';
import { V as VSheet, u as useSchemas } from './useSchemas-CkEHQvYm.mjs';
import { V as VDialog, u as useCategoryStore, a as _sfc_main$2$1, d as dragDropImageRef, i as imageForm, b as VAutocomplete, S as StepIndicator, s as saveImage, r as removeImage, c as __nuxt_component_0 } from './step-indicator-yUBOEq6r.mjs';
import { _ as _sfc_main$6 } from './CategoriesSelect-DyROsbp6.mjs';
import { V as Vn, a as VTextarea } from './main-QXSkfSxM.mjs';
import { V as VContainer } from './VContainer-DxUs1xyO.mjs';
import { V as VRow, a as VCol } from './VRow-B8INPo3N.mjs';
import { c as VTooltip } from './app-bar-4n5zyiNx.mjs';
import { u as useDebounceFn } from './index-93-MdpO_.mjs';
import { V as VBtn } from './VBtn-sH8DNEZb.mjs';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    const { dialog, isEdition } = storeToRefs(useTournamentStore());
    const title = isEdition.value ? "Editar Toreno" : "Crear un torneo";
    const subtitle = isEdition.value ? "Modifica los detalles del torneo." : "Completa los detalles del torneo.";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
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
                  _push3(ssrRenderComponent(_component_Icon, { name: "futzo-icon:football" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, { name: "futzo-icon:football" })
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
                  createVNode(_component_Icon, { name: "futzo-icon:football" })
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
              name: "futzo-icon:x-dialog",
              onClick: ($event) => dialog.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, {
                name: "futzo-icon:x-dialog",
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/dialog/header.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "calendar",
  __ssrInlineRender: true,
  emits: ["selected-dates"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const dates = ref([]);
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
    const formatDate = (date) => {
      const day = date.getDate();
      const month = date.toLocaleDateString("es-MX", { month: "short" });
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    };
    const customPosition = (inputElement) => {
      const inputRect = inputElement == null ? void 0 : inputElement.getBoundingClientRect();
      return {
        top: inputRect.top - 300,
        left: inputRect.left - 200,
        transform: "translate(50%)"
      };
    };
    const setDatesFromRequest = (_dates) => {
      dates.value = _dates;
    };
    __expose({
      setDatesFromRequest
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Vn), mergeProps({
        ref_key: "dp",
        ref: dp,
        modelValue: unref(dates),
        "onUpdate:modelValue": ($event) => isRef(dates) ? dates.value = $event : null,
        position: "left",
        range: "",
        utc: "",
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
          menu: "border rounded-lg",
          calendarCell: "dp-custom-cell"
        },
        placeholder: "Selecciona las fechas del torneo"
      }, _attrs), {
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "01-basicInfo",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const { formats } = storeToRefs(useCategoryStore());
    const { isEdition, tournamentStoreRequest } = storeToRefs(useTournamentStore());
    const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
      isEdition.value ? "edit-tournament-basic-info" : "create-tournament-basic-info"
    );
    __expose({
      validate,
      handleSubmit
    });
    const saveImageHandler = (image) => {
      saveImage(image);
      fields.image.fieldValue = image;
    };
    const removeImageHandler = () => {
      removeImage();
      fields.image.fieldValue = null;
    };
    const setDates = (dates) => {
      fields.start_date.fieldValue = dates[0];
      fields.end_date.fieldValue = dates[1];
    };
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Nombre del torneo* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Nombre del torneo* ")
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
                          placeholder: "p.ej. Torneo de verano",
                          outlined: "",
                          modelValue: unref(fields).name.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                        }, unref(fields).name.fieldPropsValue, { density: "compact" }), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            placeholder: "p.ej. Torneo de verano",
                            outlined: "",
                            modelValue: unref(fields).name.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                          }, unref(fields).name.fieldPropsValue, { density: "compact" }), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode("span", { class: "text-body-1" }, " Nombre del torneo* ")
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
                          placeholder: "p.ej. Torneo de verano",
                          outlined: "",
                          modelValue: unref(fields).name.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                        }, unref(fields).name.fieldPropsValue, { density: "compact" }), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Imagen del torneo </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Imagen del torneo ")
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
                        _push4(ssrRenderComponent(_sfc_main$2$1, {
                          ref_key: "dragDropImageRef",
                          ref: dragDropImageRef,
                          image: unref(imageForm),
                          onImageDropped: saveImageHandler,
                          onRemoveImage: removeImageHandler
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="${ssrRenderClass([
                          unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : "",
                          "text-error text-caption"
                        ])}"${_scopeId3}>${ssrInterpolate((_a = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a : "")}</span>`);
                      } else {
                        return [
                          createVNode(_sfc_main$2$1, {
                            ref_key: "dragDropImageRef",
                            ref: dragDropImageRef,
                            image: unref(imageForm),
                            onImageDropped: saveImageHandler,
                            onRemoveImage: removeImageHandler
                          }, null, 8, ["image"]),
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, " Imagen del torneo ")
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
                          createVNode(_sfc_main$2$1, {
                            ref_key: "dragDropImageRef",
                            ref: dragDropImageRef,
                            image: unref(imageForm),
                            onImageDropped: saveImageHandler,
                            onRemoveImage: removeImageHandler
                          }, null, 8, ["image"]),
                          createVNode("span", {
                            class: [
                              "text-error text-caption",
                              unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : ""
                            ]
                          }, toDisplayString((_a = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a : ""), 3)
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Formato* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Formato* ")
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
                          item: withCtx(({ props, item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, props, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTooltip, {
                                      activator: "parent",
                                      location: "end",
                                      "max-width": "300"
                                    }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(item.raw.description)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(item.raw.description), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
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
                              }, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, " Formato* ")
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Categor\xEDa* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Categor\xEDa* ")
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
                        _push4(ssrRenderComponent(_sfc_main$6, {
                          disabled: false,
                          modelValue: unref(fields).category_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event,
                          errors: unref(fields).category_id.fieldPropsValue
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$6, {
                            disabled: false,
                            modelValue: unref(fields).category_id.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event,
                            errors: unref(fields).category_id.fieldPropsValue
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "errors"])
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
                        createVNode("span", { class: "text-body-1" }, " Categor\xEDa* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$6, {
                          disabled: false,
                          modelValue: unref(fields).category_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event,
                          errors: unref(fields).category_id.fieldPropsValue
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "errors"])
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
                        _push4(ssrRenderComponent(_sfc_main$4, {
                          ref: "calendarRef",
                          onSelectedDates: setDates
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$4, {
                            ref: "calendarRef",
                            onSelectedDates: setDates
                          }, null, 512)
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
                        createVNode(_sfc_main$4, {
                          ref: "calendarRef",
                          onSelectedDates: setDates
                        }, null, 512)
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
                      createVNode("span", { class: "text-body-1" }, " Nombre del torneo* ")
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
                        placeholder: "p.ej. Torneo de verano",
                        outlined: "",
                        modelValue: unref(fields).name.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                      }, unref(fields).name.fieldPropsValue, { density: "compact" }), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                      createVNode("span", { class: "text-body-1" }, " Imagen del torneo ")
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
                        createVNode(_sfc_main$2$1, {
                          ref_key: "dragDropImageRef",
                          ref: dragDropImageRef,
                          image: unref(imageForm),
                          onImageDropped: saveImageHandler,
                          onRemoveImage: removeImageHandler
                        }, null, 8, ["image"]),
                        createVNode("span", {
                          class: [
                            "text-error text-caption",
                            unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : ""
                          ]
                        }, toDisplayString((_a = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a : ""), 3)
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
                      createVNode("span", { class: "text-body-1" }, " Formato* ")
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
                      createVNode("span", { class: "text-body-1" }, " Categor\xEDa* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$6, {
                        disabled: false,
                        modelValue: unref(fields).category_id.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event,
                        errors: unref(fields).category_id.fieldPropsValue
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "errors"])
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
                      createVNode(_sfc_main$4, {
                        ref: "calendarRef",
                        onSelectedDates: setDates
                      }, null, 512)
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
    let locationsFind = ref([]);
    const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
      isEdition.value ? "edit-tournament-details-info" : "create-tournament-details-info"
    );
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
        locationsFind.value = response;
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
    __expose({
      validate,
      handleSubmit
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Club/Lugar </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Club/Lugar ")
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
                          modelValue: unref(fields).location.fieldValue,
                          "onUpdate:modelValue": [($event) => unref(fields).location.fieldValue = $event, handleSelectLocation],
                          items: unref(locationsFind),
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
                          item: withCtx(({ props, item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, mergeProps(props, {
                                "two-line": "",
                                title: item.value.structured_formatting.main_text,
                                subtitle: item.value.structured_formatting.secondary_text
                              }), null, _parent5, _scopeId4));
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
                          selection: withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VListItemTitle, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VListItemTitle, {
                                        textContent: toDisplayString(item.value.structured_formatting.main_text)
                                      }, null, 8, ["textContent"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, mergeProps({
                            modelValue: unref(fields).location.fieldValue,
                            "onUpdate:modelValue": [($event) => unref(fields).location.fieldValue = $event, handleSelectLocation],
                            items: unref(locationsFind),
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
                          }, 16, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search"])
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
                        createVNode("span", { class: "text-body-1" }, " Club/Lugar ")
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
                          items: unref(locationsFind),
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
                        }, 16, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search"])
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Ciudad</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Ciudad")
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
                          placeholder: "p.ej. Puerto Vallarta",
                          density: "compact",
                          variant: "outlined",
                          disabled: "",
                          modelValue: unref(fields).city.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).city.fieldValue = $event
                        }, unref(fields).city.fieldPropsValue), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            placeholder: "p.ej. Puerto Vallarta",
                            density: "compact",
                            variant: "outlined",
                            disabled: "",
                            modelValue: unref(fields).city.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).city.fieldValue = $event
                          }, unref(fields).city.fieldPropsValue), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode("span", { class: "text-body-1" }, " Ciudad")
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
                          placeholder: "p.ej. Puerto Vallarta",
                          density: "compact",
                          variant: "outlined",
                          disabled: "",
                          modelValue: unref(fields).city.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).city.fieldValue = $event
                        }, unref(fields).city.fieldPropsValue), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Direcci\xF3n </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Direcci\xF3n ")
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
                          placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                          density: "compact",
                          variant: "outlined",
                          disabled: "",
                          modelValue: unref(fields).address.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                        }, unref(fields).address.fieldPropsValue), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                            density: "compact",
                            variant: "outlined",
                            disabled: "",
                            modelValue: unref(fields).address.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                          }, unref(fields).address.fieldPropsValue), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode("span", { class: "text-body-1" }, " Direcci\xF3n ")
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
                          placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                          density: "compact",
                          variant: "outlined",
                          disabled: "",
                          modelValue: unref(fields).address.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                        }, unref(fields).address.fieldPropsValue), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                      createVNode("span", { class: "text-body-1" }, " Club/Lugar ")
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
                        items: unref(locationsFind),
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
                      }, 16, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search"])
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
                      createVNode("span", { class: "text-body-1" }, " Ciudad")
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
                        placeholder: "p.ej. Puerto Vallarta",
                        density: "compact",
                        variant: "outlined",
                        disabled: "",
                        modelValue: unref(fields).city.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).city.fieldValue = $event
                      }, unref(fields).city.fieldPropsValue), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                      createVNode("span", { class: "text-body-1" }, " Direcci\xF3n ")
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
                        placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                        density: "compact",
                        variant: "outlined",
                        disabled: "",
                        modelValue: unref(fields).address.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                      }, unref(fields).address.fieldPropsValue), null, 16, ["modelValue", "onUpdate:modelValue"])
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
    console.log(steps.value);
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
      const _component_transition_slide = __nuxt_component_0;
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
                                    _push6(ssrRenderComponent(StepIndicator, { "form-steps": unref(steps) }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(StepIndicator, { "form-steps": unref(steps) }, null, 8, ["form-steps"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(StepIndicator, { "form-steps": unref(steps) }, null, 8, ["form-steps"])
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
                                  createVNode(StepIndicator, { "form-steps": unref(steps) }, null, 8, ["form-steps"])
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
                                createVNode(StepIndicator, { "form-steps": unref(steps) }, null, 8, ["form-steps"])
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
                              createVNode(StepIndicator, { "form-steps": unref(steps) }, null, 8, ["form-steps"])
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
    const { steps, dialog, tournamentStoreRequest } = storeToRefs(useTournamentStore());
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
                  _push3(ssrRenderComponent(_sfc_main$5, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    step: unref(steps).current
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$5),
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
                  createVNode(_sfc_main$5),
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
//# sourceMappingURL=index-BxmXL1hM.mjs.map
