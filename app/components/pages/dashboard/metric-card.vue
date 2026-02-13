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

<style scoped lang="scss">
.metric-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid #eaecf0;
  border-radius: 16px;
  background: #fff;
  min-height: 120px;
}

.metric-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.metric-card__title {
  color: #475467;
  font-size: 14px;
  font-weight: 600;
}

.metric-card__value {
  color: #101828;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
}

.metric-card__trend {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.metric-card__trend-value.positive {
  color: #079455;
  font-weight: 600;
}

.metric-card__trend-value.negative {
  color: #d92d20;
  font-weight: 600;
}

.metric-card__trend-label {
  color: #667085;
}

.metric-card__icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.metric-card__icon--purple {
  color: #7c3aed;
  background: rgba(124, 58, 237, 0.12);
}

.metric-card__icon--green {
  color: #16a34a;
  background: rgba(22, 163, 74, 0.12);
}

.metric-card__icon--blue {
  color: #2563eb;
  background: rgba(37, 99, 235, 0.12);
}

.metric-card__icon--orange {
  color: #ea580c;
  background: rgba(234, 88, 12, 0.12);
}

.metric-card__icon--red {
  color: #d92d20;
  background: rgba(217, 45, 32, 0.12);
}
</style>
