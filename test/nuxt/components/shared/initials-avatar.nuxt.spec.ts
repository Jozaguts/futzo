import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import InitialsAvatar from '~/components/shared/InitialsAvatar.vue'

const AvatarStub = defineComponent({
  name: 'VAvatar',
  setup(_, { slots, attrs }) {
    return () =>
      h(
        'div',
        {
          class: ['avatar-stub', attrs.class],
          style: attrs.style as any,
        },
        slots.default ? slots.default() : undefined
      )
  },
})

const ImageStub = defineComponent({
  name: 'VImg',
  props: {
    src: { type: String, default: '' },
  },
  emits: ['error'],
  setup(props, { emit }) {
    return () =>
      h('img', {
        class: 'avatar-image-stub',
        'data-src': props.src,
        onError: () => emit('error'),
      })
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
          'v-img': ImageStub,
        },
      },
    })

    expect(wrapper.find('.avatar-image-stub').attributes('data-src')).toBe('https://cdn.futzo.test/aguilas.png')
    expect(wrapper.text()).toBe('')
  })

  it('shows image when image is a non-null string url', async () => {
    const wrapper = await mountSuspended(InitialsAvatar, {
      props: {
        name: 'Carlos Mendez',
        image: 'https://ui-avatars.com/api/?name=Carlos+Mendez',
      },
      global: {
        stubs: {
          'v-avatar': AvatarStub,
          'v-img': ImageStub,
        },
      },
    })

    expect(wrapper.find('.avatar-image-stub').attributes('data-src')).toBe('https://ui-avatars.com/api/?name=Carlos+Mendez')
    expect(wrapper.text()).toBe('')
  })

  it('normalizes escaped urls and renders initials only when image is null', async () => {
    const escaped = await mountSuspended(InitialsAvatar, {
      props: {
        name: 'Bolton',
        image: 'http:\\/\\/app.futzo.test\\/storage\\/4\\/conversions\\/Bolton-default.jpg',
      },
      global: {
        stubs: {
          'v-avatar': AvatarStub,
          'v-img': ImageStub,
        },
      },
    })

    const withoutImage = await mountSuspended(InitialsAvatar, {
      props: {
        name: 'Bolton',
        image: null,
      },
      global: {
        stubs: {
          'v-avatar': AvatarStub,
          'v-img': ImageStub,
        },
      },
    })

    expect(escaped.find('.avatar-image-stub').attributes('data-src')).toBe(
      'http://app.futzo.test/storage/4/conversions/Bolton-default.jpg'
    )
    expect(withoutImage.find('.avatar-image-stub').exists()).toBe(false)
    expect(withoutImage.text()).toContain('B')
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
          'v-img': ImageStub,
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
          'v-img': ImageStub,
        },
      },
    })

    expect(colored.find('.avatar-stub').attributes('style')).toContain('#ef4444')
    expect(white.find('.avatar-stub').attributes('style')).toContain('var(--v-theme-primary)')
  })

  it('falls back to initials when image fails to load', async () => {
    const wrapper = await mountSuspended(InitialsAvatar, {
      props: {
        name: 'Real Mandil',
        image: 'http://app.futzo.test/storage/4/conversions/Bolton-default.jpg',
      },
      global: {
        stubs: {
          'v-avatar': AvatarStub,
          'v-img': ImageStub,
        },
      },
    })

    expect(wrapper.find('.avatar-image-stub').exists()).toBe(true)
    await wrapper.find('.avatar-image-stub').trigger('error')
    expect(wrapper.find('.avatar-image-stub').exists()).toBe(false)
    expect(wrapper.text()).toContain('RM')
  })
})
