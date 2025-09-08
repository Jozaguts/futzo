import { defineConfig } from 'vitest/config';
import { defineVitestProject } from '@nuxt/test-utils/config';
import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath } from 'node:path';
const rootDir = dirname(fileURLToPath(import.meta.url));
const nuxtSetupFile = resolvePath(rootDir, 'test/nuxt/setup.sanctum.ts');
const E2E_BACKEND_URL = process.env.NUXT_PUBLIC_URL_BACKEND || 'http://app.futzo.test';
const E2E_BACKEND_PREFIX = process.env.NUXT_PUBLIC_BACKEND_PREFIX || 'api/v1';
const INCLUDE_E2E = process.env.RUN_E2E === '1' || process.env.RUN_E2E === 'true';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['test/{e2e,unit}/**/*.{test,spec}.ts'],
          environment: 'node', // sin DOM
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/**/*.{test,spec}.ts'],
          environment: 'nuxt',
          setupFiles: [nuxtSetupFile],
          environmentOptions: {
            nuxt: {
              domEnvironment: 'happy-dom',
              overrides: {
                // Forzamos base vacía para que $fetch/useSanctumClient
                // usen las rutas registradas con registerEndpoint
                // @ts-expect-error
                sanctum: {
                  baseUrl: '',
                  client: {
                    initialRequest: false,
                  },
                },
                runtimeConfig: {
                  public: {
                    baseURLBackend: '',
                    backendPrefix: '',
                    baseUrl: '',
                  },
                },
                app: {
                  head: {
                    script: [], // evitar cargas externas (Maps) en tests
                  },
                },
              },
            },
          },
        },
      }),
      // E2E remoto opcional, activable con RUN_E2E=1
      ...(INCLUDE_E2E
        ? [
            await defineVitestProject({
              test: {
                name: 'nuxt-e2e',
                include: ['test/e2e/**/*.{test,spec,e2e}.ts'],
                environment: 'nuxt',
                environmentOptions: {
                  nuxt: {
                    domEnvironment: 'happy-dom',
                    overrides: {
                      // E2E real: apuntar al backend remoto
                      // @ts-expect-error
                      sanctum: {
                        baseUrl: E2E_BACKEND_URL,
                        client: {
                          initialRequest: true,
                        },
                      },
                      runtimeConfig: {
                        public: {
                          baseURLBackend: E2E_BACKEND_URL,
                          backendPrefix: E2E_BACKEND_PREFIX,
                          baseUrl: process.env.NUXT_PUBLIC_URL || 'https://futzo.io',
                        },
                      },
                      app: {
                        head: { script: [] }, // sin scripts externos en tests
                      },
                    },
                  },
                },
              },
            }),
          ]
        : []),
    ],
  },
});
