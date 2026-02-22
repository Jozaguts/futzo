<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from 'dayjs'
import {useToast} from '~/composables/useToast'
import {useLeaguesStore} from '~/stores/useLeaguesStore'
import type {Field as ScheduleField, HourAvailableInterval} from '~/models/Schedule'

const gameStore = useGameStore()
  const tournamentStore = useTournamentStore()
  const leaguesStore = useLeaguesStore()
  const { toast } = useToast()
  const { getLeagueLocations } = leaguesStore
  const { tournamentId } = storeToRefs(tournamentStore)
  const { showReScheduleDialog, game, gameDetailsRequest } = storeToRefs(gameStore)
  const { reScheduleGame } = gameStore

  type FieldOption = ScheduleField & {
    location?: {
      id: number
      name: string
    } | null
  }

  type LocationOption = {
    id: number
    name: string
  }

  const loading = ref(false)
  const isInitializing = ref(false)
  const hasCheckedAvailableSlots = ref(false)
  const fieldsSource = ref<'tournament' | 'league' | null>(null)
  const fields = ref<FieldOption[]>([])
  const locations = ref<LocationOption[]>([])

  const badgePalette = ['#ef4444', '#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']

  const onLeaving = () => {
    showReScheduleDialog.value = false
    fields.value = []
    locations.value = []
    fieldsSource.value = null
  }

  const closeDialog = () => {
    showReScheduleDialog.value = false
  }

  const resolveTeamShort = (teamName?: string) => {
    if (!teamName) {
      return '---'
    }
    return teamName
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 3)
      .toUpperCase()
  }

  const resolveTeamColor = (teamId?: number) => {
    if (!teamId) {
      return badgePalette[0]
    }
    return badgePalette[Math.abs(teamId) % badgePalette.length]
  }

  const homeShort = computed(() => resolveTeamShort(game.value?.home?.name))
  const awayShort = computed(() => resolveTeamShort(game.value?.away?.name))
  const homeColor = computed(() => resolveTeamColor(game.value?.home?.id))
  const awayColor = computed(() => resolveTeamColor(game.value?.away?.id))
  const currentSchedule = computed(() => {
    const chunks = [
      game.value?.details?.date,
      game.value?.details?.raw_time,
      game.value?.details?.location?.name,
      game.value?.details?.field?.name,
    ].filter((value) => Boolean(value))
    return chunks.join(' · ') || 'Horario pendiente por confirmar.'
  })
  const dialogLoading = computed(() => loading.value && isInitializing.value)
  const todayIsoDate = computed(() => dayjs().format('YYYY-MM-DD'))

  const fetchLocations = async () => {
    try {
      const data = await getLeagueLocations()
      locations.value = (data ?? []).map((location: any) => ({
        id: location.id,
        name: location.name,
      }))
    } catch {
      locations.value = []
      toast({
        type: 'error',
        msg: 'Error al cargar sedes',
        description: 'No pudimos obtener la lista de sedes. Intenta nuevamente.',
      })
    }
  }

  const fetchFields = async (locationId?: number | null, options: { preserveSelection?: boolean } = {}) => {
    if (!tournamentId.value) {
      fields.value = []
      fieldsSource.value = null
      return false
    }

    const preserveSelection = options.preserveSelection ?? true
    const previousFieldId = preserveSelection ? gameDetailsRequest.value.field_id : 0

    try {
      const response = await tournamentStore.tournamentFields(tournamentId.value as number, locationId ?? null)
      fields.value = (response.data ?? []) as FieldOption[]
      fieldsSource.value = (response.meta?.fields_source ?? null) as 'tournament' | 'league' | null

      if (fields.value.length === 0) {
        gameDetailsRequest.value.field_id = 0
        if (game.value) {
          game.value.options = []
        }
        return false
      }

      const matchingField = previousFieldId !== 0 ? fields.value.find((field) => field.id === previousFieldId) : null
      gameDetailsRequest.value.field_id = matchingField ? matchingField.id : fields.value[0].id

      const selectedField = fields.value.find((field) => field.id === gameDetailsRequest.value.field_id)
      if (selectedField?.location?.id) {
        gameDetailsRequest.value.location_id = selectedField.location.id
      }
      return true
    } catch {
      fields.value = []
      fieldsSource.value = null
      gameDetailsRequest.value.field_id = 0
      if (game.value) {
        game.value.options = []
      }
      toast({
        type: 'error',
        msg: 'Error al cargar campos',
        description: 'No pudimos obtener la lista de campos disponibles. Intenta nuevamente.',
      })
      return false
    }
  }

  const fetchMatch = async () => {
    const canFetch =
      Boolean(gameDetailsRequest.value.game_id) &&
      Boolean(gameDetailsRequest.value.field_id) &&
      Boolean(gameDetailsRequest.value.date)

    if (!canFetch) {
      loading.value = false
      hasCheckedAvailableSlots.value = false
      if (game.value) {
        game.value.options = []
      }
      return
    }

    loading.value = true
    try {
      await gameStore.getGameDetails()
      hasCheckedAvailableSlots.value = true
    } catch {
      hasCheckedAvailableSlots.value = true
      toast({
        type: 'error',
        msg: 'Error al obtener el partido',
        description: 'Hubo un problema al recuperar la información del partido. Intenta nuevamente.',
      })
    } finally {
      loading.value = false
    }
  }

  const bootstrapSearchDate = () => {
    gameDetailsRequest.value.date = todayIsoDate.value
    gameDetailsRequest.value.selected_time = null
    hasCheckedAvailableSlots.value = false
  }

  const clearAvailableSlots = () => {
    hasCheckedAvailableSlots.value = false
    if (game.value) {
      game.value.options = []
    }
  }

  watch(
    () => showReScheduleDialog.value,
    async (isOpen) => {
      if (!isOpen) {
        fields.value = []
        locations.value = []
        fieldsSource.value = null
        gameDetailsRequest.value.selected_time = null
        hasCheckedAvailableSlots.value = false
        loading.value = false
        return
      }

      isInitializing.value = true
      loading.value = true
      bootstrapSearchDate()

      await fetchLocations()

      const initialLocationId =
        gameDetailsRequest.value.location_id ?? game.value?.details?.location?.id ?? locations.value[0]?.id ?? null

      if (initialLocationId !== null) {
        gameDetailsRequest.value.location_id = initialLocationId
      }

      let hasFields = false
      try {
        hasFields = await fetchFields(gameDetailsRequest.value.location_id ?? null, { preserveSelection: true })
        if (hasFields) {
          await fetchMatch()
        } else {
          clearAvailableSlots()
          loading.value = false
        }
      } finally {
        isInitializing.value = false
        if (loading.value) {
          loading.value = false
        }
      }
    }
  )

  const onLocationChange = async (locationId: number | null) => {
    if (isInitializing.value) {
      return
    }
    gameDetailsRequest.value.location_id = locationId ?? null
    gameDetailsRequest.value.selected_time = null
    hasCheckedAvailableSlots.value = false
    const hasFields = await fetchFields(locationId ?? null, { preserveSelection: false })
    if (hasFields) {
      await fetchMatch()
    } else {
      clearAvailableSlots()
    }
  }

  const fetchFieldAvailabilities = async (by: string, value: string | number | Date) => {
    if (!value) {
      return
    }

    if (by === 'by-date' && dayjs(value).isValid()) {
      gameDetailsRequest.value.date = value as string
      gameDetailsRequest.value.selected_time = null
      hasCheckedAvailableSlots.value = false
    }

    if (by === 'by-field_id') {
      gameDetailsRequest.value.field_id = value as number
      gameDetailsRequest.value.selected_time = null
      hasCheckedAvailableSlots.value = false
      const selectedField = fields.value.find((field) => field.id === gameDetailsRequest.value.field_id)
      if (selectedField?.location?.id) {
        gameDetailsRequest.value.location_id = selectedField.location.id
      }
    }

    await fetchMatch()
  }

  const availableIntervalHours = computed<HourAvailableInterval[]>(() => {
    if (game.value?.options?.length) {
      return game.value.options[0].available_intervals.hours
    }
    return []
  })

  const canReschedule = computed(() => {
    const hasDate = !!gameDetailsRequest.value.date
    const hasField = !!gameDetailsRequest.value.field_id
    const hasDay = !!gameDetailsRequest.value.day
    const hasTime = !!gameDetailsRequest.value.selected_time
    const hasHours = availableIntervalHours.value.length > 0
    return hasDate && hasField && hasDay && hasTime && hasHours && !loading.value
  })

  const handleReschedule = () => {
    if (!gameDetailsRequest.value.date) {
      toast({
        type: 'warning',
        msg: 'Selecciona una fecha',
        description: 'Debes seleccionar una fecha válida para reprogramar el partido.',
      })
      return
    }
    if (!gameDetailsRequest.value.field_id) {
      toast({
        type: 'warning',
        msg: 'Selecciona un campo',
        description: 'Debes seleccionar un campo para reprogramar el partido.',
      })
      return
    }
    if (!gameDetailsRequest.value.day) {
      toast({
        type: 'warning',
        msg: 'Selecciona una fecha válida',
        description: 'No pudimos determinar el día de la semana para reprogramar el partido.',
      })
      return
    }
    if (!gameDetailsRequest.value.selected_time) {
      toast({
        type: 'warning',
        msg: 'Selecciona una hora',
        description: 'Debes seleccionar una hora disponible para reprogramar el partido.',
      })
      return
    }
    if (!availableIntervalHours.value.length) {
      toast({
        type: 'warning',
        msg: 'Sin horas disponibles',
        description: 'No hay horarios disponibles para la fecha y campo seleccionados.',
      })
      return
    }
    reScheduleGame()
  }
</script>
<template>
  <Dialog
    :loading="dialogLoading"
    title="Reprogramar partido"
    subtitle="Ajusta fecha, hora o campo para este partido."
    :model-value="showReScheduleDialog"
    @leaving="onLeaving"
    icon-name="lucide:calendar-clock"
    min-height="90vh"
    width="760px"
    data-testid="reschedule-dialog"
  >
    <template #v-card-text>
      <section class="reschedule-content">
        <article class="reschedule-content__summary futzo-rounded">
          <p class="reschedule-content__summary-label">Actualmente programado</p>
          <div class="reschedule-content__teams">
            <div class="reschedule-content__team">
              <div class="reschedule-content__team-badge" :style="{ backgroundColor: homeColor }">{{ homeShort }}</div>
              <span class="reschedule-content__team-name">{{ game?.home?.name ?? 'Local' }}</span>
            </div>
            <span class="reschedule-content__versus">vs</span>
            <div class="reschedule-content__team">
              <div class="reschedule-content__team-badge" :style="{ backgroundColor: awayColor }">{{ awayShort }}</div>
              <span class="reschedule-content__team-name">{{ game?.away?.name ?? 'Visita' }}</span>
            </div>
          </div>
          <p class="reschedule-content__summary-meta">{{ currentSchedule }}</p>
          <p class="reschedule-content__hint">Se consulta disponibilidad con la fecha de hoy al abrir este modal.</p>
        </article>

        <div class="reschedule-content__form futzo-rounded">
          <v-row>
            <v-col cols="12" md="4">
              <label class="reschedule-content__label">Fecha</label>
              <BaseCalendarInput
                v-model:start_date="gameDetailsRequest.date"
                :multi-calendar="false"
                :min-date="false"
                @update:start_date="(value) => fetchFieldAvailabilities('by-date', value as Date)"
              />
            </v-col>

            <v-col cols="12" md="4">
              <label class="reschedule-content__label">Sede</label>
              <v-select
                v-model="gameDetailsRequest.location_id"
                :items="locations"
                item-title="name"
                item-value="id"
                label="Selecciona una sede"
                :disabled="!locations.length"
                @update:model-value="(value) => onLocationChange(value as number | null)"
              />
            </v-col>

            <v-col cols="12" md="4">
              <label class="reschedule-content__label">Campo</label>
              <v-select
                v-model="gameDetailsRequest.field_id"
                :items="fields"
                item-title="name"
                item-value="id"
                label="Selecciona un campo"
                :disabled="!fields.length"
                @update:model-value="(value) => fetchFieldAvailabilities('by-field_id', value as number)"
              />
            </v-col>

            <v-col v-if="fieldsSource === 'league'" cols="12">
              <v-alert type="info" variant="tonal" density="compact" border="start">
                Utilizando campos de la liga (sin campos configurados en el torneo).
              </v-alert>
            </v-col>

            <v-col v-if="fields.length === 0" cols="12">
              <v-alert type="warning" variant="tonal" density="compact" border="start">
                Sin campos disponibles en esta sede.
              </v-alert>
            </v-col>

            <v-col v-else cols="12">
              <label class="reschedule-content__label">Horas disponibles</label>
              <v-alert v-if="loading && !isInitializing" type="info" variant="tonal" density="compact" border="start">
                Consultando horarios disponibles...
              </v-alert>

              <v-chip-group
                v-else-if="availableIntervalHours.length"
                v-model="gameDetailsRequest.selected_time"
                class="reschedule-content__chips"
                column
              >
                <v-chip
                  v-for="hour in availableIntervalHours"
                  :key="hour.start"
                  :value="hour"
                  base-color="primary"
                  filter
                >
                  {{ hour.start }} - {{ hour.end }}
                </v-chip>
              </v-chip-group>

              <v-empty-state
                v-else-if="hasCheckedAvailableSlots"
                size="120"
                headline="No hay horas disponibles"
                title="No hay horas disponibles para la fecha seleccionada"
                text="Selecciona otra fecha o campo."
                image="/futzo/logos/circular/logo-22.png"
              />

              <v-alert v-else type="info" variant="tonal" density="compact" border="start">
                Selecciona fecha y campo para consultar horarios disponibles.
              </v-alert>
            </v-col>
          </v-row>
        </div>
      </section>
    </template>
    <template #actions>
      <div class="reschedule-content__actions">
        <v-btn variant="outlined" color="secondary" @click="closeDialog">Cancelar</v-btn>
        <v-btn variant="elevated" color="primary" :disabled="!canReschedule" @click="handleReschedule">
          Reprogramar partido
        </v-btn>
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="sass">
  .reschedule-content
    display: flex
    flex-direction: column
    gap: 14px

  .reschedule-content__summary
    border: 1px solid var(--futzo-border)
    background: var(--futzo-surface)
    padding: 14px

  .reschedule-content__summary-label
    margin: 0
    font-size: 12px
    font-weight: 600
    color: var(--futzo-on-surface-muted)

  .reschedule-content__teams
    margin-top: 10px
    display: flex
    align-items: center
    justify-content: center
    gap: 16px

  .reschedule-content__team
    min-width: 0
    text-align: center
    display: flex
    flex-direction: column
    align-items: center
    gap: 6px

  .reschedule-content__team-badge
    width: 42px
    height: 42px
    border-radius: 10px
    color: var(--futzo-on-surface)
    display: inline-flex
    align-items: center
    justify-content: center
    font-size: 14px
    font-weight: 700

  .reschedule-content__team-name
    font-size: 13px
    color: var(--futzo-on-surface)
    font-weight: 600
    max-width: 180px
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap

  .reschedule-content__versus
    font-size: 12px
    color: var(--futzo-on-surface-muted)
    font-weight: 600
    text-transform: uppercase

  .reschedule-content__summary-meta
    margin: 10px 0 0
    text-align: center
    font-size: 13px
    color: var(--futzo-on-surface-muted)

  .reschedule-content__hint
    margin: 6px 0 0
    text-align: center
    font-size: 11px
    color: #98a2b3

  .reschedule-content__form
    border: 1px solid var(--futzo-border)
    background: #fcfcfd
    padding: 12px

  .reschedule-content__label
    display: block
    margin-bottom: 4px
    font-size: 12px
    font-weight: 600
    color: var(--futzo-text-muted)

  .reschedule-content__chips
    margin-top: 4px

  .reschedule-content__actions
    width: 100%
    display: flex
    justify-content: flex-end
    gap: 8px

  @media (max-width: 600px)
    .reschedule-content__actions
      flex-direction: column-reverse

    .reschedule-content__actions > .v-btn
      width: 100%
</style>
