import { bL as defineNuxtRouteMiddleware, bM as useSanctumUser, bN as abortNavigation } from './server.mjs';
import 'vue';
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
import 'vue/server-renderer';

const admin = defineNuxtRouteMiddleware(() => {
  var _a, _b, _c;
  const user = useSanctumUser();
  const isLogged = !!((_a = user.value) == null ? void 0 : _a.email);
  if (isLogged && !((_c = (_b = user.value) == null ? void 0 : _b.roles) == null ? void 0 : _c.includes("super administrador"))) {
    return abortNavigation();
  }
});

export { admin as default };
//# sourceMappingURL=admin-BYGOldKA.mjs.map
