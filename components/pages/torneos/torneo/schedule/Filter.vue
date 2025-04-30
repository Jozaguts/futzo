<script lang="ts" setup>
import type {RoundStatus} from "~/models/Schedule";
import {useScheduleStore} from "~/store/useScheduleStore";

const {schedulePagination} = storeToRefs(useScheduleStore());
const changeHandler = async (value?: RoundStatus) => {
  useScheduleStore().schedulePagination.currentPage = 1
  useScheduleStore().schedules.rounds = []
  if (value?.length) {
    return useScheduleStore().getTournamentSchedules()
  } else {
    useScheduleStore().schedulePagination.filterBy = undefined
    await useScheduleStore().getTournamentSchedules()
  }
}
</script>
<template>
  <v-select
      max-width="220"
      min-width="220"
      label="Jornadas"
      class="app-bar-secondary-btn mr-4"
      item-title="text"
      density="compact"
      item-value="value"
      v-model="schedulePagination.filterBy"
      variant="outlined"
      hide-selected
      clearable
      @update:model-value="changeHandler"
      :items="[
      { value: 'programado', text: 'Programadas' },
      { value: 'en_progreso', text: 'En progreso' },
      { value: 'completado', text: 'Completadas' },
      { value: 'aplazado', text: 'Aplazadas' },
      { value: 'cancelado', text: 'Canceladas' },
    ]"
  >
    <template v-slot:item="{ props: itemProps, item }">
      <v-list-item v-bind="itemProps"></v-list-item>
    </template>
    <template #selection="{item,index}">
      <span class="app-bar-secondary-btn__input_text ">
         <v-chip v-if="index < 1">
           {{ item.title }} {{ schedulePagination?.search?.length - 1 ? `+${schedulePagination?.search?.length - 1}` : '' }}
         </v-chip>
        <span
            v-if="index === 1"
            class="text-grey text-caption align-self-center"
        >

      </span>
      </span>
    </template>
  </v-select>
</template>
<style></style>
