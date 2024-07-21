import { bx as defineNuxtRouteMiddleware, by as useSanctumUser, bz as abortNavigation } from './server.mjs';
import 'vue';
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
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'consola/core';
import '@formkit/auto-animate/vue';
import 'awesome-phonenumber';

const admin = defineNuxtRouteMiddleware((to, from) => {
  var _a;
  const user = useSanctumUser();
  if (((_a = user.value) == null ? void 0 : _a.roles[0]) !== "super administrador") {
    return abortNavigation();
  }
});

export { admin as default };
//# sourceMappingURL=admin-C0DoEzfB.mjs.map
