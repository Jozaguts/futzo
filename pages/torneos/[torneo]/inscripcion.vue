<script lang="ts" setup>
  import { useTeamStore, useTournamentStore } from '~/store'
  import HeaderCard from '~/components/pages/equipos/CreateTeamDialog/Header.vue'
  import StepperContainer from '~/components/pages/equipos/stepper/index.vue'
  import type { Tournament } from '~/models/tournament'
  import type { TeamStoreRequest } from '~/models/Team'

  definePageMeta({
    layout: 'blank',
    sanctum: {
      excluded: true,
    },
  })
  const tournamentId = useRoute().query.tournament as unknown as number
  const { tournament } = storeToRefs(useTournamentStore())
  const { steps } = storeToRefs(useTeamStore())
  const registeredTeam = ref(false)
  const teamRequest = ref<TeamStoreRequest>()
  const init = async () => {
    const { data } = await useSanctumFetch<Tournament | null>(
      `/api/v1/admin/tournaments/${tournamentId}`,
      {
        method: 'GET',
      }
    )
    tournament.value = data.value as Tournament
  }
  await init()
  onMounted(async () => {
    if (tournament.value) {
      const leagueId = tournament.value.league.id
      if (leagueId) {
        await useTournamentStore().fetchTournamentsByLeagueId(leagueId)
      }
    }
    loadGoogleMapsScript()
  })
  onUnmounted(() => {
    const script = document.querySelector(
      `script[src="https://maps.googleapis.com/maps/api/js?key=${useRuntimeConfig().public.googleMapsAPIKey}&libraries=places&loading=async"]`
    )
    if (script) {
      script.remove()
    }
  })

  const loadGoogleMapsScript = () => {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${useRuntimeConfig().public.googleMapsAPIKey}&libraries=places&loading=async`
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }
  const registeredTeamHandler = async (value: TeamStoreRequest) => {
    await init()
    useToast().toast(
      'success',
      'Equipos',
      'El equipo fue registrado correctamente'
    )
    registeredTeam.value = true
    teamRequest.value = value as TeamStoreRequest
  }
</script>
<template>
  <v-container>
    <client-only>
      <v-row v-if="tournament">
        <v-col cols="12" md="6" lg="6" offset-md="3" offset-lg="3">
          <div class="d-flex align-center">
            <div>
              <Logo max-width="140" />
              <div>
                <span class="text-body-2 font-weight-bold">
                  Pre inscripción de equipos
                </span>
                |
                <span class="text-body-2 font-weight-bold">
                  {{ tournament.league.name }}
                </span>
                |
                <span class="text-body-2 font-weight-bold">
                  {{ tournament.name }}
                </span>
              </div>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          offset-md="3"
          md="6"
          offset-lg="3"
          lg="6"
          class="text-center"
        >
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
      </v-row>
    </client-only>
  </v-container>
</template>
<style lang="sass">
  @use "assets/scss/pages/create-team.sass"
</style>
