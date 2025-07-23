<script setup lang="ts">
  import type { Game } from '~/models/Game'

  const { game } = defineProps<{ game?: Game }>()
</script>
<template>
  <v-col cols="12">
    <div class="d-flex text-body-2">
      <span class="text-primary">{{ game?.details?.tournament }}</span
      >·<span class="ml-2 text-secondary text-capitalize">{{ game?.details?.date }}</span>
      <span class="ml-auto text-secondary text-capitalize">{{ game?.status }}</span>
    </div>
    <div class="score-container">
      <div class="team-score-container">
        <div class="team-container">
          <v-avatar :image="game?.home?.image" size="50" />
          <span class="d-inline-block text-truncate mt-4" style="max-width: 150px"> {{ game?.home?.name }}</span>
        </div>
        <div class="team-score">
          <span class="text-h4">{{ game?.home?.goals }}</span>
        </div>
      </div>
      -
      <div class="team-score-container">
        <div class="team-score">
          <span class="text-h4">{{ game?.away?.goals }}</span>
        </div>
        <div class="team-container">
          <v-avatar :image="game?.away?.image" size="50" />
          <span class="d-inline-block text-truncate mt-4" style="max-width: 150px"> {{ game?.away?.name }}</span>
        </div>
      </div>
    </div>
    <div class="round-container">
      <p class="text-body-2">
        Jornada <span>{{ game?.round }}</span>
      </p>
    </div>
  </v-col>
</template>
