<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useLeaguesStore} from "~/store/useLeaguesStore";
import {useScheduleStore} from "~/store/useScheduleStore";
import {useAuthStore, useTournamentStore} from "~/store";
const itemProps = (item) => {
  return {
    title: item.name,
  }
}
const {tournaments} = storeToRefs(useTournamentStore())
const {leagues} = storeToRefs(useLeaguesStore())
const {isSuperAdmin} = storeToRefs(useAuthStore())
const {scheduleParams,schedules,daysToPlay,daysToPlaySelected,customDaysSelected} =storeToRefs(useScheduleStore())
const loadingTournaments = ref(false)
const theAreSchedules = computed(() => schedules.value.length > 0)
watch(() => scheduleParams.value.leagueId, async(newValue) => {
  if (newValue) {
    try {
      loadingTournaments.value = true
      scheduleParams.value.tournamentId = null as number
     await useTournamentStore().fetchTournamentsByLeagueId(newValue)

    }catch (e) {
      console.error(e)
    }
    finally {
      scheduleParams.value.tournamentId = null as number
      loadingTournaments.value = false
    }
  }
})

onBeforeRouteLeave((to, from, next) => {
  if (to.name !== 'calendario') {
    // scheduleParams.value.leagueId  = null as number
    scheduleParams.value.tournamentId = null as number
  }
  next()
})
watch(() => leagues.value, async(newValue) => {
  if (!isSuperAdmin.value && newValue.length) {
    scheduleParams.value.leagueId =  newValue[0].id
  }
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
console.log(tournaments.value.length)
</script>
<template>
  <v-row >
    <v-col cols="12" md="3" lg="3">
      <v-select
          :disabled="!isSuperAdmin"
          label="Selecciona una liga"
          v-model="scheduleParams.leagueId"
          item-value="id"
          item-title="name"
          variant="outlined"
          :items="leagues"

      >
      </v-select>
    </v-col>
    <v-col cols="12" md="3" lg="3">
      <v-select
          v-model="scheduleParams.tournamentId"
          label="Selecciona un torneo"
          item-value="id"
          item-title="name"
          variant="outlined"
          :items="tournaments"
          :loading="loadingTournaments"
          no-data-text="No existen torneos para esta liga"

          clearable
      >
      </v-select>

    </v-col>
    <v-col cols="12" md="3" lg="3" v-auto-animate>
      <v-select
          label="Dias de juego"
          v-if="scheduleParams.tournamentId"
          v-model="daysToPlaySelected"
          :items="daysToPlay"
          item-title="text"
          item-value="value"
          >
      </v-select>
    </v-col>
    <v-col cols="12" md="3" lg="3" v-auto-animate>
      <v-select multiple
                :items="daysOfTheWeek"
                v-if="daysToPlaySelected === 'other' && scheduleParams.tournamentId"
                v-model="customDaysSelected" item-title="name"
                clearable
                label="Selecciona los dias de juego"
                chips
                >
      </v-select>

      <!--    solo se muestra si hay jornadas generadas-->
      <!--    esto ya no tiene que ir acqui la logica ha cambiado-->
<!--      <v-select-->
<!--          v-if="theAreSchedules"-->
<!--          label="Jornada"-->
<!--          :item-props="itemProps"-->
<!--          item-value="id"-->
<!--          variant="filled"-->
<!--          :items="schedules"-->
<!--          -->
<!--      >-->
<!--      </v-select>-->
      <!--    ##################################3-->
    </v-col>
  </v-row>

</template>