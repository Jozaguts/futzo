// @vitest-environment nuxt
import { describe, it, expect } from 'vitest';

describe('E2E: Sanctum CSRF y identidad (remoto)', () => {
  it('obtiene cookie CSRF del backend real', async () => {
    const res = await $fetch('/sanctum/csrf-cookie', { method: 'GET' });
    // Laravel suele devolver 204/200 sin body; basta con que no lance error
    expect(res === null || typeof res === 'object' || res === undefined).toBe(true);
  });

  it('consulta identidad actual (puede ser 200 o 401)', async () => {
    try {
      const me = await $fetch('/api/v1/me', { method: 'GET' });
      // Si está autenticado, debería venir un objeto con id/email
      expect(typeof me).toBe('object');
    } catch (err: any) {
      // Si no hay sesión, 401 es válido en entorno real
      expect(err?.response?.status).toBe(401);
    }
  });
});

