<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useTournamentStore} from "~/store";
const {dialog} = storeToRefs(useTournamentStore());
const dragging = ref(false);
const drop = ref(false);
const image = ref(null);
const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  dragging.value = false;
  const files = e.dataTransfer.files;
  if (files.length) {
    loadImage(files[0]);
    drop.value = true;
  }
}
const border = computed(() => {
  return (!dragging.value && !drop.value) ? 'primary thin' : (!dragging.value && drop.value) ? 'success sm opacity-100' : 'primary sm opacity-100';
})
const loadImage = (file)  => {
  const reader = new FileReader();
  reader.onload = (e) => {
    image.value = e.target.result as null;
  };
  reader.readAsDataURL(file);
}
</script>
<template>
  <v-dialog v-model="dialog" max-width="688" >
    <v-card class="create-tournament-card bg-background" >
      <v-card-item>
        <template #prepend>
          <v-sheet border="primary thin" class="mx-auto d-flex justify-center align-center mr-2 rounded-lg" height="45" width="45" color="background" >
            <Icon name="icon-park-outline:soccer-one" size="25" color="black" border="border-lg"  />
          </v-sheet>
        </template>
        <template #title><span class="">Crear un torneo</span></template>
        <template #subtitle>Completa los detalles del torneo para agregarlo a tu liga</template>
        <template #append>
          <Icon name="icon-park-outline:close" size="20" color="grey" @click="dialog = false" />
        </template>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-text style="height: 430px;">
       <v-container>
         <v-row>
           <v-col cols="12" lg="4" md="4">
             <span class="text-body-1">
                Nombre del torneo*
             </span>
           </v-col>
           <v-col cols="12" lg="8" md="8">
              <v-text-field
                  placeholder="p.ej. Torneo de verano"
                  outlined
              ></v-text-field>
           </v-col>
         </v-row>
         <v-row>
            <v-col cols="12" lg="4" md="4">
              <span class="text-body-1">
                  Imagen del torneo*
              </span>
            </v-col>
            <v-col cols="12" lg="8" md="8">
              <div class="d-flex">
                <v-avatar color="surface" size="64" class="mr-2">
                  <nuxt-icon v-if="!dragging && !drop" name="image-plus" filled class="image-plus"></nuxt-icon>
                  <v-img v-else :src="image"></v-img>
                </v-avatar>
                <v-sheet
                    :border="border"
                    color="background"
                    width="100%"
                    class="d-flex flex-column align-center rounded-lg pa-2"
                    @dragover.prevent
                    @drop.prevent="handleDrop"
                    @dragenter="dragging = true"
                    @drop="dragging = false"
                >
                 <div class="d-flex justify-center align-center">
                   <v-btn variant="text" color="primary" class="text-body-1 px-1" >Haz clic para añadir </v-btn>
                   <span class=" ">o arrastra aquí</span>
                 </div>
                  <p class="text-caption"> SVG, PNG o JPG (max. 800x400px)</p>
                </v-sheet>
              </div>
            </v-col>
         </v-row>
       </v-container>
      </v-card-text>
      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style >
.create-tournament-card > .v-card-item > .v-card-item__append {
  cursor: pointer;
  align-self: flex-start !important;
  justify-self: center !important;
  padding-inline-start: 0 !important;
  margin-top: .4rem;
}
.nuxt-icon.image-plus svg {
  width: 2rem;
  height: 2rem;
}
</style>