<script lang="ts" setup>
  import { useTeamStore, useTournamentStore } from '~/store'
  import HeaderCard from '~/components/pages/equipos/CreateTeamDialog/Header.vue'
  import StepperContainer from '~/components/pages/equipos/stepper/index.vue'
  import type { Tournament } from '~/models/tournament'

  definePageMeta({
    layout: 'blank',
    sanctum: {
      excluded: true,
    },
  })

  const tournamentId = useRoute().query.tournament as unknown as number
  const tournament = ref<Tournament>(undefined)
  const { tournamentId: tournamentIdStore } = storeToRefs(useTournamentStore())
  const { steps } = storeToRefs(useTeamStore())
  const { data, status, error, refresh } = await useSanctumFetch<Tournament>(
    `/api/v1/admin/tournaments/${tournamentId}`,
    {
      method: 'GET',
    }
  )
  tournament.value = data.value
</script>
<template>
  <v-container>
    <client-only>
      <v-row v-if="tournament">
        <v-col cols="12" md="6" lg="6" class="text-center">
          <v-card
            class="create-tournament-card futzo-rounded"
            :style="{ overflow: $vuetify.display.mobile ? '' : 'hidden' }"
          >
            <HeaderCard />
            <StepperContainer :step="steps.current" />
          </v-card>
        </v-col>
        <v-col
          class="d-flex flex-column justify-center"
          cols="12"
          md="6"
          lg="6"
        >
          <v-card class="futzo-rounded">
            <v-card-title class="text-h6">Información del Torneo</v-card-title>
            <v-card-text>
              <pre>
               {{ tournament }}
             </pre
              >
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </client-only>
  </v-container>
</template>
