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
const prefetchTournamentRulesValidationByTeam = vi.hoisted(() => vi.fn())
const routeName = vi.hoisted(() => ({ value: 'equipos-equipo-jugadores-inscripcion' }))
const basicTeamId = vi.hoisted(() => ({ value: null as number | null }))
const basicNameValue = vi.hoisted(() => ({ value: '' }))
const basicBirthdateValue = vi.hoisted(() => ({ value: null as string | null }))
const tournamentRulesByTeam = vi.hoisted(() => ({ value: { teamId: null, tournamentId: null, rules: [], complianceSummary: null } }))
const isTournamentRulesLoading = vi.hoisted(() => ({ value: false }))

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
          'v-switch': { props: ['label', 'modelValue'], template: '<div data-testid="rule-switch">{{ label }}</div>' },
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
  name: routeName.value,
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
    routeName.value = 'equipos-equipo-jugadores-inscripcion'
    basicTeamId.value = null
    basicNameValue.value = ''
    basicBirthdateValue.value = null
    sanctumUser.value = null
    isEdition.value = false
    playerStoreRequest.value = { basic: {} }
    steps.value = { current: 'basic', steps: { basic: { disable: false } } }
    initPlayerForm.mockReset()
    prefetchTournamentRulesValidationByTeam.mockReset()
    tournamentRulesByTeam.value = { teamId: null, tournamentId: null, rules: [], complianceSummary: null }
    isTournamentRulesLoading.value = false

    ;(settingsAPI.getPlayerVerificationSettings as any).mockClear()
    ;(settingsAPI.getPlayerVerificationSettingsPublic as any).mockClear()
    ;(settingsAPI.getTournamentConfiguration as any).mockClear()

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
      tournamentRulesByTeam,
      isTournamentRulesLoading,
      initPlayerForm,
      fetchTournamentRulesValidationByTeam: prefetchTournamentRulesValidationByTeam,
    }))
    mockNuxtImport('useRoleAccess', () => () => ({
      isTeamScopedRole: ref(false),
    }))
    mockNuxtImport('useTeamStore', () => () => ({ teams: ref([]) }))
    mockNuxtImport('useCategoryStore', () => () => ({ categories: ref([]) }))
    // useRoute and useSanctumUser are mocked at module scope
    mockNuxtImport('toTypedSchema', () => (schema: any) => schema)
    mockNuxtImport('useForm', () => () => {
      const values = reactive({
        name: basicNameValue.value,
        birthdate: basicBirthdateValue.value,
        team_id: basicTeamId.value,
        identification_document: null,
      })
      const meta = ref({ valid: false, touched: false })
      const defineField = (field: string) => {
        if (field === 'team_id') return [ref(basicTeamId.value), {}]
        if (field === 'name') return [ref(basicNameValue.value), {}]
        if (field === 'birthdate') return [ref(basicBirthdateValue.value), {}]
        return [ref(null), {}]
      }
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

  it('prefetches tournament rules when team changes in admin flow', async () => {
    routeName.value = 'jugadores'
    basicTeamId.value = 99
    sanctumUser.value = { email: 'user@futzo.test' }

    await mountComponent(BasicInfo)
    await flushPromises()

    expect(prefetchTournamentRulesValidationByTeam).toHaveBeenCalledWith(99)
  })

  it('renders quantity rule switches only for rules of type cantidad', async () => {
    routeName.value = 'jugadores'
    basicTeamId.value = 99
    sanctumUser.value = { email: 'user@futzo.test' }
    tournamentRulesByTeam.value = {
      teamId: 99,
      tournamentId: 5,
      rules: [
        { id: 21, name: 'Foráneos', type: 'cantidad', condition: null, age: null, max_players: 3 },
        { id: 22, name: 'Sub23', type: 'edad', condition: 'menores de', age: 23, max_players: 5 },
      ],
      complianceSummary: null,
    }

    const wrapper = await mountComponent(BasicInfo)
    await flushPromises()

    const ruleSwitches = wrapper.findAll('[data-testid="rule-switch"]')
    expect(ruleSwitches).toHaveLength(1)
    expect(ruleSwitches[0].text()).toContain('Foráneos')
  })

  it('syncs split name to store even when meta.valid is false', async () => {
    routeName.value = 'jugadores'
    basicNameValue.value = 'Luis Hernandez Ortiz'
    basicBirthdateValue.value = '2003-05-10'
    sanctumUser.value = { email: 'user@futzo.test' }

    await mountComponent(BasicInfo)
    await flushPromises()

    expect(playerStoreRequest.value.basic?.name).toBe('Luis')
    expect(playerStoreRequest.value.basic?.last_name).toBe('Hernandez Ortiz')
    expect(playerStoreRequest.value.basic?.birthdate).toBe('2003-05-10')
  })
})
