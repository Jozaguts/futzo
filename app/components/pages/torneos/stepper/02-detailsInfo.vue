<script lang="ts" setup>
  import useSchemas from '~/composables/useSchemas'
  import type { AutocompletePrediction, Prediction } from '~/interfaces'

  const { isEdition, tournamentStoreRequest } = storeToRefs(useTournamentStore())

  const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
    isEdition.value ? 'edit-tournament-details-info' : 'create-tournament-details-info'
  )
  onMounted(() => {
    if (tournamentStoreRequest.value?.details) {
      setValues({ ...tournamentStoreRequest.value.details })
    }
    useLeaguesStore()
      .getLeagueLocations()
      .then((locations) => {
        items.value = locations
      })
  })
  onUnmounted(() => {
    resetForm()
  })
  defineExpose({
    validate,
    handleSubmit,
  })
  const search2 = ref('')
  const items = ref([])
  const searchHandler2 = (term: string) => console.log(term)
</script>
<template>
  <v-container class="container">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Ubicaciones* </span>
        <small class="d-block text-caption"> Donde se llevaran acabo los partidos </small>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-autocomplete
          multiple
          item-value="id"
          item-title="name"
          :item-props="(item) => ({ title: item?.name, subtitle: `Campos disponibles :${item?.field_count}` })"
          :search="search2"
          :items="items"
          v-model="fields.locationIds.fieldValue"
          v-bind="fields.locationIds.fieldPropsValue"
          @update:search="searchHandler2"
        >
        </v-autocomplete>
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
            <v-tooltip activator="parent"> Este premio será otorgado al finalizar el torneo. </v-tooltip>
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
