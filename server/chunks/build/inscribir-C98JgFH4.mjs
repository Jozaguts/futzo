import { useSSRContext, defineComponent, ref, reactive, mergeProps, withCtx, createVNode, unref, createTextVNode, isRef, openBlock, createBlock, computed, resolveDirective, toDisplayString, createCommentVNode, Fragment, renderList, withDirectives } from 'vue';
import { u as useSchemas, V as VFileInput } from './useSchemas-Cb4dK3hW.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrGetDirectiveProps, ssrRenderList, ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { u as useTeamStore } from './useTeamStore-v88rBx6j.mjs';
import { s as storeToRefs, d as VTextField, k as VSelect, V as VCard, c as VCardText, e as VBtn, l as VChip, x as VListItem, y as VListItemTitle, z as VListItemSubtitle } from './server.mjs';
import { V as VDialog } from './VDialog-CDUYkq_m.mjs';
import { V as VForm } from './VForm-CVR8aYB2.mjs';
import { V as VContainer } from './VContainer-BlVN2X13.mjs';
import { V as VRow, a as VCol } from './VRow-B-D5uMI5.mjs';
import { V as VAutocomplete } from './VAutocomplete-IMrjYE8Q.mjs';
import { V as VAlert } from './VAlert-DP6HnRfZ.mjs';
import { V as VSheet } from './VSheet-CZRJSEtw.mjs';
import { V as VTabs, a as VTab, d as VWindow, e as VWindowItem } from './VTabs-CS7OIIzr.mjs';
import 'vee-validate';
import 'yup';
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
  __name: "add-field",
  __ssrInlineRender: true,
  setup(__props) {
    ref([
      {
        name: "Lunes",
        value: 1
      },
      {
        name: "Martes",
        value: 2
      },
      {
        name: "Miercoles",
        value: 3
      },
      {
        name: "Jueves",
        value: 4
      },
      {
        name: "Viernes",
        value: 5
      },
      {
        name: "Sabado",
        value: 6
      },
      {
        name: "Domingo",
        value: 7
      }
    ]);
    const showError = ref(false);
    const dialog = ref(false);
    const hours = computed(() => {
      const hours2 = [];
      for (let i = 0; i < 24; i++) {
        hours2.push(i < 10 ? `0${i}:00` : `${i}:00`);
        hours2.push(i < 10 ? `0${i}:30` : `${i}:30`);
      }
      return hours2;
    });
    const { locations, locationModel, availableDays, googleSearchLocations } = storeToRefs(useTeamStore());
    const { searchLocation, storeField } = useTeamStore();
    const saveDate = (day) => {
      if (!day.open || !day.close) {
        day.error = true;
        showError.value = true;
        return;
      } else {
        day.error = false;
        day.saved = true;
        showError.value = false;
      }
    };
    const removeDate = (day) => {
      day.saved = false;
      day.open = "";
      day.close = "";
    };
    const handleStoreLocation = () => {
      storeField().then(async () => {
        dialog.value = false;
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(ssrRenderComponent(VDialog, mergeProps({
        modelValue: unref(dialog),
        "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
        "max-width": "600"
      }, _attrs), {
        activator: withCtx(({ props: activatorProps }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VChip, mergeProps(activatorProps, {
              class: "float-right mt-2",
              "prepend-icon": "mdi-plus",
              border: "",
              link: ""
            }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Agregar campo`);
                } else {
                  return [
                    createTextVNode("Agregar campo")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VChip, mergeProps(activatorProps, {
                class: "float-right mt-2",
                "prepend-icon": "mdi-plus",
                border: "",
                link: ""
              }), {
                default: withCtx(() => [
                  createTextVNode("Agregar campo")
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        default: withCtx(({ isActive }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, {
              "prepend-icon": "mdi-soccer-field",
              title: "Agregar cancha de juego"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VForm, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VContainer, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VRow, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VCol, null, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<p class="text-body-2 text-medium-emphasis"${_scopeId7}> El campo de juego <span class="text-high-emphasis"${_scopeId7}> no</span> esta relacionado con un equipo en especifico, es un lugar donde se llevar\xE1n a cabo los partidos </p>`);
                                              } else {
                                                return [
                                                  createVNode("p", { class: "text-body-2 text-medium-emphasis" }, [
                                                    createTextVNode(" El campo de juego "),
                                                    createVNode("span", { class: "text-high-emphasis" }, " no"),
                                                    createTextVNode(" esta relacionado con un equipo en especifico, es un lugar donde se llevar\xE1n a cabo los partidos ")
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VCol, null, {
                                              default: withCtx(() => [
                                                createVNode("p", { class: "text-body-2 text-medium-emphasis" }, [
                                                  createTextVNode(" El campo de juego "),
                                                  createVNode("span", { class: "text-high-emphasis" }, " no"),
                                                  createTextVNode(" esta relacionado con un equipo en especifico, es un lugar donde se llevar\xE1n a cabo los partidos ")
                                                ])
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VRow, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VCol, { cols: "12" }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VTextField, {
                                                  modelValue: unref(locationModel).name,
                                                  "onUpdate:modelValue": ($event) => unref(locationModel).name = $event,
                                                  label: "Nombre",
                                                  outlined: "",
                                                  dense: "",
                                                  required: ""
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VTextField, {
                                                    modelValue: unref(locationModel).name,
                                                    "onUpdate:modelValue": ($event) => unref(locationModel).name = $event,
                                                    label: "Nombre",
                                                    outlined: "",
                                                    dense: "",
                                                    required: ""
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, { cols: "12" }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VAutocomplete, {
                                                  label: "Direcci\xF3n",
                                                  modelValue: unref(locationModel).address,
                                                  "onUpdate:modelValue": ($event) => unref(locationModel).address = $event,
                                                  items: unref(googleSearchLocations),
                                                  "item-title": "name",
                                                  "item-value": "address",
                                                  outlined: "",
                                                  "onUpdate:search": ($event) => unref(searchLocation)($event)
                                                }, {
                                                  item: withCtx(({ props, item }, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(VListItem, mergeProps(props, {
                                                        title: item.raw.title,
                                                        subtitle: item.raw.address
                                                      }), null, _parent9, _scopeId8));
                                                    } else {
                                                      return [
                                                        createVNode(VListItem, mergeProps(props, {
                                                          title: item.raw.title,
                                                          subtitle: item.raw.address
                                                        }), null, 16, ["title", "subtitle"])
                                                      ];
                                                    }
                                                  }),
                                                  selection: withCtx(({ item }, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(VListItem, { "two-line": "" }, {
                                                        default: withCtx((_7, _push10, _parent10, _scopeId9) => {
                                                          if (_push10) {
                                                            _push10(ssrRenderComponent(VListItemTitle, null, null, _parent10, _scopeId9));
                                                            _push10(ssrRenderComponent(VListItemSubtitle, null, null, _parent10, _scopeId9));
                                                          } else {
                                                            return [
                                                              createVNode(VListItemTitle, {
                                                                textContent: toDisplayString(item.raw.title)
                                                              }, null, 8, ["textContent"]),
                                                              createVNode(VListItemSubtitle, {
                                                                textContent: toDisplayString(item.raw.address)
                                                              }, null, 8, ["textContent"])
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent9, _scopeId8));
                                                    } else {
                                                      return [
                                                        createVNode(VListItem, { "two-line": "" }, {
                                                          default: withCtx(() => [
                                                            createVNode(VListItemTitle, {
                                                              textContent: toDisplayString(item.raw.title)
                                                            }, null, 8, ["textContent"]),
                                                            createVNode(VListItemSubtitle, {
                                                              textContent: toDisplayString(item.raw.address)
                                                            }, null, 8, ["textContent"])
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VAutocomplete, {
                                                    label: "Direcci\xF3n",
                                                    modelValue: unref(locationModel).address,
                                                    "onUpdate:modelValue": ($event) => unref(locationModel).address = $event,
                                                    items: unref(googleSearchLocations),
                                                    "item-title": "name",
                                                    "item-value": "address",
                                                    outlined: "",
                                                    "onUpdate:search": ($event) => unref(searchLocation)($event)
                                                  }, {
                                                    item: withCtx(({ props, item }) => [
                                                      createVNode(VListItem, mergeProps(props, {
                                                        title: item.raw.title,
                                                        subtitle: item.raw.address
                                                      }), null, 16, ["title", "subtitle"])
                                                    ]),
                                                    selection: withCtx(({ item }) => [
                                                      createVNode(VListItem, { "two-line": "" }, {
                                                        default: withCtx(() => [
                                                          createVNode(VListItemTitle, {
                                                            textContent: toDisplayString(item.raw.title)
                                                          }, null, 8, ["textContent"]),
                                                          createVNode(VListItemSubtitle, {
                                                            textContent: toDisplayString(item.raw.address)
                                                          }, null, 8, ["textContent"])
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 1
                                                  }, 8, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search"])
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, { cols: "12" }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` Disponibilidad `);
                                              } else {
                                                return [
                                                  createTextVNode(" Disponibilidad ")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, mergeProps({ cols: "12" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate)), {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                if (unref(showError)) {
                                                  _push8(ssrRenderComponent(VAlert, { type: "error" }, {
                                                    default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Debe seleccionar una hora de apertura y cierre`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Debe seleccionar una hora de apertura y cierre")
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  _push8(`<!---->`);
                                                }
                                              } else {
                                                return [
                                                  unref(showError) ? (openBlock(), createBlock(VAlert, {
                                                    key: 0,
                                                    type: "error"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Debe seleccionar una hora de apertura y cierre")
                                                    ]),
                                                    _: 1
                                                  })) : createCommentVNode("", true)
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, { cols: "12" }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div class="days_container"${_scopeId7}><!--[-->`);
                                                ssrRenderList(unref(availableDays), (day) => {
                                                  _push8(`<div${ssrRenderAttrs(mergeProps({
                                                    class: "day_container",
                                                    key: day
                                                  }, ssrGetDirectiveProps(_ctx, _directive_auto_animate)))}${_scopeId7}><p class="day_name"${_scopeId7}>${ssrInterpolate(day.name)}</p>`);
                                                  _push8(ssrRenderComponent(VSelect, {
                                                    class: "open_select",
                                                    modelValue: day.open,
                                                    "onUpdate:modelValue": ($event) => day.open = $event,
                                                    label: "Apertura",
                                                    items: unref(hours)
                                                  }, null, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(VSelect, {
                                                    class: "close_select",
                                                    modelValue: day.close,
                                                    "onUpdate:modelValue": ($event) => day.close = $event,
                                                    label: "Cierre",
                                                    items: unref(hours)
                                                  }, null, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(VBtn, {
                                                    class: "add_btn",
                                                    size: "small",
                                                    icon: "mdi-plus",
                                                    variant: "tonal",
                                                    rounded: "10",
                                                    onClick: ($event) => saveDate(day)
                                                  }, null, _parent8, _scopeId7));
                                                  if (day.saved) {
                                                    _push8(ssrRenderComponent(VBtn, {
                                                      onClick: ($event) => removeDate(day),
                                                      class: "clear_btn",
                                                      size: "small",
                                                      icon: "mdi-close",
                                                      variant: "tonal",
                                                      rounded: "10",
                                                      color: "secondary"
                                                    }, null, _parent8, _scopeId7));
                                                  } else {
                                                    _push8(`<!---->`);
                                                  }
                                                  _push8(`</div>`);
                                                });
                                                _push8(`<!--]--></div>`);
                                              } else {
                                                return [
                                                  createVNode("div", { class: "days_container" }, [
                                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(availableDays), (day) => {
                                                      return withDirectives((openBlock(), createBlock("div", {
                                                        class: "day_container",
                                                        key: day
                                                      }, [
                                                        createVNode("p", { class: "day_name" }, toDisplayString(day.name), 1),
                                                        createVNode(VSelect, {
                                                          class: "open_select",
                                                          modelValue: day.open,
                                                          "onUpdate:modelValue": ($event) => day.open = $event,
                                                          label: "Apertura",
                                                          items: unref(hours)
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                                        createVNode(VSelect, {
                                                          class: "close_select",
                                                          modelValue: day.close,
                                                          "onUpdate:modelValue": ($event) => day.close = $event,
                                                          label: "Cierre",
                                                          items: unref(hours)
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                                        createVNode(VBtn, {
                                                          class: "add_btn",
                                                          size: "small",
                                                          icon: "mdi-plus",
                                                          variant: "tonal",
                                                          rounded: "10",
                                                          onClick: ($event) => saveDate(day)
                                                        }, null, 8, ["onClick"]),
                                                        day.saved ? (openBlock(), createBlock(VBtn, {
                                                          key: 0,
                                                          onClick: ($event) => removeDate(day),
                                                          class: "clear_btn",
                                                          size: "small",
                                                          icon: "mdi-close",
                                                          variant: "tonal",
                                                          rounded: "10",
                                                          color: "secondary"
                                                        }, null, 8, ["onClick"])) : createCommentVNode("", true)
                                                      ])), [
                                                        [_directive_auto_animate]
                                                      ]);
                                                    }), 128))
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VCol, { cols: "12" }, {
                                              default: withCtx(() => [
                                                createVNode(VTextField, {
                                                  modelValue: unref(locationModel).name,
                                                  "onUpdate:modelValue": ($event) => unref(locationModel).name = $event,
                                                  label: "Nombre",
                                                  outlined: "",
                                                  dense: "",
                                                  required: ""
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, { cols: "12" }, {
                                              default: withCtx(() => [
                                                createVNode(VAutocomplete, {
                                                  label: "Direcci\xF3n",
                                                  modelValue: unref(locationModel).address,
                                                  "onUpdate:modelValue": ($event) => unref(locationModel).address = $event,
                                                  items: unref(googleSearchLocations),
                                                  "item-title": "name",
                                                  "item-value": "address",
                                                  outlined: "",
                                                  "onUpdate:search": ($event) => unref(searchLocation)($event)
                                                }, {
                                                  item: withCtx(({ props, item }) => [
                                                    createVNode(VListItem, mergeProps(props, {
                                                      title: item.raw.title,
                                                      subtitle: item.raw.address
                                                    }), null, 16, ["title", "subtitle"])
                                                  ]),
                                                  selection: withCtx(({ item }) => [
                                                    createVNode(VListItem, { "two-line": "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(VListItemTitle, {
                                                          textContent: toDisplayString(item.raw.title)
                                                        }, null, 8, ["textContent"]),
                                                        createVNode(VListItemSubtitle, {
                                                          textContent: toDisplayString(item.raw.address)
                                                        }, null, 8, ["textContent"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 1
                                                }, 8, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, { cols: "12" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Disponibilidad ")
                                              ]),
                                              _: 1
                                            }),
                                            withDirectives((openBlock(), createBlock(VCol, { cols: "12" }, {
                                              default: withCtx(() => [
                                                unref(showError) ? (openBlock(), createBlock(VAlert, {
                                                  key: 0,
                                                  type: "error"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Debe seleccionar una hora de apertura y cierre")
                                                  ]),
                                                  _: 1
                                                })) : createCommentVNode("", true)
                                              ]),
                                              _: 1
                                            })), [
                                              [_directive_auto_animate]
                                            ]),
                                            createVNode(VCol, { cols: "12" }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "days_container" }, [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(availableDays), (day) => {
                                                    return withDirectives((openBlock(), createBlock("div", {
                                                      class: "day_container",
                                                      key: day
                                                    }, [
                                                      createVNode("p", { class: "day_name" }, toDisplayString(day.name), 1),
                                                      createVNode(VSelect, {
                                                        class: "open_select",
                                                        modelValue: day.open,
                                                        "onUpdate:modelValue": ($event) => day.open = $event,
                                                        label: "Apertura",
                                                        items: unref(hours)
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                                      createVNode(VSelect, {
                                                        class: "close_select",
                                                        modelValue: day.close,
                                                        "onUpdate:modelValue": ($event) => day.close = $event,
                                                        label: "Cierre",
                                                        items: unref(hours)
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                                      createVNode(VBtn, {
                                                        class: "add_btn",
                                                        size: "small",
                                                        icon: "mdi-plus",
                                                        variant: "tonal",
                                                        rounded: "10",
                                                        onClick: ($event) => saveDate(day)
                                                      }, null, 8, ["onClick"]),
                                                      day.saved ? (openBlock(), createBlock(VBtn, {
                                                        key: 0,
                                                        onClick: ($event) => removeDate(day),
                                                        class: "clear_btn",
                                                        size: "small",
                                                        icon: "mdi-close",
                                                        variant: "tonal",
                                                        rounded: "10",
                                                        color: "secondary"
                                                      }, null, 8, ["onClick"])) : createCommentVNode("", true)
                                                    ])), [
                                                      [_directive_auto_animate]
                                                    ]);
                                                  }), 128))
                                                ])
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VRow, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VCol, { class: "" }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VBtn, {
                                                  block: "",
                                                  text: "Guardar",
                                                  onClick: handleStoreLocation
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VBtn, {
                                                    block: "",
                                                    text: "Guardar",
                                                    onClick: handleStoreLocation
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VCol, { class: "" }, {
                                              default: withCtx(() => [
                                                createVNode(VBtn, {
                                                  block: "",
                                                  text: "Guardar",
                                                  onClick: handleStoreLocation
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VRow, null, {
                                        default: withCtx(() => [
                                          createVNode(VCol, null, {
                                            default: withCtx(() => [
                                              createVNode("p", { class: "text-body-2 text-medium-emphasis" }, [
                                                createTextVNode(" El campo de juego "),
                                                createVNode("span", { class: "text-high-emphasis" }, " no"),
                                                createTextVNode(" esta relacionado con un equipo en especifico, es un lugar donde se llevar\xE1n a cabo los partidos ")
                                              ])
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
                                              createVNode(VTextField, {
                                                modelValue: unref(locationModel).name,
                                                "onUpdate:modelValue": ($event) => unref(locationModel).name = $event,
                                                label: "Nombre",
                                                outlined: "",
                                                dense: "",
                                                required: ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, { cols: "12" }, {
                                            default: withCtx(() => [
                                              createVNode(VAutocomplete, {
                                                label: "Direcci\xF3n",
                                                modelValue: unref(locationModel).address,
                                                "onUpdate:modelValue": ($event) => unref(locationModel).address = $event,
                                                items: unref(googleSearchLocations),
                                                "item-title": "name",
                                                "item-value": "address",
                                                outlined: "",
                                                "onUpdate:search": ($event) => unref(searchLocation)($event)
                                              }, {
                                                item: withCtx(({ props, item }) => [
                                                  createVNode(VListItem, mergeProps(props, {
                                                    title: item.raw.title,
                                                    subtitle: item.raw.address
                                                  }), null, 16, ["title", "subtitle"])
                                                ]),
                                                selection: withCtx(({ item }) => [
                                                  createVNode(VListItem, { "two-line": "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(VListItemTitle, {
                                                        textContent: toDisplayString(item.raw.title)
                                                      }, null, 8, ["textContent"]),
                                                      createVNode(VListItemSubtitle, {
                                                        textContent: toDisplayString(item.raw.address)
                                                      }, null, 8, ["textContent"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 1
                                              }, 8, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, { cols: "12" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Disponibilidad ")
                                            ]),
                                            _: 1
                                          }),
                                          withDirectives((openBlock(), createBlock(VCol, { cols: "12" }, {
                                            default: withCtx(() => [
                                              unref(showError) ? (openBlock(), createBlock(VAlert, {
                                                key: 0,
                                                type: "error"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Debe seleccionar una hora de apertura y cierre")
                                                ]),
                                                _: 1
                                              })) : createCommentVNode("", true)
                                            ]),
                                            _: 1
                                          })), [
                                            [_directive_auto_animate]
                                          ]),
                                          createVNode(VCol, { cols: "12" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "days_container" }, [
                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(availableDays), (day) => {
                                                  return withDirectives((openBlock(), createBlock("div", {
                                                    class: "day_container",
                                                    key: day
                                                  }, [
                                                    createVNode("p", { class: "day_name" }, toDisplayString(day.name), 1),
                                                    createVNode(VSelect, {
                                                      class: "open_select",
                                                      modelValue: day.open,
                                                      "onUpdate:modelValue": ($event) => day.open = $event,
                                                      label: "Apertura",
                                                      items: unref(hours)
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                                    createVNode(VSelect, {
                                                      class: "close_select",
                                                      modelValue: day.close,
                                                      "onUpdate:modelValue": ($event) => day.close = $event,
                                                      label: "Cierre",
                                                      items: unref(hours)
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                                    createVNode(VBtn, {
                                                      class: "add_btn",
                                                      size: "small",
                                                      icon: "mdi-plus",
                                                      variant: "tonal",
                                                      rounded: "10",
                                                      onClick: ($event) => saveDate(day)
                                                    }, null, 8, ["onClick"]),
                                                    day.saved ? (openBlock(), createBlock(VBtn, {
                                                      key: 0,
                                                      onClick: ($event) => removeDate(day),
                                                      class: "clear_btn",
                                                      size: "small",
                                                      icon: "mdi-close",
                                                      variant: "tonal",
                                                      rounded: "10",
                                                      color: "secondary"
                                                    }, null, 8, ["onClick"])) : createCommentVNode("", true)
                                                  ])), [
                                                    [_directive_auto_animate]
                                                  ]);
                                                }), 128))
                                              ])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VRow, null, {
                                        default: withCtx(() => [
                                          createVNode(VCol, { class: "" }, {
                                            default: withCtx(() => [
                                              createVNode(VBtn, {
                                                block: "",
                                                text: "Guardar",
                                                onClick: handleStoreLocation
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
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VContainer, null, {
                                  default: withCtx(() => [
                                    createVNode(VRow, null, {
                                      default: withCtx(() => [
                                        createVNode(VCol, null, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-body-2 text-medium-emphasis" }, [
                                              createTextVNode(" El campo de juego "),
                                              createVNode("span", { class: "text-high-emphasis" }, " no"),
                                              createTextVNode(" esta relacionado con un equipo en especifico, es un lugar donde se llevar\xE1n a cabo los partidos ")
                                            ])
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
                                            createVNode(VTextField, {
                                              modelValue: unref(locationModel).name,
                                              "onUpdate:modelValue": ($event) => unref(locationModel).name = $event,
                                              label: "Nombre",
                                              outlined: "",
                                              dense: "",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, { cols: "12" }, {
                                          default: withCtx(() => [
                                            createVNode(VAutocomplete, {
                                              label: "Direcci\xF3n",
                                              modelValue: unref(locationModel).address,
                                              "onUpdate:modelValue": ($event) => unref(locationModel).address = $event,
                                              items: unref(googleSearchLocations),
                                              "item-title": "name",
                                              "item-value": "address",
                                              outlined: "",
                                              "onUpdate:search": ($event) => unref(searchLocation)($event)
                                            }, {
                                              item: withCtx(({ props, item }) => [
                                                createVNode(VListItem, mergeProps(props, {
                                                  title: item.raw.title,
                                                  subtitle: item.raw.address
                                                }), null, 16, ["title", "subtitle"])
                                              ]),
                                              selection: withCtx(({ item }) => [
                                                createVNode(VListItem, { "two-line": "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(VListItemTitle, {
                                                      textContent: toDisplayString(item.raw.title)
                                                    }, null, 8, ["textContent"]),
                                                    createVNode(VListItemSubtitle, {
                                                      textContent: toDisplayString(item.raw.address)
                                                    }, null, 8, ["textContent"])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 1
                                            }, 8, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, { cols: "12" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Disponibilidad ")
                                          ]),
                                          _: 1
                                        }),
                                        withDirectives((openBlock(), createBlock(VCol, { cols: "12" }, {
                                          default: withCtx(() => [
                                            unref(showError) ? (openBlock(), createBlock(VAlert, {
                                              key: 0,
                                              type: "error"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Debe seleccionar una hora de apertura y cierre")
                                              ]),
                                              _: 1
                                            })) : createCommentVNode("", true)
                                          ]),
                                          _: 1
                                        })), [
                                          [_directive_auto_animate]
                                        ]),
                                        createVNode(VCol, { cols: "12" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "days_container" }, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(availableDays), (day) => {
                                                return withDirectives((openBlock(), createBlock("div", {
                                                  class: "day_container",
                                                  key: day
                                                }, [
                                                  createVNode("p", { class: "day_name" }, toDisplayString(day.name), 1),
                                                  createVNode(VSelect, {
                                                    class: "open_select",
                                                    modelValue: day.open,
                                                    "onUpdate:modelValue": ($event) => day.open = $event,
                                                    label: "Apertura",
                                                    items: unref(hours)
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                                  createVNode(VSelect, {
                                                    class: "close_select",
                                                    modelValue: day.close,
                                                    "onUpdate:modelValue": ($event) => day.close = $event,
                                                    label: "Cierre",
                                                    items: unref(hours)
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                                  createVNode(VBtn, {
                                                    class: "add_btn",
                                                    size: "small",
                                                    icon: "mdi-plus",
                                                    variant: "tonal",
                                                    rounded: "10",
                                                    onClick: ($event) => saveDate(day)
                                                  }, null, 8, ["onClick"]),
                                                  day.saved ? (openBlock(), createBlock(VBtn, {
                                                    key: 0,
                                                    onClick: ($event) => removeDate(day),
                                                    class: "clear_btn",
                                                    size: "small",
                                                    icon: "mdi-close",
                                                    variant: "tonal",
                                                    rounded: "10",
                                                    color: "secondary"
                                                  }, null, 8, ["onClick"])) : createCommentVNode("", true)
                                                ])), [
                                                  [_directive_auto_animate]
                                                ]);
                                              }), 128))
                                            ])
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VRow, null, {
                                      default: withCtx(() => [
                                        createVNode(VCol, { class: "" }, {
                                          default: withCtx(() => [
                                            createVNode(VBtn, {
                                              block: "",
                                              text: "Guardar",
                                              onClick: handleStoreLocation
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
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VForm, null, {
                            default: withCtx(() => [
                              createVNode(VContainer, null, {
                                default: withCtx(() => [
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      createVNode(VCol, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-body-2 text-medium-emphasis" }, [
                                            createTextVNode(" El campo de juego "),
                                            createVNode("span", { class: "text-high-emphasis" }, " no"),
                                            createTextVNode(" esta relacionado con un equipo en especifico, es un lugar donde se llevar\xE1n a cabo los partidos ")
                                          ])
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
                                          createVNode(VTextField, {
                                            modelValue: unref(locationModel).name,
                                            "onUpdate:modelValue": ($event) => unref(locationModel).name = $event,
                                            label: "Nombre",
                                            outlined: "",
                                            dense: "",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "12" }, {
                                        default: withCtx(() => [
                                          createVNode(VAutocomplete, {
                                            label: "Direcci\xF3n",
                                            modelValue: unref(locationModel).address,
                                            "onUpdate:modelValue": ($event) => unref(locationModel).address = $event,
                                            items: unref(googleSearchLocations),
                                            "item-title": "name",
                                            "item-value": "address",
                                            outlined: "",
                                            "onUpdate:search": ($event) => unref(searchLocation)($event)
                                          }, {
                                            item: withCtx(({ props, item }) => [
                                              createVNode(VListItem, mergeProps(props, {
                                                title: item.raw.title,
                                                subtitle: item.raw.address
                                              }), null, 16, ["title", "subtitle"])
                                            ]),
                                            selection: withCtx(({ item }) => [
                                              createVNode(VListItem, { "two-line": "" }, {
                                                default: withCtx(() => [
                                                  createVNode(VListItemTitle, {
                                                    textContent: toDisplayString(item.raw.title)
                                                  }, null, 8, ["textContent"]),
                                                  createVNode(VListItemSubtitle, {
                                                    textContent: toDisplayString(item.raw.address)
                                                  }, null, 8, ["textContent"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 1
                                          }, 8, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "12" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Disponibilidad ")
                                        ]),
                                        _: 1
                                      }),
                                      withDirectives((openBlock(), createBlock(VCol, { cols: "12" }, {
                                        default: withCtx(() => [
                                          unref(showError) ? (openBlock(), createBlock(VAlert, {
                                            key: 0,
                                            type: "error"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Debe seleccionar una hora de apertura y cierre")
                                            ]),
                                            _: 1
                                          })) : createCommentVNode("", true)
                                        ]),
                                        _: 1
                                      })), [
                                        [_directive_auto_animate]
                                      ]),
                                      createVNode(VCol, { cols: "12" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "days_container" }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(availableDays), (day) => {
                                              return withDirectives((openBlock(), createBlock("div", {
                                                class: "day_container",
                                                key: day
                                              }, [
                                                createVNode("p", { class: "day_name" }, toDisplayString(day.name), 1),
                                                createVNode(VSelect, {
                                                  class: "open_select",
                                                  modelValue: day.open,
                                                  "onUpdate:modelValue": ($event) => day.open = $event,
                                                  label: "Apertura",
                                                  items: unref(hours)
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                                createVNode(VSelect, {
                                                  class: "close_select",
                                                  modelValue: day.close,
                                                  "onUpdate:modelValue": ($event) => day.close = $event,
                                                  label: "Cierre",
                                                  items: unref(hours)
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                                createVNode(VBtn, {
                                                  class: "add_btn",
                                                  size: "small",
                                                  icon: "mdi-plus",
                                                  variant: "tonal",
                                                  rounded: "10",
                                                  onClick: ($event) => saveDate(day)
                                                }, null, 8, ["onClick"]),
                                                day.saved ? (openBlock(), createBlock(VBtn, {
                                                  key: 0,
                                                  onClick: ($event) => removeDate(day),
                                                  class: "clear_btn",
                                                  size: "small",
                                                  icon: "mdi-close",
                                                  variant: "tonal",
                                                  rounded: "10",
                                                  color: "secondary"
                                                }, null, 8, ["onClick"])) : createCommentVNode("", true)
                                              ])), [
                                                [_directive_auto_animate]
                                              ]);
                                            }), 128))
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      createVNode(VCol, { class: "" }, {
                                        default: withCtx(() => [
                                          createVNode(VBtn, {
                                            block: "",
                                            text: "Guardar",
                                            onClick: handleStoreLocation
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
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VForm, null, {
                          default: withCtx(() => [
                            createVNode(VContainer, null, {
                              default: withCtx(() => [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-body-2 text-medium-emphasis" }, [
                                          createTextVNode(" El campo de juego "),
                                          createVNode("span", { class: "text-high-emphasis" }, " no"),
                                          createTextVNode(" esta relacionado con un equipo en especifico, es un lugar donde se llevar\xE1n a cabo los partidos ")
                                        ])
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
                                        createVNode(VTextField, {
                                          modelValue: unref(locationModel).name,
                                          "onUpdate:modelValue": ($event) => unref(locationModel).name = $event,
                                          label: "Nombre",
                                          outlined: "",
                                          dense: "",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "12" }, {
                                      default: withCtx(() => [
                                        createVNode(VAutocomplete, {
                                          label: "Direcci\xF3n",
                                          modelValue: unref(locationModel).address,
                                          "onUpdate:modelValue": ($event) => unref(locationModel).address = $event,
                                          items: unref(googleSearchLocations),
                                          "item-title": "name",
                                          "item-value": "address",
                                          outlined: "",
                                          "onUpdate:search": ($event) => unref(searchLocation)($event)
                                        }, {
                                          item: withCtx(({ props, item }) => [
                                            createVNode(VListItem, mergeProps(props, {
                                              title: item.raw.title,
                                              subtitle: item.raw.address
                                            }), null, 16, ["title", "subtitle"])
                                          ]),
                                          selection: withCtx(({ item }) => [
                                            createVNode(VListItem, { "two-line": "" }, {
                                              default: withCtx(() => [
                                                createVNode(VListItemTitle, {
                                                  textContent: toDisplayString(item.raw.title)
                                                }, null, 8, ["textContent"]),
                                                createVNode(VListItemSubtitle, {
                                                  textContent: toDisplayString(item.raw.address)
                                                }, null, 8, ["textContent"])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "12" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Disponibilidad ")
                                      ]),
                                      _: 1
                                    }),
                                    withDirectives((openBlock(), createBlock(VCol, { cols: "12" }, {
                                      default: withCtx(() => [
                                        unref(showError) ? (openBlock(), createBlock(VAlert, {
                                          key: 0,
                                          type: "error"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Debe seleccionar una hora de apertura y cierre")
                                          ]),
                                          _: 1
                                        })) : createCommentVNode("", true)
                                      ]),
                                      _: 1
                                    })), [
                                      [_directive_auto_animate]
                                    ]),
                                    createVNode(VCol, { cols: "12" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "days_container" }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(availableDays), (day) => {
                                            return withDirectives((openBlock(), createBlock("div", {
                                              class: "day_container",
                                              key: day
                                            }, [
                                              createVNode("p", { class: "day_name" }, toDisplayString(day.name), 1),
                                              createVNode(VSelect, {
                                                class: "open_select",
                                                modelValue: day.open,
                                                "onUpdate:modelValue": ($event) => day.open = $event,
                                                label: "Apertura",
                                                items: unref(hours)
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                              createVNode(VSelect, {
                                                class: "close_select",
                                                modelValue: day.close,
                                                "onUpdate:modelValue": ($event) => day.close = $event,
                                                label: "Cierre",
                                                items: unref(hours)
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                              createVNode(VBtn, {
                                                class: "add_btn",
                                                size: "small",
                                                icon: "mdi-plus",
                                                variant: "tonal",
                                                rounded: "10",
                                                onClick: ($event) => saveDate(day)
                                              }, null, 8, ["onClick"]),
                                              day.saved ? (openBlock(), createBlock(VBtn, {
                                                key: 0,
                                                onClick: ($event) => removeDate(day),
                                                class: "clear_btn",
                                                size: "small",
                                                icon: "mdi-close",
                                                variant: "tonal",
                                                rounded: "10",
                                                color: "secondary"
                                              }, null, 8, ["onClick"])) : createCommentVNode("", true)
                                            ])), [
                                              [_directive_auto_animate]
                                            ]);
                                          }), 128))
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { class: "" }, {
                                      default: withCtx(() => [
                                        createVNode(VBtn, {
                                          block: "",
                                          text: "Guardar",
                                          onClick: handleStoreLocation
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
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, {
                "prepend-icon": "mdi-soccer-field",
                title: "Agregar cancha de juego"
              }, {
                default: withCtx(() => [
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VForm, null, {
                        default: withCtx(() => [
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-body-2 text-medium-emphasis" }, [
                                        createTextVNode(" El campo de juego "),
                                        createVNode("span", { class: "text-high-emphasis" }, " no"),
                                        createTextVNode(" esta relacionado con un equipo en especifico, es un lugar donde se llevar\xE1n a cabo los partidos ")
                                      ])
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
                                      createVNode(VTextField, {
                                        modelValue: unref(locationModel).name,
                                        "onUpdate:modelValue": ($event) => unref(locationModel).name = $event,
                                        label: "Nombre",
                                        outlined: "",
                                        dense: "",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "12" }, {
                                    default: withCtx(() => [
                                      createVNode(VAutocomplete, {
                                        label: "Direcci\xF3n",
                                        modelValue: unref(locationModel).address,
                                        "onUpdate:modelValue": ($event) => unref(locationModel).address = $event,
                                        items: unref(googleSearchLocations),
                                        "item-title": "name",
                                        "item-value": "address",
                                        outlined: "",
                                        "onUpdate:search": ($event) => unref(searchLocation)($event)
                                      }, {
                                        item: withCtx(({ props, item }) => [
                                          createVNode(VListItem, mergeProps(props, {
                                            title: item.raw.title,
                                            subtitle: item.raw.address
                                          }), null, 16, ["title", "subtitle"])
                                        ]),
                                        selection: withCtx(({ item }) => [
                                          createVNode(VListItem, { "two-line": "" }, {
                                            default: withCtx(() => [
                                              createVNode(VListItemTitle, {
                                                textContent: toDisplayString(item.raw.title)
                                              }, null, 8, ["textContent"]),
                                              createVNode(VListItemSubtitle, {
                                                textContent: toDisplayString(item.raw.address)
                                              }, null, 8, ["textContent"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "12" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Disponibilidad ")
                                    ]),
                                    _: 1
                                  }),
                                  withDirectives((openBlock(), createBlock(VCol, { cols: "12" }, {
                                    default: withCtx(() => [
                                      unref(showError) ? (openBlock(), createBlock(VAlert, {
                                        key: 0,
                                        type: "error"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Debe seleccionar una hora de apertura y cierre")
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true)
                                    ]),
                                    _: 1
                                  })), [
                                    [_directive_auto_animate]
                                  ]),
                                  createVNode(VCol, { cols: "12" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "days_container" }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(availableDays), (day) => {
                                          return withDirectives((openBlock(), createBlock("div", {
                                            class: "day_container",
                                            key: day
                                          }, [
                                            createVNode("p", { class: "day_name" }, toDisplayString(day.name), 1),
                                            createVNode(VSelect, {
                                              class: "open_select",
                                              modelValue: day.open,
                                              "onUpdate:modelValue": ($event) => day.open = $event,
                                              label: "Apertura",
                                              items: unref(hours)
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                            createVNode(VSelect, {
                                              class: "close_select",
                                              modelValue: day.close,
                                              "onUpdate:modelValue": ($event) => day.close = $event,
                                              label: "Cierre",
                                              items: unref(hours)
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                            createVNode(VBtn, {
                                              class: "add_btn",
                                              size: "small",
                                              icon: "mdi-plus",
                                              variant: "tonal",
                                              rounded: "10",
                                              onClick: ($event) => saveDate(day)
                                            }, null, 8, ["onClick"]),
                                            day.saved ? (openBlock(), createBlock(VBtn, {
                                              key: 0,
                                              onClick: ($event) => removeDate(day),
                                              class: "clear_btn",
                                              size: "small",
                                              icon: "mdi-close",
                                              variant: "tonal",
                                              rounded: "10",
                                              color: "secondary"
                                            }, null, 8, ["onClick"])) : createCommentVNode("", true)
                                          ])), [
                                            [_directive_auto_animate]
                                          ]);
                                        }), 128))
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { class: "" }, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, {
                                        block: "",
                                        text: "Guardar",
                                        onClick: handleStoreLocation
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/add-field.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "inscribir",
  __ssrInlineRender: true,
  setup(__props) {
    const { categories, tournaments, locations } = storeToRefs(useTeamStore());
    const dialog = ref(false);
    const tab = ref("home");
    const step = ref(1);
    const {
      fields,
      handleSubmit,
      resetForm
    } = useSchemas("create-team");
    const uniform = ref({
      home: {
        jersey: "#000",
        short: "#fff"
      },
      away: {
        jersey: "#fff",
        short: "#000"
      }
    });
    const openColorOptions = (e) => {
      if (e.target.tagName === "path") {
        e.target.parentElement.nextElementSibling.click();
      }
    };
    const changeColor = (color, value, type) => uniform.value[type][value] = color;
    const completedSteps = reactive({
      step1: false,
      step2: false,
      step3: false
    });
    const nextStep = (e) => {
      if (completedSteps.step1 && completedSteps.step2 && completedSteps.step3) {
        return;
      }
      if (!completedSteps.step1) {
        if (!fields.name.fieldPropsValue["error-messages"].length && !fields.tournament_id.fieldPropsValue["error-messages"].length && !fields.category_id.fieldPropsValue["error-messages"].length && !fields.location_id.fieldPropsValue["error-messages"].length && fields.name.fieldValue && fields.tournament_id.fieldValue && fields.category_id.fieldValue && fields.location_id.fieldValue) {
          completedSteps.step1 = true;
          step.value = 2;
        }
      }
      if (!completedSteps.step2) {
        if (!fields.president_name.fieldPropsValue["error-messages"].length && !fields.coach_name.fieldPropsValue["error-messages"].length && !fields.phone.fieldPropsValue["error-messages"].length && !fields.email.fieldPropsValue["error-messages"].length && !fields.address.fieldPropsValue["error-messages"].length && fields.president_name.fieldValue && fields.coach_name.fieldValue && fields.phone.fieldValue && fields.email.fieldValue && fields.address.fieldValue) {
          completedSteps.step2 = true;
          step.value = 3;
        }
      }
      if (!completedSteps.step3) {
        if (!fields.image.fieldPropsValue["error-messages"].length) {
          completedSteps.step3 = true;
        }
      }
    };
    const createTeam = handleSubmit(async (values) => {
      var _a;
      const formData = new FormData();
      values.colors = uniform.value;
      for (const key in values) {
        if (((_a = values[key]) == null ? void 0 : _a.length) && values[key][0] instanceof File) {
          formData.append(key, values[key][0]);
        } else if (typeof values[key] === "object" && !(values[key] instanceof File)) {
          formData.append(key, JSON.stringify(values[key]));
        } else if (values[key]) {
          formData.append(key, values[key]);
        }
      }
      useTeamStore().createTeam(formData).then(() => {
        resetForm();
        dialog.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VSheet, mergeProps({
        elevation: "20",
        "max-width": "800px",
        class: "mx-auto py-6 px-8"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "12" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<h1 class="text-h5 text-lg-h4 text-md-4"${_scopeId4}>Incripcion de equipo</h1>`);
                            } else {
                              return [
                                createVNode("h1", { class: "text-h5 text-lg-h4 text-md-4" }, "Incripcion de equipo")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode("h1", { class: "text-h5 text-lg-h4 text-md-4" }, "Incripcion de equipo")
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
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, mergeProps({
                                variant: "outlined",
                                label: "Nombre del equipo",
                                modelValue: unref(fields).name.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                              }, unref(fields).name.fieldPropsValue, { onBlur: nextStep }), null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, mergeProps({
                                  variant: "outlined",
                                  label: "Nombre del equipo",
                                  modelValue: unref(fields).name.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                                }, unref(fields).name.fieldPropsValue, { onBlur: nextStep }), null, 16, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VSelect, mergeProps({
                                modelValue: unref(fields).tournament_id.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                              }, unref(fields).tournament_id.fieldPropsValue, {
                                "item-value": "id",
                                "item-title": "name",
                                "onUpdate:modelValue": nextStep,
                                items: unref(tournaments),
                                label: "Torneo",
                                variant: "outlined"
                              }), null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VSelect, mergeProps({
                                  modelValue: unref(fields).tournament_id.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                                }, unref(fields).tournament_id.fieldPropsValue, {
                                  "item-value": "id",
                                  "item-title": "name",
                                  "onUpdate:modelValue": nextStep,
                                  items: unref(tournaments),
                                  label: "Torneo",
                                  variant: "outlined"
                                }), null, 16, ["modelValue", "onUpdate:modelValue", "items"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VSelect, mergeProps({
                                modelValue: unref(fields).category_id.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event
                              }, unref(fields).category_id.fieldPropsValue, {
                                "onUpdate:modelValue": nextStep,
                                items: unref(categories),
                                "item-value": "id",
                                "item-title": "name",
                                variant: "outlined",
                                label: "Categoria"
                              }), null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VSelect, mergeProps({
                                  modelValue: unref(fields).category_id.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event
                                }, unref(fields).category_id.fieldPropsValue, {
                                  "onUpdate:modelValue": nextStep,
                                  items: unref(categories),
                                  "item-value": "id",
                                  "item-title": "name",
                                  variant: "outlined",
                                  label: "Categoria"
                                }), null, 16, ["modelValue", "onUpdate:modelValue", "items"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VSelect, mergeProps({
                                modelValue: unref(fields).location_id.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).location_id.fieldValue = $event
                              }, unref(fields).location_id.fieldPropsValue, {
                                "onUpdate:modelValue": nextStep,
                                items: unref(locations),
                                "item-value": "id",
                                "item-title": "name",
                                variant: "outlined",
                                label: "Cancha de juego"
                              }), null, _parent5, _scopeId4));
                              _push5(` `);
                              _push5(ssrRenderComponent(_sfc_main$1, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VSelect, mergeProps({
                                  modelValue: unref(fields).location_id.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).location_id.fieldValue = $event
                                }, unref(fields).location_id.fieldPropsValue, {
                                  "onUpdate:modelValue": nextStep,
                                  items: unref(locations),
                                  "item-value": "id",
                                  "item-title": "name",
                                  variant: "outlined",
                                  label: "Cancha de juego"
                                }), null, 16, ["modelValue", "onUpdate:modelValue", "items"]),
                                createTextVNode(),
                                createVNode(_sfc_main$1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, mergeProps({
                                variant: "outlined",
                                label: "Nombre del equipo",
                                modelValue: unref(fields).name.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                              }, unref(fields).name.fieldPropsValue, { onBlur: nextStep }), null, 16, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VSelect, mergeProps({
                                modelValue: unref(fields).tournament_id.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                              }, unref(fields).tournament_id.fieldPropsValue, {
                                "item-value": "id",
                                "item-title": "name",
                                "onUpdate:modelValue": nextStep,
                                items: unref(tournaments),
                                label: "Torneo",
                                variant: "outlined"
                              }), null, 16, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VSelect, mergeProps({
                                modelValue: unref(fields).category_id.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event
                              }, unref(fields).category_id.fieldPropsValue, {
                                "onUpdate:modelValue": nextStep,
                                items: unref(categories),
                                "item-value": "id",
                                "item-title": "name",
                                variant: "outlined",
                                label: "Categoria"
                              }), null, 16, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VSelect, mergeProps({
                                modelValue: unref(fields).location_id.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).location_id.fieldValue = $event
                              }, unref(fields).location_id.fieldPropsValue, {
                                "onUpdate:modelValue": nextStep,
                                items: unref(locations),
                                "item-value": "id",
                                "item-title": "name",
                                variant: "outlined",
                                label: "Cancha de juego"
                              }), null, 16, ["modelValue", "onUpdate:modelValue", "items"]),
                              createTextVNode(),
                              createVNode(_sfc_main$1)
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
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, mergeProps({
                                modelValue: unref(fields).president_name.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).president_name.fieldValue = $event
                              }, unref(fields).president_name.fieldPropsValue, {
                                onBlur: nextStep,
                                label: "Delegado/Presidente"
                              }), null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, mergeProps({
                                  modelValue: unref(fields).president_name.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).president_name.fieldValue = $event
                                }, unref(fields).president_name.fieldPropsValue, {
                                  onBlur: nextStep,
                                  label: "Delegado/Presidente"
                                }), null, 16, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, mergeProps({
                                modelValue: unref(fields).coach_name.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).coach_name.fieldValue = $event
                              }, unref(fields).coach_name.fieldPropsValue, {
                                onBlur: nextStep,
                                label: "DT/Entrenador"
                              }), null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, mergeProps({
                                  modelValue: unref(fields).coach_name.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).coach_name.fieldValue = $event
                                }, unref(fields).coach_name.fieldPropsValue, {
                                  onBlur: nextStep,
                                  label: "DT/Entrenador"
                                }), null, 16, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, mergeProps({
                                modelValue: unref(fields).phone.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event
                              }, unref(fields).phone.fieldPropsValue, {
                                onKeydown: ($event) => {
                                  var _a;
                                  return unref(fields).phone.fieldValue = (_a = $event.target.value) == null ? void 0 : _a.replace(/[^0-9]/g, "");
                                },
                                onBlur: nextStep,
                                label: "Telefono"
                              }), null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, mergeProps({
                                  modelValue: unref(fields).phone.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event
                                }, unref(fields).phone.fieldPropsValue, {
                                  onKeydown: ($event) => {
                                    var _a;
                                    return unref(fields).phone.fieldValue = (_a = $event.target.value) == null ? void 0 : _a.replace(/[^0-9]/g, "");
                                  },
                                  onBlur: nextStep,
                                  label: "Telefono"
                                }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, mergeProps({
                                modelValue: unref(fields).email.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                              }, unref(fields).email.fieldPropsValue, {
                                onBlur: nextStep,
                                label: "Correo"
                              }), null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, mergeProps({
                                  modelValue: unref(fields).email.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                                }, unref(fields).email.fieldPropsValue, {
                                  onBlur: nextStep,
                                  label: "Correo"
                                }), null, 16, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, mergeProps({
                                modelValue: unref(fields).address.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                              }, unref(fields).address.fieldPropsValue, {
                                label: "Direccion",
                                onBlur: nextStep
                              }), null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VFileInput, mergeProps({
                                class: "mt-6",
                                modelValue: unref(fields).image.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).image.fieldValue = $event
                              }, unref(fields).image.fieldPropsValue, {
                                onBlur: nextStep,
                                label: "Escudo"
                              }), null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, mergeProps({
                                  modelValue: unref(fields).address.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                                }, unref(fields).address.fieldPropsValue, {
                                  label: "Direccion",
                                  onBlur: nextStep
                                }), null, 16, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(VFileInput, mergeProps({
                                  class: "mt-6",
                                  modelValue: unref(fields).image.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).image.fieldValue = $event
                                }, unref(fields).image.fieldPropsValue, {
                                  onBlur: nextStep,
                                  label: "Escudo"
                                }), null, 16, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6",
                          class: "flex-0-0"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCard, {
                                variant: "text",
                                border: _ctx.$vuetify.display.mobile
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCardText, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTabs, {
                                            modelValue: unref(tab),
                                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                                            "fixed-tabs": ""
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VTab, { value: "home" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Local`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Local")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(VTab, { value: "away" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`visitante`);
                                                    } else {
                                                      return [
                                                        createTextVNode("visitante")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VTab, { value: "home" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Local")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(VTab, { value: "away" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("visitante")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VWindow, {
                                            modelValue: unref(tab),
                                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VWindowItem, {
                                                  value: "home",
                                                  key: "home"
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(VContainer, {
                                                        fluid: "",
                                                        class: "pa-0"
                                                      }, {
                                                        default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                          if (_push10) {
                                                            _push10(ssrRenderComponent(VRow, null, {
                                                              default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                if (_push11) {
                                                                  _push11(ssrRenderComponent(VCol, { cols: "6" }, {
                                                                    default: withCtx((_11, _push12, _parent12, _scopeId11) => {
                                                                      if (_push12) {
                                                                        _push12(`<div class="d-flex flex-column justify-center align-center"${_scopeId11}><svg width="100" height="165" viewBox="0 0 128 165" xmlns="http://www.w3.org/2000/svg"${_scopeId11}><path d="M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z"${ssrRenderAttr("fill", unref(uniform).home.jersey)}${_scopeId11}></path><path d="M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z"${ssrRenderAttr("fill", unref(uniform).home.jersey)}${_scopeId11}></path><path d="M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z"${ssrRenderAttr("fill", unref(uniform).home.jersey)}${_scopeId11}></path><path d="M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z"${ssrRenderAttr("fill", unref(uniform).home.jersey)}${_scopeId11}></path><path d="M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z"${ssrRenderAttr("fill", unref(uniform).home.jersey)}${_scopeId11}></path><path d="M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z"${ssrRenderAttr("fill", unref(uniform).home.jersey)}${_scopeId11}></path><path d="M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z"${ssrRenderAttr("fill", unref(uniform).home.jersey)}${_scopeId11}></path></svg><input type="color"${ssrRenderAttr("value", unref(uniform).home.jersey)}${_scopeId11}></div>`);
                                                                      } else {
                                                                        return [
                                                                          createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                            (openBlock(), createBlock("svg", {
                                                                              width: "100",
                                                                              height: "165",
                                                                              viewBox: "0 0 128 165",
                                                                              xmlns: "http://www.w3.org/2000/svg",
                                                                              onClick: ($event) => openColorOptions($event)
                                                                            }, [
                                                                              createVNode("path", {
                                                                                d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                                fill: unref(uniform).home.jersey
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                                fill: unref(uniform).home.jersey
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                                fill: unref(uniform).home.jersey
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                                fill: unref(uniform).home.jersey
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                                fill: unref(uniform).home.jersey
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                                fill: unref(uniform).home.jersey
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                                fill: unref(uniform).home.jersey
                                                                              }, null, 8, ["fill"])
                                                                            ], 8, ["onClick"])),
                                                                            createVNode("input", {
                                                                              type: "color",
                                                                              onBlur: nextStep,
                                                                              value: unref(uniform).home.jersey,
                                                                              onChange: ($event) => changeColor($event.target.value, "jersey", "home")
                                                                            }, null, 40, ["value", "onChange"])
                                                                          ])
                                                                        ];
                                                                      }
                                                                    }),
                                                                    _: 1
                                                                  }, _parent11, _scopeId10));
                                                                  _push11(ssrRenderComponent(VCol, { cols: "6" }, {
                                                                    default: withCtx((_11, _push12, _parent12, _scopeId11) => {
                                                                      if (_push12) {
                                                                        _push12(`<div class="d-flex flex-column justify-center align-center"${_scopeId11}><svg width="100" height="165" viewBox="0 0 105 90" xmlns="http://www.w3.org/2000/svg"${_scopeId11}><path d="M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z"${ssrRenderAttr("fill", unref(uniform).home.short)}${_scopeId11}></path><path d="M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z"${ssrRenderAttr("fill", unref(uniform).home.short)}${_scopeId11}></path><path d="M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z"${ssrRenderAttr("fill", unref(uniform).home.short)}${_scopeId11}></path><path d="M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z"${ssrRenderAttr("fill", unref(uniform).home.short)}${_scopeId11}></path></svg><input type="color"${ssrRenderAttr("value", unref(uniform).home.short)}${_scopeId11}></div>`);
                                                                      } else {
                                                                        return [
                                                                          createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                            (openBlock(), createBlock("svg", {
                                                                              width: "100",
                                                                              height: "165",
                                                                              viewBox: "0 0 105 90",
                                                                              xmlns: "http://www.w3.org/2000/svg",
                                                                              onClick: ($event) => openColorOptions($event)
                                                                            }, [
                                                                              createVNode("path", {
                                                                                d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                                fill: unref(uniform).home.short
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                                fill: unref(uniform).home.short
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                                fill: unref(uniform).home.short
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                                fill: unref(uniform).home.short
                                                                              }, null, 8, ["fill"])
                                                                            ], 8, ["onClick"])),
                                                                            createVNode("input", {
                                                                              type: "color",
                                                                              onBlur: nextStep,
                                                                              value: unref(uniform).home.short,
                                                                              onChange: ($event) => changeColor($event.target.value, "short", "home")
                                                                            }, null, 40, ["value", "onChange"])
                                                                          ])
                                                                        ];
                                                                      }
                                                                    }),
                                                                    _: 1
                                                                  }, _parent11, _scopeId10));
                                                                } else {
                                                                  return [
                                                                    createVNode(VCol, { cols: "6" }, {
                                                                      default: withCtx(() => [
                                                                        createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                          (openBlock(), createBlock("svg", {
                                                                            width: "100",
                                                                            height: "165",
                                                                            viewBox: "0 0 128 165",
                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                            onClick: ($event) => openColorOptions($event)
                                                                          }, [
                                                                            createVNode("path", {
                                                                              d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                              fill: unref(uniform).home.jersey
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                              fill: unref(uniform).home.jersey
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                              fill: unref(uniform).home.jersey
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                              fill: unref(uniform).home.jersey
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                              fill: unref(uniform).home.jersey
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                              fill: unref(uniform).home.jersey
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                              fill: unref(uniform).home.jersey
                                                                            }, null, 8, ["fill"])
                                                                          ], 8, ["onClick"])),
                                                                          createVNode("input", {
                                                                            type: "color",
                                                                            onBlur: nextStep,
                                                                            value: unref(uniform).home.jersey,
                                                                            onChange: ($event) => changeColor($event.target.value, "jersey", "home")
                                                                          }, null, 40, ["value", "onChange"])
                                                                        ])
                                                                      ]),
                                                                      _: 1
                                                                    }),
                                                                    createVNode(VCol, { cols: "6" }, {
                                                                      default: withCtx(() => [
                                                                        createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                          (openBlock(), createBlock("svg", {
                                                                            width: "100",
                                                                            height: "165",
                                                                            viewBox: "0 0 105 90",
                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                            onClick: ($event) => openColorOptions($event)
                                                                          }, [
                                                                            createVNode("path", {
                                                                              d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                              fill: unref(uniform).home.short
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                              fill: unref(uniform).home.short
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                              fill: unref(uniform).home.short
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                              fill: unref(uniform).home.short
                                                                            }, null, 8, ["fill"])
                                                                          ], 8, ["onClick"])),
                                                                          createVNode("input", {
                                                                            type: "color",
                                                                            onBlur: nextStep,
                                                                            value: unref(uniform).home.short,
                                                                            onChange: ($event) => changeColor($event.target.value, "short", "home")
                                                                          }, null, 40, ["value", "onChange"])
                                                                        ])
                                                                      ]),
                                                                      _: 1
                                                                    })
                                                                  ];
                                                                }
                                                              }),
                                                              _: 1
                                                            }, _parent10, _scopeId9));
                                                          } else {
                                                            return [
                                                              createVNode(VRow, null, {
                                                                default: withCtx(() => [
                                                                  createVNode(VCol, { cols: "6" }, {
                                                                    default: withCtx(() => [
                                                                      createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                        (openBlock(), createBlock("svg", {
                                                                          width: "100",
                                                                          height: "165",
                                                                          viewBox: "0 0 128 165",
                                                                          xmlns: "http://www.w3.org/2000/svg",
                                                                          onClick: ($event) => openColorOptions($event)
                                                                        }, [
                                                                          createVNode("path", {
                                                                            d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                            fill: unref(uniform).home.jersey
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                            fill: unref(uniform).home.jersey
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                            fill: unref(uniform).home.jersey
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                            fill: unref(uniform).home.jersey
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                            fill: unref(uniform).home.jersey
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                            fill: unref(uniform).home.jersey
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                            fill: unref(uniform).home.jersey
                                                                          }, null, 8, ["fill"])
                                                                        ], 8, ["onClick"])),
                                                                        createVNode("input", {
                                                                          type: "color",
                                                                          onBlur: nextStep,
                                                                          value: unref(uniform).home.jersey,
                                                                          onChange: ($event) => changeColor($event.target.value, "jersey", "home")
                                                                        }, null, 40, ["value", "onChange"])
                                                                      ])
                                                                    ]),
                                                                    _: 1
                                                                  }),
                                                                  createVNode(VCol, { cols: "6" }, {
                                                                    default: withCtx(() => [
                                                                      createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                        (openBlock(), createBlock("svg", {
                                                                          width: "100",
                                                                          height: "165",
                                                                          viewBox: "0 0 105 90",
                                                                          xmlns: "http://www.w3.org/2000/svg",
                                                                          onClick: ($event) => openColorOptions($event)
                                                                        }, [
                                                                          createVNode("path", {
                                                                            d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                            fill: unref(uniform).home.short
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                            fill: unref(uniform).home.short
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                            fill: unref(uniform).home.short
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                            fill: unref(uniform).home.short
                                                                          }, null, 8, ["fill"])
                                                                        ], 8, ["onClick"])),
                                                                        createVNode("input", {
                                                                          type: "color",
                                                                          onBlur: nextStep,
                                                                          value: unref(uniform).home.short,
                                                                          onChange: ($event) => changeColor($event.target.value, "short", "home")
                                                                        }, null, 40, ["value", "onChange"])
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
                                                      }, _parent9, _scopeId8));
                                                    } else {
                                                      return [
                                                        createVNode(VContainer, {
                                                          fluid: "",
                                                          class: "pa-0"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(VRow, null, {
                                                              default: withCtx(() => [
                                                                createVNode(VCol, { cols: "6" }, {
                                                                  default: withCtx(() => [
                                                                    createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                      (openBlock(), createBlock("svg", {
                                                                        width: "100",
                                                                        height: "165",
                                                                        viewBox: "0 0 128 165",
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        onClick: ($event) => openColorOptions($event)
                                                                      }, [
                                                                        createVNode("path", {
                                                                          d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                          fill: unref(uniform).home.jersey
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                          fill: unref(uniform).home.jersey
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                          fill: unref(uniform).home.jersey
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                          fill: unref(uniform).home.jersey
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                          fill: unref(uniform).home.jersey
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                          fill: unref(uniform).home.jersey
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                          fill: unref(uniform).home.jersey
                                                                        }, null, 8, ["fill"])
                                                                      ], 8, ["onClick"])),
                                                                      createVNode("input", {
                                                                        type: "color",
                                                                        onBlur: nextStep,
                                                                        value: unref(uniform).home.jersey,
                                                                        onChange: ($event) => changeColor($event.target.value, "jersey", "home")
                                                                      }, null, 40, ["value", "onChange"])
                                                                    ])
                                                                  ]),
                                                                  _: 1
                                                                }),
                                                                createVNode(VCol, { cols: "6" }, {
                                                                  default: withCtx(() => [
                                                                    createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                      (openBlock(), createBlock("svg", {
                                                                        width: "100",
                                                                        height: "165",
                                                                        viewBox: "0 0 105 90",
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        onClick: ($event) => openColorOptions($event)
                                                                      }, [
                                                                        createVNode("path", {
                                                                          d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                          fill: unref(uniform).home.short
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                          fill: unref(uniform).home.short
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                          fill: unref(uniform).home.short
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                          fill: unref(uniform).home.short
                                                                        }, null, 8, ["fill"])
                                                                      ], 8, ["onClick"])),
                                                                      createVNode("input", {
                                                                        type: "color",
                                                                        onBlur: nextStep,
                                                                        value: unref(uniform).home.short,
                                                                        onChange: ($event) => changeColor($event.target.value, "short", "home")
                                                                      }, null, 40, ["value", "onChange"])
                                                                    ])
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
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(VWindowItem, {
                                                  value: "away",
                                                  key: "away"
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(VContainer, { fluid: "" }, {
                                                        default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                          if (_push10) {
                                                            _push10(ssrRenderComponent(VRow, null, {
                                                              default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                if (_push11) {
                                                                  _push11(ssrRenderComponent(VCol, { cols: "6" }, {
                                                                    default: withCtx((_11, _push12, _parent12, _scopeId11) => {
                                                                      if (_push12) {
                                                                        _push12(`<div class="d-flex flex-column justify-center align-center"${_scopeId11}><svg width="100" height="165" viewBox="0 0 128 165" xmlns="http://www.w3.org/2000/svg"${_scopeId11}><path d="M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z"${ssrRenderAttr("fill", unref(uniform).away.jersey)}${_scopeId11}></path><path d="M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z"${ssrRenderAttr("fill", unref(uniform).away.jersey)}${_scopeId11}></path><path d="M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z"${ssrRenderAttr("fill", unref(uniform).away.jersey)}${_scopeId11}></path><path d="M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z"${ssrRenderAttr("fill", unref(uniform).away.jersey)}${_scopeId11}></path><path d="M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z"${ssrRenderAttr("fill", unref(uniform).away.jersey)}${_scopeId11}></path><path d="M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z"${ssrRenderAttr("fill", unref(uniform).away.jersey)}${_scopeId11}></path><path d="M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z"${ssrRenderAttr("fill", unref(uniform).away.jersey)}${_scopeId11}></path></svg><input type="color"${ssrRenderAttr("value", unref(uniform).away.jersey)}${_scopeId11}></div>`);
                                                                      } else {
                                                                        return [
                                                                          createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                            (openBlock(), createBlock("svg", {
                                                                              width: "100",
                                                                              height: "165",
                                                                              viewBox: "0 0 128 165",
                                                                              xmlns: "http://www.w3.org/2000/svg",
                                                                              onClick: ($event) => openColorOptions($event)
                                                                            }, [
                                                                              createVNode("path", {
                                                                                d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                                fill: unref(uniform).away.jersey
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                                fill: unref(uniform).away.jersey
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                                fill: unref(uniform).away.jersey
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                                fill: unref(uniform).away.jersey
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                                fill: unref(uniform).away.jersey
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                                fill: unref(uniform).away.jersey
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                                fill: unref(uniform).away.jersey
                                                                              }, null, 8, ["fill"])
                                                                            ], 8, ["onClick"])),
                                                                            createVNode("input", {
                                                                              type: "color",
                                                                              value: unref(uniform).away.jersey,
                                                                              onChange: ($event) => changeColor($event.target.value, "jersey", "away")
                                                                            }, null, 40, ["value", "onChange"])
                                                                          ])
                                                                        ];
                                                                      }
                                                                    }),
                                                                    _: 1
                                                                  }, _parent11, _scopeId10));
                                                                  _push11(ssrRenderComponent(VCol, { cols: "6" }, {
                                                                    default: withCtx((_11, _push12, _parent12, _scopeId11) => {
                                                                      if (_push12) {
                                                                        _push12(`<div class="d-flex flex-column justify-center align-center"${_scopeId11}><svg width="100" height="165" viewBox="0 0 105 90" xmlns="http://www.w3.org/2000/svg"${_scopeId11}><path d="M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z"${ssrRenderAttr("fill", unref(uniform).away.short)}${_scopeId11}></path><path d="M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z"${ssrRenderAttr("fill", unref(uniform).away.short)}${_scopeId11}></path><path d="M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z"${ssrRenderAttr("fill", unref(uniform).away.short)}${_scopeId11}></path><path d="M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z"${ssrRenderAttr("fill", unref(uniform).away.short)}${_scopeId11}></path></svg><input type="color"${ssrRenderAttr("value", unref(uniform).away.short)}${_scopeId11}></div>`);
                                                                      } else {
                                                                        return [
                                                                          createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                            (openBlock(), createBlock("svg", {
                                                                              width: "100",
                                                                              height: "165",
                                                                              viewBox: "0 0 105 90",
                                                                              xmlns: "http://www.w3.org/2000/svg",
                                                                              onClick: ($event) => openColorOptions($event)
                                                                            }, [
                                                                              createVNode("path", {
                                                                                d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                                fill: unref(uniform).away.short
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                                fill: unref(uniform).away.short
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                                fill: unref(uniform).away.short
                                                                              }, null, 8, ["fill"]),
                                                                              createVNode("path", {
                                                                                d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                                fill: unref(uniform).away.short
                                                                              }, null, 8, ["fill"])
                                                                            ], 8, ["onClick"])),
                                                                            createVNode("input", {
                                                                              type: "color",
                                                                              value: unref(uniform).away.short,
                                                                              onChange: ($event) => changeColor($event.target.value, "short", "away")
                                                                            }, null, 40, ["value", "onChange"])
                                                                          ])
                                                                        ];
                                                                      }
                                                                    }),
                                                                    _: 1
                                                                  }, _parent11, _scopeId10));
                                                                } else {
                                                                  return [
                                                                    createVNode(VCol, { cols: "6" }, {
                                                                      default: withCtx(() => [
                                                                        createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                          (openBlock(), createBlock("svg", {
                                                                            width: "100",
                                                                            height: "165",
                                                                            viewBox: "0 0 128 165",
                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                            onClick: ($event) => openColorOptions($event)
                                                                          }, [
                                                                            createVNode("path", {
                                                                              d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                              fill: unref(uniform).away.jersey
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                              fill: unref(uniform).away.jersey
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                              fill: unref(uniform).away.jersey
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                              fill: unref(uniform).away.jersey
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                              fill: unref(uniform).away.jersey
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                              fill: unref(uniform).away.jersey
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                              fill: unref(uniform).away.jersey
                                                                            }, null, 8, ["fill"])
                                                                          ], 8, ["onClick"])),
                                                                          createVNode("input", {
                                                                            type: "color",
                                                                            value: unref(uniform).away.jersey,
                                                                            onChange: ($event) => changeColor($event.target.value, "jersey", "away")
                                                                          }, null, 40, ["value", "onChange"])
                                                                        ])
                                                                      ]),
                                                                      _: 1
                                                                    }),
                                                                    createVNode(VCol, { cols: "6" }, {
                                                                      default: withCtx(() => [
                                                                        createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                          (openBlock(), createBlock("svg", {
                                                                            width: "100",
                                                                            height: "165",
                                                                            viewBox: "0 0 105 90",
                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                            onClick: ($event) => openColorOptions($event)
                                                                          }, [
                                                                            createVNode("path", {
                                                                              d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                              fill: unref(uniform).away.short
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                              fill: unref(uniform).away.short
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                              fill: unref(uniform).away.short
                                                                            }, null, 8, ["fill"]),
                                                                            createVNode("path", {
                                                                              d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                              fill: unref(uniform).away.short
                                                                            }, null, 8, ["fill"])
                                                                          ], 8, ["onClick"])),
                                                                          createVNode("input", {
                                                                            type: "color",
                                                                            value: unref(uniform).away.short,
                                                                            onChange: ($event) => changeColor($event.target.value, "short", "away")
                                                                          }, null, 40, ["value", "onChange"])
                                                                        ])
                                                                      ]),
                                                                      _: 1
                                                                    })
                                                                  ];
                                                                }
                                                              }),
                                                              _: 1
                                                            }, _parent10, _scopeId9));
                                                          } else {
                                                            return [
                                                              createVNode(VRow, null, {
                                                                default: withCtx(() => [
                                                                  createVNode(VCol, { cols: "6" }, {
                                                                    default: withCtx(() => [
                                                                      createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                        (openBlock(), createBlock("svg", {
                                                                          width: "100",
                                                                          height: "165",
                                                                          viewBox: "0 0 128 165",
                                                                          xmlns: "http://www.w3.org/2000/svg",
                                                                          onClick: ($event) => openColorOptions($event)
                                                                        }, [
                                                                          createVNode("path", {
                                                                            d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                            fill: unref(uniform).away.jersey
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                            fill: unref(uniform).away.jersey
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                            fill: unref(uniform).away.jersey
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                            fill: unref(uniform).away.jersey
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                            fill: unref(uniform).away.jersey
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                            fill: unref(uniform).away.jersey
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                            fill: unref(uniform).away.jersey
                                                                          }, null, 8, ["fill"])
                                                                        ], 8, ["onClick"])),
                                                                        createVNode("input", {
                                                                          type: "color",
                                                                          value: unref(uniform).away.jersey,
                                                                          onChange: ($event) => changeColor($event.target.value, "jersey", "away")
                                                                        }, null, 40, ["value", "onChange"])
                                                                      ])
                                                                    ]),
                                                                    _: 1
                                                                  }),
                                                                  createVNode(VCol, { cols: "6" }, {
                                                                    default: withCtx(() => [
                                                                      createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                        (openBlock(), createBlock("svg", {
                                                                          width: "100",
                                                                          height: "165",
                                                                          viewBox: "0 0 105 90",
                                                                          xmlns: "http://www.w3.org/2000/svg",
                                                                          onClick: ($event) => openColorOptions($event)
                                                                        }, [
                                                                          createVNode("path", {
                                                                            d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                            fill: unref(uniform).away.short
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                            fill: unref(uniform).away.short
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                            fill: unref(uniform).away.short
                                                                          }, null, 8, ["fill"]),
                                                                          createVNode("path", {
                                                                            d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                            fill: unref(uniform).away.short
                                                                          }, null, 8, ["fill"])
                                                                        ], 8, ["onClick"])),
                                                                        createVNode("input", {
                                                                          type: "color",
                                                                          value: unref(uniform).away.short,
                                                                          onChange: ($event) => changeColor($event.target.value, "short", "away")
                                                                        }, null, 40, ["value", "onChange"])
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
                                                      }, _parent9, _scopeId8));
                                                    } else {
                                                      return [
                                                        createVNode(VContainer, { fluid: "" }, {
                                                          default: withCtx(() => [
                                                            createVNode(VRow, null, {
                                                              default: withCtx(() => [
                                                                createVNode(VCol, { cols: "6" }, {
                                                                  default: withCtx(() => [
                                                                    createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                      (openBlock(), createBlock("svg", {
                                                                        width: "100",
                                                                        height: "165",
                                                                        viewBox: "0 0 128 165",
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        onClick: ($event) => openColorOptions($event)
                                                                      }, [
                                                                        createVNode("path", {
                                                                          d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                          fill: unref(uniform).away.jersey
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                          fill: unref(uniform).away.jersey
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                          fill: unref(uniform).away.jersey
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                          fill: unref(uniform).away.jersey
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                          fill: unref(uniform).away.jersey
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                          fill: unref(uniform).away.jersey
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                          fill: unref(uniform).away.jersey
                                                                        }, null, 8, ["fill"])
                                                                      ], 8, ["onClick"])),
                                                                      createVNode("input", {
                                                                        type: "color",
                                                                        value: unref(uniform).away.jersey,
                                                                        onChange: ($event) => changeColor($event.target.value, "jersey", "away")
                                                                      }, null, 40, ["value", "onChange"])
                                                                    ])
                                                                  ]),
                                                                  _: 1
                                                                }),
                                                                createVNode(VCol, { cols: "6" }, {
                                                                  default: withCtx(() => [
                                                                    createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                      (openBlock(), createBlock("svg", {
                                                                        width: "100",
                                                                        height: "165",
                                                                        viewBox: "0 0 105 90",
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        onClick: ($event) => openColorOptions($event)
                                                                      }, [
                                                                        createVNode("path", {
                                                                          d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                          fill: unref(uniform).away.short
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                          fill: unref(uniform).away.short
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                          fill: unref(uniform).away.short
                                                                        }, null, 8, ["fill"]),
                                                                        createVNode("path", {
                                                                          d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                          fill: unref(uniform).away.short
                                                                        }, null, 8, ["fill"])
                                                                      ], 8, ["onClick"])),
                                                                      createVNode("input", {
                                                                        type: "color",
                                                                        value: unref(uniform).away.short,
                                                                        onChange: ($event) => changeColor($event.target.value, "short", "away")
                                                                      }, null, 40, ["value", "onChange"])
                                                                    ])
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
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VWindowItem, {
                                                    value: "home",
                                                    key: "home"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VContainer, {
                                                        fluid: "",
                                                        class: "pa-0"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(VRow, null, {
                                                            default: withCtx(() => [
                                                              createVNode(VCol, { cols: "6" }, {
                                                                default: withCtx(() => [
                                                                  createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                    (openBlock(), createBlock("svg", {
                                                                      width: "100",
                                                                      height: "165",
                                                                      viewBox: "0 0 128 165",
                                                                      xmlns: "http://www.w3.org/2000/svg",
                                                                      onClick: ($event) => openColorOptions($event)
                                                                    }, [
                                                                      createVNode("path", {
                                                                        d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                        fill: unref(uniform).home.jersey
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                        fill: unref(uniform).home.jersey
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                        fill: unref(uniform).home.jersey
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                        fill: unref(uniform).home.jersey
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                        fill: unref(uniform).home.jersey
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                        fill: unref(uniform).home.jersey
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                        fill: unref(uniform).home.jersey
                                                                      }, null, 8, ["fill"])
                                                                    ], 8, ["onClick"])),
                                                                    createVNode("input", {
                                                                      type: "color",
                                                                      onBlur: nextStep,
                                                                      value: unref(uniform).home.jersey,
                                                                      onChange: ($event) => changeColor($event.target.value, "jersey", "home")
                                                                    }, null, 40, ["value", "onChange"])
                                                                  ])
                                                                ]),
                                                                _: 1
                                                              }),
                                                              createVNode(VCol, { cols: "6" }, {
                                                                default: withCtx(() => [
                                                                  createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                    (openBlock(), createBlock("svg", {
                                                                      width: "100",
                                                                      height: "165",
                                                                      viewBox: "0 0 105 90",
                                                                      xmlns: "http://www.w3.org/2000/svg",
                                                                      onClick: ($event) => openColorOptions($event)
                                                                    }, [
                                                                      createVNode("path", {
                                                                        d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                        fill: unref(uniform).home.short
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                        fill: unref(uniform).home.short
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                        fill: unref(uniform).home.short
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                        fill: unref(uniform).home.short
                                                                      }, null, 8, ["fill"])
                                                                    ], 8, ["onClick"])),
                                                                    createVNode("input", {
                                                                      type: "color",
                                                                      onBlur: nextStep,
                                                                      value: unref(uniform).home.short,
                                                                      onChange: ($event) => changeColor($event.target.value, "short", "home")
                                                                    }, null, 40, ["value", "onChange"])
                                                                  ])
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
                                                  }),
                                                  createVNode(VWindowItem, {
                                                    value: "away",
                                                    key: "away"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VContainer, { fluid: "" }, {
                                                        default: withCtx(() => [
                                                          createVNode(VRow, null, {
                                                            default: withCtx(() => [
                                                              createVNode(VCol, { cols: "6" }, {
                                                                default: withCtx(() => [
                                                                  createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                    (openBlock(), createBlock("svg", {
                                                                      width: "100",
                                                                      height: "165",
                                                                      viewBox: "0 0 128 165",
                                                                      xmlns: "http://www.w3.org/2000/svg",
                                                                      onClick: ($event) => openColorOptions($event)
                                                                    }, [
                                                                      createVNode("path", {
                                                                        d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                        fill: unref(uniform).away.jersey
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                        fill: unref(uniform).away.jersey
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                        fill: unref(uniform).away.jersey
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                        fill: unref(uniform).away.jersey
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                        fill: unref(uniform).away.jersey
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                        fill: unref(uniform).away.jersey
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                        fill: unref(uniform).away.jersey
                                                                      }, null, 8, ["fill"])
                                                                    ], 8, ["onClick"])),
                                                                    createVNode("input", {
                                                                      type: "color",
                                                                      value: unref(uniform).away.jersey,
                                                                      onChange: ($event) => changeColor($event.target.value, "jersey", "away")
                                                                    }, null, 40, ["value", "onChange"])
                                                                  ])
                                                                ]),
                                                                _: 1
                                                              }),
                                                              createVNode(VCol, { cols: "6" }, {
                                                                default: withCtx(() => [
                                                                  createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                    (openBlock(), createBlock("svg", {
                                                                      width: "100",
                                                                      height: "165",
                                                                      viewBox: "0 0 105 90",
                                                                      xmlns: "http://www.w3.org/2000/svg",
                                                                      onClick: ($event) => openColorOptions($event)
                                                                    }, [
                                                                      createVNode("path", {
                                                                        d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                        fill: unref(uniform).away.short
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                        fill: unref(uniform).away.short
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                        fill: unref(uniform).away.short
                                                                      }, null, 8, ["fill"]),
                                                                      createVNode("path", {
                                                                        d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                        fill: unref(uniform).away.short
                                                                      }, null, 8, ["fill"])
                                                                    ], 8, ["onClick"])),
                                                                    createVNode("input", {
                                                                      type: "color",
                                                                      value: unref(uniform).away.short,
                                                                      onChange: ($event) => changeColor($event.target.value, "short", "away")
                                                                    }, null, 40, ["value", "onChange"])
                                                                  ])
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
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTabs, {
                                              modelValue: unref(tab),
                                              "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                                              "fixed-tabs": ""
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VTab, { value: "home" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Local")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(VTab, { value: "away" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("visitante")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                                            createVNode(VWindow, {
                                              modelValue: unref(tab),
                                              "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VWindowItem, {
                                                  value: "home",
                                                  key: "home"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VContainer, {
                                                      fluid: "",
                                                      class: "pa-0"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(VRow, null, {
                                                          default: withCtx(() => [
                                                            createVNode(VCol, { cols: "6" }, {
                                                              default: withCtx(() => [
                                                                createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                  (openBlock(), createBlock("svg", {
                                                                    width: "100",
                                                                    height: "165",
                                                                    viewBox: "0 0 128 165",
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    onClick: ($event) => openColorOptions($event)
                                                                  }, [
                                                                    createVNode("path", {
                                                                      d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                      fill: unref(uniform).home.jersey
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                      fill: unref(uniform).home.jersey
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                      fill: unref(uniform).home.jersey
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                      fill: unref(uniform).home.jersey
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                      fill: unref(uniform).home.jersey
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                      fill: unref(uniform).home.jersey
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                      fill: unref(uniform).home.jersey
                                                                    }, null, 8, ["fill"])
                                                                  ], 8, ["onClick"])),
                                                                  createVNode("input", {
                                                                    type: "color",
                                                                    onBlur: nextStep,
                                                                    value: unref(uniform).home.jersey,
                                                                    onChange: ($event) => changeColor($event.target.value, "jersey", "home")
                                                                  }, null, 40, ["value", "onChange"])
                                                                ])
                                                              ]),
                                                              _: 1
                                                            }),
                                                            createVNode(VCol, { cols: "6" }, {
                                                              default: withCtx(() => [
                                                                createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                  (openBlock(), createBlock("svg", {
                                                                    width: "100",
                                                                    height: "165",
                                                                    viewBox: "0 0 105 90",
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    onClick: ($event) => openColorOptions($event)
                                                                  }, [
                                                                    createVNode("path", {
                                                                      d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                      fill: unref(uniform).home.short
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                      fill: unref(uniform).home.short
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                      fill: unref(uniform).home.short
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                      fill: unref(uniform).home.short
                                                                    }, null, 8, ["fill"])
                                                                  ], 8, ["onClick"])),
                                                                  createVNode("input", {
                                                                    type: "color",
                                                                    onBlur: nextStep,
                                                                    value: unref(uniform).home.short,
                                                                    onChange: ($event) => changeColor($event.target.value, "short", "home")
                                                                  }, null, 40, ["value", "onChange"])
                                                                ])
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
                                                }),
                                                createVNode(VWindowItem, {
                                                  value: "away",
                                                  key: "away"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VContainer, { fluid: "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(VRow, null, {
                                                          default: withCtx(() => [
                                                            createVNode(VCol, { cols: "6" }, {
                                                              default: withCtx(() => [
                                                                createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                  (openBlock(), createBlock("svg", {
                                                                    width: "100",
                                                                    height: "165",
                                                                    viewBox: "0 0 128 165",
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    onClick: ($event) => openColorOptions($event)
                                                                  }, [
                                                                    createVNode("path", {
                                                                      d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                      fill: unref(uniform).away.jersey
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                      fill: unref(uniform).away.jersey
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                      fill: unref(uniform).away.jersey
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                      fill: unref(uniform).away.jersey
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                      fill: unref(uniform).away.jersey
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                      fill: unref(uniform).away.jersey
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                      fill: unref(uniform).away.jersey
                                                                    }, null, 8, ["fill"])
                                                                  ], 8, ["onClick"])),
                                                                  createVNode("input", {
                                                                    type: "color",
                                                                    value: unref(uniform).away.jersey,
                                                                    onChange: ($event) => changeColor($event.target.value, "jersey", "away")
                                                                  }, null, 40, ["value", "onChange"])
                                                                ])
                                                              ]),
                                                              _: 1
                                                            }),
                                                            createVNode(VCol, { cols: "6" }, {
                                                              default: withCtx(() => [
                                                                createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                  (openBlock(), createBlock("svg", {
                                                                    width: "100",
                                                                    height: "165",
                                                                    viewBox: "0 0 105 90",
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    onClick: ($event) => openColorOptions($event)
                                                                  }, [
                                                                    createVNode("path", {
                                                                      d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                      fill: unref(uniform).away.short
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                      fill: unref(uniform).away.short
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                      fill: unref(uniform).away.short
                                                                    }, null, 8, ["fill"]),
                                                                    createVNode("path", {
                                                                      d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                      fill: unref(uniform).away.short
                                                                    }, null, 8, ["fill"])
                                                                  ], 8, ["onClick"])),
                                                                  createVNode("input", {
                                                                    type: "color",
                                                                    value: unref(uniform).away.short,
                                                                    onChange: ($event) => changeColor($event.target.value, "short", "away")
                                                                  }, null, 40, ["value", "onChange"])
                                                                ])
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
                                              ]),
                                              _: 1
                                            }, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => [
                                          createVNode(VTabs, {
                                            modelValue: unref(tab),
                                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                                            "fixed-tabs": ""
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VTab, { value: "home" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Local")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VTab, { value: "away" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("visitante")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                                          createVNode(VWindow, {
                                            modelValue: unref(tab),
                                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VWindowItem, {
                                                value: "home",
                                                key: "home"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VContainer, {
                                                    fluid: "",
                                                    class: "pa-0"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VRow, null, {
                                                        default: withCtx(() => [
                                                          createVNode(VCol, { cols: "6" }, {
                                                            default: withCtx(() => [
                                                              createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                (openBlock(), createBlock("svg", {
                                                                  width: "100",
                                                                  height: "165",
                                                                  viewBox: "0 0 128 165",
                                                                  xmlns: "http://www.w3.org/2000/svg",
                                                                  onClick: ($event) => openColorOptions($event)
                                                                }, [
                                                                  createVNode("path", {
                                                                    d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                    fill: unref(uniform).home.jersey
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                    fill: unref(uniform).home.jersey
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                    fill: unref(uniform).home.jersey
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                    fill: unref(uniform).home.jersey
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                    fill: unref(uniform).home.jersey
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                    fill: unref(uniform).home.jersey
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                    fill: unref(uniform).home.jersey
                                                                  }, null, 8, ["fill"])
                                                                ], 8, ["onClick"])),
                                                                createVNode("input", {
                                                                  type: "color",
                                                                  onBlur: nextStep,
                                                                  value: unref(uniform).home.jersey,
                                                                  onChange: ($event) => changeColor($event.target.value, "jersey", "home")
                                                                }, null, 40, ["value", "onChange"])
                                                              ])
                                                            ]),
                                                            _: 1
                                                          }),
                                                          createVNode(VCol, { cols: "6" }, {
                                                            default: withCtx(() => [
                                                              createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                (openBlock(), createBlock("svg", {
                                                                  width: "100",
                                                                  height: "165",
                                                                  viewBox: "0 0 105 90",
                                                                  xmlns: "http://www.w3.org/2000/svg",
                                                                  onClick: ($event) => openColorOptions($event)
                                                                }, [
                                                                  createVNode("path", {
                                                                    d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                    fill: unref(uniform).home.short
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                    fill: unref(uniform).home.short
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                    fill: unref(uniform).home.short
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                    fill: unref(uniform).home.short
                                                                  }, null, 8, ["fill"])
                                                                ], 8, ["onClick"])),
                                                                createVNode("input", {
                                                                  type: "color",
                                                                  onBlur: nextStep,
                                                                  value: unref(uniform).home.short,
                                                                  onChange: ($event) => changeColor($event.target.value, "short", "home")
                                                                }, null, 40, ["value", "onChange"])
                                                              ])
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
                                              }),
                                              createVNode(VWindowItem, {
                                                value: "away",
                                                key: "away"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VContainer, { fluid: "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(VRow, null, {
                                                        default: withCtx(() => [
                                                          createVNode(VCol, { cols: "6" }, {
                                                            default: withCtx(() => [
                                                              createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                (openBlock(), createBlock("svg", {
                                                                  width: "100",
                                                                  height: "165",
                                                                  viewBox: "0 0 128 165",
                                                                  xmlns: "http://www.w3.org/2000/svg",
                                                                  onClick: ($event) => openColorOptions($event)
                                                                }, [
                                                                  createVNode("path", {
                                                                    d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                    fill: unref(uniform).away.jersey
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                    fill: unref(uniform).away.jersey
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                    fill: unref(uniform).away.jersey
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                    fill: unref(uniform).away.jersey
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                    fill: unref(uniform).away.jersey
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                    fill: unref(uniform).away.jersey
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                    fill: unref(uniform).away.jersey
                                                                  }, null, 8, ["fill"])
                                                                ], 8, ["onClick"])),
                                                                createVNode("input", {
                                                                  type: "color",
                                                                  value: unref(uniform).away.jersey,
                                                                  onChange: ($event) => changeColor($event.target.value, "jersey", "away")
                                                                }, null, 40, ["value", "onChange"])
                                                              ])
                                                            ]),
                                                            _: 1
                                                          }),
                                                          createVNode(VCol, { cols: "6" }, {
                                                            default: withCtx(() => [
                                                              createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                                (openBlock(), createBlock("svg", {
                                                                  width: "100",
                                                                  height: "165",
                                                                  viewBox: "0 0 105 90",
                                                                  xmlns: "http://www.w3.org/2000/svg",
                                                                  onClick: ($event) => openColorOptions($event)
                                                                }, [
                                                                  createVNode("path", {
                                                                    d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                    fill: unref(uniform).away.short
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                    fill: unref(uniform).away.short
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                    fill: unref(uniform).away.short
                                                                  }, null, 8, ["fill"]),
                                                                  createVNode("path", {
                                                                    d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                    fill: unref(uniform).away.short
                                                                  }, null, 8, ["fill"])
                                                                ], 8, ["onClick"])),
                                                                createVNode("input", {
                                                                  type: "color",
                                                                  value: unref(uniform).away.short,
                                                                  onChange: ($event) => changeColor($event.target.value, "short", "away")
                                                                }, null, 40, ["value", "onChange"])
                                                              ])
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCard, {
                                  variant: "text",
                                  border: _ctx.$vuetify.display.mobile
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => [
                                        createVNode(VTabs, {
                                          modelValue: unref(tab),
                                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                                          "fixed-tabs": ""
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTab, { value: "home" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Local")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VTab, { value: "away" }, {
                                              default: withCtx(() => [
                                                createTextVNode("visitante")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(VWindow, {
                                          modelValue: unref(tab),
                                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VWindowItem, {
                                              value: "home",
                                              key: "home"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VContainer, {
                                                  fluid: "",
                                                  class: "pa-0"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VRow, null, {
                                                      default: withCtx(() => [
                                                        createVNode(VCol, { cols: "6" }, {
                                                          default: withCtx(() => [
                                                            createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                              (openBlock(), createBlock("svg", {
                                                                width: "100",
                                                                height: "165",
                                                                viewBox: "0 0 128 165",
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                onClick: ($event) => openColorOptions($event)
                                                              }, [
                                                                createVNode("path", {
                                                                  d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                  fill: unref(uniform).home.jersey
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                  fill: unref(uniform).home.jersey
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                  fill: unref(uniform).home.jersey
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                  fill: unref(uniform).home.jersey
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                  fill: unref(uniform).home.jersey
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                  fill: unref(uniform).home.jersey
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                  fill: unref(uniform).home.jersey
                                                                }, null, 8, ["fill"])
                                                              ], 8, ["onClick"])),
                                                              createVNode("input", {
                                                                type: "color",
                                                                onBlur: nextStep,
                                                                value: unref(uniform).home.jersey,
                                                                onChange: ($event) => changeColor($event.target.value, "jersey", "home")
                                                              }, null, 40, ["value", "onChange"])
                                                            ])
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode(VCol, { cols: "6" }, {
                                                          default: withCtx(() => [
                                                            createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                              (openBlock(), createBlock("svg", {
                                                                width: "100",
                                                                height: "165",
                                                                viewBox: "0 0 105 90",
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                onClick: ($event) => openColorOptions($event)
                                                              }, [
                                                                createVNode("path", {
                                                                  d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                  fill: unref(uniform).home.short
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                  fill: unref(uniform).home.short
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                  fill: unref(uniform).home.short
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                  fill: unref(uniform).home.short
                                                                }, null, 8, ["fill"])
                                                              ], 8, ["onClick"])),
                                                              createVNode("input", {
                                                                type: "color",
                                                                onBlur: nextStep,
                                                                value: unref(uniform).home.short,
                                                                onChange: ($event) => changeColor($event.target.value, "short", "home")
                                                              }, null, 40, ["value", "onChange"])
                                                            ])
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
                                            }),
                                            createVNode(VWindowItem, {
                                              value: "away",
                                              key: "away"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VContainer, { fluid: "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(VRow, null, {
                                                      default: withCtx(() => [
                                                        createVNode(VCol, { cols: "6" }, {
                                                          default: withCtx(() => [
                                                            createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                              (openBlock(), createBlock("svg", {
                                                                width: "100",
                                                                height: "165",
                                                                viewBox: "0 0 128 165",
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                onClick: ($event) => openColorOptions($event)
                                                              }, [
                                                                createVNode("path", {
                                                                  d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                  fill: unref(uniform).away.jersey
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                  fill: unref(uniform).away.jersey
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                  fill: unref(uniform).away.jersey
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                  fill: unref(uniform).away.jersey
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                  fill: unref(uniform).away.jersey
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                  fill: unref(uniform).away.jersey
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                  fill: unref(uniform).away.jersey
                                                                }, null, 8, ["fill"])
                                                              ], 8, ["onClick"])),
                                                              createVNode("input", {
                                                                type: "color",
                                                                value: unref(uniform).away.jersey,
                                                                onChange: ($event) => changeColor($event.target.value, "jersey", "away")
                                                              }, null, 40, ["value", "onChange"])
                                                            ])
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode(VCol, { cols: "6" }, {
                                                          default: withCtx(() => [
                                                            createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                              (openBlock(), createBlock("svg", {
                                                                width: "100",
                                                                height: "165",
                                                                viewBox: "0 0 105 90",
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                onClick: ($event) => openColorOptions($event)
                                                              }, [
                                                                createVNode("path", {
                                                                  d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                  fill: unref(uniform).away.short
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                  fill: unref(uniform).away.short
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                  fill: unref(uniform).away.short
                                                                }, null, 8, ["fill"]),
                                                                createVNode("path", {
                                                                  d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                  fill: unref(uniform).away.short
                                                                }, null, 8, ["fill"])
                                                              ], 8, ["onClick"])),
                                                              createVNode("input", {
                                                                type: "color",
                                                                value: unref(uniform).away.short,
                                                                onChange: ($event) => changeColor($event.target.value, "short", "away")
                                                              }, null, 40, ["value", "onChange"])
                                                            ])
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
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["border"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, mergeProps({
                                modelValue: unref(fields).president_name.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).president_name.fieldValue = $event
                              }, unref(fields).president_name.fieldPropsValue, {
                                onBlur: nextStep,
                                label: "Delegado/Presidente"
                              }), null, 16, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, mergeProps({
                                modelValue: unref(fields).coach_name.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).coach_name.fieldValue = $event
                              }, unref(fields).coach_name.fieldPropsValue, {
                                onBlur: nextStep,
                                label: "DT/Entrenador"
                              }), null, 16, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, mergeProps({
                                modelValue: unref(fields).phone.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event
                              }, unref(fields).phone.fieldPropsValue, {
                                onKeydown: ($event) => {
                                  var _a;
                                  return unref(fields).phone.fieldValue = (_a = $event.target.value) == null ? void 0 : _a.replace(/[^0-9]/g, "");
                                },
                                onBlur: nextStep,
                                label: "Telefono"
                              }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, mergeProps({
                                modelValue: unref(fields).email.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                              }, unref(fields).email.fieldPropsValue, {
                                onBlur: nextStep,
                                label: "Correo"
                              }), null, 16, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, mergeProps({
                                modelValue: unref(fields).address.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                              }, unref(fields).address.fieldPropsValue, {
                                label: "Direccion",
                                onBlur: nextStep
                              }), null, 16, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(VFileInput, mergeProps({
                                class: "mt-6",
                                modelValue: unref(fields).image.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).image.fieldValue = $event
                              }, unref(fields).image.fieldPropsValue, {
                                onBlur: nextStep,
                                label: "Escudo"
                              }), null, 16, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "6",
                            class: "flex-0-0"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCard, {
                                variant: "text",
                                border: _ctx.$vuetify.display.mobile
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createVNode(VTabs, {
                                        modelValue: unref(tab),
                                        "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                                        "fixed-tabs": ""
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTab, { value: "home" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Local")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VTab, { value: "away" }, {
                                            default: withCtx(() => [
                                              createTextVNode("visitante")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(VWindow, {
                                        modelValue: unref(tab),
                                        "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VWindowItem, {
                                            value: "home",
                                            key: "home"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VContainer, {
                                                fluid: "",
                                                class: "pa-0"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VRow, null, {
                                                    default: withCtx(() => [
                                                      createVNode(VCol, { cols: "6" }, {
                                                        default: withCtx(() => [
                                                          createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                            (openBlock(), createBlock("svg", {
                                                              width: "100",
                                                              height: "165",
                                                              viewBox: "0 0 128 165",
                                                              xmlns: "http://www.w3.org/2000/svg",
                                                              onClick: ($event) => openColorOptions($event)
                                                            }, [
                                                              createVNode("path", {
                                                                d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                fill: unref(uniform).home.jersey
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                fill: unref(uniform).home.jersey
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                fill: unref(uniform).home.jersey
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                fill: unref(uniform).home.jersey
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                fill: unref(uniform).home.jersey
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                fill: unref(uniform).home.jersey
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                fill: unref(uniform).home.jersey
                                                              }, null, 8, ["fill"])
                                                            ], 8, ["onClick"])),
                                                            createVNode("input", {
                                                              type: "color",
                                                              onBlur: nextStep,
                                                              value: unref(uniform).home.jersey,
                                                              onChange: ($event) => changeColor($event.target.value, "jersey", "home")
                                                            }, null, 40, ["value", "onChange"])
                                                          ])
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode(VCol, { cols: "6" }, {
                                                        default: withCtx(() => [
                                                          createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                            (openBlock(), createBlock("svg", {
                                                              width: "100",
                                                              height: "165",
                                                              viewBox: "0 0 105 90",
                                                              xmlns: "http://www.w3.org/2000/svg",
                                                              onClick: ($event) => openColorOptions($event)
                                                            }, [
                                                              createVNode("path", {
                                                                d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                fill: unref(uniform).home.short
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                fill: unref(uniform).home.short
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                fill: unref(uniform).home.short
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                fill: unref(uniform).home.short
                                                              }, null, 8, ["fill"])
                                                            ], 8, ["onClick"])),
                                                            createVNode("input", {
                                                              type: "color",
                                                              onBlur: nextStep,
                                                              value: unref(uniform).home.short,
                                                              onChange: ($event) => changeColor($event.target.value, "short", "home")
                                                            }, null, 40, ["value", "onChange"])
                                                          ])
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
                                          }),
                                          createVNode(VWindowItem, {
                                            value: "away",
                                            key: "away"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VContainer, { fluid: "" }, {
                                                default: withCtx(() => [
                                                  createVNode(VRow, null, {
                                                    default: withCtx(() => [
                                                      createVNode(VCol, { cols: "6" }, {
                                                        default: withCtx(() => [
                                                          createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                            (openBlock(), createBlock("svg", {
                                                              width: "100",
                                                              height: "165",
                                                              viewBox: "0 0 128 165",
                                                              xmlns: "http://www.w3.org/2000/svg",
                                                              onClick: ($event) => openColorOptions($event)
                                                            }, [
                                                              createVNode("path", {
                                                                d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                                fill: unref(uniform).away.jersey
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                                fill: unref(uniform).away.jersey
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                                fill: unref(uniform).away.jersey
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                                fill: unref(uniform).away.jersey
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                                fill: unref(uniform).away.jersey
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                                fill: unref(uniform).away.jersey
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                                fill: unref(uniform).away.jersey
                                                              }, null, 8, ["fill"])
                                                            ], 8, ["onClick"])),
                                                            createVNode("input", {
                                                              type: "color",
                                                              value: unref(uniform).away.jersey,
                                                              onChange: ($event) => changeColor($event.target.value, "jersey", "away")
                                                            }, null, 40, ["value", "onChange"])
                                                          ])
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode(VCol, { cols: "6" }, {
                                                        default: withCtx(() => [
                                                          createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                            (openBlock(), createBlock("svg", {
                                                              width: "100",
                                                              height: "165",
                                                              viewBox: "0 0 105 90",
                                                              xmlns: "http://www.w3.org/2000/svg",
                                                              onClick: ($event) => openColorOptions($event)
                                                            }, [
                                                              createVNode("path", {
                                                                d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                                fill: unref(uniform).away.short
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                                fill: unref(uniform).away.short
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                                fill: unref(uniform).away.short
                                                              }, null, 8, ["fill"]),
                                                              createVNode("path", {
                                                                d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                                fill: unref(uniform).away.short
                                                              }, null, 8, ["fill"])
                                                            ], 8, ["onClick"])),
                                                            createVNode("input", {
                                                              type: "color",
                                                              value: unref(uniform).away.short,
                                                              onChange: ($event) => changeColor($event.target.value, "short", "away")
                                                            }, null, 40, ["value", "onChange"])
                                                          ])
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
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["border"])
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
                        _push4(ssrRenderComponent(VCol, { cols: "12" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, {
                                onClick: unref(createTeam),
                                block: "",
                                size: "50"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Inscribir `);
                                  } else {
                                    return [
                                      createTextVNode(" Inscribir ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, {
                                  onClick: unref(createTeam),
                                  block: "",
                                  size: "50"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Inscribir ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                onClick: unref(createTeam),
                                block: "",
                                size: "50"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Inscribir ")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "12" }, {
                          default: withCtx(() => [
                            createVNode("h1", { class: "text-h5 text-lg-h4 text-md-4" }, "Incripcion de equipo")
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
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(VTextField, mergeProps({
                              variant: "outlined",
                              label: "Nombre del equipo",
                              modelValue: unref(fields).name.fieldValue,
                              "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                            }, unref(fields).name.fieldPropsValue, { onBlur: nextStep }), null, 16, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(VSelect, mergeProps({
                              modelValue: unref(fields).tournament_id.fieldValue,
                              "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                            }, unref(fields).tournament_id.fieldPropsValue, {
                              "item-value": "id",
                              "item-title": "name",
                              "onUpdate:modelValue": nextStep,
                              items: unref(tournaments),
                              label: "Torneo",
                              variant: "outlined"
                            }), null, 16, ["modelValue", "onUpdate:modelValue", "items"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(VSelect, mergeProps({
                              modelValue: unref(fields).category_id.fieldValue,
                              "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event
                            }, unref(fields).category_id.fieldPropsValue, {
                              "onUpdate:modelValue": nextStep,
                              items: unref(categories),
                              "item-value": "id",
                              "item-title": "name",
                              variant: "outlined",
                              label: "Categoria"
                            }), null, 16, ["modelValue", "onUpdate:modelValue", "items"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(VSelect, mergeProps({
                              modelValue: unref(fields).location_id.fieldValue,
                              "onUpdate:modelValue": ($event) => unref(fields).location_id.fieldValue = $event
                            }, unref(fields).location_id.fieldPropsValue, {
                              "onUpdate:modelValue": nextStep,
                              items: unref(locations),
                              "item-value": "id",
                              "item-title": "name",
                              variant: "outlined",
                              label: "Cancha de juego"
                            }), null, 16, ["modelValue", "onUpdate:modelValue", "items"]),
                            createTextVNode(),
                            createVNode(_sfc_main$1)
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
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(VTextField, mergeProps({
                              modelValue: unref(fields).president_name.fieldValue,
                              "onUpdate:modelValue": ($event) => unref(fields).president_name.fieldValue = $event
                            }, unref(fields).president_name.fieldPropsValue, {
                              onBlur: nextStep,
                              label: "Delegado/Presidente"
                            }), null, 16, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(VTextField, mergeProps({
                              modelValue: unref(fields).coach_name.fieldValue,
                              "onUpdate:modelValue": ($event) => unref(fields).coach_name.fieldValue = $event
                            }, unref(fields).coach_name.fieldPropsValue, {
                              onBlur: nextStep,
                              label: "DT/Entrenador"
                            }), null, 16, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(VTextField, mergeProps({
                              modelValue: unref(fields).phone.fieldValue,
                              "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event
                            }, unref(fields).phone.fieldPropsValue, {
                              onKeydown: ($event) => {
                                var _a;
                                return unref(fields).phone.fieldValue = (_a = $event.target.value) == null ? void 0 : _a.replace(/[^0-9]/g, "");
                              },
                              onBlur: nextStep,
                              label: "Telefono"
                            }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(VTextField, mergeProps({
                              modelValue: unref(fields).email.fieldValue,
                              "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                            }, unref(fields).email.fieldPropsValue, {
                              onBlur: nextStep,
                              label: "Correo"
                            }), null, 16, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(VTextField, mergeProps({
                              modelValue: unref(fields).address.fieldValue,
                              "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                            }, unref(fields).address.fieldPropsValue, {
                              label: "Direccion",
                              onBlur: nextStep
                            }), null, 16, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(VFileInput, mergeProps({
                              class: "mt-6",
                              modelValue: unref(fields).image.fieldValue,
                              "onUpdate:modelValue": ($event) => unref(fields).image.fieldValue = $event
                            }, unref(fields).image.fieldPropsValue, {
                              onBlur: nextStep,
                              label: "Escudo"
                            }), null, 16, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6",
                          class: "flex-0-0"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCard, {
                              variant: "text",
                              border: _ctx.$vuetify.display.mobile
                            }, {
                              default: withCtx(() => [
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createVNode(VTabs, {
                                      modelValue: unref(tab),
                                      "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                                      "fixed-tabs": ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTab, { value: "home" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Local")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VTab, { value: "away" }, {
                                          default: withCtx(() => [
                                            createTextVNode("visitante")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode(VWindow, {
                                      modelValue: unref(tab),
                                      "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VWindowItem, {
                                          value: "home",
                                          key: "home"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VContainer, {
                                              fluid: "",
                                              class: "pa-0"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VRow, null, {
                                                  default: withCtx(() => [
                                                    createVNode(VCol, { cols: "6" }, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                          (openBlock(), createBlock("svg", {
                                                            width: "100",
                                                            height: "165",
                                                            viewBox: "0 0 128 165",
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            onClick: ($event) => openColorOptions($event)
                                                          }, [
                                                            createVNode("path", {
                                                              d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                              fill: unref(uniform).home.jersey
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                              fill: unref(uniform).home.jersey
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                              fill: unref(uniform).home.jersey
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                              fill: unref(uniform).home.jersey
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                              fill: unref(uniform).home.jersey
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                              fill: unref(uniform).home.jersey
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                              fill: unref(uniform).home.jersey
                                                            }, null, 8, ["fill"])
                                                          ], 8, ["onClick"])),
                                                          createVNode("input", {
                                                            type: "color",
                                                            onBlur: nextStep,
                                                            value: unref(uniform).home.jersey,
                                                            onChange: ($event) => changeColor($event.target.value, "jersey", "home")
                                                          }, null, 40, ["value", "onChange"])
                                                        ])
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(VCol, { cols: "6" }, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                          (openBlock(), createBlock("svg", {
                                                            width: "100",
                                                            height: "165",
                                                            viewBox: "0 0 105 90",
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            onClick: ($event) => openColorOptions($event)
                                                          }, [
                                                            createVNode("path", {
                                                              d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                              fill: unref(uniform).home.short
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                              fill: unref(uniform).home.short
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                              fill: unref(uniform).home.short
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                              fill: unref(uniform).home.short
                                                            }, null, 8, ["fill"])
                                                          ], 8, ["onClick"])),
                                                          createVNode("input", {
                                                            type: "color",
                                                            onBlur: nextStep,
                                                            value: unref(uniform).home.short,
                                                            onChange: ($event) => changeColor($event.target.value, "short", "home")
                                                          }, null, 40, ["value", "onChange"])
                                                        ])
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
                                        }),
                                        createVNode(VWindowItem, {
                                          value: "away",
                                          key: "away"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VContainer, { fluid: "" }, {
                                              default: withCtx(() => [
                                                createVNode(VRow, null, {
                                                  default: withCtx(() => [
                                                    createVNode(VCol, { cols: "6" }, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                          (openBlock(), createBlock("svg", {
                                                            width: "100",
                                                            height: "165",
                                                            viewBox: "0 0 128 165",
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            onClick: ($event) => openColorOptions($event)
                                                          }, [
                                                            createVNode("path", {
                                                              d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                              fill: unref(uniform).away.jersey
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                              fill: unref(uniform).away.jersey
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                              fill: unref(uniform).away.jersey
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                              fill: unref(uniform).away.jersey
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                              fill: unref(uniform).away.jersey
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                              fill: unref(uniform).away.jersey
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                              fill: unref(uniform).away.jersey
                                                            }, null, 8, ["fill"])
                                                          ], 8, ["onClick"])),
                                                          createVNode("input", {
                                                            type: "color",
                                                            value: unref(uniform).away.jersey,
                                                            onChange: ($event) => changeColor($event.target.value, "jersey", "away")
                                                          }, null, 40, ["value", "onChange"])
                                                        ])
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(VCol, { cols: "6" }, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                          (openBlock(), createBlock("svg", {
                                                            width: "100",
                                                            height: "165",
                                                            viewBox: "0 0 105 90",
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            onClick: ($event) => openColorOptions($event)
                                                          }, [
                                                            createVNode("path", {
                                                              d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                              fill: unref(uniform).away.short
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                              fill: unref(uniform).away.short
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                              fill: unref(uniform).away.short
                                                            }, null, 8, ["fill"]),
                                                            createVNode("path", {
                                                              d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                              fill: unref(uniform).away.short
                                                            }, null, 8, ["fill"])
                                                          ], 8, ["onClick"])),
                                                          createVNode("input", {
                                                            type: "color",
                                                            value: unref(uniform).away.short,
                                                            onChange: ($event) => changeColor($event.target.value, "short", "away")
                                                          }, null, 40, ["value", "onChange"])
                                                        ])
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
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["border"])
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
                            createVNode(VBtn, {
                              onClick: unref(createTeam),
                              block: "",
                              size: "50"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Inscribir ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
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
                      createVNode(VCol, { cols: "12" }, {
                        default: withCtx(() => [
                          createVNode("h1", { class: "text-h5 text-lg-h4 text-md-4" }, "Incripcion de equipo")
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
                        md: "6",
                        lg: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, mergeProps({
                            variant: "outlined",
                            label: "Nombre del equipo",
                            modelValue: unref(fields).name.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                          }, unref(fields).name.fieldPropsValue, { onBlur: nextStep }), null, 16, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, mergeProps({
                            modelValue: unref(fields).tournament_id.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                          }, unref(fields).tournament_id.fieldPropsValue, {
                            "item-value": "id",
                            "item-title": "name",
                            "onUpdate:modelValue": nextStep,
                            items: unref(tournaments),
                            label: "Torneo",
                            variant: "outlined"
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, mergeProps({
                            modelValue: unref(fields).category_id.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event
                          }, unref(fields).category_id.fieldPropsValue, {
                            "onUpdate:modelValue": nextStep,
                            items: unref(categories),
                            "item-value": "id",
                            "item-title": "name",
                            variant: "outlined",
                            label: "Categoria"
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, mergeProps({
                            modelValue: unref(fields).location_id.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).location_id.fieldValue = $event
                          }, unref(fields).location_id.fieldPropsValue, {
                            "onUpdate:modelValue": nextStep,
                            items: unref(locations),
                            "item-value": "id",
                            "item-title": "name",
                            variant: "outlined",
                            label: "Cancha de juego"
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "items"]),
                          createTextVNode(),
                          createVNode(_sfc_main$1)
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
                        md: "6",
                        lg: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, mergeProps({
                            modelValue: unref(fields).president_name.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).president_name.fieldValue = $event
                          }, unref(fields).president_name.fieldPropsValue, {
                            onBlur: nextStep,
                            label: "Delegado/Presidente"
                          }), null, 16, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, mergeProps({
                            modelValue: unref(fields).coach_name.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).coach_name.fieldValue = $event
                          }, unref(fields).coach_name.fieldPropsValue, {
                            onBlur: nextStep,
                            label: "DT/Entrenador"
                          }), null, 16, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, mergeProps({
                            modelValue: unref(fields).phone.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event
                          }, unref(fields).phone.fieldPropsValue, {
                            onKeydown: ($event) => {
                              var _a;
                              return unref(fields).phone.fieldValue = (_a = $event.target.value) == null ? void 0 : _a.replace(/[^0-9]/g, "");
                            },
                            onBlur: nextStep,
                            label: "Telefono"
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, mergeProps({
                            modelValue: unref(fields).email.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                          }, unref(fields).email.fieldPropsValue, {
                            onBlur: nextStep,
                            label: "Correo"
                          }), null, 16, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, mergeProps({
                            modelValue: unref(fields).address.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                          }, unref(fields).address.fieldPropsValue, {
                            label: "Direccion",
                            onBlur: nextStep
                          }), null, 16, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VFileInput, mergeProps({
                            class: "mt-6",
                            modelValue: unref(fields).image.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).image.fieldValue = $event
                          }, unref(fields).image.fieldPropsValue, {
                            onBlur: nextStep,
                            label: "Escudo"
                          }), null, 16, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "6",
                        class: "flex-0-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, {
                            variant: "text",
                            border: _ctx.$vuetify.display.mobile
                          }, {
                            default: withCtx(() => [
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createVNode(VTabs, {
                                    modelValue: unref(tab),
                                    "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                                    "fixed-tabs": ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTab, { value: "home" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Local")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VTab, { value: "away" }, {
                                        default: withCtx(() => [
                                          createTextVNode("visitante")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(VWindow, {
                                    modelValue: unref(tab),
                                    "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VWindowItem, {
                                        value: "home",
                                        key: "home"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VContainer, {
                                            fluid: "",
                                            class: "pa-0"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VRow, null, {
                                                default: withCtx(() => [
                                                  createVNode(VCol, { cols: "6" }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                        (openBlock(), createBlock("svg", {
                                                          width: "100",
                                                          height: "165",
                                                          viewBox: "0 0 128 165",
                                                          xmlns: "http://www.w3.org/2000/svg",
                                                          onClick: ($event) => openColorOptions($event)
                                                        }, [
                                                          createVNode("path", {
                                                            d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                            fill: unref(uniform).home.jersey
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                            fill: unref(uniform).home.jersey
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                            fill: unref(uniform).home.jersey
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                            fill: unref(uniform).home.jersey
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                            fill: unref(uniform).home.jersey
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                            fill: unref(uniform).home.jersey
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                            fill: unref(uniform).home.jersey
                                                          }, null, 8, ["fill"])
                                                        ], 8, ["onClick"])),
                                                        createVNode("input", {
                                                          type: "color",
                                                          onBlur: nextStep,
                                                          value: unref(uniform).home.jersey,
                                                          onChange: ($event) => changeColor($event.target.value, "jersey", "home")
                                                        }, null, 40, ["value", "onChange"])
                                                      ])
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(VCol, { cols: "6" }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                        (openBlock(), createBlock("svg", {
                                                          width: "100",
                                                          height: "165",
                                                          viewBox: "0 0 105 90",
                                                          xmlns: "http://www.w3.org/2000/svg",
                                                          onClick: ($event) => openColorOptions($event)
                                                        }, [
                                                          createVNode("path", {
                                                            d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                            fill: unref(uniform).home.short
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                            fill: unref(uniform).home.short
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                            fill: unref(uniform).home.short
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                            fill: unref(uniform).home.short
                                                          }, null, 8, ["fill"])
                                                        ], 8, ["onClick"])),
                                                        createVNode("input", {
                                                          type: "color",
                                                          onBlur: nextStep,
                                                          value: unref(uniform).home.short,
                                                          onChange: ($event) => changeColor($event.target.value, "short", "home")
                                                        }, null, 40, ["value", "onChange"])
                                                      ])
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
                                      }),
                                      createVNode(VWindowItem, {
                                        value: "away",
                                        key: "away"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VContainer, { fluid: "" }, {
                                            default: withCtx(() => [
                                              createVNode(VRow, null, {
                                                default: withCtx(() => [
                                                  createVNode(VCol, { cols: "6" }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                        (openBlock(), createBlock("svg", {
                                                          width: "100",
                                                          height: "165",
                                                          viewBox: "0 0 128 165",
                                                          xmlns: "http://www.w3.org/2000/svg",
                                                          onClick: ($event) => openColorOptions($event)
                                                        }, [
                                                          createVNode("path", {
                                                            d: "M108.934 161.51C108.894 161.61 109.064 161.8 109.104 161.87C106.314 161.49 102.204 162.62 99.4539 163.21C95.1639 164.12 91.4239 164.56 86.9439 164.77C82.1339 164.98 77.2839 164.59 72.4039 164.58C69.0939 164.58 66.0239 165.12 62.9939 164.77C59.9539 165.12 56.9039 164.58 53.5739 164.58C48.6939 164.59 43.8539 164.98 39.0339 164.77C34.5639 164.56 30.8239 164.13 26.5239 163.21C24.6139 162.8 22.0539 162.13 19.7339 161.89C18.7139 161.78 17.7339 161.76 16.8839 161.87C16.9239 161.8 17.0839 161.61 17.0439 161.51C16.7939 160.82 18.0339 157.83 18.1739 156.91C18.4739 154.97 18.8439 153.08 19.2739 151.17C20.1739 147.24 20.4439 143.43 20.8739 139.49C21.7339 131.83 21.4439 123.99 22.6239 116.32C22.6639 116.07 22.7039 115.81 22.7439 115.55C23.2939 112.03 23.8639 108.55 24.5739 105C25.4139 100.81 26.5639 96.11 26.3339 91.82C26.0239 86.14 24.6839 81.06 23.1239 75.9C22.8339 74.94 22.5439 73.99 22.2439 73.02C21.8739 71.8 21.4939 70.57 21.1139 69.32C21.0839 69.24 21.0639 69.15 21.0339 69.07C20.8539 69.41 20.2239 66.26 20.0939 66.68C19.7739 48.48 15.6739 34.66 12.3439 16.85C12.4339 16.78 12.5139 16.71 12.6039 16.64C14.0639 15.49 15.5939 14.46 17.3839 13.83C21.2839 12.46 25.2339 11.2 29.1039 9.56001C32.5139 8.12001 36.0739 7.00001 39.3639 5.42001C40.5039 4.87001 41.8739 4.28001 43.1939 3.57001C45.2839 17.2 63.4139 20.5 74.0739 14.58C78.4739 12.21 80.9939 8.14001 83.3039 3.85001C84.4639 4.44001 85.6239 4.95001 86.6139 5.43001C89.9039 7.01001 93.4639 8.12001 96.8639 9.57001C100.734 11.21 104.674 12.46 108.584 13.84C110.074 14.37 111.384 15.18 112.624 16.1C112.804 16.22 112.974 16.36 113.144 16.49C107.624 33.59 107.344 51.54 105.304 69.96C105.194 69.65 105.084 69.34 104.934 69.07C104.244 71.39 103.524 73.63 102.844 75.86C101.434 80.52 100.204 85.13 99.7439 90.15C99.6939 90.7 99.6539 91.25 99.6239 91.82C99.3939 96.11 100.544 100.81 101.384 105C102.124 108.7 102.714 112.34 103.284 116.01C103.304 116.11 103.314 116.22 103.334 116.32C104.524 123.99 104.214 131.82 105.084 139.49C105.524 143.44 105.784 147.24 106.684 151.17C107.124 153.08 107.484 154.98 107.794 156.91C107.944 157.83 109.194 160.82 108.934 161.51Z",
                                                            fill: unref(uniform).away.jersey
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M43.0638 3.63998L43.7538 3.70998C43.5838 5.37998 45.7438 8.38998 46.6638 9.67998C48.5438 12.31 50.8238 14.25 53.4638 15.46C59.3838 18.17 66.3438 17.92 72.5538 14.76C74.8438 13.6 76.8438 11.94 78.3238 9.96998C78.5338 9.68998 78.7538 9.40997 78.9638 9.12997C80.2938 7.37997 81.6738 5.57998 82.5338 3.59998L83.6438 4.08997C82.7238 6.20997 81.3038 8.06997 79.9238 9.86997C79.7138 10.15 79.4938 10.42 79.2938 10.7C77.6938 12.82 75.5538 14.59 73.1038 15.84C69.5738 17.64 65.8038 18.54 62.1038 18.54C58.9438 18.54 55.8438 17.88 52.9538 16.56C50.1238 15.26 47.6738 13.19 45.6838 10.4C44.5538 8.81997 42.5238 5.99997 42.5238 3.89997L43.0638 3.63998Z",
                                                            fill: unref(uniform).away.jersey
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M22.7539 66.91C22.4339 48.71 17.3839 32.83 14.0539 15.03C13.8639 15.18 13.6739 15.32 13.4839 15.48C12.6539 16.15 11.8338 16.83 10.9738 17.48C5.65385 21.48 2.35385 27.93 1.76385 34.4C1.16385 40.97 0.0138499 47 0.0138499 53.83C0.0138499 54.85 -0.0361492 61.87 0.0538508 64.33C0.113851 65.89 0.153852 67.58 0.203852 69.19C0.273852 71.17 0.523852 71.54 2.52385 71.73C5.90385 72.04 8.89385 72.34 12.0638 73.28C14.6738 74.05 18.7239 76.2 20.4339 73.88C20.8539 73.31 21.1338 72.65 21.3538 71.94L22.7539 66.91Z",
                                                            fill: unref(uniform).away.jersey
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M127.664 55.63C127.664 48.8 126.524 42.77 125.924 36.2C125.334 29.73 122.034 23.28 116.714 19.28C115.654 18.48 114.634 17.61 113.584 16.8C113.444 16.68 113.294 16.58 113.154 16.47C107.644 33.57 107.364 51.52 105.314 69.94C105.914 71.72 106.064 74.08 107.234 75.66C107.594 76.15 108.064 76.44 108.604 76.59C110.604 77.13 113.554 75.67 115.604 75.06C118.774 74.12 121.774 73.83 125.144 73.52C127.154 73.33 127.404 72.97 127.464 70.98C127.524 69.36 127.554 67.68 127.614 66.11C127.754 62.66 127.664 59.12 127.664 55.63Z",
                                                            fill: unref(uniform).away.jersey
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M74.0738 14.58C78.4738 12.21 80.9938 8.14 83.3038 3.84C81.3338 2.84 79.3939 1.61 78.3839 0C78.3439 0.01 78.3138 0.00999664 78.2738 0.0199966C76.2438 0.349997 73.9639 1.93 71.8139 2.46C69.1539 3.11 65.7038 2.64 62.9838 2.89C60.2638 2.64 56.8138 3.12 54.1538 2.46C51.9838 1.93 49.6838 0.319995 47.6438 0.00999451C47.6238 -5.49294e-06 47.6038 0 47.5838 0C46.6638 1.47 44.9738 2.62 43.1938 3.57C45.2938 17.2 63.4238 20.5 74.0738 14.58Z",
                                                            fill: unref(uniform).away.jersey
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M50.3339 4.67999C51.1139 5.91999 51.9639 7.15999 53.0339 8.08999C55.2839 10.03 59.1639 11.52 62.1239 11.65C65.6939 11.81 69.6039 10.88 72.2039 8.29999C72.8239 7.68999 73.4139 7.05999 73.9939 6.40999C66.4639 9.84999 56.6239 9.26999 50.3339 4.67999Z",
                                                            fill: unref(uniform).away.jersey
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M77.7238 1.34001C77.9438 0.940012 78.0938 0.460012 78.2738 0.0200119C76.2438 0.350012 73.9638 1.93001 71.8138 2.46001C69.1538 3.11001 65.7038 2.63001 62.9838 2.88001C60.2638 2.63001 56.8138 3.11001 54.1538 2.46001C51.9838 1.93001 49.6838 0.32001 47.6438 0.0100098C47.8938 1.03001 48.8638 2.34001 49.3338 3.08001C49.6638 3.59001 49.9838 4.13002 50.3238 4.68002C56.6038 9.27002 66.4438 9.85001 73.9938 6.40001C74.5838 5.73001 75.1538 5.05001 75.7038 4.34001C76.4538 3.40001 77.1638 2.38001 77.7238 1.34001Z",
                                                            fill: unref(uniform).away.jersey
                                                          }, null, 8, ["fill"])
                                                        ], 8, ["onClick"])),
                                                        createVNode("input", {
                                                          type: "color",
                                                          value: unref(uniform).away.jersey,
                                                          onChange: ($event) => changeColor($event.target.value, "jersey", "away")
                                                        }, null, 40, ["value", "onChange"])
                                                      ])
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(VCol, { cols: "6" }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "d-flex flex-column justify-center align-center" }, [
                                                        (openBlock(), createBlock("svg", {
                                                          width: "100",
                                                          height: "165",
                                                          viewBox: "0 0 105 90",
                                                          xmlns: "http://www.w3.org/2000/svg",
                                                          onClick: ($event) => openColorOptions($event)
                                                        }, [
                                                          createVNode("path", {
                                                            d: "M85.7231 0.779999C85.7231 0.779999 39.4131 2.73 12.5631 0C12.5631 0 34.3531 11.29 50.1131 9.91998C50.1131 9.92998 79.3031 7.98 85.7231 0.779999Z",
                                                            fill: unref(uniform).away.short
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M98.6531 69.86C98.5831 68.57 98.5131 67.29 98.4431 66C98.1331 59.68 97.3231 53.41 96.9431 47.15C96.5431 40.52 95.8231 33.89 94.3531 27.4C93.4131 23.23 92.3431 18.8 91.0431 14.8C90.2331 12.31 89.2231 8.80996 86.9631 7.20996L48.3731 12.56L9.78307 7.20996C7.52307 8.80996 6.51307 12.31 5.70307 14.8C4.02307 19.99 3.18307 24.8899 2.70307 30.2899C1.94307 38.7899 0.523074 47.7899 1.02307 56.3199C1.45307 63.5599 0.593075 70.43 0.383075 77.65C0.353075 78.73 -0.206924 90.1899 0.0830755 90.2599C6.29308 91.7499 12.1331 95.56 18.1531 97.44C25.8231 99.85 24.9031 99.44 32.9331 99.43C36.8431 99.43 41.4931 99.3099 45.1731 98.2299C45.9531 95.2199 45.4231 91.9 45.5931 88.7299C45.7731 85.4399 46.9131 82.46 47.3531 79.2C47.7731 76.1 48.1531 72.92 48.3831 69.71C48.6131 72.93 48.9831 76.1 49.4131 79.2C49.8531 82.46 50.9931 85.4399 51.1731 88.7299C51.3431 91.9 50.8131 95.2299 51.5931 98.2299C55.2631 99.3 59.9231 99.43 63.8331 99.43C71.8631 99.43 77.0631 99.84 84.7331 97.44C90.7531 95.55 93.3831 91.7499 99.5931 90.2599C99.3531 86.5299 99.3631 82.79 99.1831 79.06C99.0231 75.98 98.8331 72.92 98.6531 69.86Z",
                                                            fill: unref(uniform).away.short
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M72.253 28.18C79.123 27.32 86.903 26.46 93.453 23.46C92.743 20.52 91.953 17.5499 91.063 14.7899C90.253 12.2999 89.243 8.79995 86.983 7.19995L48.393 12.55L9.80302 7.19995C7.54302 8.79995 6.53302 12.2999 5.72302 14.7899C4.85302 17.4799 4.21302 20.0899 3.72302 22.7299C25.393 31.29 49.333 31.53 72.253 28.18Z",
                                                            fill: unref(uniform).away.short
                                                          }, null, 8, ["fill"]),
                                                          createVNode("path", {
                                                            d: "M9.8031 7.19998C9.8031 7.19998 45.8131 20.82 86.9831 7.19998C86.9831 7.19998 87.4831 6.42 85.7331 0.779999C85.7331 0.779999 47.0131 14.59 12.5731 0C12.5631 0 10.5331 1.16998 9.8031 7.19998Z",
                                                            fill: unref(uniform).away.short
                                                          }, null, 8, ["fill"])
                                                        ], 8, ["onClick"])),
                                                        createVNode("input", {
                                                          type: "color",
                                                          value: unref(uniform).away.short,
                                                          onChange: ($event) => changeColor($event.target.value, "short", "away")
                                                        }, null, 40, ["value", "onChange"])
                                                      ])
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
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["border"])
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
                          createVNode(VBtn, {
                            onClick: unref(createTeam),
                            block: "",
                            size: "50"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Inscribir ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/equipos/inscribir.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=inscribir-C98JgFH4.mjs.map
