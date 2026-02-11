import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import {flushPromises} from '@vue/test-utils'
import {ensureVuetifyApp, vuetifyStubs} from '../../../../utils/vuetify-stubs'
import DisciplinePanel from '~/components/pages/torneos/discipline/DisciplinePanel.vue'

const toast = vi.fn()

const disciplineApi = vi.hoisted(() => ({
  getDisciplineSummary: vi.fn(),
  getDisciplineMeta: vi.fn(),
  getDisciplineCases: vi.fn(),
  createDisciplinaryCase: vi.fn(),
  submitDisciplinaryCase: vi.fn(),
  getDisciplinaryCase: vi.fn(),
  previewDisciplinaryCase: vi.fn(),
  applyDisciplinaryCase: vi.fn(),
  revertDisciplinaryCase: vi.fn(),
  getDisciplineDefaults: vi.fn(),
  getTeamAvailablePlayers: vi.fn(),
  getTeamDisciplineMatches: vi.fn(),
}))

vi.mock('~/http/api/discipline', () => ({
  getDisciplineSummary: disciplineApi.getDisciplineSummary,
  getDisciplineMeta: disciplineApi.getDisciplineMeta,
  getDisciplineCases: disciplineApi.getDisciplineCases,
  createDisciplinaryCase: disciplineApi.createDisciplinaryCase,
  submitDisciplinaryCase: disciplineApi.submitDisciplinaryCase,
  getDisciplinaryCase: disciplineApi.getDisciplinaryCase,
  previewDisciplinaryCase: disciplineApi.previewDisciplinaryCase,
  applyDisciplinaryCase: disciplineApi.applyDisciplinaryCase,
  revertDisciplinaryCase: disciplineApi.revertDisciplinaryCase,
  getDisciplineDefaults: disciplineApi.getDisciplineDefaults,
  getTeamAvailablePlayers: disciplineApi.getTeamAvailablePlayers,
  getTeamDisciplineMatches: disciplineApi.getTeamDisciplineMatches,
}))

mockNuxtImport('useToast', () => () => ({ toast }))

describe('DisciplinePanel', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    toast.mockReset()
    disciplineApi.getDisciplineSummary.mockReset()
    disciplineApi.getDisciplineMeta.mockReset()
    disciplineApi.getDisciplineCases.mockReset()
    disciplineApi.createDisciplinaryCase.mockReset()
    disciplineApi.submitDisciplinaryCase.mockReset()
    disciplineApi.getDisciplinaryCase.mockReset()
    disciplineApi.previewDisciplinaryCase.mockReset()
    disciplineApi.applyDisciplinaryCase.mockReset()
    disciplineApi.revertDisciplinaryCase.mockReset()
    disciplineApi.getDisciplineDefaults.mockReset()
    disciplineApi.getTeamAvailablePlayers.mockReset()
    disciplineApi.getTeamDisciplineMatches.mockReset()

    disciplineApi.getDisciplineSummary.mockResolvedValue({
      total: 5,
      pending: 2,
      applied: 2,
      closed: 1,
    })

    disciplineApi.getDisciplineMeta.mockResolvedValue({
      rounds: [1, 2],
      teams: [{ id: 22, name: 'Aguilas FC', image: null }],
      violations: [{ id: 3, name: 'Agresion fisica' }],
      statuses: [
        { value: 'draft', label: 'Borrador' },
        { value: 'review', label: 'En revision' },
        { value: 'applied', label: 'Aplicada' },
        { value: 'closed', label: 'Cerrada' },
      ],
    })

    disciplineApi.getDisciplineCases.mockResolvedValue({
      data: [
        {
          id: 1,
          case_id: 'DISC-2026-001',
          created_at: '2026-02-01T12:00:00Z',
          detail_snippet: 'Incidente de prueba',
          violation_type: { id: 3, name: 'Agresion fisica' },
          team: { id: 22, name: 'Aguilas FC', image: null },
          player: { id: 55, name: 'Sergio Vega' },
          status: 'applied',
          status_label: 'Aplicada',
        },
      ],
    })

    disciplineApi.getTeamAvailablePlayers.mockResolvedValue([])
    disciplineApi.getTeamDisciplineMatches.mockResolvedValue([])
    disciplineApi.getDisciplinaryCase.mockResolvedValue({
      id: 1,
      case_id: 'DISC-2026-001',
      created_at: '2026-02-01T12:00:00Z',
      status: 'review',
      status_label: 'En revision',
      description: 'Incidente de prueba',
      team: { id: 22, name: 'Aguilas FC', image: null },
      player: { id: 55, name: 'Sergio Vega' },
      violation_type: { id: 3, name: 'Agresion fisica' },
      match: {
        id: 101,
        home_team: { id: 22, name: 'Aguilas FC', image: null },
        away_team: { id: 23, name: 'Panteras FC', image: null },
      },
      sanction: null,
      adjustments: [],
      suspensions: [],
      audit_logs: [],
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('loads summary, filters and case list on mount', async () => {
    const wrapper = await mountSuspended(DisciplinePanel, {
      props: {
        tournamentId: 99,
      },
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: { template: '<i />' },
          'v-autocomplete': vuetifyStubs['v-select'],
          'v-text-field': { template: '<input />' },
          'v-textarea': { template: '<textarea />' },
          'v-skeleton-loader': { template: '<div />' },
          'v-card-actions': { template: '<div><slot /></div>' },
          KpisMetricsSection: { template: '<div data-testid="kpis-metrics"></div>' },
        },
      },
    })

    await flushPromises()

    expect(disciplineApi.getDisciplineSummary).toHaveBeenCalledWith(99)
    expect(disciplineApi.getDisciplineMeta).toHaveBeenCalledWith(99)
    expect(disciplineApi.getDisciplineCases).toHaveBeenCalledWith(99, expect.objectContaining({ per_page: 25 }))

    expect(wrapper.find('[data-testid="discipline-toolbar-shell"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('DISC-2026-001')
    expect(wrapper.text()).toContain('Incidente de prueba')
  })

  it('opens create case dialog from toolbar action', async () => {
    const wrapper = await mountSuspended(DisciplinePanel, {
      props: {
        tournamentId: 99,
      },
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: { template: '<i />' },
          'v-autocomplete': vuetifyStubs['v-select'],
          'v-text-field': { template: '<input />' },
          'v-textarea': { template: '<textarea />' },
          'v-skeleton-loader': { template: '<div />' },
          'v-card-actions': { template: '<div><slot /></div>' },
          KpisMetricsSection: { template: '<div data-testid="kpis-metrics"></div>' },
        },
      },
    })

    await flushPromises()

    const createButton = wrapper.find('button.discipline-toolbar__create')
    expect(createButton.exists()).toBe(true)

    await createButton.trigger('click')

    expect(wrapper.text()).toContain('Crear caso disciplinario')
  })

  it('shows an explicit empty sanction message for review cases', async () => {
    const wrapper = await mountSuspended(DisciplinePanel, {
      props: {
        tournamentId: 99,
      },
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: { template: '<i />' },
          'v-autocomplete': vuetifyStubs['v-select'],
          'v-text-field': { template: '<input />' },
          'v-textarea': { template: '<textarea />' },
          'v-skeleton-loader': { template: '<div />' },
          'v-card-actions': { template: '<div><slot /></div>' },
          KpisMetricsSection: { template: '<div data-testid="kpis-metrics"></div>' },
        },
      },
    })

    await flushPromises()

    await wrapper.find('tr.discipline-table__row').trigger('click')
    await flushPromises()

    const sanctionTab = wrapper.findAll('button.discipline-case-tabs__item')[1]
    await sanctionTab.trigger('click')

    expect(wrapper.text()).toContain('Caso en revision: aun no hay una sancion aplicada.')
  })
})
