<script lang="ts" setup>
import {useTournamentStore} from '~/store'
import SelectLocation from '~/components/pages/torneos/calendario/SelectLocation.vue'
import type {Location} from '~/models/Schedule'
import useSchemas from "~/composables/useSchemas";

const [parent] = useAutoAnimate()
const {setValues, fields, setFieldValue, meta} = useSchemas("calendar-general-step");
const {tournament, scheduleSettings, scheduleStoreRequest} =
    storeToRefs(useTournamentStore())
const formatDate = (date: string): Date | string => {
  const [year, month, day] = date.split('-')
  return new Date(Number(year), Number(month) - 1, Number(day))
}
const locationHandler = (value: Location[]) => {

  const locations = value.map<{
    id: number
    name: string
  }>((item: Location) => ({
    id: item.id,
    name: item.name,
  }))
  setFieldValue('locations', locations)
}
const totalTeams = computed(() => {
  return scheduleSettings.value?.teams
})
onMounted(async () => {
  setValues({
    tournament_id: scheduleStoreRequest.value.general.tournament_id,
    tournament_format_id: scheduleStoreRequest.value.general.tournament_format_id,
    football_type_id: scheduleStoreRequest.value.general.football_type_id,
    start_date: formatDate(scheduleStoreRequest.value.general.start_date as string),
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
            persistent-hint
            :hint="scheduleSettings?.format?.description"
            v-model="fields.tournament_format_id.fieldValue"
            v-bind="fields.tournament_format_id.fieldPropsValue"
        />
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
            persistent-hint
            :hint="scheduleSettings?.footballType.description"
            v-model="fields.football_type_id.fieldValue"
            v-bind="fields.football_type_id.fieldPropsValue"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1 d-block">Total de equipos registrados:</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <p class="text-body-1">
          <v-chip color="primary" readonly variant="outlined">{{ totalTeams }}</v-chip>
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
              v-model:start_date="fields.start_date.fieldValue"
              :multiCalendar="false"
          />
        </client-only>
        <small v-if="fields.start_date.fieldPropsValue['error-messages']" class="text-error text-caption">{{ fields.start_date.fieldPropsValue['error-messages'][0] }}</small>
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
            v-model="fields.time_between_games.fieldValue"
            v-bind="fields.time_between_games.fieldPropsValue"
            min="0"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Ubicaciones* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <SelectLocation @update:model-value="locationHandler"></SelectLocation>
        <div v-auto-animate>
          <small
              v-if="!!fields.locations.fieldPropsValue['error-messages']"
              class="text-red ml-4"
          >{{ fields.locations.fieldPropsValue['error-messages'][0] }}</small>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
