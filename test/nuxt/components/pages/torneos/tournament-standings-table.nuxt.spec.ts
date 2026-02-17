import {beforeEach, describe, expect, it, vi} from 'vitest'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import TournamentStandingsTable from '~/components/pages/torneos/tournament-standings-table.vue'

const pushMock = vi.fn()

mockNuxtImport('useRouter', () => () => ({
  push: pushMock,
  replace: vi.fn(),
}))

vi.mock('vue3-easy-data-table', () => ({
  default: {
    props: ['headers', 'items'],
    emits: ['click-row'],
    template:
      '<button data-testid="easy-table" @click="$emit(\'click-row\', items[0])">{{ headers.length }}|{{ items.length }}</button>',
  },
}))

const baseStubs = {
  'v-card': { template: '<div><slot /></div>' },
  'v-card-title': { template: '<div><slot /></div>' },
  'v-card-text': { template: '<div><slot /></div>' },
  'client-only': { template: '<div><slot /></div>' },
  'v-tooltip': { template: '<div><slot /></div>' },
  Icon: { template: '<i></i>' },
}

describe('TournamentStandingsTable', () => {
  beforeEach(() => {
    pushMock.mockClear()
  })

  it('renders standings table wrapper and passes standings to table component', async () => {
    const wrapper = await mountSuspended(TournamentStandingsTable, {
      props: {
        standings: [
          {
            id: 1,
            rank: 1,
            team: { id: 10, name: 'Águilas FC', image: '' },
            matches_played: 8,
            wins: 5,
            draws: 2,
            losses: 1,
            goals_for: 17,
            goals_against: 7,
            goal_difference: 10,
            points: 17,
            last_5: 'WWDWL',
            name: 'Águilas FC',
          },
        ],
        wrapperTestId: 'tournament-standings-table-wrapper',
      },
      global: {
        stubs: {
          ...baseStubs,
          'v-skeleton-loader': { template: '<div data-testid="skeleton"></div>' },
          'v-empty-state': { template: '<div data-testid="empty"></div>' },
        },
      },
    })

    expect(wrapper.find('[data-testid="tournament-standings-table-wrapper"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="easy-table"]').text()).toBe('10|1')
  })

  it('renders empty state when there are no standings and not loading', async () => {
    const wrapper = await mountSuspended(TournamentStandingsTable, {
      props: {
        standings: [],
        loading: false,
      },
      global: {
        stubs: {
          ...baseStubs,
          'v-skeleton-loader': { template: '<div data-testid="skeleton"></div>' },
          'v-empty-state': {
            props: ['title'],
            template: '<div data-testid="empty">{{ title }}</div>',
          },
        },
      },
    })

    expect(wrapper.find('[data-testid="easy-table"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="empty"]').text()).toContain('Tabla de posiciones no disponible')
  })

  it('navigates to team detail when row is clicked and feature is enabled', async () => {
    const wrapper = await mountSuspended(TournamentStandingsTable, {
      props: {
        standings: [
          {
            id: 1,
            rank: 1,
            team: { id: 10, name: 'Águilas FC', image: '' },
            matches_played: 8,
            wins: 5,
            draws: 2,
            losses: 1,
            goals_for: 17,
            goals_against: 7,
            goal_difference: 10,
            points: 17,
            last_5: 'WWDWL',
            name: 'Águilas FC',
          },
        ],
        navigateToTeamOnRowClick: true,
      },
      global: {
        stubs: {
          ...baseStubs,
          'v-skeleton-loader': { template: '<div data-testid="skeleton"></div>' },
          'v-empty-state': { template: '<div data-testid="empty"></div>' },
        },
      },
    })

    await wrapper.find('[data-testid="easy-table"]').trigger('click')

    expect(pushMock).toHaveBeenCalledWith({
      name: 'equipos-equipo',
      params: { equipo: '10' },
    })
  })
})
