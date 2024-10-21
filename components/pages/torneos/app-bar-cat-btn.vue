<script lang="ts" setup>
import AppBarCatBtn from "~/components/shared/app-bar-cat-btn.vue";
import { useTournamentStore } from "~/store";

const { dialog } = storeToRefs(useTournamentStore());
</script>
<template>
  <AppBarCatBtn
    icon="plus"
    text="Crear torneo"
    class="mr-8"
    @click="dialog = !dialog"
  />
</template>
