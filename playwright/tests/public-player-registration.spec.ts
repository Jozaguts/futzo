import { expect, request, test } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';

const closedTeamSlug = process.env.PW_PUBLIC_TEAM_SLUG_CLOSED;
const backendUrl = process.env.NUXT_PUBLIC_URL_BACKEND || 'http://testing.futzo.test';
const appOrigin = process.env.PW_BASE_URL || `http://127.0.0.1:${process.env.NUXT_PORT || '3000'}`;
const adminEmail = process.env.PW_E2E_EMAIL;
const adminPassword = process.env.PW_E2E_PASSWORD;

type TeamListItem = {
  id?: number | string | null
  slug?: string | null
  name?: string | null
}

type OpenTeam = {
  id: number
  slug: string
  name: string
}

const withUniqueEmail = (base: string) => {
  const [user, domain] = base.split('@')
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)
  return `${user}+public-player-${stamp}@${domain}`
}

const loginAsAdmin = async () => {
  if (!adminEmail || !adminPassword) {
    throw new Error('PW_E2E_EMAIL/PW_E2E_PASSWORD are required for backend validation.')
  }

  const api = await request.newContext({
    baseURL: backendUrl,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Origin: appOrigin,
      Referer: appOrigin,
    },
  })

  const csrfRes = await api.get('/sanctum/csrf-cookie')
  expect(csrfRes.ok()).toBeTruthy()

  const state = await api.storageState()
  const xsrf = state.cookies.find((cookie) => cookie.name === 'XSRF-TOKEN')
  const xsrfToken = xsrf ? decodeURIComponent(xsrf.value) : ''

  const loginRes = await api.post('/auth/login', {
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': xsrfToken,
    },
    data: {
      email: adminEmail,
      password: adminPassword,
    },
  })

  expect(loginRes.ok()).toBeTruthy()
  return api
}

const findOpenTeam = async (api: APIRequestContext): Promise<OpenTeam> => {
  let page = 1
  const perPage = 50

  while (page <= 10) {
    const teamsRes = await api.get(`/api/v1/admin/teams?per_page=${perPage}&page=${page}&sort=asc`)
    expect(teamsRes.ok()).toBeTruthy()
    const teamsPayload = await teamsRes.json()
    const teams = Array.isArray(teamsPayload?.data) ? (teamsPayload.data as TeamListItem[]) : []

    for (const team of teams) {
      const teamId = Number(team.id ?? 0)
      const teamSlug = String(team.slug ?? '').trim()
      if (!teamId || !teamSlug) {
        continue
      }
      const canRegisterRes = await api.get(`/api/v1/public/teams/${teamSlug}/can-register`)
      if (!canRegisterRes.ok()) {
        continue
      }
      const canRegisterPayload = await canRegisterRes.json()
      if (canRegisterPayload?.canRegister === true) {
        return {
          id: teamId,
          slug: teamSlug,
          name: String(team.name ?? teamSlug),
        }
      }
    }

    const metaLastPage = Number(teamsPayload?.meta?.last_page ?? page)
    if (page >= metaLastPage || teams.length === 0) {
      break
    }
    page += 1
  }

  throw new Error('No open team found for public player registration. Seed at least one team with canRegister=true.')
}

const completeBirthdate = async (page: import('@playwright/test').Page) => {
  const birthdateRow = page.locator('#player-step-1 .v-row').filter({
    hasText: 'Fecha de nacimiento',
  })
  const birthdateInput = birthdateRow.locator('input').first()
  await birthdateInput.click({ force: true })
  await birthdateInput.fill('01/01/2000')
  await birthdateInput.press('Enter')
}

const completeVerificationFieldsIfVisible = async (page: import('@playwright/test').Page) => {
  const identificationRow = page.locator('#player-step-1 .v-row').filter({
    hasText: 'Identificación',
  })
  if (await identificationRow.count()) {
    const combobox = identificationRow.locator('input')
    if (await combobox.count()) {
      await combobox.first().click({ force: true })
      const firstOption = page.locator('[role="option"]').first()
      if (await firstOption.count()) {
        await firstOption.click()
      }
    }
  }

  const docRow = page.locator('#player-step-1 .v-row').filter({
    hasText: 'Documento de identificación',
  })
  const docInput = docRow.locator('input[type="file"]').first()
  if (await docInput.count()) {
    await docInput.setInputFiles({
      name: 'documento.png',
      mimeType: 'image/png',
      buffer: Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgU9jwioAAAAASUVORK5CYII=',
        'base64'
      ),
    })
  }
}

const waitForCreatedPlayer = async (api: APIRequestContext, email: string, timeoutMs = 25_000) => {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    const playersRes = await api.get(
      `/api/v1/admin/players?per_page=10&page=1&sort=asc&search=${encodeURIComponent(email)}`
    )
    expect(playersRes.ok()).toBeTruthy()
    const playersPayload = await playersRes.json()
    const players = Array.isArray(playersPayload?.data) ? playersPayload.data : []
    const found = players.find((player: any) => String(player?.email || '').toLowerCase() === email.toLowerCase())
    if (found?.id) {
      return found
    }

    await new Promise((resolve) => setTimeout(resolve, 1200))
  }

  throw new Error(`Player ${email} was not found in admin players list after ${timeoutMs}ms.`)
}

test.describe('Public player registration', () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test('creates a public player and links it to the team from URL', async ({ page }) => {
    const adminApi = await loginAsAdmin()

    try {
      const team = await findOpenTeam(adminApi)
      const playerEmail = withUniqueEmail('public.player@playwright.test')
      const playerName = `Player Public ${Date.now().toString().slice(-6)}`

      await page.goto(`/equipos/${team.slug}/jugadores/inscripcion`, { waitUntil: 'domcontentloaded' })
      await page.locator('#loading-bg').waitFor({ state: 'detached', timeout: 20_000 }).catch(() => {})

      await expect(page).not.toHaveURL(new RegExp(`/equipos/${team.slug}/inscripcion-cerrada`))
      await expect(page.getByText('Registrar jugador')).toBeVisible()

      await page.getByPlaceholder('p.ej. Cristiano Ronaldo').fill(playerName)
      await completeBirthdate(page)
      await completeVerificationFieldsIfVisible(page)

      await page.getByRole('button', { name: /^Siguiente$/i }).click()
      await expect(page.locator('#player-step-2')).toBeVisible()

      await page.getByRole('button', { name: /^Siguiente$/i }).click()
      await expect(page.locator('#player-step-3')).toBeVisible()

      await page.getByPlaceholder('p.ej. sagit@futzo.io').fill(playerEmail)
      await page.getByRole('button', { name: /^Crear jugador$/i }).click()

      await expect(page.getByTestId('pre-register-success')).toBeVisible({ timeout: 20_000 })
      await expect(page.getByText('Jugador registrado con éxito')).toBeVisible()

      const createdPlayer = await waitForCreatedPlayer(adminApi, playerEmail)
      const detailRes = await adminApi.get(`/api/v1/admin/players/${createdPlayer.id}`)
      expect(detailRes.ok()).toBeTruthy()
      const detailPayload = await detailRes.json()

      const registeredTeamId = Number(
        detailPayload?.data?.team?.id ?? createdPlayer?.team?.id ?? detailPayload?.data?.teams?.[0]?.id ?? 0
      )
      expect(registeredTeamId).toBe(team.id)
    } finally {
      await adminApi.dispose()
    }
  })

  test.skip(!closedTeamSlug, 'Define PW_PUBLIC_TEAM_SLUG_CLOSED to run this test.')

  test('redirects when team registration is closed', async ({ page }) => {
    await page.goto(`/equipos/${closedTeamSlug}/jugadores/inscripcion`, { waitUntil: 'domcontentloaded' })

    await expect(page).toHaveURL(new RegExp(`/equipos/${closedTeamSlug}/inscripcion-cerrada`))
    await expect(page.getByText('Registro no disponible')).toBeVisible()
  })
})
