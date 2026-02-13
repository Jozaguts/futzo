<script lang="ts" setup>
import KpisMetricsSection from '~/components/shared/kpis-metrics-section.vue'
import type {Player} from '~/models/Player'

const DEFAULT_TREND_LABEL = 'vs último mes'

const props = defineProps<{
  players: Player[]
  totalPlayers?: number | null
}>()

const parseAge = (birthdate: unknown) => {
  const birth = birthdate as { age?: number } | string | Date | null | undefined
  if (!birth) return null
  if (typeof birth === 'object' && 'age' in birth && typeof birth.age === 'number') {
    return birth.age
  }
  const date = new Date(birth as string | Date)
  if (Number.isNaN(date.getTime())) return null
  const now = new Date()
  let age = now.getFullYear() - date.getFullYear()
  const monthDiff = now.getMonth() - date.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate())) {
    age -= 1
  }
  return age >= 0 ? age : null
}

const totalRegistered = computed(() => Number(props.totalPlayers ?? props.players.length ?? 0))
const withTeam = computed(() => props.players.filter((player: any) => Boolean(player?.team?.id)).length)
const verified = computed(() =>
  props.players.filter((player: any) => String(player?.verification?.status ?? '').toLowerCase() === 'approved').length
)
const averageAge = computed(() => {
  const ages = props.players.map((player: any) => parseAge(player?.birthdate)).filter((value): value is number => value !== null)
  if (!ages.length) return 0
  const total = ages.reduce((acc, value) => acc + value, 0)
  return Math.round(total / ages.length)
})

const kpiItems = computed(() => [
  {
    title: 'Jugadores registrados',
    value: totalRegistered.value,
    icon: 'lucide:users',
    iconTone: 'blue' as const,
    trendValue: 0,
    trendLabel: DEFAULT_TREND_LABEL,
  },
  {
    title: 'Con equipo asignado',
    value: withTeam.value,
    icon: 'lucide:shirt',
    iconTone: 'purple' as const,
    trendValue: 0,
    trendLabel: DEFAULT_TREND_LABEL,
  },
  {
    title: 'Verificados',
    value: verified.value,
    icon: 'lucide:shield-check',
    iconTone: 'green' as const,
    trendValue: 0,
    trendLabel: DEFAULT_TREND_LABEL,
  },
  {
    title: 'Edad promedio',
    value: averageAge.value,
    icon: 'lucide:activity',
    iconTone: 'orange' as const,
    trendValue: 0,
    trendLabel: DEFAULT_TREND_LABEL,
  },
])
</script>

<template>
  <KpisMetricsSection :items="kpiItems" test-id-prefix="jugadores-kpis" />
</template>
