import { _ as _sfc_main$1, a as _sfc_main$2 } from './AppBar-VUGc6BDC.mjs';
import { _ as __nuxt_component_0 } from './PrimaryBtn-nUUkLYF8.mjs';
import { inject, createVNode, withDirectives, vShow, computed, resolveDirective, provide, toRef, ref, mergeProps, Fragment, defineComponent, withCtx, createTextVNode, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { p as propsFactory, m as makeComponentProps, y as makeLazyProps, q as genericComponent, B as useLazy, w as useRender, aI as VExpandTransition, aJ as IconValue, aK as makeDimensionProps, ac as Ripple, N as useBackgroundColor, aL as useDimension, aM as VDefaultsProvider, aq as VIcon, a9 as makeElevationProps, x as makeGroupItemProps, a8 as makeRoundedProps, n as makeTagProps, z as useGroupItem, ad as useElevation, ag as useRounded, aH as makeGroupProps, aN as pick$1, o as makeThemeProps, v as useGroup, r as provideTheme, P as provideDefaults, ai as makeVInputProps, aO as makeVSelectionControlProps, I as useProxiedModel, aP as useLoader, aj as useFocus, aA as getUid, aQ as filterInputAttrs, ak as VInput, aR as VSelectionControl, ae as VScaleTransition, aS as LoaderSlot, V as VCard, b as VCardItem, c as VCardTitle, W as VCardSubtitle, d as VCardText, aU as VFadeTransition, aT as IN_BROWSER } from './server.mjs';
import { V as VContainer } from './VContainer-DNC4AmJg.mjs';
import { V as VRow, a as VCol } from './VRow-BbW5rOE9.mjs';
import { a as VProgressCircular } from './VBtn-DMHWn55H.mjs';
import './layout-DtoiCxLB.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';
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

const VExpansionPanelSymbol = Symbol.for("vuetify:v-expansion-panel");
const makeVExpansionPanelTextProps = propsFactory({
  ...makeComponentProps(),
  ...makeLazyProps()
}, "VExpansionPanelText");
const VExpansionPanelText = genericComponent()({
  name: "VExpansionPanelText",
  props: makeVExpansionPanelTextProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject(VExpansionPanelSymbol);
    if (!expansionPanel) throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
    const {
      hasContent,
      onAfterLeave
    } = useLazy(props, expansionPanel.isSelected);
    useRender(() => createVNode(VExpandTransition, {
      "onAfterLeave": onAfterLeave
    }, {
      default: () => {
        var _a;
        return [withDirectives(createVNode("div", {
          "class": ["v-expansion-panel-text", props.class],
          "style": props.style
        }, [slots.default && hasContent.value && createVNode("div", {
          "class": "v-expansion-panel-text__wrapper"
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]), [[vShow, expansionPanel.isSelected.value]])];
      }
    }));
    return {};
  }
});
const makeVExpansionPanelTitleProps = propsFactory({
  color: String,
  expandIcon: {
    type: IconValue,
    default: "$expand"
  },
  collapseIcon: {
    type: IconValue,
    default: "$collapse"
  },
  hideActions: Boolean,
  focusable: Boolean,
  static: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: false
  },
  readonly: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps()
}, "VExpansionPanelTitle");
const VExpansionPanelTitle = genericComponent()({
  name: "VExpansionPanelTitle",
  directives: {
    Ripple
  },
  props: makeVExpansionPanelTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject(VExpansionPanelSymbol);
    if (!expansionPanel) throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, "color");
    const {
      dimensionStyles
    } = useDimension(props);
    const slotProps = computed(() => ({
      collapseIcon: props.collapseIcon,
      disabled: expansionPanel.disabled.value,
      expanded: expansionPanel.isSelected.value,
      expandIcon: props.expandIcon,
      readonly: props.readonly
    }));
    const icon = computed(() => expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon);
    useRender(() => {
      var _a;
      return withDirectives(createVNode("button", {
        "class": ["v-expansion-panel-title", {
          "v-expansion-panel-title--active": expansionPanel.isSelected.value,
          "v-expansion-panel-title--focusable": props.focusable,
          "v-expansion-panel-title--static": props.static
        }, backgroundColorClasses.value, props.class],
        "style": [backgroundColorStyles.value, dimensionStyles.value, props.style],
        "type": "button",
        "tabindex": expansionPanel.disabled.value ? -1 : void 0,
        "disabled": expansionPanel.disabled.value,
        "aria-expanded": expansionPanel.isSelected.value,
        "onClick": !props.readonly ? expansionPanel.toggle : void 0
      }, [createVNode("span", {
        "class": "v-expansion-panel-title__overlay"
      }, null), (_a = slots.default) == null ? void 0 : _a.call(slots, slotProps.value), !props.hideActions && createVNode(VDefaultsProvider, {
        "defaults": {
          VIcon: {
            icon: icon.value
          }
        }
      }, {
        default: () => {
          var _a3;
          var _a2;
          return [createVNode("span", {
            "class": "v-expansion-panel-title__icon"
          }, [(_a3 = (_a2 = slots.actions) == null ? void 0 : _a2.call(slots, slotProps.value)) != null ? _a3 : createVNode(VIcon, null, null)])];
        }
      })]), [[resolveDirective("ripple"), props.ripple]]);
    });
    return {};
  }
});
const makeVExpansionPanelProps = propsFactory({
  title: String,
  text: String,
  bgColor: String,
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeVExpansionPanelTitleProps(),
  ...makeVExpansionPanelTextProps()
}, "VExpansionPanel");
const VExpansionPanel = genericComponent()({
  name: "VExpansionPanel",
  props: makeVExpansionPanelProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const groupItem = useGroupItem(props, VExpansionPanelSymbol);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, "bgColor");
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const isDisabled = computed(() => (groupItem == null ? void 0 : groupItem.disabled.value) || props.disabled);
    const selectedIndices = computed(() => groupItem.group.items.value.reduce((arr, item, index) => {
      if (groupItem.group.selected.value.includes(item.id)) arr.push(index);
      return arr;
    }, []));
    const isBeforeSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => selectedIndex - index === 1);
    });
    const isAfterSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => selectedIndex - index === -1);
    });
    provide(VExpansionPanelSymbol, groupItem);
    useRender(() => {
      const hasText = !!(slots.text || props.text);
      const hasTitle = !!(slots.title || props.title);
      const expansionPanelTitleProps = VExpansionPanelTitle.filterProps(props);
      const expansionPanelTextProps = VExpansionPanelText.filterProps(props);
      return createVNode(props.tag, {
        "class": ["v-expansion-panel", {
          "v-expansion-panel--active": groupItem.isSelected.value,
          "v-expansion-panel--before-active": isBeforeSelected.value,
          "v-expansion-panel--after-active": isAfterSelected.value,
          "v-expansion-panel--disabled": isDisabled.value
        }, roundedClasses.value, backgroundColorClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.style]
      }, {
        default: () => [createVNode("div", {
          "class": ["v-expansion-panel__shadow", ...elevationClasses.value]
        }, null), createVNode(VDefaultsProvider, {
          "defaults": {
            VExpansionPanelTitle: {
              ...expansionPanelTitleProps
            },
            VExpansionPanelText: {
              ...expansionPanelTextProps
            }
          }
        }, {
          default: () => {
            var _a;
            return [hasTitle && createVNode(VExpansionPanelTitle, {
              "key": "title"
            }, {
              default: () => [slots.title ? slots.title() : props.title]
            }), hasText && createVNode(VExpansionPanelText, {
              "key": "text"
            }, {
              default: () => [slots.text ? slots.text() : props.text]
            }), (_a = slots.default) == null ? void 0 : _a.call(slots)];
          }
        })]
      });
    });
    return {
      groupItem
    };
  }
});
const allowedVariants = ["default", "accordion", "inset", "popout"];
const makeVExpansionPanelsProps = propsFactory({
  flat: Boolean,
  ...makeGroupProps(),
  ...pick$1(makeVExpansionPanelProps(), ["bgColor", "collapseIcon", "color", "eager", "elevation", "expandIcon", "focusable", "hideActions", "readonly", "ripple", "rounded", "tile", "static"]),
  ...makeThemeProps(),
  ...makeComponentProps(),
  ...makeTagProps(),
  variant: {
    type: String,
    default: "default",
    validator: (v) => allowedVariants.includes(v)
  }
}, "VExpansionPanels");
const VExpansionPanels = genericComponent()({
  name: "VExpansionPanels",
  props: makeVExpansionPanelsProps(),
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      next,
      prev
    } = useGroup(props, VExpansionPanelSymbol);
    const {
      themeClasses
    } = provideTheme(props);
    const variantClass = computed(() => props.variant && `v-expansion-panels--variant-${props.variant}`);
    provideDefaults({
      VExpansionPanel: {
        bgColor: toRef(props, "bgColor"),
        collapseIcon: toRef(props, "collapseIcon"),
        color: toRef(props, "color"),
        eager: toRef(props, "eager"),
        elevation: toRef(props, "elevation"),
        expandIcon: toRef(props, "expandIcon"),
        focusable: toRef(props, "focusable"),
        hideActions: toRef(props, "hideActions"),
        readonly: toRef(props, "readonly"),
        ripple: toRef(props, "ripple"),
        rounded: toRef(props, "rounded"),
        static: toRef(props, "static")
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-expansion-panels", {
        "v-expansion-panels--flat": props.flat,
        "v-expansion-panels--tile": props.tile
      }, themeClasses.value, variantClass.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots, {
          prev,
          next
        })];
      }
    }));
    return {
      next,
      prev
    };
  }
});
const makeVSwitchProps = propsFactory({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: false
  },
  ...makeVInputProps(),
  ...makeVSelectionControlProps()
}, "VSwitch");
const VSwitch = genericComponent()({
  name: "VSwitch",
  inheritAttrs: false,
  props: makeVSwitchProps(),
  emits: {
    "update:focused": (focused) => true,
    "update:modelValue": (value) => true,
    "update:indeterminate": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, "indeterminate");
    const model = useProxiedModel(props, "modelValue");
    const {
      loaderClasses
    } = useLoader(props);
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const control = ref();
    const isForcedColorsModeActive = IN_BROWSER;
    const loaderColor = computed(() => {
      return typeof props.loading === "string" && props.loading !== "" ? props.loading : props.color;
    });
    const uid = getUid();
    const id = computed(() => props.id || `switch-${uid}`);
    function onChange() {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }
    function onTrackClick(e) {
      var _a, _b;
      e.stopPropagation();
      e.preventDefault();
      (_b = (_a = control.value) == null ? void 0 : _a.input) == null ? void 0 : _b.click();
    }
    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs);
      const inputProps = VInput.filterProps(props);
      const controlProps = VSelectionControl.filterProps(props);
      return createVNode(VInput, mergeProps({
        "class": ["v-switch", {
          "v-switch--flat": props.flat
        }, {
          "v-switch--inset": props.inset
        }, {
          "v-switch--indeterminate": indeterminate.value
        }, loaderClasses.value, props.class]
      }, rootAttrs, inputProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "id": id.value,
        "focused": isFocused.value,
        "style": props.style
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id: id2,
            messagesId,
            isDisabled,
            isReadonly,
            isValid
          } = _ref2;
          const slotProps = {
            model,
            isValid
          };
          return createVNode(VSelectionControl, mergeProps({
            "ref": control
          }, controlProps, {
            "modelValue": model.value,
            "onUpdate:modelValue": [($event) => model.value = $event, onChange],
            "id": id2.value,
            "aria-describedby": messagesId.value,
            "type": "checkbox",
            "aria-checked": indeterminate.value ? "mixed" : void 0,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value,
            "onFocus": focus,
            "onBlur": blur
          }, controlAttrs), {
            ...slots,
            default: (_ref3) => {
              let {
                backgroundColorClasses,
                backgroundColorStyles
              } = _ref3;
              return createVNode("div", {
                "class": ["v-switch__track", backgroundColorClasses.value],
                "style": backgroundColorStyles.value,
                "onClick": onTrackClick
              }, [slots["track-true"] && createVNode("div", {
                "key": "prepend",
                "class": "v-switch__track-true"
              }, [slots["track-true"](slotProps)]), slots["track-false"] && createVNode("div", {
                "key": "append",
                "class": "v-switch__track-false"
              }, [slots["track-false"](slotProps)])]);
            },
            input: (_ref4) => {
              let {
                inputNode,
                icon,
                backgroundColorClasses,
                backgroundColorStyles
              } = _ref4;
              return createVNode(Fragment, null, [inputNode, createVNode("div", {
                "class": ["v-switch__thumb", {
                  "v-switch__thumb--filled": icon || props.loading
                }, props.inset || isForcedColorsModeActive ? void 0 : backgroundColorClasses.value],
                "style": props.inset ? void 0 : backgroundColorStyles.value
              }, [slots.thumb ? createVNode(VDefaultsProvider, {
                "defaults": {
                  VIcon: {
                    icon,
                    size: "x-small"
                  }
                }
              }, {
                default: () => [slots.thumb({
                  ...slotProps,
                  icon
                })]
              }) : createVNode(VScaleTransition, null, {
                default: () => [!props.loading ? icon && createVNode(VIcon, {
                  "key": String(icon),
                  "icon": icon,
                  "size": "x-small"
                }, null) : createVNode(LoaderSlot, {
                  "name": "v-switch",
                  "active": true,
                  "color": isValid.value === false ? void 0 : loaderColor.value
                }, {
                  default: (slotProps2) => slots.loader ? slots.loader(slotProps2) : createVNode(VProgressCircular, {
                    "active": slotProps2.isActive,
                    "color": slotProps2.color,
                    "indeterminate": true,
                    "size": "16",
                    "width": "2"
                  }, null)
                })]
              })])]);
            }
          });
        }
      });
    });
    return {};
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    locations: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageLayout = _sfc_main$2;
      const _component_PrimaryBtn = __nuxt_component_0;
      _push(ssrRenderComponent(_component_PageLayout, _attrs, {
        "app-bar": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, {
              buttons: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_PrimaryBtn, {
                    text: "Crear locacion",
                    icon: "futzo-icon:plus",
                    variant: "tonal",
                    class: "mr-8"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_PrimaryBtn, {
                      text: "Crear locacion",
                      icon: "futzo-icon:plus",
                      variant: "tonal",
                      class: "mr-8"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, null, {
                buttons: withCtx(() => [
                  createVNode(_component_PrimaryBtn, {
                    text: "Crear locacion",
                    icon: "futzo-icon:plus",
                    variant: "tonal",
                    class: "mr-8"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VContainer, { fluid: "" }, {
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
                              _push5(ssrRenderComponent(VCard, { class: "futzo-rounded" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCardItem, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VCardTitle, { class: "text-h6" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` Estadio Central`);
                                              } else {
                                                return [
                                                  createTextVNode(" Estadio Central")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCardSubtitle, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<span class="text-caption grey--text"${_scopeId7}> Av. Principal #123, Ciudad Central </span>`);
                                              } else {
                                                return [
                                                  createVNode("span", { class: "text-caption grey--text" }, " Av. Principal #123, Ciudad Central ")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VCardTitle, { class: "text-h6" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Estadio Central")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCardSubtitle, null, {
                                              default: withCtx(() => [
                                                createVNode("span", { class: "text-caption grey--text" }, " Av. Principal #123, Ciudad Central ")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCardText, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VExpansionPanels, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VExpansionPanel, {
                                                  height: 30,
                                                  class: "futzo-rounded"
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(VExpansionPanelTitle, null, {
                                                        default: withCtx(({ expanded }, _push10, _parent10, _scopeId9) => {
                                                          if (_push10) {
                                                            _push10(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                                                              default: withCtx((_9, _push11, _parent11, _scopeId10) => {
                                                                if (_push11) {
                                                                  _push11(ssrRenderComponent(VCol, {
                                                                    class: "d-flex justify-start",
                                                                    cols: "4"
                                                                  }, {
                                                                    default: withCtx((_10, _push12, _parent12, _scopeId11) => {
                                                                      if (_push12) {
                                                                        _push12(ssrRenderComponent(VSwitch, {
                                                                          density: "compact",
                                                                          label: "Lunes"
                                                                        }, null, _parent12, _scopeId11));
                                                                      } else {
                                                                        return [
                                                                          createVNode(VSwitch, {
                                                                            density: "compact",
                                                                            label: "Lunes"
                                                                          })
                                                                        ];
                                                                      }
                                                                    }),
                                                                    _: 2
                                                                  }, _parent11, _scopeId10));
                                                                  _push11(ssrRenderComponent(VCol, {
                                                                    class: "d-flex justify-start align-center text-grey",
                                                                    cols: "8"
                                                                  }, {
                                                                    default: withCtx((_10, _push12, _parent12, _scopeId11) => {
                                                                      if (_push12) {
                                                                        _push12(ssrRenderComponent(VFadeTransition, { "leave-absolute": "" }, {
                                                                          default: withCtx((_11, _push13, _parent13, _scopeId12) => {
                                                                            if (_push13) {
                                                                              if (expanded) {
                                                                                _push13(`<span class="d-flex align-center"${_scopeId12}> Enter a name for the trip </span>`);
                                                                              } else {
                                                                                _push13(`<span${_scopeId12}> 10:00 AM - 19:00 PM</span>`);
                                                                              }
                                                                            } else {
                                                                              return [
                                                                                expanded ? (openBlock(), createBlock("span", {
                                                                                  key: "0",
                                                                                  class: "d-flex align-center"
                                                                                }, " Enter a name for the trip ")) : (openBlock(), createBlock("span", { key: "1" }, " 10:00 AM - 19:00 PM"))
                                                                              ];
                                                                            }
                                                                          }),
                                                                          _: 2
                                                                        }, _parent12, _scopeId11));
                                                                      } else {
                                                                        return [
                                                                          createVNode(VFadeTransition, { "leave-absolute": "" }, {
                                                                            default: withCtx(() => [
                                                                              expanded ? (openBlock(), createBlock("span", {
                                                                                key: "0",
                                                                                class: "d-flex align-center"
                                                                              }, " Enter a name for the trip ")) : (openBlock(), createBlock("span", { key: "1" }, " 10:00 AM - 19:00 PM"))
                                                                            ]),
                                                                            _: 2
                                                                          }, 1024)
                                                                        ];
                                                                      }
                                                                    }),
                                                                    _: 2
                                                                  }, _parent11, _scopeId10));
                                                                } else {
                                                                  return [
                                                                    createVNode(VCol, {
                                                                      class: "d-flex justify-start",
                                                                      cols: "4"
                                                                    }, {
                                                                      default: withCtx(() => [
                                                                        createVNode(VSwitch, {
                                                                          density: "compact",
                                                                          label: "Lunes"
                                                                        })
                                                                      ]),
                                                                      _: 1
                                                                    }),
                                                                    createVNode(VCol, {
                                                                      class: "d-flex justify-start align-center text-grey",
                                                                      cols: "8"
                                                                    }, {
                                                                      default: withCtx(() => [
                                                                        createVNode(VFadeTransition, { "leave-absolute": "" }, {
                                                                          default: withCtx(() => [
                                                                            expanded ? (openBlock(), createBlock("span", {
                                                                              key: "0",
                                                                              class: "d-flex align-center"
                                                                            }, " Enter a name for the trip ")) : (openBlock(), createBlock("span", { key: "1" }, " 10:00 AM - 19:00 PM"))
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
                                                            }, _parent10, _scopeId9));
                                                          } else {
                                                            return [
                                                              createVNode(VRow, { "no-gutters": "" }, {
                                                                default: withCtx(() => [
                                                                  createVNode(VCol, {
                                                                    class: "d-flex justify-start",
                                                                    cols: "4"
                                                                  }, {
                                                                    default: withCtx(() => [
                                                                      createVNode(VSwitch, {
                                                                        density: "compact",
                                                                        label: "Lunes"
                                                                      })
                                                                    ]),
                                                                    _: 1
                                                                  }),
                                                                  createVNode(VCol, {
                                                                    class: "d-flex justify-start align-center text-grey",
                                                                    cols: "8"
                                                                  }, {
                                                                    default: withCtx(() => [
                                                                      createVNode(VFadeTransition, { "leave-absolute": "" }, {
                                                                        default: withCtx(() => [
                                                                          expanded ? (openBlock(), createBlock("span", {
                                                                            key: "0",
                                                                            class: "d-flex align-center"
                                                                          }, " Enter a name for the trip ")) : (openBlock(), createBlock("span", { key: "1" }, " 10:00 AM - 19:00 PM"))
                                                                        ]),
                                                                        _: 2
                                                                      }, 1024)
                                                                    ]),
                                                                    _: 2
                                                                  }, 1024)
                                                                ]),
                                                                _: 2
                                                              }, 1024)
                                                            ];
                                                          }
                                                        }),
                                                        _: 1
                                                      }, _parent9, _scopeId8));
                                                    } else {
                                                      return [
                                                        createVNode(VExpansionPanelTitle, null, {
                                                          default: withCtx(({ expanded }) => [
                                                            createVNode(VRow, { "no-gutters": "" }, {
                                                              default: withCtx(() => [
                                                                createVNode(VCol, {
                                                                  class: "d-flex justify-start",
                                                                  cols: "4"
                                                                }, {
                                                                  default: withCtx(() => [
                                                                    createVNode(VSwitch, {
                                                                      density: "compact",
                                                                      label: "Lunes"
                                                                    })
                                                                  ]),
                                                                  _: 1
                                                                }),
                                                                createVNode(VCol, {
                                                                  class: "d-flex justify-start align-center text-grey",
                                                                  cols: "8"
                                                                }, {
                                                                  default: withCtx(() => [
                                                                    createVNode(VFadeTransition, { "leave-absolute": "" }, {
                                                                      default: withCtx(() => [
                                                                        expanded ? (openBlock(), createBlock("span", {
                                                                          key: "0",
                                                                          class: "d-flex align-center"
                                                                        }, " Enter a name for the trip ")) : (openBlock(), createBlock("span", { key: "1" }, " 10:00 AM - 19:00 PM"))
                                                                      ]),
                                                                      _: 2
                                                                    }, 1024)
                                                                  ]),
                                                                  _: 2
                                                                }, 1024)
                                                              ]),
                                                              _: 2
                                                            }, 1024)
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
                                                  createVNode(VExpansionPanel, {
                                                    height: 30,
                                                    class: "futzo-rounded"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VExpansionPanelTitle, null, {
                                                        default: withCtx(({ expanded }) => [
                                                          createVNode(VRow, { "no-gutters": "" }, {
                                                            default: withCtx(() => [
                                                              createVNode(VCol, {
                                                                class: "d-flex justify-start",
                                                                cols: "4"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createVNode(VSwitch, {
                                                                    density: "compact",
                                                                    label: "Lunes"
                                                                  })
                                                                ]),
                                                                _: 1
                                                              }),
                                                              createVNode(VCol, {
                                                                class: "d-flex justify-start align-center text-grey",
                                                                cols: "8"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createVNode(VFadeTransition, { "leave-absolute": "" }, {
                                                                    default: withCtx(() => [
                                                                      expanded ? (openBlock(), createBlock("span", {
                                                                        key: "0",
                                                                        class: "d-flex align-center"
                                                                      }, " Enter a name for the trip ")) : (openBlock(), createBlock("span", { key: "1" }, " 10:00 AM - 19:00 PM"))
                                                                    ]),
                                                                    _: 2
                                                                  }, 1024)
                                                                ]),
                                                                _: 2
                                                              }, 1024)
                                                            ]),
                                                            _: 2
                                                          }, 1024)
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
                                            createVNode(VExpansionPanels, null, {
                                              default: withCtx(() => [
                                                createVNode(VExpansionPanel, {
                                                  height: 30,
                                                  class: "futzo-rounded"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VExpansionPanelTitle, null, {
                                                      default: withCtx(({ expanded }) => [
                                                        createVNode(VRow, { "no-gutters": "" }, {
                                                          default: withCtx(() => [
                                                            createVNode(VCol, {
                                                              class: "d-flex justify-start",
                                                              cols: "4"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(VSwitch, {
                                                                  density: "compact",
                                                                  label: "Lunes"
                                                                })
                                                              ]),
                                                              _: 1
                                                            }),
                                                            createVNode(VCol, {
                                                              class: "d-flex justify-start align-center text-grey",
                                                              cols: "8"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(VFadeTransition, { "leave-absolute": "" }, {
                                                                  default: withCtx(() => [
                                                                    expanded ? (openBlock(), createBlock("span", {
                                                                      key: "0",
                                                                      class: "d-flex align-center"
                                                                    }, " Enter a name for the trip ")) : (openBlock(), createBlock("span", { key: "1" }, " 10:00 AM - 19:00 PM"))
                                                                  ]),
                                                                  _: 2
                                                                }, 1024)
                                                              ]),
                                                              _: 2
                                                            }, 1024)
                                                          ]),
                                                          _: 2
                                                        }, 1024)
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCardItem, null, {
                                        default: withCtx(() => [
                                          createVNode(VCardTitle, { class: "text-h6" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Estadio Central")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCardSubtitle, null, {
                                            default: withCtx(() => [
                                              createVNode("span", { class: "text-caption grey--text" }, " Av. Principal #123, Ciudad Central ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => [
                                          createVNode(VExpansionPanels, null, {
                                            default: withCtx(() => [
                                              createVNode(VExpansionPanel, {
                                                height: 30,
                                                class: "futzo-rounded"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VExpansionPanelTitle, null, {
                                                    default: withCtx(({ expanded }) => [
                                                      createVNode(VRow, { "no-gutters": "" }, {
                                                        default: withCtx(() => [
                                                          createVNode(VCol, {
                                                            class: "d-flex justify-start",
                                                            cols: "4"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(VSwitch, {
                                                                density: "compact",
                                                                label: "Lunes"
                                                              })
                                                            ]),
                                                            _: 1
                                                          }),
                                                          createVNode(VCol, {
                                                            class: "d-flex justify-start align-center text-grey",
                                                            cols: "8"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(VFadeTransition, { "leave-absolute": "" }, {
                                                                default: withCtx(() => [
                                                                  expanded ? (openBlock(), createBlock("span", {
                                                                    key: "0",
                                                                    class: "d-flex align-center"
                                                                  }, " Enter a name for the trip ")) : (openBlock(), createBlock("span", { key: "1" }, " 10:00 AM - 19:00 PM"))
                                                                ]),
                                                                _: 2
                                                              }, 1024)
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCard, { class: "futzo-rounded" }, {
                                  default: withCtx(() => [
                                    createVNode(VCardItem, null, {
                                      default: withCtx(() => [
                                        createVNode(VCardTitle, { class: "text-h6" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Estadio Central")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCardSubtitle, null, {
                                          default: withCtx(() => [
                                            createVNode("span", { class: "text-caption grey--text" }, " Av. Principal #123, Ciudad Central ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => [
                                        createVNode(VExpansionPanels, null, {
                                          default: withCtx(() => [
                                            createVNode(VExpansionPanel, {
                                              height: 30,
                                              class: "futzo-rounded"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VExpansionPanelTitle, null, {
                                                  default: withCtx(({ expanded }) => [
                                                    createVNode(VRow, { "no-gutters": "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(VCol, {
                                                          class: "d-flex justify-start",
                                                          cols: "4"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(VSwitch, {
                                                              density: "compact",
                                                              label: "Lunes"
                                                            })
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode(VCol, {
                                                          class: "d-flex justify-start align-center text-grey",
                                                          cols: "8"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(VFadeTransition, { "leave-absolute": "" }, {
                                                              default: withCtx(() => [
                                                                expanded ? (openBlock(), createBlock("span", {
                                                                  key: "0",
                                                                  class: "d-flex align-center"
                                                                }, " Enter a name for the trip ")) : (openBlock(), createBlock("span", { key: "1" }, " 10:00 AM - 19:00 PM"))
                                                              ]),
                                                              _: 2
                                                            }, 1024)
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, {
                            cols: "12",
                            lg: "4",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCard, { class: "futzo-rounded" }, {
                                default: withCtx(() => [
                                  createVNode(VCardItem, null, {
                                    default: withCtx(() => [
                                      createVNode(VCardTitle, { class: "text-h6" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Estadio Central")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCardSubtitle, null, {
                                        default: withCtx(() => [
                                          createVNode("span", { class: "text-caption grey--text" }, " Av. Principal #123, Ciudad Central ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createVNode(VExpansionPanels, null, {
                                        default: withCtx(() => [
                                          createVNode(VExpansionPanel, {
                                            height: 30,
                                            class: "futzo-rounded"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VExpansionPanelTitle, null, {
                                                default: withCtx(({ expanded }) => [
                                                  createVNode(VRow, { "no-gutters": "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(VCol, {
                                                        class: "d-flex justify-start",
                                                        cols: "4"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(VSwitch, {
                                                            density: "compact",
                                                            label: "Lunes"
                                                          })
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode(VCol, {
                                                        class: "d-flex justify-start align-center text-grey",
                                                        cols: "8"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(VFadeTransition, { "leave-absolute": "" }, {
                                                            default: withCtx(() => [
                                                              expanded ? (openBlock(), createBlock("span", {
                                                                key: "0",
                                                                class: "d-flex align-center"
                                                              }, " Enter a name for the trip ")) : (openBlock(), createBlock("span", { key: "1" }, " 10:00 AM - 19:00 PM"))
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
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
                            createVNode(VCard, { class: "futzo-rounded" }, {
                              default: withCtx(() => [
                                createVNode(VCardItem, null, {
                                  default: withCtx(() => [
                                    createVNode(VCardTitle, { class: "text-h6" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Estadio Central")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardSubtitle, null, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "text-caption grey--text" }, " Av. Principal #123, Ciudad Central ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createVNode(VExpansionPanels, null, {
                                      default: withCtx(() => [
                                        createVNode(VExpansionPanel, {
                                          height: 30,
                                          class: "futzo-rounded"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VExpansionPanelTitle, null, {
                                              default: withCtx(({ expanded }) => [
                                                createVNode(VRow, { "no-gutters": "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(VCol, {
                                                      class: "d-flex justify-start",
                                                      cols: "4"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(VSwitch, {
                                                          density: "compact",
                                                          label: "Lunes"
                                                        })
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(VCol, {
                                                      class: "d-flex justify-start align-center text-grey",
                                                      cols: "8"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(VFadeTransition, { "leave-absolute": "" }, {
                                                          default: withCtx(() => [
                                                            expanded ? (openBlock(), createBlock("span", {
                                                              key: "0",
                                                              class: "d-flex align-center"
                                                            }, " Enter a name for the trip ")) : (openBlock(), createBlock("span", { key: "1" }, " 10:00 AM - 19:00 PM"))
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1024)
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
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        lg: "4",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, { class: "futzo-rounded" }, {
                            default: withCtx(() => [
                              createVNode(VCardItem, null, {
                                default: withCtx(() => [
                                  createVNode(VCardTitle, { class: "text-h6" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Estadio Central")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardSubtitle, null, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "text-caption grey--text" }, " Av. Principal #123, Ciudad Central ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createVNode(VExpansionPanels, null, {
                                    default: withCtx(() => [
                                      createVNode(VExpansionPanel, {
                                        height: 30,
                                        class: "futzo-rounded"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VExpansionPanelTitle, null, {
                                            default: withCtx(({ expanded }) => [
                                              createVNode(VRow, { "no-gutters": "" }, {
                                                default: withCtx(() => [
                                                  createVNode(VCol, {
                                                    class: "d-flex justify-start",
                                                    cols: "4"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VSwitch, {
                                                        density: "compact",
                                                        label: "Lunes"
                                                      })
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(VCol, {
                                                    class: "d-flex justify-start align-center text-grey",
                                                    cols: "8"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VFadeTransition, { "leave-absolute": "" }, {
                                                        default: withCtx(() => [
                                                          expanded ? (openBlock(), createBlock("span", {
                                                            key: "0",
                                                            class: "d-flex align-center"
                                                          }, " Enter a name for the trip ")) : (openBlock(), createBlock("span", { key: "1" }, " 10:00 AM - 19:00 PM"))
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/locaciones/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-EaUJeM8m.mjs.map
