import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import KpisMetricsSection from '~/components/shared/kpis-metrics-section.vue'

const isMobile = ref(false)

vi.mock('vuetify', () => ({
  useDisplay: () => ({ mobile: isMobile }),
}))

describe('KpisMetricsSection', () => {
  beforeEach(() => {
    isMobile.value = false
  })

  it('renders metric cards on desktop', async () => {
    const wrapper = await mountSuspended(KpisMetricsSection, {
      props: {
        items: [
          {
            title: 'Total casos',
            value: 5,
            icon: 'lucide:shield',
            iconTone: 'purple',
          },
          {
            title: 'Pendientes',
            value: 2,
            icon: 'lucide:clock-3',
            iconTone: 'orange',
          },
        ],
        testIdPrefix: 'shared-kpis',
      },
      global: {
        stubs: {
          MetricCard: {
            props: ['title', 'value'],
            template: '<div data-testid="metric-card">{{ title }}:{{ value }}</div>',
          },
          MetricsCarousel: {
            template: '<div data-testid="metrics-carousel"></div>',
          },
        },
      },
    })

    expect(wrapper.find('[data-testid="shared-kpis-grid"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="shared-kpis-carousel"]').exists()).toBe(false)
    expect(wrapper.findAll('[data-testid="metric-card"]')).toHaveLength(2)
    expect(wrapper.find('[data-testid="metric-card"]').text()).toContain('Total casos:5')
  })

  it('renders carousel on mobile', async () => {
    isMobile.value = true

    const wrapper = await mountSuspended(KpisMetricsSection, {
      props: {
        items: [
          {
            title: 'Aplicadas',
            value: 3,
            icon: 'lucide:triangle-alert',
            iconTone: 'red',
          },
        ],
        testIdPrefix: 'shared-kpis',
      },
      global: {
        stubs: {
          MetricCard: {
            template: '<div data-testid="metric-card"></div>',
          },
          MetricsCarousel: {
            template: '<div data-testid="metrics-carousel"></div>',
          },
        },
      },
    })

    expect(wrapper.find('[data-testid="shared-kpis-grid"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="shared-kpis-carousel"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="metrics-carousel"]').exists()).toBe(true)
  })
})
