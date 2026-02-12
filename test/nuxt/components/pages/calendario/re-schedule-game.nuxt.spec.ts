import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { flushPromises } from '@vue/test-utils'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import ReScheduleGame from '~/components/pages/calendario/re-schedule-game.vue'

const toastMock = vi.hoisted(() => vi.fn())
const reScheduleGame = vi.hoisted(() => vi.fn())
const getGameDetails = vi.hoisted(() => vi.fn())
const getLeagueLocations = vi.hoisted(() => vi.fn())
const tournamentFields = vi.hoisted(() => vi.fn())

const showReScheduleDialog = ref(true)
const game = ref({
  home: { id: 1, name: 'Local FC' },
  away: { id: 2, name: 'Visita FC' },
  details: { date: 'dom. 18/01', raw_time: '09:00', location: { id: 1, name: 'Cancha Norte' }, field: { id: 3, name: 'Campo 1' } },
  options: [{ available_intervals: { day: 'domingo', hours: [{ start: '10:00', end: '11:00' }] } }],
} as any)
const gameDetailsRequest = ref({
  game_id: 21,
  field_id: 3,
  date: '2026-01-18',
  day: 'domingo',
  selected_time: { start: '10:00', end: '11:00' },
  location_id: 1,
} as any)
const buttonStub = {
  emits: ['click'],
  props: ['disabled'],
  template: '<button :disabled="disabled" @click="$emit(\'click\')"><slot /></button>',
}
const dialogStub = {
  props: ['loading'],
  template:
    '<div data-testid="dialog" :data-loading="String(loading)"><slot name="v-card-text" /><slot name="actions" /></div>',
}

mockNuxtImport('useGameStore', () => () => ({
  showReScheduleDialog,
  game,
  gameDetailsRequest,
  reScheduleGame,
  getGameDetails,
}))

mockNuxtImport('useTournamentStore', () => () => ({
  tournamentId: ref(10),
  tournamentFields,
}))

mockNuxtImport('storeToRefs', () => (store: any) => store)

vi.mock('~/stores/useLeaguesStore', () => ({
  useLeaguesStore: () => ({
    getLeagueLocations,
  }),
}))

vi.mock('~/composables/useToast', () => ({
  useToast: () => ({
    toast: toastMock,
  }),
}))

describe('ReScheduleGame', () => {
  beforeEach(() => {
    showReScheduleDialog.value = true
    game.value = {
      home: { id: 1, name: 'Local FC' },
      away: { id: 2, name: 'Visita FC' },
      details: { date: 'dom. 18/01', raw_time: '09:00', location: { id: 1, name: 'Cancha Norte' }, field: { id: 3, name: 'Campo 1' } },
      options: [{ available_intervals: { day: 'domingo', hours: [{ start: '10:00', end: '11:00' }] } }],
    } as any
    gameDetailsRequest.value = {
      game_id: 21,
      field_id: 3,
      date: '2026-01-18',
      day: 'domingo',
      selected_time: { start: '10:00', end: '11:00' },
      location_id: 1,
    } as any

    toastMock.mockReset()
    reScheduleGame.mockReset()
    getGameDetails.mockReset()
    getGameDetails.mockResolvedValue(undefined)
    getLeagueLocations.mockReset()
    getLeagueLocations.mockResolvedValue([{ id: 1, name: 'Cancha Norte' }])
    tournamentFields.mockReset()
    tournamentFields.mockResolvedValue({
      data: [{ id: 3, name: 'Campo 1', location: { id: 1, name: 'Cancha Norte' } }],
      meta: { fields_source: 'tournament' },
    })
  })

  it('sets today as date and queries availability when dialog opens', async () => {
    showReScheduleDialog.value = false

    const wrapper = await mountSuspended(ReScheduleGame, {
      global: {
        stubs: {
          Dialog: dialogStub,
          Icon: { template: '<span></span>' },
          BaseCalendarInput: { template: '<div></div>' },
          'v-row': { template: '<div><slot /></div>' },
          'v-col': { template: '<div><slot /></div>' },
          'v-select': { template: '<div></div>' },
          'v-alert': { template: '<div><slot /></div>' },
          'v-chip-group': { template: '<div><slot /></div>' },
          'v-chip': { template: '<div><slot /></div>' },
          'v-empty-state': { template: '<div></div>' },
          'v-btn': buttonStub,
        },
      },
    })

    showReScheduleDialog.value = true
    await flushPromises()
    await flushPromises()

    expect(gameDetailsRequest.value.date).toBe(dayjs().format('YYYY-MM-DD'))
    expect(getGameDetails).toHaveBeenCalledTimes(1)
  })

  it('closes dialog when cancel action is clicked', async () => {
    const wrapper = await mountSuspended(ReScheduleGame, {
      global: {
        stubs: {
          Dialog: dialogStub,
          Icon: { template: '<span></span>' },
          BaseCalendarInput: { template: '<div></div>' },
          'v-row': { template: '<div><slot /></div>' },
          'v-col': { template: '<div><slot /></div>' },
          'v-select': { template: '<div></div>' },
          'v-alert': { template: '<div><slot /></div>' },
          'v-chip-group': { template: '<div><slot /></div>' },
          'v-chip': { template: '<div><slot /></div>' },
          'v-empty-state': { template: '<div></div>' },
          'v-btn': buttonStub,
        },
      },
    })

    await flushPromises()

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')

    expect(showReScheduleDialog.value).toBe(false)
  })
})
