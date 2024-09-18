import { defineComponent, ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { au as useTheme, m as VImg } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Logo",
  __ssrInlineRender: true,
  props: {
    maxWidth: { default: "100%" }
  },
  setup(__props) {
    const logo = ref("/futzo/logos/horizontal/logo-12.png");
    const props = __props;
    watch(useTheme().global.current, (value) => {
      value.dark ? logo.value = "/futzo/logos/horizontal/logo-14.png" : logo.value = "/futzo/logos/horizontal/logo-12.png";
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VImg, mergeProps({
        "max-width": props.maxWidth,
        src: unref(logo)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Logo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Logo-CIvWjjNA.mjs.map
