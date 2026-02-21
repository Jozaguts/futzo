import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CredencialesValidacionPage from '~/pages/credenciales/validacion.vue'

const permissionsState = vi.hoisted(() => ({ canValidate: true }))
const notifyOnceMock = vi.hoisted(() => vi.fn())

vi.mock('~/composables/credentials/useCredentialsAccess', () => ({
  useCredentialsAccess: () => ({
    canManageCredentials: ref(false),
    canValidateCredentials: ref(permissionsState.canValidate),
    canConfigureCredentials: ref(false),
    visibleTabs: ref([{ key: 'validacion', label: 'Validación', path: '/credenciales/validacion' }]),
  }),
}))

vi.mock('~/composables/credentials/useCredentialsForbidden', () => ({
  useCredentialsForbidden: () => ({ notifyOnce: notifyOnceMock }),
}))

describe('/credenciales/validacion page', () => {
  beforeEach(() => {
    permissionsState.canValidate = true
    notifyOnceMock.mockReset()
  })

  it('allows access when validation permission is available (referee flow)', async () => {
    const wrapper = await mountSuspended(CredencialesValidacionPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="default" /></div>' },
          CredentialsModuleShell: { template: '<div data-testid="credentials-shell-stub"><slot /></div>' },
          CredentialsValidationView: { template: '<div data-testid="validation-view-stub" />' },
        },
      },
    })

    expect(wrapper.find('[data-testid="credentials-shell-stub"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="validation-view-stub"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="inline-forbidden-state"]').exists()).toBe(false)
    expect(notifyOnceMock).not.toHaveBeenCalled()
  })

  it('renders forbidden when user cannot validate credentials', async () => {
    permissionsState.canValidate = false

    const wrapper = await mountSuspended(CredencialesValidacionPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="default" /></div>' },
          CredentialsModuleShell: { template: '<div data-testid="credentials-shell-stub" />' },
          CredentialsValidationView: { template: '<div data-testid="validation-view-stub" />' },
        },
      },
    })

    expect(wrapper.find('[data-testid="inline-forbidden-state"]').exists()).toBe(true)
    expect(notifyOnceMock).toHaveBeenCalled()
  })
})
