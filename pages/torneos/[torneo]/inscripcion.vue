<script lang="ts" setup>
import {useTeamStore, useTournamentStore} from '~/store'
import HeaderCard from '~/components/pages/equipos/CreateTeamDialog/Header.vue'
import StepperContainer from '~/components/pages/equipos/stepper/index.vue'
import type {Tournament} from '~/models/tournament'
import type {TeamStoreRequest} from '~/models/Team'

definePageMeta({
  layout: 'blank',
  sanctum: {
    excluded: true,
  },
})
const {tournament} = storeToRefs(useTournamentStore())
const {steps} = storeToRefs(useTeamStore())
const registeredTeam = ref(false)
const teamRequest = ref<TeamStoreRequest>()
const tournamentId = useRoute().query.tournament as unknown as number
const {data, pending} = await useSanctumFetch<Tournament>(
    `/api/v1/admin/tournaments/${tournamentId}`,
    {
      method: 'GET',
    }
)
tournament.value = data.value as Tournament
onMounted(async () => {
  if (tournament.value) {
    const leagueId = tournament.value?.league?.id
    if (leagueId) {
      await useTournamentStore().fetchTournamentsByLeagueId(leagueId)
    } else {
      console.error('League ID is not available in the tournament data.')
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
  registeredTeam.value = true
  teamRequest.value = value as TeamStoreRequest
}
const finisHandler = () => {
  registeredTeam.value = false
  useRouter().push({name: 'login'})
}

</script>
<template>
  <v-container>
    <pre>
    {{ !!tournament }}
    </pre>
    <client-only>
      <v-row v-if="!pending">
        <v-col cols="12" md="6" lg="6" offset-md="3" offset-lg="3">
          <div class="d-flex align-center">
            <div>
              <Logo max-width="140"/>
              <div>
                <span class="text-body-2 font-weight-bold">
                  Pre inscripción de equipos
                </span>
                |
                <span class="text-body-2 font-weight-bold">
                  {{ tournament?.league?.name }}
                </span>
                |
                <span class="text-body-2 font-weight-bold">
                  {{ tournament?.name }}
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
              :style="{ overflow: $vuetify?.display?.mobile ? '' : 'hidden' }"
          >
            <HeaderCard/>
            <StepperContainer
                :step="steps.current"
                @registered-team="registeredTeamHandler"
            />
          </v-card>
        </v-col>
      </v-row>
    </client-only>
    <Dialog
        :loading="false"
        :model-value="registeredTeam"
        title="Equipo registrado con éxito"
        subtitle="El equipo ha sido creado y la solicitud de registro fue enviada correctamente."
        icon-name="game-icons:babyfoot-players"
    >
      <template #v-card-text>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="text-center">
              <p class="text-body-2">
                Actualmente se encuentra en proceso de revisión por parte de la
                administración del torneo. Una vez aprobada, recibirás una
                notificación con los siguientes pasos para continuar con la
                participación.
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </template>
      <template #actions>
        <v-btn
            class="futzo-button ml-auto"
            @click="finisHandler"
            :loading="false"
            variant="flat"
        >
          Terminar
        </v-btn>
      </template>
    </Dialog>
  </v-container>
</template>
<style lang="sass">
@use "assets/scss/pages/create-team.sass"
</style>
