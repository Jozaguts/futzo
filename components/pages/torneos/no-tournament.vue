<script lang="ts" setup>
import { useTournamentStore } from "~/store";
import NoTournamentsSvg from "~/components/pages/torneos/NoTournamentsSvg.vue";

const { noTournaments, dialog } = storeToRefs(useTournamentStore());
</script>
<template>
  <v-sheet
    v-if="noTournaments"
    height="100%"
    class="custom-v-sheet d-flex justify-center align-center mx-10"
  >
    <div class="d-flex flex-column align-center">
      <h2 class="card-title">No hay torneos aún</h2>
      <NoTournamentsSvg />
      <p class="card-sub-title">Crea un torneo para verlo aquí.</p>
      <v-btn
        color="primary"
        variant="elevated"
        class="mt-4 text-body-1"
        @click="dialog = !dialog"
      >
        Crear Torneo
      </v-btn>
    </div>
  </v-sheet>
</template>
