<script lang="ts" setup>
import {Icon} from '#components'
import type {PropType} from 'vue'

type ActivityItem = {
    id: number | string
    title: string
    subtitle?: string
    time?: string
    icon?: string
    tone?: 'purple' | 'green' | 'orange' | 'blue'
  }

  defineProps({
    items: {
      type: Array as PropType<ActivityItem[]>,
      default: () => [],
    },
  })
</script>

<template>
  <div class="activity-feed">
    <v-empty-state
      v-if="!items.length"
      image="/no-data.svg"
      size="80"
      title="Sin actividad"
      text="Aún no hay eventos recientes."
    ></v-empty-state>
    <div v-else class="activity-feed__list">
      <div v-for="item in items" :key="item.id" class="activity-item">
        <div :class="['activity-item__icon', `activity-item__icon--${item.tone ?? 'purple'}`]">
          <Icon v-if="item.icon" :name="item.icon" />
          <Icon v-else name="lucide:bell" size="16" />
        </div>
        <div class="activity-item__content">
          <p class="activity-item__title">{{ item.title }}</p>
          <p v-if="item.subtitle" class="activity-item__subtitle">{{ item.subtitle }}</p>
        </div>
        <div v-if="item.time" class="activity-item__time">{{ item.time }}</div>
      </div>
    </div>
  </div>
</template>
