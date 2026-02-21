import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs } from '../../../utils/vuetify-stubs'
import CredentialsValidationView from '~/components/pages/credentials/CredentialsValidationView.vue'

const validateCredentialMock = vi.hoisted(() => vi.fn())

vi.mock('~/http/api/credentials', () => ({
  validateCredential: validateCredentialMock,
}))

vi.mock('~/composables/credentials/useCredentialsErrors', () => ({
  useCredentialsErrors: () => ({
    parseError: () => ({ status: 500, message: 'Error', checkoutUrl: null }),
  }),
}))

describe('CredentialsValidationView', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    validateCredentialMock.mockReset()
    validateCredentialMock.mockResolvedValue({
      status: 'suspended',
      status_color: 'red',
      message: 'Credencial suspendida.',
      reason_code: 'player_suspended',
      reason_message: 'Jugador suspendido.',
      validated_at: '2026-02-21T00:00:00.000000Z',
    })
  })

  it('renders validation result by status', async () => {
    const wrapper = await mountSuspended(CredentialsValidationView, {
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: { template: '<i />' },
          'v-text-field': {
            props: ['modelValue'],
            emits: ['update:modelValue'],
            template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
          },
          'v-progress-linear': { template: '<div />' },
          'v-skeleton-loader': { template: '<div />' },
        },
      },
    })

    const input = wrapper.find('input')
    await input.setValue(' crd-001 ')
    const validateButton = wrapper.find('button')
    await validateButton.trigger('click')

    expect(validateCredentialMock).toHaveBeenCalledWith('CRD-001')
    expect(wrapper.text()).toContain('Credencial suspendida')
    expect(wrapper.text()).toContain('Jugador suspendido')
  })
})
