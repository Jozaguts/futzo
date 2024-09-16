<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  styles: {
    type: String,
    default: "mt-10",
  },
});
</script>
<template>
  <div :class="styles">
    <slot name="app-bar" />
    <slot name="default"></slot>
  </div>
</template>
