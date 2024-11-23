import { ref, shallowRef, computed, watch, nextTick, createVNode, mergeProps, Fragment, createTextVNode, defineComponent, withCtx, toDisplayString, useSSRContext, reactive, unref, openBlock, createBlock, createCommentVNode, resolveComponent, renderSlot } from 'vue';
import { p as propsFactory, bi as makeSelectProps, D as omit, bj as makeVTextFieldProps, bk as makeTransitionProps, q as genericComponent, t as useLocale, I as useProxiedModel, bl as useItems, E as useTextColor, aZ as wrapInArray, bm as useForm, bn as useScrolling, w as useRender, e as VTextField, bo as VMenu, bp as VList, ay as VListItem, bq as VVirtualScroll, aJ as VCheckboxBtn, T as VAvatar, aq as VIcon, br as ensureValidVNode, ba as VChip, bs as VDefaultsProvider, bt as noop, F as forwardRefs, bw as makeVOverlayProps, bx as VDialogTransition, O as useScopeId, by as VOverlay, bz as VProgressLinear, f as _export_sfc, bu as checkPrintable, bv as matchesSelector, _ as __nuxt_component_1$1, j as useSanctumClient, av as VDivider } from './server.mjs';
import { b as makeFilterProps, u as useFilter } from './app-bar-4n5zyiNx.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
import { V as VBtn } from './VBtn-sH8DNEZb.mjs';
import { TransitionSlide } from '@morev/vue-transitions';
import { defineStore } from 'pinia';
import { V as VSheet, a as VFileInput } from './useSchemas-CkEHQvYm.mjs';

function highlightResult(text, matches, length) {
  if (matches == null) return text;
  if (Array.isArray(matches)) throw new Error("Multiple matches is not implemented");
  return typeof matches === "number" && ~matches ? createVNode(Fragment, null, [createVNode("span", {
    "class": "v-autocomplete__unmask"
  }, [text.substr(0, matches)]), createVNode("span", {
    "class": "v-autocomplete__mask"
  }, [text.substr(matches, length)]), createVNode("span", {
    "class": "v-autocomplete__unmask"
  }, [text.substr(matches + length)])]) : text;
}
const makeVAutocompleteProps = propsFactory({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...makeFilterProps({
    filterKeys: ["title"]
  }),
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...makeTransitionProps({
    transition: false
  })
}, "VAutocomplete");
const VAutocomplete = genericComponent()({
  name: "VAutocomplete",
  props: makeVAutocompleteProps(),
  emits: {
    "update:focused": (focused) => true,
    "update:search": (value) => true,
    "update:modelValue": (value) => true,
    "update:menu": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const isFocused = shallowRef(false);
    const isPristine = shallowRef(true);
    const listHasFocus = shallowRef(false);
    const vMenuRef = ref();
    const vVirtualScrollRef = ref();
    const _menu = useProxiedModel(props, "menu");
    const menu = computed({
      get: () => _menu.value,
      set: (v) => {
        var _a;
        if (_menu.value && !v && ((_a = vMenuRef.value) == null ? void 0 : _a.\u03A8openChildren.size)) return;
        _menu.value = v;
      }
    });
    const selectionIndex = shallowRef(-1);
    const color = computed(() => {
      var _a;
      return (_a = vTextFieldRef.value) == null ? void 0 : _a.color;
    });
    const label = computed(() => menu.value ? props.closeText : props.openText);
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    const search = useProxiedModel(props, "search", "");
    const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(v === null ? [null] : wrapInArray(v)), (v) => {
      var _a;
      const transformed = transformOut(v);
      return props.multiple ? transformed : (_a = transformed[0]) != null ? _a : null;
    });
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : model.value.length;
    });
    const form = useForm();
    const {
      filteredItems,
      getMatches
    } = useFilter(props, items, () => isPristine.value ? "" : search.value);
    const displayItems = computed(() => {
      if (props.hideSelected) {
        return filteredItems.value.filter((filteredItem) => !model.value.some((s) => s.value === filteredItem.value));
      }
      return filteredItems.value;
    });
    const hasChips = computed(() => !!(props.chips || slots.chip));
    const hasSelectionSlot = computed(() => hasChips.value || !!slots.selection);
    const selectedValues = computed(() => model.value.map((selection) => selection.props.value));
    const highlightFirst = computed(() => {
      var _a;
      const selectFirst = props.autoSelectFirst === true || props.autoSelectFirst === "exact" && search.value === ((_a = displayItems.value[0]) == null ? void 0 : _a.title);
      return selectFirst && displayItems.value.length > 0 && !isPristine.value && !listHasFocus.value;
    });
    const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || props.readonly || (form == null ? void 0 : form.isReadonly.value));
    const listRef = ref();
    const listEvents = useScrolling(listRef, vTextFieldRef);
    function onClear(e) {
      if (props.openOnClear) {
        menu.value = true;
      }
      search.value = "";
    }
    function onMousedownControl() {
      if (menuDisabled.value) return;
      menu.value = true;
    }
    function onMousedownMenuIcon(e) {
      if (menuDisabled.value) return;
      if (isFocused.value) {
        e.preventDefault();
        e.stopPropagation();
      }
      menu.value = !menu.value;
    }
    function onListKeydown(e) {
      var _a;
      if (checkPrintable(e)) {
        (_a = vTextFieldRef.value) == null ? void 0 : _a.focus();
      }
    }
    function onKeydown(e) {
      var _a, _b, _c;
      if (props.readonly || (form == null ? void 0 : form.isReadonly.value)) return;
      const selectionStart = vTextFieldRef.value.selectionStart;
      const length = model.value.length;
      if (selectionIndex.value > -1 || ["Enter", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
      }
      if (["Enter", "ArrowDown"].includes(e.key)) {
        menu.value = true;
      }
      if (["Escape"].includes(e.key)) {
        menu.value = false;
      }
      if (highlightFirst.value && ["Enter", "Tab"].includes(e.key) && !model.value.some((_ref2) => {
        let {
          value
        } = _ref2;
        return value === displayItems.value[0].value;
      })) {
        select(displayItems.value[0]);
      }
      if (e.key === "ArrowDown" && highlightFirst.value) {
        (_a = listRef.value) == null ? void 0 : _a.focus("next");
      }
      if (["Backspace", "Delete"].includes(e.key)) {
        if (!props.multiple && hasSelectionSlot.value && model.value.length > 0 && !search.value) return select(model.value[0], false);
        if (~selectionIndex.value) {
          const originalSelectionIndex = selectionIndex.value;
          select(model.value[selectionIndex.value], false);
          selectionIndex.value = originalSelectionIndex >= length - 1 ? length - 2 : originalSelectionIndex;
        } else if (e.key === "Backspace" && !search.value) {
          selectionIndex.value = length - 1;
        }
      }
      if (!props.multiple) return;
      if (e.key === "ArrowLeft") {
        if (selectionIndex.value < 0 && selectionStart > 0) return;
        const prev = selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1;
        if (model.value[prev]) {
          selectionIndex.value = prev;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value.setSelectionRange((_b = search.value) == null ? void 0 : _b.length, (_c = search.value) == null ? void 0 : _c.length);
        }
      }
      if (e.key === "ArrowRight") {
        if (selectionIndex.value < 0) return;
        const next = selectionIndex.value + 1;
        if (model.value[next]) {
          selectionIndex.value = next;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value.setSelectionRange(0, 0);
        }
      }
    }
    function onChange(e) {
      if (matchesSelector(vTextFieldRef.value) || matchesSelector(vTextFieldRef.value)) ;
    }
    function onAfterEnter() {
      var _a;
      if (props.eager) {
        (_a = vVirtualScrollRef.value) == null ? void 0 : _a.calculateVisibleItems();
      }
    }
    function onAfterLeave() {
      var _a;
      if (isFocused.value) {
        isPristine.value = true;
        (_a = vTextFieldRef.value) == null ? void 0 : _a.focus();
      }
    }
    function onFocusin(e) {
      isFocused.value = true;
      setTimeout(() => {
        listHasFocus.value = true;
      });
    }
    function onFocusout(e) {
      listHasFocus.value = false;
    }
    function onUpdateModelValue(v) {
      if (v == null || v === "" && !props.multiple && !hasSelectionSlot.value) model.value = [];
    }
    const isSelecting = shallowRef(false);
    function select(item) {
      let set = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (!item || item.props.disabled) return;
      if (props.multiple) {
        const index = model.value.findIndex((selection) => props.valueComparator(selection.value, item.value));
        const add = set == null ? !~index : set;
        if (~index) {
          const value = add ? [...model.value, item] : [...model.value];
          value.splice(index, 1);
          model.value = value;
        } else if (add) {
          model.value = [...model.value, item];
        }
        if (props.clearOnSelect) {
          search.value = "";
        }
      } else {
        const add = set !== false;
        model.value = add ? [item] : [];
        search.value = add && !hasSelectionSlot.value ? item.title : "";
        nextTick(() => {
          menu.value = false;
          isPristine.value = true;
        });
      }
    }
    watch(isFocused, (val, oldVal) => {
      var _a2;
      var _a;
      if (val === oldVal) return;
      if (val) {
        isSelecting.value = true;
        search.value = props.multiple || hasSelectionSlot.value ? "" : String((_a2 = (_a = model.value.at(-1)) == null ? void 0 : _a.props.title) != null ? _a2 : "");
        isPristine.value = true;
        nextTick(() => isSelecting.value = false);
      } else {
        if (!props.multiple && search.value == null) model.value = [];
        menu.value = false;
        if (!model.value.some((_ref3) => {
          let {
            title
          } = _ref3;
          return title === search.value;
        })) search.value = "";
        selectionIndex.value = -1;
      }
    });
    watch(search, (val) => {
      if (!isFocused.value || isSelecting.value) return;
      if (val) menu.value = true;
      isPristine.value = !val;
    });
    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        displayItems.value.findIndex((item) => model.value.some((s) => item.value === s.value));
      }
    });
    watch(() => props.items, (newVal, oldVal) => {
      if (menu.value) return;
      if (isFocused.value && !oldVal.length && newVal.length) {
        menu.value = true;
      }
    });
    useRender(() => {
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots["prepend-item"] || slots["append-item"] || slots["no-data"]);
      const isDirty = model.value.length > 0;
      const textFieldProps = VTextField.filterProps(props);
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": search.value,
        "onUpdate:modelValue": [($event) => search.value = $event, onUpdateModelValue],
        "focused": isFocused.value,
        "onUpdate:focused": ($event) => isFocused.value = $event,
        "validationValue": model.externalValue,
        "counterValue": counterValue.value,
        "dirty": isDirty,
        "onChange": onChange,
        "class": ["v-autocomplete", `v-autocomplete--${props.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": menu.value,
          "v-autocomplete--chips": !!props.chips,
          "v-autocomplete--selection-slot": !!hasSelectionSlot.value,
          "v-autocomplete--selecting-index": selectionIndex.value > -1
        }, props.class],
        "style": props.style,
        "readonly": props.readonly,
        "placeholder": isDirty ? void 0 : props.placeholder,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onKeydown": onKeydown
      }), {
        ...slots,
        default: () => createVNode(Fragment, null, [createVNode(VMenu, mergeProps({
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": ($event) => menu.value = $event,
          "activator": "parent",
          "contentClass": "v-autocomplete__content",
          "disabled": menuDisabled.value,
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "transition": props.transition,
          "onAfterEnter": onAfterEnter,
          "onAfterLeave": onAfterLeave
        }, props.menuProps), {
          default: () => {
            var _a;
            return [hasList && createVNode(VList, mergeProps({
              "ref": listRef,
              "selected": selectedValues.value,
              "selectStrategy": props.multiple ? "independent" : "single-independent",
              "onMousedown": (e) => e.preventDefault(),
              "onKeydown": onListKeydown,
              "onFocusin": onFocusin,
              "onFocusout": onFocusout,
              "tabindex": "-1",
              "aria-live": "polite",
              "color": (_a = props.itemColor) != null ? _a : props.color
            }, listEvents, props.listProps), {
              default: () => {
                var _a3;
                var _a2, _b, _c;
                return [(_a2 = slots["prepend-item"]) == null ? void 0 : _a2.call(slots), !displayItems.value.length && !props.hideNoData && ((_a3 = (_b = slots["no-data"]) == null ? void 0 : _b.call(slots)) != null ? _a3 : createVNode(VListItem, {
                  "title": t(props.noDataText)
                }, null)), createVNode(VVirtualScroll, {
                  "ref": vVirtualScrollRef,
                  "renderless": true,
                  "items": displayItems.value
                }, {
                  default: (_ref4) => {
                    var _a4;
                    var _a22;
                    let {
                      item,
                      index,
                      itemRef
                    } = _ref4;
                    const itemProps = mergeProps(item.props, {
                      ref: itemRef,
                      key: index,
                      active: highlightFirst.value && index === 0 ? true : void 0,
                      onClick: () => select(item, null)
                    });
                    return (_a4 = (_a22 = slots.item) == null ? void 0 : _a22.call(slots, {
                      item,
                      index,
                      props: itemProps
                    })) != null ? _a4 : createVNode(VListItem, mergeProps(itemProps, {
                      "role": "option"
                    }), {
                      prepend: (_ref5) => {
                        let {
                          isSelected
                        } = _ref5;
                        return createVNode(Fragment, null, [props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                          "key": item.value,
                          "modelValue": isSelected,
                          "ripple": false,
                          "tabindex": "-1"
                        }, null) : void 0, item.props.prependAvatar && createVNode(VAvatar, {
                          "image": item.props.prependAvatar
                        }, null), item.props.prependIcon && createVNode(VIcon, {
                          "icon": item.props.prependIcon
                        }, null)]);
                      },
                      title: () => {
                        var _a5;
                        var _a32, _b2;
                        return isPristine.value ? item.title : highlightResult(item.title, (_a32 = getMatches(item)) == null ? void 0 : _a32.title, (_a5 = (_b2 = search.value) == null ? void 0 : _b2.length) != null ? _a5 : 0);
                      }
                    });
                  }
                }), (_c = slots["append-item"]) == null ? void 0 : _c.call(slots)];
              }
            })];
          }
        }), model.value.map((item, index) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item, false);
          }
          const slotProps = {
            "onClick:close": onChipClose,
            onKeydown(e) {
              if (e.key !== "Enter" && e.key !== " ") return;
              e.preventDefault();
              e.stopPropagation();
              onChipClose(e);
            },
            onMousedown(e) {
              e.preventDefault();
              e.stopPropagation();
            },
            modelValue: true,
            "onUpdate:modelValue": void 0
          };
          const hasSlot = hasChips.value ? !!slots.chip : !!slots.selection;
          const slotContent = hasSlot ? ensureValidVNode(hasChips.value ? slots.chip({
            item,
            index,
            props: slotProps
          }) : slots.selection({
            item,
            index
          })) : void 0;
          if (hasSlot && !slotContent) return void 0;
          return createVNode("div", {
            "key": item.value,
            "class": ["v-autocomplete__selection", index === selectionIndex.value && ["v-autocomplete__selection--selected", textColorClasses.value]],
            "style": index === selectionIndex.value ? textColorStyles.value : {}
          }, [hasChips.value ? !slots.chip ? createVNode(VChip, mergeProps({
            "key": "chip",
            "closable": props.closableChips,
            "size": "small",
            "text": item.title,
            "disabled": item.props.disabled
          }, slotProps), null) : createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: "small",
                text: item.title
              }
            }
          }, {
            default: () => [slotContent]
          }) : slotContent != null ? slotContent : createVNode("span", {
            "class": "v-autocomplete__selection-text"
          }, [item.title, props.multiple && index < model.value.length - 1 && createVNode("span", {
            "class": "v-autocomplete__selection-comma"
          }, [createTextVNode(",")])])]);
        })]),
        "append-inner": function() {
          var _a;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(Fragment, null, [(_a = slots["append-inner"]) == null ? void 0 : _a.call(slots, ...args), props.menuIcon ? createVNode(VIcon, {
            "class": "v-autocomplete__menu-icon",
            "icon": props.menuIcon,
            "onMousedown": onMousedownMenuIcon,
            "onClick": noop,
            "aria-label": t(label.value),
            "title": t(label.value),
            "tabindex": "-1"
          }, null) : void 0]);
        }
      });
    });
    return forwardRefs({
      isFocused,
      isPristine,
      menu,
      search,
      filteredItems,
      select
    }, vTextFieldRef);
  }
});
const makeVDialogProps = propsFactory({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: true
  },
  scrollable: Boolean,
  ...makeVOverlayProps({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: VDialogTransition
    },
    zIndex: 2400
  })
}, "VDialog");
const VDialog = genericComponent()({
  name: "VDialog",
  props: makeVDialogProps(),
  emits: {
    "update:modelValue": (value) => true,
    afterEnter: () => true,
    afterLeave: () => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const overlay = ref();
    function onAfterEnter() {
      var _a;
      emit("afterEnter");
      if (((_a = overlay.value) == null ? void 0 : _a.contentEl) && !overlay.value.contentEl.contains((void 0).activeElement)) {
        overlay.value.contentEl.focus({
          preventScroll: true
        });
      }
    }
    function onAfterLeave() {
      emit("afterLeave");
    }
    watch(isActive, async (val) => {
      var _a;
      if (!val) {
        await nextTick();
        (_a = overlay.value.activatorEl) == null ? void 0 : _a.focus({
          preventScroll: true
        });
      }
    });
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      const activatorProps = mergeProps({
        "aria-haspopup": "dialog"
      }, props.activatorProps);
      const contentProps = mergeProps({
        tabindex: -1
      }, props.contentProps);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-dialog", {
          "v-dialog--fullscreen": props.fullscreen,
          "v-dialog--scrollable": props.scrollable
        }, props.class],
        "style": props.style
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "aria-modal": "true",
        "activatorProps": activatorProps,
        "contentProps": contentProps,
        "height": !props.fullscreen ? props.height : void 0,
        "width": !props.fullscreen ? props.width : void 0,
        "maxHeight": !props.fullscreen ? props.maxHeight : void 0,
        "maxWidth": !props.fullscreen ? props.maxWidth : void 0,
        "role": "dialog",
        "onAfterEnter": onAfterEnter,
        "onAfterLeave": onAfterLeave
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": "VDialog"
          }, {
            default: () => {
              var _a;
              return [(_a = slots.default) == null ? void 0 : _a.call(slots, ...args)];
            }
          });
        }
      });
    });
    return forwardRefs({}, overlay);
  }
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "app-bar-cat-btn",
  __ssrInlineRender: true,
  props: {
    text: { default: "prop name not set" },
    icon: { default: "futzo-icon:plus" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(ssrRenderComponent(VBtn, mergeProps({
        class: "app-bar-cat-btn",
        size: "large",
        onClick: ($event) => emits("click")
      }, _attrs), {
        prepend: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, { name: _ctx.icon }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, { name: _ctx.icon }, null, 8, ["name"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ${ssrInterpolate(_ctx.text)}`);
          } else {
            return [
              createTextVNode(" " + toDisplayString(_ctx.text), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/app-bar-cat-btn.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  name: "TransitionSlide",
  inheritAttrs: false,
  components: { TheTransition: TransitionSlide }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_the_transition = resolveComponent("the-transition");
  _push(ssrRenderComponent(_component_the_transition, mergeProps(_ctx.$attrs, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.vue-transitions/TransitionSlide.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
const useCategoryStore = defineStore("categoryStore", () => {
  const categories = ref([]);
  const formats = ref([]);
  const fetchCategories = async () => {
    const client = useSanctumClient();
    categories.value = await client("/api/v1/admin/categories");
  };
  const fetchFormats = async () => {
    const client = useSanctumClient();
    formats.value = await client("/api/v1/admin/tournaments/formats");
  };
  return {
    categories,
    formats,
    fetchFormats,
    fetchCategories
  };
});
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const MAX_SIZE = 2;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "drag-drop-image",
  __ssrInlineRender: true,
  props: {
    image: {}
  },
  emits: ["removeImage", "imageDropped"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const state = reactive({
      dragging: false,
      dropped: false,
      interval: null,
      value: 10,
      bufferValue: 20
    });
    const border = computed(() => {
      if (image.value.hasError) return "";
      return !state.dragging && !state.dropped ? "primary thin" : "primary sm opacity-100";
    });
    const emits = __emit;
    const props = __props;
    const image = ref(props.image);
    const imageRef = ref(null);
    const formatImageName = computed(() => {
      return image.value.name.replace(/[-_]/g, " ").charAt(0).toUpperCase() + image.value.name.slice(1).replace(/[-_]/g, " ").substring(0, 20) + (image.value.name.length > 20 ? "..." : "");
    });
    const validateSize = () => {
      const imageSize = image.value.size / (1024 * 1024);
      if (imageSize > MAX_SIZE) {
        image.value.errors = {
          name: imageSize.toFixed(2) + "MB",
          description: "La imagen es muy pesada, prueba con otra.",
          action: "reintentar"
        };
        image.value.hasError = true;
      }
    };
    const eventHandler = (e) => {
      e.preventDefault();
      state.dragging = false;
      let files = [];
      if (e.type === "drop") {
        files = e.dataTransfer.files;
      } else if (e.type === "change") {
        files = e.target.files;
      }
      if (files.length) {
        startBuffer();
        state.dropped = true;
        image.value.file = files[0];
        image.value.name = files[0].name;
        image.value.size = files[0].size;
        emits("imageDropped", files[0]);
      }
    };
    const startBuffer = () => {
      state.interval = setInterval();
    };
    const removeImage2 = () => {
      image.value.file = null;
      image.value.name = "";
      image.value.size = 0;
      image.value.hasError = false;
      image.value.errors = {
        name: "",
        description: "",
        action: ""
      };
      state.dragging = false;
      state.dropped = false;
      state.value = 10;
      state.bufferValue = 20;
      emits("removeImage");
    };
    const loadImage = () => {
      state.value = 100;
      state.bufferValue = 100;
      state.dropped = true;
      image.value.name = "imagen.jpg";
    };
    watch(
      () => state.value,
      (newValue) => {
        if (newValue >= 100) {
          clearInterval(state.interval);
        }
      }
    );
    watch(
      () => image.value.size,
      () => {
        validateSize();
      }
    );
    const showInput = () => {
      const input = imageRef.value.$el.querySelector("input");
      input.click();
    };
    __expose({
      loadImage
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "d-flex",
          unref(image).hasError ? " border-error border-md border-opacity-100  rounded rounded-lg" : ""
        ]
      }, _attrs))}>`);
      _push(ssrRenderComponent(VAvatar, {
        color: !unref(state).dropped ? "background" : "surface",
        size: "64",
        class: "mr-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(state).dropped) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "futzo-icon:image-plus",
                class: "image-plus"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(state).dropped) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "futzo-icon:file-type-img",
                class: "file-type-img"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !unref(state).dropped ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                name: "futzo-icon:image-plus",
                class: "image-plus"
              })) : createCommentVNode("", true),
              unref(state).dropped ? (openBlock(), createBlock(_component_Icon, {
                key: 1,
                name: "futzo-icon:file-type-img",
                class: "file-type-img"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VSheet, {
        border: unref(border),
        width: "100%",
        class: "d-flex flex-column align-center rounded-lg pa-2",
        onDragover: () => {
        },
        onDrop: [eventHandler, ($event) => unref(state).dragging = false],
        onDragenter: ($event) => unref(state).dragging = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            if (!unref(state).dropped) {
              _push2(`<div class="d-flex justify-center align-center flex-column"${_scopeId}><div${_scopeId}>`);
              _push2(ssrRenderComponent(VFileInput, {
                hidden: true,
                class: "d-none",
                ref_key: "imageRef",
                ref: imageRef,
                onChange: eventHandler
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(VBtn, {
                variant: "text",
                color: "primary",
                class: "text-body-1 px-1",
                onClick: showInput
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Haz clic para a\xF1adir `);
                  } else {
                    return [
                      createTextVNode("Haz clic para a\xF1adir ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<span class="text-body-1"${_scopeId}>o arrastra aqu\xED</span></div><p class="text-caption"${_scopeId}>SVG, PNG o JPG (max. 1080x1080px)</p></div>`);
            } else {
              _push2(`<div class="d-flex justify-space-between align-start h-100 w-100 flex-column"${_scopeId}><div class="d-flex justify-space-between w-100 align-center"${_scopeId}><p class="text-body-1"${_scopeId}>${ssrInterpolate(unref(image).hasError ? (_a = unref(image).errors) == null ? void 0 : _a.name : unref(formatImageName))}</p>`);
              _push2(ssrRenderComponent(VBtn, {
                icon: true,
                size: "default",
                slim: "",
                flat: "",
                density: "compact",
                color: "background",
                onClick: removeImage2
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (!unref(image).hasError) {
                      _push3(ssrRenderComponent(_component_Icon, {
                        name: "futzo-icon:trash",
                        class: "trash"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(_component_Icon, {
                        name: "futzo-icon:trash-error",
                        class: "trash-error"
                      }, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      !unref(image).hasError ? (openBlock(), createBlock(_component_Icon, {
                        key: 0,
                        name: "futzo-icon:trash",
                        class: "trash"
                      })) : (openBlock(), createBlock(_component_Icon, {
                        key: 1,
                        name: "futzo-icon:trash-error",
                        class: "trash-error"
                      }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              if (!unref(image).hasError) {
                _push2(`<div class="d-flex w-100 justify-center align-center"${_scopeId}>`);
                _push2(ssrRenderComponent(VProgressLinear, {
                  modelValue: unref(state).value,
                  "onUpdate:modelValue": ($event) => unref(state).value = $event,
                  "buffer-value": unref(state).bufferValue,
                  color: "primary",
                  rounded: "",
                  max: "100"
                }, null, _parent2, _scopeId));
                _push2(`<span class="ml-2 text-caption"${_scopeId}>${ssrInterpolate(unref(state).value.toFixed(0))}%</span></div>`);
              } else {
                _push2(`<div class="w-100"${_scopeId}><p class="text-caption"${_scopeId}>${ssrInterpolate((_b = unref(image).errors) == null ? void 0 : _b.description)}</p>`);
                _push2(ssrRenderComponent(VBtn, {
                  onClick: removeImage2,
                  density: "compact",
                  class: "pa-0 text-capitalize",
                  variant: "text"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    var _a2, _b2;
                    if (_push3) {
                      _push3(`${ssrInterpolate((_a2 = unref(image).errors) == null ? void 0 : _a2.action)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString((_b2 = unref(image).errors) == null ? void 0 : _b2.action), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div>`);
            }
          } else {
            return [
              !unref(state).dropped ? (openBlock(), createBlock("div", {
                key: 0,
                class: "d-flex justify-center align-center flex-column"
              }, [
                createVNode("div", null, [
                  createVNode(VFileInput, {
                    hidden: true,
                    class: "d-none",
                    ref_key: "imageRef",
                    ref: imageRef,
                    onChange: eventHandler
                  }, null, 512),
                  createVNode(VBtn, {
                    variant: "text",
                    color: "primary",
                    class: "text-body-1 px-1",
                    onClick: showInput
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Haz clic para a\xF1adir ")
                    ]),
                    _: 1
                  }),
                  createVNode("span", { class: "text-body-1" }, "o arrastra aqu\xED")
                ]),
                createVNode("p", { class: "text-caption" }, "SVG, PNG o JPG (max. 1080x1080px)")
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "d-flex justify-space-between align-start h-100 w-100 flex-column"
              }, [
                createVNode("div", { class: "d-flex justify-space-between w-100 align-center" }, [
                  createVNode("p", { class: "text-body-1" }, toDisplayString(unref(image).hasError ? (_c = unref(image).errors) == null ? void 0 : _c.name : unref(formatImageName)), 1),
                  createVNode(VBtn, {
                    icon: true,
                    size: "default",
                    slim: "",
                    flat: "",
                    density: "compact",
                    color: "background",
                    onClick: removeImage2
                  }, {
                    default: withCtx(() => [
                      !unref(image).hasError ? (openBlock(), createBlock(_component_Icon, {
                        key: 0,
                        name: "futzo-icon:trash",
                        class: "trash"
                      })) : (openBlock(), createBlock(_component_Icon, {
                        key: 1,
                        name: "futzo-icon:trash-error",
                        class: "trash-error"
                      }))
                    ]),
                    _: 1
                  })
                ]),
                !unref(image).hasError ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "d-flex w-100 justify-center align-center"
                }, [
                  createVNode(VProgressLinear, {
                    modelValue: unref(state).value,
                    "onUpdate:modelValue": ($event) => unref(state).value = $event,
                    "buffer-value": unref(state).bufferValue,
                    color: "primary",
                    rounded: "",
                    max: "100"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "buffer-value"]),
                  createVNode("span", { class: "ml-2 text-caption" }, toDisplayString(unref(state).value.toFixed(0)) + "%", 1)
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "w-100"
                }, [
                  createVNode("p", { class: "text-caption" }, toDisplayString((_d = unref(image).errors) == null ? void 0 : _d.description), 1),
                  createVNode(VBtn, {
                    onClick: removeImage2,
                    density: "compact",
                    class: "pa-0 text-capitalize",
                    variant: "text"
                  }, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        createTextVNode(toDisplayString((_a2 = unref(image).errors) == null ? void 0 : _a2.action), 1)
                      ];
                    }),
                    _: 1
                  })
                ]))
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/drag-drop-image.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const imageForm = ref({
  file: null,
  name: "",
  size: 0
});
const dragDropImageRef = ref();
const saveImage = (file) => {
  imageForm.value.file = file;
  imageForm.value.name = file.name;
  imageForm.value.size = file.size;
};
const removeImage = () => {
  imageForm.value.file = null;
  imageForm.value.name = "";
  imageForm.value.size = 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "stepper-dot",
  __ssrInlineRender: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    completed: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    addDivider: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const color = computed(() => __props.active ? "#9155FD" : "#E0E0E0");
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        "--5fabd250": unref(color)
      } };
      _push(`<!--[--><div${ssrRenderAttrs(mergeProps({ class: "step-dot-container" }, _cssVars))}><div class="d-flex flex-column align-center text-center">`);
      if (__props.active && !__props.completed) {
        _push(`<svg class="step-dot" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.333984" width="24" height="24" rx="12" fill="#9155FD"></rect><circle cx="12.334" cy="12" r="4" fill="white"></circle></svg>`);
      } else if (__props.completed) {
        _push(`<svg class="step-dot" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.333984" width="24" height="24" rx="12" fill="#9155FD"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M17.096 7.39016L9.93602 14.3002L8.03602 12.2702C7.68602 11.9402 7.13602 11.9202 6.73602 12.2002C6.34602 12.4902 6.23602 13.0002 6.47602 13.4102L8.72602 17.0702C8.94602 17.4102 9.32601 17.6202 9.75601 17.6202C10.166 17.6202 10.556 17.4102 10.776 17.0702C11.136 16.6002 18.006 8.41016 18.006 8.41016C18.906 7.49016 17.816 6.68016 17.096 7.38016V7.39016Z" fill="white"></path></svg>`);
      } else {
        _push(`<svg class="step-dot" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.333984" width="24" height="24" rx="12" fill="#E0E0E0"></rect><circle cx="12.334" cy="12" r="4" fill="white"></circle></svg>`);
      }
      _push(`<small class="${ssrRenderClass([__props.active ? "active" : "", "dot-label"])}">${ssrInterpolate(__props.label)}</small></div></div>`);
      if (__props.addDivider) {
        _push(ssrRenderComponent(VDivider, _cssVars, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/stepper-dot.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "step-indicator",
  __ssrInlineRender: true,
  props: {
    formSteps: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "steps-container" }, _attrs))} data-v-7eca3a56><!--[-->`);
      ssrRenderList(props.formSteps.steps, (step, index) => {
        _push(ssrRenderComponent(_sfc_main$1, {
          active: props.formSteps.current === step.step,
          completed: step.completed,
          label: step.label,
          "add-divider": index !== props.formSteps.steps.length - 1
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/step-indicator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const StepIndicator = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7eca3a56"]]);

export { StepIndicator as S, VDialog as V, _sfc_main$4 as _, _sfc_main$2 as a, VAutocomplete as b, __nuxt_component_0 as c, dragDropImageRef as d, setInterval as e, imageForm as i, removeImage as r, saveImage as s, useCategoryStore as u };
//# sourceMappingURL=step-indicator-yUBOEq6r.mjs.map
