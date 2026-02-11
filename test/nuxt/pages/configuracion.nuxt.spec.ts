import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs } from '../utils/vuetify-stubs'
import ConfiguracionPage from '~/pages/configuracion.vue'

const toast = vi.fn()

vi.mock('~/composables/useToast', () => ({
  useToast: () => ({ toast }),
}))

mockNuxtImport('useAuthStore', () => () => ({
  user: ref({
    name: 'Sagid',
    email: 'admin@futzo.io',
    is_operational: true,
  }),
}))

mockNuxtImport('useRoute', () => () => ({
  query: {},
}))

vi.mock('vuetify', () => ({
  useDisplay: () => ({ mobile: ref(false) }),
}))

const VListItemStub = defineComponent({
  name: 'StubVListItem',
  props: {
    title: { type: String, default: '' },
    active: { type: Boolean, default: false },
  },
  emits: ['click'],
  setup(props, { emit, attrs }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          class: ['v-list-item', props.active ? 'v-list-item--active' : null],
          onClick: (event: MouseEvent) => emit('click', event),
        },
        props.title
      )
  },
})

describe('Configuracion page', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    toast.mockReset()
  })

  it('renders disciplina section and mounts the discipline settings card', async () => {
    const wrapper = await mountSuspended(ConfiguracionPage, {
      global: {
        stubs: {
          ...vuetifyStubs,
          PageLayout: { template: '<div><slot name="default" /></div>' },
          TransitionFade: { template: '<div><slot /></div>' },
          Avatar: { template: '<div />' },
          PersonalDataCard: { template: '<div data-testid="personal-card" />' },
          Plans: { template: '<div />' },
          TournamentsSettingsCard: { template: '<div />' },
          PlayersSettingsCard: { template: '<div />' },
          DisciplineSettingsCard: { template: '<div data-testid="discipline-settings-card" />' },
          LazyPagesConfigurationPasswordDataCard: { template: '<div />' },
          'v-list': { template: '<div><slot /></div>' },
          'v-list-item': VListItemStub,
          'v-divider': { template: '<hr />' },
          'v-icon': { template: '<i />' },
          'v-btn-toggle': { template: '<div><slot /></div>' },
          'v-sheet': { template: '<div><slot /></div>' },
        },
      },
    })

    const disciplinaButton = wrapper.findAll('button').find((item) => item.text() === 'Disciplina')
    expect(disciplinaButton).toBeTruthy()

    await disciplinaButton?.trigger('click')
    expect(wrapper.find('[data-testid="discipline-settings-card"]').exists()).toBe(true)
  })
})
