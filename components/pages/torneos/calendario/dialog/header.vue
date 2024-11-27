<script lang="ts" setup>
import { useTournamentStore } from "~/store";

const { calendarDialog, isEdition } = storeToRefs(useTournamentStore());
const title = isEdition.value ? "Editar Calendario" : "Crear un calendario";
const subtitle = isEdition.value
  ? "Modifica los detalles del calendario."
  : "Completa los detalles del calendario.";
</script>
<template>
  <v-card-item>
    <template #prepend>
      <v-sheet
        border="primary thin"
        class="mx-auto d-flex justify-center align-center mr-2 rounded-lg"
        height="45"
        width="45"
      >
        <Icon name="futzo-icon:calendar"></Icon>
      </v-sheet>
    </template>
    <template #title
      ><span class="">{{ title }}</span></template
    >
    <template #subtitle>{{ subtitle }}</template>
    <template #append>
      <Icon name="futzo-icon:x-dialog" @click="calendarDialog = false" />
    </template>
  </v-card-item>
  <v-divider />
</template>
