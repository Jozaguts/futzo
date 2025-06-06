import { isObject, isInteger, isString, isNumeric, isArray } from '@morev/utils';
import { createBlock, openBlock, resolveDynamicComponent, mergeProps, toHandlers, withCtx, renderSlot, TransitionGroup, Transition } from 'vue';

const validateEnterLeave = (value, validator) => {
  if (validator(value))
    return true;
  if (!isObject(value))
    return false;
  if (Object.keys(value).length !== 2)
    return false;
  return !Object.entries(value).some(([key, val]) => {
    const wrongKey = !["enter", "leave"].includes(key);
    const wrongValue = !validator(val);
    return wrongKey || wrongValue;
  });
};
const validateDuration = (value) => validateEnterLeave(value, (val) => {
  return isInteger(val) && val >= 0;
});
const validateEasing = (value) => validateEnterLeave(value, (val) => {
  return isString(val) && val.trim() !== "";
});
const validateDelay = (value) => validateEnterLeave(value, (val) => {
  return isInteger(val) && val >= 0;
});
const transitionDuration = 300;
const transitionEasing = "cubic-bezier(.25, .8, .5, 1)";
const transitionDelay = 0;
const expandAxis = "y";
const slideOffset = [0, -16];
const moveDuration = transitionDuration;
const baseTransition = {
  inheritAttrs: false,
  props: {
    duration: {
      validator: validateDuration,
      default: transitionDuration
    },
    easing: {
      validator: validateEasing,
      default: () => transitionEasing
    },
    delay: {
      validator: validateDelay,
      default: transitionDelay
    },
    noOpacity: {
      type: Boolean,
      default: false
    },
    appear: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: void 0
    },
    group: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: "span"
    },
    noMove: {
      type: Boolean,
      default: false
    },
    moveDuration: {
      type: Number,
      default: moveDuration
    }
  },
  computed: {
    cComponent() {
      return this.group ? TransitionGroup : Transition;
    },
    cAttrs() {
      const { appear, mode, tag, duration } = this;
      return this.group ? { appear, tag, duration, ...this.$attrs } : { appear, mode, duration };
    },
    cHooks() {
      return {
        beforeEnter: (...args) => {
          this.reduceTransition(...args);
          this.$emit("before-enter", ...args);
        },
        beforeLeave: (...args) => {
          var _a;
          this.reduceTransition(...args);
          (_a = this.initLeaving) == null ? void 0 : _a.call(this, ...args);
          this.$emit("before-leave", ...args);
        },
        enter: (...args) => {
          var _a;
          (_a = this.onEnter) == null ? void 0 : _a.call(this, ...args);
          this.$emit("enter", ...args);
        },
        leave: (...args) => {
          var _a;
          (_a = this.onLeave) == null ? void 0 : _a.call(this, ...args);
          this.$emit("leave", ...args);
        },
        afterEnter: (...args) => {
          var _a;
          this.resetTransition(...args);
          (_a = this.resetElement) == null ? void 0 : _a.call(this, ...args);
          this.$emit("after-enter", ...args);
        },
        afterLeave: (...args) => {
          var _a;
          this.resetTransition(...args);
          (_a = this.resetElement) == null ? void 0 : _a.call(this, ...args);
          this.$emit("after-leave", ...args);
        }
      };
    }
  },
  methods: {
    setupTransition(element, event = "enter") {
      var _a2, _b2, _c2;
      var _a, _b, _c;
      const duration = (_a2 = (_a = this.duration) == null ? void 0 : _a[event]) != null ? _a2 : this.duration;
      const easing = (_b2 = (_b = this.easing) == null ? void 0 : _b[event]) != null ? _b2 : this.easing;
      const delay = (_c2 = (_c = this.delay) == null ? void 0 : _c[event]) != null ? _c2 : this.delay;
      element.style.setProperty("transition-duration", `${duration}ms`, "important");
      element.style.setProperty("transition-timing-function", `${easing}`, "important");
      element.style.setProperty("transition-delay", `${delay}ms`, "important");
    },
    reduceTransition(element) {
      element.style.setProperty("transition-duration", "0ms", "important");
      element.style.setProperty("transition-delay", "0ms", "important");
    },
    resetTransition(element) {
      element.style.removeProperty("transition-duration");
      element.style.removeProperty("transition-timing-function");
      element.style.removeProperty("transition-delay");
    },
    initLeaving(element) {
      if (!this.group || this.noMove)
        return element;
      const styles = getComputedStyle(element);
      const { width, height } = styles;
      const { marginLeft, marginTop } = styles;
      element.style.setProperty("left", `${element.offsetLeft - parseFloat(marginLeft)}px`, "important");
      element.style.setProperty("top", `${element.offsetTop - parseFloat(marginTop)}px`, "important");
      element.style.setProperty("width", `${parseFloat(width)}px`, "important");
      element.style.setProperty("height", `${parseFloat(height)}px`, "important");
      element.style.setProperty("position", "absolute", "important");
      return element;
    },
    setMoveDuration() {
      var _a;
      if (this.group && this.$el) {
        (_a = this.$el.style) == null ? void 0 : _a.setProperty("--move-duration", `${this.moveDuration}ms`);
      }
    }
  },
  watch: {
    moveDuration() {
      this.setMoveDuration();
    },
    group() {
      this.setMoveDuration();
    }
  },
  mounted() {
    this.setMoveDuration();
  }
};
const validateExpandAxis = (value) => validateEnterLeave(value, (val) => {
  return isString(val) && ["x", "y"].includes(val);
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {
  name: "transition-expand",
  mixins: [
    baseTransition
  ],
  props: {
    axis: {
      validator: validateExpandAxis,
      default: expandAxis
    }
  },
  data: () => ({}),
  computed: {},
  methods: {
    async onEnter(element) {
      await this.$nextTick();
      await this.$nextTick();
      this.getSizes(element);
      this.collapseElement(element, "enter");
      element.offsetTop;
      this.setupTransition(element, "enter");
      this.expandElement(element, "enter");
    },
    onLeave(element) {
      this.getSizes(element);
      this.expandElement(element, "leave");
      element.offsetTop;
      this.setupTransition(element, "leave");
      this.collapseElement(element, "leave");
    },
    expandElement(element, event = "enter") {
      var _a2;
      var _a;
      const axis = (_a2 = (_a = this.axis) == null ? void 0 : _a[event]) != null ? _a2 : this.axis;
      const start = axis === "x" ? "left" : "top";
      const end = axis === "x" ? "right" : "bottom";
      const size = element.visual.size[axis];
      const margin = element.visual.margin[axis];
      const padding = element.visual.padding[axis];
      if (!this.noOpacity) {
        element.style.setProperty("opacity", element.visual.opacity);
      }
      delete element.visual;
      element.style.setProperty(axis === "x" ? "width" : "height", `${parseFloat(size)}px`);
      element.style.setProperty(`padding-${start}`, `${parseFloat(padding[0])}px`);
      element.style.setProperty(`padding-${end}`, `${parseFloat(padding[1])}px`);
      element.style.setProperty(`margin-${start}`, `${parseFloat(margin[0])}px`);
      element.style.setProperty(`margin-${end}`, `${parseFloat(margin[1])}px`);
    },
    collapseElement(element, event = "enter") {
      var _a2;
      var _a;
      const axis = (_a2 = (_a = this.axis) == null ? void 0 : _a[event]) != null ? _a2 : this.axis;
      const axisProp = axis === "x" ? "width" : "height";
      const start = axis === "x" ? "left" : "top";
      const end = axis === "x" ? "right" : "bottom";
      if (!this.noOpacity) {
        element.style.setProperty("opacity", 0);
      }
      element.style.setProperty(axisProp, "0px");
      element.style.setProperty(`padding-${start}`, "0px");
      element.style.setProperty(`padding-${end}`, "0px");
      element.style.setProperty(`margin-${start}`, "0px");
      element.style.setProperty(`margin-${end}`, "0px");
    },
    resetElement(element) {
      element.style.removeProperty("opacity");
      element.style.removeProperty("width");
      element.style.removeProperty("height");
      element.style.removeProperty("padding-top");
      element.style.removeProperty("padding-right");
      element.style.removeProperty("padding-bottom");
      element.style.removeProperty("padding-left");
      element.style.removeProperty("margin-top");
      element.style.removeProperty("margin-right");
      element.style.removeProperty("margin-bottom");
      element.style.removeProperty("margin-left");
    },
    getSizes(element) {
      const styles = getComputedStyle(element);
      const { opacity } = styles;
      const { width, height } = styles;
      const { paddingTop, paddingRight, paddingBottom, paddingLeft } = styles;
      const { marginTop, marginRight, marginBottom, marginLeft } = styles;
      element.visual = {
        opacity,
        size: { x: width, y: height },
        padding: { x: [paddingLeft, paddingRight], y: [paddingTop, paddingBottom] },
        margin: { x: [marginLeft, marginRight], y: [marginTop, marginBottom] }
      };
    }
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.cComponent), mergeProps({ name: "expand" }, _ctx.cAttrs, toHandlers(_ctx.cHooks)), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const TransitionExpand = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = {
  name: "transition-fade",
  mixins: [
    baseTransition
  ],
  props: {},
  data: () => ({}),
  computed: {},
  methods: {
    onEnter(element) {
      this.fadeElement(element, "enter");
      element.offsetTop;
      this.setupTransition(element, "enter");
      this.$nextTick(() => element.style.removeProperty("opacity"));
    },
    onLeave(element) {
      this.setupTransition(element, "leave");
      this.fadeElement(element, "leave");
    },
    fadeElement(element, event = "enter") {
      element.style.setProperty("opacity", 0);
    },
    resetElement(element) {
      element.style.removeProperty("opacity");
    }
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.cComponent), mergeProps({ name: "fade" }, _ctx.cAttrs, toHandlers(_ctx.cHooks)), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const TransitionFade = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const getMatrix = (transform) => {
  const matrixType = transform.startsWith("matrix3d") ? "matrix3d" : "matrix";
  const matrix = matrixType === "matrix3d" ? transform.slice(9, -1).split(",").map(Number) : transform.startsWith("matrix") ? transform.slice(7, -1).split(",").map(Number) : [1, 0, 0, 1, 0, 0];
  return [matrixType, matrix];
};
const validateSlideOffset = (value) => validateEnterLeave(value, (val) => {
  if (!isArray(val))
    return false;
  if (val.length !== 2)
    return false;
  return !val.some((v) => {
    if (isInteger(v))
      return false;
    if (isString(v)) {
      return isNaN(Number(v.endsWith("%") ? v.slice(0, -1) : v));
    }
    return true;
  });
});
const _sfc_main = {
  name: "transition-slide",
  mixins: [
    baseTransition
  ],
  props: {
    offset: {
      validator: validateSlideOffset,
      default: () => slideOffset
    }
  },
  data: () => ({}),
  computed: {},
  methods: {
    onEnter(element) {
      this.slideElement(element, "enter");
      element.offsetTop;
      this.setupTransition(element, "enter");
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
    },
    onLeave(element) {
      this.setupTransition(element, "leave");
      this.slideElement(element, "leave");
    },
    slideElement(element, event = "enter") {
      var _a2;
      var _a;
      const { width, height, transform } = getComputedStyle(element);
      const offset = (_a2 = (_a = this.offset) == null ? void 0 : _a[event]) != null ? _a2 : this.offset;
      let [offsetX, offsetY] = offset;
      if (!isNumeric(offsetX)) {
        const val = offsetX.endsWith("%") ? parseFloat(width) * (parseFloat(offsetX.slice(0, -1)) || 0) / 100 : parseFloat(offsetX);
        offsetX = val;
      }
      if (!isNumeric(offsetY)) {
        const val = offsetY.endsWith("%") ? parseFloat(height) * (parseFloat(offsetY.slice(0, -1)) || 0) / 100 : parseFloat(offsetY);
        offsetY = val;
      }
      const [matrixType, matrix] = getMatrix(transform);
      if (transform.startsWith("matrix3d")) {
        matrix[12] += offsetX;
        matrix[13] += offsetY;
      } else if (transform.startsWith("matrix")) {
        matrix[4] += offsetX;
        matrix[5] += offsetY;
      } else {
        matrix[4] = offsetX;
        matrix[5] = offsetY;
      }
      if (!this.noOpacity) {
        element.style.setProperty("opacity", 0);
      }
      element.style.setProperty("transform", `${matrixType}(${matrix})`);
    },
    resetElement(element) {
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.cComponent), mergeProps({ name: "slide" }, _ctx.cAttrs, toHandlers(_ctx.cHooks)), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const TransitionSlide = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { TransitionExpand as T, TransitionFade as a, TransitionSlide as b };
//# sourceMappingURL=vue-transitions-gDOXGptb.mjs.map
