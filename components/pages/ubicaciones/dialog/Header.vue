<script lang="ts" setup>
import {useLocationStore} from "~/store";

const {locationDialog, isEdition} = storeToRefs(useLocationStore());
const title = isEdition.value ? "Editar ubicación" : "Crear una Ubicación";
const subtitle = isEdition.value
    ? "Modifica los detalles de la Ubicación."
    : "Completa los detalles de la Ubicación.";

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
        <Icon name="futzo-icon:marker-pin"></Icon>
      </v-sheet>
    </template>
    <template #title
    ><span class="">{{ title }}</span></template
    >
    <template #subtitle>{{ subtitle }}</template>
    <template #append>
      <Icon name="futzo-icon:x-dialog" @click="locationDialog = false"/>
    </template>
  </v-card-item>
  <v-divider></v-divider>
</template>
