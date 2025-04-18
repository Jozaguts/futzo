<script lang="ts" setup>
import {useLocationStore} from "~/store";
import NoLocation from "~/assets/images/no-locations.svg";

const {locationDialog, noLocations} = storeToRefs(useLocationStore());
</script>
<template>
  <v-sheet
      v-if="noLocations"
      class="custom-v-sheet d-flex justify-center align-center fill-height"
  >
    <div class="d-flex flex-column align-center">
      <h2 class="card-title">No hay ubicaciones aún</h2>
      <NoLocation :fontControlled="false" :filled="true" class="text-xl w-5 h-5"/>
      <p class="card-sub-title">Crea una ubicación para verla aquí</p>
      <v-btn
          color="primary"
          variant="elevated"
          class="mt-4 text-body-1"
          @click="locationDialog = !locationDialog"
      >
        Crear una ubicación
      </v-btn>
    </div>
  </v-sheet>
</template>
