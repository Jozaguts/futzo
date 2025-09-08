import { test, expect } from '@playwright/test';

test.describe('Plans: precios públicos y render', () => {
  test('renderiza tarjetas de planes (no requiere login)', async ({ page }) => {
    await page.goto('/');
    // Navega a configuración si hay enlace, si no, ir directo a la ruta pública
    await page.goto('/configuracion');
    // Abre pestaña "Suscripción"
    await page.getByRole('tab', { name: /Suscripción/i }).click();

    // Espera contenido de Planes
    // Las tarjetas de PlanCard renderizan CTA como texto visible
    const anyCard = page.getByRole('button', { name: /Ver detalles|Seleccionar|Comprar|Iniciar/i });
    await expect(anyCard).toBeVisible({ timeout: 15000 });
  });
});

