import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import ImportDialog from '~/components/pages/jugadores/import-dialog/index.vue'

const importPlayersHandler = vi.fn()
const downloadTemplate = vi.fn()
const searchTeams = vi.fn()

const playerStoreMock = {
  importModal: ref(true),
  isImporting: ref(false),
  importPlayersHandler,
  downloadTemplate,
}

const teamStoreMock = {
  teams: ref([{ id: 11, name: 'Halcones FC' }]),
  searchTeams,
}

mockNuxtImport('usePlayerStore', () => () => playerStoreMock)
mockNuxtImport('useTeamStore', () => () => teamStoreMock)
mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useDebounceFn', () => (fn: (...args: any[]) => void) => fn)

describe('Jugadores import dialog', () => {
  beforeEach(() => {
    importPlayersHandler.mockClear()
    downloadTemplate.mockClear()
    searchTeams.mockClear()
    playerStoreMock.importModal.value = true
    playerStoreMock.isImporting.value = false
  })

  it('allows importing without selecting a team', async () => {
    const wrapper = await mountSuspended(ImportDialog, {
      global: {
        stubs: {
          HeaderCard: { template: '<div data-testid="header-card"></div>' },
          Form: {
            template:
              '<button data-testid="set-file" @click="$emit(\'update:file\', { name: \'players.xlsx\' })"></button>',
          },
          Drops: {
            props: ['disabled', 'loading'],
            template:
              '<button data-testid="confirm-import" :data-disabled="String(!!disabled)" @click="$emit(\'import-players\')"></button>',
          },
          'v-dialog': {
            props: ['modelValue'],
            template: '<div><slot /></div>',
          },
          'v-card': { template: '<div><slot /></div>' },
          'v-container': { template: '<div><slot /></div>' },
          'v-row': { template: '<div><slot /></div>' },
          'v-col': { template: '<div><slot /></div>' },
          'v-autocomplete': {
            template: '<div data-testid="team-select"></div>',
          },
          'v-btn': {
            template: '<button><slot /></button>',
          },
          Icon: { template: '<i></i>' },
        },
      },
    })

    await wrapper.find('[data-testid="set-file"]').trigger('click')
    await nextTick()

    expect(wrapper.find('[data-testid="confirm-import"]').attributes('data-disabled')).toBe('false')

    await wrapper.find('[data-testid="confirm-import"]').trigger('click')

    expect(importPlayersHandler).toHaveBeenCalledTimes(1)
    expect(importPlayersHandler.mock.calls[0][1]).toBeNull()
  })

  it('sends selected team when one is chosen', async () => {
    const wrapper = await mountSuspended(ImportDialog, {
      global: {
        stubs: {
          HeaderCard: { template: '<div data-testid="header-card"></div>' },
          Form: {
            template:
              '<button data-testid="set-file" @click="$emit(\'update:file\', { name: \'players.xlsx\' })"></button>',
          },
          Drops: {
            props: ['disabled', 'loading'],
            template: '<button data-testid="confirm-import" @click="$emit(\'import-players\')"></button>',
          },
          'v-dialog': {
            props: ['modelValue'],
            template: '<div><slot /></div>',
          },
          'v-card': { template: '<div><slot /></div>' },
          'v-container': { template: '<div><slot /></div>' },
          'v-row': { template: '<div><slot /></div>' },
          'v-col': { template: '<div><slot /></div>' },
          'v-autocomplete': {
            template:
              '<button data-testid="team-select" @click="$emit(\'update:modelValue\', 11)" @input="$emit(\'update:search\', \'Halcones\')"></button>',
          },
          'v-btn': {
            template: '<button><slot /></button>',
          },
          Icon: { template: '<i></i>' },
        },
      },
    })

    await wrapper.find('[data-testid="set-file"]').trigger('click')
    await nextTick()
    await wrapper.find('[data-testid="team-select"]').trigger('click')
    await wrapper.find('[data-testid="confirm-import"]').trigger('click')

    expect(importPlayersHandler).toHaveBeenCalledTimes(1)
    expect(importPlayersHandler.mock.calls[0][1]).toBe(11)
  })
})
