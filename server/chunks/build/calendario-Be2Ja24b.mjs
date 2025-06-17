import { defineComponent, withCtx, defineAsyncComponent, createVNode, computed, unref, mergeProps, createTextVNode, toDisplayString, ref, resolveDirective, createBlock, openBlock, Fragment, renderList, withDirectives, createCommentVNode, isRef, mergeModels, useModel, watch, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _sfc_main$2$1, a as _sfc_main$a } from './AppBar-BcqMvHzz.mjs';
import { _ as __nuxt_component_0 } from './index-DkcY5wU8.mjs';
import { _ as _export_sfc, z as VMenu, A as VList, b5 as VListSubheader, B as VListItem, D as VListItemTitle, a9 as VAvatar, y as useSanctumClient, C as VTextField, af as VSelect, aH as VChip, V as VCard, F as VCardText, aP as VChipGroup } from './server.mjs';
import { j as useScheduleStore, e as useTournamentStore } from './useScheduleStore-DBhAIDF3.mjs';
import { storeToRefs } from 'pinia';
import { u as useDebounceFn } from './index-DU0YTrEL.mjs';
import { V as VSheet } from './VSheet-DVv3ytGE.mjs';
import { V as VBtn } from './VBtn-_od1f1mx.mjs';
import { _ as _sfc_main$b } from './Dialog-BzXGl2GM.mjs';
import { _ as _sfc_main$c } from './BaseCalendarInput-D8pdf43z.mjs';
import { u as useToast } from './useToast-m9XhiEp3.mjs';
import { V as VContainer } from './VContainer-C0Se5csP.mjs';
import { V as VRow, a as VCol } from './VRow-CwLG7ojV.mjs';
import { V as VEmptyState } from './VEmptyState-BP9R9rJP.mjs';
import { _ as __nuxt_component_0$1 } from './TransitionFade--XplpbbK.mjs';
import { V as VInfiniteScroll } from './VInfiniteScroll-CjZ9ti7M.mjs';
import './layout-Bel3IrLG.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'node:module';
import 'ipx';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'perfect-scrollbar';
import 'deep-pick-omit';
import 'dayjs';
import 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/es.js';
import 'awesome-phonenumber';
import '@vue/reactivity';
import './VDialog-BeIjnChI.mjs';
import './main-BplioMC0.mjs';
import 'date-fns';
import './vue-transitions-gDOXGptb.mjs';
import '@morev/utils';

const _sfc_main$9 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_Icon = __nuxt_component_0;
  _push(ssrRenderComponent(VSelect, mergeProps({
    class: "app-bar-secondary-btn mr-4",
    "item-title": "text",
    density: "compact",
    "min-width": "200",
    "max-width": "200",
    "item-value": "value",
    "model-value": "Exportar como",
    variant: "outlined",
    items: [
      { value: "excel", text: "Excel", icon: "futzo-icon:file-type-excel" },
      { value: "image", text: "Imagen", icon: "futzo-icon:file-type-img-primary" }
    ]
  }, _attrs), {
    item: withCtx(({ props: itemProps, item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VListItem, itemProps, {
          prepend: withCtx((_, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_Icon, {
                name: item.raw.icon,
                class: "mr-2"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: item.raw.icon,
                  class: "mr-2"
                }, null, 8, ["name"])
              ];
            }
          }),
          _: 2
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VListItem, itemProps, {
            prepend: withCtx(() => [
              createVNode(_component_Icon, {
                name: item.raw.icon,
                class: "mr-2"
              }, null, 8, ["name"])
            ]),
            _: 2
          }, 1040)
        ];
      }
    }),
    selection: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="app-bar-secondary-btn__input_text"${_scopeId}>${ssrInterpolate(item.title)}</span>`);
      } else {
        return [
          createVNode("span", { class: "app-bar-secondary-btn__input_text" }, toDisplayString(item.title), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/torneo/schedule/ExportAs.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const ExportAs = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Filter",
  __ssrInlineRender: true,
  setup(__props) {
    const { schedulePagination } = storeToRefs(useScheduleStore());
    const changeHandler = async (value) => {
      useScheduleStore().schedulePagination.currentPage = 1;
      useScheduleStore().schedules.rounds = [];
      if (value == null ? void 0 : value.length) {
        return useScheduleStore().getTournamentSchedules();
      } else {
        useScheduleStore().schedulePagination.filterBy = void 0;
        await useScheduleStore().getTournamentSchedules();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VSelect, mergeProps({
        "max-width": "220",
        "min-width": "220",
        label: "Jornadas",
        class: "app-bar-secondary-btn mr-4",
        "item-title": "text",
        density: "compact",
        "item-value": "value",
        modelValue: unref(schedulePagination).filterBy,
        "onUpdate:modelValue": [($event) => unref(schedulePagination).filterBy = $event, changeHandler],
        variant: "outlined",
        "hide-selected": "",
        clearable: "",
        items: [
          { value: "programado", text: "Programadas" },
          { value: "en_progreso", text: "En progreso" },
          { value: "completado", text: "Completadas" },
          { value: "aplazado", text: "Aplazadas" },
          { value: "cancelado", text: "Canceladas" }
        ]
      }, _attrs), {
        item: withCtx(({ props: itemProps, item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VListItem, itemProps, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VListItem, itemProps, null, 16)
            ];
          }
        }),
        selection: withCtx(({ item, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="app-bar-secondary-btn__input_text"${_scopeId}>`);
            if (index < 1) {
              _push2(ssrRenderComponent(VChip, null, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  var _a, _b, _c, _d, _e, _f, _g, _h;
                  if (_push3) {
                    _push3(`${ssrInterpolate(item.title)} ${ssrInterpolate(((_b = (_a = unref(schedulePagination)) == null ? void 0 : _a.search) == null ? void 0 : _b.length) - 1 ? `+${((_d = (_c = unref(schedulePagination)) == null ? void 0 : _c.search) == null ? void 0 : _d.length) - 1}` : "")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item.title) + " " + toDisplayString(((_f = (_e = unref(schedulePagination)) == null ? void 0 : _e.search) == null ? void 0 : _f.length) - 1 ? `+${((_h = (_g = unref(schedulePagination)) == null ? void 0 : _g.search) == null ? void 0 : _h.length) - 1}` : ""), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (index === 1) {
              _push2(`<span class="text-grey text-caption align-self-center"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "app-bar-secondary-btn__input_text" }, [
                index < 1 ? (openBlock(), createBlock(VChip, { key: 0 }, {
                  default: withCtx(() => {
                    var _a, _b, _c, _d;
                    return [
                      createTextVNode(toDisplayString(item.title) + " " + toDisplayString(((_b = (_a = unref(schedulePagination)) == null ? void 0 : _a.search) == null ? void 0 : _b.length) - 1 ? `+${((_d = (_c = unref(schedulePagination)) == null ? void 0 : _c.search) == null ? void 0 : _d.length) - 1}` : ""), 1)
                    ];
                  }),
                  _: 2
                }, 1024)) : createCommentVNode("", true),
                index === 1 ? (openBlock(), createBlock("span", {
                  key: 1,
                  class: "text-grey text-caption align-self-center"
                })) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/torneo/schedule/Filter.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "SearchGame",
  __ssrInlineRender: true,
  setup(__props) {
    const { getTournamentSchedules } = useScheduleStore();
    const { schedulePagination, schedules } = storeToRefs(useScheduleStore());
    const searchHandler = useDebounceFn((value) => {
      schedules.value.rounds = [];
      schedulePagination.value.search = value;
      schedulePagination.value.currentPage = 1;
      getTournamentSchedules();
    }, 500);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VTextField, mergeProps({
        modelValue: unref(schedulePagination).search,
        "onUpdate:modelValue": [($event) => unref(schedulePagination).search = $event, unref(searchHandler)],
        "min-width": "300",
        "append-inner-icon": "mdi-magnify",
        label: "Buscar un equipo..."
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/torneo/schedule/SearchGame.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "AppBarBtn",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-md-flex d-lg-flex mr-8 d-none" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$8, null, null, _parent));
      _push(ssrRenderComponent(ExportAs, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$7, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/torneo/schedule/AppBarBtn.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    "data-name": "Layer 1",
    width: "502.7404",
    height: "453.20805",
    viewBox: "0 0 702.7404 553.20805"
  }, _attrs))}><path d="M600.861,188.88427a13.75638,13.75638,0,0,1-14.00435,13.50936H521.88735c-.23539-.006-.47082-.01208-.70625-.03017a12.81315,12.81315,0,0,1-1.8109-.24751V179.11746a4.51585,4.51585,0,0,1,2.93366-4.23149h65.04775a13.7716,13.7716,0,0,1,13.50936,13.9983Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M943.8702,173.396h-419a7.24162,7.24162,0,0,0-2.64.49,7.48111,7.48111,0,0,0-4.86,7.01v457a7.50272,7.50272,0,0,0,7.5,7.5h419a7.50272,7.50272,0,0,0,7.5-7.5v-457A7.50272,7.50272,0,0,0,943.8702,173.396Zm4.5,464.5a4.50681,4.50681,0,0,1-4.5,4.5h-419a4.50681,4.50681,0,0,1-4.5-4.5v-457a4.50677,4.50677,0,0,1,4.5-4.5h419a4.50677,4.50677,0,0,1,4.5,4.5Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><circle cx="472.85825" cy="147.17846" r="9.84302" fill="#9155fd"></circle><circle cx="513.87086" cy="147.17846" r="9.84302" fill="#9155fd"></circle><circle cx="390.83308" cy="228.5176" r="9.84302" fill="#9155fd"></circle><circle cx="431.84566" cy="228.5176" r="9.84302" fill="#9155fd"></circle><circle cx="472.85825" cy="269.18717" r="9.84302" fill="#9155fd"></circle><circle cx="513.87086" cy="269.18717" r="9.84302" fill="#9155fd"></circle><circle cx="554.88343" cy="269.18717" r="9.84302" fill="#9155fd"></circle><path d="M556.8714,180.66829a1.17006,1.17006,0,0,0-.00012,1.65463l.00012.00009,5.02283,5.02288h-12.3858a1.17006,1.17006,0,0,0,0,2.34011h12.3858l-5.02283,5.02288a1.17,1.17,0,0,0,1.65466,1.65472h0l7.02033-7.02029a1.17013,1.17013,0,0,0,0-1.65473l-7.02033-7.02029a1.17,1.17,0,0,0-1.6546,0Z" transform="translate(-248.6298 -173.39598)" fill="#fff"></path><path d="M853.51694,341.5742H589.222c-1.02264,0-1.85179-.44775-1.85179-1s.82915-1,1.85179-1H853.51694c1.02264,0,1.85179.44775,1.85179,1S854.53958,341.5742,853.51694,341.5742Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M853.51694,297.396H589.222c-1.02264,0-1.85179-.44776-1.85179-1s.82915-1,1.85179-1H853.51694c1.02264,0,1.85179.44775,1.85179,1S854.53958,297.396,853.51694,297.396Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M854.36873,382.83689H588.6075a1,1,0,0,1,0-2H854.36873a1,1,0,0,1,0,2Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M854.36873,422.83689H588.6075a1,1,0,0,1,0-2H854.36873a1,1,0,0,1,0,2Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M854.36873,463.83689H588.6075a1,1,0,0,1,0-2H854.36873a1,1,0,0,1,0,2Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M823.37022,461.77608V297.01587c0-.34237.44776-.62,1-.62s1,.27759,1,.62V461.77608c0,.34237-.44775.62-1,.62S823.37022,462.11845,823.37022,461.77608Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M782.37022,461.77608V297.01587c0-.34237.44776-.62,1-.62s1,.27759,1,.62V461.77608c0,.34237-.44775.62-1,.62S782.37022,462.11845,782.37022,461.77608Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M741.37022,461.77608V297.01587c0-.34237.44776-.62,1-.62s1,.27759,1,.62V461.77608c0,.34237-.44775.62-1,.62S741.37022,462.11845,741.37022,461.77608Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M701.37022,461.77608V297.01587c0-.34237.44776-.62,1-.62s1,.27759,1,.62V461.77608c0,.34237-.44775.62-1,.62S701.37022,462.11845,701.37022,461.77608Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M659.37021,503.61919V297.1728a1.03206,1.03206,0,0,1,2,0V503.61919a1.03206,1.03206,0,0,1-2,0Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M617.37021,503.61919V297.1728a1.03206,1.03206,0,0,1,2,0V503.61919a1.03206,1.03206,0,0,1-2,0Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M588.6075,504.83738a1,1,0,0,1-.00439-2l101.76269-.4414a1.02585,1.02585,0,0,1,1.0044.99609.99965.99965,0,0,1-.99561,1.00391l-101.76269.4414Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M663.0074,253.5742a1,1,0,0,1-.00146-2l142.72559-.17822h.00146a1,1,0,0,1,.00147,2l-142.72559.17822Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M711.33478,579.599a20.03541,20.03541,0,1,1,20.03542-20.0354A20.03541,20.03541,0,0,1,711.33478,579.599Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M719.24022,557.58729h-5.929v-5.92913a1.97639,1.97639,0,1,0-3.95279,0v5.92913h-5.92913a1.97636,1.97636,0,1,0,0,3.95272h5.92913v5.92912a1.9764,1.9764,0,1,0,3.95279,0V561.54h5.929a1.97636,1.97636,0,1,0,0-3.95272Z" transform="translate(-248.6298 -173.39598)" fill="#fff"></path><path d="M757.33478,579.599a20.03541,20.03541,0,1,1,20.03542-20.0354A20.03541,20.03541,0,0,1,757.33478,579.599Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M767.4754,568.08949l-5.21905-6.10992a8.47576,8.47576,0,1,0-2.14386,2.10907l5.08166,5.9491a1.5,1.5,0,0,0,2.28125-1.94825Zm-17.64062-11.02587a5.5,5.5,0,1,1,5.5,5.5A5.50622,5.50622,0,0,1,749.83478,557.06362Z" transform="translate(-248.6298 -173.39598)" fill="#fff"></path><path d="M663.0074,581.57469a1,1,0,0,1-.00146-2l142.72559-.17871h.00146a1,1,0,0,1,.00147,2l-142.72559.17871Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><polygon points="231.731 539.012 244.488 539.011 250.557 489.808 231.729 489.809 231.731 539.012" fill="#ffb6b6"></polygon><path d="M477.11181,708.24145v16.53h41.13v-.52a16.01268,16.01268,0,0,0-16.01-16.01l-7.52-5.7-.39.16-13.62,5.54Z" transform="translate(-248.6298 -173.39598)" fill="#2f2e41"></path><polygon points="116.468 522.427 127.885 528.117 155.266 486.788 138.415 478.39 116.468 522.427" fill="#ffb6b6"></polygon><path d="M356.67181,705.44146l36.81,18.34.23-.46a16.00178,16.00178,0,0,0-7.18006-21.47l-4.19-8.45-.44-.03-14.63995-1.13-.3-.15-2.92005-1.44995Z" transform="translate(-248.6298 -173.39598)" fill="#2f2e41"></path><path d="M489.01309,447.9418l-70.34117,2.462-.4901-.71229s-6,14-6,26c0,3.98978,2.77482,30.0849,1.36422,35.022-.17544.614,1.03161,2.11872.63578,4.978-.25685,1.85535-1.67424.42823-2,3-.23381,1.84584,2.261,2.86483,2,5-.28513,2.33265-3.71686,9.88884-4.02575,12.48364-3.28871,27.62609-7.66742,67.64781-7.66742,67.64781s-17.58656,47.10341-21.30683,47.86855c-6.24457,1.2843-10.46045,12.63861-7,15,1.64776,1.12445,22.94452,8.6886,22.94452,8.6886,1.17016.21173,4.83093-1.62445,2.49884-5.96655-.42932-.79932,2.1311,1.23489,2.55664.278.45253-1.01764-.43581-5.067.08247-6.19651,4.65427-10.14333,11.8001-24.19971,18.57183-31.41768a68.60117,68.60117,0,0,0,18.08477-38.76511l15.53252-86.1252,5.32348,24.15172,4.40493,4.35278-1.20845,10.14911.20845,9.85089,11,41s1.64972,76.56842-1,79c-1.43506,1.3169-7.52454,17.5379,4,19l20.93824-1.61542s2.8212-5.94506,1.4106-8.061-1.326-1.53833.395-5.001,1.01563-9.33,1.01563-9.33a691.2062,691.2062,0,0,0,3.24056-82.99271c-1.04968-45.503-7.41043-97.777-7.41043-98.84229a7.035,7.035,0,0,1,.5859-3.173v-2.87206l-2.7018-10.17686Z" transform="translate(-248.6298 -173.39598)" fill="#2f2e41"></path><path d="M397.946,473.527a7.9881,7.9881,0,0,1,4.13335-11.53035l-.5054-50.54134,12.46628,7.88647L412.60731,467.244A8.03141,8.03141,0,0,1,397.946,473.527Z" transform="translate(-248.6298 -173.39598)" fill="#ffb8b8"></path><path d="M400.79189,452.33985l1.06111-.05121.12643.0033,3.92606-.01388,6.46629-.0136.46836-.00667.21089.04031,2.20744.38383.09149-.59229,4.303-8.21926,3.30821-4.55059-1.2036-5.36193-2.37389-2.95682,4.032-4.88588.50936-2.41293,3.37475-15.8705L438.486,355.19294l.00085-.03159.235-1.11682L442.3597,336.944l-1.12075-4.3-1.24887-4.72087a12.90513,12.90513,0,0,0-5.21626-7.34957,12.74049,12.74049,0,0,0-3.63126-1.69607,12.47579,12.47579,0,0,0-5.08208-.41821l-.0191.00582a12.87118,12.87118,0,0,0-2.83341.68479l-.36431.14229a12.94614,12.94614,0,0,0-1.47705.71093,12.74937,12.74937,0,0,0-6.09032,7.73886l-11.85251,13.2029-2.0848,7.47085-.67043,2.39919-2.14858,12.79.032,50.33287-.38253,2.28022-.54394,12.636,2.12562,2.89656-2.40153,3.5115-.08229,1.9275-.01616.49625,3.20749,3.25711.20455,7.02485Z" transform="translate(-248.6298 -173.39598)" fill="#3f3d56"></path><path d="M412.3702,464.396c17.7608,3.07171,29.67071,1.902,37-9,9.56195-12.17578,26.95113,2.20109,41.62282,7.54655l1.74-1.88,2.96-3.19-2.72-3.08,2.72-5.94-2.27-7.33-2.9-.53.78-6.31,1.22-3.69-3.58-3.93-3.04-9.81,2.19-20.53a136.76065,136.76065,0,0,0-16.62-81.22l-8.31-7.46-3.45-3.1-4.63-8.64-4.89.57-13.24,1.53-.45,1.08-3.25,7.84-11.80651,12.68235a17.26349,17.26349,0,0,0-4.54347,13.46767h0l.34,3.42.25,2.46,1.18,11.84,4.81,48.37.36,2.57,3.87,27.81c-6.29,6.07995-6.67281,4.75343-9.34285,15.45345-.3,1.19-3.78,3.84-4,5C414.0602,452.036,412.3702,464.396,412.3702,464.396Z" transform="translate(-248.6298 -173.39598)" fill="#3f3d56"></path><circle cx="199.80163" cy="94.81348" r="22.99621" fill="#ffb6b6"></circle><path d="M424.37217,250.8985c3.08667-3.21387,8.01756-4.799,12.20446-3.27393a15.51161,15.51161,0,0,1,27.23682-3.93865,4.82342,4.82342,0,0,1,4.72067.4338,9.94565,9.94565,0,0,1,3.17717,3.74882,22.3213,22.3213,0,0,1-1.253,22.88758c.89988-1.81715-1.63041,1.31251-4.09654.49254-2.1184-.5552-10.81986-6.13479-12.99155-5.85268-2.17129.28207-2.87583-1.469-5-2-2.0805-.66544-7.39163,7.93544-8.45608,13.62644-.20169,1.07851-.69148,2.41847-1.78841,2.443-1.35089.03031-1.75538-1.90444-2.89483-2.631a2.32516,2.32516,0,0,0-3.08833.9464,3.79074,3.79074,0,0,0,.06484,3.47038,11.20262,11.20262,0,0,0,2.21817,2.82952l-.59007.32418a3.08007,3.08007,0,0,1-3.909-.26536c-2.19622.99085-8.16989-4.59728-7.3769-7.97816a37.403,37.403,0,0,1-2.693-13.01932A17.86949,17.86949,0,0,1,424.37217,250.8985Z" transform="translate(-248.6298 -173.39598)" fill="#2f2e41"></path><path d="M593.063,387.9734a7.98808,7.98808,0,0,1-10.323-6.59308l-49.3891-10.74239,10.46034-10.40123,46.38521,12.04552A8.03141,8.03141,0,0,1,593.063,387.9734Z" transform="translate(-248.6298 -173.39598)" fill="#ffb8b8"></path><path d="M459.59119,316.67451a12.88364,12.88364,0,0,0-7.80476,2.99941,12.4945,12.4945,0,0,0-2.986,3.62,12.6833,12.6833,0,0,0-1.52928,4.866l.00052.00994a12.80562,12.80562,0,0,0,6.65143,12.56148l16.26991,8.81684,2.06067,1.11444c13.86259,14.129,37.2378,21.51488,64.12858,26.41471l15.4601,4.22909,5.19727-1.929,1.25836,4.94131,5.17522.16927,2.814-.5848,5.888-2.309,1.12405-2.26145-.00052-.01,2.41648-10.72.01635-.07095-.00052-.01.56338-2.45256-3.3204-1.53647-2.88825-3.85835-5.22324.10485-4.76326.41457-1.39538-3.26441-60.35827-27.93007-12.49754-5.78866-.031-.01843-.59527-.27946L468.918,316.36964l-4.43869.14071Z" transform="translate(-248.6298 -173.39598)" fill="#3f3d56"></path><circle cx="342.85825" cy="217.17846" r="9.84302" fill="#9155fd"></circle><path d="M309.32282,719.70623A48.67524,48.67524,0,0,1,270.06358,705.061c-6.59053-6.94854-11.11322-15.89233-15.48708-24.54162-1.2732-2.51693-2.58928-5.11971-3.9282-7.61426A15.53409,15.53409,0,0,1,252.26,655.5733a15.27247,15.27247,0,0,1,16.303-5.20879l.63823.18437,5.74416,22.41411c.85694-3.34324,2.69631-10.87592,3.85784-18.25612l.09757-.61813.572.25474a78.13171,78.13171,0,0,1,16.78623,10.11535,80.52861,80.52861,0,0,1,30.11215,60.64309l.01521.697Z" transform="translate(-248.6298 -173.39598)" fill="#f2f2f2"></path><path d="M528.57049,726.29669l-278.75.30733a1.19068,1.19068,0,1,1,0-2.38136l278.75-.30734a1.19069,1.19069,0,0,1,0,2.38137Z" transform="translate(-248.6298 -173.39598)" fill="#cacaca"></path><path d="M760.8702,240.21654h-53a4.5,4.5,0,0,1,0-9h53a4.5,4.5,0,0,1,0,9Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path><path d="M927.804,202.003a11.0177,11.0177,0,1,1,11.0177-11.0177A11.01771,11.01771,0,0,1,927.804,202.003Z" transform="translate(-248.6298 -173.39598)" fill="#e6e6e6"></path></svg>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/NoCalendarSvg.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const NoCalendarSvg = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "no-calendar",
  __ssrInlineRender: true,
  setup(__props) {
    const { scheduleDialog, isLoadingSchedules, noSchedules } = storeToRefs(useScheduleStore());
    const textButton = computed(() => {
      return isLoadingSchedules.value ? "Cargando..." : "Crear calendario";
    });
    const dialogHandler = async () => {
      await useScheduleStore().settingsSchedule();
      scheduleDialog.value = !scheduleDialog.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(noSchedules)) {
        _push(ssrRenderComponent(VSheet, mergeProps({ class: "custom-v-sheet d-flex justify-center align-center fill-height" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="d-flex flex-column align-center"${_scopeId}><h2 class="card-title"${_scopeId}>No hay calendario a\xFAn</h2>`);
              _push2(ssrRenderComponent(NoCalendarSvg, null, null, _parent2, _scopeId));
              _push2(`<p class="card-sub-title"${_scopeId}>Crea un calendario para verlo aqu\xED.</p>`);
              _push2(ssrRenderComponent(VBtn, {
                color: "primary",
                variant: "elevated",
                class: "mt-4 text-body-1",
                onClick: dialogHandler
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(textButton))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(textButton)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "d-flex flex-column align-center" }, [
                  createVNode("h2", { class: "card-title" }, "No hay calendario a\xFAn"),
                  createVNode(NoCalendarSvg),
                  createVNode("p", { class: "card-sub-title" }, "Crea un calendario para verlo aqu\xED."),
                  createVNode(VBtn, {
                    color: "primary",
                    variant: "elevated",
                    class: "mt-4 text-body-1",
                    onClick: dialogHandler
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(textButton)), 1)
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/no-calendar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "re-schedule-game",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    matchId: {},
    fieldId: {},
    date: {}
  }, {
    "show": { default: false },
    "showModifiers": {}
  }),
  emits: ["update:show"],
  setup(__props) {
    const { tournamentId } = storeToRefs(useTournamentStore());
    const props = __props;
    const match = ref();
    const loading = ref(true);
    const show = useModel(__props, "show");
    const form = ref({
      field_id: props.fieldId,
      match_id: props.matchId,
      date: new Date(props.date || "").toLocaleDateString(),
      // match.details.raw_date
      day: null,
      selected_time: null
    });
    const options = ref([]);
    const fields = ref([]);
    const { getMatch } = useScheduleStore();
    const getMatchDetails = async (value) => {
      if (!value) return;
      form.value.date = value.toLocaleDateString();
      await fetchMatch();
    };
    const saveChanges = () => {
      const client = useSanctumClient();
      client(`/api/v1/admin/games/${props.matchId}/reschedule`, {
        method: "PUT",
        body: {
          date: form.value.date,
          field_id: form.value.field_id,
          selected_time: form.value.selected_time,
          day: form.value.day
        }
      }).then(async () => {
        useScheduleStore().schedulePagination.currentPage = 1;
        await useScheduleStore().getTournamentSchedules();
        useToast().toast("success", "Partido reprogramado correctamente", "El partido se ha reprogramado con \xE9xito");
        show.value = false;
      }).catch((error) => {
        useToast().toast("error", "Error al reprogramar partido", "Hubo un error al intentar reprogramar el partido. Por favor, intente nuevamente m\xE1s tarde.");
      });
    };
    const onLeaving = () => {
      show.value = false;
      options.value = [];
      form.value.date = new Date(match.details.raw_date).toLocaleDateString();
      form.value.field_id = match.details.field.id;
      form.value.selected_time = match.details.raw_date;
    };
    const fetchMatch = async () => {
      var _a, _b;
      if (!props.matchId) return;
      loading.value = true;
      try {
        match.value = await getMatch(form.value.match_id, form.value.field_id, form.value.date);
        if (((_b = (_a = match.value) == null ? void 0 : _a.options) == null ? void 0 : _b.length) > 0) {
          options.value = match.value.options[0];
          console.log(options.value);
          form.value.day = options.value.available_intervals.day;
        }
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
      }
    };
    const fetchFields = async () => {
      fields.value = await useTournamentStore().tournamentFields(
        tournamentId.value
      );
    };
    watch(() => show.value, async (isOpen) => {
      if (isOpen) {
        form.value.field_id = props.fieldId;
        form.value.date = new Date(props.date || "").toLocaleDateString();
        form.value.match_id = props.matchId;
        await fetchFields();
        await fetchMatch();
      } else {
        form.value.field_id = null;
        form.value.date = null;
        form.value.selected_time = null;
        form.value.match_id = null;
      }
    });
    watch(() => [form.value.field_id, form.value.date], ([newFieldId, newDate]) => {
      if (newFieldId && newDate && show.value) {
        getMatchDetails(new Date(newDate));
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = _sfc_main$b;
      const _component_BaseCalendarInput = _sfc_main$c;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        title: "Reprogramar partido",
        subtitle: "Modific\xE1 la fecha, hora o campo de juego para este partido. <br />\n    Los cambios se aplicar\xE1n manteniendo la jornada original.",
        "model-value": show.value,
        onLeaving,
        "icon-name": "uil:schedule",
        "min-height": "910",
        "max-height": "910"
      }, _attrs), {
        "v-card-text": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b, _c, _d, _e, _f;
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "12" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h;
                            if (_push5) {
                              _push5(`<label class="text-subtitle-2" data-v-7183fd4d${_scopeId4}>Programado:</label><p class="font-weight-bold" data-v-7183fd4d${_scopeId4}>${ssrInterpolate((_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.details) == null ? void 0 : _b2.date)} ${ssrInterpolate((_d2 = (_c2 = unref(match)) == null ? void 0 : _c2.details) == null ? void 0 : _d2.raw_time)}</p>`);
                            } else {
                              return [
                                createVNode("label", { class: "text-subtitle-2" }, "Programado:"),
                                createVNode("p", { class: "font-weight-bold" }, toDisplayString((_f2 = (_e2 = unref(match)) == null ? void 0 : _e2.details) == null ? void 0 : _f2.date) + " " + toDisplayString((_h = (_g = unref(match)) == null ? void 0 : _g.details) == null ? void 0 : _h.raw_time), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, { cols: "12" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="d-flex align-center" data-v-7183fd4d${_scopeId4}>`);
                              _push5(ssrRenderComponent(VCard, {
                                class: "flex-grow-1",
                                variant: "text",
                                border: "lg",
                                rounded: "lg",
                                width: "50%"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCardText, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h;
                                        if (_push7) {
                                          _push7(`<div class="team flex-grow-1 team_local d-flex flex-column align-center" data-v-7183fd4d${_scopeId6}>`);
                                          _push7(ssrRenderComponent(VAvatar, {
                                            image: (_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.home) == null ? void 0 : _b2.image,
                                            size: "24",
                                            class: "image"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<span class="team team_home mx-2" data-v-7183fd4d${_scopeId6}>${ssrInterpolate((_d2 = (_c2 = unref(match)) == null ? void 0 : _c2.home) == null ? void 0 : _d2.name)}</span></div>`);
                                        } else {
                                          return [
                                            createVNode("div", { class: "team flex-grow-1 team_local d-flex flex-column align-center" }, [
                                              createVNode(VAvatar, {
                                                image: (_f2 = (_e2 = unref(match)) == null ? void 0 : _e2.home) == null ? void 0 : _f2.image,
                                                size: "24",
                                                class: "image"
                                              }, null, 8, ["image"]),
                                              createVNode("span", { class: "team team_home mx-2" }, toDisplayString((_h = (_g = unref(match)) == null ? void 0 : _g.home) == null ? void 0 : _h.name), 1)
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => {
                                          var _a2, _b2, _c2, _d2;
                                          return [
                                            createVNode("div", { class: "team flex-grow-1 team_local d-flex flex-column align-center" }, [
                                              createVNode(VAvatar, {
                                                image: (_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.home) == null ? void 0 : _b2.image,
                                                size: "24",
                                                class: "image"
                                              }, null, 8, ["image"]),
                                              createVNode("span", { class: "team team_home mx-2" }, toDisplayString((_d2 = (_c2 = unref(match)) == null ? void 0 : _c2.home) == null ? void 0 : _d2.name), 1)
                                            ])
                                          ];
                                        }),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="d-flex flex-column align-center justify-center" data-v-7183fd4d${_scopeId4}><p data-v-7183fd4d${_scopeId4}>vs</p></div>`);
                              _push5(ssrRenderComponent(VCard, {
                                class: "flex-grow-1 futzo-rounded",
                                variant: "text",
                                border: "lg",
                                rounded: "lg",
                                width: "50%"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCardText, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h;
                                        if (_push7) {
                                          _push7(`<div class="team team_away d-flex flex-column align-center" data-v-7183fd4d${_scopeId6}>`);
                                          _push7(ssrRenderComponent(VAvatar, {
                                            image: (_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.away) == null ? void 0 : _b2.image,
                                            size: "24",
                                            class: "image"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<span class="team team_home mx-2" data-v-7183fd4d${_scopeId6}>${ssrInterpolate((_d2 = (_c2 = unref(match)) == null ? void 0 : _c2.away) == null ? void 0 : _d2.name)}</span></div>`);
                                        } else {
                                          return [
                                            createVNode("div", { class: "team team_away d-flex flex-column align-center" }, [
                                              createVNode(VAvatar, {
                                                image: (_f2 = (_e2 = unref(match)) == null ? void 0 : _e2.away) == null ? void 0 : _f2.image,
                                                size: "24",
                                                class: "image"
                                              }, null, 8, ["image"]),
                                              createVNode("span", { class: "team team_home mx-2" }, toDisplayString((_h = (_g = unref(match)) == null ? void 0 : _g.away) == null ? void 0 : _h.name), 1)
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => {
                                          var _a2, _b2, _c2, _d2;
                                          return [
                                            createVNode("div", { class: "team team_away d-flex flex-column align-center" }, [
                                              createVNode(VAvatar, {
                                                image: (_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.away) == null ? void 0 : _b2.image,
                                                size: "24",
                                                class: "image"
                                              }, null, 8, ["image"]),
                                              createVNode("span", { class: "team team_home mx-2" }, toDisplayString((_d2 = (_c2 = unref(match)) == null ? void 0 : _c2.away) == null ? void 0 : _d2.name), 1)
                                            ])
                                          ];
                                        }),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "d-flex align-center" }, [
                                  createVNode(VCard, {
                                    class: "flex-grow-1",
                                    variant: "text",
                                    border: "lg",
                                    rounded: "lg",
                                    width: "50%"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => {
                                          var _a2, _b2, _c2, _d2;
                                          return [
                                            createVNode("div", { class: "team flex-grow-1 team_local d-flex flex-column align-center" }, [
                                              createVNode(VAvatar, {
                                                image: (_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.home) == null ? void 0 : _b2.image,
                                                size: "24",
                                                class: "image"
                                              }, null, 8, ["image"]),
                                              createVNode("span", { class: "team team_home mx-2" }, toDisplayString((_d2 = (_c2 = unref(match)) == null ? void 0 : _c2.home) == null ? void 0 : _d2.name), 1)
                                            ])
                                          ];
                                        }),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "d-flex flex-column align-center justify-center" }, [
                                    createVNode("p", null, "vs")
                                  ]),
                                  createVNode(VCard, {
                                    class: "flex-grow-1 futzo-rounded",
                                    variant: "text",
                                    border: "lg",
                                    rounded: "lg",
                                    width: "50%"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => {
                                          var _a2, _b2, _c2, _d2;
                                          return [
                                            createVNode("div", { class: "team team_away d-flex flex-column align-center" }, [
                                              createVNode(VAvatar, {
                                                image: (_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.away) == null ? void 0 : _b2.image,
                                                size: "24",
                                                class: "image"
                                              }, null, 8, ["image"]),
                                              createVNode("span", { class: "team team_home mx-2" }, toDisplayString((_d2 = (_c2 = unref(match)) == null ? void 0 : _c2.away) == null ? void 0 : _d2.name), 1)
                                            ])
                                          ];
                                        }),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a2, _b2, _c2, _d2;
                            if (_push5) {
                              _push5(`<label class="text-subtitle-2" data-v-7183fd4d${_scopeId4}>Fecha</label>`);
                              _push5(ssrRenderComponent(_component_BaseCalendarInput, {
                                start_date: unref(form).date,
                                "onUpdate:start_date": ($event) => unref(form).date = $event,
                                multiCalendar: false,
                                minDate: (_a2 = unref(match)) == null ? void 0 : _a2.start_date,
                                "max-date": (_b2 = unref(match)) == null ? void 0 : _b2.end_date
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("label", { class: "text-subtitle-2" }, "Fecha"),
                                createVNode(_component_BaseCalendarInput, {
                                  start_date: unref(form).date,
                                  "onUpdate:start_date": ($event) => unref(form).date = $event,
                                  multiCalendar: false,
                                  minDate: (_c2 = unref(match)) == null ? void 0 : _c2.start_date,
                                  "max-date": (_d2 = unref(match)) == null ? void 0 : _d2.end_date
                                }, null, 8, ["start_date", "onUpdate:start_date", "minDate", "max-date"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<label class="text-subtitle-2" data-v-7183fd4d${_scopeId4}>Campo</label>`);
                              _push5(ssrRenderComponent(VSelect, {
                                modelValue: unref(form).field_id,
                                "onUpdate:modelValue": [($event) => unref(form).field_id = $event, getMatchDetails],
                                items: unref(fields),
                                "item-title": "name",
                                "item-value": "id",
                                label: "Selecciona un campo",
                                clearable: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("label", { class: "text-subtitle-2" }, "Campo"),
                                createVNode(VSelect, {
                                  modelValue: unref(form).field_id,
                                  "onUpdate:modelValue": [($event) => unref(form).field_id = $event, getMatchDetails],
                                  items: unref(fields),
                                  "item-title": "name",
                                  "item-value": "id",
                                  label: "Selecciona un campo",
                                  clearable: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if ((_c = (_b = (_a = unref(options)) == null ? void 0 : _a.available_intervals) == null ? void 0 : _b.hours) == null ? void 0 : _c.length) {
                          _push4(ssrRenderComponent(VCol, {
                            cols: "12",
                            md: "8",
                            lg: "8"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<label class="text-subtitle-2" data-v-7183fd4d${_scopeId4}>Horas disponibles</label>`);
                                _push5(ssrRenderComponent(VChipGroup, {
                                  modelValue: unref(form).selected_time,
                                  "onUpdate:modelValue": ($event) => unref(form).selected_time = $event,
                                  column: ""
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    var _a2, _b2, _c2, _d2;
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList((_b2 = (_a2 = unref(options)) == null ? void 0 : _a2.available_intervals) == null ? void 0 : _b2.hours, (hour) => {
                                        _push6(ssrRenderComponent(VChip, {
                                          "base-color": "primary",
                                          filter: "",
                                          value: hour,
                                          key: hour.start
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(hour.start)} - ${ssrInterpolate(hour.end)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(hour.start) + " - " + toDisplayString(hour.end), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList((_d2 = (_c2 = unref(options)) == null ? void 0 : _c2.available_intervals) == null ? void 0 : _d2.hours, (hour) => {
                                          return openBlock(), createBlock(VChip, {
                                            "base-color": "primary",
                                            filter: "",
                                            value: hour,
                                            key: hour.start
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(hour.start) + " - " + toDisplayString(hour.end), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["value"]);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode("label", { class: "text-subtitle-2" }, "Horas disponibles"),
                                  createVNode(VChipGroup, {
                                    modelValue: unref(form).selected_time,
                                    "onUpdate:modelValue": ($event) => unref(form).selected_time = $event,
                                    column: ""
                                  }, {
                                    default: withCtx(() => {
                                      var _a2, _b2;
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList((_b2 = (_a2 = unref(options)) == null ? void 0 : _a2.available_intervals) == null ? void 0 : _b2.hours, (hour) => {
                                          return openBlock(), createBlock(VChip, {
                                            "base-color": "primary",
                                            filter: "",
                                            value: hour,
                                            key: hour.start
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(hour.start) + " - " + toDisplayString(hour.end), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["value"]);
                                        }), 128))
                                      ];
                                    }),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(VCol, { cosl: "12" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VEmptyState, {
                                  size: "12\n                0",
                                  headline: "No hay horas disponibles",
                                  title: "No hay horas disponibles para la fecha seleccionada",
                                  text: "Por favor, selecciona otra fecha o campo.",
                                  image: "/futzo/logos/circular/logo-22.png"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VEmptyState, {
                                    size: "12\n                0",
                                    headline: "No hay horas disponibles",
                                    title: "No hay horas disponibles para la fecha seleccionada",
                                    text: "Por favor, selecciona otra fecha o campo.",
                                    image: "/futzo/logos/circular/logo-22.png"
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => {
                              var _a2, _b2, _c2, _d2;
                              return [
                                createVNode("label", { class: "text-subtitle-2" }, "Programado:"),
                                createVNode("p", { class: "font-weight-bold" }, toDisplayString((_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.details) == null ? void 0 : _b2.date) + " " + toDisplayString((_d2 = (_c2 = unref(match)) == null ? void 0 : _c2.details) == null ? void 0 : _d2.raw_time), 1)
                              ];
                            }),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex align-center" }, [
                                createVNode(VCard, {
                                  class: "flex-grow-1",
                                  variant: "text",
                                  border: "lg",
                                  rounded: "lg",
                                  width: "50%"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => {
                                        var _a2, _b2, _c2, _d2;
                                        return [
                                          createVNode("div", { class: "team flex-grow-1 team_local d-flex flex-column align-center" }, [
                                            createVNode(VAvatar, {
                                              image: (_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.home) == null ? void 0 : _b2.image,
                                              size: "24",
                                              class: "image"
                                            }, null, 8, ["image"]),
                                            createVNode("span", { class: "team team_home mx-2" }, toDisplayString((_d2 = (_c2 = unref(match)) == null ? void 0 : _c2.home) == null ? void 0 : _d2.name), 1)
                                          ])
                                        ];
                                      }),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "d-flex flex-column align-center justify-center" }, [
                                  createVNode("p", null, "vs")
                                ]),
                                createVNode(VCard, {
                                  class: "flex-grow-1 futzo-rounded",
                                  variant: "text",
                                  border: "lg",
                                  rounded: "lg",
                                  width: "50%"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => {
                                        var _a2, _b2, _c2, _d2;
                                        return [
                                          createVNode("div", { class: "team team_away d-flex flex-column align-center" }, [
                                            createVNode(VAvatar, {
                                              image: (_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.away) == null ? void 0 : _b2.image,
                                              size: "24",
                                              class: "image"
                                            }, null, 8, ["image"]),
                                            createVNode("span", { class: "team team_home mx-2" }, toDisplayString((_d2 = (_c2 = unref(match)) == null ? void 0 : _c2.away) == null ? void 0 : _d2.name), 1)
                                          ])
                                        ];
                                      }),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "6"
                          }, {
                            default: withCtx(() => {
                              var _a2, _b2;
                              return [
                                createVNode("label", { class: "text-subtitle-2" }, "Fecha"),
                                createVNode(_component_BaseCalendarInput, {
                                  start_date: unref(form).date,
                                  "onUpdate:start_date": ($event) => unref(form).date = $event,
                                  multiCalendar: false,
                                  minDate: (_a2 = unref(match)) == null ? void 0 : _a2.start_date,
                                  "max-date": (_b2 = unref(match)) == null ? void 0 : _b2.end_date
                                }, null, 8, ["start_date", "onUpdate:start_date", "minDate", "max-date"])
                              ];
                            }),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode("label", { class: "text-subtitle-2" }, "Campo"),
                              createVNode(VSelect, {
                                modelValue: unref(form).field_id,
                                "onUpdate:modelValue": [($event) => unref(form).field_id = $event, getMatchDetails],
                                items: unref(fields),
                                "item-title": "name",
                                "item-value": "id",
                                label: "Selecciona un campo",
                                clearable: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            _: 1
                          }),
                          ((_f = (_e = (_d = unref(options)) == null ? void 0 : _d.available_intervals) == null ? void 0 : _e.hours) == null ? void 0 : _f.length) ? (openBlock(), createBlock(VCol, {
                            key: 0,
                            cols: "12",
                            md: "8",
                            lg: "8"
                          }, {
                            default: withCtx(() => [
                              createVNode("label", { class: "text-subtitle-2" }, "Horas disponibles"),
                              createVNode(VChipGroup, {
                                modelValue: unref(form).selected_time,
                                "onUpdate:modelValue": ($event) => unref(form).selected_time = $event,
                                column: ""
                              }, {
                                default: withCtx(() => {
                                  var _a2, _b2;
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList((_b2 = (_a2 = unref(options)) == null ? void 0 : _a2.available_intervals) == null ? void 0 : _b2.hours, (hour) => {
                                      return openBlock(), createBlock(VChip, {
                                        "base-color": "primary",
                                        filter: "",
                                        value: hour,
                                        key: hour.start
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(hour.start) + " - " + toDisplayString(hour.end), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ];
                                }),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock(VCol, {
                            key: 1,
                            cosl: "12"
                          }, {
                            default: withCtx(() => [
                              createVNode(VEmptyState, {
                                size: "12\n                0",
                                headline: "No hay horas disponibles",
                                title: "No hay horas disponibles para la fecha seleccionada",
                                text: "Por favor, selecciona otra fecha o campo.",
                                image: "/futzo/logos/circular/logo-22.png"
                              })
                            ]),
                            _: 1
                          }))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VRow, null, {
                      default: withCtx(() => {
                        var _a, _b, _c;
                        return [
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => {
                              var _a2, _b2, _c2, _d;
                              return [
                                createVNode("label", { class: "text-subtitle-2" }, "Programado:"),
                                createVNode("p", { class: "font-weight-bold" }, toDisplayString((_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.details) == null ? void 0 : _b2.date) + " " + toDisplayString((_d = (_c2 = unref(match)) == null ? void 0 : _c2.details) == null ? void 0 : _d.raw_time), 1)
                              ];
                            }),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex align-center" }, [
                                createVNode(VCard, {
                                  class: "flex-grow-1",
                                  variant: "text",
                                  border: "lg",
                                  rounded: "lg",
                                  width: "50%"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => {
                                        var _a2, _b2, _c2, _d;
                                        return [
                                          createVNode("div", { class: "team flex-grow-1 team_local d-flex flex-column align-center" }, [
                                            createVNode(VAvatar, {
                                              image: (_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.home) == null ? void 0 : _b2.image,
                                              size: "24",
                                              class: "image"
                                            }, null, 8, ["image"]),
                                            createVNode("span", { class: "team team_home mx-2" }, toDisplayString((_d = (_c2 = unref(match)) == null ? void 0 : _c2.home) == null ? void 0 : _d.name), 1)
                                          ])
                                        ];
                                      }),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "d-flex flex-column align-center justify-center" }, [
                                  createVNode("p", null, "vs")
                                ]),
                                createVNode(VCard, {
                                  class: "flex-grow-1 futzo-rounded",
                                  variant: "text",
                                  border: "lg",
                                  rounded: "lg",
                                  width: "50%"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => {
                                        var _a2, _b2, _c2, _d;
                                        return [
                                          createVNode("div", { class: "team team_away d-flex flex-column align-center" }, [
                                            createVNode(VAvatar, {
                                              image: (_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.away) == null ? void 0 : _b2.image,
                                              size: "24",
                                              class: "image"
                                            }, null, 8, ["image"]),
                                            createVNode("span", { class: "team team_home mx-2" }, toDisplayString((_d = (_c2 = unref(match)) == null ? void 0 : _c2.away) == null ? void 0 : _d.name), 1)
                                          ])
                                        ];
                                      }),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "6"
                          }, {
                            default: withCtx(() => {
                              var _a2, _b2;
                              return [
                                createVNode("label", { class: "text-subtitle-2" }, "Fecha"),
                                createVNode(_component_BaseCalendarInput, {
                                  start_date: unref(form).date,
                                  "onUpdate:start_date": ($event) => unref(form).date = $event,
                                  multiCalendar: false,
                                  minDate: (_a2 = unref(match)) == null ? void 0 : _a2.start_date,
                                  "max-date": (_b2 = unref(match)) == null ? void 0 : _b2.end_date
                                }, null, 8, ["start_date", "onUpdate:start_date", "minDate", "max-date"])
                              ];
                            }),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode("label", { class: "text-subtitle-2" }, "Campo"),
                              createVNode(VSelect, {
                                modelValue: unref(form).field_id,
                                "onUpdate:modelValue": [($event) => unref(form).field_id = $event, getMatchDetails],
                                items: unref(fields),
                                "item-title": "name",
                                "item-value": "id",
                                label: "Selecciona un campo",
                                clearable: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            _: 1
                          }),
                          ((_c = (_b = (_a = unref(options)) == null ? void 0 : _a.available_intervals) == null ? void 0 : _b.hours) == null ? void 0 : _c.length) ? (openBlock(), createBlock(VCol, {
                            key: 0,
                            cols: "12",
                            md: "8",
                            lg: "8"
                          }, {
                            default: withCtx(() => [
                              createVNode("label", { class: "text-subtitle-2" }, "Horas disponibles"),
                              createVNode(VChipGroup, {
                                modelValue: unref(form).selected_time,
                                "onUpdate:modelValue": ($event) => unref(form).selected_time = $event,
                                column: ""
                              }, {
                                default: withCtx(() => {
                                  var _a2, _b2;
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList((_b2 = (_a2 = unref(options)) == null ? void 0 : _a2.available_intervals) == null ? void 0 : _b2.hours, (hour) => {
                                      return openBlock(), createBlock(VChip, {
                                        "base-color": "primary",
                                        filter: "",
                                        value: hour,
                                        key: hour.start
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(hour.start) + " - " + toDisplayString(hour.end), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ];
                                }),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock(VCol, {
                            key: 1,
                            cosl: "12"
                          }, {
                            default: withCtx(() => [
                              createVNode(VEmptyState, {
                                size: "12\n                0",
                                headline: "No hay horas disponibles",
                                title: "No hay horas disponibles para la fecha seleccionada",
                                text: "Por favor, selecciona otra fecha o campo.",
                                image: "/futzo/logos/circular/logo-22.png"
                              })
                            ]),
                            _: 1
                          }))
                        ];
                      }),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VContainer, null, {
                default: withCtx(() => [
                  createVNode(VRow, null, {
                    default: withCtx(() => {
                      var _a, _b, _c;
                      return [
                        createVNode(VCol, { cols: "12" }, {
                          default: withCtx(() => {
                            var _a2, _b2, _c2, _d;
                            return [
                              createVNode("label", { class: "text-subtitle-2" }, "Programado:"),
                              createVNode("p", { class: "font-weight-bold" }, toDisplayString((_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.details) == null ? void 0 : _b2.date) + " " + toDisplayString((_d = (_c2 = unref(match)) == null ? void 0 : _c2.details) == null ? void 0 : _d.raw_time), 1)
                            ];
                          }),
                          _: 1
                        }),
                        createVNode(VCol, { cols: "12" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex align-center" }, [
                              createVNode(VCard, {
                                class: "flex-grow-1",
                                variant: "text",
                                border: "lg",
                                rounded: "lg",
                                width: "50%"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => {
                                      var _a2, _b2, _c2, _d;
                                      return [
                                        createVNode("div", { class: "team flex-grow-1 team_local d-flex flex-column align-center" }, [
                                          createVNode(VAvatar, {
                                            image: (_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.home) == null ? void 0 : _b2.image,
                                            size: "24",
                                            class: "image"
                                          }, null, 8, ["image"]),
                                          createVNode("span", { class: "team team_home mx-2" }, toDisplayString((_d = (_c2 = unref(match)) == null ? void 0 : _c2.home) == null ? void 0 : _d.name), 1)
                                        ])
                                      ];
                                    }),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "d-flex flex-column align-center justify-center" }, [
                                createVNode("p", null, "vs")
                              ]),
                              createVNode(VCard, {
                                class: "flex-grow-1 futzo-rounded",
                                variant: "text",
                                border: "lg",
                                rounded: "lg",
                                width: "50%"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => {
                                      var _a2, _b2, _c2, _d;
                                      return [
                                        createVNode("div", { class: "team team_away d-flex flex-column align-center" }, [
                                          createVNode(VAvatar, {
                                            image: (_b2 = (_a2 = unref(match)) == null ? void 0 : _a2.away) == null ? void 0 : _b2.image,
                                            size: "24",
                                            class: "image"
                                          }, null, 8, ["image"]),
                                          createVNode("span", { class: "team team_home mx-2" }, toDisplayString((_d = (_c2 = unref(match)) == null ? void 0 : _c2.away) == null ? void 0 : _d.name), 1)
                                        ])
                                      ];
                                    }),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx(() => {
                            var _a2, _b2;
                            return [
                              createVNode("label", { class: "text-subtitle-2" }, "Fecha"),
                              createVNode(_component_BaseCalendarInput, {
                                start_date: unref(form).date,
                                "onUpdate:start_date": ($event) => unref(form).date = $event,
                                multiCalendar: false,
                                minDate: (_a2 = unref(match)) == null ? void 0 : _a2.start_date,
                                "max-date": (_b2 = unref(match)) == null ? void 0 : _b2.end_date
                              }, null, 8, ["start_date", "onUpdate:start_date", "minDate", "max-date"])
                            ];
                          }),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode("label", { class: "text-subtitle-2" }, "Campo"),
                            createVNode(VSelect, {
                              modelValue: unref(form).field_id,
                              "onUpdate:modelValue": [($event) => unref(form).field_id = $event, getMatchDetails],
                              items: unref(fields),
                              "item-title": "name",
                              "item-value": "id",
                              label: "Selecciona un campo",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ]),
                          _: 1
                        }),
                        ((_c = (_b = (_a = unref(options)) == null ? void 0 : _a.available_intervals) == null ? void 0 : _b.hours) == null ? void 0 : _c.length) ? (openBlock(), createBlock(VCol, {
                          key: 0,
                          cols: "12",
                          md: "8",
                          lg: "8"
                        }, {
                          default: withCtx(() => [
                            createVNode("label", { class: "text-subtitle-2" }, "Horas disponibles"),
                            createVNode(VChipGroup, {
                              modelValue: unref(form).selected_time,
                              "onUpdate:modelValue": ($event) => unref(form).selected_time = $event,
                              column: ""
                            }, {
                              default: withCtx(() => {
                                var _a2, _b2;
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList((_b2 = (_a2 = unref(options)) == null ? void 0 : _a2.available_intervals) == null ? void 0 : _b2.hours, (hour) => {
                                    return openBlock(), createBlock(VChip, {
                                      "base-color": "primary",
                                      filter: "",
                                      value: hour,
                                      key: hour.start
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(hour.start) + " - " + toDisplayString(hour.end), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ];
                              }),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })) : (openBlock(), createBlock(VCol, {
                          key: 1,
                          cosl: "12"
                        }, {
                          default: withCtx(() => [
                            createVNode(VEmptyState, {
                              size: "12\n                0",
                              headline: "No hay horas disponibles",
                              title: "No hay horas disponibles para la fecha seleccionada",
                              text: "Por favor, selecciona otra fecha o campo.",
                              image: "/futzo/logos/circular/logo-22.png"
                            })
                          ]),
                          _: 1
                        }))
                      ];
                    }),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              class: "ml-auto mr-4",
              variant: "elevated",
              onClick: saveChanges
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Reprogramar `);
                } else {
                  return [
                    createTextVNode(" Reprogramar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                class: "ml-auto mr-4",
                variant: "elevated",
                onClick: saveChanges
              }, {
                default: withCtx(() => [
                  createTextVNode(" Reprogramar ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/calendario/re-schedule-game.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ReScheduleGame = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-7183fd4d"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "score",
  __ssrInlineRender: true,
  props: {
    roundId: {
      type: Number,
      required: true
    },
    matchId: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    isEditable: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0
    }
  },
  emits: ["update:match"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_transition_fade = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "result result-container" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_transition_fade, {
        mode: "out-in",
        easing: {
          enter: "cubic-bezier(0.6, 0, 0.4, 2)",
          leave: "ease-out"
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.isEditable) {
              _push2(ssrRenderComponent(VTextField, {
                density: "compact",
                variant: "outlined",
                value: __props.value
              }, {
                append: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="d-flex flex-column"${_scopeId2}>`);
                    _push3(ssrRenderComponent(VBtn, {
                      onClick: ($event) => emits("update:match", "up", __props.matchId, __props.type, __props.roundId),
                      class: "mb-1",
                      color: "secondary",
                      size: "small",
                      height: "20",
                      width: "20",
                      icon: "",
                      rounded: false,
                      density: "compact"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`+ `);
                        } else {
                          return [
                            createTextVNode("+ ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VBtn, {
                      onClick: ($event) => emits("update:match", "down", __props.matchId, __props.type, __props.roundId),
                      class: "mb-1",
                      color: "secondary",
                      size: "small",
                      height: "20",
                      width: "20",
                      icon: "",
                      rounded: false,
                      density: "compact"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` - `);
                        } else {
                          return [
                            createTextVNode(" - ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "d-flex flex-column" }, [
                        createVNode(VBtn, {
                          onClick: ($event) => emits("update:match", "up", __props.matchId, __props.type, __props.roundId),
                          class: "mb-1",
                          color: "secondary",
                          size: "small",
                          height: "20",
                          width: "20",
                          icon: "",
                          rounded: false,
                          density: "compact"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("+ ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VBtn, {
                          onClick: ($event) => emits("update:match", "down", __props.matchId, __props.type, __props.roundId),
                          class: "mb-1",
                          color: "secondary",
                          size: "small",
                          height: "20",
                          width: "20",
                          icon: "",
                          rounded: false,
                          density: "compact"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" - ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<div class="result"${_scopeId}>${ssrInterpolate(__props.value)}</div>`);
            }
          } else {
            return [
              __props.isEditable ? (openBlock(), createBlock(VTextField, {
                key: 0,
                density: "compact",
                variant: "outlined",
                value: __props.value
              }, {
                append: withCtx(() => [
                  createVNode("div", { class: "d-flex flex-column" }, [
                    createVNode(VBtn, {
                      onClick: ($event) => emits("update:match", "up", __props.matchId, __props.type, __props.roundId),
                      class: "mb-1",
                      color: "secondary",
                      size: "small",
                      height: "20",
                      width: "20",
                      icon: "",
                      rounded: false,
                      density: "compact"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("+ ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(VBtn, {
                      onClick: ($event) => emits("update:match", "down", __props.matchId, __props.type, __props.roundId),
                      class: "mb-1",
                      color: "secondary",
                      size: "small",
                      height: "20",
                      width: "20",
                      icon: "",
                      rounded: false,
                      density: "compact"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" - ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                _: 1
              }, 8, ["value"])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "result"
              }, toDisplayString(__props.value), 1))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/torneo/schedule/score.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { tournamentId, loading } = storeToRefs(useTournamentStore());
    const showReScheduleDialog = ref(false);
    const matchProps = ref();
    const {
      schedulePagination,
      isLoadingSchedules,
      schedules,
      scheduleRoundStatus
    } = storeToRefs(useScheduleStore());
    const load = async ({ done }) => {
      if (schedulePagination.value.currentPage > schedulePagination.value.lastPage) {
        done("empty");
        return;
      }
      isLoadingSchedules.value = true;
      try {
        await useScheduleStore().getTournamentSchedules();
        done("ok");
      } catch (error) {
        console.error("Error cargando m\xE1s jornadas:", error);
        done("error");
      } finally {
        isLoadingSchedules.value = false;
      }
    };
    const updateMatch = (action, matchId, type, roundId) => {
      schedules.value.rounds.forEach((round) => {
        if (roundId === round.round) {
          round.matches.forEach((match) => {
            if (match.id === matchId) {
              console.log(match);
              if (action === "up") {
                match[type].goals += 1;
              } else {
                if (match[type].goals > 0) {
                  match[type].goals -= 1;
                }
              }
            }
          });
        }
      });
    };
    const editRound = (roundId) => {
      const round = schedules.value.rounds.find(
        (round2) => round2.round === roundId
      );
      if (round) {
        round.isEditable = !round.isEditable;
      }
    };
    const saveHandler = (roundId) => {
      loading.value = true;
      const round = schedules.value.rounds.find(
        (round2) => round2.round === roundId
      );
      if (round) {
        const matches = round == null ? void 0 : round.matches.map((match) => {
          return {
            id: match.id,
            home: {
              id: match.home.id,
              goals: match.home.goals
            },
            away: {
              id: match.away.id,
              goals: match.away.goals
            }
          };
        });
        const client = useSanctumClient();
        client(
          `/api/v1/admin/tournaments/${tournamentId.value}/rounds/${roundId}`,
          {
            method: "POST",
            body: {
              matches
            }
          }
        ).then(() => {
          round.isEditable = !(round == null ? void 0 : round.isEditable);
          useToast().toast("success", "Marcador", "Actualizado correctamente");
        }).catch((error) => {
          console.error(error);
        }).finally(() => loading.value = false);
      }
    };
    const statusHandler = (status, roundId) => {
      loading.value = true;
      useScheduleStore().updateStatusGame(roundId, status, tournamentId.value).then(() => {
        useToast().toast("success", "Jornada", "Actualizada correctamente");
      }).finally(() => loading.value = false);
    };
    const showMatchDetails = (matchId, fieldId, date) => {
      matchProps.value = {
        id: matchId,
        field_id: fieldId,
        date
      };
      showReScheduleDialog.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _directive_auto_animate = resolveDirective("auto-animate");
      if (unref(schedules).rounds.length) {
        _push(ssrRenderComponent(VRow, _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b, _c, _d, _e, _f;
            if (_push2) {
              _push2(ssrRenderComponent(VCol, { cols: "12" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="tournament-details"${_scopeId2}><div class="detail"${_scopeId2}><p class="text-body-1"${_scopeId2}> Torneo: <span${_scopeId2}>${ssrInterpolate(unref(schedules).tournament.name)}</span></p></div><div class="detail"${_scopeId2}><p class="text-body-1"${_scopeId2}> Categor\xEDa: <span${_scopeId2}>${ssrInterpolate(unref(schedules).tournament.category.name)}</span></p></div><div class="detail"${_scopeId2}><p class="text-body-1"${_scopeId2}> Fecha de inicio: <span${_scopeId2}>${ssrInterpolate(unref(schedules).tournament.start_date_to_string)}</span></p></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "tournament-details" }, [
                        createVNode("div", { class: "detail" }, [
                          createVNode("p", { class: "text-body-1" }, [
                            createTextVNode(" Torneo: "),
                            createVNode("span", null, toDisplayString(unref(schedules).tournament.name), 1)
                          ])
                        ]),
                        createVNode("div", { class: "detail" }, [
                          createVNode("p", { class: "text-body-1" }, [
                            createTextVNode(" Categor\xEDa: "),
                            createVNode("span", null, toDisplayString(unref(schedules).tournament.category.name), 1)
                          ])
                        ]),
                        createVNode("div", { class: "detail" }, [
                          createVNode("p", { class: "text-body-1" }, [
                            createTextVNode(" Fecha de inicio: "),
                            createVNode("span", null, toDisplayString(unref(schedules).tournament.start_date_to_string), 1)
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VCol, { cols: "12" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VSheet, { class: "futzo-rounded fill-height pa-4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VInfiniteScroll, {
                            items: unref(schedules).rounds,
                            onLoad: load,
                            height: "700"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(schedules).rounds, (item) => {
                                  _push5(ssrRenderComponent(VContainer, { fluid: "" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VRow, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VCol, {
                                                cols: "12",
                                                class: "pa-0"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`<div class="title-container"${_scopeId7}><p class="title"${_scopeId7}> Jornada: ${ssrInterpolate(item.round)} <span class="title"${_scopeId7}>Fecha: ${ssrInterpolate(item.date)}</span></p><div${ssrRenderAttrs(mergeProps({ class: "d-flex align-center" }, ssrGetDirectiveProps(_ctx, _directive_auto_animate)))}${_scopeId7}>`);
                                                    if (item.isEditable) {
                                                      _push8(ssrRenderComponent(VBtn, {
                                                        variant: "outlined",
                                                        loading: unref(loading),
                                                        onClick: () => saveHandler(item.round)
                                                      }, {
                                                        default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                          if (_push9) {
                                                            _push9(`Guardar cambios `);
                                                          } else {
                                                            return [
                                                              createTextVNode("Guardar cambios ")
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent8, _scopeId7));
                                                    } else {
                                                      _push8(`<!---->`);
                                                    }
                                                    _push8(ssrRenderComponent(VMenu, {
                                                      location: "bottom",
                                                      transition: "slide-x-transition"
                                                    }, {
                                                      activator: withCtx(({ props }, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(VBtn, mergeProps({
                                                            icon: "mdi-dots-vertical",
                                                            variant: "text"
                                                          }, { ref_for: true }, props), null, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(VBtn, mergeProps({
                                                              icon: "mdi-dots-vertical",
                                                              variant: "text"
                                                            }, { ref_for: true }, props), null, 16)
                                                          ];
                                                        }
                                                      }),
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(VList, { nav: "" }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(ssrRenderComponent(VListSubheader, null, {
                                                                  default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                    if (_push11) {
                                                                      _push11(`Actualizar`);
                                                                    } else {
                                                                      return [
                                                                        createTextVNode("Actualizar")
                                                                      ];
                                                                    }
                                                                  }),
                                                                  _: 2
                                                                }, _parent10, _scopeId9));
                                                                _push10(ssrRenderComponent(VListItem, {
                                                                  variant: "flat",
                                                                  onClick: ($event) => editRound(item.round)
                                                                }, {
                                                                  default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                    if (_push11) {
                                                                      _push11(ssrRenderComponent(VListItemTitle, { class: "px-3" }, {
                                                                        default: withCtx((_11, _push12, _parent12, _scopeId11) => {
                                                                          if (_push12) {
                                                                            _push12(`Resultados `);
                                                                          } else {
                                                                            return [
                                                                              createTextVNode("Resultados ")
                                                                            ];
                                                                          }
                                                                        }),
                                                                        _: 2
                                                                      }, _parent11, _scopeId10));
                                                                    } else {
                                                                      return [
                                                                        createVNode(VListItemTitle, { class: "px-3" }, {
                                                                          default: withCtx(() => [
                                                                            createTextVNode("Resultados ")
                                                                          ]),
                                                                          _: 1
                                                                        })
                                                                      ];
                                                                    }
                                                                  }),
                                                                  _: 2
                                                                }, _parent10, _scopeId9));
                                                              } else {
                                                                return [
                                                                  createVNode(VListSubheader, null, {
                                                                    default: withCtx(() => [
                                                                      createTextVNode("Actualizar")
                                                                    ]),
                                                                    _: 1
                                                                  }),
                                                                  createVNode(VListItem, {
                                                                    variant: "flat",
                                                                    onClick: ($event) => editRound(item.round)
                                                                  }, {
                                                                    default: withCtx(() => [
                                                                      createVNode(VListItemTitle, { class: "px-3" }, {
                                                                        default: withCtx(() => [
                                                                          createTextVNode("Resultados ")
                                                                        ]),
                                                                        _: 1
                                                                      })
                                                                    ]),
                                                                    _: 2
                                                                  }, 1032, ["onClick"])
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                          _push9(ssrRenderComponent(VList, {
                                                            density: "compact",
                                                            nav: "",
                                                            selected: item.status,
                                                            "onUpdate:selected": ($event) => item.status = $event
                                                          }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(ssrRenderComponent(VListSubheader, null, {
                                                                  default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                    if (_push11) {
                                                                      _push11(`Marcar Jornada como: `);
                                                                    } else {
                                                                      return [
                                                                        createTextVNode("Marcar Jornada como: ")
                                                                      ];
                                                                    }
                                                                  }),
                                                                  _: 2
                                                                }, _parent10, _scopeId9));
                                                                _push10(`<!--[-->`);
                                                                ssrRenderList(unref(scheduleRoundStatus), (status, index) => {
                                                                  _push10(ssrRenderComponent(VListItem, {
                                                                    active: status.value == item.status,
                                                                    key: index,
                                                                    value: status.value,
                                                                    "active-class": "text-primary",
                                                                    onClick: () => statusHandler(status.value, item.round)
                                                                  }, null, _parent10, _scopeId9));
                                                                });
                                                                _push10(`<!--]-->`);
                                                              } else {
                                                                return [
                                                                  createVNode(VListSubheader, null, {
                                                                    default: withCtx(() => [
                                                                      createTextVNode("Marcar Jornada como: ")
                                                                    ]),
                                                                    _: 1
                                                                  }),
                                                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(scheduleRoundStatus), (status, index) => {
                                                                    return openBlock(), createBlock(VListItem, {
                                                                      active: status.value == item.status,
                                                                      key: index,
                                                                      value: status.value,
                                                                      "active-class": "text-primary",
                                                                      onClick: () => statusHandler(status.value, item.round),
                                                                      textContent: toDisplayString(status.text)
                                                                    }, null, 8, ["active", "value", "onClick", "textContent"]);
                                                                  }), 128))
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(VList, { nav: "" }, {
                                                              default: withCtx(() => [
                                                                createVNode(VListSubheader, null, {
                                                                  default: withCtx(() => [
                                                                    createTextVNode("Actualizar")
                                                                  ]),
                                                                  _: 1
                                                                }),
                                                                createVNode(VListItem, {
                                                                  variant: "flat",
                                                                  onClick: ($event) => editRound(item.round)
                                                                }, {
                                                                  default: withCtx(() => [
                                                                    createVNode(VListItemTitle, { class: "px-3" }, {
                                                                      default: withCtx(() => [
                                                                        createTextVNode("Resultados ")
                                                                      ]),
                                                                      _: 1
                                                                    })
                                                                  ]),
                                                                  _: 2
                                                                }, 1032, ["onClick"])
                                                              ]),
                                                              _: 2
                                                            }, 1024),
                                                            createVNode(VList, {
                                                              density: "compact",
                                                              nav: "",
                                                              selected: item.status,
                                                              "onUpdate:selected": ($event) => item.status = $event
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(VListSubheader, null, {
                                                                  default: withCtx(() => [
                                                                    createTextVNode("Marcar Jornada como: ")
                                                                  ]),
                                                                  _: 1
                                                                }),
                                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(scheduleRoundStatus), (status, index) => {
                                                                  return openBlock(), createBlock(VListItem, {
                                                                    active: status.value == item.status,
                                                                    key: index,
                                                                    value: status.value,
                                                                    "active-class": "text-primary",
                                                                    onClick: () => statusHandler(status.value, item.round),
                                                                    textContent: toDisplayString(status.text)
                                                                  }, null, 8, ["active", "value", "onClick", "textContent"]);
                                                                }), 128))
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["selected", "onUpdate:selected"])
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(`</div></div>`);
                                                  } else {
                                                    return [
                                                      createVNode("div", { class: "title-container" }, [
                                                        createVNode("p", { class: "title" }, [
                                                          createTextVNode(" Jornada: " + toDisplayString(item.round) + " ", 1),
                                                          createVNode("span", { class: "title" }, "Fecha: " + toDisplayString(item.date), 1)
                                                        ]),
                                                        withDirectives((openBlock(), createBlock("div", { class: "d-flex align-center" }, [
                                                          item.isEditable ? (openBlock(), createBlock(VBtn, {
                                                            key: 0,
                                                            variant: "outlined",
                                                            loading: unref(loading),
                                                            onClick: () => saveHandler(item.round)
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode("Guardar cambios ")
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["loading", "onClick"])) : createCommentVNode("", true),
                                                          createVNode(VMenu, {
                                                            location: "bottom",
                                                            transition: "slide-x-transition"
                                                          }, {
                                                            activator: withCtx(({ props }) => [
                                                              createVNode(VBtn, mergeProps({
                                                                icon: "mdi-dots-vertical",
                                                                variant: "text"
                                                              }, { ref_for: true }, props), null, 16)
                                                            ]),
                                                            default: withCtx(() => [
                                                              createVNode(VList, { nav: "" }, {
                                                                default: withCtx(() => [
                                                                  createVNode(VListSubheader, null, {
                                                                    default: withCtx(() => [
                                                                      createTextVNode("Actualizar")
                                                                    ]),
                                                                    _: 1
                                                                  }),
                                                                  createVNode(VListItem, {
                                                                    variant: "flat",
                                                                    onClick: ($event) => editRound(item.round)
                                                                  }, {
                                                                    default: withCtx(() => [
                                                                      createVNode(VListItemTitle, { class: "px-3" }, {
                                                                        default: withCtx(() => [
                                                                          createTextVNode("Resultados ")
                                                                        ]),
                                                                        _: 1
                                                                      })
                                                                    ]),
                                                                    _: 2
                                                                  }, 1032, ["onClick"])
                                                                ]),
                                                                _: 2
                                                              }, 1024),
                                                              createVNode(VList, {
                                                                density: "compact",
                                                                nav: "",
                                                                selected: item.status,
                                                                "onUpdate:selected": ($event) => item.status = $event
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createVNode(VListSubheader, null, {
                                                                    default: withCtx(() => [
                                                                      createTextVNode("Marcar Jornada como: ")
                                                                    ]),
                                                                    _: 1
                                                                  }),
                                                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(scheduleRoundStatus), (status, index) => {
                                                                    return openBlock(), createBlock(VListItem, {
                                                                      active: status.value == item.status,
                                                                      key: index,
                                                                      value: status.value,
                                                                      "active-class": "text-primary",
                                                                      onClick: () => statusHandler(status.value, item.round),
                                                                      textContent: toDisplayString(status.text)
                                                                    }, null, 8, ["active", "value", "onClick", "textContent"]);
                                                                  }), 128))
                                                                ]),
                                                                _: 2
                                                              }, 1032, ["selected", "onUpdate:selected"])
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ])), [
                                                          [_directive_auto_animate]
                                                        ])
                                                      ])
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(`<!--[-->`);
                                              ssrRenderList(item.matches, (match) => {
                                                _push7(ssrRenderComponent(VCol, {
                                                  key: match.id,
                                                  cols: "12",
                                                  md: "2",
                                                  lg: "4",
                                                  class: "match-container"
                                                }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    var _a2, _b2, _c2, _d2;
                                                    if (_push8) {
                                                      _push8(`<div class="match"${_scopeId7}><div class="team home"${_scopeId7}>`);
                                                      _push8(ssrRenderComponent(VAvatar, {
                                                        image: match.home.image,
                                                        size: "24",
                                                        class: "image"
                                                      }, null, _parent8, _scopeId7));
                                                      _push8(`<span class="name d-inline-block text-truncate" style="${ssrRenderStyle({ "max-width": "150px" })}"${_scopeId7}>${ssrInterpolate(match.home.name)}</span>`);
                                                      _push8(ssrRenderComponent(_sfc_main$2, {
                                                        matchId: match.id,
                                                        roundId: item.round,
                                                        "is-editable": item.isEditable,
                                                        "onUpdate:match": updateMatch,
                                                        type: "home",
                                                        value: match.home.goals
                                                      }, null, _parent8, _scopeId7));
                                                      _push8(`</div><div class="team away"${_scopeId7}>`);
                                                      _push8(ssrRenderComponent(VAvatar, {
                                                        class: "image",
                                                        size: "24",
                                                        image: match.away.image
                                                      }, null, _parent8, _scopeId7));
                                                      _push8(`<span class="name d-inline-block text-truncate" style="${ssrRenderStyle({ "max-width": "150px" })}"${_scopeId7}>${ssrInterpolate(match.away.name)}</span>`);
                                                      _push8(ssrRenderComponent(_sfc_main$2, {
                                                        matchId: match.id,
                                                        value: match.away.goals,
                                                        roundId: item.round,
                                                        "is-editable": item.isEditable,
                                                        "onUpdate:match": updateMatch,
                                                        type: "away"
                                                      }, null, _parent8, _scopeId7));
                                                      _push8(ssrRenderComponent(_component_Icon, {
                                                        class: "flag",
                                                        name: "futzo-icon:match-polygon"
                                                      }, null, _parent8, _scopeId7));
                                                      _push8(`</div><div class="details"${_scopeId7}><p${_scopeId7}>${ssrInterpolate(match.details.date)} <span${_scopeId7}>${ssrInterpolate(match.details.raw_time)}</span></p><p${_scopeId7}>${ssrInterpolate((_a2 = match.details) == null ? void 0 : _a2.location.name)}</p><p${_scopeId7}>${ssrInterpolate((_b2 = match.details) == null ? void 0 : _b2.field.name)}</p>`);
                                                      _push8(ssrRenderComponent(VBtn, {
                                                        variant: "text",
                                                        density: "compact",
                                                        size: "small",
                                                        ripple: true,
                                                        disabled: match.status === "en_progreso" || match.status === "completado" || match.status === "cancelado",
                                                        onClick: ($event) => showMatchDetails(match.id, match.details.field.id, match.details.raw_date)
                                                      }, {
                                                        default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                          if (_push9) {
                                                            _push9(` Reprogramar `);
                                                          } else {
                                                            return [
                                                              createTextVNode(" Reprogramar ")
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent8, _scopeId7));
                                                      _push8(`</div></div>`);
                                                    } else {
                                                      return [
                                                        createVNode("div", { class: "match" }, [
                                                          createVNode("div", { class: "team home" }, [
                                                            createVNode(VAvatar, {
                                                              image: match.home.image,
                                                              size: "24",
                                                              class: "image"
                                                            }, null, 8, ["image"]),
                                                            createVNode("span", {
                                                              class: "name d-inline-block text-truncate",
                                                              style: { "max-width": "150px" }
                                                            }, toDisplayString(match.home.name), 1),
                                                            createVNode(_sfc_main$2, {
                                                              matchId: match.id,
                                                              roundId: item.round,
                                                              "is-editable": item.isEditable,
                                                              "onUpdate:match": updateMatch,
                                                              type: "home",
                                                              value: match.home.goals
                                                            }, null, 8, ["matchId", "roundId", "is-editable", "value"])
                                                          ]),
                                                          createVNode("div", { class: "team away" }, [
                                                            createVNode(VAvatar, {
                                                              class: "image",
                                                              size: "24",
                                                              image: match.away.image
                                                            }, null, 8, ["image"]),
                                                            createVNode("span", {
                                                              class: "name d-inline-block text-truncate",
                                                              style: { "max-width": "150px" }
                                                            }, toDisplayString(match.away.name), 1),
                                                            createVNode(_sfc_main$2, {
                                                              matchId: match.id,
                                                              value: match.away.goals,
                                                              roundId: item.round,
                                                              "is-editable": item.isEditable,
                                                              "onUpdate:match": updateMatch,
                                                              type: "away"
                                                            }, null, 8, ["matchId", "value", "roundId", "is-editable"]),
                                                            createVNode(_component_Icon, {
                                                              class: "flag",
                                                              name: "futzo-icon:match-polygon"
                                                            })
                                                          ]),
                                                          createVNode("div", { class: "details" }, [
                                                            createVNode("p", null, [
                                                              createTextVNode(toDisplayString(match.details.date) + " ", 1),
                                                              createVNode("span", null, toDisplayString(match.details.raw_time), 1)
                                                            ]),
                                                            createVNode("p", null, toDisplayString((_c2 = match.details) == null ? void 0 : _c2.location.name), 1),
                                                            createVNode("p", null, toDisplayString((_d2 = match.details) == null ? void 0 : _d2.field.name), 1),
                                                            createVNode(VBtn, {
                                                              variant: "text",
                                                              density: "compact",
                                                              size: "small",
                                                              ripple: true,
                                                              disabled: match.status === "en_progreso" || match.status === "completado" || match.status === "cancelado",
                                                              onClick: ($event) => showMatchDetails(match.id, match.details.field.id, match.details.raw_date)
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(" Reprogramar ")
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["disabled", "onClick"])
                                                          ])
                                                        ])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              });
                                              _push7(`<!--]-->`);
                                            } else {
                                              return [
                                                createVNode(VCol, {
                                                  cols: "12",
                                                  class: "pa-0"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "title-container" }, [
                                                      createVNode("p", { class: "title" }, [
                                                        createTextVNode(" Jornada: " + toDisplayString(item.round) + " ", 1),
                                                        createVNode("span", { class: "title" }, "Fecha: " + toDisplayString(item.date), 1)
                                                      ]),
                                                      withDirectives((openBlock(), createBlock("div", { class: "d-flex align-center" }, [
                                                        item.isEditable ? (openBlock(), createBlock(VBtn, {
                                                          key: 0,
                                                          variant: "outlined",
                                                          loading: unref(loading),
                                                          onClick: () => saveHandler(item.round)
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode("Guardar cambios ")
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["loading", "onClick"])) : createCommentVNode("", true),
                                                        createVNode(VMenu, {
                                                          location: "bottom",
                                                          transition: "slide-x-transition"
                                                        }, {
                                                          activator: withCtx(({ props }) => [
                                                            createVNode(VBtn, mergeProps({
                                                              icon: "mdi-dots-vertical",
                                                              variant: "text"
                                                            }, { ref_for: true }, props), null, 16)
                                                          ]),
                                                          default: withCtx(() => [
                                                            createVNode(VList, { nav: "" }, {
                                                              default: withCtx(() => [
                                                                createVNode(VListSubheader, null, {
                                                                  default: withCtx(() => [
                                                                    createTextVNode("Actualizar")
                                                                  ]),
                                                                  _: 1
                                                                }),
                                                                createVNode(VListItem, {
                                                                  variant: "flat",
                                                                  onClick: ($event) => editRound(item.round)
                                                                }, {
                                                                  default: withCtx(() => [
                                                                    createVNode(VListItemTitle, { class: "px-3" }, {
                                                                      default: withCtx(() => [
                                                                        createTextVNode("Resultados ")
                                                                      ]),
                                                                      _: 1
                                                                    })
                                                                  ]),
                                                                  _: 2
                                                                }, 1032, ["onClick"])
                                                              ]),
                                                              _: 2
                                                            }, 1024),
                                                            createVNode(VList, {
                                                              density: "compact",
                                                              nav: "",
                                                              selected: item.status,
                                                              "onUpdate:selected": ($event) => item.status = $event
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(VListSubheader, null, {
                                                                  default: withCtx(() => [
                                                                    createTextVNode("Marcar Jornada como: ")
                                                                  ]),
                                                                  _: 1
                                                                }),
                                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(scheduleRoundStatus), (status, index) => {
                                                                  return openBlock(), createBlock(VListItem, {
                                                                    active: status.value == item.status,
                                                                    key: index,
                                                                    value: status.value,
                                                                    "active-class": "text-primary",
                                                                    onClick: () => statusHandler(status.value, item.round),
                                                                    textContent: toDisplayString(status.text)
                                                                  }, null, 8, ["active", "value", "onClick", "textContent"]);
                                                                }), 128))
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["selected", "onUpdate:selected"])
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ])), [
                                                        [_directive_auto_animate]
                                                      ])
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                (openBlock(true), createBlock(Fragment, null, renderList(item.matches, (match) => {
                                                  return openBlock(), createBlock(VCol, {
                                                    key: match.id,
                                                    cols: "12",
                                                    md: "2",
                                                    lg: "4",
                                                    class: "match-container"
                                                  }, {
                                                    default: withCtx(() => {
                                                      var _a2, _b2;
                                                      return [
                                                        createVNode("div", { class: "match" }, [
                                                          createVNode("div", { class: "team home" }, [
                                                            createVNode(VAvatar, {
                                                              image: match.home.image,
                                                              size: "24",
                                                              class: "image"
                                                            }, null, 8, ["image"]),
                                                            createVNode("span", {
                                                              class: "name d-inline-block text-truncate",
                                                              style: { "max-width": "150px" }
                                                            }, toDisplayString(match.home.name), 1),
                                                            createVNode(_sfc_main$2, {
                                                              matchId: match.id,
                                                              roundId: item.round,
                                                              "is-editable": item.isEditable,
                                                              "onUpdate:match": updateMatch,
                                                              type: "home",
                                                              value: match.home.goals
                                                            }, null, 8, ["matchId", "roundId", "is-editable", "value"])
                                                          ]),
                                                          createVNode("div", { class: "team away" }, [
                                                            createVNode(VAvatar, {
                                                              class: "image",
                                                              size: "24",
                                                              image: match.away.image
                                                            }, null, 8, ["image"]),
                                                            createVNode("span", {
                                                              class: "name d-inline-block text-truncate",
                                                              style: { "max-width": "150px" }
                                                            }, toDisplayString(match.away.name), 1),
                                                            createVNode(_sfc_main$2, {
                                                              matchId: match.id,
                                                              value: match.away.goals,
                                                              roundId: item.round,
                                                              "is-editable": item.isEditable,
                                                              "onUpdate:match": updateMatch,
                                                              type: "away"
                                                            }, null, 8, ["matchId", "value", "roundId", "is-editable"]),
                                                            createVNode(_component_Icon, {
                                                              class: "flag",
                                                              name: "futzo-icon:match-polygon"
                                                            })
                                                          ]),
                                                          createVNode("div", { class: "details" }, [
                                                            createVNode("p", null, [
                                                              createTextVNode(toDisplayString(match.details.date) + " ", 1),
                                                              createVNode("span", null, toDisplayString(match.details.raw_time), 1)
                                                            ]),
                                                            createVNode("p", null, toDisplayString((_a2 = match.details) == null ? void 0 : _a2.location.name), 1),
                                                            createVNode("p", null, toDisplayString((_b2 = match.details) == null ? void 0 : _b2.field.name), 1),
                                                            createVNode(VBtn, {
                                                              variant: "text",
                                                              density: "compact",
                                                              size: "small",
                                                              ripple: true,
                                                              disabled: match.status === "en_progreso" || match.status === "completado" || match.status === "cancelado",
                                                              onClick: ($event) => showMatchDetails(match.id, match.details.field.id, match.details.raw_date)
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(" Reprogramar ")
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["disabled", "onClick"])
                                                          ])
                                                        ])
                                                      ];
                                                    }),
                                                    _: 2
                                                  }, 1024);
                                                }), 128))
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VRow, null, {
                                            default: withCtx(() => [
                                              createVNode(VCol, {
                                                cols: "12",
                                                class: "pa-0"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "title-container" }, [
                                                    createVNode("p", { class: "title" }, [
                                                      createTextVNode(" Jornada: " + toDisplayString(item.round) + " ", 1),
                                                      createVNode("span", { class: "title" }, "Fecha: " + toDisplayString(item.date), 1)
                                                    ]),
                                                    withDirectives((openBlock(), createBlock("div", { class: "d-flex align-center" }, [
                                                      item.isEditable ? (openBlock(), createBlock(VBtn, {
                                                        key: 0,
                                                        variant: "outlined",
                                                        loading: unref(loading),
                                                        onClick: () => saveHandler(item.round)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Guardar cambios ")
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["loading", "onClick"])) : createCommentVNode("", true),
                                                      createVNode(VMenu, {
                                                        location: "bottom",
                                                        transition: "slide-x-transition"
                                                      }, {
                                                        activator: withCtx(({ props }) => [
                                                          createVNode(VBtn, mergeProps({
                                                            icon: "mdi-dots-vertical",
                                                            variant: "text"
                                                          }, { ref_for: true }, props), null, 16)
                                                        ]),
                                                        default: withCtx(() => [
                                                          createVNode(VList, { nav: "" }, {
                                                            default: withCtx(() => [
                                                              createVNode(VListSubheader, null, {
                                                                default: withCtx(() => [
                                                                  createTextVNode("Actualizar")
                                                                ]),
                                                                _: 1
                                                              }),
                                                              createVNode(VListItem, {
                                                                variant: "flat",
                                                                onClick: ($event) => editRound(item.round)
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createVNode(VListItemTitle, { class: "px-3" }, {
                                                                    default: withCtx(() => [
                                                                      createTextVNode("Resultados ")
                                                                    ]),
                                                                    _: 1
                                                                  })
                                                                ]),
                                                                _: 2
                                                              }, 1032, ["onClick"])
                                                            ]),
                                                            _: 2
                                                          }, 1024),
                                                          createVNode(VList, {
                                                            density: "compact",
                                                            nav: "",
                                                            selected: item.status,
                                                            "onUpdate:selected": ($event) => item.status = $event
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(VListSubheader, null, {
                                                                default: withCtx(() => [
                                                                  createTextVNode("Marcar Jornada como: ")
                                                                ]),
                                                                _: 1
                                                              }),
                                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(scheduleRoundStatus), (status, index) => {
                                                                return openBlock(), createBlock(VListItem, {
                                                                  active: status.value == item.status,
                                                                  key: index,
                                                                  value: status.value,
                                                                  "active-class": "text-primary",
                                                                  onClick: () => statusHandler(status.value, item.round),
                                                                  textContent: toDisplayString(status.text)
                                                                }, null, 8, ["active", "value", "onClick", "textContent"]);
                                                              }), 128))
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["selected", "onUpdate:selected"])
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ])), [
                                                      [_directive_auto_animate]
                                                    ])
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              (openBlock(true), createBlock(Fragment, null, renderList(item.matches, (match) => {
                                                return openBlock(), createBlock(VCol, {
                                                  key: match.id,
                                                  cols: "12",
                                                  md: "2",
                                                  lg: "4",
                                                  class: "match-container"
                                                }, {
                                                  default: withCtx(() => {
                                                    var _a2, _b2;
                                                    return [
                                                      createVNode("div", { class: "match" }, [
                                                        createVNode("div", { class: "team home" }, [
                                                          createVNode(VAvatar, {
                                                            image: match.home.image,
                                                            size: "24",
                                                            class: "image"
                                                          }, null, 8, ["image"]),
                                                          createVNode("span", {
                                                            class: "name d-inline-block text-truncate",
                                                            style: { "max-width": "150px" }
                                                          }, toDisplayString(match.home.name), 1),
                                                          createVNode(_sfc_main$2, {
                                                            matchId: match.id,
                                                            roundId: item.round,
                                                            "is-editable": item.isEditable,
                                                            "onUpdate:match": updateMatch,
                                                            type: "home",
                                                            value: match.home.goals
                                                          }, null, 8, ["matchId", "roundId", "is-editable", "value"])
                                                        ]),
                                                        createVNode("div", { class: "team away" }, [
                                                          createVNode(VAvatar, {
                                                            class: "image",
                                                            size: "24",
                                                            image: match.away.image
                                                          }, null, 8, ["image"]),
                                                          createVNode("span", {
                                                            class: "name d-inline-block text-truncate",
                                                            style: { "max-width": "150px" }
                                                          }, toDisplayString(match.away.name), 1),
                                                          createVNode(_sfc_main$2, {
                                                            matchId: match.id,
                                                            value: match.away.goals,
                                                            roundId: item.round,
                                                            "is-editable": item.isEditable,
                                                            "onUpdate:match": updateMatch,
                                                            type: "away"
                                                          }, null, 8, ["matchId", "value", "roundId", "is-editable"]),
                                                          createVNode(_component_Icon, {
                                                            class: "flag",
                                                            name: "futzo-icon:match-polygon"
                                                          })
                                                        ]),
                                                        createVNode("div", { class: "details" }, [
                                                          createVNode("p", null, [
                                                            createTextVNode(toDisplayString(match.details.date) + " ", 1),
                                                            createVNode("span", null, toDisplayString(match.details.raw_time), 1)
                                                          ]),
                                                          createVNode("p", null, toDisplayString((_a2 = match.details) == null ? void 0 : _a2.location.name), 1),
                                                          createVNode("p", null, toDisplayString((_b2 = match.details) == null ? void 0 : _b2.field.name), 1),
                                                          createVNode(VBtn, {
                                                            variant: "text",
                                                            density: "compact",
                                                            size: "small",
                                                            ripple: true,
                                                            disabled: match.status === "en_progreso" || match.status === "completado" || match.status === "cancelado",
                                                            onClick: ($event) => showMatchDetails(match.id, match.details.field.id, match.details.raw_date)
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(" Reprogramar ")
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["disabled", "onClick"])
                                                        ])
                                                      ])
                                                    ];
                                                  }),
                                                  _: 2
                                                }, 1024);
                                              }), 128))
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(schedules).rounds, (item) => {
                                    return openBlock(), createBlock(VContainer, {
                                      key: item.id,
                                      fluid: ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VRow, null, {
                                          default: withCtx(() => [
                                            createVNode(VCol, {
                                              cols: "12",
                                              class: "pa-0"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "title-container" }, [
                                                  createVNode("p", { class: "title" }, [
                                                    createTextVNode(" Jornada: " + toDisplayString(item.round) + " ", 1),
                                                    createVNode("span", { class: "title" }, "Fecha: " + toDisplayString(item.date), 1)
                                                  ]),
                                                  withDirectives((openBlock(), createBlock("div", { class: "d-flex align-center" }, [
                                                    item.isEditable ? (openBlock(), createBlock(VBtn, {
                                                      key: 0,
                                                      variant: "outlined",
                                                      loading: unref(loading),
                                                      onClick: () => saveHandler(item.round)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Guardar cambios ")
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["loading", "onClick"])) : createCommentVNode("", true),
                                                    createVNode(VMenu, {
                                                      location: "bottom",
                                                      transition: "slide-x-transition"
                                                    }, {
                                                      activator: withCtx(({ props }) => [
                                                        createVNode(VBtn, mergeProps({
                                                          icon: "mdi-dots-vertical",
                                                          variant: "text"
                                                        }, { ref_for: true }, props), null, 16)
                                                      ]),
                                                      default: withCtx(() => [
                                                        createVNode(VList, { nav: "" }, {
                                                          default: withCtx(() => [
                                                            createVNode(VListSubheader, null, {
                                                              default: withCtx(() => [
                                                                createTextVNode("Actualizar")
                                                              ]),
                                                              _: 1
                                                            }),
                                                            createVNode(VListItem, {
                                                              variant: "flat",
                                                              onClick: ($event) => editRound(item.round)
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(VListItemTitle, { class: "px-3" }, {
                                                                  default: withCtx(() => [
                                                                    createTextVNode("Resultados ")
                                                                  ]),
                                                                  _: 1
                                                                })
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["onClick"])
                                                          ]),
                                                          _: 2
                                                        }, 1024),
                                                        createVNode(VList, {
                                                          density: "compact",
                                                          nav: "",
                                                          selected: item.status,
                                                          "onUpdate:selected": ($event) => item.status = $event
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(VListSubheader, null, {
                                                              default: withCtx(() => [
                                                                createTextVNode("Marcar Jornada como: ")
                                                              ]),
                                                              _: 1
                                                            }),
                                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(scheduleRoundStatus), (status, index) => {
                                                              return openBlock(), createBlock(VListItem, {
                                                                active: status.value == item.status,
                                                                key: index,
                                                                value: status.value,
                                                                "active-class": "text-primary",
                                                                onClick: () => statusHandler(status.value, item.round),
                                                                textContent: toDisplayString(status.text)
                                                              }, null, 8, ["active", "value", "onClick", "textContent"]);
                                                            }), 128))
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["selected", "onUpdate:selected"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ])), [
                                                    [_directive_auto_animate]
                                                  ])
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            (openBlock(true), createBlock(Fragment, null, renderList(item.matches, (match) => {
                                              return openBlock(), createBlock(VCol, {
                                                key: match.id,
                                                cols: "12",
                                                md: "2",
                                                lg: "4",
                                                class: "match-container"
                                              }, {
                                                default: withCtx(() => {
                                                  var _a2, _b2;
                                                  return [
                                                    createVNode("div", { class: "match" }, [
                                                      createVNode("div", { class: "team home" }, [
                                                        createVNode(VAvatar, {
                                                          image: match.home.image,
                                                          size: "24",
                                                          class: "image"
                                                        }, null, 8, ["image"]),
                                                        createVNode("span", {
                                                          class: "name d-inline-block text-truncate",
                                                          style: { "max-width": "150px" }
                                                        }, toDisplayString(match.home.name), 1),
                                                        createVNode(_sfc_main$2, {
                                                          matchId: match.id,
                                                          roundId: item.round,
                                                          "is-editable": item.isEditable,
                                                          "onUpdate:match": updateMatch,
                                                          type: "home",
                                                          value: match.home.goals
                                                        }, null, 8, ["matchId", "roundId", "is-editable", "value"])
                                                      ]),
                                                      createVNode("div", { class: "team away" }, [
                                                        createVNode(VAvatar, {
                                                          class: "image",
                                                          size: "24",
                                                          image: match.away.image
                                                        }, null, 8, ["image"]),
                                                        createVNode("span", {
                                                          class: "name d-inline-block text-truncate",
                                                          style: { "max-width": "150px" }
                                                        }, toDisplayString(match.away.name), 1),
                                                        createVNode(_sfc_main$2, {
                                                          matchId: match.id,
                                                          value: match.away.goals,
                                                          roundId: item.round,
                                                          "is-editable": item.isEditable,
                                                          "onUpdate:match": updateMatch,
                                                          type: "away"
                                                        }, null, 8, ["matchId", "value", "roundId", "is-editable"]),
                                                        createVNode(_component_Icon, {
                                                          class: "flag",
                                                          name: "futzo-icon:match-polygon"
                                                        })
                                                      ]),
                                                      createVNode("div", { class: "details" }, [
                                                        createVNode("p", null, [
                                                          createTextVNode(toDisplayString(match.details.date) + " ", 1),
                                                          createVNode("span", null, toDisplayString(match.details.raw_time), 1)
                                                        ]),
                                                        createVNode("p", null, toDisplayString((_a2 = match.details) == null ? void 0 : _a2.location.name), 1),
                                                        createVNode("p", null, toDisplayString((_b2 = match.details) == null ? void 0 : _b2.field.name), 1),
                                                        createVNode(VBtn, {
                                                          variant: "text",
                                                          density: "compact",
                                                          size: "small",
                                                          ripple: true,
                                                          disabled: match.status === "en_progreso" || match.status === "completado" || match.status === "cancelado",
                                                          onClick: ($event) => showMatchDetails(match.id, match.details.field.id, match.details.raw_date)
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(" Reprogramar ")
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["disabled", "onClick"])
                                                      ])
                                                    ])
                                                  ];
                                                }),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VInfiniteScroll, {
                              items: unref(schedules).rounds,
                              onLoad: load,
                              height: "700"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(schedules).rounds, (item) => {
                                  return openBlock(), createBlock(VContainer, {
                                    key: item.id,
                                    fluid: ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VRow, null, {
                                        default: withCtx(() => [
                                          createVNode(VCol, {
                                            cols: "12",
                                            class: "pa-0"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "title-container" }, [
                                                createVNode("p", { class: "title" }, [
                                                  createTextVNode(" Jornada: " + toDisplayString(item.round) + " ", 1),
                                                  createVNode("span", { class: "title" }, "Fecha: " + toDisplayString(item.date), 1)
                                                ]),
                                                withDirectives((openBlock(), createBlock("div", { class: "d-flex align-center" }, [
                                                  item.isEditable ? (openBlock(), createBlock(VBtn, {
                                                    key: 0,
                                                    variant: "outlined",
                                                    loading: unref(loading),
                                                    onClick: () => saveHandler(item.round)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Guardar cambios ")
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["loading", "onClick"])) : createCommentVNode("", true),
                                                  createVNode(VMenu, {
                                                    location: "bottom",
                                                    transition: "slide-x-transition"
                                                  }, {
                                                    activator: withCtx(({ props }) => [
                                                      createVNode(VBtn, mergeProps({
                                                        icon: "mdi-dots-vertical",
                                                        variant: "text"
                                                      }, { ref_for: true }, props), null, 16)
                                                    ]),
                                                    default: withCtx(() => [
                                                      createVNode(VList, { nav: "" }, {
                                                        default: withCtx(() => [
                                                          createVNode(VListSubheader, null, {
                                                            default: withCtx(() => [
                                                              createTextVNode("Actualizar")
                                                            ]),
                                                            _: 1
                                                          }),
                                                          createVNode(VListItem, {
                                                            variant: "flat",
                                                            onClick: ($event) => editRound(item.round)
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(VListItemTitle, { class: "px-3" }, {
                                                                default: withCtx(() => [
                                                                  createTextVNode("Resultados ")
                                                                ]),
                                                                _: 1
                                                              })
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["onClick"])
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(VList, {
                                                        density: "compact",
                                                        nav: "",
                                                        selected: item.status,
                                                        "onUpdate:selected": ($event) => item.status = $event
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(VListSubheader, null, {
                                                            default: withCtx(() => [
                                                              createTextVNode("Marcar Jornada como: ")
                                                            ]),
                                                            _: 1
                                                          }),
                                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(scheduleRoundStatus), (status, index) => {
                                                            return openBlock(), createBlock(VListItem, {
                                                              active: status.value == item.status,
                                                              key: index,
                                                              value: status.value,
                                                              "active-class": "text-primary",
                                                              onClick: () => statusHandler(status.value, item.round),
                                                              textContent: toDisplayString(status.text)
                                                            }, null, 8, ["active", "value", "onClick", "textContent"]);
                                                          }), 128))
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["selected", "onUpdate:selected"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ])), [
                                                  [_directive_auto_animate]
                                                ])
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          (openBlock(true), createBlock(Fragment, null, renderList(item.matches, (match) => {
                                            return openBlock(), createBlock(VCol, {
                                              key: match.id,
                                              cols: "12",
                                              md: "2",
                                              lg: "4",
                                              class: "match-container"
                                            }, {
                                              default: withCtx(() => {
                                                var _a2, _b2;
                                                return [
                                                  createVNode("div", { class: "match" }, [
                                                    createVNode("div", { class: "team home" }, [
                                                      createVNode(VAvatar, {
                                                        image: match.home.image,
                                                        size: "24",
                                                        class: "image"
                                                      }, null, 8, ["image"]),
                                                      createVNode("span", {
                                                        class: "name d-inline-block text-truncate",
                                                        style: { "max-width": "150px" }
                                                      }, toDisplayString(match.home.name), 1),
                                                      createVNode(_sfc_main$2, {
                                                        matchId: match.id,
                                                        roundId: item.round,
                                                        "is-editable": item.isEditable,
                                                        "onUpdate:match": updateMatch,
                                                        type: "home",
                                                        value: match.home.goals
                                                      }, null, 8, ["matchId", "roundId", "is-editable", "value"])
                                                    ]),
                                                    createVNode("div", { class: "team away" }, [
                                                      createVNode(VAvatar, {
                                                        class: "image",
                                                        size: "24",
                                                        image: match.away.image
                                                      }, null, 8, ["image"]),
                                                      createVNode("span", {
                                                        class: "name d-inline-block text-truncate",
                                                        style: { "max-width": "150px" }
                                                      }, toDisplayString(match.away.name), 1),
                                                      createVNode(_sfc_main$2, {
                                                        matchId: match.id,
                                                        value: match.away.goals,
                                                        roundId: item.round,
                                                        "is-editable": item.isEditable,
                                                        "onUpdate:match": updateMatch,
                                                        type: "away"
                                                      }, null, 8, ["matchId", "value", "roundId", "is-editable"]),
                                                      createVNode(_component_Icon, {
                                                        class: "flag",
                                                        name: "futzo-icon:match-polygon"
                                                      })
                                                    ]),
                                                    createVNode("div", { class: "details" }, [
                                                      createVNode("p", null, [
                                                        createTextVNode(toDisplayString(match.details.date) + " ", 1),
                                                        createVNode("span", null, toDisplayString(match.details.raw_time), 1)
                                                      ]),
                                                      createVNode("p", null, toDisplayString((_a2 = match.details) == null ? void 0 : _a2.location.name), 1),
                                                      createVNode("p", null, toDisplayString((_b2 = match.details) == null ? void 0 : _b2.field.name), 1),
                                                      createVNode(VBtn, {
                                                        variant: "text",
                                                        density: "compact",
                                                        size: "small",
                                                        ripple: true,
                                                        disabled: match.status === "en_progreso" || match.status === "completado" || match.status === "cancelado",
                                                        onClick: ($event) => showMatchDetails(match.id, match.details.field.id, match.details.raw_date)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(" Reprogramar ")
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["disabled", "onClick"])
                                                    ])
                                                  ])
                                                ];
                                              }),
                                              _: 2
                                            }, 1024);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            }, 8, ["items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VSheet, { class: "futzo-rounded fill-height pa-4" }, {
                        default: withCtx(() => [
                          createVNode(VInfiniteScroll, {
                            items: unref(schedules).rounds,
                            onLoad: load,
                            height: "700"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(schedules).rounds, (item) => {
                                return openBlock(), createBlock(VContainer, {
                                  key: item.id,
                                  fluid: ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VRow, null, {
                                      default: withCtx(() => [
                                        createVNode(VCol, {
                                          cols: "12",
                                          class: "pa-0"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "title-container" }, [
                                              createVNode("p", { class: "title" }, [
                                                createTextVNode(" Jornada: " + toDisplayString(item.round) + " ", 1),
                                                createVNode("span", { class: "title" }, "Fecha: " + toDisplayString(item.date), 1)
                                              ]),
                                              withDirectives((openBlock(), createBlock("div", { class: "d-flex align-center" }, [
                                                item.isEditable ? (openBlock(), createBlock(VBtn, {
                                                  key: 0,
                                                  variant: "outlined",
                                                  loading: unref(loading),
                                                  onClick: () => saveHandler(item.round)
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Guardar cambios ")
                                                  ]),
                                                  _: 2
                                                }, 1032, ["loading", "onClick"])) : createCommentVNode("", true),
                                                createVNode(VMenu, {
                                                  location: "bottom",
                                                  transition: "slide-x-transition"
                                                }, {
                                                  activator: withCtx(({ props }) => [
                                                    createVNode(VBtn, mergeProps({
                                                      icon: "mdi-dots-vertical",
                                                      variant: "text"
                                                    }, { ref_for: true }, props), null, 16)
                                                  ]),
                                                  default: withCtx(() => [
                                                    createVNode(VList, { nav: "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(VListSubheader, null, {
                                                          default: withCtx(() => [
                                                            createTextVNode("Actualizar")
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode(VListItem, {
                                                          variant: "flat",
                                                          onClick: ($event) => editRound(item.round)
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(VListItemTitle, { class: "px-3" }, {
                                                              default: withCtx(() => [
                                                                createTextVNode("Resultados ")
                                                              ]),
                                                              _: 1
                                                            })
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["onClick"])
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(VList, {
                                                      density: "compact",
                                                      nav: "",
                                                      selected: item.status,
                                                      "onUpdate:selected": ($event) => item.status = $event
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(VListSubheader, null, {
                                                          default: withCtx(() => [
                                                            createTextVNode("Marcar Jornada como: ")
                                                          ]),
                                                          _: 1
                                                        }),
                                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(scheduleRoundStatus), (status, index) => {
                                                          return openBlock(), createBlock(VListItem, {
                                                            active: status.value == item.status,
                                                            key: index,
                                                            value: status.value,
                                                            "active-class": "text-primary",
                                                            onClick: () => statusHandler(status.value, item.round),
                                                            textContent: toDisplayString(status.text)
                                                          }, null, 8, ["active", "value", "onClick", "textContent"]);
                                                        }), 128))
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["selected", "onUpdate:selected"])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ])), [
                                                [_directive_auto_animate]
                                              ])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        (openBlock(true), createBlock(Fragment, null, renderList(item.matches, (match) => {
                                          return openBlock(), createBlock(VCol, {
                                            key: match.id,
                                            cols: "12",
                                            md: "2",
                                            lg: "4",
                                            class: "match-container"
                                          }, {
                                            default: withCtx(() => {
                                              var _a2, _b2;
                                              return [
                                                createVNode("div", { class: "match" }, [
                                                  createVNode("div", { class: "team home" }, [
                                                    createVNode(VAvatar, {
                                                      image: match.home.image,
                                                      size: "24",
                                                      class: "image"
                                                    }, null, 8, ["image"]),
                                                    createVNode("span", {
                                                      class: "name d-inline-block text-truncate",
                                                      style: { "max-width": "150px" }
                                                    }, toDisplayString(match.home.name), 1),
                                                    createVNode(_sfc_main$2, {
                                                      matchId: match.id,
                                                      roundId: item.round,
                                                      "is-editable": item.isEditable,
                                                      "onUpdate:match": updateMatch,
                                                      type: "home",
                                                      value: match.home.goals
                                                    }, null, 8, ["matchId", "roundId", "is-editable", "value"])
                                                  ]),
                                                  createVNode("div", { class: "team away" }, [
                                                    createVNode(VAvatar, {
                                                      class: "image",
                                                      size: "24",
                                                      image: match.away.image
                                                    }, null, 8, ["image"]),
                                                    createVNode("span", {
                                                      class: "name d-inline-block text-truncate",
                                                      style: { "max-width": "150px" }
                                                    }, toDisplayString(match.away.name), 1),
                                                    createVNode(_sfc_main$2, {
                                                      matchId: match.id,
                                                      value: match.away.goals,
                                                      roundId: item.round,
                                                      "is-editable": item.isEditable,
                                                      "onUpdate:match": updateMatch,
                                                      type: "away"
                                                    }, null, 8, ["matchId", "value", "roundId", "is-editable"]),
                                                    createVNode(_component_Icon, {
                                                      class: "flag",
                                                      name: "futzo-icon:match-polygon"
                                                    })
                                                  ]),
                                                  createVNode("div", { class: "details" }, [
                                                    createVNode("p", null, [
                                                      createTextVNode(toDisplayString(match.details.date) + " ", 1),
                                                      createVNode("span", null, toDisplayString(match.details.raw_time), 1)
                                                    ]),
                                                    createVNode("p", null, toDisplayString((_a2 = match.details) == null ? void 0 : _a2.location.name), 1),
                                                    createVNode("p", null, toDisplayString((_b2 = match.details) == null ? void 0 : _b2.field.name), 1),
                                                    createVNode(VBtn, {
                                                      variant: "text",
                                                      density: "compact",
                                                      size: "small",
                                                      ripple: true,
                                                      disabled: match.status === "en_progreso" || match.status === "completado" || match.status === "cancelado",
                                                      onClick: ($event) => showMatchDetails(match.id, match.details.field.id, match.details.raw_date)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" Reprogramar ")
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["disabled", "onClick"])
                                                  ])
                                                ])
                                              ];
                                            }),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["items"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(ReScheduleGame, {
                show: unref(showReScheduleDialog),
                "onUpdate:show": ($event) => isRef(showReScheduleDialog) ? showReScheduleDialog.value = $event : null,
                "field-id": (_a = unref(matchProps)) == null ? void 0 : _a.field_id,
                "match-id": (_b = unref(matchProps)) == null ? void 0 : _b.id,
                date: (_c = unref(matchProps)) == null ? void 0 : _c.date
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(VCol, { cols: "12" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "tournament-details" }, [
                      createVNode("div", { class: "detail" }, [
                        createVNode("p", { class: "text-body-1" }, [
                          createTextVNode(" Torneo: "),
                          createVNode("span", null, toDisplayString(unref(schedules).tournament.name), 1)
                        ])
                      ]),
                      createVNode("div", { class: "detail" }, [
                        createVNode("p", { class: "text-body-1" }, [
                          createTextVNode(" Categor\xEDa: "),
                          createVNode("span", null, toDisplayString(unref(schedules).tournament.category.name), 1)
                        ])
                      ]),
                      createVNode("div", { class: "detail" }, [
                        createVNode("p", { class: "text-body-1" }, [
                          createTextVNode(" Fecha de inicio: "),
                          createVNode("span", null, toDisplayString(unref(schedules).tournament.start_date_to_string), 1)
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(VCol, { cols: "12" }, {
                  default: withCtx(() => [
                    createVNode(VSheet, { class: "futzo-rounded fill-height pa-4" }, {
                      default: withCtx(() => [
                        createVNode(VInfiniteScroll, {
                          items: unref(schedules).rounds,
                          onLoad: load,
                          height: "700"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(schedules).rounds, (item) => {
                              return openBlock(), createBlock(VContainer, {
                                key: item.id,
                                fluid: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      createVNode(VCol, {
                                        cols: "12",
                                        class: "pa-0"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "title-container" }, [
                                            createVNode("p", { class: "title" }, [
                                              createTextVNode(" Jornada: " + toDisplayString(item.round) + " ", 1),
                                              createVNode("span", { class: "title" }, "Fecha: " + toDisplayString(item.date), 1)
                                            ]),
                                            withDirectives((openBlock(), createBlock("div", { class: "d-flex align-center" }, [
                                              item.isEditable ? (openBlock(), createBlock(VBtn, {
                                                key: 0,
                                                variant: "outlined",
                                                loading: unref(loading),
                                                onClick: () => saveHandler(item.round)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Guardar cambios ")
                                                ]),
                                                _: 2
                                              }, 1032, ["loading", "onClick"])) : createCommentVNode("", true),
                                              createVNode(VMenu, {
                                                location: "bottom",
                                                transition: "slide-x-transition"
                                              }, {
                                                activator: withCtx(({ props }) => [
                                                  createVNode(VBtn, mergeProps({
                                                    icon: "mdi-dots-vertical",
                                                    variant: "text"
                                                  }, { ref_for: true }, props), null, 16)
                                                ]),
                                                default: withCtx(() => [
                                                  createVNode(VList, { nav: "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(VListSubheader, null, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Actualizar")
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode(VListItem, {
                                                        variant: "flat",
                                                        onClick: ($event) => editRound(item.round)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(VListItemTitle, { class: "px-3" }, {
                                                            default: withCtx(() => [
                                                              createTextVNode("Resultados ")
                                                            ]),
                                                            _: 1
                                                          })
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["onClick"])
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(VList, {
                                                    density: "compact",
                                                    nav: "",
                                                    selected: item.status,
                                                    "onUpdate:selected": ($event) => item.status = $event
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VListSubheader, null, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Marcar Jornada como: ")
                                                        ]),
                                                        _: 1
                                                      }),
                                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(scheduleRoundStatus), (status, index) => {
                                                        return openBlock(), createBlock(VListItem, {
                                                          active: status.value == item.status,
                                                          key: index,
                                                          value: status.value,
                                                          "active-class": "text-primary",
                                                          onClick: () => statusHandler(status.value, item.round),
                                                          textContent: toDisplayString(status.text)
                                                        }, null, 8, ["active", "value", "onClick", "textContent"]);
                                                      }), 128))
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["selected", "onUpdate:selected"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ])), [
                                              [_directive_auto_animate]
                                            ])
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      (openBlock(true), createBlock(Fragment, null, renderList(item.matches, (match) => {
                                        return openBlock(), createBlock(VCol, {
                                          key: match.id,
                                          cols: "12",
                                          md: "2",
                                          lg: "4",
                                          class: "match-container"
                                        }, {
                                          default: withCtx(() => {
                                            var _a2, _b2;
                                            return [
                                              createVNode("div", { class: "match" }, [
                                                createVNode("div", { class: "team home" }, [
                                                  createVNode(VAvatar, {
                                                    image: match.home.image,
                                                    size: "24",
                                                    class: "image"
                                                  }, null, 8, ["image"]),
                                                  createVNode("span", {
                                                    class: "name d-inline-block text-truncate",
                                                    style: { "max-width": "150px" }
                                                  }, toDisplayString(match.home.name), 1),
                                                  createVNode(_sfc_main$2, {
                                                    matchId: match.id,
                                                    roundId: item.round,
                                                    "is-editable": item.isEditable,
                                                    "onUpdate:match": updateMatch,
                                                    type: "home",
                                                    value: match.home.goals
                                                  }, null, 8, ["matchId", "roundId", "is-editable", "value"])
                                                ]),
                                                createVNode("div", { class: "team away" }, [
                                                  createVNode(VAvatar, {
                                                    class: "image",
                                                    size: "24",
                                                    image: match.away.image
                                                  }, null, 8, ["image"]),
                                                  createVNode("span", {
                                                    class: "name d-inline-block text-truncate",
                                                    style: { "max-width": "150px" }
                                                  }, toDisplayString(match.away.name), 1),
                                                  createVNode(_sfc_main$2, {
                                                    matchId: match.id,
                                                    value: match.away.goals,
                                                    roundId: item.round,
                                                    "is-editable": item.isEditable,
                                                    "onUpdate:match": updateMatch,
                                                    type: "away"
                                                  }, null, 8, ["matchId", "value", "roundId", "is-editable"]),
                                                  createVNode(_component_Icon, {
                                                    class: "flag",
                                                    name: "futzo-icon:match-polygon"
                                                  })
                                                ]),
                                                createVNode("div", { class: "details" }, [
                                                  createVNode("p", null, [
                                                    createTextVNode(toDisplayString(match.details.date) + " ", 1),
                                                    createVNode("span", null, toDisplayString(match.details.raw_time), 1)
                                                  ]),
                                                  createVNode("p", null, toDisplayString((_a2 = match.details) == null ? void 0 : _a2.location.name), 1),
                                                  createVNode("p", null, toDisplayString((_b2 = match.details) == null ? void 0 : _b2.field.name), 1),
                                                  createVNode(VBtn, {
                                                    variant: "text",
                                                    density: "compact",
                                                    size: "small",
                                                    ripple: true,
                                                    disabled: match.status === "en_progreso" || match.status === "completado" || match.status === "cancelado",
                                                    onClick: ($event) => showMatchDetails(match.id, match.details.field.id, match.details.raw_date)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Reprogramar ")
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["disabled", "onClick"])
                                                ])
                                              ])
                                            ];
                                          }),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["items"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(ReScheduleGame, {
                  show: unref(showReScheduleDialog),
                  "onUpdate:show": ($event) => isRef(showReScheduleDialog) ? showReScheduleDialog.value = $event : null,
                  "field-id": (_d = unref(matchProps)) == null ? void 0 : _d.field_id,
                  "match-id": (_e = unref(matchProps)) == null ? void 0 : _e.id,
                  date: (_f = unref(matchProps)) == null ? void 0 : _f.date
                }, null, 8, ["show", "onUpdate:show", "field-id", "match-id", "date"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/torneo/schedule/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0_lazy = defineAsyncComponent(() => import('./index-CvHU4iBx.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "calendario",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LazyPagesTorneosCalendarioDialog = __nuxt_component_0_lazy;
      _push(ssrRenderComponent(_sfc_main$2$1, _attrs, {
        "app-bar": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$a, null, {
              buttons: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$6, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$6)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$a, null, {
                buttons: withCtx(() => [
                  createVNode(_sfc_main$6)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_LazyPagesTorneosCalendarioDialog, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4),
              createVNode(_component_LazyPagesTorneosCalendarioDialog),
              createVNode(_sfc_main$1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/torneos/[torneo]/calendario.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=calendario-Be2Ja24b.mjs.map
