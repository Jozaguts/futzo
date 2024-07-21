import { B as propsFactory, C as makeComponentProps, L as makeTagProps, O as genericComponent, ah as useRender, aa as makeBorderProps, F as makeElevationProps, K as makeRoundedProps, M as makeThemeProps, ap as useBackgroundColor, aP as useBorder, U as useElevation, Y as useRounded, Q as provideTheme, ac as useRtl, ae as provideDefaults, t as VImg, a1 as VDefaultsProvider, ak as convertToUnit, bB as VExpandTransition, P as useProxiedModel, bC as useToggleScope, b7 as useSsrBoot, bD as makeRouterProps, bE as useLink, Z as useTextColor, I as IconValue, D as makeDensityProps, S as useDensity, p as VIcon, E as makeDimensionProps, T as useDimension, bF as makeDelayProps, am as makeDisplayProps, ad as useDisplay, bG as useRouter, aJ as useScopeId, bH as toPhysical, s as storeToRefs, f as useGlobalStore, a2 as useRoute$1, bA as ne$1, a7 as clamp, bI as useDelay, av as useTheme, n as useAuthStore, g as useSanctumAuth, b0 as VList, x as VListItem, au as VDivider, V as VCard, a as VCardItem, r as VAvatar, e as VBtn, m as useTournamentStore, b as VCardTitle, c as VCardText, a_ as VCardActions, w as __nuxt_component_0$1, i as useSanctumClient, h as useRouter$1 } from './server.mjs';
import { createVNode, toRef, shallowRef, computed, ref, watchEffect, mergeProps, Fragment, Suspense, watch, nextTick, Transition, useSSRContext, defineComponent, unref, withCtx, openBlock, createBlock, createCommentVNode, withDirectives, renderSlot, vShow, onScopeDispose, reactive, isRef, toDisplayString, createTextVNode, withModifiers, renderList, getCurrentInstance } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as _sfc_main$8 } from './Logo-CrZVdvyd.mjs';
import _sfc_main$9 from './nuxt-icon-BuDW_oT6.mjs';
import { t as tryOnScopeDispose, a as toValue } from './index-pTp1Ji9-.mjs';
import { m as makeLayoutItemProps, u as useLayoutItem, b as makeLayoutProps, c as createLayout, d as useLayout, V as VApp, a as VFooter } from './VFooter-BuzuAsdN.mjs';
import { V as VDialog } from './VDialog-CDUYkq_m.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'consola/core';
import '@formkit/auto-animate/vue';
import 'awesome-phonenumber';

const makeVToolbarTitleProps = propsFactory({
  text: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VToolbarTitle");
const VToolbarTitle = genericComponent()({
  name: "VToolbarTitle",
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const hasText = !!(slots.default || slots.text || props.text);
      return createVNode(props.tag, {
        "class": ["v-toolbar-title", props.class],
        "style": props.style
      }, {
        default: () => {
          var _a;
          return [hasText && createVNode("div", {
            "class": "v-toolbar-title__placeholder"
          }, [slots.text ? slots.text() : props.text, (_a = slots.default) == null ? void 0 : _a.call(slots)])];
        }
      });
    });
    return {};
  }
});
const allowedDensities = [null, "prominent", "default", "comfortable", "compact"];
const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities.includes(v)
  },
  extended: Boolean,
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "header"
  }),
  ...makeThemeProps()
}, "VToolbar");
const VToolbar = genericComponent()({
  name: "VToolbar",
  props: makeVToolbarProps(),
  setup(props, _ref) {
    var _a;
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const isExtended = shallowRef(!!(props.extended || ((_a = slots.extension) == null ? void 0 : _a.call(slots))));
    const contentHeight = computed(() => parseInt(Number(props.height) + (props.density === "prominent" ? Number(props.height) : 0) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0), 10));
    const extensionHeight = computed(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === "prominent" ? Number(props.extensionHeight) : 0) - (props.density === "comfortable" ? 4 : 0) - (props.density === "compact" ? 8 : 0), 10) : 0);
    provideDefaults({
      VBtn: {
        variant: "text"
      }
    });
    useRender(() => {
      var _a2;
      const hasTitle = !!(props.title || slots.title);
      const hasImage = !!(slots.image || props.image);
      const extension = (_a2 = slots.extension) == null ? void 0 : _a2.call(slots);
      isExtended.value = !!(props.extended || extension);
      return createVNode(props.tag, {
        "class": ["v-toolbar", {
          "v-toolbar--absolute": props.absolute,
          "v-toolbar--collapse": props.collapse,
          "v-toolbar--flat": props.flat,
          "v-toolbar--floating": props.floating,
          [`v-toolbar--density-${props.density}`]: true
        }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.style]
      }, {
        default: () => [hasImage && createVNode("div", {
          "key": "image",
          "class": "v-toolbar__image"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "cover": true,
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, slots.image)]), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(contentHeight.value)
            }
          }
        }, {
          default: () => {
            var _a3, _b, _c;
            return [createVNode("div", {
              "class": "v-toolbar__content",
              "style": {
                height: convertToUnit(contentHeight.value)
              }
            }, [slots.prepend && createVNode("div", {
              "class": "v-toolbar__prepend"
            }, [(_a3 = slots.prepend) == null ? void 0 : _a3.call(slots)]), hasTitle && createVNode(VToolbarTitle, {
              "key": "title",
              "text": props.title
            }, {
              text: slots.title
            }), (_b = slots.default) == null ? void 0 : _b.call(slots), slots.append && createVNode("div", {
              "class": "v-toolbar__append"
            }, [(_c = slots.append) == null ? void 0 : _c.call(slots)])])];
          }
        }), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(extensionHeight.value)
            }
          }
        }, {
          default: () => [createVNode(VExpandTransition, null, {
            default: () => [isExtended.value && createVNode("div", {
              "class": "v-toolbar__extension",
              "style": {
                height: convertToUnit(extensionHeight.value)
              }
            }, [extension])]
          })]
        })]
      });
    });
    return {
      contentHeight,
      extensionHeight
    };
  }
});
const makeScrollProps = propsFactory({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function useScroll(props) {
  let args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll
  } = args;
  let previousScroll = 0;
  let previousScrollHeight = 0;
  const target = ref(null);
  const currentScroll = shallowRef(0);
  const savedScroll = shallowRef(0);
  const currentThreshold = shallowRef(0);
  const isScrollActive = shallowRef(false);
  const isScrollingUp = shallowRef(false);
  const scrollThreshold = computed(() => {
    return Number(props.scrollThreshold);
  });
  const scrollRatio = computed(() => {
    return clamp((scrollThreshold.value - currentScroll.value) / scrollThreshold.value || 0);
  });
  const onScroll = () => {
    const targetEl = target.value;
    if (!targetEl || canScroll && !canScroll.value)
      return;
    previousScroll = currentScroll.value;
    currentScroll.value = "window" in targetEl ? targetEl.pageYOffset : targetEl.scrollTop;
    const currentScrollHeight = targetEl instanceof Window ? (void 0).documentElement.scrollHeight : targetEl.scrollHeight;
    if (previousScrollHeight !== currentScrollHeight) {
      previousScrollHeight = currentScrollHeight;
      return;
    }
    isScrollingUp.value = currentScroll.value < previousScroll;
    currentThreshold.value = Math.abs(currentScroll.value - scrollThreshold.value);
  };
  watch(isScrollingUp, () => {
    savedScroll.value = savedScroll.value || currentScroll.value;
  });
  watch(isScrollActive, () => {
    savedScroll.value = 0;
  });
  canScroll && watch(canScroll, onScroll, {
    immediate: true
  });
  return {
    scrollThreshold,
    currentScroll,
    currentThreshold,
    isScrollActive,
    scrollRatio,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp,
    savedScroll
  };
}
const makeVAppBarProps = propsFactory({
  scrollBehavior: String,
  modelValue: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    default: "top",
    validator: (value) => ["top", "bottom"].includes(value)
  },
  ...makeVToolbarProps(),
  ...makeLayoutItemProps(),
  ...makeScrollProps(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar");
const VAppBar = genericComponent()({
  name: "VAppBar",
  props: makeVAppBarProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vToolbarRef = ref();
    const isActive = useProxiedModel(props, "modelValue");
    const scrollBehavior = computed(() => {
      var _a2;
      var _a;
      const behavior = new Set((_a2 = (_a = props.scrollBehavior) == null ? void 0 : _a.split(" ")) != null ? _a2 : []);
      return {
        hide: behavior.has("hide"),
        fullyHide: behavior.has("fully-hide"),
        inverted: behavior.has("inverted"),
        collapse: behavior.has("collapse"),
        elevate: behavior.has("elevate"),
        fadeImage: behavior.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    });
    const canScroll = computed(() => {
      const behavior = scrollBehavior.value;
      return behavior.hide || behavior.fullyHide || behavior.inverted || behavior.collapse || behavior.elevate || behavior.fadeImage || // behavior.shrink ||
      !isActive.value;
    });
    const {
      currentScroll,
      scrollThreshold,
      isScrollingUp,
      scrollRatio
    } = useScroll(props, {
      canScroll
    });
    const canHide = computed(() => scrollBehavior.value.hide || scrollBehavior.value.fullyHide);
    const isCollapsed = computed(() => props.collapse || scrollBehavior.value.collapse && (scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0));
    const isFlat = computed(() => props.flat || scrollBehavior.value.fullyHide && !isActive.value || scrollBehavior.value.elevate && (scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0));
    const opacity = computed(() => scrollBehavior.value.fadeImage ? scrollBehavior.value.inverted ? 1 - scrollRatio.value : scrollRatio.value : void 0);
    const height = computed(() => {
      var _a2, _b2;
      var _a, _b;
      const height2 = Number((_a2 = (_a = vToolbarRef.value) == null ? void 0 : _a.contentHeight) != null ? _a2 : props.height);
      const extensionHeight = Number((_b2 = (_b = vToolbarRef.value) == null ? void 0 : _b.extensionHeight) != null ? _b2 : 0);
      if (!canHide.value)
        return height2 + extensionHeight;
      return currentScroll.value < scrollThreshold.value || scrollBehavior.value.fullyHide ? height2 + extensionHeight : height2;
    });
    useToggleScope(computed(() => !!props.scrollBehavior), () => {
      watchEffect(() => {
        if (canHide.value) {
          if (scrollBehavior.value.inverted) {
            isActive.value = currentScroll.value > scrollThreshold.value;
          } else {
            isActive.value = isScrollingUp.value || currentScroll.value < scrollThreshold.value;
          }
        } else {
          isActive.value = true;
        }
      });
    });
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      layoutItemStyles,
      layoutIsReady
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(props, "location"),
      layoutSize: height,
      elementSize: shallowRef(void 0),
      active: isActive,
      absolute: toRef(props, "absolute")
    });
    useRender(() => {
      const toolbarProps = VToolbar.filterProps(props);
      return createVNode(VToolbar, mergeProps({
        "ref": vToolbarRef,
        "class": ["v-app-bar", {
          "v-app-bar--bottom": props.location === "bottom"
        }, props.class],
        "style": [{
          ...layoutItemStyles.value,
          "--v-toolbar-image-opacity": opacity.value,
          height: void 0,
          ...ssrBootStyles.value
        }, props.style]
      }, toolbarProps, {
        "collapse": isCollapsed.value,
        "flat": isFlat.value
      }), slots);
    });
    return layoutIsReady;
  }
});
const makeVBreadcrumbsDividerProps = propsFactory({
  divider: [Number, String],
  ...makeComponentProps()
}, "VBreadcrumbsDivider");
const VBreadcrumbsDivider = genericComponent()({
  name: "VBreadcrumbsDivider",
  props: makeVBreadcrumbsDividerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _a2;
      var _a;
      return createVNode("li", {
        "class": ["v-breadcrumbs-divider", props.class],
        "style": props.style
      }, [(_a2 = (_a = slots == null ? void 0 : slots.default) == null ? void 0 : _a.call(slots)) != null ? _a2 : props.divider]);
    });
    return {};
  }
});
const makeVBreadcrumbsItemProps = propsFactory({
  active: Boolean,
  activeClass: String,
  activeColor: String,
  color: String,
  disabled: Boolean,
  title: String,
  ...makeComponentProps(),
  ...makeRouterProps(),
  ...makeTagProps({
    tag: "li"
  })
}, "VBreadcrumbsItem");
const VBreadcrumbsItem = genericComponent()({
  name: "VBreadcrumbsItem",
  props: makeVBreadcrumbsItemProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      var _a;
      return props.active || ((_a = link.isActive) == null ? void 0 : _a.value);
    });
    const color = computed(() => isActive.value ? props.activeColor : props.color);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    useRender(() => {
      return createVNode(props.tag, {
        "class": ["v-breadcrumbs-item", {
          "v-breadcrumbs-item--active": isActive.value,
          "v-breadcrumbs-item--disabled": props.disabled,
          [`${props.activeClass}`]: isActive.value && props.activeClass
        }, textColorClasses.value, props.class],
        "style": [textColorStyles.value, props.style],
        "aria-current": isActive.value ? "page" : void 0
      }, {
        default: () => {
          var _a2, _b2;
          var _a, _b;
          return [!link.isLink.value ? (_a2 = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _a2 : props.title : createVNode("a", {
            "class": "v-breadcrumbs-item--link",
            "href": link.href.value,
            "aria-current": isActive.value ? "page" : void 0,
            "onClick": link.navigate
          }, [(_b2 = (_b = slots.default) == null ? void 0 : _b.call(slots)) != null ? _b2 : props.title])];
        }
      });
    });
    return {};
  }
});
const makeVBreadcrumbsProps = propsFactory({
  activeClass: String,
  activeColor: String,
  bgColor: String,
  color: String,
  disabled: Boolean,
  divider: {
    type: String,
    default: "/"
  },
  icon: IconValue,
  items: {
    type: Array,
    default: () => []
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "ul"
  })
}, "VBreadcrumbs");
const VBreadcrumbs = genericComponent()({
  name: "VBreadcrumbs",
  props: makeVBreadcrumbsProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      densityClasses
    } = useDensity(props);
    const {
      roundedClasses
    } = useRounded(props);
    provideDefaults({
      VBreadcrumbsDivider: {
        divider: toRef(props, "divider")
      },
      VBreadcrumbsItem: {
        activeClass: toRef(props, "activeClass"),
        activeColor: toRef(props, "activeColor"),
        color: toRef(props, "color"),
        disabled: toRef(props, "disabled")
      }
    });
    const items = computed(() => props.items.map((item) => {
      return typeof item === "string" ? {
        item: {
          title: item
        },
        raw: item
      } : {
        item,
        raw: item
      };
    }));
    useRender(() => {
      const hasPrepend = !!(slots.prepend || props.icon);
      return createVNode(props.tag, {
        "class": ["v-breadcrumbs", backgroundColorClasses.value, densityClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.style]
      }, {
        default: () => {
          var _a;
          return [hasPrepend && createVNode("li", {
            "key": "prepend",
            "class": "v-breadcrumbs__prepend"
          }, [!slots.prepend ? createVNode(VIcon, {
            "key": "prepend-icon",
            "start": true,
            "icon": props.icon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !props.icon,
            "defaults": {
              VIcon: {
                icon: props.icon,
                start: true
              }
            }
          }, slots.prepend)]), items.value.map((_ref2, index, array) => {
            var _a3;
            var _a2;
            let {
              item,
              raw
            } = _ref2;
            return createVNode(Fragment, null, [(_a3 = (_a2 = slots.item) == null ? void 0 : _a2.call(slots, {
              item,
              index
            })) != null ? _a3 : createVNode(VBreadcrumbsItem, mergeProps({
              "key": index,
              "disabled": index >= array.length - 1
            }, typeof item === "string" ? {
              title: item
            } : item), {
              default: slots.title ? () => {
                var _a32;
                return (_a32 = slots.title) == null ? void 0 : _a32.call(slots, {
                  item,
                  index
                });
              } : void 0
            }), index < array.length - 1 && createVNode(VBreadcrumbsDivider, null, {
              default: slots.divider ? () => {
                var _a32;
                return (_a32 = slots.divider) == null ? void 0 : _a32.call(slots, {
                  item: raw,
                  index
                });
              } : void 0
            })]);
          }), (_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      });
    });
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
    useRender(() => createVNode("div", {
      "ref": layoutRef,
      "class": [layoutClasses.value, props.class],
      "style": [dimensionStyles.value, layoutStyles.value, props.style]
    }, [createVNode(Suspense, null, {
      default: () => {
        var _a;
        return [createVNode(Fragment, null, [(_a = slots.default) == null ? void 0 : _a.call(slots)])];
      }
    })]));
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
      mainStyles,
      layoutIsReady
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
    return layoutIsReady;
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
      if (val)
        isActive.value = true;
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
      layoutItemScrimStyles,
      layoutIsReady
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
            if (isPersistent.value)
              return;
            isActive.value = false;
          }
        }, scopeId), null)]
      })]);
    });
    return layoutIsReady.then(() => ({
      isStuck
    }));
  }
});
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = void 0;
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
  const targets = computed(() => Array.isArray(target) ? target.map((el) => unrefElement(el)) : [unrefElement(target)]);
  const stopWatch = watch(
    targets,
    (els) => {
      cleanup();
      if (isSupported.value && window2) {
        observer = new ResizeObserver(callback);
        for (const _el of els)
          _el && observer.observe(_el, observerOptions);
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
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "CircularLogo",
  __ssrInlineRender: true,
  setup(__props) {
    const logo = ref(
      useTheme().global.current.value.dark ? "/futzo/logos/circular/logo-24.png" : "/futzo/logos/circular/logo-22.png"
    );
    watch(useTheme().global.current, (value) => {
      value.dark ? logo.value = "/futzo/logos/circular/logo-24.png" : logo.value = "/futzo/logos/circular/logo-22.png";
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VImg, mergeProps({
        src: unref(logo),
        width: "50",
        height: "50"
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CircularLogo.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "navigation-drawer",
  __ssrInlineRender: true,
  setup(__props) {
    const { drawer, drawerWidth, isMobile, appName, rail } = storeToRefs(useGlobalStore());
    const drawerRef = ref();
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);
    const adminLinks = reactive([
      {
        icon: "mdi-users",
        title: "Roles y Permisos",
        to: "/roles-permisos",
        disabled: (authStore == null ? void 0 : authStore.role) !== "super administrador"
      }
    ]);
    const links = reactive([
      { icon: "home", title: "Dashboard", to: "/", disabled: false },
      { icon: "trophy", title: "Liga", to: "/liga", disabled: false },
      { icon: "calendar", title: "Calendario", to: "/calendario", disabled: false },
      {
        icon: "ion_shirt-sharp",
        title: "Equipos",
        to: "/equipos",
        disabled: false
      },
      {
        icon: "players",
        title: "Jugadores",
        to: "/jugadores",
        disabled: false
      },
      {
        icon: "ball",
        title: "MVP",
        to: "/mvp",
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
      const _component_Logo = _sfc_main$8;
      const _component_nuxt_icon = _sfc_main$9;
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
                          _push4(ssrRenderComponent(_component_nuxt_icon, {
                            name: "settings-01",
                            class: "mr-2",
                            filled: ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_nuxt_icon, {
                              name: "settings-01",
                              class: "mr-2",
                              filled: ""
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
                          createVNode(_component_nuxt_icon, {
                            name: "settings-01",
                            class: "mr-2",
                            filled: ""
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
                loading: !unref(user).name
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCardItem, null, {
                      prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAvatar, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VImg, {
                                  src: unref(user).avatar
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VImg, {
                                    src: unref(user).avatar
                                  }, null, 8, ["src"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAvatar, null, {
                              default: withCtx(() => [
                                createVNode(VImg, {
                                  src: unref(user).avatar
                                }, null, 8, ["src"])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      title: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<small${_scopeId3}>${ssrInterpolate(unref(user).name)}</small>`);
                        } else {
                          return [
                            createVNode("small", null, toDisplayString(unref(user).name), 1)
                          ];
                        }
                      }),
                      subtitle: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(user).email)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(user).email), 1)
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
                                _push5(ssrRenderComponent(_component_nuxt_icon, {
                                  name: "logout",
                                  filled: ""
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_nuxt_icon, {
                                    name: "logout",
                                    filled: ""
                                  })
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
                                createVNode(_component_nuxt_icon, {
                                  name: "logout",
                                  filled: ""
                                })
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
                            default: withCtx(() => [
                              createVNode(VImg, {
                                src: unref(user).avatar
                              }, null, 8, ["src"])
                            ]),
                            _: 1
                          })
                        ]),
                        title: withCtx(() => [
                          createVNode("small", null, toDisplayString(unref(user).name), 1)
                        ]),
                        subtitle: withCtx(() => [
                          createTextVNode(toDisplayString(unref(user).email), 1)
                        ]),
                        append: withCtx(() => [
                          createVNode(VBtn, {
                            onClick: unref(logout),
                            variant: "text",
                            size: "24"
                          }, {
                            prepend: withCtx(() => [
                              createVNode(_component_nuxt_icon, {
                                name: "logout",
                                filled: ""
                              })
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
                          _push4(ssrRenderComponent(_component_nuxt_icon, {
                            name: "settings-01",
                            class: "mr-2",
                            filled: ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_nuxt_icon, {
                              name: "settings-01",
                              class: "mr-2",
                              filled: ""
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
                          createVNode(_component_nuxt_icon, {
                            name: "settings-01",
                            class: "mr-2",
                            filled: ""
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
                    _push3(ssrRenderComponent(_component_nuxt_icon, {
                      name: "logout",
                      class: "mr-2",
                      filled: ""
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_nuxt_icon, {
                        name: "logout",
                        class: "mr-2",
                        filled: ""
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
                        createVNode(_component_nuxt_icon, {
                          name: "settings-01",
                          class: "mr-2",
                          filled: ""
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VDivider),
                createVNode(VCard, {
                  loading: !unref(user).name
                }, {
                  default: withCtx(() => [
                    createVNode(VCardItem, null, {
                      prepend: withCtx(() => [
                        createVNode(VAvatar, null, {
                          default: withCtx(() => [
                            createVNode(VImg, {
                              src: unref(user).avatar
                            }, null, 8, ["src"])
                          ]),
                          _: 1
                        })
                      ]),
                      title: withCtx(() => [
                        createVNode("small", null, toDisplayString(unref(user).name), 1)
                      ]),
                      subtitle: withCtx(() => [
                        createTextVNode(toDisplayString(unref(user).email), 1)
                      ]),
                      append: withCtx(() => [
                        createVNode(VBtn, {
                          onClick: unref(logout),
                          variant: "text",
                          size: "24"
                        }, {
                          prepend: withCtx(() => [
                            createVNode(_component_nuxt_icon, {
                              name: "logout",
                              filled: ""
                            })
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
                        createVNode(_component_nuxt_icon, {
                          name: "settings-01",
                          class: "mr-2",
                          filled: ""
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
                    createVNode(_component_nuxt_icon, {
                      name: "logout",
                      class: "mr-2",
                      filled: ""
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
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Logo, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Logo)
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
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VList, {
              density: "compact",
              nav: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(rail)) {
                    _push3(ssrRenderComponent(VListItem, {
                      value: "futzo",
                      class: "pa-0",
                      disabled: ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$7, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$7)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(adminLinks), (link) => {
                    _push3(ssrRenderComponent(VListItem, {
                      density: "compact",
                      key: link.title,
                      link: "",
                      to: link.to,
                      disabled: link.disabled,
                      "prepend-icon": link.icon,
                      title: link.title
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--><!--[-->`);
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
                          _push4(ssrRenderComponent(_component_nuxt_icon, {
                            name: link.icon,
                            class: "mr-2 drawer-icon"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_nuxt_icon, {
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
                    unref(rail) ? (openBlock(), createBlock(VListItem, {
                      key: 0,
                      value: "futzo",
                      class: "pa-0",
                      disabled: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$7)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(adminLinks), (link) => {
                      return openBlock(), createBlock(VListItem, {
                        density: "compact",
                        key: link.title,
                        link: "",
                        to: link.to,
                        disabled: link.disabled,
                        "prepend-icon": link.icon,
                        title: link.title
                      }, null, 8, ["to", "disabled", "prepend-icon", "title"]);
                    }), 128)),
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
                          createVNode(_component_nuxt_icon, {
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
                default: withCtx(() => [
                  createVNode(_component_Logo)
                ]),
                append: withCtx(() => [
                  createVNode(VBtn, {
                    icon: "mdi-chevron-left",
                    variant: "text",
                    onClick: withModifiers(($event) => rail.value = !unref(rail), ["stop"])
                  }, null, 8, ["onClick"])
                ]),
                prepend: withCtx(() => [
                  unref(rail) ? (openBlock(), createBlock(VBtn, {
                    key: 0,
                    variant: "text",
                    icon: "mdi-menu",
                    onClick: withModifiers(($event) => rail.value = !unref(rail), ["stop"])
                  }, null, 8, ["onClick"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 512),
              createVNode(VList, {
                density: "compact",
                nav: ""
              }, {
                default: withCtx(() => [
                  unref(rail) ? (openBlock(), createBlock(VListItem, {
                    key: 0,
                    value: "futzo",
                    class: "pa-0",
                    disabled: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$7)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(adminLinks), (link) => {
                    return openBlock(), createBlock(VListItem, {
                      density: "compact",
                      key: link.title,
                      link: "",
                      to: link.to,
                      disabled: link.disabled,
                      "prepend-icon": link.icon,
                      title: link.title
                    }, null, 8, ["to", "disabled", "prepend-icon", "title"]);
                  }), 128)),
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
                        createVNode(_component_nuxt_icon, {
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/navigation-drawer.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "breadcrumbs",
  __ssrInlineRender: true,
  setup(__props) {
    const routeName = computed(() => useRoute$1().name);
    const leagueName = computed(() => {
      var _a, _b;
      return (_b = (_a = useAuthStore().user) == null ? void 0 : _a.league) == null ? void 0 : _b.name;
    });
    const breadcrumbs = computed(() => {
      switch (routeName.value) {
        case "index":
          return [
            {
              title: "Dashboard",
              to: "/"
            }
          ];
        case "liga":
          return [leagueName.value];
        case "liga-torneo":
          return [
            {
              title: leagueName.value,
              to: "/liga"
            },
            {
              title: useRoute$1().path.split("/")[2],
              to: useRoute$1().path
            }
          ];
        case "calendario":
          return ["Calendario"];
        case "equipos":
          return ["Equipos"];
        case "jugadores":
          return ["Jugadores"];
        case "mvp":
          return ["MVP"];
        case "roles-permisos":
          return ["Roles y Permisos"];
        case "configuracion":
          return ["Configuraci\xF3n"];
        case "equipos-inscribir":
          return [
            {
              title: "Equipos",
              to: "/equipos"
            },
            "Inscribir"
          ];
        default:
          return [
            {
              title: "home",
              to: "/"
            },
            {
              title: "liga",
              to: "/liga"
            },
            {
              title: routeName.value,
              to: useRoute$1().path
            }
          ];
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VBreadcrumbs, mergeProps({
        items: unref(breadcrumbs),
        disabled: false
      }, _attrs), {
        title: withCtx(({ item, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([index > 0 ? "text-primary" : "", "text-breadcrumbs"])}"${_scopeId}>${ssrInterpolate(item.title)}</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["text-breadcrumbs", index > 0 ? "text-primary" : ""]
              }, toDisplayString(item.title), 3)
            ];
          }
        }),
        divider: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, { icon: "mdi-chevron-right" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, { icon: "mdi-chevron-right" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/breadcrumbs.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "editar-torneo",
  __ssrInlineRender: true,
  setup(__props) {
    const clickHandler = async () => {
      const { dialog, isEdition, tournamentId, tournamentToEdit } = storeToRefs(useTournamentStore());
      if (tournamentId.value) {
        isEdition.value = true;
        const client = useSanctumClient();
        const response = await client(`/api/v1/admin/tournaments/${tournamentId.value}`);
        tournamentToEdit.value.name = response.name;
        tournamentToEdit.value.description = response.description;
        tournamentToEdit.value.start_date = response.start_date;
        tournamentToEdit.value.end_date = response.end_date;
        tournamentToEdit.value.description = response.description;
        tournamentToEdit.value.city = response.location.city;
        tournamentToEdit.value.address = response.location.address;
        tournamentToEdit.value.location = response.location.autocomplete_prediction;
        tournamentToEdit.value.tournament_format_id = response.tournament_format_id;
        tournamentToEdit.value.category_id = response.category_id;
        tournamentToEdit.value.prize = response.prize;
        tournamentToEdit.value.status = response.status;
        tournamentToEdit.value.winner = response.winner;
        tournamentToEdit.value.image = response.image;
        dialog.value = true;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VBtn, mergeProps({
        class: "navbar-btn-action secondary",
        onClick: clickHandler
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Editar torneo`);
          } else {
            return [
              createTextVNode("Editar torneo")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/liga/editar-torneo.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "cancelar-torneo",
  __ssrInlineRender: true,
  setup(__props) {
    const dialog = ref(false);
    const { tournamentId, tournament } = storeToRefs(useTournamentStore());
    const tournamentStatus = computed(() => {
      var _a;
      return (_a = tournament.value) == null ? void 0 : _a.status;
    });
    const handleCancelTournament = () => {
      useTournamentStore().updateTournamentStatus(tournamentId.value, { status: "cancelado" }).then(() => {
        dialog.value = false;
        useRouter$1().push({ name: "liga" });
        useGlobalStore().showSuccessNotification({ message: "Torneo actualizado correctamente" });
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$9;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VBtn, {
        class: "navbar-btn-action secondary",
        disabled: unref(tournamentStatus) === "cancelado"
      }, {
        prepend: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_nuxt_icon, {
              name: "x-close",
              filled: ""
            }, null, _parent2, _scopeId));
            _push2(`<span class="button-text"${_scopeId}> Cancelar torneo</span>`);
          } else {
            return [
              createVNode(_component_nuxt_icon, {
                name: "x-close",
                filled: ""
              }),
              createVNode("span", {
                class: "button-text",
                onClick: ($event) => dialog.value = !unref(dialog)
              }, " Cancelar torneo", 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VDialog, {
        modelValue: unref(dialog),
        "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
        "max-width": "500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, { width: "500" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cancelar torneo`);
                      } else {
                        return [
                          createTextVNode("Cancelar torneo")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p${_scopeId3}>\xBFEst\xE1s seguro de cancelar el torneo?</p>`);
                      } else {
                        return [
                          createVNode("p", null, "\xBFEst\xE1s seguro de cancelar el torneo?")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          onClick: ($event) => dialog.value = !unref(dialog)
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cancelar`);
                            } else {
                              return [
                                createTextVNode("Cancelar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, { onClick: handleCancelTournament }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Aceptar`);
                            } else {
                              return [
                                createTextVNode("Aceptar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            onClick: ($event) => dialog.value = !unref(dialog)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancelar")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VBtn, { onClick: handleCancelTournament }, {
                            default: withCtx(() => [
                              createTextVNode("Aceptar")
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
                    createVNode(VCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Cancelar torneo")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode("p", null, "\xBFEst\xE1s seguro de cancelar el torneo?")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          onClick: ($event) => dialog.value = !unref(dialog)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancelar")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VBtn, { onClick: handleCancelTournament }, {
                          default: withCtx(() => [
                            createTextVNode("Aceptar")
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
              createVNode(VCard, { width: "500" }, {
                default: withCtx(() => [
                  createVNode(VCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Cancelar torneo")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode("p", null, "\xBFEst\xE1s seguro de cancelar el torneo?")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        onClick: ($event) => dialog.value = !unref(dialog)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancelar")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VBtn, { onClick: handleCancelTournament }, {
                        default: withCtx(() => [
                          createTextVNode("Aceptar")
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/liga/cancelar-torneo.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ActionButtons",
  __ssrInlineRender: true,
  setup(__props) {
    const currentRouteName = computed(() => useRoute$1().name);
    const buttonActions = computed(() => {
      switch (currentRouteName.value) {
        case "index":
          return false;
        case "liga":
          return {
            title: "Crear torneo",
            icon: "plus"
          };
        case "liga-torneo":
          return {
            title: "Marcar como terminado",
            icon: "check-circle-broken"
          };
        default:
          return {
            title: "Crear",
            icon: "plus"
          };
      }
    });
    const handleActions = () => {
      switch (currentRouteName.value) {
        case "liga":
          const { dialog, isEdition, tournamentToEdit, tournamentId } = storeToRefs(useTournamentStore());
          isEdition.value = false;
          tournamentId.value = null;
          tournamentToEdit.value = {};
          dialog.value = true;
          break;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex justify-center align-center" }, _attrs))}>`);
      if (unref(currentRouteName) === "liga-torneo") {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (unref(buttonActions)) {
        _push(ssrRenderComponent(VBtn, {
          variant: "elevated",
          onClick: handleActions,
          class: "mr-2 mr-lg-12 mr-md-12 navbar-btn-action"
        }, {
          prepend: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b;
            if (_push2) {
              _push2(ssrRenderComponent(_component_nuxt_icon, {
                name: unref(buttonActions).icon,
                filled: ""
              }, null, _parent2, _scopeId));
              _push2(`<span class="button-text"${_scopeId}>${ssrInterpolate((_a = unref(buttonActions)) == null ? void 0 : _a.title)}</span>`);
            } else {
              return [
                createVNode(_component_nuxt_icon, {
                  name: unref(buttonActions).icon,
                  filled: ""
                }, null, 8, ["name"]),
                createVNode("span", { class: "button-text" }, toDisplayString((_b = unref(buttonActions)) == null ? void 0 : _b.title), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ActionButtons.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "app-bar",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VAppBar, mergeProps({
        color: "white",
        border: false,
        elevation: "0",
        height: "85",
        app: ""
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$5, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$5)
            ];
          }
        }),
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/app-bar.vue");
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
    const isNotConfigurationPage = computed(() => {
      return useRoute$1().name !== "configuracion";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      const _cssVars = { style: {
        "--182bd3b6": unref(paddingLeft)
      } };
      _push(`<div${ssrRenderAttrs(mergeProps(_attrs, _cssVars))}>`);
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
                        createVNode(unref(ne$1), { position: "top-right" })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ClientOnly, null, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$6),
                        unref(isNotConfigurationPage) ? (openBlock(), createBlock(_sfc_main$1, { key: 0 })) : createCommentVNode("", true),
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
                      createVNode(unref(ne$1), { position: "top-right" })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$6),
                      unref(isNotConfigurationPage) ? (openBlock(), createBlock(_sfc_main$1, { key: 0 })) : createCommentVNode("", true),
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
      _push(`</div>`);
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
//# sourceMappingURL=default-Ccx3nUfs.mjs.map
