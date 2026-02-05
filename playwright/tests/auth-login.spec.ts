import {expect, test} from '@playwright/test';

const EMAIL = process.env.PW_E2E_EMAIL;
const PASSWORD = process.env.PW_E2E_PASSWORD;

// Aseguramos que esta suite se ejecute sin sesión previa
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Auth: login UI (local backend)', () => {
  test.skip(!EMAIL || !PASSWORD, 'PW_E2E_EMAIL/PW_E2E_PASSWORD required');

  test('carga, alterna a login si corresponde y autentica', async ({ page }) => {
    // 1) Ir a /login y esperar el preloader inicial
    await page.goto('/login', { waitUntil: 'commit' });
    const loader = page.locator('#loading-bg');
    await loader.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    await loader.waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});

    // 2) Si estamos en el formulario de registro, alternar a "Iniciar sesión"
    const toggleToLogin = page.getByRole('link', { name: /^Iniciar sesión$/i });
    if (await toggleToLogin.isVisible().catch(() => false)) {
      await toggleToLogin.click();
    }

    // 3) Completar credenciales de login y enviar
    await page.getByPlaceholder('tucorreo@futzo.io/+52 999 999 9999').fill(EMAIL!);
    await page.getByPlaceholder('Crea una contraseña').fill(PASSWORD!);
    await page.getByRole('button', { name: /^Iniciar sesión$/i }).click();

    // 4) Redirección a home
    await page.waitForLoadState('networkidle');
    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL('dashboard');
  });
});
