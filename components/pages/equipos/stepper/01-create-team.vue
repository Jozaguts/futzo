<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCategoryStore } from "~/store/useCategoryStore";
import DragDropImage from "~/components/pages/torneos/drag-drop-image.vue";
import ColorPicker from "~/components/shared/colorPicker.vue";
import type { ImageForm } from "~/models/tournament";
import useSchemas from "~/composables/useSchemas";
import { useTeamStore } from "~/store";
import { VPhoneInput } from "v-phone-input";

const imageForm = ref<ImageForm>({
  file: null,
  name: "",
  size: 0,
});
const dragDropImageRef = ref(null);
const colors = ref({
  home: {
    primary: "",
    secondary: "",
  },
  away: {
    primary: "",
    secondary: "",
  },
});
let locationsFind = ref([]);
const { categories } = storeToRefs(useCategoryStore());
const { teamStoreRequest } = storeToRefs(useTeamStore());
const { handleSubmit, resetForm, fields, validate, setValues } =
  useSchemas("create-team");
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
const search = useDebounceFn(async (place: string) => {
  if (!window.google || !window.google.maps || !window.google.maps.places) {
    console.error("Google Maps JavaScript API library is not loaded.");
    return [];
  }
  const autocompleteService =
    new window.google.maps.places.AutocompleteService();
  return new Promise((resolve) => {
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

const updateColorHandler = (
  color: string,
  isHomeColor: boolean,
  type: "primary" | "secondary",
) => {
  if (isHomeColor) {
    colors.value.home[type] = color;
    fields.colors.fieldValue = { ...colors.value };
  } else {
    colors.value.away[type] = color;
    fields.colors.fieldValue = { ...colors.value };
  }
};

onMounted(() => {
  if (teamStoreRequest.value?.teamData) {
    console.log("fired");
    setValues({ ...teamStoreRequest.value.teamData });
    colors.value = { ...teamStoreRequest.value.teamData.colors };
    if (teamStoreRequest.value.teamData.image) {
      dragDropImageRef.value.loadImage();
    }
  }
});
defineExpose({
  validate,
  handleSubmit,
});
</script>
<template>
  <v-container class="container" style="min-height: 480px">
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
        <span class="text-body-1">Dirección*</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-autocomplete
          v-model="fields.address.fieldValue"
          :items="locationsFind"
          no-data-text="No hay resultados"
          outlined
          return-object
          hide-selected
          clear-on-select
          clearable
          density="compact"
          no-filter
          v-bind="fields.address.fieldPropsValue"
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
      <v-col cols="12" lg="8" md="8" class="pt-0">
        <v-row no-gutters class="position-relative">
          <v-col cols="12">
            <v-row no-gutters>
              <v-col cols="6">
                <div class="color-pickers-container">
                  <div class="color-pickers-container__label">
                    <span class="text-body-2">Local</span>
                  </div>
                  <div class="color-picker-items-container">
                    <div
                      class="color-picker-items-container__item home primary"
                    >
                      <ColorPicker
                        @update-value="
                          updateColorHandler($event, true, 'primary')
                        "
                      />
                    </div>
                    <div
                      class="color-picker-items-container__item home secondary"
                    >
                      <ColorPicker
                        @update-value="
                          updateColorHandler($event, true, 'secondary')
                        "
                      />
                    </div>
                  </div>
                  <div>
                    <small class="text-error text-caption">{{
                      fields.colors.fieldPropsValue["error-messages"][0]
                    }}</small>
                  </div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="color-pickers-container">
                  <div class="color-pickers-container__label">
                    <span class="text-body-2">Visitante</span>
                  </div>
                  <div class="color-picker-items-container">
                    <div
                      class="color-picker-items-container__item away primary"
                    >
                      <ColorPicker
                        @update-value="
                          updateColorHandler($event, false, 'primary')
                        "
                      />
                    </div>
                    <div
                      class="color-picker-items-container__item away secondary"
                    >
                      <ColorPicker
                        @update-value="
                          updateColorHandler($event, false, 'secondary')
                        "
                      />
                    </div>
                  </div>
                  <div>
                    <small class="text-error text-caption">{{
                      fields.colors.fieldPropsValue["error-messages"][0]
                    }}</small>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Contacto</span>
      </v-col>
      <v-col col="12" lg="8" md="8">
        <v-text-field
          v-model="fields.email.fieldValue"
          v-bind="fields.email.fieldPropsValue"
          placeholder="Correo electrónico"
          outlined
          class="mb-4"
          density="compact"
        ></v-text-field>
        <client-only>
          <VPhoneInput
            variant="plain"
            :singleLine="true"
            v-model="fields.phone.fieldValue"
            class="phone-input"
            display-format="international"
            example="52 1 55 1234 5678"
            validate-on="blur lazy"
            :invalidMessage="
              ({ label, example }) => {
                return `${label} debe ser un numero valido (${example}).`;
              }
            "
          >
          </VPhoneInput>
          <small class="text-error">{{
            fields.phone.fieldPropsValue["error-messages"][0]
          }}</small>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="sass">
.color-picker-items-container__item.home.primary
  background: v-bind('colors.home.primary')
.color-picker-items-container__item.home.secondary
  background: v-bind('colors.home.secondary')
.color-picker-items-container__item.away.primary
  background: v-bind('colors.away.primary')
.color-picker-items-container__item.away.secondary
  background: v-bind('colors.away.secondary')
</style>
