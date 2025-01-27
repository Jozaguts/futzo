<script lang="ts" setup>
import SelectLocation from "~/components/pages/torneos/calendario/SelectLocation.vue";
import {useTournamentStore} from "~/store";

const [parent] = useAutoAnimate();
const {tournament, scheduleSettings, scheduleStoreRequest} = storeToRefs(useTournamentStore());
const formatDate = (date: string): Date => {
  const [year, month, day] = date.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
};
const locationHandler = (value: any) => {
  if (value.length) scheduleStoreRequest.value.general.locations = []
  const locations = value.map((item) => {
    return {
      id: item.id,
      name: item.name
    }
  });
  scheduleStoreRequest.value.general.locations = locations
};

onMounted(async () => {
  scheduleStoreRequest.value.general = {
    ...scheduleStoreRequest.value.general,
    start_date: scheduleStoreRequest.value.general.start_date ?? formatDate(scheduleSettings.value?.start_date),
    game_time: scheduleStoreRequest.value.general.game_time ?? scheduleSettings.value?.game_time,
    time_between_games: scheduleStoreRequest.value.general.time_between_games ?? scheduleSettings.value?.time_between_games,
  }
});
</script>
<template>
  <v-container class="container">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Nombre del torneo </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
            density="compact"
            :value="tournament?.name"
            disabled
            variant="outlined"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1">Formato del torneo </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
            density="compact"
            :value="scheduleSettings?.format?.name"
            disabled
            variant="outlined"
            persistent-hint
            :hint="scheduleSettings?.format?.description"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1">Estilo</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
            density="compact"
            :value="scheduleSettings?.footballType?.name"
            disabled
            variant="outlined"
            persistent-hint
            :hint="scheduleSettings?.footballType?.description"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Fecha de inicio del torneo* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8" ref="parent">

        <BaseCalendarInput
            v-if="scheduleStoreRequest.general.start_date"
            v-model:start_date="scheduleStoreRequest.general.start_date"
            :multiCalendar="false"
        />
        <!--        <div ref="parent">-->
        <!--          <small-->
        <!--              v-if="fields.start_date.fieldPropsValue['error-messages'][0]"-->
        <!--              class="text-red ml-4"-->
        <!--          >{{ fields.start_date.fieldPropsValue["error-messages"][0] }}</small-->
        <!--          >-->
        <!--        </div>-->
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
            v-model="scheduleStoreRequest.general.game_time"
            min="0"
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
            v-model="scheduleStoreRequest.general.time_between_games"
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

        <div ref="parent">
          <small
              v-if="scheduleStoreRequest.general.errors.locations"
              class="text-red ml-4"
          >{{ scheduleStoreRequest.general.errors.locations }}</small
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

