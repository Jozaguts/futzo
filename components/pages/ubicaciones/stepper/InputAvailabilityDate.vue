<script lang="ts" setup>
import type {Day, IntervalValue} from '~/models/Location'
import type {Label, WeekDay} from '~/models/Schedule'

const props = defineProps({
  day: {
    type: Object as PropType<Day>,
    required: true,
  },
  label: {
    type: String as PropType<Label>,
    required: true,
  },
  id: {
    type: String as PropType<WeekDay>,
    required: true,
  },
})
const selected = ref<IntervalValue[]>([])
const selectableValues = computed<IntervalValue[]>(() =>
    props.day.intervals
        .filter(i => !i.disabled)
        .map(i => i.value)
)
const allSelected = computed<boolean>({
  get: () =>
      selected.value.length > 0 &&
      selected.value.length === selectableValues.value.length,
  set(value) {
    if (value) {
      // marcar todos
      selected.value = [...selectableValues.value]
    } else {
      // desmarcar todos
      selected.value = []
    }
  }
})
watch(selected, newSlots => {
  emits('input-date-changed', {id: props.id, value: newSlots})
})
const emits = defineEmits<{
  (e: 'input-date-changed', payload: { id: WeekDay; value: IntervalValue[] }): void
  (e: 'day-disabled', id: WeekDay): void
}>()

const dayDisabledHandler = () => {
  emits('day-disabled', props.id)
}
</script>
<template>
  <v-container class="pa-0 pb-1">
    <v-row no-gutters>
      <v-col cols="12" class="pr-2 pt-2">
        <v-card class="futzo-rounded">
          <v-card-title> {{ props.label }}</v-card-title>
          <v-card-subtitle>Horas disponibles {{ props.day.available_range }}</v-card-subtitle>
          <v-card-text>
            <v-switch v-model="allSelected"
                      label="Todo el día"></v-switch>
            <v-chip-group
                column
                multiple
                selected-class="text-primary"
                v-model="selected"
            >
              <v-chip
                  v-for="(interval, index) in props.day.intervals"
                  :key="index"
                  filter
                  :value="interval.value"
                  :disabled="interval.disabled"
                  class="ma-1"
                  :text="interval.text"
              >
              </v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
