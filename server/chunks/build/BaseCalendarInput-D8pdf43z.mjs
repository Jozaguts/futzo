import { defineComponent, mergeModels, useModel, ref, watch, unref, mergeProps, isRef, createSlots, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { Q as Qn } from './main-BplioMC0.mjs';
import { isDate } from 'date-fns';
import { C as VTextField } from './server.mjs';

function useCalendar() {
  const dp = ref();
  const dateToString = (date) => {
    return new Date(date).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  const formatDate = (date) => {
    if (Array.isArray(date)) {
      return date.map((date2) => {
        return dateToString(date2);
      }).join(" - ");
    } else {
      return dateToString(date);
    }
  };
  const getDate = (value, index) => {
    if (!value) return;
    if (isDate(value)) {
      return dateToString(value);
    }
    const dates = value.map((date) => formatDate(date));
    return dates[index - 1];
  };
  const selectDate = (dates) => {
    dp.value.selectDate();
  };
  const customPosition = (inputElement) => {
    const inputRect = inputElement == null ? void 0 : inputElement.getBoundingClientRect();
    return {
      top: inputRect.top,
      left: inputRect.left,
      transform: ""
    };
  };
  return {
    getDate,
    customPosition,
    selectDate,
    formatDate,
    dp
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseCalendarInput",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    paddingBottom: {
      type: String,
      required: false
    },
    paddingTop: {
      type: String,
      required: false
    },
    multiCalendar: {
      type: Boolean,
      default: () => false
    },
    positionValues: {
      type: Object,
      default: () => ({ top: 300, left: 200, transform: "translate(50%)" })
    },
    minDate: {
      type: Boolean,
      default: () => false,
      required: false
    },
    maxDate: {
      type: Date,
      default: () => false,
      required: false
    }
  }, {
    "start_date": {},
    "start_dateModifiers": {},
    "end_date": {},
    "end_dateModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["start_date_updated", "end_date_updated"], ["update:start_date", "update:end_date"]),
  setup(__props, { emit: __emit }) {
    const startDate = useModel(__props, "start_date");
    const endDate = useModel(__props, "end_date");
    const dates = ref();
    const props = __props;
    const { getDate, formatDate, selectDate, dp } = useCalendar();
    const emits = __emit;
    const attr = {
      position: "left",
      locale: "es",
      teleport: true,
      "hide-input-icon": true,
      "enable-time-picker": false,
      "month-name-format": "long",
      ref: dp,
      placeholder: "Selecciona las fechas del torneo",
      ui: {
        input: "v-field__input",
        menu: "border rounded-lg",
        calendarCell: "dp-custom-cell"
      }
    };
    if (props.multiCalendar) {
      attr["multi-calendars"] = { solo: true };
      attr.ui.menu += " calendar-custom-width";
      attr.range = true;
    }
    if (props.minDate) {
      attr["min-date"] = /* @__PURE__ */ new Date();
    }
    if (props.maxDate) {
      attr["max-date"] = props.maxDate;
    }
    watch(
      dates,
      (value) => {
        if (value) {
          if (isDate(value)) {
            startDate.value = value;
            emits("start_date_updated", value);
          } else if (Array.isArray(value)) {
            startDate.value = value[0];
            emits("start_date_updated", value[0]);
            endDate.value = value[1];
            emits("end_date_updated", value[1]);
          }
        } else {
          startDate.value = void 0;
          endDate.value = void 0;
        }
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        "--0b207986": __props.paddingTop,
        "--8d2baf4c": __props.paddingBottom
      } };
      _push(ssrRenderComponent(unref(Qn), mergeProps({
        onCleared: () => dates.value = null,
        format: unref(formatDate)
      }, { ...attr }, {
        modelValue: unref(dates),
        "onUpdate:modelValue": [($event) => isRef(dates) ? dates.value = $event : null, ($event) => _ctx.$emit("update:modelValue", $event)]
      }, _attrs, _cssVars), createSlots({ _: 2 }, [
        __props.multiCalendar ? {
          name: "dp-input",
          fn: withCtx(({ value }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VTextField, {
                value,
                density: "compact",
                variant: "outlined"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(VTextField, {
                  value,
                  density: "compact",
                  variant: "outlined"
                }, null, 8, ["value"])
              ];
            }
          }),
          key: "0"
        } : void 0,
        __props.multiCalendar ? {
          name: "action-preview",
          fn: withCtx(({ value }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="d-flex w-100 justify-between align-center"${_scopeId}><span class="custom-field-date border-thin border-secondary border-opacity-100 px-4 py-2 mr-2 rounded text-body-2"${_scopeId}>${ssrInterpolate(unref(getDate)(value, 1))}</span><span${_scopeId}>-</span><span class="custom-field-date border-thin border-secondary border-opacity-100 px-4 py-2 ml-2 rounded text-body-2"${_scopeId}>${ssrInterpolate(unref(getDate)(value, 2))}</span></div>`);
            } else {
              return [
                createVNode("div", { class: "d-flex w-100 justify-between align-center" }, [
                  createVNode("span", { class: "custom-field-date border-thin border-secondary border-opacity-100 px-4 py-2 mr-2 rounded text-body-2" }, toDisplayString(unref(getDate)(value, 1)), 1),
                  createVNode("span", null, "-"),
                  createVNode("span", { class: "custom-field-date border-thin border-secondary border-opacity-100 px-4 py-2 ml-2 rounded text-body-2" }, toDisplayString(unref(getDate)(value, 2)), 1)
                ])
              ];
            }
          }),
          key: "1"
        } : void 0,
        __props.multiCalendar ? {
          name: "action-buttons",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="mx-2 bg-surface border-thin border-secondary px-4 py-1 rounded"${_scopeId}> Cancelar </button><button class="bg-primary border-primary border-thin px-4 py-1 rounded"${_scopeId}> Aplicar </button>`);
            } else {
              return [
                createVNode("button", {
                  onClick: () => unref(dp).closeMenu(),
                  class: "mx-2 bg-surface border-thin border-secondary px-4 py-1 rounded"
                }, " Cancelar ", 8, ["onClick"]),
                createVNode("button", {
                  class: "bg-primary border-primary border-thin px-4 py-1 rounded",
                  onClick: unref(selectDate)
                }, " Aplicar ", 8, ["onClick"])
              ];
            }
          }),
          key: "2"
        } : void 0,
        !__props.multiCalendar ? {
          name: "action-row",
          fn: withCtx(({ selectDate: selectDate2 }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="action-row w-100"${_scopeId}><div class="d-flex mt-2 justify-space-between w-100"${_scopeId}><button class="select-button"${_scopeId}> cancelar </button><button class="select-button"${_scopeId}>Aplicar</button></div></div>`);
            } else {
              return [
                createVNode("div", { class: "action-row w-100" }, [
                  createVNode("div", { class: "d-flex mt-2 justify-space-between w-100" }, [
                    createVNode("button", {
                      class: "select-button",
                      onClick: ($event) => unref(dp).closeMenu()
                    }, " cancelar ", 8, ["onClick"]),
                    createVNode("button", {
                      class: "select-button",
                      onClick: selectDate2
                    }, "Aplicar", 8, ["onClick"])
                  ])
                ])
              ];
            }
          }),
          key: "3"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inputs/forms/BaseCalendarInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=BaseCalendarInput-D8pdf43z.mjs.map
