<script lang="ts" setup>
import KpisMetricsSection from '~/components/shared/kpis-metrics-section.vue'
import type {LocationCard} from '~/models/Location'

const DEFAULT_TREND_LABEL = 'vs último mes'

const props = defineProps<{
  locations: LocationCard[]
  totalLocations?: number | null
}>()

const getFieldCount = (location: any) => Number(location?.fields_count ?? location?.fields?.length ?? 0)

const getEnabledBlocks = (location: any) => {
  const fields = Array.isArray(location?.fields) ? location.fields : []
  return fields.reduce((acc: number, field: any) => {
    const windows = field?.windows
    if (!windows) return acc

    if (Array.isArray(windows)) {
      return acc + windows.flat().length
    }

    if (typeof windows === 'object') {
      const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
      return (
        acc +
        dayKeys.reduce((sum, key) => {
          const ranges = Array.isArray(windows[key]) ? windows[key] : []
          return sum + ranges.filter((range: any) => range?.enabled || (range?.start && range?.end)).length
        }, 0)
      )
    }

    return acc
  }, 0)
}

const totalLocations = computed(() => Number(props.totalLocations ?? props.locations.length ?? 0))
const totalFields = computed(() => props.locations.reduce((acc, location) => acc + getFieldCount(location), 0))
const scheduledBlocks = computed(() => props.locations.reduce((acc, location) => acc + getEnabledBlocks(location), 0))
const withTags = computed(() =>
  props.locations.filter((location: any) => Array.isArray(location?.tags) && location.tags.length > 0).length
)

const kpiItems = computed(() => [
  {
    title: 'Ubicaciones',
    value: totalLocations.value,
    icon: 'lucide:map-pin',
    iconTone: 'blue' as const,
    trendValue: 0,
    trendLabel: DEFAULT_TREND_LABEL,
  },
  {
    title: 'Campos totales',
    value: totalFields.value,
    icon: 'lucide:grid-2x2',
    iconTone: 'purple' as const,
    trendValue: 0,
    trendLabel: DEFAULT_TREND_LABEL,
  },
  {
    title: 'Bloques programados',
    value: scheduledBlocks.value,
    icon: 'lucide:clock-3',
    iconTone: 'green' as const,
    trendValue: 0,
    trendLabel: DEFAULT_TREND_LABEL,
  },
  {
    title: 'Con etiquetas',
    value: withTags.value,
    icon: 'lucide:tag',
    iconTone: 'orange' as const,
    trendValue: 0,
    trendLabel: DEFAULT_TREND_LABEL,
  },
])
</script>

<template>
  <KpisMetricsSection
    :items="kpiItems"
    test-id-prefix="ubicaciones-kpis"
    desktop-layout="scroll"
    :desktop-visible-cards="3"
  />
</template>
