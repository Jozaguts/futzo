<script lang="ts" setup>
import {object, string} from "yup";
import type {AutocompletePrediction, Prediction} from "~/interfaces";
import search from "~/utils/googleSearch";

type LocationForm = {
  location: any;
  city: string;
  address: string;
}
const {defineField, errors} = useForm<LocationForm>({
  validationSchema: toTypedSchema(
      object(
          {
            location: object()
                .required("El campo es requerido"),
            city: string().required("El campo es requerido"),
            address: string().required("El campo es requerido"),
          }
      ))
})
const [location] = reactive(defineField('location'))
const [city] = reactive(defineField('city'))
const [address] = reactive(defineField('address'))
const tags = ref<string[]>([]);
const tag = ref<string>();
let foundedLocations = ref([] as Prediction[]);

const handleSelectLocation = (place: AutocompletePrediction) => {
  const placeId = place?.place_id;
  if (!placeId) {
    address.value = "";
    city.value = "";
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
        const _address = place.formatted_address;

        let _city = "";
        for (const component of addressComponents) {
          if (component.types.includes("locality")) {
            _city = component.long_name;
            break;
          }
        }

        address.value = _address;
        city.value = _city;
      },
  );
};
const searchHandler = async (place: string) => {
  const response = await search(place);
  if (response) {
    foundedLocations.value = response;
  }
};
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
  <v-card-text>
    <v-container>
      <v-row>
        <v-col cols="12" lg="4" md="4">
          <span class="text-body-1"> Club/Lugar </span>
        </v-col>
        <v-col cols="12" lg="8" md="8">
          <v-autocomplete
              v-model="location"
              placeholder="Selecciona una opción..."
              @update:modelValue="handleSelectLocation"
              :items="foundedLocations"
              outlined
              return-object
              hide-selected
              clear-on-select
              clearable
              no-filter
              :error-messages="errors.location"
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
              readonly
              v-model="city"
              :error-messages="errors.city"
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
              readonly
              v-model="address"
              :error-messages="errors.address"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="4" md="4">
          <span class="text-body-1">Etiquetas </span>
        </v-col>
        <v-col cols="12" lg="8" md="8">
          <v-text-field
              placeholder="p.ej. Campos Puerto Vallarta."
              density="compact"
              variant="outlined"
              hint="Presiona ENTER o + para agregar"
              v-model.trim="tag"
              @keyup.enter="tagHandler"
              persistent-hint
          >
            <template #append>
              <v-btn @click="tagHandler" density="compact" icon
              >
                <Icon name="futzo-icon:plus" filled></Icon>
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
      <v-row>
        <v-col cols="12 d-flex justify-space-between">
          <SecondaryBtn class="bg-white w-btn " text="Cancelar"/>
          <PrimaryBtn class="w-btn" text="Crear ubicación" icon="''" variant="elevated"/>
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>
<style scoped>
.w-btn {
  min-width: 49%;
  max-height: 42px;
}
</style>
