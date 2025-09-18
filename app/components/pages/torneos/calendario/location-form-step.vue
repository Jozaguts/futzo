<script setup lang="ts">
  import InputAvailabilityDate from '~/components/pages/ubicaciones/stepper/InputAvailabilityDate.vue'
  import type { Day, LocationFieldsRequest, NextHandlerType, Text, WeekDay } from '~/models/Schedule'

  const props = defineProps<{
    field: LocationFieldsRequest
    isLastStep: boolean
  }>()
  const { field, isLastStep } = toRefs(props)

  const emits = defineEmits<{
    (e: 'back'): void
    (e: 'next', payload: NextHandlerType): void
    (e: 'update', payload: LocationFieldsRequest): void
  }>()

  const fieldDisabled = ref<boolean>(field.value.disabled)

  const emitFieldUpdate = (payload: Partial<LocationFieldsRequest>) => {
    emits('update', {
      ...field.value,
      ...payload,
    })
  }

  watch(
    () => field.value.disabled,
    (disabled) => {
      if (fieldDisabled.value !== disabled) {
        fieldDisabled.value = disabled
      }
    }
  )

  watch(fieldDisabled, (disabled) => {
    if (disabled === field.value.disabled) {
      return
    }
    emitFieldUpdate({ disabled })
  })

  const availabilities = computed(() => {
    const data = {} as Record<WeekDay, Day>
    ;(Object.keys(field.value.availability) as Array<keyof LocationFieldsRequest['availability']>).forEach((key) => {
      const value = field.value.availability[key]
      if (key !== 'isCompleted' && value && typeof value === 'object') {
        data[key as WeekDay] = value as Day
      }
    })
    return data
  })

  const formPayload = computed<NextHandlerType>(() => ({
    field_id: field.value.field_id,
    name: field.value.field_name,
    isCompleted: Boolean(field.value.availability.isCompleted),
    availability: field.value.availability,
  }))

  const updateDay = (weekday: WeekDay, nextDay: Day) => {
    emitFieldUpdate({
      availability: {
        ...field.value.availability,
        [weekday]: nextDay,
      } as LocationFieldsRequest['availability'],
    })
  }

  const inputDateChangedHandler = ({ weekday, selectedValues }: { weekday: WeekDay; selectedValues: Text[] }) => {
    const currentDay = field.value.availability[weekday]
    if (!currentDay || typeof currentDay !== 'object') {
      return
    }
    const nextDay: Day = {
      ...(currentDay as Day),
      intervals: (currentDay as Day).intervals.map((interval) => ({
        ...interval,
        selected: selectedValues.includes(interval.value),
      })),
    }
    updateDay(weekday, nextDay)
  }

  const dayDisabledHandler = ({ weekday, enabled }: { weekday: WeekDay; enabled: boolean }) => {
    const currentDay = field.value.availability[weekday]
    if (!currentDay || typeof currentDay !== 'object') {
      return
    }
    const nextDay: Day = {
      ...(currentDay as Day),
      enabled,
      intervals: enabled
        ? (currentDay as Day).intervals
        : (currentDay as Day).intervals.map((interval) => ({
            ...interval,
            selected: false,
          })),
    }
    updateDay(weekday, nextDay)
  }

  const selectAllHandler = ({ weekday, value }: { weekday: WeekDay; value: boolean }) => {
    const currentDay = field.value.availability[weekday]
    if (!currentDay || typeof currentDay !== 'object') {
      return
    }
    const nextDay: Day = {
      ...(currentDay as Day),
      intervals: (currentDay as Day).intervals.map((interval) => ({
        ...interval,
        selected: value && !interval.disabled,
      })),
    }
    updateDay(weekday, nextDay)
  }
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-switch
        v-model="fieldDisabled"
        inset
        color="primary"
        :label="fieldDisabled ? 'Campo inactivo' : 'Campo activo'"
      ></v-switch>
    </v-col>
  </v-row>
  <InputAvailabilityDate
    v-for="(item, weekday) in availabilities"
    :key="weekday"
    :day="field.availability[weekday] as Day"
    :weekday="weekday as WeekDay"
    :label="item.label"
    :disabled="fieldDisabled"
    @input-date-changed="inputDateChangedHandler"
    @day-disabled="dayDisabledHandler"
    @select-all="selectAllHandler"
  />
  <v-row>
    <v-col class="mt-2">
      <v-btn
        color="secondary"
        variant="outlined"
        class="vertical-stepper-button back"
        @click="emits('back')"
        :disabled="isLastStep"
        >Anterior
      </v-btn>
      <v-btn
        color="primary"
        variant="outlined"
        class="vertical-stepper-button next"
        @click="emits('next', formPayload)"
        >Marcar como completado
        <template #append>
          <Icon name="mdi-arrow-right"></Icon>
        </template>
      </v-btn>
    </v-col>
  </v-row>
</template>
<style lang="sass">
  @use "~/assets/scss/components/input-location-disabled.sass"
</style>
