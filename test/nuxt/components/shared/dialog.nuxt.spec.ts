import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Dialog from '~/components/shared/Dialog.vue'

describe('Shared Dialog', () => {
  it('hides close icon and passes persistent flag when configured', async () => {
    const wrapper = await mountSuspended(Dialog, {
      props: {
        modelValue: true,
        title: 'Titulo',
        subtitle: 'Subtitulo',
        persistent: true,
        showClose: false,
      },
      global: {
        stubs: {
          'v-dialog': {
            props: ['modelValue', 'persistent'],
            template: '<div data-testid="dialog" :data-persistent="persistent"><slot /></div>',
          },
          'v-card': { template: '<div><slot /></div>' },
          'v-card-item': { template: '<div><slot /></div>' },
          'v-card-title': { template: '<div><slot /></div>' },
          'v-card-subtitle': { template: '<div><slot /></div>' },
          'v-card-text': { template: '<div><slot /></div>' },
          'v-card-actions': { template: '<div><slot /></div>' },
          'v-progress-linear': { template: '<div></div>' },
          'v-divider': { template: '<div></div>' },
          'v-sheet': { template: '<div><slot /></div>' },
          Icon: {
            props: ['name'],
            template: '<span :data-icon="name"></span>',
          },
        },
      },
    })

    expect(wrapper.find('[data-testid="dialog"]').attributes('data-persistent')).toBe('true')
    expect(wrapper.find('[data-icon="futzo-icon:x-dialog"]').exists()).toBe(false)
  })
})
