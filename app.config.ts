import type { FetchContext } from "ofetch";
import type { ConsolaInstance } from "consola";
import type { NuxtApp } from "@nuxt/schema";

export default defineAppConfig({
  sanctum: {
    interceptors: {
      onRequest: async (
        app: NuxtApp,
        ctx: FetchContext,
        logger: ConsolaInstance,
      ) => {
        if (process.env.NODE_ENV === "development") {
          ctx.options.headers.set("XDEBUG_SESSION", "PHPSTORM");
        }
      },
    },
  },
});
