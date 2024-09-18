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
import validateAndFormatDate from "~/utils/dateCalendarValidation";

const { isEdition, playerStoreRequest } = storeToRefs(usePlayerStore());
const { teams } = storeToRefs(useTeamStore());
const { categories } = storeToRefs(useCategoryStore());
const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
  isEdition.value ? "edit-player-basic-info" : "create-player-basic-info",
);

const datepicker = ref<DatePickerInstance>(null);
const temporalDate = ref();
const internalModelValue = ref();
const saveImageHandler = (image: File) => {
  saveImage(image);
  fields.avatar.fieldValue = image;
};
const removeImageHandler = () => {
  removeImage();
  fields.avatar.fieldValue = null;
};
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
const customPosition = () => ({ top: -100, left: "50%" });
const setTemporalDate = (date: string) => {
  temporalDate.value = formatDate(new Date(date));
  return temporalDate.value;
};
const updateCategory = (teamId) => {
  const team = teams.value.find((team) => team.id === teamId);
  if (team) {
    fields.category_id.fieldValue = team.category.id;
  }
};
const updateMonth = (direction: "back" | "forward") => {
  if (!internalModelValue.value) {
    internalModelValue.value = new Date();
  }

  const date = new Date(internalModelValue.value);
  if (direction === "back") {
    date.setMonth(date.getMonth() - 1);
  } else {
    date.setMonth(date.getMonth() + 1);
  }
  console.log(date);
  datepicker.value?.updateInternalModelValue(date);
};
const formatDateToInput = useDebounceFn((dateString: any) => {
  const dates = validateAndFormatDate(dateString.target.value);
  if (!!dates) {
    temporalDate.value = dates?.format;
    datepicker.value?.updateInternalModelValue(dates?.raw);
  }
}, 1000);
onMounted(() => {
  useTeamStore().list();
  if (playerStoreRequest.value?.basic?.avatar) {
    dragDropImageRef.value?.loadImage();
  }
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
            v-model="fields.birthday.fieldValue"
            v-bind="fields.birthday.fieldPropsValue"
            month-name-format="long"
            @date-update="setTemporalDate"
            :enable-time-picker="false"
            :alt-position="customPosition"
          >
            <template #month-year="{ month, year, months }">
              <div class="d-flex flex-column">
                <div class="month-year-container">
                  <div class="arrow-left" @click="updateMonth('back')">
                    <nuxt-icon
                      name="calendar-arrow-left"
                      class="calendar-arrow-left"
                      filled
                    ></nuxt-icon>
                  </div>
                  <div class="date-container">
                    <div class="month">
                      {{ months[month]["text"] }}
                    </div>
                    <div class="year">
                      {{ year }}
                    </div>
                  </div>
                  <div class="arrow-right" @click="updateMonth('forward')">
                    <nuxt-icon
                      class="calendar-arrow-right"
                      name="calendar-arrow-right"
                      filled
                    ></nuxt-icon>
                  </div>
                </div>
                <div class="d-flex w-100">
                  <v-text-field
                    density="compact"
                    label="DD-MM-YY"
                    @keyup="formatDateToInput"
                    v-model="temporalDate"
                    clearable
                  ></v-text-field>
                </div>
              </div>
            </template>
            <template #action-row="{ selectDate }">
              <div class="action-row w-100">
                <v-divider />
                <div class="d-flex mt-2 justify-space-between w-100">
                  <v-btn
                    color="secondary"
                    class="select-button"
                    @click="datepicker?.closeMenu()"
                    variant="outlined"
                  >
                    cancelar
                  </v-btn>
                  <v-btn class="select-button" @click="selectDate">
                    Aplicar
                  </v-btn>
                </div>
              </div>
            </template>
          </VueDatePicker>
        </client-only>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Nacionalidad*</span>
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
        <span class="text-body-1"> Imagen del equipo* </span>
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
            fields.avatar.fieldPropsValue['error-messages'][0] ? 'ml-2' : ''
          "
          >{{ fields.avatar.fieldPropsValue["error-messages"][0] ?? "" }}</span
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
<style>
@import "assets/scss/pages/players.sass";
</style>
