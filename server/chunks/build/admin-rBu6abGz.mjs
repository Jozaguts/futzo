import { bQ as defineNuxtRouteMiddleware, bR as useSanctumUser, bS as abortNavigation } from './server.mjs';
import 'vue';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';
import 'node:module';
import 'pinia';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'vue/server-renderer';
import '@vue/reactivity';
import 'vue3-perfect-scrollbar';
import '@formkit/auto-animate/vue';
import 'awesome-phonenumber';

const admin = defineNuxtRouteMiddleware(() => {
  var _a, _b, _c;
  const user = useSanctumUser();
  const isLogged = !!((_a = user.value) == null ? void 0 : _a.email);
  if (isLogged && !((_c = (_b = user.value) == null ? void 0 : _b.roles) == null ? void 0 : _c.includes("super administrador"))) {
    return abortNavigation();
  }
});

export { admin as default };
//# sourceMappingURL=admin-rBu6abGz.mjs.map
