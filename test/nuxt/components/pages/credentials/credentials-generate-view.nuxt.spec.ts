import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs } from '../../../utils/vuetify-stubs'
import CredentialsGenerateView from '~/components/pages/credentials/CredentialsGenerateView.vue'

const getCatalogsMock = vi.hoisted(() => vi.fn())
const createBatchMock = vi.hoisted(() => vi.fn())
const startBatchProgressMock = vi.hoisted(() => vi.fn())

vi.mock('~/http/api/credentials', () => ({
  getCredentialsGeneratorCatalogs: getCatalogsMock,
  createCredentialsBatch: createBatchMock,
  downloadCredentialsBatchArtifact: vi.fn(),
}))

vi.mock('~/composables/credentials/useCredentialsBatchProgress', () => ({
  useCredentialsBatchProgress: () => ({
    batch: ref(null),
    loading: ref(false),
    start: startBatchProgressMock,
  }),
}))

vi.mock('~/composables/credentials/useCredentialsErrors', () => ({
  useCredentialsErrors: () => ({
    parseError: (error: any) => ({
      status: Number(error?.response?.status ?? 500),
      message: error?.response?._data?.message || 'Error',
      checkoutUrl: null,
    }),
  }),
}))

describe('CredentialsGenerateView', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    getCatalogsMock.mockReset()
    createBatchMock.mockReset()
    startBatchProgressMock.mockReset()

    getCatalogsMock.mockResolvedValue({
      filters: {
        status_options: [{ value: 'all', label: 'Todos' }],
        applied: {
          tournament_id: null,
          team_id: null,
          status: 'all',
          search: '',
          include_unverified: true,
          include_suspended: true,
          per_page: 25,
        },
      },
      plan: {
        slug: 'kickoff',
        can_use_seasonal: false,
        watermark_locked_by_plan: true,
      },
      generation: {
        output_modes: [
          { key: 'print', label: 'Imprimir', enabled: true },
          { key: 'digital', label: 'Digital', enabled: false, reason: 'Deshabilitado por settings' },
        ],
        size_options: [{ key: 'credential_standard', label: 'Credencial estándar' }],
        defaults: {
          format: 'official_vertical',
          output_mode: 'digital',
          side_mode: 'front',
          size_key: 'credential_standard',
          show_qr: true,
          show_expiry: true,
          watermark_mode: 'forced',
        },
        side_mode_options: [{ key: 'front', label: 'Frente' }],
      },
      formats: [
        {
          key: 'official_vertical',
          label: 'Oficial vertical',
          locked_by_plan: false,
          supports_reverse_side: true,
        },
        {
          key: 'fifa_style',
          label: 'Seasonal FIFA',
          locked_by_plan: true,
          lock_reason: 'Plan Pro requerido',
        },
      ],
      tournaments: [],
      teams: [],
      players: {
        data: [
          {
            id: 7,
            name: 'Jugador Prueba',
            team: { id: 1, name: 'Equipo A' },
            current_credential_status: 'active',
          },
        ],
      },
    })

    createBatchMock.mockResolvedValue({
      message: 'ok',
      data: {
        id: 99,
        status: 'queued',
        selection_count: 1,
        processed_count: 0,
        success_count: 0,
        failed_count: 0,
      },
    })
  })

  it('shows locked format reason and sends batch with print mode when digital is disabled', async () => {
    const wrapper = await mountSuspended(CredentialsGenerateView, {
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: { template: '<i />' },
          KpisMetricsSection: { template: '<div />' },
          BatchProgressPanel: { template: '<div />' },
          CredentialsPaywallAlert: { template: '<div />' },
          'v-checkbox-btn': { template: '<input type="checkbox" />' },
          'v-text-field': {
            props: ['modelValue', 'label', 'disabled'],
            emits: ['update:modelValue'],
            template: '<input :value="modelValue" :aria-label="label" :disabled="disabled" @input="$emit(\'update:modelValue\', $event.target.value)" />',
          },
          'v-list-item': { template: '<div><slot /></div>' },
          'v-list-item-title': { template: '<div><slot /></div>' },
          'v-list-item-subtitle': { template: '<div><slot /></div>' },
          'v-progress-linear': { template: '<div />' },
          'v-skeleton-loader': { template: '<div />' },
          'v-switch': { template: '<div><slot name="label" /></div>' },
        },
      },
    })

    expect(wrapper.text()).toContain('Plan Pro requerido')

    ;(wrapper.vm as any).selectedPlayerIds = [7]
    await nextTick()
    await wrapper.find('[data-testid="credentials-generator-create-batch"]').trigger('click')

    expect(createBatchMock).toHaveBeenCalledTimes(1)
    expect(createBatchMock.mock.calls[0][0].output_mode).toBe('print')
    expect(startBatchProgressMock).toHaveBeenCalledTimes(1)
  })
})
