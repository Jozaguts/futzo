<script lang="ts" setup>
  import type { Day, Label, Text, WeekDay } from '~/models/Schedule'

  const props = defineProps<{
    day: Day
    label: Label
    weekday: WeekDay
    disabled?: boolean
  }>()

  const emits = defineEmits<{
    (e: 'input-date-changed', payload: { weekday: WeekDay; selectedValues: Text[] }): void
    (e: 'select-all', payload: { weekday: WeekDay; value: boolean }): void
  }>()

  const selectableValues = computed<Text[]>(() =>
    props.day.intervals.filter((interval) => !interval.disabled).map((interval) => interval.value as Text)
  )
  const selectedValues = ref<Text[]>([])
  const lastEmittedSelected = ref<Text[]>([])
  const skipNextSelectedEmit = ref(false)

  const arraysEqual = (a: Text[], b: Text[]) => {
    if (a.length !== b.length) {
      return false
    }
    const sortedA = [...a].sort()
    const sortedB = [...b].sort()
    return sortedA.every((value, index) => value === sortedB[index])
  }

  watch(
    () =>
      props.day.intervals.map((interval) => ({
        value: interval.value as Text,
        selected: interval.selected,
      })),
    (intervalsState) => {
      const nextSelected = intervalsState.filter((item) => item.selected).map((item) => item.value)
      if (!arraysEqual(selectedValues.value, nextSelected)) {
        selectedValues.value = nextSelected
      }
    },
    { immediate: true, deep: true }
  )

  watch(selectedValues, (values) => {
    if (skipNextSelectedEmit.value) {
      skipNextSelectedEmit.value = false
      lastEmittedSelected.value = [...values]
      return
    }
    if (arraysEqual(values, lastEmittedSelected.value)) {
      return
    }
    lastEmittedSelected.value = [...values]
    emits('input-date-changed', { weekday: props.weekday, selectedValues: values })
  })

  const selectAll = computed({
    get: () => {
      if (!selectableValues.value.length) {
        return false
      }
      return selectableValues.value.every((value) => selectedValues.value.includes(value))
    },
    set(value: boolean) {
      skipNextSelectedEmit.value = true
      emits('select-all', { weekday: props.weekday, value })
    },
  })
</script>
<template>
  <v-container class="pa-0 pb-1">
    <v-row no-gutters>
      <v-col cols="12" class="pr-2 pt-2">
        <v-card class="futzo-rounded">
          <v-card-title> {{ label }}</v-card-title>
          <v-card-subtitle>Horas disponibles {{ day.available_range }}</v-card-subtitle>
          <v-card-text>
            <v-switch
              v-model="selectAll"
              label="Todo el día"
              :disabled="disabled || !selectableValues.length"
            ></v-switch>
            <v-chip-group
              column
              multiple
              selected-class="text-primary"
              v-model="selectedValues"
              :disabled="disabled"
            >
              <v-chip
                v-for="(interval, index) in day.intervals"
                :key="index"
                filter
                :value="interval.value"
                :disabled="interval.disabled"
                class="ma-1"
                :text="interval.text"
              >
              </v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
