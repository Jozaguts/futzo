<script lang="ts" setup>

const props = defineProps({
  day: {
    type: Object,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
  }
})
const emits = defineEmits(['input-date-changed'])

const startOptions = computed(() => {
  const start = props.day.start
  const end = props.day.end
  const options = []
  for (let i = Number(start.hours); i <= Number(end.hours); i++) {
    for (let j = 0; j < 60; j += 60) {
      options.push({
        value: `${i}:${j < 10 ? '0' + j : j}`,
        text: `${i}:${j < 10 ? '0' + j : j}`
      })
    }
  }
  return options
})
const endOptions = ref<{ value: string; text: string }[]>(startOptions.value);
const startHourSelected = ref(startOptions.value[0])
const endHourSelected = ref(startOptions.value[startOptions.value.length - 1])
const DURATION_GAME = 2; // HOURS
watch(startHourSelected, (value) => {
  if (!value) {
    endOptions.value = [];
    return
  }
  const start = value.split(':')
  const options = []
  for (let i = Number(start[0]) + DURATION_GAME; i <= Number(props.day.end.hours); i++) {
    for (let j = 0; j < 60; j += 60) {
      options.push({
        value: `${i}:${j < 10 ? '0' + j : j}`,
        text: `${i}:${j < 10 ? '0' + j : j}`
      })
    }
  }
  endOptions.value = options
})
</script>
<template>
  <v-container class="pa-0 pb-1">
    <v-row no-gutters>
      <v-col v-if="day.enabled" cols="12">
        <p class="text-body-1 text-primary">{{ props.label }}</p>
        <small v-if="day.enabled">Horario disponible: {{ props.day.start.hours }}:00 a {{ props.day.end.hours }}:00</small>
      </v-col>
      <v-col v-if="day.enabled" cols="6" class="pr-2 pt-2">

        <v-select
            v-model="startHourSelected"
            :items="startOptions"
            item-value="value"
            item-title="text"
            clearable
            @update:modelValue="emits('input-date-changed', { day:{id, value: $event,isStart: true}})"
        />
      </v-col>
      <v-col v-if="day.enabled" cols="6" class="pr-2 pt-2">
        <v-select
            v-model="endHourSelected"
            :disabled="!endOptions.length"
            :items="endOptions"
            item-value="value"
            item-title="text"
            @update:modelValue="emits('input-date-changed', { day:{id, value: $event, isStart: false}})"
        ></v-select>
      </v-col>
      <!--      <v-col v-else cols="12" class="pr-2 pt-2">-->
      <!--        <div class="day-disabled">-->
      <!--          <Icon name="material-symbols:dark-mode-outline" size="24" class="icon"></Icon>-->
      <!--          <span class="label">No disponible</span>-->
      <!--        </div>-->
      <!--      </v-col>-->
    </v-row>
  </v-container>
</template>
