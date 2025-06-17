import { _ as _sfc_main$2$1, a as _sfc_main$7 } from './AppBar-BcqMvHzz.mjs';
import { defineComponent, watchEffect, withCtx, unref, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, mergeProps, toDisplayString, withAsyncContext, isRef, watch, computed, useId, ref, nextTick, createElementVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { u as useDashboardStore, a as useTeamStore } from './useScheduleStore-DBhAIDF3.mjs';
import { h as useRoute$1, i as useRouter$1, V as VCard, e as VCardTitle, f as VCardItem, g as genericComponent, p as propsFactory, d as useTextColor, c as useRender, b as getPropertyFromItem } from './server.mjs';
import { storeToRefs } from 'pinia';
import { V as VItemGroup, a as VItem } from './VItem-DAX1x4SQ.mjs';
import { V as VBtn } from './VBtn-_od1f1mx.mjs';
import { _ as __nuxt_component_0 } from './index-DkcY5wU8.mjs';
import { V as VContainer } from './VContainer-C0Se5csP.mjs';
import { V as VRow, a as VCol } from './VRow-CwLG7ojV.mjs';
import { g as getHeaders, _ as _sfc_main$8 } from './headers-table-CD9PI4fc.mjs';
import { V as VEmptyState } from './VEmptyState-BP9R9rJP.mjs';
import { u as useToast } from './useToast-m9XhiEp3.mjs';
import './layout-Bel3IrLG.mjs';
import '@vue/reactivity';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'node:module';
import 'ipx';
import 'vue-router';
import '@iconify/vue';
import 'perfect-scrollbar';
import 'deep-pick-omit';
import 'dayjs';
import 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/es.js';
import 'awesome-phonenumber';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './VTable-BTxmY7C0.mjs';
import './filter-PqGpj4I-.mjs';
import './VTooltip-BQZt6HQd.mjs';

const makeLineProps = propsFactory({
  autoDraw: Boolean,
  autoDrawDuration: [Number, String],
  autoDrawEasing: {
    type: String,
    default: "ease"
  },
  color: String,
  gradient: {
    type: Array,
    default: () => []
  },
  gradientDirection: {
    type: String,
    validator: (val) => ["top", "bottom", "left", "right"].includes(val),
    default: "top"
  },
  height: {
    type: [String, Number],
    default: 75
  },
  labels: {
    type: Array,
    default: () => []
  },
  labelSize: {
    type: [Number, String],
    default: 7
  },
  lineWidth: {
    type: [String, Number],
    default: 4
  },
  id: String,
  itemValue: {
    type: String,
    default: "value"
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  min: [String, Number],
  max: [String, Number],
  padding: {
    type: [String, Number],
    default: 8
  },
  showLabels: Boolean,
  smooth: [Boolean, String, Number],
  width: {
    type: [Number, String],
    default: 300
  }
}, "Line");
const makeVBarlineProps = propsFactory({
  autoLineWidth: Boolean,
  ...makeLineProps()
}, "VBarline");
const VBarline = genericComponent()({
  name: "VBarline",
  props: makeVBarlineProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const uid = useId();
    const id = computed(() => props.id || `barline-${uid}`);
    const autoDrawDuration = computed(() => Number(props.autoDrawDuration) || 500);
    const hasLabels = computed(() => {
      return Boolean(props.showLabels || props.labels.length > 0 || !!(slots == null ? void 0 : slots.label));
    });
    const lineWidth = computed(() => parseFloat(props.lineWidth) || 4);
    const totalWidth = computed(() => Math.max(props.modelValue.length * lineWidth.value, Number(props.width)));
    const boundary = computed(() => {
      return {
        minX: 0,
        maxX: totalWidth.value,
        minY: 0,
        maxY: parseInt(props.height, 10)
      };
    });
    const items = computed(() => props.modelValue.map((item) => getPropertyFromItem(item, props.itemValue, item)));
    function genBars(values, boundary2) {
      const {
        minX,
        maxX,
        minY,
        maxY
      } = boundary2;
      const totalValues = values.length;
      let maxValue = props.max != null ? Number(props.max) : Math.max(...values);
      let minValue = props.min != null ? Number(props.min) : Math.min(...values);
      if (minValue > 0 && props.min == null) minValue = 0;
      if (maxValue < 0 && props.max == null) maxValue = 0;
      const gridX = maxX / totalValues;
      const gridY = (maxY - minY) / (maxValue - minValue || 1);
      const horizonY = maxY - Math.abs(minValue * gridY);
      return values.map((value, index) => {
        const height = Math.abs(gridY * value);
        return {
          x: minX + index * gridX,
          y: horizonY - height + Number(value < 0) * height,
          height,
          value
        };
      });
    }
    const parsedLabels = computed(() => {
      const labels = [];
      const points = genBars(items.value, boundary.value);
      const len = points.length;
      for (let i = 0; labels.length < len; i++) {
        const item = points[i];
        let value = props.labels[i];
        if (!value) {
          value = typeof item === "object" ? item.value : item;
        }
        labels.push({
          x: item.x,
          value: String(value)
        });
      }
      return labels;
    });
    const bars = computed(() => genBars(items.value, boundary.value));
    const offsetX = computed(() => (Math.abs(bars.value[0].x - bars.value[1].x) - lineWidth.value) / 2);
    const smooth = computed(() => typeof props.smooth === "boolean" ? props.smooth ? 2 : 0 : Number(props.smooth));
    useRender(() => {
      const gradientData = !props.gradient.slice().length ? [""] : props.gradient.slice().reverse();
      return createElementVNode("svg", {
        "display": "block"
      }, [createElementVNode("defs", null, [createElementVNode("linearGradient", {
        "id": id.value,
        "gradientUnits": "userSpaceOnUse",
        "x1": props.gradientDirection === "left" ? "100%" : "0",
        "y1": props.gradientDirection === "top" ? "100%" : "0",
        "x2": props.gradientDirection === "right" ? "100%" : "0",
        "y2": props.gradientDirection === "bottom" ? "100%" : "0"
      }, [gradientData.map((color, index) => createElementVNode("stop", {
        "offset": index / Math.max(gradientData.length - 1, 1),
        "stop-color": color || "currentColor"
      }, null))])]), createElementVNode("clipPath", {
        "id": `${id.value}-clip`
      }, [bars.value.map((item) => createElementVNode("rect", {
        "x": item.x + offsetX.value,
        "y": item.y,
        "width": lineWidth.value,
        "height": item.height,
        "rx": smooth.value,
        "ry": smooth.value
      }, [props.autoDraw && createElementVNode(Fragment, null, [createElementVNode("animate", {
        "attributeName": "y",
        "from": item.y + item.height,
        "to": item.y,
        "dur": `${autoDrawDuration.value}ms`,
        "fill": "freeze"
      }, null), createElementVNode("animate", {
        "attributeName": "height",
        "from": "0",
        "to": item.height,
        "dur": `${autoDrawDuration.value}ms`,
        "fill": "freeze"
      }, null)])]))]), hasLabels.value && createElementVNode("g", {
        "key": "labels",
        "style": {
          textAnchor: "middle",
          dominantBaseline: "mathematical",
          fill: "currentColor"
        }
      }, [parsedLabels.value.map((item, i) => {
        var _a2;
        var _a;
        return createElementVNode("text", {
          "x": item.x + offsetX.value + lineWidth.value / 2,
          "y": parseInt(props.height, 10) - 2 + (parseInt(props.labelSize, 10) || 7 * 0.75),
          "font-size": Number(props.labelSize) || 7
        }, [(_a2 = (_a = slots.label) == null ? void 0 : _a.call(slots, {
          index: i,
          value: item.value
        })) != null ? _a2 : item.value]);
      })]), createElementVNode("g", {
        "clip-path": `url(#${id.value}-clip)`,
        "fill": `url(#${id.value})`
      }, [createElementVNode("rect", {
        "x": 0,
        "y": 0,
        "width": Math.max(props.modelValue.length * lineWidth.value, Number(props.width)),
        "height": props.height
      }, null)])]);
    });
  }
});
function genPath(points, radius) {
  let fill = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  let height = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 75;
  if (points.length === 0) return "";
  const start = points.shift();
  const end = points[points.length - 1];
  return (fill ? `M${start.x} ${height - start.x + 2} L${start.x} ${start.y}` : `M${start.x} ${start.y}`) + points.map((point, index) => {
    const next = points[index + 1];
    const prev = points[index - 1] || start;
    const isCollinear = next && checkCollinear(next, point, prev);
    if (!next || isCollinear) {
      return `L${point.x} ${point.y}`;
    }
    const threshold = Math.min(getDistance(prev, point), getDistance(next, point));
    const isTooCloseForRadius = threshold / 2 < radius;
    const radiusForPoint = isTooCloseForRadius ? threshold / 2 : radius;
    const before = moveTo(prev, point, radiusForPoint);
    const after = moveTo(next, point, radiusForPoint);
    return `L${before.x} ${before.y}S${point.x} ${point.y} ${after.x} ${after.y}`;
  }).join("") + (fill ? `L${end.x} ${height - start.x + 2} Z` : "");
}
function int(value) {
  return parseInt(value, 10);
}
function checkCollinear(p0, p1, p2) {
  return int(p0.x + p2.x) === int(2 * p1.x) && int(p0.y + p2.y) === int(2 * p1.y);
}
function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
function moveTo(to, from, radius) {
  const vector = {
    x: to.x - from.x,
    y: to.y - from.y
  };
  const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  const unitVector = {
    x: vector.x / length,
    y: vector.y / length
  };
  return {
    x: from.x + unitVector.x * radius,
    y: from.y + unitVector.y * radius
  };
}
const makeVTrendlineProps = propsFactory({
  fill: Boolean,
  ...makeLineProps()
}, "VTrendline");
const VTrendline = genericComponent()({
  name: "VTrendline",
  props: makeVTrendlineProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const uid = useId();
    const id = computed(() => props.id || `trendline-${uid}`);
    const autoDrawDuration = computed(() => Number(props.autoDrawDuration) || (props.fill ? 500 : 2e3));
    const lastLength = ref(0);
    const path = ref(null);
    function genPoints(values, boundary2) {
      const {
        minX,
        maxX,
        minY,
        maxY
      } = boundary2;
      const totalValues = values.length;
      const maxValue = props.max != null ? Number(props.max) : Math.max(...values);
      const minValue = props.min != null ? Number(props.min) : Math.min(...values);
      const gridX = (maxX - minX) / (totalValues - 1);
      const gridY = (maxY - minY) / (maxValue - minValue || 1);
      return values.map((value, index) => {
        return {
          x: minX + index * gridX,
          y: maxY - (value - minValue) * gridY,
          value
        };
      });
    }
    const hasLabels = computed(() => {
      return Boolean(props.showLabels || props.labels.length > 0 || !!(slots == null ? void 0 : slots.label));
    });
    const lineWidth = computed(() => {
      return parseFloat(props.lineWidth) || 4;
    });
    const totalWidth = computed(() => Number(props.width));
    const boundary = computed(() => {
      const padding = Number(props.padding);
      return {
        minX: padding,
        maxX: totalWidth.value - padding,
        minY: padding,
        maxY: parseInt(props.height, 10) - padding
      };
    });
    const items = computed(() => props.modelValue.map((item) => getPropertyFromItem(item, props.itemValue, item)));
    const parsedLabels = computed(() => {
      const labels = [];
      const points = genPoints(items.value, boundary.value);
      const len = points.length;
      for (let i = 0; labels.length < len; i++) {
        const item = points[i];
        let value = props.labels[i];
        if (!value) {
          value = typeof item === "object" ? item.value : item;
        }
        labels.push({
          x: item.x,
          value: String(value)
        });
      }
      return labels;
    });
    watch(() => props.modelValue, async () => {
      await nextTick();
      if (!props.autoDraw || !path.value) return;
      const pathRef = path.value;
      const length = pathRef.getTotalLength();
      if (!props.fill) {
        pathRef.style.strokeDasharray = `${length}`;
        pathRef.style.strokeDashoffset = `${length}`;
        pathRef.getBoundingClientRect();
        pathRef.style.transition = `stroke-dashoffset ${autoDrawDuration.value}ms ${props.autoDrawEasing}`;
        pathRef.style.strokeDashoffset = "0";
      } else {
        pathRef.style.transformOrigin = "bottom center";
        pathRef.style.transition = "none";
        pathRef.style.transform = `scaleY(0)`;
        pathRef.getBoundingClientRect();
        pathRef.style.transition = `transform ${autoDrawDuration.value}ms ${props.autoDrawEasing}`;
        pathRef.style.transform = `scaleY(1)`;
      }
      lastLength.value = length;
    }, {
      immediate: true
    });
    function genPath$1(fill) {
      const smoothValue = typeof props.smooth === "boolean" ? props.smooth ? 8 : 0 : Number(props.smooth);
      return genPath(genPoints(items.value, boundary.value), smoothValue, fill, parseInt(props.height, 10));
    }
    useRender(() => {
      var _a2, _b;
      var _a;
      const gradientData = !props.gradient.slice().length ? [""] : props.gradient.slice().reverse();
      return createElementVNode("svg", {
        "display": "block",
        "stroke-width": (_a2 = parseFloat(props.lineWidth)) != null ? _a2 : 4
      }, [createElementVNode("defs", null, [createElementVNode("linearGradient", {
        "id": id.value,
        "gradientUnits": "userSpaceOnUse",
        "x1": props.gradientDirection === "left" ? "100%" : "0",
        "y1": props.gradientDirection === "top" ? "100%" : "0",
        "x2": props.gradientDirection === "right" ? "100%" : "0",
        "y2": props.gradientDirection === "bottom" ? "100%" : "0"
      }, [gradientData.map((color, index) => createElementVNode("stop", {
        "offset": index / Math.max(gradientData.length - 1, 1),
        "stop-color": color || "currentColor"
      }, null))])]), hasLabels.value && createElementVNode("g", {
        "key": "labels",
        "style": {
          textAnchor: "middle",
          dominantBaseline: "mathematical",
          fill: "currentColor"
        }
      }, [parsedLabels.value.map((item, i) => {
        var _a3;
        var _a22;
        return createElementVNode("text", {
          "x": item.x + lineWidth.value / 2 + lineWidth.value / 2,
          "y": parseInt(props.height, 10) - 4 + (parseInt(props.labelSize, 10) || 7 * 0.75),
          "font-size": Number(props.labelSize) || 7
        }, [(_a3 = (_a22 = slots.label) == null ? void 0 : _a22.call(slots, {
          index: i,
          value: item.value
        })) != null ? _a3 : item.value]);
      })]), createElementVNode("path", {
        "ref": path,
        "d": genPath$1(props.fill),
        "fill": props.fill ? `url(#${id.value})` : "none",
        "stroke": props.fill ? "none" : `url(#${id.value})`
      }, null), props.fill && createElementVNode("path", {
        "d": genPath$1(false),
        "fill": "none",
        "stroke": (_b = props.color) != null ? _b : (_a = props.gradient) == null ? void 0 : _a[0]
      }, null)]);
    });
  }
});
const makeVSparklineProps = propsFactory({
  type: {
    type: String,
    default: "trend"
  },
  ...makeVBarlineProps(),
  ...makeVTrendlineProps()
}, "VSparkline");
const VSparkline = genericComponent()({
  name: "VSparkline",
  props: makeVSparklineProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    const hasLabels = computed(() => {
      return Boolean(props.showLabels || props.labels.length > 0 || !!(slots == null ? void 0 : slots.label));
    });
    const totalHeight = computed(() => {
      let height = parseInt(props.height, 10);
      if (hasLabels.value) height += parseInt(props.labelSize, 10) * 1.5;
      return height;
    });
    useRender(() => {
      const Tag = props.type === "trend" ? VTrendline : VBarline;
      const lineProps = props.type === "trend" ? VTrendline.filterProps(props) : VBarline.filterProps(props);
      return createVNode(Tag, mergeProps({
        "key": props.type,
        "class": textColorClasses.value,
        "style": textColorStyles.value,
        "viewBox": `0 0 ${props.width} ${parseInt(totalHeight.value, 10)}`
      }, lineProps), slots);
    });
  }
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "app-bar-btn",
  __ssrInlineRender: true,
  setup(__props) {
    const { range } = storeToRefs(useDashboardStore());
    const ranges = [
      { value: "lastYear", name: "12 meses" },
      { value: "lastMonth", name: "30 d\xEDas" },
      { value: "lastWeek", name: "7 d\xEDas" },
      { value: "last24Hrs", name: "24 horas" }
    ];
    watch(range, (value, oldValue) => {
      if (value !== oldValue) {
        useDashboardStore().byRange();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VItemGroup, mergeProps({
        mandatory: "",
        modelValue: unref(range),
        "onUpdate:modelValue": ($event) => isRef(range) ? range.value = $event : null,
        class: "mr-8"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(ranges, (item) => {
              _push2(ssrRenderComponent(VItem, {
                key: item.value,
                value: item.value
              }, {
                default: withCtx(({ isSelected, toggle }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VBtn, {
                      onClick: toggle,
                      rounded: "0",
                      color: isSelected ? "primary" : "",
                      class: ["dashboard-app-bar-btn dashboard-app-bar-btn-" + item.value]
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(item.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(item.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VBtn, {
                        onClick: toggle,
                        rounded: "0",
                        color: isSelected ? "primary" : "",
                        class: ["dashboard-app-bar-btn dashboard-app-bar-btn-" + item.value]
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick", "color", "class"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(ranges, (item) => {
                return createVNode(VItem, {
                  key: item.value,
                  value: item.value
                }, {
                  default: withCtx(({ isSelected, toggle }) => [
                    createVNode(VBtn, {
                      onClick: toggle,
                      rounded: "0",
                      color: isSelected ? "primary" : "",
                      class: ["dashboard-app-bar-btn dashboard-app-bar-btn-" + item.value]
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.name), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick", "color", "class"])
                  ]),
                  _: 2
                }, 1032, ["value"]);
              }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/app-bar-btn.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "card-arrow",
  __ssrInlineRender: true,
  props: {
    value: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const isNegative = computed(() => Number(props.value) <= 0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_Icon, {
        class: "arrow-card",
        name: unref(isNegative) ? "futzo-icon:arrow-down" : "futzo-icon:arrow-up"
      }, null, _parent));
      _push(`<span class="${ssrRenderClass([unref(isNegative) ? "negative" : "positive", "dashboard-stats-card--values-container__percentage"])}">${ssrInterpolate(__props.value)}</span><span class="dashboard-stats-card--values-container__percentage text">${ssrInterpolate(__props.label)}</span></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/card-arrow.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "stats",
  __ssrInlineRender: true,
  props: {
    values: {
      type: Array,
      required: true
    },
    isPositive: {
      type: Boolean,
      required: true
    }
  },
  setup(__props) {
    const gradients = [
      ["rgba(7,148,85,0.1)", "rgba(7,148,85,0.07)"],
      ["rgba(240,68,56,0.1)", "rgba(240,68,56,0.07)"]
    ];
    const props = __props;
    const gradient = computed(
      () => props.isPositive ? gradients[0] : gradients[1]
    );
    const color = computed(() => props.isPositive ? "#079455" : "#F04438");
    const values = computed(() => props.isPositive ? props.values : props.values);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VSparkline, mergeProps({
        fill: true,
        width: "130",
        color: unref(color),
        height: "70",
        gradient: unref(gradient),
        "line-width": 1,
        "model-value": unref(values),
        padding: 1,
        smooth: false,
        "gradient-direction": "bottom",
        "auto-draw": ""
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/stats.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "stats-card",
  __ssrInlineRender: true,
  props: {
    title: {
      required: true,
      type: String
    },
    values: {
      required: true,
      type: Object
    },
    isPositive: {
      required: true,
      type: Boolean,
      default: () => true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({ class: "dashboard-stats-card" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardTitle, { class: "dashboard-stats-card__title" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.title), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardItem, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, { class: "pa-0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "7",
                                class: "position-relative"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="dashboard-stats-card--values-container"${_scopeId5}><p class="dashboard-stats-card--values-container__total"${_scopeId5}>${ssrInterpolate(__props.values.total)}</p>`);
                                    _push6(ssrRenderComponent(_sfc_main$5, {
                                      value: __props.values.current,
                                      label: __props.values.label
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "dashboard-stats-card--values-container" }, [
                                        createVNode("p", { class: "dashboard-stats-card--values-container__total" }, toDisplayString(__props.values.total), 1),
                                        createVNode(_sfc_main$5, {
                                          value: __props.values.current,
                                          label: __props.values.label
                                        }, null, 8, ["value", "label"])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "5" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$4, {
                                      isPositive: __props.isPositive,
                                      values: __props.values.dailyData
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$4, {
                                        isPositive: __props.isPositive,
                                        values: __props.values.dailyData
                                      }, null, 8, ["isPositive", "values"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "7",
                                  class: "position-relative"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "dashboard-stats-card--values-container" }, [
                                      createVNode("p", { class: "dashboard-stats-card--values-container__total" }, toDisplayString(__props.values.total), 1),
                                      createVNode(_sfc_main$5, {
                                        value: __props.values.current,
                                        label: __props.values.label
                                      }, null, 8, ["value", "label"])
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "5" }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$4, {
                                      isPositive: __props.isPositive,
                                      values: __props.values.dailyData
                                    }, null, 8, ["isPositive", "values"])
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
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "7",
                                class: "position-relative"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "dashboard-stats-card--values-container" }, [
                                    createVNode("p", { class: "dashboard-stats-card--values-container__total" }, toDisplayString(__props.values.total), 1),
                                    createVNode(_sfc_main$5, {
                                      value: __props.values.current,
                                      label: __props.values.label
                                    }, null, 8, ["value", "label"])
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "5" }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$4, {
                                    isPositive: __props.isPositive,
                                    values: __props.values.dailyData
                                  }, null, 8, ["isPositive", "values"])
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
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "7",
                              class: "position-relative"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "dashboard-stats-card--values-container" }, [
                                  createVNode("p", { class: "dashboard-stats-card--values-container__total" }, toDisplayString(__props.values.total), 1),
                                  createVNode(_sfc_main$5, {
                                    value: __props.values.current,
                                    label: __props.values.label
                                  }, null, 8, ["value", "label"])
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "5" }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$4, {
                                  isPositive: __props.isPositive,
                                  values: __props.values.dailyData
                                }, null, 8, ["isPositive", "values"])
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
              createVNode(VCardTitle, { class: "dashboard-stats-card__title" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.title), 1)
                ]),
                _: 1
              }),
              createVNode(VCardItem, null, {
                default: withCtx(() => [
                  createVNode(VContainer, { class: "pa-0" }, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "7",
                            class: "position-relative"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "dashboard-stats-card--values-container" }, [
                                createVNode("p", { class: "dashboard-stats-card--values-container__total" }, toDisplayString(__props.values.total), 1),
                                createVNode(_sfc_main$5, {
                                  value: __props.values.current,
                                  label: __props.values.label
                                }, null, 8, ["value", "label"])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "5" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$4, {
                                isPositive: __props.isPositive,
                                values: __props.values.dailyData
                              }, null, 8, ["isPositive", "values"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/stats-card.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "last-teams",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const headers = getHeaders("teams");
    [__temp, __restore] = withAsyncContext(() => useTeamStore().getTeams()), await __temp, __restore();
    const { teams, search, pagination } = storeToRefs(useTeamStore());
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Table = _sfc_main$8;
      if ((_a = unref(teams)) == null ? void 0 : _a.length) {
        _push(ssrRenderComponent(_component_Table, mergeProps({
          headers: unref(headers),
          "show-index": true,
          items: unref(teams),
          itemKey: "name",
          search: unref(search),
          pagination: unref(pagination),
          "onUpdate:pagination": ($event) => isRef(pagination) ? pagination.value = $event : null,
          paginate: unref(useTeamStore)().getTeams,
          "custom-name": true,
          "show-footer": false
        }, _attrs), null, _parent));
      } else {
        _push(ssrRenderComponent(VEmptyState, mergeProps({
          image: "/no-data.svg",
          size: "100",
          text: "No hay equipos",
          title: "\xDAltimos equipos inscritos"
        }, _attrs), null, _parent));
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/last-teams.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "dashboard-next-games",
  __ssrInlineRender: true,
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-game-container" }, _attrs))}><div class="dashboard-teams"><div class="dashboard-team-local"><img${ssrRenderAttr("src", __props.game.home_team.image)} alt="team logo" class="dashboard-logo"><span class="dashboard-team_name">${ssrInterpolate(__props.game.home_team.name)}</span></div><div class="dashboard-vs-container"><div class="dashboard-vs">vs</div></div><div class="dashboard-team-away"><img${ssrRenderAttr("src", __props.game.away_team.image)} alt="team logo" class="dashboard-logo"><span class="dashboard-team_name">${ssrInterpolate(__props.game.away_team.name)}</span></div></div><div class="dashboard-data"><span class="dashboard-date">${ssrInterpolate(__props.game.match_date)}</span><span class="dashboard-hour">${ssrInterpolate(__props.game.match_time)}</span><span class="dashboard-field">${ssrInterpolate(__props.game.location.name)}</span></div><div class="dashboard-btn-container">`);
      _push(ssrRenderComponent(VBtn, {
        variant: "text",
        ripple: false,
        to: "/torneos"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, { name: "futzo-icon:arrow-right" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, { name: "futzo-icon:arrow-right" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dashboard-btn-text"${_scopeId}> Ver detalles</span>`);
          } else {
            return [
              createVNode("span", { class: "dashboard-btn-text" }, " Ver detalles")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/dashboard-next-games.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { teamStats, nextGames } = storeToRefs(useDashboardStore());
    watchEffect(() => {
      var _a;
      const route = useRoute$1();
      const router = useRouter$1();
      if (((_a = route.query) == null ? void 0 : _a.code) === "USER_NOT_VERIFIED") {
        useToast().toast(
          "error",
          "Correo No Verificado",
          "Tu correo electr\xF3nico no ha sido verificado. Por favor, revisa tu bandeja de entrada."
        );
        router.replace("/");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageLayout = _sfc_main$2$1;
      _push(ssrRenderComponent(_component_PageLayout, _attrs, {
        "app-bar": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$7, null, {
              buttons: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$6, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$6)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$7, null, {
                buttons: withCtx(() => [
                  createVNode(_sfc_main$6)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VContainer, {
              fluid: "",
              class: "pa-0 mx-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$3, {
                                title: "Equipos totales",
                                values: unref(teamStats).registeredTeams,
                                isPositive: unref(teamStats).registeredTeams.current > 0
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$3, {
                                  title: "Equipos totales",
                                  values: unref(teamStats).registeredTeams,
                                  isPositive: unref(teamStats).registeredTeams.current > 0
                                }, null, 8, ["values", "isPositive"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$3, {
                                title: "jugadores activos",
                                values: unref(teamStats).activePlayers,
                                isPositive: unref(teamStats).activePlayers.current > 0
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$3, {
                                  title: "jugadores activos",
                                  values: unref(teamStats).activePlayers,
                                  isPositive: unref(teamStats).activePlayers.current > 0
                                }, null, 8, ["values", "isPositive"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$3, {
                                title: "juegos finalizados",
                                values: unref(teamStats).completedGames,
                                isPositive: unref(teamStats).completedGames.current > 0
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$3, {
                                  title: "juegos finalizados",
                                  values: unref(teamStats).completedGames,
                                  isPositive: unref(teamStats).completedGames.current > 0
                                }, null, 8, ["values", "isPositive"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$3, {
                                title: "Equipos totales",
                                values: unref(teamStats).registeredTeams,
                                isPositive: unref(teamStats).registeredTeams.current > 0
                              }, null, 8, ["values", "isPositive"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$3, {
                                title: "jugadores activos",
                                values: unref(teamStats).activePlayers,
                                isPositive: unref(teamStats).activePlayers.current > 0
                              }, null, 8, ["values", "isPositive"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$3, {
                                title: "juegos finalizados",
                                values: unref(teamStats).completedGames,
                                isPositive: unref(teamStats).completedGames.current > 0
                              }, null, 8, ["values", "isPositive"])
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
                              _push5(`<h2 class="dashboard subtitle"${_scopeId4}>\xDAltimos equipos inscritos</h2>`);
                            } else {
                              return [
                                createVNode("h2", { class: "dashboard subtitle" }, "\xDAltimos equipos inscritos")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, { cols: "12" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$2, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$2)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode("h2", { class: "dashboard subtitle" }, "\xDAltimos equipos inscritos")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$2)
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
                              _push5(`<div class="dashboard subtitle-container"${_scopeId4}><h2 class="dashboard subtitle"${_scopeId4}>Pr\xF3ximos juegos</h2>`);
                              _push5(ssrRenderComponent(VBtn, {
                                variant: "text",
                                to: "/torneos"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Ver todos`);
                                  } else {
                                    return [
                                      createTextVNode("Ver todos")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                              if (unref(nextGames).length === 0) {
                                _push5(`<div class="text-center"${_scopeId4}>`);
                                _push5(ssrRenderComponent(VEmptyState, {
                                  image: "/no-data.svg",
                                  size: "100",
                                  text: "No hay juegos programados",
                                  title: "Pr\xF3ximos juegos"
                                }, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(nextGames), (game) => {
                                  _push5(ssrRenderComponent(_sfc_main$1, {
                                    key: game.id,
                                    game
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              }
                            } else {
                              return [
                                createVNode("div", { class: "dashboard subtitle-container" }, [
                                  createVNode("h2", { class: "dashboard subtitle" }, "Pr\xF3ximos juegos"),
                                  createVNode(VBtn, {
                                    variant: "text",
                                    to: "/torneos"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Ver todos")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                unref(nextGames).length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-center"
                                }, [
                                  createVNode(VEmptyState, {
                                    image: "/no-data.svg",
                                    size: "100",
                                    text: "No hay juegos programados",
                                    title: "Pr\xF3ximos juegos"
                                  })
                                ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(nextGames), (game) => {
                                  return openBlock(), createBlock(_sfc_main$1, {
                                    key: game.id,
                                    game
                                  }, null, 8, ["game"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "dashboard subtitle-container" }, [
                                createVNode("h2", { class: "dashboard subtitle" }, "Pr\xF3ximos juegos"),
                                createVNode(VBtn, {
                                  variant: "text",
                                  to: "/torneos"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Ver todos")
                                  ]),
                                  _: 1
                                })
                              ]),
                              unref(nextGames).length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center"
                              }, [
                                createVNode(VEmptyState, {
                                  image: "/no-data.svg",
                                  size: "100",
                                  text: "No hay juegos programados",
                                  title: "Pr\xF3ximos juegos"
                                })
                              ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(nextGames), (game) => {
                                return openBlock(), createBlock(_sfc_main$1, {
                                  key: game.id,
                                  game
                                }, null, 8, ["game"]);
                              }), 128))
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
                        createVNode(VCol, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$3, {
                              title: "Equipos totales",
                              values: unref(teamStats).registeredTeams,
                              isPositive: unref(teamStats).registeredTeams.current > 0
                            }, null, 8, ["values", "isPositive"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$3, {
                              title: "jugadores activos",
                              values: unref(teamStats).activePlayers,
                              isPositive: unref(teamStats).activePlayers.current > 0
                            }, null, 8, ["values", "isPositive"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$3, {
                              title: "juegos finalizados",
                              values: unref(teamStats).completedGames,
                              isPositive: unref(teamStats).completedGames.current > 0
                            }, null, 8, ["values", "isPositive"])
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
                            createVNode("h2", { class: "dashboard subtitle" }, "\xDAltimos equipos inscritos")
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, { cols: "12" }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$2)
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
                            createVNode("div", { class: "dashboard subtitle-container" }, [
                              createVNode("h2", { class: "dashboard subtitle" }, "Pr\xF3ximos juegos"),
                              createVNode(VBtn, {
                                variant: "text",
                                to: "/torneos"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Ver todos")
                                ]),
                                _: 1
                              })
                            ]),
                            unref(nextGames).length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center"
                            }, [
                              createVNode(VEmptyState, {
                                image: "/no-data.svg",
                                size: "100",
                                text: "No hay juegos programados",
                                title: "Pr\xF3ximos juegos"
                              })
                            ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(nextGames), (game) => {
                              return openBlock(), createBlock(_sfc_main$1, {
                                key: game.id,
                                game
                              }, null, 8, ["game"]);
                            }), 128))
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
              createVNode(VContainer, {
                fluid: "",
                class: "pa-0 mx-0"
              }, {
                default: withCtx(() => [
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$3, {
                            title: "Equipos totales",
                            values: unref(teamStats).registeredTeams,
                            isPositive: unref(teamStats).registeredTeams.current > 0
                          }, null, 8, ["values", "isPositive"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$3, {
                            title: "jugadores activos",
                            values: unref(teamStats).activePlayers,
                            isPositive: unref(teamStats).activePlayers.current > 0
                          }, null, 8, ["values", "isPositive"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$3, {
                            title: "juegos finalizados",
                            values: unref(teamStats).completedGames,
                            isPositive: unref(teamStats).completedGames.current > 0
                          }, null, 8, ["values", "isPositive"])
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
                          createVNode("h2", { class: "dashboard subtitle" }, "\xDAltimos equipos inscritos")
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "12" }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$2)
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
                          createVNode("div", { class: "dashboard subtitle-container" }, [
                            createVNode("h2", { class: "dashboard subtitle" }, "Pr\xF3ximos juegos"),
                            createVNode(VBtn, {
                              variant: "text",
                              to: "/torneos"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Ver todos")
                              ]),
                              _: 1
                            })
                          ]),
                          unref(nextGames).length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center"
                          }, [
                            createVNode(VEmptyState, {
                              image: "/no-data.svg",
                              size: "100",
                              text: "No hay juegos programados",
                              title: "Pr\xF3ximos juegos"
                            })
                          ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(nextGames), (game) => {
                            return openBlock(), createBlock(_sfc_main$1, {
                              key: game.id,
                              game
                            }, null, 8, ["game"]);
                          }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B-RPS3FM.mjs.map
