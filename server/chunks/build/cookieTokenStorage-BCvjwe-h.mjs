import { unref } from 'vue';
import { u as useCookie, a as useRequestURL } from './server.mjs';
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

const cookieTokenKey = "sanctum.token.cookie";
const cookieTokenStorage = {
  async get(app) {
    return app.runWithContext(() => {
      var _a;
      const cookie = useCookie(cookieTokenKey, { readonly: true });
      return (_a = unref(cookie.value)) != null ? _a : void 0;
    });
  },
  async set(app, token) {
    await app.runWithContext(() => {
      const isSecure = useRequestURL().protocol.startsWith("https");
      const cookie = useCookie(cookieTokenKey, { secure: isSecure });
      cookie.value = token;
    });
  }
};

export { cookieTokenStorage };
//# sourceMappingURL=cookieTokenStorage-BCvjwe-h.mjs.map
