import { _ as __nuxt_component_0 } from './index-DkcY5wU8.mjs';
import { defineComponent, mergeModels, useModel, mergeProps, withCtx, createVNode, toDisplayString, renderSlot, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { V as VDialog } from './VDialog-BeIjnChI.mjs';
import { V as VCard, f as VCardItem, e as VCardTitle, E as VCardSubtitle, bw as VProgressLinear, H as VDivider, F as VCardText, aQ as VCardActions } from './server.mjs';
import { V as VSheet } from './VSheet-DVv3ytGE.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dialog",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    minHeight: {
      type: String,
      default: "auto"
    },
    iconName: {
      type: String,
      default: "line-md:map-marker-loop"
    }
  }, {
    "modelValue": { type: Boolean },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["leaving"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const dialog = useModel(__props, "modelValue");
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(ssrRenderComponent(VDialog, mergeProps({
        modelValue: dialog.value,
        "onUpdate:modelValue": ($event) => dialog.value = $event,
        "max-width": "700",
        "min-height": __props.minHeight,
        onAfterLeave: () => emits("leaving"),
        scrollable: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, {
              loading: __props.loading,
              class: "create-tournament-card futzo-rounded",
              style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
            }, {
              loader: withCtx(({ isActive }, _push3, _parent3, _scopeId2) => {
                if (_push3) ;
                else {
                  return [];
                }
              }),
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
                              _push5(ssrRenderComponent(_component_Icon, { name: __props.iconName }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Icon, { name: __props.iconName }, null, 8, ["name"])
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
                              createVNode(_component_Icon, { name: __props.iconName }, null, 8, ["name"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "futzo-icon:x-dialog",
                          onClick: ($event) => dialog.value = false
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "futzo-icon:x-dialog",
                            onClick: ($event) => dialog.value = false
                          }, null, 8, ["onClick"])
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span${_scopeId4}>${ssrInterpolate(__props.title)}</span>`);
                            } else {
                              return [
                                createVNode("span", null, toDisplayString(__props.title), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardSubtitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a;
                            if (_push5) {
                              _push5(`<span${_scopeId4}>${(_a = __props.subtitle) != null ? _a : ""}</span>`);
                            } else {
                              return [
                                createVNode("span", { innerHTML: __props.subtitle }, null, 8, ["innerHTML"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createVNode("span", null, toDisplayString(__props.title), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VCardSubtitle, null, {
                            default: withCtx(() => [
                              createVNode("span", { innerHTML: __props.subtitle }, null, 8, ["innerHTML"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (__props.loading) {
                    _push3(ssrRenderComponent(VProgressLinear, {
                      active: __props.loading,
                      color: "primary",
                      height: "4",
                      indeterminate: ""
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                  }
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "v-card-text", {}, null, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "v-card-text")
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, { class: "d-flex px-6 pb-6 justify-space-between" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "actions")
                        ];
                      }
                    }),
                    _: 3
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
                            createVNode(_component_Icon, { name: __props.iconName }, null, 8, ["name"])
                          ]),
                          _: 1
                        })
                      ]),
                      append: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "futzo-icon:x-dialog",
                          onClick: ($event) => dialog.value = false
                        }, null, 8, ["onClick"])
                      ]),
                      default: withCtx(() => [
                        createVNode(VCardTitle, null, {
                          default: withCtx(() => [
                            createVNode("span", null, toDisplayString(__props.title), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VCardSubtitle, null, {
                          default: withCtx(() => [
                            createVNode("span", { innerHTML: __props.subtitle }, null, 8, ["innerHTML"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    __props.loading ? (openBlock(), createBlock(VProgressLinear, {
                      key: 0,
                      active: __props.loading,
                      color: "primary",
                      height: "4",
                      indeterminate: ""
                    }, null, 8, ["active"])) : (openBlock(), createBlock(VDivider, { key: 1 })),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "v-card-text")
                      ]),
                      _: 3
                    }),
                    createVNode(VCardActions, { class: "d-flex px-6 pb-6 justify-space-between" }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "actions")
                      ]),
                      _: 3
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, {
                loading: __props.loading,
                class: "create-tournament-card futzo-rounded",
                style: { overflow: _ctx.$vuetify.display.mobile ? "" : "hidden" }
              }, {
                loader: withCtx(({ isActive }) => []),
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
                          createVNode(_component_Icon, { name: __props.iconName }, null, 8, ["name"])
                        ]),
                        _: 1
                      })
                    ]),
                    append: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "futzo-icon:x-dialog",
                        onClick: ($event) => dialog.value = false
                      }, null, 8, ["onClick"])
                    ]),
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createVNode("span", null, toDisplayString(__props.title), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(VCardSubtitle, null, {
                        default: withCtx(() => [
                          createVNode("span", { innerHTML: __props.subtitle }, null, 8, ["innerHTML"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  __props.loading ? (openBlock(), createBlock(VProgressLinear, {
                    key: 0,
                    active: __props.loading,
                    color: "primary",
                    height: "4",
                    indeterminate: ""
                  }, null, 8, ["active"])) : (openBlock(), createBlock(VDivider, { key: 1 })),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "v-card-text")
                    ]),
                    _: 3
                  }),
                  createVNode(VCardActions, { class: "d-flex px-6 pb-6 justify-space-between" }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "actions")
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              }, 8, ["loading", "style"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/Dialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Dialog-BzXGl2GM.mjs.map
