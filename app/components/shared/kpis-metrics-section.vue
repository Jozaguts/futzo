<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import MetricCard from '~/components/pages/dashboard/metric-card.vue'
import MetricsCarousel from '~/components/pages/dashboard/metrics-carousel.vue'

type KpiIconTone = 'purple' | 'green' | 'blue' | 'orange' | 'red'

export type KpiMetricItem = {
  title: string
  value: string | number
  icon: string
  iconTone?: KpiIconTone
  trendValue?: number | null
  trendLabel?: string
  trendAsPercent?: boolean
}

const props = withDefaults(defineProps<{
  items: KpiMetricItem[]
  testIdPrefix?: string
  desktopCardMaxWidth?: number | null
}>(), {
  testIdPrefix: 'metrics',
  desktopCardMaxWidth: null,
})

const { mobile } = useDisplay()
const hasDesktopCardMaxWidth = computed(() => Number(props.desktopCardMaxWidth ?? 0) > 0)
const desktopGridStyle = computed(() => ({
  '--desktop-card-max-width': `${Math.max(120, Number(props.desktopCardMaxWidth || 0))}px`,
}))
</script>

<template>
  <section
    v-if="!mobile"
    class="kpis-metrics-grid"
    :class="{ 'kpis-metrics-grid--fixed-card': hasDesktopCardMaxWidth }"
    :style="hasDesktopCardMaxWidth ? desktopGridStyle : undefined"
    :data-testid="`${testIdPrefix}-grid`"
  >
    <MetricCard
      v-for="metric in items"
      :key="metric.title"
      :title="metric.title"
      :value="metric.value"
      :icon="metric.icon"
      :icon-tone="metric.iconTone || 'purple'"
      :trend-value="metric.trendValue ?? null"
      :trend-label="metric.trendLabel ?? ''"
      :trend-as-percent="metric.trendAsPercent ?? true"
    />
  </section>

  <section
    v-else
    class="kpis-metrics-carousel"
    :data-testid="`${testIdPrefix}-carousel`"
  >
    <MetricsCarousel :items="items" />
  </section>
</template>

<style lang="scss" scoped>
.kpis-metrics-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.kpis-metrics-carousel {
  display: flex;
  justify-content: center;
}

@media (width > 600px) {
  .kpis-metrics-grid:not(.kpis-metrics-grid--fixed-card) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .kpis-metrics-grid--fixed-card {
    grid-template-columns: repeat(auto-fit, minmax(200px, var(--desktop-card-max-width, 240px)));
    justify-content: flex-start;
  }

  .kpis-metrics-grid--fixed-card :deep(.metric-card) {
    max-width: var(--desktop-card-max-width, 240px);
    width: 100%;
  }
}

@media (width > 1200px) {
  .kpis-metrics-grid:not(.kpis-metrics-grid--fixed-card) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
