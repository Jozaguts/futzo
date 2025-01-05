import { toRef, createVNode, Fragment } from 'vue';
import { p as propsFactory, aJ as IconValue, m as makeComponentProps, aK as makeDimensionProps, a$ as makeSizeProps, o as makeThemeProps, q as genericComponent, r as provideTheme, N as useBackgroundColor, aL as useDimension, b0 as useDisplay, w as useRender, U as VImg, aq as VIcon, aM as VDefaultsProvider, C as convertToUnit } from './server.mjs';
import { V as VBtn } from './VBtn-DMHWn55H.mjs';

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
    } = useBackgroundColor(toRef(props, "bgColor"));
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
      return createVNode("div", {
        "class": ["v-empty-state", {
          [`v-empty-state--${props.justify}`]: true
        }, themeClasses.value, backgroundColorClasses.value, displayClasses.value, props.class],
        "style": [backgroundColorStyles.value, dimensionStyles.value, props.style]
      }, [hasMedia && createVNode("div", {
        "key": "media",
        "class": "v-empty-state__media"
      }, [!slots.media ? createVNode(Fragment, null, [props.image ? createVNode(VImg, {
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
      })]), hasHeadline && createVNode("div", {
        "key": "headline",
        "class": "v-empty-state__headline"
      }, [(_a2 = (_a = slots.headline) == null ? void 0 : _a.call(slots)) != null ? _a2 : props.headline]), hasTitle && createVNode("div", {
        "key": "title",
        "class": "v-empty-state__title"
      }, [(_b2 = (_b = slots.title) == null ? void 0 : _b.call(slots)) != null ? _b2 : props.title]), hasText && createVNode("div", {
        "key": "text",
        "class": "v-empty-state__text",
        "style": {
          maxWidth: convertToUnit(props.textWidth)
        }
      }, [(_c2 = (_c = slots.text) == null ? void 0 : _c.call(slots)) != null ? _c2 : props.text]), slots.default && createVNode("div", {
        "key": "content",
        "class": "v-empty-state__content"
      }, [slots.default()]), hasActions && createVNode("div", {
        "key": "actions",
        "class": "v-empty-state__actions"
      }, [createVNode(VDefaultsProvider, {
        "defaults": {
          VBtn: {
            class: "v-empty-state__action-btn",
            color: (_d = props.color) != null ? _d : "surface-variant",
            text: props.actionText
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
//# sourceMappingURL=VEmptyState-Cyx4LXQZ.mjs.map
