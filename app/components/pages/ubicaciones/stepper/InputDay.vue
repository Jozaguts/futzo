<script lang="ts" setup>
  import type { All } from '~/models/Location'
  import type { PropType } from 'vue'
  import '@vuepic/vue-datepicker/dist/main.css'
  import VueDatePicker from '@vuepic/vue-datepicker'
  type OnUpdateDay = (val: All) => void
  const props = defineProps<{ day?: All; label: string; onUpdateDay: OnUpdateDay; id: string; clearable?: boolean }>()
  function toHHmm(val: any): string {
    if (!val) return ''
    if (typeof val === 'string') return val
    if (val?.hours !== undefined && val?.minutes !== undefined) {
      const h = String(val.hours).padStart(2, '0')
      const m = String(val.minutes).padStart(2, '0')
      return `${h}:${m}`
    }
    if (val instanceof Date) {
      const h = String(val.getHours()).padStart(2, '0')
      const m = String(val.getMinutes()).padStart(2, '0')
      return `${h}:${m}`
    }
    return ''
  }

  function parseToHM(val: any): { hours: number; minutes: number } | null {
    if (!val) return null
    if (typeof val === 'string') {
      const [h, m] = val.split(':')
      return { hours: Number(h || 0), minutes: Number(m || 0) }
    }
    if (val instanceof Date) {
      return { hours: val.getHours(), minutes: val.getMinutes() }
    }
    if (val?.hours !== undefined && val?.minutes !== undefined) {
      return { hours: Number(val.hours || 0), minutes: Number(val.minutes || 0) }
    }
    return null
  }

  const startTime = computed({
    get: () => parseToHM(props.day.start) || { hours: 9, minutes: 0 },
    set: (val: any) => props.onUpdateDay({ ...props.day, start: toHHmm(val) }),
  })
  const endTime = computed({
    get: () => parseToHM(props.day.end) || { hours: 17, minutes: 0 },
    set: (val: any) => props.onUpdateDay({ ...props.day, end: toHHmm(val) }),
  })
</script>
<template>
  <v-row v-auto-animate="{ duration: 300 }">
    <v-col cols="2" lg="3" md="3" class="switch-container">
      <p>{{ $vuetify.display.mobile ? props.label.slice(0, 1) : props.label }}</p>
      <v-switch
        :model-value="props.day.enabled"
        @update:model-value="(val: boolean) => $emit('update-enabled', val)"
        class="mt-1"
        density="compact"
      />
    </v-col>
    <v-col v-if="props.day.enabled" cols="10" lg="9" md="9" class="select-hours-container">
      <div class="d-flex w-100">
        <div class="w-100 mr-2">
          <VueDatePicker
            time-picker
            class="custom-dp-location"
            :is24="true"
            v-model="startTime"
            teleport
            :clearable="props?.clearable"
          >
            <template #dp-input="{ value }">
              <v-text-field
                :value="value"
                density="compact"
                :variant="$vuetify.display.mobile ? 'underlined' : 'outlined'"
                rounded="lg"
                class="custom-location-input"
                :error="!value"
                :active="$vuetify.display.mobile"
              >
                <template #label v-if="$vuetify.display.mobile"> Desde </template>
                <template v-if="!$vuetify.display.mobile" #prepend-inner
                  ><span class="text-medium-emphasis">Desde</span></template
                >
              </v-text-field>
            </template>
          </VueDatePicker>
        </div>
        <div class="w-100">
          <VueDatePicker
            class="custom-dp-location"
            v-model="endTime"
            time-picker
            :is24="true"
            teleport
            :clearable="props?.clearable"
          >
            <template #dp-input="{ value }">
              <v-text-field
                class="custom-location-input"
                :value="value"
                density="compact"
                :variant="$vuetify.display.mobile ? 'underlined' : 'outlined'"
                rounded="lg"
                :error="!value"
                :active="$vuetify.display.mobile"
              >
                <template class="text-caption" #label v-if="$vuetify.display.mobile"> Hasta </template>
                <template v-if="!$vuetify.display.mobile" #prepend-inner
                  ><span class="text-medium-emphasis mr-1">Hasta</span></template
                >
              </v-text-field>
            </template>
          </VueDatePicker>
        </div>
      </div>
    </v-col>
    <v-col v-else cols="10" lg="9" md="9">
      <div class="day-disabled">
        <Icon name="material-symbols:dark-mode-outline" size="24" class="icon"></Icon>
        <span class="label">No disponible</span>
      </div>
    </v-col>
  </v-row>
</template>
<style lang="sass">
  @use "~/assets/scss/components/input-location-disabled.sass"
  @use "~/assets/css/vue-datepicker-custom.css"
</style>
