import {describe, expect, it} from 'vitest'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import NotFoundCatchAllPage from '~/pages/[...all].vue'

describe('Not found catch-all page', () => {
  it('renders 404 empty state in HTML page context', async () => {
    const wrapper = await mountSuspended(NotFoundCatchAllPage, {
      route: '/ruta-inexistente-para-test',
      global: {
        stubs: {
          'v-empty-state': {
            props: ['headline', 'title', 'text', 'actionText'],
            template: `
              <div data-testid="empty-state">
                <h1>{{ headline }}</h1>
                <p>{{ title }}</p>
                <span>{{ text }}</span>
                <button>{{ actionText }}</button>
              </div>
            `,
          },
        },
      },
    })

    expect(wrapper.find('[data-testid="empty-state"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Whoops, 404')
    expect(wrapper.text()).toContain('Pagina no encontrada')
  })
})
