<script lang="ts" setup>
  import VueDatePicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'
  import { formatDate } from '~//utils/dateCalendarValidation'

  const dates = defineModel<Date[]>('dates')
  const props = defineProps({
    paddingBottom: {
      type: String,
      required: false,
    },
    paddingTop: {
      type: String,
      required: false,
    },
    multiCalendar: {
      type: Boolean,
      default: () => false,
    },
    positionValues: {
      type: Object as PropType<{ top: number; left: number; transform: string }>,
      default: () => ({ top: 300, left: 200, transform: 'translate(50%)' }),
    },
  })
  const emits = defineEmits(['selected-dates'])
  const dp = ref()
  type DatePosition = 1 | 2
  const getDate = (value: Date | Date[] | null, index: DatePosition) => {
    if (!value) return
    const dates = (value as Date[]).map((date) => formatDate(date))
    return dates[index - 1]
  }
  const selectDate = () => {
    dp.value.selectDate()
    emits('selected-dates', dates.value)
  }
  const customPosition = (
    inputElement?: HTMLElement
  ): {
    top: number | string
    left: number | string
    transform?: string
  } => {
    const inputRect = inputElement?.getBoundingClientRect() as DOMRect
    return {
      top: inputRect.top - props.positionValues.top,
      left: inputRect.left - props.positionValues.left,
      transform: props.positionValues.transform,
    }
  }
</script>
<template>
  <vue-date-picker
    ref="dp"
    v-model="dates"
    position="left"
    :range="props.multiCalendar"
    :format="formatDate"
    locale="es"
    :teleport="true"
    :min-date="new Date()"
    :multi-calendars="{ solo: true }"
    hide-input-icon
    :enable-time-picker="false"
    month-name-format="long"
    :alt-position="customPosition"
    :ui="{
      input: 'v-field__input',
      menu: 'border rounded-lg calendar-custom-width',
      calendarCell: 'dp-custom-cell',
    }"
    placeholder="Selecciona las fechas del torneo"
  >
    <template #dp-input="{ value }">
      <v-text-field :value="value" density="compact" variant="outlined"></v-text-field>
    </template>
    <template #action-preview="{ value }">
      <div class="d-flex w-100 justify-between align-center">
        <span
          class="custom-field-date border-thin border-secondary border-opacity-100 px-4 py-2 mr-2 rounded text-body-2"
          >{{ getDate(value, 1) }}</span
        >
        <span>-</span>
        <span
          class="custom-field-date border-thin border-secondary border-opacity-100 px-4 py-2 ml-2 rounded text-body-2"
          >{{ getDate(value, 2) }}</span
        >
      </div>
    </template>
    <template #action-buttons>
      <button @click="() => dp.closeMenu()" class="mx-2 bg-surface border-thin border-secondary px-4 py-1 rounded">
        Cancelar
      </button>
      <button class="bg-primary border-primary border-thin px-4 py-1 rounded" @click="selectDate">Aplicar</button>
    </template>
  </vue-date-picker>
</template>
<style lang="scss">
  @use '@/assets/css/vue-datepicker-custom.css';

  .dp__input_wrap > .v-input > .v-input__control > .v-field > .v-field__field > input.v-field__input {
    padding-top: v-bind(paddingTop);
    padding-bottom: v-bind(paddingBottom);
  }
</style>
