import {describe, expect, it} from 'vitest'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import TournamentDetailTopShell from '~/components/pages/torneos/torneo/TournamentDetailTopShell.vue'

describe('TournamentDetailTopShell', () => {
  it('renders tournament info and emits header actions', async () => {
    const wrapper = await mountSuspended(TournamentDetailTopShell, {
      props: {
        tournamentName: 'Inactivos 2026 Apertura',
        tournamentMeta: 'Liga y Eliminatoria · Fútbol 7 · Cancha Los Olivos',
        statusLabel: { text: 'Activo', color: 'success' },
        mobile: false,
        shareLoading: false,
        sections: [
          { value: 'resumen', label: 'Resumen' },
          { value: 'calendario', label: 'Calendario' },
        ],
        activeTab: 'resumen',
      },
      global: {
        stubs: {
          TournamentShareMenu: { template: '<button data-testid="share-menu" @click="$emit(\'select\', \'public_link\')"></button>' },
          Icon: { template: '<i></i>' },
          'v-chip': { template: '<span><slot /></span>' },
          'v-btn': { template: '<button v-bind="$attrs" @click="$emit(\'click\')"><slot /></button>' },
          'v-tooltip': { template: '<div><slot :props=\"{}\" /></div>' },
        },
      },
    })

    expect(wrapper.find('[data-testid="tournament-page-top-shell"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="tournament-page-intro"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Inactivos 2026 Apertura')
    expect(wrapper.find('[data-testid="tournament-sections"]').exists()).toBe(true)

    await wrapper.find('[data-testid="share-menu"]').trigger('click')
    const sectionButton = wrapper.findAll('button').find((button) => button.text().includes('Calendario'))
    await sectionButton?.trigger('click')

    expect(wrapper.emitted('share')?.[0]).toEqual(['public_link'])
    expect(wrapper.emitted('update:activeTab')?.[0]).toEqual(['calendario'])
  })
})
