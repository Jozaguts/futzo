import { unref } from 'vue';
import { u as useRequestURL, a as useCookie } from './server.mjs';
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
//# sourceMappingURL=cookieTokenStorage-Cwb2qfPB.mjs.map
