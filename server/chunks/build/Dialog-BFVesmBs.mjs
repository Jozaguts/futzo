import _sfc_main$4 from './nuxt-icon-D0x-uBOo.mjs';
import { computed, ref, shallowRef, watchEffect, watch, createVNode, mergeProps, Fragment, withDirectives, resolveDirective, vModelText, useSSRContext, defineComponent, unref, isRef, withCtx, toDisplayString, createTextVNode, nextTick, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { p as propsFactory, a7 as omit, W as makeVInputProps, bg as makeVFieldProps, L as genericComponent, bh as Intersect, X as useProxiedModel, Y as useFocus, x as useRender, as as filterInputAttrs, Z as VInput, bi as filterFieldProps, bj as VField, bk as VCounter, aC as forwardRefs, bm as makeVOverlayProps, bd as useScopeId, ar as getUid, bn as VOverlay, s as storeToRefs, ac as useTournamentStore, V as VCard, a as VCardItem, ab as VDivider, c as VCardText, bl as callEvent, v as convertToUnit, e as VBtn, aa as useTeamStore, f as useGlobalStore, d as VTextField, ad as VSelect, ae as VListItem, af as VListItemTitle, t as clamp } from './server.mjs';
import { u as useCategoryStore, a as _sfc_main$3 } from './drag-drop-image-CQcP1rQW.mjs';
import { H as Hn } from './main-dQC73R85.mjs';
import { V as VSheet, u as useSchemas } from './useSchemas-DRmKLgdK.mjs';
import { V as VContainer } from './VContainer-CGrX86QO.mjs';
import { V as VRow, a as VCol } from './VRow-mjWiXyjQ.mjs';
import { V as VDialog, a as VAutocomplete } from './VDialog-CDis8WGv.mjs';
import { u as useDebounceFn } from './index-pTp1Ji9-.mjs';

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
  ...omit(makeVInputProps(), ["centerAffix"]),
  ...omit(makeVFieldProps(), ["centerAffix"])
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
      if (attrs.maxlength)
        return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string")
        return void 0;
      return props.counter;
    });
    function onIntersect(isIntersecting, entries) {
      var _a, _b;
      if (!props.autofocus || !isIntersecting)
        return;
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
      if (!isFocused.value)
        focus();
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
      if (!props.autoGrow)
        rows.value = +props.rows;
    });
    function calculateInputHeight() {
      if (!props.autoGrow)
        return;
      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value)
          return;
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
        "centerAffix": false,
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
            "centerAffix": false,
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
const makeVTooltipProps = propsFactory({
  id: String,
  text: String,
  ...omit(makeVOverlayProps({
    closeOnBack: false,
    location: "end",
    locationStrategy: "connected",
    eager: true,
    minWidth: 0,
    offset: 10,
    openOnClick: false,
    openOnHover: true,
    origin: "auto",
    scrim: false,
    scrollStrategy: "reposition",
    transition: false
  }), ["absolute", "persistent"])
}, "VTooltip");
const VTooltip = genericComponent()({
  name: "VTooltip",
  props: makeVTooltipProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const uid = getUid();
    const id = computed(() => props.id || `v-tooltip-${uid}`);
    const overlay = ref();
    const location = computed(() => {
      return props.location.split(" ").length > 1 ? props.location : props.location + " center";
    });
    const origin = computed(() => {
      return props.origin === "auto" || props.origin === "overlap" || props.origin.split(" ").length > 1 || props.location.split(" ").length > 1 ? props.origin : props.origin + " center";
    });
    const transition = computed(() => {
      if (props.transition)
        return props.transition;
      return isActive.value ? "scale-transition" : "fade-transition";
    });
    const activatorProps = computed(() => mergeProps({
      "aria-describedby": id.value
    }, props.activatorProps));
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-tooltip", props.class],
        "style": props.style,
        "id": id.value
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "transition": transition.value,
        "absolute": true,
        "location": location.value,
        "origin": origin.value,
        "persistent": true,
        "role": "tooltip",
        "activatorProps": activatorProps.value,
        "_disableGlobalStack": true
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          var _a2;
          var _a;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return (_a2 = (_a = slots.default) == null ? void 0 : _a.call(slots, ...args)) != null ? _a2 : props.text;
        }
      });
    });
    return forwardRefs({}, overlay);
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "calendar",
  __ssrInlineRender: true,
  emits: ["selected-dates"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const dates = ref([]);
    const emits = __emit;
    const dp = ref();
    const getDate = (value, index) => {
      let dates2 = [];
      if (!value)
        return;
      if (value.length === 1) {
        const date = formatDate(value[0]);
        dates2.push(date);
      } else if (value.length === 2) {
        const date1 = formatDate(value[0]);
        const date2 = formatDate(value[1]);
        dates2.push(date1);
        dates2.push(date2);
      }
      return dates2[index - 1];
    };
    const selectDate = () => {
      dp.value.selectDate();
      emits("selected-dates", dates.value);
    };
    const formatDate = (date) => {
      const day = date.getDate();
      const month = date.toLocaleDateString("es-MX", { month: "short" });
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    };
    const customPosition = (inputElement) => {
      const inputRect = inputElement.getBoundingClientRect();
      return { top: inputRect.top - 60, left: inputRect.left - 100, transform: "translate(50%)" };
    };
    const setDatesFromRequest = (_dates) => {
      dates.value = _dates;
    };
    __expose({
      setDatesFromRequest
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Hn), mergeProps({
        ref_key: "dp",
        ref: dp,
        modelValue: unref(dates),
        "onUpdate:modelValue": ($event) => isRef(dates) ? dates.value = $event : null,
        position: "left",
        range: "",
        utc: "",
        locale: "es",
        teleport: true,
        "min-date": /* @__PURE__ */ new Date(),
        "multi-calendars": { solo: true },
        "hide-input-icon": "",
        "enable-time-picker": false,
        "month-name-format": "long",
        "alt-position": customPosition,
        "input-class-name": "v-field__input",
        "menu-class-name": " border rounded-lg",
        "calendar-cell-class-name": "dp-custom-cell",
        placeholder: " Selecciona las fechas del torneo"
      }, _attrs), {
        "action-preview": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (value) {
              _push2(`<div class="d-flex w-100 justify-between align-center"${_scopeId}><span class="border-thin border-secondary border-opacity-100 px-4 py-2 mr-2 rounded text-body-2"${_scopeId}>${ssrInterpolate(getDate(value, 1))}</span><span${_scopeId}>-</span><span class="border-thin border-secondary border-opacity-100 px-4 py-2 ml-2 rounded text-body-2"${_scopeId}>${ssrInterpolate(getDate(value, 2))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "d-flex w-100 justify-between align-center"
              }, [
                createVNode("span", { class: "border-thin border-secondary border-opacity-100 px-4 py-2 mr-2 rounded text-body-2" }, toDisplayString(getDate(value, 1)), 1),
                createVNode("span", null, "-"),
                createVNode("span", { class: "border-thin border-secondary border-opacity-100 px-4 py-2 ml-2 rounded text-body-2" }, toDisplayString(getDate(value, 2)), 1)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        "action-buttons": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              variant: "outlined",
              color: "secondary",
              class: "mx-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cancelar`);
                } else {
                  return [
                    createTextVNode("Cancelar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VBtn, {
              color: "primary",
              variant: "elevated",
              onClick: selectDate
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Aceptar`);
                } else {
                  return [
                    createTextVNode("Aceptar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                variant: "outlined",
                color: "secondary",
                class: "mx-2"
              }, {
                default: withCtx(() => [
                  createTextVNode("Cancelar")
                ]),
                _: 1
              }),
              createVNode(VBtn, {
                color: "primary",
                variant: "elevated",
                onClick: selectDate
              }, {
                default: withCtx(() => [
                  createTextVNode("Aceptar")
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/calendar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tournament-form",
  __ssrInlineRender: true,
  setup(__props) {
    const tournamentStore = useTournamentStore();
    const dragDropImageRef = ref(null);
    const calendarRef = ref(null);
    const imageForm = ref({
      file: null,
      name: "",
      size: 0
    });
    const { tournamentToEdit, tournamentId, isEdition } = storeToRefs(useTournamentStore());
    const { categories, formats } = storeToRefs(useCategoryStore());
    storeToRefs(useTeamStore());
    let locationsFind = ref([]);
    const {
      handleSubmit,
      resetForm,
      fields
    } = useSchemas("create-tournament");
    const saveImage = (file) => {
      imageForm.value.file = file;
      imageForm.value.name = file.name;
      imageForm.value.size = file.size;
      fields.image.fieldValue = file;
    };
    const removeImage = () => {
      imageForm.value.file = null;
      imageForm.value.name = "";
      imageForm.value.size = 0;
      fields.image.fieldValue = null;
    };
    const setDates = (dates) => {
      fields.start_date.fieldValue = dates[0];
      fields.end_date.fieldValue = dates[1];
    };
    const handleSelectLocation = (value) => {
      console.log(value);
      fields.address.fieldValue = value.description;
      fields.city.fieldValue = value.terms[2].value;
    };
    const search = useDebounceFn(async (place) => {
      if (!(void 0).google || !(void 0).google.maps || !(void 0).google.maps.places) {
        console.error("Google Maps JavaScript API library is not loaded.");
        return [];
      }
      const autocompleteService = new (void 0).google.maps.places.AutocompleteService();
      return new Promise((resolve, reject) => {
        autocompleteService.getPlacePredictions({ input: place }, (predictions, status) => {
          if (status !== (void 0).google.maps.places.PlacesServiceStatus.OK) {
            console.error("Error fetching place predictions:", status);
            resolve([]);
            return;
          }
          resolve(predictions);
        });
      });
    }, 400);
    const searchHandler = async (place) => {
      const response = await search(place);
      if (response) {
        locationsFind.value = response;
      }
    };
    const textButton = computed(() => {
      return isEdition.value ? "Editar torneo" : "Crear torneo";
    });
    const submitHandler = handleSubmit(async (values) => {
      var _a;
      const formData = new FormData();
      let tournamentStoreRequest = {
        category_id: values.category_id,
        description: values.description,
        end_date: values.end_date,
        location: values.location,
        name: values.name,
        prize: values.prize,
        start_date: values.start_date,
        tournament_format_id: values.tournament_format_id
      };
      if (values.image instanceof File) {
        tournamentStoreRequest.image = values.image;
      }
      for (const key in tournamentStoreRequest) {
        if (((_a = values[key]) == null ? void 0 : _a.length) && values[key][0] instanceof File) {
          formData.append(key, values[key][0]);
        } else if (typeof values[key] === "object" && !(values[key] instanceof File)) {
          formData.append(key, JSON.stringify(values[key]));
        } else if (values[key]) {
          formData.append(key, values[key]);
        }
      }
      if (isEdition.value) {
        tournamentStore.updateTournament(tournamentId.value, formData).then((response) => {
          if (response) {
            tournamentStore.loadTournaments();
            tournamentStore.dialog = false;
            resetForm();
            useGlobalStore().showSuccessNotification({ message: "Torneo actualizado correctamente" });
          }
        }).catch((error) => {
          console.error(error);
        });
      } else {
        tournamentStore.storeTournament(formData).then((response) => {
          if (response) {
            tournamentStore.loadTournaments();
            tournamentStore.dialog = false;
            resetForm();
            useGlobalStore().showSuccessNotification({ message: "Torneo creado correctamente" });
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$4;
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "container" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Nombre del torneo* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Nombre del torneo* ")
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
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          placeholder: "p.ej. Torneo de verano",
                          outlined: "",
                          modelValue: unref(fields).name.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                        }, unref(fields).name.fieldPropsValue, { density: "compact" }), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            placeholder: "p.ej. Torneo de verano",
                            outlined: "",
                            modelValue: unref(fields).name.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                          }, unref(fields).name.fieldPropsValue, { density: "compact" }), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode("span", { class: "text-body-1" }, " Nombre del torneo* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, mergeProps({
                          placeholder: "p.ej. Torneo de verano",
                          outlined: "",
                          modelValue: unref(fields).name.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                        }, unref(fields).name.fieldPropsValue, { density: "compact" }), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Imagen del torneo* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Imagen del torneo* ")
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
                      var _a, _b;
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$3, {
                          ref_key: "dragDropImageRef",
                          ref: dragDropImageRef,
                          image: unref(imageForm),
                          onImageDropped: saveImage,
                          onRemoveImage: removeImage
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="${ssrRenderClass([unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : "", "text-error text-caption"])}"${_scopeId3}>${ssrInterpolate((_a = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a : "")}</span>`);
                      } else {
                        return [
                          createVNode(_sfc_main$3, {
                            ref_key: "dragDropImageRef",
                            ref: dragDropImageRef,
                            image: unref(imageForm),
                            onImageDropped: saveImage,
                            onRemoveImage: removeImage
                          }, null, 8, ["image"]),
                          createVNode("span", {
                            class: ["text-error text-caption", unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : ""]
                          }, toDisplayString((_b = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _b : ""), 3)
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
                        createVNode("span", { class: "text-body-1" }, " Imagen del torneo* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createVNode(_sfc_main$3, {
                            ref_key: "dragDropImageRef",
                            ref: dragDropImageRef,
                            image: unref(imageForm),
                            onImageDropped: saveImage,
                            onRemoveImage: removeImage
                          }, null, 8, ["image"]),
                          createVNode("span", {
                            class: ["text-error text-caption", unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : ""]
                          }, toDisplayString((_a = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a : ""), 3)
                        ];
                      }),
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Categor\xEDa* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Categor\xEDa* ")
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
                        _push4(ssrRenderComponent(VSelect, mergeProps({
                          "no-data-text": "No hay categor\xEDas",
                          items: unref(categories),
                          density: "compact",
                          "item-title": "name",
                          "item-value": "id",
                          placeholder: "Categor\xEDa",
                          "menu-icon": "mdi-chevron-down",
                          modelValue: unref(fields).category_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event
                        }, unref(fields).category_id.fieldPropsValue), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSelect, mergeProps({
                            "no-data-text": "No hay categor\xEDas",
                            items: unref(categories),
                            density: "compact",
                            "item-title": "name",
                            "item-value": "id",
                            placeholder: "Categor\xEDa",
                            "menu-icon": "mdi-chevron-down",
                            modelValue: unref(fields).category_id.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event
                          }, unref(fields).category_id.fieldPropsValue), null, 16, ["items", "modelValue", "onUpdate:modelValue"])
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
                        createVNode("span", { class: "text-body-1" }, " Categor\xEDa* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VSelect, mergeProps({
                          "no-data-text": "No hay categor\xEDas",
                          items: unref(categories),
                          density: "compact",
                          "item-title": "name",
                          "item-value": "id",
                          placeholder: "Categor\xEDa",
                          "menu-icon": "mdi-chevron-down",
                          modelValue: unref(fields).category_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event
                        }, unref(fields).category_id.fieldPropsValue), null, 16, ["items", "modelValue", "onUpdate:modelValue"])
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Formato* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Formato* ")
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
                        _push4(ssrRenderComponent(VSelect, mergeProps({
                          "no-data-text": "No hay formatos",
                          items: unref(formats),
                          density: "compact",
                          "item-title": "name",
                          "item-value": "id",
                          placeholder: "Formato",
                          "menu-icon": "mdi-chevron-down",
                          modelValue: unref(fields).tournament_format_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).tournament_format_id.fieldValue = $event
                        }, unref(fields).tournament_format_id.fieldPropsValue), {
                          item: withCtx(({ props, item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, props, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTooltip, {
                                      activator: "parent",
                                      location: "end",
                                      "max-width": "300"
                                    }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(item.raw.description)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(item.raw.description), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTooltip, {
                                        activator: "parent",
                                        location: "end",
                                        "max-width": "300"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.raw.description), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItem, props, {
                                  default: withCtx(() => [
                                    createVNode(VTooltip, {
                                      activator: "parent",
                                      location: "end",
                                      "max-width": "300"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.raw.description), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1040)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSelect, mergeProps({
                            "no-data-text": "No hay formatos",
                            items: unref(formats),
                            density: "compact",
                            "item-title": "name",
                            "item-value": "id",
                            placeholder: "Formato",
                            "menu-icon": "mdi-chevron-down",
                            modelValue: unref(fields).tournament_format_id.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).tournament_format_id.fieldValue = $event
                          }, unref(fields).tournament_format_id.fieldPropsValue), {
                            item: withCtx(({ props, item }) => [
                              createVNode(VListItem, props, {
                                default: withCtx(() => [
                                  createVNode(VTooltip, {
                                    activator: "parent",
                                    location: "end",
                                    "max-width": "300"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.raw.description), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1040)
                            ]),
                            _: 1
                          }, 16, ["items", "modelValue", "onUpdate:modelValue"])
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
                        createVNode("span", { class: "text-body-1" }, " Formato* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VSelect, mergeProps({
                          "no-data-text": "No hay formatos",
                          items: unref(formats),
                          density: "compact",
                          "item-title": "name",
                          "item-value": "id",
                          placeholder: "Formato",
                          "menu-icon": "mdi-chevron-down",
                          modelValue: unref(fields).tournament_format_id.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).tournament_format_id.fieldValue = $event
                        }, unref(fields).tournament_format_id.fieldPropsValue), {
                          item: withCtx(({ props, item }) => [
                            createVNode(VListItem, props, {
                              default: withCtx(() => [
                                createVNode(VTooltip, {
                                  activator: "parent",
                                  location: "end",
                                  "max-width": "300"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.raw.description), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1040)
                          ]),
                          _: 1
                        }, 16, ["items", "modelValue", "onUpdate:modelValue"])
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Club/Lugar* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Club/Lugar* ")
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
                        _push4(ssrRenderComponent(VAutocomplete, mergeProps({
                          modelValue: unref(fields).location.fieldValue,
                          "onUpdate:modelValue": [($event) => unref(fields).location.fieldValue = $event, handleSelectLocation],
                          items: unref(locationsFind),
                          "no-data-text": "No hay resultados",
                          outlined: "",
                          "return-object": "",
                          "hide-selected": "",
                          "clear-on-select": "",
                          clearable: "",
                          "no-filter": ""
                        }, unref(fields).location.fieldPropsValue, {
                          "onUpdate:search": ($event) => searchHandler($event)
                        }), {
                          item: withCtx(({ props, item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, mergeProps(props, {
                                "two-line": "",
                                title: item.value.structured_formatting.main_text,
                                subtitle: item.value.structured_formatting.secondary_text
                              }), null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItem, mergeProps(props, {
                                  "two-line": "",
                                  title: item.value.structured_formatting.main_text,
                                  subtitle: item.value.structured_formatting.secondary_text
                                }), null, 16, ["title", "subtitle"])
                              ];
                            }
                          }),
                          selection: withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VListItemTitle, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VListItemTitle, {
                                        textContent: toDisplayString(item.value.structured_formatting.main_text)
                                      }, null, 8, ["textContent"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItem, null, {
                                  default: withCtx(() => [
                                    createVNode(VListItemTitle, {
                                      textContent: toDisplayString(item.value.structured_formatting.main_text)
                                    }, null, 8, ["textContent"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, mergeProps({
                            modelValue: unref(fields).location.fieldValue,
                            "onUpdate:modelValue": [($event) => unref(fields).location.fieldValue = $event, handleSelectLocation],
                            items: unref(locationsFind),
                            "no-data-text": "No hay resultados",
                            outlined: "",
                            "return-object": "",
                            "hide-selected": "",
                            "clear-on-select": "",
                            clearable: "",
                            "no-filter": ""
                          }, unref(fields).location.fieldPropsValue, {
                            "onUpdate:search": ($event) => searchHandler($event)
                          }), {
                            item: withCtx(({ props, item }) => [
                              createVNode(VListItem, mergeProps(props, {
                                "two-line": "",
                                title: item.value.structured_formatting.main_text,
                                subtitle: item.value.structured_formatting.secondary_text
                              }), null, 16, ["title", "subtitle"])
                            ]),
                            selection: withCtx(({ item }) => [
                              createVNode(VListItem, null, {
                                default: withCtx(() => [
                                  createVNode(VListItemTitle, {
                                    textContent: toDisplayString(item.value.structured_formatting.main_text)
                                  }, null, 8, ["textContent"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 1
                          }, 16, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search"])
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
                        createVNode("span", { class: "text-body-1" }, " Club/Lugar* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, mergeProps({
                          modelValue: unref(fields).location.fieldValue,
                          "onUpdate:modelValue": [($event) => unref(fields).location.fieldValue = $event, handleSelectLocation],
                          items: unref(locationsFind),
                          "no-data-text": "No hay resultados",
                          outlined: "",
                          "return-object": "",
                          "hide-selected": "",
                          "clear-on-select": "",
                          clearable: "",
                          "no-filter": ""
                        }, unref(fields).location.fieldPropsValue, {
                          "onUpdate:search": ($event) => searchHandler($event)
                        }), {
                          item: withCtx(({ props, item }) => [
                            createVNode(VListItem, mergeProps(props, {
                              "two-line": "",
                              title: item.value.structured_formatting.main_text,
                              subtitle: item.value.structured_formatting.secondary_text
                            }), null, 16, ["title", "subtitle"])
                          ]),
                          selection: withCtx(({ item }) => [
                            createVNode(VListItem, null, {
                              default: withCtx(() => [
                                createVNode(VListItemTitle, {
                                  textContent: toDisplayString(item.value.structured_formatting.main_text)
                                }, null, 8, ["textContent"])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 1
                        }, 16, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search"])
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Ciudad* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Ciudad* ")
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
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          placeholder: "p.ej. Puerto Vallarta",
                          density: "compact",
                          variant: "outlined",
                          readonly: "",
                          modelValue: unref(fields).city.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).city.fieldValue = $event
                        }, unref(fields).city.fieldPropsValue), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            placeholder: "p.ej. Puerto Vallarta",
                            density: "compact",
                            variant: "outlined",
                            readonly: "",
                            modelValue: unref(fields).city.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).city.fieldValue = $event
                          }, unref(fields).city.fieldPropsValue), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode("span", { class: "text-body-1" }, " Ciudad* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, mergeProps({
                          placeholder: "p.ej. Puerto Vallarta",
                          density: "compact",
                          variant: "outlined",
                          readonly: "",
                          modelValue: unref(fields).city.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).city.fieldValue = $event
                        }, unref(fields).city.fieldPropsValue), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Direcci\xF3n* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Direcci\xF3n* ")
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
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                          density: "compact",
                          variant: "outlined",
                          readonly: "",
                          modelValue: unref(fields).address.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                        }, unref(fields).address.fieldPropsValue), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, mergeProps({
                            placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                            density: "compact",
                            variant: "outlined",
                            readonly: "",
                            modelValue: unref(fields).address.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                          }, unref(fields).address.fieldPropsValue), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode("span", { class: "text-body-1" }, " Direcci\xF3n* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, mergeProps({
                          placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                          density: "compact",
                          variant: "outlined",
                          readonly: "",
                          modelValue: unref(fields).address.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                        }, unref(fields).address.fieldPropsValue), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Fechas del torneo* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Fechas del torneo* ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8",
                    id: "test"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2, {
                          ref_key: "calendarRef",
                          ref: calendarRef,
                          onSelectedDates: setDates
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$2, {
                            ref_key: "calendarRef",
                            ref: calendarRef,
                            onSelectedDates: setDates
                          }, null, 512)
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
                        createVNode("span", { class: "text-body-1" }, " Fechas del torneo* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8",
                      id: "test"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, {
                          ref_key: "calendarRef",
                          ref: calendarRef,
                          onSelectedDates: setDates
                        }, null, 512)
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Premio* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Premio* ")
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
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          placeholder: "p.ej. 10:00 a 18:00",
                          density: "compact",
                          variant: "outlined",
                          modelValue: unref(fields).prize.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).prize.fieldValue = $event
                        }, unref(fields).prize.fieldPropsValue), {
                          "append-inner": withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_nuxt_icon, {
                                name: "help-circle",
                                filled: "",
                                class: "cursor-pointer"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTooltip, { activator: "parent" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Este premio ser\xE1 otorgado al finalizar el torneo. `);
                                  } else {
                                    return [
                                      createTextVNode(" Este premio ser\xE1 otorgado al finalizar el torneo. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_nuxt_icon, {
                                  name: "help-circle",
                                  filled: "",
                                  class: "cursor-pointer"
                                }),
                                createVNode(VTooltip, { activator: "parent" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Este premio ser\xE1 otorgado al finalizar el torneo. ")
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
                          createVNode(VTextField, mergeProps({
                            placeholder: "p.ej. 10:00 a 18:00",
                            density: "compact",
                            variant: "outlined",
                            modelValue: unref(fields).prize.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).prize.fieldValue = $event
                          }, unref(fields).prize.fieldPropsValue), {
                            "append-inner": withCtx(() => [
                              createVNode(_component_nuxt_icon, {
                                name: "help-circle",
                                filled: "",
                                class: "cursor-pointer"
                              }),
                              createVNode(VTooltip, { activator: "parent" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Este premio ser\xE1 otorgado al finalizar el torneo. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 16, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode("span", { class: "text-body-1" }, " Premio* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, mergeProps({
                          placeholder: "p.ej. 10:00 a 18:00",
                          density: "compact",
                          variant: "outlined",
                          modelValue: unref(fields).prize.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).prize.fieldValue = $event
                        }, unref(fields).prize.fieldPropsValue), {
                          "append-inner": withCtx(() => [
                            createVNode(_component_nuxt_icon, {
                              name: "help-circle",
                              filled: "",
                              class: "cursor-pointer"
                            }),
                            createVNode(VTooltip, { activator: "parent" }, {
                              default: withCtx(() => [
                                createTextVNode(" Este premio ser\xE1 otorgado al finalizar el torneo. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 16, ["modelValue", "onUpdate:modelValue"])
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
                        _push4(`<span class="text-body-1"${_scopeId3}> Descripci\xF3n* </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-body-1" }, " Descripci\xF3n* ")
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
                        _push4(ssrRenderComponent(VTextarea, mergeProps({
                          modelValue: unref(fields).description.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).description.fieldValue = $event
                        }, unref(fields).description.fieldPropsValue, {
                          placeholder: "Una breve descripci\xF3n del torneo...",
                          variant: "outlined",
                          dense: "",
                          rows: "2",
                          class: "rounded-lg"
                        }), null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextarea, mergeProps({
                            modelValue: unref(fields).description.fieldValue,
                            "onUpdate:modelValue": ($event) => unref(fields).description.fieldValue = $event
                          }, unref(fields).description.fieldPropsValue, {
                            placeholder: "Una breve descripci\xF3n del torneo...",
                            variant: "outlined",
                            dense: "",
                            rows: "2",
                            class: "rounded-lg"
                          }), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode("span", { class: "text-body-1" }, " Descripci\xF3n* ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      lg: "8",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextarea, mergeProps({
                          modelValue: unref(fields).description.fieldValue,
                          "onUpdate:modelValue": ($event) => unref(fields).description.fieldValue = $event
                        }, unref(fields).description.fieldPropsValue, {
                          placeholder: "Una breve descripci\xF3n del torneo...",
                          variant: "outlined",
                          dense: "",
                          rows: "2",
                          class: "rounded-lg"
                        }), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(VCol, { cols: "6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          variant: "outlined",
                          block: "",
                          color: "secondary",
                          density: "compact",
                          size: "large"
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
                      } else {
                        return [
                          createVNode(VBtn, {
                            variant: "outlined",
                            block: "",
                            color: "secondary",
                            density: "compact",
                            size: "large"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancelar")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          variant: "elevated",
                          block: "",
                          color: "primary",
                          density: "compact",
                          size: "large",
                          onClick: unref(submitHandler)
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(textButton))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(textButton)), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            variant: "elevated",
                            block: "",
                            color: "primary",
                            density: "compact",
                            size: "large",
                            onClick: unref(submitHandler)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(textButton)), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "6" }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          variant: "outlined",
                          block: "",
                          color: "secondary",
                          density: "compact",
                          size: "large"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancelar")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "6" }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          variant: "elevated",
                          block: "",
                          color: "primary",
                          density: "compact",
                          size: "large",
                          onClick: unref(submitHandler)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(textButton)), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"])
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
                  createVNode(VCol, {
                    cols: "12",
                    lg: "4",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-body-1" }, " Nombre del torneo* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, mergeProps({
                        placeholder: "p.ej. Torneo de verano",
                        outlined: "",
                        modelValue: unref(fields).name.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event
                      }, unref(fields).name.fieldPropsValue, { density: "compact" }), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                      createVNode("span", { class: "text-body-1" }, " Imagen del torneo* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createVNode(_sfc_main$3, {
                          ref_key: "dragDropImageRef",
                          ref: dragDropImageRef,
                          image: unref(imageForm),
                          onImageDropped: saveImage,
                          onRemoveImage: removeImage
                        }, null, 8, ["image"]),
                        createVNode("span", {
                          class: ["text-error text-caption", unref(fields).image.fieldPropsValue["error-messages"][0] ? "ml-2" : ""]
                        }, toDisplayString((_a = unref(fields).image.fieldPropsValue["error-messages"][0]) != null ? _a : ""), 3)
                      ];
                    }),
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
                      createVNode("span", { class: "text-body-1" }, " Categor\xEDa* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VSelect, mergeProps({
                        "no-data-text": "No hay categor\xEDas",
                        items: unref(categories),
                        density: "compact",
                        "item-title": "name",
                        "item-value": "id",
                        placeholder: "Categor\xEDa",
                        "menu-icon": "mdi-chevron-down",
                        modelValue: unref(fields).category_id.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).category_id.fieldValue = $event
                      }, unref(fields).category_id.fieldPropsValue), null, 16, ["items", "modelValue", "onUpdate:modelValue"])
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
                      createVNode("span", { class: "text-body-1" }, " Formato* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VSelect, mergeProps({
                        "no-data-text": "No hay formatos",
                        items: unref(formats),
                        density: "compact",
                        "item-title": "name",
                        "item-value": "id",
                        placeholder: "Formato",
                        "menu-icon": "mdi-chevron-down",
                        modelValue: unref(fields).tournament_format_id.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).tournament_format_id.fieldValue = $event
                      }, unref(fields).tournament_format_id.fieldPropsValue), {
                        item: withCtx(({ props, item }) => [
                          createVNode(VListItem, props, {
                            default: withCtx(() => [
                              createVNode(VTooltip, {
                                activator: "parent",
                                location: "end",
                                "max-width": "300"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.raw.description), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1040)
                        ]),
                        _: 1
                      }, 16, ["items", "modelValue", "onUpdate:modelValue"])
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
                      createVNode("span", { class: "text-body-1" }, " Club/Lugar* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, mergeProps({
                        modelValue: unref(fields).location.fieldValue,
                        "onUpdate:modelValue": [($event) => unref(fields).location.fieldValue = $event, handleSelectLocation],
                        items: unref(locationsFind),
                        "no-data-text": "No hay resultados",
                        outlined: "",
                        "return-object": "",
                        "hide-selected": "",
                        "clear-on-select": "",
                        clearable: "",
                        "no-filter": ""
                      }, unref(fields).location.fieldPropsValue, {
                        "onUpdate:search": ($event) => searchHandler($event)
                      }), {
                        item: withCtx(({ props, item }) => [
                          createVNode(VListItem, mergeProps(props, {
                            "two-line": "",
                            title: item.value.structured_formatting.main_text,
                            subtitle: item.value.structured_formatting.secondary_text
                          }), null, 16, ["title", "subtitle"])
                        ]),
                        selection: withCtx(({ item }) => [
                          createVNode(VListItem, null, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, {
                                textContent: toDisplayString(item.value.structured_formatting.main_text)
                              }, null, 8, ["textContent"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }, 16, ["modelValue", "onUpdate:modelValue", "items", "onUpdate:search"])
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
                      createVNode("span", { class: "text-body-1" }, " Ciudad* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, mergeProps({
                        placeholder: "p.ej. Puerto Vallarta",
                        density: "compact",
                        variant: "outlined",
                        readonly: "",
                        modelValue: unref(fields).city.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).city.fieldValue = $event
                      }, unref(fields).city.fieldPropsValue), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                      createVNode("span", { class: "text-body-1" }, " Direcci\xF3n* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, mergeProps({
                        placeholder: "p.ej. Las Am\xE9ricas #323 Centro, Puerto Vallarta.",
                        density: "compact",
                        variant: "outlined",
                        readonly: "",
                        modelValue: unref(fields).address.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).address.fieldValue = $event
                      }, unref(fields).address.fieldPropsValue), null, 16, ["modelValue", "onUpdate:modelValue"])
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
                      createVNode("span", { class: "text-body-1" }, " Fechas del torneo* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8",
                    id: "test"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$2, {
                        ref_key: "calendarRef",
                        ref: calendarRef,
                        onSelectedDates: setDates
                      }, null, 512)
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
                      createVNode("span", { class: "text-body-1" }, " Premio* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, mergeProps({
                        placeholder: "p.ej. 10:00 a 18:00",
                        density: "compact",
                        variant: "outlined",
                        modelValue: unref(fields).prize.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).prize.fieldValue = $event
                      }, unref(fields).prize.fieldPropsValue), {
                        "append-inner": withCtx(() => [
                          createVNode(_component_nuxt_icon, {
                            name: "help-circle",
                            filled: "",
                            class: "cursor-pointer"
                          }),
                          createVNode(VTooltip, { activator: "parent" }, {
                            default: withCtx(() => [
                              createTextVNode(" Este premio ser\xE1 otorgado al finalizar el torneo. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 16, ["modelValue", "onUpdate:modelValue"])
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
                      createVNode("span", { class: "text-body-1" }, " Descripci\xF3n* ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    lg: "8",
                    md: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextarea, mergeProps({
                        modelValue: unref(fields).description.fieldValue,
                        "onUpdate:modelValue": ($event) => unref(fields).description.fieldValue = $event
                      }, unref(fields).description.fieldPropsValue, {
                        placeholder: "Una breve descripci\xF3n del torneo...",
                        variant: "outlined",
                        dense: "",
                        rows: "2",
                        class: "rounded-lg"
                      }), null, 16, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "6" }, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        variant: "outlined",
                        block: "",
                        color: "secondary",
                        density: "compact",
                        size: "large"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancelar")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "6" }, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        variant: "elevated",
                        block: "",
                        color: "primary",
                        density: "compact",
                        size: "large",
                        onClick: unref(submitHandler)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(textButton)), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/tournament-form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dialog",
  __ssrInlineRender: true,
  setup(__props) {
    const { dialog, isEdition, tournamentId } = storeToRefs(useTournamentStore());
    const title = computed(() => {
      return isEdition.value ? "Editar torneo" : "Crear un torneo";
    });
    const subtitle = computed(() => {
      return isEdition.value ? "Modifica los detalles del torneo." : "Completa los detalles del torneo para agregarlo a tu liga";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$4;
      _push(ssrRenderComponent(VDialog, mergeProps({
        modelValue: unref(dialog),
        "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
        "max-width": "688"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, {
              class: "create-tournament-card futzo-rounded",
              style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardItem, null, {
                    prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VSheet, {
                          border: "primary thin",
                          class: "mx-auto d-flex justify-center align-center mr-2 rounded-lg",
                          height: "45",
                          width: "45"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_nuxt_icon, {
                                name: "football",
                                filled: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_nuxt_icon, {
                                  name: "football",
                                  filled: ""
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSheet, {
                            border: "primary thin",
                            class: "mx-auto d-flex justify-center align-center mr-2 rounded-lg",
                            height: "45",
                            width: "45"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_nuxt_icon, {
                                name: "football",
                                filled: ""
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    title: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class=""${_scopeId3}>${ssrInterpolate(unref(title))}</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "" }, toDisplayString(unref(title)), 1)
                        ];
                      }
                    }),
                    subtitle: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(subtitle))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(subtitle)), 1)
                        ];
                      }
                    }),
                    append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_nuxt_icon, {
                          name: "x-dialog",
                          filled: "",
                          onClick: ($event) => dialog.value = false
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_nuxt_icon, {
                            name: "x-dialog",
                            filled: "",
                            onClick: ($event) => dialog.value = false
                          }, null, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$1, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardItem, null, {
                      prepend: withCtx(() => [
                        createVNode(VSheet, {
                          border: "primary thin",
                          class: "mx-auto d-flex justify-center align-center mr-2 rounded-lg",
                          height: "45",
                          width: "45"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_nuxt_icon, {
                              name: "football",
                              filled: ""
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      title: withCtx(() => [
                        createVNode("span", { class: "" }, toDisplayString(unref(title)), 1)
                      ]),
                      subtitle: withCtx(() => [
                        createTextVNode(toDisplayString(unref(subtitle)), 1)
                      ]),
                      append: withCtx(() => [
                        createVNode(_component_nuxt_icon, {
                          name: "x-dialog",
                          filled: "",
                          onClick: ($event) => dialog.value = false
                        }, null, 8, ["onClick"])
                      ]),
                      _: 1
                    }),
                    createVNode(VDivider),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$1)
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
              createVNode(VCard, {
                class: "create-tournament-card futzo-rounded",
                style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
              }, {
                default: withCtx(() => [
                  createVNode(VCardItem, null, {
                    prepend: withCtx(() => [
                      createVNode(VSheet, {
                        border: "primary thin",
                        class: "mx-auto d-flex justify-center align-center mr-2 rounded-lg",
                        height: "45",
                        width: "45"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_nuxt_icon, {
                            name: "football",
                            filled: ""
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    title: withCtx(() => [
                      createVNode("span", { class: "" }, toDisplayString(unref(title)), 1)
                    ]),
                    subtitle: withCtx(() => [
                      createTextVNode(toDisplayString(unref(subtitle)), 1)
                    ]),
                    append: withCtx(() => [
                      createVNode(_component_nuxt_icon, {
                        name: "x-dialog",
                        filled: "",
                        onClick: ($event) => dialog.value = false
                      }, null, 8, ["onClick"])
                    ]),
                    _: 1
                  }),
                  createVNode(VDivider),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$1)
                    ]),
                    _: 1
                  })
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/Dialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Dialog-BFVesmBs.mjs.map
