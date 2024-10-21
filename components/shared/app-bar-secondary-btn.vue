<script lang="ts" setup>
defineProps({
  text: String,
});
</script>
<template>
  <v-btn class="app-bar-secondary-btn" size="large">{{ text }}</v-btn>
</template>

<style scoped>
.app-bar-secondary-btn {
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
  color: #344054 !important;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
</style>
