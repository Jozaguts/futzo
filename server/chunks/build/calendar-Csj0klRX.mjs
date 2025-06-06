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
      fill: "#525056",
      d: "M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5v-5Z"
    }, null, -1)
  ]));
}
const calendar = { render() {
  return h(NuxtIcon, { icon: { render }, name: "calendar" });
} };

export { calendar as default, render };
//# sourceMappingURL=calendar-Csj0klRX.mjs.map
