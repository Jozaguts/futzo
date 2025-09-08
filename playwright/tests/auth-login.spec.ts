import { test, expect } from '@playwright/test';

const EMAIL = process.env.PW_E2E_EMAIL;
const PASSWORD = process.env.PW_E2E_PASSWORD;

test.describe('Auth: login UI (local backend)', () => {
  test.skip(!EMAIL || !PASSWORD, 'PW_E2E_EMAIL/PW_E2E_PASSWORD required');

  test('login and redirect to home', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('tucorreo@futzo.io/+52 999 999 9999').fill(EMAIL!);
    await page.getByPlaceholder('Crea una contraseña').fill(PASSWORD!);
    await page.getByRole('button', { name: /Iniciar sesión/i }).click();

    await page.waitForLoadState('networkidle');
    await page.waitForURL('**/');
    await expect(page).toHaveURL(/\/$/);
  });
});

