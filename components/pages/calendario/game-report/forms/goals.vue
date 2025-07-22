<script setup lang="ts">
  import GameDetailsSection from '~/components/pages/calendario/game-report/game-details-section.vue'
  import { useGameStore } from '~/store'
  const { game } = storeToRefs(useGameStore())
</script>
<template>
  <v-container>
    <v-row>
      <GameDetailsSection :game />
    </v-row>
  </v-container>
</template>
