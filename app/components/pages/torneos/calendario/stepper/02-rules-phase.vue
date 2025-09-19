<script lang="ts" setup>
  import Tiebreakers from '~/components/pages/torneos/calendario/Tiebreakers.vue'
  import { object, boolean, array, string, number } from 'yup'
  import type { FormRulesPhaseStep, Tiebreaker } from '~/models/Schedule'
  import { vuetifyConfig } from '~/utils/constants'
  const { scheduleStoreRequest, calendarSteps } = storeToRefs(useScheduleStore())
  const { defineField, meta, values, setFieldError, resetForm } = useForm<FormRulesPhaseStep>({
    validationSchema: toTypedSchema(
      object({
        round_trip: boolean().required().default(false),
        tiebreakers: array()
          .of(
            object({
              id: number().required(),
              rule: string().required(),
              is_active: boolean().required().default(true),
              priority: number().required(),
            })
          )
          .min(1, 'Debes definir al menos una regla de desempate')
          .required()
          .test('at-least-one-active', 'Al menos una regla de desempate debe estar activa', (value) => {
            if (!value) return false
            return value.some((item) => item.is_active === true)
          }),
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
        calendarSteps.value.steps[calendarSteps.value.current].disable = value.every(
          (tiebreaker: Tiebreaker) => !tiebreaker.is_active
        )
      }
    },
    { deep: true }
  )
  watch(
    meta,
    (value) => {
      if (value) {
        calendarSteps.value.steps[calendarSteps.value.current].disable = !meta.value.valid
        if (meta.value.valid && meta.value.dirty) {
          scheduleStoreRequest.value.rules_phase = values
        }
      }
    },
    { deep: true }
  )
</script>
<template>
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
