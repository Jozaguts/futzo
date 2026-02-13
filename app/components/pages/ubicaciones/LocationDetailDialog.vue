<script lang="ts" setup>
import type {LocationCard} from '~/models/Location'
import {Icon} from '#components'

const props = defineProps<{
  modelValue: boolean
  location: LocationCard | null
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const dialogState = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emits('update:modelValue', value),
})

const mapPreviewUrl = computed(() => {
  const lat = Number(props.location?.position?.lat)
  const lng = Number(props.location?.position?.lng)
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return ''
  const key = useRuntimeConfig().public.googleMapsAPIKey
  if (!key) return ''
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=680x320&scale=2&markers=color:0x7c3aed|${lat},${lng}&key=${key}`
})

const normalizedFields = computed(() => {
  const fields = Array.isArray(props.location?.fields) ? props.location?.fields : []
  return fields.map((field: any) => {
    const schedules: Array<{ day: string; start: string; end: string }> = []

    if (Array.isArray(field?.windows)) {
      field.windows.flat().forEach((windowItem: any) => {
        if (windowItem?.day && windowItem?.start && windowItem?.end) {
          schedules.push({
            day: String(windowItem.day),
            start: String(windowItem.start),
            end: String(windowItem.end),
          })
        }
      })
    } else if (field?.windows && typeof field.windows === 'object') {
      const dayMap: Record<string, string> = {
        mon: 'Lunes',
        tue: 'Martes',
        wed: 'Miercoles',
        thu: 'Jueves',
        fri: 'Viernes',
        sat: 'Sabado',
        sun: 'Domingo',
      }
      Object.entries(dayMap).forEach(([key, day]) => {
        const ranges = Array.isArray(field.windows[key]) ? field.windows[key] : []
        ranges.forEach((range: any) => {
          if ((range?.enabled || (range?.start && range?.end)) && range?.start && range?.end) {
            schedules.push({
              day,
              start: String(range.start),
              end: String(range.end),
            })
          }
        })
      })
    }

    return {
      id: field?.id,
      name: field?.name ?? 'Campo',
      schedules,
    }
  })
})
</script>

<template>
  <v-dialog v-model="dialogState" max-width="760">
    <v-card class="futzo-rounded location-detail-dialog">
      <v-card-title class="location-detail-dialog__title">
        <div>
          <h3>{{ location?.name || 'Ubicacion' }}</h3>
          <p>{{ location?.address || 'Sin direccion registrada' }}</p>
        </div>
        <v-btn icon variant="text" @click="dialogState = false">
          <Icon name="lucide:x" size="18" />
        </v-btn>
      </v-card-title>

      <v-card-text class="location-detail-dialog__content">
        <div class="location-detail-dialog__map">
          <img v-if="mapPreviewUrl" :src="mapPreviewUrl" :alt="location?.name" />
          <div v-else class="location-detail-dialog__map-empty">
            <Icon name="lucide:map-pin" size="32" />
            <span>Sin vista previa</span>
          </div>
        </div>

        <div class="location-detail-dialog__fields">
          <article v-for="field in normalizedFields" :key="field.id" class="location-detail-dialog__field-item">
            <header>
              <Icon name="lucide:grid-2x2" size="14" />
              <span>{{ field.name }}</span>
            </header>
            <div v-if="field.schedules.length" class="location-detail-dialog__schedules">
              <div v-for="(schedule, idx) in field.schedules" :key="`${field.id}-${idx}`" class="location-detail-dialog__schedule-item">
                <span>{{ schedule.day }}</span>
                <strong>{{ schedule.start }} - {{ schedule.end }}</strong>
              </div>
            </div>
            <p v-else class="location-detail-dialog__empty">Sin horarios configurados</p>
          </article>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.location-detail-dialog__title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 16px 8px;
}

.location-detail-dialog__title h3 {
  margin: 0;
  color: #101828;
  font-size: 18px;
  font-weight: 700;
}

.location-detail-dialog__title p {
  margin: 4px 0 0;
  color: #667085;
  font-size: 13px;
}

.location-detail-dialog__content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding: 8px 16px 16px;
}

.location-detail-dialog__map {
  width: 100%;
  min-height: 170px;
  border-radius: 12px;
  border: 1px solid #eaecf0;
  overflow: hidden;
  background: #f2f4f7;
}

.location-detail-dialog__map img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.location-detail-dialog__map-empty {
  min-height: 170px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  color: #7c3aed;
}

.location-detail-dialog__fields {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  max-height: 360px;
  overflow-y: auto;
  padding-right: 2px;
}

.location-detail-dialog__field-item {
  border: 1px solid #eaecf0;
  border-radius: 12px;
  background: #fff;
  padding: 10px;
}

.location-detail-dialog__field-item header {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #101828;
  font-size: 14px;
  font-weight: 600;
}

.location-detail-dialog__schedules {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.location-detail-dialog__schedule-item {
  border: 1px solid #f2f4f7;
  border-radius: 8px;
  background: #f9fafb;
  padding: 6px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.location-detail-dialog__schedule-item span {
  color: #667085;
  font-size: 12px;
}

.location-detail-dialog__schedule-item strong {
  color: #101828;
  font-size: 12px;
}

.location-detail-dialog__empty {
  margin: 8px 0 0;
  color: #98a2b3;
  font-size: 12px;
}

@media (min-width: 960px) {
  .location-detail-dialog__content {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 14px;
  }

  .location-detail-dialog__map,
  .location-detail-dialog__map-empty {
    min-height: 320px;
  }
}
</style>
