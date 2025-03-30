<script lang="ts" setup>
import {useTournamentStore} from "~/store";
import NoCalendarSvg from "~/components/pages/torneos/NoCalendarSvg.vue";

const {scheduleDialog, isLoadingSchedules, noSchedules} = storeToRefs(useTournamentStore());
const textButton = computed(() => {
  if (isLoadingSchedules.value) return "Cargando...";
  return "Crear calendario";
});
const dialogHandler = async () => {
  await useTournamentStore()
      .settingsSchedule()
  scheduleDialog.value = !scheduleDialog.value;
};
</script>
<template>
  <v-sheet
      v-if="noSchedules"
      class="custom-v-sheet d-flex justify-center align-center fill-height"
  >
    <div class="d-flex flex-column align-center">
      <h2 class="card-title">No hay calendario aún</h2>
      <NoCalendarSvg/>
      <p class="card-sub-title">Crea un calendario para verlo aquí.</p>
      <v-btn
          color="primary"
          variant="elevated"
          class="mt-4 text-body-1"
          @click="dialogHandler"
      >
        {{ textButton }}
      </v-btn>
    </div>
  </v-sheet>
</template>
