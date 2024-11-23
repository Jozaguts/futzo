import { useSSRContext, defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { V as VBtn } from './VBtn-sH8DNEZb.mjs';
import { f as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "app-bar-secondary-btn",
  __ssrInlineRender: true,
  props: {
    text: String
  },
  emits: ["btn-click"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VBtn, mergeProps({
        class: "app-bar-secondary-btn",
        size: "large",
        onClick: () => emits("btn-click")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.text)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.text), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/app-bar-secondary-btn.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppBarSecondaryBtn = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d7230d84"]]);

export { AppBarSecondaryBtn as A };
//# sourceMappingURL=app-bar-secondary-btn-a5cT-UYX.mjs.map
