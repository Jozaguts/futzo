<script lang="ts" setup>
import { useTournamentStore } from "~/store";
import NoCalendarSvg from "~/components/pages/torneos/NoCalendarSvg.vue";

const { noTournaments, dialog } = storeToRefs(useTournamentStore());
</script>
<template>
  <v-sheet
    class="custom-v-sheet d-flex justify-center align-center fill-height"
  >
    <div class="d-flex flex-column align-center">
      <h2 class="card-title">No hay calendario aún</h2>
      <NoCalendarSvg />
      <p class="card-sub-title">Crea un calendario para verlo aquí.</p>
      <v-btn
        color="primary"
        variant="elevated"
        class="mt-4 text-body-1"
        @click="dialog = !dialog"
      >
        Crear Calendario
      </v-btn>
    </div>
  </v-sheet>
</template>
