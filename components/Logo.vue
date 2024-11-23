<script lang="ts" setup>
import { useTheme } from "vuetify";

const logo = ref("/futzo/logos/horizontal/logo-12.png");

export interface Props {
  maxWidth?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: "100%",
});
watch(
  useTheme().global.current,
  (value) => {
    value.dark
      ? (logo.value = "/futzo/logos/horizontal/logo-14.png")
      : (logo.value = "/futzo/logos/horizontal/logo-12.png");
  },
  { deep: true },
);
</script>
<template>
  <v-img
    :max-width="props.maxWidth"
    :src="logo"
    class="cursor-pointer"
    @click="() => $router.push({ name: 'index' })"
  ></v-img>
</template>
