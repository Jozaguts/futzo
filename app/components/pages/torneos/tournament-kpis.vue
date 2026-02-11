<script lang="ts" setup>
  import type { TournamentSummary } from '~/models/tournament'
  import KpisMetricsSection from '~/components/shared/kpis-metrics-section.vue'

  const props = defineProps<{
    summary: TournamentSummary
  }>()

  const cards = computed(() => [
    {
      key: 'total',
      label: 'Total',
      value: props.summary.total,
      icon: 'futzo-icon:trophy',
      tone: 'purple',
    },
    {
      key: 'active',
      label: 'Activos',
      value: props.summary.active,
      icon: 'futzo-icon:shirt-sharp',
      tone: 'green',
    },
    {
      key: 'finished',
      label: 'Finalizados',
      value: props.summary.finished,
      icon: 'futzo-icon:players',
      tone: 'blue',
    },
    {
      key: 'upcoming',
      label: 'Próximos',
      value: props.summary.upcoming,
      icon: 'futzo-icon:calendar',
      tone: 'orange',
    },
  ])
</script>

<template>
  <KpisMetricsSection
    :items="cards.map((card) => ({
      title: card.label,
      value: card.value,
      icon: card.icon,
      iconTone: card.tone,
    }))"
    test-id-prefix="torneos-kpis"
  />
</template>
