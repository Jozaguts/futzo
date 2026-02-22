import {describe, expect, it} from 'vitest'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import PlayerDetailAssociations from '~/components/pages/jugadores/detail/player-detail-associations.vue'

describe('PlayerDetailAssociations', () => {
  it('renders teams and tournaments information', async () => {
    const wrapper = await mountSuspended(PlayerDetailAssociations, {
      props: {
        playerTeams: [
          { id: 1, name: 'Aguilas FC', category: { name: 'Libre' }, tournament: { name: 'Apertura' }, image: '' } as any,
        ],
        tournamentList: [{ id: 10, name: 'Apertura', status: 'activo', start_date: '2026-01-01', category: { name: 'Libre' } }] as any,
        formatDate: () => '01 ene 2026',
      },
      global: {
        stubs: {
          'v-card': { template: '<div><slot /></div>' },
          'v-avatar': { template: '<div><slot /></div>' },
          'v-chip': { template: '<span><slot /></span>' },
        },
      },
    })

    expect(wrapper.text()).toContain('Equipos')
    expect(wrapper.text()).toContain('Aguilas FC')
    expect(wrapper.text()).toContain('Torneos')
    expect(wrapper.text()).toContain('Apertura')
  })
})
