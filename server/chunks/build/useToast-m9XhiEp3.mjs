import { _ as __nuxt_component_0 } from './index-DkcY5wU8.mjs';
import { markRaw, defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { aU as useNuxtApp } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    msg: {},
    description: {},
    closeIcon: {},
    typeIcon: {},
    color: {},
    backgroundColor: {},
    styles: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _cssVars = { style: {
        "--f59856e6": _ctx.backgroundColor,
        "--7f12531b": _ctx.color
      } };
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "headless" }, _attrs, _cssVars))}>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: _ctx.typeIcon,
        size: "38",
        class: "icon"
      }, null, _parent));
      _push(`<p class="headlessTitle">${ssrInterpolate(_ctx.msg)}</p><button class="headlessClose">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: _ctx.closeIcon,
        size: "38"
      }, null, _parent));
      _push(`</button><p class="headlessDescription">${ssrInterpolate(_ctx.description)}</p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/notifications/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const colors = {
  success: {
    color: "#4CA30D",
    background: "#F3FEE7"
  },
  warning: {
    color: "#DC6803",
    background: "#FFF8E6"
  },
  error: {
    color: "#F04438",
    background: "#FFEDEE"
  },
  info: {
    color: "#155EEF",
    background: "#EFF4FF"
  }
};
const useToast = () => {
  const { $toast } = useNuxtApp();
  const toast = (type, msg, description) => {
    return $toast.custom(markRaw(_sfc_main), {
      componentProps: {
        msg,
        description,
        closeIcon: `futzo-icon:${type}-close-alert`,
        typeIcon: `futzo-icon:${type}-alert`,
        color: colors[type].color,
        backgroundColor: colors[type].background,
        type
      }
    });
  };
  return { toast };
};

export { useToast as u };
//# sourceMappingURL=useToast-m9XhiEp3.mjs.map
