<script lang="ts" setup>
  import type { Day, Label, WeekDay } from '~/models/Location'

  const props = defineProps({
    day: {
      type: Object as PropType<Day>,
      required: true,
    },
    label: {
      type: String as PropType<Label>,
      required: true,
    },
    id: {
      type: String as PropType<WeekDay>,
      required: true,
    },
  })
  const startHourSelected = ref<string[]>(['*'])

  const emits = defineEmits(['input-date-changed', 'day-disabled'])
  const selectHandler = (id: string, day: Day, value: string[]) => {
    if (value.length > 1 && value.some((value) => value === '*')) {
      startHourSelected.value = ['*']
      value = ['*']
    }
    startHourSelected.value.sort()
    emits('input-date-changed', {
      id,
      day,
      value,
    })
  }
  const dayDisabledHandler = () => {
    emits('day-disabled', props.id)
  }
</script>
<template>
  <v-container class="pa-0 pb-1">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="d-flex w-100">
          <div class="d-75">
            <p
              class="text-body-1"
              :class="day.enabled ? 'text-primary' : 'text-disabled'"
            >
              {{ props.label }}
            </p>
            <small :class="day.enabled ? '' : 'text-disabled'"
              >Horario disponible: {{ props.day.available_range }}</small
            >
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pr-2 pt-2">
        <div>
          <v-select
            label="Horas seleccionadas"
            v-model="startHourSelected"
            :items="
              props.day.intervals.filter((interval) => !interval.disabled)
            "
            item-value="value"
            item-title="text"
            clearable
            :disabled="!props.day.enabled"
            multiple
            @update:modelValue="
              (value: string[]) => selectHandler(props.id, props.day, value)
            "
          >
            <template #item="{ props }">
              <v-list-item
                v-bind="props"
                v-if="!startHourSelected.includes('*')"
              ></v-list-item>
            </template>
          </v-select>
          <v-tooltip location="left" max-width="120">
            <template #default>
              <small class="text-caption">{{
                day.enabled ? 'Desactivar dia' : 'Activar dia'
              }}</small>
            </template>

            <template v-slot:activator="{ props }">
              <v-btn
                @click="dayDisabledHandler"
                v-bind="props"
                class="float-right"
                icon
                size="small"
                variant="text"
              >
                <Icon
                  :name="day.enabled ? 'mdi:lock-open' : 'mdi:lock'"
                  size="24"
                  :class="day.enabled ? 'text-disabled' : 'bg-primary'"
                ></Icon>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
