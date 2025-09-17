<script lang="ts" setup>
  import Tiebreakers from '~/components/pages/torneos/calendario/Tiebreakers.vue'
  import { object, boolean, array, string, number } from 'yup'
  import type { FormRulesPhaseStep } from '~/models/Schedule'
  import { vuetifyConfig } from '~/utils/constants'
  const { scheduleStoreRequest } = storeToRefs(useScheduleStore())
  const { defineField, meta, values } = useForm<FormRulesPhaseStep>({
    validationSchema: toTypedSchema(
      object({
        round_trip: boolean().required().default(false),
        tiebreakers: array().of(
          object({
            id: number().required(),
            rule: string().required(),
            is_active: boolean().required().default(true),
            priority: number().required(),
          })
        ),
      })
    ),
    initialValues: scheduleStoreRequest.value.rules_phase,
  })
  const [round_trip, round_trip_props] = defineField('round_trip', vuetifyConfig)
  const [tiebreakers, tiebreakers_props] = defineField('tiebreakers', vuetifyConfig)
  watch(
    tiebreakers,
    (value) => {
      if (value) {
        scheduleStoreRequest.value.rules_phase.tiebreakers = value
      }
    },
    { deep: true }
  )
</script>
<template>
  <pre>
      {{ scheduleStoreRequest.rules_phase }}
    </pre
  >
  <v-container class="container">
    <BaseInput label=" Ida y Vuelta?">
      <template #input>
        <v-switch
          v-model="round_trip"
          v-bind="round_trip_props"
          @update:modelValue="(value) => (scheduleStoreRequest.rules_phase.round_trip = value as boolean)"
        />
      </template>
    </BaseInput>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1 d-block"> Reglas de desempate</span>
        <small>Ordena en orden ascendente la prioridad de desempate</small>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <Tiebreakers v-model="tiebreakers" />
      </v-col>
    </v-row>
  </v-container>
</template>
