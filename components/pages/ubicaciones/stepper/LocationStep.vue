<script lang="ts" setup>
import {ref} from "vue";
import type {Location} from "~/models/tournament";
import type {LocationStoreRequest} from "~/models/Location";
import {array, object, string, number} from "yup";
import type {Prediction} from "~/interfaces";
import search from "~/utils/googleSearch";
import {useLocationStore} from "~/store";
import type {AutocompletePrediction} from "~/models/Schedule";

const {locationStoreRequest, isEdition} = storeToRefs(useLocationStore())
const {defineField, errors, handleSubmit, validate} = useForm<LocationStoreRequest>({
  validationSchema: toTypedSchema(
      object({
        name: string().required('El campo es requerido').default(locationStoreRequest.value.name),
        city: string().required('El campo es requerido').default(locationStoreRequest.value.city),
        address: string().required('El campo es requerido').default(locationStoreRequest.value.address),
        autocomplete_prediction: object().required('El campo es requerido').default(locationStoreRequest.value),
        fields_count: number().required('La cantidad de campos de juego es requerida').default(locationStoreRequest.value.fields_count),
        tags: array().of(string()),
      })
  ),
})
const searchString = ref('');
const [name] = reactive(defineField('name'))
const [city] = reactive(defineField('city'))
const [address] = reactive(defineField('address'))
const [tags] = reactive(defineField('tags'))
const [fields_count] = reactive(defineField('fields_count'))
const [autocomplete_prediction] = reactive(defineField('autocomplete_prediction'))
let foundedLocations = ref([] as Location[])
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
onMounted(() => {
  if (isEdition.value) {
    const {toUpdate} = useLocationStore()
    name.value = toUpdate?.name as unknown as string
    address.value = toUpdate?.address as unknown as string
    city.value = toUpdate?.city as unknown as string
  }
})
const valueHandler = (type: string, value: string) => {
  if (type === 'name') {
    locationStoreRequest.value.name = value
  }
}
defineExpose({
  validate,
  handleSubmit,
  tags
});
const updateValue = (value: AutocompletePrediction) => {
  autocomplete_prediction.value = value
  city.value = value.structured_formatting?.secondary_text
  address.value = value?.description
  locationStoreRequest.value.city = value.structured_formatting?.secondary_text
  locationStoreRequest.value.address = value?.description
}
</script>
<template>
  <v-container class="pa-0">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"/>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-autocomplete
            label="Buscar ubicación"
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
        <span class="text-body-1">Nombre*</span>
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
