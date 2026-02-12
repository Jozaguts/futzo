import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import TorneoCalendarioPage from '../../../app/pages/torneos/[torneo]/calendario.vue'

const sanctumUser = vi.hoisted(() => ({ value: null as any }))
const navigateToMock = vi.hoisted(() => vi.fn(() => Promise.resolve()))

mockNuxtImport('useRoute', () => () => ({ params: { torneo: 'liga-1' } }))
mockNuxtImport('useSanctumUser', () => () => sanctumUser)
mockNuxtImport('navigateTo', () => navigateToMock)

describe('Torneo calendario redirect page', () => {
  beforeEach(() => {
    sanctumUser.value = null
    navigateToMock.mockClear()
  })

  it('redirects guests to public status page', async () => {
    sanctumUser.value = null

    await mountSuspended(TorneoCalendarioPage, {
      global: {
        stubs: {
          NuxtLayout: { template: '<div><slot /></div>' },
          NuxtPage: { template: '<div></div>' },
        },
      },
    })

    expect(navigateToMock).toHaveBeenCalledWith(
      {
        name: 'torneos-torneo-status',
        params: { torneo: 'liga-1' },
      },
      { replace: true }
    )
  })

  it('redirects authenticated users to torneo index calendario tab', async () => {
    sanctumUser.value = { email: 'admin@futzo.test' }

    await mountSuspended(TorneoCalendarioPage, {
      global: {
        stubs: {
          NuxtLayout: { template: '<div><slot /></div>' },
          NuxtPage: { template: '<div></div>' },
        },
      },
    })

    expect(navigateToMock).toHaveBeenCalledWith(
      {
        name: 'torneos-torneo',
        params: { torneo: 'liga-1' },
        query: { tab: 'calendario' },
      },
      { replace: true }
    )
  })
})
