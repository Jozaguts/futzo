<script lang="ts" setup>
  import type { TournamentLocation } from '~/models/tournament'
  import AddLocationDialog from '~/components/pages/torneos/calendario/add-location.vue'

  const { locationDialog } = storeToRefs(useLocationStore())
  const { selectedLocationsHasError } = storeToRefs(useTournamentStore())
  const selectedLocations = defineModel<TournamentLocation[]>('selectedLocations', { default: [] })
  defineProps({
    locations: {
      type: Array as PropType<TournamentLocation[]>,
      required: true,
    },
  })

  function selectLocationHandler(location: TournamentLocation, isSelected: { value: boolean }) {
    if (location) {
      if (!selectedLocations.value.some((_location) => _location.id === location.id)) {
        selectedLocations.value.push(location)
      }
      if (!isSelected.value) {
        removeTag(location)
      }
    }
  }

  function removeTag(location: TournamentLocation) {
    selectedLocations.value = selectedLocations.value.filter((_location) => _location.id !== location.id)
  }

  watch(
    selectedLocations,
    () => {
      if (selectedLocations.value.length > 0) {
        selectedLocationsHasError.value = false
      }
    },
    { deep: true }
  )
</script>
<template>
  <v-sheet rounded>
    <div class="pa-4">
      <p class="text-caption">
        <span :class="selectedLocationsHasError ? 'text-error' : ''"
          >Selecciona las ubicaciones donde se jugarán los partidos.</span
        >
        Si necesitas agregar una nueva ubicación, haz clic en 'Agregar Ubicación'.
      </p>
      <v-responsive class="overflow-y-auto" max-height="280">
        <v-chip-group filter multiple class="mt-3" column v>
          <v-chip
            v-for="location in locations"
            :key="location.id"
            :value="location.id"
            selected-class="text-primary"
            @group:selected="(e) => selectLocationHandler(location, e)"
          >
            <span class="d-inline-block text-truncate" style="max-width: 100px">
              {{ location?.tags?.length ? location.tags[0].name.es : location?.name }}
            </span>
          </v-chip>
        </v-chip-group>
      </v-responsive>
    </div>
    <v-divider />
    <div class="pa-2">
      <v-btn
        color="primary"
        size="small"
        block
        text="Agregar Nueva Ubicación"
        variant="outlined"
        @click="locationDialog = !locationDialog"
      ></v-btn>
    </div>
  </v-sheet>
  <AddLocationDialog v-model="locationDialog" />
</template>
