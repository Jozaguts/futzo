<script lang="ts" setup>
import { useTournamentStore } from "~/store";

const { dialog } = storeToRefs(useTournamentStore());
</script>
<template>
  <PrimaryBtn
    variant="elevated"
    icon="futzo-icon:plus"
    text="Crear torneo"
    class="mr-8"
    @click="dialog = !dialog"
  />
</template>
