<script lang="ts" setup>
import { useTeamStore } from "~/store";

const { dialog, steps, isEdition } = storeToRefs(useTeamStore());
const title = computed(() => {
  switch (steps.value.current) {
    case "createTeam":
      return isEdition.value ? "Editar equipo" : "Crear un equipo";
    case "createDt":
      return isEdition.value ? "Editar DT" : "Crear DT";
    case "createOwner":
      return isEdition.value ? "Editar dueño" : "Crear dueño";
  }
});
const subtitle = computed(() => {
  switch (steps.value.current) {
    case "createTeam":
      return isEdition.value
        ? "Modifica los detalles del equipo."
        : "Completa los detalles del equipo.";
    case "createDt":
      return isEdition.value
        ? "Modifica los detalles del DT."
        : "Completa los detalles del DT.";
    case "createOwner":
      return isEdition.value
        ? "Modifica los detalles del dueño."
        : "Completa los detalles del dueño.";
  }
});
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
        <Icon name="futzo-icon:football"></Icon>
      </v-sheet>
    </template>
    <template #title
      ><span class="">{{ title }}</span></template
    >
    <template #subtitle>{{ subtitle }}</template>
    <template #append>
      <Icon name="futzo-icon:x-dialog" @click="dialog = false" />
    </template>
  </v-card-item>
  <v-divider></v-divider>
</template>
