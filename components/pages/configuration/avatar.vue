<script lang="ts" setup>
import { useAuthStore } from "~/store";

const { image } = storeToRefs(useAuthStore());
const imageRef = ref(null);
const loading = ref(false);
const eventHandler = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    loading.value = true;
    useAuthStore()
      .updateImage(file)
      .finally(() => {
        loading.value = false;
      });
  }
};
const showInput = () => {
  const input = imageRef.value.$el.querySelector("input");
  input.click();
};
</script>
<template>
  <div v-if="loading" class="d-flex align-center justify-center fill-height">
    <v-progress-circular
      color="grey-lighten-2"
      indeterminate
    ></v-progress-circular>
  </div>
  <div v-else class="position-relative">
    <v-avatar size="64">
      <v-img :src="image" />
    </v-avatar>
    <v-btn
      class="image-plus-avatar__btn"
      icon="true"
      size="x-small"
      color="background"
      width="28"
      height="28"
      @click="showInput"
    >
      <nuxt-icon
        class="image-plus-avatar"
        name="image-plus-avatar"
        filled
      ></nuxt-icon>
    </v-btn>
    <v-file-input
      class="d-none"
      ref="imageRef"
      @change="eventHandler"
    ></v-file-input>
  </div>
</template>
