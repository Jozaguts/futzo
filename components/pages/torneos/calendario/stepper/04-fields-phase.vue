<script lang="ts" setup>
import {useTournamentStore} from "~/store";
import LocationFormStep from '~/components/pages/torneos/calendario/location-form-step.vue'

const {tournamentId, scheduleStoreRequest} = storeToRefs(useTournamentStore())

const {meta, validate} = useSchemas('calendar-location-step', {
  tournament_id: tournamentId.value,
  fields: scheduleStoreRequest.value.fields_phase
})


const isValid = computed(() => {
  return meta.value.valid
})
defineExpose({
  isValid,
  validate
})

const currentStep = ref()
const fields = ref()

const getStepAttribute = (attribute: string, step: number) => fields.value.filter(field => field.step === step)[0][attribute]
const updateChangedHandler = (data) => {
  console.log({data})
}
const nextHandler = (value) => {
  scheduleStoreRequest.value.fields_phase.map((field) => {
    if (field.field_id === value.field_id) {
      field.availability.isCompleted = true;
    }
  })
  if (currentStep.value < fields.value.length) {
    currentStep.value += 1
  }
}
const backHandler = () => {
  if (currentStep.value > 1) {
    currentStep.value -= 1
  }
}
onMounted(async () => {
  const locationIds = scheduleStoreRequest.value.general.locations.map(location => location.id)
  const client = useSanctumClient()
  fields.value = await client(`/api/v1/admin/locations/fields?location_ids=${locationIds.join(',')}`)
  scheduleStoreRequest.value.fields_phase = fields.value
  currentStep.value = fields.value[0]?.step
})
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-stepper-vertical
            class="pa-0 ma-0"
            flat
            v-model="currentStep"
            :items="fields"
            item-value="step"
            item-title="name"
            complete-icon="mdi-check"
        >
          <template #icon>
            <Icon name="mdi:soccer-field"></Icon>
          </template>
          <template #title="item">
            <p class="tex-body-1 text-capitalize">
              {{ getStepAttribute('location_name', item.step) }}
            </p>
          </template>
          <template #subtitle="item">
            <p class="tex-body-2 text-capitalize"> {{ getStepAttribute('field_name', item.step) }}</p>
          </template>
          <template v-for="field in fields" :key="field.step" #[`item.${field.step}`]="item">
            <LocationFormStep
                :field="field"
                @field-changed="updateChangedHandler"
                :isLastStep="fields.length === currentStep -1"
                @next="nextHandler"
                @back="backHandler">
            </LocationFormStep>
          </template>
          <template #actions></template>
        </v-stepper-vertical>
      </v-col>
    </v-row>
  </v-container>
</template>


