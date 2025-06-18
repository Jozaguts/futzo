<script lang="ts" setup>
import {useTeamStore, usePlayerStore} from '~/store'
import HeaderCard from '~/components/pages/jugadores/dialog/header.vue'
import StepperContainer from '~/components/pages/jugadores/stepper/index.vue'
import type {Team, TeamStoreRequest} from '~/models/Team'

definePageMeta({
  layout: 'blank',
  sanctum: {
    excluded: true,
  },
})
const {steps} = storeToRefs(usePlayerStore())
const {team} = storeToRefs(useTeamStore())
const registeredPlayer = ref(false)
const teamId = useRoute().query.id as unknown as number
useSanctumClient()('/api/v1/admin/teams/' + teamId, {
  method: 'GET',
})
    .then(async (data) => {
      team.value = data as Team
    })
const finisHandler = () => {
  useRouter().push({name: 'login'})
}
const tournamentReady = computed(() => {
  return team.value
})
const registeredHandler = async (value: TeamStoreRequest) => {
  registeredPlayer.value = true
}
</script>
<template>
  <v-container>
    <client-only>
      <v-row v-if="tournamentReady">
        <v-col cols="12" md="6" lg="6" offset-md="3" offset-lg="3">
          <div class="d-flex align-center">
            <div>
              <Logo max-width="140"/>
              <div>
                <span class="text-body-2 font-weight-bold">
                  Pre inscripción de jugador
                </span>
                |
                <span class="text-body-2 font-weight-bold">
                   {{ team?.name }}
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
                @registered-player="registeredHandler"
            />
          </v-card>
        </v-col>
      </v-row>
    </client-only>
    <Dialog
        :loading="false"
        :model-value="registeredPlayer"
        title="Jugador registrado con éxito"
        subtitle="El jugador ha sido creado y la solicitud de registro fue enviada correctamente."
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
