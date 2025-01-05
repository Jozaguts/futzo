import { ref, computed, shallowRef, watch, provide, createVNode, withDirectives, resolveDirective, inject, vShow, mergeProps, Fragment, toRef, useSSRContext, defineAsyncComponent, defineComponent, withCtx, unref, createTextVNode, toDisplayString, isRef, openBlock, createBlock, nextTick, withModifiers } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer';
import { p as propsFactory, m as makeComponentProps, n as makeTagProps, o as makeThemeProps, q as genericComponent, r as provideTheme, s as useRtl, t as useLocale, v as useGroup, w as useRender, x as makeGroupItemProps, y as makeLazyProps, z as useGroupItem, A as useSsrBoot, B as useLazy, M as MaybeTransition, D as omit, E as useTextColor, F as forwardRefs, I as useProxiedModel, J as makeVSlideGroupProps, K as makeDensityProps, L as useDensity, N as useBackgroundColor, O as useScopeId, P as provideDefaults, Q as VSlideGroup, C as convertToUnit, S as useAuthStore, V as VCard, b as VCardItem, c as VCardTitle, W as VCardSubtitle, d as VCardText, G as animate, H as standardEasing, R as isObject, T as VAvatar, U as VImg, e as VTextField, X as Gl, l as keys, _ as __nuxt_component_0$1 } from './server.mjs';
import { storeToRefs } from 'pinia';
import { V as VBtn, m as makeVBtnProps, a as VProgressCircular } from './VBtn-DMHWn55H.mjs';
import { V as VFileInput } from './VFileInput-fBubLwAb.mjs';
import { _ as __nuxt_component_1 } from './client-only-Db1Q_2tj.mjs';
import { u as useSchemas } from './useSchemas-CqEBlE8b.mjs';
import { V as VForm } from './VForm-C8SPeugr.mjs';
import { V as VRow, a as VCol } from './VRow-BbW5rOE9.mjs';
import { V as VSheet } from './VSheet-UXYurn5r.mjs';
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
import '@formkit/auto-animate/vue';
import 'awesome-phonenumber';
import './vee-validate-DdIKuPJn.mjs';
import 'yup';

const handleGesture = (wrapper) => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;
  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }
  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};
function touchstart(event, wrapper) {
  var _a;
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  (_a = wrapper.start) == null ? void 0 : _a.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function touchend(event, wrapper) {
  var _a;
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  (_a = wrapper.end) == null ? void 0 : _a.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}
function touchmove(event, wrapper) {
  var _a;
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  (_a = wrapper.move) == null ? void 0 : _a.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function createHandlers() {
  let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: (e) => touchstart(e, wrapper),
    touchend: (e) => touchend(e, wrapper),
    touchmove: (e) => touchmove(e, wrapper)
  };
}
function mounted(el, binding) {
  var _a2, _b;
  var _a;
  const value = binding.value;
  const target = (value == null ? void 0 : value.parent) ? el.parentElement : el;
  const options = (_a2 = value == null ? void 0 : value.options) != null ? _a2 : {
    passive: true
  };
  const uid = (_a = binding.instance) == null ? void 0 : _a.$.uid;
  if (!target || !uid) return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = (_b = target._touchHandlers) != null ? _b : /* @__PURE__ */ Object.create(null);
  target._touchHandlers[uid] = handlers;
  keys(handlers).forEach((eventName) => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}
function unmounted(el, binding) {
  var _a, _b;
  const target = ((_a = binding.value) == null ? void 0 : _a.parent) ? el.parentElement : el;
  const uid = (_b = binding.instance) == null ? void 0 : _b.$.uid;
  if (!(target == null ? void 0 : target._touchHandlers) || !uid) return;
  const handlers = target._touchHandlers[uid];
  keys(handlers).forEach((eventName) => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid];
}
const Touch = {
  mounted,
  unmounted
};
const VWindowSymbol = Symbol.for("vuetify:v-window");
const VWindowGroupSymbol = Symbol.for("vuetify:v-window-group");
const makeVWindowProps = propsFactory({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || v === "hover"
  },
  touch: {
    type: [Object, Boolean],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VWindow");
const VWindow = genericComponent()({
  name: "VWindow",
  directives: {
    Touch
  },
  props: makeVWindowProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isRtl
    } = useRtl();
    const {
      t
    } = useLocale();
    const group = useGroup(props, VWindowGroupSymbol);
    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
    const isReversed = shallowRef(false);
    const transition = computed(() => {
      const axis = props.direction === "vertical" ? "y" : "x";
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? "-reverse" : "";
      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = shallowRef(0);
    const transitionHeight = ref(void 0);
    const activeIndex = computed(() => {
      return group.items.value.findIndex((item) => group.selected.value.includes(item.id));
    });
    watch(activeIndex, (newVal, oldVal) => {
      const itemsLength = group.items.value.length;
      const lastIndex = itemsLength - 1;
      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal;
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = true;
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = false;
      } else {
        isReversed.value = newVal < oldVal;
      }
    });
    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef
    });
    const canMoveBack = computed(() => props.continuous || activeIndex.value !== 0);
    const canMoveForward = computed(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
    function prev() {
      canMoveBack.value && group.prev();
    }
    function next() {
      canMoveForward.value && group.next();
    }
    const arrows = computed(() => {
      const arrows2 = [];
      const prevProps = {
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? "right" : "left"}`,
        onClick: group.prev,
        "aria-label": t("$vuetify.carousel.prev")
      };
      arrows2.push(canMoveBack.value ? slots.prev ? slots.prev({
        props: prevProps
      }) : createVNode(VBtn, prevProps, null) : createVNode("div", null, null));
      const nextProps = {
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? "left" : "right"}`,
        onClick: group.next,
        "aria-label": t("$vuetify.carousel.next")
      };
      arrows2.push(canMoveForward.value ? slots.next ? slots.next({
        props: nextProps
      }) : createVNode(VBtn, nextProps, null) : createVNode("div", null, null));
      return arrows2;
    });
    const touchOptions = computed(() => {
      if (props.touch === false) return props.touch;
      const options = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        start: (_ref2) => {
          let {
            originalEvent
          } = _ref2;
          originalEvent.stopPropagation();
        }
      };
      return {
        ...options,
        ...props.touch === true ? {} : props.touch
      };
    });
    useRender(() => withDirectives(createVNode(props.tag, {
      "ref": rootRef,
      "class": ["v-window", {
        "v-window--show-arrows-on-hover": props.showArrows === "hover"
      }, themeClasses.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a, _b;
        return [createVNode("div", {
          "class": "v-window__container",
          "style": {
            height: transitionHeight.value
          }
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
          group
        }), props.showArrows !== false && createVNode("div", {
          "class": "v-window__controls"
        }, [arrows.value])]), (_b = slots.additional) == null ? void 0 : _b.call(slots, {
          group
        })];
      }
    }), [[resolveDirective("touch"), touchOptions.value]]));
    return {
      group
    };
  }
});
const makeVWindowItemProps = propsFactory({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...makeComponentProps(),
  ...makeGroupItemProps(),
  ...makeLazyProps()
}, "VWindowItem");
const VWindowItem = genericComponent()({
  name: "VWindowItem",
  directives: {
    Touch
  },
  props: makeVWindowItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const window = inject(VWindowSymbol);
    const groupItem = useGroupItem(props, VWindowGroupSymbol);
    const {
      isBooted
    } = useSsrBoot();
    if (!window || !groupItem) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const isTransitioning = shallowRef(false);
    const hasTransition = computed(() => isBooted.value && (window.isReversed.value ? props.reverseTransition !== false : props.transition !== false));
    function onAfterTransition() {
      if (!isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = false;
      if (window.transitionCount.value > 0) {
        window.transitionCount.value -= 1;
        if (window.transitionCount.value === 0) {
          window.transitionHeight.value = void 0;
        }
      }
    }
    function onBeforeTransition() {
      var _a;
      if (isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = true;
      if (window.transitionCount.value === 0) {
        window.transitionHeight.value = convertToUnit((_a = window.rootRef.value) == null ? void 0 : _a.clientHeight);
      }
      window.transitionCount.value += 1;
    }
    function onTransitionCancelled() {
      onAfterTransition();
    }
    function onEnterTransition(el) {
      if (!isTransitioning.value) {
        return;
      }
      nextTick(() => {
        if (!hasTransition.value || !isTransitioning.value || !window) {
          return;
        }
        window.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }
    const transition = computed(() => {
      const name = window.isReversed.value ? props.reverseTransition : props.transition;
      return !hasTransition.value ? false : {
        name: typeof name !== "string" ? window.transition.value : name,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition
      };
    });
    const {
      hasContent
    } = useLazy(props, groupItem.isSelected);
    useRender(() => createVNode(MaybeTransition, {
      "transition": transition.value,
      "disabled": !isBooted.value
    }, {
      default: () => {
        var _a;
        return [withDirectives(createVNode("div", {
          "class": ["v-window-item", groupItem.selectedClass.value, props.class],
          "style": props.style
        }, [hasContent.value && ((_a = slots.default) == null ? void 0 : _a.call(slots))]), [[vShow, groupItem.isSelected.value]])];
      }
    }));
    return {
      groupItem
    };
  }
});
const VTabsSymbol = Symbol.for("vuetify:v-tabs");
const makeVTabProps = propsFactory({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...omit(makeVBtnProps({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab");
const VTab = genericComponent()({
  name: "VTab",
  props: makeVTabProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      textColorClasses: sliderColorClasses,
      textColorStyles: sliderColorStyles
    } = useTextColor(props, "sliderColor");
    const rootEl = ref();
    const sliderEl = ref();
    const isHorizontal = computed(() => props.direction === "horizontal");
    const isSelected = computed(() => {
      var _a2;
      var _a, _b;
      return (_a2 = (_b = (_a = rootEl.value) == null ? void 0 : _a.group) == null ? void 0 : _b.isSelected.value) != null ? _a2 : false;
    });
    function updateSlider(_ref2) {
      var _a, _b;
      let {
        value
      } = _ref2;
      if (value) {
        const prevEl = (_b = (_a = rootEl.value) == null ? void 0 : _a.$el.parentElement) == null ? void 0 : _b.querySelector(".v-tab--selected .v-tab__slider");
        const nextEl = sliderEl.value;
        if (!prevEl || !nextEl) return;
        const color = getComputedStyle(prevEl).color;
        const prevBox = prevEl.getBoundingClientRect();
        const nextBox = nextEl.getBoundingClientRect();
        const xy = isHorizontal.value ? "x" : "y";
        const XY = isHorizontal.value ? "X" : "Y";
        const rightBottom = isHorizontal.value ? "right" : "bottom";
        const widthHeight = isHorizontal.value ? "width" : "height";
        const prevPos = prevBox[xy];
        const nextPos = nextBox[xy];
        const delta = prevPos > nextPos ? prevBox[rightBottom] - nextBox[rightBottom] : prevBox[xy] - nextBox[xy];
        const origin = Math.sign(delta) > 0 ? isHorizontal.value ? "right" : "bottom" : Math.sign(delta) < 0 ? isHorizontal.value ? "left" : "top" : "center";
        const size = Math.abs(delta) + (Math.sign(delta) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
        const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight]) || 0;
        const initialScale = prevBox[widthHeight] / nextBox[widthHeight] || 0;
        const sigma = 1.5;
        animate(nextEl, {
          backgroundColor: [color, "currentcolor"],
          transform: [`translate${XY}(${delta}px) scale${XY}(${initialScale})`, `translate${XY}(${delta / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, "none"],
          transformOrigin: Array(3).fill(origin)
        }, {
          duration: 225,
          easing: standardEasing
        });
      }
    }
    useRender(() => {
      const btnProps = VBtn.filterProps(props);
      return createVNode(VBtn, mergeProps({
        "symbol": VTabsSymbol,
        "ref": rootEl,
        "class": ["v-tab", props.class],
        "style": props.style,
        "tabindex": isSelected.value ? 0 : -1,
        "role": "tab",
        "aria-selected": String(isSelected.value),
        "active": false
      }, btnProps, attrs, {
        "block": props.fixed,
        "maxWidth": props.fixed ? 300 : void 0,
        "onGroup:selected": updateSlider
      }), {
        ...slots,
        default: () => {
          var _a2;
          var _a;
          return createVNode(Fragment, null, [(_a2 = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _a2 : props.text, !props.hideSlider && createVNode("div", {
            "ref": sliderEl,
            "class": ["v-tab__slider", sliderColorClasses.value],
            "style": sliderColorStyles.value
          }, null)]);
        }
      });
    });
    return forwardRefs({}, rootEl);
  }
});
const makeVTabsWindowProps = propsFactory({
  ...omit(makeVWindowProps(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow");
const VTabsWindow = genericComponent()({
  name: "VTabsWindow",
  props: makeVTabsWindowProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const group = inject(VTabsSymbol, null);
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
        "_as": "VTabsWindow"
      }, windowProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs-window", props.class],
        "style": props.style,
        "mandatory": false,
        "touch": false
      }), slots);
    });
    return {};
  }
});
const makeVTabsWindowItemProps = propsFactory({
  ...makeVWindowItemProps()
}, "VTabsWindowItem");
const VTabsWindowItem = genericComponent()({
  name: "VTabsWindowItem",
  props: makeVTabsWindowItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const windowItemProps = VWindowItem.filterProps(props);
      return createVNode(VWindowItem, mergeProps({
        "_as": "VTabsWindowItem"
      }, windowItemProps, {
        "class": ["v-tabs-window-item", props.class],
        "style": props.style
      }), slots);
    });
    return {};
  }
});
function parseItems(items) {
  if (!items) return [];
  return items.map((item) => {
    if (!isObject(item)) return {
      text: item,
      value: item
    };
    return item;
  });
}
const makeVTabsProps = propsFactory({
  alignTabs: {
    type: String,
    default: "start"
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: void 0
  },
  hideSlider: Boolean,
  sliderColor: String,
  ...makeVSlideGroupProps({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...makeDensityProps(),
  ...makeTagProps()
}, "VTabs");
const VTabs = genericComponent()({
  name: "VTabs",
  props: makeVTabsProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const items = computed(() => parseItems(props.items));
    const {
      densityClasses
    } = useDensity(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      scopeId
    } = useScopeId();
    provideDefaults({
      VTab: {
        color: toRef(props, "color"),
        direction: toRef(props, "direction"),
        stacked: toRef(props, "stacked"),
        fixed: toRef(props, "fixedTabs"),
        sliderColor: toRef(props, "sliderColor"),
        hideSlider: toRef(props, "hideSlider")
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props);
      const hasWindow = !!(slots.window || props.items.length > 0);
      return createVNode(Fragment, null, [createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs", `v-tabs--${props.direction}`, `v-tabs--align-tabs-${props.alignTabs}`, {
          "v-tabs--fixed-tabs": props.fixedTabs,
          "v-tabs--grow": props.grow,
          "v-tabs--stacked": props.stacked
        }, densityClasses.value, backgroundColorClasses.value, props.class],
        "style": [{
          "--v-tabs-height": convertToUnit(props.height)
        }, backgroundColorStyles.value, props.style],
        "role": "tablist",
        "symbol": VTabsSymbol
      }, scopeId, attrs), {
        default: () => {
          var _a2;
          var _a;
          return [(_a2 = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _a2 : items.value.map((item) => {
            var _a3;
            var _a22;
            return (_a3 = (_a22 = slots.tab) == null ? void 0 : _a22.call(slots, {
              item
            })) != null ? _a3 : createVNode(VTab, mergeProps(item, {
              "key": item.text,
              "value": item.value
            }), {
              default: slots[`tab.${item.value}`] ? () => {
                var _a32;
                return (_a32 = slots[`tab.${item.value}`]) == null ? void 0 : _a32.call(slots, {
                  item
                });
              } : void 0
            });
          })];
        }
      }), hasWindow && createVNode(VTabsWindow, mergeProps({
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "key": "tabs-window"
      }, scopeId), {
        default: () => {
          var _a;
          return [items.value.map((item) => {
            var _a3;
            var _a2;
            return (_a3 = (_a2 = slots.item) == null ? void 0 : _a2.call(slots, {
              item
            })) != null ? _a3 : createVNode(VTabsWindowItem, {
              "value": item.value
            }, {
              default: () => {
                var _a32;
                return (_a32 = slots[`item.${item.value}`]) == null ? void 0 : _a32.call(slots, {
                  item
                });
              }
            });
          }), (_a = slots.window) == null ? void 0 : _a.call(slots)];
        }
      })]);
    });
    return {};
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "avatar",
  __ssrInlineRender: true,
  setup(__props) {
    const { image } = storeToRefs(useAuthStore());
    const imageRef = ref(null);
    const loading = ref(false);
    const eventHandler = (event) => {
      var _a;
      const file = (_a = event.target.files) == null ? void 0 : _a[0];
      if (file) {
        loading.value = true;
        useAuthStore().updateImage(file).finally(() => {
          loading.value = false;
        });
      }
    };
    const showInput = () => {
      const input = imageRef.value.$el.querySelector("input");
      input.click();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      if (unref(loading)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex align-center justify-center fill-height" }, _attrs))}>`);
        _push(ssrRenderComponent(VProgressCircular, {
          color: "grey-lighten-2",
          indeterminate: ""
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "position-relative" }, _attrs))}>`);
        _push(ssrRenderComponent(VAvatar, { size: "64" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VImg, { src: unref(image) }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(VImg, { src: unref(image) }, null, 8, ["src"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(VBtn, {
          class: "image-plus-avatar__btn",
          icon: "true",
          size: "x-small",
          color: "background",
          width: "28",
          height: "28",
          onClick: showInput
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                class: "image-plus-avatar",
                name: "futzo-icon:image-plus-avatar"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  class: "image-plus-avatar",
                  name: "futzo-icon:image-plus-avatar"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(VFileInput, {
          class: "d-none",
          ref_key: "imageRef",
          ref: imageRef,
          onChange: eventHandler
        }, null, _parent));
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/configuration/avatar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "personal-data-card",
  __ssrInlineRender: true,
  setup(__props) {
    const { fields, resetForm, handleSubmit } = useSchemas("edit-user");
    const user = computed(() => useAuthStore().user);
    const submit = handleSubmit((values) => {
      const updateUserForm = {
        id: user.value.id,
        name: values.name,
        phone: values.phone,
        email: values.email
      };
      useAuthStore().updateUser(updateUserForm);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_1;
      _push(ssrRenderComponent(VCard, mergeProps({
        class: "secondary-card",
        variant: "text"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardItem, { class: "secondary-card-item" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardText, { class: "secondary-card__title" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Edita tus datos personales`);
                      } else {
                        return [
                          createTextVNode("Edita tus datos personales")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardSubtitle, { class: "secondary-card__subtitle" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Estos son tus datos personales, puedes editarlos debajo.`);
                      } else {
                        return [
                          createTextVNode(" Estos son tus datos personales, puedes editarlos debajo.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardText, { class: "secondary-card__title" }, {
                      default: withCtx(() => [
                        createTextVNode("Edita tus datos personales")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardSubtitle, { class: "secondary-card__subtitle" }, {
                      default: withCtx(() => [
                        createTextVNode(" Estos son tus datos personales, puedes editarlos debajo.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VForm, {
                    class: "user-data-configuration-form",
                    onSubmit: unref(submit)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="label-form"${_scopeId5}>Nombre completo</p>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "label-form" }, "Nombre completo")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: unref(fields).name.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<small class="text-error"${_scopeId5}>${ssrInterpolate(unref(fields).name.fieldPropsValue["error-messages"][0])}</small>`);
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: unref(fields).name.fieldValue,
                                        "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                        variant: "plain",
                                        class: "user-data-configuration-form__input"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).name.fieldPropsValue["error-messages"][0]), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "label-form" }, "Nombre completo")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(fields).name.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).name.fieldPropsValue["error-messages"][0]), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="label-form"${_scopeId5}>Tel\xE9fono</p>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "label-form" }, "Tel\xE9fono")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_client_only, null, {}, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_client_only, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Gl), {
                                            variant: "plain",
                                            singleLine: true,
                                            modelValue: unref(fields).phone.fieldValue,
                                            "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                            class: "user-data-configuration-form__input",
                                            invalidMessage: ({ label, example }) => {
                                              return `${label} debe ser un numero valido (${example}).`;
                                            }
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "invalidMessage"]),
                                          createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
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
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "label-form" }, "Tel\xE9fono")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_client_only, null, {
                                      default: withCtx(() => [
                                        createVNode(unref(Gl), {
                                          variant: "plain",
                                          singleLine: true,
                                          modelValue: unref(fields).phone.fieldValue,
                                          "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                          class: "user-data-configuration-form__input",
                                          invalidMessage: ({ label, example }) => {
                                            return `${label} debe ser un numero valido (${example}).`;
                                          }
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "invalidMessage"]),
                                        createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
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
                        _push4(ssrRenderComponent(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="label-form"${_scopeId5}>Correo electr\xF3nico</p>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "label-form" }, "Correo electr\xF3nico")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      type: "email",
                                      modelValue: unref(fields).email.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<small class="text-error"${_scopeId5}>${ssrInterpolate(unref(fields).email.fieldPropsValue["error-messages"][0])}</small>`);
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        type: "email",
                                        modelValue: unref(fields).email.fieldValue,
                                        "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                        variant: "plain",
                                        class: "user-data-configuration-form__input"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).email.fieldPropsValue["error-messages"][0]), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "label-form" }, "Correo electr\xF3nico")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      type: "email",
                                      modelValue: unref(fields).email.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).email.fieldPropsValue["error-messages"][0]), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "4",
                                offset: "3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="d-flex justify-end align-center pt-4"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(VBtn, {
                                      type: "submit",
                                      class: "user-data-configuration-form__button",
                                      color: "primary",
                                      dark: ""
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Guardar cambios `);
                                        } else {
                                          return [
                                            createTextVNode(" Guardar cambios ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "d-flex justify-end align-center pt-4" }, [
                                        createVNode(VBtn, {
                                          type: "submit",
                                          class: "user-data-configuration-form__button",
                                          color: "primary",
                                          dark: ""
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Guardar cambios ")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "4",
                                  offset: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "d-flex justify-end align-center pt-4" }, [
                                      createVNode(VBtn, {
                                        type: "submit",
                                        class: "user-data-configuration-form__button",
                                        color: "primary",
                                        dark: ""
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Guardar cambios ")
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, {
                            class: "row-border-bottom",
                            "no-gutters": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "label-form" }, "Nombre completo")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(fields).name.fieldValue,
                                    "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                    variant: "plain",
                                    class: "user-data-configuration-form__input"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).name.fieldPropsValue["error-messages"][0]), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, {
                            class: "row-border-bottom",
                            "no-gutters": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "label-form" }, "Tel\xE9fono")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "4" }, {
                                default: withCtx(() => [
                                  createVNode(_component_client_only, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(Gl), {
                                        variant: "plain",
                                        singleLine: true,
                                        modelValue: unref(fields).phone.fieldValue,
                                        "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                        class: "user-data-configuration-form__input",
                                        invalidMessage: ({ label, example }) => {
                                          return `${label} debe ser un numero valido (${example}).`;
                                        }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "invalidMessage"]),
                                      createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, {
                            class: "row-border-bottom",
                            "no-gutters": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "label-form" }, "Correo electr\xF3nico")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    type: "email",
                                    modelValue: unref(fields).email.fieldValue,
                                    "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                    variant: "plain",
                                    class: "user-data-configuration-form__input"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).email.fieldPropsValue["error-messages"][0]), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "4",
                                offset: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "d-flex justify-end align-center pt-4" }, [
                                    createVNode(VBtn, {
                                      type: "submit",
                                      class: "user-data-configuration-form__button",
                                      color: "primary",
                                      dark: ""
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Guardar cambios ")
                                      ]),
                                      _: 1
                                    })
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VForm, {
                      class: "user-data-configuration-form",
                      onSubmit: withModifiers(unref(submit), ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createVNode(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "3" }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "label-form" }, "Nombre completo")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "4" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(fields).name.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                  variant: "plain",
                                  class: "user-data-configuration-form__input"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).name.fieldPropsValue["error-messages"][0]), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "3" }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "label-form" }, "Tel\xE9fono")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "4" }, {
                              default: withCtx(() => [
                                createVNode(_component_client_only, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(Gl), {
                                      variant: "plain",
                                      singleLine: true,
                                      modelValue: unref(fields).phone.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                      class: "user-data-configuration-form__input",
                                      invalidMessage: ({ label, example }) => {
                                        return `${label} debe ser un numero valido (${example}).`;
                                      }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "invalidMessage"]),
                                    createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "3" }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "label-form" }, "Correo electr\xF3nico")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "4" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  type: "email",
                                  modelValue: unref(fields).email.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                  variant: "plain",
                                  class: "user-data-configuration-form__input"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).email.fieldPropsValue["error-messages"][0]), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "4",
                              offset: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex justify-end align-center pt-4" }, [
                                  createVNode(VBtn, {
                                    type: "submit",
                                    class: "user-data-configuration-form__button",
                                    color: "primary",
                                    dark: ""
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Guardar cambios ")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["onSubmit"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardItem, { class: "secondary-card-item" }, {
                default: withCtx(() => [
                  createVNode(VCardText, { class: "secondary-card__title" }, {
                    default: withCtx(() => [
                      createTextVNode("Edita tus datos personales")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardSubtitle, { class: "secondary-card__subtitle" }, {
                    default: withCtx(() => [
                      createTextVNode(" Estos son tus datos personales, puedes editarlos debajo.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(VForm, {
                    class: "user-data-configuration-form",
                    onSubmit: withModifiers(unref(submit), ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createVNode(VRow, {
                        class: "row-border-bottom",
                        "no-gutters": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "3" }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "label-form" }, "Nombre completo")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "4" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: unref(fields).name.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                variant: "plain",
                                class: "user-data-configuration-form__input"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).name.fieldPropsValue["error-messages"][0]), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, {
                        class: "row-border-bottom",
                        "no-gutters": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "3" }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "label-form" }, "Tel\xE9fono")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "4" }, {
                            default: withCtx(() => [
                              createVNode(_component_client_only, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Gl), {
                                    variant: "plain",
                                    singleLine: true,
                                    modelValue: unref(fields).phone.fieldValue,
                                    "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                    class: "user-data-configuration-form__input",
                                    invalidMessage: ({ label, example }) => {
                                      return `${label} debe ser un numero valido (${example}).`;
                                    }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalidMessage"]),
                                  createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, {
                        class: "row-border-bottom",
                        "no-gutters": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "3" }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "label-form" }, "Correo electr\xF3nico")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "4" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                type: "email",
                                modelValue: unref(fields).email.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                variant: "plain",
                                class: "user-data-configuration-form__input"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).email.fieldPropsValue["error-messages"][0]), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "4",
                            offset: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex justify-end align-center pt-4" }, [
                                createVNode(VBtn, {
                                  type: "submit",
                                  class: "user-data-configuration-form__button",
                                  color: "primary",
                                  dark: ""
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Guardar cambios ")
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["onSubmit"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/configuration/personal-data-card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0_lazy = defineAsyncComponent(() => import('./password-data-card-Clg_vvUL.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "configuracion",
  __ssrInlineRender: true,
  setup(__props) {
    const user = computed(() => useAuthStore().user);
    const tab = ref(1);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_lazy_pages_configuration_password_data_card = __nuxt_component_0_lazy;
      _push(ssrRenderComponent(VSheet, mergeProps({
        height: "100%",
        color: "white",
        class: "pa-10 full-height configuration-v-sheet"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, { variant: "text" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardItem, { class: "mb-12" }, {
                    prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$2)
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, { class: "card-title ml-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a, _b;
                            if (_push5) {
                              _push5(`${ssrInterpolate((_a = unref(user)) == null ? void 0 : _a.name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString((_b = unref(user)) == null ? void 0 : _b.name), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardSubtitle, { class: "card-subtitle ml-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a, _b;
                            if (_push5) {
                              _push5(`${ssrInterpolate((_a = unref(user)) == null ? void 0 : _a.email)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString((_b = unref(user)) == null ? void 0 : _b.email), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardTitle, { class: "card-title ml-2" }, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.name), 1)
                              ];
                            }),
                            _: 1
                          }),
                          createVNode(VCardSubtitle, { class: "card-subtitle ml-2" }, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.email), 1)
                              ];
                            }),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTabs, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTab, { value: 1 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Datos personales`);
                                  } else {
                                    return [
                                      createTextVNode(" Datos personales")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTab, { value: 2 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Contrase\xF1a`);
                                  } else {
                                    return [
                                      createTextVNode(" Contrase\xF1a")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTab, { value: 1 }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Datos personales")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VTab, { value: 2 }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Contrase\xF1a")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindow, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTabsWindowItem, {
                                value: 1,
                                key: 1
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$1, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTabsWindowItem, {
                                value: 2,
                                key: 2
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_lazy_pages_configuration_password_data_card, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_lazy_pages_configuration_password_data_card)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                (openBlock(), createBlock(VTabsWindowItem, {
                                  value: 1,
                                  key: 1
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$1)
                                  ]),
                                  _: 1
                                })),
                                (openBlock(), createBlock(VTabsWindowItem, {
                                  value: 2,
                                  key: 2
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_lazy_pages_configuration_password_data_card)
                                  ]),
                                  _: 1
                                }))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTabs, {
                            modelValue: unref(tab),
                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                          }, {
                            default: withCtx(() => [
                              createVNode(VTab, { value: 1 }, {
                                default: withCtx(() => [
                                  createTextVNode(" Datos personales")
                                ]),
                                _: 1
                              }),
                              createVNode(VTab, { value: 2 }, {
                                default: withCtx(() => [
                                  createTextVNode(" Contrase\xF1a")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VTabsWindow, {
                            modelValue: unref(tab),
                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(VTabsWindowItem, {
                                value: 1,
                                key: 1
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$1)
                                ]),
                                _: 1
                              })),
                              (openBlock(), createBlock(VTabsWindowItem, {
                                value: 2,
                                key: 2
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_lazy_pages_configuration_password_data_card)
                                ]),
                                _: 1
                              }))
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
                    createVNode(VCardItem, { class: "mb-12" }, {
                      prepend: withCtx(() => [
                        createVNode(_sfc_main$2)
                      ]),
                      default: withCtx(() => [
                        createVNode(VCardTitle, { class: "card-title ml-2" }, {
                          default: withCtx(() => {
                            var _a;
                            return [
                              createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.name), 1)
                            ];
                          }),
                          _: 1
                        }),
                        createVNode(VCardSubtitle, { class: "card-subtitle ml-2" }, {
                          default: withCtx(() => {
                            var _a;
                            return [
                              createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.email), 1)
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VTabs, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx(() => [
                            createVNode(VTab, { value: 1 }, {
                              default: withCtx(() => [
                                createTextVNode(" Datos personales")
                              ]),
                              _: 1
                            }),
                            createVNode(VTab, { value: 2 }, {
                              default: withCtx(() => [
                                createTextVNode(" Contrase\xF1a")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VTabsWindow, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(VTabsWindowItem, {
                              value: 1,
                              key: 1
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$1)
                              ]),
                              _: 1
                            })),
                            (openBlock(), createBlock(VTabsWindowItem, {
                              value: 2,
                              key: 2
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_lazy_pages_configuration_password_data_card)
                              ]),
                              _: 1
                            }))
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
              createVNode(VCard, { variant: "text" }, {
                default: withCtx(() => [
                  createVNode(VCardItem, { class: "mb-12" }, {
                    prepend: withCtx(() => [
                      createVNode(_sfc_main$2)
                    ]),
                    default: withCtx(() => [
                      createVNode(VCardTitle, { class: "card-title ml-2" }, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.name), 1)
                          ];
                        }),
                        _: 1
                      }),
                      createVNode(VCardSubtitle, { class: "card-subtitle ml-2" }, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.email), 1)
                          ];
                        }),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VTabs, {
                        modelValue: unref(tab),
                        "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                      }, {
                        default: withCtx(() => [
                          createVNode(VTab, { value: 1 }, {
                            default: withCtx(() => [
                              createTextVNode(" Datos personales")
                            ]),
                            _: 1
                          }),
                          createVNode(VTab, { value: 2 }, {
                            default: withCtx(() => [
                              createTextVNode(" Contrase\xF1a")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VTabsWindow, {
                        modelValue: unref(tab),
                        "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(VTabsWindowItem, {
                            value: 1,
                            key: 1
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$1)
                            ]),
                            _: 1
                          })),
                          (openBlock(), createBlock(VTabsWindowItem, {
                            value: 2,
                            key: 2
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_lazy_pages_configuration_password_data_card)
                            ]),
                            _: 1
                          }))
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/configuracion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=configuracion-T5-7aZ9a.mjs.map
