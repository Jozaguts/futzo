import {beforeEach, describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import * as vuetifyComponents from 'vuetify/components'
import AppBar from '../../../app/components/layout/AppBar.vue'

const isMobile = ref(false)
const drawer = ref(false)

vi.mock('vuetify', () => ({
  useDisplay: () => ({ mobile: isMobile }),
}))

describe('AppBar', () => {
  beforeEach(() => {
    isMobile.value = false
    drawer.value = false

    mockNuxtImport('useGlobalStore', () => () => ({ drawer }))
    mockNuxtImport('storeToRefs', () => (store: any) => store)
  })

  it('renders breadcrumbs on desktop', async () => {
    const wrapper = await mountSuspended(
      {
        components: { AppBar },
        template: '<v-app><AppBar /></v-app>',
      },
      {
        global: {
          components: { VApp: (vuetifyComponents as any).VApp },
          stubs: {
            Breadcrumbs: { template: '<div class="breadcrumbs-stub"></div>' },
            Logo: { template: '<div class="logo-stub"></div>' },
            Icon: { template: '<i class="icon-stub"></i>' },
          },
        },
      }
    )

    expect(wrapper.find('.breadcrumbs-stub').exists()).toBe(true)
    expect(wrapper.find('.app-bar-mobile').exists()).toBe(false)
  })

  it('renders hamburger and logo on mobile', async () => {
    isMobile.value = true

    const wrapper = await mountSuspended(
      {
        components: { AppBar },
        template: '<v-app><AppBar /></v-app>',
      },
      {
        global: {
          components: { VApp: (vuetifyComponents as any).VApp },
          stubs: {
            Breadcrumbs: { template: '<div class="breadcrumbs-stub"></div>' },
            Logo: { template: '<div class="logo-stub"></div>' },
            Icon: { template: '<i class="icon-stub"></i>' },
          },
        },
      }
    )

    expect(wrapper.find('.app-bar-mobile').exists()).toBe(true)
    expect(wrapper.find('.app-bar-mobile__toggle').exists()).toBe(true)
    expect(wrapper.find('.logo-stub').exists()).toBe(true)
  })
})
