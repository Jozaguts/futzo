import { _ as __nuxt_component_0 } from './index-DkcY5wU8.mjs';
import { ref, defineComponent, computed, withCtx, createVNode, unref, createTextVNode, toDisplayString, resolveComponent, mergeProps, createBlock, createCommentVNode, openBlock, mergeModels, useModel, watch, createElementVNode, Fragment, normalizeStyle, normalizeClass, shallowRef, normalizeProps, guardReactiveProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttrs } from 'vue/server-renderer';
import { a as useTeamStore, e as useTournamentStore } from './useScheduleStore-DBhAIDF3.mjs';
import { h as useRoute$1, f as VCardItem, H as VDivider, F as VCardText, C as VTextField, af as VSelect, B as VListItem, D as VListItemTitle, K as __nuxt_component_0$1$1, ab as Al, V as VCard, b6 as defineComponent$1, p as propsFactory, O as useProxiedModel, bj as RGBtoHSV, bo as parseColor, bs as consoleWarn, as as useRtl, P as provideDefaults, c as useRender, g as genericComponent, bn as HSVtoCSS, bf as HexToHSV, bg as HSVtoHex, bh as HSLtoHSV, bi as HSVtoHSL, bk as HSVtoRGB, bl as has, j as useBackgroundColor, br as createSimpleFunctional, aM as VDefaultsProvider, ap as clamp, a5 as convertToUnit, au as useResizeObserver, be as getEventCoordinates, bm as SUPPORTS_EYE_DROPPER, bp as RGBtoCSS, ao as deepEqual, q as VIcon, bq as getContrast, x as makeComponentProps, N as useFocus, aR as VInput, b1 as VLabel, aS as makeVInputProps, U as makeFocusProps } from './server.mjs';
import { storeToRefs } from 'pinia';
import { V as VSheet, m as makeVSheetProps } from './VSheet-DVv3ytGE.mjs';
import { _ as __nuxt_component_0$1 } from './TransitionSlide-d5qGX2mN.mjs';
import { _ as _sfc_main$7, u as useSteps, a as useSlider, V as VSliderTrack, b as VSliderThumb, m as makeSliderProps } from './CategoriesSelect-D1ehrnKL.mjs';
import { _ as _sfc_main$8 } from './drag-drop-image-DRFieU2I.mjs';
import { V as VDialog } from './VDialog-BeIjnChI.mjs';
import { V as VBtn } from './VBtn-_od1f1mx.mjs';
import { V as VRow, a as VCol } from './VRow-CwLG7ojV.mjs';
import { u as useSchemas } from './useSchemas-CFMbNxa_.mjs';
import { u as usePlaceSearch } from './googleSearch-Dzva-T1R.mjs';
import { V as VContainer } from './VContainer-C0Se5csP.mjs';
import { V as VAutocomplete } from './VAutocomplete-P_wP5bep.mjs';
import { I as IndicatorStep } from './IndicatorStep-DKaB2dCI.mjs';

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
const VColorPickerCanvas = defineComponent$1({
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
    useRender(() => createElementVNode("div", {
      "ref": resizeRef,
      "class": normalizeClass(["v-color-picker-canvas", props.class]),
      "style": normalizeStyle(props.style),
      "onMousedown": handleMouseDown,
      "onTouchstartPassive": handleMouseDown
    }, [createElementVNode("canvas", {
      "ref": canvasRef,
      "width": canvasWidth.value,
      "height": canvasHeight.value
    }, null), props.color && createElementVNode("div", {
      "class": normalizeClass(["v-color-picker-canvas__dot", {
        "v-color-picker-canvas__dot--disabled": props.disabled
      }]),
      "style": normalizeStyle(dotStyles.value)
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
    const hasA = color.a !== 1;
    if (input == null ? void 0 : input.startsWith("rgb(")) {
      const {
        r,
        g,
        b,
        a
      } = HSVtoRGB(color);
      return `rgb(${r} ${g} ${b}` + (hasA ? ` / ${a})` : ")");
    } else if (input == null ? void 0 : input.startsWith("hsl(")) {
      const {
        h,
        s,
        l,
        a
      } = HSVtoHSL(color);
      return `hsl(${h} ${Math.round(s * 100)} ${Math.round(l * 100)}` + (hasA ? ` / ${a})` : ")");
    }
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
  return createElementVNode("div", {
    "class": "v-color-picker-edit__input"
  }, [createElementVNode("input", normalizeProps(guardReactiveProps(rest)), null), createElementVNode("span", null, [label])]);
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
const VColorPickerEdit = defineComponent$1({
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
      return createElementVNode("div", {
        "class": normalizeClass(["v-color-picker-edit", props.class]),
        "style": normalizeStyle(props.style)
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
          return createElementVNode(Fragment, null, [(_a3 = (_a2 = slots.label) == null ? void 0 : _a2.call(slots, slotProps)) != null ? _a3 : props.label ? createVNode(VLabel, {
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
          return createElementVNode("div", {
            "class": "v-slider__container",
            "onMousedown": !readonly.value ? onSliderMousedown : void 0,
            "onTouchstartPassive": !readonly.value ? onSliderTouchstart : void 0
          }, [createElementVNode("input", {
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
const VColorPickerPreview = defineComponent$1({
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
      return createElementVNode("div", {
        "class": normalizeClass(["v-color-picker-preview", {
          "v-color-picker-preview--hide-alpha": props.hideAlpha
        }, props.class]),
        "style": normalizeStyle(props.style)
      }, [SUPPORTS_EYE_DROPPER, createElementVNode("div", {
        "class": "v-color-picker-preview__dot"
      }, [createElementVNode("div", {
        "style": {
          background: HSVtoCSS((_a3 = props.color) != null ? _a3 : nullColor)
        }
      }, null)]), createElementVNode("div", {
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
const VColorPickerSwatches = defineComponent$1({
  name: "VColorPickerSwatches",
  props: makeVColorPickerSwatchesProps(),
  emits: {
    "update:color": (color) => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    useRender(() => createElementVNode("div", {
      "class": normalizeClass(["v-color-picker-swatches", props.class]),
      "style": normalizeStyle([{
        maxHeight: convertToUnit(props.maxHeight)
      }, props.style])
    }, [createElementVNode("div", null, [props.swatches.map((swatch) => createElementVNode("div", {
      "class": "v-color-picker-swatches__swatch"
    }, [swatch.map((color) => {
      const rgba2 = parseColor(color);
      const hsva = RGBtoHSV(rgba2);
      const background = RGBtoCSS(rgba2);
      return createElementVNode("div", {
        "class": "v-color-picker-swatches__color",
        "onClick": () => hsva && emit("update:color", hsva)
      }, [createElementVNode("div", {
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
const VPickerTitle = createSimpleFunctional("v-picker-title");
const makeVPickerProps = propsFactory({
  bgColor: String,
  divided: Boolean,
  landscape: Boolean,
  title: String,
  hideHeader: Boolean,
  ...makeVSheetProps()
}, "VPicker");
const VPicker = genericComponent()({
  name: "VPicker",
  props: makeVPickerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    useRender(() => {
      const sheetProps = VSheet.filterProps(props);
      const hasTitle = !!(props.title || slots.title);
      return createVNode(VSheet, mergeProps(sheetProps, {
        "color": props.bgColor,
        "class": ["v-picker", {
          "v-picker--divided": props.divided,
          "v-picker--landscape": props.landscape,
          "v-picker--with-actions": !!slots.actions
        }, props.class],
        "style": props.style
      }), {
        default: () => {
          var _a2;
          return [!props.hideHeader && createElementVNode("div", {
            "key": "header",
            "class": normalizeClass([backgroundColorClasses.value]),
            "style": normalizeStyle([backgroundColorStyles.value])
          }, [hasTitle && createVNode(VPickerTitle, {
            "key": "picker-title"
          }, {
            default: () => {
              var _a4;
              var _a3;
              return [(_a4 = (_a3 = slots.title) == null ? void 0 : _a3.call(slots)) != null ? _a4 : props.title];
            }
          }), slots.header && createElementVNode("div", {
            "class": "v-picker__header"
          }, [slots.header()])]), createElementVNode("div", {
            "class": "v-picker__body"
          }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]), slots.actions && createVNode(VDefaultsProvider, {
            "defaults": {
              VBtn: {
                slim: true,
                variant: "text"
              }
            }
          }, {
            default: () => [createElementVNode("div", {
              "class": "v-picker__actions"
            }, [slots.actions()])]
          })];
        }
      });
    });
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
  ...makeVPickerProps({
    hideHeader: true
  })
}, "VColorPicker");
const VColorPicker = defineComponent$1({
  name: "VColorPicker",
  props: makeVColorPickerProps(),
  emits: {
    "update:modelValue": (color) => true,
    "update:mode": (mode) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
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
      const pickerProps = VPicker.filterProps(props);
      return createVNode(VPicker, mergeProps(pickerProps, {
        "class": ["v-color-picker", rtlClasses.value, props.class],
        "style": [{
          "--v-color-picker-color-hsv": HSVtoCSS({
            ...(_a2 = currentColor.value) != null ? _a2 : nullColor,
            a: 1
          })
        }, props.style]
      }), {
        ...slots,
        default: () => createElementVNode(Fragment, null, [!props.hideCanvas && createVNode(VColorPickerCanvas, {
          "key": "canvas",
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "disabled": props.disabled,
          "dotSize": props.dotSize,
          "width": props.width,
          "height": props.canvasHeight
        }, null), (!props.hideSliders || !props.hideInputs) && createElementVNode("div", {
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
        }, null)])
      });
    });
    return {};
  }
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const { dialog, steps, isEdition } = storeToRefs(useTeamStore());
    const page = useRoute$1();
    const isInscriptionPage = computed(
      () => page.name === "torneos-torneo-inscripcion"
    );
    const title = computed(() => {
      switch (steps.value.current) {
        case "createTeam":
          return isEdition.value ? `${isInscriptionPage.value ? "Editar" : "Editar"} equipo` : `${isInscriptionPage.value ? "Pre inscribir" : "Crear"} equipo`;
        case "createDt":
          return isEdition.value ? `${isInscriptionPage.value ? "Editar" : "Editar"} DT` : `${isInscriptionPage.value ? "Pre inscribir" : "Crear"} DT`;
        case "createOwner":
          return isEdition.value ? `${isInscriptionPage.value ? "Editar" : "Editar"} due\xF1o` : `${isInscriptionPage.value ? "Pre inscribir" : "Crear"} due\xF1o`;
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
                  _push3(ssrRenderComponent(_component_Icon, { name: "fluent:people-team-20-regular" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, { name: "fluent:people-team-20-regular" })
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
                  createVNode(_component_Icon, { name: "fluent:people-team-20-regular" })
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/CreateTeamDialog/Header.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ColorPicker",
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
      const _component_Icon = __nuxt_component_0;
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/ColorPicker.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
    const { teamStoreRequest } = storeToRefs(store);
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
      const _component_ColorPicker = _sfc_main$5;
      _push(ssrRenderComponent(VRow, mergeProps({ "no-gutters": "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="color-pickers-container"${_scopeId2}><div class="color-pickers-container__label"${_scopeId2}><span class="text-body-2"${_scopeId2}>Local</span></div><div class="color-picker-items-container"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ColorPicker, {
                    color: unref(colors2).home.primary,
                    "onUpdate:color": ($event) => unref(colors2).home.primary = $event
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ColorPicker, {
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
                        createVNode(_component_ColorPicker, {
                          color: unref(colors2).home.primary,
                          "onUpdate:color": ($event) => unref(colors2).home.primary = $event
                        }, null, 8, ["color", "onUpdate:color"]),
                        createVNode(_component_ColorPicker, {
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
                  _push3(ssrRenderComponent(_component_ColorPicker, {
                    color: unref(colors2).away.primary,
                    "onUpdate:color": ($event) => unref(colors2).away.primary = $event
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ColorPicker, {
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
                        createVNode(_component_ColorPicker, {
                          color: unref(colors2).away.primary,
                          "onUpdate:color": ($event) => unref(colors2).away.primary = $event
                        }, null, 8, ["color", "onUpdate:color"]),
                        createVNode(_component_ColorPicker, {
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
                      createVNode(_component_ColorPicker, {
                        color: unref(colors2).home.primary,
                        "onUpdate:color": ($event) => unref(colors2).home.primary = $event
                      }, null, 8, ["color", "onUpdate:color"]),
                      createVNode(_component_ColorPicker, {
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
                      createVNode(_component_ColorPicker, {
                        color: unref(colors2).away.primary,
                        "onUpdate:color": ($event) => unref(colors2).away.primary = $event
                      }, null, 8, ["color", "onUpdate:color"]),
                      createVNode(_component_ColorPicker, {
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/colors-component.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "01-create-team",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    let locationsFind = ref([]);
    const { tournaments, tournament } = storeToRefs(useTournamentStore());
    const { teamStoreRequest, isEdition } = storeToRefs(useTeamStore());
    const { handleSubmit, fields, validate } = useSchemas(
      isEdition.value ? "edit-team" : "create-team"
    );
    const { search } = usePlaceSearch();
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
      const tournament2 = tournaments.value.find(
        (tournament3) => tournament3.id === value
      );
      if (!tournament2) {
        return;
      }
      fields.category_id.fieldValue = tournament2 == null ? void 0 : tournament2.category_id;
    };
    __expose({
      validate,
      handleSubmit
    });
    const isInscription = computed(() => {
      return useRoute$1().name === "torneos-torneo-inscripcion";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$1$1;
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
                          disabled: unref(isEdition) || unref(isInscription),
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
                            disabled: unref(isEdition) || unref(isInscription),
                            modelValue: unref(fields).tournament_id.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                          }, unref(fields).tournament_id.fieldPropsValue, {
                            density: "compact",
                            "onUpdate:modelValue": categoryHandler
                          }), null, 16, ["items", "disabled", "modelValue", "onUpdate:modelValue"])
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
                          disabled: unref(isEdition) || unref(isInscription),
                          modelValue: unref(fields).tournament_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                        }, unref(fields).tournament_id.fieldPropsValue, {
                          density: "compact",
                          "onUpdate:modelValue": categoryHandler
                        }), null, 16, ["items", "disabled", "modelValue", "onUpdate:modelValue"])
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
                        _push4(ssrRenderComponent(_sfc_main$7, {
                          modelValue: unref(fields).category_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event,
                          errors: unref(fields).category_id.fieldPropsValue
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$7, {
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
                        createVNode(_sfc_main$7, {
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
                        _push4(ssrRenderComponent(_sfc_main$8, {
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
                          createVNode(_sfc_main$8, {
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
                          createVNode(_sfc_main$8, {
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
                                    _push6(ssrRenderComponent(_sfc_main$4, {
                                      "model-value": unref(fields).colors.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).colors.fieldValue = $event,
                                      errors: unref(fields).colors.fieldPropsValue
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$4, {
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
                                    createVNode(_sfc_main$4, {
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
                                  createVNode(_sfc_main$4, {
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
                                createVNode(_sfc_main$4, {
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
                              createVNode(unref(Al), {
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
                            createVNode(unref(Al), {
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
                        disabled: unref(isEdition) || unref(isInscription),
                        modelValue: unref(fields).tournament_id.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).tournament_id.fieldValue = $event
                      }, unref(fields).tournament_id.fieldPropsValue, {
                        density: "compact",
                        "onUpdate:modelValue": categoryHandler
                      }), null, 16, ["items", "disabled", "modelValue", "onUpdate:modelValue"])
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
                      createVNode(_sfc_main$7, {
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
                        createVNode(_sfc_main$8, {
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
                              createVNode(_sfc_main$4, {
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
                          createVNode(unref(Al), {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/stepper/01-create-team.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
    const { handleSubmit, fields, validate } = useSchemas(
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
      const _component_client_only = __nuxt_component_0$1$1;
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
                        _push4(ssrRenderComponent(_sfc_main$8, {
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
                          createVNode(_sfc_main$8, {
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
                          createVNode(_sfc_main$8, {
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
                              createVNode(unref(Al), {
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
                            createVNode(unref(Al), {
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
                        createVNode(_sfc_main$8, {
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
                          createVNode(unref(Al), {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/stepper/02-create-dt.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
    const { handleSubmit, fields, validate } = useSchemas(
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
      const _component_client_only = __nuxt_component_0$1$1;
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
                        _push4(ssrRenderComponent(_sfc_main$8, {
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
                          createVNode(_sfc_main$8, {
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
                          createVNode(_sfc_main$8, {
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
                              createVNode(unref(Al), {
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
                            createVNode(unref(Al), {
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
                        createVNode(_sfc_main$8, {
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
                          createVNode(unref(Al), {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/stepper/03-create-owner.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  emits: ["registered-team"],
  setup(__props, { emit: __emit }) {
    const loading = ref(false);
    const teamStore = useTeamStore();
    const { steps, isEdition, teamStoreRequest } = storeToRefs(teamStore);
    const stepRef = ref({
      validate: Function,
      handleSubmit: Function
    });
    const emits = __emit;
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
        const stepsOrder = [
          "createTeam",
          "createDt",
          "createOwner"
        ];
        const currentStepIndex = stepsOrder.indexOf(steps.value.current);
        if (!steps.value.steps[currentStepIndex].completed) {
          steps.value.steps[currentStepIndex].completed = true;
        }
        if (currentStepIndex === stepsOrder.length - 1) {
          loading.value = true;
          if (teamStore.isEdition) {
            await teamStore.updateTeam(teamStoreRequest.value.team.id);
          } else {
            await teamStore.createTeam().then(() => {
              const route = useRoute$1();
              if (route.name === "torneos-torneo-inscripcion") {
                emits("registered-team", teamStoreRequest.value);
              }
            });
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
      const _component_transition_slide = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_PerfectScrollbar, mergeProps({ options: { suppressScrollX: true } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, {
              class: "pb-2",
              style: { "overflow-x": "hidden" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(IndicatorStep, { formSteps: unref(steps) }, null, _parent3, _scopeId2));
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
                          _push4(ssrRenderComponent(_sfc_main$3, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(steps).current
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(steps).current === "createDt") {
                          _push4(ssrRenderComponent(_sfc_main$2, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(steps).current
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(steps).current === "createOwner") {
                          _push4(ssrRenderComponent(_sfc_main$1, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(steps).current
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          unref(steps).current === "createTeam" ? (openBlock(), createBlock(_sfc_main$3, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(steps).current
                          })) : createCommentVNode("", true),
                          unref(steps).current === "createDt" ? (openBlock(), createBlock(_sfc_main$2, {
                            ref_key: "stepRef",
                            ref: stepRef,
                            key: unref(steps).current
                          })) : createCommentVNode("", true),
                          unref(steps).current === "createOwner" ? (openBlock(), createBlock(_sfc_main$1, {
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
                    createVNode(IndicatorStep, { formSteps: unref(steps) }, null, 8, ["formSteps"]),
                    createVNode(_component_transition_slide, {
                      group: "",
                      offset: {
                        enter: ["-100%", 0],
                        leave: ["100%", 0]
                      }
                    }, {
                      default: withCtx(() => [
                        unref(steps).current === "createTeam" ? (openBlock(), createBlock(_sfc_main$3, {
                          ref_key: "stepRef",
                          ref: stepRef,
                          key: unref(steps).current
                        })) : createCommentVNode("", true),
                        unref(steps).current === "createDt" ? (openBlock(), createBlock(_sfc_main$2, {
                          ref_key: "stepRef",
                          ref: stepRef,
                          key: unref(steps).current
                        })) : createCommentVNode("", true),
                        unref(steps).current === "createOwner" ? (openBlock(), createBlock(_sfc_main$1, {
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
                  createVNode(IndicatorStep, { formSteps: unref(steps) }, null, 8, ["formSteps"]),
                  createVNode(_component_transition_slide, {
                    group: "",
                    offset: {
                      enter: ["-100%", 0],
                      leave: ["100%", 0]
                    }
                  }, {
                    default: withCtx(() => [
                      unref(steps).current === "createTeam" ? (openBlock(), createBlock(_sfc_main$3, {
                        ref_key: "stepRef",
                        ref: stepRef,
                        key: unref(steps).current
                      })) : createCommentVNode("", true),
                      unref(steps).current === "createDt" ? (openBlock(), createBlock(_sfc_main$2, {
                        ref_key: "stepRef",
                        ref: stepRef,
                        key: unref(steps).current
                      })) : createCommentVNode("", true),
                      unref(steps).current === "createOwner" ? (openBlock(), createBlock(_sfc_main$1, {
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/stepper/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$6 as _, _sfc_main as a };
//# sourceMappingURL=index-F4o0OShX.mjs.map
