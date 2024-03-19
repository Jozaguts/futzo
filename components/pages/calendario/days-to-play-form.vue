<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useScheduleStore} from "~/store/useScheduleStore";
import {useTournamentStore} from "~/store";
import {useTeamStore} from "~/store/useTeamStore";
const {daysToPlaySelected,customDaysSelected} = storeToRefs(useScheduleStore())
const {matchesByRound } = storeToRefs(useTournamentStore())
const {locations} = storeToRefs(useTeamStore())
const daysToPlayToCols = ref([])
watch(()=> customDaysSelected.value, async(newValue) => {
  if (daysToPlaySelected.value === 'other') {
    daysToPlayToCols.value = newValue.map((day) => {
      const name = day === 'Lun' ? 'Lunes' : day === 'Mar' ? 'Martes' : day === 'Mie' ? 'Miercoles' : day === 'Jue' ? 'Jueves' : day === 'Vie' ? 'Viernes' : day === 'Sab' ? 'Sabado' : 'Domingo'
      return {name, value: 0}
    })
  }

})
watch(() => daysToPlaySelected.value, async(newValue) => {
  if (newValue === 'all-days') {
    daysToPlayToCols.value = [{name: 'Lunes', value: 0},{name: 'Martes', value: 0},{name: 'Miercoles', value: 0},{name: 'Jueves', value: 0},{name: 'Viernes', value: 0},{name: 'Sabado', value: 0},{name: 'Domingo', value: 0}]
  }
  if (newValue === 'weekend-days') {
    daysToPlayToCols.value = [{name: 'Viernes', value: 0},{name: 'Sabado', value: 0},{name: 'Domingo', value: 0}]
  }
  if (newValue === 'weekend') {
    daysToPlayToCols.value = [{name: 'Sabado', value: 0},{name: 'Domingo', value: 0}]
  }
  if (newValue === 'sunday') {
    daysToPlayToCols.value = [{name: 'Domingo', value: 0}]
  }
})
const gamesAlreadyTaken = computed(() => {
  return daysToPlayToCols.value.reduce((acc, day) => Number(acc) + Number(day.value), 0)
})
const remainingGames = computed(() => {
  return matchesByRound.value - gamesAlreadyTaken.value
})
const maxForDay = (day) => {
  return matchesByRound.value - gamesAlreadyTaken.value + Number(day.value)
};

</script>
<template>
  <v-row>
    <v-col cols="6">
      <v-card >
        <v-card-title>
          <h3  class="text-body-1">Partidos por jornada: {{matchesByRound}}</h3>
          <h3  class="text-body-1">Partidos por dia</h3>
        </v-card-title>
        <v-card-text>

         <v-card variant="plain">
           <v-container>
             <v-row>
               <v-col cols="4" v-for="day in daysToPlayToCols" :key="day.name">
                 <v-text-field  :min="0" type="number" :max="maxForDay(day)" v-model="day.value" :label="day.name" outlined></v-text-field>
               </v-col>
             </v-row>
           </v-container>
         </v-card>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>