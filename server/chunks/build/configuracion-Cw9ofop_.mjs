import { defineComponent, computed, ref, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, isRef, defineAsyncComponent, createBlock, openBlock, toRef, createElementVNode, Fragment, normalizeStyle, normalizeClass, inject, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './index-DkcY5wU8.mjs';
import { b as useAuthStore } from './useScheduleStore-DBhAIDF3.mjs';
import { V as VCard, f as VCardItem, e as VCardTitle, E as VCardSubtitle, F as VCardText, g as genericComponent, a9 as VAvatar, aa as VImg, p as propsFactory, O as useProxiedModel, a2 as useDensity, j as useBackgroundColor, a3 as useScopeId, P as provideDefaults, c as useRender, a4 as VSlideGroup, a5 as convertToUnit, d as useTextColor, Z as forwardRefs, C as VTextField, K as __nuxt_component_0$1, ab as Al, t as makeTagProps, a6 as makeDensityProps, a7 as makeVSlideGroupProps, a8 as isObject, $ as omit, a0 as animate, a1 as standardEasing } from './server.mjs';
import { storeToRefs } from 'pinia';
import { a as VProgressCircular, V as VBtn, m as makeVBtnProps } from './VBtn-_od1f1mx.mjs';
import { V as VFileInput } from './VFileInput-gw90YVbK.mjs';
import { u as useSchemas } from './useSchemas-CFMbNxa_.mjs';
import { V as VForm } from './VForm-JZ5ZyLTF.mjs';
import { V as VRow, a as VCol } from './VRow-CwLG7ojV.mjs';
import { V as VSheet } from './VSheet-DVv3ytGE.mjs';
import { V as VWindow, a as VWindowItem, m as makeVWindowProps, b as makeVWindowItemProps } from './VWindowItem-DPPZL2sh.mjs';
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
import './useToast-m9XhiEp3.mjs';
import '@vue/reactivity';
import 'vue-router';
import 'perfect-scrollbar';
import 'deep-pick-omit';
import 'dayjs';
import 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/es.js';
import 'awesome-phonenumber';
import './vee-validate-DglmwfQ_.mjs';
import 'yup';

const VTabsSymbol = Symbol.for("vuetify:v-tabs");
const makeVTabProps = propsFactory({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...omit(makeVBtnProps({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab");
const VTab = genericComponent()({
  name: "VTab",
  props: makeVTabProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      textColorClasses: sliderColorClasses,
      textColorStyles: sliderColorStyles
    } = useTextColor(() => props.sliderColor);
    const rootEl = ref();
    const sliderEl = ref();
    const isHorizontal = computed(() => props.direction === "horizontal");
    const isSelected = computed(() => {
      var _a2;
      var _a, _b;
      return (_a2 = (_b = (_a = rootEl.value) == null ? void 0 : _a.group) == null ? void 0 : _b.isSelected.value) != null ? _a2 : false;
    });
    function updateSlider(_ref2) {
      var _a, _b;
      let {
        value
      } = _ref2;
      if (value) {
        const prevEl = (_b = (_a = rootEl.value) == null ? void 0 : _a.$el.parentElement) == null ? void 0 : _b.querySelector(".v-tab--selected .v-tab__slider");
        const nextEl = sliderEl.value;
        if (!prevEl || !nextEl) return;
        const color = getComputedStyle(prevEl).color;
        const prevBox = prevEl.getBoundingClientRect();
        const nextBox = nextEl.getBoundingClientRect();
        const xy = isHorizontal.value ? "x" : "y";
        const XY = isHorizontal.value ? "X" : "Y";
        const rightBottom = isHorizontal.value ? "right" : "bottom";
        const widthHeight = isHorizontal.value ? "width" : "height";
        const prevPos = prevBox[xy];
        const nextPos = nextBox[xy];
        const delta = prevPos > nextPos ? prevBox[rightBottom] - nextBox[rightBottom] : prevBox[xy] - nextBox[xy];
        const origin = Math.sign(delta) > 0 ? isHorizontal.value ? "right" : "bottom" : Math.sign(delta) < 0 ? isHorizontal.value ? "left" : "top" : "center";
        const size = Math.abs(delta) + (Math.sign(delta) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
        const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight]) || 0;
        const initialScale = prevBox[widthHeight] / nextBox[widthHeight] || 0;
        const sigma = 1.5;
        animate(nextEl, {
          backgroundColor: [color, "currentcolor"],
          transform: [`translate${XY}(${delta}px) scale${XY}(${initialScale})`, `translate${XY}(${delta / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, "none"],
          transformOrigin: Array(3).fill(origin)
        }, {
          duration: 225,
          easing: standardEasing
        });
      }
    }
    useRender(() => {
      const btnProps = VBtn.filterProps(props);
      return createVNode(VBtn, mergeProps({
        "symbol": VTabsSymbol,
        "ref": rootEl,
        "class": ["v-tab", props.class],
        "style": props.style,
        "tabindex": isSelected.value ? 0 : -1,
        "role": "tab",
        "aria-selected": String(isSelected.value),
        "active": false
      }, btnProps, attrs, {
        "block": props.fixed,
        "maxWidth": props.fixed ? 300 : void 0,
        "onGroup:selected": updateSlider
      }), {
        ...slots,
        default: () => {
          var _a2;
          var _a;
          return createElementVNode(Fragment, null, [(_a2 = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _a2 : props.text, !props.hideSlider && createElementVNode("div", {
            "ref": sliderEl,
            "class": normalizeClass(["v-tab__slider", sliderColorClasses.value]),
            "style": normalizeStyle(sliderColorStyles.value)
          }, null)]);
        }
      });
    });
    return forwardRefs({}, rootEl);
  }
});
const makeVTabsWindowProps = propsFactory({
  ...omit(makeVWindowProps(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow");
const VTabsWindow = genericComponent()({
  name: "VTabsWindow",
  props: makeVTabsWindowProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const group = inject(VTabsSymbol, null);
    const _model = useProxiedModel(props, "modelValue");
    const model = computed({
      get() {
        var _a;
        if (_model.value != null || !group) return _model.value;
        return (_a = group.items.value.find((item) => group.selected.value.includes(item.id))) == null ? void 0 : _a.value;
      },
      set(val) {
        _model.value = val;
      }
    });
    useRender(() => {
      const windowProps = VWindow.filterProps(props);
      return createVNode(VWindow, mergeProps({
        "_as": "VTabsWindow"
      }, windowProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs-window", props.class],
        "style": props.style,
        "mandatory": false,
        "touch": false
      }), slots);
    });
    return {};
  }
});
const makeVTabsWindowItemProps = propsFactory({
  ...makeVWindowItemProps()
}, "VTabsWindowItem");
const VTabsWindowItem = genericComponent()({
  name: "VTabsWindowItem",
  props: makeVTabsWindowItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const windowItemProps = VWindowItem.filterProps(props);
      return createVNode(VWindowItem, mergeProps({
        "_as": "VTabsWindowItem"
      }, windowItemProps, {
        "class": ["v-tabs-window-item", props.class],
        "style": props.style
      }), slots);
    });
    return {};
  }
});
function parseItems(items) {
  if (!items) return [];
  return items.map((item) => {
    if (!isObject(item)) return {
      text: item,
      value: item
    };
    return item;
  });
}
const makeVTabsProps = propsFactory({
  alignTabs: {
    type: String,
    default: "start"
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: void 0
  },
  hideSlider: Boolean,
  sliderColor: String,
  ...makeVSlideGroupProps({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...makeDensityProps(),
  ...makeTagProps()
}, "VTabs");
const VTabs = genericComponent()({
  name: "VTabs",
  props: makeVTabsProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const items = computed(() => parseItems(props.items));
    const {
      densityClasses
    } = useDensity(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      scopeId
    } = useScopeId();
    provideDefaults({
      VTab: {
        color: toRef(() => props.color),
        direction: toRef(() => props.direction),
        stacked: toRef(() => props.stacked),
        fixed: toRef(() => props.fixedTabs),
        sliderColor: toRef(() => props.sliderColor),
        hideSlider: toRef(() => props.hideSlider)
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props);
      const hasWindow = !!(slots.window || props.items.length > 0);
      return createElementVNode(Fragment, null, [createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs", `v-tabs--${props.direction}`, `v-tabs--align-tabs-${props.alignTabs}`, {
          "v-tabs--fixed-tabs": props.fixedTabs,
          "v-tabs--grow": props.grow,
          "v-tabs--stacked": props.stacked
        }, densityClasses.value, backgroundColorClasses.value, props.class],
        "style": [{
          "--v-tabs-height": convertToUnit(props.height)
        }, backgroundColorStyles.value, props.style],
        "role": "tablist",
        "symbol": VTabsSymbol
      }, scopeId, attrs), {
        default: () => {
          var _a2;
          var _a;
          return [(_a2 = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _a2 : items.value.map((item) => {
            var _a3;
            var _a22;
            return (_a3 = (_a22 = slots.tab) == null ? void 0 : _a22.call(slots, {
              item
            })) != null ? _a3 : createVNode(VTab, mergeProps(item, {
              "key": item.text,
              "value": item.value
            }), {
              default: slots[`tab.${item.value}`] ? () => {
                var _a32;
                return (_a32 = slots[`tab.${item.value}`]) == null ? void 0 : _a32.call(slots, {
                  item
                });
              } : void 0
            });
          })];
        }
      }), hasWindow && createVNode(VTabsWindow, mergeProps({
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "key": "tabs-window"
      }, scopeId), {
        default: () => {
          var _a;
          return [items.value.map((item) => {
            var _a3;
            var _a2;
            return (_a3 = (_a2 = slots.item) == null ? void 0 : _a2.call(slots, {
              item
            })) != null ? _a3 : createVNode(VTabsWindowItem, {
              "value": item.value
            }, {
              default: () => {
                var _a32;
                return (_a32 = slots[`item.${item.value}`]) == null ? void 0 : _a32.call(slots, {
                  item
                });
              }
            });
          }), (_a = slots.window) == null ? void 0 : _a.call(slots)];
        }
      })]);
    });
    return {};
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "avatar",
  __ssrInlineRender: true,
  setup(__props) {
    const { image } = storeToRefs(useAuthStore());
    const imageRef = ref(null);
    const loading = ref(false);
    const eventHandler = (event) => {
      var _a;
      const file = (_a = event.target.files) == null ? void 0 : _a[0];
      if (file) {
        loading.value = true;
        useAuthStore().updateImage(file).finally(() => {
          loading.value = false;
        });
      }
    };
    const showInput = () => {
      const input = imageRef.value.$el.querySelector("input");
      input.click();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      if (unref(loading)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex align-center justify-center fill-height" }, _attrs))}>`);
        _push(ssrRenderComponent(VProgressCircular, {
          color: "grey-lighten-2",
          indeterminate: ""
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "position-relative" }, _attrs))}>`);
        _push(ssrRenderComponent(VAvatar, { size: "64" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VImg, { src: unref(image) }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(VImg, { src: unref(image) }, null, 8, ["src"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(VBtn, {
          class: "image-plus-avatar__btn",
          icon: "true",
          size: "x-small",
          color: "background",
          width: "28",
          height: "28",
          onClick: showInput
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                class: "image-plus-avatar",
                name: "futzo-icon:image-plus-avatar"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  class: "image-plus-avatar",
                  name: "futzo-icon:image-plus-avatar"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(VFileInput, {
          class: "d-none",
          ref_key: "imageRef",
          ref: imageRef,
          onChange: eventHandler
        }, null, _parent));
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/configuration/avatar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "personal-data-card",
  __ssrInlineRender: true,
  setup(__props) {
    const { fields, handleSubmit } = useSchemas("edit-user");
    const user = computed(() => useAuthStore().user);
    const submit = handleSubmit((values) => {
      const updateUserForm = {
        id: user.value.id,
        name: values.name,
        phone: values.phone,
        email: values.email
      };
      useAuthStore().updateUser(updateUserForm);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$1;
      _push(ssrRenderComponent(VCard, mergeProps({
        class: "secondary-card",
        variant: "text"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardItem, { class: "secondary-card-item" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardText, { class: "secondary-card__title" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Edita tus datos personales`);
                      } else {
                        return [
                          createTextVNode("Edita tus datos personales")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardSubtitle, { class: "secondary-card__subtitle" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Estos son tus datos personales, puedes editarlos debajo.`);
                      } else {
                        return [
                          createTextVNode(" Estos son tus datos personales, puedes editarlos debajo.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardText, { class: "secondary-card__title" }, {
                      default: withCtx(() => [
                        createTextVNode("Edita tus datos personales")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardSubtitle, { class: "secondary-card__subtitle" }, {
                      default: withCtx(() => [
                        createTextVNode(" Estos son tus datos personales, puedes editarlos debajo.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VForm, {
                    class: "user-data-configuration-form",
                    onSubmit: unref(submit)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="label-form"${_scopeId5}>Nombre completo</p>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "label-form" }, "Nombre completo")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: unref(fields).name.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<small class="text-error"${_scopeId5}>${ssrInterpolate(unref(fields).name.fieldPropsValue["error-messages"][0])}</small>`);
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: unref(fields).name.fieldValue,
                                        "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                        variant: "plain",
                                        class: "user-data-configuration-form__input"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).name.fieldPropsValue["error-messages"][0]), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "label-form" }, "Nombre completo")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(fields).name.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).name.fieldPropsValue["error-messages"][0]), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="label-form"${_scopeId5}>Tel\xE9fono</p>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "label-form" }, "Tel\xE9fono")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_client_only, null, {}, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_client_only, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Al), {
                                            variant: "plain",
                                            singleLine: true,
                                            modelValue: unref(fields).phone.fieldValue,
                                            "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                            class: "user-data-configuration-form__input",
                                            invalidMessage: ({ label, example }) => {
                                              return `${label} debe ser un numero valido (${example}).`;
                                            }
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "invalidMessage"]),
                                          createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "label-form" }, "Tel\xE9fono")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_client_only, null, {
                                      default: withCtx(() => [
                                        createVNode(unref(Al), {
                                          variant: "plain",
                                          singleLine: true,
                                          modelValue: unref(fields).phone.fieldValue,
                                          "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                          class: "user-data-configuration-form__input",
                                          invalidMessage: ({ label, example }) => {
                                            return `${label} debe ser un numero valido (${example}).`;
                                          }
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "invalidMessage"]),
                                        createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="label-form"${_scopeId5}>Correo electr\xF3nico</p>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "label-form" }, "Correo electr\xF3nico")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      type: "email",
                                      modelValue: unref(fields).email.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<small class="text-error"${_scopeId5}>${ssrInterpolate(unref(fields).email.fieldPropsValue["error-messages"][0])}</small>`);
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        type: "email",
                                        modelValue: unref(fields).email.fieldValue,
                                        "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                        variant: "plain",
                                        class: "user-data-configuration-form__input"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).email.fieldPropsValue["error-messages"][0]), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "label-form" }, "Correo electr\xF3nico")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      type: "email",
                                      modelValue: unref(fields).email.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                      variant: "plain",
                                      class: "user-data-configuration-form__input"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).email.fieldPropsValue["error-messages"][0]), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "4",
                                offset: "3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="d-flex justify-end align-center pt-4"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(VBtn, {
                                      type: "submit",
                                      class: "user-data-configuration-form__button",
                                      color: "primary",
                                      dark: ""
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Guardar cambios `);
                                        } else {
                                          return [
                                            createTextVNode(" Guardar cambios ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "d-flex justify-end align-center pt-4" }, [
                                        createVNode(VBtn, {
                                          type: "submit",
                                          class: "user-data-configuration-form__button",
                                          color: "primary",
                                          dark: ""
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Guardar cambios ")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "4",
                                  offset: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "d-flex justify-end align-center pt-4" }, [
                                      createVNode(VBtn, {
                                        type: "submit",
                                        class: "user-data-configuration-form__button",
                                        color: "primary",
                                        dark: ""
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Guardar cambios ")
                                        ]),
                                        _: 1
                                      })
                                    ])
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
                          createVNode(VRow, {
                            class: "row-border-bottom",
                            "no-gutters": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "label-form" }, "Nombre completo")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(fields).name.fieldValue,
                                    "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                    variant: "plain",
                                    class: "user-data-configuration-form__input"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).name.fieldPropsValue["error-messages"][0]), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, {
                            class: "row-border-bottom",
                            "no-gutters": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "label-form" }, "Tel\xE9fono")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "4" }, {
                                default: withCtx(() => [
                                  createVNode(_component_client_only, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(Al), {
                                        variant: "plain",
                                        singleLine: true,
                                        modelValue: unref(fields).phone.fieldValue,
                                        "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                        class: "user-data-configuration-form__input",
                                        invalidMessage: ({ label, example }) => {
                                          return `${label} debe ser un numero valido (${example}).`;
                                        }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "invalidMessage"]),
                                      createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, {
                            class: "row-border-bottom",
                            "no-gutters": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "label-form" }, "Correo electr\xF3nico")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    type: "email",
                                    modelValue: unref(fields).email.fieldValue,
                                    "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                    variant: "plain",
                                    class: "user-data-configuration-form__input"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).email.fieldPropsValue["error-messages"][0]), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "4",
                                offset: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "d-flex justify-end align-center pt-4" }, [
                                    createVNode(VBtn, {
                                      type: "submit",
                                      class: "user-data-configuration-form__button",
                                      color: "primary",
                                      dark: ""
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Guardar cambios ")
                                      ]),
                                      _: 1
                                    })
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VForm, {
                      class: "user-data-configuration-form",
                      onSubmit: withModifiers(unref(submit), ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createVNode(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "3" }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "label-form" }, "Nombre completo")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "4" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(fields).name.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                  variant: "plain",
                                  class: "user-data-configuration-form__input"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).name.fieldPropsValue["error-messages"][0]), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "3" }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "label-form" }, "Tel\xE9fono")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "4" }, {
                              default: withCtx(() => [
                                createVNode(_component_client_only, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(Al), {
                                      variant: "plain",
                                      singleLine: true,
                                      modelValue: unref(fields).phone.fieldValue,
                                      "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                      class: "user-data-configuration-form__input",
                                      invalidMessage: ({ label, example }) => {
                                        return `${label} debe ser un numero valido (${example}).`;
                                      }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "invalidMessage"]),
                                    createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, {
                          class: "row-border-bottom",
                          "no-gutters": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "3" }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "label-form" }, "Correo electr\xF3nico")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "4" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  type: "email",
                                  modelValue: unref(fields).email.fieldValue,
                                  "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                  variant: "plain",
                                  class: "user-data-configuration-form__input"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).email.fieldPropsValue["error-messages"][0]), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "4",
                              offset: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex justify-end align-center pt-4" }, [
                                  createVNode(VBtn, {
                                    type: "submit",
                                    class: "user-data-configuration-form__button",
                                    color: "primary",
                                    dark: ""
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Guardar cambios ")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["onSubmit"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardItem, { class: "secondary-card-item" }, {
                default: withCtx(() => [
                  createVNode(VCardText, { class: "secondary-card__title" }, {
                    default: withCtx(() => [
                      createTextVNode("Edita tus datos personales")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardSubtitle, { class: "secondary-card__subtitle" }, {
                    default: withCtx(() => [
                      createTextVNode(" Estos son tus datos personales, puedes editarlos debajo.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(VForm, {
                    class: "user-data-configuration-form",
                    onSubmit: withModifiers(unref(submit), ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createVNode(VRow, {
                        class: "row-border-bottom",
                        "no-gutters": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "3" }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "label-form" }, "Nombre completo")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "4" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: unref(fields).name.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).name.fieldValue = $event,
                                variant: "plain",
                                class: "user-data-configuration-form__input"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).name.fieldPropsValue["error-messages"][0]), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, {
                        class: "row-border-bottom",
                        "no-gutters": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "3" }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "label-form" }, "Tel\xE9fono")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "4" }, {
                            default: withCtx(() => [
                              createVNode(_component_client_only, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Al), {
                                    variant: "plain",
                                    singleLine: true,
                                    modelValue: unref(fields).phone.fieldValue,
                                    "onUpdate:modelValue": ($event) => unref(fields).phone.fieldValue = $event,
                                    class: "user-data-configuration-form__input",
                                    invalidMessage: ({ label, example }) => {
                                      return `${label} debe ser un numero valido (${example}).`;
                                    }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalidMessage"]),
                                  createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).phone.fieldPropsValue["error-messages"][0]), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, {
                        class: "row-border-bottom",
                        "no-gutters": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "3" }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "label-form" }, "Correo electr\xF3nico")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "4" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                type: "email",
                                modelValue: unref(fields).email.fieldValue,
                                "onUpdate:modelValue": ($event) => unref(fields).email.fieldValue = $event,
                                variant: "plain",
                                class: "user-data-configuration-form__input"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("small", { class: "text-error" }, toDisplayString(unref(fields).email.fieldPropsValue["error-messages"][0]), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "4",
                            offset: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex justify-end align-center pt-4" }, [
                                createVNode(VBtn, {
                                  type: "submit",
                                  class: "user-data-configuration-form__button",
                                  color: "primary",
                                  dark: ""
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Guardar cambios ")
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["onSubmit"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/configuration/personal-data-card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0_lazy = defineAsyncComponent(() => import('./password-data-card-DeQM29QM.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "configuracion",
  __ssrInlineRender: true,
  setup(__props) {
    const user = computed(() => useAuthStore().user);
    const tab = ref(1);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_lazy_pages_configuration_password_data_card = __nuxt_component_0_lazy;
      _push(ssrRenderComponent(VSheet, mergeProps({
        height: "100%",
        color: "white",
        class: "pa-10 full-height configuration-v-sheet"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, { variant: "text" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardItem, { class: "mb-12" }, {
                    prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$2)
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, { class: "card-title ml-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a, _b;
                            if (_push5) {
                              _push5(`${ssrInterpolate((_a = unref(user)) == null ? void 0 : _a.name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString((_b = unref(user)) == null ? void 0 : _b.name), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardSubtitle, { class: "card-subtitle ml-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a, _b;
                            if (_push5) {
                              _push5(`${ssrInterpolate((_a = unref(user)) == null ? void 0 : _a.email)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString((_b = unref(user)) == null ? void 0 : _b.email), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardTitle, { class: "card-title ml-2" }, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.name), 1)
                              ];
                            }),
                            _: 1
                          }),
                          createVNode(VCardSubtitle, { class: "card-subtitle ml-2" }, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.email), 1)
                              ];
                            }),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTabs, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTab, { value: 1 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Datos personales`);
                                  } else {
                                    return [
                                      createTextVNode(" Datos personales")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTab, { value: 2 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Contrase\xF1a`);
                                  } else {
                                    return [
                                      createTextVNode(" Contrase\xF1a")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTab, { value: 1 }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Datos personales")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VTab, { value: 2 }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Contrase\xF1a")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindow, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTabsWindowItem, {
                                value: 1,
                                key: 1
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$1, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTabsWindowItem, {
                                value: 2,
                                key: 2
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_lazy_pages_configuration_password_data_card, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_lazy_pages_configuration_password_data_card)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                (openBlock(), createBlock(VTabsWindowItem, {
                                  value: 1,
                                  key: 1
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$1)
                                  ]),
                                  _: 1
                                })),
                                (openBlock(), createBlock(VTabsWindowItem, {
                                  value: 2,
                                  key: 2
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_lazy_pages_configuration_password_data_card)
                                  ]),
                                  _: 1
                                }))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTabs, {
                            modelValue: unref(tab),
                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                          }, {
                            default: withCtx(() => [
                              createVNode(VTab, { value: 1 }, {
                                default: withCtx(() => [
                                  createTextVNode(" Datos personales")
                                ]),
                                _: 1
                              }),
                              createVNode(VTab, { value: 2 }, {
                                default: withCtx(() => [
                                  createTextVNode(" Contrase\xF1a")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VTabsWindow, {
                            modelValue: unref(tab),
                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(VTabsWindowItem, {
                                value: 1,
                                key: 1
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$1)
                                ]),
                                _: 1
                              })),
                              (openBlock(), createBlock(VTabsWindowItem, {
                                value: 2,
                                key: 2
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_lazy_pages_configuration_password_data_card)
                                ]),
                                _: 1
                              }))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardItem, { class: "mb-12" }, {
                      prepend: withCtx(() => [
                        createVNode(_sfc_main$2)
                      ]),
                      default: withCtx(() => [
                        createVNode(VCardTitle, { class: "card-title ml-2" }, {
                          default: withCtx(() => {
                            var _a;
                            return [
                              createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.name), 1)
                            ];
                          }),
                          _: 1
                        }),
                        createVNode(VCardSubtitle, { class: "card-subtitle ml-2" }, {
                          default: withCtx(() => {
                            var _a;
                            return [
                              createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.email), 1)
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VTabs, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx(() => [
                            createVNode(VTab, { value: 1 }, {
                              default: withCtx(() => [
                                createTextVNode(" Datos personales")
                              ]),
                              _: 1
                            }),
                            createVNode(VTab, { value: 2 }, {
                              default: withCtx(() => [
                                createTextVNode(" Contrase\xF1a")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VTabsWindow, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(VTabsWindowItem, {
                              value: 1,
                              key: 1
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$1)
                              ]),
                              _: 1
                            })),
                            (openBlock(), createBlock(VTabsWindowItem, {
                              value: 2,
                              key: 2
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_lazy_pages_configuration_password_data_card)
                              ]),
                              _: 1
                            }))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
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
              createVNode(VCard, { variant: "text" }, {
                default: withCtx(() => [
                  createVNode(VCardItem, { class: "mb-12" }, {
                    prepend: withCtx(() => [
                      createVNode(_sfc_main$2)
                    ]),
                    default: withCtx(() => [
                      createVNode(VCardTitle, { class: "card-title ml-2" }, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.name), 1)
                          ];
                        }),
                        _: 1
                      }),
                      createVNode(VCardSubtitle, { class: "card-subtitle ml-2" }, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            createTextVNode(toDisplayString((_a = unref(user)) == null ? void 0 : _a.email), 1)
                          ];
                        }),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VTabs, {
                        modelValue: unref(tab),
                        "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                      }, {
                        default: withCtx(() => [
                          createVNode(VTab, { value: 1 }, {
                            default: withCtx(() => [
                              createTextVNode(" Datos personales")
                            ]),
                            _: 1
                          }),
                          createVNode(VTab, { value: 2 }, {
                            default: withCtx(() => [
                              createTextVNode(" Contrase\xF1a")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VTabsWindow, {
                        modelValue: unref(tab),
                        "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(VTabsWindowItem, {
                            value: 1,
                            key: 1
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$1)
                            ]),
                            _: 1
                          })),
                          (openBlock(), createBlock(VTabsWindowItem, {
                            value: 2,
                            key: 2
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_lazy_pages_configuration_password_data_card)
                            ]),
                            _: 1
                          }))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/configuracion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=configuracion-Cw9ofop_.mjs.map
