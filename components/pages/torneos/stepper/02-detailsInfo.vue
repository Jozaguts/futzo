<script lang="ts" setup>
import useSchemas from "~/composables/useSchemas";
import { useTournamentStore } from "~/store";
import type { AutocompletePrediction, Prediction } from "~/interfaces";

const { isEdition, tournamentStoreRequest } = storeToRefs(useTournamentStore());
let locationsFind = ref([] as Prediction[]);
const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
  isEdition.value
    ? "edit-tournament-details-info"
    : "create-tournament-details-info",
);

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
    locationsFind.value = response;
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
onMounted(() => {
  if (tournamentStoreRequest.value?.details) {
    setValues({ ...tournamentStoreRequest.value.details });
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
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Club/Lugar </span>
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
        <span class="text-body-1"> Ciudad</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
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
          placeholder="p.ej. Las Américas #323 Centro, Puerto Vallarta."
          density="compact"
          variant="outlined"
          disabled
          v-model="fields.address.fieldValue"
          v-bind="fields.address.fieldPropsValue"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Premio </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
          placeholder="p.ej. trofeo y premio en efectivo..."
          density="compact"
          variant="outlined"
          v-model="fields.prize.fieldValue"
          v-bind="fields.prize.fieldPropsValue"
        >
          <template #append-inner>
            <Icon name="futzo-icon:help-circle" class="cursor-pointer"></Icon>
            <v-tooltip activator="parent">
              Este premio será otorgado al finalizar el torneo.
            </v-tooltip>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Descripción </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-textarea
          v-model="fields.description.fieldValue"
          v-bind="fields.description.fieldPropsValue"
          placeholder="Una breve descripción del torneo..."
          variant="outlined"
          dense
          rows="2"
          class="rounded-lg"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>
