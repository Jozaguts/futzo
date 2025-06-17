import { useId, createVNode, mergeProps } from 'vue';
import { g as genericComponent, p as propsFactory, O as useProxiedModel, N as useFocus, c as useRender, Q as filterInputAttrs, aR as VInput, aI as VCheckboxBtn, $ as omit, aS as makeVInputProps, aT as makeVCheckboxBtnProps } from './server.mjs';
import { i as isNotNestedPath, c as cleanupNonNestedPath } from './vee-validate-DglmwfQ_.mjs';

const makeVCheckboxProps = propsFactory({
  ...makeVInputProps(),
  ...omit(makeVCheckboxBtnProps(), ["inline"])
}, "VCheckbox");
const VCheckbox = genericComponent()({
  name: "VCheckbox",
  inheritAttrs: false,
  props: makeVCheckboxProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:focused": (focused) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const uid = useId();
    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs);
      const inputProps = VInput.filterProps(props);
      const checkboxProps = VCheckboxBtn.filterProps(props);
      return createVNode(VInput, mergeProps({
        "class": ["v-checkbox", props.class]
      }, rootAttrs, inputProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "id": props.id || `checkbox-${uid}`,
        "focused": isFocused.value,
        "style": props.style
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            messagesId,
            isDisabled,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VCheckboxBtn, mergeProps(checkboxProps, {
            "id": id.value,
            "aria-describedby": messagesId.value,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value
          }, controlAttrs, {
            "error": isValid.value === false,
            "modelValue": model.value,
            "onUpdate:modelValue": ($event) => model.value = $event,
            "onFocus": focus,
            "onBlur": blur
          }), slots);
        }
      });
    });
    return {};
  }
});
/**
  * vee-validate v4.15.0
  * (c) 2024 Abdelrahman Awad
  * @license MIT
  */
const isObject = (obj) => obj !== null && !!obj && typeof obj === "object" && !Array.isArray(obj);
function isIndex(value) {
  return Number(value) >= 0;
}
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
function getTag(value) {
  if (value == null) {
    return value === void 0 ? "[object Undefined]" : "[object Null]";
  }
  return Object.prototype.toString.call(value);
}
function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}
function merge(target, source) {
  Object.keys(source).forEach((key) => {
    if (isPlainObject(source[key]) && isPlainObject(target[key])) {
      if (!target[key]) {
        target[key] = {};
      }
      merge(target[key], source[key]);
      return;
    }
    target[key] = source[key];
  });
  return target;
}
function toTypedSchema(yupSchema, opts = { abortEarly: false }) {
  const schema = {
    __type: "VVTypedSchema",
    async parse(values) {
      var _a;
      try {
        const output = await yupSchema.validate(values, Object.assign({}, opts));
        return {
          value: output,
          errors: []
        };
      } catch (err) {
        const error = err;
        if (error.name !== "ValidationError") {
          throw err;
        }
        if (!((_a = error.inner) === null || _a === void 0 ? void 0 : _a.length) && error.errors.length) {
          return { errors: [{ path: error.path, errors: error.errors }] };
        }
        const errors = error.inner.reduce((acc, curr) => {
          const path = curr.path || "";
          if (!acc[path]) {
            acc[path] = { errors: [], path };
          }
          acc[path].errors.push(...curr.errors);
          return acc;
        }, {});
        return { errors: Object.values(errors) };
      }
    },
    cast(values) {
      try {
        return yupSchema.cast(values);
      } catch (_a) {
        const defaults = yupSchema.getDefault();
        if (isObject(defaults) && isObject(values)) {
          return merge(defaults, values);
        }
        return values;
      }
    },
    describe(path) {
      try {
        if (!path) {
          return getDescriptionFromYupSpec(yupSchema.spec);
        }
        const description = getSpecForPath(path, yupSchema);
        if (!description) {
          return {
            required: false,
            exists: false
          };
        }
        return getDescriptionFromYupSpec(description);
      } catch (_a) {
        return {
          required: false,
          exists: false
        };
      }
    }
  };
  return schema;
}
function getDescriptionFromYupSpec(spec) {
  return {
    required: !spec.optional,
    exists: true
  };
}
function getSpecForPath(path, schema) {
  if (!isObjectSchema(schema)) {
    return null;
  }
  if (isNotNestedPath(path)) {
    const field = schema.fields[cleanupNonNestedPath(path)];
    return (field === null || field === void 0 ? void 0 : field.spec) || null;
  }
  const paths = (path || "").split(/\.|\[(\d+)\]/).filter(Boolean);
  let currentSchema = schema;
  for (let i = 0; i < paths.length; i++) {
    const p = paths[i];
    if (isObjectSchema(currentSchema) && p in currentSchema.fields) {
      currentSchema = currentSchema.fields[p];
    } else if (isTupleSchema(currentSchema) && isIndex(p)) {
      currentSchema = currentSchema.spec.types[Number(p)];
    } else if (isIndex(p) && isArraySchema(currentSchema)) {
      currentSchema = currentSchema.innerType;
    }
    if (i === paths.length - 1) {
      return currentSchema.spec;
    }
  }
  return null;
}
function isTupleSchema(schema) {
  return isObject(schema) && schema.type === "tuple";
}
function isObjectSchema(schema) {
  return isObject(schema) && schema.type === "object";
}
function isArraySchema(schema) {
  return isObject(schema) && schema.type === "array";
}

export { VCheckbox as V, toTypedSchema as t };
//# sourceMappingURL=vee-validate-yup-P4OcCFc2.mjs.map
