import { defineComponent, ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { m as useTheme, aa as VImg, h as useRoute$1, i as useRouter$1 } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Logo",
  __ssrInlineRender: true,
  props: {
    maxWidth: { default: "100%" }
  },
  setup(__props) {
    const logo = ref("/futzo/logos/horizontal/logo-12.png");
    const props = __props;
    watch(
      useTheme().global.current,
      (value) => {
        value.dark ? logo.value = "/futzo/logos/horizontal/logo-14.png" : logo.value = "/futzo/logos/horizontal/logo-12.png";
      },
      { deep: true }
    );
    const goToHome = () => {
      if (useRoute$1().name !== "torneos-torneo-inscripcion") {
        useRouter$1().push({ name: "index" });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VImg, mergeProps({
        "max-width": props.maxWidth,
        src: unref(logo),
        class: "cursor-pointer",
        onClick: goToHome
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
//# sourceMappingURL=Logo-D65Z66Oc.mjs.map
