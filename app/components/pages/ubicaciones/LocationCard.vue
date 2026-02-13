<script lang="ts" setup>
import type {LocationCard as LocationCardModel} from '~/models/Location'
import CardMenu from '~/components/pages/ubicaciones/CardMenu.vue'
import {Icon} from '#components'

const { isEdition, locationDialog, locationToDelete, locationStoreRequest, locationCard } = storeToRefs(useLocationStore())
const { location } = defineProps<{ location: LocationCardModel }>()
const emits = defineEmits<{
  (event: 'open-detail', location: LocationCardModel): void
}>()

const clickHandler = (action: 'Eliminar' | 'Editar') => {
  if (action === 'Editar') {
    locationStoreRequest.value = {
      id: location.id,
      name: location.name,
      address: location.address,
      place_id: location.place_id,
      position: location.position,
      tags: location.tags,
      fields: location.fields,
      fields_count: Array.isArray(location.fields) ? location.fields.length : 0,
      steps: {
        location: {
          completed: true,
        },
        fields: {
          completed: false,
        },
      },
    }
    isEdition.value = true
    locationDialog.value = true
    locationCard.value.id = location.id
  } else if (action === 'Eliminar') {
    locationToDelete.value.id = location.id as number
    locationToDelete.value.show = true
  }
}

const mapPreviewUrl = computed(() => {
  const lat = Number(location?.position?.lat)
  const lng = Number(location?.position?.lng)
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return ''
  }
  const key = useRuntimeConfig().public.googleMapsAPIKey
  if (!key) {
    return ''
  }
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=280x180&scale=2&markers=color:0x7c3aed|${lat},${lng}&key=${key}`
})

const fieldsCount = computed(() => Number(location?.fields_count ?? location?.fields?.length ?? 0))

const activeDays = computed(() => {
  const fields = Array.isArray(location?.fields) ? location.fields : []
  const days = new Set<string>()
  const dayLabels: Record<string, string> = {
    mon: 'Lun',
    tue: 'Mar',
    wed: 'Mie',
    thu: 'Jue',
    fri: 'Vie',
    sat: 'Sab',
    sun: 'Dom',
  }

  fields.forEach((field: any) => {
    const windows = field?.windows
    if (!windows) return

    if (Array.isArray(windows)) {
      windows.flat().forEach((range: any) => {
        const dayText = String(range?.day ?? '').trim()
        if (dayText) {
          days.add(dayText.slice(0, 3))
        }
      })
      return
    }

    if (typeof windows === 'object') {
      Object.keys(dayLabels).forEach((key) => {
        const ranges = Array.isArray(windows[key]) ? windows[key] : []
        const hasEnabled = ranges.some((range: any) => range?.enabled || (range?.start && range?.end))
        if (hasEnabled) {
          days.add(dayLabels[key])
        }
      })
    }
  })

  return Array.from(days).slice(0, 6)
})
</script>

<template>
  <article class="location-card futzo-rounded">
    <div class="location-card__menu" @click.stop>
      <CardMenu @click="clickHandler" />
    </div>

    <button type="button" class="location-card__button" @click="emits('open-detail', location)">
      <div class="location-card__thumbnail">
        <img v-if="mapPreviewUrl" :src="mapPreviewUrl" :alt="location.name" class="location-card__thumb-image" />
        <div class="location-card__thumb-fallback">
          <Icon name="lucide:map-pin" size="30" />
        </div>
      </div>

      <div class="location-card__content">
        <div class="location-card__header">
          <h3>{{ location.name }}</h3>
          <v-chip size="x-small" variant="tonal" color="primary">
            <Icon name="lucide:grid-2x2" size="12" />
            {{ fieldsCount }}
          </v-chip>
        </div>

        <p class="location-card__address">
          <Icon name="lucide:map-pin" size="12" />
          {{ location.address }}
        </p>

        <div class="location-card__meta">
          <template v-if="activeDays.length">
            <span v-for="day in activeDays" :key="`${location.id}-${day}`" class="location-card__day">{{ day }}</span>
          </template>
          <span v-else class="location-card__empty">Sin horarios configurados</span>
        </div>
      </div>
    </button>
  </article>
</template>

<style scoped>
.location-card {
  border: 1px solid #eaecf0;
  background: #fff;
  position: relative;
}

.location-card__menu {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 3;
}

.location-card__button {
  width: 100%;
  border: 0;
  background: transparent;
  padding: 12px;
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr);
  gap: 12px;
  text-align: left;
  cursor: pointer;
}

.location-card__thumbnail {
  width: 86px;
  height: 86px;
  border-radius: 10px;
  border: 1px solid #eaecf0;
  overflow: hidden;
  position: relative;
  background: #f2f4f7;
}

.location-card__thumb-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.location-card__thumb-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7c3aed;
  background: linear-gradient(135deg, #f5f3ff 0%, #eef4ff 100%);
}

.location-card__content {
  min-width: 0;
}

.location-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-right: 30px;
}

.location-card__header h3 {
  margin: 0;
  color: #101828;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.location-card__address {
  margin: 6px 0 0;
  color: #667085;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.location-card__meta {
  margin-top: 9px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.location-card__day {
  border-radius: 999px;
  background: #eef4ff;
  color: #3538cd;
  border: 1px solid #c7d7fe;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
}

.location-card__empty {
  color: #98a2b3;
  font-size: 12px;
}
</style>
