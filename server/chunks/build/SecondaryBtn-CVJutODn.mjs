import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { V as VBtn } from './VBtn-_od1f1mx.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SecondaryBtn",
  __ssrInlineRender: true,
  props: {
    text: String
  },
  emits: ["btn-click"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VBtn, mergeProps({
        border: "solid #d0d5dd",
        class: "app-bar-secondary-btn",
        size: "large",
        variant: "outlined",
        onClick: () => emits("btn-click")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="app-bar-secondary-btn__input_text"${_scopeId}>${ssrInterpolate(__props.text)}</span>`);
          } else {
            return [
              createVNode("span", { class: "app-bar-secondary-btn__input_text" }, toDisplayString(__props.text), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/SecondaryBtn.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=SecondaryBtn-CVJutODn.mjs.map
