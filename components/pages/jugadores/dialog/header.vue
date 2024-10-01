<script lang="ts" setup>
import { usePlayerStore } from "~/store";

const { dialog, steps, isEdition } = storeToRefs(usePlayerStore());
const title = isEdition.value ? "Editar jugador" : "Crear un jugador";
const subtitle = isEdition.value
  ? "Modifica los detalles del jugador."
  : "Completa los detalles del jugador.";
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
        <nuxt-icon name="football" filled></nuxt-icon>
      </v-sheet>
    </template>
    <template #title
      ><span class="">{{ title }}</span></template
    >
    <template #subtitle>{{ subtitle }}</template>
    <template #append>
      <nuxt-icon name="x-dialog" filled @click="dialog = false" />
    </template>
  </v-card-item>
  <v-divider></v-divider>
</template>
