import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'
import { ref, reactive } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { ensureVuetifyApp, vuetifyStubs } from '../../../../utils/vuetify-stubs'

vi.mock('~/http/api/settings', () => ({
  getPlayerVerificationSettings: vi.fn(),
  getPlayerVerificationSettingsPublic: vi.fn(),
  getTournamentConfiguration: vi.fn(),
}))

vi.mock('~/composables/useImage', () => ({
  dragDropImageRef: ref({ loadImage: vi.fn() }),
}))

import * as settingsAPI from '~/http/api/settings'

const sanctumUser = vi.hoisted(() => ({ value: null as any }))

const isEdition = vi.hoisted(() => ({ value: false }))
const playerStoreRequest = vi.hoisted(() => ({ value: { basic: {} } }))
const steps = vi.hoisted(() => ({ value: { current: 'basic', steps: { basic: { disable: false } } } }))
const initPlayerForm = vi.hoisted(() => vi.fn())

const mountComponent = async (Component: any) =>
  mountSuspended(
    {
      components: { Component },
      template: '<v-app><Component /></v-app>',
    },
    {
      global: {
        stubs: {
          ...vuetifyStubs,
          BaseInput: { template: '<div><slot name="input" /></div>' },
          BaseCalendarInput: { template: '<div></div>' },
          DragDropImage: { template: '<div></div>' },
          'v-select': { template: '<div></div>' },
          'v-autocomplete': { template: '<div></div>' },
          'v-file-input': { template: '<div></div>' },
        },
        config: {
          globalProperties: {
            $vuetify: { display: { mobile: false } },
          },
        },
      },
    }
  )

mockNuxtImport('useRoute', () => () => ({
  name: 'equipos-equipo-jugadores-inscripcion',
  params: { equipo: 'tigres-fc' },
}))
mockNuxtImport('useSanctumUser', () => () => sanctumUser)

let BasicInfo: any

describe('Player stepper basic info', () => {
  beforeAll(async () => {
    ensureVuetifyApp()
    BasicInfo = (await import('~/components/pages/jugadores/stepper/01-basic-info.vue')).default
  })

  beforeEach(() => {
    sanctumUser.value = null
    isEdition.value = false
    playerStoreRequest.value = { basic: {} }
    steps.value = { current: 'basic', steps: { basic: { disable: false } } }
    initPlayerForm.mockReset()

    ;(settingsAPI.getPlayerVerificationSettings as any).mockResolvedValue({
      requires_player_verification: false,
      player_verification_methods: [],
    })
    ;(settingsAPI.getPlayerVerificationSettingsPublic as any).mockResolvedValue({
      requires_player_verification: true,
      player_verification_methods: ['curp'],
    })
    ;(settingsAPI.getTournamentConfiguration as any).mockResolvedValue({ requires_player_verification: null })

    mockNuxtImport('storeToRefs', () => (store: any) => store)
    mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }))
    mockNuxtImport('usePlayerStore', () => () => ({
      isEdition,
      playerStoreRequest,
      steps,
      initPlayerForm,
    }))
    mockNuxtImport('useTeamStore', () => () => ({ teams: ref([]) }))
    mockNuxtImport('useCategoryStore', () => () => ({ categories: ref([]) }))
    // useRoute and useSanctumUser are mocked at module scope
    mockNuxtImport('toTypedSchema', () => (schema: any) => schema)
    mockNuxtImport('useForm', () => () => {
      const values = reactive({ name: '', identification_document: null })
      const meta = ref({ valid: false, touched: false })
      const defineField = () => [ref(null), {}]
      return { defineField, meta, values }
    })
  })

  it('uses public verification settings for guests in pre-register', async () => {
    sanctumUser.value = null

    await mountComponent(BasicInfo)
    await flushPromises()

    expect(settingsAPI.getPlayerVerificationSettingsPublic).toHaveBeenCalledWith('tigres-fc')
    expect(settingsAPI.getPlayerVerificationSettings).not.toHaveBeenCalled()
  })

  it('uses admin verification settings when session exists', async () => {
    sanctumUser.value = { email: 'user@futzo.test' }

    await mountComponent(BasicInfo)
    await flushPromises()

    expect(settingsAPI.getPlayerVerificationSettings).toHaveBeenCalled()
    expect(settingsAPI.getPlayerVerificationSettingsPublic).not.toHaveBeenCalled()
  })
})
