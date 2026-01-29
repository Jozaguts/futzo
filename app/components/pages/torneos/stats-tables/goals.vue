<script lang="ts" setup>
  import DefaultTemplate from '~/components/pages/torneos/stats-tables/default-template.vue'
  import type { PlayerStats } from '~/models/tournament'
  const { playerStats } = defineProps<{
    playerStats: PlayerStats[]
  }>()
</script>
<template>
  <DefaultTemplate
    type="Goles"
    :data="playerStats"
    :content="{
      title: 'Lideres goleadores',
      text: 'No hay goles o jugadores registrados registrados en este torneo.',
      actioText: 'Actualizar datos',
    }"
  />
</template>
