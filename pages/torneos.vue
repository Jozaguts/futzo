<script lang="ts" setup>
// todo esto queda en pausa hasta tener terminado la generacion de los partiods y equipos
// todo hacer la logica para generar los partidos
import TournamentCard from "~/components/pages/torneos/tournament-card.vue";
import GamesCard from "~/components/pages/torneos/games-card.vue";
import StandingTable from "~/components/pages/torneos/standing-table.vue";
import {useTournamentStore} from "~/store";
import {storeToRefs} from "pinia";
const tournamentStore = useTournamentStore();
const { currentGames, nextGames} = storeToRefs(tournamentStore);

onMounted(async () => {
  await tournamentStore.loadTournaments();
});

</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3" lg="3" class="d-flex flex-column justify-space-between">
        <TournamentCard class="mb-5 "/>
        <GamesCard :items="currentGames" height="380" title="Jornada en curso"/>
      </v-col>
      <v-col cols="12" md="6" lg="6">
      <StandingTable />
      </v-col>
      <v-col cols="12" md="3" lg="3">
        <GamesCard :items="nextGames"  height="700px" title="Próximos partidos"/>
      </v-col>
    </v-row>
  </v-container>
</template>
