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
  viewBox: "0 0 21 21"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _cache[0] || (_cache[0] = [
    createElementVNode("path", {
      stroke: "#475467",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.667",
      d: "M16.333 10.5H4.667m0 0 5.833 5.833M4.667 10.5 10.5 4.667"
    }, null, -1)
  ]));
}
const arrowLeft = { render() {
  return h(NuxtIcon, { icon: { render }, name: "arrow-left" });
} };

export { arrowLeft as default, render };
//# sourceMappingURL=arrow-left-DgXf9Nmt.mjs.map
