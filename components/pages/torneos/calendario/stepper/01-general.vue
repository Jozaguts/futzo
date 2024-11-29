<script lang="ts" setup>
import useSchemas from "~/composables/useSchemas";
import Calendar from "~/components/pages/torneos/calendar.vue";
import type { ScheduleAvailable } from "~/models/tournament";
import AddLocationDialog from "~/components/pages/torneos/calendario/add-location.vue";
import { useLocationStore } from "~/store";

const { handleSubmit, resetForm, fields, validate, setValues } =
  useSchemas("create-calendar");
const { locationDialog } = storeToRefs(useLocationStore());

defineExpose({
  validate,
  handleSubmit,
});
/*
*


schedules_available
venues
*
* */
const setDates = (dates: string[]) => {
  fields.start_date.fieldValue = dates[0];
  fields.end_date.fieldValue = dates[1];
};
const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const schedules_available = ref<ScheduleAvailable[]>([
  {
    day: "monday",
    label: "Lunes",
    hours: {
      from: {
        hours,
        minutes,
      },
      to: {
        hours,
        minutes,
      },
    },
  },
  {
    day: "tuesday",
    label: "Martes",
    hours: {
      from: {
        hours,
        minutes,
      },
      to: {
        hours,
        minutes,
      },
    },
  },
  {
    day: "wednesday",
    label: "Miércoles",
    hours: {
      from: {
        hours,
        minutes,
      },
      to: {
        hours,
        minutes,
      },
    },
  },
  {
    day: "thursday",
    label: "Jueves",
    hours: {
      from: {
        hours,
        minutes,
      },
      to: {
        hours,
        minutes,
      },
    },
  },
  {
    day: "friday",
    label: "Viernes",
    hours: {
      from: {
        hours,
        minutes,
      },
      to: {
        hours,
        minutes,
      },
    },
  },
  {
    day: "saturday",
    label: "Sábado",
    hours: {
      from: {
        hours,
        minutes,
      },
      to: {
        hours,
        minutes,
      },
    },
  },
  {
    day: "sunday",
    label: "Domingo",
    hours: {
      from: {
        hours,
        minutes,
      },
      to: {
        hours,
        minutes,
      },
    },
  },
]);
const tab = ref(1);
</script>
<template>
  <v-container class="container">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Fechas del torneo* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <Calendar
          :multi-calendar="true"
          ref="calendarRef"
          @selected-dates="setDates"
          :position-values="{
            top: -45,
            left: 193,
            transform: 'translate(0)',
          }"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Duración del partido* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
          type="number"
          outlined
          density="compact"
          v-model="fields.game_time.fieldValue"
          :errors="fields.game_time.fieldPropsValue"
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
          outlined
          density="compact"
          v-model="fields.time_between_games.fieldValue"
          :errors="fields.time_between_games.fieldPropsValue"
          min="0"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="text-body-1"> Campos de juego y disponibilidad</span>
      </v-col>
      <v-col cols="9">
        <v-autocomplete multiple search="" :items="[1, 2, 3, 4]">
        </v-autocomplete>
      </v-col>
      <v-col cols="3">
        <PrimaryBtn
          @click="locationDialog = !locationDialog"
          text="Locación"
          icon="futzo-icon:plus"
          variant="outlined"
        ></PrimaryBtn>
        <AddLocationDialog v-model="locationDialog" />
      </v-col>
      <v-col cols="12">
        <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
          <v-tab :value="1">Lun.</v-tab>
          <v-tab :value="2">Mar.</v-tab>
          <v-tab :value="3">Mie.</v-tab>
          <v-tab :value="4">Jue.</v-tab>
          <v-tab :value="5">Vie.</v-tab>
          <v-tab :value="6">Sab.</v-tab>
          <v-tab :value="7">Dom.</v-tab>
        </v-tabs>
      </v-col>
      <v-col>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item v-for="n in 7" :key="n" :value="n">
            <v-container>
              <v-row>
                <v-col
                  >Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Beatae, tempora!
                </v-col>
              </v-row>
            </v-container>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>
    <!--    <v-row>-->
    <!--      <v-col cols="12">-->
    <!--        <span class="text-body-1"> Horarios* </span>-->
    <!--      </v-col>-->
    <!--      <v-col cols="12">-->
    <!--        <v-row v-for="schedule in schedules_available" :key="schedule.day">-->
    <!--          <v-col cols="4" lg="4" md="4">-->
    <!--            <v-switch :label="schedule.label" />-->
    <!--          </v-col>-->
    <!--          <v-col cols="8" align-self="center">-->
    <!--            <time-picker-->
    <!--              v-model:from="schedule.hours.from"-->
    <!--              v-model:to="schedule.hours.to"-->
    <!--            />-->
    <!--          </v-col>-->
    <!--        </v-row>-->
    <!--      </v-col>-->
    <!--    </v-row>-->
  </v-container>
</template>
