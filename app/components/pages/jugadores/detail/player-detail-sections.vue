<script setup lang="ts">
import type {Position} from '~/models/Position'
import type {DetailSectionConfig, DetailSectionItem, EditableFields} from '~/composables/players/usePlayerDetailPage'

defineProps<{
  detailSections: DetailSectionConfig[]
  positions: Position[]
  editableFields: EditableFields
  isSectionEditing: (sectionId: string) => boolean
  isSectionSaving: (sectionId: string) => boolean
  canSectionBeEdited: (sectionId: string) => boolean
  isItemEditable: (sectionId: string, item: DetailSectionItem) => boolean
  getFieldDisplayValue: (sectionId: string, item: DetailSectionItem) => string
}>()

const emit = defineEmits<{
  (event: 'toggle-section', sectionId: string): void
  (event: 'update-field', payload: { field: DetailSectionItem['field']; value: string | number | null }): void
}>()

const toggleSection = (sectionId: string) => emit('toggle-section', sectionId)
const updateField = (field: DetailSectionItem['field'], value: string | number | null) =>
  emit('update-field', { field, value })
</script>

<template>
  <v-card
    v-for="section in detailSections"
    :key="section.id"
    class="detail-card futzo-rounded"
    variant="flat"
  >
    <div class="detail-card__header d-flex align-start justify-space-between flex-wrap gap-2">
      <div>
        <h3 class="text-subtitle-1 mb-1">{{ section.title }}</h3>
        <p class="text-body-2 text-medium-emphasis">{{ section.description }}</p>
      </div>
      <v-btn
        size="small"
        active
        color="primary"
        variant="text"
        :prepend-icon="isSectionEditing(section.id) ? 'mdi-check' : 'mdi-pencil'"
        :loading="isSectionSaving(section.id)"
        :disabled="isSectionSaving(section.id) || !canSectionBeEdited(section.id)"
        class="ml-auto"
        @click="toggleSection(section.id)"
      >
        {{ isSectionEditing(section.id) ? 'Listo' : 'Editar' }}
      </v-btn>
    </div>
    <div class="detail-card__grid">
      <div
        v-for="item in section.items"
        :key="`${section.id}-${item.label}`"
        class="detail-item"
        :class="{ 'detail-item--full': item.fullWidth }"
      >
        <v-select
          v-if="item.type === 'select'"
          :label="item.label"
          :items="positions"
          item-title="name"
          item-value="id"
          active
          :model-value="editableFields[item.field]"
          @update:model-value="(value) => updateField(item.field, value)"
          density="comfortable"
          hide-details
          :variant="isItemEditable(section.id, item) ? 'outlined' : 'plain'"
          :readonly="!isItemEditable(section.id, item)"
          :placeholder="isItemEditable(section.id, item) ? 'Selecciona una opción' : 'Sin registro'"
          class="detail-item__input"
        />
        <v-text-field
          v-else
          active
          :label="item.label"
          :model-value="getFieldDisplayValue(section.id, item)"
          :type="item.inputType || 'text'"
          @update:model-value="(value) => updateField(item.field, value)"
          density="comfortable"
          hide-details
          :variant="isItemEditable(section.id, item) ? 'outlined' : 'plain'"
          :readonly="!isItemEditable(section.id, item)"
          class="detail-item__input"
        />
      </div>
    </div>
  </v-card>
</template>
