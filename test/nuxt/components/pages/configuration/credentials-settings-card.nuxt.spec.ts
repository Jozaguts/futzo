import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs } from '../../../utils/vuetify-stubs'
import CredentialsSettingsCard from '~/components/pages/configuration/credentials-settings-card.vue'

const getSettingsMock = vi.hoisted(() => vi.fn())
const getTournamentSettingsMock = vi.hoisted(() => vi.fn())
const updateSettingsMock = vi.hoisted(() => vi.fn())
const updateTournamentSettingsMock = vi.hoisted(() => vi.fn())
const sanctumClientMock = vi.hoisted(() => vi.fn())

vi.mock('~/http/api/credentials', () => ({
  getCredentialSettings: getSettingsMock,
  getCredentialTournamentSettings: getTournamentSettingsMock,
  updateCredentialSettings: updateSettingsMock,
  updateCredentialTournamentSettings: updateTournamentSettingsMock,
}))

vi.mock('~/composables/credentials/useCredentialsAccess', () => ({
  useCredentialsAccess: () => ({ canConfigureCredentials: ref(true) }),
}))

vi.mock('~/composables/credentials/useCredentialsErrors', () => ({
  useCredentialsErrors: () => ({
    parseError: () => ({ status: 500, message: 'Error', checkoutUrl: null }),
  }),
}))

vi.mock('#imports', async () => {
  const actual = await vi.importActual<any>('#imports')
  return {
    ...actual,
    useSanctumClient: () => sanctumClientMock,
  }
})

describe('CredentialsSettingsCard', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    sanctumClientMock.mockReset()
    getSettingsMock.mockReset()
    getTournamentSettingsMock.mockReset()
    updateSettingsMock.mockReset()
    updateTournamentSettingsMock.mockReset()

    sanctumClientMock.mockResolvedValue({ data: [{ id: 1, name: 'Apertura' }] })

    getSettingsMock.mockResolvedValue({
      requires_registered_player: true,
      allow_unverified_players: true,
      allow_suspended_players: true,
      block_if_team_sanctioned: false,
      expiry_by_tournament: false,
      show_warnings_on_card: true,
      qr_enabled_by_default: true,
      allow_digital_credential: true,
      watermark_mode: 'forced',
      watermark_locked_by_plan: true,
    })

    getTournamentSettingsMock.mockResolvedValue({
      requires_registered_player: true,
      allow_unverified_players: false,
      allow_suspended_players: false,
      block_if_team_sanctioned: false,
      expiry_by_tournament: false,
      show_warnings_on_card: true,
      qr_enabled_by_default: true,
      allow_digital_credential: false,
      watermark_mode: 'forced',
      watermark_locked_by_plan: true,
      is_override: true,
    })

    updateSettingsMock.mockResolvedValue({
      requires_registered_player: true,
      allow_unverified_players: true,
      allow_suspended_players: true,
      block_if_team_sanctioned: false,
      expiry_by_tournament: false,
      show_warnings_on_card: true,
      qr_enabled_by_default: true,
      allow_digital_credential: true,
      watermark_mode: 'forced',
      watermark_locked_by_plan: true,
    })

    updateTournamentSettingsMock.mockResolvedValue({
      requires_registered_player: true,
      allow_unverified_players: false,
      allow_suspended_players: false,
      block_if_team_sanctioned: false,
      expiry_by_tournament: false,
      show_warnings_on_card: true,
      qr_enabled_by_default: true,
      allow_digital_credential: false,
      watermark_mode: 'forced',
      watermark_locked_by_plan: true,
      is_override: true,
    })
  })

  it('renders watermark lock state and allows saving global settings', async () => {
    const wrapper = await mountSuspended(CredentialsSettingsCard, {
      global: {
        stubs: {
          ...vuetifyStubs,
          CredentialsPaywallAlert: { template: '<div />' },
          InlineForbiddenState: { template: '<div />' },
          'v-divider': { template: '<hr />' },
          'v-card-actions': { template: '<div><slot /></div>' },
          'v-textarea': { template: '<textarea />' },
          'v-skeleton-loader': { template: '<div />' },
          'v-switch': { template: '<div><slot name="label" /></div>' },
          'v-card': { template: '<div><slot /></div>' },
          'v-card-title': { template: '<div><slot /></div>' },
          'v-card-subtitle': { template: '<div><slot /></div>' },
          'v-card-text': { template: '<div><slot /></div>' },
          'v-select': {
            props: ['modelValue', 'items', 'itemTitle', 'itemValue'],
            emits: ['update:modelValue'],
            template:
              '<select :value="modelValue" @change="$emit(\'update:modelValue\', Number($event.target.value) || $event.target.value)"><option value="">--</option><option v-for="item in items" :key="item[itemValue] || item.value" :value="item[itemValue] || item.value">{{ item[itemTitle] || item.title }}</option></select>',
          },
        },
      },
    })

    await vi.waitFor(() => {
      expect(getSettingsMock).toHaveBeenCalledTimes(1)
    })

    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('Bloqueado por plan')
    })

    const buttons = wrapper.findAll('button')
    const saveGlobalButton = buttons.find((item) => item.text().includes('Guardar global'))
    expect(saveGlobalButton).toBeTruthy()
    await saveGlobalButton?.trigger('click')
    expect(updateSettingsMock).toHaveBeenCalledTimes(1)
  })
})
