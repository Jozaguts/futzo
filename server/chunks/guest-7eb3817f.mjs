import { e as defineNuxtRouteMiddleware, f as useLocalStorage, n as navigateTo } from './server.mjs';
import 'vue';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'defu';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'h3';
import 'ufo';
import '@iconify/vue';
import 'vue/server-renderer';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const guest = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  if (useLocalStorage("futzo_token", null).value && to.name === "login") {
    return navigateTo("/");
  }
});

export { guest as default };
//# sourceMappingURL=guest-7eb3817f.mjs.map
