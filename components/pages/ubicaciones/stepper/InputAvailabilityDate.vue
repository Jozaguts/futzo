<script lang="ts" setup>

const props = defineProps({
  day: {
    type: Object,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})
const startHourSelected = ref('')
const endHourSelected = ref('')
const endOptions = ref<{ value: string; text: string }[]>([]);
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
console.log({endOptions: endOptions.value})
</script>
<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <p class="text-body-1 text-primary">{{ props.label }}</p>
        <small v-if="day.enabled">Desde: {{ props.day.start.hours }}:00 Hasta {{ props.day.end.hours }}:00</small>
      </v-col>
      <v-col v-if="day.enabled" cols="6" class="pr-2 pt-2">
        <v-select v-model="startHourSelected" :items="startOptions" item-value="value" item-title="text" clearable></v-select>
      </v-col>
      <v-col v-if="day.enabled" cols="6" class="pr-2 pt-2">
        <v-select v-model="endHourSelected as string" :disabled="!endOptions.length" :items="endOptions" item-value="value" item-title="text"></v-select>
      </v-col>
      <v-col v-else cols="12" class="pr-2 pt-2">
        <div class="day-disabled">
          <Icon name="material-symbols:dark-mode-outline" size="24" class="icon"></Icon>
          <span class="label">No disponible</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
