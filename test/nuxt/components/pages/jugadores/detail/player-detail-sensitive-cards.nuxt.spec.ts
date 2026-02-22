import {describe, expect, it} from 'vitest'
import {defineComponent} from 'vue'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import PlayerDetailSensitiveCards from '~/components/pages/jugadores/detail/player-detail-sensitive-cards.vue'

const VBtnStub = defineComponent({
  emits: ['click'],
  template: '<button @click="$emit(\'click\')"><slot /></button>',
})

const VFileInputStub = defineComponent({
  emits: ['update:modelValue'],
  template: '<button data-testid="file-input" @click="$emit(\'update:modelValue\', null)"></button>',
})

describe('PlayerDetailSensitiveCards', () => {
  it('renders sensitive cards and emits upload/reject/release actions', async () => {
    const wrapper = await mountSuspended(PlayerDetailSensitiveCards, {
      props: {
        canManageSensitivePlayerActions: true,
        statsHighlights: [{ label: 'Goles', value: '6' }],
        verificationStatusLabel: 'Pendiente',
        verificationNotes: '',
        verificationDocumentUrl: null,
        verificationPhotoUrl: null,
        verificationDocument: [] as File[],
        verificationPhoto: null,
        isUploadingVerification: false,
        isApprovingVerification: false,
        isReleasingLock: false,
        lockStatusLabel: 'Sin bloqueo activo',
        isLockActive: true,
      },
      global: {
        stubs: {
          'v-card': { template: '<div><slot /></div>' },
          'v-divider': { template: '<hr />' },
          'v-btn': VBtnStub,
          'v-file-input': VFileInputStub,
        },
      },
    })

    expect(wrapper.text()).toContain('Verificación')
    expect(wrapper.text()).toContain('Bloqueo de transferencia')

    const buttons = wrapper.findAll('button')
    const submitButton = buttons.find((item) => item.text().includes('Subir documentos'))
    const rejectButton = buttons.find((item) => item.text().includes('Rechazar'))
    const releaseButton = buttons.find((item) => item.text().includes('Liberar jugador'))

    expect(submitButton).toBeTruthy()
    expect(rejectButton).toBeTruthy()
    expect(releaseButton).toBeTruthy()

    await submitButton!.trigger('click')
    await rejectButton!.trigger('click')
    await releaseButton!.trigger('click')
    await wrapper.find('[data-testid="file-input"]').trigger('click')

    expect(wrapper.emitted('submit-verification')).toBeTruthy()
    expect(wrapper.emitted('request-reject')).toBeTruthy()
    expect(wrapper.emitted('release-lock')).toBeTruthy()
    expect(wrapper.emitted('update:verificationDocument')).toBeTruthy()
  })

  it('emits approve action when verification document exists', async () => {
    const wrapper = await mountSuspended(PlayerDetailSensitiveCards, {
      props: {
        canManageSensitivePlayerActions: true,
        statsHighlights: [{ label: 'Goles', value: '6' }],
        verificationStatusLabel: 'Pendiente',
        verificationNotes: '',
        verificationDocumentUrl: 'https://example.com/documento.pdf',
        verificationPhotoUrl: null,
        verificationDocument: null,
        verificationPhoto: null,
        isUploadingVerification: false,
        isApprovingVerification: false,
        isReleasingLock: false,
        lockStatusLabel: 'Sin bloqueo activo',
        isLockActive: true,
      },
      global: {
        stubs: {
          'v-card': { template: '<div><slot /></div>' },
          'v-divider': { template: '<hr />' },
          'v-btn': VBtnStub,
          'v-file-input': VFileInputStub,
        },
      },
    })

    const approveButton = wrapper.findAll('button').find((item) => item.text().includes('Aprobar'))
    expect(approveButton).toBeTruthy()

    await approveButton!.trigger('click')

    expect(wrapper.emitted('approve-verification')).toBeTruthy()
  })
})
