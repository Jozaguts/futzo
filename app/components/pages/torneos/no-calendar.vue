<script lang="ts" setup>
  import NoCalendarSvg from '~/components/pages/torneos/NoCalendarSvg.vue'

  const { scheduleDialog, isLoadingSchedules, noSchedules, schedulePagination, hasSchedule } =
    storeToRefs(useScheduleStore())
  const textButton = computed(() => {
    return isLoadingSchedules.value ? 'Cargando...' : 'Crear calendario'
  })
  const dialogHandler = async () => {
    await useScheduleStore().settingsSchedule()
    scheduleDialog.value = !scheduleDialog.value
  }
  const foundedTextLabel = computed(() => {
    switch (schedulePagination.value.filterBy) {
      case 'cancelado':
        return 'No existen jornadas canceladas'
      case 'programado':
        return 'No existen jornadas programadas'
      case 'aplazado':
        return 'No existen jornadas aplazadas'
      case 'completado':
        return 'No existen jornadas completadas'
      case 'en_progreso':
        return 'No existen jornadas en progreso'
      default:
        return 'No hay calendario aún'
    }
  })
</script>
<template>
  <v-sheet class="custom-v-sheet d-flex justify-center align-center fill-height">
    <v-container v-if="isLoadingSchedules">
      <v-row>
        <v-col cols="4">
          <v-skeleton-loader type="image" height="100%" width="100%"> </v-skeleton-loader>
        </v-col>
        <v-col cols="4">
          <v-skeleton-loader type="image" height="100%" width="100%"></v-skeleton-loader>
        </v-col>
        <v-col cols="4">
          <v-skeleton-loader type="image" height="100%" width="100%"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-skeleton-loader type="image" height="100%" width="100%"> </v-skeleton-loader>
        </v-col>
        <v-col cols="4">
          <v-skeleton-loader type="image" height="100%" width="100%"></v-skeleton-loader>
        </v-col>
        <v-col cols="4">
          <v-skeleton-loader type="image" height="100%" width="100%"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
    <div v-else-if="!isLoadingSchedules && noSchedules" class="d-flex flex-column align-center py-4">
      <h2 class="card-title">{{ foundedTextLabel }}</h2>
      <NoCalendarSvg style="width: 300px" class="py-4" />
      <div v-if="!hasSchedule" class="text-center">
        <v-btn color="primary" variant="elevated" class="mt-4 text-body-1" @click="dialogHandler">
          {{ textButton }}
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>
