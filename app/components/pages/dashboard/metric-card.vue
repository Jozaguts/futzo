<script lang="ts" setup>
import {Icon} from '#components'

const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    iconTone: {
      type: String,
      default: 'purple',
    },
    trendValue: {
      type: Number,
      default: null,
    },
    trendLabel: {
      type: String,
      default: '',
    },
    trendAsPercent: {
      type: Boolean,
      default: true,
    },
  })

  const hasTrend = computed(() => typeof props.trendValue === 'number' && props.trendLabel)
  const isPositive = computed(() => (props.trendValue ?? 0) >= 0)
  const trendText = computed(() => {
    if (props.trendValue === null || props.trendValue === undefined) {
      return ''
    }
    const value = Math.abs(props.trendValue)
    return props.trendAsPercent ? `${value}%` : String(value)
  })
</script>

<template>
  <div class="metric-card">
    <div class="metric-card__top">
      <div class="metric-card__title">{{ title }}</div>
      <div :class="['metric-card__icon', `metric-card__icon--${iconTone}`]">
        <Icon :name="icon" />
      </div>
    </div>
    <div class="metric-card__value">{{ value }}</div>
    <div v-if="hasTrend" class="metric-card__trend">
      <Icon :name="isPositive ? 'futzo-icon:arrow-up' : 'futzo-icon:arrow-down'" />
      <span :class="['metric-card__trend-value', isPositive ? 'positive' : 'negative']">{{ trendText }}</span>
      <span class="metric-card__trend-label">{{ trendLabel }}</span>
    </div>
  </div>
</template>
