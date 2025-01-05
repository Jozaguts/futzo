import { toRef, createVNode } from 'vue';
import { p as propsFactory, bg as makeBorderProps, m as makeComponentProps, aK as makeDimensionProps, a9 as makeElevationProps, bz as makeLocationProps, bA as makePositionProps, a8 as makeRoundedProps, n as makeTagProps, o as makeThemeProps, q as genericComponent, r as provideTheme, N as useBackgroundColor, bB as useBorder, aL as useDimension, ad as useElevation, bC as useLocation, bD as usePosition, ag as useRounded, w as useRender } from './server.mjs';

const makeVSheetProps = propsFactory({
  color: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VSheet");
const VSheet = genericComponent()({
  name: "VSheet",
  props: makeVSheetProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-sheet", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, props.class],
      "style": [backgroundColorStyles.value, dimensionStyles.value, locationStyles.value, props.style]
    }, slots));
    return {};
  }
});

export { VSheet as V, makeVSheetProps as m };
//# sourceMappingURL=VSheet-UXYurn5r.mjs.map
