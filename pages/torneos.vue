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

// get de height fo .grid-tournament-details
const tournamentCardRef = ref<HTMLElement | null>(null);
const tournamentCardHeight = ref<number>(0);
const currentGamesRef = ref<HTMLElement | null>(null);
const currentGamesHeight = ref<number>(0);
const standingRef = ref<HTMLElement | null>(null);
const standingHeight = ref<number>(0);
const nextGamesHeight = ref<number>(0);



watchEffect(() => {
 if (tournamentCardRef.value) {
   tournamentCardHeight.value = tournamentCardRef.value.clientHeight
 }
 if (currentGamesRef.value && currentGamesRef.value.clientHeight > 0) {
   currentGamesHeight.value = currentGamesRef.value.clientHeight
 }else {
    currentGamesHeight.value = 600
 }
 if (standingRef.value) {
   console.log(standingRef.value.clientHeight)
   console.log(tournamentCardHeight.value + currentGamesHeight.value)
   standingHeight.value = standingRef.value.clientHeight
 }
})

onMounted(async () => {
  await tournamentStore.loadTournaments();
});
</script>
<template>
  <div class="grid-tournament-container">
    <TournamentCard
        max-height="300"
        max-width="400"
        class="grid-tournament-details"
    />
    <GamesCard class="grid-tournament-current-games"
               max-height="520"
               max-width="100%"
               :items="currentGames"
               title="Jornada en curso"
               scroll-height="400"
    />
    <StandingTable
        class="grid-tournament-standing-table"
        max-height="830"
        max-width="100%"
        scroll-height="620"
    />
    <GamesCard
        :items="nextGames"
        title="Próximos partidos"
        max-height="830"
        max-width="900"
        scroll-height="700"
        class="grid-tournament-next-games"
    />
  </div>

</template>
<style >
.grid-tournament-container {
  display: grid;
  height: 100%;
  width: 100%;
  padding: 1rem;
  justify-items: stretch;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2,300px);
  grid-auto-flow: row;
  gap: 10px 10px;
  grid-template-areas:
    "details standing-table standing-table next-games"
    "current-games standing-table standing-table next-games"
    "current-games standing-table standing-table next-games";
}
@media (max-width: 600px) {
  .grid-tournament-container{
    display: flex;
    flex-direction: column;
  }
  .grid-tournament-details {
   order: 1;
  }

  .grid-tournament-current-games {
    order: 3
  }

  .grid-tournament-standing-table {
    order: 2;
  }

  .grid-tournament-next-games {
    order: 4;
  }
}

.grid-tournament-details {
  grid-area: details;
}

.grid-tournament-current-games {
  grid-area: current-games;
}

.grid-tournament-standing-table {
  grid-area: standing-table;
}

.grid-tournament-next-games {
  grid-area: next-games;
}

</style>
