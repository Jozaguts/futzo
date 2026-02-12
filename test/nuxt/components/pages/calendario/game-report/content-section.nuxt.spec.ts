import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed, ref } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import ContentSection from '~/components/pages/calendario/game-report/ContentSection.vue'

const dialogHandler = vi.hoisted(() => vi.fn())
const initializeGameReport = vi.hoisted(() => vi.fn())
const initReportHandler = vi.hoisted(() => vi.fn())
const getFormations = vi.hoisted(() => vi.fn())

const game = ref({
  id: 10,
  status: 'programado',
  home: { id: 1 },
  away: { id: 2 },
} as any)
const gameActionFormRequest = ref({ disabled: false, loading: false })

const homeTeam = ref({ id: 1, name: 'Local FC' } as any)
const awayTeam = ref({ id: 2, name: 'Visita FC' } as any)
const homeFormation = ref({ name: '4-3-3' } as any)
const awayFormation = ref({ name: '4-4-2' } as any)
const formations = ref([{ id: 1, name: '4-3-3' }] as any)
const homePlayers = ref([] as any[])
const awayPlayers = ref([] as any[])

const dialogState = ref({ show: false, title: 'Agregar evento', subtitle: 'Nuevo evento', type: 'info' } as any)
const buttonStub = {
  emits: ['click'],
  props: ['disabled'],
  template: '<button :disabled="disabled" @click="$emit(\'click\')"><slot /></button>',
}

mockNuxtImport('useGameStore', () => () => ({
  game,
  gameActionFormRequest,
  initializeGameReport,
  resetPenaltyShootout: vi.fn(),
  saveEventGameHandler: vi.fn(),
}))

mockNuxtImport('useTeamStore', () => () => ({
  homeTeam,
  awayTeam,
  homeFormation,
  awayFormation,
  formations,
  homePlayers,
  awayPlayers,
  initReportHandler,
  getFormations,
}))

mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useToast', () => () => ({ toast: vi.fn() }))

vi.mock('~/composables/useGame', () => ({
  useGame: () => ({
    dialogState,
    currentComponent: computed(() => ({ template: '<div></div>' })),
    dialogHandler,
    updateDefaultFormationType: vi.fn(),
  }),
}))

describe('GameReport ContentSection', () => {
  beforeEach(() => {
    game.value = {
      id: 10,
      status: 'programado',
      home: { id: 1 },
      away: { id: 2 },
    } as any
    gameActionFormRequest.value = { disabled: false, loading: false }
    initializeGameReport.mockReset()
    initializeGameReport.mockResolvedValue({})
    initReportHandler.mockReset()
    dialogHandler.mockReset()
    getFormations.mockReset()
    getFormations.mockResolvedValue(undefined)
  })

  it('shows timeline actions and opens event selector actions', async () => {
    const wrapper = await mountSuspended(ContentSection, {
      global: {
        stubs: {
          GameDetailsSection: { template: '<div></div>' },
          GameEvents: { template: '<div></div>' },
          LinesupContainer: { template: '<div></div>' },
          Dialog: { template: '<div><slot name="v-card-text" /><slot name="actions" /></div>' },
          Icon: { template: '<span></span>' },
          'v-sheet': { template: '<div><slot /></div>' },
          'v-container': { template: '<div><slot /></div>' },
          'v-row': { template: '<div><slot /></div>' },
          'v-col': { template: '<div><slot /></div>' },
          'v-btn': buttonStub,
          'v-menu': {
            template:
              '<div><slot name="activator" :props="{}" /><slot /></div>',
          },
          'v-list': { template: '<div><slot /></div>' },
          'v-list-item': {
            emits: ['click'],
            props: ['title'],
            template:
              '<button data-testid="game-report-add-event-option" @click="$emit(\'click\')">{{ title }}</button>',
          },
        },
      },
    })

    expect(wrapper.find('[data-testid="game-report-tabs"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="game-report-add-event"]').exists()).toBe(true)

    await flushPromises()

    const options = wrapper.findAll('[data-testid="game-report-add-event-option"]')
    expect(options.length).toBeGreaterThan(0)
    await options[0].trigger('click')

    expect(dialogHandler).toHaveBeenCalledWith('goals')
  })

  it('initializes game report data when game changes', async () => {
    await mountSuspended(ContentSection, {
      global: {
        stubs: {
          GameDetailsSection: { template: '<div></div>' },
          GameEvents: { template: '<div></div>' },
          LinesupContainer: { template: '<div></div>' },
          Dialog: { template: '<div><slot name="v-card-text" /><slot name="actions" /></div>' },
          Icon: { template: '<span></span>' },
          'v-sheet': { template: '<div><slot /></div>' },
          'v-container': { template: '<div><slot /></div>' },
          'v-row': { template: '<div><slot /></div>' },
          'v-col': { template: '<div><slot /></div>' },
          'v-btn': buttonStub,
          'v-menu': { template: '<div><slot name="activator" :props="{}" /><slot /></div>' },
          'v-list': { template: '<div><slot /></div>' },
          'v-list-item': { emits: ['click'], template: '<button></button>' },
        },
      },
    })

    await flushPromises()

    expect(initializeGameReport).toHaveBeenCalledWith(10)
    expect(initReportHandler).toHaveBeenCalled()
    expect(getFormations).toHaveBeenCalled()
  })
})
