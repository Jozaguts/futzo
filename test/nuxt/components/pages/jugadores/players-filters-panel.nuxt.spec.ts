import {describe, expect, it} from 'vitest'
import {defineComponent} from 'vue'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import PlayersFiltersPanel from '~/components/pages/jugadores/players-filters-panel.vue'

const SearchInputStub = defineComponent({
  name: 'SearchInput',
  emits: ['searching'],
  template: '<button data-testid="search-stub" @click="$emit(\'searching\', \'carlos\')"></button>',
})

const VSelectStub = defineComponent({
  name: 'VSelect',
  props: {
    label: { type: String, required: true },
  },
  emits: ['update:modelValue'],
  template: `
    <button
      type="button"
      :data-testid="'select-' + label"
      @click="$emit('update:modelValue', label === 'Equipo' ? 7 : 'delantero')"
    />
  `,
})

describe('PlayersFiltersPanel', () => {
  it('emits model updates and search event', async () => {
    const wrapper = await mountSuspended(PlayersFiltersPanel, {
      props: {
        teamFilter: 'all',
        positionFilter: 'all',
        teamOptions: [
          { title: 'Todos los equipos', value: 'all' },
          { title: 'Aguilas FC', value: 7 },
        ],
        positionOptions: [
          { title: 'Todas las posiciones', value: 'all' },
          { title: 'Delantero', value: 'delantero' },
        ],
      },
      global: {
        stubs: {
          SearchInput: SearchInputStub,
          'v-select': VSelectStub,
        },
      },
    })

    await wrapper.find('[data-testid="search-stub"]').trigger('click')
    await wrapper.find('[data-testid="select-Equipo"]').trigger('click')
    await wrapper.find('[data-testid="select-Posición"]').trigger('click')

    expect(wrapper.emitted('search')?.[0]).toEqual(['carlos'])
    expect(wrapper.emitted('update:teamFilter')?.[0]).toEqual([7])
    expect(wrapper.emitted('update:positionFilter')?.[0]).toEqual(['delantero'])
  })
})
