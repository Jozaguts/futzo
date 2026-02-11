import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp } from '../../../utils/vuetify-stubs'
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
    expect(text).toContain('Total')
    expect(text).toContain('Activos')
    expect(text).toContain('Finalizados')
    expect(text).toContain('Próximos')
    expect(text).toContain('6')
    expect(text).toContain('3')
    expect(text).toContain('2')
    expect(text).toContain('1')
  })
})
