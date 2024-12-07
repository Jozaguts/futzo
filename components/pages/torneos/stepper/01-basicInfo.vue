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
import { FUTBOL_11_ID } from "~/utils/constants";

const { footballTypes } = storeToRefs(useLeaguesStore());
const { formats } = storeToRefs(useCategoryStore());
const { isEdition, tournamentStoreRequest } = storeToRefs(useTournamentStore());
const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
  isEdition.value
    ? "edit-tournament-basic-info"
    : "create-tournament-basic-info",
);
const saveImageHandler = (image: File) => {
  saveImage(image);
  fields.image.fieldValue = image;
};
const removeImageHandler = () => {
  removeImage();
  fields.image.fieldValue = null;
};
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
defineExpose({
  validate,
  handleSubmit,
});
</script>
<template>
  <v-container class="container">
    <BaseInput
      v-model="fields.name"
      label="Nombre del torneo*"
      placeholder="p.ej. Torneo de verano"
    />
    <BaseInput label="Fecha de inicio*">
      <template #input>
        <BaseCalendarInput
          v-model:start_date="fields.start_date.fieldValue"
          v-model:end_date="fields.end_date.fieldValue"
          :multiCalendar="true"
        />
      </template>
    </BaseInput>
    <BaseInput label="Imagen del torneo">
      <template #input>
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
      </template>
    </BaseInput>
    <BaseInput label="Formato*">
      <template #input>
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
      </template>
    </BaseInput>
    <BaseInput label="Tipo de torneo*">
      <template #input>
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
      </template>
    </BaseInput>
    <BaseInput label="Categoría*">
      <template #input>
        <CategorySelectComponent
          :disabled="false"
          v-model="fields.category_id.fieldValue"
          :errors="fields.category_id.fieldPropsValue"
        />
      </template>
    </BaseInput>
  </v-container>
</template>
