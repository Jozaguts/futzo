import { useSSRContext, defineComponent, mergeProps } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { f as _export_sfc, e as VTextField } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SearchInput",
  __ssrInlineRender: true,
  props: {
    placeholder: String,
    minWidth: Number
  },
  emits: ["searching"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VTextField, mergeProps({
        "min-width": __props.minWidth,
        placeholder: __props.placeholder,
        "append-inner-icon": "mdi-magnify",
        class: "search-button",
        density: "compact",
        "onUpdate:modelValue": ($event) => emits("searching", $event)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/SearchInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SearchInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7b5703f3"]]);

export { SearchInput as S };
//# sourceMappingURL=SearchInput-nqdysJSi.mjs.map
