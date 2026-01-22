<script lang="ts" setup>
  interface Props {
    text: string
    icon?: string
    variant?: 'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain' | undefined
    showIcon?: boolean
    disabled?: boolean
    loading?: boolean
    color?: string
    density?: 'comfortable' | 'normal' | 'compact'
    iconPosition?: 'left' | 'right'
  }

  const props = withDefaults(defineProps<Props>(), {
    text: 'prop name not set',
    icon: 'futzo-icon:plus',
    variant: 'elevated',
    showIcon: true,
    disabled: false,
    loading: false,
    color: 'primary',
    density: 'normal',
    iconPosition: 'left',
  })
  const emits = defineEmits(['click'])
</script>
<template>
  <v-btn
    :variant="props.variant"
    class="app-bar-cat-btn"
    size="large"
    :loading="props.loading"
    :color="props.color"
    :disabled="props.disabled"
    :density="props.density"
    @click="emits('click')"
  >
    <template #prepend v-if="props.showIcon && props.iconPosition === 'left'">
      <Icon v-if="props.showIcon" :name="props.icon" />
    </template>
    <template #append v-if="props.showIcon && props.iconPosition === 'right'">
      <Icon v-if="props.showIcon" :name="props.icon" />
    </template>
    {{ text }}
  </v-btn>
</template>
<style scoped>
  .app-bar-cat-btn {
    max-height: 42px;
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }
</style>
