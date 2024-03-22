<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useScheduleStore} from "~/store/useScheduleStore";

const {scheduleParams, schedules} = storeToRefs(useScheduleStore())
const theAreNotSchedules = computed(() => {
  return schedules.value?.length === 0 && scheduleParams.value.leagueId && scheduleParams.value.tournamentId
})

const daysOfTheWeek = [
    {name: 'Lunes', value: 'Lun'},
    {name: 'Martes', value: 'Mar'},
    {name: 'Miercoles', value: 'Mie'},
    {name: 'Jueves', value: 'Jue'},
    {name: 'Viernes', value: 'Vie'},
    {name: 'Sabado', value: 'Sab'},
    {name: 'Domingo', value: 'Dom'}
]
</script>
<template>
 <v-row>
   <v-col cols="12"  v-auto-animate>
     <v-card  v-if="theAreNotSchedules" variant="text">
       <v-card-item>
         <v-card-title>
           <h3  class="text-body-1">Dias de juego</h3>
         </v-card-title>
       </v-card-item>
       <v-card-text v-auto-animate>
       </v-card-text>
     </v-card>
   </v-col>
 </v-row>
</template>