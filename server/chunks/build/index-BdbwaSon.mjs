import { _ as _sfc_main$2$1, a as _sfc_main$d } from './AppBar-BcqMvHzz.mjs';
import { _ as __nuxt_component_1 } from './SearchInput-CIOzfvpQ.mjs';
import { _ as __nuxt_component_0 } from './PrimaryBtn-B0RnAWAj.mjs';
import { defineComponent, ref, withCtx, unref, isRef, createVNode, mergeProps, createTextVNode, createBlock, openBlock, Fragment, renderList, h, mergeModels, useModel, toDisplayString, createElementBlock, createStaticVNode, useTemplateRef, computed, createCommentVNode, reactive, watch, withKeys, shallowRef, watchEffect, toRef, createElementVNode, onScopeDispose, nextTick, resolveDirective, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderAttrs, ssrGetDirectiveProps } from 'vue/server-renderer';
import { d as useLocationStore } from './useScheduleStore-DBhAIDF3.mjs';
import { N as NuxtIcon } from './nuxt-icon-Ctre7kET.mjs';
import { _ as _export_sfc, V as VCard, f as VCardItem, e as VCardTitle, E as VCardSubtitle, aQ as VCardActions, H as VDivider, F as VCardText, aa as VImg, aP as VChipGroup, aH as VChip, aK as useRuntimeConfig, C as VTextField, g as genericComponent, p as propsFactory, aL as useForm$1, N as useFocus, O as useProxiedModel, ap as clamp, c as useRender, aM as VDefaultsProvider, Z as forwardRefs, z as VMenu, A as VList, B as VListItem, $ as omit, aN as makeVTextFieldProps, aO as extractNumber } from './server.mjs';
import { storeToRefs } from 'pinia';
import { V as VSheet } from './VSheet-DVv3ytGE.mjs';
import { V as VBtn } from './VBtn-_od1f1mx.mjs';
import { _ as __nuxt_component_0$1 } from './index-DkcY5wU8.mjs';
import { _ as __nuxt_component_0$2 } from './TransitionSlide-d5qGX2mN.mjs';
import { _ as _sfc_main$e } from './SecondaryBtn-CVJutODn.mjs';
import { I as IndicatorStep } from './IndicatorStep-DKaB2dCI.mjs';
import { object, array, number, string, boolean } from 'yup';
import { u as usePlaceSearch, g as getPlaceDetails } from './googleSearch-Dzva-T1R.mjs';
import { u as useForm } from './vee-validate-DglmwfQ_.mjs';
import { t as toTypedSchema, V as VCheckbox } from './vee-validate-yup-P4OcCFc2.mjs';
import { GoogleMap, AdvancedMarker } from 'vue3-google-map';
import { V as VContainer } from './VContainer-C0Se5csP.mjs';
import { V as VRow, a as VCol } from './VRow-CwLG7ojV.mjs';
import { V as VAutocomplete } from './VAutocomplete-P_wP5bep.mjs';
import { Q as Qn } from './main-BplioMC0.mjs';
import { V as VStepperVertical, a as VStepperVerticalItem, b as VSwitch } from './VStepperVertical-BelP9G9C.mjs';
import { V as VDialog } from './VDialog-BeIjnChI.mjs';
import { V as VInfiniteScroll } from './VInfiniteScroll-CjZ9ti7M.mjs';
import { u as useDebounceFn } from './index-DU0YTrEL.mjs';
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
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './vue-transitions-gDOXGptb.mjs';
import '@morev/utils';
import './filter-PqGpj4I-.mjs';
import 'date-fns';
import './VWindowItem-DPPZL2sh.mjs';

const HOLD_REPEAT = 50;
const HOLD_DELAY = 500;
function useHold(_ref) {
  let {
    toggleUpDown
  } = _ref;
  let timeout = -1;
  let interval = -1;
  onScopeDispose(holdStop);
  function holdStart(value) {
    holdStop();
    tick(value);
    timeout = (void 0).setTimeout(() => {
      interval = (void 0).setInterval(() => tick(value), HOLD_REPEAT);
    }, HOLD_DELAY);
  }
  function holdStop() {
    (void 0).clearTimeout(timeout);
    (void 0).clearInterval(interval);
  }
  function tick(value) {
    toggleUpDown(value === "up");
  }
  return {
    holdStart,
    holdStop
  };
}
const makeVNumberInputProps = propsFactory({
  controlVariant: {
    type: String,
    default: "default"
  },
  inset: Boolean,
  hideInput: Boolean,
  modelValue: {
    type: Number,
    default: null
  },
  min: {
    type: Number,
    default: Number.MIN_SAFE_INTEGER
  },
  max: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER
  },
  step: {
    type: Number,
    default: 1
  },
  precision: {
    type: Number,
    default: 0
  },
  ...omit(makeVTextFieldProps(), ["modelValue", "validationValue"])
}, "VNumberInput");
const VNumberInput = genericComponent()({
  name: "VNumberInput",
  props: {
    ...makeVNumberInputProps()
  },
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vTextFieldRef = ref();
    const {
      holdStart,
      holdStop
    } = useHold({
      toggleUpDown
    });
    const form = useForm$1(props);
    const controlsDisabled = computed(() => form.isDisabled.value || form.isReadonly.value);
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    function correctPrecision(val) {
      let precision = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : props.precision;
      const fixed = precision == null ? String(val) : val.toFixed(precision);
      return isFocused.value ? Number(fixed).toString() : fixed;
    }
    const model = useProxiedModel(props, "modelValue", null, (val) => val != null ? val : null, (val) => val == null ? val != null ? val : null : clamp(Number(val), props.min, props.max));
    const _inputText = shallowRef(null);
    watchEffect(() => {
      if (isFocused.value && !controlsDisabled.value) ;
      else if (model.value == null) {
        _inputText.value = null;
      } else if (!isNaN(model.value)) {
        _inputText.value = correctPrecision(model.value);
      }
    });
    const inputText = computed({
      get: () => _inputText.value,
      set(val) {
        if (val === null || val === "") {
          model.value = null;
          _inputText.value = null;
        } else if (!isNaN(Number(val)) && Number(val) <= props.max && Number(val) >= props.min) {
          model.value = Number(val);
          _inputText.value = val;
        }
      }
    });
    const canIncrease = computed(() => {
      var _a;
      if (controlsDisabled.value) return false;
      return ((_a = model.value) != null ? _a : 0) + props.step <= props.max;
    });
    const canDecrease = computed(() => {
      var _a;
      if (controlsDisabled.value) return false;
      return ((_a = model.value) != null ? _a : 0) - props.step >= props.min;
    });
    const controlVariant = computed(() => {
      return props.hideInput ? "stacked" : props.controlVariant;
    });
    const incrementIcon = toRef(() => controlVariant.value === "split" ? "$plus" : "$collapse");
    const decrementIcon = toRef(() => controlVariant.value === "split" ? "$minus" : "$expand");
    const controlNodeSize = toRef(() => controlVariant.value === "split" ? "default" : "small");
    const controlNodeDefaultHeight = toRef(() => controlVariant.value === "stacked" ? "auto" : "100%");
    const incrementSlotProps = {
      props: {
        onClick: onControlClick,
        onPointerup: onControlMouseup,
        onPointerdown: onUpControlMousedown,
        onPointercancel: onControlPointerCancel
      }
    };
    const decrementSlotProps = {
      props: {
        onClick: onControlClick,
        onPointerup: onControlMouseup,
        onPointerdown: onDownControlMousedown,
        onPointercancel: onControlPointerCancel
      }
    };
    watch(() => props.precision, () => formatInputValue());
    function inferPrecision(value) {
      if (value == null) return 0;
      const str = value.toString();
      const idx = str.indexOf(".");
      return ~idx ? str.length - idx : 0;
    }
    function toggleUpDown() {
      let increment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      if (controlsDisabled.value) return;
      if (model.value == null) {
        inputText.value = correctPrecision(clamp(0, props.min, props.max));
        return;
      }
      let inferredPrecision = Math.max(inferPrecision(model.value), inferPrecision(props.step));
      if (props.precision != null) inferredPrecision = Math.max(inferredPrecision, props.precision);
      if (increment) {
        if (canIncrease.value) inputText.value = correctPrecision(model.value + props.step, inferredPrecision);
      } else {
        if (canDecrease.value) inputText.value = correctPrecision(model.value - props.step, inferredPrecision);
      }
    }
    function onBeforeinput(e) {
      var _a;
      if (!e.data) return;
      const inputElement = e.target;
      const {
        value: existingTxt,
        selectionStart,
        selectionEnd
      } = inputElement != null ? inputElement : {};
      const potentialNewInputVal = existingTxt ? existingTxt.slice(0, selectionStart) + e.data + existingTxt.slice(selectionEnd) : e.data;
      const potentialNewNumber = extractNumber(potentialNewInputVal, props.precision);
      if (!/^-?(\d+(\.\d*)?|(\.\d+)|\d*|\.)$/.test(potentialNewInputVal)) {
        e.preventDefault();
        inputElement.value = potentialNewNumber;
      }
      if (props.precision == null) return;
      if (((_a = potentialNewInputVal.split(".")[1]) == null ? void 0 : _a.length) > props.precision) {
        e.preventDefault();
        inputElement.value = potentialNewNumber;
      }
      if (props.precision === 0 && potentialNewInputVal.includes(".")) {
        e.preventDefault();
        inputElement.value = potentialNewNumber;
      }
    }
    async function onKeydown(e) {
      if (["Enter", "ArrowLeft", "ArrowRight", "Backspace", "Delete", "Tab"].includes(e.key) || e.ctrlKey) return;
      if (["ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        clampModel();
        await nextTick();
        if (e.key === "ArrowDown") {
          toggleUpDown(false);
        } else {
          toggleUpDown();
        }
      }
    }
    function onControlClick(e) {
      e.stopPropagation();
    }
    function onControlMouseup(e) {
      const el = e.currentTarget;
      el == null ? void 0 : el.releasePointerCapture(e.pointerId);
      e.preventDefault();
      e.stopPropagation();
      holdStop();
    }
    function onUpControlMousedown(e) {
      const el = e.currentTarget;
      el == null ? void 0 : el.setPointerCapture(e.pointerId);
      e.preventDefault();
      e.stopPropagation();
      holdStart("up");
    }
    function onDownControlMousedown(e) {
      const el = e.currentTarget;
      el == null ? void 0 : el.setPointerCapture(e.pointerId);
      e.preventDefault();
      e.stopPropagation();
      holdStart("down");
    }
    function onControlPointerCancel(e) {
      const el = e.currentTarget;
      el == null ? void 0 : el.releasePointerCapture(e.pointerId);
      holdStop();
    }
    function clampModel() {
      if (controlsDisabled.value) return;
      if (!vTextFieldRef.value) return;
      const actualText = vTextFieldRef.value.value;
      if (actualText && !isNaN(Number(actualText))) {
        inputText.value = correctPrecision(clamp(Number(actualText), props.min, props.max));
      } else {
        inputText.value = null;
      }
    }
    function formatInputValue() {
      if (controlsDisabled.value) return;
      if (model.value === null || isNaN(model.value)) {
        inputText.value = null;
        return;
      }
      inputText.value = props.precision == null ? String(model.value) : model.value.toFixed(props.precision);
    }
    function trimDecimalZeros() {
      if (controlsDisabled.value) return;
      if (model.value === null || isNaN(model.value)) {
        inputText.value = null;
        return;
      }
      inputText.value = model.value.toString();
    }
    function onFocus() {
      focus();
      trimDecimalZeros();
    }
    function onBlur() {
      blur();
      clampModel();
    }
    useRender(() => {
      const {
        modelValue: _,
        ...textFieldProps
      } = VTextField.filterProps(props);
      function incrementControlNode() {
        return !slots.increment ? createVNode(VBtn, {
          "aria-hidden": "true",
          "data-testid": "increment",
          "disabled": !canIncrease.value,
          "flat": true,
          "height": controlNodeDefaultHeight.value,
          "icon": incrementIcon.value,
          "key": "increment-btn",
          "onClick": onControlClick,
          "onPointerdown": onUpControlMousedown,
          "onPointerup": onControlMouseup,
          "onPointercancel": onControlPointerCancel,
          "size": controlNodeSize.value,
          "tabindex": "-1"
        }, null) : createVNode(VDefaultsProvider, {
          "key": "increment-defaults",
          "defaults": {
            VBtn: {
              disabled: !canIncrease.value,
              flat: true,
              height: controlNodeDefaultHeight.value,
              size: controlNodeSize.value,
              icon: incrementIcon.value
            }
          }
        }, {
          default: () => [slots.increment(incrementSlotProps)]
        });
      }
      function decrementControlNode() {
        return !slots.decrement ? createVNode(VBtn, {
          "aria-hidden": "true",
          "data-testid": "decrement",
          "disabled": !canDecrease.value,
          "flat": true,
          "height": controlNodeDefaultHeight.value,
          "icon": decrementIcon.value,
          "key": "decrement-btn",
          "onClick": onControlClick,
          "onPointerdown": onDownControlMousedown,
          "onPointerup": onControlMouseup,
          "onPointercancel": onControlPointerCancel,
          "size": controlNodeSize.value,
          "tabindex": "-1"
        }, null) : createVNode(VDefaultsProvider, {
          "key": "decrement-defaults",
          "defaults": {
            VBtn: {
              disabled: !canDecrease.value,
              flat: true,
              height: controlNodeDefaultHeight.value,
              size: controlNodeSize.value,
              icon: decrementIcon.value
            }
          }
        }, {
          default: () => [slots.decrement(decrementSlotProps)]
        });
      }
      function controlNode() {
        return createElementVNode("div", {
          "class": "v-number-input__control"
        }, [decrementControlNode(), createVNode(VDivider, {
          "vertical": controlVariant.value !== "stacked"
        }, null), incrementControlNode()]);
      }
      function dividerNode() {
        return !props.hideInput && !props.inset ? createVNode(VDivider, {
          "vertical": true
        }, null) : void 0;
      }
      const appendInnerControl = controlVariant.value === "split" ? createElementVNode("div", {
        "class": "v-number-input__control"
      }, [createVNode(VDivider, {
        "vertical": true
      }, null), incrementControlNode()]) : props.reverse || controlVariant.value === "hidden" ? void 0 : createElementVNode(Fragment, null, [dividerNode(), controlNode()]);
      const hasAppendInner = slots["append-inner"] || appendInnerControl;
      const prependInnerControl = controlVariant.value === "split" ? createElementVNode("div", {
        "class": "v-number-input__control"
      }, [decrementControlNode(), createVNode(VDivider, {
        "vertical": true
      }, null)]) : props.reverse && controlVariant.value !== "hidden" ? createElementVNode(Fragment, null, [controlNode(), dividerNode()]) : void 0;
      const hasPrependInner = slots["prepend-inner"] || prependInnerControl;
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef,
        "modelValue": inputText.value,
        "onUpdate:modelValue": ($event) => inputText.value = $event,
        "validationValue": model.value,
        "onBeforeinput": onBeforeinput,
        "onFocus": onFocus,
        "onBlur": onBlur,
        "onKeydown": onKeydown,
        "class": ["v-number-input", {
          "v-number-input--default": controlVariant.value === "default",
          "v-number-input--hide-input": props.hideInput,
          "v-number-input--inset": props.inset,
          "v-number-input--reverse": props.reverse,
          "v-number-input--split": controlVariant.value === "split",
          "v-number-input--stacked": controlVariant.value === "stacked"
        }, props.class]
      }, textFieldProps, {
        "style": props.style,
        "inputmode": "decimal"
      }), {
        ...slots,
        "append-inner": hasAppendInner ? function() {
          var _a;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createElementVNode(Fragment, null, [(_a = slots["append-inner"]) == null ? void 0 : _a.call(slots, ...args), appendInnerControl]);
        } : void 0,
        "prepend-inner": hasPrependInner ? function() {
          var _a;
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return createElementVNode(Fragment, null, [prependInnerControl, (_a = slots["prepend-inner"]) == null ? void 0 : _a.call(slots, ...args)]);
        } : void 0
      });
    });
    return forwardRefs({}, vTextFieldRef);
  }
});
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 333 333"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _cache[0] || (_cache[0] = [
    createStaticVNode('<path fill="#DDCAFE" d="M166.5 333c91.955 0 166.5-74.545 166.5-166.5S258.455 0 166.5 0 0 74.545 0 166.5 74.545 333 166.5 333Z"></path><path fill="#fff" d="M266.402 333h-199.8V117.66a35.557 35.557 0 0 0 35.52-35.52h128.76a35.28 35.28 0 0 0 10.414 25.104 35.283 35.283 0 0 0 25.106 10.416V333Z"></path><path fill="#9155FD" d="M166.499 226.44c29.425 0 53.28-23.854 53.28-53.28 0-29.426-23.855-53.28-53.28-53.28-29.426 0-53.28 23.854-53.28 53.28 0 29.426 23.854 53.28 53.28 53.28Z"></path><path fill="#fff" d="M185.337 198.277 166.5 179.44l-18.837 18.837-6.279-6.279 18.837-18.837-18.837-18.838 6.279-6.279 18.837 18.838 18.837-18.838 6.279 6.279-18.837 18.838 18.837 18.837-6.279 6.279Z"></path><path fill="#DDCAFE" d="M195.36 239.76h-57.72a6.66 6.66 0 0 0 0 13.32h57.72a6.66 6.66 0 1 0 0-13.32ZM215.34 266.4h-97.68a6.66 6.66 0 0 0 0 13.32h97.68a6.66 6.66 0 0 0 0-13.32Z"></path>', 5)
  ]));
}
const NoLocation = { render() {
  return h(NuxtIcon, { icon: { render }, name: "no-locations" });
} };
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "NoLocations",
  __ssrInlineRender: true,
  setup(__props) {
    const { locationDialog, noLocations } = storeToRefs(useLocationStore());
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(noLocations)) {
        _push(ssrRenderComponent(VSheet, mergeProps({ class: "custom-v-sheet d-flex justify-center align-center fill-height" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="d-flex flex-column align-center"${_scopeId}><h2 class="card-title"${_scopeId}>No hay ubicaciones a\xFAn</h2>`);
              _push2(ssrRenderComponent(unref(NoLocation), {
                fontControlled: false,
                filled: true,
                class: "text-xl w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(`<p class="card-sub-title"${_scopeId}>Crea una ubicaci\xF3n para verla aqu\xED</p>`);
              _push2(ssrRenderComponent(VBtn, {
                color: "primary",
                variant: "elevated",
                class: "mt-4 text-body-1",
                onClick: ($event) => locationDialog.value = !unref(locationDialog)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Crear una ubicaci\xF3n `);
                  } else {
                    return [
                      createTextVNode(" Crear una ubicaci\xF3n ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "d-flex flex-column align-center" }, [
                  createVNode("h2", { class: "card-title" }, "No hay ubicaciones a\xFAn"),
                  createVNode(unref(NoLocation), {
                    fontControlled: false,
                    filled: true,
                    class: "text-xl w-5 h-5"
                  }),
                  createVNode("p", { class: "card-sub-title" }, "Crea una ubicaci\xF3n para verla aqu\xED"),
                  createVNode(VBtn, {
                    color: "primary",
                    variant: "elevated",
                    class: "mt-4 text-body-1",
                    onClick: ($event) => locationDialog.value = !unref(locationDialog)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Crear una ubicaci\xF3n ")
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
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/ubicaciones/NoLocations.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const { locationDialog, isEdition } = storeToRefs(useLocationStore());
    const title = isEdition.value ? " Edita una Ubicaci\xF3n y sus Campos de Juego" : " Registrar una Ubicaci\xF3n y sus Campos de Juego";
    const subtitle = isEdition.value ? "Dentro de cada ubicaci\xF3n, puedes registrar uno o m\xE1s campos de juego, <br />cada uno con su propia disponibilidad." : "Dentro de cada ubicaci\xF3n, puedes registrar uno o m\xE1s campos de juego,  <br /> cada uno con su propia disponibilidad.";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VCardItem, { class: "custom-card-item" }, {
        prepend: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VSheet, {
              border: "primary thin",
              class: "mx-auto d-flex justify-center align-center mr-2 rounded-lg",
              height: "48",
              width: "48"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    size: "24",
                    name: "futzo-icon:marker-pin"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, {
                      size: "24",
                      name: "futzo-icon:marker-pin"
                    })
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
                height: "48",
                width: "48"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    size: "24",
                    name: "futzo-icon:marker-pin"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="title-dialog" data-v-77840297${_scopeId}>${ssrInterpolate(unref(title))}</span>`);
          } else {
            return [
              createVNode("span", { class: "title-dialog" }, toDisplayString(unref(title)), 1)
            ];
          }
        }),
        subtitle: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a;
          if (_push2) {
            _push2(`<span class="subtitle-dialog" data-v-77840297${_scopeId}>${(_a = unref(subtitle)) != null ? _a : ""}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: unref(subtitle),
                class: "subtitle-dialog"
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              size: "24",
              class: "cursor-pointer custom-close-icon",
              name: "futzo-icon:x-dialog",
              onClick: ($event) => locationDialog.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, {
                size: "24",
                class: "cursor-pointer custom-close-icon",
                name: "futzo-icon:x-dialog",
                onClick: ($event) => locationDialog.value = false
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
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/ubicaciones/dialog/Header.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const HeaderCard = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-77840297"]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "LocationStep",
  __ssrInlineRender: true,
  setup(__props) {
    const { locationStoreRequest, isEdition } = storeToRefs(useLocationStore());
    const { defineField, errors, meta, controlledValues, setFieldError } = useForm({
      validationSchema: toTypedSchema(
        object({
          name: string().required("El campo es requerido").default(locationStoreRequest.value.name),
          city: string().required("El campo es requerido").default(locationStoreRequest.value.city),
          address: string().required("El campo es requerido").default(locationStoreRequest.value.address),
          autocomplete_prediction: object().required("El campo es requerido").default(locationStoreRequest.value.autocomplete_prediction),
          fields_count: number().required("La cantidad de campos de juego es requerida").default(locationStoreRequest.value.fields_count),
          tags: array().of(string()),
          position: object({
            lat: number().required(),
            lng: number().required()
          }).default(locationStoreRequest.value.position)
        })
      )
    });
    const searchString = ref("");
    const { search } = usePlaceSearch();
    const [name] = reactive(defineField("name"));
    const [city] = reactive(defineField("city"));
    const [address] = reactive(defineField("address"));
    const [tags] = reactive(defineField("tags"));
    const [fields_count] = reactive(defineField("fields_count"));
    const [autocomplete_prediction] = reactive(
      defineField("autocomplete_prediction")
    );
    const [position] = reactive(defineField("position"));
    let foundedLocations = ref([]);
    const tag = ref("");
    const tagHandler = () => {
      var _a, _b;
      setFieldError("tags", "La etiqueta ya existe o est\xE1 vac\xEDa");
      const trimmedTag = (_a = tag.value) == null ? void 0 : _a.trim();
      if (!trimmedTag || ((_b = tags.value) == null ? void 0 : _b.includes(trimmedTag))) {
        setFieldError("tags", "La etiqueta ya existe o est\xE1 vac\xEDa");
        return;
      }
      tags.value = [...tags.value || [], trimmedTag];
      tag.value = "";
    };
    const removeTag = (tagToRemove) => {
      var _a;
      tags.value = (_a = tags.value) == null ? void 0 : _a.filter((tag2) => tag2 !== tagToRemove);
    };
    const itemProps = (item) => {
      var _a, _b;
      return {
        title: (_a = item == null ? void 0 : item.structured_formatting) == null ? void 0 : _a.main_text,
        subtitle: (_b = item == null ? void 0 : item.structured_formatting) == null ? void 0 : _b.secondary_text
      };
    };
    const searchHandler = async (place) => {
      const response = await search(place);
      if (response) {
        foundedLocations.value = response;
      }
    };
    const updateValue = async (value) => {
      var _a, _b;
      if (value == null ? void 0 : value.place_id) {
        const details = await getPlaceDetails(value.place_id);
        defineField("name", details == null ? void 0 : details.name);
        locationStoreRequest.value.name = details == null ? void 0 : details.name;
        name.value = details == null ? void 0 : details.name;
        if ((details == null ? void 0 : details.lat) && (details == null ? void 0 : details.lng)) {
          locationStoreRequest.value.position = {
            lat: details.lat,
            lng: details.lng
          };
          position.value = locationStoreRequest.value.position;
        }
      } else {
        console.error("No se pudieron obtener coordenadas del lugar.");
      }
      autocomplete_prediction.value = value;
      city.value = (_a = value.structured_formatting) == null ? void 0 : _a.secondary_text;
      address.value = value == null ? void 0 : value.description;
      locationStoreRequest.value.city = (_b = value.structured_formatting) == null ? void 0 : _b.secondary_text;
      locationStoreRequest.value.address = value == null ? void 0 : value.description;
    };
    const isValidFrom = computed(() => meta.value.valid);
    const controlledValues2 = computed(() => controlledValues.value);
    const markerOptions = computed(() => {
      return { position: position.value, title: name.value };
    });
    watch(isValidFrom, (value) => {
      locationStoreRequest.value.completed = value;
    });
    watch(controlledValues2, (value) => {
      locationStoreRequest.value = { ...locationStoreRequest.value, ...value };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "pa-0" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          label: "Direcci\xF3n del centro deportivo o canchas de juego",
                          modelValue: searchString.value,
                          "onUpdate:modelValue": [($event) => searchString.value = $event, updateValue],
                          items: unref(foundedLocations),
                          outlined: "",
                          "return-object": "",
                          "item-props": itemProps,
                          "hide-selected": "",
                          "clear-on-select": "",
                          clearable: "",
                          "no-filter": "",
                          "onUpdate:search": ($event) => searchHandler($event),
                          "error-messages": unref(errors).city
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            label: "Direcci\xF3n del centro deportivo o canchas de juego",
                            modelValue: searchString.value,
                            "onUpdate:modelValue": [($event) => searchString.value = $event, updateValue],
                            items: unref(foundedLocations),
                            outlined: "",
                            "return-object": "",
                            "item-props": itemProps,
                            "hide-selected": "",
                            "clear-on-select": "",
                            clearable: "",
                            "no-filter": "",
                            "onUpdate:search": ($event) => searchHandler($event),
                            "error-messages": unref(errors).city
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search", "error-messages"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(GoogleMap), {
                          "api-key": ("useRuntimeConfig" in _ctx ? _ctx.useRuntimeConfig : unref(useRuntimeConfig))().public.googleMapsAPIKey,
                          mapId: ("useRuntimeConfig" in _ctx ? _ctx.useRuntimeConfig : unref(useRuntimeConfig))().public.googleMapId,
                          class: "futzo-rounded",
                          center: unref(position),
                          zoom: 15,
                          id: "map"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(AdvancedMarker), { options: unref(markerOptions) }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(AdvancedMarker), { options: unref(markerOptions) }, null, 8, ["options"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(GoogleMap), {
                            "api-key": ("useRuntimeConfig" in _ctx ? _ctx.useRuntimeConfig : unref(useRuntimeConfig))().public.googleMapsAPIKey,
                            mapId: ("useRuntimeConfig" in _ctx ? _ctx.useRuntimeConfig : unref(useRuntimeConfig))().public.googleMapId,
                            class: "futzo-rounded",
                            center: unref(position),
                            zoom: 15,
                            id: "map"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(AdvancedMarker), { options: unref(markerOptions) }, null, 8, ["options"])
                            ]),
                            _: 1
                          }, 8, ["api-key", "mapId", "center"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Direcci\xF3n del centro deportivo o canchas de juego",
                          modelValue: searchString.value,
                          "onUpdate:modelValue": [($event) => searchString.value = $event, updateValue],
                          items: unref(foundedLocations),
                          outlined: "",
                          "return-object": "",
                          "item-props": itemProps,
                          "hide-selected": "",
                          "clear-on-select": "",
                          clearable: "",
                          "no-filter": "",
                          "onUpdate:search": ($event) => searchHandler($event),
                          "error-messages": unref(errors).city
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search", "error-messages"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(unref(GoogleMap), {
                          "api-key": ("useRuntimeConfig" in _ctx ? _ctx.useRuntimeConfig : unref(useRuntimeConfig))().public.googleMapsAPIKey,
                          mapId: ("useRuntimeConfig" in _ctx ? _ctx.useRuntimeConfig : unref(useRuntimeConfig))().public.googleMapId,
                          class: "futzo-rounded",
                          center: unref(position),
                          zoom: 15,
                          id: "map"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(AdvancedMarker), { options: unref(markerOptions) }, null, 8, ["options"])
                          ]),
                          _: 1
                        }, 8, ["api-key", "mapId", "center"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1"${_scopeId3}>Nombre</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, "Nombre")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          value: unref(name),
                          readonly: "",
                          "error-messages": unref(errors).name
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            value: unref(name),
                            readonly: "",
                            "error-messages": unref(errors).name
                          }, null, 8, ["value", "error-messages"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, "Nombre")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          value: unref(name),
                          readonly: "",
                          "error-messages": unref(errors).name
                        }, null, 8, ["value", "error-messages"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1"${_scopeId3}> Ciudad</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Ciudad")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          placeholder: "p.ej. Puerto Vallarta",
                          density: "compact",
                          variant: "outlined",
                          readonly: "",
                          value: unref(city)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            placeholder: "p.ej. Puerto Vallarta",
                            density: "compact",
                            variant: "outlined",
                            readonly: "",
                            value: unref(city)
                          }, null, 8, ["value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, " Ciudad")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          placeholder: "p.ej. Puerto Vallarta",
                          density: "compact",
                          variant: "outlined",
                          readonly: "",
                          value: unref(city)
                        }, null, 8, ["value"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1"${_scopeId3}> Direcci\xF3n </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Direcci\xF3n ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                          density: "compact",
                          variant: "outlined",
                          readonly: "",
                          value: unref(address)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                            density: "compact",
                            variant: "outlined",
                            readonly: "",
                            value: unref(address)
                          }, null, 8, ["value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, " Direcci\xF3n ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                          density: "compact",
                          variant: "outlined",
                          readonly: "",
                          value: unref(address)
                        }, null, 8, ["value"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Campos de juego`);
                      } else {
                        return [
                          createTextVNode(" Campos de juego")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VNumberInput, {
                          modelValue: unref(fields_count),
                          "onUpdate:modelValue": ($event) => isRef(fields_count) ? fields_count.value = $event : null,
                          "error-messages": unref(errors).fields_count,
                          density: "compact",
                          reverse: false,
                          controlVariant: "stacked",
                          label: "Campos en la misma locaci\xF3n",
                          hideInput: false,
                          inset: "",
                          min: 1,
                          variant: "solo"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VNumberInput, {
                            modelValue: unref(fields_count),
                            "onUpdate:modelValue": ($event) => isRef(fields_count) ? fields_count.value = $event : null,
                            "error-messages": unref(errors).fields_count,
                            density: "compact",
                            reverse: false,
                            controlVariant: "stacked",
                            label: "Campos en la misma locaci\xF3n",
                            hideInput: false,
                            inset: "",
                            min: 1,
                            variant: "solo"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Campos de juego")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VNumberInput, {
                          modelValue: unref(fields_count),
                          "onUpdate:modelValue": ($event) => isRef(fields_count) ? fields_count.value = $event : null,
                          "error-messages": unref(errors).fields_count,
                          density: "compact",
                          reverse: false,
                          controlVariant: "stacked",
                          label: "Campos en la misma locaci\xF3n",
                          hideInput: false,
                          inset: "",
                          min: 1,
                          variant: "solo"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-body-1"${_scopeId3}>Etiquetas</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, "Etiquetas")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: tag.value,
                          "onUpdate:modelValue": ($event) => tag.value = $event,
                          placeholder: "Ej. Cancha A, Estacionamiento, Entrada principal",
                          density: "compact",
                          variant: "outlined",
                          onKeyup: tagHandler,
                          clearable: "",
                          hint: "Presiona ENTER o + para agregar",
                          "persistent-hint": "",
                          "error-messages": unref(errors).tags
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VChipGroup, {
                          column: "",
                          variant: "outlined",
                          "center-active": ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(tags), (t, index) => {
                                _push5(ssrRenderComponent(VChip, {
                                  key: index,
                                  closable: "",
                                  "onClick:close": ($event) => removeTag(t)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(t)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(t), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(tags), (t, index) => {
                                  return openBlock(), createBlock(VChip, {
                                    key: index,
                                    closable: "",
                                    "onClick:close": ($event) => removeTag(t)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(t), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick:close"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: tag.value,
                            "onUpdate:modelValue": ($event) => tag.value = $event,
                            placeholder: "Ej. Cancha A, Estacionamiento, Entrada principal",
                            density: "compact",
                            variant: "outlined",
                            onKeyup: withKeys(tagHandler, ["enter"]),
                            clearable: "",
                            hint: "Presiona ENTER o + para agregar",
                            "persistent-hint": "",
                            "error-messages": unref(errors).tags
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                          createVNode(VChipGroup, {
                            column: "",
                            variant: "outlined",
                            "center-active": ""
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(tags), (t, index) => {
                                return openBlock(), createBlock(VChip, {
                                  key: index,
                                  closable: "",
                                  "onClick:close": ($event) => removeTag(t)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(t), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["onClick:close"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      lg: "4",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-body-1" }, "Etiquetas")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: tag.value,
                          "onUpdate:modelValue": ($event) => tag.value = $event,
                          placeholder: "Ej. Cancha A, Estacionamiento, Entrada principal",
                          density: "compact",
                          variant: "outlined",
                          onKeyup: withKeys(tagHandler, ["enter"]),
                          clearable: "",
                          hint: "Presiona ENTER o + para agregar",
                          "persistent-hint": "",
                          "error-messages": unref(errors).tags
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                        createVNode(VChipGroup, {
                          column: "",
                          variant: "outlined",
                          "center-active": ""
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(tags), (t, index) => {
                              return openBlock(), createBlock(VChip, {
                                key: index,
                                closable: "",
                                "onClick:close": ($event) => removeTag(t)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(t), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick:close"]);
                            }), 128))
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        label: "Direcci\xF3n del centro deportivo o canchas de juego",
                        modelValue: searchString.value,
                        "onUpdate:modelValue": [($event) => searchString.value = $event, updateValue],
                        items: unref(foundedLocations),
                        outlined: "",
                        "return-object": "",
                        "item-props": itemProps,
                        "hide-selected": "",
                        "clear-on-select": "",
                        clearable: "",
                        "no-filter": "",
                        "onUpdate:search": ($event) => searchHandler($event),
                        "error-messages": unref(errors).city
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search", "error-messages"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(unref(GoogleMap), {
                        "api-key": ("useRuntimeConfig" in _ctx ? _ctx.useRuntimeConfig : unref(useRuntimeConfig))().public.googleMapsAPIKey,
                        mapId: ("useRuntimeConfig" in _ctx ? _ctx.useRuntimeConfig : unref(useRuntimeConfig))().public.googleMapId,
                        class: "futzo-rounded",
                        center: unref(position),
                        zoom: 15,
                        id: "map"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(AdvancedMarker), { options: unref(markerOptions) }, null, 8, ["options"])
                        ]),
                        _: 1
                      }, 8, ["api-key", "mapId", "center"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, "Nombre")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        value: unref(name),
                        readonly: "",
                        "error-messages": unref(errors).name
                      }, null, 8, ["value", "error-messages"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, " Ciudad")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        placeholder: "p.ej. Puerto Vallarta",
                        density: "compact",
                        variant: "outlined",
                        readonly: "",
                        value: unref(city)
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, " Direcci\xF3n ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                        density: "compact",
                        variant: "outlined",
                        readonly: "",
                        value: unref(address)
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Campos de juego")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VNumberInput, {
                        modelValue: unref(fields_count),
                        "onUpdate:modelValue": ($event) => isRef(fields_count) ? fields_count.value = $event : null,
                        "error-messages": unref(errors).fields_count,
                        density: "compact",
                        reverse: false,
                        controlVariant: "stacked",
                        label: "Campos en la misma locaci\xF3n",
                        hideInput: false,
                        inset: "",
                        min: 1,
                        variant: "solo"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, "Etiquetas")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: tag.value,
                        "onUpdate:modelValue": ($event) => tag.value = $event,
                        placeholder: "Ej. Cancha A, Estacionamiento, Entrada principal",
                        density: "compact",
                        variant: "outlined",
                        onKeyup: withKeys(tagHandler, ["enter"]),
                        clearable: "",
                        hint: "Presiona ENTER o + para agregar",
                        "persistent-hint": "",
                        "error-messages": unref(errors).tags
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                      createVNode(VChipGroup, {
                        column: "",
                        variant: "outlined",
                        "center-active": ""
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(tags), (t, index) => {
                            return openBlock(), createBlock(VChip, {
                              key: index,
                              closable: "",
                              "onClick:close": ($event) => removeTag(t)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(t), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick:close"]);
                          }), 128))
                        ]),
                        _: 1
                      })
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
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/ubicaciones/stepper/LocationStep.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "InputDay",
  __ssrInlineRender: true,
  props: {
    day: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    onUpdateDay: {
      type: Function,
      required: true
    },
    id: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(ssrRenderComponent(VRow, mergeProps(_attrs, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 300 })), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              lg: "3",
              md: "3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VSwitch, {
                    "model-value": props.day.enabled,
                    "onUpdate:modelValue": (val) => props.onUpdateDay({ ...props.day, enabled: val }),
                    class: "mt-1 text-caption",
                    density: "compact"
                  }, {
                    label: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-caption"${_scopeId3}>${ssrInterpolate(__props.label)}</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-caption" }, toDisplayString(__props.label), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VSwitch, {
                      "model-value": props.day.enabled,
                      "onUpdate:modelValue": (val) => props.onUpdateDay({ ...props.day, enabled: val }),
                      class: "mt-1 text-caption",
                      density: "compact"
                    }, {
                      label: withCtx(() => [
                        createVNode("span", { class: "text-caption" }, toDisplayString(__props.label), 1)
                      ]),
                      _: 1
                    }, 8, ["model-value", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.day.enabled) {
              _push2(ssrRenderComponent(VCol, {
                cols: "12",
                lg: "9",
                md: "9"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="d-flex"${_scopeId2}><div class="w-100 mx-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Qn), {
                      "time-picker": "",
                      class: "custom-dp-location",
                      is24: false,
                      "model-value": props.day.start,
                      "onUpdate:modelValue": (val) => props.onUpdateDay({ ...props.day, start: val })
                    }, {
                      "dp-input": withCtx(({ value }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            value,
                            density: "compact",
                            variant: "outlined",
                            rounded: "lg",
                            "single-line": true,
                            class: "custom-location-input",
                            error: !value
                          }, {
                            "prepend-inner": withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<span class="text-medium-emphasis"${_scopeId4}>Desde</span>`);
                              } else {
                                return [
                                  createVNode("span", { class: "text-medium-emphasis" }, "Desde")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              value,
                              density: "compact",
                              variant: "outlined",
                              rounded: "lg",
                              "single-line": true,
                              class: "custom-location-input",
                              error: !value
                            }, {
                              "prepend-inner": withCtx(() => [
                                createVNode("span", { class: "text-medium-emphasis" }, "Desde")
                              ]),
                              _: 2
                            }, 1032, ["value", "error"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div><div class="w-100 mx-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Qn), {
                      class: "custom-dp-location",
                      "model-value": props.day.end,
                      "onUpdate:modelValue": (val) => props.onUpdateDay({ ...props.day, end: val }),
                      "time-picker": "",
                      is24: false
                    }, {
                      "dp-input": withCtx(({ value }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            class: "custom-location-input",
                            value,
                            density: "compact",
                            variant: "outlined",
                            rounded: "lg",
                            "single-line": true,
                            error: !value
                          }, {
                            "prepend-inner": withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<span class="text-medium-emphasis mr-1"${_scopeId4}>Hasta</span>`);
                              } else {
                                return [
                                  createVNode("span", { class: "text-medium-emphasis mr-1" }, "Hasta")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              class: "custom-location-input",
                              value,
                              density: "compact",
                              variant: "outlined",
                              rounded: "lg",
                              "single-line": true,
                              error: !value
                            }, {
                              "prepend-inner": withCtx(() => [
                                createVNode("span", { class: "text-medium-emphasis mr-1" }, "Hasta")
                              ]),
                              _: 2
                            }, 1032, ["value", "error"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "d-flex" }, [
                        createVNode("div", { class: "w-100 mx-2" }, [
                          createVNode(unref(Qn), {
                            "time-picker": "",
                            class: "custom-dp-location",
                            is24: false,
                            "model-value": props.day.start,
                            "onUpdate:modelValue": (val) => props.onUpdateDay({ ...props.day, start: val })
                          }, {
                            "dp-input": withCtx(({ value }) => [
                              createVNode(VTextField, {
                                value,
                                density: "compact",
                                variant: "outlined",
                                rounded: "lg",
                                "single-line": true,
                                class: "custom-location-input",
                                error: !value
                              }, {
                                "prepend-inner": withCtx(() => [
                                  createVNode("span", { class: "text-medium-emphasis" }, "Desde")
                                ]),
                                _: 2
                              }, 1032, ["value", "error"])
                            ]),
                            _: 1
                          }, 8, ["model-value", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "w-100 mx-2" }, [
                          createVNode(unref(Qn), {
                            class: "custom-dp-location",
                            "model-value": props.day.end,
                            "onUpdate:modelValue": (val) => props.onUpdateDay({ ...props.day, end: val }),
                            "time-picker": "",
                            is24: false
                          }, {
                            "dp-input": withCtx(({ value }) => [
                              createVNode(VTextField, {
                                class: "custom-location-input",
                                value,
                                density: "compact",
                                variant: "outlined",
                                rounded: "lg",
                                "single-line": true,
                                error: !value
                              }, {
                                "prepend-inner": withCtx(() => [
                                  createVNode("span", { class: "text-medium-emphasis mr-1" }, "Hasta")
                                ]),
                                _: 2
                              }, 1032, ["value", "error"])
                            ]),
                            _: 1
                          }, 8, ["model-value", "onUpdate:modelValue"])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(VCol, {
                cols: "12",
                lg: "9",
                md: "9"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="day-disabled"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "material-symbols:dark-mode-outline",
                      size: "24",
                      class: "icon"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="label"${_scopeId2}>No disponible</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "day-disabled" }, [
                        createVNode(_component_Icon, {
                          name: "material-symbols:dark-mode-outline",
                          size: "24",
                          class: "icon"
                        }),
                        createVNode("span", { class: "label" }, "No disponible")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
          } else {
            return [
              createVNode(VCol, {
                cols: "12",
                lg: "3",
                md: "3"
              }, {
                default: withCtx(() => [
                  createVNode(VSwitch, {
                    "model-value": props.day.enabled,
                    "onUpdate:modelValue": (val) => props.onUpdateDay({ ...props.day, enabled: val }),
                    class: "mt-1 text-caption",
                    density: "compact"
                  }, {
                    label: withCtx(() => [
                      createVNode("span", { class: "text-caption" }, toDisplayString(__props.label), 1)
                    ]),
                    _: 1
                  }, 8, ["model-value", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              __props.day.enabled ? (openBlock(), createBlock(VCol, {
                key: 0,
                cols: "12",
                lg: "9",
                md: "9"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "d-flex" }, [
                    createVNode("div", { class: "w-100 mx-2" }, [
                      createVNode(unref(Qn), {
                        "time-picker": "",
                        class: "custom-dp-location",
                        is24: false,
                        "model-value": props.day.start,
                        "onUpdate:modelValue": (val) => props.onUpdateDay({ ...props.day, start: val })
                      }, {
                        "dp-input": withCtx(({ value }) => [
                          createVNode(VTextField, {
                            value,
                            density: "compact",
                            variant: "outlined",
                            rounded: "lg",
                            "single-line": true,
                            class: "custom-location-input",
                            error: !value
                          }, {
                            "prepend-inner": withCtx(() => [
                              createVNode("span", { class: "text-medium-emphasis" }, "Desde")
                            ]),
                            _: 2
                          }, 1032, ["value", "error"])
                        ]),
                        _: 1
                      }, 8, ["model-value", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "w-100 mx-2" }, [
                      createVNode(unref(Qn), {
                        class: "custom-dp-location",
                        "model-value": props.day.end,
                        "onUpdate:modelValue": (val) => props.onUpdateDay({ ...props.day, end: val }),
                        "time-picker": "",
                        is24: false
                      }, {
                        "dp-input": withCtx(({ value }) => [
                          createVNode(VTextField, {
                            class: "custom-location-input",
                            value,
                            density: "compact",
                            variant: "outlined",
                            rounded: "lg",
                            "single-line": true,
                            error: !value
                          }, {
                            "prepend-inner": withCtx(() => [
                              createVNode("span", { class: "text-medium-emphasis mr-1" }, "Hasta")
                            ]),
                            _: 2
                          }, 1032, ["value", "error"])
                        ]),
                        _: 1
                      }, 8, ["model-value", "onUpdate:modelValue"])
                    ])
                  ])
                ]),
                _: 1
              })) : (openBlock(), createBlock(VCol, {
                key: 1,
                cols: "12",
                lg: "9",
                md: "9"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "day-disabled" }, [
                    createVNode(_component_Icon, {
                      name: "material-symbols:dark-mode-outline",
                      size: "24",
                      class: "icon"
                    }),
                    createVNode("span", { class: "label" }, "No disponible")
                  ])
                ]),
                _: 1
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/ubicaciones/stepper/InputDay.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "AvailabilityFormStep",
  __ssrInlineRender: true,
  props: {
    step: {
      type: Number,
      required: true
    },
    initForm: {
      type: Object
    }
  },
  emits: ["step-completed"],
  setup(__props, { emit: __emit }) {
    var _a;
    const props = __props;
    const emits = __emit;
    const { locationStoreRequest } = storeToRefs(useLocationStore());
    const createDaySchema = () => object({
      enabled: boolean().default(false),
      start: object({
        hours: string().default("09"),
        minutes: string().default("00")
      }),
      end: object({
        hours: string().default("23"),
        minutes: string().default("00")
      })
    });
    const schema = object({
      id: number().default(props.step),
      name: string().required("Nombre del campo es requerido"),
      isCompleted: boolean().required("Debes marcar como completado").default(false),
      monday: createDaySchema(),
      tuesday: createDaySchema(),
      wednesday: createDaySchema(),
      thursday: createDaySchema(),
      friday: createDaySchema(),
      saturday: createDaySchema(),
      sunday: createDaySchema()
    });
    const { values, errors, handleSubmit, validate, setFieldValue, defineField, meta } = useForm({
      validationSchema: toTypedSchema(schema),
      initialValues: (_a = props.initForm) != null ? _a : { id: props.step }
    });
    const [name, nameAttr] = defineField("name");
    const isCompletedHandler = async () => {
      var _a2;
      setFieldValue("isCompleted", !values.isCompleted);
      const validated = await validate();
      updateAvailability(values == null ? void 0 : values.id, values);
      if (validated.valid && ((_a2 = validated == null ? void 0 : validated.values) == null ? void 0 : _a2.isCompleted)) {
        emits("step-completed", "next", validated);
      }
    };
    const updateAvailability = (id, values2) => {
      const index = locationStoreRequest.value.availability.findIndex((item) => item.id === id);
      if (index !== -1) {
        locationStoreRequest.value.availability[index] = values2;
      }
    };
    const updateDayHandler = (day, value) => {
      setFieldValue(day, value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "12" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    modelValue: unref(name),
                    "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                    variant: "outlined",
                    label: "Nombre o Identificador del campo de juego*",
                    "error-messages": (_a2 = unref(errors)) == null ? void 0 : _a2.name
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTextField, {
                      modelValue: unref(name),
                      "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                      variant: "outlined",
                      label: "Nombre o Identificador del campo de juego*",
                      "error-messages": (_b = unref(errors)) == null ? void 0 : _b.name
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, { cols: "12" }, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createVNode(VTextField, {
                      modelValue: unref(name),
                      "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                      variant: "outlined",
                      label: "Nombre o Identificador del campo de juego*",
                      "error-messages": (_a2 = unref(errors)) == null ? void 0 : _a2.name
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ];
                }),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$9, {
        day: unref(values).monday,
        id: "monday",
        label: "Lunes",
        onUpdateDay: (val) => updateDayHandler("monday", val)
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$9, {
        day: unref(values).tuesday,
        label: "Martes",
        id: "tuesday",
        onUpdateDay: (val) => updateDayHandler("tuesday", val)
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$9, {
        day: unref(values).wednesday,
        label: "Mi\xE9rcoles",
        id: "wednesday",
        onUpdateDay: (val) => updateDayHandler("wednesday", val)
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$9, {
        day: unref(values).thursday,
        label: "Jueves",
        id: "wednesday",
        onUpdateDay: (val) => updateDayHandler("thursday", val)
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$9, {
        day: unref(values).friday,
        label: "Viernes",
        id: "wednesday",
        onUpdateDay: (val) => updateDayHandler("friday", val)
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$9, {
        day: unref(values).saturday,
        label: "S\xE1bado",
        id: "",
        onUpdateDay: (val) => updateDayHandler("saturday", val)
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$9, {
        day: unref(values).sunday,
        label: "Domingo",
        id: "wednesday",
        onUpdateDay: (val) => updateDayHandler("sunday", val)
      }, null, _parent));
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCheckbox, {
                    "model-value": unref(values).isCompleted,
                    disabled: !unref(meta).valid,
                    onChange: isCompletedHandler
                  }, {
                    label: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>Marcar como completado</div>`);
                      } else {
                        return [
                          createVNode("div", null, "Marcar como completado")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCheckbox, {
                      "model-value": unref(values).isCompleted,
                      disabled: !unref(meta).valid,
                      onChange: isCompletedHandler
                    }, {
                      label: withCtx(() => [
                        createVNode("div", null, "Marcar como completado")
                      ]),
                      _: 1
                    }, 8, ["model-value", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createVNode(VCheckbox, {
                    "model-value": unref(values).isCompleted,
                    disabled: !unref(meta).valid,
                    onChange: isCompletedHandler
                  }, {
                    label: withCtx(() => [
                      createVNode("div", null, "Marcar como completado")
                    ]),
                    _: 1
                  }, 8, ["model-value", "disabled"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/ubicaciones/stepper/AvailabilityFormStep.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "AvailabilityStep",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const { locationStoreRequest, isEdition } = storeToRefs(useLocationStore());
    const currentStep = ref(1);
    const markStepAsCompletedHandler = async (type) => {
      setNextStep(type);
    };
    const setNextStep = (direction) => {
      setTimeout(() => {
        if (currentStep.value < locationStoreRequest.value.availability.length) {
          currentStep.value = direction === "next" ? currentStep.value + 1 : currentStep.value - 1;
        }
      }, 300);
    };
    __expose({
      handleSubmit: () => markStepAsCompletedHandler
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ fluid: "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { "no-gutters": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    class: "pt-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VDivider, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VDivider)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      class: "pt-0"
                    }, {
                      default: withCtx(() => [
                        createVNode(VDivider)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VStepperVertical, {
              variant: "inset",
              modelValue: unref(currentStep),
              "onUpdate:modelValue": ($event) => isRef(currentStep) ? currentStep.value = $event : null,
              class: "pa-0 ma-0 futzo-vertical-stepper",
              flat: "",
              eager: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(locationStoreRequest).availability, (form, index) => {
                    _push3(ssrRenderComponent(VStepperVerticalItem, {
                      value: index + 1,
                      key: index + 1,
                      title: form.name,
                      complete: form.isCompleted,
                      "complete-icon": "mdi-check-circle",
                      "edit-icon": "mdi-check-circle",
                      "expand-icon": "mdi-chevron-down"
                    }, {
                      actions: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) ;
                        else {
                          return [];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$8, {
                            step: index + 1,
                            "init-form": form,
                            onStepCompleted: markStepAsCompletedHandler
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$8, {
                              step: index + 1,
                              "init-form": form,
                              onStepCompleted: markStepAsCompletedHandler
                            }, null, 8, ["step", "init-form"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(locationStoreRequest).availability, (form, index) => {
                      return openBlock(), createBlock(VStepperVerticalItem, {
                        value: index + 1,
                        key: index + 1,
                        title: form.name,
                        complete: form.isCompleted,
                        "complete-icon": "mdi-check-circle",
                        "edit-icon": "mdi-check-circle",
                        "expand-icon": "mdi-chevron-down"
                      }, {
                        actions: withCtx(() => []),
                        default: withCtx(() => [
                          createVNode(_sfc_main$8, {
                            step: index + 1,
                            "init-form": form,
                            onStepCompleted: markStepAsCompletedHandler
                          }, null, 8, ["step", "init-form"])
                        ]),
                        _: 2
                      }, 1032, ["value", "title", "complete"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, { "no-gutters": "" }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    class: "pt-0"
                  }, {
                    default: withCtx(() => [
                      createVNode(VDivider)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VStepperVertical, {
                variant: "inset",
                modelValue: unref(currentStep),
                "onUpdate:modelValue": ($event) => isRef(currentStep) ? currentStep.value = $event : null,
                class: "pa-0 ma-0 futzo-vertical-stepper",
                flat: "",
                eager: ""
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(locationStoreRequest).availability, (form, index) => {
                    return openBlock(), createBlock(VStepperVerticalItem, {
                      value: index + 1,
                      key: index + 1,
                      title: form.name,
                      complete: form.isCompleted,
                      "complete-icon": "mdi-check-circle",
                      "edit-icon": "mdi-check-circle",
                      "expand-icon": "mdi-chevron-down"
                    }, {
                      actions: withCtx(() => []),
                      default: withCtx(() => [
                        createVNode(_sfc_main$8, {
                          step: index + 1,
                          "init-form": form,
                          onStepCompleted: markStepAsCompletedHandler
                        }, null, 8, ["step", "init-form"])
                      ]),
                      _: 2
                    }, 1032, ["value", "title", "complete"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/ubicaciones/stepper/AvailabilityStep.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  emits: ["next", "back", "close"],
  setup(__props, { emit: __emit }) {
    const {
      locationStoreRequest,
      isEdition,
      formSteps,
      isAllStepsCompleted,
      locationDialog
    } = storeToRefs(useLocationStore());
    const locationStepRef = useTemplateRef("locationStepRef");
    const availabilityStepRef = useTemplateRef("availabilityStepRef");
    const textButton = computed(() => {
      if (formSteps.value.current === "location") {
        return "Siguiente";
      } else {
        return isEdition.value ? "Guardar Cambios" : "Crear ubicaci\xF3n";
      }
    });
    const backTextButton = computed(
      () => formSteps.value.current === "location" ? "Cancelar" : "Anterior"
    );
    const nextStepHandler = async () => {
      if (!locationStoreRequest.value.completed) {
        return;
      }
      const stepsOrder = ["location", "availability"];
      const currentStepIndex = stepsOrder.indexOf(formSteps.value.current);
      if (!formSteps.value.steps[currentStepIndex].completed) {
        formSteps.value.steps[currentStepIndex].completed = true;
      }
      const isLastStep = currentStepIndex === stepsOrder.length - 1;
      isLastStep ? await saveHandler() : formSteps.value.current = stepsOrder[currentStepIndex + 1];
    };
    async function saveHandler() {
      isEdition.value ? await useLocationStore().updateLocation() : await useLocationStore().storeLocation();
    }
    const backStepHandler = () => {
      if (formSteps.value.current === "location") {
        useLocationStore().resetLocationStoreRequest();
        locationDialog.value = false;
      }
      formSteps.value.current = "location";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_transition_slide = __nuxt_component_0$2;
      const _component_SecondaryBtn = _sfc_main$e;
      const _component_PrimaryBtn = __nuxt_component_0;
      _push(ssrRenderComponent(VCardText, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VContainer, { class: "pa-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(IndicatorStep, { "form-steps": unref(formSteps) }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(IndicatorStep, { "form-steps": unref(formSteps) }, null, 8, ["form-steps"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(IndicatorStep, { "form-steps": unref(formSteps) }, null, 8, ["form-steps"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, { class: "mt-0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_transition_slide, {
                                group: "",
                                offset: { enter: ["-100%", 0], leave: ["100%", 0] }
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (unref(formSteps).current === "location") {
                                      _push6(ssrRenderComponent(_sfc_main$a, {
                                        ref_key: "locationStepRef",
                                        ref: locationStepRef
                                      }, null, _parent6, _scopeId5));
                                    } else if (unref(formSteps).current === "availability") {
                                      _push6(ssrRenderComponent(_sfc_main$7, {
                                        ref_key: "availabilityStepRef",
                                        ref: availabilityStepRef
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                  } else {
                                    return [
                                      unref(formSteps).current === "location" ? (openBlock(), createBlock(_sfc_main$a, {
                                        key: 0,
                                        ref_key: "locationStepRef",
                                        ref: locationStepRef
                                      }, null, 512)) : unref(formSteps).current === "availability" ? (openBlock(), createBlock(_sfc_main$7, {
                                        key: 1,
                                        ref_key: "availabilityStepRef",
                                        ref: availabilityStepRef
                                      }, null, 512)) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_transition_slide, {
                                  group: "",
                                  offset: { enter: ["-100%", 0], leave: ["100%", 0] }
                                }, {
                                  default: withCtx(() => [
                                    unref(formSteps).current === "location" ? (openBlock(), createBlock(_sfc_main$a, {
                                      key: 0,
                                      ref_key: "locationStepRef",
                                      ref: locationStepRef
                                    }, null, 512)) : unref(formSteps).current === "availability" ? (openBlock(), createBlock(_sfc_main$7, {
                                      key: 1,
                                      ref_key: "availabilityStepRef",
                                      ref: availabilityStepRef
                                    }, null, 512)) : createCommentVNode("", true)
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
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(_component_transition_slide, {
                                group: "",
                                offset: { enter: ["-100%", 0], leave: ["100%", 0] }
                              }, {
                                default: withCtx(() => [
                                  unref(formSteps).current === "location" ? (openBlock(), createBlock(_sfc_main$a, {
                                    key: 0,
                                    ref_key: "locationStepRef",
                                    ref: locationStepRef
                                  }, null, 512)) : unref(formSteps).current === "availability" ? (openBlock(), createBlock(_sfc_main$7, {
                                    key: 1,
                                    ref_key: "availabilityStepRef",
                                    ref: availabilityStepRef
                                  }, null, 512)) : createCommentVNode("", true)
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
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "12 d-flex justify-space-between" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SecondaryBtn, {
                                class: "bg-white w-btn",
                                text: unref(backTextButton),
                                onClick: backStepHandler
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_PrimaryBtn, {
                                "show-icon": false,
                                class: "w-btn",
                                text: unref(textButton),
                                disabled: !unref(isAllStepsCompleted),
                                variant: "elevated",
                                onClick: nextStepHandler
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SecondaryBtn, {
                                  class: "bg-white w-btn",
                                  text: unref(backTextButton),
                                  onClick: backStepHandler
                                }, null, 8, ["text"]),
                                createVNode(_component_PrimaryBtn, {
                                  "show-icon": false,
                                  class: "w-btn",
                                  text: unref(textButton),
                                  disabled: !unref(isAllStepsCompleted),
                                  variant: "elevated",
                                  onClick: nextStepHandler
                                }, null, 8, ["text", "disabled"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "12 d-flex justify-space-between" }, {
                            default: withCtx(() => [
                              createVNode(_component_SecondaryBtn, {
                                class: "bg-white w-btn",
                                text: unref(backTextButton),
                                onClick: backStepHandler
                              }, null, 8, ["text"]),
                              createVNode(_component_PrimaryBtn, {
                                "show-icon": false,
                                class: "w-btn",
                                text: unref(textButton),
                                disabled: !unref(isAllStepsCompleted),
                                variant: "elevated",
                                onClick: nextStepHandler
                              }, null, 8, ["text", "disabled"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, null, {
                          default: withCtx(() => [
                            createVNode(IndicatorStep, { "form-steps": unref(formSteps) }, null, 8, ["form-steps"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, { class: "mt-0" }, {
                      default: withCtx(() => [
                        createVNode(VCol, null, {
                          default: withCtx(() => [
                            createVNode(_component_transition_slide, {
                              group: "",
                              offset: { enter: ["-100%", 0], leave: ["100%", 0] }
                            }, {
                              default: withCtx(() => [
                                unref(formSteps).current === "location" ? (openBlock(), createBlock(_sfc_main$a, {
                                  key: 0,
                                  ref_key: "locationStepRef",
                                  ref: locationStepRef
                                }, null, 512)) : unref(formSteps).current === "availability" ? (openBlock(), createBlock(_sfc_main$7, {
                                  key: 1,
                                  ref_key: "availabilityStepRef",
                                  ref: availabilityStepRef
                                }, null, 512)) : createCommentVNode("", true)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "12 d-flex justify-space-between" }, {
                          default: withCtx(() => [
                            createVNode(_component_SecondaryBtn, {
                              class: "bg-white w-btn",
                              text: unref(backTextButton),
                              onClick: backStepHandler
                            }, null, 8, ["text"]),
                            createVNode(_component_PrimaryBtn, {
                              "show-icon": false,
                              class: "w-btn",
                              text: unref(textButton),
                              disabled: !unref(isAllStepsCompleted),
                              variant: "elevated",
                              onClick: nextStepHandler
                            }, null, 8, ["text", "disabled"])
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VContainer, { class: "pa-0" }, {
                default: withCtx(() => [
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(IndicatorStep, { "form-steps": unref(formSteps) }, null, 8, ["form-steps"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, { class: "mt-0" }, {
                    default: withCtx(() => [
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(_component_transition_slide, {
                            group: "",
                            offset: { enter: ["-100%", 0], leave: ["100%", 0] }
                          }, {
                            default: withCtx(() => [
                              unref(formSteps).current === "location" ? (openBlock(), createBlock(_sfc_main$a, {
                                key: 0,
                                ref_key: "locationStepRef",
                                ref: locationStepRef
                              }, null, 512)) : unref(formSteps).current === "availability" ? (openBlock(), createBlock(_sfc_main$7, {
                                key: 1,
                                ref_key: "availabilityStepRef",
                                ref: availabilityStepRef
                              }, null, 512)) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "12 d-flex justify-space-between" }, {
                        default: withCtx(() => [
                          createVNode(_component_SecondaryBtn, {
                            class: "bg-white w-btn",
                            text: unref(backTextButton),
                            onClick: backStepHandler
                          }, null, 8, ["text"]),
                          createVNode(_component_PrimaryBtn, {
                            "show-icon": false,
                            class: "w-btn",
                            text: unref(textButton),
                            disabled: !unref(isAllStepsCompleted),
                            variant: "elevated",
                            onClick: nextStepHandler
                          }, null, 8, ["text", "disabled"])
                        ]),
                        _: 1
                      })
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
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/ubicaciones/stepper/index.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const LocationStepper = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-f5d873b5"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { locationDialog, formSteps } = storeToRefs(useLocationStore());
    const leaveHandler = () => {
      useLocationStore().resetLocationStoreRequest();
      formSteps.value.current = "location";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        modelValue: unref(locationDialog),
        "onUpdate:modelValue": ($event) => isRef(locationDialog) ? locationDialog.value = $event : null,
        "max-width": "690",
        onAfterLeave: leaveHandler,
        scrollable: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, {
              class: "create-tournament-card futzo-rounded",
              height: "100%",
              style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(HeaderCard, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(LocationStepper, {
                    onClose: () => locationDialog.value = false,
                    onLocationAdded: () => locationDialog.value = false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(HeaderCard),
                    createVNode(LocationStepper, {
                      onClose: () => locationDialog.value = false,
                      onLocationAdded: () => locationDialog.value = false
                    }, null, 8, ["onClose", "onLocationAdded"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, {
                class: "create-tournament-card futzo-rounded",
                height: "100%",
                style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
              }, {
                default: withCtx(() => [
                  createVNode(HeaderCard),
                  createVNode(LocationStepper, {
                    onClose: () => locationDialog.value = false,
                    onLocationAdded: () => locationDialog.value = false
                  }, null, 8, ["onClose", "onLocationAdded"])
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/ubicaciones/dialog/index.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CardMenu",
  __ssrInlineRender: true,
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const items = [
      { id: 1, title: "Editar", icon: "futzo-icon:edit" },
      { id: 2, title: "Eliminar", icon: "futzo-icon:trash-01" }
    ];
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "menu-container" }, _attrs))} data-v-e24bb889>`);
      _push(ssrRenderComponent(VMenu, {
        class: "rounded-lg border-md",
        location: "bottom",
        transition: "slide-x-transition",
        offset: [0, 100],
        width: "120"
      }, {
        activator: withCtx(({ props }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, mergeProps({
              class: "menu-btn",
              color: "black",
              icon: "mdi-dots-horizontal",
              variant: "text"
            }, props), null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, mergeProps({
                class: "menu-btn",
                color: "black",
                icon: "mdi-dots-horizontal",
                variant: "text"
              }, props), null, 16)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VList, {
              density: "compact",
              class: "pa-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(items, (item) => {
                    _push3(ssrRenderComponent(VListItem, {
                      "min-height": "34",
                      key: item.id,
                      class: "py-0",
                      onClick: () => emits("click", item.title)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="menu-item-container" data-v-e24bb889${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_Icon, {
                            name: item.icon
                          }, null, _parent4, _scopeId3));
                          _push4(`<span class="text-item" data-v-e24bb889${_scopeId3}>${ssrInterpolate(item.title)}</span></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "menu-item-container" }, [
                              createVNode(_component_Icon, {
                                name: item.icon
                              }, null, 8, ["name"]),
                              createVNode("span", { class: "text-item" }, toDisplayString(item.title), 1)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(items, (item) => {
                      return createVNode(VListItem, {
                        "min-height": "34",
                        key: item.id,
                        class: "py-0",
                        onClick: () => emits("click", item.title)
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "menu-item-container" }, [
                            createVNode(_component_Icon, {
                              name: item.icon
                            }, null, 8, ["name"]),
                            createVNode("span", { class: "text-item" }, toDisplayString(item.title), 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["onClick"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VList, {
                density: "compact",
                class: "pa-0"
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(items, (item) => {
                    return createVNode(VListItem, {
                      "min-height": "34",
                      key: item.id,
                      class: "py-0",
                      onClick: () => emits("click", item.title)
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "menu-item-container" }, [
                          createVNode(_component_Icon, {
                            name: item.icon
                          }, null, 8, ["name"]),
                          createVNode("span", { class: "text-item" }, toDisplayString(item.title), 1)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["onClick"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/ubicaciones/CardMenu.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const CardMenu = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-e24bb889"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "LocationCard",
  __ssrInlineRender: true,
  props: {
    location: {}
  },
  setup(__props) {
    const { isEdition, locationDialog, locationToDelete, locationStoreRequest, locationCard } = storeToRefs(useLocationStore());
    const clickHandler = (action) => {
      if (action === "Editar") {
        locationStoreRequest.value = {
          name: __props.location.name,
          city: __props.location.city,
          address: __props.location.address,
          autocomplete_prediction: { ...__props.location.autocomplete_prediction },
          tags: __props.location.tags,
          fields_count: __props.location.fields_count,
          position: __props.location.position,
          availability: __props.location.availability,
          completed: true,
          id: __props.location.id
        };
        locationCard.value.id = __props.location.id;
        isEdition.value = true;
        locationDialog.value = true;
      } else if (action === "Eliminar") {
        locationToDelete.value.id = __props.location.id;
        locationToDelete.value.show = true;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({
        class: "futzo-rounded",
        "max-width": "330",
        flat: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CardMenu, { onClick: clickHandler }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VImg, {
              src: `/locations/${_ctx.location.image}.png`,
              "max-width": "330",
              "max-height": "250",
              "min-height": "250",
              cover: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardItem, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "card-title" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="d-inline-block text-truncate" style="${ssrRenderStyle({ "max-width": "300px" })}" data-v-33749eed${_scopeId3}>${ssrInterpolate(_ctx.location.name)}</span>`);
                      } else {
                        return [
                          createVNode("span", {
                            class: "d-inline-block text-truncate",
                            style: { "max-width": "300px" }
                          }, toDisplayString(_ctx.location.name), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardSubtitle, { class: "card-subtitle" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="d-inline-block text-truncate" style="${ssrRenderStyle({ "max-width": "300px" })}" data-v-33749eed${_scopeId3}>${ssrInterpolate(_ctx.location.address)}, ${ssrInterpolate(_ctx.location.city)}</span>`);
                      } else {
                        return [
                          createVNode("span", {
                            class: "d-inline-block text-truncate",
                            style: { "max-width": "300px" }
                          }, toDisplayString(_ctx.location.address) + ", " + toDisplayString(_ctx.location.city), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "card-title" }, {
                      default: withCtx(() => [
                        createVNode("span", {
                          class: "d-inline-block text-truncate",
                          style: { "max-width": "300px" }
                        }, toDisplayString(_ctx.location.name), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(VCardSubtitle, { class: "card-subtitle" }, {
                      default: withCtx(() => [
                        createVNode("span", {
                          class: "d-inline-block text-truncate",
                          style: { "max-width": "300px" }
                        }, toDisplayString(_ctx.location.address) + ", " + toDisplayString(_ctx.location.city), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(VDivider)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, { class: "pt-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="card-content-title" data-v-33749eed${_scopeId2}>Horarios</p><div class="card-content-text" data-v-33749eed${_scopeId2}> Lunes - viernes 9am - 5pm </div>`);
                  _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("p", { class: "card-content-title" }, "Horarios"),
                    createVNode("div", { class: "card-content-text" }, " Lunes - viernes 9am - 5pm "),
                    createVNode(VDivider)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardActions, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (_ctx.location.tags.length) {
                    _push3(ssrRenderComponent(VChipGroup, { variant: "outlined" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(_ctx.location.tags, (tag) => {
                            _push4(ssrRenderComponent(VChip, {
                              key: tag,
                              class: "ma-1 tags-rounded",
                              color: "primary",
                              label: ""
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(tag)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(tag), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.location.tags, (tag) => {
                              return openBlock(), createBlock(VChip, {
                                key: tag,
                                class: "ma-1 tags-rounded",
                                color: "primary",
                                label: ""
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(tag), 1)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<div class="pa-3" data-v-33749eed${_scopeId2}><span class="text-caption font-weight-thin" data-v-33749eed${_scopeId2}>Sin etiquetas</span></div>`);
                  }
                } else {
                  return [
                    _ctx.location.tags.length ? (openBlock(), createBlock(VChipGroup, {
                      key: 0,
                      variant: "outlined"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.location.tags, (tag) => {
                          return openBlock(), createBlock(VChip, {
                            key: tag,
                            class: "ma-1 tags-rounded",
                            color: "primary",
                            label: ""
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(tag), 1)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "pa-3"
                    }, [
                      createVNode("span", { class: "text-caption font-weight-thin" }, "Sin etiquetas")
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(CardMenu, { onClick: clickHandler }),
              createVNode(VImg, {
                src: `/locations/${_ctx.location.image}.png`,
                "max-width": "330",
                "max-height": "250",
                "min-height": "250",
                cover: ""
              }, null, 8, ["src"]),
              createVNode(VCardItem, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, { class: "card-title" }, {
                    default: withCtx(() => [
                      createVNode("span", {
                        class: "d-inline-block text-truncate",
                        style: { "max-width": "300px" }
                      }, toDisplayString(_ctx.location.name), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VCardSubtitle, { class: "card-subtitle" }, {
                    default: withCtx(() => [
                      createVNode("span", {
                        class: "d-inline-block text-truncate",
                        style: { "max-width": "300px" }
                      }, toDisplayString(_ctx.location.address) + ", " + toDisplayString(_ctx.location.city), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VDivider)
                ]),
                _: 1
              }),
              createVNode(VCardText, { class: "pt-2" }, {
                default: withCtx(() => [
                  createVNode("p", { class: "card-content-title" }, "Horarios"),
                  createVNode("div", { class: "card-content-text" }, " Lunes - viernes 9am - 5pm "),
                  createVNode(VDivider)
                ]),
                _: 1
              }),
              createVNode(VCardActions, null, {
                default: withCtx(() => [
                  _ctx.location.tags.length ? (openBlock(), createBlock(VChipGroup, {
                    key: 0,
                    variant: "outlined"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.location.tags, (tag) => {
                        return openBlock(), createBlock(VChip, {
                          key: tag,
                          class: "ma-1 tags-rounded",
                          color: "primary",
                          label: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(tag), 1)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "pa-3"
                  }, [
                    createVNode("span", { class: "text-caption font-weight-thin" }, "Sin etiquetas")
                  ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/ubicaciones/LocationCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const LocationCard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-33749eed"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "LocationCardContainer",
  __ssrInlineRender: true,
  setup(__props) {
    const { locations, pagination, noLocations } = storeToRefs(useLocationStore());
    const load = (options) => {
      pagination.value.currentPage++;
      useLocationStore().getLocations().then(() => options.done("ok")).finally(() => {
        if (pagination.value.lastPage < pagination.value.currentPage) {
          options.done("empty");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (!unref(noLocations)) {
        _push(ssrRenderComponent(VInfiniteScroll, mergeProps({
          height: "900",
          mode: "intersect",
          onLoad: load
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VContainer, { fluid: "" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VRow, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(locations), (location) => {
                            _push4(ssrRenderComponent(VCol, {
                              cols: "12",
                              md: "3",
                              lg: "3"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(LocationCard, { location }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(LocationCard, { location }, null, 8, ["location"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(locations), (location) => {
                              return openBlock(), createBlock(VCol, {
                                cols: "12",
                                md: "3",
                                lg: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode(LocationCard, { location }, null, 8, ["location"])
                                ]),
                                _: 2
                              }, 1024);
                            }), 256))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(locations), (location) => {
                            return openBlock(), createBlock(VCol, {
                              cols: "12",
                              md: "3",
                              lg: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode(LocationCard, { location }, null, 8, ["location"])
                              ]),
                              _: 2
                            }, 1024);
                          }), 256))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VContainer, { fluid: "" }, {
                  default: withCtx(() => [
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(locations), (location) => {
                          return openBlock(), createBlock(VCol, {
                            cols: "12",
                            md: "3",
                            lg: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode(LocationCard, { location }, null, 8, ["location"])
                            ]),
                            _: 2
                          }, 1024);
                        }), 256))
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
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/ubicaciones/LocationCardContainer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "confirm-dialog",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    title: { type: String, default: "\xBFEst\xE1s seguro que quieres eliminar esta ubicaci\xF3n?" }
  }, {
    "model": { type: Boolean, default: false },
    "modelModifiers": {},
    "loading": { type: Boolean, default: false },
    "loadingModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["action-confirmed"], ["update:model", "update:loading"]),
  setup(__props, { emit: __emit }) {
    const model = useModel(__props, "model");
    const loading = useModel(__props, "loading");
    const emits = __emit;
    const deleteHandler = () => {
      emits("action-confirmed");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        width: "100%",
        "max-width": "544",
        modelValue: model.value,
        "onUpdate:modelValue": ($event) => model.value = $event
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, { class: "futzo-rounded" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardItem, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="title" data-v-3a445e3e${_scopeId4}>${ssrInterpolate(__props.title)}</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "title" }, toDisplayString(__props.title), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardSubtitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="subtitle" data-v-3a445e3e${_scopeId4}> Esta acci\xF3n no se puede deshacer</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "subtitle" }, " Esta acci\xF3n no se puede deshacer")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createVNode("span", { class: "title" }, toDisplayString(__props.title), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VCardSubtitle, null, {
                            default: withCtx(() => [
                              createVNode("span", { class: "subtitle" }, " Esta acci\xF3n no se puede deshacer")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="d-flex align-center w-100" data-v-3a445e3e${_scopeId3}>`);
                        _push4(ssrRenderComponent(VBtn, {
                          onClick: () => model.value = false,
                          class: "cancel-btn",
                          color: "rgba(52, 64, 84, 1)"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cancelar`);
                            } else {
                              return [
                                createTextVNode("Cancelar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          loading: loading.value,
                          onClick: deleteHandler,
                          variant: "elevated",
                          class: "confirm-btn",
                          border: "sm",
                          color: "rgba(232, 69, 74, 1)"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Eliminar definitivamente `);
                            } else {
                              return [
                                createTextVNode("Eliminar definitivamente ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "d-flex align-center w-100" }, [
                            createVNode(VBtn, {
                              onClick: () => model.value = false,
                              class: "cancel-btn",
                              color: "rgba(52, 64, 84, 1)"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Cancelar")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(VBtn, {
                              loading: loading.value,
                              onClick: deleteHandler,
                              variant: "elevated",
                              class: "confirm-btn",
                              border: "sm",
                              color: "rgba(232, 69, 74, 1)"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Eliminar definitivamente ")
                              ]),
                              _: 1
                            }, 8, ["loading"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardItem, null, {
                      default: withCtx(() => [
                        createVNode(VCardTitle, null, {
                          default: withCtx(() => [
                            createVNode("span", { class: "title" }, toDisplayString(__props.title), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VCardSubtitle, null, {
                          default: withCtx(() => [
                            createVNode("span", { class: "subtitle" }, " Esta acci\xF3n no se puede deshacer")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "d-flex align-center w-100" }, [
                          createVNode(VBtn, {
                            onClick: () => model.value = false,
                            class: "cancel-btn",
                            color: "rgba(52, 64, 84, 1)"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancelar")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VBtn, {
                            loading: loading.value,
                            onClick: deleteHandler,
                            variant: "elevated",
                            class: "confirm-btn",
                            border: "sm",
                            color: "rgba(232, 69, 74, 1)"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Eliminar definitivamente ")
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, { class: "futzo-rounded" }, {
                default: withCtx(() => [
                  createVNode(VCardItem, null, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createVNode("span", { class: "title" }, toDisplayString(__props.title), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(VCardSubtitle, null, {
                        default: withCtx(() => [
                          createVNode("span", { class: "subtitle" }, " Esta acci\xF3n no se puede deshacer")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "d-flex align-center w-100" }, [
                        createVNode(VBtn, {
                          onClick: () => model.value = false,
                          class: "cancel-btn",
                          color: "rgba(52, 64, 84, 1)"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancelar")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VBtn, {
                          loading: loading.value,
                          onClick: deleteHandler,
                          variant: "elevated",
                          class: "confirm-btn",
                          border: "sm",
                          color: "rgba(232, 69, 74, 1)"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Eliminar definitivamente ")
                          ]),
                          _: 1
                        }, 8, ["loading"])
                      ])
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
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/confirm-dialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ConfirmDialog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3a445e3e"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { isEdition, locationDialog, locationToDelete } = storeToRefs(useLocationStore());
    const showStoreLocationDialog = () => {
      isEdition.value = false;
      locationDialog.value = true;
    };
    const isLoading = ref(false);
    const deleteLocationHandler = () => {
      isLoading.value = true;
      useLocationStore().deleteLocation().finally(() => {
        isLoading.value = false;
      });
    };
    const searchLocationHandler = useDebounceFn((place) => {
      useLocationStore().pagination.perPage = 10;
      useLocationStore().pagination.currentPage = 1;
      useLocationStore().getLocations(place);
    }, 600);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageLayout = _sfc_main$2$1;
      const _component_SearchInput = __nuxt_component_1;
      const _component_PrimaryBtn = __nuxt_component_0;
      _push(ssrRenderComponent(_component_PageLayout, _attrs, {
        "app-bar": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$d, null, {
              buttons: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="d-flex"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_SearchInput, {
                    placeholder: "Busca una ubicaci\xF3n\u2026",
                    "min-width": 320,
                    class: "mr-2",
                    onSearching: unref(searchLocationHandler)
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_PrimaryBtn, {
                    disabled: false,
                    text: "Crear ubicaci\xF3n",
                    icon: "futzo-icon:plus",
                    variant: "tonal",
                    class: "mr-8",
                    onClick: showStoreLocationDialog
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "d-flex" }, [
                      createVNode(_component_SearchInput, {
                        placeholder: "Busca una ubicaci\xF3n\u2026",
                        "min-width": 320,
                        class: "mr-2",
                        onSearching: unref(searchLocationHandler)
                      }, null, 8, ["onSearching"]),
                      createVNode(_component_PrimaryBtn, {
                        disabled: false,
                        text: "Crear ubicaci\xF3n",
                        icon: "futzo-icon:plus",
                        variant: "tonal",
                        class: "mr-8",
                        onClick: showStoreLocationDialog
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$d, null, {
                buttons: withCtx(() => [
                  createVNode("div", { class: "d-flex" }, [
                    createVNode(_component_SearchInput, {
                      placeholder: "Busca una ubicaci\xF3n\u2026",
                      "min-width": 320,
                      class: "mr-2",
                      onSearching: unref(searchLocationHandler)
                    }, null, 8, ["onSearching"]),
                    createVNode(_component_PrimaryBtn, {
                      disabled: false,
                      text: "Crear ubicaci\xF3n",
                      icon: "futzo-icon:plus",
                      variant: "tonal",
                      class: "mr-8",
                      onClick: showStoreLocationDialog
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$c, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(ConfirmDialog, {
              model: unref(locationToDelete).show,
              "onUpdate:model": ($event) => unref(locationToDelete).show = $event,
              loading: unref(isLoading),
              "onUpdate:loading": ($event) => isRef(isLoading) ? isLoading.value = $event : null,
              title: "\xBFEst\xE1s seguro que quieres eliminar esta ubicaci\xF3n?",
              onActionConfirmed: deleteLocationHandler
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$c),
              createVNode(_sfc_main$5),
              createVNode(_sfc_main$2),
              createVNode(ConfirmDialog, {
                model: unref(locationToDelete).show,
                "onUpdate:model": ($event) => unref(locationToDelete).show = $event,
                loading: unref(isLoading),
                "onUpdate:loading": ($event) => isRef(isLoading) ? isLoading.value = $event : null,
                title: "\xBFEst\xE1s seguro que quieres eliminar esta ubicaci\xF3n?",
                onActionConfirmed: deleteLocationHandler
              }, null, 8, ["model", "onUpdate:model", "loading", "onUpdate:loading"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ubicaciones/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BdbwaSon.mjs.map
