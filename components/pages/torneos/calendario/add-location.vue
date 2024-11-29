<script lang="ts" setup>
import { useLocationStore } from "~/store";
import CustomDialog from "@/components/shared/custom-dialog/index.vue";
import type { AutocompletePrediction, Prediction } from "~/interfaces";
import useSchemas from "~/composables/useSchemas";

const { locationStoreRequest, locationDialog } =
  storeToRefs(useLocationStore());
const { handleSubmit, resetForm, fields, validate, setValues } =
  useSchemas("create-location");
let foundedLocations = ref([] as Prediction[]);
const handleSelectLocation = (place: AutocompletePrediction) => {
  const placeId = place?.place_id;
  if (!placeId) {
    fields.address.fieldValue = "";
    fields.city.fieldValue = "";
    return;
  }
  if (!window.google || !window.google.maps || !window.google.maps.places) {
    console.error("Google Maps JavaScript API library is not loaded.");
    return;
  }

  const placesService = new window.google.maps.places.PlacesService(
    document.createElement("div"),
  );
  placesService.getDetails(
    { placeId },
    (place: AutocompletePrediction, status: string) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        console.error("Error fetching place details:", status);
        return;
      }

      const addressComponents = place.address_components;
      const address = place.formatted_address;

      let city = "";
      for (const component of addressComponents) {
        if (component.types.includes("locality")) {
          city = component.long_name;
          break;
        }
      }

      fields.address.fieldValue = address;
      fields.city.fieldValue = city;
    },
  );
};
const searchHandler = async (place: string) => {
  const response = await search(place);
  if (response) {
    foundedLocations.value = response;
  }
};
const search = useDebounceFn(async (place: string): Promise<Prediction[]> => {
  if (!window.google || !window.google.maps || !window.google.maps.places) {
    console.error("Google Maps JavaScript API library is not loaded.");
    return [];
  }
  const autocompleteService =
    new window.google.maps.places.AutocompleteService();
  return new Promise((resolve) => {
    autocompleteService.getPlacePredictions(
      { input: place },
      (predictions: Prediction[], status: string) => {
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
</script>
<template>
  <CustomDialog
    max-width="600"
    title="Crear Nueva Locación"
    subtitle="Registra una nueva locación para el torneo.<br/>  Una vez creada, podrás configurar su disponibilidad."
  >
    <template #v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" lg="4" md="4">
            <span class="text-body-1"> Club/Lugar </span>
          </v-col>
          <v-col cols="12" lg="8" md="8">
            <v-autocomplete
              v-model="fields.location.fieldValue"
              @update:modelValue="handleSelectLocation"
              @blur="$emit('update:modelValue', $event)"
              :items="foundedLocations"
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
            <span class="text-body-1"> Ciudad</span>
          </v-col>
          <v-col cols="12" lg="8" md="8">
            <v-text-field
              @blur="$emit('update:modelValue', $event)"
              placeholder="p.ej. Puerto Vallarta"
              density="compact"
              variant="outlined"
              disabled
              v-model="fields.city.fieldValue"
              v-bind="fields.city.fieldPropsValue"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="4" md="4">
            <span class="text-body-1"> Dirección </span>
          </v-col>
          <v-col cols="12" lg="8" md="8">
            <v-text-field
              @blur="$emit('update:modelValue', $event)"
              placeholder="p.ej. Las Américas #323 Centro, Puerto Vallarta."
              density="compact"
              variant="outlined"
              disabled
              v-model="fields.address.fieldValue"
              v-bind="fields.address.fieldPropsValue"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #actions>
      <v-btn block variant="elevated">Crear locación</v-btn>
    </template>
  </CustomDialog>
</template>
