import { computed, ref, shallowRef, watchEffect, watch, createVNode, mergeProps, Fragment, withDirectives, resolveDirective, vModelText, useSSRContext, nextTick, defineComponent, mergeModels, useModel, withCtx, toDisplayString, renderSlot, unref, isRef, createSlots } from 'vue';
import { p as propsFactory, ai as makeVInputProps, bp as makeVFieldProps, q as genericComponent, bq as Intersect, I as useProxiedModel, aj as useFocus, w as useRender, aQ as filterInputAttrs, ak as VInput, br as filterFieldProps, bs as VField, bt as VCounter, F as forwardRefs, bu as callEvent, C as convertToUnit, e as VTextField, Z as clamp } from './server.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { V as VRow, a as VCol } from './VRow-BbW5rOE9.mjs';
import { V as Vn } from './main-Cx90S_O0.mjs';
import { isDate } from 'date-fns';

const makeVTextareaProps = propsFactory({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: (v) => !isNaN(parseFloat(v))
  },
  maxRows: {
    type: [Number, String],
    validator: (v) => !isNaN(parseFloat(v))
  },
  suffix: String,
  modelModifiers: Object,
  ...makeVInputProps(),
  ...makeVFieldProps()
}, "VTextarea");
const VTextarea = genericComponent()({
  name: "VTextarea",
  directives: {
    Intersect
  },
  inheritAttrs: false,
  props: makeVTextareaProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value || "").toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string") return void 0;
      return props.counter;
    });
    function onIntersect(isIntersecting, entries) {
      var _a, _b;
      if (!props.autofocus || !isIntersecting) return;
      (_b = (_a = entries[0].target) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    }
    const vInputRef = ref();
    const vFieldRef = ref();
    const controlHeight = shallowRef("");
    const textareaRef = ref();
    const isActive = computed(() => props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      var _a;
      if (textareaRef.value !== (void 0).activeElement) {
        (_a = textareaRef.value) == null ? void 0 : _a.focus();
      }
      if (!isFocused.value) focus();
    }
    function onControlClick(e) {
      onFocus();
      emit("click:control", e);
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = "";
        callEvent(props["onClick:clear"], e);
      });
    }
    function onInput(e) {
      var _a;
      const el = e.target;
      model.value = el.value;
      if ((_a = props.modelModifiers) == null ? void 0 : _a.trim) {
        const caretPosition = [el.selectionStart, el.selectionEnd];
        nextTick(() => {
          el.selectionStart = caretPosition[0];
          el.selectionEnd = caretPosition[1];
        });
      }
    }
    const sizerRef = ref();
    const rows = ref(+props.rows);
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    watchEffect(() => {
      if (!props.autoGrow) rows.value = +props.rows;
    });
    function calculateInputHeight() {
      if (!props.autoGrow) return;
      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value) return;
        const style = getComputedStyle(sizerRef.value);
        const fieldStyle = getComputedStyle(vFieldRef.value.$el);
        const padding = parseFloat(style.getPropertyValue("--v-field-padding-top")) + parseFloat(style.getPropertyValue("--v-input-padding-top")) + parseFloat(style.getPropertyValue("--v-field-padding-bottom"));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue("--v-input-control-height")));
        const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        const newHeight = clamp(height != null ? height : 0, minHeight, maxHeight);
        rows.value = Math.floor((newHeight - padding) / lineHeight);
        controlHeight.value = convertToUnit(newHeight);
      });
    }
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    watch(() => props.density, calculateInputHeight);
    let observer;
    watch(sizerRef, (val) => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        observer == null ? void 0 : observer.disconnect();
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = filterFieldProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-textarea v-text-field", {
          "v-textarea--prefixed": props.prefix,
          "v-textarea--suffixed": props.suffix,
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-textarea--auto-grow": props.autoGrow,
          "v-textarea--no-resize": props.noResize || props.autoGrow,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "style": {
              "--v-textarea-control-height": controlHeight.value
            },
            "onClick": onControlClick,
            "onMousedown": onControlMousedown,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"]
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              return createVNode(Fragment, null, [props.prefix && createVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), withDirectives(createVNode("textarea", mergeProps({
                "ref": textareaRef,
                "class": fieldClass,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "rows": props.rows,
                "name": props.name,
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[resolveDirective("intersect"), {
                handler: onIntersect
              }, null, {
                once: true
              }]]), props.autoGrow && withDirectives(createVNode("textarea", {
                "class": [fieldClass, "v-textarea__sizer"],
                "id": `${slotProps.id}-sizer`,
                "onUpdate:modelValue": ($event) => model.value = $event,
                "ref": sizerRef,
                "readonly": true,
                "aria-hidden": "true"
              }, null), [[vModelText, model.value]]), props.suffix && createVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _a;
          return createVNode(Fragment, null, [(_a = slots.details) == null ? void 0 : _a.call(slots, slotProps), hasCounter && createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
            "active": props.persistentCounter || isFocused.value,
            "value": counterValue.value,
            "max": max.value,
            "disabled": props.disabled
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BaseInput",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    placeholder: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: true
    }
  }, {
    "modelValue": {
      default: {
        fieldValue: "",
        fieldPropsValue: { "error-messages": [] }
      }
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VRow, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              lg: "4",
              md: "4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-body-1"${_scopeId2}>${ssrInterpolate(__props.label)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-body-1" }, toDisplayString(__props.label), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              lg: "8",
              md: "8"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "input", {}, () => {
                    _push3(ssrRenderComponent(VTextField, {
                      placeholder: __props.placeholder,
                      outlined: "",
                      modelValue: model.value.fieldValue,
                      "onUpdate:modelValue": ($event) => model.value.fieldValue = $event,
                      density: "compact",
                      "error-messages": model.value.fieldPropsValue["error-messages"]
                    }, null, _parent3, _scopeId2));
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "input", {}, () => [
                      createVNode(VTextField, {
                        placeholder: __props.placeholder,
                        outlined: "",
                        modelValue: model.value.fieldValue,
                        "onUpdate:modelValue": ($event) => model.value.fieldValue = $event,
                        density: "compact",
                        "error-messages": model.value.fieldPropsValue["error-messages"]
                      }, null, 8, ["placeholder", "modelValue", "onUpdate:modelValue", "error-messages"])
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, {
                cols: "12",
                lg: "4",
                md: "4"
              }, {
                default: withCtx(() => [
                  createVNode("span", { class: "text-body-1" }, toDisplayString(__props.label), 1)
                ]),
                _: 1
              }),
              createVNode(VCol, {
                cols: "12",
                lg: "8",
                md: "8"
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "input", {}, () => [
                    createVNode(VTextField, {
                      placeholder: __props.placeholder,
                      outlined: "",
                      modelValue: model.value.fieldValue,
                      "onUpdate:modelValue": ($event) => model.value.fieldValue = $event,
                      density: "compact",
                      "error-messages": model.value.fieldPropsValue["error-messages"]
                    }, null, 8, ["placeholder", "modelValue", "onUpdate:modelValue", "error-messages"])
                  ])
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inputs/forms/BaseInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
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
    }
  }, {
    "start_date": {},
    "start_dateModifiers": {},
    "end_date": {},
    "end_dateModifiers": {}
  }),
  emits: ["update:start_date", "update:end_date"],
  setup(__props) {
    const startDate = useModel(__props, "start_date");
    const endDate = useModel(__props, "end_date");
    const dates = ref([]);
    const props = __props;
    const { getDate, formatDate, customPosition, selectDate, dp } = useCalendar();
    const attr = {
      position: "left",
      locale: "es",
      "min-date": /* @__PURE__ */ new Date(),
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
    watch(
      dates,
      (value) => {
        if (value) {
          if (isDate(value)) {
            startDate.value = value;
          } else if (Array.isArray(value)) {
            startDate.value = value[0];
            endDate.value = value[1];
          }
        }
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        "--77b17258": __props.paddingTop,
        "--9814b370": __props.paddingBottom
      } };
      _push(ssrRenderComponent(unref(Vn), mergeProps({
        format: unref(formatDate),
        "alt-position": unref(customPosition)
      }, { ...attr }, {
        modelValue: unref(dates),
        "onUpdate:modelValue": ($event) => isRef(dates) ? dates.value = $event : null
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

export { VTextarea as V, _sfc_main$1 as _, _sfc_main as a };
//# sourceMappingURL=BaseCalendarInput-Dcxb45-u.mjs.map
