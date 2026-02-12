import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ScheduleRoundMatchCard from '~/components/pages/torneos/torneo/schedule/ScheduleRoundMatchCard.vue'

const baseGame = {
  id: 12,
  status: 'programado',
  home: { id: 1, name: 'Aguilas FC', image: '' },
  away: { id: 2, name: 'Tigres FC', image: '' },
  penalties: { decided: false, home_goals: null, away_goals: null, winner_team_id: null },
  details: {
    date: 'dom. 18/01',
    raw_date: '2026-01-18',
    raw_time: '09:00',
    location: { id: 2, name: 'Cancha Norte' },
    field: { id: 4, name: 'Campo 1' },
  },
}

describe('ScheduleRoundMatchCard', () => {
  it('emits modal actions for reschedule and game report', async () => {
    const wrapper = await mountSuspended(ScheduleRoundMatchCard, {
      props: {
        game: baseGame,
        roundId: 3,
        isEditable: false,
        public: false,
        shouldShowPenaltyInputs: () => false,
        penaltyWinnerName: () => '',
      },
      global: {
        stubs: {
          Score: { template: '<div data-testid="score"></div>' },
          Icon: { template: '<span></span>' },
          'v-avatar': { template: '<span></span>' },
          'v-tooltip': {
            template: '<div><slot name="activator" :props="{}" /></div>',
          },
          'v-btn': {
            emits: ['click'],
            props: ['disabled'],
            template: '<button :disabled="disabled" @click="$emit(\'click\')"><slot /></button>',
          },
          'v-text-field': { template: '<input />' },
          'v-radio-group': { template: '<div><slot /></div>' },
          'v-radio': { template: '<div></div>' },
        },
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')

    expect(wrapper.emitted('open-modal')?.[0]?.[0]).toMatchObject({
      type: 'ReScheduleGame',
      gameId: 12,
      fieldId: 4,
      locationId: 2,
    })
    expect(wrapper.emitted('open-modal')?.[1]?.[0]).toMatchObject({
      type: 'GameReport',
      gameId: 12,
      fieldId: 4,
      locationId: 2,
    })
  })

  it('shows pending schedule text when match has no details', async () => {
    const wrapper = await mountSuspended(ScheduleRoundMatchCard, {
      props: {
        game: {
          ...baseGame,
          details: null,
        },
        roundId: 3,
        isEditable: false,
        public: true,
        shouldShowPenaltyInputs: () => false,
        penaltyWinnerName: () => '',
      },
      global: {
        stubs: {
          Score: { template: '<div data-testid="score"></div>' },
          Icon: { template: '<span></span>' },
          'v-avatar': { template: '<span></span>' },
          'v-tooltip': { template: '<div><slot name="activator" :props="{}" /></div>' },
          'v-btn': { template: '<button><slot /></button>' },
          'v-text-field': { template: '<input />' },
          'v-radio-group': { template: '<div><slot /></div>' },
          'v-radio': { template: '<div></div>' },
        },
      },
    })

    expect(wrapper.text()).toContain('Horario por confirmar.')
    expect(wrapper.find('.schedule-match-card__footer--pending').exists()).toBe(true)
  })
})
