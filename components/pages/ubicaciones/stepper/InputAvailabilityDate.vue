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
const startHourSelected = ref([])
const emits = defineEmits(['input-date-changed', 'day-disabled'])
const selectHandler = (id, day, value) => {
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
            <p class="text-body-1 " :class="day.enabled ? 'text-primary' : 'text-disabled'">{{ props.label }}</p>
            <small :class="day.enabled ? '' : 'text-disabled'">Horario disponible: {{ props.day.available_range }}</small>
          </div>
          <div class="w-25 ml-3">

          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pr-2 pt-2">
        <div>
          <v-select
              v-model="startHourSelected"
              :items="props.day.intervals"
              item-value="value"
              item-title="text"
              clearable
              :disabled="!props.day.enabled"
              multiple
              @update:modelValue="((value) => selectHandler(props.id, props.day, value))"
          >
            <template #item="{props}">
              <v-list-item v-bind="props" v-if="!startHourSelected.includes('*')"></v-list-item>
            </template>
          </v-select>
          <v-tooltip location="left" max-width="120">
            <template #default>
              <small class="text-caption">{{ day.enabled ? 'Desactivar dia' : 'Activar dia' }}</small>
            </template>

            <template v-slot:activator="{props}">
              <v-btn @click="dayDisabledHandler" v-bind="props" class="float-right" icon size="small" variant="text">
                <Icon :name="day.enabled ? 'mdi:lock-open': 'mdi:lock' " size="24" :class="day.enabled ? 'text-disabled' : 'bg-primary' "></Icon>
              </v-btn>
            </template>
          </v-tooltip>
          <!--          <v-switch v-model="day.enabled" inline flat center-affix density="compact"></v-switch>-->
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>
