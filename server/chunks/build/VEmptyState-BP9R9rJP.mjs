import { createElementVNode, normalizeStyle, normalizeClass, createVNode, Fragment } from 'vue';
import { g as genericComponent, p as propsFactory, ag as provideTheme, j as useBackgroundColor, L as useDimension, at as useDisplay, c as useRender, aa as VImg, q as VIcon, aM as VDefaultsProvider, a5 as convertToUnit, s as makeThemeProps, ax as makeSizeProps, W as makeDimensionProps, x as makeComponentProps, I as IconValue } from './server.mjs';
import { V as VBtn } from './VBtn-_od1f1mx.mjs';

const makeVEmptyStateProps = propsFactory({
  actionText: String,
  bgColor: String,
  color: String,
  icon: IconValue,
  image: String,
  justify: {
    type: String,
    default: "center"
  },
  headline: String,
  title: String,
  text: String,
  textWidth: {
    type: [Number, String],
    default: 500
  },
  href: String,
  to: String,
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeSizeProps({
    size: void 0
  }),
  ...makeThemeProps()
}, "VEmptyState");
const VEmptyState = genericComponent()({
  name: "VEmptyState",
  props: makeVEmptyStateProps(),
  emits: {
    "click:action": (e) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      displayClasses
    } = useDisplay();
    function onClickAction(e) {
      emit("click:action", e);
    }
    useRender(() => {
      var _a2, _b2, _c2, _d;
      var _a, _b, _c;
      const hasActions = !!(slots.actions || props.actionText);
      const hasHeadline = !!(slots.headline || props.headline);
      const hasTitle = !!(slots.title || props.title);
      const hasText = !!(slots.text || props.text);
      const hasMedia = !!(slots.media || props.image || props.icon);
      const size = props.size || (props.image ? 200 : 96);
      return createElementVNode("div", {
        "class": normalizeClass(["v-empty-state", {
          [`v-empty-state--${props.justify}`]: true
        }, themeClasses.value, backgroundColorClasses.value, displayClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, props.style])
      }, [hasMedia && createElementVNode("div", {
        "key": "media",
        "class": "v-empty-state__media"
      }, [!slots.media ? createElementVNode(Fragment, null, [props.image ? createVNode(VImg, {
        "key": "image",
        "src": props.image,
        "height": size
      }, null) : props.icon ? createVNode(VIcon, {
        "key": "icon",
        "color": props.color,
        "size": size,
        "icon": props.icon
      }, null) : void 0]) : createVNode(VDefaultsProvider, {
        "key": "media-defaults",
        "defaults": {
          VImg: {
            src: props.image,
            height: size
          },
          VIcon: {
            size,
            icon: props.icon
          }
        }
      }, {
        default: () => [slots.media()]
      })]), hasHeadline && createElementVNode("div", {
        "key": "headline",
        "class": "v-empty-state__headline"
      }, [(_a2 = (_a = slots.headline) == null ? void 0 : _a.call(slots)) != null ? _a2 : props.headline]), hasTitle && createElementVNode("div", {
        "key": "title",
        "class": "v-empty-state__title"
      }, [(_b2 = (_b = slots.title) == null ? void 0 : _b.call(slots)) != null ? _b2 : props.title]), hasText && createElementVNode("div", {
        "key": "text",
        "class": "v-empty-state__text",
        "style": {
          maxWidth: convertToUnit(props.textWidth)
        }
      }, [(_c2 = (_c = slots.text) == null ? void 0 : _c.call(slots)) != null ? _c2 : props.text]), slots.default && createElementVNode("div", {
        "key": "content",
        "class": "v-empty-state__content"
      }, [slots.default()]), hasActions && createElementVNode("div", {
        "key": "actions",
        "class": "v-empty-state__actions"
      }, [createVNode(VDefaultsProvider, {
        "defaults": {
          VBtn: {
            class: "v-empty-state__action-btn",
            color: (_d = props.color) != null ? _d : "surface-variant",
            href: props.href,
            text: props.actionText,
            to: props.to
          }
        }
      }, {
        default: () => {
          var _a3;
          var _a22;
          return [(_a3 = (_a22 = slots.actions) == null ? void 0 : _a22.call(slots, {
            props: {
              onClick: onClickAction
            }
          })) != null ? _a3 : createVNode(VBtn, {
            "onClick": onClickAction
          }, null)];
        }
      })])]);
    });
    return {};
  }
});

export { VEmptyState as V };
//# sourceMappingURL=VEmptyState-BP9R9rJP.mjs.map
