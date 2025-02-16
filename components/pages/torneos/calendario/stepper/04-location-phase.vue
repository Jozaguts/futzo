<script lang="ts" setup>
import {useTournamentStore} from "~/store";
import LocationFormStep from '~/components/pages/torneos/calendario/location-form-step.vue'

const {tournamentId, scheduleStoreRequest} = storeToRefs(useTournamentStore())
const {fields, meta} = useSchemas('calendar-location-step', {
  tournament_id: tournamentId.value,
  availability: scheduleStoreRequest.value?.general?.locations.map((location) => ({id: location.id, days: location.pivot.availability})),
})

const isValid = computed(() => {
  return meta.value.valid
})
defineExpose({
  isValid,
})
const steps = (scheduleStoreRequest.value?.general?.locations.map((location) => ({
  id: location.id,
  name: location.name,
})) ?? [])
const currentStep = ref(steps[0]?.id)

</script>
<template>
  <v-container fluid>
    <v-stepper-vertical
        class="pa-0 ma-0"
        flat
        v-model="currentStep"
        item-title="name"
        item-value="id"
        :items="steps"
    >
      <template #[`item.${currentStep}`]="{step}">
        <LocationFormStep :locations="fields.availability.fieldValue" :location-id="step"></LocationFormStep>
      </template>
    </v-stepper-vertical>
  </v-container>
</template>
