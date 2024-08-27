<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCategoryStore } from "~/store/useCategoryStore";
import DragDropImage from "~/components/pages/torneos/drag-drop-image.vue";
import ColorPicker from "~/components/shared/colorPicker.vue";
import type { ImageForm } from "~/models/tournament";
import { useTeamStore } from "~/store/useTeamStore";
import useSchemas from "~/composables/useSchemas";

const dragDropImageRef = ref(null);
const imageForm = ref<ImageForm>({
  file: null,
  name: "",
  size: 0,
});
const { categories, formats } = storeToRefs(useCategoryStore());
const teamStore = useTeamStore();
const { steps, isEdition } = storeToRefs(teamStore);
let locationsFind = ref([]);
const { handleSubmit, resetForm, fields } = useSchemas("create-team");

const saveImage = (file: File) => {
  imageForm.value.file = file;
  imageForm.value.name = file.name;
  imageForm.value.size = file.size;
  fields.image.fieldValue = file;
};
const removeImage = () => {
  imageForm.value.file = null;
  imageForm.value.name = "";
  imageForm.value.size = 0;
  fields.image.fieldValue = null;
};
const handleSelectLocation = (value: any) => {
  console.log(value);
  fields.address.fieldValue = value.description;
  fields.city.fieldValue = value.terms[2].value;
};

const search = useDebounceFn(async (place: string) => {
  if (!window.google || !window.google.maps || !window.google.maps.places) {
    console.error("Google Maps JavaScript API library is not loaded.");
    return [];
  }
  const autocompleteService =
    new window.google.maps.places.AutocompleteService();
  return new Promise((resolve, reject) => {
    autocompleteService.getPlacePredictions(
      { input: place },
      (predictions, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
          console.error("Error fetching place predictions:", status);
          resolve([]);
          return;
        }
        resolve(predictions);
      },
    );
  });
}, 400);
const searchHandler = async (place: string) => {
  const response = await search(place);
  if (response) {
    locationsFind.value = response;
  }
};

const show1 = ref(false);
const primaryColor = ref("");
const secondaryColor = ref("");
const updateColorHandler = (color: string, type: string) => {
  if (type === "primary") {
    primaryColor.value = color;
    fields.primary_color.fieldValue = color;
  } else {
    secondaryColor.value = color;
    fields.secondary_color.fieldValue = color;
  }
};
</script>
<template>
  <v-container class="container">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Nombre del equipo* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
          placeholder="p.ej. Equipo de verano"
          outlined
          v-model="fields.name.fieldValue"
          v-bind="fields.name.fieldPropsValue"
          density="compact"
        ></v-text-field>
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
          @image-dropped="saveImage"
          @remove-image="removeImage"
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
        <span class="text-body-1"> Categoría* </span>
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
          v-model="fields.category_id.fieldValue"
          v-bind="fields.category_id.fieldPropsValue"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Ciudad* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-autocomplete
          v-model="fields.location.fieldValue"
          @update:modelValue="handleSelectLocation"
          :items="locationsFind"
          no-data-text="No hay resultados"
          outlined
          return-object
          hide-selected
          clear-on-select
          clearable
          no-filter
          v-bind="fields.location.fieldPropsValue"
          @update:search="searchHandler($event)"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              two-line
              :title="item.value.structured_formatting.main_text"
              :subtitle="item.value.structured_formatting.secondary_text"
            ></v-list-item>
          </template>
          <template v-slot:selection="{ item }">
            <v-list-item>
              <v-list-item-title
                v-text="item.value.structured_formatting.main_text"
              ></v-list-item-title>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Colores del equipo* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-row no-gutters class="position-relative">
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              placeholder="Color primario"
              class="team-color-picker primary"
              v-model="fields.primary_color.fieldValue"
              v-bind="fields.primary_color.fieldPropsValue"
            >
              <template #append-inner>
                <div @click="show1 = true">
                  <ColorPicker
                    :show="show1"
                    @update-value="updateColorHandler($event, 'primary')"
                  />
                </div>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              placeholder="Color Secudario"
              class="team-color-picker secondary"
              v-model="fields.secondary_color.fieldValue"
              v-bind="fields.secondary_color.fieldPropsValue"
            >
              <template #append-inner>
                <div @click="show1 = true">
                  <ColorPicker
                    :show="show1"
                    @update-value="updateColorHandler($event, 'secondary')"
                  />
                </div>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Descripción* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-textarea
          v-model="fields.description.fieldValue"
          v-bind="fields.description.fieldPropsValue"
          placeholder="Una breve descripción del equipo..."
          variant="outlined"
          dense
          rows="2"
          class="rounded-lg"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="sass">
.team-color-picker
  margin-right: 8px
.team-color-picker > .v-input__control > .v-field--appended
  padding-inline-end: 0
.team-color-picker.primary > .v-input__control > .v-field--appended > .v-field__append-inner
  background: v-bind(primaryColor)
  padding: 0
  border-top-right-radius: 4px
  border-bottom-right-radius: 4px
.team-color-picker.secondary > .v-input__control > .v-field--appended > .v-field__append-inner
  background: v-bind(secondaryColor)

.team-color-picker > .v-input__control > .v-field--appended > .v-field__append-inner > div
  cursor: pointer
  min-height: 100%
  min-width: 44px
</style>
