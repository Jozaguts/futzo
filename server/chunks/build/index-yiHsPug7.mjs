import { _ as _sfc_main$2$1, a as _sfc_main$8 } from './AppBar-BcqMvHzz.mjs';
import { defineComponent, withCtx, createVNode, unref, mergeProps, createTextVNode, isRef, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { e as useTournamentStore } from './useScheduleStore-DBhAIDF3.mjs';
import { _ as __nuxt_component_1 } from './SearchInput-CIOzfvpQ.mjs';
import { _ as _export_sfc, i as useRouter$1 } from './server.mjs';
import { storeToRefs } from 'pinia';
import { _ as __nuxt_component_0$1 } from './PrimaryBtn-B0RnAWAj.mjs';
import { g as getHeaders, _ as _sfc_main$9 } from './headers-table-CD9PI4fc.mjs';
import { _ as __nuxt_component_0 } from './index-DkcY5wU8.mjs';
import { V as VBtn } from './VBtn-_od1f1mx.mjs';
import { V as VSheet } from './VSheet-DVv3ytGE.mjs';
import { _ as _sfc_main$7 } from './index-BgGrO183.mjs';
import './layout-Bel3IrLG.mjs';
import './useToast-m9XhiEp3.mjs';
import '@vue/reactivity';
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
import 'vue-router';
import '@iconify/vue';
import 'perfect-scrollbar';
import 'deep-pick-omit';
import 'dayjs';
import 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/es.js';
import 'awesome-phonenumber';
import './VTable-BTxmY7C0.mjs';
import './filter-PqGpj4I-.mjs';
import './VTooltip-BQZt6HQd.mjs';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './TransitionSlide-d5qGX2mN.mjs';
import './vue-transitions-gDOXGptb.mjs';
import '@morev/utils';
import './BaseInput-CrKT6v3K.mjs';
import './VRow-CwLG7ojV.mjs';
import './BaseCalendarInput-D8pdf43z.mjs';
import './main-BplioMC0.mjs';
import 'date-fns';
import './drag-drop-image-DRFieU2I.mjs';
import './interval-DSlygkzF.mjs';
import './VFileInput-gw90YVbK.mjs';
import './useSchemas-CFMbNxa_.mjs';
import './vee-validate-DglmwfQ_.mjs';
import 'yup';
import './CategoriesSelect-D1ehrnKL.mjs';
import './VContainer-C0Se5csP.mjs';
import './VAutocomplete-P_wP5bep.mjs';
import './IndicatorStep-DKaB2dCI.mjs';
import './VDialog-BeIjnChI.mjs';

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "app-bar-search-input",
  __ssrInlineRender: true,
  setup(__props) {
    const { search } = storeToRefs(useTournamentStore());
    const updateSearchModel = (searchValue) => {
      search.value = searchValue;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SearchInput = __nuxt_component_1;
      _push(ssrRenderComponent(_component_SearchInput, mergeProps({
        "min-width": 300,
        placeholder: "Buscar torneo",
        class: "mr-4",
        onSearching: updateSearchModel
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/app-bar-search-input.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "app-bar-cat-btn",
  __ssrInlineRender: true,
  setup(__props) {
    const { dialog } = storeToRefs(useTournamentStore());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PrimaryBtn = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_PrimaryBtn, mergeProps({
        variant: "elevated",
        icon: "futzo-icon:plus",
        text: "Crear torneo",
        class: "mr-8",
        onClick: ($event) => dialog.value = !unref(dialog)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/app-bar-cat-btn.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "tournament-app-bar-buttons",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$6, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/tournament-app-bar-buttons.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "tournament-table",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      noTournaments,
      tournaments,
      tournamentId,
      tournament,
      pagination,
      search
    } = storeToRefs(useTournamentStore());
    const headers = getHeaders("tournaments");
    const setChipColor = (status) => {
      switch (status) {
        case "creado":
          return "warning";
        case "en curso":
          return "success";
        case "completado":
          return "primary";
        case "cancelado":
          return "error";
        default:
          return "warning";
      }
    };
    const handleShowTournament = (_tournament) => {
      tournamentId.value = _tournament.id;
      tournament.value = _tournament;
      useRouter$1().push({
        name: "torneos-torneo",
        params: { torneo: _tournament.slug }
      });
    };
    const scheduleHandler = (model) => {
      tournamentId.value = model.id;
      tournament.value = model;
      useRouter$1().push({
        name: "torneos-torneo-calendario",
        params: { torneo: model.slug }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Table = _sfc_main$9;
      const _component_Icon = __nuxt_component_0;
      if (!unref(noTournaments)) {
        _push(ssrRenderComponent(_component_Table, mergeProps({
          headers: unref(headers),
          items: unref(tournaments),
          itemKey: "name",
          search: unref(search),
          pagination: unref(pagination),
          "onUpdate:pagination": ($event) => isRef(pagination) ? pagination.value = $event : null,
          "status-handler": setChipColor,
          paginate: unref(useTournamentStore)().loadTournaments,
          "show-link": true
        }, _attrs), {
          actions: withCtx(({ item }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VBtn, {
                color: "on-background",
                size: "small",
                rounded: "md",
                variant: "outlined",
                class: "mr-2 show-calendar-btn",
                onClick: () => scheduleHandler(item)
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "futzo-icon:calendar",
                      size: "large"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        name: "futzo-icon:calendar",
                        size: "large"
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VBtn, {
                size: "small",
                rounded: "md",
                onClick: () => handleShowTournament(item)
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Ver Torneo `);
                  } else {
                    return [
                      createTextVNode("Ver Torneo ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VBtn, {
                  color: "on-background",
                  size: "small",
                  rounded: "md",
                  variant: "outlined",
                  class: "mr-2 show-calendar-btn",
                  onClick: () => scheduleHandler(item)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_Icon, {
                      name: "futzo-icon:calendar",
                      size: "large"
                    })
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                createVNode(VBtn, {
                  size: "small",
                  rounded: "md",
                  onClick: () => handleShowTournament(item)
                }, {
                  default: withCtx(() => [
                    createTextVNode("Ver Torneo ")
                  ]),
                  _: 2
                }, 1032, ["onClick"])
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/tournament-table.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const TournamentTable = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-dd119457"]]);
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    width: "225",
    height: "268",
    viewBox: "0 0 225 268",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path d="M112.5 251C174.632 251 225 200.632 225 138.5C225 76.368 174.632 26 112.5 26C50.368 26 0 76.368 0 138.5C0 200.632 50.368 251 112.5 251Z" fill="#F2EBFF"></path><g filter="url(#filter0_d_484_4376)"><path d="M177 90.5H48C43.8579 90.5 40.5 93.8579 40.5 98V255.5C40.5 259.642 43.8579 263 48 263H177C181.142 263 184.5 259.642 184.5 255.5V98C184.5 93.8579 181.142 90.5 177 90.5Z" fill="white"></path></g><path d="M97.5 113H58.5C56.0147 113 54 115.015 54 117.5C54 119.985 56.0147 122 58.5 122H97.5C99.9853 122 102 119.985 102 117.5C102 115.015 99.9853 113 97.5 113Z" fill="#D5BDFF"></path><path d="M124.5 132.5H58.5C56.0147 132.5 54 134.515 54 137C54 139.485 56.0147 141.5 58.5 141.5H124.5C126.985 141.5 129 139.485 129 137C129 134.515 126.985 132.5 124.5 132.5Z" fill="#F2EBFF"></path><path d="M97.5 153.5H58.5C56.0147 153.5 54 155.515 54 158C54 160.485 56.0147 162.5 58.5 162.5H97.5C99.9853 162.5 102 160.485 102 158C102 155.515 99.9853 153.5 97.5 153.5Z" fill="#D5BDFF"></path><path d="M124.5 173H58.5C56.0147 173 54 175.015 54 177.5C54 179.985 56.0147 182 58.5 182H124.5C126.985 182 129 179.985 129 177.5C129 175.015 126.985 173 124.5 173Z" fill="#F2EBFF"></path><path d="M97.5 194H58.5C56.0147 194 54 196.015 54 198.5C54 200.985 56.0147 203 58.5 203H97.5C99.9853 203 102 200.985 102 198.5C102 196.015 99.9853 194 97.5 194Z" fill="#D5BDFF"></path><path d="M124.5 213.5H58.5C56.0147 213.5 54 215.515 54 218C54 220.485 56.0147 222.5 58.5 222.5H124.5C126.985 222.5 129 220.485 129 218C129 215.515 126.985 213.5 124.5 213.5Z" fill="#F2EBFF"></path><g filter="url(#filter1_d_484_4376)"><path d="M177 14H48C43.8579 14 40.5 17.3579 40.5 21.5V66.5C40.5 70.6421 43.8579 74 48 74H177C181.142 74 184.5 70.6421 184.5 66.5V21.5C184.5 17.3579 181.142 14 177 14Z" fill="#9155FD"></path></g><path d="M97.5 30.5H58.5C56.0147 30.5 54 32.5147 54 35C54 37.4853 56.0147 39.5 58.5 39.5H97.5C99.9853 39.5 102 37.4853 102 35C102 32.5147 99.9853 30.5 97.5 30.5Z" fill="#D5BDFF"></path><path d="M124.5 50H58.5C56.0147 50 54 52.0147 54 54.5C54 56.9853 56.0147 59 58.5 59H124.5C126.985 59 129 56.9853 129 54.5C129 52.0147 126.985 50 124.5 50Z" fill="white"></path><defs><filter id="filter0_d_484_4376" x="31.5" y="77" width="162" height="190.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="-4.5"></feOffset><feGaussianBlur stdDeviation="4.5"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0.788235 0 0 0 0 0.803922 0 0 0 0 0.85098 0 0 0 0.349 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_484_4376"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_484_4376" result="shape"></feBlend></filter><filter id="filter1_d_484_4376" x="31.5" y="0.5" width="162" height="78" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="-4.5"></feOffset><feGaussianBlur stdDeviation="4.5"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0.788235 0 0 0 0 0.803922 0 0 0 0 0.85098 0 0 0 0.349 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_484_4376"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_484_4376" result="shape"></feBlend></filter></defs></svg>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/NoTournamentsSvg.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const NoTournamentsSvg = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "no-tournament",
  __ssrInlineRender: true,
  setup(__props) {
    const { noTournaments, dialog } = storeToRefs(useTournamentStore());
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(noTournaments)) {
        _push(ssrRenderComponent(VSheet, mergeProps({ class: "custom-v-sheet d-flex justify-center align-center fill-height" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="d-flex flex-column align-center"${_scopeId}><h2 class="card-title"${_scopeId}>No hay torneos a\xFAn</h2>`);
              _push2(ssrRenderComponent(NoTournamentsSvg, null, null, _parent2, _scopeId));
              _push2(`<p class="card-sub-title"${_scopeId}>Crea un torneo para verlo aqu\xED.</p>`);
              _push2(ssrRenderComponent(VBtn, {
                color: "primary",
                variant: "elevated",
                class: "mt-4 text-body-1",
                onClick: ($event) => dialog.value = !unref(dialog)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Crear Torneo `);
                  } else {
                    return [
                      createTextVNode(" Crear Torneo ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "d-flex flex-column align-center" }, [
                  createVNode("h2", { class: "card-title" }, "No hay torneos a\xFAn"),
                  createVNode(NoTournamentsSvg),
                  createVNode("p", { class: "card-sub-title" }, "Crea un torneo para verlo aqu\xED."),
                  createVNode(VBtn, {
                    color: "primary",
                    variant: "elevated",
                    class: "mt-4 text-body-1",
                    onClick: ($event) => dialog.value = !unref(dialog)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Crear Torneo ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/no-tournament.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageLayout = _sfc_main$2$1;
      _push(ssrRenderComponent(_component_PageLayout, _attrs, {
        "app-bar": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$8, null, {
              buttons: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$4, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$4)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$8, null, {
                buttons: withCtx(() => [
                  createVNode(_sfc_main$4)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(TournamentTable, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1),
              createVNode(TournamentTable),
              createVNode(_sfc_main$7)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/torneos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-yiHsPug7.mjs.map
