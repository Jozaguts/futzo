import {describe, expect, it} from 'vitest'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import {ensureVuetifyApp} from '../../../utils/vuetify-stubs'
import TeamKpis from '~/components/pages/equipos/team-kpis.vue'

describe('TeamKpis', () => {
  it('renders KPI cards with values', async () => {
    ensureVuetifyApp()

    const wrapper = await mountSuspended(TeamKpis, {
      props: {
        kpis: {
          teamsRegistered: { total: 10, current: 8, dailyData: [1, 2, 3], label: 'vs último mes' },
          playersRegistered: { total: 90, current: 12, dailyData: [4, 3, 5], label: 'vs último mes' },
          activeTournaments: { total: 3, current: 0, dailyData: [1, 1, 1], label: 'vs último mes' },
          teamsWithHomeVenue: { total: 7, current: 5, dailyData: [2, 2, 3], label: 'vs último mes' },
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
    expect(text).toContain('Equipos registrados')
    expect(text).toContain('Jugadores registrados')
    expect(text).toContain('Torneos activos')
    expect(text).toContain('Equipos con sede')
    expect(text).toContain('10')
    expect(text).toContain('90')
    expect(text).toContain('3')
    expect(text).toContain('7')
  })
})
