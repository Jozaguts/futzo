<script lang="ts" setup>
  import type { LocationStoreRequest } from '~/models/Location'
  import { array, object, string, number } from 'yup'
  import type { Prediction } from '~/interfaces'
  import { usePlaceSearch, getPlaceDetails } from '~/utils/googleSearch'
  import type { AutocompletePrediction } from '~/models/Schedule'
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/yup'
  import { GoogleMap, AdvancedMarker } from 'vue3-google-map'
  import { useLocale } from 'vuetify/framework'

  const { locationStoreRequest, isEdition } = storeToRefs(useLocationStore())
  const { defineField, errors, meta, controlledValues, setFieldError } = useForm<LocationStoreRequest>({
    validationSchema: toTypedSchema(
      object({
        name: string().required('El campo es requerido').default(locationStoreRequest.value.name),
        city: string().required('El campo es requerido').default(locationStoreRequest.value.city),
        address: string().required('El campo es requerido').default(locationStoreRequest.value.address),
        autocomplete_prediction: object()
          .required('El campo es requerido')
          .default(locationStoreRequest.value.autocomplete_prediction),
        fields_count: number()
          .required('La cantidad de campos de juego es requerida')
          .default(locationStoreRequest.value.fields_count),
        tags: array().of(string()),
        position: object({
          lat: number().required(),
          lng: number().required(),
        }).default(locationStoreRequest.value.position),
      })
    ),
  })
  const searchString = ref('')
  const { search } = usePlaceSearch()
  const [name] = reactive(defineField('name'))
  const [city] = reactive(defineField('city'))
  const [address] = reactive(defineField('address'))
  const [tags] = reactive(defineField('tags'))
  const [fields_count] = reactive(defineField('fields_count'))
  const [autocomplete_prediction] = reactive(defineField('autocomplete_prediction'))
  const [position] = reactive(defineField('position'))
  let foundedLocations = ref([] as AutocompletePrediction[])
  const { decimalSeparator } = useLocale()
  console.log(decimalSeparator?.value)
  const tag = ref<string>('')
  const tagHandler = () => {
    setFieldError('tags', 'La etiqueta ya existe o está vacía')
    const trimmedTag = tag.value?.trim()
    if (!trimmedTag || tags.value?.includes(trimmedTag)) {
      setFieldError('tags', 'La etiqueta ya existe o está vacía')
      return
    }

    tags.value = [...(tags.value || []), trimmedTag]
    tag.value = ''
  }
  const removeTag = (tagToRemove: string) => {
    tags.value = tags.value?.filter((tag) => tag !== tagToRemove)
  }
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
  const updateValue = async (value: AutocompletePrediction) => {
    if (value?.place_id) {
      const details = await getPlaceDetails(value.place_id)
      defineField('name', details?.name as string)
      locationStoreRequest.value.name = details?.name as string
      name.value = details?.name as string
      if (details?.lat && details?.lng) {
        locationStoreRequest.value.position = {
          lat: details.lat,
          lng: details.lng,
        }
        position.value = locationStoreRequest.value.position
      }
    } else {
      console.error('No se pudieron obtener coordenadas del lugar.')
    }
    autocomplete_prediction.value = value
    city.value = value.structured_formatting?.secondary_text
    address.value = value?.description
    locationStoreRequest.value.city = value.structured_formatting?.secondary_text
    locationStoreRequest.value.address = value?.description
  }
  const isValidFrom = computed(() => meta.value.valid)
  const controlledValues2 = computed(() => controlledValues.value)
  const markerOptions = computed(() => {
    return { position: position.value, title: name.value }
  })
  watch(isValidFrom, (value) => {
    locationStoreRequest.value.completed = value
  })
  watch(controlledValues2, (value) => {
    locationStoreRequest.value = { ...locationStoreRequest.value, ...value }
  })
  onMounted(async () => {
    if (isEdition.value) {
      locationStoreRequest.value.completed = true
      if (locationStoreRequest.value?.tags?.length) {
        tags.value = [...locationStoreRequest.value.tags]
      }
    }
  })
</script>
<template>
  <v-container class="pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-autocomplete
          label="Dirección del centro deportivo o canchas de juego"
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
        </v-autocomplete
      ></v-col>
      <v-col cols="5">
        <v-text-field
          active
          density="compact"
          variant="outlined"
          :value="name"
          readonly
          :error-messages="errors.name"
          class="mt-4"
          label="Nombre"
        />
        <v-text-field
          active
          placeholder="p.ej. Puerto Vallarta"
          density="compact"
          variant="outlined"
          readonly
          class="mt-4"
          label="Cuidad"
          :value="city"
        ></v-text-field>
        <v-text-field
          active
          placeholder="p.ej. Las Américas #323 Centro, Puerto Vallarta."
          density="compact"
          variant="outlined"
          readonly
          :value="address"
          class="mt-4"
          label="Dirección"
        ></v-text-field>
        <v-number-input
          :min="1"
          active
          variant="outlined"
          density="compact"
          control-variant="stacked"
          v-model="fields_count"
          :error-messages="errors.fields_count"
          label="# Campos de juego"
          class="mt-4"
          hide-details
        >
        </v-number-input>
        <v-text-field
          class="mt-4"
          v-model="tag"
          label="Etiquetas"
          active
          placeholder="Ej. Cancha A, Estacionamiento, Entrada principal"
          density="compact"
          variant="outlined"
          @keyup.enter="tagHandler"
          clearable
          hint="Presiona ENTER o + para agregar"
          persistent-hint
          :error-messages="errors.tags"
        >
        </v-text-field>
        <v-chip-group column variant="outlined" center-active>
          <v-chip v-for="(t, index) in tags" :key="index" closable @click:close="removeTag(t)">
            {{ t }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col cols="7" class="pa-2">
        <GoogleMap
          :api-key="useRuntimeConfig().public.googleMapsAPIKey"
          :mapId="useRuntimeConfig().public.googleMapId"
          class="futzo-rounded"
          :center="position"
          :camera-control="false"
          :disable-double-click-zoom="true"
          :clickable-icons="false"
          :disable-default-ui="true"
          :zoom="15"
          id="map"
          style="width: 100%; height: 100%"
        >
          <AdvancedMarker :options="markerOptions" />
        </GoogleMap>
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
