import { defineComponent, mergeProps, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, H as VDivider } from './server.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DotStepper",
  __ssrInlineRender: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    completed: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    addDivider: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const color = computed(() => __props.active ? "#9155FD" : "#E0E0E0");
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        "--4704f69b": unref(color)
      } };
      _push(`<!--[--><div${ssrRenderAttrs(mergeProps({ class: "step-dot-container" }, _cssVars))}><div class="d-flex flex-column align-center text-center">`);
      if (__props.active && !__props.completed) {
        _push(`<svg class="step-dot" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.333984" width="24" height="24" rx="12" fill="#9155FD"></rect><circle cx="12.334" cy="12" r="4" fill="white"></circle></svg>`);
      } else if (__props.completed) {
        _push(`<svg class="step-dot" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.333984" width="24" height="24" rx="12" fill="#9155FD"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M17.096 7.39016L9.93602 14.3002L8.03602 12.2702C7.68602 11.9402 7.13602 11.9202 6.73602 12.2002C6.34602 12.4902 6.23602 13.0002 6.47602 13.4102L8.72602 17.0702C8.94602 17.4102 9.32601 17.6202 9.75601 17.6202C10.166 17.6202 10.556 17.4102 10.776 17.0702C11.136 16.6002 18.006 8.41016 18.006 8.41016C18.906 7.49016 17.816 6.68016 17.096 7.38016V7.39016Z" fill="white"></path></svg>`);
      } else {
        _push(`<svg class="step-dot" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.333984" width="24" height="24" rx="12" fill="#E0E0E0"></rect><circle cx="12.334" cy="12" r="4" fill="white"></circle></svg>`);
      }
      _push(`<small class="${ssrRenderClass([__props.active ? "active" : "", "dot-label"])}">${ssrInterpolate(__props.label)}</small></div></div>`);
      if (__props.addDivider) {
        _push(ssrRenderComponent(VDivider, _cssVars, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/DotStepper.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "IndicatorStep",
  __ssrInlineRender: true,
  props: {
    formSteps: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DotStepper = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "steps-container" }, _attrs))} data-v-c30b8b39><!--[-->`);
      ssrRenderList(props.formSteps.steps, (step, index) => {
        _push(ssrRenderComponent(_component_DotStepper, {
          active: props.formSteps.current === step.step,
          completed: step.completed,
          label: step.label,
          "add-divider": index !== props.formSteps.steps.length - 1
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/IndicatorStep.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const IndicatorStep = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c30b8b39"]]);

export { IndicatorStep as I };
//# sourceMappingURL=IndicatorStep-DKaB2dCI.mjs.map
