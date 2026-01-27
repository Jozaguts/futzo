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
      <v-card> </v-card>
    </v-col>
  </v-row>
</template>
