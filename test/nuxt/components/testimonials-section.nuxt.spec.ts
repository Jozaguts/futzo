import {describe, expect, it} from 'vitest'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import {nextTick} from 'vue'
import TestimonialsSection from '~/components/TestimonialsSection.vue'

const testimonialItems = [
  {
    quote: 'Primer testimonio',
    author: 'Alex',
    role: 'Organizador',
    city: 'Puerto Vallarta',
    avatarUrl: '/images/testimonials/alex-avatar.svg',
  },
  {
    quote: 'Segundo testimonio',
    author: 'Mónica',
    role: 'Coordinadora',
    city: 'Guadalajara',
    avatarUrl: '/images/testimonials/monica-avatar.svg',
  },
  {
    quote: 'Tercer testimonio',
    author: 'Carlos Herrera',
    role: 'Dueño de complejo deportivo',
    city: 'Monterrey',
    avatarUrl: '/images/testimonials/carlos-avatar.svg',
  },
]

describe('TestimonialsSection', () => {
  it('renders centered heading and first testimonial author', async () => {
    const wrapper = await mountSuspended(TestimonialsSection, {
      props: {
        title: 'Reviews',
        subtitle: 'Experiencias reales de clientes.',
        items: testimonialItems,
      },
      global: {
        stubs: {
          Icon: { template: '<i />' },
        },
      },
    })

    expect(wrapper.find('[data-testid="testimonials-section"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Reviews')
    expect(wrapper.text()).toContain('Experiencias reales de clientes.')
    expect(wrapper.find('[data-testid="testimonials-author-name"]').text()).toContain('Alex')
    expect(wrapper.html()).toContain('aria-label="Avatar de Alex"')
  })

  it('loops infinitely with navigation arrows', async () => {
    const wrapper = await mountSuspended(TestimonialsSection, {
      props: {
        items: testimonialItems,
      },
      global: {
        stubs: {
          Icon: { template: '<i />' },
        },
      },
    })

    await wrapper.find('[data-testid="testimonials-prev"]').trigger('click')
    await nextTick()
    expect(wrapper.find('[data-testid="testimonials-author-name"]').text()).toContain('Carlos Herrera')

    await wrapper.find('[data-testid="testimonials-next"]').trigger('click')
    await nextTick()
    expect(wrapper.find('[data-testid="testimonials-author-name"]').text()).toContain('Alex')
  })
})
