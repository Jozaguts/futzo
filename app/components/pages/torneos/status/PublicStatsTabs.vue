<script setup lang="ts">
  import Goals from '~/components/pages/torneos/stats-tables/goals.vue'
  import Assistance from '~/components/pages/torneos/stats-tables/assistance.vue'
  import YellowCards from '~/components/pages/torneos/stats-tables/yellow-cards.vue'
  import RedCards from '~/components/pages/torneos/stats-tables/red-cards.vue'
  import type { PlayerStats } from '~/models/tournament'

  defineProps<{
    goals: PlayerStats[]
    assistance: PlayerStats[]
    yellowCards: PlayerStats[]
    redCards: PlayerStats[]
  }>()

  const tab = ref('goals')
</script>

<template>
  <v-tabs v-model="tab" density="compact">
    <v-tab value="goals">Goles</v-tab>
    <v-tab value="assistance">Asistencias</v-tab>
    <v-tab value="yellow">Tarjetas amarillas</v-tab>
    <v-tab value="red">Tarjetas rojas</v-tab>
  </v-tabs>
  <v-divider class="mb-4" />
  <v-tabs-window v-model="tab">
    <v-tabs-window-item value="goals">
      <Goals :player-stats="goals" />
    </v-tabs-window-item>
    <v-tabs-window-item value="assistance">
      <Assistance :player-stats="assistance" />
    </v-tabs-window-item>
    <v-tabs-window-item value="yellow">
      <YellowCards :player-stats="yellowCards" />
    </v-tabs-window-item>
    <v-tabs-window-item value="red">
      <RedCards :player-stats="redCards" />
    </v-tabs-window-item>
  </v-tabs-window>
</template>
