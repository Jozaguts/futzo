import { createVNode, normalizeStyle, normalizeClass } from 'vue';
import { g as genericComponent, p as propsFactory, ag as provideTheme, ah as useGroup, aj as makeGroupItemProps, ak as useGroupItem, s as makeThemeProps, t as makeTagProps, ai as makeGroupProps, x as makeComponentProps } from './server.mjs';

const VItemGroupSymbol = Symbol.for("vuetify:v-item-group");
const makeVItemGroupProps = propsFactory({
  ...makeComponentProps(),
  ...makeGroupProps({
    selectedClass: "v-item--selected"
  }),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VItemGroup");
const VItemGroup = genericComponent()({
  name: "VItemGroup",
  props: makeVItemGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VItemGroupSymbol);
    return () => createVNode(props.tag, {
      "class": normalizeClass(["v-item-group", themeClasses.value, props.class]),
      "style": normalizeStyle(props.style)
    }, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots, {
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })];
      }
    });
  }
});
const VItem = genericComponent()({
  name: "VItem",
  props: makeGroupItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      select,
      toggle,
      selectedClass,
      value,
      disabled
    } = useGroupItem(props, VItemGroupSymbol);
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots, {
        isSelected: isSelected.value,
        selectedClass: selectedClass.value,
        select,
        toggle,
        value: value.value,
        disabled: disabled.value
      });
    };
  }
});

export { VItemGroup as V, VItem as a };
//# sourceMappingURL=VItem-DAX1x4SQ.mjs.map
