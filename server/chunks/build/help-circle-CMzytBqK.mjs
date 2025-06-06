import { h, createElementBlock, openBlock, createElementVNode } from 'vue';
import { N as NuxtIcon } from './nuxt-icon-Ctre7kET.mjs';
import 'vue/server-renderer';
import './server.mjs';
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
import 'pinia';
import 'vue-router';
import '@iconify/vue';
import 'perfect-scrollbar';
import 'deep-pick-omit';
import 'dayjs';
import 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/es.js';
import 'awesome-phonenumber';

const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 16 16"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _cache[0] || (_cache[0] = [
    createElementVNode("g", { "clip-path": "url(#i1048215528__a)" }, [
      createElementVNode("path", {
        stroke: "#667085",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "1.333",
        d: "M6.06 6a2 2 0 0 1 3.887.667c0 1.333-2 2-2 2M8 11.333h.007M14.667 8A6.667 6.667 0 1 1 1.333 8a6.667 6.667 0 0 1 13.334 0Z"
      })
    ], -1),
    createElementVNode("defs", null, [
      createElementVNode("clipPath", { id: "i1048215528__a" }, [
        createElementVNode("path", {
          fill: "#fff",
          d: "M0 0h16v16H0z"
        })
      ])
    ], -1)
  ]));
}
const helpCircle = { render() {
  return h(NuxtIcon, { icon: { render }, name: "help-circle" });
} };

export { helpCircle as default, render };
//# sourceMappingURL=help-circle-CMzytBqK.mjs.map
