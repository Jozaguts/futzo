import { defineComponent, mergeModels, useModel, mergeProps, unref, computed, toRef, shallowRef, ref, provide, inject, createElementVNode, normalizeClass, normalizeStyle, withDirectives, createVNode, vShow, nextTick, useSSRContext } from 'vue';
import { af as VSelect, g as genericComponent, p as propsFactory, bt as getDecimals, as as useRtl, av as createRange, k as useRounded, j as useBackgroundColor, a5 as convertToUnit, c as useRender, bu as Ripple, b9 as useElevation, d as useTextColor, aA as keyValues, bv as VScaleTransition, ay as makeElevationProps, v as makeRoundedProps, ap as clamp, x as makeComponentProps } from './server.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import { storeToRefs } from 'pinia';
import { g as useCategoryStore } from './useScheduleStore-DBhAIDF3.mjs';

const VSliderSymbol = Symbol.for("vuetify:v-slider");
function getOffset(e, el, direction) {
  const vertical = direction === "vertical";
  const rect = el.getBoundingClientRect();
  const touch = "touches" in e ? e.touches[0] : e;
  return vertical ? touch.clientY - (rect.top + rect.height / 2) : touch.clientX - (rect.left + rect.width / 2);
}
function getPosition(e, position) {
  if ("touches" in e && e.touches.length) return e.touches[0][position];
  else if ("changedTouches" in e && e.changedTouches.length) return e.changedTouches[0][position];
  else return e[position];
}
const makeSliderProps = propsFactory({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  readonly: {
    type: Boolean,
    default: null
  },
  max: {
    type: [Number, String],
    default: 100
  },
  min: {
    type: [Number, String],
    default: 0
  },
  step: {
    type: [Number, String],
    default: 0
  },
  thumbColor: String,
  thumbLabel: {
    type: [Boolean, String],
    default: void 0,
    validator: (v) => typeof v === "boolean" || v === "always"
  },
  thumbSize: {
    type: [Number, String],
    default: 20
  },
  showTicks: {
    type: [Boolean, String],
    default: false,
    validator: (v) => typeof v === "boolean" || v === "always"
  },
  ticks: {
    type: [Array, Object]
  },
  tickSize: {
    type: [Number, String],
    default: 2
  },
  color: String,
  trackColor: String,
  trackFillColor: String,
  trackSize: {
    type: [Number, String],
    default: 4
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (v) => ["vertical", "horizontal"].includes(v)
  },
  reverse: Boolean,
  ...makeRoundedProps(),
  ...makeElevationProps({
    elevation: 2
  }),
  ripple: {
    type: Boolean,
    default: true
  }
}, "Slider");
const useSteps = (props) => {
  const min = computed(() => parseFloat(props.min));
  const max = computed(() => parseFloat(props.max));
  const step = computed(() => Number(props.step) > 0 ? parseFloat(props.step) : 0);
  const decimals = computed(() => Math.max(getDecimals(step.value), getDecimals(min.value)));
  function roundValue(value) {
    value = parseFloat(value);
    if (step.value <= 0) return value;
    const clamped = clamp(value, min.value, max.value);
    const offset = min.value % step.value;
    let newValue = Math.round((clamped - offset) / step.value) * step.value + offset;
    if (clamped > newValue && newValue + step.value > max.value) {
      newValue = max.value;
    }
    return parseFloat(Math.min(newValue, max.value).toFixed(decimals.value));
  }
  return {
    min,
    max,
    step,
    decimals,
    roundValue
  };
};
const useSlider = (_ref) => {
  let {
    props,
    steps,
    onSliderStart,
    onSliderMove,
    onSliderEnd,
    getActiveThumb
  } = _ref;
  const {
    isRtl
  } = useRtl();
  const isReversed = toRef(() => props.reverse);
  const vertical = computed(() => props.direction === "vertical");
  const indexFromEnd = computed(() => vertical.value !== isReversed.value);
  const {
    min,
    max,
    step,
    decimals,
    roundValue
  } = steps;
  const thumbSize = computed(() => parseInt(props.thumbSize, 10));
  const tickSize = computed(() => parseInt(props.tickSize, 10));
  const trackSize = computed(() => parseInt(props.trackSize, 10));
  const numTicks = computed(() => (max.value - min.value) / step.value);
  const disabled = toRef(() => props.disabled);
  const thumbColor = computed(() => {
    var _a;
    return props.error || props.disabled ? void 0 : (_a = props.thumbColor) != null ? _a : props.color;
  });
  const trackColor = computed(() => {
    var _a;
    return props.error || props.disabled ? void 0 : (_a = props.trackColor) != null ? _a : props.color;
  });
  const trackFillColor = computed(() => {
    var _a;
    return props.error || props.disabled ? void 0 : (_a = props.trackFillColor) != null ? _a : props.color;
  });
  const mousePressed = shallowRef(false);
  const startOffset = shallowRef(0);
  const trackContainerRef = ref();
  const activeThumbRef = ref();
  function parseMouseMove(e) {
    var _a;
    const el = (_a = trackContainerRef.value) == null ? void 0 : _a.$el;
    if (!el) return;
    const vertical2 = props.direction === "vertical";
    const start = vertical2 ? "top" : "left";
    const length = vertical2 ? "height" : "width";
    const position2 = vertical2 ? "clientY" : "clientX";
    const {
      [start]: trackStart,
      [length]: trackLength
    } = el.getBoundingClientRect();
    const clickOffset = getPosition(e, position2);
    let clickPos = clamp((clickOffset - trackStart - startOffset.value) / trackLength) || 0;
    if (vertical2 ? indexFromEnd.value : indexFromEnd.value !== isRtl.value) clickPos = 1 - clickPos;
    return roundValue(min.value + clickPos * (max.value - min.value));
  }
  const handleStop = (e) => {
    const value = parseMouseMove(e);
    if (value != null) {
      onSliderEnd({
        value
      });
    }
    mousePressed.value = false;
    startOffset.value = 0;
  };
  const handleStart = (e) => {
    const value = parseMouseMove(e);
    activeThumbRef.value = getActiveThumb(e);
    if (!activeThumbRef.value) return;
    mousePressed.value = true;
    if (activeThumbRef.value.contains(e.target)) {
      startOffset.value = getOffset(e, activeThumbRef.value, props.direction);
    } else {
      startOffset.value = 0;
      if (value != null) {
        onSliderMove({
          value
        });
      }
    }
    if (value != null) {
      onSliderStart({
        value
      });
    }
    nextTick(() => {
      var _a;
      return (_a = activeThumbRef.value) == null ? void 0 : _a.focus();
    });
  };
  const moveListenerOptions = {
    passive: true,
    capture: true
  };
  function onMouseMove(e) {
    const value = parseMouseMove(e);
    if (value != null) {
      onSliderMove({
        value
      });
    }
  }
  function onSliderMouseUp(e) {
    e.stopPropagation();
    e.preventDefault();
    handleStop(e);
    (void 0).removeEventListener("mousemove", onMouseMove, moveListenerOptions);
    (void 0).removeEventListener("mouseup", onSliderMouseUp);
  }
  function onSliderTouchend(e) {
    var _a;
    handleStop(e);
    (void 0).removeEventListener("touchmove", onMouseMove, moveListenerOptions);
    (_a = e.target) == null ? void 0 : _a.removeEventListener("touchend", onSliderTouchend);
  }
  function onSliderTouchstart(e) {
    var _a;
    handleStart(e);
    (void 0).addEventListener("touchmove", onMouseMove, moveListenerOptions);
    (_a = e.target) == null ? void 0 : _a.addEventListener("touchend", onSliderTouchend, {
      passive: false
    });
  }
  function onSliderMousedown(e) {
    if (e.button !== 0) return;
    e.preventDefault();
    handleStart(e);
    (void 0).addEventListener("mousemove", onMouseMove, moveListenerOptions);
    (void 0).addEventListener("mouseup", onSliderMouseUp, {
      passive: false
    });
  }
  const position = (val) => {
    const percentage = (val - min.value) / (max.value - min.value) * 100;
    return clamp(isNaN(percentage) ? 0 : percentage, 0, 100);
  };
  const showTicks = toRef(() => props.showTicks);
  const parsedTicks = computed(() => {
    if (!showTicks.value) return [];
    if (!props.ticks) {
      return numTicks.value !== Infinity ? createRange(numTicks.value + 1).map((t) => {
        const value = min.value + t * step.value;
        return {
          value,
          position: position(value)
        };
      }) : [];
    }
    if (Array.isArray(props.ticks)) return props.ticks.map((t) => ({
      value: t,
      position: position(t),
      label: t.toString()
    }));
    return Object.keys(props.ticks).map((key) => ({
      value: parseFloat(key),
      position: position(parseFloat(key)),
      label: props.ticks[key]
    }));
  });
  const hasLabels = computed(() => parsedTicks.value.some((_ref2) => {
    let {
      label
    } = _ref2;
    return !!label;
  }));
  const data = {
    activeThumbRef,
    color: toRef(() => props.color),
    decimals,
    disabled,
    direction: toRef(() => props.direction),
    elevation: toRef(() => props.elevation),
    hasLabels,
    isReversed,
    indexFromEnd,
    min,
    max,
    mousePressed,
    numTicks,
    onSliderMousedown,
    onSliderTouchstart,
    parsedTicks,
    parseMouseMove,
    position,
    readonly: toRef(() => props.readonly),
    rounded: toRef(() => props.rounded),
    roundValue,
    showTicks,
    startOffset,
    step,
    thumbSize,
    thumbColor,
    thumbLabel: toRef(() => props.thumbLabel),
    ticks: toRef(() => props.ticks),
    tickSize,
    trackColor,
    trackContainerRef,
    trackFillColor,
    trackSize,
    vertical
  };
  provide(VSliderSymbol, data);
  return data;
};
const makeVSliderThumbProps = propsFactory({
  focused: Boolean,
  max: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  name: String,
  ...makeComponentProps()
}, "VSliderThumb");
const VSliderThumb = genericComponent()({
  name: "VSliderThumb",
  directives: {
    vRipple: Ripple
  },
  props: makeVSliderThumbProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const slider = inject(VSliderSymbol);
    const {
      isRtl,
      rtlClasses
    } = useRtl();
    if (!slider) throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");
    const {
      min,
      max,
      thumbColor,
      step,
      disabled,
      thumbSize,
      thumbLabel,
      direction,
      isReversed,
      vertical,
      readonly,
      elevation,
      mousePressed,
      decimals,
      indexFromEnd
    } = slider;
    const elevationProps = computed(() => !disabled.value ? elevation.value : void 0);
    const {
      elevationClasses
    } = useElevation(elevationProps);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(thumbColor);
    const {
      pageup,
      pagedown,
      end,
      home,
      left,
      right,
      down,
      up
    } = keyValues;
    const relevantKeys = [pageup, pagedown, end, home, left, right, down, up];
    const multipliers = computed(() => {
      if (step.value) return [1, 2, 3];
      else return [1, 5, 10];
    });
    function parseKeydown(e, value) {
      if (!relevantKeys.includes(e.key)) return;
      e.preventDefault();
      const _step = step.value || 0.1;
      const steps = (max.value - min.value) / _step;
      if ([left, right, down, up].includes(e.key)) {
        const increase = vertical.value ? [isRtl.value ? left : right, isReversed.value ? down : up] : indexFromEnd.value !== isRtl.value ? [left, up] : [right, up];
        const direction2 = increase.includes(e.key) ? 1 : -1;
        const multiplier = e.shiftKey ? 2 : e.ctrlKey ? 1 : 0;
        if (direction2 === -1 && value === max.value && !multiplier && !Number.isInteger(steps)) {
          value = value - steps % 1 * _step;
        } else {
          value = value + direction2 * _step * multipliers.value[multiplier];
        }
      } else if (e.key === home) {
        value = min.value;
      } else if (e.key === end) {
        value = max.value;
      } else {
        const direction2 = e.key === pagedown ? 1 : -1;
        value = value - direction2 * _step * (steps > 100 ? steps / 10 : 10);
      }
      return Math.max(props.min, Math.min(props.max, value));
    }
    function onKeydown(e) {
      const newValue = parseKeydown(e, props.modelValue);
      newValue != null && emit("update:modelValue", newValue);
    }
    useRender(() => {
      const positionPercentage = convertToUnit(indexFromEnd.value ? 100 - props.position : props.position, "%");
      return createElementVNode("div", {
        "class": normalizeClass(["v-slider-thumb", {
          "v-slider-thumb--focused": props.focused,
          "v-slider-thumb--pressed": props.focused && mousePressed.value
        }, props.class, rtlClasses.value]),
        "style": normalizeStyle([{
          "--v-slider-thumb-position": positionPercentage,
          "--v-slider-thumb-size": convertToUnit(thumbSize.value)
        }, props.style]),
        "role": "slider",
        "tabindex": disabled.value ? -1 : 0,
        "aria-label": props.name,
        "aria-valuemin": min.value,
        "aria-valuemax": max.value,
        "aria-valuenow": props.modelValue,
        "aria-readonly": !!readonly.value,
        "aria-orientation": direction.value,
        "onKeydown": !readonly.value ? onKeydown : void 0
      }, [createElementVNode("div", {
        "class": normalizeClass(["v-slider-thumb__surface", textColorClasses.value, elevationClasses.value]),
        "style": {
          ...textColorStyles.value
        }
      }, null), withDirectives(createElementVNode("div", {
        "class": normalizeClass(["v-slider-thumb__ripple", textColorClasses.value]),
        "style": normalizeStyle(textColorStyles.value)
      }, null), [[Ripple, props.ripple, null, {
        circle: true,
        center: true
      }]]), createVNode(VScaleTransition, {
        "origin": "bottom center"
      }, {
        default: () => {
          var _a2;
          var _a;
          return [withDirectives(createElementVNode("div", {
            "class": "v-slider-thumb__label-container"
          }, [createElementVNode("div", {
            "class": normalizeClass(["v-slider-thumb__label"])
          }, [createElementVNode("div", null, [(_a2 = (_a = slots["thumb-label"]) == null ? void 0 : _a.call(slots, {
            modelValue: props.modelValue
          })) != null ? _a2 : props.modelValue.toFixed(step.value ? decimals.value : 1)])])]), [[vShow, thumbLabel.value && props.focused || thumbLabel.value === "always"]])];
        }
      })]);
    });
    return {};
  }
});
const makeVSliderTrackProps = propsFactory({
  start: {
    type: Number,
    required: true
  },
  stop: {
    type: Number,
    required: true
  },
  ...makeComponentProps()
}, "VSliderTrack");
const VSliderTrack = genericComponent()({
  name: "VSliderTrack",
  props: makeVSliderTrackProps(),
  emits: {},
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const slider = inject(VSliderSymbol);
    if (!slider) throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");
    const {
      color,
      parsedTicks,
      rounded,
      showTicks,
      tickSize,
      trackColor,
      trackFillColor,
      trackSize,
      vertical,
      min,
      max,
      indexFromEnd
    } = slider;
    const {
      roundedClasses
    } = useRounded(rounded);
    const {
      backgroundColorClasses: trackFillColorClasses,
      backgroundColorStyles: trackFillColorStyles
    } = useBackgroundColor(trackFillColor);
    const {
      backgroundColorClasses: trackColorClasses,
      backgroundColorStyles: trackColorStyles
    } = useBackgroundColor(trackColor);
    const startDir = computed(() => `inset-${vertical.value ? "block" : "inline"}-${indexFromEnd.value ? "end" : "start"}`);
    const endDir = computed(() => vertical.value ? "height" : "width");
    const backgroundStyles = computed(() => {
      return {
        [startDir.value]: "0%",
        [endDir.value]: "100%"
      };
    });
    const trackFillWidth = computed(() => props.stop - props.start);
    const trackFillStyles = computed(() => {
      return {
        [startDir.value]: convertToUnit(props.start, "%"),
        [endDir.value]: convertToUnit(trackFillWidth.value, "%")
      };
    });
    const computedTicks = computed(() => {
      if (!showTicks.value) return [];
      const ticks = vertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value;
      return ticks.map((tick, index) => {
        var _a2;
        var _a;
        const directionValue = tick.value !== min.value && tick.value !== max.value ? convertToUnit(tick.position, "%") : void 0;
        return createElementVNode("div", {
          "key": tick.value,
          "class": normalizeClass(["v-slider-track__tick", {
            "v-slider-track__tick--filled": tick.position >= props.start && tick.position <= props.stop,
            "v-slider-track__tick--first": tick.value === min.value,
            "v-slider-track__tick--last": tick.value === max.value
          }]),
          "style": {
            [startDir.value]: directionValue
          }
        }, [(tick.label || slots["tick-label"]) && createElementVNode("div", {
          "class": "v-slider-track__tick-label"
        }, [(_a2 = (_a = slots["tick-label"]) == null ? void 0 : _a.call(slots, {
          tick,
          index
        })) != null ? _a2 : tick.label])]);
      });
    });
    useRender(() => {
      return createElementVNode("div", {
        "class": normalizeClass(["v-slider-track", roundedClasses.value, props.class]),
        "style": normalizeStyle([{
          "--v-slider-track-size": convertToUnit(trackSize.value),
          "--v-slider-tick-size": convertToUnit(tickSize.value)
        }, props.style])
      }, [createElementVNode("div", {
        "class": normalizeClass(["v-slider-track__background", trackColorClasses.value, {
          "v-slider-track__background--opacity": !!color.value || !trackFillColor.value
        }]),
        "style": {
          ...backgroundStyles.value,
          ...trackColorStyles.value
        }
      }, null), createElementVNode("div", {
        "class": normalizeClass(["v-slider-track__fill", trackFillColorClasses.value]),
        "style": {
          ...trackFillStyles.value,
          ...trackFillColorStyles.value
        }
      }, null), showTicks.value && createElementVNode("div", {
        "class": normalizeClass(["v-slider-track__ticks", {
          "v-slider-track__ticks--always-show": showTicks.value === "always"
        }])
      }, [computedTicks.value])]);
    });
    return {};
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CategoriesSelect",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    disabled: {
      type: Boolean,
      default: true
    },
    errors: {
      type: Object,
      default: () => ({
        "error-messages": []
      })
    }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const { categories } = storeToRefs(useCategoryStore());
    const modelValue = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VSelect, mergeProps({
        disabled: __props.disabled,
        "no-data-text": "No hay categor\xEDas",
        items: unref(categories),
        density: "compact",
        "item-title": "name",
        "item-value": "id",
        placeholder: "Categor\xEDa",
        "menu-icon": "mdi-chevron-down",
        modelValue: modelValue.value,
        "onUpdate:modelValue": ($event) => modelValue.value = $event
      }, __props.errors, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inputs/CategoriesSelect.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { VSliderTrack as V, _sfc_main as _, useSlider as a, VSliderThumb as b, getOffset as g, makeSliderProps as m, useSteps as u };
//# sourceMappingURL=CategoriesSelect-D1ehrnKL.mjs.map
