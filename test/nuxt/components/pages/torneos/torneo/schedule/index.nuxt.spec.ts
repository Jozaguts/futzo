import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import SchedulePage from '~/components/pages/torneos/torneo/schedule/index.vue'

const updateScheduleRoundDetails = vi.hoisted(() => vi.fn())
const getScheduleRoundDetails = vi.hoisted(() => vi.fn())
const toastMock = vi.hoisted(() => vi.fn())

vi.mock('~/http/api/schedule', () => ({
  updateScheduleRoundDetails,
  getScheduleRoundDetails,
}))

const makeScheduleStore = () => ({
  schedulePagination: ref({ current_page: 1, last_page: 1 }),
  isLoadingSchedules: ref(false),
  schedules: ref({ rounds: [] }),
  scheduleRoundStatus: ref([]),
  isExporting: ref(false),
  noSchedules: ref(false),
  regenerationBanner: ref(null),
  regeneratedFromRound: ref(null),
  regenerateRoundDialog: ref(false),
  scheduleSettings: ref({ teams: 4 }),
  scheduleDrawerOpen: ref(false),
  getTournamentSchedules: vi.fn(),
  refreshScheduleSettings: vi.fn(),
  clearRegenerationBanner: vi.fn(),
  updateStatusGame: vi.fn(),
  exportTournamentRoundScheduleAs: vi.fn(),
})

describe('Schedule round edit guard', () => {
  beforeEach(() => {
    updateScheduleRoundDetails.mockReset()
    getScheduleRoundDetails.mockReset()
    toastMock.mockReset()

    mockNuxtImport('useScheduleStore', () => () => makeScheduleStore())
    mockNuxtImport('useTournamentStore', () => () => ({
      tournamentId: ref(1),
      loading: ref(false),
      tournament: ref({ teams: { length: 4 } }),
    }))
    mockNuxtImport('useGameStore', () => () => ({
      gameReportDialog: ref(false),
      showReScheduleDialog: ref(false),
      gameDetailsRequest: ref(null),
    }))
    mockNuxtImport('useDisplay', () => () => ({ mobile: ref(false) }))
    mockNuxtImport('useToast', () => () => ({ toast: toastMock }))
    mockNuxtImport('useSchedulePenaltyRules', () => () => ({
      ensurePenaltyStructure: vi.fn(),
      requiresPenalty: vi.fn(() => false),
      shouldShowPenaltyInputs: vi.fn(() => false),
      resetPenaltyData: vi.fn(),
      penaltyWinnerName: vi.fn(() => ''),
      buildPenaltyPayload: vi.fn(() => null),
    }))
  })

  it('blocks saving completed rounds', async () => {
    getScheduleRoundDetails.mockResolvedValue({
      round: 2,
      status: 'completado',
      isEditable: false,
      date: new Date(),
      matches: [],
      bye_team: null,
    })

    const wrapper = await mountSuspended(SchedulePage, {
      global: {
        stubs: {
          ReScheduleGame: true,
          GameReport: true,
          BracketSchedulerDialog: true,
          PhaseProgressCard: true,
          NoCalendar: true,
          'v-sheet': { template: '<div><slot /></div>' },
          'v-layout': { template: '<div><slot /></div>' },
          'v-alert': { template: '<div><slot /></div>' },
          'v-navigation-drawer': { template: '<div><slot /></div>' },
          ScheduleRoundsInfiniteScroll: {
            emits: ['open-round-edit'],
            template: '<button data-testid="open-round" @click="$emit(\'open-round-edit\', 2)"></button>',
          },
          RegeneateRoundModalComponent: {
            emits: ['save'],
            template: '<button data-testid="save-round" @click="$emit(\'save\', { matches: [], restingTeam: null })"></button>',
          },
        },
      },
    })

    await wrapper.find('[data-testid="open-round"]').trigger('click')
    await flushPromises()

    await wrapper.find('[data-testid="save-round"]').trigger('click')
    await flushPromises()

    expect(updateScheduleRoundDetails).not.toHaveBeenCalled()
    expect(toastMock).toHaveBeenCalledWith({
      type: 'error',
      msg: 'Jornada completada',
      description: 'No se puede editar una jornada que ya fue completada.',
    })
  })
})
