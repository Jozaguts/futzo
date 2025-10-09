<script lang="ts" setup>
  import VueDatePicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'
  import useCalendar from '~/composables/useCalendar'
  import type { DatePickerAttributes } from '~/models/Schedule'
  import { isDate } from 'date-fns'
  type VErrorProps = {
    'error-messages': string[]
  }
  const startDate = defineModel<Date | string>('start_date')
  const endDate = defineModel<Date | string>('end_date')
  const dates = ref<Date | Date[]>()
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
      type: Object as PropType<{
        top: number
        left: number
        transform: string
      }>,
      default: () => ({ top: 300, left: 200, transform: 'translate(50%)' }),
    },
    minDate: {
      type: Boolean,
      required: false,
    },
    maxDate: {
      type: Date,
      required: false,
    },
    'error-messages': {
      type: Object as PropType<VErrorProps>,
      required: false,
    },
  })
  const { getDate, formatDate, customPosition, selectDate, dp } = useCalendar()
  const emits = defineEmits(['start_date_updated', 'end_date_updated', 'update:modelValue'])
  const attr: DatePickerAttributes = {
    position: 'left',
    locale: 'es',
    teleport: true,
    'hide-input-icon': true,
    'enable-time-picker': false,
    'month-name-format': 'long',
    ref: dp,
    placeholder: 'Selecciona las fechas del torneo',
    ui: {
      input: 'v-field__input',
      menu: 'border rounded-lg',
      calendarCell: 'dp-custom-cell',
    },
  }
  if (props.multiCalendar) {
    attr['multi-calendars'] = { solo: true }
    attr.ui.menu += ' calendar-custom-width'
    attr.range = true
  }
  if (props.minDate) {
    attr['min-date'] = new Date()
  }
  if (props.maxDate) {
    attr['max-date'] = props.maxDate
  }
  watch(
    dates,
    (value) => {
      if (value) {
        if (isDate(value)) {
          startDate.value = value
          emits('start_date_updated', value)
        } else if (Array.isArray(value)) {
          startDate.value = value[0]
          emits('start_date_updated', value[0])
          endDate.value = value[1]
          emits('end_date_updated', value[1])
        }
      } else {
        startDate.value = undefined
        endDate.value = undefined
      }
    },
    { deep: true }
  )
  onMounted(() => {
    if (props.multiCalendar) {
      dates.value = [startDate.value, endDate.value]
    } else {
      if (startDate.value) {
        dates.value = startDate.value
      }
    }
  })
</script>
<template>
  <vue-date-picker
    @cleared="() => (dates = null)"
    :format="formatDate"
    v-bind="{ ...attr }"
    v-model="dates"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #dp-input="{ value }">
      <v-text-field :value="value" density="compact" variant="outlined" v-bind="props.errorMessages"></v-text-field>
    </template>
    <template v-if="multiCalendar" #action-preview="{ value }">
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
    <template v-if="multiCalendar" #action-buttons>
      <button @click="() => dp.closeMenu()" class="mx-2 bg-surface border-thin border-secondary px-4 py-1 rounded">
        Cancelar
      </button>
      <button class="bg-primary border-primary border-thin px-4 py-1 rounded" @click="selectDate">Aplicar</button>
    </template>
    <template v-if="!multiCalendar" #action-row="{ selectDate }">
      <div class="action-row w-100">
        <div class="d-flex mt-2 justify-space-between w-100">
          <button class="select-button" @click="dp.closeMenu()">cancelar</button>
          <button class="select-button" @click="selectDate">Aplicar</button>
        </div>
      </div>
    </template>
  </vue-date-picker>
</template>
<style lang="scss">
  @use '@/assets/css/vue-datepicker-custom.css';
</style>
