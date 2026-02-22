import {describe, expect, it} from 'vitest'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import ModuleTopShell from '~/components/shared/page/module-top-shell.vue'

describe('ModuleTopShell', () => {
  it('renders heading content and controls slot', async () => {
    const wrapper = await mountSuspended(ModuleTopShell, {
      props: {
        title: 'Jugadores',
        subtitle: 'Centraliza la operación y configuración de tus jugadores.',
        topShellTestId: 'players-top-shell',
        introTestId: 'players-intro',
        controlsTestId: 'players-controls',
      },
      slots: {
        controls: '<div data-testid="inner-controls">controls</div>',
      },
    })

    expect(wrapper.find('[data-testid="players-top-shell"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="players-intro"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="players-controls"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="inner-controls"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Gestión de torneos')
    expect(wrapper.text()).toContain('Jugadores')
  })

  it('hides controls area when showControls is false', async () => {
    const wrapper = await mountSuspended(ModuleTopShell, {
      props: {
        title: 'Torneos',
        showControls: false,
        controlsTestId: 'hidden-controls',
      },
      slots: {
        controls: '<div data-testid="inner-controls">controls</div>',
      },
    })

    expect(wrapper.find('[data-testid="hidden-controls"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="inner-controls"]').exists()).toBe(false)
  })
})
