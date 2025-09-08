// @vitest-environment nuxt
import 'dotenv/config';
import { describe, it, expect } from 'vitest';

const EMAIL = process.env.PW_E2E_EMAIL as string | undefined;
const PASSWORD = process.env.PW_E2E_PASSWORD as string | undefined;

describe('E2E headless: login API', () => {
  it.skip(!EMAIL || !PASSWORD, 'PW_E2E_EMAIL/PW_E2E_PASSWORD required');

  it('realiza login y obtiene identidad', async () => {
    await $fetch('/sanctum/csrf-cookie', { method: 'GET' });
    await $fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: EMAIL, password: PASSWORD },
    });
    const me = await $fetch('/api/v1/me', { method: 'GET' });
    expect((me as any)?.id).toBeTruthy();
  });
});

