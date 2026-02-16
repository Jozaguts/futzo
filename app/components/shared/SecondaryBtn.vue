<script lang="ts" setup>
  interface Props {
    text: string
    icon?: string
    variant?: 'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain' | undefined
    showIcon?: boolean
    disabled?: boolean
    loading?: boolean
    color?: string
    density?: 'comfortable' | 'default' | 'compact'
    iconPosition?: 'left' | 'right'
    iconClass?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    text: 'prop name not set',
    icon: 'futzo-icon:plus',
    variant: 'outlined',
    showIcon: true,
    disabled: false,
    loading: false,
    color: 'primary',
    density: 'default',
    iconPosition: 'left',
    iconClass: '',
  })
  const emits = defineEmits(['btn-click'])
</script>
<template>
  <v-btn
    border="solid #d0d5dd"
    class="app-bar-secondary-btn"
    size="large"
    :density="density"
    :variant="variant"
    :disabled="props.disabled"
    :loading="props.loading"
    :color="props.color"
    @click="() => emits('btn-click')"
  >
    <template #prepend v-if="props.showIcon && props.iconPosition === 'left'">
      <Icon v-if="props.showIcon" :name="props.icon" :class="iconClass" />
    </template>
    <template #append v-if="props.showIcon && props.iconPosition === 'right'">
      <Icon v-if="props.showIcon" :name="props.icon"  :class="iconClass"  />
    </template>
    <span class="app-bar-secondary-btn__input_text">
      {{ text }}
    </span>
  </v-btn>
</template>
