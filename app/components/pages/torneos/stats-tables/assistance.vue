<script lang="ts" setup>
  import DefaultTemplate from '~/components/pages/torneos/stats-tables/default-template.vue'
  import type { PlayerStats } from '~/models/tournament'
  const { playerStats } = defineProps<{
    playerStats: PlayerStats[]
  }>()
</script>
<template>
  <DefaultTemplate
    type="Asistencias"
    :data="playerStats"
    :content="{
      title: 'Lideres de asistencias',
      text: 'No hay asistencias o jugadores registrados en este torneo.',
      actioText: 'Actualizar datos',
    }"
  />
</template>
