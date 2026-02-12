import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import GameReportDialog from '~/components/pages/calendario/game-report/index.vue'

const getGameDetails = vi.hoisted(() => vi.fn())
const markAsComplete = vi.hoisted(() => vi.fn())

const gameReportDialog = ref(true)
const gameDetailsRequest = ref({ game_id: 99 } as any)
const game = ref({ status: 'programado' } as any)
const buttonStub = {
  emits: ['click'],
  props: ['disabled', 'text'],
  template: '<button :disabled="disabled" @click="$emit(\'click\')">{{ text }}</button>',
}

mockNuxtImport('useGameStore', () => () => ({
  gameReportDialog,
  gameDetailsRequest,
  game,
  getGameDetails,
  markAsComplete,
}))

mockNuxtImport('storeToRefs', () => (store: any) => store)

describe('GameReportDialog', () => {
  beforeEach(() => {
    gameReportDialog.value = true
    gameDetailsRequest.value = { game_id: 99 } as any
    game.value = { status: 'programado' } as any
    getGameDetails.mockReset()
    getGameDetails.mockResolvedValue(undefined)
    markAsComplete.mockReset()
    markAsComplete.mockResolvedValue(undefined)
  })

  it('loads game details when dialog receives game id', async () => {
    await mountSuspended(GameReportDialog, {
      global: {
        stubs: {
          Dialog: { template: '<div><slot name="v-card-text" /><slot name="actions" /></div>' },
          ContentSection: { template: '<div></div>' },
          'v-btn': buttonStub,
        },
      },
    })

    expect(getGameDetails).toHaveBeenCalledTimes(1)
  })

  it('marks match as completed and closes dialog', async () => {
    const wrapper = await mountSuspended(GameReportDialog, {
      global: {
        stubs: {
          Dialog: { template: '<div><slot name="v-card-text" /><slot name="actions" /></div>' },
          ContentSection: { template: '<div></div>' },
          'v-btn': buttonStub,
        },
      },
    })

    await wrapper.find('button').trigger('click')
    await flushPromises()

    expect(markAsComplete).toHaveBeenCalledTimes(1)
    expect(gameReportDialog.value).toBe(false)
  })

  it('shows finalized state when match is already completed', async () => {
    game.value = { status: 'completado' } as any

    const wrapper = await mountSuspended(GameReportDialog, {
      global: {
        stubs: {
          Dialog: { template: '<div><slot name="v-card-text" /><slot name="actions" /></div>' },
          ContentSection: { template: '<div></div>' },
          'v-btn': buttonStub,
        },
      },
    })

    const button = wrapper.find('button')
    expect(button.text()).toContain('Partido finalizado')
    expect(button.attributes('disabled')).toBeDefined()
  })
})
