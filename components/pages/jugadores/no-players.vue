<script lang="ts" setup>
import { usePlayerStore } from "~/store";
import NoPlayersSVG from "~/components/pages/jugadores/NoPlayersSvg.vue";

const { dialog, players, noPlayers } = storeToRefs(usePlayerStore());
const toggleDialog = () => {
  dialog.value = !dialog.value;
};
</script>
<template>
  <v-sheet
    v-if="noPlayers"
    width="calc(100% - 80px)"
    max-height="calc(100% - 60px)"
    class="custom-v-sheet d-flex justify-center align-center fill-height mx-auto mt-10"
  >
    <div class="d-flex flex-column align-center">
      <h2 class="card-title">No hay jugadores aún</h2>
      <NoPlayersSVG />
      <p class="card-sub-title">Crea un jugador para verlo aquí.</p>
      <v-btn
        color="primary"
        variant="elevated"
        class="mt-4 text-body-1"
        @click="toggleDialog"
      >
        Crear jugador
      </v-btn>
    </div>
  </v-sheet>
</template>
<style>
.card-title {
  color: #111927;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
}
.card-sub-title {
  color: #1f2a37;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}
</style>
