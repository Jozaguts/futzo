<script setup lang="ts">
  import { storeToRefs } from '#imports'

  const emits = defineEmits<{
    (event: 'open-bracket'): void
  }>()
  const scheduleStore = useScheduleStore()
  const {
    scheduleSettings,
    isAdvancingPhase,
    eliminationPhases,
    activePhase,
    activeEliminationPhase,
    upcomingEliminationPhase,
    nextPhase,
  } = storeToRefs(scheduleStore)

  const activePhaseName = computed(() => activePhase.value?.name ?? 'No hay fase activa')
  const nextPhaseNAme = computed(() => nextPhase.value?.name ?? 'No siguiente hay fase activa')

  const hasPhases = computed(() => (scheduleSettings.value?.phases?.length ?? 0) > 0)
  const advanceLabel = computed(() => {
    if (!activePhase.value || !nextPhase.value) {
      return 'Avanzar de fase'
    }
    return `Avanzar a ${nextPhase.value.name}`
  })
  const canAdvance = computed(() => Boolean(activePhase.value && nextPhase.value))
  const bracketButtonLabel = computed(() => {
    const target = activeEliminationPhase.value ?? upcomingEliminationPhase.value
    return target ? `Configurar ${target.name}` : 'Configurar eliminatoria'
  })
  const handleAdvancePhase = async () => {
    if (!canAdvance.value) {
      return
    }
    await scheduleStore.advanceTournamentPhase()
  }
  const handleOpenBracket = () => {
    if (activeEliminationPhase.value) {
      emits('open-bracket')
    }
  }
</script>
<template>
  <v-card v-if="hasPhases" class="futzo-rounded phase-progress-card">
    <v-card-title>Detalles del torneo </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <BaseLabelInput id="fase" label="Fase activa" readonly v-model="activePhaseName" />
      <BaseLabelInput id="next-fase" label="Siguiente fase" readonly v-model="nextPhaseNAme" />
    </v-card-text>
    <v-card-actions>
      <div class="d-flex justify-end w-100">
        <PrimaryBtn
          @click="handleAdvancePhase"
          text="Avanzar de fase"
          :show-icon="false"
          :loading="isAdvancingPhase"
          :disabled="!canAdvance || isAdvancingPhase"
          class="mr-2"
        ></PrimaryBtn>
        <PrimaryBtn
          text="Configurar"
          :show-icon="false"
          :disabled="!activeEliminationPhase"
          @click="handleOpenBracket"
          color="secondary"
          variant="outlined"
        ></PrimaryBtn>
      </div>
    </v-card-actions>
  </v-card>
</template>
