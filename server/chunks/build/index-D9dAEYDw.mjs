import { _ as _sfc_main$2$1, a as _sfc_main$d } from './AppBar-BcqMvHzz.mjs';
import { defineComponent, withCtx, createVNode, computed, unref, mergeProps, createTextVNode, isRef, ref, createBlock, createCommentVNode, openBlock, useModel, mergeModels, watch, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { a as useTeamStore, e as useTournamentStore } from './useScheduleStore-DBhAIDF3.mjs';
import { _ as __nuxt_component_1 } from './SearchInput-CIOzfvpQ.mjs';
import { _ as _export_sfc, V as VCard, af as VSelect, f as VCardItem, H as VDivider, F as VCardText, ae as useAutoAnimate } from './server.mjs';
import { storeToRefs } from 'pinia';
import { _ as _sfc_main$g } from './SecondaryBtn-CVJutODn.mjs';
import { _ as __nuxt_component_0$1 } from './PrimaryBtn-B0RnAWAj.mjs';
import { V as VSheet } from './VSheet-DVv3ytGE.mjs';
import { V as VBtn, a as VProgressCircular } from './VBtn-_od1f1mx.mjs';
import { _ as _sfc_main$6$1, a as _sfc_main$f } from './index-F4o0OShX.mjs';
import { V as VDialog } from './VDialog-BeIjnChI.mjs';
import { g as getHeaders, _ as _sfc_main$e } from './headers-table-CD9PI4fc.mjs';
import { _ as __nuxt_component_0 } from './index-DkcY5wU8.mjs';
import { u as useDropZone } from './index-B5yclgZ6.mjs';
import { V as VFileInput } from './VFileInput-gw90YVbK.mjs';
import { _ as __nuxt_component_0$2 } from './TransitionFade--XplpbbK.mjs';
import { s as setInterval } from './interval-DSlygkzF.mjs';
import { V as VContainer } from './VContainer-C0Se5csP.mjs';
import { V as VRow, a as VCol } from './VRow-CwLG7ojV.mjs';
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
import './TransitionSlide-d5qGX2mN.mjs';
import './vue-transitions-gDOXGptb.mjs';
import '@morev/utils';
import './CategoriesSelect-D1ehrnKL.mjs';
import './drag-drop-image-DRFieU2I.mjs';
import './useSchemas-CFMbNxa_.mjs';
import './vee-validate-DglmwfQ_.mjs';
import 'yup';
import './googleSearch-Dzva-T1R.mjs';
import './index-DU0YTrEL.mjs';
import './VAutocomplete-P_wP5bep.mjs';
import './filter-PqGpj4I-.mjs';
import './IndicatorStep-DKaB2dCI.mjs';
import './VTable-BTxmY7C0.mjs';
import './VTooltip-BQZt6HQd.mjs';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "app-bar-search-input",
  __ssrInlineRender: true,
  setup(__props) {
    const { search } = storeToRefs(useTeamStore());
    const updateSearchModel = (searchValue) => {
      search.value = searchValue;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SearchInput = __nuxt_component_1;
      _push(ssrRenderComponent(_component_SearchInput, mergeProps({
        "min-width": 300,
        placeholder: "Buscar un Equipo",
        class: "mr-4",
        onSearching: updateSearchModel
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/app-bar-search-input.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "import-btn",
  __ssrInlineRender: true,
  setup(__props) {
    const { importModal } = storeToRefs(useTeamStore());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SecondaryBtn = _sfc_main$g;
      _push(ssrRenderComponent(_component_SecondaryBtn, mergeProps({
        text: "Importar Equipos",
        class: "mr-4",
        onClick: () => importModal.value = !unref(importModal)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/import-btn.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "app-bar-cat-btn",
  __ssrInlineRender: true,
  setup(__props) {
    const { dialog } = storeToRefs(useTeamStore());
    const toggleDialog = () => {
      dialog.value = !dialog.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PrimaryBtn = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_PrimaryBtn, mergeProps({
        variant: "elevated",
        text: "Crear Equipo",
        icon: "futzo-icon:plus",
        class: "mr-8",
        onClick: toggleDialog
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/app-bar-cat-btn.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "team-navbar-buttons",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$c, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$b, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$a, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/team-navbar-buttons.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    width: "355",
    height: "251",
    viewBox: "0 0 355 251",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path d="M287.319 0.510742H74.7655C64.983 0.510742 57.0527 8.44102 57.0527 18.2235V230.777C57.0527 240.559 64.983 248.489 74.7655 248.489H287.319C297.101 248.489 305.031 240.559 305.031 230.777V18.2235C305.031 8.44102 297.101 0.510742 287.319 0.510742Z" fill="url(#paint0_linear_1337_5140)"></path><g filter="url(#filter0_d_1337_5140)"><path d="M96.0224 96.1592H335.145C337.494 96.1592 339.746 97.0923 341.407 98.7532C343.068 100.414 344.001 102.667 344.001 105.016V149.297C344.001 151.646 343.068 153.899 341.407 155.56C339.746 157.221 337.494 158.154 335.145 158.154H96.0224C93.6735 158.154 91.4209 157.221 89.76 155.56C88.0991 153.899 87.166 151.646 87.166 149.297V105.016C87.166 102.667 88.0991 100.414 89.76 98.7532C91.4209 97.0923 93.6735 96.1592 96.0224 96.1592V96.1592Z" fill="white"></path></g><path d="M227.096 110.33H181.042C178.108 110.33 175.729 112.709 175.729 115.643C175.729 118.578 178.108 120.957 181.042 120.957H227.096C230.03 120.957 232.409 118.578 232.409 115.643C232.409 112.709 230.03 110.33 227.096 110.33Z" fill="#CCB1FE"></path><path d="M258.979 133.356H181.042C178.108 133.356 175.729 135.736 175.729 138.67C175.729 141.605 178.108 143.984 181.042 143.984H258.979C261.913 143.984 264.292 141.605 264.292 138.67C264.292 135.736 261.913 133.356 258.979 133.356Z" fill="#F4EEFF"></path><path d="M141.188 143.984C150.482 143.984 158.016 136.451 158.016 127.157C158.016 117.864 150.482 110.33 141.188 110.33C131.895 110.33 124.361 117.864 124.361 127.157C124.361 136.451 131.895 143.984 141.188 143.984Z" fill="#9155FD"></path><path d="M132.438 122.712H134.089L136.96 129.721H137.066L139.936 122.712H141.587V131.729H140.293V125.204H140.209L137.55 131.716H136.476L133.816 125.199H133.732V131.729H132.438V122.712ZM143.566 131.729V122.712H146.78C147.481 122.712 148.062 122.839 148.523 123.095C148.984 123.35 149.329 123.699 149.558 124.143C149.787 124.583 149.901 125.079 149.901 125.631C149.901 126.186 149.786 126.685 149.554 127.128C149.325 127.568 148.978 127.917 148.515 128.176C148.054 128.431 147.474 128.559 146.775 128.559H144.565V127.405H146.652C147.095 127.405 147.455 127.329 147.731 127.176C148.007 127.021 148.209 126.809 148.338 126.542C148.468 126.275 148.532 125.971 148.532 125.631C148.532 125.29 148.468 124.988 148.338 124.724C148.209 124.46 148.005 124.253 147.726 124.103C147.45 123.953 147.086 123.878 146.634 123.878H144.926V131.729H143.566Z" fill="white"></path><g filter="url(#filter1_d_1337_5140)"><path d="M19.8564 172.325H258.979C261.328 172.325 263.58 173.258 265.241 174.919C266.902 176.58 267.835 178.832 267.835 181.181V225.463C267.835 227.812 266.902 230.065 265.241 231.725C263.58 233.386 261.328 234.319 258.979 234.319H19.8564C17.5075 234.319 15.2549 233.386 13.594 231.725C11.9331 230.065 11 227.812 11 225.463V181.181C11 178.832 11.9331 176.58 13.594 174.919C15.2549 173.258 17.5075 172.325 19.8564 172.325V172.325Z" fill="white"></path></g><path d="M150.93 186.495H104.876C101.942 186.495 99.5625 188.874 99.5625 191.809C99.5625 194.744 101.942 197.123 104.876 197.123H150.93C153.864 197.123 156.243 194.744 156.243 191.809C156.243 188.874 153.864 186.495 150.93 186.495Z" fill="#CCB1FE"></path><path d="M182.812 209.521H104.876C101.942 209.521 99.5625 211.901 99.5625 214.835C99.5625 217.77 101.942 220.149 104.876 220.149H182.812C185.747 220.149 188.126 217.77 188.126 214.835C188.126 211.901 185.747 209.521 182.812 209.521Z" fill="#F4EEFF"></path><path d="M41.999 220.149C51.2924 220.149 58.8261 212.616 58.8261 203.322C58.8261 194.029 51.2924 186.495 41.999 186.495C32.7056 186.495 25.1719 194.029 25.1719 203.322C25.1719 212.616 32.7056 220.149 41.999 220.149Z" fill="#9155FD"></path><path d="M38.5228 198.877H39.879V205.27C39.879 205.848 39.7645 206.343 39.5355 206.754C39.3095 207.165 38.991 207.479 38.5801 207.696C38.1691 207.91 37.6877 208.017 37.1359 208.017C36.6281 208.017 36.1716 207.925 35.7665 207.74C35.3644 207.555 35.0459 207.286 34.8111 206.934C34.5792 206.579 34.4632 206.148 34.4632 205.64H35.815C35.815 205.889 35.8722 206.105 35.9867 206.287C36.1041 206.469 36.2641 206.611 36.4666 206.714C36.6721 206.814 36.9069 206.864 37.1711 206.864C37.4588 206.864 37.7024 206.804 37.902 206.683C38.1046 206.56 38.2587 206.379 38.3643 206.142C38.47 205.904 38.5228 205.613 38.5228 205.27V198.877ZM46.7774 201.245C46.7305 200.829 46.5367 200.506 46.1962 200.277C45.8557 200.045 45.4272 199.929 44.9105 199.929C44.5407 199.929 44.2207 199.988 43.9507 200.105C43.6806 200.22 43.4707 200.378 43.321 200.581C43.1743 200.78 43.1009 201.008 43.1009 201.263C43.1009 201.477 43.1508 201.662 43.2506 201.818C43.3533 201.973 43.4869 202.104 43.6513 202.21C43.8186 202.312 43.9976 202.399 44.1884 202.47C44.3792 202.537 44.5627 202.593 44.7388 202.637L45.6194 202.866C45.9071 202.936 46.2021 203.032 46.5044 203.152C46.8068 203.272 47.0871 203.431 47.3454 203.628C47.6037 203.824 47.8121 204.068 47.9706 204.358C48.1321 204.649 48.2128 204.997 48.2128 205.402C48.2128 205.913 48.0807 206.366 47.8165 206.762C47.5553 207.159 47.1752 207.471 46.6762 207.7C46.1801 207.929 45.5798 208.044 44.8753 208.044C44.2002 208.044 43.616 207.937 43.1229 207.722C42.6298 207.508 42.2438 207.204 41.9649 206.811C41.686 206.415 41.5319 205.945 41.5026 205.402H42.8675C42.8939 205.728 42.9996 205.999 43.1845 206.216C43.3724 206.431 43.6116 206.591 43.9022 206.696C44.1958 206.799 44.5172 206.851 44.8665 206.851C45.251 206.851 45.593 206.79 45.8924 206.67C46.1948 206.547 46.4325 206.376 46.6057 206.159C46.7789 205.939 46.8655 205.682 46.8655 205.389C46.8655 205.122 46.7892 204.903 46.6365 204.733C46.4868 204.562 46.2828 204.422 46.0245 204.31C45.7691 204.198 45.48 204.1 45.1571 204.015L44.0916 203.724C43.3695 203.528 42.7971 203.239 42.3744 202.857C41.9546 202.475 41.7448 201.97 41.7448 201.342C41.7448 200.823 41.8857 200.369 42.1674 199.982C42.4492 199.594 42.8308 199.293 43.3122 199.079C43.7936 198.862 44.3367 198.753 44.9414 198.753C45.5519 198.753 46.0905 198.86 46.5573 199.075C47.0269 199.289 47.3968 199.584 47.6668 199.96C47.9369 200.333 48.0778 200.761 48.0895 201.245H46.7774Z" fill="white"></path><g filter="url(#filter2_d_1337_5140)"><path d="M258.979 19.9946H19.8564C14.9651 19.9946 11 23.9598 11 28.851V73.1329C11 78.0242 14.9651 81.9893 19.8564 81.9893H258.979C263.87 81.9893 267.835 78.0242 267.835 73.1329V28.851C267.835 23.9598 263.87 19.9946 258.979 19.9946Z" fill="white"></path></g><path d="M147.389 34.165H101.335C98.4006 34.165 96.0215 36.5441 96.0215 39.4789C96.0215 42.4136 98.4006 44.7927 101.335 44.7927H147.389C150.323 44.7927 152.702 42.4136 152.702 39.4789C152.702 36.5441 150.323 34.165 147.389 34.165Z" fill="#CCB1FE"></path><path d="M179.271 57.1914H101.335C98.4006 57.1914 96.0215 59.5705 96.0215 62.5052C96.0215 65.44 98.4006 67.8191 101.335 67.8191H179.271C182.206 67.8191 184.585 65.44 184.585 62.5052C184.585 59.5705 182.206 57.1914 179.271 57.1914Z" fill="#F4EEFF"></path><path d="M65.0224 67.8188C74.3158 67.8188 81.8496 60.285 81.8496 50.9917C81.8496 41.6983 74.3158 34.1646 65.0224 34.1646C55.7291 34.1646 48.1953 41.6983 48.1953 50.9917C48.1953 60.285 55.7291 67.8188 65.0224 67.8188Z" fill="#9155FD"></path><path d="M62.9596 48.9149C62.9127 48.4981 62.719 48.1752 62.3784 47.9462C62.0379 47.7143 61.6094 47.5984 61.0928 47.5984C60.7229 47.5984 60.403 47.6571 60.1329 47.7745C59.8629 47.889 59.653 48.0475 59.5033 48.25C59.3565 48.4496 59.2831 48.6771 59.2831 48.9325C59.2831 49.1468 59.333 49.3317 59.4328 49.4873C59.5356 49.6429 59.6691 49.7735 59.8335 49.8792C60.0008 49.9819 60.1799 50.0685 60.3707 50.1389C60.5615 50.2065 60.7449 50.2622 60.921 50.3063L61.8017 50.5352C62.0893 50.6057 62.3843 50.7011 62.6867 50.8214C62.989 50.9418 63.2693 51.1003 63.5276 51.2969C63.786 51.4936 63.9944 51.7372 64.1529 52.0278C64.3143 52.3184 64.395 52.6663 64.395 53.0714C64.395 53.5821 64.2629 54.0356 63.9988 54.4319C63.7375 54.8282 63.3574 55.1408 62.8584 55.3697C62.3623 55.5987 61.762 55.7132 61.0575 55.7132C60.3824 55.7132 59.7983 55.606 59.3051 55.3918C58.812 55.1775 58.426 54.8737 58.1471 54.4803C57.8683 54.0841 57.7142 53.6144 57.6848 53.0714H59.0498C59.0762 53.3972 59.1818 53.6687 59.3668 53.8859C59.5546 54.1002 59.7939 54.2602 60.0845 54.3659C60.378 54.4686 60.6994 54.52 61.0487 54.52C61.4333 54.52 61.7752 54.4598 62.0746 54.3394C62.377 54.2161 62.6147 54.0459 62.7879 53.8287C62.9611 53.6085 63.0477 53.3517 63.0477 53.0582C63.0477 52.791 62.9714 52.5724 62.8188 52.4021C62.669 52.2318 62.465 52.091 62.2067 51.9794C61.9514 51.8679 61.6622 51.7695 61.3393 51.6844L60.2738 51.3938C59.5517 51.1971 58.9793 50.908 58.5566 50.5264C58.1369 50.1448 57.927 49.6399 57.927 49.0118C57.927 48.4922 58.0679 48.0387 58.3497 47.6512C58.6315 47.2638 59.0131 46.9629 59.4945 46.7486C59.9759 46.5314 60.5189 46.4228 61.1236 46.4228C61.7341 46.4228 62.2728 46.5299 62.7395 46.7442C63.2092 46.9585 63.579 47.2535 63.8491 47.6292C64.1191 48.002 64.26 48.4306 64.2718 48.9149H62.9596ZM68.9401 55.5635H66.0209V46.5461H69.0325C69.9161 46.5461 70.6749 46.7266 71.3089 47.0876C71.9429 47.4458 72.4287 47.9609 72.7663 48.6331C73.1068 49.3024 73.2771 50.1052 73.2771 51.0416C73.2771 51.9809 73.1053 52.7881 72.7619 53.4632C72.4214 54.1384 71.9283 54.6579 71.2825 55.0219C70.6367 55.383 69.8559 55.5635 68.9401 55.5635ZM67.3814 54.3747H68.8652C69.5521 54.3747 70.123 54.2455 70.578 53.9872C71.033 53.7259 71.3735 53.3488 71.5995 52.8556C71.8255 52.3595 71.9385 51.7549 71.9385 51.0416C71.9385 50.3341 71.8255 49.7339 71.5995 49.2407C71.3764 48.7476 71.0432 48.3733 70.6 48.118C70.1568 47.8626 69.6064 47.7349 68.9489 47.7349H67.3814V54.3747Z" fill="white"></path><defs><filter id="filter0_d_1337_5140" x="76.5384" y="90.8453" width="278.091" height="83.2499" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="5.31383"></feOffset><feGaussianBlur stdDeviation="5.31383"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1337_5140"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1337_5140" result="shape"></feBlend></filter><filter id="filter1_d_1337_5140" x="0.37234" y="167.011" width="278.091" height="83.2499" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="5.31383"></feOffset><feGaussianBlur stdDeviation="5.31383"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1337_5140"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1337_5140" result="shape"></feBlend></filter><filter id="filter2_d_1337_5140" x="0.37234" y="14.6808" width="278.091" height="83.2499" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="5.31383"></feOffset><feGaussianBlur stdDeviation="5.31383"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1337_5140"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1337_5140" result="shape"></feBlend></filter><linearGradient id="paint0_linear_1337_5140" x1="181.042" y1="0.510742" x2="181.042" y2="248.489" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#F4EEFF"></stop><stop offset="1" stop-color="#FCFAFF"></stop></linearGradient></defs></svg>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/noTeamsSvg.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const NoTeamsSvg = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "NoTeams",
  __ssrInlineRender: true,
  setup(__props) {
    const { dialog, teams } = storeToRefs(useTeamStore());
    const toggleDialog = () => {
      dialog.value = !dialog.value;
    };
    const noTeams = computed(() => {
      var _a;
      return ((_a = teams.value) == null ? void 0 : _a.length) === 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(noTeams)) {
        _push(ssrRenderComponent(VSheet, mergeProps({ class: "no-teams-v-sheet d-flex justify-center align-center fill-height" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="d-flex flex-column align-center"${_scopeId}><h2 class="card-title"${_scopeId}>No hay equipos a\xFAn</h2>`);
              _push2(ssrRenderComponent(NoTeamsSvg, null, null, _parent2, _scopeId));
              _push2(`<p class="card-sub-title"${_scopeId}>Crea un torneo para verlo aqu\xED.</p>`);
              _push2(ssrRenderComponent(VBtn, {
                color: "primary",
                variant: "elevated",
                class: "mt-4 text-body-1",
                onClick: toggleDialog
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Crear Equipo `);
                  } else {
                    return [
                      createTextVNode(" Crear Equipo ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "d-flex flex-column align-center" }, [
                  createVNode("h2", { class: "card-title" }, "No hay equipos a\xFAn"),
                  createVNode(NoTeamsSvg),
                  createVNode("p", { class: "card-sub-title" }, "Crea un torneo para verlo aqu\xED."),
                  createVNode(VBtn, {
                    color: "primary",
                    variant: "elevated",
                    class: "mt-4 text-body-1",
                    onClick: toggleDialog
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Crear Equipo ")
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/NoTeams.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const teamStore = useTeamStore();
    const { steps, isEdition, teamStoreRequest } = storeToRefs(teamStore);
    const leaveHandler = () => {
      steps.value.current = "createTeam";
      steps.value.completed = [];
      isEdition.value = false;
      teamStoreRequest.value = {};
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        modelValue: unref(teamStore).dialog,
        "onUpdate:modelValue": ($event) => unref(teamStore).dialog = $event,
        "max-width": "690",
        onAfterLeave: leaveHandler,
        scrollable: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, {
              class: "create-tournament-card futzo-rounded",
              style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$6$1, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$f, {
                    step: unref(steps).current
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$6$1),
                    createVNode(_sfc_main$f, {
                      step: unref(steps).current
                    }, null, 8, ["step"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, {
                class: "create-tournament-card futzo-rounded",
                style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$6$1),
                  createVNode(_sfc_main$f, {
                    step: unref(steps).current
                  }, null, 8, ["step"])
                ]),
                _: 1
              }, 8, ["style"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/CreateTeamDialog/index.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "teams-table",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      teams,
      teamId,
      isEdition,
      pagination,
      dialog,
      teamStoreRequest,
      search
    } = storeToRefs(useTeamStore());
    const headers = getHeaders("teams");
    const showTeamHandler = (_team) => {
      const { president, coach, ...team } = _team;
      teamId.value = _team.id;
      isEdition.value = true;
      teamStoreRequest.value = {
        team: {
          id: team.id,
          name: team.name,
          tournament_id: team.tournament.id,
          category_id: team.category.id,
          address: team == null ? void 0 : team.address,
          colors: team == null ? void 0 : team.colors,
          description: team == null ? void 0 : team.description,
          email: team == null ? void 0 : team.email,
          image: team == null ? void 0 : team.image,
          phone: team == null ? void 0 : team.phone
        },
        president: { ...president, image: president == null ? void 0 : president.image },
        coach: { ...coach, image: coach == null ? void 0 : coach.image }
      };
      dialog.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Table = _sfc_main$e;
      if ((_a = unref(teams)) == null ? void 0 : _a.length) {
        _push(ssrRenderComponent(_component_Table, mergeProps({
          headers: unref(headers),
          "show-index": true,
          items: unref(teams),
          itemKey: "name",
          search: unref(search),
          pagination: unref(pagination),
          "onUpdate:pagination": ($event) => isRef(pagination) ? pagination.value = $event : null,
          paginate: unref(useTeamStore)().getTeams,
          "custom-name": true
        }, _attrs), {
          actions: withCtx(({ item }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VBtn, {
                size: "small",
                rounded: "md",
                onClick: ($event) => showTeamHandler(item)
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Ver Equipo `);
                  } else {
                    return [
                      createTextVNode("Ver Equipo ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VBtn, {
                  size: "small",
                  rounded: "md",
                  onClick: ($event) => showTeamHandler(item)
                }, {
                  default: withCtx(() => [
                    createTextVNode("Ver Equipo ")
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/teams-table.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VCardItem, null, {
        prepend: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VSheet, {
              border: "primary thin",
              class: "mx-auto d-flex justify-center align-center mr-2 rounded-lg",
              height: "45",
              width: "45"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, { name: "futzo-icon:file" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, { name: "futzo-icon:file" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VSheet, {
                border: "primary thin",
                class: "mx-auto d-flex justify-center align-center mr-2 rounded-lg",
                height: "45",
                width: "45"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, { name: "futzo-icon:file" })
                ]),
                _: 1
              })
            ];
          }
        }),
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class=""${_scopeId}>Importar XLS</span>`);
          } else {
            return [
              createVNode("span", { class: "" }, "Importar XLS")
            ];
          }
        }),
        subtitle: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Importa tu documento .xls/x o descarga la plantilla y arr\xE1stralo aqu\xED para `);
          } else {
            return [
              createTextVNode("Importa tu documento .xls/x o descarga la plantilla y arr\xE1stralo aqu\xED para ")
            ];
          }
        }),
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "futzo-icon:x-dialog",
              onClick: () => emits("close")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, {
                name: "futzo-icon:x-dialog",
                onClick: () => emits("close")
              }, null, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VDivider, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/import-dialog/header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  props: {
    "file": {},
    "fileModifiers": {}
  },
  emits: ["update:file"],
  setup(__props) {
    const dropZoneRef = ref();
    const refInputFile = ref();
    const file = useModel(__props, "file");
    useDropZone(dropZoneRef, {});
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(ssrRenderComponent(VCardText, mergeProps({
        ref_key: "dropZoneRef",
        ref: dropZoneRef,
        onDragover: () => {
        },
        onDrop: () => {
        },
        class: "pb-2"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="import-form-container" data-v-a289c9eb${_scopeId}><div class="icon-container" data-v-a289c9eb${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "futzo-icon:upload",
              size: "24"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="cta-container" data-v-a289c9eb${_scopeId}><button class="btn" data-v-a289c9eb${_scopeId}> Clic para subir archivo </button><span data-v-a289c9eb${_scopeId}> o arrastra y suelta</span><p class="conditions" data-v-a289c9eb${_scopeId}>XLS o XLSX (tama\xF1o m\xE1ximo 8MB)</p>`);
            _push2(ssrRenderComponent(VFileInput, {
              modelValue: file.value,
              "onUpdate:modelValue": ($event) => file.value = $event,
              ref_key: "refInputFile",
              ref: refInputFile,
              "hide-input": "",
              "hide-details": "",
              class: "d-none"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "import-form-container" }, [
                createVNode("div", { class: "icon-container" }, [
                  createVNode(_component_Icon, {
                    name: "futzo-icon:upload",
                    size: "24"
                  })
                ]),
                createVNode("div", { class: "cta-container" }, [
                  createVNode("button", {
                    class: "btn",
                    onClick: () => {
                      var _a;
                      return (_a = refInputFile.value) == null ? void 0 : _a.click();
                    }
                  }, " Clic para subir archivo ", 8, ["onClick"]),
                  createVNode("span", null, " o arrastra y suelta"),
                  createVNode("p", { class: "conditions" }, "XLS o XLSX (tama\xF1o m\xE1ximo 8MB)"),
                  createVNode(VFileInput, {
                    modelValue: file.value,
                    "onUpdate:modelValue": ($event) => file.value = $event,
                    ref_key: "refInputFile",
                    ref: refInputFile,
                    "hide-input": "",
                    "hide-details": "",
                    class: "d-none"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/import-dialog/form.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Form = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-a289c9eb"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "drops",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    disabled: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  }, {
    "file": {},
    "fileModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["import-teams"], ["update:file"]),
  setup(__props, { emit: __emit }) {
    const file = useModel(__props, "file");
    const showDrops = ref(false);
    const progress = ref(0);
    const intervalId = ref();
    const timeOutId = ref();
    const [parent] = useAutoAnimate();
    const status = ref("");
    const isValidFile = ref();
    const active = ref(false);
    const subtitle = ref("");
    const border = ref({
      color: "#E4E7EC",
      size: "1px"
    });
    const formatsEnabled = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel"
    ];
    const validateFile = (item) => {
      if (!item) return false;
      return formatsEnabled.includes(item.type);
    };
    watch(file, (value) => {
      initAnimation();
      isValidFile.value = validateFile(value);
    });
    watch(progress, (value) => {
      var _a;
      if (value === 100) {
        clearInterval(intervalId.value);
        status.value = "Listo";
        const size = Number((_a = file.value) == null ? void 0 : _a.size);
        if (isValidFile.value) {
          subtitle.value = `${(size / 1024).toFixed(2)} KB ${progress.value}% ${status.value}`;
        } else {
          border.value.color = "#F04438";
          border.value.size = "2px";
          subtitle.value = "Error en la carga, por favor intenta nuevamente. </br> <span class='font-weight-bold'>Formato no valido</span>";
        }
      }
    });
    const initAnimation = () => {
      var _a;
      if (status.value === "Listo") {
        status.value = "";
        progress.value = 0;
        clearInterval(intervalId.value);
        clearTimeout(timeOutId.value);
        showDrops.value = false;
        active.value = false;
        border.value.color = "#E4E7EC";
        border.value.size = "1px";
      }
      status.value = "Cargando...";
      const size = Number((_a = file.value) == null ? void 0 : _a.size);
      subtitle.value = `${(size / 1024).toFixed(2)} KB ${progress.value}% ${status.value}`;
      showDrops.value = true;
      intervalId.value = setInterval();
      timeOutId.value = setTimeout(() => {
        active.value = true;
      }, 100);
    };
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a;
      const _component_Icon = __nuxt_component_0;
      const _component_transition_fade = __nuxt_component_0$2;
      const _cssVars = { style: {
        "--b125352e": unref(border).color,
        "--056dd13b": unref(border).size
      } };
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "parent",
        ref: parent,
        class: "drops-container"
      }, _attrs, _cssVars))} data-v-e3175ca1>`);
      if (unref(showDrops)) {
        _push(`<div class="${ssrRenderClass([unref(active) ? "active" : "", "drop-row"])}" data-v-e3175ca1><div class="__details" data-v-e3175ca1><div class="icon-container" data-v-e3175ca1>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "futzo-icon:file-type",
          size: "40"
        }, null, _parent));
        _push(`</div><div class="content-container" data-v-e3175ca1><p class="title" data-v-e3175ca1>${ssrInterpolate((_a = file.value) == null ? void 0 : _a.name)}</p><p class="subtitle" data-v-e3175ca1>${(_a2 = unref(subtitle)) != null ? _a2 : ""}</p></div><div class="progress-circular-container" data-v-e3175ca1>`);
        _push(ssrRenderComponent(_component_transition_fade, {
          group: "",
          duration: 100
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(status) === "Cargando...") {
                _push2(ssrRenderComponent(VProgressCircular, {
                  key: "progress-circular",
                  rotate: 360,
                  color: "primary",
                  size: 30,
                  width: "4",
                  "model-value": unref(progress)
                }, null, _parent2, _scopeId));
              } else if (unref(status) === "Listo" && unref(isValidFile)) {
                _push2(ssrRenderComponent(_component_Icon, {
                  key: "checkbox",
                  name: "futzo-icon:check-box"
                }, null, _parent2, _scopeId));
              } else if (unref(status) === "Listo" && !unref(isValidFile)) {
                _push2(ssrRenderComponent(_component_Icon, {
                  key: "trash",
                  name: "futzo-icon:trash-error",
                  size: "30",
                  class: "cursor-pointer",
                  onClick: () => showDrops.value = false
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(status) === "Cargando..." ? (openBlock(), createBlock(VProgressCircular, {
                  key: "progress-circular",
                  rotate: 360,
                  color: "primary",
                  size: 30,
                  width: "4",
                  "model-value": unref(progress)
                }, null, 8, ["model-value"])) : unref(status) === "Listo" && unref(isValidFile) ? (openBlock(), createBlock(_component_Icon, {
                  key: "checkbox",
                  name: "futzo-icon:check-box"
                })) : unref(status) === "Listo" && !unref(isValidFile) ? (openBlock(), createBlock(_component_Icon, {
                  key: "trash",
                  name: "futzo-icon:trash-error",
                  size: "30",
                  class: "cursor-pointer",
                  onClick: () => showDrops.value = false
                }, null, 8, ["onClick"])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(progress) === 100) {
        _push(`<div class="actions" data-v-e3175ca1>`);
        _push(ssrRenderComponent(VBtn, {
          size: 44,
          class: "mr-1 rounded-lg",
          color: "secondary",
          variant: "outlined",
          style: { "width": "calc(50% - 4px)" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Cancelar `);
            } else {
              return [
                createTextVNode(" Cancelar ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(VBtn, {
          size: 44,
          class: "ml-1 rounded-lg",
          color: "primary",
          style: { "width": "calc(50% - 4px)" },
          disabled: __props.disabled,
          loading: __props.loading,
          onClick: () => emits("import-teams")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Confirmar `);
            } else {
              return [
                createTextVNode(" Confirmar ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/import-dialog/drops.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Drops = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-e3175ca1"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { importModal, loading } = storeToRefs(useTeamStore());
    const { tournamentsInCreatedState } = storeToRefs(useTournamentStore());
    const { downloadTemplate, importTeamsHandler } = useTeamStore();
    const file = ref();
    const isImporting = ref(false);
    const tournamentId = ref(null);
    const showTournamentInput = computed(() => !!file.value);
    const importHandler = () => {
      isImporting.value = true;
      importTeamsHandler(file.value, tournamentId.value).finally(() => {
        isImporting.value = false;
      });
    };
    const leaveHandler = () => {
      loading.value = false;
      file.value = void 0;
      tournamentId.value = null;
      isImporting.value = false;
    };
    function itemProps(item) {
      return {
        title: item.name,
        subtitle: "Espacios disponibles: " + item.available_places
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(ssrRenderComponent(VDialog, mergeProps({
        modelValue: unref(importModal),
        "onUpdate:modelValue": ($event) => isRef(importModal) ? importModal.value = $event : null,
        "max-width": "690",
        onAfterLeave: leaveHandler,
        scrollable: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, {
              class: "create-tournament-card futzo-rounded",
              style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    onClose: ($event) => importModal.value = false
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(Form, {
                    file: unref(file),
                    "onUpdate:file": ($event) => isRef(file) ? file.value = $event : null
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VContainer, { class: "py-0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(showTournamentInput)) {
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "6",
                                  class: "d-flex justify-start"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VSelect, {
                                        class: "ml-2",
                                        density: "compact",
                                        variant: "outlined",
                                        label: "Torneo",
                                        "item-props": itemProps,
                                        "item-value": "id",
                                        modelValue: unref(tournamentId),
                                        "onUpdate:modelValue": ($event) => isRef(tournamentId) ? tournamentId.value = $event : null,
                                        items: unref(tournamentsInCreatedState),
                                        hint: "Solo puedes agregar equipos a torneos en estado 'Creado'",
                                        "persistent-hint": ""
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VSelect, {
                                          class: "ml-2",
                                          density: "compact",
                                          variant: "outlined",
                                          label: "Torneo",
                                          "item-props": itemProps,
                                          "item-value": "id",
                                          modelValue: unref(tournamentId),
                                          "onUpdate:modelValue": ($event) => isRef(tournamentId) ? tournamentId.value = $event : null,
                                          items: unref(tournamentsInCreatedState),
                                          hint: "Solo puedes agregar equipos a torneos en estado 'Creado'",
                                          "persistent-hint": ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(ssrRenderComponent(VCol, { class: "d-flex justify-end" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, {
                                      color: "secondary",
                                      variant: "outlined",
                                      class: "app-bar-secondary-btn mr-2",
                                      onClick: unref(downloadTemplate),
                                      loading: unref(loading),
                                      disabled: unref(loading),
                                      size: "small"
                                    }, {
                                      prepend: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Icon, {
                                            name: "futzo-icon:file-type-excel",
                                            size: "24"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_Icon, {
                                              name: "futzo-icon:file-type-excel",
                                              size: "24"
                                            })
                                          ];
                                        }
                                      }),
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Descargar Plantilla `);
                                        } else {
                                          return [
                                            createTextVNode(" Descargar Plantilla ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VBtn, {
                                        color: "secondary",
                                        variant: "outlined",
                                        class: "app-bar-secondary-btn mr-2",
                                        onClick: unref(downloadTemplate),
                                        loading: unref(loading),
                                        disabled: unref(loading),
                                        size: "small"
                                      }, {
                                        prepend: withCtx(() => [
                                          createVNode(_component_Icon, {
                                            name: "futzo-icon:file-type-excel",
                                            size: "24"
                                          })
                                        ]),
                                        default: withCtx(() => [
                                          createTextVNode(" Descargar Plantilla ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick", "loading", "disabled"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                unref(showTournamentInput) ? (openBlock(), createBlock(VCol, {
                                  key: 0,
                                  cols: "6",
                                  class: "d-flex justify-start"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      class: "ml-2",
                                      density: "compact",
                                      variant: "outlined",
                                      label: "Torneo",
                                      "item-props": itemProps,
                                      "item-value": "id",
                                      modelValue: unref(tournamentId),
                                      "onUpdate:modelValue": ($event) => isRef(tournamentId) ? tournamentId.value = $event : null,
                                      items: unref(tournamentsInCreatedState),
                                      hint: "Solo puedes agregar equipos a torneos en estado 'Creado'",
                                      "persistent-hint": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                createVNode(VCol, { class: "d-flex justify-end" }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      color: "secondary",
                                      variant: "outlined",
                                      class: "app-bar-secondary-btn mr-2",
                                      onClick: unref(downloadTemplate),
                                      loading: unref(loading),
                                      disabled: unref(loading),
                                      size: "small"
                                    }, {
                                      prepend: withCtx(() => [
                                        createVNode(_component_Icon, {
                                          name: "futzo-icon:file-type-excel",
                                          size: "24"
                                        })
                                      ]),
                                      default: withCtx(() => [
                                        createTextVNode(" Descargar Plantilla ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick", "loading", "disabled"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              unref(showTournamentInput) ? (openBlock(), createBlock(VCol, {
                                key: 0,
                                cols: "6",
                                class: "d-flex justify-start"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VSelect, {
                                    class: "ml-2",
                                    density: "compact",
                                    variant: "outlined",
                                    label: "Torneo",
                                    "item-props": itemProps,
                                    "item-value": "id",
                                    modelValue: unref(tournamentId),
                                    "onUpdate:modelValue": ($event) => isRef(tournamentId) ? tournamentId.value = $event : null,
                                    items: unref(tournamentsInCreatedState),
                                    hint: "Solo puedes agregar equipos a torneos en estado 'Creado'",
                                    "persistent-hint": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              createVNode(VCol, { class: "d-flex justify-end" }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    color: "secondary",
                                    variant: "outlined",
                                    class: "app-bar-secondary-btn mr-2",
                                    onClick: unref(downloadTemplate),
                                    loading: unref(loading),
                                    disabled: unref(loading),
                                    size: "small"
                                  }, {
                                    prepend: withCtx(() => [
                                      createVNode(_component_Icon, {
                                        name: "futzo-icon:file-type-excel",
                                        size: "24"
                                      })
                                    ]),
                                    default: withCtx(() => [
                                      createTextVNode(" Descargar Plantilla ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick", "loading", "disabled"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(Drops, {
                    file: unref(file),
                    "onUpdate:file": ($event) => isRef(file) ? file.value = $event : null,
                    onImportTeams: importHandler,
                    disabled: !unref(tournamentId),
                    loading: unref(isImporting)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$4, {
                      onClose: ($event) => importModal.value = false
                    }, null, 8, ["onClose"]),
                    createVNode(Form, {
                      file: unref(file),
                      "onUpdate:file": ($event) => isRef(file) ? file.value = $event : null
                    }, null, 8, ["file", "onUpdate:file"]),
                    createVNode(VContainer, { class: "py-0" }, {
                      default: withCtx(() => [
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            unref(showTournamentInput) ? (openBlock(), createBlock(VCol, {
                              key: 0,
                              cols: "6",
                              class: "d-flex justify-start"
                            }, {
                              default: withCtx(() => [
                                createVNode(VSelect, {
                                  class: "ml-2",
                                  density: "compact",
                                  variant: "outlined",
                                  label: "Torneo",
                                  "item-props": itemProps,
                                  "item-value": "id",
                                  modelValue: unref(tournamentId),
                                  "onUpdate:modelValue": ($event) => isRef(tournamentId) ? tournamentId.value = $event : null,
                                  items: unref(tournamentsInCreatedState),
                                  hint: "Solo puedes agregar equipos a torneos en estado 'Creado'",
                                  "persistent-hint": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            createVNode(VCol, { class: "d-flex justify-end" }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  color: "secondary",
                                  variant: "outlined",
                                  class: "app-bar-secondary-btn mr-2",
                                  onClick: unref(downloadTemplate),
                                  loading: unref(loading),
                                  disabled: unref(loading),
                                  size: "small"
                                }, {
                                  prepend: withCtx(() => [
                                    createVNode(_component_Icon, {
                                      name: "futzo-icon:file-type-excel",
                                      size: "24"
                                    })
                                  ]),
                                  default: withCtx(() => [
                                    createTextVNode(" Descargar Plantilla ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "loading", "disabled"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(Drops, {
                      file: unref(file),
                      "onUpdate:file": ($event) => isRef(file) ? file.value = $event : null,
                      onImportTeams: importHandler,
                      disabled: !unref(tournamentId),
                      loading: unref(isImporting)
                    }, null, 8, ["file", "onUpdate:file", "disabled", "loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, {
                class: "create-tournament-card futzo-rounded",
                style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$4, {
                    onClose: ($event) => importModal.value = false
                  }, null, 8, ["onClose"]),
                  createVNode(Form, {
                    file: unref(file),
                    "onUpdate:file": ($event) => isRef(file) ? file.value = $event : null
                  }, null, 8, ["file", "onUpdate:file"]),
                  createVNode(VContainer, { class: "py-0" }, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          unref(showTournamentInput) ? (openBlock(), createBlock(VCol, {
                            key: 0,
                            cols: "6",
                            class: "d-flex justify-start"
                          }, {
                            default: withCtx(() => [
                              createVNode(VSelect, {
                                class: "ml-2",
                                density: "compact",
                                variant: "outlined",
                                label: "Torneo",
                                "item-props": itemProps,
                                "item-value": "id",
                                modelValue: unref(tournamentId),
                                "onUpdate:modelValue": ($event) => isRef(tournamentId) ? tournamentId.value = $event : null,
                                items: unref(tournamentsInCreatedState),
                                hint: "Solo puedes agregar equipos a torneos en estado 'Creado'",
                                "persistent-hint": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(VCol, { class: "d-flex justify-end" }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                color: "secondary",
                                variant: "outlined",
                                class: "app-bar-secondary-btn mr-2",
                                onClick: unref(downloadTemplate),
                                loading: unref(loading),
                                disabled: unref(loading),
                                size: "small"
                              }, {
                                prepend: withCtx(() => [
                                  createVNode(_component_Icon, {
                                    name: "futzo-icon:file-type-excel",
                                    size: "24"
                                  })
                                ]),
                                default: withCtx(() => [
                                  createTextVNode(" Descargar Plantilla ")
                                ]),
                                _: 1
                              }, 8, ["onClick", "loading", "disabled"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(Drops, {
                    file: unref(file),
                    "onUpdate:file": ($event) => isRef(file) ? file.value = $event : null,
                    onImportTeams: importHandler,
                    disabled: !unref(tournamentId),
                    loading: unref(isImporting)
                  }, null, 8, ["file", "onUpdate:file", "disabled", "loading"])
                ]),
                _: 1
              }, 8, ["style"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/import-dialog/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useTeamStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageLayout = _sfc_main$2$1;
      _push(ssrRenderComponent(_component_PageLayout, _attrs, {
        "app-bar": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$d, null, {
              buttons: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$9, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$9)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$d, null, {
                buttons: withCtx(() => [
                  createVNode(_sfc_main$9)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$7, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$7),
              createVNode(_sfc_main$5),
              createVNode(_sfc_main$6),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/equipos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D9dAEYDw.mjs.map
