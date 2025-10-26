<script lang="ts" setup>
  const { getTournamentSchedules } = useScheduleStore()
  const { schedulePagination, schedules } = storeToRefs(useScheduleStore())

  const searchHandler = useDebounceFn((value: string) => {
    schedules.value.rounds = []
    schedulePagination.value.search = value
    schedulePagination.value.current_page = 1
    getTournamentSchedules()
  }, 500)
</script>
<template>
  <v-text-field
    v-model="schedulePagination.search"
    min-width="300"
    append-inner-icon="mdi-magnify"
    label="Buscar un equipo..."
    class="search-button"
    density="compact"
    @update:model-value="searchHandler"
  ></v-text-field>
</template>
<style scoped>
  .search-button {
    border-radius: 8px;
    border: 1px solid #d0d5dd;
    background: #fff;
    box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
  }

  :deep(.mdi-menu-down) {
    display: none;
  }
</style>
