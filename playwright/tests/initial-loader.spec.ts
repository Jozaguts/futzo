import { test } from '@playwright/test';

test.describe('Initial loader (#loading-bg)', () => {
  test('muestra y luego oculta el loader en la primera carga', async ({ page }) => {
    // Cargamos la home y comprobamos que el overlay aparece
    await page.goto('/', { waitUntil: 'commit' });
    const loader = page.locator('#loading-bg');
    await loader.waitFor({ state: 'visible', timeout: 90000 });

    // El plugin cliente lo oculta al montar la app y luego lo elimina
    await loader.waitFor({ state: 'detached', timeout: 90000 });
  });

  test('muestra el loader al recargar manualmente', async ({ page }) => {
    await page.goto('/', { waitUntil: 'commit' });
    // Esperar a que desaparezca en la primera carga
    await page.locator('#loading-bg').waitFor({ state: 'detached', timeout: 90000 });

    // Recargar y volver a verificar
    await page.reload({ waitUntil: 'commit' });
    const loader = page.locator('#loading-bg');
    await loader.waitFor({ state: 'visible', timeout: 90000 });
    await loader.waitFor({ state: 'detached', timeout: 90000 });
  });
});
