<script lang="ts" setup>
import { storeToRefs } from "pinia";
import DragDropImage from "~/components/pages/torneos/drag-drop-image.vue";
import useSchemas from "~/composables/useSchemas";
import CategorySelectComponent from "~/components/inputs/CategoriesSelect.vue";
import {
  dragDropImageRef,
  imageForm,
  removeImage,
  saveImage,
} from "~/composables/useImage";
import { useCategoryStore, useLeaguesStore, useTournamentStore } from "~/store";
import Calendar from "~/components/pages/torneos/calendar.vue";
import { FUTBOL_11_ID } from "~/utils/constants";

const { footballTypes } = storeToRefs(useLeaguesStore());
const { formats } = storeToRefs(useCategoryStore());
const { isEdition, tournamentStoreRequest } = storeToRefs(useTournamentStore());
const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
  isEdition.value
    ? "edit-tournament-basic-info"
    : "create-tournament-basic-info",
);
defineExpose({
  validate,
  handleSubmit,
});
onMounted(() => {
  if (tournamentStoreRequest.value?.basic) {
    setValues({ ...tournamentStoreRequest.value.basic });
    if (tournamentStoreRequest.value.basic.image) {
      dragDropImageRef.value?.loadImage();
    }
  }
  if (!isEdition.value) {
    fields.football_type_id.fieldValue = FUTBOL_11_ID;
  }
});
onUnmounted(() => {
  resetForm();
});
const saveImageHandler = (image: File) => {
  saveImage(image);
  fields.image.fieldValue = image;
};
const removeImageHandler = () => {
  removeImage();
  fields.image.fieldValue = null;
};
const setDates = (dates: string[]) => {
  fields.start_date.fieldValue = dates[0];
  fields.end_date.fieldValue = dates[1];
};
</script>
<template>
  <v-container class="container">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Nombre del torneo* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
          placeholder="p.ej. Torneo de verano"
          outlined
          v-model="fields.name.fieldValue"
          v-bind="fields.name.fieldPropsValue"
          density="compact"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Imagen del torneo </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <DragDropImage
          ref="dragDropImageRef"
          :image="imageForm"
          @image-dropped="saveImageHandler"
          @remove-image="removeImageHandler"
        />
        <span
          class="text-error text-caption"
          :class="
            fields.image.fieldPropsValue['error-messages'][0] ? 'ml-2' : ''
          "
          >{{ fields.image.fieldPropsValue["error-messages"][0] ?? "" }}</span
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Formato* </span>
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
          v-model="fields.tournament_format_id.fieldValue"
          v-bind="fields.tournament_format_id.fieldPropsValue"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
              <v-tooltip activator="parent" location="end" max-width="300">
                {{ item.raw.description }}
              </v-tooltip>
            </v-list-item>
          </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Tipo* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-select
          no-data-text="No hay formatos"
          :items="footballTypes"
          density="compact"
          item-title="name"
          item-value="id"
          placeholder="Tipo"
          menu-icon="mdi-chevron-down"
          v-model="fields.football_type_id.fieldValue"
          v-bind="fields.football_type_id.fieldPropsValue"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
              <v-tooltip activator="parent" location="end" max-width="300">
                {{ item.raw.description }}
              </v-tooltip>
            </v-list-item>
          </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Categoría* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <CategorySelectComponent
          :disabled="false"
          v-model="fields.category_id.fieldValue"
          :errors="fields.category_id.fieldPropsValue"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Fechas del torneo* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <Calendar
          :custom-class="{ paddingTop: 0, paddingBottom: 0 }"
          ref="calendarRef"
          @selected-dates="setDates"
          :multi-calendar="true"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
