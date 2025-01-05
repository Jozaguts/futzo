import { useSSRContext, ref, defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { V as VBtn } from './VBtn-DMHWn55H.mjs';
import { f as _export_sfc } from './server.mjs';

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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/SecondaryBtn.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-806db297"]]);
const imageForm = ref({
  file: null,
  name: "",
  size: 0
});
const dragDropImageRef = ref();
const saveImage = (file) => {
  imageForm.value.file = file;
  imageForm.value.name = file.name;
  imageForm.value.size = file.size;
};
const removeImage = () => {
  imageForm.value.file = null;
  imageForm.value.name = "";
  imageForm.value.size = 0;
};

export { __nuxt_component_0 as _, dragDropImageRef as d, imageForm as i, removeImage as r, saveImage as s };
//# sourceMappingURL=useImage-DPZTaPxR.mjs.map
