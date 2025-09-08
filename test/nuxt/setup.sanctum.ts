import { beforeAll } from 'vitest';
import { registerEndpoint } from '@nuxt/test-utils/runtime';

beforeAll(() => {
  // Evita el 404 de Sanctum
  registerEndpoint('/sanctum/csrf-cookie', {
    method: 'GET',
    handler: () => ({ ok: true }),
  });

  // Devuelve identidad para CSR
  registerEndpoint('/api/user', {
    method: 'GET',
    handler: () => ({ id: 1, name: 'Test Admin', email: 'admin@example.com' }),
  });
  // Por si tu plugin usa /api/v1/user
  registerEndpoint('/api/v1/user', {
    method: 'GET',
    handler: () => ({ id: 1, name: 'Test Admin', email: 'admin@example.com' }),
  });
  // Config actual de nuxt-auth-sanctum (nuxt.config.ts) usa /api/v1/me
  registerEndpoint('/api/v1/me', {
    method: 'GET',
    handler: () => ({ id: 1, name: 'Test Admin', email: 'admin@example.com' }),
  });
});
