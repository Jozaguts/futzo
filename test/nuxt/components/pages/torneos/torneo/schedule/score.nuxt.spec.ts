import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Score from '~/components/pages/torneos/torneo/schedule/score.vue'

describe('Schedule score', () => {
  it('shows muted readonly score when value is zero', async () => {
    const wrapper = await mountSuspended(Score, {
      props: {
        roundId: 1,
        gameId: 2,
        type: 'home',
        isEditable: false,
        value: 0,
      },
    })

    const value = wrapper.find('.score-control__value--readonly')
    expect(value.exists()).toBe(true)
    expect(value.classes()).toContain('score-control__value--muted')
    expect(value.text()).toBe('0')
  })

  it('emits score updates when editable controls are clicked', async () => {
    const wrapper = await mountSuspended(Score, {
      props: {
        roundId: 4,
        gameId: 8,
        type: 'away',
        isEditable: true,
        value: 2,
      },
      global: {
        stubs: {
          Icon: { template: '<span></span>' },
          'v-btn': {
            emits: ['click'],
            template: '<button @click="$emit(\'click\')"><slot /></button>',
          },
        },
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')

    expect(wrapper.emitted('update:game')).toEqual([
      ['up', 8, 'away', 4],
      ['down', 8, 'away', 4],
    ])
  })
})
