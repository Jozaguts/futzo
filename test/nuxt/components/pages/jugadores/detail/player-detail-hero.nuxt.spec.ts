import {describe, expect, it} from 'vitest'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import PlayerDetailHero from '~/components/pages/jugadores/detail/player-detail-hero.vue'

describe('PlayerDetailHero', () => {
  it('renders player summary and emits back action', async () => {
    const wrapper = await mountSuspended(PlayerDetailHero, {
      props: {
        avatar: '',
        initials: 'CM',
        playerFullName: 'Carlos Mendez',
        positionLabel: 'Delantero',
        playerTeams: [{ id: 1, name: 'Aguilas FC' } as any],
        teamCategoryLabel: 'Libre',
        heroMeta: [
          { label: 'Edad', value: '25 años' },
          { label: 'Altura', value: '175 cm' },
        ],
      },
      global: {
        stubs: {
          'v-card': { template: '<div><slot /></div>' },
          InitialsAvatar: { template: '<div><slot /></div>' },
          'v-chip': { template: '<span><slot /></span>' },
          'v-btn': { template: '<button @click="$emit(\'click\')"><slot /></button>' },
        },
      },
    })

    expect(wrapper.find('[data-testid="jugador-detail-hero"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Carlos Mendez')
    expect(wrapper.text()).toContain('Delantero')
    expect(wrapper.text()).toContain('Aguilas FC')

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('back')).toBeTruthy()
  })
})
