<script lang="ts" setup>
type Props = {
  text?: string,
  label?: string,
};
defineProps<Props>()
</script>
<template>
  <div class="d-flex flex-column ">
    <span class="text-subtitle-2 font-weight-bold">{{ label }}</span>
    <span
        class="text-caption d-inline-block text-truncate text-medium-emphasis"
        style="max-width: 150px;"
    >{{ text }}</span>
  </div>
</template>