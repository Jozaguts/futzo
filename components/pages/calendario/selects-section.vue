<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useLeaguesStore} from "~/store/useLeaguesStore";
import {useScheduleStore} from "~/store/useScheduleStore";
import {useTournamentStore} from "~/store";

const itemProps = (item) => {
  return {
    title: item.name,
  }
}
const {tournaments} = storeToRefs(useTournamentStore())
const {leagues} = storeToRefs(useLeaguesStore())
const {scheduleParams,schedules} =storeToRefs(useScheduleStore())
const loadingTournaments = ref(false)
const theAreSchedules = computed(() => schedules.value.length > 0)
watch(() => scheduleParams.value.leagueId, async(newValue) => {
  if (newValue) {
    try {
      loadingTournaments.value = true
      scheduleParams.value.tournamentId = null as number
      const data = await useTournamentStore().fetchTournamentsByLeagueId(newValue)
      if (data) {
        tournaments.value = data
      } else {
        tournaments.value = []
        scheduleParams.value.tournamentId = null as number
      }

    }catch (e) {
      console.error(e)
    }
    finally {
      loadingTournaments.value = false
    }
  }
})
onBeforeRouteLeave((to, from, next) => {
  if (to.name !== 'calendario') {
    scheduleParams.value.leagueId  = null as number
    scheduleParams.value.tournamentId = null as number
  }
  next()
})
</script>
<template>
  <v-col cols="12" v-auto-animate>
    <v-select
        v-model="scheduleParams.leagueId"
        label="Selecciona una liga"
        item-value="id"
        item-title="name"
        variant="outlined"
        :items="leagues"
        class="my-4"
    >
    </v-select>
    <v-select
        v-model="scheduleParams.tournamentId"
        label="Selecciona un torneo"
        item-value="id"
        item-title="name"
        variant="outlined"
        :items="tournaments"
        :loading="loadingTournaments"
        no-data-text="No existen torneos para esta liga"
        class="my-4"
    >
    </v-select>
<!--    solo se muestra si hay jornadas generadas-->
    <v-select
        v-if="theAreSchedules"
        label="Jornada"
        :item-props="itemProps"
        item-value="id"
        variant="filled"
        :items="schedules"
    >
    </v-select>
<!--    ##################################3-->
  </v-col>
</template>