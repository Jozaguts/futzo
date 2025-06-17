import { defineComponent, ref, computed, unref, mergeProps, withCtx, createVNode, withDirectives, renderSlot, vShow, h, createElementVNode, normalizeStyle, normalizeClass, reactive, watchEffect, resolveDirective, isRef, withModifiers, createBlock, createCommentVNode, openBlock, Fragment, renderList, createTextVNode, toDisplayString, shallowRef, toRef, watch, nextTick, readonly, Transition, onScopeDispose, useSSRContext } from 'vue';
import { h as useRoute$1, g as genericComponent, K as __nuxt_component_0$1, p as propsFactory, L as useDimension, c as useRender, G as useSanctumAuth, B as VListItem, A as VList, H as VDivider, V as VCard, f as VCardItem, a9 as VAvatar, aa as VImg, bb as useSsrBoot, ag as provideTheme, j as useBackgroundColor, b8 as useBorder, b9 as useElevation, k as useRounded, au as useResizeObserver$1, ba as useToggleScope, a5 as convertToUnit, aU as useNuxtApp, W as makeDimensionProps, x as makeComponentProps, as as useRtl, at as useDisplay, c1 as useRouter, O as useProxiedModel, a3 as useScopeId, c4 as useDelay, c2 as toPhysical, P as provideDefaults, aM as VDefaultsProvider, t as makeTagProps, s as makeThemeProps, v as makeRoundedProps, ay as makeElevationProps, az as makeBorderProps, aG as makeDisplayProps, c3 as makeDelayProps } from './server.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './Logo-D65Z66Oc.mjs';
import { _ as __nuxt_component_0$2 } from './index-DkcY5wU8.mjs';
import { a as useResizeObserver } from './index-B5yclgZ6.mjs';
import { k as useGlobalStore, b as useAuthStore, d as useLocationStore, e as useTournamentStore } from './useScheduleStore-DBhAIDF3.mjs';
import { storeToRefs } from 'pinia';
import { c as createLayout, b as useLayout, u as useLayoutItem, a as makeLayoutProps, m as makeLayoutItemProps } from './layout-Bel3IrLG.mjs';
import { V as VBtn } from './VBtn-_od1f1mx.mjs';
import { V as VApp, a as Ve } from './vue-sonner-CaIlIz9M.mjs';
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
import './index-DU0YTrEL.mjs';
import './useToast-m9XhiEp3.mjs';
import '@vue/reactivity';

const makeVFooterProps = propsFactory({
  app: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: "auto"
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "footer"
  }),
  ...makeThemeProps()
}, "VFooter");
const VFooter = genericComponent()({
  name: "VFooter",
  props: makeVFooterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const layoutItemStyles = ref();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const autoHeight = shallowRef(32);
    const {
      resizeRef
    } = useResizeObserver$1();
    const height = computed(() => props.height === "auto" ? autoHeight.value : parseInt(props.height, 10));
    useToggleScope(() => props.app, () => {
      const layout = useLayoutItem({
        id: props.name,
        order: computed(() => parseInt(props.order, 10)),
        position: toRef(() => "bottom"),
        layoutSize: height,
        elementSize: computed(() => props.height === "auto" ? void 0 : height.value),
        active: toRef(() => props.app),
        absolute: toRef(() => props.absolute)
      });
      watchEffect(() => {
        layoutItemStyles.value = layout.layoutItemStyles.value;
      });
    });
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": normalizeClass(["v-footer", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, props.class]),
      "style": normalizeStyle([backgroundColorStyles.value, props.app ? layoutItemStyles.value : {
        height: convertToUnit(props.height)
      }, props.style])
    }, slots));
    return {};
  }
});
const makeVLayoutProps = propsFactory({
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeLayoutProps()
}, "VLayout");
const VLayout = genericComponent()({
  name: "VLayout",
  props: makeVLayoutProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      layoutClasses,
      layoutStyles,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => {
      var _a;
      return createElementVNode("div", {
        "ref": layoutRef,
        "class": normalizeClass([layoutClasses.value, props.class]),
        "style": normalizeStyle([dimensionStyles.value, layoutStyles.value, props.style])
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    });
    return {
      getLayoutItem,
      items
    };
  }
});
const makeVMainProps = propsFactory({
  scrollable: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps({
    tag: "main"
  })
}, "VMain");
const VMain = genericComponent()({
  name: "VMain",
  props: makeVMainProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      mainStyles
    } = useLayout();
    const {
      ssrBootStyles
    } = useSsrBoot();
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-main", {
        "v-main--scrollable": props.scrollable
      }, props.class]),
      "style": normalizeStyle([mainStyles.value, ssrBootStyles.value, dimensionStyles.value, props.style])
    }, {
      default: () => {
        var _a, _b;
        return [props.scrollable ? createElementVNode("div", {
          "class": "v-main__scroller"
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]) : (_b = slots.default) == null ? void 0 : _b.call(slots)];
      }
    }));
    return {};
  }
});
function useSticky(_ref) {
  let {
    isSticky,
    layoutItemStyles
  } = _ref;
  const isStuck = shallowRef(false);
  const stuckPosition = shallowRef(0);
  const stickyStyles = computed(() => {
    const side = typeof isStuck.value === "boolean" ? "top" : isStuck.value;
    return [isSticky.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, isStuck.value ? {
      [side]: convertToUnit(stuckPosition.value)
    } : {
      top: layoutItemStyles.value.top
    }];
  });
  return {
    isStuck,
    stickyStyles
  };
}
function useTouch(_ref) {
  let {
    el,
    width,
    position
  } = _ref;
  computed(() => ["left", "right"].includes(position.value));
  const isDragging = shallowRef(false);
  const dragProgress = shallowRef(0);
  shallowRef(0);
  const dragStyles = computed(() => {
    return isDragging.value ? {
      transform: position.value === "left" ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "right" ? `translateX(calc(100% - ${dragProgress.value * width.value}px))` : position.value === "top" ? `translateY(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "bottom" ? `translateY(calc(100% - ${dragProgress.value * width.value}px))` : oops(),
      transition: "none"
    } : void 0;
  });
  useToggleScope(isDragging, () => {
    var _a2, _b2;
    var _a, _b;
    const transform = (_a2 = (_a = el.value) == null ? void 0 : _a.style.transform) != null ? _a2 : null;
    const transition = (_b2 = (_b = el.value) == null ? void 0 : _b.style.transition) != null ? _b2 : null;
    watchEffect(() => {
      var _a22, _b22, _c, _d;
      (_b22 = el.value) == null ? void 0 : _b22.style.setProperty("transform", ((_a22 = dragStyles.value) == null ? void 0 : _a22.transform) || "none");
      (_d = el.value) == null ? void 0 : _d.style.setProperty("transition", ((_c = dragStyles.value) == null ? void 0 : _c.transition) || null);
    });
    onScopeDispose(() => {
      var _a22, _b22;
      (_a22 = el.value) == null ? void 0 : _a22.style.setProperty("transform", transform);
      (_b22 = el.value) == null ? void 0 : _b22.style.setProperty("transition", transition);
    });
  });
  return {
    isDragging,
    dragProgress,
    dragStyles
  };
}
function oops() {
  throw new Error();
}
const locations = ["start", "end", "left", "right", "top", "bottom"];
const makeVNavigationDrawerProps = propsFactory({
  color: String,
  disableResizeWatcher: Boolean,
  disableRouteWatcher: Boolean,
  expandOnHover: Boolean,
  floating: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  permanent: Boolean,
  rail: {
    type: Boolean,
    default: null
  },
  railWidth: {
    type: [Number, String],
    default: 56
  },
  scrim: {
    type: [Boolean, String],
    default: true
  },
  image: String,
  temporary: Boolean,
  persistent: Boolean,
  touchless: Boolean,
  width: {
    type: [Number, String],
    default: 256
  },
  location: {
    type: String,
    default: "start",
    validator: (value) => locations.includes(value)
  },
  sticky: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDelayProps(),
  ...makeDisplayProps({
    mobile: null
  }),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "nav"
  }),
  ...makeThemeProps()
}, "VNavigationDrawer");
const VNavigationDrawer = genericComponent()({
  name: "VNavigationDrawer",
  props: makeVNavigationDrawerProps(),
  emits: {
    "update:modelValue": (val) => true,
    "update:rail": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const {
      roundedClasses
    } = useRounded(props);
    const router = useRouter();
    const isActive = useProxiedModel(props, "modelValue", null, (v) => !!v);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      scopeId
    } = useScopeId();
    const rootEl = ref();
    const isHovering = shallowRef(false);
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay(props, (value) => {
      isHovering.value = value;
    });
    const width = computed(() => {
      return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
    });
    const location = computed(() => {
      return toPhysical(props.location, isRtl.value);
    });
    const isPersistent = toRef(() => props.persistent);
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
    const isSticky = computed(() => props.sticky && !isTemporary.value && location.value !== "bottom");
    useToggleScope(() => props.expandOnHover && props.rail != null, () => {
      watch(isHovering, (val) => emit("update:rail", !val));
    });
    useToggleScope(() => !props.disableResizeWatcher, () => {
      watch(isTemporary, (val) => !props.permanent && nextTick(() => isActive.value = !val));
    });
    useToggleScope(() => !props.disableRouteWatcher && !!router, () => {
      watch(router.currentRoute, () => isTemporary.value && (isActive.value = false));
    });
    watch(() => props.permanent, (val) => {
      if (val) isActive.value = true;
    });
    if (props.modelValue == null && !isTemporary.value) {
      isActive.value = props.permanent || !mobile.value;
    }
    const {
      isDragging,
      dragProgress
    } = useTouch({
      el: rootEl,
      width,
      touchless: toRef(() => props.touchless),
      position: location
    });
    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
      return isDragging.value ? size * dragProgress.value : size;
    });
    const {
      layoutItemStyles,
      layoutItemScrimStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location,
      layoutSize,
      elementSize: width,
      active: readonly(isActive),
      disableTransitions: toRef(() => isDragging.value),
      absolute: computed(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        props.absolute || isSticky.value && typeof isStuck.value !== "string"
      ))
    });
    const {
      isStuck,
      stickyStyles
    } = useSticky({
      isSticky,
      layoutItemStyles
    });
    const scrimColor = useBackgroundColor(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    });
    const scrimStyles = computed(() => ({
      ...isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: "none"
      } : void 0,
      ...layoutItemScrimStyles.value
    }));
    provideDefaults({
      VList: {
        bgColor: "transparent"
      }
    });
    useRender(() => {
      const hasImage = slots.image || props.image;
      return createElementVNode(Fragment, null, [createVNode(props.tag, mergeProps({
        "ref": rootEl,
        "onMouseenter": runOpenDelay,
        "onMouseleave": runCloseDelay,
        "class": ["v-navigation-drawer", `v-navigation-drawer--${location.value}`, {
          "v-navigation-drawer--expand-on-hover": props.expandOnHover,
          "v-navigation-drawer--floating": props.floating,
          "v-navigation-drawer--is-hovering": isHovering.value,
          "v-navigation-drawer--rail": props.rail,
          "v-navigation-drawer--temporary": isTemporary.value,
          "v-navigation-drawer--persistent": isPersistent.value,
          "v-navigation-drawer--active": isActive.value,
          "v-navigation-drawer--sticky": isSticky.value
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, displayClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, ssrBootStyles.value, stickyStyles.value, props.style]
      }, scopeId, attrs), {
        default: () => {
          var _a, _b, _c;
          return [hasImage && createElementVNode("div", {
            "key": "image",
            "class": "v-navigation-drawer__img"
          }, [!slots.image ? createVNode(VImg, {
            "key": "image-img",
            "alt": "",
            "cover": true,
            "height": "inherit",
            "src": props.image
          }, null) : createVNode(VDefaultsProvider, {
            "key": "image-defaults",
            "disabled": !props.image,
            "defaults": {
              VImg: {
                alt: "",
                cover: true,
                height: "inherit",
                src: props.image
              }
            }
          }, slots.image)]), slots.prepend && createElementVNode("div", {
            "class": "v-navigation-drawer__prepend"
          }, [(_a = slots.prepend) == null ? void 0 : _a.call(slots)]), createElementVNode("div", {
            "class": "v-navigation-drawer__content"
          }, [(_b = slots.default) == null ? void 0 : _b.call(slots)]), slots.append && createElementVNode("div", {
            "class": "v-navigation-drawer__append"
          }, [(_c = slots.append) == null ? void 0 : _c.call(slots)])];
        }
      }), createVNode(Transition, {
        "name": "fade-transition"
      }, {
        default: () => [isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && createElementVNode("div", mergeProps({
          "class": ["v-navigation-drawer__scrim", scrimColor.backgroundColorClasses.value],
          "style": [scrimStyles.value, scrimColor.backgroundColorStyles.value],
          "onClick": () => {
            if (isPersistent.value) return;
            isActive.value = false;
          }
        }, scopeId), null)]
      })]);
    });
    return {
      isStuck
    };
  }
});
function defaultEstimatedProgress(duration, elapsed) {
  const completionPercentage = elapsed / duration * 100;
  return 2 / Math.PI * 100 * Math.atan(completionPercentage / 50);
}
function createLoadingIndicator(opts = {}) {
  const { duration = 2e3, throttle = 200, hideDelay = 500, resetDelay = 400 } = opts;
  opts.estimatedProgress || defaultEstimatedProgress;
  const nuxtApp = useNuxtApp();
  const progress = shallowRef(0);
  const isLoading = shallowRef(false);
  const error = shallowRef(false);
  const start = (opts2 = {}) => {
    error.value = false;
    set(0, opts2);
  };
  function set(at = 0, opts2 = {}) {
    if (nuxtApp.isHydrating) {
      return;
    }
    if (at >= 100) {
      return finish({ force: opts2.force });
    }
    progress.value = at < 0 ? 0 : at;
    opts2.force ? 0 : throttle;
    {
      isLoading.value = true;
    }
  }
  function finish(opts2 = {}) {
    progress.value = 100;
    if (opts2.error) {
      error.value = true;
    }
    if (opts2.force) {
      progress.value = 0;
      isLoading.value = false;
    }
  }
  function clear() {
  }
  let _cleanup = () => {
  };
  return {
    _cleanup,
    progress: computed(() => progress.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    start,
    set,
    finish,
    clear
  };
}
function useLoadingIndicator(opts = {}) {
  const nuxtApp = useNuxtApp();
  const indicator = nuxtApp._loadingIndicator || (nuxtApp._loadingIndicator = createLoadingIndicator(opts));
  return indicator;
}
const __nuxt_component_0 = defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    hideDelay: {
      type: Number,
      default: 500
    },
    resetDelay: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: [String, Boolean],
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    },
    errorColor: {
      type: String,
      default: "repeating-linear-gradient(to right,#f87171 0%,#ef4444 100%)"
    },
    estimatedProgress: {
      type: Function,
      required: false
    }
  },
  setup(props, { slots, expose }) {
    const { progress, isLoading, error, start, finish, clear } = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle,
      hideDelay: props.hideDelay,
      resetDelay: props.resetDelay,
      estimatedProgress: props.estimatedProgress
    });
    expose({
      progress,
      isLoading,
      error,
      start,
      finish,
      clear
    });
    return () => h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: "auto",
        height: `${props.height}px`,
        opacity: isLoading.value ? 1 : 0,
        background: error.value ? props.errorColor : props.color || void 0,
        backgroundSize: `${100 / progress.value * 100}% auto`,
        transform: `scaleX(${progress.value}%)`,
        transformOrigin: "left",
        transition: "transform 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "navigation-drawer",
  __ssrInlineRender: true,
  setup(__props) {
    const { drawer, drawerWidth, isMobile, rail } = storeToRefs(useGlobalStore());
    const drawerRef = ref();
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);
    const disabled = ref(false);
    useLocationStore().$subscribe((mutation, state) => {
      var _a;
      disabled.value = ((_a = state.locations) == null ? void 0 : _a.length) === 0;
    });
    const links = reactive([
      { icon: "futzo-icon:home", title: "Dashboard", to: "/", disabled: false, class: "mr-2 drawer-icon filled" },
      {
        icon: "futzo-icon:location",
        title: "Ubicaciones",
        to: "/ubicaciones",
        disabled: false,
        class: "mr-2 drawer-icon"
      },
      {
        icon: "futzo-icon:trophy",
        title: "Torneos",
        to: "/torneos",
        disabled: disabled.value,
        class: "mr-2 drawer-icon filled"
      },
      {
        icon: "futzo-icon:shirt-sharp",
        title: "Equipos",
        to: "/equipos",
        disabled: disabled.value,
        class: "mr-2 drawer-icon filled"
      },
      {
        icon: "futzo-icon:players",
        title: "Jugadores",
        to: "/jugadores",
        disabled: disabled.value,
        class: "mr-2 drawer-icon filled"
      }
    ]);
    const { logout } = useSanctumAuth();
    useResizeObserver(drawerRef, (entries) => {
      const entry = entries[0];
      const { width } = entry.contentRect;
      drawerWidth.value = width;
    });
    watchEffect(() => {
      rail.value = isMobile.value;
    });
    const logOut = async () => {
      try {
        await logout();
        useTournamentStore().$reset();
        useLocationStore().$reset();
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Logo = _sfc_main$2;
      const _component_Icon = __nuxt_component_0$2;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(ssrRenderComponent(VNavigationDrawer, mergeProps({
        permanent: "",
        modelValue: unref(drawer),
        "onUpdate:modelValue": ($event) => isRef(drawer) ? drawer.value = $event : null,
        rail: unref(rail),
        "rail-width": "56",
        onClick: ($event) => rail.value = false,
        app: ""
      }, _attrs), {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            if (!unref(rail)) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(VList, {
                density: "compact",
                nav: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VListItem, {
                      density: "compact",
                      key: "configuration",
                      link: "",
                      to: "/configuracion",
                      disabled: false,
                      title: "Configuraci\xF3n"
                    }, {
                      prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Icon, {
                            name: "futzo-icon:settings-01",
                            class: "mr-2"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Icon, {
                              name: "futzo-icon:settings-01",
                              class: "mr-2"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VListItem, {
                        density: "compact",
                        key: "configuration",
                        link: "",
                        to: "/configuracion",
                        disabled: false,
                        title: "Configuraci\xF3n"
                      }, {
                        prepend: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "futzo-icon:settings-01",
                            class: "mr-2"
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDivider, null, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(VCard, {
                loading: !((_a = unref(user)) == null ? void 0 : _a.name)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCardItem, null, {
                      prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAvatar, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              var _a2, _b2;
                              if (_push5) {
                                _push5(ssrRenderComponent(VImg, {
                                  src: (_a2 = unref(user)) == null ? void 0 : _a2.image
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VImg, {
                                    src: (_b2 = unref(user)) == null ? void 0 : _b2.image
                                  }, null, 8, ["src"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAvatar, null, {
                              default: withCtx(() => {
                                var _a2;
                                return [
                                  createVNode(VImg, {
                                    src: (_a2 = unref(user)) == null ? void 0 : _a2.image
                                  }, null, 8, ["src"])
                                ];
                              }),
                              _: 1
                            })
                          ];
                        }
                      }),
                      title: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a2, _b2;
                        if (_push4) {
                          _push4(`<small${_scopeId3}>${ssrInterpolate((_a2 = unref(user)) == null ? void 0 : _a2.name)}</small>`);
                        } else {
                          return [
                            createVNode("small", null, toDisplayString((_b2 = unref(user)) == null ? void 0 : _b2.name), 1)
                          ];
                        }
                      }),
                      subtitle: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a2, _b2;
                        if (_push4) {
                          _push4(`${ssrInterpolate((_a2 = unref(user)) == null ? void 0 : _a2.email)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString((_b2 = unref(user)) == null ? void 0 : _b2.email), 1)
                          ];
                        }
                      }),
                      append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VBtn, {
                            onClick: logOut,
                            variant: "text",
                            size: "24"
                          }, {
                            prepend: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Icon, { name: "futzo-icon:logout" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Icon, { name: "futzo-icon:logout" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VBtn, {
                              onClick: logOut,
                              variant: "text",
                              size: "24"
                            }, {
                              prepend: withCtx(() => [
                                createVNode(_component_Icon, { name: "futzo-icon:logout" })
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
                      createVNode(VCardItem, null, {
                        prepend: withCtx(() => [
                          createVNode(VAvatar, null, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createVNode(VImg, {
                                  src: (_a2 = unref(user)) == null ? void 0 : _a2.image
                                }, null, 8, ["src"])
                              ];
                            }),
                            _: 1
                          })
                        ]),
                        title: withCtx(() => {
                          var _a2;
                          return [
                            createVNode("small", null, toDisplayString((_a2 = unref(user)) == null ? void 0 : _a2.name), 1)
                          ];
                        }),
                        subtitle: withCtx(() => {
                          var _a2;
                          return [
                            createTextVNode(toDisplayString((_a2 = unref(user)) == null ? void 0 : _a2.email), 1)
                          ];
                        }),
                        append: withCtx(() => [
                          createVNode(VBtn, {
                            onClick: logOut,
                            variant: "text",
                            size: "24"
                          }, {
                            prepend: withCtx(() => [
                              createVNode(_component_Icon, { name: "futzo-icon:logout" })
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
              _push2(`</div>`);
            } else {
              _push2(`<div class="text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(VList, {
                density: "compact",
                nav: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VListItem, {
                      density: "compact",
                      key: "configuration",
                      link: "",
                      to: "/configuracion",
                      disabled: false,
                      title: "Configuraci\xF3n"
                    }, {
                      prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Icon, {
                            name: "futzo-icon:settings-01",
                            class: "mr-2"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Icon, {
                              name: "futzo-icon:settings-01",
                              class: "mr-2"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VListItem, {
                        density: "compact",
                        key: "configuration",
                        link: "",
                        to: "/configuracion",
                        disabled: false,
                        title: "Configuraci\xF3n"
                      }, {
                        prepend: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "futzo-icon:settings-01",
                            class: "mr-2"
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDivider, null, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(VBtn, {
                onClick: logOut,
                variant: "text"
              }, {
                prepend: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "futzo-icon:logout",
                      class: "mr-2"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        name: "futzo-icon:logout",
                        class: "mr-2"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
          } else {
            return [
              !unref(rail) ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode(VList, {
                  density: "compact",
                  nav: ""
                }, {
                  default: withCtx(() => [
                    createVNode(VListItem, {
                      density: "compact",
                      key: "configuration",
                      link: "",
                      to: "/configuracion",
                      disabled: false,
                      title: "Configuraci\xF3n"
                    }, {
                      prepend: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "futzo-icon:settings-01",
                          class: "mr-2"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VDivider),
                createVNode(VCard, {
                  loading: !((_b = unref(user)) == null ? void 0 : _b.name)
                }, {
                  default: withCtx(() => [
                    createVNode(VCardItem, null, {
                      prepend: withCtx(() => [
                        createVNode(VAvatar, null, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createVNode(VImg, {
                                src: (_a2 = unref(user)) == null ? void 0 : _a2.image
                              }, null, 8, ["src"])
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      title: withCtx(() => {
                        var _a2;
                        return [
                          createVNode("small", null, toDisplayString((_a2 = unref(user)) == null ? void 0 : _a2.name), 1)
                        ];
                      }),
                      subtitle: withCtx(() => {
                        var _a2;
                        return [
                          createTextVNode(toDisplayString((_a2 = unref(user)) == null ? void 0 : _a2.email), 1)
                        ];
                      }),
                      append: withCtx(() => [
                        createVNode(VBtn, {
                          onClick: logOut,
                          variant: "text",
                          size: "24"
                        }, {
                          prepend: withCtx(() => [
                            createVNode(_component_Icon, { name: "futzo-icon:logout" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "text-center"
              }, [
                createVNode(VList, {
                  density: "compact",
                  nav: ""
                }, {
                  default: withCtx(() => [
                    createVNode(VListItem, {
                      density: "compact",
                      key: "configuration",
                      link: "",
                      to: "/configuracion",
                      disabled: false,
                      title: "Configuraci\xF3n"
                    }, {
                      prepend: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "futzo-icon:settings-01",
                          class: "mr-2"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VDivider),
                createVNode(VBtn, {
                  onClick: logOut,
                  variant: "text"
                }, {
                  prepend: withCtx(() => [
                    createVNode(_component_Icon, {
                      name: "futzo-icon:logout",
                      class: "mr-2"
                    })
                  ]),
                  _: 1
                })
              ]))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VListItem, {
              nav: "",
              ref_key: "drawerRef",
              ref: drawerRef
            }, {
              prepend: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(rail)) {
                    _push3(ssrRenderComponent(VBtn, {
                      variant: "text",
                      icon: "mdi-menu",
                      onClick: ($event) => rail.value = !unref(rail)
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(rail) ? (openBlock(), createBlock(VBtn, {
                      key: 0,
                      variant: "text",
                      icon: "mdi-menu",
                      onClick: withModifiers(($event) => rail.value = !unref(rail), ["stop"])
                    }, null, 8, ["onClick"])) : createCommentVNode("", true)
                  ];
                }
              }),
              append: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    icon: "mdi-chevron-left",
                    variant: "text",
                    onClick: ($event) => rail.value = !unref(rail)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      icon: "mdi-chevron-left",
                      variant: "text",
                      onClick: withModifiers(($event) => rail.value = !unref(rail), ["stop"])
                    }, null, 8, ["onClick"])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Logo, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Logo)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VList, {
              density: "compact",
              nav: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(links), (link) => {
                    _push3(ssrRenderComponent(VListItem, {
                      density: "compact",
                      key: link.title,
                      link: "",
                      to: link.to,
                      disabled: unref(disabled) && link.title !== "Dashboard" && link.title !== "Ubicaciones",
                      title: link.title
                    }, {
                      prepend: withCtx(({ isActive }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Icon, {
                            name: link.icon,
                            class: link.class,
                            mode: "svg"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Icon, {
                              name: link.icon,
                              class: link.class,
                              mode: "svg"
                            }, null, 8, ["name", "class"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--><div${ssrRenderAttrs(mergeProps({ class: "ma-2" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })))}${_scopeId2}>`);
                  if (unref(disabled)) {
                    _push3(`<p class="text-caption font-weight-light"${_scopeId2}> Crea tu primera ubicaci\xF3n </p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(disabled)) {
                    _push3(`<p class="text-caption font-weight-light"${_scopeId2}> Comienza registrando una sede y su campo/s desde el m\xF3dulo \u201CUbicaciones\u201D. </p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(links), (link) => {
                      return openBlock(), createBlock(VListItem, {
                        density: "compact",
                        key: link.title,
                        link: "",
                        to: link.to,
                        disabled: unref(disabled) && link.title !== "Dashboard" && link.title !== "Ubicaciones",
                        title: link.title
                      }, {
                        prepend: withCtx(({ isActive }) => [
                          createVNode(_component_Icon, {
                            name: link.icon,
                            class: link.class,
                            mode: "svg"
                          }, null, 8, ["name", "class"])
                        ]),
                        _: 2
                      }, 1032, ["to", "disabled", "title"]);
                    }), 128)),
                    withDirectives((openBlock(), createBlock("div", { class: "ma-2" }, [
                      unref(disabled) ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-caption font-weight-light"
                      }, " Crea tu primera ubicaci\xF3n ")) : createCommentVNode("", true),
                      unref(disabled) ? (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-caption font-weight-light"
                      }, " Comienza registrando una sede y su campo/s desde el m\xF3dulo \u201CUbicaciones\u201D. ")) : createCommentVNode("", true)
                    ])), [
                      [_directive_auto_animate, { duration: 100 }]
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VListItem, {
                nav: "",
                ref_key: "drawerRef",
                ref: drawerRef
              }, {
                prepend: withCtx(() => [
                  unref(rail) ? (openBlock(), createBlock(VBtn, {
                    key: 0,
                    variant: "text",
                    icon: "mdi-menu",
                    onClick: withModifiers(($event) => rail.value = !unref(rail), ["stop"])
                  }, null, 8, ["onClick"])) : createCommentVNode("", true)
                ]),
                append: withCtx(() => [
                  createVNode(VBtn, {
                    icon: "mdi-chevron-left",
                    variant: "text",
                    onClick: withModifiers(($event) => rail.value = !unref(rail), ["stop"])
                  }, null, 8, ["onClick"])
                ]),
                default: withCtx(() => [
                  createVNode(_component_Logo)
                ]),
                _: 1
              }, 512),
              createVNode(VList, {
                density: "compact",
                nav: ""
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(links), (link) => {
                    return openBlock(), createBlock(VListItem, {
                      density: "compact",
                      key: link.title,
                      link: "",
                      to: link.to,
                      disabled: unref(disabled) && link.title !== "Dashboard" && link.title !== "Ubicaciones",
                      title: link.title
                    }, {
                      prepend: withCtx(({ isActive }) => [
                        createVNode(_component_Icon, {
                          name: link.icon,
                          class: link.class,
                          mode: "svg"
                        }, null, 8, ["name", "class"])
                      ]),
                      _: 2
                    }, 1032, ["to", "disabled", "title"]);
                  }), 128)),
                  withDirectives((openBlock(), createBlock("div", { class: "ma-2" }, [
                    unref(disabled) ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-caption font-weight-light"
                    }, " Crea tu primera ubicaci\xF3n ")) : createCommentVNode("", true),
                    unref(disabled) ? (openBlock(), createBlock("p", {
                      key: 1,
                      class: "text-caption font-weight-light"
                    }, " Comienza registrando una sede y su campo/s desde el m\xF3dulo \u201CUbicaciones\u201D. ")) : createCommentVNode("", true)
                  ])), [
                    [_directive_auto_animate, { duration: 100 }]
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/navigation-drawer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const show = ref(false);
    const { rail } = storeToRefs(useGlobalStore());
    const paddingLeft = computed(() => {
      return rail.value ? "56px" : "256px";
    });
    computed(() => {
      return useRoute$1().name !== "configuracion";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLoadingIndicator = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_0$1;
      const _cssVars = { style: {
        "--e9e921b0": unref(paddingLeft)
      } };
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_NuxtLoadingIndicator, mergeProps({
        color: "#9155FD",
        height: 6
      }, _cssVars), null, _parent));
      _push(`<div${ssrRenderAttrs(_cssVars)}>`);
      _push(ssrRenderComponent(VLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VApp, { app: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ClientOnly, null, {}, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ClientOnly, null, {}, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_ClientOnly, null, {
                      default: withCtx(() => [
                        createVNode(unref(Ve), {
                          position: "top-right",
                          offset: "80px",
                          duration: 3e3
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ClientOnly, null, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$1),
                        withDirectives(createVNode(VMain, {
                          class: "v-main",
                          app: ""
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "default")
                          ]),
                          _: 3
                        }, 512), [
                          [vShow, unref(show)]
                        ]),
                        createVNode(VFooter, {
                          color: "white",
                          app: "",
                          class: "d-flex justify-start align-center",
                          height: "64px"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "caption ml-4" }, "\xA9 2021 Futzo")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 3
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VApp, { app: "" }, {
                default: withCtx(() => [
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(unref(Ve), {
                        position: "top-right",
                        offset: "80px",
                        duration: 3e3
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$1),
                      withDirectives(createVNode(VMain, {
                        class: "v-main",
                        app: ""
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "default")
                        ]),
                        _: 3
                      }, 512), [
                        [vShow, unref(show)]
                      ]),
                      createVNode(VFooter, {
                        color: "white",
                        app: "",
                        class: "d-flex justify-start align-center",
                        height: "64px"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "caption ml-4" }, "\xA9 2021 Futzo")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-D6M3IdL-.mjs.map
