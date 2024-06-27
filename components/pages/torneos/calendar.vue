<script lang="ts" setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css'
const date = ref();
const emits = defineEmits(['selected-dates'])
const dp = ref();
const getDate = (value, index) => {
  let dates = []
  if (!value) return
  if (value.length === 1){
    const date = formatDate(value[0])
    dates.push(date)

    dates.push()
  }else if (value.length === 2){
    const date1 = formatDate(value[0])
    const date2 = formatDate(value[1])
    dates.push(date1)
    dates.push(date2)
  }
  return dates[index -1]
}
const selectDate = () => {
  dp.value.selectDate()
  emits('selected-dates', date.value)
}
const formatDate = (date) => {
  const day = date.getDate();
  const month = date.toLocaleDateString('es-MX', { month: 'short' });
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`
}

const customPosition = (inputElement) => {
  const inputRect = inputElement.getBoundingClientRect();
  return { top: inputRect.top -60 , left: inputRect.left -100 , transform: 'translate(50%)' }
}

</script>
<template>
  <VueDatePicker
      ref="dp"
      v-model="date"
      position="left"
      range
      utc
      locale="es"
      :teleport="true"
      :min-date="new Date()"
      :multi-calendars="{solo: true}"
      hide-input-icon
      :enable-time-picker="false"
      month-name-format="long"
      :alt-position="customPosition"
      input-class-name="v-field__input"
      menu-class-name=" border rounded-lg"
      calendar-cell-class-name="dp-custom-cell"
      placeholder=" Selecciona las fechas del torneo"

  >
    <template #action-preview="{value}">
      <div class="d-flex w-100  justify-between align-center" v-if="value">
        <span  class="border-thin border-secondary border-opacity-100  px-4 py-2 mr-2 rounded text-body-2">{{getDate(value,1)}}</span>
        <span>-</span>
        <span class="border-thin border-secondary border-opacity-100  px-4 py-2 ml-2 rounded text-body-2">{{getDate(value,2)}}</span>
      </div>
    </template>
    <template #action-buttons>
      <v-btn variant="outlined" color="secondary" class="mx-2">Cancelar</v-btn>
      <v-btn color="primary" variant="elevated" @click="selectDate">Aceptar</v-btn>
    </template>
  </VueDatePicker>
</template>
<style>
.dp-custom-cell{
  border-radius: 50%;
}
.dp__today {
  border: 1px solid #9155FD
}
.dp__active_date {
  background-color: #9155FD;
  color: white;
}
.dp__range_end, .dp__range_start, .dp__active_date{
  background: #9155FD;
}
:root{
  --dp-menu-width: 800px !important;
}
</style>