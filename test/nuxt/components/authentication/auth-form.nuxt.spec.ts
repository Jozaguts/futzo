import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp } from '../../utils/vuetify-stubs'
import AuthForm from '~/components/authentication/AuthForm.vue'

const toastMock = vi.hoisted(() => vi.fn())
const loginMock = vi.hoisted(() => vi.fn())
const refreshIdentityMock = vi.hoisted(() => vi.fn())
const logoutMock = vi.hoisted(() => vi.fn())

mockNuxtImport('useToast', () => () => ({ toast: toastMock }))
mockNuxtImport('useRoute', () => () => ({ query: {} }))
mockNuxtImport('useRouter', () => () => ({ push: vi.fn(), replace: vi.fn() }))
mockNuxtImport('useSanctumUser', () => () => ref(null))
mockNuxtImport('useSanctumClient', () => () => vi.fn(async () => ({})))
mockNuxtImport('useSanctumAuth', () => () => ({
  login: loginMock,
  refreshIdentity: refreshIdentityMock,
  logout: logoutMock,
}))
mockNuxtImport('useAuthStore', () => () => ({
  forgotPasswordState: ref({
    step: 'reset-password',
    username: '',
    areaCode: '+52',
    isPhone: false,
    isFetching: false,
    code: '',
    token: '',
  }),
}))

describe('AuthForm', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    toastMock.mockReset()
    loginMock.mockReset()
    refreshIdentityMock.mockReset()
    logoutMock.mockReset()
  })

  it('opens in login mode by default and can switch to register mode', async () => {
    const wrapper = await mountSuspended(AuthForm, {
      global: {
        stubs: {
          Logo: { template: '<div />' },
          Icon: { template: '<i />' },
          AuthProvider: { template: '<div />' },
          SearchCountry: { template: '<div />' },
          ErrorMessages: { template: '<div />' },
          PasswordRules: { template: '<div />' },
          ForgotPassword: { template: '<div />' },
          'transition-scale': { template: '<div><slot /></div>' },
          'transition-slide': { template: '<div><slot /></div>' },
          'v-expand-transition': { template: '<div><slot /></div>' },
        },
      },
    })

    expect(wrapper.text()).toContain('Iniciar sesión')
    expect(wrapper.text()).toContain('¿No tienes cuenta?')
    expect(wrapper.text()).toContain('Crea una cuenta')

    await wrapper.find('a.text-primary').trigger('click')

    expect(wrapper.text()).toContain('Crea tu cuenta')
    expect(wrapper.text()).toContain('¿Ya tienes cuenta?')
  })
})
