<script setup lang="ts">
const gradients = [["rgba(7,148,85,0.01)", "rgba(7,148,85,0.09)"]];
defineProps({
  values: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <v-sparkline
    :fill="true"
    width="130"
    color="#079455"
    height="70"
    :gradient="gradients[0]"
    :line-width="1"
    :model-value="values"
    :padding="1"
    :smooth="false"
    gradient-direction="bottom"
    auto-draw
  ></v-sparkline>
</template>
