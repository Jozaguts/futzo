<script lang="ts" setup>
import AppBarCatBtn from "~/components/shared/app-bar-cat-btn.vue";
import { useTeamStore } from "~/store";

const { dialog } = storeToRefs(useTeamStore());
const toggleDialog = () => {
  dialog.value = !dialog.value;
};
</script>
<template>
  <AppBarCatBtn
    text="Crear Equipo"
    icon="futzo-icon:plus"
    class="mr-8"
    @click="toggleDialog"
  />
</template>
