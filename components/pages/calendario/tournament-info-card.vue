<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useTournamentStore} from "~/store";
import {useScheduleStore} from "~/store/useScheduleStore";
const {teamsCount, roundsCount, matchesCount,tournaments,matchesByRound} = storeToRefs(useTournamentStore())
const {scheduleParams} = storeToRefs(useScheduleStore())
const showInfoCard = computed(() => scheduleParams.value.leagueId && scheduleParams.value.tournamentId)
watch(() => scheduleParams.value.tournamentId, async(newValue) => {
  if (newValue) {
    const tournament = tournaments.value.find((tournament): any => tournament.id === newValue)
    teamsCount.value  = tournament.teams_count
    roundsCount.value  =  tournament.teams_count - 1
    matchesCount.value  = Math.abs(roundsCount.value * (tournament.teams_count / 2))
    matchesByRound.value = Math.abs(teamsCount.value / 2)
  }
})
</script>
<template>
  <v-card v-auto-animate>
    <v-card-text v-if="showInfoCard">
      eliminar torunament info card
<!--      <div class="d-flex flex-column ">-->
<!--        <div class="d-flex">-->
<!--          <p class="flex-1-1 text-body-1 text-capitalize">Equipos registrados: </p> <span class=" text-body-1">{{teamsCount}}</span>-->
<!--        </div>-->
<!--        <div class="d-flex">-->
<!--          <p class="flex-1-1 text-body-1 text-capitalize">Jornadas: </p> <span class=" text-body-1">{{roundsCount}}</span>-->
<!--        </div>-->
<!--        <div class="d-flex">-->
<!--          <p class="flex-1-1 text-body-1 text-capitalize">Partidos por jornada: </p> <span class="text-body-1">{{matchesByRound}}</span>-->
<!--        </div>-->
<!--        <div class="d-flex">-->
<!--          <p class="flex-1-1 text-body-1 text-capitalize">Total de Partidos: </p> <span class="text-body-1">{{matchesCount}}</span>-->
<!--        </div>-->
<!--      </div>-->
    </v-card-text>
  </v-card>
</template>