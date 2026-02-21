import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs } from '../../../utils/vuetify-stubs'
import CredentialsHistoryView from '~/components/pages/credentials/CredentialsHistoryView.vue'

const getHistoryMock = vi.hoisted(() => vi.fn())

vi.mock('~/http/api/credentials', () => ({
  getCredentialHistory: getHistoryMock,
  getCredentialHistoryDetail: vi.fn(),
  invalidateCredentialFromHistory: vi.fn(),
  reprintCredentialFromHistory: vi.fn(),
}))

vi.mock('~/composables/credentials/useCredentialsBatchProgress', () => ({
  useCredentialsBatchProgress: () => ({
    batch: ref(null),
    loading: ref(false),
    start: vi.fn(),
  }),
}))

vi.mock('~/composables/credentials/useCredentialsErrors', () => ({
  useCredentialsErrors: () => ({
    parseError: () => ({ status: 500, message: 'Error', checkoutUrl: null }),
  }),
}))

describe('CredentialsHistoryView', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    getHistoryMock.mockReset()
    getHistoryMock.mockResolvedValue({
      data: [
        {
          id: 1,
          player_id: 1,
          player_name: 'Jugador',
          team_id: 1,
          team_name: 'Equipo',
          tournament_id: 1,
          tournament_name: 'Torneo',
          format: 'official_vertical',
          status: 'active',
          credential_code: 'CRD1',
          issued_at: '2026-02-21',
          issued_by: 1,
          issued_by_name: 'Admin',
          actions: {
            can_view: false,
            can_reprint: false,
            can_invalidate: false,
          },
        },
      ],
      meta: { current_page: 1, last_page: 1, per_page: 25, total: 1 },
    })
  })

  it('disables row actions based on actions.can_* flags', async () => {
    const wrapper = await mountSuspended(CredentialsHistoryView, {
      global: {
        stubs: {
          ...vuetifyStubs,
          BatchProgressPanel: { template: '<div />' },
          'v-text-field': { template: '<input />' },
          'v-textarea': { template: '<textarea />' },
          'v-progress-linear': { template: '<div />' },
          'v-pagination': { template: '<div />' },
          'v-dialog': { template: '<div><slot /></div>' },
        },
      },
    })

    const disabledButtons = wrapper.findAll('button:disabled')
    expect(disabledButtons.length).toBeGreaterThanOrEqual(3)
  })
})
