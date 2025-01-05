<script lang="ts" setup>
import {useLocationStore, useTournamentStore} from "~/store";
import type {AutocompletePrediction, Prediction} from "~/interfaces";
import useSchemas from "~/composables/useSchemas";
import type {Location, TournamentLocationStoreRequest,} from "~/models/tournament";

const {locationDialog} = storeToRefs(useLocationStore());
const {tournamentLocationStoreRequest, tournamentId} =
    storeToRefs(useTournamentStore());
const {handleSubmit, resetForm, fields, validate, setValues} =
    useSchemas("create-location");
const tags = ref<string[]>([]);
const tag = ref<string>();
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
      {placeId},
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
        {input: place},
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
const saveLocationHandler = handleSubmit(async (values) => {
  tournamentLocationStoreRequest.value = {
    tournamentId: tournamentId.value as number,
    location: values as Location,
    tags: tags.value,
  };
  await useTournamentStore()
      .storeTournamentLocation()
      .finally(() => {
        tournamentLocationStoreRequest.value =
            {} as TournamentLocationStoreRequest;
        locationDialog.value = false;
        fields.location.fieldValue = null;
        Object.keys(fields).forEach((key: string) => {
          fields[key].fieldValue = null;
        });
        tag.value = "";
        tags.value = [];
      });
});
const tagHandler = () => {
  if (!tag.value) return;
  if (!tags.value.includes(tag.value)) {
    tags.value.push(tag.value);
    tag.value = "";
  }
};

const removeTag = (tag: string) => {
  tags.value = tags.value.filter((t) => t !== tag);
};
</script>
<template>
  <Dialog
      max-width="600"
      title="Crear Nueva Ubicación"
      subtitle="Registra una nueva ubicación para el torneo.<br/>  Una vez creada, podrás configurar su disponibilidad."
  >
    <template #v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" lg="4" md="4">
            <span class="text-body-1"> Club/Lugar* </span>
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
            <span class="text-body-1">Ciudad*</span>
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
            <span class="text-body-1">Dirección*</span>
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
        <v-row>
          <v-col cols="12" lg="4" md="4">
            <span class="text-body-1">Etiquetas </span>
          </v-col>
          <v-col cols="12" lg="8" md="8">
            <v-text-field
                placeholder="p.ej. Campo 1."
                density="compact"
                variant="outlined"
                hint="Presiona ENTER o + para agregar"
                v-model.trim="tag"
                @keyup.enter="tagHandler"
                persistent-hint
            >
              <template #append>
                <v-btn @click="tagHandler" size="small" density="compact" icon
                >+
                </v-btn>
              </template>
            </v-text-field>
            <v-chip-group colum variant="outlined">
              <v-chip
                  color="primary"
                  v-for="(tag, index) in tags"
                  :key="index"
                  :value="tag"
                  @click:close="removeTag(tag)"
                  closable
              >
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #actions>
      <v-btn block variant="elevated" @click="saveLocationHandler"
      >Crear ubicación
      </v-btn>
    </template>
  </Dialog>
</template>
