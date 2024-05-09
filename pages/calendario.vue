<script setup lang="ts">
import ViewCalendar from "~/components/pages/calendario/view-calendar.vue";
import IconsSection from "~/components/pages/calendario/icons-section.vue";
import SelectsSection from "~/components/pages/calendario/selects-section.vue";
import GameDaysSection from "~/components/pages/calendario/game-days-section.vue";
import GenerateScheduleButton from "~/components/pages/calendario/generate-schedule-button.vue";
import NumberOfDaysComponent from "~/components/pages/calendario/number-of-days-component.vue";
import DaysToPlayForm from "~/components/pages/calendario/days-to-play-form.vue";
import {useScheduleStore} from "~/store/useScheduleStore";
import {useLeaguesStore} from "~/store/useLeaguesStore";
import {storeToRefs} from "pinia";
import {useTeamStore} from "~/store/useTeamStore";
import {useTournamentStore} from "~/store";
const {leagues} = storeToRefs(useLeaguesStore())
const tab = ref(1)
const loading = ref(false)
const {daysToPlaySelected} = storeToRefs(useScheduleStore())
const {locations} = storeToRefs(useTeamStore())
const {matchesByRound,teamsCount} = storeToRefs(useTournamentStore())
const schedule = reactive({
  league_id: null,
  tournament_id: null,
  days_to_play: null,
  days: []<{name: string, value: number}>,
})
watch(() => daysToPlaySelected.value, (newValue,oldValue) => {
 if (oldValue?.key === 'other') {
   schedule.days = []
  }
  schedule.days = newValue.days.map((day) => ({name: day, value: 0}))
})
const addGameToDay = (day) =>{
  day.value = day.value + 1
}
const removeGameToDay = (day) =>{
  if (day.value > 0) {
    day.value = day.value - 1
  }
}
const gamesAlreadyTaken = computed(() => {
  return schedule.days.reduce((acc, day) => Number(acc) + Number(day.value), 0)
})
const remainingGames = computed(() => {
  return Math.floor( matchesByRound.value - gamesAlreadyTaken.value )
})
const maxForDay = (day) => {
  return Math.floor( matchesByRound.value) - gamesAlreadyTaken.value
};
</script>
<template>
  <v-sheet elevation="20" max-width="800px" class="mx-auto py-6 px-8" >
    <v-container fluid>
      <SelectsSection />
      <v-row>
        <v-col>
        <p class="text-body-1 text-bold text-disabled text-capitalize font-weight-bold">partidos por jornada</p>
        </v-col>
      </v-row>
      {{teamsCount}}
      <v-row v-if="schedule.days.length" v-auto-animate="{duration: 400}">
        <v-col  v-for="day in schedule.days" :cols="6" lg="3" md="3">
          <NumberOfDaysComponent
              @plus="addGameToDay(day)"
              @minus="removeGameToDay(day)"
              :name="day.name"
              :value="day.value"
              :size="40"
              :maxForDay="maxForDay"
          />
        </v-col>
    {{remainingGames}}
        {{matchesByRound}}
      </v-row>
      <v-row>
        <v-col cols="2">
          <v-container fluid>
            <v-row>
              <!--            <IconsSection />-->
              <!--            <SelectsSection />-->
              <!--            <GameDaysSection />-->
              <!--            <GenerateScheduleButton />-->
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="10">
          <v-container>
            <v-row>
              <v-col cols="12" md="6" lg="6" >
              </v-col>
            </v-row>
            <!--       v-row component-->
<!--            todo eliminar-->
            <DaysToPlayForm />
            <!--      end v-row component-->
          </v-container>
          <!--        <v-window v-model="tab" class="w-100">-->
          <!--          <v-fade-transition leave-absolute :group="true">-->
          <!--            <v-window-item :key="1" :value="1">-->
          <!--              <ViewCalendar/>-->
          <!--            </v-window-item>-->
          <!--            <v-window-item :key="2" :value="2">-->
          <!--              <ViewCalendar />-->
          <!--            </v-window-item>-->
          <!--          </v-fade-transition>-->
          <!--        </v-window>-->
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>

</template>