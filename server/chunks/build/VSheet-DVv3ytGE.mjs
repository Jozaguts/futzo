import { createVNode, normalizeStyle, normalizeClass } from 'vue';
import { g as genericComponent, p as propsFactory, ag as provideTheme, j as useBackgroundColor, b8 as useBorder, L as useDimension, b9 as useElevation, n as useLocation, bI as usePosition, k as useRounded, c as useRender, s as makeThemeProps, t as makeTagProps, v as makeRoundedProps, bJ as makePositionProps, w as makeLocationProps, ay as makeElevationProps, W as makeDimensionProps, x as makeComponentProps, az as makeBorderProps } from './server.mjs';

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
    } = useBackgroundColor(() => props.color);
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
      "class": normalizeClass(["v-sheet", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, props.class]),
      "style": normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, locationStyles.value, props.style])
    }, slots));
    return {};
  }
});

export { VSheet as V, makeVSheetProps as m };
//# sourceMappingURL=VSheet-DVv3ytGE.mjs.map
