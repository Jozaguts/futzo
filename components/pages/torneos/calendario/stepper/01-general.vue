<script lang="ts" setup>
import SelectLocation from "~/components/pages/torneos/calendario/SelectLocation.vue";
import useSchemas from "~/composables/useSchemas";
import {useTournamentStore} from "~/store";

const [parent] = useAutoAnimate();
const {tournament, scheduleSettings} = storeToRefs(useTournamentStore());
const {handleSubmit, resetForm, fields, validate, setValues, meta} =
    useSchemas("create-calendar");
const startDate = ref<Date>();
const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
};
onMounted(async () => {
  startDate.value = formatDate(scheduleSettings.value?.start_date as Date);
  resetForm({
    values: {
      start_date: startDate.value,
      game_time: scheduleSettings.value?.game_time,
      time_between_games: scheduleSettings.value?.time_between_games,
    }
  });

});


defineExpose({
  validate,
  handleSubmit,
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
            :value="scheduleSettings?.format?.name "
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
            v-if="startDate"
            v-model:start_date="startDate"
            :multiCalendar="false"
        />
        <div ref="parent">
          <small
              v-if="fields.start_date.fieldPropsValue['error-messages'][0]"
              class="text-red ml-4"
          >{{ fields.start_date.fieldPropsValue["error-messages"][0] }}</small
          >
        </div>
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
            v-model="fields.game_time.fieldValue"
            v-bind="fields.game_time.fieldPropsValue"
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
        <SelectLocation></SelectLocation>
      </v-col>
    </v-row>

  </v-container>
</template>

