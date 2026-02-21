import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs } from '../../../utils/vuetify-stubs'
import CredentialsDesignsView from '~/components/pages/credentials/CredentialsDesignsView.vue'

const getDesignsMock = vi.hoisted(() => vi.fn())

vi.mock('~/http/api/credentials', () => ({
  getCredentialsDesigns: getDesignsMock,
  duplicateCredentialDesign: vi.fn(),
  restoreCredentialDesign: vi.fn(),
  updateCredentialDesign: vi.fn(),
  uploadCredentialDesignLogo: vi.fn(),
}))

vi.mock('~/composables/credentials/useCredentialsErrors', () => ({
  useCredentialsErrors: () => ({
    parseError: () => ({ status: 500, message: 'Error', checkoutUrl: null }),
  }),
}))

describe('CredentialsDesignsView', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    getDesignsMock.mockReset()
    getDesignsMock.mockResolvedValue({
      plan: { slug: 'kickoff', can_use_seasonal: false },
      official: [
        {
          id: 1,
          name: 'Oficial',
          slug: 'official',
          type: 'official_vertical',
          is_official: true,
          is_default: true,
          locked_by_plan: false,
        },
      ],
      seasonal: [
        {
          id: 2,
          name: 'FIFA 2026',
          slug: 'fifa-2026',
          type: 'fifa_style',
          is_official: false,
          is_default: false,
          locked_by_plan: true,
          season_label: '2026',
        },
      ],
    })
  })

  it('renders seasonal lock state', async () => {
    const wrapper = await mountSuspended(CredentialsDesignsView, {
      global: {
        stubs: {
          ...vuetifyStubs,
          CredentialsPaywallAlert: { template: '<div />' },
          'v-dialog': { template: '<div><slot /></div>' },
          'v-card': { template: '<div><slot /></div>' },
          'v-card-title': { template: '<div><slot /></div>' },
          'v-card-text': { template: '<div><slot /></div>' },
          'v-card-actions': { template: '<div><slot /></div>' },
          'v-text-field': { template: '<input />' },
          'v-chip': { template: '<span><slot /></span>' },
          'v-skeleton-loader': { template: '<div />' },
        },
      },
    })

    expect(wrapper.text()).toContain('Bloqueado por plan')
    expect(wrapper.text()).toContain('FIFA 2026')
  })
})
