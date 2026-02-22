import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs, iconStub } from '../../../../utils/vuetify-stubs'
import TournamentDetailDialogs from '~/components/pages/torneos/torneo/TournamentDetailDialogs.vue'

const baseProps = {
  shareShowQr: false,
  shareTitle: 'Compartir torneo',
  shareImage: '',
  shareHasError: false,
  competitionManagementDialog: false,
  retireCompetitionDialog: false,
  competitionConfigContext: 'Siguiente jornada: 6',
  selectedCompetitionTeamId: 9,
  tournamentTeamOptions: [
    { title: 'Aguilas', value: 9 },
    { title: 'Titanes', value: 11 },
  ],
  isUpdatingCompetitionStatus: false,
  competitionStatusSummary: 'El equipo está activo',
  isSelectedTeamActive: true,
  competitionActionLabel: 'Retirar de competencia',
  canToggleTeamCompetitionStatus: true,
  selectedCompetitionTeamName: 'Aguilas',
}

describe('TournamentDetailDialogs', () => {
  it('renders share dialog and emits close/download actions', async () => {
    ensureVuetifyApp()
    const wrapper = await mountSuspended(TournamentDetailDialogs, {
      props: {
        ...baseProps,
        shareShowQr: true,
        shareImage: 'data:image/png;base64,abc',
      },
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: iconStub,
          'v-img': { template: '<div data-testid="qr-image"></div>' },
        },
      },
    })

    expect(wrapper.find('[data-testid="qr-image"]').exists()).toBe(true)

    const downloadButton = wrapper.findAll('button').find((button) => button.text().includes('Descargar QR'))
    expect(downloadButton).toBeTruthy()
    await downloadButton?.trigger('click')
    expect(wrapper.emitted('downloadQr')).toHaveLength(1)

    const closeButton = wrapper.findAll('button').find((button) => button.text().includes('Cerrar'))
    expect(closeButton).toBeTruthy()
    await closeButton?.trigger('click')
    expect(wrapper.emitted('update:shareShowQr')).toEqual([[false]])
  })

  it('renders competition dialogs and emits team actions', async () => {
    ensureVuetifyApp()
    const wrapper = await mountSuspended(TournamentDetailDialogs, {
      props: {
        ...baseProps,
        competitionManagementDialog: true,
        retireCompetitionDialog: true,
      },
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: iconStub,
        },
      },
    })

    expect(wrapper.find('[data-testid="tournament-competition-management-dialog"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="tournament-competition-confirm-dialog"]').exists()).toBe(true)

    const select = wrapper.find('[data-testid="tournament-competition-team-select"]')
    expect(select.exists()).toBe(true)
    const selectComponent = wrapper.findComponent({ name: 'StubVSelect' })
    selectComponent.vm.$emit('update:modelValue', 11)
    expect(wrapper.emitted('update:selectedCompetitionTeamId')).toEqual([[11]])

    const toggleButton = wrapper.find('[data-testid="tournament-competition-toggle-btn"]')
    await toggleButton.trigger('click')
    expect(wrapper.emitted('requestToggleTeamCompetitionStatus')).toHaveLength(1)

    const closeButton = wrapper.findAll('button').find((button) => button.text().includes('Cerrar'))
    expect(closeButton).toBeTruthy()
    await closeButton?.trigger('click')
    expect(wrapper.emitted('closeCompetitionManagementDialog')).toHaveLength(1)

    const cancelButton = wrapper.find('[data-testid="tournament-competition-confirm-cancel"]')
    await cancelButton.trigger('click')
    expect(wrapper.emitted('closeRetireCompetitionDialog')).toHaveLength(1)

    const confirmButton = wrapper.find('[data-testid="tournament-competition-confirm-submit"]')
    await confirmButton.trigger('click')
    expect(wrapper.emitted('confirmRetireCompetitionTeam')).toHaveLength(1)
  })
})
