import {expect, test} from '@playwright/test';

// Usa el email base de .env y le agrega un subfijo único
function withPlusAddress(baseEmail: string) {
  const [user, domain] = baseEmail.split('@');
  const stamp = new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, '')
    .slice(0, 14);
  return `${user}+pw-${stamp}@${domain}`;
}

const BASE_EMAIL = 'tester@playwright.test';
const PASSWORD = process.env.PW_E2E_PASSWORD || 'Password11.'; // 8+ chars + special

// Forzar esta suite sin sesión previa
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Auth: registro UI (local backend)', () => {
  test('registra por email y navega a /verificar?email=...', async ({ page }) => {
    const email = withPlusAddress(BASE_EMAIL);

    // 1) Entrar a /login (por defecto muestra el formulario de registro)
    await page.goto('/login', { waitUntil: 'commit' });
    // Preloader inicial visible y luego eliminado
    await page
      .locator('#loading-bg')
      .waitFor({ state: 'visible', timeout: 5000 })
      .catch(() => {});
    await page
      .locator('#loading-bg')
      .waitFor({ state: 'detached', timeout: 10000 })
      .catch(() => {});

    // 2) Completar formulario de registro
    await page.getByPlaceholder('Escribe tu nombre').fill('admin');
    await page.getByPlaceholder('tucorreo@futzo.io/+52 999 999 9999').fill(email);
    await page.getByPlaceholder('Crea una contraseña').fill(PASSWORD);

    // 3) Aceptar consentimiento (checkbox) y enviar (Empezar)
    const consent = page.getByRole('checkbox', { name: /El código llegará al medio que seleccione: WhatsApp/i });
    await consent.click();
    await expect(page.getByRole('button', { name: /^Empezar$/i })).toBeEnabled();
    await page.getByRole('button', { name: /^Empezar$/i }).click();

    // 4) Debería navegar a /verificar?email=<email>
    await page.waitForURL(/\/verificar\?email=.*/);
    // Tolerar que "+" venga sin codificar o se decodifique a espacio
    const current = new URL(page.url());
    const qEmail = current.searchParams.get('email') || '';
    const normalized = qEmail.replace(/ /g, '+');
    expect(normalized).toBe(email);

    // 5) Validar textos de la pantalla de verificación (email)
    await expect(page.getByText(/Verificar correo/i)).toBeVisible();
    await expect(page.getByText(/Te enviamos un correo de verificación al/i)).toBeVisible();
    await expect(page.getByText(/correo:/i)).toBeVisible();
    const altEmail = email.replace(/\+/g, ' ');
    const emailPattern = new RegExp(
      `${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}|${altEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`
    );
    await expect(page.locator('body')).toContainText(emailPattern);

    // 6) Botón para reenviar y enlace para regresar
    await expect(page.getByRole('button', { name: /Reenviar/i })).toBeVisible();
    await expect(page.getByText('Regresar a registrarme', { exact: false })).toBeVisible();

    // 7) Ingresar código 1111 y verificar (backend local acepta OTP fijo para @playwright.test)
    const otpFirst = page.getByPlaceholder('0').first();
    await otpFirst.click();
    await page.keyboard.type('1111');
    await page.getByRole('button', { name: /^Verificar$/i }).click();

    // 8) Validar que aparece el componente de verificación exitosa
    await expect(page.getByText(/Correo verificado/i)).toBeVisible();
    await expect(page.getByText(/Gracias por confirmar tu correo, ahora puedes/i)).toBeVisible();
    await expect(page.getByText(/iniciar sesión con tu correo y contraseña/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Crea tu liga/i })).toBeVisible();

    // 10) Ir a crear liga y validar UI y reglas
    await page.getByRole('button', { name: /Crea tu liga/i }).click();
    await page.waitForURL('**/bienvenido');

    // Título/subtítulo
    const subtitle = page.locator("div.v-card-title.welcome-card__subtitle span");
    await expect(subtitle).toHaveText(/Nombra tu liga para empezar/i);

    // Input y botón
    const leagueInput = page.getByPlaceholder('P. ej. Liga Vallarta');
    const createBtn = page.getByRole('button', { name: /^Crear liga$/i });
    await expect(leagueInput).toBeVisible();
    await expect(createBtn).toBeVisible();

    // Regla: mínimo 6 caracteres → con 5 debe estar deshabilitado y mostrar mensaje
    await leagueInput.fill('Liga1'); // 5 chars
    // disparar validación (blur)
    await page.keyboard.press('Tab');
    await expect(createBtn).toBeDisabled();
    await expect(page.getByText('El nombre debe tener al menos 6 caracteres.')).toBeVisible();

    // Con 6 caracteres debe habilitarse
    await leagueInput.fill('Liga12'); // 6 chars
    await page.keyboard.press('Tab');
    await expect(createBtn).toBeEnabled();

    // Enviar formulario para crear la liga
    await createBtn.click();

    // Debe mostrarse la tarjeta de confirmación
    await expect(page.getByText(/Tu liga ha sido creada/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Ya puedes empezar a planificar tu liga\./i)).toBeVisible();
    const homeBtn = page.getByRole('button', { name: /^Inicio$/i });
    await expect(homeBtn).toBeVisible();

    // Click en Inicio redirige a /
    await homeBtn.click();
    await page.waitForLoadState('networkidle');
    await page.waitForURL('**/dashboard');
  });
});
