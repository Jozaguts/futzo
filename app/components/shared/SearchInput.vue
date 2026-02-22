<script lang="ts" setup>
type Props = {
  placeholder?: string;
  minWidth?: number | string;
}
const props = defineProps<Props>();

const emits = defineEmits(["searching"]);
</script>
<template>
  <v-text-field
      :min-width="minWidth"
      :placeholder="placeholder"
      append-inner-icon="mdi-magnify"
      class="search-button"
      density="compact"
      @update:model-value="emits('searching', $event)"
  >
  </v-text-field>
</template>
<style scoped>
.search-button {
  border-radius: 8px;
  border: 1px solid var(--futzo-border);
  background: var(--futzo-surface);
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
}

:deep(.mdi-menu-down) {
  display: none;
}
</style>
