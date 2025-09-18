<script lang="ts" setup>
  import SelectLocation from '@/components/pages/torneos/calendario/SelectLocation.vue'
  import type { FormGeneralScheduleRequest, Location } from '~/models/Schedule'
  import { object, number, array, string, date } from 'yup'
  import { vuetifyConfig } from '~/utils/constants'
  const { tournament } = storeToRefs(useTournamentStore())
  const { scheduleSettings, scheduleStoreRequest, calendarSteps } = storeToRefs(useScheduleStore())
  const { defineField, meta, values } = useForm<FormGeneralScheduleRequest>({
    validationSchema: toTypedSchema(
      object({
        tournament_id: number().required(),
        total_teams: number().required(),
        tournament_format_id: number().required(),
        football_type_id: number().required(),
        start_date: date().required(),
        game_time: number().required(),
        time_between_games: number().required(),
        locations: array()
          .of(
            object().shape({
              id: number().required(),
              name: string().required(),
            })
          )
          .min(1)
          .required(),
      })
    ),
    initialValues: { ...scheduleStoreRequest.value.general, total_teams: scheduleSettings.value.teams },
  })
  const [tournament_id, tournament_id_props] = defineField('tournament_id', vuetifyConfig)
  const [total_teams] = defineField('total_teams', vuetifyConfig)
  const [tournament_format_id, tournament_format_id_props] = defineField('tournament_format_id', vuetifyConfig)
  const [football_type_id, football_type_id_props] = defineField('football_type_id', vuetifyConfig)
  const [start_date, start_date_props] = defineField('start_date', vuetifyConfig)
  const [game_time, game_time_props] = defineField('game_time', vuetifyConfig)
  const [time_between_games, time_between_games_props] = defineField('time_between_games', vuetifyConfig)
  const [locations, locations_props] = defineField('locations', vuetifyConfig)
  const formatDate = (date: string): Date | string => {
    if (!date) return ''
    if (typeof date === 'object') {
      date = dateToString(date)
    }
    const [year, month, day] = date?.split('-')
    return new Date(Number(year), Number(month) - 1, Number(day))
  }
  const locationHandler = (value: Location[]) => {
    if (value) {
      const locations = value.map((location) => ({
        id: location.id,
        name: location.name,
      }))
      scheduleStoreRequest.value.general.locations = locations
    }
  }
  watch(meta, () => {
    calendarSteps.value.steps[calendarSteps.value.current].disable = !meta.value.valid
    if (meta.value.valid && meta.value.touched) {
      scheduleStoreRequest.value.general.tournament_id = values.tournament_id
      scheduleStoreRequest.value.general.total_teams = values.total_teams
      scheduleStoreRequest.value.general.tournament_format_id = values.tournament_format_id
      scheduleStoreRequest.value.general.football_type_id = values.football_type_id
      scheduleStoreRequest.value.general.start_date = formatDate(values.start_date as string)
      scheduleStoreRequest.value.general.game_time = values.game_time
      scheduleStoreRequest.value.general.time_between_games = values.time_between_games
      scheduleStoreRequest.value.general.locations = values.locations?.map((location) => ({
        id: location.id,
        name: location.name,
      }))
    }
  })
</script>
<template>
  <pre>
      {{ scheduleStoreRequest.general }}
    </pre
  >
  <v-container class="container">
    <BaseInput label="Nombre del torneo">
      <template #input>
        <v-select
          density="compact"
          item-value="id"
          item-title="name"
          :items="[tournament]"
          disabled
          variant="outlined"
          v-model="tournament_id"
          v-bind="tournament_id_props"
        />
      </template>
    </BaseInput>
    <BaseInput label="Formato">
      <template #input>
        <v-select
          density="compact"
          item-value="id"
          item-title="name"
          :items="[scheduleSettings.format]"
          disabled
          variant="outlined"
          v-model="tournament_format_id"
          v-bind="tournament_format_id_props"
        />
      </template>
    </BaseInput>
    <BaseInput label="Estilo">
      <template #input>
        <v-select
          density="compact"
          item-value="id"
          item-title="name"
          :items="[scheduleSettings.footballType]"
          disabled
          variant="outlined"
          v-model="football_type_id"
          v-bind="football_type_id_props"
        />
      </template>
    </BaseInput>
    <BaseInput label="Total de equipos registrados">
      <template #input>
        <p class="text-body-1">
          <v-chip :color="total_teams < scheduleSettings.min_teams ? 'error' : 'primary'" readonly variant="outlined">{{
            total_teams
          }}</v-chip>
        </p>
        <p v-if="total_teams < scheduleSettings.min_teams" class="text-caption text-error">
          No hay equipos suficientes para generar el calendario
        </p>
      </template>
    </BaseInput>
    <BaseInput label=" Fecha de inicio del torneo">
      <template #input>
        <BaseCalendarInput v-model:start_date="start_date" :multiCalendar="false" :error-messages="start_date_props" />
      </template>
    </BaseInput>
    <BaseInput label="Duración del partido" type="number" v-model="game_time" :props="{ ...game_time_props, min: 0 }" />
    <BaseInput
      label="Tiempo entre partidos"
      type="number"
      v-model="time_between_games"
      :props="{ ...time_between_games_props, min: 0 }"
    />
    <BaseInput label="Ubicaciónes">
      <template #input>
        <SelectLocation :locations="scheduleSettings.locations" v-model="locations"></SelectLocation>
        <div v-auto-animate>
          <small v-if="!!locations_props['error-messages']" class="text-red ml-4">{{
            locations_props['error-messages'][0]
          }}</small>
        </div>
      </template>
    </BaseInput>
  </v-container>
</template>
