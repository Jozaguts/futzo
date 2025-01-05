import { createVNode, toRef, ref, shallowRef, computed, watch, Fragment, mergeProps, Transition, defineComponent, h, useSSRContext, unref, withCtx, withDirectives, renderSlot, vShow, watchEffect, onScopeDispose, nextTick, reactive, isRef, toDisplayString, createTextVNode, openBlock, createBlock, withModifiers, createCommentVNode, renderList, getCurrentInstance } from 'vue';
import { p as propsFactory, m as makeComponentProps, aK as makeDimensionProps, q as genericComponent, aL as useDimension, w as useRender, n as makeTagProps, A as useSsrBoot, bg as makeBorderProps, bO as makeDelayProps, bk as makeDisplayProps, a9 as makeElevationProps, a8 as makeRoundedProps, o as makeThemeProps, s as useRtl, r as provideTheme, bB as useBorder, N as useBackgroundColor, ad as useElevation, b0 as useDisplay, ag as useRounded, bP as useRouter, I as useProxiedModel, O as useScopeId, bQ as toPhysical, bE as useToggleScope, P as provideDefaults, U as VImg, aM as VDefaultsProvider, g as useGlobalStore, aD as useRoute$1, C as convertToUnit, bR as useDelay, b7 as useNuxtApp, S as useAuthStore, h as useSanctumAuth, aY as VList, ay as VListItem, av as VDivider, V as VCard, b as VCardItem, T as VAvatar, _ as __nuxt_component_0$1 } from './server.mjs';
import { _ as __nuxt_component_1 } from './client-only-Db1Q_2tj.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './Logo-DOXQxoe9.mjs';
import { t as toValue, a as tryOnScopeDispose } from './index-93-MdpO_.mjs';
import { storeToRefs } from 'pinia';
import { a as makeLayoutProps, c as createLayout, b as useLayout, m as makeLayoutItemProps, u as useLayoutItem } from './layout-DtoiCxLB.mjs';
import { V as VBtn } from './VBtn-DMHWn55H.mjs';
import { V as VApp, b as Ve, a as VFooter } from './vue-sonner-CcKySnW0.mjs';
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
      return createVNode("div", {
        "ref": layoutRef,
        "class": [layoutClasses.value, props.class],
        "style": [dimensionStyles.value, layoutStyles.value, props.style]
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
      "class": ["v-main", {
        "v-main--scrollable": props.scrollable
      }, props.class],
      "style": [mainStyles.value, ssrBootStyles.value, dimensionStyles.value, props.style]
    }, {
      default: () => {
        var _a, _b;
        return [props.scrollable ? createVNode("div", {
          "class": "v-main__scroller"
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]) : (_b = slots.default) == null ? void 0 : _b.call(slots)];
      }
    }));
    return {};
  }
});
function useSticky(_ref) {
  let {
    rootEl,
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
    isActive,
    isTemporary,
    width,
    touchless,
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
    } = useBackgroundColor(toRef(props, "color"));
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
    const isPersistent = computed(() => props.persistent);
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
      isActive,
      isTemporary,
      width,
      touchless: toRef(props, "touchless"),
      position: location
    });
    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
      return isDragging.value ? size * dragProgress.value : size;
    });
    const elementSize = computed(() => ["top", "bottom"].includes(props.location) ? 0 : width.value);
    const {
      layoutItemStyles,
      layoutItemScrimStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location,
      layoutSize,
      elementSize,
      active: computed(() => isActive.value || isDragging.value),
      disableTransitions: computed(() => isDragging.value),
      absolute: computed(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        props.absolute || isSticky.value && typeof isStuck.value !== "string"
      ))
    });
    const {
      isStuck,
      stickyStyles
    } = useSticky({
      rootEl,
      isSticky,
      layoutItemStyles
    });
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    }));
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
      return createVNode(Fragment, null, [createVNode(props.tag, mergeProps({
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
        "style": [backgroundColorStyles.value, layoutItemStyles.value, ssrBootStyles.value, stickyStyles.value, props.style, ["top", "bottom"].includes(location.value) ? {
          height: "auto"
        } : {}]
      }, scopeId, attrs), {
        default: () => {
          var _a, _b, _c;
          return [hasImage && createVNode("div", {
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
          }, slots.image)]), slots.prepend && createVNode("div", {
            "class": "v-navigation-drawer__prepend"
          }, [(_a = slots.prepend) == null ? void 0 : _a.call(slots)]), createVNode("div", {
            "class": "v-navigation-drawer__content"
          }, [(_b = slots.default) == null ? void 0 : _b.call(slots)]), slots.append && createVNode("div", {
            "class": "v-navigation-drawer__append"
          }, [(_c = slots.append) == null ? void 0 : _c.call(slots)])];
        }
      }), createVNode(Transition, {
        "name": "fade-transition"
      }, {
        default: () => [isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && createVNode("div", mergeProps({
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
const defaultWindow = void 0;
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function useMounted() {
  const isMounted = ref(false);
  getCurrentInstance();
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useResizeObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...observerOptions } = options;
  let observer;
  const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed(() => {
    const _targets = toValue(target);
    return Array.isArray(_targets) ? _targets.map((el) => unrefElement(el)) : [unrefElement(_targets)];
  });
  const stopWatch = watch(
    targets,
    (els) => {
      cleanup();
      if (isSupported.value && window2) {
        observer = new ResizeObserver(callback);
        for (const _el of els) {
          if (_el)
            observer.observe(_el, observerOptions);
        }
      }
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}
function defaultEstimatedProgress(duration, elapsed) {
  const completionPercentage = elapsed / duration * 100;
  return 2 / Math.PI * 100 * Math.atan(completionPercentage / 50);
}
function createLoadingIndicator(opts = {}) {
  const { duration = 2e3, throttle = 200, hideDelay = 500, resetDelay = 400 } = opts;
  opts.estimatedProgress || defaultEstimatedProgress;
  const nuxtApp = useNuxtApp();
  const progress = ref(0);
  const isLoading = ref(false);
  const error = ref(false);
  const start = () => {
    error.value = false;
    set(0);
  };
  function set(at = 0) {
    if (nuxtApp.isHydrating) {
      return;
    }
    if (at >= 100) {
      return finish();
    }
    progress.value = at < 0 ? 0 : at;
    if (throttle && false) {
      setTimeout(() => {
        isLoading.value = true;
      }, throttle);
    } else {
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
  const indicator = nuxtApp._loadingIndicator = nuxtApp._loadingIndicator || createLoadingIndicator(opts);
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
    const { user, isSuperAdmin } = storeToRefs(authStore);
    const links = reactive([
      { icon: "futzo-icon:home", title: "Dashboard", to: "/", disabled: false },
      {
        icon: "futzo-icon:trophy",
        title: "Torneos",
        to: "/torneos",
        disabled: false
      },
      {
        icon: "futzo-icon:shirt-sharp",
        title: "Equipos",
        to: "/equipos",
        disabled: false
      },
      {
        icon: "futzo-icon:players",
        title: "Jugadores",
        to: "/jugadores",
        disabled: false
      },
      {
        icon: "mdi:soccer-field",
        title: "Locaciones",
        to: "/locaciones",
        disabled: false
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Logo = _sfc_main$2;
      const _component_Icon = __nuxt_component_0$1;
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
                          _push4(`${ssrInterpolate((_a2 = unref(user)) == null ? void 0 : _a2.email)}ss`);
                        } else {
                          return [
                            createTextVNode(toDisplayString((_b2 = unref(user)) == null ? void 0 : _b2.email) + "ss", 1)
                          ];
                        }
                      }),
                      append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VBtn, {
                            onClick: unref(logout),
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
                              onClick: unref(logout),
                              variant: "text",
                              size: "24"
                            }, {
                              prepend: withCtx(() => [
                                createVNode(_component_Icon, { name: "futzo-icon:logout" })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
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
                            createTextVNode(toDisplayString((_a2 = unref(user)) == null ? void 0 : _a2.email) + "ss", 1)
                          ];
                        }),
                        append: withCtx(() => [
                          createVNode(VBtn, {
                            onClick: unref(logout),
                            variant: "text",
                            size: "24"
                          }, {
                            prepend: withCtx(() => [
                              createVNode(_component_Icon, { name: "futzo-icon:logout" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
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
                onClick: unref(logout),
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
                          createTextVNode(toDisplayString((_a2 = unref(user)) == null ? void 0 : _a2.email) + "ss", 1)
                        ];
                      }),
                      append: withCtx(() => [
                        createVNode(VBtn, {
                          onClick: unref(logout),
                          variant: "text",
                          size: "24"
                        }, {
                          prepend: withCtx(() => [
                            createVNode(_component_Icon, { name: "futzo-icon:logout" })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
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
                  onClick: unref(logout),
                  variant: "text"
                }, {
                  prepend: withCtx(() => [
                    createVNode(_component_Icon, {
                      name: "futzo-icon:logout",
                      class: "mr-2"
                    })
                  ]),
                  _: 1
                }, 8, ["onClick"])
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
                      disabled: link.disabled,
                      title: link.title
                    }, {
                      prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Icon, {
                            name: link.icon,
                            class: "mr-2 drawer-icon"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Icon, {
                              name: link.icon,
                              class: "mr-2 drawer-icon"
                            }, null, 8, ["name"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(links), (link) => {
                      return openBlock(), createBlock(VListItem, {
                        density: "compact",
                        key: link.title,
                        link: "",
                        to: link.to,
                        disabled: link.disabled,
                        title: link.title
                      }, {
                        prepend: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: link.icon,
                            class: "mr-2 drawer-icon"
                          }, null, 8, ["name"])
                        ]),
                        _: 2
                      }, 1032, ["to", "disabled", "title"]);
                    }), 128))
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
                      disabled: link.disabled,
                      title: link.title
                    }, {
                      prepend: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: link.icon,
                          class: "mr-2 drawer-icon"
                        }, null, 8, ["name"])
                      ]),
                      _: 2
                    }, 1032, ["to", "disabled", "title"]);
                  }), 128))
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
      const _component_ClientOnly = __nuxt_component_1;
      const _cssVars = { style: {
        "--b9ca1a3a": unref(paddingLeft)
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
//# sourceMappingURL=default-Dk9HCL9b.mjs.map
