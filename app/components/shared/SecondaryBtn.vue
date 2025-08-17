<script lang="ts" setup>
defineProps({
  text: String,
});
const emits = defineEmits(["btn-click"]);
</script>
<template>
  <v-btn
      border="solid #d0d5dd"
      class="app-bar-secondary-btn"
      size="large"
      variant="outlined"
      @click="() => emits('btn-click')"
  >
    <span class="app-bar-secondary-btn__input_text">
      {{ text }}
    </span>
  </v-btn>
</template>
