<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <v-skeleton-loader v-if="pending" type="heading,table-row-divider@3"></v-skeleton-loader>
        <TournamentCard v-else/>
      </v-col>
      <v-col cols="12" md="6" lg="6">
      </v-col>
      <v-col cols="12" md="3" lg="3">
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import TournamentCard from "~/components/pages/torneos/tournament-card.vue";
import {useTournamentStore} from "~/store";
const tournamentStore = useTournamentStore();
const pending = ref(true);

onMounted(async () => {
  await tournamentStore.loadTournaments();
  pending.value = false
});

</script>