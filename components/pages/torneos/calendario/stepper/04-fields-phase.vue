<script lang="ts" setup>
import {useTournamentStore} from "~/store";
import LocationFormStep from '~/components/pages/torneos/calendario/location-form-step.vue'
import type {LocationFieldsRequest, NextHandlerType, WeekDay} from "~/models/Location";

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
const fields = ref<LocationFieldsRequest[]>([] as LocationFieldsRequest[])

const getStepAttribute = (attribute: 'location_name' | 'location_id', step: number) => fields.value.filter((field: LocationFieldsRequest) => field.step === step)[0][attribute]
const nextHandler = (value: NextHandlerType) => {
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
  fields.value = await client<Promise<LocationFieldsRequest[]>>(`/api/v1/admin/locations/fields?location_ids=${locationIds.join(',')}`)
  scheduleStoreRequest.value.fields_phase = fields.value
  currentStep.value = fields.value[0]?.step
})

const fieldDisableHandler = (data: NextHandlerType) => {
  fields.value.map((field) => {
    if (field.field_id === data.field_id) {
      field.disabled = !field.disabled
      for (let key in field.availability) {
        field.availability[key as WeekDay].enabled = field.availability[key as WeekDay].enabled === true ? false : field.availability[key as WeekDay].enabled
      }
    }
  })
  const _field = fields.value.filter(field => field.field_id === data.field_id)[0]
  nextHandler({
    availability: _field.availability,
    field_id: _field.field_id,
    isCompleted: false,
    name: _field.field_name,
  })
}
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
            item-title="location_name"
            item-subtitle="field_name"
        >
          <template #title="item">
            <p class="tex-body-1 text-capitalize mb-2" :class="fields[item.value - 1].disabled ? 'text-disabled' : ''">
              {{ getStepAttribute('location_name', item.step) }}
            </p>
          </template>
          <template #subtitle="item">
            <p class="tex-body-2 text-capitalize" :class="fields[item.value - 1].disabled ? 'text-disabled' : ''"> {{ getStepAttribute('field_name', item.step) }}</p>
          </template>
          <template v-for="field in fields" :key="field.step" #[`item.${field.step}`]>
            <LocationFormStep
                :field="field"
                :isLastStep="fields.length === currentStep -1"
                @next="nextHandler"
                @back="backHandler"
                @field-disabled="fieldDisableHandler"
            >
            </LocationFormStep>

          </template>
          <template #actions><small class="text-caption">* Presione Asignar para avanzar</small></template>
        </v-stepper-vertical>
      </v-col>
    </v-row>
  </v-container>
</template>


