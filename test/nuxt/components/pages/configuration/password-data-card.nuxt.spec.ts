import { beforeEach, describe, expect, it, vi } from 'vitest'
import { reactive, ref } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs } from '../../../utils/vuetify-stubs'
import PasswordDataCard from '~/components/pages/configuration/password-data-card.vue'

const updatePasswordMock = vi.fn()

const formValues = reactive({
  password: 'OldPass11!',
  new_password: 'NewPass11!',
  new_password_confirmation: 'NewPass11!',
})

mockNuxtImport('useAuthStore', () => () => ({
  user: { id: 99 },
  updatePassword: updatePasswordMock,
}))

mockNuxtImport('toTypedSchema', () => (schema: any) => schema)
mockNuxtImport('useForm', () => () => ({
  defineField: (field: keyof typeof formValues) => [ref(formValues[field]), {}],
  meta: ref({ valid: true, touched: true }),
  values: formValues,
  handleSubmit: (callback: (values: typeof formValues) => void) => () => callback({ ...formValues }),
  resetForm: vi.fn(),
}))

describe('PasswordDataCard', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    updatePasswordMock.mockClear()
  })

  it('submits password payload when clicking Guardar cambios', async () => {
    const wrapper = await mountSuspended(PasswordDataCard, {
      global: {
        stubs: {
          ...vuetifyStubs,
          BaseInput: { template: '<div><slot name="input" /></div>' },
          PasswordField: {
            props: ['modelValue'],
            emits: ['update:modelValue'],
            template: '<input type="password" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
          },
          'v-form': { template: '<form><slot /></form>' },
          'v-card-item': { template: '<div><slot /></div>' },
          'v-card-actions': { template: '<div><slot /></div>' },
        },
      },
    })

    await wrapper.get('button').trigger('click')

    expect(updatePasswordMock).toHaveBeenCalledWith({
      id: 99,
      password: 'OldPass11!',
      new_password: 'NewPass11!',
      new_password_confirmation: 'NewPass11!',
    })
  })
})
