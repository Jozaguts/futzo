<script lang="ts" setup>
import {ref} from "vue";
import type {Location} from "~/models/tournament";
import type {LocationStoreRequest} from "~/models/Location";
import {array, object, string} from "yup";
import type {AutocompletePrediction, Prediction} from "~/interfaces";
import search from "~/utils/googleSearch";
import {useLocationStore} from "~/store";

const {locationStoreRequest, isEdition, formSteps} = storeToRefs(useLocationStore())
const {defineField, errors, handleSubmit, resetForm, validate} = useForm<LocationStoreRequest>({
  validationSchema: toTypedSchema(
      object({
        name: string().transform((value) => {
          handleSelectLocation(value)
          if (value) {
            autocomplete_prediction.value = value
            return value?.structured_formatting?.secondary_text
          } else {
            city.value = ''
            address.value = ''
            autocomplete_prediction.value = {}
          }
        }).required('El campo es requerido'),
        city: string().required('El campo es requerido'),
        address: string().required('El campo es requerido'),
        autocomplete_prediction: object().required('El campo es requerido'),
        tags: array().of(string()),
      })
  ),
})
const [name] = reactive(defineField('name'))
const [city] = reactive(defineField('city'))
const [address] = reactive(defineField('address'))
const [tags] = reactive(defineField('tags'))
const [autocomplete_prediction] = reactive(defineField('autocomplete_prediction'))
let foundedLocations = ref([] as Location[])
const tag = ref<string>()
const itemProps = (item: Prediction) => {
  return {
    title: item?.structured_formatting?.main_text,
    subtitle: item?.structured_formatting?.secondary_text,
  }
}
const handleSelectLocation = (place: Prediction): void => {
  const placeId = place?.place_id
  if (!placeId) {
    return
  }
  if (!window.google || !window.google.maps || !window.google.maps.places) {
    console.error('Google Maps JavaScript API library is not loaded.')
    return
  }

  const placesService = new window.google.maps.places.PlacesService(
      document.createElement('div')
  )
  placesService.getDetails({placeId}, (place: AutocompletePrediction, status: string) => {

    if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
      console.error('Error fetching place details:', status)
      return
    }

    const addressComponents = place.address_components

    for (const component of addressComponents) {
      if (component.types.includes('locality')) {
        city.value = component.long_name
        address.value = place.formatted_address
      }
    }
  })

}
const searchHandler = async (place: string) => {
  const response = await search(place)
  if (response) {
    foundedLocations.value = response
  }
}
const tagHandler = () => {
  if (!tag.value || tags.value?.includes(tag.value)) return;
  tags.value = tags.value ? [...tags.value, tag.value] : [tag.value];
  tag.value = '';
}
const removeTag = (tag: string) => {
  const index = tags?.value?.findIndex((t) => t === tag);
  if (index !== -1) {
    tags.value?.splice(index as number, 1);
  }
}
onMounted(() => {
  if (locationStoreRequest.value?.address) {
    name.value = locationStoreRequest.value?.autocomplete_prediction
  }
  if (locationStoreRequest.value?.tags) {
    tags.value = locationStoreRequest.value.tags
  }
  if (isEdition.value) {
    const {toUpdate} = useLocationStore()
    name.value = toUpdate?.autocomplete_prediction as unknown as string
    if (toUpdate?.tags.length) {
      tags.value = toUpdate.tags
    }
  }
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
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Club/Lugar </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-autocomplete
            v-model="name"
            placeholder="Selecciona una opción..."
            :items="foundedLocations"
            outlined
            return-object
            :item-props="itemProps"
            hide-selected
            clear-on-select
            clearable
            no-filter
            :error-messages="errors.name"
            @update:search="searchHandler($event)"
        >
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
            :value="city"
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
            :value="address"
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
            @keyup.enter="tagHandler"
            v-model="tag"
            persistent-hint
        >
          <template #append>
            <v-btn @click="tagHandler" density="compact" icon
            >
              <Icon name="futzo-icon:plus" filled></Icon>
            </v-btn>
          </template>
        </v-text-field>
        <v-chip-group colum variant="outlined" center-active>
          <v-chip
              color="primary"
              v-for="(tag) in tags"
              :key="tag"
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
