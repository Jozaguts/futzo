<script setup lang="ts">
  import Goals from '~/components/pages/torneos/stats-tables/goals.vue'
  import Assistance from '~/components/pages/torneos/stats-tables/assistance.vue'
  import YellowCards from '~/components/pages/torneos/stats-tables/yellow-cards.vue'
  import RedCards from '~/components/pages/torneos/stats-tables/red-cards.vue'
  import { useDisplay } from 'vuetify'
  const route = useRoute()
  const tab = ref('goals')
  const { tournamentStats, tournamentId } = storeToRefs(useTournamentStore())
  onMounted(() => {
    if (tournamentId.value) {
      useTournamentStore().getTournamentStats()
    } else {
      useTournamentStore()
        .getTournamentBySlug(route?.params?.torneo as string)
        .then(() => {
          useTournamentStore().getTournamentStats()
        })
    }
  })
  const { mobile } = useDisplay()
</script>

<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-tabs density="compact" v-model="tab">
          <v-tab value="goals" density="compact">
            <template #default>
              <span v-if="!mobile">Goles</span>
              <Icon v-else name="futzo-icon:ball"></Icon>
            </template>
          </v-tab>
          <v-tab value="assistance">
            <template #default>
              <span v-if="!mobile">Asistencias</span>
              <Icon v-else name="futzo-icon:football"></Icon>
            </template>
          </v-tab>
          <v-tab value="yellow_cards">
            <template #default>
              <span v-if="!mobile">Tarjetas amarillas</span>
              <Icon v-else name="futzo-icon:yellow-card"></Icon>
            </template>
          </v-tab>
          <v-tab value="red_cards">
            <template #default>
              <span v-if="!mobile"> Tarjetas roja</span>
              <Icon v-else name="futzo-icon:red-card"></Icon>
            </template>
          </v-tab>
        </v-tabs>
        <v-divider />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="goals">
            <Goals :player-stats="tournamentStats.goals" />
          </v-tabs-window-item>
          <v-tabs-window-item value="assistance">
            <Assistance :player-stats="tournamentStats.assistance" />
          </v-tabs-window-item>
          <v-tabs-window-item value="yellow_cards">
            <YellowCards :player-stats="tournamentStats.yellow_cards" />
          </v-tabs-window-item>
          <v-tabs-window-item value="red_cards">
            <RedCards :player-stats="tournamentStats.red_cards" />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>
  </v-container>
</template>
