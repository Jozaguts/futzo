<script lang="ts" setup>
  import type { RoundStatus } from '~/models/Schedule'
  import ScheduleBoard from '~/components/pages/torneos/torneo/schedule/index.vue'

  const scheduleStore = useScheduleStore()
  const { toast } = useToast()
  const { schedules, hasSchedule, scheduleDialog, scheduleDrawerOpen, pendingManualMatches, schedulePagination } =
    storeToRefs(scheduleStore)

  const isBootstrapping = ref(true)
  const search = ref('')
  const hasPendingManualMatches = computed(() => pendingManualMatches.value > 0)
  const pendingManualMatchesText = computed(() => {
    if (pendingManualMatches.value === 1) {
      return '1 partido pendiente por programar manualmente.'
    }
    return `${pendingManualMatches.value} partidos pendientes por programar manualmente.`
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

  .calendar-tab__settings-btn
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

  @media (min-width: 960px)
    .calendar-tab__toolbar
      grid-template-columns: auto minmax(180px, 220px) minmax(280px, 1fr)
      gap: 12px

    .calendar-tab__search
      justify-self: end
      width: 100%
</style>
