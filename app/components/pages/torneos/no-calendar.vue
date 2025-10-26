<script lang="ts" setup>
  import NoCalendarSvg from '~/components/pages/torneos/NoCalendarSvg.vue'

  const { scheduleDialog, isLoadingSchedules } = storeToRefs(useScheduleStore())
  const textButton = computed(() => {
    return isLoadingSchedules.value ? 'Cargando...' : 'Crear calendario'
  })
  const dialogHandler = async () => {
    await useScheduleStore().settingsSchedule()
    scheduleDialog.value = !scheduleDialog.value
  }
</script>
<template>
  <v-sheet class="custom-v-sheet d-flex justify-center align-center fill-height"> </v-sheet>
</template>
