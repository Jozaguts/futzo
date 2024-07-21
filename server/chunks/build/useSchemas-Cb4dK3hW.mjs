import { computed, ref, watch, createVNode, mergeProps, Fragment, reactive, nextTick } from 'vue';
import { B as propsFactory, ax as makeVInputProps, a8 as wrapInArray, ay as makeVFieldProps, O as genericComponent, $ as useLocale, P as useProxiedModel, aA as useFocus, aN as humanReadableFileSize, ah as useRender, aB as filterInputAttrs, aC as VInput, aD as filterFieldProps, aE as VField, l as VChip, aF as VCounter, aG as forwardRefs, aO as useI18n, aH as callEvent } from './server.mjs';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const makeVFileInputProps = propsFactory({
  chips: Boolean,
  counter: Boolean,
  counterSizeString: {
    type: String,
    default: "$vuetify.fileInput.counterSize"
  },
  counterString: {
    type: String,
    default: "$vuetify.fileInput.counter"
  },
  hideInput: Boolean,
  multiple: Boolean,
  showSize: {
    type: [Boolean, Number, String],
    default: false,
    validator: (v) => {
      return typeof v === "boolean" || [1e3, 1024].includes(Number(v));
    }
  },
  ...makeVInputProps({
    prependIcon: "$file"
  }),
  modelValue: {
    type: [Array, Object],
    default: (props) => props.multiple ? [] : null,
    validator: (val) => {
      return wrapInArray(val).every((v) => v != null && typeof v === "object");
    }
  },
  ...makeVFieldProps({
    clearable: true
  })
}, "VFileInput");
const VFileInput = genericComponent()({
  name: "VFileInput",
  inheritAttrs: false,
  props: makeVFileInputProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (files) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const model = useProxiedModel(props, "modelValue", props.modelValue, (val) => wrapInArray(val), (val) => {
      var _a;
      return props.multiple || Array.isArray(props.modelValue) ? val : (_a = val[0]) != null ? _a : null;
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const base = computed(() => typeof props.showSize !== "boolean" ? props.showSize : void 0);
    const totalBytes = computed(() => {
      var _a;
      return ((_a = model.value) != null ? _a : []).reduce((bytes, _ref2) => {
        let {
          size = 0
        } = _ref2;
        return bytes + size;
      }, 0);
    });
    const totalBytesReadable = computed(() => humanReadableFileSize(totalBytes.value, base.value));
    const fileNames = computed(() => {
      var _a;
      return ((_a = model.value) != null ? _a : []).map((file) => {
        const {
          name = "",
          size = 0
        } = file;
        return !props.showSize ? name : `${name} (${humanReadableFileSize(size, base.value)})`;
      });
    });
    const counterValue = computed(() => {
      var _a2;
      var _a;
      const fileCount = (_a2 = (_a = model.value) == null ? void 0 : _a.length) != null ? _a2 : 0;
      if (props.showSize)
        return t(props.counterSizeString, fileCount, totalBytesReadable.value);
      else
        return t(props.counterString, fileCount);
    });
    const vInputRef = ref();
    const vFieldRef = ref();
    const inputRef = ref();
    const isActive = computed(() => isFocused.value || props.active);
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    function onFocus() {
      var _a;
      if (inputRef.value !== (void 0).activeElement) {
        (_a = inputRef.value) == null ? void 0 : _a.focus();
      }
      if (!isFocused.value)
        focus();
    }
    function onClickPrepend(e) {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.click();
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
    }
    function onControlClick(e) {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.click();
      emit("click:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = [];
        callEvent(props["onClick:clear"], e);
      });
    }
    watch(model, (newValue) => {
      const hasModelReset = !Array.isArray(newValue) || !newValue.length;
      if (hasModelReset && inputRef.value) {
        inputRef.value.value = "";
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter);
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
        "class": ["v-file-input", {
          "v-file-input--chips": !!props.chips,
          "v-file-input--hide": props.hideInput,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": props.style,
        "onClick:prepend": onClickPrepend
      }, rootAttrs, inputProps, {
        "centerAffix": !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref3) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref3;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "prepend-icon": props.prependIcon,
            "onMousedown": onControlMousedown,
            "onClick": onControlClick,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"]
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref4) => {
              var _a;
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref4;
              return createVNode(Fragment, null, [createVNode("input", mergeProps({
                "ref": inputRef,
                "type": "file",
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "multiple": props.multiple,
                "name": props.name,
                "onClick": (e) => {
                  e.stopPropagation();
                  if (isReadonly.value)
                    e.preventDefault();
                  onFocus();
                },
                "onChange": (e) => {
                  var _a2;
                  if (!e.target)
                    return;
                  const target = e.target;
                  model.value = [...(_a2 = target.files) != null ? _a2 : []];
                },
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), createVNode("div", {
                "class": fieldClass
              }, [!!((_a = model.value) == null ? void 0 : _a.length) && !props.hideInput && (slots.selection ? slots.selection({
                fileNames: fileNames.value,
                totalBytes: totalBytes.value,
                totalBytesReadable: totalBytesReadable.value
              }) : props.chips ? fileNames.value.map((text) => createVNode(VChip, {
                "key": text,
                "size": "small",
                "text": text
              }, null)) : fileNames.value.join(", "))])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _a, _b;
          return createVNode(Fragment, null, [(_a = slots.details) == null ? void 0 : _a.call(slots, slotProps), hasCounter && createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
            "active": !!((_b = model.value) == null ? void 0 : _b.length),
            "value": counterValue.value,
            "disabled": props.disabled
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, inputRef);
  }
});
function useSchemas(schemaNAme) {
  const vuetifyConfig = (state) => {
    return {
      props: {
        "error-messages": state.errors
      }
    };
  };
  const schema = getSchemaByName(schemaNAme);
  const fields = Object.keys(schema.fields);
  const { defineField, handleSubmit, resetForm } = useForm({
    validationSchema: schema
  });
  const fieldProps = reactive({});
  fields.forEach((field) => {
    const [fieldValue, fieldPropsValue] = defineField(field, vuetifyConfig);
    fieldProps[field] = { fieldValue, fieldPropsValue };
  });
  return {
    handleSubmit,
    resetForm,
    fields: fieldProps
  };
}
function getSchemaByName(name) {
  let schemaFields = {};
  const { t } = useI18n();
  const yusString = () => {
    return yup.string().test(
      "no-leading-space",
      "No se permite espacio en blanco al inicio",
      (value) => {
        if (value && value.startsWith(" ")) {
          return false;
        }
        return true;
      }
    );
  };
  switch (name) {
    case "create-tournament":
      schemaFields.name = yusString().min(6, t("tournament_min")).required(t("forms.required"));
      schemaFields.image = yup.mixed().test("File is required", "Campo requerido ", (value) => value);
      schemaFields.category_id = yup.number().required(t("forms.required"));
      schemaFields.tournament_format_id = yup.number().required(t("forms.required"));
      schemaFields.location = yup.object();
      schemaFields.city = yusString().required(t("forms.required"));
      schemaFields.address = yusString().required(t("forms.required"));
      schemaFields.start_date = yup.date().nullable();
      schemaFields.end_date = yup.date().nullable();
      schemaFields.prize = yusString().required(t("forms.required"));
      schemaFields.winner = yusString().nullable();
      schemaFields.description = yusString().nullable();
      schemaFields.status = yusString().nullable();
      break;
    case "create-league":
      schemaFields.id = yusString().nullable();
      schemaFields.name = yusString().min(6, t("league_min")).required(t("forms.required"));
      schemaFields.location = yusString().nullable();
      schemaFields.description = yusString().nullable();
      schemaFields.creation_date = yup.date().nullable();
      schemaFields.football_type_id = yup.number().required(t("forms.required"));
      schemaFields.logo = yup.mixed().test("File is required", "File ", (value) => value);
      schemaFields.banner = yup.mixed().test("File is required", "File ", (value) => value);
      schemaFields.status = yusString().nullable();
      break;
    case "create-category":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.age_range = yusString().matches(
        /^(\d{2}-\d{2}|\*)$/,
        "El formato debe ser 'NN-NN' donde N es un d\xEDgito, o '*' para edad libre."
      ).test(
        "es-rango-valido-o-libre",
        'El primer n\xFAmero debe ser menor que el segundo, o usar "*" para edad libre',
        (value) => {
          if (!value)
            return false;
          if (value === "*")
            return true;
          const [inicio, fin] = value.split("-").map(Number);
          return inicio < fin;
        }
      );
      schemaFields.gender = yusString().required(t("forms.required"));
      break;
    case "create-team":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.category_id = yup.number().required(t("forms.required"));
      schemaFields.tournament_id = yup.number().required(t("forms.required"));
      schemaFields.president_name = yusString().required(t("forms.required"));
      schemaFields.coach_name = yusString().required(t("forms.required"));
      schemaFields.phone = yusString().matches(/^\d{10}$/, "N\xFAmero de tel\xE9fono no es v\xE1lido").required();
      schemaFields.email = yusString().email();
      schemaFields.address = yusString();
      schemaFields.image = yup.array().nullable();
      schemaFields.location_id = yup.number().nullable();
      break;
    case "edit-user":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.email = yup.string().email("Correo electr\xF3nico no v\xE1lido").required(t("forms.required"));
      schemaFields.phone = yusString();
      break;
    case "edit-password":
      schemaFields.password = yup.string().required(t("forms.required"));
      schemaFields.new_password = yup.string().required(t("forms.required"));
      schemaFields.new_password_confirmation = yup.string().required(t("forms.required")).oneOf([yup.ref("new_password"), null], "Las contrase\xF1as no coinciden");
      break;
    default:
      schemaFields = yup.mixed();
  }
  return yup.object().shape(schemaFields);
}

export { VFileInput as V, useSchemas as u };
//# sourceMappingURL=useSchemas-Cb4dK3hW.mjs.map
