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
  desktopLayout?: 'grid' | 'scroll'
  desktopVisibleCards?: number
}>(), {
  testIdPrefix: 'metrics',
  desktopLayout: 'grid',
  desktopVisibleCards: 3,
})

const { mobile } = useDisplay()
const showDesktopScroll = computed(() => !mobile.value && props.desktopLayout === 'scroll')
const desktopScrollStyle = computed(() => ({
  '--desktop-visible-cards': String(Math.max(1, Number(props.desktopVisibleCards || 3))),
}))
</script>

<template>
  <section
    v-if="!mobile && !showDesktopScroll"
    class="kpis-metrics-grid"
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
    v-else-if="showDesktopScroll"
    class="kpis-metrics-scroll"
    :style="desktopScrollStyle"
    :data-testid="`${testIdPrefix}-scroll`"
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

.kpis-metrics-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  padding-bottom: 4px;
  scrollbar-width: thin;
}

.kpis-metrics-scroll :deep(.metric-card) {
  flex: 0 0
    calc((100% - ((var(--desktop-visible-cards, 3) - 1) * 12px)) / var(--desktop-visible-cards, 3));
  min-width: 240px;
}

@media (width > 600px) {
  .kpis-metrics-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width > 1200px) {
  .kpis-metrics-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
