import { useSSRContext, defineComponent, withCtx, createVNode, unref, mergeProps, createTextVNode } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc, ad as VSelect } from './server.mjs';
import { V as VTable } from './VTable-Bam0vwJv.mjs';
import _sfc_main$a from './nuxt-icon-D0x-uBOo.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-D3yffjBD.mjs';
import { _ as _sfc_main$9 } from './Dialog-BFVesmBs.mjs';
import { _ as _sfc_main$2$1, a as _sfc_main$8 } from './app-bar-vuUpVYZ5.mjs';
import { _ as _sfc_main$1$1 } from './drag-drop-image-CQcP1rQW.mjs';
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
import 'vue3-perfect-scrollbar';
import 'consola/core';
import '@formkit/auto-animate/vue';
import 'awesome-phonenumber';
import './main-dQC73R85.mjs';
import 'date-fns';
import './useSchemas-DRmKLgdK.mjs';
import 'vee-validate';
import 'yup';
import './VContainer-CGrX86QO.mjs';
import './VRow-mjWiXyjQ.mjs';
import './VDialog-CDis8WGv.mjs';
import './index-pTp1Ji9-.mjs';
import './layout-BllP2C0g.mjs';

const _sfc_main$7 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(ssrRenderComponent(VTable, mergeProps({ class: "positions-table futzo-table" }, _attrs), {
    top: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h2 class="positions-table-title mt-0" data-v-abcc35b0${_scopeId}>Tabla de posicioness</h2>`);
      } else {
        return [
          createVNode("h2", { class: "positions-table-title mt-0" }, "Tabla de posicioness")
        ];
      }
    }),
    wrapper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="v-table__wrapper" data-v-abcc35b0${_scopeId}><table data-v-abcc35b0${_scopeId}><thead data-v-abcc35b0${_scopeId}><tr data-v-abcc35b0${_scopeId}><th data-v-abcc35b0${_scopeId}>Posici\xF3n</th><th data-v-abcc35b0${_scopeId}>Equipo</th><th data-v-abcc35b0${_scopeId}>PJ</th><th data-v-abcc35b0${_scopeId}>PG</th><th data-v-abcc35b0${_scopeId}>PE</th><th data-v-abcc35b0${_scopeId}>PP</th><th data-v-abcc35b0${_scopeId}>GF</th><th data-v-abcc35b0${_scopeId}>GC</th><th data-v-abcc35b0${_scopeId}>DG</th><th data-v-abcc35b0${_scopeId}>Pts</th></tr></thead><tbody data-v-abcc35b0${_scopeId}><tr data-v-abcc35b0${_scopeId}><td data-v-abcc35b0${_scopeId}>1</td><td data-v-abcc35b0${_scopeId}>Equipo 1</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>3</td><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>0</td><td data-v-abcc35b0${_scopeId}>10</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>11</td></tr><tr data-v-abcc35b0${_scopeId}><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>Equipo 2</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>3</td><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>0</td><td data-v-abcc35b0${_scopeId}>10</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>11</td></tr><tr data-v-abcc35b0${_scopeId}><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>Equipo 2</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>3</td><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>0</td><td data-v-abcc35b0${_scopeId}>10</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>11</td></tr><tr data-v-abcc35b0${_scopeId}><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>Equipo 2</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>3</td><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>0</td><td data-v-abcc35b0${_scopeId}>10</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>11</td></tr><tr data-v-abcc35b0${_scopeId}><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>Equipo 2</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>3</td><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>0</td><td data-v-abcc35b0${_scopeId}>10</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>11</td></tr><tr data-v-abcc35b0${_scopeId}><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>Equipo 2</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>3</td><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>0</td><td data-v-abcc35b0${_scopeId}>10</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>11</td></tr><tr data-v-abcc35b0${_scopeId}><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>Equipo 2</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>3</td><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>0</td><td data-v-abcc35b0${_scopeId}>10</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>11</td></tr><tr data-v-abcc35b0${_scopeId}><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>Equipo 2</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>3</td><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>0</td><td data-v-abcc35b0${_scopeId}>10</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>11</td></tr><tr data-v-abcc35b0${_scopeId}><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>Equipo 2</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>3</td><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>0</td><td data-v-abcc35b0${_scopeId}>10</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>11</td></tr><tr data-v-abcc35b0${_scopeId}><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>Equipo 2</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>3</td><td data-v-abcc35b0${_scopeId}>2</td><td data-v-abcc35b0${_scopeId}>0</td><td data-v-abcc35b0${_scopeId}>10</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>5</td><td data-v-abcc35b0${_scopeId}>11</td></tr></tbody></table></div>`);
      } else {
        return [
          createVNode("div", { class: "v-table__wrapper" }, [
            createVNode("table", null, [
              createVNode("thead", null, [
                createVNode("tr", null, [
                  createVNode("th", null, "Posici\xF3n"),
                  createVNode("th", null, "Equipo"),
                  createVNode("th", null, "PJ"),
                  createVNode("th", null, "PG"),
                  createVNode("th", null, "PE"),
                  createVNode("th", null, "PP"),
                  createVNode("th", null, "GF"),
                  createVNode("th", null, "GC"),
                  createVNode("th", null, "DG"),
                  createVNode("th", null, "Pts")
                ])
              ]),
              createVNode("tbody", null, [
                createVNode("tr", null, [
                  createVNode("td", null, "1"),
                  createVNode("td", null, "Equipo 1"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, "2"),
                  createVNode("td", null, "Equipo 2"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "3"),
                  createVNode("td", null, "2"),
                  createVNode("td", null, "0"),
                  createVNode("td", null, "10"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "5"),
                  createVNode("td", null, "11")
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/positions-table.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const PositionsTable = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-abcc35b0"]]);
const _sfc_main$6 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_icon = _sfc_main$a;
  _push(ssrRenderComponent(VTable, mergeProps({
    class: "live-games-table futzo-rounded",
    density: "comfortable"
  }, _attrs), {
    top: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h2 class="live-games-table__title" data-v-9289de99${_scopeId}>Tabla de posiciones</h2>`);
      } else {
        return [
          createVNode("h2", { class: "live-games-table__title" }, "Tabla de posiciones")
        ];
      }
    }),
    wrapper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="v-table__wrapper content" data-v-9289de99${_scopeId}><table data-v-9289de99${_scopeId}><tbody data-v-9289de99${_scopeId}><tr class="live-games-table__cell" data-v-9289de99${_scopeId}><td class="team" data-v-9289de99${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-9289de99${_scopeId}><span class="team_name" data-v-9289de99${_scopeId}>Equipo 1</span></td><td class="data" data-v-9289de99${_scopeId}><div class="live" data-v-9289de99${_scopeId}>`);
        _push2(ssrRenderComponent(_component_nuxt_icon, {
          name: "Ellipse-red",
          filled: ""
        }, null, _parent2, _scopeId));
        _push2(`<span data-v-9289de99${_scopeId}>Live</span></div><div class="result" data-v-9289de99${_scopeId}><div class="text" data-v-9289de99${_scopeId}>1:3</div></div></td><td class="team" data-v-9289de99${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-9289de99${_scopeId}><span class="team_name" data-v-9289de99${_scopeId}>Equipo 1</span></td></tr><tr class="live-games-table__cell" data-v-9289de99${_scopeId}><td class="team" data-v-9289de99${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-9289de99${_scopeId}><span class="team_name" data-v-9289de99${_scopeId}>Equipo 1</span></td><td class="data" data-v-9289de99${_scopeId}><div class="live" data-v-9289de99${_scopeId}>`);
        _push2(ssrRenderComponent(_component_nuxt_icon, {
          name: "Ellipse-red",
          filled: ""
        }, null, _parent2, _scopeId));
        _push2(`<span data-v-9289de99${_scopeId}>Live</span></div><div class="result" data-v-9289de99${_scopeId}><div class="text" data-v-9289de99${_scopeId}>1:3</div></div></td><td class="team" data-v-9289de99${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-9289de99${_scopeId}><span class="team_name" data-v-9289de99${_scopeId}>Equipo 1</span></td></tr><tr class="live-games-table__cell" data-v-9289de99${_scopeId}><td class="team" data-v-9289de99${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-9289de99${_scopeId}><span class="team_name" data-v-9289de99${_scopeId}>Equipo 1</span></td><td class="data" data-v-9289de99${_scopeId}><div class="live" data-v-9289de99${_scopeId}>`);
        _push2(ssrRenderComponent(_component_nuxt_icon, {
          name: "Ellipse-red",
          filled: ""
        }, null, _parent2, _scopeId));
        _push2(`<span data-v-9289de99${_scopeId}>Live</span></div><div class="result" data-v-9289de99${_scopeId}><div class="text" data-v-9289de99${_scopeId}>1:3</div></div></td><td class="team" data-v-9289de99${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-9289de99${_scopeId}><span class="team_name" data-v-9289de99${_scopeId}>Equipo 1</span></td></tr></tbody></table></div>`);
      } else {
        return [
          createVNode("div", { class: "v-table__wrapper content" }, [
            createVNode("table", null, [
              createVNode("tbody", null, [
                createVNode("tr", { class: "live-games-table__cell" }, [
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ]),
                  createVNode("td", { class: "data" }, [
                    createVNode("div", { class: "live" }, [
                      createVNode(_component_nuxt_icon, {
                        name: "Ellipse-red",
                        filled: ""
                      }),
                      createVNode("span", null, "Live")
                    ]),
                    createVNode("div", { class: "result" }, [
                      createVNode("div", { class: "text" }, "1:3")
                    ])
                  ]),
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ])
                ]),
                createVNode("tr", { class: "live-games-table__cell" }, [
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ]),
                  createVNode("td", { class: "data" }, [
                    createVNode("div", { class: "live" }, [
                      createVNode(_component_nuxt_icon, {
                        name: "Ellipse-red",
                        filled: ""
                      }),
                      createVNode("span", null, "Live")
                    ]),
                    createVNode("div", { class: "result" }, [
                      createVNode("div", { class: "text" }, "1:3")
                    ])
                  ]),
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ])
                ]),
                createVNode("tr", { class: "live-games-table__cell" }, [
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ]),
                  createVNode("td", { class: "data" }, [
                    createVNode("div", { class: "live" }, [
                      createVNode(_component_nuxt_icon, {
                        name: "Ellipse-red",
                        filled: ""
                      }),
                      createVNode("span", null, "Live")
                    ]),
                    createVNode("div", { class: "result" }, [
                      createVNode("div", { class: "text" }, "1:3")
                    ])
                  ]),
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ])
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/live-games.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const LiveGames = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-9289de99"]]);
const _sfc_main$5 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(ssrRenderComponent(VTable, mergeProps({
    class: "next-games-today-table futzo-rounded",
    density: "comfortable"
  }, _attrs), {
    top: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h2 class="next-games-today-table__title" data-v-7487b3f1${_scopeId}>Pr\xF3ximos partidos hoy</h2>`);
      } else {
        return [
          createVNode("h2", { class: "next-games-today-table__title" }, "Pr\xF3ximos partidos hoy")
        ];
      }
    }),
    wrapper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="v-table__wrapper content" data-v-7487b3f1${_scopeId}><table data-v-7487b3f1${_scopeId}><tbody data-v-7487b3f1${_scopeId}><tr class="next-games-today-table__cell" data-v-7487b3f1${_scopeId}><td class="team" data-v-7487b3f1${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-7487b3f1${_scopeId}><span class="team_name" data-v-7487b3f1${_scopeId}>Equipo 1</span></td><td class="data" data-v-7487b3f1${_scopeId}><span class="date" data-v-7487b3f1${_scopeId}>24/06/2024</span><span class="result" data-v-7487b3f1${_scopeId}>10:00</span><span class="field" data-v-7487b3f1${_scopeId}>Campo 1</span></td><td class="team" data-v-7487b3f1${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-7487b3f1${_scopeId}><span class="team_name" data-v-7487b3f1${_scopeId}>Equipo 1</span></td></tr><tr class="next-games-today-table__cell" data-v-7487b3f1${_scopeId}><td class="team" data-v-7487b3f1${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-7487b3f1${_scopeId}><span class="team_name" data-v-7487b3f1${_scopeId}>Equipo 1</span></td><td class="data" data-v-7487b3f1${_scopeId}><span class="date" data-v-7487b3f1${_scopeId}>24/06/2024</span><span class="result" data-v-7487b3f1${_scopeId}>10:00</span><span class="field" data-v-7487b3f1${_scopeId}>Campo 1</span></td><td class="team" data-v-7487b3f1${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-7487b3f1${_scopeId}><span class="team_name" data-v-7487b3f1${_scopeId}>Equipo 1</span></td></tr><tr class="next-games-today-table__cell" data-v-7487b3f1${_scopeId}><td class="team" data-v-7487b3f1${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-7487b3f1${_scopeId}><span class="team_name" data-v-7487b3f1${_scopeId}>Equipo 1</span></td><td class="data" data-v-7487b3f1${_scopeId}><span class="date" data-v-7487b3f1${_scopeId}>24/06/2024</span><span class="result" data-v-7487b3f1${_scopeId}>10:00</span><span class="field" data-v-7487b3f1${_scopeId}>Campo 1</span></td><td class="team" data-v-7487b3f1${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-7487b3f1${_scopeId}><span class="team_name" data-v-7487b3f1${_scopeId}>Equipo 1</span></td></tr></tbody></table></div>`);
      } else {
        return [
          createVNode("div", { class: "v-table__wrapper content" }, [
            createVNode("table", null, [
              createVNode("tbody", null, [
                createVNode("tr", { class: "next-games-today-table__cell" }, [
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ]),
                  createVNode("td", { class: "data" }, [
                    createVNode("span", { class: "date" }, "24/06/2024"),
                    createVNode("span", { class: "result" }, "10:00"),
                    createVNode("span", { class: "field" }, "Campo 1")
                  ]),
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ])
                ]),
                createVNode("tr", { class: "next-games-today-table__cell" }, [
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ]),
                  createVNode("td", { class: "data" }, [
                    createVNode("span", { class: "date" }, "24/06/2024"),
                    createVNode("span", { class: "result" }, "10:00"),
                    createVNode("span", { class: "field" }, "Campo 1")
                  ]),
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ])
                ]),
                createVNode("tr", { class: "next-games-today-table__cell" }, [
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ]),
                  createVNode("td", { class: "data" }, [
                    createVNode("span", { class: "date" }, "24/06/2024"),
                    createVNode("span", { class: "result" }, "10:00"),
                    createVNode("span", { class: "field" }, "Campo 1")
                  ]),
                  createVNode("td", { class: "team" }, [
                    createVNode("img", {
                      src: "https://placehold.co/50x50",
                      alt: "team logo",
                      class: "logo"
                    }),
                    createVNode("span", { class: "team_name" }, "Equipo 1")
                  ])
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/next-games-today.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const NextGamesToday = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-7487b3f1"]]);
const _sfc_main$4 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0;
  const _component_nuxt_icon = _sfc_main$a;
  _push(ssrRenderComponent(VTable, mergeProps({
    class: "next-games-table futzo-rounded",
    hover: false
  }, _attrs), {
    top: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="next-games-table__header" data-v-c1df348f${_scopeId}><h2 class="next-games-table-title" data-v-c1df348f${_scopeId}>Pr\xF3ximos juegos</h2>`);
        _push2(ssrRenderComponent(_component_nuxt_link, {
          to: "/",
          class: "next-games-table-link"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Ver todos`);
            } else {
              return [
                createTextVNode("Ver todos")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "next-games-table__header" }, [
            createVNode("h2", { class: "next-games-table-title" }, "Pr\xF3ximos juegos"),
            createVNode(_component_nuxt_link, {
              to: "/",
              class: "next-games-table-link"
            }, {
              default: withCtx(() => [
                createTextVNode("Ver todos")
              ]),
              _: 1
            })
          ])
        ];
      }
    }),
    wrapper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="v-table__wrapper" data-v-c1df348f${_scopeId}><table data-v-c1df348f${_scopeId}><tbody data-v-c1df348f${_scopeId}><tr data-v-c1df348f${_scopeId}><td data-v-c1df348f${_scopeId}><div class="game-container" data-v-c1df348f${_scopeId}><div class="teams" data-v-c1df348f${_scopeId}><div class="team-local" data-v-c1df348f${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-c1df348f${_scopeId}><span class="team_name" data-v-c1df348f${_scopeId}>Equipo 1</span></div><div class="vs-container" data-v-c1df348f${_scopeId}><div class="vs" data-v-c1df348f${_scopeId}>vs</div></div><div class="team-away" data-v-c1df348f${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-c1df348f${_scopeId}><span class="team_name" data-v-c1df348f${_scopeId}>Equipo 1</span></div></div><div class="data" data-v-c1df348f${_scopeId}><span class="date" data-v-c1df348f${_scopeId}>24/06/2024</span><span class="hour" data-v-c1df348f${_scopeId}>10:00</span><span class="field" data-v-c1df348f${_scopeId}>Campo 1</span></div><div class="btn-container" data-v-c1df348f${_scopeId}>`);
        _push2(ssrRenderComponent(_component_nuxt_link, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<span class="btn-text" data-v-c1df348f${_scopeId2}> Ver detalles</span>`);
              _push3(ssrRenderComponent(_component_nuxt_icon, {
                name: "arrow-right",
                filled: ""
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("span", { class: "btn-text" }, " Ver detalles"),
                createVNode(_component_nuxt_icon, {
                  name: "arrow-right",
                  filled: ""
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></div></td></tr><tr data-v-c1df348f${_scopeId}><td data-v-c1df348f${_scopeId}><div class="game-container" data-v-c1df348f${_scopeId}><div class="teams" data-v-c1df348f${_scopeId}><div class="team-local" data-v-c1df348f${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-c1df348f${_scopeId}><span class="team_name" data-v-c1df348f${_scopeId}>Equipo 1</span></div><div class="vs-container" data-v-c1df348f${_scopeId}><div class="vs" data-v-c1df348f${_scopeId}>vs</div></div><div class="team-away" data-v-c1df348f${_scopeId}><img src="https://placehold.co/50x50" alt="team logo" class="logo" data-v-c1df348f${_scopeId}><span class="team_name" data-v-c1df348f${_scopeId}>Equipo 1</span></div></div><div class="data" data-v-c1df348f${_scopeId}><span class="date" data-v-c1df348f${_scopeId}>24/06/2024</span><span class="hour" data-v-c1df348f${_scopeId}>10:00</span><span class="field" data-v-c1df348f${_scopeId}>Campo 1</span></div><div class="btn-container" data-v-c1df348f${_scopeId}>`);
        _push2(ssrRenderComponent(_component_nuxt_link, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<span class="btn-text" data-v-c1df348f${_scopeId2}> Ver detalles</span>`);
              _push3(ssrRenderComponent(_component_nuxt_icon, {
                name: "arrow-right",
                filled: ""
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("span", { class: "btn-text" }, " Ver detalles"),
                createVNode(_component_nuxt_icon, {
                  name: "arrow-right",
                  filled: ""
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></div></td></tr></tbody></table></div>`);
      } else {
        return [
          createVNode("div", { class: "v-table__wrapper" }, [
            createVNode("table", null, [
              createVNode("tbody", null, [
                createVNode("tr", null, [
                  createVNode("td", null, [
                    createVNode("div", { class: "game-container" }, [
                      createVNode("div", { class: "teams" }, [
                        createVNode("div", { class: "team-local" }, [
                          createVNode("img", {
                            src: "https://placehold.co/50x50",
                            alt: "team logo",
                            class: "logo"
                          }),
                          createVNode("span", { class: "team_name" }, "Equipo 1")
                        ]),
                        createVNode("div", { class: "vs-container" }, [
                          createVNode("div", { class: "vs" }, "vs")
                        ]),
                        createVNode("div", { class: "team-away" }, [
                          createVNode("img", {
                            src: "https://placehold.co/50x50",
                            alt: "team logo",
                            class: "logo"
                          }),
                          createVNode("span", { class: "team_name" }, "Equipo 1")
                        ])
                      ]),
                      createVNode("div", { class: "data" }, [
                        createVNode("span", { class: "date" }, "24/06/2024"),
                        createVNode("span", { class: "hour" }, "10:00"),
                        createVNode("span", { class: "field" }, "Campo 1")
                      ]),
                      createVNode("div", { class: "btn-container" }, [
                        createVNode(_component_nuxt_link, null, {
                          default: withCtx(() => [
                            createVNode("span", { class: "btn-text" }, " Ver detalles"),
                            createVNode(_component_nuxt_icon, {
                              name: "arrow-right",
                              filled: ""
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ])
                ]),
                createVNode("tr", null, [
                  createVNode("td", null, [
                    createVNode("div", { class: "game-container" }, [
                      createVNode("div", { class: "teams" }, [
                        createVNode("div", { class: "team-local" }, [
                          createVNode("img", {
                            src: "https://placehold.co/50x50",
                            alt: "team logo",
                            class: "logo"
                          }),
                          createVNode("span", { class: "team_name" }, "Equipo 1")
                        ]),
                        createVNode("div", { class: "vs-container" }, [
                          createVNode("div", { class: "vs" }, "vs")
                        ]),
                        createVNode("div", { class: "team-away" }, [
                          createVNode("img", {
                            src: "https://placehold.co/50x50",
                            alt: "team logo",
                            class: "logo"
                          }),
                          createVNode("span", { class: "team_name" }, "Equipo 1")
                        ])
                      ]),
                      createVNode("div", { class: "data" }, [
                        createVNode("span", { class: "date" }, "24/06/2024"),
                        createVNode("span", { class: "hour" }, "10:00"),
                        createVNode("span", { class: "field" }, "Campo 1")
                      ]),
                      createVNode("div", { class: "btn-container" }, [
                        createVNode(_component_nuxt_link, null, {
                          default: withCtx(() => [
                            createVNode("span", { class: "btn-text" }, " Ver detalles"),
                            createVNode(_component_nuxt_icon, {
                              name: "arrow-right",
                              filled: ""
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/equipos/next-games.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const NextGames = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-c1df348f"]]);
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(ssrRenderComponent(VSelect, mergeProps({
    class: "app-bar-secondary-btn mr-4",
    width: "170",
    "item-title": "text",
    density: "compact",
    "item-value": "value",
    "model-value": "Marcar como",
    variant: "outlined",
    items: [
      { value: "creado", text: "Creado" },
      { value: "en curso", text: "En curso" },
      { value: "completado", text: "Completado" },
      { value: "cancelado", text: "Cancelado" }
    ]
  }, _attrs), null, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/torneo/mark-as-input.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const MarkAsInput = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "show-calendar-btn",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1$1, mergeProps({
        icon: "calendar-white",
        text: "Ver calendario"
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/torneo/show-calendar-btn.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "app-bar-btn",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex mr-8" }, _attrs))}>`);
      _push(ssrRenderComponent(MarkAsInput, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/torneos/torneo/app-bar-btn.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2$1, _attrs, {
        "app-bar": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$8, null, {
              buttons: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$8, null, {
                buttons: withCtx(() => [
                  createVNode(_sfc_main$1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tournament-details-container"${_scopeId}><div class="table-container"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(PositionsTable), null, null, _parent2, _scopeId));
            _push2(`</div><div class="games-container"${_scopeId}><div class="live-games"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(LiveGames), null, null, _parent2, _scopeId));
            _push2(`</div><div class="next-games-today"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(NextGamesToday), null, null, _parent2, _scopeId));
            _push2(`</div></div><div class="next-games"${_scopeId}>`);
            _push2(ssrRenderComponent(NextGames, null, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$9, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tournament-details-container" }, [
                createVNode("div", { class: "table-container" }, [
                  createVNode(unref(PositionsTable))
                ]),
                createVNode("div", { class: "games-container" }, [
                  createVNode("div", { class: "live-games" }, [
                    createVNode(unref(LiveGames))
                  ]),
                  createVNode("div", { class: "next-games-today" }, [
                    createVNode(unref(NextGamesToday))
                  ])
                ]),
                createVNode("div", { class: "next-games" }, [
                  createVNode(NextGames)
                ]),
                createVNode(_sfc_main$9)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/torneos/[torneo]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-101Fkewl.mjs.map
