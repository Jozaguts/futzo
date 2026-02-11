import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import {ensureVuetifyApp, vuetifyStubs} from '../../../utils/vuetify-stubs'
import TournamentFilters from '~/components/pages/torneos/tournament-filters.vue'

const search = ref('')
const statusFilters = ref([] as string[])
const formatFilter = ref<string | null>(null)
const pagination = ref({ current_page: 1 })
const dialog = ref(false)
const applyStatusFilter = vi.fn()
const applyFormatFilter = vi.fn()
const loadTournaments = vi.fn()

const storeMock = {
  search,
  statusFilters,
  formatFilter,
  pagination,
  dialog,
  applyStatusFilter,
  applyFormatFilter,
  loadTournaments,
}

mockNuxtImport('useTournamentStore', () => () => storeMock)
mockNuxtImport('storeToRefs', () => (store: any) => store)

const SearchInputStub = {
  name: 'SearchInput',
  template: '<input data-testid="search" @input="$emit(\'searching\', $event.target.value)" />',
}

describe('TournamentFilters', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    search.value = ''
    statusFilters.value = []
    formatFilter.value = null
    pagination.value.current_page = 1
    dialog.value = false
    applyStatusFilter.mockClear()
    applyFormatFilter.mockClear()
    loadTournaments.mockClear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('updates status and format filters', async () => {
    const wrapper = await mountSuspended(TournamentFilters, {
      global: {
        stubs: {
          ...vuetifyStubs,
          SearchInput: SearchInputStub,
        },
      },
    })

    expect(wrapper.find('[data-testid="tournament-filters"]').exists()).toBe(true)
    const selects = wrapper.findAllComponents({ name: 'StubVSelect' })
    expect(selects.length).toBe(2)

    await selects[0].vm.$emit('update:modelValue', 'active')
    expect(applyStatusFilter).toHaveBeenCalledWith(['en curso'])

    await selects[1].vm.$emit('update:modelValue', 'liga')
    expect(applyFormatFilter).toHaveBeenCalledWith('liga')
  })

  it('debounces search updates and loads tournaments', async () => {
    const wrapper = await mountSuspended(TournamentFilters, {
      global: {
        stubs: {
          ...vuetifyStubs,
          SearchInput: SearchInputStub,
        },
      },
    })

    const input = wrapper.find('[data-testid="search"]')
    await input.setValue('apertura')
    vi.runAllTimers()

    expect(search.value).toBe('apertura')
    expect(loadTournaments).toHaveBeenCalled()
  })

  it('opens tournament dialog from primary button', async () => {
    const wrapper = await mountSuspended(TournamentFilters, {
      global: {
        stubs: {
          ...vuetifyStubs,
          SearchInput: SearchInputStub,
        },
      },
    })

    const button = wrapper.find('[data-testid="tournament-create-button"]')
    await button.trigger('click')

    expect(dialog.value).toBe(true)
  })
})
