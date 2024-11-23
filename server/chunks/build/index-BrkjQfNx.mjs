import { shallowRef, ref, computed, watch, createVNode, inject, withDirectives, resolveDirective, vShow, mergeProps, Fragment, useSSRContext, defineComponent as defineComponent$1, withCtx, toRef, provide, unref, createTextVNode, toDisplayString, useModel, mergeModels, resolveComponent, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderClass } from 'vue/server-renderer';
import { p as propsFactory, m as makeComponentProps, Y as defineComponent, Z as clamp, C as convertToUnit, $ as useResizeObserver, w as useRender, a8 as makeRoundedProps, a9 as makeElevationProps, q as genericComponent, ac as Ripple, s as useRtl, ad as useElevation, E as useTextColor, ae as VScaleTransition, ag as useRounded, N as useBackgroundColor, ah as makeFocusProps, ai as makeVInputProps, I as useProxiedModel, aj as useFocus, ak as VInput, al as VLabel, am as SUPPORTS_EYE_DROPPER, an as HSVtoCSS, ao as parseColor, a5 as RGBtoHSV, ap as deepEqual, aq as VIcon, ar as getContrast, D as omit, at as consoleWarn, P as provideDefaults, au as useTeamStore, a0 as getEventCoordinates, a1 as HSVtoHex, a2 as has, a3 as HSVtoRGB, a4 as HSVtoHSL, a6 as HSLtoHSV, aa as getDecimals, ab as createRange, as as RGBtoCSS, b as VCardItem, av as VDivider, V as VCard, aw as useTournamentStore, e as VTextField, ax as VSelect, ay as VListItem, az as VListItemTitle, X as Gl, d as VCardText, a7 as HexToHSV, f as _export_sfc, _ as __nuxt_component_1$1, af as keyValues } from './server.mjs';
import { _ as _sfc_main$2$1, a as _sfc_main$h } from './app-bar-4n5zyiNx.mjs';
import { S as SearchInput } from './SearchInput-nqdysJSi.mjs';
import { storeToRefs } from 'pinia';
import { A as AppBarSecondaryBtn } from './app-bar-secondary-btn-a5cT-UYX.mjs';
import { _ as _sfc_main$4$1, V as VDialog, a as _sfc_main$2$2, d as dragDropImageRef, i as imageForm, b as VAutocomplete, S as StepIndicator, s as saveImage, r as removeImage, c as __nuxt_component_0 } from './step-indicator-yUBOEq6r.mjs';
import { m as makeVSheetProps, V as VSheet, u as useSchemas } from './useSchemas-CkEHQvYm.mjs';
import { V as VBtn } from './VBtn-sH8DNEZb.mjs';
import { _ as __nuxt_component_1 } from './client-only-Db1Q_2tj.mjs';
import { _ as _sfc_main$i } from './CategoriesSelect-DyROsbp6.mjs';
import { V as VRow, a as VCol } from './VRow-B8INPo3N.mjs';
import { u as useDebounceFn } from './index-93-MdpO_.mjs';
import { V as VContainer } from './VContainer-DxUs1xyO.mjs';
import { g as getHeaders, _ as _sfc_main$j } from './headers-table-Dwx7nOYp.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';
import 'node:module';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import '@vue/reactivity';
import 'vue3-perfect-scrollbar';
import '@formkit/auto-animate/vue';
import 'awesome-phonenumber';
import './layout-kaFZhVyl.mjs';
import '@morev/vue-transitions';
import 'yup';

var _a;
const makeVColorPickerCanvasProps = propsFactory({
  color: {
    type: Object
  },
  disabled: Boolean,
  dotSize: {
    type: [Number, String],
    default: 10
  },
  height: {
    type: [Number, String],
    default: 150
  },
  width: {
    type: [Number, String],
    default: 300
  },
  ...makeComponentProps()
}, "VColorPickerCanvas");
const VColorPickerCanvas = defineComponent({
  name: "VColorPickerCanvas",
  props: makeVColorPickerCanvasProps(),
  emits: {
    "update:color": (color) => true,
    "update:position": (hue) => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const isInteracting = shallowRef(false);
    const canvasRef = ref();
    const canvasWidth = shallowRef(parseFloat(props.width));
    const canvasHeight = shallowRef(parseFloat(props.height));
    const _dotPosition = ref({
      x: 0,
      y: 0
    });
    const dotPosition = computed({
      get: () => _dotPosition.value,
      set(val) {
        var _a3, _b2;
        var _a2, _b;
        if (!canvasRef.value) return;
        const {
          x,
          y
        } = val;
        _dotPosition.value = val;
        emit("update:color", {
          h: (_a3 = (_a2 = props.color) == null ? void 0 : _a2.h) != null ? _a3 : 0,
          s: clamp(x, 0, canvasWidth.value) / canvasWidth.value,
          v: 1 - clamp(y, 0, canvasHeight.value) / canvasHeight.value,
          a: (_b2 = (_b = props.color) == null ? void 0 : _b.a) != null ? _b2 : 1
        });
      }
    });
    const dotStyles = computed(() => {
      const {
        x,
        y
      } = dotPosition.value;
      const radius = parseInt(props.dotSize, 10) / 2;
      return {
        width: convertToUnit(props.dotSize),
        height: convertToUnit(props.dotSize),
        transform: `translate(${convertToUnit(x - radius)}, ${convertToUnit(y - radius)})`
      };
    });
    const {
      resizeRef
    } = useResizeObserver();
    function updateDotPosition(x, y, rect) {
      const {
        left,
        top,
        width,
        height
      } = rect;
      dotPosition.value = {
        x: clamp(x - left, 0, width),
        y: clamp(y - top, 0, height)
      };
    }
    function handleMouseDown(e) {
      if (e.type === "mousedown") {
        e.preventDefault();
      }
      if (props.disabled) return;
      handleMouseMove(e);
      (void 0).addEventListener("mousemove", handleMouseMove);
      (void 0).addEventListener("mouseup", handleMouseUp);
      (void 0).addEventListener("touchmove", handleMouseMove);
      (void 0).addEventListener("touchend", handleMouseUp);
    }
    function handleMouseMove(e) {
      if (props.disabled || !canvasRef.value) return;
      isInteracting.value = true;
      const coords = getEventCoordinates(e);
      updateDotPosition(coords.clientX, coords.clientY, canvasRef.value.getBoundingClientRect());
    }
    function handleMouseUp() {
      (void 0).removeEventListener("mousemove", handleMouseMove);
      (void 0).removeEventListener("mouseup", handleMouseUp);
      (void 0).removeEventListener("touchmove", handleMouseMove);
      (void 0).removeEventListener("touchend", handleMouseUp);
    }
    function updateCanvas() {
      var _a3;
      var _a2;
      if (!canvasRef.value) return;
      const canvas = canvasRef.value;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const saturationGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      saturationGradient.addColorStop(0, "hsla(0, 0%, 100%, 1)");
      saturationGradient.addColorStop(1, `hsla(${(_a3 = (_a2 = props.color) == null ? void 0 : _a2.h) != null ? _a3 : 0}, 100%, 50%, 1)`);
      ctx.fillStyle = saturationGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const valueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      valueGradient.addColorStop(0, "hsla(0, 0%, 0%, 0)");
      valueGradient.addColorStop(1, "hsla(0, 0%, 0%, 1)");
      ctx.fillStyle = valueGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    watch(() => {
      var _a2;
      return (_a2 = props.color) == null ? void 0 : _a2.h;
    }, updateCanvas, {
      immediate: true
    });
    watch(() => [canvasWidth.value, canvasHeight.value], (newVal, oldVal) => {
      updateCanvas();
      _dotPosition.value = {
        x: dotPosition.value.x * newVal[0] / oldVal[0],
        y: dotPosition.value.y * newVal[1] / oldVal[1]
      };
    }, {
      flush: "post"
    });
    watch(() => props.color, () => {
      if (isInteracting.value) {
        isInteracting.value = false;
        return;
      }
      _dotPosition.value = props.color ? {
        x: props.color.s * canvasWidth.value,
        y: (1 - props.color.v) * canvasHeight.value
      } : {
        x: 0,
        y: 0
      };
    }, {
      deep: true,
      immediate: true
    });
    useRender(() => createVNode("div", {
      "ref": resizeRef,
      "class": ["v-color-picker-canvas", props.class],
      "style": props.style,
      "onMousedown": handleMouseDown,
      "onTouchstartPassive": handleMouseDown
    }, [createVNode("canvas", {
      "ref": canvasRef,
      "width": canvasWidth.value,
      "height": canvasHeight.value
    }, null), props.color && createVNode("div", {
      "class": ["v-color-picker-canvas__dot", {
        "v-color-picker-canvas__dot--disabled": props.disabled
      }],
      "style": dotStyles.value
    }, null)]));
    return {};
  }
});
function stripAlpha(color, stripAlpha2) {
  if (stripAlpha2) {
    const {
      a,
      ...rest
    } = color;
    return rest;
  }
  return color;
}
function extractColor(color, input) {
  if (input == null || typeof input === "string") {
    const hex2 = HSVtoHex(color);
    if (color.a === 1) return hex2.slice(0, 7);
    else return hex2;
  }
  if (typeof input === "object") {
    let converted;
    if (has(input, ["r", "g", "b"])) converted = HSVtoRGB(color);
    else if (has(input, ["h", "s", "l"])) converted = HSVtoHSL(color);
    else if (has(input, ["h", "s", "v"])) converted = color;
    return stripAlpha(converted, !has(input, ["a"]) && color.a === 1);
  }
  return color;
}
const nullColor = {
  h: 0,
  s: 0,
  v: 0,
  a: 1
};
const rgba = {
  inputProps: {
    type: "number",
    min: 0
  },
  inputs: [{
    label: "R",
    max: 255,
    step: 1,
    getValue: (c) => Math.round(c.r),
    getColor: (c, v) => ({
      ...c,
      r: Number(v)
    })
  }, {
    label: "G",
    max: 255,
    step: 1,
    getValue: (c) => Math.round(c.g),
    getColor: (c, v) => ({
      ...c,
      g: Number(v)
    })
  }, {
    label: "B",
    max: 255,
    step: 1,
    getValue: (c) => Math.round(c.b),
    getColor: (c, v) => ({
      ...c,
      b: Number(v)
    })
  }, {
    label: "A",
    max: 1,
    step: 0.01,
    getValue: (_ref) => {
      let {
        a
      } = _ref;
      return a != null ? Math.round(a * 100) / 100 : 1;
    },
    getColor: (c, v) => ({
      ...c,
      a: Number(v)
    })
  }],
  to: HSVtoRGB,
  from: RGBtoHSV
};
const rgb = {
  ...rgba,
  inputs: (_a = rgba.inputs) == null ? void 0 : _a.slice(0, 3)
};
const hsla = {
  inputProps: {
    type: "number",
    min: 0
  },
  inputs: [{
    label: "H",
    max: 360,
    step: 1,
    getValue: (c) => Math.round(c.h),
    getColor: (c, v) => ({
      ...c,
      h: Number(v)
    })
  }, {
    label: "S",
    max: 1,
    step: 0.01,
    getValue: (c) => Math.round(c.s * 100) / 100,
    getColor: (c, v) => ({
      ...c,
      s: Number(v)
    })
  }, {
    label: "L",
    max: 1,
    step: 0.01,
    getValue: (c) => Math.round(c.l * 100) / 100,
    getColor: (c, v) => ({
      ...c,
      l: Number(v)
    })
  }, {
    label: "A",
    max: 1,
    step: 0.01,
    getValue: (_ref2) => {
      let {
        a
      } = _ref2;
      return a != null ? Math.round(a * 100) / 100 : 1;
    },
    getColor: (c, v) => ({
      ...c,
      a: Number(v)
    })
  }],
  to: HSVtoHSL,
  from: HSLtoHSV
};
const hsl = {
  ...hsla,
  inputs: hsla.inputs.slice(0, 3)
};
const hexa = {
  inputProps: {
    type: "text"
  },
  inputs: [{
    label: "HEXA",
    getValue: (c) => c,
    getColor: (c, v) => v
  }],
  to: HSVtoHex,
  from: HexToHSV
};
const hex = {
  ...hexa,
  inputs: [{
    label: "HEX",
    getValue: (c) => c.slice(0, 7),
    getColor: (c, v) => v
  }]
};
const modes = {
  rgb,
  rgba,
  hsl,
  hsla,
  hex,
  hexa
};
const VColorPickerInput = (_ref) => {
  let {
    label,
    ...rest
  } = _ref;
  return createVNode("div", {
    "class": "v-color-picker-edit__input"
  }, [createVNode("input", rest, null), createVNode("span", null, [label])]);
};
const makeVColorPickerEditProps = propsFactory({
  color: Object,
  disabled: Boolean,
  mode: {
    type: String,
    default: "rgba",
    validator: (v) => Object.keys(modes).includes(v)
  },
  modes: {
    type: Array,
    default: () => Object.keys(modes),
    validator: (v) => Array.isArray(v) && v.every((m) => Object.keys(modes).includes(m))
  },
  ...makeComponentProps()
}, "VColorPickerEdit");
const VColorPickerEdit = defineComponent({
  name: "VColorPickerEdit",
  props: makeVColorPickerEditProps(),
  emits: {
    "update:color": (color) => true,
    "update:mode": (mode) => true
  },
  setup(props, _ref2) {
    let {
      emit
    } = _ref2;
    const enabledModes = computed(() => {
      return props.modes.map((key) => ({
        ...modes[key],
        name: key
      }));
    });
    const inputs = computed(() => {
      var _a2;
      const mode = enabledModes.value.find((m) => m.name === props.mode);
      if (!mode) return [];
      const color = props.color ? mode.to(props.color) : null;
      return (_a2 = mode.inputs) == null ? void 0 : _a2.map((_ref3) => {
        let {
          getValue,
          getColor,
          ...inputProps
        } = _ref3;
        return {
          ...mode.inputProps,
          ...inputProps,
          disabled: props.disabled,
          value: color && getValue(color),
          onChange: (e) => {
            const target = e.target;
            if (!target) return;
            emit("update:color", mode.from(getColor(color != null ? color : mode.to(nullColor), target.value)));
          }
        };
      });
    });
    useRender(() => {
      var _a2;
      return createVNode("div", {
        "class": ["v-color-picker-edit", props.class],
        "style": props.style
      }, [(_a2 = inputs.value) == null ? void 0 : _a2.map((props2) => createVNode(VColorPickerInput, props2, null)), enabledModes.value.length > 1 && createVNode(VBtn, {
        "icon": "$unfold",
        "size": "x-small",
        "variant": "plain",
        "onClick": () => {
          const mi = enabledModes.value.findIndex((m) => m.name === props.mode);
          emit("update:mode", enabledModes.value[(mi + 1) % enabledModes.value.length].name);
        }
      }, null)]);
    });
    return {};
  }
});
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
  const step = computed(() => +props.step > 0 ? parseFloat(props.step) : 0);
  const decimals = computed(() => Math.max(getDecimals(step.value), getDecimals(min.value)));
  function roundValue(value) {
    value = parseFloat(value);
    if (step.value <= 0) return value;
    const clamped = clamp(value, min.value, max.value);
    const offset = min.value % step.value;
    const newValue = Math.round((clamped - offset) / step.value) * step.value + offset;
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
  const isReversed = toRef(props, "reverse");
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
  const disabled = toRef(props, "disabled");
  const thumbColor = computed(() => {
    var _a2;
    return props.error || props.disabled ? void 0 : (_a2 = props.thumbColor) != null ? _a2 : props.color;
  });
  const trackColor = computed(() => {
    var _a2;
    return props.error || props.disabled ? void 0 : (_a2 = props.trackColor) != null ? _a2 : props.color;
  });
  const trackFillColor = computed(() => {
    var _a2;
    return props.error || props.disabled ? void 0 : (_a2 = props.trackFillColor) != null ? _a2 : props.color;
  });
  const mousePressed = shallowRef(false);
  const startOffset = shallowRef(0);
  const trackContainerRef = ref();
  const activeThumbRef = ref();
  function parseMouseMove(e) {
    var _a2;
    const vertical2 = props.direction === "vertical";
    const start = vertical2 ? "top" : "left";
    const length = vertical2 ? "height" : "width";
    const position2 = vertical2 ? "clientY" : "clientX";
    const {
      [start]: trackStart,
      [length]: trackLength
    } = (_a2 = trackContainerRef.value) == null ? void 0 : _a2.$el.getBoundingClientRect();
    const clickOffset = getPosition(e, position2);
    let clickPos = Math.min(Math.max((clickOffset - trackStart - startOffset.value) / trackLength, 0), 1) || 0;
    if (vertical2 ? indexFromEnd.value : indexFromEnd.value !== isRtl.value) clickPos = 1 - clickPos;
    return roundValue(min.value + clickPos * (max.value - min.value));
  }
  const handleStop = (e) => {
    onSliderEnd({
      value: parseMouseMove(e)
    });
    mousePressed.value = false;
    startOffset.value = 0;
  };
  const handleStart = (e) => {
    activeThumbRef.value = getActiveThumb(e);
    if (!activeThumbRef.value) return;
    activeThumbRef.value.focus();
    mousePressed.value = true;
    if (activeThumbRef.value.contains(e.target)) {
      startOffset.value = getOffset(e, activeThumbRef.value, props.direction);
    } else {
      startOffset.value = 0;
      onSliderMove({
        value: parseMouseMove(e)
      });
    }
    onSliderStart({
      value: parseMouseMove(e)
    });
  };
  const moveListenerOptions = {
    passive: true,
    capture: true
  };
  function onMouseMove(e) {
    onSliderMove({
      value: parseMouseMove(e)
    });
  }
  function onSliderMouseUp(e) {
    e.stopPropagation();
    e.preventDefault();
    handleStop(e);
    (void 0).removeEventListener("mousemove", onMouseMove, moveListenerOptions);
    (void 0).removeEventListener("mouseup", onSliderMouseUp);
  }
  function onSliderTouchend(e) {
    var _a2;
    handleStop(e);
    (void 0).removeEventListener("touchmove", onMouseMove, moveListenerOptions);
    (_a2 = e.target) == null ? void 0 : _a2.removeEventListener("touchend", onSliderTouchend);
  }
  function onSliderTouchstart(e) {
    var _a2;
    handleStart(e);
    (void 0).addEventListener("touchmove", onMouseMove, moveListenerOptions);
    (_a2 = e.target) == null ? void 0 : _a2.addEventListener("touchend", onSliderTouchend, {
      passive: false
    });
  }
  function onSliderMousedown(e) {
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
  const showTicks = toRef(props, "showTicks");
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
    color: toRef(props, "color"),
    decimals,
    disabled,
    direction: toRef(props, "direction"),
    elevation: toRef(props, "elevation"),
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
    readonly: toRef(props, "readonly"),
    rounded: toRef(props, "rounded"),
    roundValue,
    showTicks,
    startOffset,
    step,
    thumbSize,
    thumbColor,
    thumbLabel: toRef(props, "thumbLabel"),
    ticks: toRef(props, "ticks"),
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
    Ripple
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
      const steps = (props.max - props.min) / _step;
      if ([left, right, down, up].includes(e.key)) {
        const increase = vertical.value ? [isRtl.value ? left : right, isReversed.value ? down : up] : indexFromEnd.value !== isRtl.value ? [left, up] : [right, up];
        const direction2 = increase.includes(e.key) ? 1 : -1;
        const multiplier = e.shiftKey ? 2 : e.ctrlKey ? 1 : 0;
        value = value + direction2 * _step * multipliers.value[multiplier];
      } else if (e.key === home) {
        value = props.min;
      } else if (e.key === end) {
        value = props.max;
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
      return createVNode("div", {
        "class": ["v-slider-thumb", {
          "v-slider-thumb--focused": props.focused,
          "v-slider-thumb--pressed": props.focused && mousePressed.value
        }, props.class, rtlClasses.value],
        "style": [{
          "--v-slider-thumb-position": positionPercentage,
          "--v-slider-thumb-size": convertToUnit(thumbSize.value)
        }, props.style],
        "role": "slider",
        "tabindex": disabled.value ? -1 : 0,
        "aria-label": props.name,
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": props.modelValue,
        "aria-readonly": !!readonly.value,
        "aria-orientation": direction.value,
        "onKeydown": !readonly.value ? onKeydown : void 0
      }, [createVNode("div", {
        "class": ["v-slider-thumb__surface", textColorClasses.value, elevationClasses.value],
        "style": {
          ...textColorStyles.value
        }
      }, null), withDirectives(createVNode("div", {
        "class": ["v-slider-thumb__ripple", textColorClasses.value],
        "style": textColorStyles.value
      }, null), [[resolveDirective("ripple"), props.ripple, null, {
        circle: true,
        center: true
      }]]), createVNode(VScaleTransition, {
        "origin": "bottom center"
      }, {
        default: () => {
          var _a3;
          var _a2;
          return [withDirectives(createVNode("div", {
            "class": "v-slider-thumb__label-container"
          }, [createVNode("div", {
            "class": ["v-slider-thumb__label"]
          }, [createVNode("div", null, [(_a3 = (_a2 = slots["thumb-label"]) == null ? void 0 : _a2.call(slots, {
            modelValue: props.modelValue
          })) != null ? _a3 : props.modelValue.toFixed(step.value ? decimals.value : 1)])])]), [[vShow, thumbLabel.value && props.focused || thumbLabel.value === "always"]])];
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
        var _a3;
        var _a2;
        const directionValue = tick.value !== min.value && tick.value !== max.value ? convertToUnit(tick.position, "%") : void 0;
        return createVNode("div", {
          "key": tick.value,
          "class": ["v-slider-track__tick", {
            "v-slider-track__tick--filled": tick.position >= props.start && tick.position <= props.stop,
            "v-slider-track__tick--first": tick.value === min.value,
            "v-slider-track__tick--last": tick.value === max.value
          }],
          "style": {
            [startDir.value]: directionValue
          }
        }, [(tick.label || slots["tick-label"]) && createVNode("div", {
          "class": "v-slider-track__tick-label"
        }, [(_a3 = (_a2 = slots["tick-label"]) == null ? void 0 : _a2.call(slots, {
          tick,
          index
        })) != null ? _a3 : tick.label])]);
      });
    });
    useRender(() => {
      return createVNode("div", {
        "class": ["v-slider-track", roundedClasses.value, props.class],
        "style": [{
          "--v-slider-track-size": convertToUnit(trackSize.value),
          "--v-slider-tick-size": convertToUnit(tickSize.value)
        }, props.style]
      }, [createVNode("div", {
        "class": ["v-slider-track__background", trackColorClasses.value, {
          "v-slider-track__background--opacity": !!color.value || !trackFillColor.value
        }],
        "style": {
          ...backgroundStyles.value,
          ...trackColorStyles.value
        }
      }, null), createVNode("div", {
        "class": ["v-slider-track__fill", trackFillColorClasses.value],
        "style": {
          ...trackFillStyles.value,
          ...trackFillColorStyles.value
        }
      }, null), showTicks.value && createVNode("div", {
        "class": ["v-slider-track__ticks", {
          "v-slider-track__ticks--always-show": showTicks.value === "always"
        }]
      }, [computedTicks.value])]);
    });
    return {};
  }
});
const makeVSliderProps = propsFactory({
  ...makeFocusProps(),
  ...makeSliderProps(),
  ...makeVInputProps(),
  modelValue: {
    type: [Number, String],
    default: 0
  }
}, "VSlider");
const VSlider = genericComponent()({
  name: "VSlider",
  props: makeVSliderProps(),
  emits: {
    "update:focused": (value) => true,
    "update:modelValue": (v) => true,
    start: (value) => true,
    end: (value) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const thumbContainerRef = ref();
    const {
      rtlClasses
    } = useRtl();
    const steps = useSteps(props);
    const model = useProxiedModel(props, "modelValue", void 0, (value) => {
      return steps.roundValue(value == null ? steps.min.value : value);
    });
    const {
      min,
      max,
      mousePressed,
      roundValue,
      onSliderMousedown,
      onSliderTouchstart,
      trackContainerRef,
      position,
      hasLabels,
      readonly
    } = useSlider({
      props,
      steps,
      onSliderStart: () => {
        emit("start", model.value);
      },
      onSliderEnd: (_ref2) => {
        let {
          value
        } = _ref2;
        const roundedValue = roundValue(value);
        model.value = roundedValue;
        emit("end", roundedValue);
      },
      onSliderMove: (_ref3) => {
        let {
          value
        } = _ref3;
        return model.value = roundValue(value);
      },
      getActiveThumb: () => {
        var _a2;
        return (_a2 = thumbContainerRef.value) == null ? void 0 : _a2.$el;
      }
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const trackStop = computed(() => position(model.value));
    useRender(() => {
      const inputProps = VInput.filterProps(props);
      const hasPrepend = !!(props.label || slots.label || slots.prepend);
      return createVNode(VInput, mergeProps({
        "class": ["v-slider", {
          "v-slider--has-labels": !!slots["tick-label"] || hasLabels.value,
          "v-slider--focused": isFocused.value,
          "v-slider--pressed": mousePressed.value,
          "v-slider--disabled": props.disabled
        }, rtlClasses.value, props.class],
        "style": props.style
      }, inputProps, {
        "focused": isFocused.value
      }), {
        ...slots,
        prepend: hasPrepend ? (slotProps) => {
          var _a3;
          var _a2, _b;
          return createVNode(Fragment, null, [(_a3 = (_a2 = slots.label) == null ? void 0 : _a2.call(slots, slotProps)) != null ? _a3 : props.label ? createVNode(VLabel, {
            "id": slotProps.id.value,
            "class": "v-slider__label",
            "text": props.label
          }, null) : void 0, (_b = slots.prepend) == null ? void 0 : _b.call(slots, slotProps)]);
        } : void 0,
        default: (_ref4) => {
          let {
            id,
            messagesId
          } = _ref4;
          return createVNode("div", {
            "class": "v-slider__container",
            "onMousedown": !readonly.value ? onSliderMousedown : void 0,
            "onTouchstartPassive": !readonly.value ? onSliderTouchstart : void 0
          }, [createVNode("input", {
            "id": id.value,
            "name": props.name || id.value,
            "disabled": !!props.disabled,
            "readonly": !!props.readonly,
            "tabindex": "-1",
            "value": model.value
          }, null), createVNode(VSliderTrack, {
            "ref": trackContainerRef,
            "start": 0,
            "stop": trackStop.value
          }, {
            "tick-label": slots["tick-label"]
          }), createVNode(VSliderThumb, {
            "ref": thumbContainerRef,
            "aria-describedby": messagesId.value,
            "focused": isFocused.value,
            "min": min.value,
            "max": max.value,
            "modelValue": model.value,
            "onUpdate:modelValue": (v) => model.value = v,
            "position": trackStop.value,
            "elevation": props.elevation,
            "onFocus": focus,
            "onBlur": blur,
            "ripple": props.ripple,
            "name": props.name
          }, {
            "thumb-label": slots["thumb-label"]
          })]);
        }
      });
    });
    return {};
  }
});
const makeVColorPickerPreviewProps = propsFactory({
  color: {
    type: Object
  },
  disabled: Boolean,
  hideAlpha: Boolean,
  ...makeComponentProps()
}, "VColorPickerPreview");
const VColorPickerPreview = defineComponent({
  name: "VColorPickerPreview",
  props: makeVColorPickerPreviewProps(),
  emits: {
    "update:color": (color) => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    new AbortController();
    useRender(() => {
      var _a3, _b2;
      var _a2, _b;
      return createVNode("div", {
        "class": ["v-color-picker-preview", {
          "v-color-picker-preview--hide-alpha": props.hideAlpha
        }, props.class],
        "style": props.style
      }, [SUPPORTS_EYE_DROPPER, createVNode("div", {
        "class": "v-color-picker-preview__dot"
      }, [createVNode("div", {
        "style": {
          background: HSVtoCSS((_a3 = props.color) != null ? _a3 : nullColor)
        }
      }, null)]), createVNode("div", {
        "class": "v-color-picker-preview__sliders"
      }, [createVNode(VSlider, {
        "class": "v-color-picker-preview__track v-color-picker-preview__hue",
        "modelValue": (_a2 = props.color) == null ? void 0 : _a2.h,
        "onUpdate:modelValue": (h) => {
          var _a4;
          return emit("update:color", {
            ...(_a4 = props.color) != null ? _a4 : nullColor,
            h
          });
        },
        "step": 0,
        "min": 0,
        "max": 360,
        "disabled": props.disabled,
        "thumbSize": 14,
        "trackSize": 8,
        "trackFillColor": "white",
        "hideDetails": true
      }, null), !props.hideAlpha && createVNode(VSlider, {
        "class": "v-color-picker-preview__track v-color-picker-preview__alpha",
        "modelValue": (_b2 = (_b = props.color) == null ? void 0 : _b.a) != null ? _b2 : 1,
        "onUpdate:modelValue": (a) => {
          var _a4;
          return emit("update:color", {
            ...(_a4 = props.color) != null ? _a4 : nullColor,
            a
          });
        },
        "step": 1 / 256,
        "min": 0,
        "max": 1,
        "disabled": props.disabled,
        "thumbSize": 14,
        "trackSize": 8,
        "trackFillColor": "white",
        "hideDetails": true
      }, null)])]);
    });
    return {};
  }
});
const red = {
  base: "#f44336",
  lighten5: "#ffebee",
  lighten4: "#ffcdd2",
  lighten3: "#ef9a9a",
  lighten2: "#e57373",
  lighten1: "#ef5350",
  darken1: "#e53935",
  darken2: "#d32f2f",
  darken3: "#c62828",
  darken4: "#b71c1c",
  accent1: "#ff8a80",
  accent2: "#ff5252",
  accent3: "#ff1744",
  accent4: "#d50000"
};
const pink = {
  base: "#e91e63",
  lighten5: "#fce4ec",
  lighten4: "#f8bbd0",
  lighten3: "#f48fb1",
  lighten2: "#f06292",
  lighten1: "#ec407a",
  darken1: "#d81b60",
  darken2: "#c2185b",
  darken3: "#ad1457",
  darken4: "#880e4f",
  accent1: "#ff80ab",
  accent2: "#ff4081",
  accent3: "#f50057",
  accent4: "#c51162"
};
const purple = {
  base: "#9c27b0",
  lighten5: "#f3e5f5",
  lighten4: "#e1bee7",
  lighten3: "#ce93d8",
  lighten2: "#ba68c8",
  lighten1: "#ab47bc",
  darken1: "#8e24aa",
  darken2: "#7b1fa2",
  darken3: "#6a1b9a",
  darken4: "#4a148c",
  accent1: "#ea80fc",
  accent2: "#e040fb",
  accent3: "#d500f9",
  accent4: "#aa00ff"
};
const deepPurple = {
  base: "#673ab7",
  lighten5: "#ede7f6",
  lighten4: "#d1c4e9",
  lighten3: "#b39ddb",
  lighten2: "#9575cd",
  lighten1: "#7e57c2",
  darken1: "#5e35b1",
  darken2: "#512da8",
  darken3: "#4527a0",
  darken4: "#311b92",
  accent1: "#b388ff",
  accent2: "#7c4dff",
  accent3: "#651fff",
  accent4: "#6200ea"
};
const indigo = {
  base: "#3f51b5",
  lighten5: "#e8eaf6",
  lighten4: "#c5cae9",
  lighten3: "#9fa8da",
  lighten2: "#7986cb",
  lighten1: "#5c6bc0",
  darken1: "#3949ab",
  darken2: "#303f9f",
  darken3: "#283593",
  darken4: "#1a237e",
  accent1: "#8c9eff",
  accent2: "#536dfe",
  accent3: "#3d5afe",
  accent4: "#304ffe"
};
const blue = {
  base: "#2196f3",
  lighten5: "#e3f2fd",
  lighten4: "#bbdefb",
  lighten3: "#90caf9",
  lighten2: "#64b5f6",
  lighten1: "#42a5f5",
  darken1: "#1e88e5",
  darken2: "#1976d2",
  darken3: "#1565c0",
  darken4: "#0d47a1",
  accent1: "#82b1ff",
  accent2: "#448aff",
  accent3: "#2979ff",
  accent4: "#2962ff"
};
const lightBlue = {
  base: "#03a9f4",
  lighten5: "#e1f5fe",
  lighten4: "#b3e5fc",
  lighten3: "#81d4fa",
  lighten2: "#4fc3f7",
  lighten1: "#29b6f6",
  darken1: "#039be5",
  darken2: "#0288d1",
  darken3: "#0277bd",
  darken4: "#01579b",
  accent1: "#80d8ff",
  accent2: "#40c4ff",
  accent3: "#00b0ff",
  accent4: "#0091ea"
};
const cyan = {
  base: "#00bcd4",
  lighten5: "#e0f7fa",
  lighten4: "#b2ebf2",
  lighten3: "#80deea",
  lighten2: "#4dd0e1",
  lighten1: "#26c6da",
  darken1: "#00acc1",
  darken2: "#0097a7",
  darken3: "#00838f",
  darken4: "#006064",
  accent1: "#84ffff",
  accent2: "#18ffff",
  accent3: "#00e5ff",
  accent4: "#00b8d4"
};
const teal = {
  base: "#009688",
  lighten5: "#e0f2f1",
  lighten4: "#b2dfdb",
  lighten3: "#80cbc4",
  lighten2: "#4db6ac",
  lighten1: "#26a69a",
  darken1: "#00897b",
  darken2: "#00796b",
  darken3: "#00695c",
  darken4: "#004d40",
  accent1: "#a7ffeb",
  accent2: "#64ffda",
  accent3: "#1de9b6",
  accent4: "#00bfa5"
};
const green = {
  base: "#4caf50",
  lighten5: "#e8f5e9",
  lighten4: "#c8e6c9",
  lighten3: "#a5d6a7",
  lighten2: "#81c784",
  lighten1: "#66bb6a",
  darken1: "#43a047",
  darken2: "#388e3c",
  darken3: "#2e7d32",
  darken4: "#1b5e20",
  accent1: "#b9f6ca",
  accent2: "#69f0ae",
  accent3: "#00e676",
  accent4: "#00c853"
};
const lightGreen = {
  base: "#8bc34a",
  lighten5: "#f1f8e9",
  lighten4: "#dcedc8",
  lighten3: "#c5e1a5",
  lighten2: "#aed581",
  lighten1: "#9ccc65",
  darken1: "#7cb342",
  darken2: "#689f38",
  darken3: "#558b2f",
  darken4: "#33691e",
  accent1: "#ccff90",
  accent2: "#b2ff59",
  accent3: "#76ff03",
  accent4: "#64dd17"
};
const lime = {
  base: "#cddc39",
  lighten5: "#f9fbe7",
  lighten4: "#f0f4c3",
  lighten3: "#e6ee9c",
  lighten2: "#dce775",
  lighten1: "#d4e157",
  darken1: "#c0ca33",
  darken2: "#afb42b",
  darken3: "#9e9d24",
  darken4: "#827717",
  accent1: "#f4ff81",
  accent2: "#eeff41",
  accent3: "#c6ff00",
  accent4: "#aeea00"
};
const yellow = {
  base: "#ffeb3b",
  lighten5: "#fffde7",
  lighten4: "#fff9c4",
  lighten3: "#fff59d",
  lighten2: "#fff176",
  lighten1: "#ffee58",
  darken1: "#fdd835",
  darken2: "#fbc02d",
  darken3: "#f9a825",
  darken4: "#f57f17",
  accent1: "#ffff8d",
  accent2: "#ffff00",
  accent3: "#ffea00",
  accent4: "#ffd600"
};
const amber = {
  base: "#ffc107",
  lighten5: "#fff8e1",
  lighten4: "#ffecb3",
  lighten3: "#ffe082",
  lighten2: "#ffd54f",
  lighten1: "#ffca28",
  darken1: "#ffb300",
  darken2: "#ffa000",
  darken3: "#ff8f00",
  darken4: "#ff6f00",
  accent1: "#ffe57f",
  accent2: "#ffd740",
  accent3: "#ffc400",
  accent4: "#ffab00"
};
const orange = {
  base: "#ff9800",
  lighten5: "#fff3e0",
  lighten4: "#ffe0b2",
  lighten3: "#ffcc80",
  lighten2: "#ffb74d",
  lighten1: "#ffa726",
  darken1: "#fb8c00",
  darken2: "#f57c00",
  darken3: "#ef6c00",
  darken4: "#e65100",
  accent1: "#ffd180",
  accent2: "#ffab40",
  accent3: "#ff9100",
  accent4: "#ff6d00"
};
const deepOrange = {
  base: "#ff5722",
  lighten5: "#fbe9e7",
  lighten4: "#ffccbc",
  lighten3: "#ffab91",
  lighten2: "#ff8a65",
  lighten1: "#ff7043",
  darken1: "#f4511e",
  darken2: "#e64a19",
  darken3: "#d84315",
  darken4: "#bf360c",
  accent1: "#ff9e80",
  accent2: "#ff6e40",
  accent3: "#ff3d00",
  accent4: "#dd2c00"
};
const brown = {
  base: "#795548",
  lighten5: "#efebe9",
  lighten4: "#d7ccc8",
  lighten3: "#bcaaa4",
  lighten2: "#a1887f",
  lighten1: "#8d6e63",
  darken1: "#6d4c41",
  darken2: "#5d4037",
  darken3: "#4e342e",
  darken4: "#3e2723"
};
const blueGrey = {
  base: "#607d8b",
  lighten5: "#eceff1",
  lighten4: "#cfd8dc",
  lighten3: "#b0bec5",
  lighten2: "#90a4ae",
  lighten1: "#78909c",
  darken1: "#546e7a",
  darken2: "#455a64",
  darken3: "#37474f",
  darken4: "#263238"
};
const grey = {
  base: "#9e9e9e",
  lighten5: "#fafafa",
  lighten4: "#f5f5f5",
  lighten3: "#eeeeee",
  lighten2: "#e0e0e0",
  lighten1: "#bdbdbd",
  darken1: "#757575",
  darken2: "#616161",
  darken3: "#424242",
  darken4: "#212121"
};
const shades = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#ffffff00"
};
const colors = {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  blueGrey,
  grey,
  shades
};
const makeVColorPickerSwatchesProps = propsFactory({
  swatches: {
    type: Array,
    default: () => parseDefaultColors(colors)
  },
  disabled: Boolean,
  color: Object,
  maxHeight: [Number, String],
  ...makeComponentProps()
}, "VColorPickerSwatches");
function parseDefaultColors(colors2) {
  return Object.keys(colors2).map((key) => {
    const color = colors2[key];
    return color.base ? [color.base, color.darken4, color.darken3, color.darken2, color.darken1, color.lighten1, color.lighten2, color.lighten3, color.lighten4, color.lighten5] : [color.black, color.white, color.transparent];
  });
}
const VColorPickerSwatches = defineComponent({
  name: "VColorPickerSwatches",
  props: makeVColorPickerSwatchesProps(),
  emits: {
    "update:color": (color) => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    useRender(() => createVNode("div", {
      "class": ["v-color-picker-swatches", props.class],
      "style": [{
        maxHeight: convertToUnit(props.maxHeight)
      }, props.style]
    }, [createVNode("div", null, [props.swatches.map((swatch) => createVNode("div", {
      "class": "v-color-picker-swatches__swatch"
    }, [swatch.map((color) => {
      const rgba2 = parseColor(color);
      const hsva = RGBtoHSV(rgba2);
      const background = RGBtoCSS(rgba2);
      return createVNode("div", {
        "class": "v-color-picker-swatches__color",
        "onClick": () => hsva && emit("update:color", hsva)
      }, [createVNode("div", {
        "style": {
          background
        }
      }, [props.color && deepEqual(props.color, hsva) ? createVNode(VIcon, {
        "size": "x-small",
        "icon": "$success",
        "color": getContrast(color, "#FFFFFF") > 2 ? "white" : "black"
      }, null) : void 0])]);
    })]))])]));
    return {};
  }
});
const makeVColorPickerProps = propsFactory({
  canvasHeight: {
    type: [String, Number],
    default: 150
  },
  disabled: Boolean,
  dotSize: {
    type: [Number, String],
    default: 10
  },
  hideCanvas: Boolean,
  hideSliders: Boolean,
  hideInputs: Boolean,
  mode: {
    type: String,
    default: "rgba",
    validator: (v) => Object.keys(modes).includes(v)
  },
  modes: {
    type: Array,
    default: () => Object.keys(modes),
    validator: (v) => Array.isArray(v) && v.every((m) => Object.keys(modes).includes(m))
  },
  showSwatches: Boolean,
  swatches: Array,
  swatchesMaxHeight: {
    type: [Number, String],
    default: 150
  },
  modelValue: {
    type: [Object, String]
  },
  ...omit(makeVSheetProps({
    width: 300
  }), ["height", "location", "minHeight", "maxHeight", "minWidth", "maxWidth"])
}, "VColorPicker");
const VColorPicker = defineComponent({
  name: "VColorPicker",
  props: makeVColorPickerProps(),
  emits: {
    "update:modelValue": (color) => true,
    "update:mode": (mode) => true
  },
  setup(props) {
    const mode = useProxiedModel(props, "mode");
    const hue = ref(null);
    const model = useProxiedModel(props, "modelValue", void 0, (v) => {
      if (v == null || v === "") return null;
      let c;
      try {
        c = RGBtoHSV(parseColor(v));
      } catch (err) {
        consoleWarn(err);
        return null;
      }
      return c;
    }, (v) => {
      if (!v) return null;
      return extractColor(v, props.modelValue);
    });
    const currentColor = computed(() => {
      var _a2;
      return model.value ? {
        ...model.value,
        h: (_a2 = hue.value) != null ? _a2 : model.value.h
      } : null;
    });
    const {
      rtlClasses
    } = useRtl();
    let externalChange = true;
    watch(model, (v) => {
      if (!externalChange) {
        externalChange = true;
        return;
      }
      if (!v) return;
      hue.value = v.h;
    }, {
      immediate: true
    });
    const updateColor = (hsva) => {
      externalChange = false;
      hue.value = hsva.h;
      model.value = hsva;
    };
    provideDefaults({
      VSlider: {
        color: void 0,
        trackColor: void 0,
        trackFillColor: void 0
      }
    });
    useRender(() => {
      var _a2;
      const sheetProps = VSheet.filterProps(props);
      return createVNode(VSheet, mergeProps({
        "rounded": props.rounded,
        "elevation": props.elevation,
        "theme": props.theme,
        "class": ["v-color-picker", rtlClasses.value, props.class],
        "style": [{
          "--v-color-picker-color-hsv": HSVtoCSS({
            ...(_a2 = currentColor.value) != null ? _a2 : nullColor,
            a: 1
          })
        }, props.style]
      }, sheetProps, {
        "maxWidth": props.width
      }), {
        default: () => [!props.hideCanvas && createVNode(VColorPickerCanvas, {
          "key": "canvas",
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "disabled": props.disabled,
          "dotSize": props.dotSize,
          "width": props.width,
          "height": props.canvasHeight
        }, null), (!props.hideSliders || !props.hideInputs) && createVNode("div", {
          "key": "controls",
          "class": "v-color-picker__controls"
        }, [!props.hideSliders && createVNode(VColorPickerPreview, {
          "key": "preview",
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "hideAlpha": !mode.value.endsWith("a"),
          "disabled": props.disabled
        }, null), !props.hideInputs && createVNode(VColorPickerEdit, {
          "key": "edit",
          "modes": props.modes,
          "mode": mode.value,
          "onUpdate:mode": (m) => mode.value = m,
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "disabled": props.disabled
        }, null)]), props.showSwatches && createVNode(VColorPickerSwatches, {
          "key": "swatches",
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "maxHeight": props.swatchesMaxHeight,
          "swatches": props.swatches,
          "disabled": props.disabled
        }, null)]
      });
    });
    return {};
  }
});
const _sfc_main$g = /* @__PURE__ */ defineComponent$1({
  __name: "app-bar-search-input",
  __ssrInlineRender: true,
  setup(__props) {
    const { search: search2 } = storeToRefs(useTeamStore());
    const updateSearchModel = (searchValue) => {
      search2.value = searchValue;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(SearchInput, mergeProps({
        "min-width": 300,
        placeholder: "Buscar un Equipo",
        class: "mr-4",
        onSearching: updateSearchModel
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/app-bar-search-input.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent$1({
  __name: "export-btn",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AppBarSecondaryBtn, mergeProps({
        text: "Export .csv",
        class: "mr-4"
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/export-btn.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent$1({
  __name: "import-btn",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AppBarSecondaryBtn, mergeProps({
        text: "Import .csv",
        class: "mr-4"
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/import-btn.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent$1({
  __name: "app-bar-cat-btn",
  __ssrInlineRender: true,
  setup(__props) {
    const { dialog } = storeToRefs(useTeamStore());
    const toggleDialog = () => {
      dialog.value = !dialog.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$4$1, mergeProps({
        text: "Crear Equipo",
        icon: "futzo-icon:plus",
        class: "mr-8",
        onClick: toggleDialog
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/app-bar-cat-btn.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent$1({
  __name: "team-navbar-buttons",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$g, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$f, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$e, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$d, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/team-navbar-buttons.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    width: "355",
    height: "251",
    viewBox: "0 0 355 251",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path d="M287.319 0.510742H74.7655C64.983 0.510742 57.0527 8.44102 57.0527 18.2235V230.777C57.0527 240.559 64.983 248.489 74.7655 248.489H287.319C297.101 248.489 305.031 240.559 305.031 230.777V18.2235C305.031 8.44102 297.101 0.510742 287.319 0.510742Z" fill="url(#paint0_linear_1337_5140)"></path><g filter="url(#filter0_d_1337_5140)"><path d="M96.0224 96.1592H335.145C337.494 96.1592 339.746 97.0923 341.407 98.7532C343.068 100.414 344.001 102.667 344.001 105.016V149.297C344.001 151.646 343.068 153.899 341.407 155.56C339.746 157.221 337.494 158.154 335.145 158.154H96.0224C93.6735 158.154 91.4209 157.221 89.76 155.56C88.0991 153.899 87.166 151.646 87.166 149.297V105.016C87.166 102.667 88.0991 100.414 89.76 98.7532C91.4209 97.0923 93.6735 96.1592 96.0224 96.1592V96.1592Z" fill="white"></path></g><path d="M227.096 110.33H181.042C178.108 110.33 175.729 112.709 175.729 115.643C175.729 118.578 178.108 120.957 181.042 120.957H227.096C230.03 120.957 232.409 118.578 232.409 115.643C232.409 112.709 230.03 110.33 227.096 110.33Z" fill="#CCB1FE"></path><path d="M258.979 133.356H181.042C178.108 133.356 175.729 135.736 175.729 138.67C175.729 141.605 178.108 143.984 181.042 143.984H258.979C261.913 143.984 264.292 141.605 264.292 138.67C264.292 135.736 261.913 133.356 258.979 133.356Z" fill="#F4EEFF"></path><path d="M141.188 143.984C150.482 143.984 158.016 136.451 158.016 127.157C158.016 117.864 150.482 110.33 141.188 110.33C131.895 110.33 124.361 117.864 124.361 127.157C124.361 136.451 131.895 143.984 141.188 143.984Z" fill="#9155FD"></path><path d="M132.438 122.712H134.089L136.96 129.721H137.066L139.936 122.712H141.587V131.729H140.293V125.204H140.209L137.55 131.716H136.476L133.816 125.199H133.732V131.729H132.438V122.712ZM143.566 131.729V122.712H146.78C147.481 122.712 148.062 122.839 148.523 123.095C148.984 123.35 149.329 123.699 149.558 124.143C149.787 124.583 149.901 125.079 149.901 125.631C149.901 126.186 149.786 126.685 149.554 127.128C149.325 127.568 148.978 127.917 148.515 128.176C148.054 128.431 147.474 128.559 146.775 128.559H144.565V127.405H146.652C147.095 127.405 147.455 127.329 147.731 127.176C148.007 127.021 148.209 126.809 148.338 126.542C148.468 126.275 148.532 125.971 148.532 125.631C148.532 125.29 148.468 124.988 148.338 124.724C148.209 124.46 148.005 124.253 147.726 124.103C147.45 123.953 147.086 123.878 146.634 123.878H144.926V131.729H143.566Z" fill="white"></path><g filter="url(#filter1_d_1337_5140)"><path d="M19.8564 172.325H258.979C261.328 172.325 263.58 173.258 265.241 174.919C266.902 176.58 267.835 178.832 267.835 181.181V225.463C267.835 227.812 266.902 230.065 265.241 231.725C263.58 233.386 261.328 234.319 258.979 234.319H19.8564C17.5075 234.319 15.2549 233.386 13.594 231.725C11.9331 230.065 11 227.812 11 225.463V181.181C11 178.832 11.9331 176.58 13.594 174.919C15.2549 173.258 17.5075 172.325 19.8564 172.325V172.325Z" fill="white"></path></g><path d="M150.93 186.495H104.876C101.942 186.495 99.5625 188.874 99.5625 191.809C99.5625 194.744 101.942 197.123 104.876 197.123H150.93C153.864 197.123 156.243 194.744 156.243 191.809C156.243 188.874 153.864 186.495 150.93 186.495Z" fill="#CCB1FE"></path><path d="M182.812 209.521H104.876C101.942 209.521 99.5625 211.901 99.5625 214.835C99.5625 217.77 101.942 220.149 104.876 220.149H182.812C185.747 220.149 188.126 217.77 188.126 214.835C188.126 211.901 185.747 209.521 182.812 209.521Z" fill="#F4EEFF"></path><path d="M41.999 220.149C51.2924 220.149 58.8261 212.616 58.8261 203.322C58.8261 194.029 51.2924 186.495 41.999 186.495C32.7056 186.495 25.1719 194.029 25.1719 203.322C25.1719 212.616 32.7056 220.149 41.999 220.149Z" fill="#9155FD"></path><path d="M38.5228 198.877H39.879V205.27C39.879 205.848 39.7645 206.343 39.5355 206.754C39.3095 207.165 38.991 207.479 38.5801 207.696C38.1691 207.91 37.6877 208.017 37.1359 208.017C36.6281 208.017 36.1716 207.925 35.7665 207.74C35.3644 207.555 35.0459 207.286 34.8111 206.934C34.5792 206.579 34.4632 206.148 34.4632 205.64H35.815C35.815 205.889 35.8722 206.105 35.9867 206.287C36.1041 206.469 36.2641 206.611 36.4666 206.714C36.6721 206.814 36.9069 206.864 37.1711 206.864C37.4588 206.864 37.7024 206.804 37.902 206.683C38.1046 206.56 38.2587 206.379 38.3643 206.142C38.47 205.904 38.5228 205.613 38.5228 205.27V198.877ZM46.7774 201.245C46.7305 200.829 46.5367 200.506 46.1962 200.277C45.8557 200.045 45.4272 199.929 44.9105 199.929C44.5407 199.929 44.2207 199.988 43.9507 200.105C43.6806 200.22 43.4707 200.378 43.321 200.581C43.1743 200.78 43.1009 201.008 43.1009 201.263C43.1009 201.477 43.1508 201.662 43.2506 201.818C43.3533 201.973 43.4869 202.104 43.6513 202.21C43.8186 202.312 43.9976 202.399 44.1884 202.47C44.3792 202.537 44.5627 202.593 44.7388 202.637L45.6194 202.866C45.9071 202.936 46.2021 203.032 46.5044 203.152C46.8068 203.272 47.0871 203.431 47.3454 203.628C47.6037 203.824 47.8121 204.068 47.9706 204.358C48.1321 204.649 48.2128 204.997 48.2128 205.402C48.2128 205.913 48.0807 206.366 47.8165 206.762C47.5553 207.159 47.1752 207.471 46.6762 207.7C46.1801 207.929 45.5798 208.044 44.8753 208.044C44.2002 208.044 43.616 207.937 43.1229 207.722C42.6298 207.508 42.2438 207.204 41.9649 206.811C41.686 206.415 41.5319 205.945 41.5026 205.402H42.8675C42.8939 205.728 42.9996 205.999 43.1845 206.216C43.3724 206.431 43.6116 206.591 43.9022 206.696C44.1958 206.799 44.5172 206.851 44.8665 206.851C45.251 206.851 45.593 206.79 45.8924 206.67C46.1948 206.547 46.4325 206.376 46.6057 206.159C46.7789 205.939 46.8655 205.682 46.8655 205.389C46.8655 205.122 46.7892 204.903 46.6365 204.733C46.4868 204.562 46.2828 204.422 46.0245 204.31C45.7691 204.198 45.48 204.1 45.1571 204.015L44.0916 203.724C43.3695 203.528 42.7971 203.239 42.3744 202.857C41.9546 202.475 41.7448 201.97 41.7448 201.342C41.7448 200.823 41.8857 200.369 42.1674 199.982C42.4492 199.594 42.8308 199.293 43.3122 199.079C43.7936 198.862 44.3367 198.753 44.9414 198.753C45.5519 198.753 46.0905 198.86 46.5573 199.075C47.0269 199.289 47.3968 199.584 47.6668 199.96C47.9369 200.333 48.0778 200.761 48.0895 201.245H46.7774Z" fill="white"></path><g filter="url(#filter2_d_1337_5140)"><path d="M258.979 19.9946H19.8564C14.9651 19.9946 11 23.9598 11 28.851V73.1329C11 78.0242 14.9651 81.9893 19.8564 81.9893H258.979C263.87 81.9893 267.835 78.0242 267.835 73.1329V28.851C267.835 23.9598 263.87 19.9946 258.979 19.9946Z" fill="white"></path></g><path d="M147.389 34.165H101.335C98.4006 34.165 96.0215 36.5441 96.0215 39.4789C96.0215 42.4136 98.4006 44.7927 101.335 44.7927H147.389C150.323 44.7927 152.702 42.4136 152.702 39.4789C152.702 36.5441 150.323 34.165 147.389 34.165Z" fill="#CCB1FE"></path><path d="M179.271 57.1914H101.335C98.4006 57.1914 96.0215 59.5705 96.0215 62.5052C96.0215 65.44 98.4006 67.8191 101.335 67.8191H179.271C182.206 67.8191 184.585 65.44 184.585 62.5052C184.585 59.5705 182.206 57.1914 179.271 57.1914Z" fill="#F4EEFF"></path><path d="M65.0224 67.8188C74.3158 67.8188 81.8496 60.285 81.8496 50.9917C81.8496 41.6983 74.3158 34.1646 65.0224 34.1646C55.7291 34.1646 48.1953 41.6983 48.1953 50.9917C48.1953 60.285 55.7291 67.8188 65.0224 67.8188Z" fill="#9155FD"></path><path d="M62.9596 48.9149C62.9127 48.4981 62.719 48.1752 62.3784 47.9462C62.0379 47.7143 61.6094 47.5984 61.0928 47.5984C60.7229 47.5984 60.403 47.6571 60.1329 47.7745C59.8629 47.889 59.653 48.0475 59.5033 48.25C59.3565 48.4496 59.2831 48.6771 59.2831 48.9325C59.2831 49.1468 59.333 49.3317 59.4328 49.4873C59.5356 49.6429 59.6691 49.7735 59.8335 49.8792C60.0008 49.9819 60.1799 50.0685 60.3707 50.1389C60.5615 50.2065 60.7449 50.2622 60.921 50.3063L61.8017 50.5352C62.0893 50.6057 62.3843 50.7011 62.6867 50.8214C62.989 50.9418 63.2693 51.1003 63.5276 51.2969C63.786 51.4936 63.9944 51.7372 64.1529 52.0278C64.3143 52.3184 64.395 52.6663 64.395 53.0714C64.395 53.5821 64.2629 54.0356 63.9988 54.4319C63.7375 54.8282 63.3574 55.1408 62.8584 55.3697C62.3623 55.5987 61.762 55.7132 61.0575 55.7132C60.3824 55.7132 59.7983 55.606 59.3051 55.3918C58.812 55.1775 58.426 54.8737 58.1471 54.4803C57.8683 54.0841 57.7142 53.6144 57.6848 53.0714H59.0498C59.0762 53.3972 59.1818 53.6687 59.3668 53.8859C59.5546 54.1002 59.7939 54.2602 60.0845 54.3659C60.378 54.4686 60.6994 54.52 61.0487 54.52C61.4333 54.52 61.7752 54.4598 62.0746 54.3394C62.377 54.2161 62.6147 54.0459 62.7879 53.8287C62.9611 53.6085 63.0477 53.3517 63.0477 53.0582C63.0477 52.791 62.9714 52.5724 62.8188 52.4021C62.669 52.2318 62.465 52.091 62.2067 51.9794C61.9514 51.8679 61.6622 51.7695 61.3393 51.6844L60.2738 51.3938C59.5517 51.1971 58.9793 50.908 58.5566 50.5264C58.1369 50.1448 57.927 49.6399 57.927 49.0118C57.927 48.4922 58.0679 48.0387 58.3497 47.6512C58.6315 47.2638 59.0131 46.9629 59.4945 46.7486C59.9759 46.5314 60.5189 46.4228 61.1236 46.4228C61.7341 46.4228 62.2728 46.5299 62.7395 46.7442C63.2092 46.9585 63.579 47.2535 63.8491 47.6292C64.1191 48.002 64.26 48.4306 64.2718 48.9149H62.9596ZM68.9401 55.5635H66.0209V46.5461H69.0325C69.9161 46.5461 70.6749 46.7266 71.3089 47.0876C71.9429 47.4458 72.4287 47.9609 72.7663 48.6331C73.1068 49.3024 73.2771 50.1052 73.2771 51.0416C73.2771 51.9809 73.1053 52.7881 72.7619 53.4632C72.4214 54.1384 71.9283 54.6579 71.2825 55.0219C70.6367 55.383 69.8559 55.5635 68.9401 55.5635ZM67.3814 54.3747H68.8652C69.5521 54.3747 70.123 54.2455 70.578 53.9872C71.033 53.7259 71.3735 53.3488 71.5995 52.8556C71.8255 52.3595 71.9385 51.7549 71.9385 51.0416C71.9385 50.3341 71.8255 49.7339 71.5995 49.2407C71.3764 48.7476 71.0432 48.3733 70.6 48.118C70.1568 47.8626 69.6064 47.7349 68.9489 47.7349H67.3814V54.3747Z" fill="white"></path><defs><filter id="filter0_d_1337_5140" x="76.5384" y="90.8453" width="278.091" height="83.2499" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="5.31383"></feOffset><feGaussianBlur stdDeviation="5.31383"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1337_5140"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1337_5140" result="shape"></feBlend></filter><filter id="filter1_d_1337_5140" x="0.37234" y="167.011" width="278.091" height="83.2499" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="5.31383"></feOffset><feGaussianBlur stdDeviation="5.31383"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1337_5140"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1337_5140" result="shape"></feBlend></filter><filter id="filter2_d_1337_5140" x="0.37234" y="14.6808" width="278.091" height="83.2499" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="5.31383"></feOffset><feGaussianBlur stdDeviation="5.31383"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1337_5140"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1337_5140" result="shape"></feBlend></filter><linearGradient id="paint0_linear_1337_5140" x1="181.042" y1="0.510742" x2="181.042" y2="248.489" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#F4EEFF"></stop><stop offset="1" stop-color="#FCFAFF"></stop></linearGradient></defs></svg>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/noTeamsSvg.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const NoTeamsSvg = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent$1({
  __name: "NoTeams",
  __ssrInlineRender: true,
  setup(__props) {
    const { dialog, teams } = storeToRefs(useTeamStore());
    const toggleDialog = () => {
      dialog.value = !dialog.value;
    };
    const noTeams = computed(() => {
      var _a2;
      return ((_a2 = teams.value) == null ? void 0 : _a2.length) === 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(noTeams)) {
        _push(ssrRenderComponent(VSheet, mergeProps({ class: "no-teams-v-sheet d-flex justify-center align-center fill-height" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="d-flex flex-column align-center"${_scopeId}><h2 class="card-title"${_scopeId}>No hay equipos a\xFAn</h2>`);
              _push2(ssrRenderComponent(NoTeamsSvg, null, null, _parent2, _scopeId));
              _push2(`<p class="card-sub-title"${_scopeId}>Crea un torneo para verlo aqu\xED.</p>`);
              _push2(ssrRenderComponent(VBtn, {
                color: "primary",
                variant: "elevated",
                class: "mt-4 text-body-1",
                onClick: toggleDialog
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Crear Equipo `);
                  } else {
                    return [
                      createTextVNode(" Crear Equipo ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "d-flex flex-column align-center" }, [
                  createVNode("h2", { class: "card-title" }, "No hay equipos a\xFAn"),
                  createVNode(NoTeamsSvg),
                  createVNode("p", { class: "card-sub-title" }, "Crea un torneo para verlo aqu\xED."),
                  createVNode(VBtn, {
                    color: "primary",
                    variant: "elevated",
                    class: "mt-4 text-body-1",
                    onClick: toggleDialog
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Crear Equipo ")
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/NoTeams.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent$1({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const { dialog, steps, isEdition } = storeToRefs(useTeamStore());
    const title = computed(() => {
      switch (steps.value.current) {
        case "createTeam":
          return isEdition.value ? "Editar equipo" : "Crear un equipo";
        case "createDt":
          return isEdition.value ? "Editar DT" : "Crear DT";
        case "createOwner":
          return isEdition.value ? "Editar due\xF1o" : "Crear due\xF1o";
      }
    });
    const subtitle = computed(() => {
      switch (steps.value.current) {
        case "createTeam":
          return isEdition.value ? "Modifica los detalles del equipo." : "Completa los detalles del equipo.";
        case "createDt":
          return isEdition.value ? "Modifica los detalles del DT." : "Completa los detalles del DT.";
        case "createOwner":
          return isEdition.value ? "Modifica los detalles del due\xF1o." : "Completa los detalles del due\xF1o.";
      }
    });
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/CreateTeamDialog/Header.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent$1({
  __name: "colorPicker",
  __ssrInlineRender: true,
  props: {
    "color": {
      type: String
    },
    "colorModifiers": {}
  },
  emits: ["update:color"],
  setup(__props) {
    const color = useModel(__props, "color");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "color-picker-items-container__item",
        style: { backgroundColor: color.value }
      }, _attrs))}>`);
      _push(ssrRenderComponent(VDialog, {
        activator: "parent",
        "max-width": "264",
        absolute: true,
        scrim: false,
        offset: [150, 0],
        class: "color-picker-dialog",
        elevation: "15",
        "location-strategy": "connected"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, {
              height: "350",
              width: "264",
              class: "d-flex justify-center align-center flex-row pa-4 position-relative"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VColorPicker, {
                    width: "230",
                    elevation: "0",
                    mode: "hexa",
                    modelValue: color.value,
                    "onUpdate:modelValue": ($event) => color.value = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VColorPicker, {
                      width: "230",
                      elevation: "0",
                      mode: "hexa",
                      modelValue: color.value,
                      "onUpdate:modelValue": ($event) => color.value = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Icon, {
              name: "futzo-icon:polygon",
              class: "polygon"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, {
                height: "350",
                width: "264",
                class: "d-flex justify-center align-center flex-row pa-4 position-relative"
              }, {
                default: withCtx(() => [
                  createVNode(VColorPicker, {
                    width: "230",
                    elevation: "0",
                    mode: "hexa",
                    modelValue: color.value,
                    "onUpdate:modelValue": ($event) => color.value = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_Icon, {
                name: "futzo-icon:polygon",
                class: "polygon"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/colorPicker.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent$1({
  __name: "colors-component",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
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
    const store = useTeamStore();
    storeToRefs(store);
    const colors2 = ref({
      home: {
        primary: "#fff",
        secondary: "#fff"
      },
      away: {
        primary: "#fff",
        secondary: "#fff"
      }
    });
    const colorsModel = useModel(__props, "modelValue");
    watch(
      colors2,
      (value) => {
        colorsModel.value = value;
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VRow, mergeProps({ "no-gutters": "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="color-pickers-container"${_scopeId2}><div class="color-pickers-container__label"${_scopeId2}><span class="text-body-2"${_scopeId2}>Local</span></div><div class="color-picker-items-container"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$8, {
                    color: unref(colors2).home.primary,
                    "onUpdate:color": ($event) => unref(colors2).home.primary = $event
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$8, {
                    color: unref(colors2).home.secondary,
                    "onUpdate:color": ($event) => unref(colors2).home.secondary = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><small class="text-error text-caption"${_scopeId2}>${ssrInterpolate(__props.errors["error-messages"][0])}</small></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "color-pickers-container" }, [
                      createVNode("div", { class: "color-pickers-container__label" }, [
                        createVNode("span", { class: "text-body-2" }, "Local")
                      ]),
                      createVNode("div", { class: "color-picker-items-container" }, [
                        createVNode(_sfc_main$8, {
                          color: unref(colors2).home.primary,
                          "onUpdate:color": ($event) => unref(colors2).home.primary = $event
                        }, null, 8, ["color", "onUpdate:color"]),
                        createVNode(_sfc_main$8, {
                          color: unref(colors2).home.secondary,
                          "onUpdate:color": ($event) => unref(colors2).home.secondary = $event
                        }, null, 8, ["color", "onUpdate:color"])
                      ]),
                      createVNode("div", null, [
                        createVNode("small", { class: "text-error text-caption" }, toDisplayString(__props.errors["error-messages"][0]), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { cols: "6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="color-pickers-container"${_scopeId2}><div class="color-pickers-container__label"${_scopeId2}><span class="text-body-2"${_scopeId2}>Visitante</span></div><div class="color-picker-items-container"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$8, {
                    color: unref(colors2).away.primary,
                    "onUpdate:color": ($event) => unref(colors2).away.primary = $event
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$8, {
                    color: unref(colors2).away.secondary,
                    "onUpdate:color": ($event) => unref(colors2).away.secondary = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><small class="text-error text-caption"${_scopeId2}>${ssrInterpolate(__props.errors["error-messages"][0])}</small></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "color-pickers-container" }, [
                      createVNode("div", { class: "color-pickers-container__label" }, [
                        createVNode("span", { class: "text-body-2" }, "Visitante")
                      ]),
                      createVNode("div", { class: "color-picker-items-container" }, [
                        createVNode(_sfc_main$8, {
                          color: unref(colors2).away.primary,
                          "onUpdate:color": ($event) => unref(colors2).away.primary = $event
                        }, null, 8, ["color", "onUpdate:color"]),
                        createVNode(_sfc_main$8, {
                          color: unref(colors2).away.secondary,
                          "onUpdate:color": ($event) => unref(colors2).away.secondary = $event
                        }, null, 8, ["color", "onUpdate:color"])
                      ]),
                      createVNode("div", null, [
                        createVNode("small", { class: "text-error text-caption" }, toDisplayString(__props.errors["error-messages"][0]), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, { cols: "6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "color-pickers-container" }, [
                    createVNode("div", { class: "color-pickers-container__label" }, [
                      createVNode("span", { class: "text-body-2" }, "Local")
                    ]),
                    createVNode("div", { class: "color-picker-items-container" }, [
                      createVNode(_sfc_main$8, {
                        color: unref(colors2).home.primary,
                        "onUpdate:color": ($event) => unref(colors2).home.primary = $event
                      }, null, 8, ["color", "onUpdate:color"]),
                      createVNode(_sfc_main$8, {
                        color: unref(colors2).home.secondary,
                        "onUpdate:color": ($event) => unref(colors2).home.secondary = $event
                      }, null, 8, ["color", "onUpdate:color"])
                    ]),
                    createVNode("div", null, [
                      createVNode("small", { class: "text-error text-caption" }, toDisplayString(__props.errors["error-messages"][0]), 1)
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "color-pickers-container" }, [
                    createVNode("div", { class: "color-pickers-container__label" }, [
                      createVNode("span", { class: "text-body-2" }, "Visitante")
                    ]),
                    createVNode("div", { class: "color-picker-items-container" }, [
                      createVNode(_sfc_main$8, {
                        color: unref(colors2).away.primary,
                        "onUpdate:color": ($event) => unref(colors2).away.primary = $event
                      }, null, 8, ["color", "onUpdate:color"]),
                      createVNode(_sfc_main$8, {
                        color: unref(colors2).away.secondary,
                        "onUpdate:color": ($event) => unref(colors2).away.secondary = $event
                      }, null, 8, ["color", "onUpdate:color"])
                    ]),
                    createVNode("div", null, [
                      createVNode("small", { class: "text-error text-caption" }, toDisplayString(__props.errors["error-messages"][0]), 1)
                    ])
                  ])
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/colors-component.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
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
          return;
        }
        resolve(predictions);
      }
    );
  });
}, 400);
const _sfc_main$6 = /* @__PURE__ */ defineComponent$1({
  __name: "01-create-team",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    let locationsFind = ref([]);
    const { tournaments } = storeToRefs(useTournamentStore());
    const { teamStoreRequest, isEdition } = storeToRefs(useTeamStore());
    const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
      isEdition.value ? "edit-team" : "create-team"
    );
    const saveImageHandler = (image) => {
      saveImage(image);
      fields.image.fieldValue = image;
    };
    const removeImageHandler = () => {
      removeImage();
      fields.image.fieldValue = null;
      fields.image.fieldValue = null;
    };
    const searchHandler = async (place) => {
      const response = await search(place);
      if (response) {
        locationsFind.value = response;
      }
    };
    const categoryHandler = (value) => {
      if (!value) {
        return;
      }
      const tournament = tournaments.value.find(
        (tournament2) => tournament2.id === value
      );
      if (!tournament) {
        return;
      }
      fields.category_id.fieldValue = tournament == null ? void 0 : tournament.category_id;
    };
    __expose({
      validate,
      handleSubmit
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_1;
      _push(ssrRenderComponent(VContainer, mergeProps({
        class: "container",
        style: { "min-height": "480px" }
      }, _attrs), {
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Nombre del equipo* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Nombre del equipo* ")
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
                          placeholder: "p.ej. Equipo de verano",
                          outlined: "",
                          modelValue: unref(fields).name.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                        }, unref(fields).name.fieldPropsValue, { density: "compact" }), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            placeholder: "p.ej. Equipo de verano",
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
                        createVNode("span", { class: "text-body-1" }, " Nombre del equipo* ")
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
                          placeholder: "p.ej. Equipo de verano",
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Torneo* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Torneo* ")
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
                          "item-title": "name",
                          "item-value": "id",
                          clearable: "",
                          items: unref(tournaments),
                          placeholder: "p.ej. Clausura ",
                          outlined: "",
                          modelValue: unref(fields).tournament_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                        }, unref(fields).tournament_id.fieldPropsValue, {
                          density: "compact",
                          "onUpdate:modelValue": categoryHandler
                        }), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSelect, mergeProps({
                            "item-title": "name",
                            "item-value": "id",
                            clearable: "",
                            items: unref(tournaments),
                            placeholder: "p.ej. Clausura ",
                            outlined: "",
                            modelValue: unref(fields).tournament_id.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                          }, unref(fields).tournament_id.fieldPropsValue, {
                            density: "compact",
                            "onUpdate:modelValue": categoryHandler
                          }), null, 16, ["items", "modelValue", "onUpdate:modelValue"])
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
                        createVNode("span", { class: "text-body-1" }, " Torneo* ")
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
                          "item-title": "name",
                          "item-value": "id",
                          clearable: "",
                          items: unref(tournaments),
                          placeholder: "p.ej. Clausura ",
                          outlined: "",
                          modelValue: unref(fields).tournament_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                        }, unref(fields).tournament_id.fieldPropsValue, {
                          density: "compact",
                          "onUpdate:modelValue": categoryHandler
                        }), null, 16, ["items", "modelValue", "onUpdate:modelValue"])
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
                        _push4(ssrRenderComponent(_sfc_main$i, {
                          modelValue: unref(fields).category_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event,
                          errors: unref(fields).category_id.fieldPropsValue
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$i, {
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
                        createVNode(_sfc_main$i, {
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Imagen del equipo </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Imagen del equipo ")
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
                      var _a2, _b;
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2$2, {
                          ref_key: "dragDropImageRef",
                          ref: dragDropImageRef,
                          image: unref(imageForm),
                          onImageDropped: saveImageHandler,
                          onRemoveImage: removeImageHandler
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="${ssrRenderClass([
                          unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : "",
                          "text-error text-caption"
                        ])}"${_scopeId3}>${ssrInterpolate((_a2 = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a2 : "")}</span>`);
                      } else {
                        return [
                          createVNode(_sfc_main$2$2, {
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
                        createVNode("span", { class: "text-body-1" }, " Imagen del equipo ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createVNode(_sfc_main$2$2, {
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
                          }, toDisplayString((_a2 = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a2 : ""), 3)
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
                        _push4(`<span class="text-body-1"${_scopeId3}>Direcci\xF3n</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, "Direcci\xF3n")
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
                          modelValue: unref(fields).address.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event,
                          items: unref(locationsFind),
                          "no-data-text": "No hay resultados",
                          outlined: "",
                          "return-object": "",
                          "hide-selected": "",
                          "clear-on-select": "",
                          clearable: "",
                          density: "compact",
                          "no-filter": ""
                        }, unref(fields).address.fieldPropsValue, {
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
                            modelValue: unref(fields).address.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event,
                            items: unref(locationsFind),
                            "no-data-text": "No hay resultados",
                            outlined: "",
                            "return-object": "",
                            "hide-selected": "",
                            "clear-on-select": "",
                            clearable: "",
                            density: "compact",
                            "no-filter": ""
                          }, unref(fields).address.fieldPropsValue, {
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
                        createVNode("span", { class: "text-body-1" }, "Direcci\xF3n")
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
                          modelValue: unref(fields).address.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event,
                          items: unref(locationsFind),
                          "no-data-text": "No hay resultados",
                          outlined: "",
                          "return-object": "",
                          "hide-selected": "",
                          "clear-on-select": "",
                          clearable: "",
                          density: "compact",
                          "no-filter": ""
                        }, unref(fields).address.fieldPropsValue, {
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Colores del equipo </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Colores del equipo ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8",
                    class: "pt-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, {
                          "no-gutters": "",
                          class: "position-relative"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "12" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$7, {
                                      "model-value": unref(fields).colors.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).colors.fieldValue = $event,
                                      errors: unref(fields).colors.fieldPropsValue
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$7, {
                                        "model-value": unref(fields).colors.fieldValue,
                                        "onUpdate:modelValue": ($event) => unref(fields).colors.fieldValue = $event,
                                        errors: unref(fields).colors.fieldPropsValue
                                      }, null, 8, ["model-value", "onUpdate:modelValue", "errors"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$7, {
                                      "model-value": unref(fields).colors.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).colors.fieldValue = $event,
                                      errors: unref(fields).colors.fieldPropsValue
                                    }, null, 8, ["model-value", "onUpdate:modelValue", "errors"])
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
                            "no-gutters": "",
                            class: "position-relative"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "12" }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$7, {
                                    "model-value": unref(fields).colors.fieldValue,
                                    "onUpdate:modelValue": ($event) => unref(fields).colors.fieldValue = $event,
                                    errors: unref(fields).colors.fieldPropsValue
                                  }, null, 8, ["model-value", "onUpdate:modelValue", "errors"])
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
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, " Colores del equipo ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8",
                      class: "pt-0"
                    }, {
                      default: withCtx(() => [
                        createVNode(VRow, {
                          "no-gutters": "",
                          class: "position-relative"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$7, {
                                  "model-value": unref(fields).colors.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).colors.fieldValue = $event,
                                  errors: unref(fields).colors.fieldPropsValue
                                }, null, 8, ["model-value", "onUpdate:modelValue", "errors"])
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Contacto</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Contacto")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    col: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(fields).email.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                        }, unref(fields).email.fieldPropsValue, {
                          placeholder: "Correo electr\xF3nico",
                          outlined: "",
                          disabled: unref(isEdition),
                          class: "mb-4",
                          density: "compact"
                        }), null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_client_only, null, {}, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            modelValue: unref(fields).email.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                          }, unref(fields).email.fieldPropsValue, {
                            placeholder: "Correo electr\xF3nico",
                            outlined: "",
                            disabled: unref(isEdition),
                            class: "mb-4",
                            density: "compact"
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"]),
                          createVNode(_component_client_only, null, {
                            default: withCtx(() => [
                              createVNode(unref(Gl), {
                                variant: "plain",
                                singleLine: true,
                                modelValue: unref(fields).phone.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                class: "phone-input",
                                disabled: unref(isEdition),
                                "display-format": "international",
                                example: "52 1 55 1234 5678",
                                "validate-on": "blur lazy",
                                invalidMessage: ({ label, example }) => {
                                  return `${label} debe ser un numero valido (${example}).`;
                                }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "invalidMessage"]),
                              createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
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
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, " Contacto")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      col: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, mergeProps({
                          modelValue: unref(fields).email.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                        }, unref(fields).email.fieldPropsValue, {
                          placeholder: "Correo electr\xF3nico",
                          outlined: "",
                          disabled: unref(isEdition),
                          class: "mb-4",
                          density: "compact"
                        }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"]),
                        createVNode(_component_client_only, null, {
                          default: withCtx(() => [
                            createVNode(unref(Gl), {
                              variant: "plain",
                              singleLine: true,
                              modelValue: unref(fields).phone.fieldValue,
                              "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                              class: "phone-input",
                              disabled: unref(isEdition),
                              "display-format": "international",
                              example: "52 1 55 1234 5678",
                              "validate-on": "blur lazy",
                              invalidMessage: ({ label, example }) => {
                                return `${label} debe ser un numero valido (${example}).`;
                              }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "invalidMessage"]),
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
                      createVNode("span", { class: "text-body-1" }, " Nombre del equipo* ")
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
                        placeholder: "p.ej. Equipo de verano",
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
                      createVNode("span", { class: "text-body-1" }, " Torneo* ")
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
                        "item-title": "name",
                        "item-value": "id",
                        clearable: "",
                        items: unref(tournaments),
                        placeholder: "p.ej. Clausura ",
                        outlined: "",
                        modelValue: unref(fields).tournament_id.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                      }, unref(fields).tournament_id.fieldPropsValue, {
                        density: "compact",
                        "onUpdate:modelValue": categoryHandler
                      }), null, 16, ["items", "modelValue", "onUpdate:modelValue"])
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
                      createVNode(_sfc_main$i, {
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
                      createVNode("span", { class: "text-body-1" }, " Imagen del equipo ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        createVNode(_sfc_main$2$2, {
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
                        }, toDisplayString((_a2 = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a2 : ""), 3)
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
                      createVNode("span", { class: "text-body-1" }, "Direcci\xF3n")
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
                        modelValue: unref(fields).address.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event,
                        items: unref(locationsFind),
                        "no-data-text": "No hay resultados",
                        outlined: "",
                        "return-object": "",
                        "hide-selected": "",
                        "clear-on-select": "",
                        clearable: "",
                        density: "compact",
                        "no-filter": ""
                      }, unref(fields).address.fieldPropsValue, {
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
                      createVNode("span", { class: "text-body-1" }, " Colores del equipo ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8",
                    class: "pt-0"
                  }, {
                    default: withCtx(() => [
                      createVNode(VRow, {
                        "no-gutters": "",
                        class: "position-relative"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$7, {
                                "model-value": unref(fields).colors.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).colors.fieldValue = $event,
                                errors: unref(fields).colors.fieldPropsValue
                              }, null, 8, ["model-value", "onUpdate:modelValue", "errors"])
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
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, " Contacto")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    col: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, mergeProps({
                        modelValue: unref(fields).email.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                      }, unref(fields).email.fieldPropsValue, {
                        placeholder: "Correo electr\xF3nico",
                        outlined: "",
                        disabled: unref(isEdition),
                        class: "mb-4",
                        density: "compact"
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"]),
                      createVNode(_component_client_only, null, {
                        default: withCtx(() => [
                          createVNode(unref(Gl), {
                            variant: "plain",
                            singleLine: true,
                            modelValue: unref(fields).phone.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                            class: "phone-input",
                            disabled: unref(isEdition),
                            "display-format": "international",
                            example: "52 1 55 1234 5678",
                            "validate-on": "blur lazy",
                            invalidMessage: ({ label, example }) => {
                              return `${label} debe ser un numero valido (${example}).`;
                            }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "invalidMessage"]),
                          createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/stepper/01-create-team.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent$1({
  __name: "02-create-dt",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const dragDropImageRef2 = ref(null);
    const imageForm2 = ref({
      file: null,
      name: "",
      size: 0
    });
    const teamStore = useTeamStore();
    const { teamStoreRequest, isEdition } = storeToRefs(teamStore);
    const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
      isEdition.value ? "edit-coach" : "create-coach"
    );
    const saveImage2 = (file) => {
      imageForm2.value.file = file;
      imageForm2.value.name = file.name;
      imageForm2.value.size = file.size;
      fields.image.fieldValue = file;
    };
    const removeImage2 = () => {
      imageForm2.value.file = null;
      imageForm2.value.name = "";
      imageForm2.value.size = 0;
      fields.image.fieldValue = null;
    };
    __expose({
      validate,
      handleSubmit
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_1;
      _push(ssrRenderComponent(VContainer, mergeProps({
        class: "container",
        style: { "min-height": "480px" }
      }, _attrs), {
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Nombre del DT* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Nombre del DT* ")
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
                          placeholder: "p.ej. Luis Veloz",
                          outlined: "",
                          modelValue: unref(fields).name.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                        }, unref(fields).name.fieldPropsValue, { density: "compact" }), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            placeholder: "p.ej. Luis Veloz",
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
                        createVNode("span", { class: "text-body-1" }, " Nombre del DT* ")
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
                          placeholder: "p.ej. Luis Veloz",
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Imagen del usuario* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Imagen del usuario* ")
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
                      var _a2, _b;
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2$2, {
                          ref_key: "dragDropImageRef",
                          ref: dragDropImageRef2,
                          image: unref(imageForm2),
                          onImageDropped: saveImage2,
                          onRemoveImage: removeImage2
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="${ssrRenderClass([
                          unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : "",
                          "text-error text-caption"
                        ])}"${_scopeId3}>${ssrInterpolate((_a2 = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a2 : "")}</span>`);
                      } else {
                        return [
                          createVNode(_sfc_main$2$2, {
                            ref_key: "dragDropImageRef",
                            ref: dragDropImageRef2,
                            image: unref(imageForm2),
                            onImageDropped: saveImage2,
                            onRemoveImage: removeImage2
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
                        createVNode("span", { class: "text-body-1" }, " Imagen del usuario* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createVNode(_sfc_main$2$2, {
                            ref_key: "dragDropImageRef",
                            ref: dragDropImageRef2,
                            image: unref(imageForm2),
                            onImageDropped: saveImage2,
                            onRemoveImage: removeImage2
                          }, null, 8, ["image"]),
                          createVNode("span", {
                            class: [
                              "text-error text-caption",
                              unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : ""
                            ]
                          }, toDisplayString((_a2 = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a2 : ""), 3)
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Correo electr\xF3nico* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Correo electr\xF3nico* ")
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
                          placeholder: "p.ej. luis@futzo.io ",
                          outlined: "",
                          modelValue: unref(fields).email.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                        }, unref(fields).email.fieldPropsValue, {
                          disabled: unref(isEdition),
                          density: "compact"
                        }), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            placeholder: "p.ej. luis@futzo.io ",
                            outlined: "",
                            modelValue: unref(fields).email.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                          }, unref(fields).email.fieldPropsValue, {
                            disabled: unref(isEdition),
                            density: "compact"
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])
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
                        createVNode("span", { class: "text-body-1" }, " Correo electr\xF3nico* ")
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
                          placeholder: "p.ej. luis@futzo.io ",
                          outlined: "",
                          modelValue: unref(fields).email.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                        }, unref(fields).email.fieldPropsValue, {
                          disabled: unref(isEdition),
                          density: "compact"
                        }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Tel\xE9fono </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Tel\xE9fono ")
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
                        _push4(ssrRenderComponent(_component_client_only, null, {}, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_client_only, null, {
                            default: withCtx(() => [
                              createVNode(unref(Gl), {
                                variant: "plain",
                                disabled: unref(isEdition),
                                singleLine: true,
                                modelValue: unref(fields).phone.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                class: "phone-input",
                                "display-format": "international",
                                example: "52 1 55 1234 5678",
                                "validate-on": "blur lazy",
                                invalidMessage: ({ label, example }) => {
                                  return `${label} debe ser un numero valido (${example}).`;
                                }
                              }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue", "invalidMessage"]),
                              createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
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
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, " Tel\xE9fono ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_client_only, null, {
                          default: withCtx(() => [
                            createVNode(unref(Gl), {
                              variant: "plain",
                              disabled: unref(isEdition),
                              singleLine: true,
                              modelValue: unref(fields).phone.fieldValue,
                              "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                              class: "phone-input",
                              "display-format": "international",
                              example: "52 1 55 1234 5678",
                              "validate-on": "blur lazy",
                              invalidMessage: ({ label, example }) => {
                                return `${label} debe ser un numero valido (${example}).`;
                              }
                            }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue", "invalidMessage"]),
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
                      createVNode("span", { class: "text-body-1" }, " Nombre del DT* ")
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
                        placeholder: "p.ej. Luis Veloz",
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
                      createVNode("span", { class: "text-body-1" }, " Imagen del usuario* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        createVNode(_sfc_main$2$2, {
                          ref_key: "dragDropImageRef",
                          ref: dragDropImageRef2,
                          image: unref(imageForm2),
                          onImageDropped: saveImage2,
                          onRemoveImage: removeImage2
                        }, null, 8, ["image"]),
                        createVNode("span", {
                          class: [
                            "text-error text-caption",
                            unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : ""
                          ]
                        }, toDisplayString((_a2 = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a2 : ""), 3)
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
                      createVNode("span", { class: "text-body-1" }, " Correo electr\xF3nico* ")
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
                        placeholder: "p.ej. luis@futzo.io ",
                        outlined: "",
                        modelValue: unref(fields).email.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                      }, unref(fields).email.fieldPropsValue, {
                        disabled: unref(isEdition),
                        density: "compact"
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])
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
                      createVNode("span", { class: "text-body-1" }, " Tel\xE9fono ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_client_only, null, {
                        default: withCtx(() => [
                          createVNode(unref(Gl), {
                            variant: "plain",
                            disabled: unref(isEdition),
                            singleLine: true,
                            modelValue: unref(fields).phone.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                            class: "phone-input",
                            "display-format": "international",
                            example: "52 1 55 1234 5678",
                            "validate-on": "blur lazy",
                            invalidMessage: ({ label, example }) => {
                              return `${label} debe ser un numero valido (${example}).`;
                            }
                          }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue", "invalidMessage"]),
                          createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/stepper/02-create-dt.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent$1({
  __name: "03-create-owner",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const dragDropImageRef2 = ref(null);
    const imageForm2 = ref({
      file: null,
      name: "",
      size: 0
    });
    const teamStore = useTeamStore();
    const { teamStoreRequest, isEdition } = storeToRefs(teamStore);
    const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
      isEdition.value ? "edit-owner" : "create-owner"
    );
    const saveImage2 = (file) => {
      imageForm2.value.file = file;
      imageForm2.value.name = file.name;
      imageForm2.value.size = file.size;
      fields.image.fieldValue = file;
    };
    const removeImage2 = () => {
      imageForm2.value.file = null;
      imageForm2.value.name = "";
      imageForm2.value.size = 0;
      fields.image.fieldValue = null;
    };
    __expose({
      validate,
      handleSubmit
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_1;
      _push(ssrRenderComponent(VContainer, mergeProps({
        class: "container",
        style: { "min-height": "480px" }
      }, _attrs), {
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Nombre del due\xF1o/delegado* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Nombre del due\xF1o/delegado* ")
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
                          placeholder: "p.ej. Luis Veloz",
                          outlined: "",
                          modelValue: unref(fields).name.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                        }, unref(fields).name.fieldPropsValue, { density: "compact" }), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            placeholder: "p.ej. Luis Veloz",
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
                        createVNode("span", { class: "text-body-1" }, " Nombre del due\xF1o/delegado* ")
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
                          placeholder: "p.ej. Luis Veloz",
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Imagen del usuario* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Imagen del usuario* ")
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
                      var _a2, _b;
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2$2, {
                          ref_key: "dragDropImageRef",
                          ref: dragDropImageRef2,
                          image: unref(imageForm2),
                          onImageDropped: saveImage2,
                          onRemoveImage: removeImage2
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="${ssrRenderClass([
                          unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : "",
                          "text-error text-caption"
                        ])}"${_scopeId3}>${ssrInterpolate((_a2 = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a2 : "")}</span>`);
                      } else {
                        return [
                          createVNode(_sfc_main$2$2, {
                            ref_key: "dragDropImageRef",
                            ref: dragDropImageRef2,
                            image: unref(imageForm2),
                            onImageDropped: saveImage2,
                            onRemoveImage: removeImage2
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
                        createVNode("span", { class: "text-body-1" }, " Imagen del usuario* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createVNode(_sfc_main$2$2, {
                            ref_key: "dragDropImageRef",
                            ref: dragDropImageRef2,
                            image: unref(imageForm2),
                            onImageDropped: saveImage2,
                            onRemoveImage: removeImage2
                          }, null, 8, ["image"]),
                          createVNode("span", {
                            class: [
                              "text-error text-caption",
                              unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : ""
                            ]
                          }, toDisplayString((_a2 = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a2 : ""), 3)
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Correo electr\xF3nico* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Correo electr\xF3nico* ")
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
                          placeholder: "p.ej. luis@futzo.io ",
                          outlined: "",
                          disabled: unref(isEdition),
                          modelValue: unref(fields).email.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                        }, unref(fields).email.fieldPropsValue, { density: "compact" }), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            placeholder: "p.ej. luis@futzo.io ",
                            outlined: "",
                            disabled: unref(isEdition),
                            modelValue: unref(fields).email.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                          }, unref(fields).email.fieldPropsValue, { density: "compact" }), null, 16, ["disabled", "modelValue", "onUpdate:modelValue"])
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
                        createVNode("span", { class: "text-body-1" }, " Correo electr\xF3nico* ")
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
                          placeholder: "p.ej. luis@futzo.io ",
                          outlined: "",
                          disabled: unref(isEdition),
                          modelValue: unref(fields).email.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                        }, unref(fields).email.fieldPropsValue, { density: "compact" }), null, 16, ["disabled", "modelValue", "onUpdate:modelValue"])
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Tel\xE9fono </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Tel\xE9fono ")
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
                        _push4(ssrRenderComponent(_component_client_only, null, {}, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_client_only, null, {
                            default: withCtx(() => [
                              createVNode(unref(Gl), {
                                variant: "plain",
                                singleLine: true,
                                disabled: unref(isEdition),
                                modelValue: unref(fields).phone.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                class: "phone-input",
                                "display-format": "international",
                                example: "52 1 55 1234 5678",
                                "validate-on": "blur lazy",
                                invalidMessage: ({ label, example }) => {
                                  return `${label} debe ser un numero valido (${example}).`;
                                }
                              }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue", "invalidMessage"]),
                              createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
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
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, " Tel\xE9fono ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_client_only, null, {
                          default: withCtx(() => [
                            createVNode(unref(Gl), {
                              variant: "plain",
                              singleLine: true,
                              disabled: unref(isEdition),
                              modelValue: unref(fields).phone.fieldValue,
                              "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                              class: "phone-input",
                              "display-format": "international",
                              example: "52 1 55 1234 5678",
                              "validate-on": "blur lazy",
                              invalidMessage: ({ label, example }) => {
                                return `${label} debe ser un numero valido (${example}).`;
                              }
                            }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue", "invalidMessage"]),
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
                      createVNode("span", { class: "text-body-1" }, " Nombre del due\xF1o/delegado* ")
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
                        placeholder: "p.ej. Luis Veloz",
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
                      createVNode("span", { class: "text-body-1" }, " Imagen del usuario* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        createVNode(_sfc_main$2$2, {
                          ref_key: "dragDropImageRef",
                          ref: dragDropImageRef2,
                          image: unref(imageForm2),
                          onImageDropped: saveImage2,
                          onRemoveImage: removeImage2
                        }, null, 8, ["image"]),
                        createVNode("span", {
                          class: [
                            "text-error text-caption",
                            unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : ""
                          ]
                        }, toDisplayString((_a2 = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a2 : ""), 3)
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
                      createVNode("span", { class: "text-body-1" }, " Correo electr\xF3nico* ")
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
                        placeholder: "p.ej. luis@futzo.io ",
                        outlined: "",
                        disabled: unref(isEdition),
                        modelValue: unref(fields).email.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event
                      }, unref(fields).email.fieldPropsValue, { density: "compact" }), null, 16, ["disabled", "modelValue", "onUpdate:modelValue"])
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
                      createVNode("span", { class: "text-body-1" }, " Tel\xE9fono ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_client_only, null, {
                        default: withCtx(() => [
                          createVNode(unref(Gl), {
                            variant: "plain",
                            singleLine: true,
                            disabled: unref(isEdition),
                            modelValue: unref(fields).phone.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                            class: "phone-input",
                            "display-format": "international",
                            example: "52 1 55 1234 5678",
                            "validate-on": "blur lazy",
                            invalidMessage: ({ label, example }) => {
                              return `${label} debe ser un numero valido (${example}).`;
                            }
                          }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue", "invalidMessage"]),
                          createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/stepper/03-create-owner.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent$1({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const teamStore = useTeamStore();
    const { steps, isEdition, teamStoreRequest } = storeToRefs(teamStore);
    const stepRef = ref({
      validate: Function,
      handleSubmit: Function
    });
    const backHandler = () => {
      if (steps.value.current === "createTeam") {
        teamStore.dialog = false;
        return;
      }
      const stepsOrder = ["createTeam", "createDt", "createOwner"];
      const currentStepIndex = stepsOrder.indexOf(steps.value.current);
      steps.value.current = stepsOrder[currentStepIndex - 1];
    };
    const nextHandler = async () => {
      const statusForm = await stepRef.value.validate();
      const formValues = stepRef.value.handleSubmit(
        (values) => values
      );
      const teamStoreRequestValues = await formValues();
      if (statusForm.valid) {
        if (steps.value.current === "createTeam") {
          teamStoreRequest.value = {
            ...teamStoreRequest.value,
            team: { ...teamStoreRequestValues }
          };
        }
        if (steps.value.current === "createDt") {
          teamStoreRequest.value = {
            ...teamStoreRequest.value,
            coach: { ...teamStoreRequestValues }
          };
        }
        if (steps.value.current === "createOwner") {
          teamStoreRequest.value = {
            ...teamStoreRequest.value,
            president: { ...teamStoreRequestValues }
          };
        }
        const stepsOrder = ["createTeam", "createDt", "createOwner"];
        const currentStepIndex = stepsOrder.indexOf(steps.value.current);
        if (!steps.value.steps[currentStepIndex].completed) {
          steps.value.steps[currentStepIndex].completed = true;
        }
        if (currentStepIndex === stepsOrder.length - 1) {
          loading.value = true;
          if (teamStore.isEdition) {
            await teamStore.updateTeam(teamStoreRequest.value.team.id);
          } else {
            await teamStore.createTeam();
          }
          loading.value = false;
          return;
        }
        steps.value.current = stepsOrder[currentStepIndex + 1];
      }
    };
    const textButtonCancel = computed(() => {
      if (steps.value.current === "createTeam") {
        return "Cancelar";
      } else {
        return "Regresar";
      }
    });
    const textButton = computed(() => {
      switch (steps.value.current) {
        case "createTeam":
          return "Siguiente";
        case "createDt":
          return "Siguiente";
        case "createOwner":
          return isEdition.value ? "Actualizar equipo" : "Crear equipo";
        default:
          return "Crear equipo";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PerfectScrollbar = resolveComponent("PerfectScrollbar");
      const _component_transition_slide = __nuxt_component_0;
      _push(ssrRenderComponent(_component_PerfectScrollbar, mergeProps({ options: { suppressScrollX: true } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, {
              class: "pb-2",
              style: { "overflow-x": "hidden" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(StepIndicator, { formSteps: unref(steps) }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_transition_slide, {
                    group: "",
                    offset: {
                      enter: ["-100%", 0],
                      leave: ["100%", 0]
                    }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(steps).current === "createTeam") {
                          _push4(ssrRenderComponent(_sfc_main$6, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(steps).current
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(steps).current === "createDt") {
                          _push4(ssrRenderComponent(_sfc_main$5, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(steps).current
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(steps).current === "createOwner") {
                          _push4(ssrRenderComponent(_sfc_main$4, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(steps).current
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          unref(steps).current === "createTeam" ? (openBlock(), createBlock(_sfc_main$6, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(steps).current
                          })) : createCommentVNode("", true),
                          unref(steps).current === "createDt" ? (openBlock(), createBlock(_sfc_main$5, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(steps).current
                          })) : createCommentVNode("", true),
                          unref(steps).current === "createOwner" ? (openBlock(), createBlock(_sfc_main$4, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(steps).current
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
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
                    createVNode(StepIndicator, { formSteps: unref(steps) }, null, 8, ["formSteps"]),
                    createVNode(_component_transition_slide, {
                      group: "",
                      offset: {
                        enter: ["-100%", 0],
                        leave: ["100%", 0]
                      }
                    }, {
                      default: withCtx(() => [
                        unref(steps).current === "createTeam" ? (openBlock(), createBlock(_sfc_main$6, {
                          ref_key: "stepRef",
                          ref: stepRef,
                          key: unref(steps).current
                        })) : createCommentVNode("", true),
                        unref(steps).current === "createDt" ? (openBlock(), createBlock(_sfc_main$5, {
                          ref_key: "stepRef",
                          ref: stepRef,
                          key: unref(steps).current
                        })) : createCommentVNode("", true),
                        unref(steps).current === "createOwner" ? (openBlock(), createBlock(_sfc_main$4, {
                          ref_key: "stepRef",
                          ref: stepRef,
                          key: unref(steps).current
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
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
              createVNode(VCardText, {
                class: "pb-2",
                style: { "overflow-x": "hidden" }
              }, {
                default: withCtx(() => [
                  createVNode(StepIndicator, { formSteps: unref(steps) }, null, 8, ["formSteps"]),
                  createVNode(_component_transition_slide, {
                    group: "",
                    offset: {
                      enter: ["-100%", 0],
                      leave: ["100%", 0]
                    }
                  }, {
                    default: withCtx(() => [
                      unref(steps).current === "createTeam" ? (openBlock(), createBlock(_sfc_main$6, {
                        ref_key: "stepRef",
                        ref: stepRef,
                        key: unref(steps).current
                      })) : createCommentVNode("", true),
                      unref(steps).current === "createDt" ? (openBlock(), createBlock(_sfc_main$5, {
                        ref_key: "stepRef",
                        ref: stepRef,
                        key: unref(steps).current
                      })) : createCommentVNode("", true),
                      unref(steps).current === "createOwner" ? (openBlock(), createBlock(_sfc_main$4, {
                        ref_key: "stepRef",
                        ref: stepRef,
                        key: unref(steps).current
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/stepper/index.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent$1({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const teamStore = useTeamStore();
    const { steps, isEdition, teamStoreRequest } = storeToRefs(teamStore);
    const leaveHandler = () => {
      steps.value.current = "createTeam";
      steps.value.completed = [];
      isEdition.value = false;
      teamStoreRequest.value = {};
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        modelValue: unref(teamStore).dialog,
        "onUpdate:modelValue": ($event) => unref(teamStore).dialog = $event,
        "max-width": "690",
        onAfterLeave: leaveHandler,
        scrollable: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, {
              class: "create-tournament-card futzo-rounded",
              style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$9, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    step: unref(steps).current
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$9),
                    createVNode(_sfc_main$3, {
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
                style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$9),
                  createVNode(_sfc_main$3, {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/CreateTeamDialog/index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent$1({
  __name: "teams-table",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      teams,
      teamId,
      isEdition,
      pagination,
      dialog,
      teamStoreRequest,
      search: search2
    } = storeToRefs(useTeamStore());
    const headers = getHeaders("teams");
    const showTeamHandler = (_team) => {
      const { president, coach, ...team } = _team;
      teamId.value = _team.id;
      isEdition.value = true;
      teamStoreRequest.value = {
        team: {
          id: team.id,
          name: team.name,
          tournament_id: team.tournament.id,
          category_id: team.category.id,
          address: team == null ? void 0 : team.address,
          colors: team == null ? void 0 : team.colors,
          description: team == null ? void 0 : team.description,
          email: team == null ? void 0 : team.email,
          image: team == null ? void 0 : team.image,
          phone: team == null ? void 0 : team.phone
        },
        president: { ...president, image: president == null ? void 0 : president.image },
        coach: { ...coach, image: coach == null ? void 0 : coach.image }
      };
      dialog.value = true;
    };
    const paginationHandler = (_pagination) => {
      pagination.value.to = _pagination.to + 1;
      useTeamStore().getTeams();
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      if ((_a2 = unref(teams)) == null ? void 0 : _a2.length) {
        _push(ssrRenderComponent(_sfc_main$j, mergeProps({
          headers: unref(headers),
          "show-index": true,
          items: unref(teams),
          itemKey: "name",
          search: unref(search2),
          pagination: unref(pagination),
          "onUpdate:pagination": paginationHandler,
          "custom-name": true
        }, _attrs), {
          actions: withCtx(({ item }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VBtn, {
                size: "small",
                rounded: "md",
                onClick: ($event) => showTeamHandler(item)
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Ver Equipo `);
                  } else {
                    return [
                      createTextVNode("Ver Equipo ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VBtn, {
                  size: "small",
                  rounded: "md",
                  onClick: ($event) => showTeamHandler(item)
                }, {
                  default: withCtx(() => [
                    createTextVNode("Ver Equipo ")
                  ]),
                  _: 2
                }, 1032, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/teams-table.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent$1({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const teamStore = useTeamStore();
    storeToRefs(teamStore);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2$1, _attrs, {
        "app-bar": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$h, null, {
              buttons: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$c, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$c)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$h, null, {
                buttons: withCtx(() => [
                  createVNode(_sfc_main$c)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$a, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$a),
              createVNode(_sfc_main$1),
              createVNode(_sfc_main$2)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/equipos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BrkjQfNx.mjs.map
