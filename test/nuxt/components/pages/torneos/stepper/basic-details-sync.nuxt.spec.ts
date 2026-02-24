import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs } from '../../../../utils/vuetify-stubs'
import BasicInfo from '~/components/pages/torneos/stepper/01-basicInfo.vue'
import DetailsInfo from '~/components/pages/torneos/stepper/02-detailsInfo.vue'

const tournamentStoreRequest = ref<any>({
  basic: {},
  details: {
    location_ids: [],
    penalty_draw_enabled: false,
  },
})

const steps = ref({
  current: 'basicInfo',
  steps: {
    basicInfo: { disable: true },
    detailsInfo: { disable: true },
  },
})

const isEdition = ref(false)
const footballTypes = ref([{ id: 1, name: 'Fútbol 11', description: 'F11' }])
const formats = ref([{ id: 1, name: 'Liga', description: 'Liga' }])

const fetchCategoriesMock = vi.hoisted(() => vi.fn(async () => undefined))
const fetchFormatsMock = vi.hoisted(() => vi.fn(async () => undefined))
const getLeagueLocationsMock = vi.hoisted(() => vi.fn(async () => []))

mockNuxtImport('useTournamentStore', () => () => ({
  tournamentStoreRequest,
  steps,
  isEdition,
}))

mockNuxtImport('useCategoryStore', () => () => ({
  formats,
  fetchCategories: fetchCategoriesMock,
  fetchFormats: fetchFormatsMock,
}))

mockNuxtImport('useLeaguesStore', () => () => ({
  footballTypes,
  getLeagueLocations: getLeagueLocationsMock,
}))

mockNuxtImport('useI18n', () => () => ({
  t: (value: string) => value,
}))

vi.mock('pinia', async () => {
  const actual = await vi.importActual<any>('pinia')
  return {
    ...actual,
    storeToRefs: (store: any) => store,
  }
})

const BaseInputStub = defineComponent({
  name: 'BaseInput',
  props: {
    modelValue: { type: null, default: '' },
    id: { type: [String, Number], default: '' },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    return () =>
      h('div', { 'data-testid': `base-input-${props.id}` }, [
        slots.input
          ? slots.input()
          : h('input', {
              'data-testid': String(props.id || 'base-input'),
              value: props.modelValue as any,
              onInput: (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value),
            }),
      ])
  },
})

describe('Tournament stepper payload sync', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    tournamentStoreRequest.value = {
      basic: {},
      details: {
        location_ids: [],
        penalty_draw_enabled: false,
      },
    }
    steps.value = {
      current: 'basicInfo',
      steps: {
        basicInfo: { disable: true },
        detailsInfo: { disable: true },
      },
    } as any
    isEdition.value = false
    fetchCategoriesMock.mockClear()
    fetchFormatsMock.mockClear()
    getLeagueLocationsMock.mockClear()
  })

  it('syncs basic.name to store as user types', async () => {
    const wrapper = await mountSuspended(BasicInfo, {
      global: {
        stubs: {
          ...vuetifyStubs,
          BaseInput: BaseInputStub,
          BaseCalendarInput: { template: '<div />' },
          DragDropImage: { template: '<div />' },
          CategorySelectComponent: { template: '<div />' },
          'v-range-slider': { template: '<div />' },
          'v-text-field': { template: '<input />' },
          'v-select': { template: '<select />' },
          'v-list-item': { template: '<div />' },
          'v-tooltip': { template: '<div><slot /></div>' },
        },
      },
    })

    await wrapper.get('[data-testid="tournament-name"]').setValue('Copa Futzo')
    await flushPromises()

    expect(tournamentStoreRequest.value.basic.name).toBe('Copa Futzo')
  })

  it('syncs details.description to store as user types', async () => {
    const wrapper = await mountSuspended(DetailsInfo, {
      global: {
        stubs: {
          ...vuetifyStubs,
          BaseInput: BaseInputStub,
          Icon: { template: '<i />' },
          'v-autocomplete': { template: '<div />' },
          'v-text-field': { template: '<input />' },
          'v-textarea': defineComponent({
            props: { modelValue: { type: String, default: '' } },
            emits: ['update:modelValue'],
            setup(props, { emit }) {
              return () =>
                h('textarea', {
                  'data-testid': 'details-description',
                  value: props.modelValue,
                  onInput: (event: Event) => emit('update:modelValue', (event.target as HTMLTextAreaElement).value),
                })
            },
          }),
          'v-switch': { template: '<input type="checkbox" />' },
          'v-tooltip': { template: '<div><slot /></div>' },
        },
      },
    })

    await wrapper.get('[data-testid="details-description"]').setValue('Torneo relámpago')
    await flushPromises()

    expect(tournamentStoreRequest.value.details.description).toBe('Torneo relámpago')
  })
})

