<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  const { matchesByRound } = storeToRefs(useTournamentStore())
  const daysToPlayToCols = ref([])
  const gamesAlreadyTaken = computed(() => {
    return daysToPlayToCols.value.reduce((acc, day) => Number(acc) + Number(day.value), 0)
  })
  const remainingGames = computed(() => {
    return matchesByRound.value - gamesAlreadyTaken.value
  })
  const maxForDay = (day) => {
    return matchesByRound.value - gamesAlreadyTaken.value + Number(day.value)
  }
</script>
<template>
  <v-row>
    <v-col cols="6">
      <v-card>
        eliminar days-to-play-form
        <!--        <v-card-title>-->
        <!--          <h3  class="text-body-1">Partidos por jornada: {{matchesByRound}}</h3>-->
        <!--          <h3  class="text-body-1">Partidos por dia</h3>-->
        <!--        </v-card-title>-->
        <!--        <v-card-text>-->

        <!--         <v-card variant="plain">-->
        <!--           <v-container>-->
        <!--             <v-row>-->
        <!--             </v-row>-->
        <!--           </v-container>-->
        <!--         </v-card>-->
        <!--        </v-card-text>-->
      </v-card>
    </v-col>
  </v-row>
</template>
