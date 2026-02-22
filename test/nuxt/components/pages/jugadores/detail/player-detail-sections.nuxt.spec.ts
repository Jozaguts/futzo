import {describe, expect, it} from 'vitest'
import {defineComponent} from 'vue'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import type {DetailSectionConfig, EditableFields} from '~/composables/players/usePlayerDetailPage'
import PlayerDetailSections from '~/components/pages/jugadores/detail/player-detail-sections.vue'

const VBtnStub = defineComponent({
  emits: ['click'],
  template: '<button data-testid="toggle-section" @click="$emit(\'click\')"><slot /></button>',
})

const VTextFieldStub = defineComponent({
  emits: ['update:modelValue'],
  template: '<button data-testid="text-field" @click="$emit(\'update:modelValue\', \'valor\')"></button>',
})

const VSelectStub = defineComponent({
  emits: ['update:modelValue'],
  template: '<button data-testid="select-field" @click="$emit(\'update:modelValue\', 3)"></button>',
})

describe('PlayerDetailSections', () => {
  it('emits section toggle and field updates', async () => {
    const sections: DetailSectionConfig[] = [
      {
        id: 'basic',
        title: 'Información básica',
        description: 'Descripción',
        items: [
          { label: 'Nombre', field: 'name' },
          { label: 'Posición', field: 'position_id', type: 'select' },
        ],
      },
    ]

    const editableFields: EditableFields = {
      name: 'Carlos',
      last_name: '',
      birthdate: '',
      nationality: '',
      curp: '',
      is_minor: '',
      team_name: '',
      category_name: '',
      position_id: 1,
      number: '',
      height: '',
      weight: '',
      dominant_foot: '',
      medical_notes: '',
      email: '',
      phone: '',
      notes: '',
      guardian_name: '',
      guardian_email: '',
      guardian_phone: '',
      guardian_relationship: '',
    }

    const wrapper = await mountSuspended(PlayerDetailSections, {
      props: {
        detailSections: sections,
        positions: [{ id: 1, name: 'Delantero' }] as any,
        editableFields,
        isSectionEditing: () => true,
        isSectionSaving: () => false,
        canSectionBeEdited: () => true,
        isItemEditable: () => true,
        getFieldDisplayValue: () => 'Carlos',
      },
      global: {
        stubs: {
          'v-card': { template: '<div><slot /></div>' },
          'v-btn': VBtnStub,
          'v-text-field': VTextFieldStub,
          'v-select': VSelectStub,
        },
      },
    })

    await wrapper.find('[data-testid="toggle-section"]').trigger('click')
    await wrapper.find('[data-testid="text-field"]').trigger('click')
    await wrapper.find('[data-testid="select-field"]').trigger('click')

    expect(wrapper.emitted('toggle-section')?.[0]).toEqual(['basic'])
    expect(wrapper.emitted('update-field')?.[0]).toEqual([{ field: 'name', value: 'valor' }])
    expect(wrapper.emitted('update-field')?.[1]).toEqual([{ field: 'position_id', value: 3 }])
  })
})
