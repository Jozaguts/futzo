import _sfc_main$2 from './nuxt-icon-D0x-uBOo.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext, ref, reactive, computed, watch, unref, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer';
import { e as VBtn, bo as defineStore, l as VAvatar, bp as VProgressLinear, i as useSanctumClient } from './server.mjs';
import { V as VSheet, a as VFileInput } from './useSchemas-DRmKLgdK.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "app-bar-cat-btn",
  __ssrInlineRender: true,
  props: {
    text: { default: "prop name not set" },
    icon: { default: "plus" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$2;
      _push(ssrRenderComponent(VBtn, mergeProps({
        class: "app-bar-cat-btn",
        size: "large",
        onClick: ($event) => emits("click")
      }, _attrs), {
        prepend: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_nuxt_icon, {
              name: _ctx.icon,
              filled: ""
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_nuxt_icon, {
                name: _ctx.icon,
                filled: ""
              }, null, 8, ["name"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ${ssrInterpolate(_ctx.text)}`);
          } else {
            return [
              createTextVNode(" " + toDisplayString(_ctx.text), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/app-bar-cat-btn.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const useCategoryStore = defineStore("categoryStore", () => {
  const categories = ref([]);
  const formats = ref([]);
  const fetchCategories = async () => {
    const client = useSanctumClient();
    categories.value = await client("/api/v1/admin/categories");
  };
  const fetchFormats = async () => {
    const client = useSanctumClient();
    formats.value = await client("/api/v1/admin/tournaments/formats");
  };
  return {
    categories,
    formats,
    fetchFormats,
    fetchCategories
  };
});
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const MAX_SIZE = 2;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "drag-drop-image",
  __ssrInlineRender: true,
  props: {
    image: {}
  },
  emits: ["removeImage", "imageDropped"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const state = reactive({
      dragging: false,
      dropped: false,
      interval: null,
      value: 10,
      bufferValue: 20
    });
    const border = computed(() => {
      if (image.value.hasError)
        return "";
      return !state.dragging && !state.dropped ? "primary thin" : "primary sm opacity-100";
    });
    const emits = __emit;
    const props = __props;
    const image = ref(props.image);
    const imageRef = ref(null);
    const formatImageName = computed(() => {
      return image.value.name.replace(/[-_]/g, " ").charAt(0).toUpperCase() + image.value.name.slice(1).replace(/[-_]/g, " ").substring(0, 20) + (image.value.name.length > 20 ? "..." : "");
    });
    const validateSize = () => {
      const imageSize = image.value.size / (1024 * 1024);
      if (imageSize > MAX_SIZE) {
        image.value.errors = {
          name: imageSize.toFixed(2) + "MB",
          description: "La imagen es muy pesada, prueba con otra.",
          action: "reintentar"
        };
        image.value.hasError = true;
      }
    };
    const eventHandler = (e) => {
      e.preventDefault();
      state.dragging = false;
      let files = [];
      if (e.type === "drop") {
        files = e.dataTransfer.files;
      } else if (e.type === "change") {
        files = e.target.files;
      }
      if (files.length) {
        startBuffer();
        state.dropped = true;
        image.value.file = files[0];
        image.value.name = files[0].name;
        image.value.size = files[0].size;
        emits("imageDropped", files[0]);
      }
    };
    const startBuffer = () => {
      state.interval = setInterval();
    };
    const removeImage = () => {
      image.value.file = null;
      image.value.name = "";
      image.value.size = 0;
      image.value.hasError = false;
      image.value.errors = {
        name: "",
        description: "",
        action: ""
      };
      state.dragging = false;
      state.dropped = false;
      state.value = 10;
      state.bufferValue = 20;
      emits("removeImage");
    };
    const loadImage = () => {
      state.value = 100;
      state.bufferValue = 100;
      state.dropped = true;
      image.value.name = "imagen.jpg";
    };
    watch(() => state.value, (newValue) => {
      if (newValue >= 100) {
        clearInterval(state.interval);
      }
    });
    watch(() => image.value.size, () => {
      validateSize();
    });
    const showInput = () => {
      const input = imageRef.value.$el.querySelector("input");
      input.click();
    };
    __expose({
      loadImage
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["d-flex", unref(image).hasError ? " border-error border-md border-opacity-100  rounded rounded-lg" : ""]
      }, _attrs))}>`);
      _push(ssrRenderComponent(VAvatar, {
        color: !unref(state).dropped ? "background" : "surface",
        size: "64",
        class: "mr-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(state).dropped) {
              _push2(ssrRenderComponent(_component_nuxt_icon, {
                name: "image-plus",
                filled: "",
                class: "image-plus"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(state).dropped) {
              _push2(ssrRenderComponent(_component_nuxt_icon, {
                name: "file-type-img",
                filled: "",
                class: "file-type-img"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !unref(state).dropped ? (openBlock(), createBlock(_component_nuxt_icon, {
                key: 0,
                name: "image-plus",
                filled: "",
                class: "image-plus"
              })) : createCommentVNode("", true),
              unref(state).dropped ? (openBlock(), createBlock(_component_nuxt_icon, {
                key: 1,
                name: "file-type-img",
                filled: "",
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
                ref_key: "imageRef",
                ref: imageRef,
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
                    _push3(`Haz clic para a\xF1adir`);
                  } else {
                    return [
                      createTextVNode("Haz clic para a\xF1adir")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<span class="text-body-1"${_scopeId}>o arrastra aqu\xED</span></div><p class="text-caption"${_scopeId}>SVG, PNG o JPG (max. 1080x1080px)</p></div>`);
            } else {
              _push2(`<div class="d-flex justify-space-between align-start h-100 w-100 flex-column"${_scopeId}><div class="d-flex justify-space-between w-100 align-center"${_scopeId}><p class="text-body-1"${_scopeId}>${ssrInterpolate(unref(image).hasError ? (_a = unref(image).errors) == null ? void 0 : _a.name : unref(formatImageName))}</p>`);
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
                    if (!unref(image).hasError) {
                      _push3(ssrRenderComponent(_component_nuxt_icon, {
                        filled: "",
                        name: "trash",
                        class: "trash"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(_component_nuxt_icon, {
                        filled: "",
                        name: "trash-error",
                        class: "trash-error"
                      }, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      !unref(image).hasError ? (openBlock(), createBlock(_component_nuxt_icon, {
                        key: 0,
                        filled: "",
                        name: "trash",
                        class: "trash"
                      })) : (openBlock(), createBlock(_component_nuxt_icon, {
                        key: 1,
                        filled: "",
                        name: "trash-error",
                        class: "trash-error"
                      }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              if (!unref(image).hasError) {
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
                _push2(`<div class="w-100"${_scopeId}><p class="text-caption"${_scopeId}>${ssrInterpolate((_b = unref(image).errors) == null ? void 0 : _b.description)}</p>`);
                _push2(ssrRenderComponent(VBtn, {
                  onClick: removeImage,
                  density: "compact",
                  class: "pa-0 text-capitalize",
                  variant: "text"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    var _a2, _b2;
                    if (_push3) {
                      _push3(`${ssrInterpolate((_a2 = unref(image).errors) == null ? void 0 : _a2.action)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString((_b2 = unref(image).errors) == null ? void 0 : _b2.action), 1)
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
                    ref_key: "imageRef",
                    ref: imageRef,
                    onChange: eventHandler
                  }, null, 512),
                  createVNode(VBtn, {
                    variant: "text",
                    color: "primary",
                    class: "text-body-1 px-1",
                    onClick: showInput
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Haz clic para a\xF1adir")
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
                  createVNode("p", { class: "text-body-1" }, toDisplayString(unref(image).hasError ? (_c = unref(image).errors) == null ? void 0 : _c.name : unref(formatImageName)), 1),
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
                      !unref(image).hasError ? (openBlock(), createBlock(_component_nuxt_icon, {
                        key: 0,
                        filled: "",
                        name: "trash",
                        class: "trash"
                      })) : (openBlock(), createBlock(_component_nuxt_icon, {
                        key: 1,
                        filled: "",
                        name: "trash-error",
                        class: "trash-error"
                      }))
                    ]),
                    _: 1
                  })
                ]),
                !unref(image).hasError ? (openBlock(), createBlock("div", {
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
                  createVNode("p", { class: "text-caption" }, toDisplayString((_d = unref(image).errors) == null ? void 0 : _d.description), 1),
                  createVNode(VBtn, {
                    onClick: removeImage,
                    density: "compact",
                    class: "pa-0 text-capitalize",
                    variant: "text"
                  }, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        createTextVNode(toDisplayString((_a2 = unref(image).errors) == null ? void 0 : _a2.action), 1)
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

export { _sfc_main$1 as _, _sfc_main as a, useCategoryStore as u };
//# sourceMappingURL=drag-drop-image-CQcP1rQW.mjs.map
