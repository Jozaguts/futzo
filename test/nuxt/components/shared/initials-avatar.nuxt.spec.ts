import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import InitialsAvatar from '~/components/shared/InitialsAvatar.vue'

const AvatarStub = defineComponent({
  name: 'VAvatar',
  props: {
    image: { type: String, default: undefined },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'div',
        {
          class: ['avatar-stub', attrs.class],
          'data-image': props.image ?? '',
          style: attrs.style as any,
        },
        slots.default ? slots.default() : undefined
      )
  },
})

describe('InitialsAvatar', () => {
  it('renders image when image is valid', async () => {
    const wrapper = await mountSuspended(InitialsAvatar, {
      props: {
        name: 'Aguilas FC',
        image: 'https://cdn.futzo.test/aguilas.png',
      },
      global: {
        stubs: {
          'v-avatar': AvatarStub,
        },
      },
    })

    expect(wrapper.find('.avatar-stub').attributes('data-image')).toBe('https://cdn.futzo.test/aguilas.png')
    expect(wrapper.text()).toBe('')
  })

  it('falls back to initials when image is missing or ui-avatars url', async () => {
    const wrapper = await mountSuspended(InitialsAvatar, {
      props: {
        name: 'Carlos Mendez',
        image: 'https://ui-avatars.com/api/?name=Carlos+Mendez',
      },
      global: {
        stubs: {
          'v-avatar': AvatarStub,
        },
      },
    })

    expect(wrapper.find('.avatar-stub').attributes('data-image')).toBe('')
    expect(wrapper.text()).toContain('CM')
  })

  it('uses team color when provided and falls back to app primary when white', async () => {
    const colored = await mountSuspended(InitialsAvatar, {
      props: {
        name: 'Leones',
        image: '',
        fallbackColor: '#ef4444',
      },
      global: {
        stubs: {
          'v-avatar': AvatarStub,
        },
      },
    })

    const white = await mountSuspended(InitialsAvatar, {
      props: {
        name: 'Leones',
        image: '',
        fallbackColor: '#fff',
      },
      global: {
        stubs: {
          'v-avatar': AvatarStub,
        },
      },
    })

    expect(colored.find('.avatar-stub').attributes('style')).toContain('#ef4444')
    expect(white.find('.avatar-stub').attributes('style')).toContain('var(--v-theme-primary)')
  })
})
