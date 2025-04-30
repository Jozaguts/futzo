<script lang="ts" setup>
import {useScheduleStore} from "~/store";

const {getTournamentSchedules} = useScheduleStore()
const {schedulePagination, schedules} = storeToRefs(useScheduleStore());

const searchHandler = useDebounceFn((value: string) => {
  schedules.value.rounds = [];
  schedulePagination.value.search = value
  schedulePagination.value.currentPage = 1
  getTournamentSchedules()
}, 500)

</script>
<template>
  <v-text-field v-model="schedulePagination.search" min-width="300" append-inner-icon="mdi-magnify" label="Buscar un equipo..." @update:model-value=" searchHandler"></v-text-field>
</template>
