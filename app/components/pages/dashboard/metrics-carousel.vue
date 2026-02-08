<script lang="ts" setup>
import {computed, shallowRef, watch} from 'vue'
import MetricCard from '~/components/pages/dashboard/metric-card.vue'

type MetricItem = {
    title: string
    value: string | number
    icon: string
    iconTone?: 'purple' | 'green' | 'orange' | 'blue'
    trendValue?: number | null
    trendLabel?: string
  }

  const props = defineProps<{
    items: MetricItem[]
  }>()

  const currentIndex = shallowRef(0)
  const currentItem = computed(() => props.items[currentIndex.value] ?? null)

  watch(
    () => props.items.length,
    (length) => {
      if (length === 0) {
        currentIndex.value = 0
        return
      }
      if (currentIndex.value >= length) {
        currentIndex.value = 0
      }
    }
  )
</script>

<template>
  <v-defaults-provider :defaults="{ VBtn: { variant: 'outlined', color: 'primary' } }">
    <v-sheet class="metrics-carousel" rounded="xl">
      <v-carousel
        v-model="currentIndex"
        height="200"
        vertical-arrows="right"
        hideDelimiterBackground
        cycle

      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="`${item.title}-${i}`"
          :class="['metrics-carousel__slide', `metrics-carousel__slide--${item.iconTone ?? 'purple'}`]"
        >
        </v-carousel-item>

        <v-overlay
          :scrim="false"
          content-class="metrics-carousel__overlay"
          contained
          model-value
          no-click-animation
          persistent
        >
          <v-scroll-x-transition mode="out-in" appear>
            <MetricCard
              v-if="currentItem"
              :key="currentIndex"
              class="metrics-carousel__card metric-card--fixed"
              :title="currentItem.title"
              :value="currentItem.value"
              :icon="currentItem.icon"
              :icon-tone="currentItem.iconTone"
              :trend-value="currentItem.trendValue ?? null"
              :trend-label="currentItem.trendLabel ?? ''"
              :trend-as-percent="true"
            />
          </v-scroll-x-transition>
        </v-overlay>
      </v-carousel>
    </v-sheet>
  </v-defaults-provider>
</template>

<style scoped lang="scss">
  .metrics-carousel {
    max-width: 700px;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    background: #fff;
  }

  .metrics-carousel__slide {
    border-radius: 16px;
    height: 100%;
  }

  .metrics-carousel__slide--purple {
    background: linear-gradient(160deg, rgba(124, 58, 237, 0.22), rgba(255, 255, 255, 1));
  }

  .metrics-carousel__slide--green {
    background: linear-gradient(160deg, rgba(22, 163, 74, 0.22), rgba(255, 255, 255, 1));
  }

  .metrics-carousel__slide--blue {
    background: linear-gradient(160deg, rgba(37, 99, 235, 0.22), rgba(255, 255, 255, 1));
  }

  .metrics-carousel__slide--orange {
    background: linear-gradient(160deg, rgba(234, 88, 12, 0.22), rgba(255, 255, 255, 1));
  }

  .metrics-carousel__overlay {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
    padding: 16px;
  }

  .metrics-carousel__card {
    width: 200px;
  }

  .metric-card--fixed {
    height: 180px;
    justify-content: space-between;
  }
</style>
