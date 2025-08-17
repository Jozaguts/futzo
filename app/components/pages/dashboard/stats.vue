<script setup lang="ts">
const gradients = [
  ["rgba(7,148,85,0.1)", "rgba(7,148,85,0.07)"],
  ["rgba(240,68,56,0.1)", "rgba(240,68,56,0.07)"],
];
const props = defineProps({
  values: {
    type: Array as PropType<number[]>,
    required: true,
  },
  isPositive: {
    type: Boolean,
    required: true,
  },
});
const gradient = computed(() =>
  props.isPositive ? gradients[0] : gradients[1],
);
const color = computed(() => (props.isPositive ? "#079455" : "#F04438"));
const values = computed(() => (props.isPositive ? props.values : props.values));
</script>
<template>
  <v-sparkline
    :fill="true"
    width="130"
    :color="color"
    height="70"
    :gradient="gradient"
    :line-width="1"
    :model-value="values"
    :padding="1"
    :smooth="false"
    gradient-direction="bottom"
    auto-draw
  ></v-sparkline>
</template>
