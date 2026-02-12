import { describe, expect, it, beforeAll } from 'vitest'
import { defineComponent, h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, iconStub, vuetifyStubs } from '../../../utils/vuetify-stubs'
import TournamentShareMenu from '~/components/pages/torneos/tournament-share-menu.vue'

const VMenuStub = defineComponent({
  name: 'VMenu',
  setup(_, { slots }) {
    return () =>
      h('div', [
        slots.activator ? slots.activator({ props: {} }) : undefined,
        slots.default ? slots.default() : undefined,
      ])
  },
})

const VListItemStub = defineComponent({
  name: 'VListItem',
  emits: ['click'],
  setup(_, { slots, emit }) {
    return () =>
      h(
        'button',
        {
          type: 'button',
          onClick: (event: MouseEvent) => emit('click', event),
        },
        slots.default ? slots.default() : undefined
      )
  },
})

describe('TournamentShareMenu', () => {
  beforeAll(() => {
    ensureVuetifyApp()
  })

  it('emits selected share actions', async () => {
    const wrapper = await mountSuspended(TournamentShareMenu, {
      props: {
        iconOnly: false,
      },
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: iconStub,
          'v-menu': VMenuStub,
          'v-list': { template: '<div><slot /></div>' },
          'v-list-item': VListItemStub,
          'v-list-item-title': { template: '<span><slot /></span>' },
          'v-list-subheader': { template: '<div><slot /></div>' },
          'v-divider': { template: '<hr />' },
        },
      },
    })

    const copyButtons = wrapper.findAll('button').filter((button) => button.text().includes('Copiar enlace'))
    expect(copyButtons).toHaveLength(2)

    await copyButtons[0]?.trigger('click')
    await copyButtons[1]?.trigger('click')

    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')?.[0]).toEqual(['registration_link'])
    expect(wrapper.emitted('select')?.[1]).toEqual(['public_link'])
    expect(wrapper.text()).toContain('Compartir')
  })
})
