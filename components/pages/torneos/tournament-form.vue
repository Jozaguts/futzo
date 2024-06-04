<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useCategoryStore} from "~/store/useCategoryStore";
import DragDropImage from "~/components/pages/torneos/drag-drop-image.vue";
const {categories,formats} = storeToRefs(useCategoryStore());
import type {TournamentForm } from "~/models/tournament";
const form = ref<TournamentForm>({
  name: '',
  category_id: null,
  tournament_format_id: null,
  image: {
    file: null,
    name: '',
    size: 0,
  }
})
const saveImage = (file: File) => {
  form.value.image.file = file;
  form.value.image.name = file.name;
  form.value.image.size = file.size;
}
const removeImage = () => {
  form.value.image.file = null;
  form.value.image.name = '';
  form.value.image.size = 0;
}
</script>
<template>
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
            density="compact"
            v-model="form.name"
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
        <DragDropImage
            :image="form.image"
            @image-dropped="saveImage"
            @remove-image="removeImage"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
              <span class="text-body-1">
                  Categoría*
              </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-select
            no-data-text="No hay categorías"
            :items="categories"
            density="compact"
            item-title="name"
            item-value="id"
            placeholder="Categoría"
            menu-icon="mdi-chevron-down"
            v-model="form.category_id"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
              <span class="text-body-1">
                  Formato*
              </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-select
            no-data-text="No hay formatos"
            :items="formats"
            density="compact"
            item-title="name"
            item-value="id"
            placeholder="Formato"
            menu-icon="mdi-chevron-down"
            v-model="form.tournament_format_id"

        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" >
              <v-tooltip activator="parent" location="end"  max-width="300">
               {{item.raw.description}}
              </v-tooltip>
            </v-list-item>
          </template>
        </v-select>
      </v-col>
    </v-row>

  </v-container>
</template>
<style></style>