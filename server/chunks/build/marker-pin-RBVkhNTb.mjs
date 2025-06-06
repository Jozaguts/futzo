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
  viewBox: "0 0 24 24"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _cache[0] || (_cache[0] = [
    createElementVNode("path", {
      stroke: "#000",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 12.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    }, null, -1),
    createElementVNode("path", {
      stroke: "#000",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 22c2-4 8-6.582 8-12a8 8 0 1 0-16 0c0 5.418 6 8 8 12Z"
    }, null, -1)
  ]));
}
const markerPin = { render() {
  return h(NuxtIcon, { icon: { render }, name: "marker-pin" });
} };

export { markerPin as default, render };
//# sourceMappingURL=marker-pin-RBVkhNTb.mjs.map
