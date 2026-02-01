<script setup lang="ts">
  import { storeToRefs, watch } from '#imports'
  import type { ScheduleRegenerationPayload } from '~/models/Schedule'
  import { useDisplay } from 'vuetify'
  import { Icon } from '#components'

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
    scheduleDrawerOpen,
  } = storeToRefs(scheduleStore)
  const { mobile } = useDisplay()
  const { tournament } = storeToRefs(useTournamentStore())
  const initialStartDate = ref<string | null>(null)
  const initialRoundTrip = ref<boolean | null>(null)
  const roundTripSelection = ref(false)
  const canUpdateStartDate = computed(() => scheduleSettings.value?.can_update_start_date !== false)
  const showAdvancePhaseConfirm = ref(false)
  const toDate = (value: Date | string | null | undefined): Date | null => {
    if (!value) {
      return null
    }
    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? null : value
    }
    if (typeof value === 'string') {
      const [year, month, day] = value.split('T')[0]?.split('-') ?? []
      const parsedYear = Number(year)
      const parsedMonth = Number(month)
      const parsedDay = Number(day)
      if (!Number.isNaN(parsedYear) && !Number.isNaN(parsedMonth) && !Number.isNaN(parsedDay)) {
        return new Date(parsedYear, parsedMonth - 1, parsedDay)
      }
      const fallback = new Date(value)
      return Number.isNaN(fallback.getTime()) ? null : fallback
    }
    return null
  }
  const formatDateForApi = (value: Date | string | null | undefined): string | null => {
    const date = toDate(value)
    if (!date) {
      return null
    }
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, '0')
    const day = `${date.getDate()}`.padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  const formatDateForDisplay = (value: Date | string | null | undefined): string | null => {
    const date = toDate(value)
    if (!date) {
      return null
    }
    return new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(date)
  }
  const formatDateWithWeekday = (value: Date | string | null | undefined): string | null => {
    const date = toDate(value)
    if (!date) {
      return null
    }
    return new Intl.DateTimeFormat('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }
  watch(
    () => scheduleSettings.value?.start_date,
    (value) => {
      if (value === undefined) {
        return
      }
      initialStartDate.value = formatDateForApi(value)
    },
    { immediate: true }
  )
  watch(
    () => scheduleSettings.value?.round_trip,
    (value) => {
      const normalized = Boolean(value)
      roundTripSelection.value = normalized
      initialRoundTrip.value = normalized
    },
    { immediate: true }
  )
  watch(
    () => tournament.value.start_date,
    (value) => {
      if (initialStartDate.value === null) {
        initialStartDate.value = formatDateForApi(value)
      }
    },
    { immediate: true }
  )
  const activePhaseName = computed(() => activePhase.value?.name ?? 'No hay fase activa')
  const nextPhaseNAme = computed(() => nextPhase.value?.name ?? 'Ninguna')
  const currentStartDateFormatted = computed(() => formatDateForApi(tournament.value.start_date))
  const startDateHasChanged = computed(() => {
    if (!canUpdateStartDate.value) {
      return false
    }
    const current = currentStartDateFormatted.value
    if (!current && !initialStartDate.value) {
      return false
    }
    return current !== initialStartDate.value
  })
  const roundTripHasChanged = computed(() => {
    if (initialRoundTrip.value === null) {
      return false
    }
    return roundTripSelection.value !== initialRoundTrip.value
  })
  const regenerationPayload = computed<ScheduleRegenerationPayload>(() => {
    const payload: ScheduleRegenerationPayload = {}
    const formatted = currentStartDateFormatted.value
    if (canUpdateStartDate.value && formatted) {
      payload.start_date = formatted
    }
    payload.round_trip = roundTripSelection.value
    return payload
  })
  const selectedStartDateLabel = computed(() => formatDateWithWeekday(tournament.value.start_date))
  const roundTripSwitchLabel = computed(() =>
    roundTripSelection.value ? 'Jornadas de ida y vuelta' : 'Jornadas solo de ida'
  )
  const formatNumber = (value: number | null | undefined) => {
    if (value === null || value === undefined) {
      return null
    }
    try {
      return new Intl.NumberFormat('es-MX').format(value)
    } catch (error) {
      return String(value)
    }
  }

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
  const hasRegenerationAction = computed(
    () =>
      startDateHasChanged.value ||
      roundTripHasChanged.value ||
      teamsWithoutGames.value.length > 0 ||
      hasPendingManualMatches.value
  )
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
      typeof matchesCreated === 'number' ? `${matchesCreated} partido${matchesCreated === 1 ? '' : 's'}` : null
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
    return `Partido${suffix} pendientes de programación.`
  })
  const advanceConfirmationMessage = computed(() => {
    if (!activePhase.value) {
      return 'No hay una fase activa en este momento.'
    }
    if (!nextPhase.value) {
      return `Estás a punto de finalizar el torneo desde la fase "${activePhaseName.value}". ¿Deseas continuar?`
    }
    return `Estamos en la fase "${activePhaseName.value}" y avanzaremos a "${nextPhaseNAme.value}". ¿Confirmas la acción?`
  })
  const handleTournamentStartDateUpdated = (value: Date | string | null) => {
    if (!canUpdateStartDate.value) {
      return
    }
    const parsed = toDate(value)
    tournament.value.start_date = parsed
    tournament.value.start_date_to_string = formatDateForDisplay(parsed) ?? ''
  }
  const handleAdvancePhase = async () => {
    if (!canAdvance.value) {
      return
    }
    await scheduleStore.advanceTournamentPhase()
  }
  const handleRequestAdvancePhase = () => {
    if (!canAdvance.value || isAdvancingPhase.value) {
      return
    }
    showAdvancePhaseConfirm.value = true
  }
  const handleCancelAdvancePhase = () => {
    showAdvancePhaseConfirm.value = false
  }
  const handleConfirmAdvancePhase = async () => {
    try {
      await handleAdvancePhase()
      showAdvancePhaseConfirm.value = false
    } catch (error) {
      // keep dialog open to allow retry
    }
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
      await scheduleStore.analyzeScheduleRegeneration(regenerationPayload.value)
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
      await scheduleStore.confirmScheduleRegeneration(regenerationPayload.value)
      initialStartDate.value = currentStartDateFormatted.value ?? null
      initialRoundTrip.value = roundTripSelection.value
      handleCloseRegenerationDialog()
    } catch (error) {
      // Keep dialog open to allow retry
    }
  }
</script>
<template>
  <v-card v-if="hasPhases" class="futzo-rounded phase-progress-card">
    <div v-if="mobile" class="phase-progress-card__close" @click="scheduleDrawerOpen = false">
      <Icon name="futzo-icon:x-dialog" class="pointer-cursor" size="20" />
    </div>
    <v-card-title>Detalles del torneo </v-card-title>
    <v-divider></v-divider>
    <v-alert v-if="hasPendingManualMatches" type="warning" variant="tonal" border="start" density="compact">
      {{ pendingManualMatchesLabel }}
    </v-alert>
    <v-card-text>
      <BaseLabelInput id="fase" label="Fase activa" readonly v-model="activePhaseName" />
      <BaseLabelInput id="next-fase" label="Siguiente fase" readonly v-model="nextPhaseNAme" />
      <v-divider class="my-3" />
      <BaseInput label="Fecha de inicio">
        <template #input>
          <BaseCalendarInput
            v-model:start_date="tournament.start_date"
            :multiCalendar="false"
            :disabled="!canUpdateStartDate"
            @start_date_updated="handleTournamentStartDateUpdated"
          />
        </template>
      </BaseInput>
      <BaseInput label="Ida y vuelta">
        <template #input>
          <v-switch
            density="compact"
            color="primary"
            v-model="roundTripSelection"
            :label="roundTripSwitchLabel"
            :disabled="isAnalyzingRegeneration || isConfirmingRegeneration"
            hint="Aplica únicamente a la fase regular."
            :persistent-hint="true"
          />
        </template>
      </BaseInput>
      <BaseInput :label="advanceLabel">
        <template #input>
          <PrimaryBtn
            density="compact"
            color="secondary"
            variant="outlined"
            @click="handleRequestAdvancePhase"
            text="Avanzar"
            :show-icon="false"
            :loading="isAdvancingPhase"
            :disabled="!canAdvance || isAdvancingPhase"
          ></PrimaryBtn>
        </template>
      </BaseInput>
      <BaseInput label="Configurar eliminatoria">
        <template #input>
          <PrimaryBtn
            text="Configurar"
            density="compact"
            :show-icon="false"
            :disabled="!activeEliminationPhase || isActivePhaseConfigurationLocked"
            @click="handleOpenBracket"
            color="secondary"
            variant="outlined"
          ></PrimaryBtn>
        </template>
      </BaseInput>
      <div v-if="teamsWithoutGames.length" class="mt-4">
        <p class="text-subtitle-2 font-weight-medium mb-2">Equipos sin partidos programados</p>
        <div class="d-flex flex-wrap" style="gap: 8px">
          <v-chip v-for="team in teamsWithoutGames" :key="team.id" size="small" color="primary" variant="tonal">
            {{ team.name }}
          </v-chip>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <div class="d-flex w-100 justify-space-between flex-wrap" style="gap: 8px">
        <PrimaryBtn
          text="Regenerar"
          density="compact"
          block
          :show-icon="false"
          @click="handleOpenRegenerationDialog"
          :loading="isAnalyzingRegeneration"
          :disabled="!hasRegenerationAction || isAnalyzingRegeneration || isConfirmingRegeneration"
        ></PrimaryBtn>
      </div>
    </v-card-actions>
    <div v-if="lastRegenerationSummary" class="mt-4 text-caption text-medium-emphasis px-4 pb-2">
      Última regeneración: {{ lastRegenerationSummary }}
    </div>
  </v-card>
  <v-dialog
    v-model="showRegenerationDialog"
    max-width="520"
    :persistent="isConfirmingRegeneration"
    @update:model-value="
      (value) => {
        if (!value) {
          handleCloseRegenerationDialog()
        }
      }
    "
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
            <li v-if="startDateHasChanged && selectedStartDateLabel">
              El calendario se regenerará y la fecha de inicio del torneo se actualizará al
              {{ selectedStartDateLabel }}.
            </li>
            <li v-if="regenerationAnalysis.mode === 'partial'">
              Se conservarán las jornadas completadas hasta la {{ regenerationAnalysis.completed_rounds }}.
            </li>
            <li v-if="regenerationAnalysis.cutoff_round">
              Los nuevos partidos iniciarán desde la jornada {{ regenerationAnalysis.cutoff_round }}.
            </li>
            <li v-if="typeof regenerationAnalysis.round_trip_selected === 'boolean'">
              {{
                regenerationAnalysis.round_trip_selected
                  ? 'Los partidos de fase regular se regenerarán a ida y vuelta.'
                  : 'Los partidos de fase regular se regenerarán solo de ida.'
              }}
            </li>
            <li v-if="regenerationAnalysis.matches_per_round && regenerationAnalysis.projected_rounds">
              Cada jornada tendrá {{ formatNumber(regenerationAnalysis.matches_per_round) }} partido{{
                regenerationAnalysis.matches_per_round === 1 ? '' : 's'
              }}
              y el calendario cubrirá {{ formatNumber(regenerationAnalysis.projected_rounds) }} jornada{{
                regenerationAnalysis.projected_rounds === 1 ? '' : 's'
              }}.
            </li>
            <li v-if="regenerationAnalysis.total_matches">
              En total se programarán {{ formatNumber(regenerationAnalysis.total_matches) }} partido{{
                regenerationAnalysis.total_matches === 1 ? '' : 's'
              }}.
            </li>
            <li v-if="regenerationAnalysis.has_bye">
              Debido a la cantidad impar de equipos, uno descansará cada jornada.
            </li>
            <li>Los partidos generados se crearán sin fecha ni campo asignados para programarlos manualmente.</li>
            <li v-if="teamsWithoutGames.length">
              {{ teamsWithoutGames.length }} equipo{{ teamsWithoutGames.length === 1 ? '' : 's' }} sin partidos
              asignados.
            </li>
            <li v-if="regenerationAnalysis.pending_manual_matches">
              Actualmente hay {{ regenerationAnalysis.pending_manual_matches }} partido{{
                regenerationAnalysis.pending_manual_matches === 1 ? '' : 's'
              }}
              pendientes de programación.
            </li>
          </ul>
        </div>
        <div v-else class="py-4">
          <p class="text-body-2 mb-0">No fue posible obtener el análisis del calendario. Intenta nuevamente.</p>
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
  <v-dialog
    v-model="showAdvancePhaseConfirm"
    max-width="420"
    :persistent="isAdvancingPhase"
    @update:model-value="
      (value) => {
        if (!value) {
          handleCancelAdvancePhase()
        }
      }
    "
  >
    <v-card>
      <v-card-title class="font-weight-bold">Confirmar avance de fase</v-card-title>
      <v-card-text>
        <p class="text-body-2 mb-0">
          {{ advanceConfirmationMessage }}
        </p>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="handleCancelAdvancePhase" :disabled="isAdvancingPhase">Cancelar</v-btn>
        <v-btn color="primary" @click="handleConfirmAdvancePhase" :loading="isAdvancingPhase" :disabled="!canAdvance">
          {{ advanceLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style scoped>
  .phase-progress-card {
    position: relative;
  }

  .phase-progress-card__close {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;
  }
</style>
