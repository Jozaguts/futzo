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

  const loading = ref(true)
  const isInitializing = ref(false)
  const fieldsSource = ref<'tournament' | 'league' | null>(null)
  const fields = ref<FieldOption[]>([])
  const locations = ref<LocationOption[]>([])

  const onLeaving = () => {
    showReScheduleDialog.value = false
    fields.value = []
    locations.value = []
    fieldsSource.value = null
  }

  const fetchLocations = async () => {
    try {
      const data = await getLeagueLocations()
      locations.value = (data ?? []).map((location: any) => ({
        id: location.id,
        name: location.name,
      }))
    } catch (error) {
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

      if (matchingField) {
        gameDetailsRequest.value.field_id = matchingField.id
      } else {
        gameDetailsRequest.value.field_id = fields.value[0].id
      }

      const selectedField = fields.value.find((field) => field.id === gameDetailsRequest.value.field_id)
      if (selectedField?.location?.id) {
        gameDetailsRequest.value.location_id = selectedField.location.id
      }

      return true
    } catch (error) {
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
    if (gameDetailsRequest.value.game_id && gameDetailsRequest.value.field_id && gameDetailsRequest.value.date) {
      loading.value = true
      try {
        await gameStore.getGameDetails()
      } catch (error) {
        toast({
          type: 'error',
          msg: 'Error al obtener el partido',
          description: 'Hubo un problema al recuperar la información del partido. Intenta nuevamente.',
        })
      } finally {
        loading.value = false
      }
    } else if (game.value) {
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
        loading.value = false
        return
      }

      isInitializing.value = true
      loading.value = true
      gameDetailsRequest.value.selected_time = null

      await fetchLocations()

      const initialLocationId =
        gameDetailsRequest.value.location_id ?? game.value?.details?.location?.id ?? locations.value[0]?.id ?? null

      if (initialLocationId !== null) {
        gameDetailsRequest.value.location_id = initialLocationId
      }

      let hasFields = false
      try {
        hasFields = await fetchFields(gameDetailsRequest.value.location_id ?? null, {
          preserveSelection: true,
        })
        if (hasFields) {
          await fetchMatch()
        } else {
          loading.value = false
        }
      } finally {
        isInitializing.value = false
        if (!hasFields && loading.value) {
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
    const hasFields = await fetchFields(locationId ?? null, { preserveSelection: false })
    if (hasFields) {
      await fetchMatch()
    } else if (game.value) {
      game.value.options = []
    }
  }

  const fetchFieldAvailabilities = async (by: string, value: string | number | Date) => {
    if (!value) {
      return
    }

    if (by === 'by-date' && dayjs(value).isValid()) {
      gameDetailsRequest.value.date = value as string
      gameDetailsRequest.value.selected_time = null
    }

    if (by === 'by-field_id') {
      gameDetailsRequest.value.field_id = value as number
      gameDetailsRequest.value.selected_time = null
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
    :loading="loading"
    title="Reprogramar partido"
    subtitle="Modificá la fecha, hora o campo de juego para este partido. <br />
    Los cambios se aplicarán manteniendo la jornada original."
    :model-value="showReScheduleDialog"
    @leaving="onLeaving"
    icon-name="uil:schedule"
    min-height="910"
    max-height="910"
  >
    <template #v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <label class="text-subtitle-2">Programado:</label>
            <p class="font-weight-bold">
              {{ game?.details?.date }}
              {{ game?.details?.raw_time }}
            </p>
          </v-col>
          <v-col cols="12">
            <div class="d-flex align-center">
              <v-card class="flex-grow-1" variant="text" border="sm" rounded="lg" width="50%">
                <v-card-text>
                  <div class="team flex-grow-1 team_local d-flex flex-column align-center">
                    <v-avatar :image="game?.home?.image" size="24" class="image" />
                    <span class="team team_home mx-2">{{ game?.home?.name }}</span>
                  </div>
                </v-card-text>
              </v-card>
              <div class="d-flex flex-column align-center justify-center">
                <p>vs</p>
              </div>
              <v-card class="flex-grow-1 futzo-rounded" variant="text" border="sm" rounded="lg" width="50%">
                <v-card-text>
                  <div class="team team_away d-flex flex-column align-center">
                    <v-avatar :image="game?.away?.image" size="24" class="image" />
                    <span class="team team_home mx-2">
                      {{ game?.away?.name }}
                    </span>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12" md="4" lg="4">
            <label class="text-subtitle-2">Fecha</label>
            <BaseCalendarInput
              v-model:start_date="gameDetailsRequest.date"
              :multiCalendar="false"
              :min-date="false"
              @update:start_date="(value) => fetchFieldAvailabilities('by-date', value as Date)"
            />
          </v-col>
          <v-col cols="12" md="4" lg="4">
            <label class="text-subtitle-2">Sede</label>
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
          <v-col cols="12" md="4" lg="4">
            <label class="text-subtitle-2">Campo</label>
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
          <v-col cols="12" v-if="fieldsSource === 'league'">
            <v-alert type="info" variant="tonal" density="compact" border="start">
              Utilizando campos de la liga (sin campos del torneo).
            </v-alert>
          </v-col>
          <v-col cols="12" v-if="fields.length === 0">
            <v-alert type="warning" variant="tonal" density="compact" border="start">
              Sin campos disponibles en esta sede.
            </v-alert>
          </v-col>
          <v-col cols="12" md="8" lg="8" v-else-if="availableIntervalHours.length">
            <label class="text-subtitle-2">Horas disponibles</label>
            <v-chip-group v-model="gameDetailsRequest.selected_time" column>
              <v-chip
                base-color="primary"
                filter
                v-for="hour in availableIntervalHours"
                :value="hour"
                :key="hour.start"
              >
                {{ hour.start }} - {{ hour.end }}
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col cols="12" v-else>
            <v-empty-state
              size="120"
              headline="No hay horas disponibles"
              title="No hay horas disponibles para la fecha seleccionada"
              text="Por favor, selecciona otra fecha o campo."
              image="/futzo/logos/circular/logo-22.png"
            ></v-empty-state>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #actions>
      <v-btn class="ml-auto mr-4" variant="elevated" :disabled="!canReschedule" @click="handleReschedule">
        Reprogramar
      </v-btn>
    </template>
  </Dialog>
</template>

<style scoped>
  label {
    display: block;
    margin-bottom: 4px;
  }
</style>
