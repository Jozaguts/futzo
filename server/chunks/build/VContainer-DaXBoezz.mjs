import { createVNode, normalizeStyle, normalizeClass } from 'vue';
import { g as genericComponent, p as propsFactory, as as useRtl, K as useDimension, c as useRender, t as makeTagProps, U as makeDimensionProps, x as makeComponentProps } from './server.mjs';

const makeVContainerProps = propsFactory({
  fluid: {
    type: Boolean,
    default: false
  },
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps()
}, "VContainer");
const VContainer = genericComponent()({
  name: "VContainer",
  props: makeVContainerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      rtlClasses
    } = useRtl();
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-container", {
        "v-container--fluid": props.fluid
      }, rtlClasses.value, props.class]),
      "style": normalizeStyle([dimensionStyles.value, props.style])
    }, slots));
    return {};
  }
});

export { VContainer as V };
//# sourceMappingURL=VContainer-DaXBoezz.mjs.map
