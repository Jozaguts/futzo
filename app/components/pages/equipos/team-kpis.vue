<script lang="ts" setup>
import type {TeamListKpis} from '~/models/Team'
import KpisMetricsSection from '~/components/shared/kpis-metrics-section.vue'

const DEFAULT_LABEL = 'vs último mes'

const props = defineProps<{
  kpis?: TeamListKpis | null
}>()

const metrics = computed<TeamListKpis>(() => {
  if (props.kpis) {
    return props.kpis
  }
  const fallback = {
    total: 0,
    current: 0,
    dailyData: [],
    label: DEFAULT_LABEL,
  }
  return {
    teamsRegistered: fallback,
    playersRegistered: fallback,
    activeTournaments: fallback,
    teamsWithHomeVenue: fallback,
  }
})

const cards = computed(() => [
  {
    key: 'teamsRegistered',
    label: 'Equipos registrados',
    value: metrics.value.teamsRegistered.total,
    icon: 'lucide:shirt',
    tone: 'green',
    trendValue: metrics.value.teamsRegistered.current,
    trendLabel: metrics.value.teamsRegistered.label,
  },
  {
    key: 'playersRegistered',
    label: 'Jugadores registrados',
    value: metrics.value.playersRegistered.total,
    icon: 'lucide:users',
    tone: 'blue',
    trendValue: metrics.value.playersRegistered.current,
    trendLabel: metrics.value.playersRegistered.label,
  },
  {
    key: 'activeTournaments',
    label: 'Torneos activos',
    value: metrics.value.activeTournaments.total,
    icon: 'lucide:trophy',
    tone: 'purple',
    trendValue: metrics.value.activeTournaments.current,
    trendLabel: metrics.value.activeTournaments.label,
  },
  {
    key: 'teamsWithHomeVenue',
    label: 'Equipos con sede',
    value: metrics.value.teamsWithHomeVenue.total,
    icon: 'lucide:map-pin',
    tone: 'orange',
    trendValue: metrics.value.teamsWithHomeVenue.current,
    trendLabel: metrics.value.teamsWithHomeVenue.label,
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
      trendValue: card.trendValue,
      trendLabel: card.trendLabel,
    }))"
    test-id-prefix="equipos-kpis"
  />
</template>
