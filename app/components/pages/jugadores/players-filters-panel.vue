<script setup lang="ts">
type SelectItem<T extends string | number> = {
  title: string
  value: T
}

defineProps<{
  teamOptions: Array<SelectItem<number | 'all'>>
  positionOptions: Array<SelectItem<string | 'all'>>
}>()

const teamFilter = defineModel<number | 'all'>('teamFilter', { default: 'all' })
const positionFilter = defineModel<string | 'all'>('positionFilter', { default: 'all' })

const emit = defineEmits<{
  (event: 'search', value: string): void
}>()

const emitSearch = (value: string) => emit('search', value)
</script>

<template>
  <section class="jugadores-filters">
    <SearchInput placeholder="Buscar jugador..." min-width="100%" class="jugadores-filters__search" @searching="emitSearch" />
    <v-select
      v-model="teamFilter"
      :items="teamOptions"
      item-title="title"
      item-value="value"
      density="compact"
      variant="outlined"
      label="Equipo"
      hide-details
      class="jugadores-filters__filter"
    />
    <v-select
      v-model="positionFilter"
      :items="positionOptions"
      item-title="title"
      item-value="value"
      density="compact"
      variant="outlined"
      label="Posición"
      hide-details
      class="jugadores-filters__filter"
    />
  </section>
</template>
