<script lang="ts" setup>
import type {TournamentListKpis, TournamentSummary} from '~/models/tournament'
import KpisMetricsSection from '~/components/shared/kpis-metrics-section.vue'

const props = defineProps<{
    summary: TournamentSummary
    kpis?: TournamentListKpis | null
  }>()

  const fallbackKpis = computed<TournamentListKpis>(() => ({
    tournamentsCreated: {
      total: props.summary.total,
      current: 0,
      dailyData: [],
      label: 'vs último mes',
    },
    teamsRegistered: {
      total: props.summary.active,
      current: 0,
      dailyData: [],
      label: 'vs último mes',
    },
    playersRegistered: {
      total: props.summary.finished,
      current: 0,
      dailyData: [],
      label: 'vs último mes',
    },
    matchesPlayed: {
      total: props.summary.upcoming,
      current: 0,
      dailyData: [],
      label: 'vs último mes',
    },
  }))

  const metrics = computed(() => props.kpis ?? fallbackKpis.value)

  const cards = computed(() => [
    {
      key: 'tournamentsCreated',
      label: 'Torneos creados',
      value: metrics.value.tournamentsCreated.total,
      icon: 'lucide:trophy',
      tone: 'purple',
      trendValue: metrics.value.tournamentsCreated.current,
      trendLabel: metrics.value.tournamentsCreated.label,
    },
    {
      key: 'teamsRegistered',
      label: 'Equipos inscritos',
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
      key: 'matchesPlayed',
      label: 'Partidos jugados',
      value: metrics.value.matchesPlayed.total,
      icon: 'lucide:calendar-days',
      tone: 'orange',
      trendValue: metrics.value.matchesPlayed.current,
      trendLabel: metrics.value.matchesPlayed.label,
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
    test-id-prefix="torneos-kpis"
  />
</template>
