<script lang="ts" setup>
import {ref} from "vue";
import type {Location} from "~/models/tournament";
import type {LocationStoreRequest} from "~/models/Location";
import {array, object, string, number} from "yup";
import type {Prediction} from "~/interfaces";
import {usePlaceSearch, getPlaceDetails} from '~/utils/googleSearch'
import {useLocationStore} from "~/store";
import type {AutocompletePrediction} from "~/models/Schedule";
import {GOOGLE_MAPS_OPTIONS} from "~/utils/constants";
import {storeToRefs} from "pinia";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/yup";

const {locationStoreRequest} = storeToRefs(useLocationStore())
const {defineField, errors, handleSubmit, validate, meta, controlledValues} = useForm<LocationStoreRequest>({
  validationSchema: toTypedSchema(
      object({
        name: string().required('El campo es requerido').default(locationStoreRequest.value.name),
        city: string().required('El campo es requerido').default(locationStoreRequest.value.city),
        address: string().required('El campo es requerido').default(locationStoreRequest.value.address),
        autocomplete_prediction: object().required('El campo es requerido').default(locationStoreRequest.value),
        fields_count: number().required('La cantidad de campos de juego es requerida').default(locationStoreRequest.value.fields_count),
        tags: array().of(string()),
        position: object({
          lat: number().required(),
          lng: number().required(),
        }).default(locationStoreRequest.value.position)
      })
  ),
})
const searchString = ref('');
const {search} = usePlaceSearch()
const [name] = reactive(defineField('name'))
const [city] = reactive(defineField('city'))
const [address] = reactive(defineField('address'))
const [tags] = reactive(defineField('tags'))
const [fields_count] = reactive(defineField('fields_count'))
const [autocomplete_prediction] = reactive(defineField('autocomplete_prediction'))
const [position] = reactive(defineField('position'))
let foundedLocations = ref([] as Location[])
const mapElement = ref<HTMLElement>()
let mapInstance = ref<google.maps.Map>()
const marker = ref<google.maps.Marker>()
const {AdvancedMarkerElement} = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
const eventListenerId = ref()
const itemProps = (item: Prediction) => {
  return {
    title: item?.structured_formatting?.main_text,
    subtitle: item?.structured_formatting?.secondary_text,
  }
}
const searchHandler = async (place: string) => {
  const response = await search(place)

  if (response) {
    foundedLocations.value = response
  }
}

const updateMarker = () => {
  if (marker.value) {
    eventListenerId.value = marker.value.addListener("dragend", async (event: google.maps.MapMouseEvent) => {
      const newLat = event.latLng?.lat();
      const newLng = event.latLng?.lng();

      if (!newLat || !newLng) return;

      position.value = {lat: newLat, lng: newLng};

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({location: position.value}, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          address.value = results[0].formatted_address;

          const cityComponent = results[0].address_components.find(component =>
              component.types.includes('locality')
          );
          city.value = cityComponent?.long_name || '';
        } else {
          console.error('Error en la geocodificación inversa:', status);
        }
      });
    });
  }
};

const valueHandler = (type: string, value: string) => {
  if (type === 'name') {
    locationStoreRequest.value.name = value
  }
}
const updateValue = async (value: AutocompletePrediction) => {

  if (value.place_id) {
    const details = await getPlaceDetails(value.place_id);

    if (details?.lat && details?.lng) {
      locationStoreRequest.value.position = {
        lat: details.lat,
        lng: details.lng
      };
      position.value = locationStoreRequest.value.position;
      if (mapInstance.value) {
        const latLng = new google.maps.LatLng(details.lat, details.lng);
        mapInstance.value.setCenter(latLng);
        marker.value.position = latLng
      }
    } else {
      console.error('No se pudieron obtener coordenadas del lugar.');
    }
  }

  autocomplete_prediction.value = value;
  city.value = value.structured_formatting?.secondary_text;
  address.value = value?.description;
  locationStoreRequest.value.city = value.structured_formatting?.secondary_text;
  locationStoreRequest.value.address = value?.description;
};
onMounted(async () => {
  locationStoreRequest.value.availability = [];
  if (window.google && window.google.maps) {
    mapInstance.value = new window.google.maps.Map(mapElement.value, {...GOOGLE_MAPS_OPTIONS, center: position.value})
    marker.value = new AdvancedMarkerElement({
      position: position.value,
      map: mapInstance.value,
      gmpDraggable: true,
    })
    updateMarker()
  }
})
const isValidFrom = computed(() => meta.value.valid)
const controlledValues2 = computed(() => controlledValues.value)
onUnmounted(() => {
  if (mapInstance.value && eventListenerId.value) {
    google.maps.event.removeListener(eventListenerId.value);
  }
});
watch(isValidFrom, (value) => {
  locationStoreRequest.value.completed = value
})
watch(controlledValues2, (value) => {
  locationStoreRequest.value = {...locationStoreRequest.value, ...value}
})
defineExpose({
  validate,
  handleSubmit,
  tags
});
</script>
<template>
  <v-container class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-autocomplete
            label="Direccion del centro deportivo o canchas de juego"
            v-model="searchString"
            :items="foundedLocations"
            outlined
            return-object
            :item-props="itemProps"
            hide-selected
            clear-on-select
            clearable
            no-filter
            @update:model-value="updateValue"
            @update:search="searchHandler($event)"
            :error-messages="errors.city"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="12">
        <div id="map" ref="mapElement" class="futzo-rounded"/>
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
            :value="city"
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
            :value="address"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1">Nombre del centro deportivo / canchas de juego*</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
            v-model="name"
            :error-messages="errors.name"
            @update:modelValue="valueHandler('name', $event)"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        Campos de juego
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-number-input
            v-model="fields_count"
            :error-messages="errors.fields_count"
            density="compact"
            :reverse="false"
            controlVariant="stacked"
            label="Campos en la misma locación"
            :hideInput="false"
            inset
            :min="1"
            variant="solo"></v-number-input>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
#map {
  height: 200px;
  width: 100%;

  margin: 0 auto;
}
</style>
