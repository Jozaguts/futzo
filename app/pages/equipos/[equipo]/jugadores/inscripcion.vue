<script lang="ts" setup>
  import HeaderCard from '~/components/pages/jugadores/dialog/header.vue'
  import StepperContainer from '~/components/pages/jugadores/stepper/index.vue'
  import type { Team, TeamStoreRequest } from '~/models/Team'
  import { usePlayerStore } from '~/stores/usePlayerStore'
  import type { CurrentStep } from '~/models/Player'
  definePageMeta({
    layout: 'blank',
    sanctum: {
      excluded: true,
    },
    middleware: ['verify-team-can-register-player'],
  })
  const slug = useRoute().params.equipo as unknown as string
  await useTeamStore().initPreRegister(slug)
  const { steps } = storeToRefs(usePlayerStore())
  const { team } = storeToRefs(useTeamStore())
  const showPreRegisterSuccessModal = ref(false)
  const loading = ref(false)
  const finisHandler = () => {
    useRouter().push({ name: 'login' })
  }
  const tournamentReady = computed(() => {
    return !!team.value
  })
  const registeredHandler = async () => {
    showPreRegisterSuccessModal.value = true
  }
  const disabled = computed(() => {
    return steps.value.steps[steps.value.current].disable
  })
  const next = () => {
    if (steps.value.steps[steps.value.current].next_step === 'save') {
      loading.value = true
      usePlayerStore()
        .createPlayer()
        .then(async () => {
          await registeredHandler()
        })
        .catch((err) => {
          loading.value = false
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
                <span class="text-body-2 font-weight-bold mr-1"> Pre inscripción de jugador </span>
                <span>&#8231;</span>
                <span class="text-body-2 font-weight-bold mx-1">
                  {{ team?.name }}
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
            <StepperContainer :step="steps.current" @registered-player="registeredHandler" />
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
      :model-value="showPreRegisterSuccessModal"
      title="Jugador registrado con éxito"
      subtitle="El jugador ha sido creado y la solicitud de registro fue enviada correctamente."
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
