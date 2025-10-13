<script lang="ts" setup>
  import { computed, getCurrentInstance } from 'vue'
  import type { Day, LocationFieldsRequest, Text, WeekDay } from '~/models/Schedule'
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
    enabled: boolean().nullable(),
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
      .nullable(),
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
  const { values, resetForm, meta, errors, setFieldError } = useForm<{
    fields_phase: LocationFieldsRequest[]
  }>({
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
  const instance = getCurrentInstance()
  const isMobileDisplay = computed(() => Boolean(instance?.proxy?.$vuetify?.display?.mobile))
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
  const weekDays: WeekDay[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const getFieldPath = (fieldIndex: number, weekday: WeekDay) =>
    `fields_phase[${fieldIndex}].availability.${weekday}` as const
  const getDayError = (fieldIndex: number, weekday: WeekDay) => errors.value?.[getFieldPath(fieldIndex, weekday)] ?? ''
  const getSelectedIndexes = (day: Day | undefined) => {
    if (!day || !Array.isArray(day.intervals)) {
      return []
    }
    return day.intervals.reduce<number[]>((acc, interval, index) => {
      if (interval?.selected) {
        acc.push(index)
      }
      return acc
    }, [])
  }
  const getSelectedBoundary = (day: Day | undefined, boundary: 'start' | 'end'): Text | null => {
    const selectedIndexes = getSelectedIndexes(day)
    if (!selectedIndexes.length || !day || !Array.isArray(day.intervals)) {
      return null
    }
    if (boundary === 'start') {
      const interval = day.intervals[selectedIndexes[0]]
      return interval ? (interval.value as Text) : null
    }
    const lastIndex = selectedIndexes[selectedIndexes.length - 1]
    const interval = day.intervals[lastIndex]
    return interval ? (interval.value as Text) : null
  }
  const findIntervalIndex = (intervals: Day['intervals'], value: Text | null) =>
    value != null ? intervals.findIndex((interval) => interval.value === value) : -1
  const updateDayIntervals = (
    fieldIndex: number,
    weekday: WeekDay,
    nextStart: Text | null,
    nextEnd: Text | null,
    options: { forceEnable?: boolean } = {}
  ) => {
    const targetField = fields.value[fieldIndex]?.value
    if (!targetField) {
      return false
    }
    const currentDay = targetField.availability?.[weekday]
    if (!currentDay || typeof currentDay !== 'object') {
      return false
    }
    const intervals = currentDay.intervals || []
    const startIndex = findIntervalIndex(intervals, nextStart)
    const endIndex = findIntervalIndex(intervals, nextEnd)
    const fieldPath = getFieldPath(fieldIndex, weekday)

    if (endIndex !== -1 && startIndex === -1) {
      setFieldError(fieldPath, 'Selecciona una hora de inicio')
      return false
    }
    if (nextEnd != null && endIndex === -1) {
      return false
    }
    if (endIndex !== -1 && startIndex !== -1 && endIndex < startIndex) {
      setFieldError(fieldPath, 'La hora de fin debe ser posterior a la hora de inicio')
      return false
    }

    const nextIntervals = intervals.map((interval, index) => {
      if (startIndex === -1 && endIndex === -1) {
        return {
          ...interval,
          selected: false,
        }
      }
      if (startIndex !== -1 && endIndex === -1) {
        return {
          ...interval,
          selected: index === startIndex && !interval.disabled,
        }
      }
      const isRangeSelection = startIndex !== -1 && endIndex !== -1
      const shouldSelect =
        isRangeSelection && index >= startIndex && index <= endIndex && !interval.disabled
      return {
        ...interval,
        selected: shouldSelect,
      }
    })
    const nextDay: Day = {
      ...currentDay,
      intervals: nextIntervals,
      enabled:
        options.forceEnable === true
          ? true
          : options.forceEnable === false
            ? false
              : nextIntervals.some((interval) => interval.selected),
    }
    update(fieldIndex, {
      ...targetField,
      availability: {
        ...targetField.availability,
        [weekday]: nextDay,
      },
    })
    setFieldError(fieldPath, '')
    return true
  }
  const onStartChange = (fieldIndex: number, weekday: WeekDay, value: Text | null | undefined) => {
    const normalizedValue = value ?? null
    const targetField = fields.value[fieldIndex]?.value
    const currentDay = targetField?.availability?.[weekday]
    const fieldPath = getFieldPath(fieldIndex, weekday)
    const intervals = (currentDay as Day | undefined)?.intervals || []
    let currentEnd = getSelectedBoundary(currentDay as Day | undefined, 'end')
    if (normalizedValue && currentEnd) {
      const startIndex = findIntervalIndex(intervals, normalizedValue)
      const endIndex = findIntervalIndex(intervals, currentEnd)
      if (startIndex !== -1 && endIndex !== -1 && endIndex < startIndex) {
        currentEnd = null
      }
    }
    updateDayIntervals(fieldIndex, weekday, normalizedValue, currentEnd, { forceEnable: normalizedValue !== null })
  }
  const onEndChange = (fieldIndex: number, weekday: WeekDay, value: Text | null | undefined) => {
    const normalizedValue = value ?? null
    const targetField = fields.value[fieldIndex]?.value
    const currentDay = targetField?.availability?.[weekday]
    const currentStart = getSelectedBoundary(currentDay as Day | undefined, 'start')
    updateDayIntervals(fieldIndex, weekday, currentStart, normalizedValue)
  }
  const clearDaySelection = (fieldIndex: number, weekday: WeekDay) => {
    updateDayIntervals(fieldIndex, weekday, null, null, { forceEnable: false })
  }
  const enableDay = (fieldIndex: number, weekday: WeekDay) => {
    updateDayIntervals(fieldIndex, weekday, null, null, { forceEnable: true })
  }
  const getIntervals = (day: Day | undefined) => day?.intervals ?? []
  const getStartOptions = (day: Day | undefined) => {
    const intervals = (getIntervals(day) || []).filter((interval) => interval && !interval.disabled)
    const endValue = getSelectedBoundary(day, 'end')
    const endIndex = findIntervalIndex(intervals, endValue)
    if (endIndex === -1) {
      return intervals
    }
    return intervals.filter((_, index) => index <= endIndex)
  }
  const getEndOptions = (day: Day | undefined) => {
    const intervals = (getIntervals(day) || []).filter((interval) => interval && !interval.disabled)
    const startValue = getSelectedBoundary(day, 'start')
    const startIndex = findIntervalIndex(intervals, startValue)
    if (startIndex === -1) {
      return intervals
    }
    return intervals.filter((_, index) => index >= startIndex)
  }
  const isDayEnabled = (day: Day | undefined) => Boolean(day?.enabled)
  const getDayLabel = (day: Day | undefined) => (day as unknown as { mobile_label?: string })?.mobile_label || ''
  watch(
    () => values.fields_phase,
    (newFields) => {
      if (newFields) {
        scheduleStoreRequest.value.fields_phase = (newFields as LocationFieldsRequest[]).map((field) => ({
          ...field,
          availability: {
            ...field.availability,
            isCompleted: Boolean(field.availability?.isCompleted),
          },
        }))
      }
    },
    { deep: true, immediate: true }
  )
</script>
<template>
  <v-container>
    <v-row>
      <v-col class="pa-0 pa-lg-4 pa-md-4">
        <v-alert type="info" class="mb-4">
          <div>
            Partidos por Jornada: {{ matchesPerRound }}<br />
            Horas necesarias: {{ hours(requiredMinutesPerRound) }}
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
          <v-stepper-window class="mx-1 mx-lg-2 mx-md-2">
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
              <template v-for="weekday in weekDays">
                <div v-if="field.value.availability?.[weekday]" :key="`${field.value.field_id}-${weekday}`">
                  <div
                    v-if="isDayEnabled(field.value.availability[weekday] as Day)"
                    class="d-flex align-center flex-wrap"
                  >
                    <v-chip class="my-1">{{ getDayLabel(field.value.availability[weekday] as Day) }}</v-chip>
                    <v-select
                      density="compact"
                      variant="outlined"
                      :data-testid="`start-select-${field.value.field_id}-${weekday}`"
                      :model-value="getSelectedBoundary(field.value.availability[weekday] as Day, 'start')"
                      :items="getStartOptions(field.value.availability[weekday] as Day)"
                      item-title="text"
                      item-value="value"
                      item-disabled="disabled"
                      class="ml-1 mb-3"
                      :disabled="field.value.disabled"
                      @update:modelValue="onStartChange(index, weekday, $event)"
                    ></v-select>
                    <v-select
                      density="compact"
                      variant="outlined"
                      :data-testid="`end-select-${field.value.field_id}-${weekday}`"
                      :model-value="getSelectedBoundary(field.value.availability[weekday] as Day, 'end')"
                      :items="getEndOptions(field.value.availability[weekday] as Day)"
                      item-title="text"
                      item-value="value"
                      item-disabled="disabled"
                      class="ml-1 mb-3"
                      :disabled="
                        field.value.disabled || !getSelectedBoundary(field.value.availability[weekday] as Day, 'start')
                      "
                      @update:modelValue="onEndChange(index, weekday, $event)"
                    ></v-select>
                    <v-btn
                      density="compact"
                      class="ml-2"
                      height="40"
                      icon
                      max-width="40"
                      variant="text"
                      :rounded="!isMobileDisplay"
                      :disabled="
                        field.value.disabled || !getSelectedBoundary(field.value.availability[weekday] as Day, 'start')
                      "
                      :data-testid="`clear-select-${field.value.field_id}-${weekday}`"
                      @click="clearDaySelection(index, weekday)"
                      ><Icon name="futzo-icon:x-close"></Icon
                    ></v-btn>
                    <div class="text-error text-body-2 ml-2" v-if="getDayError(index, weekday)">
                      {{ getDayError(index, weekday) }}
                    </div>
                  </div>
                  <div v-else class="d-flex align-center my-2">
                    <span class="text-medium-emphasis">No disponible</span>
                    <v-btn
                      density="compact"
                      variant="text"
                      class="ml-2"
                      :disabled="field.value.disabled"
                      :data-testid="`enable-select-${field.value.field_id}-${weekday}`"
                      @click="enableDay(index, weekday)"
                      >+</v-btn
                    >
                  </div>
                </div>
              </template>
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
