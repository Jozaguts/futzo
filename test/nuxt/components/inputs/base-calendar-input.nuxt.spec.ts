import {beforeAll, describe, expect, it, vi} from 'vitest'
import {defineComponent, h, ref} from 'vue'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import {ensureVuetifyApp, vuetifyStubs} from '../../utils/vuetify-stubs'

vi.mock('@vuepic/vue-datepicker', () => ({
  VueDatePicker: defineComponent({
    name: 'StubDatePicker',
    props: {
      modelValue: { type: null, default: undefined },
    },
    setup(props) {
      const status = props.modelValue == null ? 'empty' : 'filled'
      return () => h('div', { 'data-model': status })
    },
  }),
}))

let BaseCalendarInput: any

describe('BaseCalendarInput', () => {
  beforeAll(async () => {
    ensureVuetifyApp()
    BaseCalendarInput = (await import('~/components/inputs/forms/BaseCalendarInput.vue')).default
  })

  const mountComponent = async (template: string) =>
    mountSuspended(
      {
        components: { BaseCalendarInput },
        template,
        setup() {
          const start = ref<Date | undefined>()
          const end = ref<Date | undefined>()
          return { start, end }
        },
      },
      {
        global: {
          stubs: {
            ...vuetifyStubs,
            'v-text-field': { template: '<div></div>' },
          },
        },
      }
    )

  it('starts empty when startEmpty is true', async () => {
    const wrapper = await mountComponent('<BaseCalendarInput v-model:start_date="start" v-model:end_date="end" start-empty />')

    expect(wrapper.find('[data-model="empty"]').exists()).toBe(true)
  })

  it('defaults to filled when startEmpty is false', async () => {
    const wrapper = await mountComponent('<BaseCalendarInput v-model:start_date="start" v-model:end_date="end" />')

    expect(wrapper.find('[data-model="filled"]').exists()).toBe(true)
  })
})
