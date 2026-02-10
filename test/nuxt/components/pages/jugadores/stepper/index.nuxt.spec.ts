import {beforeEach, describe, expect, it} from 'vitest'
import {ref} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import Stepper from '~/components/pages/jugadores/stepper/index.vue'

const steps = ref({
  current: 'basic-info',
  steps: {
    'basic-info': { label: 'Basic' },
  },
})

describe('Players stepper', () => {
  beforeEach(() => {
    steps.value.current = 'basic-info'
    mockNuxtImport('usePlayerStore', () => () => ({ steps }))
    mockNuxtImport('storeToRefs', () => (store: any) => store)
  })

  it('renders the basic step', async () => {
    const wrapper = await mountSuspended(Stepper, {
      global: {
        stubs: {
          IndicatorStep: { template: '<div data-testid="indicator"></div>' },
          BasicInfoStep: { template: '<div data-testid="basic"></div>' },
          DetailsInfoStep: { template: '<div data-testid="details"></div>' },
          ContactInfoStep: { template: '<div data-testid="contact"></div>' },
          'transition-slide': { template: '<div><slot /></div>' },
          'v-card-text': { template: '<div class="v-card-text"><slot /></div>' },
          'v-container': { template: '<div><slot /></div>' },
          'v-row': { template: '<div><slot /></div>' },
          'v-col': { template: '<div><slot /></div>' },
        },
      },
    })

    expect(wrapper.find('[data-testid="basic"]').exists()).toBe(true)
  })
})
