import { _ as __nuxt_component_0 } from './index-DkcY5wU8.mjs';
import { defineComponent, useModel, reactive, ref, computed, watch, mergeProps, unref, withCtx, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { M as MAX_SIZE } from './useScheduleStore-DBhAIDF3.mjs';
import { s as setInterval } from './interval-DSlygkzF.mjs';
import { a9 as VAvatar, bw as VProgressLinear } from './server.mjs';
import { V as VSheet } from './VSheet-DVv3ytGE.mjs';
import { V as VFileInput } from './VFileInput-gw90YVbK.mjs';
import { V as VBtn } from './VBtn-_od1f1mx.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "drag-drop-image",
  __ssrInlineRender: true,
  props: {
    "modelValue": { default: null },
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const image = useModel(__props, "modelValue");
    const state = reactive({
      dragging: false,
      dropped: false,
      interval: 1,
      value: 10,
      bufferValue: 20,
      image: {
        file: image.value,
        name: "",
        size: 0,
        hasError: false,
        errors: {
          name: null,
          description: null,
          action: null
        }
      }
    });
    const inputRef = ref();
    const border = computed(() => {
      if (state.image.hasError) return "";
      return `primary ${state.dragging || state.dropped ? "sm opacity-100" : "thin"}`;
    });
    const imageName = computed(() => {
      const formattedName = state.image.name.replace(/[-_]/g, " ");
      const capitalized = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
      return capitalized.length > 20 ? `${capitalized.substring(0, 20)}...` : capitalized;
    });
    const validateSize = () => {
      const imageSizeMB = Number((state.image.size / (1024 * 1024)).toFixed(2));
      if (imageSizeMB > MAX_SIZE) {
        state.image.errors = {
          name: `${imageSizeMB}MB`,
          description: "La imagen es muy pesada, prueba con otra.",
          action: "reintentar"
        };
        state.image.hasError = true;
      }
    };
    const eventHandler = (e) => {
      var _a;
      e.preventDefault();
      state.dragging = false;
      let files = [];
      if (e.type === "drop") {
        const event = e;
        files = (_a = event == null ? void 0 : event.dataTransfer) == null ? void 0 : _a.files;
      } else if (e.type === "change") {
        files = e.target.files;
      }
      if (files.length) {
        startBuffer();
        state.dropped = true;
        image.value = files[0];
        state.image.name = files[0].name;
        state.image.size = files[0].size;
      }
    };
    const startBuffer = () => {
      state.interval = setInterval();
    };
    const removeImage = () => {
      state.image.name = "";
      state.image.size = 0;
      state.image.hasError = false;
      state.image.errors = {
        name: "",
        description: "",
        action: ""
      };
      state.dragging = false;
      state.dropped = false;
      state.value = 10;
      state.bufferValue = 20;
      image.value = null;
    };
    const loadImage = () => {
      state.value = 100;
      state.bufferValue = 100;
      state.dropped = true;
      state.image.name = "imagen.jpg";
    };
    watch(
      () => state.value,
      (newValue) => {
        if (newValue >= 100) {
          clearInterval(state.interval);
        }
      }
    );
    watch(
      () => state.image.size,
      () => {
        validateSize();
      }
    );
    const showInput = () => {
      var _a, _b;
      const input = (_b = (_a = inputRef.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.querySelector("input");
      input.click();
    };
    __expose({
      loadImage
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "d-flex",
          unref(state).image.hasError ? " border-error border-md border-opacity-100  rounded rounded-lg" : ""
        ]
      }, _attrs))}>`);
      _push(ssrRenderComponent(VAvatar, {
        color: !unref(state).dropped ? "background" : "surface",
        size: "64",
        class: "mr-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(state).dropped) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "futzo-icon:image-plus",
                class: "image-plus"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(state).dropped) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "futzo-icon:file-type-img",
                class: "file-type-img"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !unref(state).dropped ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                name: "futzo-icon:image-plus",
                class: "image-plus"
              })) : createCommentVNode("", true),
              unref(state).dropped ? (openBlock(), createBlock(_component_Icon, {
                key: 1,
                name: "futzo-icon:file-type-img",
                class: "file-type-img"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VSheet, {
        border: unref(border),
        width: "100%",
        class: "d-flex flex-column align-center rounded-lg pa-2",
        onDragover: () => {
        },
        onDrop: [eventHandler, ($event) => unref(state).dragging = false],
        onDragenter: ($event) => unref(state).dragging = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            if (!unref(state).dropped) {
              _push2(`<div class="d-flex justify-center align-center flex-column"${_scopeId}><div${_scopeId}>`);
              _push2(ssrRenderComponent(VFileInput, {
                hidden: true,
                class: "d-none",
                ref_key: "inputRef",
                ref: inputRef,
                onChange: eventHandler
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(VBtn, {
                variant: "text",
                color: "primary",
                class: "text-body-1 px-1",
                onClick: showInput
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Haz clic para a\xF1adir `);
                  } else {
                    return [
                      createTextVNode("Haz clic para a\xF1adir ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<span class="text-body-1"${_scopeId}>o arrastra aqu\xED</span></div><p class="text-caption"${_scopeId}>SVG, PNG o JPG (max. 1080x1080px)</p></div>`);
            } else {
              _push2(`<div class="d-flex justify-space-between align-start h-100 w-100 flex-column"${_scopeId}><div class="d-flex justify-space-between w-100 align-center"${_scopeId}><p class="text-body-1"${_scopeId}>${ssrInterpolate(unref(state).image.hasError ? (_a = unref(state).image.errors) == null ? void 0 : _a.name : unref(imageName))}</p>`);
              _push2(ssrRenderComponent(VBtn, {
                icon: true,
                size: "default",
                slim: "",
                flat: "",
                density: "compact",
                color: "background",
                onClick: removeImage
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (!unref(state).image.hasError) {
                      _push3(ssrRenderComponent(_component_Icon, {
                        name: "futzo-icon:trash",
                        class: "trash"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(_component_Icon, {
                        name: "futzo-icon:trash-error",
                        class: "trash-error"
                      }, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      !unref(state).image.hasError ? (openBlock(), createBlock(_component_Icon, {
                        key: 0,
                        name: "futzo-icon:trash",
                        class: "trash"
                      })) : (openBlock(), createBlock(_component_Icon, {
                        key: 1,
                        name: "futzo-icon:trash-error",
                        class: "trash-error"
                      }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              if (!unref(state).image.hasError) {
                _push2(`<div class="d-flex w-100 justify-center align-center"${_scopeId}>`);
                _push2(ssrRenderComponent(VProgressLinear, {
                  modelValue: unref(state).value,
                  "onUpdate:modelValue": ($event) => unref(state).value = $event,
                  "buffer-value": unref(state).bufferValue,
                  color: "primary",
                  rounded: "",
                  max: "100"
                }, null, _parent2, _scopeId));
                _push2(`<span class="ml-2 text-caption"${_scopeId}>${ssrInterpolate(unref(state).value.toFixed(0))}%</span></div>`);
              } else {
                _push2(`<div class="w-100"${_scopeId}><p class="text-caption"${_scopeId}>${ssrInterpolate((_b = unref(state).image.errors) == null ? void 0 : _b.description)}</p>`);
                _push2(ssrRenderComponent(VBtn, {
                  onClick: removeImage,
                  density: "compact",
                  class: "pa-0 text-capitalize",
                  variant: "text"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    var _a2, _b2;
                    if (_push3) {
                      _push3(`${ssrInterpolate((_a2 = unref(state).image.errors) == null ? void 0 : _a2.action)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString((_b2 = unref(state).image.errors) == null ? void 0 : _b2.action), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div>`);
            }
          } else {
            return [
              !unref(state).dropped ? (openBlock(), createBlock("div", {
                key: 0,
                class: "d-flex justify-center align-center flex-column"
              }, [
                createVNode("div", null, [
                  createVNode(VFileInput, {
                    hidden: true,
                    class: "d-none",
                    ref_key: "inputRef",
                    ref: inputRef,
                    onChange: eventHandler
                  }, null, 512),
                  createVNode(VBtn, {
                    variant: "text",
                    color: "primary",
                    class: "text-body-1 px-1",
                    onClick: showInput
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Haz clic para a\xF1adir ")
                    ]),
                    _: 1
                  }),
                  createVNode("span", { class: "text-body-1" }, "o arrastra aqu\xED")
                ]),
                createVNode("p", { class: "text-caption" }, "SVG, PNG o JPG (max. 1080x1080px)")
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "d-flex justify-space-between align-start h-100 w-100 flex-column"
              }, [
                createVNode("div", { class: "d-flex justify-space-between w-100 align-center" }, [
                  createVNode("p", { class: "text-body-1" }, toDisplayString(unref(state).image.hasError ? (_c = unref(state).image.errors) == null ? void 0 : _c.name : unref(imageName)), 1),
                  createVNode(VBtn, {
                    icon: true,
                    size: "default",
                    slim: "",
                    flat: "",
                    density: "compact",
                    color: "background",
                    onClick: removeImage
                  }, {
                    default: withCtx(() => [
                      !unref(state).image.hasError ? (openBlock(), createBlock(_component_Icon, {
                        key: 0,
                        name: "futzo-icon:trash",
                        class: "trash"
                      })) : (openBlock(), createBlock(_component_Icon, {
                        key: 1,
                        name: "futzo-icon:trash-error",
                        class: "trash-error"
                      }))
                    ]),
                    _: 1
                  })
                ]),
                !unref(state).image.hasError ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "d-flex w-100 justify-center align-center"
                }, [
                  createVNode(VProgressLinear, {
                    modelValue: unref(state).value,
                    "onUpdate:modelValue": ($event) => unref(state).value = $event,
                    "buffer-value": unref(state).bufferValue,
                    color: "primary",
                    rounded: "",
                    max: "100"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "buffer-value"]),
                  createVNode("span", { class: "ml-2 text-caption" }, toDisplayString(unref(state).value.toFixed(0)) + "%", 1)
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "w-100"
                }, [
                  createVNode("p", { class: "text-caption" }, toDisplayString((_d = unref(state).image.errors) == null ? void 0 : _d.description), 1),
                  createVNode(VBtn, {
                    onClick: removeImage,
                    density: "compact",
                    class: "pa-0 text-capitalize",
                    variant: "text"
                  }, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        createTextVNode(toDisplayString((_a2 = unref(state).image.errors) == null ? void 0 : _a2.action), 1)
                      ];
                    }),
                    _: 1
                  })
                ]))
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/drag-drop-image.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=drag-drop-image-DRFieU2I.mjs.map
