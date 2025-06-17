import { _ as __nuxt_component_0$1 } from './index-DkcY5wU8.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { V as VBtn } from './VBtn-_od1f1mx.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PrimaryBtn",
  __ssrInlineRender: true,
  props: {
    text: { default: "prop name not set" },
    icon: { default: "futzo-icon:plus" },
    variant: { default: "elevated" },
    showIcon: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      _push(ssrRenderComponent(VBtn, mergeProps({
        variant: props.variant,
        class: "app-bar-cat-btn",
        size: "large",
        disabled: props.disabled,
        onClick: ($event) => emits("click")
      }, _attrs), {
        prepend: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.showIcon) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: props.icon
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              props.showIcon ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                name: props.icon
              }, null, 8, ["name"])) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ${ssrInterpolate(_ctx.text)}`);
          } else {
            return [
              createTextVNode(" " + toDisplayString(_ctx.text), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/PrimaryBtn.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dfc7c2bb"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=PrimaryBtn-B0RnAWAj.mjs.map
