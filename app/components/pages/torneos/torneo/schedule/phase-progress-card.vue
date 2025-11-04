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
    isFinalPhaseActive,
    hasActivePhaseMatches,
    areActivePhaseMatchesProgrammed,
    areActivePhaseMatchesCompleted,
    isActivePhaseConfigurationLocked,
    teamsWithoutGames,
    pendingManualMatches,
    hasPendingManualMatches,
    regenerationAnalysis,
    isAnalyzingRegeneration,
    isConfirmingRegeneration,
    lastRegeneration,
  } = storeToRefs(scheduleStore)

  const activePhaseName = computed(() => activePhase.value?.name ?? 'No hay fase activa')
  const nextPhaseNAme = computed(() => nextPhase.value?.name ?? 'Ninguna')

  const hasPhases = computed(() => (scheduleSettings.value?.phases?.length ?? 0) > 0)
  const advanceLabel = computed(() => {
    if (!activePhase.value) {
      return 'Avanzar de fase'
    }
    if (
      isFinalPhaseActive.value &&
      hasActivePhaseMatches.value &&
      (areActivePhaseMatchesProgrammed.value || areActivePhaseMatchesCompleted.value)
    ) {
      return 'Finalizar torneo'
    }
    if (nextPhase.value) {
      return `Avanzar a ${nextPhase.value.name}`
    }
    return 'Avanzar de fase'
  })
  const canAdvance = computed(() => {
    if (!activePhase.value) {
      return false
    }
    if (isFinalPhaseActive.value) {
      return areActivePhaseMatchesCompleted.value
    }
    return Boolean(nextPhase.value)
  })
  const bracketButtonLabel = computed(() => {
    const target = activeEliminationPhase.value ?? upcomingEliminationPhase.value
    return target ? `Configurar ${target.name}` : 'Configurar eliminatoria'
  })
  const showRegenerationDialog = ref(false)
  const hasRegenerationAction = computed(() => teamsWithoutGames.value.length > 0 || hasPendingManualMatches.value)
  const formatRegenerationTimestamp = (value: string | null | undefined) => {
    if (!value) {
      return null
    }
    try {
      return new Intl.DateTimeFormat('es-MX', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(value))
    } catch (error) {
      return value
    }
  }
  const lastRegenerationSummary = computed(() => {
    if (!lastRegeneration.value) {
      return null
    }
    const executed = formatRegenerationTimestamp(lastRegeneration.value.executed_at)
    const modeLabel =
      lastRegeneration.value.mode === 'partial' && lastRegeneration.value.cutoff_round
        ? `a partir de la jornada ${lastRegeneration.value.cutoff_round}`
        : 'completa'
    const matchesCreated = lastRegeneration.value.matches_created
    const matchesLabel =
      typeof matchesCreated === 'number'
        ? `${matchesCreated} partido${matchesCreated === 1 ? '' : 's'}`
        : null
    if (executed && matchesLabel) {
      return `${executed} · ${modeLabel} · ${matchesLabel}`
    }
    if (executed) {
      return `${executed} · ${modeLabel}`
    }
    return matchesLabel ? `${modeLabel} · ${matchesLabel}` : modeLabel
  })
  const pendingManualMatchesLabel = computed(() => {
    const total = pendingManualMatches.value ?? 0
    const suffix = total === 1 ? '' : 's'
    return `Hay ${total} partido${suffix} pendientes de programación manual.`
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
  const handleOpenRegenerationDialog = async () => {
    scheduleStore.resetRegenerationState()
    showRegenerationDialog.value = true
    try {
      await scheduleStore.analyzeScheduleRegeneration()
    } catch (error) {
      showRegenerationDialog.value = false
    }
  }
  const handleCloseRegenerationDialog = () => {
    showRegenerationDialog.value = false
    scheduleStore.resetRegenerationState()
  }
  const handleConfirmRegeneration = async () => {
    try {
      await scheduleStore.confirmScheduleRegeneration()
      handleCloseRegenerationDialog()
    } catch (error) {
      // Keep dialog open to allow retry
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
      <div v-if="teamsWithoutGames.length" class="mt-4">
        <p class="text-subtitle-2 font-weight-medium mb-2">Equipos sin partidos programados</p>
        <div class="d-flex flex-wrap" style="gap: 8px">
          <v-chip
            v-for="team in teamsWithoutGames"
            :key="team.id"
            size="small"
            color="primary"
            variant="tonal"
          >
            {{ team.name }}
          </v-chip>
        </div>
      </div>
      <v-alert
        v-if="hasPendingManualMatches"
        type="warning"
        variant="tonal"
        border="start"
        density="comfortable"
        class="mt-4"
      >
        {{ pendingManualMatchesLabel }}
      </v-alert>
      <div v-if="lastRegenerationSummary" class="mt-4 text-caption text-medium-emphasis">
        Última regeneración: {{ lastRegenerationSummary }}
      </div>
    </v-card-text>
    <v-card-actions>
      <div class="d-flex w-100 justify-space-between flex-wrap" style="gap: 8px">
        <div class="d-flex align-center flex-wrap" style="gap: 8px">
          <PrimaryBtn
            text="Regenerar calendario"
            :show-icon="false"
            color="secondary"
            variant="outlined"
            @click="handleOpenRegenerationDialog"
            :loading="isAnalyzingRegeneration"
            :disabled="!hasRegenerationAction || isAnalyzingRegeneration || isConfirmingRegeneration"
          ></PrimaryBtn>
        </div>
        <div class="d-flex justify-end flex-wrap" style="gap: 8px">
          <PrimaryBtn
            @click="handleAdvancePhase"
            :text="advanceLabel"
            :show-icon="false"
            :loading="isAdvancingPhase"
            :disabled="!canAdvance || isAdvancingPhase"
          ></PrimaryBtn>
          <PrimaryBtn
            text="Configurar"
            :show-icon="false"
            :disabled="!activeEliminationPhase || isActivePhaseConfigurationLocked"
            @click="handleOpenBracket"
            color="secondary"
            variant="outlined"
          ></PrimaryBtn>
        </div>
      </div>
    </v-card-actions>
  </v-card>
  <v-dialog
    v-model="showRegenerationDialog"
    max-width="520"
    :persistent="isConfirmingRegeneration"
    @update:model-value="(value) => {
      if (!value) {
        handleCloseRegenerationDialog()
      }
    }"
  >
    <v-card>
      <v-card-title class="font-weight-bold">Regenerar calendario</v-card-title>
      <v-card-text>
        <div v-if="isAnalyzingRegeneration" class="py-4">
          <v-progress-linear indeterminate color="primary" class="mb-4" />
          <p class="text-body-2 mb-0">Analizando estado actual del calendario...</p>
        </div>
        <div v-else-if="regenerationAnalysis" class="text-body-2">
          <p>{{ regenerationAnalysis.explanation }}</p>
          <ul class="mt-3 pl-4">
            <li v-if="regenerationAnalysis.mode === 'partial'">
              Se conservarán las jornadas completadas hasta la {{ regenerationAnalysis.completed_rounds }}.
            </li>
            <li v-if="regenerationAnalysis.cutoff_round">
              Los nuevos partidos iniciarán desde la jornada {{ regenerationAnalysis.cutoff_round }}.
            </li>
            <li>
              Los partidos generados se crearán sin fecha ni campo asignados para programarlos manualmente.
            </li>
            <li v-if="teamsWithoutGames.length">
              {{ teamsWithoutGames.length }} equipo{{ teamsWithoutGames.length === 1 ? '' : 's' }} sin partidos asignados.
            </li>
            <li v-if="regenerationAnalysis.pending_manual_matches">
              Actualmente hay {{ regenerationAnalysis.pending_manual_matches }} partido{{
                regenerationAnalysis.pending_manual_matches === 1 ? '' : 's'
              }} pendientes de programación.
            </li>
          </ul>
        </div>
        <div v-else class="py-4">
          <p class="text-body-2 mb-0">
            No fue posible obtener el análisis del calendario. Intenta nuevamente.
          </p>
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="handleCloseRegenerationDialog" :disabled="isConfirmingRegeneration">
          Cancelar
        </v-btn>
        <v-btn
          color="primary"
          @click="handleConfirmRegeneration"
          :loading="isConfirmingRegeneration"
          :disabled="isAnalyzingRegeneration || !regenerationAnalysis"
        >
          Continuar y regenerar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
