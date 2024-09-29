<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  styles: {
    type: String,
    default: "mt-10",
  },
});
const computedStyles = computed(() => {
  if (props.styles === "mt-10") {
    return "mt-10";
  }
});
</script>
<template>
  <div class="futzo-page-container">
    <div class="header">
      <slot name="app-bar" />
    </div>
    <div class="main">
      <slot name="default" />
    </div>
  </div>
</template>
<style>
.futzo-page-container {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0 1.8fr;
  grid-auto-columns: 1fr;
  gap: 0 0;
  grid-auto-flow: row;
  grid-template-areas:
    "header header"
    "main main";
}

.header {
  grid-area: header;
  box-sizing: border-box;
}

.main {
  grid-area: main;
  box-sizing: border-box;
  padding: 40px;
}
</style>
