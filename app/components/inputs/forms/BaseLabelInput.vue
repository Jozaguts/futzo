<script setup lang="ts">
  const {
    label,
    disabled = false,
    readonly = false,
    variant = 'outlined',
    active = false,
  } = defineProps<{
    label: string
    readonly?: boolean
    disabled?: boolean
    active?: boolean
    variant?: 'outlined' | 'filled' | 'underlined' | 'plain' | 'solo' | 'solo-filled' | 'solo-inverted'
  }>()
  const model = defineModel()
</script>

<template>
  <div class="mb-2">
    <label for="id" class="text-medium-emphasis pb-1 d-inline-block text-caption">{{ label }}</label>
    <slot name="input">
      <v-text-field :active :disabled :readonly :variant="variant" density="compact" v-model="model" />
    </slot>
  </div>
</template>

<style scoped></style>
