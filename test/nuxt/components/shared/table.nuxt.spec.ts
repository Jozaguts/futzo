import { describe, it, expect, vi, beforeAll } from 'vitest'
import { defineComponent, h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs } from '../../utils/vuetify-stubs'
import Table from '~/components/shared/Table.vue'

vi.mock('vuetify', () => ({
  useDisplay: () => ({ mobile: { value: false } }),
}))

const DataTableStub = defineComponent({
  name: 'VDataTable',
  props: {
    items: { type: Array, default: () => [] },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        { class: 'v-data-table' },
        (props.items as any[]).map((item, index) =>
          h('div', { class: 'row', key: index }, [slots['item.progress']?.({ item })])
        )
      )
  },
})

describe('Shared Table progress display', () => {
  beforeAll(() => {
    ensureVuetifyApp()
  })

  it('prioritizes games_progress over legacy progress label', async () => {
    const wrapper = await mountSuspended(Table, {
      props: {
        headers: [{ title: 'Progreso', value: 'progress' }],
        items: [
          {
            id: 1,
            name: 'Liga 1',
            games_progress: { label: '8/15', percent: 53, played: 8, total: 15 },
            progress: { label: '2/5', percent: 40 },
          },
        ],
        showFooter: false,
      },
      global: {
        stubs: {
          ...vuetifyStubs,
          InitialsAvatar: { template: '<div></div>' },
          'v-data-table': DataTableStub,
          'v-progress-linear': { template: '<div class="progress"></div>' },
          'v-divider': { template: '<div></div>' },
          'v-pagination': { template: '<div></div>' },
        },
      },
    })

    expect(wrapper.text()).toContain('8/15')
    expect(wrapper.text()).not.toContain('2/5')
  })

  it('falls back to legacy progress when games_progress is missing', async () => {
    const wrapper = await mountSuspended(Table, {
      props: {
        headers: [{ title: 'Progreso', value: 'progress' }],
        items: [
          {
            id: 2,
            name: 'Liga 2',
            progress: { label: '4/10', percent: 40 },
          },
        ],
        showFooter: false,
      },
      global: {
        stubs: {
          ...vuetifyStubs,
          InitialsAvatar: { template: '<div></div>' },
          'v-data-table': DataTableStub,
          'v-progress-linear': { template: '<div class="progress"></div>' },
          'v-divider': { template: '<div></div>' },
          'v-pagination': { template: '<div></div>' },
        },
      },
    })

    expect(wrapper.text()).toContain('4/10')
  })
})
