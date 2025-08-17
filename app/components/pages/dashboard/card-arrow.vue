<script lang="ts" setup>
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
const isNegative = computed(() => Number(props.value) <= 0);
</script>
<template>
  <div>
    <Icon
      class="arrow-card"
      :name="isNegative ? 'futzo-icon:arrow-down' : 'futzo-icon:arrow-up'"
    ></Icon>
    <span
      class="dashboard-stats-card--values-container__percentage"
      :class="isNegative ? 'negative' : 'positive'"
    >
      {{ value }}
    </span>
    <span class="dashboard-stats-card--values-container__percentage text">
      {{ label }}</span
    >
  </div>
</template>
<style>
.nuxt-icon.arrow-card svg {
  width: 20px;
  height: 20px;
}
</style>
