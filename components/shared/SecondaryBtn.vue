<script lang="ts" setup>
defineProps({
  text: String,
});
const emits = defineEmits(["btn-click"]);
</script>
<template>
  <v-btn
      class="app-bar-secondary-btn"
      size="large"
      @click="() => emits('btn-click')"
  >{{ text }}
  </v-btn>
</template>
