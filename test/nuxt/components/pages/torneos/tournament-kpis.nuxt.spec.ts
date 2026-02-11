import {describe, expect, it} from 'vitest'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import {ensureVuetifyApp} from '../../../utils/vuetify-stubs'
import TournamentKpis from '~/components/pages/torneos/tournament-kpis.vue'

describe('TournamentKpis', () => {
  it('renders the KPI cards with values', async () => {
    ensureVuetifyApp()

    const wrapper = await mountSuspended(TournamentKpis, {
      props: {
        summary: {
          total: 6,
          active: 3,
          finished: 2,
          upcoming: 1,
        },
        kpis: {
          tournamentsCreated: { total: 6, current: 10, dailyData: [1, 1, 2, 2], label: 'vs último mes' },
          teamsRegistered: { total: 18, current: 8, dailyData: [2, 4, 5, 7], label: 'vs último mes' },
          playersRegistered: { total: 126, current: 6, dailyData: [10, 30, 40, 46], label: 'vs último mes' },
          matchesPlayed: { total: 34, current: 4, dailyData: [4, 8, 10, 12], label: 'vs último mes' },
        },
      },
      global: {
        stubs: {
          KpisMetricsSection: {
            props: ['items'],
            template: `
              <div>
                <div v-for="item in items" :key="item.title">
                  <span>{{ item.title }}</span>
                  <span>{{ item.value }}</span>
                </div>
              </div>
            `,
          },
        },
      },
    })

    const text = wrapper.text()
    expect(text).toContain('Torneos creados')
    expect(text).toContain('Equipos inscritos')
    expect(text).toContain('Jugadores registrados')
    expect(text).toContain('Partidos jugados')
    expect(text).toContain('6')
    expect(text).toContain('18')
    expect(text).toContain('126')
    expect(text).toContain('34')
  })
})
