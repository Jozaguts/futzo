<script lang="ts" setup>
import DragDropImage from "~/components/pages/torneos/drag-drop-image.vue";
import useSchemas from "~/composables/useSchemas";
import VueDatePicker, { type DatePickerInstance } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { usePlayerStore, useTeamStore } from "~/store";
import { useCategoryStore } from "~/store/useCategoryStore";
import {
  dragDropImageRef,
  imageForm,
  removeImage,
  saveImage,
} from "~/composables/useImage";

const { isEdition, playerStoreRequest } = storeToRefs(usePlayerStore());
const { teams } = storeToRefs(useTeamStore());
const { categories } = storeToRefs(useCategoryStore());
const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
  isEdition.value ? "edit-player-basic-info" : "create-player-basic-info",
  { nationality: "Mexicana" },
);

const datepicker = ref<DatePickerInstance>(null);
const temporalDate = ref();
const internalModelValue = ref();
const saveImageHandler = (image: File) => {
  saveImage(image);
  fields.image.fieldValue = image;
};
const removeImageHandler = () => {
  removeImage();
  fields.image.fieldValue = null;
};
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
const customPosition = () => ({ top: -0, left: "50%" });
const setTemporalDate = (date: string) => {
  temporalDate.value = formatDate(new Date(date));
  return temporalDate.value;
};
const updateCategory = (teamId: number) => {
  const team = teams.value?.find((team) => team.id === teamId);
  if (team) {
    fields.category_id.fieldValue = team.category.id;
  }
};
onMounted(() => {
  useTeamStore().list();
  if (playerStoreRequest.value?.basic) {
    setValues({ ...playerStoreRequest.value.basic });
    if (playerStoreRequest.value.basic.image) {
      dragDropImageRef.value?.loadImage();
    }
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
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Nombre(s) del jugador*</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
          placeholder="p.ej. Cristiano"
          outlined
          v-model="fields.name.fieldValue"
          v-bind="fields.name.fieldPropsValue"
          density="compact"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Apellido(s) del jugador*</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
          placeholder="p.ej. Ronaldo"
          outlined
          v-model="fields.last_name.fieldValue"
          v-bind="fields.last_name.fieldPropsValue"
          density="compact"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Fecha de nacimiento*</span>
      </v-col>
      <v-col cols="12" lg="8" md="8" classs="position-relative">
        <client-only>
          <VueDatePicker
            :config="{
              keepViewOnOffsetClick: true,
            }"
            ref="datepicker"
            locale="es"
            @internal-model-change="internalModelValue = $event"
            :format="setTemporalDate"
            v-model="fields.birthdate.fieldValue"
            month-name-format="long"
            @date-update="setTemporalDate"
            :enable-time-picker="false"
            :alt-position="customPosition"
            :max-date="new Date()"
          >
            <template #action-row="{ selectDate }">
              <div class="action-row w-100">
                <div class="d-flex mt-2 justify-space-between w-100">
                  <button
                    class="select-button"
                    @click="datepicker?.closeMenu()"
                  >
                    cancelar
                  </button>
                  <button class="select-button" @click="selectDate">
                    Aplicar
                  </button>
                </div>
              </div>
            </template>
          </VueDatePicker>
        </client-only>
        <div class="text-error ml-3 pt-1 text-caption">
          {{ fields.birthdate.fieldPropsValue["error-messages"][0] ?? "" }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1">Nacionalidad*</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
          placeholder="p.ej. Mexicana"
          outlined
          v-model="fields.nationality.fieldValue"
          v-bind="fields.nationality.fieldPropsValue"
          density="compact"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1">Imagen del jugador* </span>
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
        <span class="text-body-1"> Equipo</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-autocomplete
          item-value="id"
          item-title="name"
          v-model="fields.team_id.fieldValue"
          density="compact"
          v-bind="fields.team_id.fieldPropsValue"
          :items="teams"
          @update:model-value="updateCategory"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1">Categoría</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-select
          item-value="id"
          item-title="name"
          v-model="fields.category_id.fieldValue"
          density="compact"
          disabled
          v-bind="fields.category_id.fieldPropsValue"
          :items="categories"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="sass">
@use "assets/scss/pages/players.sass"
@use "assets/css/vue-datepicker-custom"
</style>
