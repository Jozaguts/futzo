import { createVNode } from 'vue';
import { p as propsFactory, m as makeComponentProps, aK as makeDimensionProps, n as makeTagProps, q as genericComponent, s as useRtl, aL as useDimension, w as useRender } from './server.mjs';

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
      "class": ["v-container", {
        "v-container--fluid": props.fluid
      }, rtlClasses.value, props.class],
      "style": [dimensionStyles.value, props.style]
    }, slots));
    return {};
  }
});

export { VContainer as V };
//# sourceMappingURL=VContainer-DNC4AmJg.mjs.map
