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
    createElementVNode("path", {
      fill: "#6400E6",
      d: "M0 4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
    }, null, -1),
    createElementVNode("path", {
      stroke: "#fff",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.667",
      d: "m12 5-5.5 5.5L4 8"
    }, null, -1)
  ]));
}
const checkBox = { render() {
  return h(NuxtIcon, { icon: { render }, name: "check-box" });
} };

export { checkBox as default, render };
//# sourceMappingURL=check-box-Cae584rV.mjs.map
