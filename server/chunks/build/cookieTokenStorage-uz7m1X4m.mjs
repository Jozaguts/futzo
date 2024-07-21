import { unref } from 'vue';
import { u as useCookie } from './server.mjs';
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

const cookieTokenKey = "sanctum.token.cookie";
const cookieTokenStorage = {
  async get(app) {
    return await app.runWithContext(() => {
      var _a;
      const cookie = useCookie(cookieTokenKey, { readonly: true });
      return (_a = unref(cookie.value)) != null ? _a : void 0;
    });
  },
  async set(app, token) {
    await app.runWithContext(() => {
      const cookie = useCookie(cookieTokenKey, { secure: true });
      cookie.value = token;
    });
  }
};

export { cookieTokenStorage };
//# sourceMappingURL=cookieTokenStorage-uz7m1X4m.mjs.map
