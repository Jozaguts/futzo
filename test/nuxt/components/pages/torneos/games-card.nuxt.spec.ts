import { beforeEach, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import GamesCard from '~/components/pages/torneos/games-card.vue'

const tournaments = ref<any[]>([])
const tournament = ref<any>({ name: 'Clausura 2026' })

mockNuxtImport('useTournamentStore', () => () => ({
  tournaments,
  tournament,
}))

mockNuxtImport('storeToRefs', () => (store: any) => store)

describe('GamesCard', () => {
  beforeEach(() => {
    tournaments.value = [{ id: 1, name: 'Clausura 2026' }]
    tournament.value = { name: 'Clausura 2026' }
  })

  it('renders team avatars using InitialsAvatar', async () => {
    const wrapper = await mountSuspended(GamesCard, {
      props: {
        title: 'Partidos',
        maxHeight: '600px',
        maxWidth: '400px',
        scrollHeight: '300px',
        items: [
          {
            home: { name: 'Real Mandil', img: null },
            away: { name: 'Bolton', img: 'http://app.futzo.test/storage/4/conversions/Bolton-default.jpg' },
            result: null,
            schedule: { day: 'Lunes', hour: '19:00' },
          },
        ],
      },
      global: {
        stubs: {
          InitialsAvatar: { template: '<div data-testid="games-card-avatar"></div>' },
          'v-skeleton-loader': { template: '<div></div>' },
          'v-card': { template: '<div><slot /></div>' },
          'v-card-item': { template: '<div><slot /></div>' },
          'v-card-title': { template: '<div><slot /></div>' },
          'v-card-subtitle': { template: '<div><slot /></div>' },
          'v-card-text': { template: '<div><slot /></div>' },
          'v-virtual-scroll': { template: '<div><slot :item="items?.[0]" /></div>', props: ['items'] },
          'v-icon': { template: '<i></i>' },
        },
      },
    })

    expect(wrapper.text()).toContain('Real Mandil')
    expect(wrapper.text()).toContain('Bolton')
    expect(wrapper.findAll('[data-testid="games-card-avatar"]')).toHaveLength(2)
  })
})
