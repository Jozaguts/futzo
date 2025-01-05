import { useSSRContext, defineComponent, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { f as _export_sfc, aD as useRoute$1, ax as VSelect } from './server.mjs';
import { _ as __nuxt_component_0 } from './PrimaryBtn-nUUkLYF8.mjs';

const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(ssrRenderComponent(VSelect, mergeProps({
    class: "app-bar-secondary-btn mr-4",
    width: "170",
    "item-title": "text",
    density: "compact",
    "item-value": "value",
    "model-value": "Marcar como",
    variant: "outlined",
    items: [
      { value: "creado", text: "Creado" },
      { value: "en curso", text: "En curso" },
      { value: "completado", text: "Completado" },
      { value: "cancelado", text: "Cancelado" }
    ]
  }, _attrs), null, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/torneo/mark-as-input.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const MarkAsInput = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "show-calendar-btn",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PrimaryBtn = __nuxt_component_0;
      _push(ssrRenderComponent(_component_PrimaryBtn, mergeProps({
        variant: "elevated",
        icon: "futzo-icon:calendar-white",
        text: "Ver calendario",
        disabled: unref(route).name === "torneos-torneo-calendario",
        onClick: ($event) => _ctx.$router.push({
          name: "torneos-torneo-calendario",
          params: { torneo: unref(route).params.torneo }
        })
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/torneo/show-calendar-btn.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "app-bar-btn",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex mr-8" }, _attrs))}>`);
      _push(ssrRenderComponent(MarkAsInput, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/torneo/app-bar-btn.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=app-bar-btn-D4ThrI64.mjs.map
