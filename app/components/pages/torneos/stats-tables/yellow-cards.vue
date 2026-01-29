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
      title: 'Lideres en tarjetas amarillas',
      text: 'No hay tarjetas amarillas o jugadores registrados en este torneo.',
      actioText: 'Actualizar datos',
    }"
  />
</template>
