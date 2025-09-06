<script lang="ts" setup>
  import type { Prediction } from '~/interfaces'
  import { usePlaceSearch, getPlaceDetails } from '~/utils/googleSearch'
  import type { AutocompletePrediction } from '~/models/Schedule'
  import { GoogleMap, AdvancedMarker } from 'vue3-google-map'
  import { inject } from 'vue'
  import type { Windows } from '~/models/Location'
  import { WINDOWS } from '~/utils/constants'

  const { form, updateForm } = inject('location_form') as any
  const searchString = ref<AutocompletePrediction>()
  const { search } = usePlaceSearch()
  let foundedLocations = ref([] as AutocompletePrediction[])
  const tag = ref<string>('')
  const tagError = ref<boolean>(false)
  const tagHandler = () => {
    tagError.value = false
    // setFieldError('tags', 'La etiqueta ya existe o está vacía')
    const trimmedTag = tag.value?.trim()
    if (!trimmedTag || form?.value?.tags?.includes(trimmedTag)) {
      tagError.value = true
      return
    }
    //
    form.value.tags = [...(form.value.tags || []), trimmedTag]
    tag.value = ''
  }
  const removeTag = (tagToRemove: string) => {
    form.value.tags = form.value.tags?.filter((tag) => tag !== tagToRemove)
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
        updateForm({
          ...form.value,
          name: details?.name,
          address: details?.address,
          position: {
            lat: details.lat,
            lng: details.lng,
          },
        })
      }
    }
  }
  const markerOptions = computed(() => {
    return { position: form.value.position, title: form.value.name }
  })
  watch(
    () => form.value,
    () => {
      form.value.steps.location.completed = !!(form?.value?.name && form?.value?.address && form?.value?.fields_count >= 1)
    },
    { deep: true }
  )

  const appendDefaultFieldStructure = (value: number) => {
    form.value.fields = []
    const fields = []
    for (let i = 1; i <= value; i++) {
      // Deep clone WINDOWS so each field has its own windows object
      const cloned = JSON.parse(JSON.stringify(WINDOWS))
      fields.push({ id: i, name: `campo ${i}`, windows: cloned })
    }
    updateForm({ ...form.value, fields })
  }

  // Mantener sincronizados fields con fields_count
  watch(
    () => form.value.fields_count,
    (val) => {
      if (!val || val < 1) return
      // si no hay fields o el tamaño no coincide, regenerar
      if (!Array.isArray(form.value.fields) || form.value.fields.length !== val) {
        appendDefaultFieldStructure(val)
      }
    },
    { immediate: true }
  )
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
        >
        </v-autocomplete></v-col
      >
      <v-col cols="5">
        <v-text-field
          active
          disabled
          density="compact"
          variant="outlined"
          :value="form?.name"
          class="mt-4"
          label="Nombre"
        />

        <v-text-field
          active
          placeholder="p.ej. Las Américas #323 Centro, Puerto Vallarta."
          density="comfortable"
          variant="outlined"
          disabled
          :value="form.address"
          class="mt-4"
          label="Dirección"
        ></v-text-field>
        <v-number-input
          :min="1"
          active
          variant="outlined"
          density="compact"
          control-variant="stacked"
          v-model="form.fields_count"
          label="# Campos de juego"
          @update:model-value="appendDefaultFieldStructure"
          class="mt-4"
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
        >
        </v-text-field>
        <v-chip-group column variant="outlined" center-active>
          <v-chip v-for="(t, index) in form.tags" :key="index" closable @click:close="removeTag(t)">
            {{ t }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col cols="7" class="pa-2">
        <GoogleMap
          :api-key="useRuntimeConfig().public.googleMapsAPIKey"
          :mapId="useRuntimeConfig().public.googleMapId"
          class="futzo-rounded"
          :center="form.position"
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
