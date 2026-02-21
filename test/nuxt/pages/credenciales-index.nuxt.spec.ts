import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CredencialesIndexPage from '~/pages/credenciales/index.vue'

const permissionsState = vi.hoisted(() => ({ canManage: false }))
const notifyOnceMock = vi.hoisted(() => vi.fn())

vi.mock('~/composables/credentials/useCredentialsAccess', () => ({
  useCredentialsAccess: () => ({
    canManageCredentials: ref(permissionsState.canManage),
    canValidateCredentials: ref(false),
    canConfigureCredentials: ref(false),
    visibleTabs: ref([]),
  }),
}))

vi.mock('~/composables/credentials/useCredentialsForbidden', () => ({
  useCredentialsForbidden: () => ({ notifyOnce: notifyOnceMock }),
}))

describe('/credenciales index page', () => {
  beforeEach(() => {
    permissionsState.canManage = false
    notifyOnceMock.mockReset()
  })

  it('renders forbidden state when user cannot manage credentials', async () => {
    const wrapper = await mountSuspended(CredencialesIndexPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="default" /></div>' },
          CredentialsModuleShell: { template: '<div data-testid="credentials-shell-stub" />' },
          CredentialsSummaryView: { template: '<div />' },
        },
      },
    })

    expect(wrapper.find('[data-testid="inline-forbidden-state"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="credentials-shell-stub"]').exists()).toBe(false)
    expect(notifyOnceMock).toHaveBeenCalled()
  })

  it('renders shell when user can manage credentials', async () => {
    permissionsState.canManage = true

    const wrapper = await mountSuspended(CredencialesIndexPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="default" /></div>' },
          CredentialsModuleShell: { template: '<div data-testid="credentials-shell-stub"><slot /></div>' },
          CredentialsSummaryView: { template: '<div data-testid="summary-stub" />' },
        },
      },
    })

    expect(wrapper.find('[data-testid="credentials-shell-stub"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="summary-stub"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="inline-forbidden-state"]').exists()).toBe(false)
  })
})
