<script setup lang="ts">
  defineProps({
    roundId: {
      type: Number,
      required: true,
    },
    gameId: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 0,
    },
  })

  const emits = defineEmits(['update:game'])
</script>

<template>
  <div class="score-control">
    <template v-if="isEditable">
      <v-btn
        icon
        variant="tonal"
        color="secondary"
        density="compact"
        size="x-small"
        class="score-control__action"
        @click="emits('update:game', 'up', gameId, type, roundId)"
      >
        <Icon name="lucide:plus" size="13" />
      </v-btn>
      <span class="score-control__value">{{ value }}</span>
      <v-btn
        icon
        variant="tonal"
        color="secondary"
        density="compact"
        size="x-small"
        class="score-control__action"
        @click="emits('update:game', 'down', gameId, type, roundId)"
      >
        <Icon name="lucide:minus" size="13" />
      </v-btn>
    </template>
    <span
      v-else
      class="score-control__value score-control__value--readonly"
      :class="{ 'score-control__value--muted': value === 0 }"
    >
      {{ value }}
    </span>
  </div>
</template>

<style scoped>
  .score-control {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .score-control__action {
    width: 24px;
    height: 24px;
    min-width: 24px;
  }

  .score-control__value {
    width: 22px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #344054;
  }

  .score-control__value--readonly {
    width: 28px;
    font-size: 20px;
    line-height: 1.1;
    font-weight: 600;
  }

  .score-control__value--muted {
    color: #98a2b3;
  }
</style>
