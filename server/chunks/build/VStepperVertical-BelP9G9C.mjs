import { ref, toRefs, computed, createVNode, mergeProps, createElementVNode, Fragment, toRef, useId, normalizeStyle, normalizeClass, provide, inject, withDirectives, vShow } from 'vue';
import { g as genericComponent, p as propsFactory, O as useProxiedModel, b as getPropertyFromItem, P as provideDefaults, c as useRender, aM as VDefaultsProvider, a9 as VAvatar, q as VIcon, aD as useLoader, N as useFocus, Q as filterInputAttrs, aR as VInput, b_ as VSelectionControl, bv as VScaleTransition, aE as LoaderSlot, $ as omit, ah as useGroup, ag as provideTheme, ak as useGroupItem, j as useBackgroundColor, b9 as useElevation, k as useRounded, b$ as makeVSelectionControlProps, aS as makeVInputProps, c0 as IN_BROWSER, aG as makeDisplayProps, I as IconValue, t as makeTagProps, x as makeComponentProps, s as makeThemeProps, T as pick, ai as makeGroupProps, v as makeRoundedProps, aj as makeGroupItemProps, ay as makeElevationProps, bu as Ripple, L as useDimension, bX as useLazy, J as VExpandTransition, l as useLocale, bY as makeLazyProps, W as makeDimensionProps, br as createSimpleFunctional, bQ as genOverlays, at as useDisplay, H as VDivider } from './server.mjs';
import { a as VProgressCircular, V as VBtn } from './VBtn-_od1f1mx.mjs';
import { m as makeVWindowProps, V as VWindow, b as makeVWindowItemProps, a as VWindowItem } from './VWindowItem-DPPZL2sh.mjs';
import { m as makeVSheetProps, V as VSheet } from './VSheet-DVv3ytGE.mjs';

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
        return [withDirectives(createElementVNode("div", {
          "class": normalizeClass(["v-expansion-panel-text", props.class]),
          "style": normalizeStyle(props.style)
        }, [slots.default && hasContent.value && createElementVNode("div", {
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
    vRipple: Ripple
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
    } = useBackgroundColor(() => props.color);
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
    const icon = toRef(() => expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon);
    useRender(() => {
      var _a;
      return withDirectives(createElementVNode("button", {
        "class": normalizeClass(["v-expansion-panel-title", {
          "v-expansion-panel-title--active": expansionPanel.isSelected.value,
          "v-expansion-panel-title--focusable": props.focusable,
          "v-expansion-panel-title--static": props.static
        }, backgroundColorClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, props.style]),
        "type": "button",
        "tabindex": expansionPanel.disabled.value ? -1 : void 0,
        "disabled": expansionPanel.disabled.value,
        "aria-expanded": expansionPanel.isSelected.value,
        "onClick": !props.readonly ? expansionPanel.toggle : void 0
      }, [createElementVNode("span", {
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
          return [createElementVNode("span", {
            "class": "v-expansion-panel-title__icon"
          }, [(_a3 = (_a2 = slots.actions) == null ? void 0 : _a2.call(slots, slotProps.value)) != null ? _a3 : createVNode(VIcon, null, null)])];
        }
      })]), [[Ripple, props.ripple]]);
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
    } = useBackgroundColor(() => props.bgColor);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const isDisabled = toRef(() => (groupItem == null ? void 0 : groupItem.disabled.value) || props.disabled);
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
        "class": normalizeClass(["v-expansion-panel", {
          "v-expansion-panel--active": groupItem.isSelected.value,
          "v-expansion-panel--before-active": isBeforeSelected.value,
          "v-expansion-panel--after-active": isAfterSelected.value,
          "v-expansion-panel--disabled": isDisabled.value
        }, roundedClasses.value, backgroundColorClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, props.style])
      }, {
        default: () => [createElementVNode("div", {
          "class": normalizeClass(["v-expansion-panel__shadow", ...elevationClasses.value])
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
  ...pick(makeVExpansionPanelProps(), ["bgColor", "collapseIcon", "color", "eager", "elevation", "expandIcon", "focusable", "hideActions", "readonly", "ripple", "rounded", "tile", "static"]),
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
    const variantClass = toRef(() => props.variant && `v-expansion-panels--variant-${props.variant}`);
    provideDefaults({
      VExpansionPanel: {
        bgColor: toRef(() => props.bgColor),
        collapseIcon: toRef(() => props.collapseIcon),
        color: toRef(() => props.color),
        eager: toRef(() => props.eager),
        elevation: toRef(() => props.elevation),
        expandIcon: toRef(() => props.expandIcon),
        focusable: toRef(() => props.focusable),
        hideActions: toRef(() => props.hideActions),
        readonly: toRef(() => props.readonly),
        ripple: toRef(() => props.ripple),
        rounded: toRef(() => props.rounded),
        static: toRef(() => props.static)
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-expansion-panels", {
        "v-expansion-panels--flat": props.flat,
        "v-expansion-panels--tile": props.tile
      }, themeClasses.value, variantClass.value, props.class]),
      "style": normalizeStyle(props.style)
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
const VStepperSymbol = Symbol.for("vuetify:v-stepper");
const makeVStepperActionsProps = propsFactory({
  color: String,
  disabled: {
    type: [Boolean, String],
    default: false
  },
  prevText: {
    type: String,
    default: "$vuetify.stepper.prev"
  },
  nextText: {
    type: String,
    default: "$vuetify.stepper.next"
  }
}, "VStepperActions");
const VStepperActions = genericComponent()({
  name: "VStepperActions",
  props: makeVStepperActionsProps(),
  emits: {
    "click:prev": () => true,
    "click:next": () => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    function onClickPrev() {
      emit("click:prev");
    }
    function onClickNext() {
      emit("click:next");
    }
    useRender(() => {
      const prevSlotProps = {
        onClick: onClickPrev
      };
      const nextSlotProps = {
        onClick: onClickNext
      };
      return createElementVNode("div", {
        "class": "v-stepper-actions"
      }, [createVNode(VDefaultsProvider, {
        "defaults": {
          VBtn: {
            disabled: ["prev", true].includes(props.disabled),
            text: t(props.prevText),
            variant: "text"
          }
        }
      }, {
        default: () => {
          var _a2;
          var _a;
          return [(_a2 = (_a = slots.prev) == null ? void 0 : _a.call(slots, {
            props: prevSlotProps
          })) != null ? _a2 : createVNode(VBtn, prevSlotProps, null)];
        }
      }), createVNode(VDefaultsProvider, {
        "defaults": {
          VBtn: {
            color: props.color,
            disabled: ["next", true].includes(props.disabled),
            text: t(props.nextText),
            variant: "tonal"
          }
        }
      }, {
        default: () => {
          var _a2;
          var _a;
          return [(_a2 = (_a = slots.next) == null ? void 0 : _a.call(slots, {
            props: nextSlotProps
          })) != null ? _a2 : createVNode(VBtn, nextSlotProps, null)];
        }
      })]);
    });
    return {};
  }
});
const VStepperHeader = createSimpleFunctional("v-stepper-header");
const makeStepperItemProps = propsFactory({
  color: String,
  title: String,
  subtitle: String,
  complete: Boolean,
  completeIcon: {
    type: IconValue,
    default: "$complete"
  },
  editable: Boolean,
  editIcon: {
    type: IconValue,
    default: "$edit"
  },
  error: Boolean,
  errorIcon: {
    type: IconValue,
    default: "$error"
  },
  icon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  rules: {
    type: Array,
    default: () => []
  }
}, "StepperItem");
const makeVStepperItemProps = propsFactory({
  ...makeStepperItemProps(),
  ...makeGroupItemProps()
}, "VStepperItem");
const VStepperItem = genericComponent()({
  name: "VStepperItem",
  directives: {
    vRipple: Ripple
  },
  props: makeVStepperItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const group = useGroupItem(props, VStepperSymbol, true);
    const step = computed(() => {
      var _a;
      return (_a = group == null ? void 0 : group.value.value) != null ? _a : props.value;
    });
    const isValid = computed(() => props.rules.every((handler) => handler() === true));
    const isClickable = computed(() => !props.disabled && props.editable);
    const canEdit = computed(() => !props.disabled && props.editable);
    const hasError = computed(() => props.error || !isValid.value);
    const hasCompleted = computed(() => props.complete || props.rules.length > 0 && isValid.value);
    const icon = computed(() => {
      if (hasError.value) return props.errorIcon;
      if (hasCompleted.value) return props.completeIcon;
      if (group.isSelected.value && props.editable) return props.editIcon;
      return props.icon;
    });
    const slotProps = computed(() => ({
      canEdit: canEdit.value,
      hasError: hasError.value,
      hasCompleted: hasCompleted.value,
      title: props.title,
      subtitle: props.subtitle,
      step: step.value,
      value: props.value
    }));
    useRender(() => {
      var _a2, _b2;
      var _a, _b, _c;
      const hasColor = (!group || group.isSelected.value || hasCompleted.value || canEdit.value) && !hasError.value && !props.disabled;
      const hasTitle = !!(props.title != null || slots.title);
      const hasSubtitle = !!(props.subtitle != null || slots.subtitle);
      function onClick() {
        group == null ? void 0 : group.toggle();
      }
      return withDirectives(createElementVNode("button", {
        "class": normalizeClass(["v-stepper-item", {
          "v-stepper-item--complete": hasCompleted.value,
          "v-stepper-item--disabled": props.disabled,
          "v-stepper-item--error": hasError.value
        }, group == null ? void 0 : group.selectedClass.value]),
        "disabled": !props.editable,
        "type": "button",
        "onClick": onClick
      }, [isClickable.value && genOverlays(true, "v-stepper-item"), createVNode(VAvatar, {
        "key": "stepper-avatar",
        "class": "v-stepper-item__avatar",
        "color": hasColor ? props.color : void 0,
        "size": 24
      }, {
        default: () => {
          var _a3;
          var _a22;
          return [(_a3 = (_a22 = slots.icon) == null ? void 0 : _a22.call(slots, slotProps.value)) != null ? _a3 : icon.value ? createVNode(VIcon, {
            "icon": icon.value
          }, null) : step.value];
        }
      }), createElementVNode("div", {
        "class": "v-stepper-item__content"
      }, [hasTitle && createElementVNode("div", {
        "key": "title",
        "class": "v-stepper-item__title"
      }, [(_a2 = (_a = slots.title) == null ? void 0 : _a.call(slots, slotProps.value)) != null ? _a2 : props.title]), hasSubtitle && createElementVNode("div", {
        "key": "subtitle",
        "class": "v-stepper-item__subtitle"
      }, [(_b2 = (_b = slots.subtitle) == null ? void 0 : _b.call(slots, slotProps.value)) != null ? _b2 : props.subtitle]), (_c = slots.default) == null ? void 0 : _c.call(slots, slotProps.value)])]), [[Ripple, props.ripple && props.editable, null]]);
    });
    return {};
  }
});
const makeVStepperWindowProps = propsFactory({
  ...omit(makeVWindowProps(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VStepperWindow");
const VStepperWindow = genericComponent()({
  name: "VStepperWindow",
  props: makeVStepperWindowProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const group = inject(VStepperSymbol, null);
    const _model = useProxiedModel(props, "modelValue");
    const model = computed({
      get() {
        var _a;
        if (_model.value != null || !group) return _model.value;
        return (_a = group.items.value.find((item) => group.selected.value.includes(item.id))) == null ? void 0 : _a.value;
      },
      set(val) {
        _model.value = val;
      }
    });
    useRender(() => {
      const windowProps = VWindow.filterProps(props);
      return createVNode(VWindow, mergeProps({
        "_as": "VStepperWindow"
      }, windowProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-stepper-window", props.class],
        "style": props.style,
        "mandatory": false,
        "touch": false
      }), slots);
    });
    return {};
  }
});
const makeVStepperWindowItemProps = propsFactory({
  ...makeVWindowItemProps()
}, "VStepperWindowItem");
const VStepperWindowItem = genericComponent()({
  name: "VStepperWindowItem",
  props: makeVStepperWindowItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const windowItemProps = VWindowItem.filterProps(props);
      return createVNode(VWindowItem, mergeProps({
        "_as": "VStepperWindowItem"
      }, windowItemProps, {
        "class": ["v-stepper-window-item", props.class],
        "style": props.style
      }), slots);
    });
    return {};
  }
});
const makeStepperProps = propsFactory({
  altLabels: Boolean,
  bgColor: String,
  completeIcon: IconValue,
  editIcon: IconValue,
  editable: Boolean,
  errorIcon: IconValue,
  hideActions: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: String,
    default: "title"
  },
  itemValue: {
    type: String,
    default: "value"
  },
  nonLinear: Boolean,
  flat: Boolean,
  ...makeDisplayProps()
}, "Stepper");
const makeVStepperProps = propsFactory({
  ...makeStepperProps(),
  ...makeGroupProps({
    mandatory: "force",
    selectedClass: "v-stepper-item--selected"
  }),
  ...makeVSheetProps(),
  ...pick(makeVStepperActionsProps(), ["prevText", "nextText"])
}, "VStepper");
genericComponent()({
  name: "VStepper",
  props: makeVStepperProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      items: _items,
      next,
      prev,
      selected
    } = useGroup(props, VStepperSymbol);
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const {
      completeIcon,
      editIcon,
      errorIcon,
      color,
      editable,
      prevText,
      nextText
    } = toRefs(props);
    const items = computed(() => props.items.map((item, index) => {
      const title = getPropertyFromItem(item, props.itemTitle, item);
      const value = getPropertyFromItem(item, props.itemValue, index + 1);
      return {
        title,
        value,
        raw: item
      };
    }));
    const activeIndex = computed(() => {
      return _items.value.findIndex((item) => selected.value.includes(item.id));
    });
    const disabled = computed(() => {
      if (props.disabled) return props.disabled;
      if (activeIndex.value === 0) return "prev";
      if (activeIndex.value === _items.value.length - 1) return "next";
      return false;
    });
    provideDefaults({
      VStepperItem: {
        editable,
        errorIcon,
        completeIcon,
        editIcon,
        prevText,
        nextText
      },
      VStepperActions: {
        color,
        disabled,
        prevText,
        nextText
      }
    });
    useRender(() => {
      const sheetProps = VSheet.filterProps(props);
      const hasHeader = !!(slots.header || props.items.length);
      const hasWindow = props.items.length > 0;
      const hasActions = !props.hideActions && !!(hasWindow || slots.actions);
      return createVNode(VSheet, mergeProps(sheetProps, {
        "color": props.bgColor,
        "class": ["v-stepper", {
          "v-stepper--alt-labels": props.altLabels,
          "v-stepper--flat": props.flat,
          "v-stepper--non-linear": props.nonLinear,
          "v-stepper--mobile": mobile.value
        }, displayClasses.value, props.class],
        "style": props.style
      }), {
        default: () => {
          var _a2;
          var _a, _b;
          return [hasHeader && createVNode(VStepperHeader, {
            "key": "stepper-header"
          }, {
            default: () => [items.value.map((_ref2, index) => {
              var _a3;
              let {
                raw,
                ...item
              } = _ref2;
              return createElementVNode(Fragment, null, [!!index && createVNode(VDivider, null, null), createVNode(VStepperItem, item, {
                default: (_a3 = slots[`header-item.${item.value}`]) != null ? _a3 : slots.header,
                icon: slots.icon,
                title: slots.title,
                subtitle: slots.subtitle
              })]);
            })]
          }), hasWindow && createVNode(VStepperWindow, {
            "key": "stepper-window"
          }, {
            default: () => [items.value.map((item) => createVNode(VStepperWindowItem, {
              "value": item.value
            }, {
              default: () => {
                var _a3;
                var _a22, _b2;
                return (_a3 = (_a22 = slots[`item.${item.value}`]) == null ? void 0 : _a22.call(slots, item)) != null ? _a3 : (_b2 = slots.item) == null ? void 0 : _b2.call(slots, item);
              }
            }))]
          }), (_a = slots.default) == null ? void 0 : _a.call(slots, {
            prev,
            next
          }), hasActions && ((_a2 = (_b = slots.actions) == null ? void 0 : _b.call(slots, {
            next,
            prev
          })) != null ? _a2 : createVNode(VStepperActions, {
            "key": "stepper-actions",
            "onClick:prev": prev,
            "onClick:next": next
          }, slots))];
        }
      });
    });
    return {
      prev,
      next
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
    const loaderColor = toRef(() => {
      return typeof props.loading === "string" && props.loading !== "" ? props.loading : props.color;
    });
    const uid = useId();
    const id = toRef(() => props.id || `switch-${uid}`);
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
              return createElementVNode("div", {
                "class": normalizeClass(["v-switch__track", backgroundColorClasses.value]),
                "style": normalizeStyle(backgroundColorStyles.value),
                "onClick": onTrackClick
              }, [slots["track-true"] && createElementVNode("div", {
                "key": "prepend",
                "class": "v-switch__track-true"
              }, [slots["track-true"](slotProps)]), slots["track-false"] && createElementVNode("div", {
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
              return createElementVNode(Fragment, null, [inputNode, createElementVNode("div", {
                "class": normalizeClass(["v-switch__thumb", {
                  "v-switch__thumb--filled": icon || props.loading
                }, props.inset || isForcedColorsModeActive ? void 0 : backgroundColorClasses.value]),
                "style": normalizeStyle(props.inset ? void 0 : backgroundColorStyles.value)
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
const makeVStepperVerticalActionsProps = propsFactory({
  ...makeVStepperActionsProps()
}, "VStepperActions");
const VStepperVerticalActions = genericComponent()({
  name: "VStepperVerticalActions",
  props: makeVStepperVerticalActionsProps(),
  emits: {
    "click:prev": () => true,
    "click:next": () => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    function onClickPrev() {
      emit("click:prev");
    }
    function onClickNext() {
      emit("click:next");
    }
    useRender(() => {
      const stepperActionsProps = VStepperActions.filterProps(props);
      return createVNode(VStepperActions, mergeProps({
        "class": "v-stepper-vertical-actions"
      }, stepperActionsProps, {
        "onClick:prev": onClickPrev,
        "onClick:next": onClickNext
      }), slots);
    });
    return {};
  }
});
const makeVStepperVerticalItemProps = propsFactory({
  hideActions: Boolean,
  ...makeStepperItemProps(),
  ...omit(makeVExpansionPanelProps({
    expandIcon: "",
    collapseIcon: ""
  }), ["hideActions"])
}, "VStepperVerticalItem");
const VStepperVerticalItem = genericComponent()({
  name: "VStepperVerticalItem",
  props: makeVStepperVerticalItemProps(),
  emits: {
    "click:next": () => true,
    "click:prev": () => true,
    "click:finish": () => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const vExpansionPanelRef = ref();
    const step = computed(() => !isNaN(parseInt(props.value)) ? Number(props.value) : props.value);
    const groupItem = computed(() => {
      var _a;
      return (_a = vExpansionPanelRef.value) == null ? void 0 : _a.groupItem;
    });
    const isSelected = computed(() => {
      var _a2;
      var _a;
      return (_a2 = (_a = groupItem.value) == null ? void 0 : _a.isSelected.value) != null ? _a2 : false;
    });
    const isValid = computed(() => isSelected.value ? props.rules.every((handler) => handler() === true) : null);
    const canEdit = computed(() => !props.disabled && props.editable);
    const hasError = computed(() => props.error || isSelected.value && !isValid.value);
    const hasCompleted = computed(() => props.complete || props.rules.length > 0 && isValid.value === true);
    const disabled = computed(() => {
      var _a;
      if (props.disabled) return props.disabled;
      if ((_a = groupItem.value) == null ? void 0 : _a.isFirst.value) return "prev";
      return false;
    });
    const icon = computed(() => {
      var _a;
      if (hasError.value) return props.errorIcon;
      if (hasCompleted.value) return props.completeIcon;
      if (((_a = groupItem.value) == null ? void 0 : _a.isSelected.value) && props.editable) return props.editIcon;
      return props.icon;
    });
    const slotProps = computed(() => ({
      canEdit: canEdit.value,
      hasError: hasError.value,
      hasCompleted: hasCompleted.value,
      title: props.title,
      subtitle: props.subtitle,
      step: step.value
    }));
    const actionProps = computed(() => ({
      ...slotProps.value,
      prev: onClickPrev,
      next: onClickNext
    }));
    function onClickNext() {
      var _a;
      emit("click:next");
      if ((_a = groupItem.value) == null ? void 0 : _a.isLast.value) return;
      groupItem.value.group.next();
    }
    function onClickPrev() {
      emit("click:prev");
      groupItem.value.group.prev();
    }
    useRender(() => {
      var _a;
      const hasColor = (hasCompleted.value || ((_a = groupItem.value) == null ? void 0 : _a.isSelected.value)) && !hasError.value && !props.disabled;
      const hasActions = !props.hideActions || !!slots.actions;
      const expansionPanelProps = VExpansionPanel.filterProps(props);
      return createVNode(VExpansionPanel, mergeProps({
        "_as": "VStepperVerticalItem",
        "ref": vExpansionPanelRef
      }, expansionPanelProps, {
        "class": ["v-stepper-vertical-item", {
          "v-stepper-vertical-item--complete": hasCompleted.value,
          "v-stepper-vertical-item--disabled": props.disabled,
          "v-stepper-vertical-item--editable": canEdit.value,
          "v-stepper-vertical-item--error": hasError.value
        }, props.class],
        "readonly": !props.editable,
        "style": props.style,
        "color": "",
        "hide-actions": false,
        "value": step.value
      }), {
        title: () => {
          var _a3, _b2;
          var _a2, _b;
          return createElementVNode(Fragment, null, [createVNode(VAvatar, {
            "key": "stepper-avatar",
            "class": "v-stepper-vertical-item__avatar",
            "color": hasColor ? props.color : void 0,
            "size": 24,
            "start": true
          }, {
            default: () => {
              var _a4;
              var _a32;
              return [(_a4 = (_a32 = slots.icon) == null ? void 0 : _a32.call(slots, slotProps.value)) != null ? _a4 : icon.value ? createVNode(VIcon, {
                "icon": icon.value
              }, null) : step.value];
            }
          }), createElementVNode("div", null, [createElementVNode("div", {
            "class": "v-stepper-vertical-item__title"
          }, [(_a3 = (_a2 = slots.title) == null ? void 0 : _a2.call(slots, slotProps.value)) != null ? _a3 : props.title]), createElementVNode("div", {
            "class": "v-stepper-vertical-item__subtitle"
          }, [(_b2 = (_b = slots.subtitle) == null ? void 0 : _b.call(slots, slotProps.value)) != null ? _b2 : props.subtitle])])]);
        },
        text: () => {
          var _a3;
          var _a2, _b;
          return createElementVNode(Fragment, null, [(_a3 = (_a2 = slots.default) == null ? void 0 : _a2.call(slots, slotProps.value)) != null ? _a3 : props.text, hasActions && createVNode(VDefaultsProvider, {
            "defaults": {
              VStepperVerticalActions: {
                disabled: disabled.value,
                finish: (_b = groupItem.value) == null ? void 0 : _b.isLast.value
              }
            }
          }, {
            default: () => {
              var _a4;
              var _a32;
              return [(_a4 = (_a32 = slots.actions) == null ? void 0 : _a32.call(slots, actionProps.value)) != null ? _a4 : createVNode(VStepperVerticalActions, {
                "onClick:next": onClickNext,
                "onClick:prev": onClickPrev
              }, {
                prev: slots.prev ? () => {
                  var _a42;
                  return (_a42 = slots.prev) == null ? void 0 : _a42.call(slots, actionProps.value);
                } : void 0,
                next: slots.next ? () => {
                  var _a42;
                  return (_a42 = slots.next) == null ? void 0 : _a42.call(slots, actionProps.value);
                } : void 0
              })];
            }
          })]);
        }
      });
    });
    return {};
  }
});
const makeVStepperVerticalProps = propsFactory({
  prevText: {
    type: String,
    default: "$vuetify.stepper.prev"
  },
  nextText: {
    type: String,
    default: "$vuetify.stepper.next"
  },
  ...makeStepperProps(),
  ...omit(makeVExpansionPanelsProps({
    mandatory: "force",
    variant: "accordion"
  }), ["static"])
}, "VStepperVertical");
const VStepperVertical = genericComponent()({
  name: "VStepperVertical",
  props: makeVStepperVerticalProps(),
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vExpansionPanelsRef = ref();
    const {
      color,
      eager,
      editable,
      prevText,
      nextText,
      hideActions
    } = toRefs(props);
    const model = useProxiedModel(props, "modelValue");
    const items = computed(() => props.items.map((item, index) => {
      const title = getPropertyFromItem(item, props.itemTitle, item);
      const value = getPropertyFromItem(item, props.itemValue, index + 1);
      return {
        title,
        value,
        raw: item
      };
    }));
    provideDefaults({
      VStepperVerticalItem: {
        color,
        eager,
        editable,
        prevText,
        nextText,
        hideActions,
        static: true
      },
      VStepperActions: {
        color
      }
    });
    useRender(() => {
      const expansionPanelProps = VExpansionPanels.filterProps(props);
      return createVNode(VExpansionPanels, mergeProps(expansionPanelProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "ref": vExpansionPanelsRef,
        "class": ["v-stepper", {
          "v-stepper--alt-labels": props.altLabels,
          "v-stepper--flat": props.flat,
          "v-stepper--non-linear": props.nonLinear,
          "v-stepper--mobile": props.mobile
        }, props.class],
        "style": props.style
      }), {
        ...slots,
        default: (_ref2) => {
          var _a;
          let {
            prev,
            next
          } = _ref2;
          return createElementVNode(Fragment, null, [items.value.map((_ref3) => {
            let {
              raw,
              ...item
            } = _ref3;
            return createVNode(VStepperVerticalItem, item, {
              ...slots,
              default: slots[`item.${item.value}`]
            });
          }), (_a = slots.default) == null ? void 0 : _a.call(slots, {
            prev,
            next,
            step: model.value
          })]);
        }
      });
    });
    return {};
  }
});

export { VStepperVertical as V, VStepperVerticalItem as a, VSwitch as b };
//# sourceMappingURL=VStepperVertical-BelP9G9C.mjs.map
