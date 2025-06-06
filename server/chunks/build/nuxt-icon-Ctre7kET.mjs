import { createVNode, resolveDynamicComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderVNode } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  props: {
    filled: {
      type: Boolean,
      required: false,
      default: false
    },
    fontControlled: {
      type: Boolean,
      required: false,
      default: true
    },
    icon: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: false
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent($props.icon), mergeProps({
    class: {
      "nuxt-icon": $props.fontControlled,
      "nuxt-icon--fill": !$props.filled
    }
  }, _attrs), null), _parent);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-svgo/dist/runtime/components/nuxt-icon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const NuxtIcon = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { NuxtIcon as N };
//# sourceMappingURL=nuxt-icon-Ctre7kET.mjs.map
