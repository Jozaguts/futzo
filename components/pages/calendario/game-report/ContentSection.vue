<script setup lang="ts">
import InfoHeaderSection from "~/components/pages/calendario/game-report/info-header-section.vue";
import type {Game} from "~/models/Game";
import TeamTable from "~/components/pages/calendario/game-report/team-table.vue";

type Props = {
  game?: Game
}
const props = defineProps<Props>()
const goalDetail = {
  player_id: '',
  minute: 0,
  assist_id: '',
}
const form = ref({
  home: {
    name: '',
    goals: 0,
    goalsDetails: [
      {
        player_id: '',
        minute: 0,
        assist_id: '',
      },
    ],
  },
  away: {
    name: '',
    goals: 0,
    goalsDetails: [
      {
        player_id: '',
        minute: 0,
        assist_id: '',
      },
    ],
  },
})
const tab = ref('home')
const updateHandler = (data: any) => {
  console.log(data)
}
watch(
    props,
    (newValue) => {
      form.value = {
        home: {
          name: newValue.game?.home?.name || '',
          goals: newValue.game?.home?.goals || 0,
          goalsDetails: []
        },
        away: {
          name: newValue.game?.away?.name || '',
          goals: newValue.game?.away?.goals || 0,
          goalsDetails: []
        },
      }
    },
    {once: true}
)
</script>
<template>
  <v-row class="futzo-rounded ">
    <v-col cols="12">
      <div class=" d-flex justify-center justify-space-evenly ">
        <div class="d-flex flex-column align-center">
          <span class="text-h4 font-weight-bold">{{ form?.home?.goals }}</span>
          <span class="text-caption d-inline-block text-truncate text-medium-emphasis">
             {{ form?.home?.name }}
          </span>
        </div>
        VS
        <div class="d-flex flex-column align-center">
          <span class="text-h4 font-weight-bold">{{ form?.away?.goals }}</span>
          <span class="text-caption d-inline-block text-truncate text-medium-emphasis" style="max-width: 150px;">
             {{ form?.away?.name }}
          </span>
        </div>
      </div>

    </v-col>
    <v-col cols="12">
      <v-tabs align-tabs="center" v-model="tab">
        <v-tab value="home">Local</v-tab>
        <v-tab value="away">Visitante</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab" class="mt-4">
        <v-tabs-window-item value="home" transition="fade-transition" reverse-transition="fade-transition">
          <info-header-section :text="form?.home?.name" label="Equipo"/>
          <team-table @update="updateHandler"/>
        </v-tabs-window-item>
        <v-tabs-window-item value="away" transition="fade-transition" reverse-transition="fade-transition">
          <info-header-section :text="form?.away?.name" label="Visitante"/>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-col>
    <v-divider/>

  </v-row>
</template>
<style lang="sass">
.content-container
  display: grid
  grid-template-columns: 1fr 1fr
  column-gap: 1rem
  padding: 1rem

.score-container
  display: flex

</style>