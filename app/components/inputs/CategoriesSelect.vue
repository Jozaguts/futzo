<script lang="ts" setup>
  import { storeToRefs } from 'pinia'

  const { categories } = storeToRefs(useCategoryStore())
  const modelValue = defineModel('modelValue')
  defineProps({
    disabled: {
      type: Boolean,
      default: true,
    },
    errors: {
      type: Object,
      default: () => ({
        'error-messages': [],
      }),
    },
  })
</script>
<template>
  <v-select
    :disabled="disabled"
    :items="categories"
    density="compact"
    item-title="name"
    item-value="id"
    placeholder="Categoría"
    menu-icon="mdi-chevron-down"
    v-model="modelValue"
    v-bind="errors"
  >
  </v-select>
</template>
