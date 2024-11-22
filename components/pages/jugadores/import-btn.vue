<script lang="ts" setup>
import AppBarSecondaryBtn from "~/components/shared/app-bar-secondary-btn.vue";
import { usePlayerStore } from "~/store";

const { importModal } = storeToRefs(usePlayerStore());
</script>
<template>
  <AppBarSecondaryBtn
    text="Import .csv"
    class="mr-4"
    @btn-click="importModal = !importModal"
  />
</template>
