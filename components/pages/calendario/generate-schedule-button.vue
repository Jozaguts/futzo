<script lang="ts" setup>
import {useScheduleStore} from "~/store/useScheduleStore";
import {storeToRefs} from "pinia";
const {scheduleParams, schedules} = storeToRefs( useScheduleStore())
const loading = ref(false)
const generateSchedule = async() =>{
  try {
    loading.value = true
    await useScheduleStore().generateSchedule(scheduleParams.value)
  }catch (e) {
    console.log(e)
  }finally {
    loading.value = false
  }
}
const theAreNotSchedules = computed(() => {
   return schedules.value?.length === 0 && scheduleParams.value.leagueId && scheduleParams.value.tournamentId
})
</script>
<template>
  <v-col cols="12" v-auto-animate>
    <v-btn v-if="theAreNotSchedules" block color="primary" :loading="loading" @click="generateSchedule">Generar Calendario</v-btn>
    <small v-if="theAreNotSchedules" class="text-caption text-medium-emphasis">
      - Una vez generado el calendario podrá ser modificado manualmente si es necesario
    </small>
  </v-col>
</template>
