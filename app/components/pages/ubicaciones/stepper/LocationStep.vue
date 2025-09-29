<script lang="ts" setup>
  import type { Prediction } from '~/interfaces'
  import { usePlaceSearch, getPlaceDetails } from '~/utils/googleSearch'
  import type { AutocompletePrediction } from '~/models/Schedule'
  import { GoogleMap, AdvancedMarker } from 'vue3-google-map'
  import type { LocationStoreRequest } from '~/models/Location'
  import { object, number, string, array } from 'yup'
  import { vuetifyConfig } from '~/utils/constants'
  const searchString = ref<AutocompletePrediction>()
  let foundedLocations = ref([] as AutocompletePrediction[])
  const tag = ref<string>('')
  const tagError = ref<boolean>(false)
  const { search } = usePlaceSearch()
  const { locationStoreRequest, formSteps, isEdition } = storeToRefs(useLocationStore())
  const tagHandler = () => {
    tagError.value = false
    // setFieldError('tags', 'La etiqueta ya existe o está vacía')
    const trimmedTag = tag.value?.trim()
    if (!trimmedTag || tags.value?.includes(trimmedTag)) {
      tagError.value = true
      return
    }
    //
    tags.value = [...(tags.value || []), trimmedTag]
    tag.value = ''
  }
  const removeTag = (tagToRemove: string) => {
    tags.value = tags?.value.filter((tag) => tag !== tagToRemove)
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
      if (details?.name) {
        name.value = details?.name
        address.value = details?.address
        place_id.value = value?.place_id
        position.value = {
          lat: details.lat,
          lng: details.lng,
        }
      }
    }
  }
  const markerOptions = computed(() => {
    return { position: position.value, title: 'test' }
  })

  const { defineField, meta, values } = useForm<
    Pick<LocationStoreRequest, 'name' | 'address' | 'fields_count' | 'tags' | 'id' | 'position' | 'place_id'> & {
      place: AutocompletePrediction
    }
  >({
    validationSchema: toTypedSchema(
      object({
        id: number().nullable(),
        name: string().required(),
        address: string().required(),
        fields_count: number().required().min(1),
        tags: array().nullable(),
        position: object({
          lat: number().required(),
          lng: number().required(),
        })
          .default({
            lat: 16.8639515,
            lng: -99.8822807,
          })
          .required(),
        place_id: string().required(),
      })
    ),
    initialValues: {
      id: locationStoreRequest.value.id,
      name: locationStoreRequest.value.name,
      address: locationStoreRequest.value.address,
      fields_count: isEdition.value ? locationStoreRequest.value.fields_count : 0,
      tags: locationStoreRequest.value.tags ?? [],
      position: locationStoreRequest.value.position,
      place_id: locationStoreRequest.value.place_id,
    },
  })
  const [id, id_props] = defineField('id', vuetifyConfig)
  const [name, name_props] = defineField('name', vuetifyConfig)
  const [address, address_props] = defineField('address', vuetifyConfig)
  const [fields_count, fields_count_props] = defineField('fields_count', vuetifyConfig)
  const [tags, tags_props] = defineField('tags', vuetifyConfig)
  const [position, position_props] = defineField('position', vuetifyConfig)
  const [place_id, place_id_props] = defineField('place_id', vuetifyConfig)
  const appendDefaultFieldStructure = (value: number) => {
    locationStoreRequest.value.fields = []
    const fields = []
    for (let i = 1; i <= value; i++) {
      // Deep clone WINDOWS so each field has its own windows object
      const cloned = JSON.parse(JSON.stringify(WINDOWS))
      fields.push({ id: i, name: `campo ${i}`, windows: cloned })
    }
    locationStoreRequest.value.fields = fields
  }

  watch(
    () => fields_count.value,
    (new_fields_count) => {
      if (!new_fields_count || new_fields_count < 1) return
      if (
        !Array.isArray(locationStoreRequest.value.fields) ||
        locationStoreRequest.value.fields.length !== new_fields_count
      ) {
        if (isEdition.value) {
          appendDefaultFieldStructure(new_fields_count)
        }
      }
    },
    { immediate: true }
  )
  watch(
    meta,
    () => {
      formSteps.value.steps[formSteps.value.current].disable = isEdition.value ? false : !meta.value.valid
      if (meta.value.valid && (meta.value.touched || meta.value.dirty)) {
        locationStoreRequest.value = { ...locationStoreRequest.value, ...values }
      }
    },
    { deep: true }
  )
</script>
<template>
  <v-container class="pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-autocomplete
          v-if="!isEdition"
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
        >
        </v-autocomplete
      ></v-col>
      <v-col lg="5" md="5" cols="12">
        <v-text-field
          active
          readonly
          density="compact"
          variant="plain"
          v-model="name"
          v-bind="name_props"
          class="mt-4 pl-1"
          label="Nombre"
        />

        <v-text-field
          active
          placeholder="p.ej. Las Américas #323 Centro, Puerto Vallarta."
          density="comfortable"
          readonly
          variant="plain"
          :value="address"
          v-bind="address_props"
          class="mt-4 pl-1"
          label="Dirección"
        ></v-text-field>
        <v-number-input
          :min="0"
          active
          :variant="isEdition ? 'plain' : 'outlined'"
          :readonly="isEdition"
          density="compact"
          :control-variant="isEdition ? 'hidden' : 'stacked'"
          v-model="fields_count"
          v-bind="fields_count_props"
          label="# Campos de juego"
          @update:model-value="appendDefaultFieldStructure"
          class="mt-4 pl-1"
          hide-details
        >
        </v-number-input>
        <v-text-field
          class="mt-4"
          v-model="tag"
          label="Etiquetas"
          placeholder="Ej. Cancha A, Estacionamiento, Entrada principal"
          density="compact"
          variant="outlined"
          @keyup.enter="tagHandler"
          clearable
          hint="Presiona ENTER o + para agregar"
          persistent-hint
          v-bind="tags_props"
        >
        </v-text-field>
        <v-chip-group column variant="outlined" center-active>
          <v-chip v-for="(t, index) in tags" :key="index" closable @click:close="removeTag(t)">
            {{ t }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col lg="7" md="7" cols="12" class="pa-2">
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
          style="width: 100%; height: 100%; min-height: 400px"
        >
          <AdvancedMarker :options="markerOptions" />
        </GoogleMap>
      </v-col>
    </v-row>
  </v-container>
</template>
