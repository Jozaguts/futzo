import {beforeEach, describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {flushPromises} from '@vue/test-utils'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import JugadoresForm from '~/components/pages/jugadores/form/index.vue'

const makeSteps = () =>
  ref({
    current: 'basic-info',
    steps: {
      'basic-info': {
        disable: false,
        next_step: 'save',
        back_step: 'close',
        next_label: 'Guardar',
        back_label: 'Volver',
      },
    },
  })

let playerStore: any
let tournamentStore: any
let routeName = 'jugadores'

describe('JugadoresForm', () => {
  beforeEach(() => {
    routeName = 'jugadores'
    playerStore = {
      steps: makeSteps(),
      dialog: ref(true),
      isEdition: ref(false),
      playerId: ref(1),
      $storeReset: vi.fn(),
      updatePlayer: vi.fn(() => Promise.resolve()),
      createPlayer: vi.fn(() => Promise.resolve(true)),
    }
    tournamentStore = {
      fetchTournamentsByLeagueId: vi.fn(() => Promise.resolve()),
    }

    mockNuxtImport('usePlayerStore', () => () => playerStore)
    mockNuxtImport('useTournamentStore', () => () => tournamentStore)
    mockNuxtImport('storeToRefs', () => (store: any) => store)
    mockNuxtImport('useRoute', () => () => ({ name: routeName }))
  })

  it('renders create title/subtitle and loads tournaments for admin flow', async () => {
    routeName = 'jugadores'
    const wrapper = await mountSuspended(JugadoresForm, {
      global: {
        stubs: {
          Dialog: {
            props: ['title', 'subtitle', 'modelValue', 'loading', 'iconName', 'width', 'persistent', 'showClose'],
            template:
              '<div data-testid="dialog" :data-title="title" :data-subtitle="subtitle" :data-persistent="persistent" :data-show-close="showClose"><slot name="v-card-text" /><slot name="actions" /></div>',
          },
          StepperContainer: { template: '<div data-testid="stepper"></div>' },
          'v-container': { template: '<div><slot /></div>' },
          'v-row': { template: '<div><slot /></div>' },
          'v-col': { template: '<div><slot /></div>' },
          'v-btn': { template: '<button><slot /></button>' },
        },
      },
    })

    const dialog = wrapper.find('[data-testid="dialog"]')
    expect(dialog.attributes('data-title')).toBe('Registrar jugador')
    expect(dialog.attributes('data-subtitle')).toBe('Completa los detalles del jugador.')
    expect(dialog.attributes('data-persistent')).toBe('false')
    expect(dialog.attributes('data-show-close')).toBe('true')
    expect(wrapper.find('[data-testid="stepper"]').exists()).toBe(true)
    expect(tournamentStore.fetchTournamentsByLeagueId).toHaveBeenCalled()
  })

  it('uses guest flow settings and emits registered on success', async () => {
    routeName = 'equipos-equipo-jugadores-inscripcion'
    const updateModel = vi.fn()
    const registered = vi.fn()

    const wrapper = await mountSuspended(JugadoresForm, {
      props: {
        modelValue: true,
        'onUpdate:modelValue': updateModel,
        onRegistered: registered,
      },
      global: {
        stubs: {
          Dialog: {
            props: ['title', 'subtitle', 'modelValue', 'loading', 'iconName', 'width', 'persistent', 'showClose'],
            template:
              '<div data-testid="dialog" :data-persistent="persistent" :data-show-close="showClose"><slot name="v-card-text" /><slot name="actions" /></div>',
          },
          StepperContainer: { template: '<div data-testid="stepper"></div>' },
          'v-container': { template: '<div><slot /></div>' },
          'v-row': { template: '<div><slot /></div>' },
          'v-col': { template: '<div><slot /></div>' },
          'v-btn': { template: `<button @click=\"$emit('click')\"><slot /></button>` },
        },
      },
    })

    const dialog = wrapper.find('[data-testid="dialog"]')
    expect(dialog.attributes('data-persistent')).toBe('true')
    expect(dialog.attributes('data-show-close')).toBe('false')
    expect(tournamentStore.fetchTournamentsByLeagueId).not.toHaveBeenCalled()

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')
    await flushPromises()

    expect(registered).toHaveBeenCalled()
    expect(updateModel).toHaveBeenCalledWith(false)
  })
})
