<script lang="ts" setup>
  import { useTournamentStore, useScheduleStore } from '~/store'
  import SelectLocation from '~/components/pages/torneos/calendario/SelectLocation.vue'
  import type { Location } from '~/models/Schedule'
  import useSchemas from '~/composables/useSchemas'

  const [parent] = useAutoAnimate()
  const { setValues, fields, meta, validate } = useSchemas(
    'calendar-general-step'
  )
  const { tournament } = storeToRefs(useTournamentStore())
  const { scheduleSettings, scheduleStoreRequest } =
    storeToRefs(useScheduleStore())
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
      setValues({ locations })
      scheduleStoreRequest.value.general.locations = locations
    }
  }

  onMounted(async () => {
    setValues({
      total_teams: scheduleSettings.value.teams,
      tournament_id: scheduleStoreRequest.value.general.tournament_id,
      tournament_format_id:
        scheduleStoreRequest.value.general.tournament_format_id,
      football_type_id: scheduleStoreRequest.value.general.football_type_id,
      start_date: formatDate(
        scheduleStoreRequest.value.general.start_date as string
      ),
      game_time: scheduleStoreRequest.value.general.game_time,
      time_between_games: scheduleStoreRequest.value.general.time_between_games,
      locations: scheduleStoreRequest.value.general.locations,
    })
  })
  const isValid = computed(() => {
    return meta.value.valid
  })
  defineExpose({
    isValid,
    validate,
  })
</script>

<template>
  <v-container class="container">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Nombre del torneo </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-select
          density="compact"
          item-value="id"
          item-title="name"
          :items="[tournament]"
          return-object
          disabled
          variant="outlined"
          v-model="fields.tournament_id.fieldValue"
          v-bind="fields.tournament_id.fieldPropsValue"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1">Formato del torneo </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-select
          density="compact"
          item-value="id"
          item-title="name"
          :items="[scheduleSettings.format]"
          return-object
          disabled
          variant="outlined"
          v-model="fields.tournament_format_id.fieldValue"
          v-bind="fields.tournament_format_id.fieldPropsValue"
        />
        <p class="ml-2 text-caption text-medium-emphasis">
          {{ scheduleSettings?.format?.description }}
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1">Estilo</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-select
          density="compact"
          item-value="id"
          item-title="name"
          :items="[scheduleSettings.footballType]"
          return-object
          disabled
          variant="outlined"
          v-model="fields.football_type_id.fieldValue"
          v-bind="fields.football_type_id.fieldPropsValue"
        />
        <p class="ml-2 text-caption text-medium-emphasis">
          {{ scheduleSettings?.footballType.description }}
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1 d-block">Total de equipos registrados:</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <p class="text-body-1">
          <v-chip color="primary" readonly variant="outlined">{{
            scheduleSettings.teams
          }}</v-chip>
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Fecha de inicio del torneo* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8" ref="parent">
        <client-only>
          <BaseCalendarInput
            @start_date_updated="
              (value: string | Date) =>
                (scheduleStoreRequest.general.start_date = value)
            "
            v-model:start_date="fields.start_date.fieldValue"
            :multiCalendar="false"
          />
        </client-only>
        <small
          v-if="fields.start_date.fieldPropsValue['error-messages']"
          class="text-error text-caption"
          >{{ fields.start_date.fieldPropsValue['error-messages'][0] }}</small
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Duración del partido* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
          type="number"
          variant="outlined"
          density="compact"
          :min="0"
          @update:modelValue="
            (value) =>
              (scheduleStoreRequest.general.game_time =
                value as unknown as number)
          "
          v-model="fields.game_time.fieldValue"
          v-bind="fields.game_time.fieldPropsValue"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Tiempo entre partidos* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
          type="number"
          variant="outlined"
          density="compact"
          @update:modelValue="
            (value) =>
              (scheduleStoreRequest.general.time_between_games =
                value as unknown as number)
          "
          v-model="fields.time_between_games.fieldValue"
          v-bind="fields.time_between_games.fieldPropsValue"
          min="0"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1">
          Ubicaciones*
          <v-tooltip text="Ubicación de los campos de juego" location="bottom">
            <template v-slot:activator="{ props }">
              <Icon v-bind="props" name="futzo-icon:help-circle" />
            </template>
          </v-tooltip>
        </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <SelectLocation
          :locations="scheduleSettings.locations"
          v-model="fields.locations.fieldValue"
          @update:model-value="locationHandler"
        ></SelectLocation>
        <div v-auto-animate>
          <small
            v-if="!!fields.locations.fieldPropsValue['error-messages']"
            class="text-red ml-4"
            >{{ fields.locations.fieldPropsValue['error-messages'][0] }}</small
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
