<script lang="ts" setup>
  import LocationFormStep from '~/components/pages/torneos/calendario/location-form-step.vue'
  import type { LocationFieldsRequest, NextHandlerType } from '~/models/Schedule'
  import { object, boolean, array, string, number } from 'yup'
  const { tournamentId } = storeToRefs(useTournamentStore())
  const {
    scheduleStoreRequest,
    hasEnoughCapacity,
    reservedMinutesPerWeek,
    requiredMinutesPerRound,
    matchDurationMins,
    matchesPerRound,
  } = storeToRefs(useScheduleStore())
  const { t } = useI18n()
  const intervalSchema = object({
    value: string().required('El campo value es obligatorio'),
    text: string().required('El campo text es obligatorio'),
    selected: boolean().required(),
    disabled: boolean().required(),
  })
  const daySchema = object({
    enabled: boolean().required(),
    available_range: string().when('enabled', {
      is: true,
      then: (schema) =>
        schema
          .required('El rango disponible es obligatorio')
          .matches(/^\d{2}:\d{2} a \d{2}:\d{2}$/, 'Formato esperado: "HH:MM a HH:MM"'),
      otherwise: (schema) => schema.nullable(),
    }),
    intervals: array()
      .of(intervalSchema)
      .when('enabled', {
        is: true,
        then: (schema) => schema.min(1, 'Debe existir al menos un intervalo'),
        otherwise: (schema) => schema.default([]),
      }),
    label: string()
      .oneOf(
        ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        'El label debe ser un día válido'
      )
      .required(),
  })
  const availabilitySchema = object({
    monday: daySchema.required(),
    tuesday: daySchema.required(),
    wednesday: daySchema.required(),
    thursday: daySchema.required(),
    friday: daySchema.required(),
    saturday: daySchema.required(),
    sunday: daySchema.required(),
    isCompleted: boolean().required(),
  })
  const locationFieldSchema = object({
    field_id: number().required(),
    step: number().required(),
    field_name: string().required(),
    location_name: string().required(),
    location_id: number().required(),
    disabled: boolean().required(),
    availability: availabilitySchema.required(),
  })
  const { values, resetForm, meta } = useForm<{ fields_phase: LocationFieldsRequest[] }>({
    validationSchema: toTypedSchema(
      object({
        fields_phase: array().of(locationFieldSchema).required(),
      })
    ),
    initialValues: {
      fields_phase: scheduleStoreRequest.value.fields_phase as LocationFieldsRequest[],
    },
  })
  const { fields, update } = useFieldArray<LocationFieldsRequest>('fields_phase')
  const currentStep = ref(1)

  const nextHandler = (value: NextHandlerType) => {
    const targetIndex = fields.value.findIndex((entry) => entry.value.field_id === value.field_id)
    if (targetIndex !== -1) {
      const currentField = fields.value[targetIndex].value
      update(targetIndex, {
        ...currentField,
        availability: {
          ...currentField.availability,
          isCompleted: true,
        },
      })

      const nextEntry = fields.value[targetIndex + 1]
      if (nextEntry) {
        currentStep.value = nextEntry.value.step
      }
    }
  }
  const backHandler = () => {
    const currentIndex = fields.value.findIndex((entry) => entry.value.step === currentStep.value)
    if (currentIndex > 0) {
      currentStep.value = fields.value[currentIndex - 1].value.step
    }
  }
  onMounted(async () => {
    const locationIds = scheduleStoreRequest.value.general.locations.map((location) => location.id)
    const client = useSanctumClient()
    const data = await client<LocationFieldsRequest[]>(
      `/api/v1/admin/locations/fields?location_ids=${locationIds.join(',')}&tournament_id=${tournamentId.value}`
    )
    resetForm({ values: { fields_phase: data as LocationFieldsRequest[] } })
    scheduleStoreRequest.value.fields_phase = data as LocationFieldsRequest[]
  })

  const hours = (mins: number) => (mins / 60).toFixed(1)
  const updateField = (index: number, newValue: LocationFieldsRequest) => {
    update(index, newValue)
  }
  watch(
    () => values.fields_phase,
    (newFields) => {
      if (newFields) {
        scheduleStoreRequest.value.fields_phase = (newFields as LocationFieldsRequest[]).map((field) => ({
          ...field,
        }))
      }
    },
    { deep: true, immediate: true }
  )
  watch(
    meta,
    (value) => {
      if (value) {
        console.log(meta.value.valid)
      }
    },
    { deep: true, immediate: true }
  )
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-alert type="info" class="mb-4">
          <div>
            Partidos por Jornada: {{ matchesPerRound }}<br />
            Horas necesarias: {{ hours(requiredMinutesPerRound) }} por jornada
          </div>
          <div>
            Horas reservadas:
            <span class="font-weight-black" :class="hasEnoughCapacity ? 'text-green-darken-3' : 'text-error'">
              {{ hours(reservedMinutesPerWeek) }}h.</span
            >
          </div>
        </v-alert>
        <v-stepper editable class="pa-0 ma-0" v-model="currentStep">
          <v-stepper-header>
            <v-stepper-item
              v-for="(field, index) in fields"
              :key="index + 1"
              :value="field.value.step"
              complete-icon="mdi-check-circle"
            >
              <template #title>
                {{ field.value.location_name }}
              </template>
              <template #subtitle>
                {{ field?.value.field_name }}
              </template>
            </v-stepper-item>
          </v-stepper-header>
          <v-stepper-window>
            <v-stepper-window-item
              v-for="(field, index) in fields"
              :key="field.key"
              :value="field?.value?.step"
              :title="field?.value?.location_name"
              :subtitle="field?.value?.field_name"
              complete-icon="mdi-check-circle"
              edit-icon="mdi-check-circle"
              expand-icon="mdi-chevron-down"
            >
              <LocationFormStep
                :field="field.value"
                :isLastStep="field.isLast"
                @next="nextHandler"
                @back="backHandler"
                @update="(newValue) => updateField(index, newValue)"
              ></LocationFormStep>
            </v-stepper-window-item>
          </v-stepper-window>
          <template #actions>
            <small class="text-caption pl-8 mb-2 d-inline-block">* Marcar como completado para avanzar/finalizar</small>
          </template>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>
