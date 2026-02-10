<script lang="ts" setup>
import JugadoresForm from '~/components/pages/jugadores/form/index.vue'

definePageMeta({
    layout: 'blank',
    sanctum: {
      excluded: true,
    },
    middleware: ['verify-team-can-register-player'],
  })
  const slug = useRoute().params.equipo as unknown as string
  await useTeamStore().initPreRegister(slug)
  const { team } = storeToRefs(useTeamStore())
  const dialogOpen = ref(true)
  const showPreRegisterSuccessMessage = ref(false)
  const finisHandler = () => {
    useRouter().push({ name: 'login' })
  }
  const tournamentReady = computed(() => {
    return !!team.value
  })
  const registeredHandler = () => {
    dialogOpen.value = false
    showPreRegisterSuccessMessage.value = true
  }
</script>
<template>
  <v-container>
    <client-only>
      <v-row v-if="tournamentReady">
        <v-col cols="12" offset-md="3" md="6" offset-lg="3" lg="6" class="text-center">
          <JugadoresForm v-model="dialogOpen" @registered="registeredHandler" />
        </v-col>
        <v-col cols="12" offset-md="3" md="6" offset-lg="3" lg="6" v-if="showPreRegisterSuccessMessage">
          <v-card class="create-tournament-card futzo-rounded" data-testid="pre-register-success">
            <v-card-text>
              <v-row>
                <v-col cols="12" class="text-center">
                  <h3 class="text-h6 mb-2">Jugador registrado con éxito</h3>
                  <p class="text-body-2">
                    Actualmente se encuentra en proceso de revisión por parte de la administración del torneo. Una vez
                    aprobada, recibirás una notificación con los siguientes pasos para continuar con la participación.
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="d-flex justify-end">
              <v-btn
                class="futzo-button"
                data-testid="pre-register-finish"
                @click="finisHandler"
                :loading="false"
                variant="flat"
              >
                Terminar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </client-only>
  </v-container>
</template>
<style lang="sass">
  @use "~/assets/scss/pages/create-team.sass"
</style>
