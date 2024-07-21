import { useSSRContext, defineComponent, ref, mergeProps, withCtx, unref, isRef, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, renderSlot } from 'vue';
import { a2 as useRoute$1, p as VIcon, au as VDivider, V as VCard, c as VCardText, a_ as VCardActions, d as VTextField, i as useSanctumClient, ad as useDisplay, a as VCardItem, b as VCardTitle, a$ as VSpacer, v as VCardSubtitle, e as VBtn, b0 as VList, x as VListItem, y as VListItemTitle, b1 as useAsyncData } from './server.mjs';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { V as VDialog } from './VDialog-CDUYkq_m.mjs';
import { V as VRow, a as VCol } from './VRow-B-D5uMI5.mjs';
import { V as VTable } from './VTable-J0tGGw3A.mjs';
import { V as VForm } from './VForm-CVR8aYB2.mjs';
import { V as VAutocomplete } from './VAutocomplete-IMrjYE8Q.mjs';
import { V as VContainer } from './VContainer-BlVN2X13.mjs';
import { V as VTabs, a as VTab, d as VWindow, e as VWindowItem } from './VTabs-CS7OIIzr.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'consola/core';
import '@formkit/auto-animate/vue';
import 'awesome-phonenumber';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    persistent: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 700
    },
    title: String
  },
  setup(__props, { expose: __expose }) {
    const isActive = ref(false);
    const toggle = () => isActive.value = !isActive.value;
    __expose({
      toggle
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        width: __props.width,
        modelValue: unref(isActive),
        "onUpdate:modelValue": ($event) => isRef(isActive) ? isActive.value = $event : null,
        scrollable: true,
        persistent: __props.persistent
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h4 class="text-capitalize py-2"${_scopeId2}>${ssrInterpolate(__props.title)}</h4>`);
                } else {
                  return [
                    createVNode("h4", { class: "text-capitalize py-2" }, toDisplayString(__props.title), 1)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardText, { style: { "height": "430px" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "content", {}, null, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "content")
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
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
                    createVNode(VCardText, { style: { "height": "430px" } }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "content")
                      ]),
                      _: 3
                    }),
                    createVNode(VCardActions, null, {
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
              createVNode(VCard, null, {
                title: withCtx(() => [
                  createVNode("h4", { class: "text-capitalize py-2" }, toDisplayString(__props.title), 1)
                ]),
                default: withCtx(() => [
                  createVNode(VCardText, { style: { "height": "430px" } }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "content")
                    ]),
                    _: 3
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "actions")
                    ]),
                    _: 3
                  })
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/Modal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "InputSearchComponent",
  __ssrInlineRender: true,
  emits: ["onSearch"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const searching = (event) => emits("onSearch", event.target.value);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VTextField, mergeProps({
        density: "compact",
        label: "Buscar",
        variant: "filled",
        onKeyup: searching
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/InputSearchComponent.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "roles-permissions",
  __ssrInlineRender: true,
  setup(__props) {
    const client = useSanctumClient();
    const roles = ref([]);
    const permissions = ref([]);
    const { mobile } = useDisplay();
    const dialog = ref(null);
    const formData = ref({});
    const toggleDialog = (role) => {
      formData.value.permissions = [...role.permissions];
      formData.value.id = role.id;
      dialog.value.toggle();
    };
    const closeDialog = () => {
      formData.value.permissions = [];
      dialog.value.toggle();
    };
    const filterModel = async (value) => {
      if (value === "") {
        const rolesAndPermissions = await getRolesAndPermissions();
        updateRolesAndPermissions(rolesAndPermissions.value);
      } else {
        filterRolesByName(value);
      }
    };
    const filterRolesByName = (value) => {
      roles.value = roles.value.filter((role) => role.name.toLowerCase().includes(value.toLowerCase()));
    };
    const removePermission = (permissionId) => {
      formData.value.permissions = formData.value.permissions.filter((permission) => permission.id !== permissionId);
    };
    const updatePermissions = async () => {
      await useAsyncData("roles-permissions-update", () => client(`/api/v1/admin/roles/${formData.value.id}`, {
        method: "POST",
        body: { permissions: formData.value.permissions, _method: "PUT" }
      }));
      const rolesAndPermissions = await getRolesAndPermissions();
      updateRolesAndPermissions(rolesAndPermissions.value);
      dialog.value.toggle();
    };
    const getRolesAndPermissions = async () => {
      const { data } = await useAsyncData("roles-permissions", () => client("/api/v1/admin/roles"));
      return data;
    };
    const updateRolesAndPermissions = (rolesAndPermissions) => {
      roles.value = rolesAndPermissions.roles;
      permissions.value = rolesAndPermissions.permissions;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VRow, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "12" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardItem, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCardTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$2, { onOnSearch: filterModel }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$2, { onOnSearch: filterModel })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="d-flex"${_scopeId4}>`);
                              _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCardSubtitle, null, null, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode(VCardTitle, null, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$2, { onOnSearch: filterModel })
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "d-flex" }, [
                                  createVNode(VSpacer),
                                  createVNode(VCardSubtitle)
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTable, { hover: true }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<thead${_scopeId4}><tr${_scopeId4}><th class="text-uppercase text-center"${_scopeId4}> Nombre </th><th class="text-uppercase text-center"${_scopeId4}> Acciones </th></tr></thead><tbody${_scopeId4}><!--[-->`);
                              ssrRenderList(unref(roles), (role) => {
                                _push5(`<tr${_scopeId4}><td class="text-center text-capitalize"${_scopeId4}>${ssrInterpolate(role.name)}</td><td class="text-center d-lg-block d-md-block d-flex py-2"${_scopeId4}>`);
                                _push5(ssrRenderComponent(VBtn, {
                                  class: "mx-2 my-lg-0",
                                  color: "primary",
                                  onClick: ($event) => toggleDialog(role),
                                  size: unref(mobile) ? "small" : "default"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Editar `);
                                    } else {
                                      return [
                                        createTextVNode(" Editar ")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`</td></tr>`);
                              });
                              _push5(`<!--]--></tbody>`);
                            } else {
                              return [
                                createVNode("thead", null, [
                                  createVNode("tr", null, [
                                    createVNode("th", { class: "text-uppercase text-center" }, " Nombre "),
                                    createVNode("th", { class: "text-uppercase text-center" }, " Acciones ")
                                  ])
                                ]),
                                createVNode("tbody", null, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(roles), (role) => {
                                    return openBlock(), createBlock("tr", {
                                      key: role.id
                                    }, [
                                      createVNode("td", { class: "text-center text-capitalize" }, toDisplayString(role.name), 1),
                                      createVNode("td", { class: "text-center d-lg-block d-md-block d-flex py-2" }, [
                                        createVNode(VBtn, {
                                          class: "mx-2 my-lg-0",
                                          color: "primary",
                                          onClick: ($event) => toggleDialog(role),
                                          size: unref(mobile) ? "small" : "default"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Editar ")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick", "size"])
                                      ])
                                    ]);
                                  }), 128))
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardItem, null, {
                            default: withCtx(() => [
                              createVNode(VCardTitle, null, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$2, { onOnSearch: filterModel })
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "d-flex" }, [
                                createVNode(VSpacer),
                                createVNode(VCardSubtitle)
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(VTable, { hover: true }, {
                            default: withCtx(() => [
                              createVNode("thead", null, [
                                createVNode("tr", null, [
                                  createVNode("th", { class: "text-uppercase text-center" }, " Nombre "),
                                  createVNode("th", { class: "text-uppercase text-center" }, " Acciones ")
                                ])
                              ]),
                              createVNode("tbody", null, [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(roles), (role) => {
                                  return openBlock(), createBlock("tr", {
                                    key: role.id
                                  }, [
                                    createVNode("td", { class: "text-center text-capitalize" }, toDisplayString(role.name), 1),
                                    createVNode("td", { class: "text-center d-lg-block d-md-block d-flex py-2" }, [
                                      createVNode(VBtn, {
                                        class: "mx-2 my-lg-0",
                                        color: "primary",
                                        onClick: ($event) => toggleDialog(role),
                                        size: unref(mobile) ? "small" : "default"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Editar ")
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick", "size"])
                                    ])
                                  ]);
                                }), 128))
                              ])
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
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VCardItem, null, {
                          default: withCtx(() => [
                            createVNode(VCardTitle, null, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$2, { onOnSearch: filterModel })
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "d-flex" }, [
                              createVNode(VSpacer),
                              createVNode(VCardSubtitle)
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(VTable, { hover: true }, {
                          default: withCtx(() => [
                            createVNode("thead", null, [
                              createVNode("tr", null, [
                                createVNode("th", { class: "text-uppercase text-center" }, " Nombre "),
                                createVNode("th", { class: "text-uppercase text-center" }, " Acciones ")
                              ])
                            ]),
                            createVNode("tbody", null, [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(roles), (role) => {
                                return openBlock(), createBlock("tr", {
                                  key: role.id
                                }, [
                                  createVNode("td", { class: "text-center text-capitalize" }, toDisplayString(role.name), 1),
                                  createVNode("td", { class: "text-center d-lg-block d-md-block d-flex py-2" }, [
                                    createVNode(VBtn, {
                                      class: "mx-2 my-lg-0",
                                      color: "primary",
                                      onClick: ($event) => toggleDialog(role),
                                      size: unref(mobile) ? "small" : "default"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Editar ")
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick", "size"])
                                  ])
                                ]);
                              }), 128))
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              title: unref(formData).name,
              width: 800,
              ref_key: "dialog",
              ref: dialog,
              persistent: true
            }, {
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VForm, { "min-height": 440 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "12" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VAutocomplete, {
                                      label: "Permisos",
                                      items: unref(permissions),
                                      "item-title": "name",
                                      "return-object": "",
                                      multiple: "",
                                      modelValue: unref(formData).permissions,
                                      "onUpdate:modelValue": ($event) => unref(formData).permissions = $event
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VAutocomplete, {
                                        label: "Permisos",
                                        items: unref(permissions),
                                        "item-title": "name",
                                        "return-object": "",
                                        multiple: "",
                                        modelValue: unref(formData).permissions,
                                        "onUpdate:modelValue": ($event) => unref(formData).permissions = $event
                                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "12" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VRow, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<!--[-->`);
                                          ssrRenderList(unref(formData).permissions, ({ name, id }) => {
                                            _push7(ssrRenderComponent(VCol, {
                                              cols: "12",
                                              md: "6",
                                              lg: "6",
                                              key: name
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(VList, { density: "compact" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(VListItem, null, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(ssrRenderComponent(VListItemTitle, null, {
                                                                default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                  if (_push11) {
                                                                    _push11(`<span class="text-capitalize"${_scopeId10}>${ssrInterpolate(name)}</span> `);
                                                                    _push11(ssrRenderComponent(VIcon, {
                                                                      onClick: ($event) => removePermission(id),
                                                                      size: "x-small",
                                                                      color: "red",
                                                                      icon: "mdi-close"
                                                                    }, null, _parent11, _scopeId10));
                                                                  } else {
                                                                    return [
                                                                      createVNode("span", { class: "text-capitalize" }, toDisplayString(name), 1),
                                                                      createTextVNode(),
                                                                      createVNode(VIcon, {
                                                                        onClick: ($event) => removePermission(id),
                                                                        size: "x-small",
                                                                        color: "red",
                                                                        icon: "mdi-close"
                                                                      }, null, 8, ["onClick"])
                                                                    ];
                                                                  }
                                                                }),
                                                                _: 2
                                                              }, _parent10, _scopeId9));
                                                            } else {
                                                              return [
                                                                createVNode(VListItemTitle, null, {
                                                                  default: withCtx(() => [
                                                                    createVNode("span", { class: "text-capitalize" }, toDisplayString(name), 1),
                                                                    createTextVNode(),
                                                                    createVNode(VIcon, {
                                                                      onClick: ($event) => removePermission(id),
                                                                      size: "x-small",
                                                                      color: "red",
                                                                      icon: "mdi-close"
                                                                    }, null, 8, ["onClick"])
                                                                  ]),
                                                                  _: 2
                                                                }, 1024)
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(VListItem, null, {
                                                            default: withCtx(() => [
                                                              createVNode(VListItemTitle, null, {
                                                                default: withCtx(() => [
                                                                  createVNode("span", { class: "text-capitalize" }, toDisplayString(name), 1),
                                                                  createTextVNode(),
                                                                  createVNode(VIcon, {
                                                                    onClick: ($event) => removePermission(id),
                                                                    size: "x-small",
                                                                    color: "red",
                                                                    icon: "mdi-close"
                                                                  }, null, 8, ["onClick"])
                                                                ]),
                                                                _: 2
                                                              }, 1024)
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(VList, { density: "compact" }, {
                                                      default: withCtx(() => [
                                                        createVNode(VListItem, null, {
                                                          default: withCtx(() => [
                                                            createVNode(VListItemTitle, null, {
                                                              default: withCtx(() => [
                                                                createVNode("span", { class: "text-capitalize" }, toDisplayString(name), 1),
                                                                createTextVNode(),
                                                                createVNode(VIcon, {
                                                                  onClick: ($event) => removePermission(id),
                                                                  size: "x-small",
                                                                  color: "red",
                                                                  icon: "mdi-close"
                                                                }, null, 8, ["onClick"])
                                                              ]),
                                                              _: 2
                                                            }, 1024)
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          });
                                          _push7(`<!--]-->`);
                                        } else {
                                          return [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(formData).permissions, ({ name, id }) => {
                                              return openBlock(), createBlock(VCol, {
                                                cols: "12",
                                                md: "6",
                                                lg: "6",
                                                key: name
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VList, { density: "compact" }, {
                                                    default: withCtx(() => [
                                                      createVNode(VListItem, null, {
                                                        default: withCtx(() => [
                                                          createVNode(VListItemTitle, null, {
                                                            default: withCtx(() => [
                                                              createVNode("span", { class: "text-capitalize" }, toDisplayString(name), 1),
                                                              createTextVNode(),
                                                              createVNode(VIcon, {
                                                                onClick: ($event) => removePermission(id),
                                                                size: "x-small",
                                                                color: "red",
                                                                icon: "mdi-close"
                                                              }, null, 8, ["onClick"])
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VRow, null, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(formData).permissions, ({ name, id }) => {
                                            return openBlock(), createBlock(VCol, {
                                              cols: "12",
                                              md: "6",
                                              lg: "6",
                                              key: name
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VList, { density: "compact" }, {
                                                  default: withCtx(() => [
                                                    createVNode(VListItem, null, {
                                                      default: withCtx(() => [
                                                        createVNode(VListItemTitle, null, {
                                                          default: withCtx(() => [
                                                            createVNode("span", { class: "text-capitalize" }, toDisplayString(name), 1),
                                                            createTextVNode(),
                                                            createVNode(VIcon, {
                                                              onClick: ($event) => removePermission(id),
                                                              size: "x-small",
                                                              color: "red",
                                                              icon: "mdi-close"
                                                            }, null, 8, ["onClick"])
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128))
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
                                createVNode(VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      label: "Permisos",
                                      items: unref(permissions),
                                      "item-title": "name",
                                      "return-object": "",
                                      multiple: "",
                                      modelValue: unref(formData).permissions,
                                      "onUpdate:modelValue": ($event) => unref(formData).permissions = $event
                                    }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode(VRow, null, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(formData).permissions, ({ name, id }) => {
                                          return openBlock(), createBlock(VCol, {
                                            cols: "12",
                                            md: "6",
                                            lg: "6",
                                            key: name
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VList, { density: "compact" }, {
                                                default: withCtx(() => [
                                                  createVNode(VListItem, null, {
                                                    default: withCtx(() => [
                                                      createVNode(VListItemTitle, null, {
                                                        default: withCtx(() => [
                                                          createVNode("span", { class: "text-capitalize" }, toDisplayString(name), 1),
                                                          createTextVNode(),
                                                          createVNode(VIcon, {
                                                            onClick: ($event) => removePermission(id),
                                                            size: "x-small",
                                                            color: "red",
                                                            icon: "mdi-close"
                                                          }, null, 8, ["onClick"])
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024);
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "12" }, {
                                default: withCtx(() => [
                                  createVNode(VAutocomplete, {
                                    label: "Permisos",
                                    items: unref(permissions),
                                    "item-title": "name",
                                    "return-object": "",
                                    multiple: "",
                                    modelValue: unref(formData).permissions,
                                    "onUpdate:modelValue": ($event) => unref(formData).permissions = $event
                                  }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "12" }, {
                                default: withCtx(() => [
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(formData).permissions, ({ name, id }) => {
                                        return openBlock(), createBlock(VCol, {
                                          cols: "12",
                                          md: "6",
                                          lg: "6",
                                          key: name
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VList, { density: "compact" }, {
                                              default: withCtx(() => [
                                                createVNode(VListItem, null, {
                                                  default: withCtx(() => [
                                                    createVNode(VListItemTitle, null, {
                                                      default: withCtx(() => [
                                                        createVNode("span", { class: "text-capitalize" }, toDisplayString(name), 1),
                                                        createTextVNode(),
                                                        createVNode(VIcon, {
                                                          onClick: ($event) => removePermission(id),
                                                          size: "x-small",
                                                          color: "red",
                                                          icon: "mdi-close"
                                                        }, null, 8, ["onClick"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024);
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VForm, { "min-height": 440 }, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode(VAutocomplete, {
                                  label: "Permisos",
                                  items: unref(permissions),
                                  "item-title": "name",
                                  "return-object": "",
                                  multiple: "",
                                  modelValue: unref(formData).permissions,
                                  "onUpdate:modelValue": ($event) => unref(formData).permissions = $event
                                }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(formData).permissions, ({ name, id }) => {
                                      return openBlock(), createBlock(VCol, {
                                        cols: "12",
                                        md: "6",
                                        lg: "6",
                                        key: name
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VList, { density: "compact" }, {
                                            default: withCtx(() => [
                                              createVNode(VListItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(VListItemTitle, null, {
                                                    default: withCtx(() => [
                                                      createVNode("span", { class: "text-capitalize" }, toDisplayString(name), 1),
                                                      createTextVNode(),
                                                      createVNode(VIcon, {
                                                        onClick: ($event) => removePermission(id),
                                                        size: "x-small",
                                                        color: "red",
                                                        icon: "mdi-close"
                                                      }, null, 8, ["onClick"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024);
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
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="d-flex justify-end"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VBtn, {
                          block: unref(mobile),
                          color: "secondary",
                          onClick: closeDialog
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
                          block: unref(mobile),
                          onClick: updatePermissions
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Actualizar`);
                            } else {
                              return [
                                createTextVNode("Actualizar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "d-flex justify-end" }, [
                            createVNode(VBtn, {
                              block: unref(mobile),
                              color: "secondary",
                              onClick: closeDialog
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Cancelar")
                              ]),
                              _: 1
                            }, 8, ["block"]),
                            createVNode(VBtn, {
                              block: unref(mobile),
                              onClick: updatePermissions
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Actualizar")
                              ]),
                              _: 1
                            }, 8, ["block"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "d-flex justify-end" }, [
                          createVNode(VBtn, {
                            block: unref(mobile),
                            color: "secondary",
                            onClick: closeDialog
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancelar")
                            ]),
                            _: 1
                          }, 8, ["block"]),
                          createVNode(VBtn, {
                            block: unref(mobile),
                            onClick: updatePermissions
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Actualizar")
                            ]),
                            _: 1
                          }, 8, ["block"])
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
              createVNode(VCol, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VCardItem, null, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$2, { onOnSearch: filterModel })
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "d-flex" }, [
                            createVNode(VSpacer),
                            createVNode(VCardSubtitle)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(VTable, { hover: true }, {
                        default: withCtx(() => [
                          createVNode("thead", null, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "text-uppercase text-center" }, " Nombre "),
                              createVNode("th", { class: "text-uppercase text-center" }, " Acciones ")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(roles), (role) => {
                              return openBlock(), createBlock("tr", {
                                key: role.id
                              }, [
                                createVNode("td", { class: "text-center text-capitalize" }, toDisplayString(role.name), 1),
                                createVNode("td", { class: "text-center d-lg-block d-md-block d-flex py-2" }, [
                                  createVNode(VBtn, {
                                    class: "mx-2 my-lg-0",
                                    color: "primary",
                                    onClick: ($event) => toggleDialog(role),
                                    size: unref(mobile) ? "small" : "default"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Editar ")
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick", "size"])
                                ])
                              ]);
                            }), 128))
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_sfc_main$3, {
                title: unref(formData).name,
                width: 800,
                ref_key: "dialog",
                ref: dialog,
                persistent: true
              }, {
                content: withCtx(() => [
                  createVNode(VForm, { "min-height": 440 }, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode(VAutocomplete, {
                                label: "Permisos",
                                items: unref(permissions),
                                "item-title": "name",
                                "return-object": "",
                                multiple: "",
                                modelValue: unref(formData).permissions,
                                "onUpdate:modelValue": ($event) => unref(formData).permissions = $event
                              }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(formData).permissions, ({ name, id }) => {
                                    return openBlock(), createBlock(VCol, {
                                      cols: "12",
                                      md: "6",
                                      lg: "6",
                                      key: name
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VList, { density: "compact" }, {
                                          default: withCtx(() => [
                                            createVNode(VListItem, null, {
                                              default: withCtx(() => [
                                                createVNode(VListItemTitle, null, {
                                                  default: withCtx(() => [
                                                    createVNode("span", { class: "text-capitalize" }, toDisplayString(name), 1),
                                                    createTextVNode(),
                                                    createVNode(VIcon, {
                                                      onClick: ($event) => removePermission(id),
                                                      size: "x-small",
                                                      color: "red",
                                                      icon: "mdi-close"
                                                    }, null, 8, ["onClick"])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024);
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
                    ]),
                    _: 1
                  })
                ]),
                actions: withCtx(() => [
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "d-flex justify-end" }, [
                        createVNode(VBtn, {
                          block: unref(mobile),
                          color: "secondary",
                          onClick: closeDialog
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancelar")
                          ]),
                          _: 1
                        }, 8, ["block"]),
                        createVNode(VBtn, {
                          block: unref(mobile),
                          onClick: updatePermissions
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Actualizar")
                          ]),
                          _: 1
                        }, 8, ["block"])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/configuration/roles-permissions.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "roles-permisos",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const activeTab = ref(route.params.tab);
    const tabs = [
      { title: "Roles y permisos", icon: "mdi-account-outline", tab: "roles-permissions" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ fluid: "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTabs, {
                          modelValue: unref(activeTab),
                          "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(tabs, (tab) => {
                                _push5(ssrRenderComponent(VTab, {
                                  key: tab.icon,
                                  value: tab.tab
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VIcon, {
                                        size: "20",
                                        start: "",
                                        icon: tab.icon
                                      }, null, _parent6, _scopeId5));
                                      _push6(` ${ssrInterpolate(tab.title)}`);
                                    } else {
                                      return [
                                        createVNode(VIcon, {
                                          size: "20",
                                          start: "",
                                          icon: tab.icon
                                        }, null, 8, ["icon"]),
                                        createTextVNode(" " + toDisplayString(tab.title), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                                  return createVNode(VTab, {
                                    key: tab.icon,
                                    value: tab.tab
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, {
                                        size: "20",
                                        start: "",
                                        icon: tab.icon
                                      }, null, 8, ["icon"]),
                                      createTextVNode(" " + toDisplayString(tab.title), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VDivider, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VWindow, {
                          modelValue: unref(activeTab),
                          "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
                          class: "mt-5 disable-tab-transition"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VWindowItem, { value: "roles-permissions" }, {
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
                            } else {
                              return [
                                createVNode(VWindowItem, { value: "roles-permissions" }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$1)
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
                          createVNode(VTabs, {
                            modelValue: unref(activeTab),
                            "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                                return createVNode(VTab, {
                                  key: tab.icon,
                                  value: tab.tab
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, {
                                      size: "20",
                                      start: "",
                                      icon: tab.icon
                                    }, null, 8, ["icon"]),
                                    createTextVNode(" " + toDisplayString(tab.title), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VDivider),
                          createVNode(VWindow, {
                            modelValue: unref(activeTab),
                            "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
                            class: "mt-5 disable-tab-transition"
                          }, {
                            default: withCtx(() => [
                              createVNode(VWindowItem, { value: "roles-permissions" }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$1)
                                ]),
                                _: 1
                              })
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
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTabs, {
                          modelValue: unref(activeTab),
                          "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                              return createVNode(VTab, {
                                key: tab.icon,
                                value: tab.tab
                              }, {
                                default: withCtx(() => [
                                  createVNode(VIcon, {
                                    size: "20",
                                    start: "",
                                    icon: tab.icon
                                  }, null, 8, ["icon"]),
                                  createTextVNode(" " + toDisplayString(tab.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 64))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VDivider),
                        createVNode(VWindow, {
                          modelValue: unref(activeTab),
                          "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
                          class: "mt-5 disable-tab-transition"
                        }, {
                          default: withCtx(() => [
                            createVNode(VWindowItem, { value: "roles-permissions" }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$1)
                              ]),
                              _: 1
                            })
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
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTabs, {
                        modelValue: unref(activeTab),
                        "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                            return createVNode(VTab, {
                              key: tab.icon,
                              value: tab.tab
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, {
                                  size: "20",
                                  start: "",
                                  icon: tab.icon
                                }, null, 8, ["icon"]),
                                createTextVNode(" " + toDisplayString(tab.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 64))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VDivider),
                      createVNode(VWindow, {
                        modelValue: unref(activeTab),
                        "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
                        class: "mt-5 disable-tab-transition"
                      }, {
                        default: withCtx(() => [
                          createVNode(VWindowItem, { value: "roles-permissions" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$1)
                            ]),
                            _: 1
                          })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/roles-permisos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=roles-permisos-DlqqbFGF.mjs.map
