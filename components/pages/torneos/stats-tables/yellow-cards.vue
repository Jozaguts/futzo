<script lang="ts" setup>
  import DefaultTemplate from '~/components/pages/torneos/stats-tables/default-template.vue'
  import type { PlayerStats } from '~/models/tournament'
  const { playerStats } = defineProps<{
    playerStats: PlayerStats[]
  }>()
</script>
<template>
  <DefaultTemplate
    type="Tarjetas amarillas"
    :data="playerStats"
    :content="{
      title: 'Ranking de jugadores',
      text: 'No hay tarjetas amarillas registradas en este torneo.',
      actioText: 'Actualizar datos',
    }"
  />
</template>
