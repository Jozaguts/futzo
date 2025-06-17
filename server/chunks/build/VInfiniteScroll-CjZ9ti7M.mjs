import { ref, shallowRef, computed, createVNode, normalizeStyle, normalizeClass, createElementVNode, watch, createTextVNode, nextTick } from 'vue';
import { g as genericComponent, p as propsFactory, a5 as convertToUnit, l as useLocale, L as useDimension, c as useRender, b6 as defineComponent, t as makeTagProps, W as makeDimensionProps, b7 as useIntersectionObserver } from './server.mjs';
import { a as VProgressCircular, V as VBtn } from './VBtn-_od1f1mx.mjs';

const makeVInfiniteScrollProps = propsFactory({
  color: String,
  direction: {
    type: String,
    default: "vertical",
    validator: (v) => ["vertical", "horizontal"].includes(v)
  },
  side: {
    type: String,
    default: "end",
    validator: (v) => ["start", "end", "both"].includes(v)
  },
  mode: {
    type: String,
    default: "intersect",
    validator: (v) => ["intersect", "manual"].includes(v)
  },
  margin: [Number, String],
  loadMoreText: {
    type: String,
    default: "$vuetify.infiniteScroll.loadMore"
  },
  emptyText: {
    type: String,
    default: "$vuetify.infiniteScroll.empty"
  },
  ...makeDimensionProps(),
  ...makeTagProps()
}, "VInfiniteScroll");
const VInfiniteScrollIntersect = defineComponent({
  name: "VInfiniteScrollIntersect",
  props: {
    side: {
      type: String,
      required: true
    },
    rootMargin: String
  },
  emits: {
    intersect: (side, isIntersecting) => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    watch(isIntersecting, async (val) => {
      emit("intersect", props.side, val);
    });
    useRender(() => createElementVNode("div", {
      "class": "v-infinite-scroll-intersect",
      "style": {
        "--v-infinite-margin-size": props.rootMargin
      },
      "ref": intersectionRef
    }, [createTextVNode("\xA0")]));
    return {};
  }
});
const VInfiniteScroll = genericComponent()({
  name: "VInfiniteScroll",
  props: makeVInfiniteScrollProps(),
  emits: {
    load: (options) => true
  },
  setup(props, _ref2) {
    let {
      slots,
      emit
    } = _ref2;
    const rootEl = ref();
    const startStatus = shallowRef("ok");
    const endStatus = shallowRef("ok");
    const margin = computed(() => convertToUnit(props.margin));
    const isIntersecting = shallowRef(false);
    function setScrollAmount(amount) {
      if (!rootEl.value) return;
      const property = props.direction === "vertical" ? "scrollTop" : "scrollLeft";
      rootEl.value[property] = amount;
    }
    function getScrollAmount() {
      if (!rootEl.value) return 0;
      const property = props.direction === "vertical" ? "scrollTop" : "scrollLeft";
      return rootEl.value[property];
    }
    function getScrollSize() {
      if (!rootEl.value) return 0;
      const property = props.direction === "vertical" ? "scrollHeight" : "scrollWidth";
      return rootEl.value[property];
    }
    function setStatus(side, status) {
      if (side === "start") {
        startStatus.value = status;
      } else if (side === "end") {
        endStatus.value = status;
      }
    }
    function getStatus(side) {
      return side === "start" ? startStatus.value : endStatus.value;
    }
    let previousScrollSize = 0;
    function handleIntersect(side, _isIntersecting) {
      isIntersecting.value = _isIntersecting;
      if (isIntersecting.value) {
        intersecting(side);
      }
    }
    function intersecting(side) {
      if (props.mode !== "manual" && !isIntersecting.value) return;
      const status = getStatus(side);
      if (!rootEl.value || ["empty", "loading"].includes(status)) return;
      previousScrollSize = getScrollSize();
      setStatus(side, "loading");
      function done(status2) {
        setStatus(side, status2);
        nextTick(() => {
          if (status2 === "empty" || status2 === "error") return;
          if (status2 === "ok" && side === "start") {
            setScrollAmount(getScrollSize() - previousScrollSize + getScrollAmount());
          }
          if (props.mode !== "manual") {
            nextTick(() => {
              (void 0).requestAnimationFrame(() => {
                (void 0).requestAnimationFrame(() => {
                  (void 0).requestAnimationFrame(() => {
                    intersecting(side);
                  });
                });
              });
            });
          }
        });
      }
      emit("load", {
        side,
        done
      });
    }
    const {
      t
    } = useLocale();
    function renderSide(side, status) {
      var _a2, _b2, _c2, _d2;
      var _a, _b, _c, _d, _e;
      if (props.side !== side && props.side !== "both") return;
      const onClick = () => intersecting(side);
      const slotProps = {
        side,
        props: {
          onClick,
          color: props.color
        }
      };
      if (status === "error") return (_a = slots.error) == null ? void 0 : _a.call(slots, slotProps);
      if (status === "empty") return (_a2 = (_b = slots.empty) == null ? void 0 : _b.call(slots, slotProps)) != null ? _a2 : createElementVNode("div", null, [t(props.emptyText)]);
      if (props.mode === "manual") {
        if (status === "loading") {
          return (_b2 = (_c = slots.loading) == null ? void 0 : _c.call(slots, slotProps)) != null ? _b2 : createVNode(VProgressCircular, {
            "indeterminate": true,
            "color": props.color
          }, null);
        }
        return (_c2 = (_d = slots["load-more"]) == null ? void 0 : _d.call(slots, slotProps)) != null ? _c2 : createVNode(VBtn, {
          "variant": "outlined",
          "color": props.color,
          "onClick": onClick
        }, {
          default: () => [t(props.loadMoreText)]
        });
      }
      return (_d2 = (_e = slots.loading) == null ? void 0 : _e.call(slots, slotProps)) != null ? _d2 : createVNode(VProgressCircular, {
        "indeterminate": true,
        "color": props.color
      }, null);
    }
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => {
      const Tag = props.tag;
      const hasStartIntersect = props.side === "start" || props.side === "both";
      const hasEndIntersect = props.side === "end" || props.side === "both";
      const intersectMode = props.mode === "intersect";
      return createVNode(Tag, {
        "ref": rootEl,
        "class": normalizeClass(["v-infinite-scroll", `v-infinite-scroll--${props.direction}`, {
          "v-infinite-scroll--start": hasStartIntersect,
          "v-infinite-scroll--end": hasEndIntersect
        }]),
        "style": normalizeStyle(dimensionStyles.value)
      }, {
        default: () => {
          var _a;
          return [createElementVNode("div", {
            "class": "v-infinite-scroll__side"
          }, [renderSide("start", startStatus.value)]), hasStartIntersect && intersectMode && createVNode(VInfiniteScrollIntersect, {
            "key": "start",
            "side": "start",
            "onIntersect": handleIntersect,
            "rootMargin": margin.value
          }, null), (_a = slots.default) == null ? void 0 : _a.call(slots), hasEndIntersect && intersectMode && createVNode(VInfiniteScrollIntersect, {
            "key": "end",
            "side": "end",
            "onIntersect": handleIntersect,
            "rootMargin": margin.value
          }, null), createElementVNode("div", {
            "class": "v-infinite-scroll__side"
          }, [renderSide("end", endStatus.value)])];
        }
      });
    });
  }
});

export { VInfiniteScroll as V };
//# sourceMappingURL=VInfiniteScroll-CjZ9ti7M.mjs.map
