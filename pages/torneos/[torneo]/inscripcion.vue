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
  const { tournamentId: tournamentIdStore, tournament } =
    storeToRefs(useTournamentStore())
  const { steps } = storeToRefs(useTeamStore())

  const init = async () => {
    const { data } = await useSanctumFetch<Tournament | null>(
      `/api/v1/admin/tournaments/${tournamentId}`,
      {
        method: 'GET',
      }
    )
    tournament.value = data.value
    console.log(tournament.value)
  }
  await init()
  onMounted(async () => {
    if (tournament.value) {
      const leageueId = tournament.value.league.id
      if (leageueId) {
        useTournamentStore().fetchTournamentsByLeagueId(leageueId)
      }
    }
    loadGoogleMapsScript()
  })
  const loadGoogleMapsScript = () => {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${useRuntimeConfig().public.googleMapsAPIKey}&libraries=places&loading=async`
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }
  onUnmounted(() => {
    const script = document.querySelector(
      `script[src="https://maps.googleapis.com/maps/api/js?key=${useRuntimeConfig().public.googleMapsAPIKey}&libraries=places&loading=async"]`
    )
    if (script) {
      script.remove()
    }
  })
  const registeredTeamHandler = async () => {
    await init()
    useToast().toast(
      'success',
      'Equipos',
      'El equipo fue registrado correctamente'
    )
  }
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
            <StepperContainer
              :step="steps.current"
              @registered-team="registeredTeamHandler"
            />
          </v-card>
        </v-col>
        <v-col
          class="d-none d-md-flex d-lg-flex flex-column justify-center"
          cols="12"
          md="6"
          lg="6"
        >
          <v-card variant="flat" height="100%">
            <v-card-title class="text-h6">
              <Logo :maxWidth="100" />
              {{ tournament.league?.name }} - {{ tournament?.name }}
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6" lg="6">
                  <span class="text-body-1">Categoria</span>
                  <h3 class="text-h5">
                    {{ tournament.category?.name }}
                  </h3>
                </v-col>
                <v-col cols="12" md="6" lg="6">
                  <span class="text-body-1">Fecha de inicio</span>
                  <h3 class="text-h5">
                    {{ tournament.start_date_to_string }}
                  </h3>
                </v-col>
                <v-col cols="12" md="6" lg="6">
                  <span class="text-body-1">Total de equipos inscritos</span>
                  <div class="d-flex">
                    <v-progress-circular
                      class="mx-2"
                      :model-value="
                        (tournament.teams_count / tournament.max_teams) * 100
                      "
                      :rotate="360"
                      :size="100"
                      :width="20"
                      color="primary"
                    >
                      {{ tournament.teams_count }} / {{ tournament.max_teams }}
                    </v-progress-circular>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </client-only>
  </v-container>
</template>
<style lang="sass">
  @use "assets/scss/pages/create-team.sass"
</style>
