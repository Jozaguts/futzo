<script lang="ts" setup>
import Dialog from '~/components/shared/Dialog.vue'
import StepperContainer from '~/components/pages/jugadores/stepper/index.vue'
import type {CurrentStep} from '~/models/Player'
import {storeToRefs, usePlayerStore, useTournamentStore} from '#imports'

const playerStore = usePlayerStore()
const tournamentStore = useTournamentStore()
const { steps, dialog, isEdition, playerId } = storeToRefs(playerStore)
const route = useRoute()
const props = withDefaults(defineProps<{ modelValue?: boolean }>(), {
  modelValue: undefined,
})
const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'registered'): void
}>()

const loading = ref(false)

const hasExternalModel = computed(() => props.modelValue !== undefined)
const dialogState = computed({
  get: () => (hasExternalModel.value ? (props.modelValue as boolean) : dialog.value),
  set: (value: boolean) => {
    if (hasExternalModel.value) {
      emit('update:modelValue', value)
    } else {
      dialog.value = value
    }
  },
})

const isPreRegister = computed(() => route.name === 'equipos-equipo-jugadores-inscripcion')
const title = computed(() => (isEdition.value ? 'Editar jugadores' : 'Registrar jugador'))
const subtitle = computed(() =>
  isEdition.value ? 'Modifica los detalles del jugador.' : 'Completa los detalles del jugador.'
)

const leaveHandler = () => {
  playerStore.$storeReset()
}

onMounted(() => {
  if (!isPreRegister.value) {
    tournamentStore.fetchTournamentsByLeagueId()
  }
})

const disabled = computed(() => {
  return steps.value.steps[steps.value.current].disable
})

const next = () => {
  if (steps.value.steps[steps.value.current].next_step === 'save') {
    loading.value = true
    if (isEdition.value) {
      playerStore.updatePlayerFromForm().finally(() => (loading.value = false))
    } else {
      playerStore
        .createPlayer()
        .then((saved) => {
          if (saved && isPreRegister.value) {
            emit('registered')
            dialogState.value = false
          }
        })
        .finally(() => (loading.value = false))
    }
  } else {
    steps.value.current = steps.value.steps[steps.value.current].next_step as CurrentStep
  }
}

const back = () => {
  if (steps.value.steps[steps.value.current].back_step === 'close') {
    if (isPreRegister.value) {
      return
    }
    dialogState.value = false
  } else {
    steps.value.current = steps.value.steps[steps.value.current].back_step as CurrentStep
  }
}
</script>
<template>
  <Dialog
    v-model="dialogState"
    :loading="loading"
    :title="title"
    :subtitle="subtitle"
    icon-name="futzo-icon:football"
    width="690px"
    min-height="90vh"
    :persistent="isPreRegister"
    :show-close="!isPreRegister"
    @leaving="leaveHandler"
  >
    <template #v-card-text>
      <StepperContainer :step="steps.current" />
    </template>
    <template #actions>
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
    </template>
  </Dialog>
</template>
<style lang="sass">
  @use "~/assets/scss/pages/create-team.sass"
</style>
