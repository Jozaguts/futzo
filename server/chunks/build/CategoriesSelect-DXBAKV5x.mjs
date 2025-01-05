import { defineComponent, mergeModels, useModel, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { storeToRefs } from 'pinia';
import { aF as useCategoryStore, ax as VSelect } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CategoriesSelect",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    disabled: {
      type: Boolean,
      default: true
    },
    errors: {
      type: Object,
      default: () => ({
        "error-messages": []
      })
    }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const { categories } = storeToRefs(useCategoryStore());
    const modelValue = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VSelect, mergeProps({
        disabled: __props.disabled,
        "no-data-text": "No hay categor\xEDas",
        items: unref(categories),
        density: "compact",
        "item-title": "name",
        "item-value": "id",
        placeholder: "Categor\xEDa",
        "menu-icon": "mdi-chevron-down",
        modelValue: modelValue.value,
        "onUpdate:modelValue": ($event) => modelValue.value = $event
      }, __props.errors, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inputs/CategoriesSelect.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=CategoriesSelect-DXBAKV5x.mjs.map
