<script lang="ts" setup>
  import HeaderCard from '~/components/pages/equipos/CreateTeamDialog/Header.vue'
  import StepperContainer from '~/components/pages/equipos/stepper/index.vue'
  import { usePlayerStore } from '~/stores/usePlayerStore'
  import type { CurrentStep } from '~/models/Team'
  import { useTeamStore } from '#imports'

  definePageMeta({
    layout: 'blank',
    sanctum: {
      excluded: true,
    },
    middleware: ['verify-tournament-can-register-team'],
  })
  const slug = useRoute().params?.torneo as unknown as string
  useTournamentStore().initPreRegister(slug)
  const { tournament } = storeToRefs(useTournamentStore())
  const { steps } = storeToRefs(useTeamStore())
  const registeredTeam = ref(false)
  const loading = ref(false)
  const registeredTeamHandler = async () => {
    registeredTeam.value = true
  }
  const finisHandler = () => {
    useRouter().push({ name: 'login' })
  }
  const tournamentReady = computed(() => {
    return tournament.value && tournament.value.league && tournament.value.league.name
  })
  const next = () => {
    if (steps.value.steps[steps.value.current].next_step === 'save') {
      loading.value = true
      useTeamStore()
        .createTeam()
        .then(async (response) => {
          console.log(response?.data?.data)
          console.log(response?.status)
          await registeredTeamHandler()
        })
        .finally(async () => {
          loading.value = false
        })
    } else {
      steps.value.current = steps.value.steps[steps.value.current].next_step as CurrentStep
    }
  }
  const back = () => {
    if (steps.value.steps[steps.value.current].back_step === 'close') {
    } else {
      steps.value.current = steps.value.steps[steps.value.current].back_step as CurrentStep
    }
  }
  const disabled = computed(() => {
    return steps.value.steps[steps.value.current].disable
  })
</script>
<template>
  <v-container>
    <client-only>
      <v-row v-if="tournamentReady">
        <v-col cols="12" md="6" lg="6" offset-md="3" offset-lg="3">
          <div class="d-flex align-center">
            <div>
              <Logo max-width="140" />
              <div>
                <span class="text-body-2 font-weight-bold mr-1"> Pre inscripción de equipos </span>
                <span>&#8231;</span>
                <span class="text-body-2 font-weight-bold mx-1">
                  {{ tournament?.league?.name }}
                </span>
                <span>&#8231;</span>
                <span class="text-body-2 font-weight-bold mx-1">
                  {{ tournament?.name }}
                </span>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" offset-md="3" md="6" offset-lg="3" lg="6" class="text-center">
          <v-card
            class="create-tournament-card futzo-rounded"
            :style="{ overflow: $vuetify?.display?.mobile ? '' : 'hidden' }"
          >
            <HeaderCard />
            <StepperContainer :step="steps.current" @registered-team="registeredTeamHandler" />
            <v-card-actions>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-btn
                      variant="outlined"
                      block
                      color="secondary"
                      class="text-capitalize"
                      density="comfortable"
                      size="large"
                      @click="back"
                      >{{ steps.steps[steps.current].back_label }}
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                      :disabled="disabled || loading"
                      variant="elevated"
                      block
                      color="primary"
                      density="comfortable"
                      size="large"
                      :loading="loading"
                      @click="next"
                      >{{ steps.steps[steps.current].next_label }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
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
                Actualmente se encuentra en proceso de revisión por parte de la administración del torneo. Una vez
                aprobada, recibirás una notificación con los siguientes pasos para continuar con la participación.
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </template>
      <template #actions>
        <v-btn class="futzo-button ml-auto" @click="finisHandler" :loading="false" variant="flat"> Terminar </v-btn>
      </template>
    </Dialog>
  </v-container>
</template>
<style lang="sass">
  @use "~/assets/scss/pages/create-team.sass"
</style>
