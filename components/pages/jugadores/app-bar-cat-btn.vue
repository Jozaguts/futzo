<script lang="ts" setup>
import AppBarCatBtn from "~/components/shared/app-bar-cat-btn.vue";
import { usePlayerStore } from "~/store";

const { dialog } = storeToRefs(usePlayerStore());
</script>
<template>
  <AppBarCatBtn
    icon="plus"
    text="Crear Jugador"
    class="mr-8"
    @click="dialog = !dialog"
  />
</template>
