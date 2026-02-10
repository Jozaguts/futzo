import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref, nextTick } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import Page from '~/pages/equipos/[equipo]/jugadores/inscripcion.vue'

const team = ref({ id: 1, name: 'Tigres FC' })
const initPreRegister = vi.fn(() => Promise.resolve())
const routerPush = vi.fn()
const routerReplace = vi.fn()

describe('Team player pre-register page', () => {
  beforeEach(() => {
    team.value = { id: 1, name: 'Tigres FC' }
    initPreRegister.mockClear()
    routerPush.mockClear()
    routerReplace.mockClear()

    mockNuxtImport('useTeamStore', () => () => ({ team, initPreRegister }))
    mockNuxtImport('storeToRefs', () => (store: any) => store)
    mockNuxtImport('useRoute', () => () => ({ params: { equipo: 'tigres-fc' } }))
    mockNuxtImport('useRouter', () => () => ({ push: routerPush, replace: routerReplace }))
  })

  it('shows success message after registered', async () => {
    const wrapper = await mountSuspended(Page, {
      global: {
        stubs: {
          ClientOnly: { template: '<div><slot /></div>' },
          JugadoresForm: {
            emits: ['registered', 'update:modelValue'],
            template: '<button data-testid="register" @click="$emit(\'registered\')">register</button>',
          },
          'v-container': { template: '<div><slot /></div>' },
          'v-row': { template: '<div><slot /></div>' },
          'v-col': { template: '<div><slot /></div>' },
          'v-card': { template: '<div><slot /></div>' },
          'v-card-text': { template: '<div><slot /></div>' },
          'v-card-actions': { template: '<div><slot /></div>' },
          'v-btn': { template: '<button @click="$emit(\'click\')"><slot /></button>' },
        },
      },
    })

    expect(initPreRegister).toHaveBeenCalledWith('tigres-fc')
    expect(wrapper.find('[data-testid="pre-register-success"]').exists()).toBe(false)

    await wrapper.find('[data-testid="register"]').trigger('click')
    await nextTick()

    expect(wrapper.find('[data-testid="pre-register-success"]').exists()).toBe(true)

    await wrapper.find('[data-testid="pre-register-finish"]').trigger('click')
    expect(routerPush).toHaveBeenCalledWith({ name: 'login' })
  })
})
