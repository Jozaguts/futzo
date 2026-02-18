<script lang="ts" setup>
import type {RoundStatus} from '~/models/Schedule'
import ScheduleBoard from '~/components/pages/torneos/torneo/schedule/index.vue'

const scheduleStore = useScheduleStore()
  const { toast } = useToast()
  const { schedules, hasSchedule, scheduleDialog, scheduleDrawerOpen, pendingManualMatches, schedulePagination } =
    storeToRefs(scheduleStore)

  const isBootstrapping = ref(true)
  const search = ref('')
  const showHardResetDialog = ref(false)
  const hardResetRound = ref<number | null>(null)
  const isHardResetSubmitting = ref(false)
  const hasPendingManualMatches = computed(() => pendingManualMatches.value > 0)
  const canOpenHardResetDialog = computed(() => hasSchedule.value && !isBootstrapping.value)
  const pendingManualMatchesText = computed(() => {
    if (pendingManualMatches.value === 1) {
      return '1 partido pendiente por programar manualmente.'
    }
    return `${pendingManualMatches.value} partidos pendientes por programar manualmente.`
  })
  const totalAvailableRounds = computed(() => {
    const roundsFromPagination = Number(schedulePagination.value.last_page ?? 0)
    const roundsFromLoadedData = schedules.value.rounds.reduce((maxRound, round) => {
      const currentRound = Number(round?.round ?? 0)
      if (!Number.isFinite(currentRound)) {
        return maxRound
      }
      return Math.max(maxRound, currentRound)
    }, 0)
    return Math.max(roundsFromPagination, roundsFromLoadedData, 0)
  })
  const hardResetRoundOptions = computed<Array<{ title: string; value: number | null }>>(() => {
    const specificRoundOptions = Array.from({ length: totalAvailableRounds.value }, (_, index) => ({
      title: `Jornada ${index + 1}`,
      value: index + 1,
    }))
    return [{ title: 'Reset completo (todas las jornadas)', value: null }, ...specificRoundOptions]
  })
  const selectedHardResetRound = computed(() => {
    const parsedRound = Number(hardResetRound.value ?? 0)
    if (!Number.isFinite(parsedRound) || parsedRound <= 1) {
      return null
    }
    return Math.trunc(parsedRound)
  })
  const hardResetPayload = computed(() => {
    if (!selectedHardResetRound.value) {
      return undefined
    }
    return { round: selectedHardResetRound.value }
  })
  const hardResetImpactMessage = computed(() => {
    if (selectedHardResetRound.value) {
      return `Se borrarán goles, asistencias, tarjetas y resultados desde la jornada ${selectedHardResetRound.value}.`
    }
    return 'Se borrarán goles, asistencias, tarjetas y resultados de todo el calendario.'
  })
  const hardResetExecutionMessage = computed(() => {
    if (selectedHardResetRound.value) {
      return `El torneo se reiniciará desde la jornada ${selectedHardResetRound.value}.`
    }
    return 'El torneo se reiniciará desde cero.'
  })

  const statusOptions: Array<{ title: string; value: 'all' | RoundStatus }> = [
    { title: 'Todas', value: 'all' },
    { title: 'Programadas', value: 'programado' },
    { title: 'En progreso', value: 'en_progreso' },
    { title: 'Completadas', value: 'completado' },
    { title: 'Aplazadas', value: 'aplazado' },
    { title: 'Canceladas', value: 'cancelado' },
  ]

  const selectedStatus = computed<'all' | RoundStatus>({
    get: () => (schedulePagination.value.filterBy as RoundStatus | undefined) ?? 'all',
    set: (value) => {
      schedulePagination.value.filterBy = value === 'all' ? undefined : value
    },
  })

  const resetAndReload = async () => {
    schedulePagination.value.current_page = 1
    schedules.value.rounds = []
    await scheduleStore.getTournamentSchedules()
  }

  const loadCalendar = async () => {
    try {
      await scheduleStore.refreshScheduleSettings()
      await resetAndReload()
    } catch {
      toast({
        type: 'error',
        msg: 'Calendario',
        description: 'No se pudo cargar la información del calendario.',
      })
    }
  }

  const applyStatusFilter = async (value: 'all' | RoundStatus) => {
    selectedStatus.value = value
    await resetAndReload()
  }

  const handleStatusUpdate = (value: string | null) => {
    void applyStatusFilter((value ?? 'all') as 'all' | RoundStatus)
  }

  const runSearch = useDebounceFn(async (value: string) => {
    schedulePagination.value.search = value.trim() || undefined
    await resetAndReload()
  }, 450)

  const onSearchChange = (value: string) => {
    void runSearch(value)
  }

  const openCalendarSettings = async () => {
    try {
      await scheduleStore.refreshScheduleSettings()
      if (!hasSchedule.value) {
        scheduleDialog.value = true
        return
      }
      scheduleDrawerOpen.value = true
    } catch {
      toast({
        type: 'error',
        msg: 'Calendario',
        description: 'No se pudieron abrir los ajustes del calendario.',
      })
    }
  }

  const openHardResetDialog = () => {
    if (!canOpenHardResetDialog.value) {
      return
    }
    hardResetRound.value = null
    showHardResetDialog.value = true
  }

  const closeHardResetDialog = () => {
    if (isHardResetSubmitting.value) {
      return
    }
    showHardResetDialog.value = false
  }

  const extractResetErrorMessage = (error: unknown) => {
    const dataMessage = (error as { data?: { message?: string } })?.data?.message
    if (dataMessage) {
      return dataMessage
    }
    const responseMessage = (error as { response?: { _data?: { message?: string } } })?.response?._data?.message
    if (responseMessage) {
      return responseMessage
    }
    const message = (error as { message?: string })?.message
    if (message) {
      return message
    }
    return 'No se pudo reiniciar el calendario.'
  }

  const confirmHardReset = async () => {
    if (!canOpenHardResetDialog.value || isHardResetSubmitting.value) {
      return
    }
    isHardResetSubmitting.value = true
    try {
      await scheduleStore.hardResetSchedule(hardResetPayload.value)
      showHardResetDialog.value = false
    } catch (error) {
      toast({
        type: 'error',
        msg: 'Calendario',
        description: extractResetErrorMessage(error),
      })
    } finally {
      isHardResetSubmitting.value = false
    }
  }

  onMounted(async () => {
    search.value = schedulePagination.value.search ?? ''
    await loadCalendar()
    isBootstrapping.value = false
  })
</script>

<template>
  <section class="calendar-tab" data-testid="calendar-tab">
    <div class="calendar-tab__toolbar-shell futzo-rounded" data-testid="calendar-toolbar-shell">
      <div class="calendar-tab__toolbar">
        <v-btn
          class="calendar-tab__settings-btn"
          variant="outlined"
          color="secondary"
          rounded="lg"
          data-testid="calendar-config-button"
          @click="openCalendarSettings"
        >
          <template #prepend>
            <Icon name="lucide:settings-2" size="16" />
          </template>
          Configurar calendario
        </v-btn>

        <v-select
          :model-value="selectedStatus"
          :items="statusOptions"
          item-title="title"
          item-value="value"
          density="comfortable"
          variant="outlined"
          rounded="lg"
          hide-details
          menu-icon="lucide:chevron-down"
          class="calendar-tab__status-filter"
          data-testid="calendar-status-filter"
          @update:model-value="handleStatusUpdate"
        />

        <v-text-field
          v-model="search"
          density="comfortable"
          variant="outlined"
          rounded="lg"
          hide-details
          clearable
          placeholder="Buscar equipo..."
          class="calendar-tab__search"
          data-testid="calendar-search"
          @update:model-value="(value) => onSearchChange(String(value ?? ''))"
        >
          <template #prepend-inner>
            <Icon name="lucide:search" size="16" />
          </template>
        </v-text-field>

        <v-btn
          class="calendar-tab__hard-reset-btn"
          variant="outlined"
          color="error"
          rounded="lg"
          :disabled="!canOpenHardResetDialog || isHardResetSubmitting"
          data-testid="calendar-hard-reset-button"
          @click="openHardResetDialog"
        >
          <template #prepend>
            <Icon name="lucide:rotate-ccw" size="16" />
          </template>
          Resetear calendario
        </v-btn>
      </div>

      <div v-if="hasPendingManualMatches" class="calendar-tab__context" data-testid="calendar-pending-context">
        <Icon name="lucide:clock-3" size="15" />
        <span>{{ pendingManualMatchesText }}</span>
      </div>
    </div>

    <div class="calendar-tab__content" data-testid="calendar-tab-content">
      <v-skeleton-loader v-if="isBootstrapping" type="article, article" />
      <ScheduleBoard v-else />
    </div>

    <v-dialog
      v-model="showHardResetDialog"
      max-width="540"
      :persistent="isHardResetSubmitting"
      @update:model-value="
        (value) => {
          if (!value) {
            closeHardResetDialog()
          }
        }
      "
    >
      <v-card data-testid="calendar-hard-reset-dialog">
        <v-card-title class="font-weight-bold">Reiniciar calendario</v-card-title>
        <v-card-text>
          <p class="text-body-2 mb-4">
            Selecciona la jornada desde donde quieres reiniciar el calendario. Si no seleccionas jornada, el reset será
            total.
          </p>

          <v-autocomplete
            v-model="hardResetRound"
            :items="hardResetRoundOptions"
            item-title="title"
            item-value="value"
            clearable
            hide-details
            density="comfortable"
            variant="outlined"
            rounded="lg"
            label="Jornada para reset"
            data-testid="calendar-hard-reset-round"
          />

          <div class="calendar-tab__hard-reset-warning futzo-rounded mt-4" data-testid="calendar-hard-reset-warning">
            <Icon name="lucide:triangle-alert" size="16" class="calendar-tab__hard-reset-warning-icon" />
            <div>
              <p class="text-body-2 mb-1">{{ hardResetImpactMessage }}</p>
              <p class="text-body-2 mb-0">{{ hardResetExecutionMessage }}</p>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" :disabled="isHardResetSubmitting" @click="closeHardResetDialog">Cancelar</v-btn>
          <v-btn
            color="error"
            :loading="isHardResetSubmitting"
            :disabled="isHardResetSubmitting"
            data-testid="calendar-hard-reset-confirm"
            @click="confirmHardReset"
          >
            Reiniciar calendario
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <LazyPagesTorneosCalendarioDialog />
  </section>
</template>

<style lang="sass" scoped>
  .calendar-tab
    display: flex
    flex-direction: column
    gap: 12px
    min-width: 0

  .calendar-tab__toolbar-shell
    border: 1px solid #eaecf0
    background: #fff
    padding: 12px

  .calendar-tab__toolbar
    display: grid
    grid-template-columns: minmax(0, 1fr)
    gap: 10px
    align-items: center

  .calendar-tab__settings-btn,
  .calendar-tab__hard-reset-btn
    justify-content: flex-start
    text-transform: none
    letter-spacing: normal
    font-weight: 600
    min-height: 42px

  .calendar-tab__status-filter,
  .calendar-tab__search
    min-width: 0

  .calendar-tab__status-filter :deep(.v-field),
  .calendar-tab__search :deep(.v-field)
    min-height: 42px
    border-radius: 10px

  .calendar-tab__status-filter :deep(.v-field__input),
  .calendar-tab__search :deep(.v-field__input)
    font-size: 14px

  .calendar-tab__context
    margin-top: 10px
    border: 1px solid #eaecf0
    background: #f8fafc
    border-radius: 10px
    min-height: 36px
    display: inline-flex
    align-items: center
    gap: 8px
    padding: 0 12px
    font-size: 13px
    color: #344054

  .calendar-tab__content
    min-width: 0

  .calendar-tab__hard-reset-warning
    border: 1px solid #fecdca
    background: #fffbfa
    color: #7a271a
    display: flex
    gap: 10px
    padding: 10px 12px

  .calendar-tab__hard-reset-warning-icon
    margin-top: 2px
    flex-shrink: 0

  @media (min-width: 960px)
    .calendar-tab__toolbar
      grid-template-columns: auto minmax(180px, 220px) minmax(280px, 1fr) auto
      gap: 12px

    .calendar-tab__search
      justify-self: end
      width: 100%
</style>
