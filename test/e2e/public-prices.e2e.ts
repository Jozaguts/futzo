// @vitest-environment nuxt
import { describe, it, expect } from 'vitest';

describe('E2E: Precios públicos (remoto)', () => {
  it('devuelve estructura de planes', async () => {
    const data = await $fetch('/api/v1/public/products/prices');
    // Validaciones suaves para no acoplar a contenido exacto
    expect(data).toBeTruthy();
    expect(typeof data).toBe('object');
    for (const key of ['kickoff', 'pro_play', 'elite_league']) {
      expect(key in data).toBe(true);
      const plan = (data as any)[key];
      expect(typeof plan?.sku).toBe('string');
      expect(typeof plan?.name).toBe('string');
      expect(plan?.prices).toBeTruthy();
    }
  });
});

