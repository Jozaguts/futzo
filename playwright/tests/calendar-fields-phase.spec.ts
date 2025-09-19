import { expect, test } from '@playwright/test'
import type { LocationFieldsRequest, ScheduleSettings, Day } from '~/models/Schedule'

const buildDay = (label: Day['label'], enabled = false, selectedValues: string[] = []): Day => ({
  enabled,
  available_range: '08:00 a 12:00',
  label,
  intervals: [
    { value: '08:00', text: '08:00', selected: selectedValues.includes('08:00'), disabled: false },
    { value: '09:00', text: '09:00', selected: selectedValues.includes('09:00'), disabled: false },
    { value: '10:00', text: '10:00', selected: false, disabled: true },
  ],
})

const fieldsResponse: LocationFieldsRequest[] = [
  {
    field_id: 1,
    step: 1,
    field_name: 'Cancha 1',
    location_name: 'Parque Futzo',
    location_id: 11,
    disabled: false,
    availability: {
      monday: buildDay('Lunes'),
      tuesday: buildDay('Martes'),
      wednesday: buildDay('Miércoles'),
      thursday: buildDay('Jueves'),
      friday: buildDay('Viernes'),
      saturday: buildDay('Sábado'),
      sunday: buildDay('Domingo'),
      isCompleted: false,
    },
  },
  {
    field_id: 2,
    step: 2,
    field_name: 'Cancha 2',
    location_name: 'Parque Futzo',
    location_id: 11,
    disabled: false,
    availability: {
      monday: buildDay('Lunes'),
      tuesday: buildDay('Martes'),
      wednesday: buildDay('Miércoles'),
      thursday: buildDay('Jueves'),
      friday: buildDay('Viernes'),
      saturday: buildDay('Sábado'),
      sunday: buildDay('Domingo'),
      isCompleted: false,
    },
  },
]

const scheduleSettingsResponse: ScheduleSettings = {
  start_date: '2024-01-01',
  end_date: null,
  game_time: 60,
  min_teams: 2,
  max_teams: 10,
  time_between_games: 15,
  teams: 8,
  round_trip: false,
  elimination_round_trip: false,
  format: {
    id: 1,
    name: 'Liga',
    description: 'Formato liga',
    status: 'activo',
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  footballType: {
    id: 1,
    name: 'Futbol 5',
    description: 'Futbol rápido',
    status: 'activo',
    max_players_per_team: 12,
    min_players_per_team: 5,
    max_registered_players: 20,
    substitutions: null,
    deleted_at: null,
  },
  locations: [
    {
      id: 11,
      name: 'Parque Futzo',
      address: 'Av. demo 123',
      tags: [],
      pivot: {
        tournament_id: 1,
        location_id: 11,
      } as any,
    },
  ],
  tiebreakers: [],
  phases: [],
}

test.describe('Calendar fields phase', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/v1/admin/tournaments?**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: [
            {
              id: 1,
              name: 'Torneo Futzo',
              slug: 'torneo-futzo',
              status: 'creado',
              start_date: '2024-01-01',
              end_date: '2024-03-01',
              created_at: '2024-01-01',
              updated_at: '2024-01-01',
            },
          ],
          meta: { current_page: 1, per_page: 10, last_page: 1, total: 1, sort: 'asc' },
        }),
      })
    })

    await page.route('**/api/v1/admin/tournaments/1/schedule?**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          rounds: [],
          pagination: { total_rounds: 0 },
        }),
      })
    })

    await page.route('**/api/v1/admin/tournaments/1/schedule/settings**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(scheduleSettingsResponse),
      })
    })

    await page.route('**/api/v1/admin/locations/fields**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(fieldsResponse),
      })
    })

    await page.route('**/api/v1/**', async (route) => {
      if (!route.request().url().includes('/api/v1/admin/')) {
        await route.continue()
        return
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      })
    })
  })

  test('allows selecting intervals and marking a field as completed', async ({ page }) => {
    await page.goto('/torneos', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Ver calendario' }).first().click()
    await page.waitForURL('**/torneos/torneo-futzo/calendario')

    await page.getByRole('button', { name: 'Crear calendario' }).click()
    const dialog = page.getByRole('dialog', { name: 'Crear un calendario' })
    await expect(dialog).toBeVisible()

    await page.evaluate(() => {
      const stores = (window as any).__TEST_STORES__
      stores.schedule.calendarSteps.current = 'fields'
      stores.schedule.calendarSteps.steps.fields.disable = false
    })

    const firstChip = dialog.getByRole('button', { name: '08:00' }).first()
    await firstChip.click()
    await expect(firstChip).toHaveAttribute('aria-pressed', 'true')

    const mondayEnabled = await page.evaluate(() => {
      const stores = (window as any).__TEST_STORES__
      return stores.schedule.scheduleStoreRequest.fields_phase[0].availability.monday.enabled
    })
    expect(mondayEnabled).toBe(true)

    await dialog.getByRole('button', { name: 'Marcar como completado' }).click()

    const isCompleted = await page.evaluate(() => {
      const stores = (window as any).__TEST_STORES__
      return stores.schedule.scheduleStoreRequest.fields_phase[0].availability.isCompleted
    })
    expect(isCompleted).toBe(true)
  })
})
