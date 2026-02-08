import { FullConfig, request } from '@playwright/test';
import { ensurePlaywrightEnv } from './load-env';
import fs from 'node:fs';
import path from 'node:path';

export default async function globalSetup(config: FullConfig) {
  ensurePlaywrightEnv();
  const backendURL = process.env.NUXT_PUBLIC_URL_BACKEND || 'http://testing.futzo.test';
  const appOrigin = process.env.PW_BASE_URL || `http://127.0.0.1:${process.env.NUXT_PORT || '3000'}`;
  console.log('[pw] backendURL', backendURL);
  console.log('[pw] appOrigin', appOrigin);
  const email = process.env.PW_E2E_EMAIL;
  const password = process.env.PW_E2E_PASSWORD;
  const outDir = path.resolve(process.cwd(), 'playwright/.auth');
  const statePath = path.join(outDir, 'user.json');

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Si no hay credenciales, crea un estado vacío y continúa sin login
  if (!email || !password) {
    await fs.promises.writeFile(statePath, JSON.stringify({ cookies: [], origins: [] }, null, 2));
    return;
  }

  // Login vía API para obtener cookies de Sanctum (SPA stateful)
  const api = await request.newContext({
    baseURL: backendURL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Origin: appOrigin,
      Referer: appOrigin,
    },
  });

  // 1) Pedir CSRF cookie (XSRF-TOKEN)
  const csrfRes = await api.get('/sanctum/csrf-cookie');
  console.log('[pw] csrf status', csrfRes.status(), 'url', csrfRes.url());
  if (!csrfRes.ok()) throw new Error(`CSRF cookie failed: ${csrfRes.status()}`);

  // Extraer XSRF-TOKEN de cookies
  const cookies = await api.storageState();
  const xsrf = cookies.cookies.find((c) => c.name === 'XSRF-TOKEN');
  const xsrfToken = xsrf ? decodeURIComponent(xsrf.value) : '';

  // 2) Login
  const loginRes = await api.post('/auth/login', {
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': xsrfToken,
    },
    data: { email, password },
  });
  console.log('[pw] login status', loginRes.status(), 'url', loginRes.url());
  if (!loginRes.ok()) throw new Error(`Login failed: ${loginRes.status()} ${await loginRes.text()}`);

  // 3) Verificar identidad
  const me = await api.get('/api/v1/me');
  if (!me.ok()) throw new Error(`/me failed: ${me.status()} ${await me.text()}`);

  // Guardar cookies en storageState de Playwright
  const state = await api.storageState();
  await fs.promises.writeFile(statePath, JSON.stringify(state, null, 2));
}
