import {describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import TournamentHeader from '~/components/pages/torneos/status/TournamentHeader.vue'

mockNuxtImport('useSanctumAuth', () => () => ({
  isAuthenticated: ref(false),
}))

vi.mock('vuetify', () => ({
  useDisplay: () => ({ mobile: ref(false) }),
}))

describe('TournamentHeader', () => {
  it('renders format, football type and teams without start date', async () => {
    const wrapper = await mountSuspended(TournamentHeader, {
      props: {
        header: {
          name: 'Inactivos 2026 Apertura',
          tournamentName: 'Inactivos 2026',
          tournamentFormatName: 'Liga y Eliminatoria',
          footballType: 'Fútbol 7',
          teams: 10,
        },
      },
      global: {
        stubs: {
          'v-card': { template: '<div><slot /></div>' },
          'v-avatar': { template: '<div></div>' },
          'v-chip': { template: '<span><slot /></span>' },
          'v-select': { template: '<div></div>' },
          Icon: { template: '<i></i>' },
        },
      },
    })

    const text = wrapper.text()
    expect(text).toContain('Inactivos 2026 Apertura')
    expect(text).toContain('Liga y Eliminatoria')
    expect(text).toContain('Fútbol 7')
    expect(text).toContain('10 equipos')
    expect(text).not.toContain('Inicio:')
  })
})
