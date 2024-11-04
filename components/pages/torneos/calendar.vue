<script lang="ts" setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const dates = ref([] as Date[]);
const emits = defineEmits(["selected-dates"]);
const dp = ref();
type DatePosition = 1 | 2;
const getDate = (value: Date | Date[] | null, index: DatePosition) => {
  if (!value) return;
  const dates = (value as Date[]).map((date) => formatDate(date));
  return dates[index - 1];
};
const selectDate = () => {
  dp.value.selectDate();
  emits("selected-dates", dates.value);
};
const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleDateString("es-MX", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const customPosition = (
  inputElement?: HTMLElement,
): {
  top: number | string;
  left: number | string;
  transform?: string;
} => {
  const inputRect = inputElement?.getBoundingClientRect() as DOMRect;
  return {
    top: inputRect.top - 300,
    left: inputRect.left - 200,
    transform: "translate(50%)",
  };
};
const setDatesFromRequest = (_dates: Date[]) => {
  dates.value = _dates;
};
defineExpose({
  setDatesFromRequest,
});
</script>
<template>
  <vue-date-picker
    ref="dp"
    v-model="dates"
    position="left"
    range
    utc
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
      menu: 'border rounded-lg',
      calendarCell: 'dp-custom-cell',
    }"
    placeholder="Selecciona las fechas del torneo"
  >
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
      <button
        @click="() => dp.closeMenu()"
        class="mx-2 bg-surface border-thin border-secondary px-4 py-1 rounded"
      >
        Cancelar
      </button>
      <button
        class="bg-primary border-primary border-thin px-4 py-1 rounded"
        @click="selectDate"
      >
        Aplicar
      </button>
    </template>
  </vue-date-picker>
</template>
<style>
.custom-field-date {
  min-width: 122px;
  min-height: 38px;
}

.dp-custom-cell {
  border-radius: 50%;
}

.dp__today {
  border: 1px solid #9155fd;
}

.dp__active_date {
  background-color: #9155fd;
  color: white;
}

.dp__range_end,
.dp__range_start,
.dp__active_date {
  background: #9155fd;
}

.dp__menu.dp__menu_index {
  width: 600px !important;
}

:root {
  --dp-button-height: 70px; /*Size for buttons in overlays*/
  --dp-month-year-row-height: 70px; /*Height of the month-year select row*/
  --dp-month-year-row-button-size: 70px;
  --dp-cell-size: 40px; /*Width and height of calendar cell*/
  --dp-cell-padding: 5px; /*Padding in the cell*/
  --dp-common-padding: 10px; /*Common padding used*/
  --dp-input-icon-padding: 35px;
  --dp-button-icon-height: 15px; /*Icon sizing in buttons*/

  --dp-input-padding: 6px 30px 6px 12px; /*Padding in the input*/
  --dp-menu-min-width: 260px; /*Adjust the min width of the menu*/
  --dp-action-buttons-padding: 2px 5px; /*Adjust padding for the action buttons in action row*/
  --dp-row-margin: 10px 0; /*Adjust the spacing between rows in the calendar*/
  --dp-calendar-header-cell-padding: 1rem; /*Adjust padding in calendar header cells*/
  --dp-two-calendars-spacing: 10px; /*Space between multiple calendars*/
  --dp-overlay-col-padding: 3px; /*Padding in the overlay column*/
  --dp-time-inc-dec-button-size: 32px; /*Sizing for arrow buttons in the time picker*/
  --dp-menu-padding: 12px 16px; /*Menu padding*/
}
</style>
