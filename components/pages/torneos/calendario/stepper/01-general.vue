<script lang="ts" setup>
import useSchemas from "~/composables/useSchemas";
import Calendar from "~/components/pages/torneos/calendar.vue";
import { useTournamentStore } from "~/store";
import type { ScheduleAvailable } from "~/models/tournament";
import AvailableLocations from "~/components/pages/torneos/calendario/available-locations.vue";

const [parent] = useAutoAnimate();
const { handleSubmit, resetForm, fields, validate, setValues } =
  useSchemas("create-calendar");
const { tournamentLocations, selectedLocations } =
  storeToRefs(useTournamentStore());
const calendarRef = ref(null);
const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();

const datesModel = ref<Date[]>([]);
const tab = ref();
const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
};
onMounted(async () => {
  useTournamentStore()
    .settingsSchedule()
    .then((data) => {
      const startDate = formatDate(data.start_date);
      const endDate = formatDate(data.end_date);
      datesModel.value.push(startDate);
      datesModel.value.push(endDate);
      //   schema
      fields.start_date.fieldValue = startDate;
      fields.end_date.fieldValue = endDate;
      fields.game_time.fieldValue = data.game_time;
      fields.time_between_games.fieldValue = data.time_between_games;
      tournamentLocations.value = data.locations;
    });
});
watch(datesModel, (value: Date[]) => {
  if (value) {
    fields.start_date.fieldValue = value[0];
    fields.end_date.fieldValue = value[1];
  } else {
    fields.start_date.fieldValue = null;
    fields.end_date.fieldValue = null;
  }
});
defineExpose({
  validate,
  handleSubmit,
});

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
</script>
<template>
  <v-container class="container">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Fechas del torneo* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <Calendar
          ref="calendarRef"
          v-model:dates="datesModel"
          :multi-calendar="true"
          :position-values="{
            top: -45,
            left: 193,
            transform: 'translate(0)',
          }"
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
          outlined
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
          outlined
          density="compact"
          v-model="fields.time_between_games.fieldValue"
          v-bind="fields.time_between_games.fieldPropsValue"
          min="0"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="text-body-1">
          Selecciona las locaciones para el torneo</span
        >
      </v-col>
      <v-col cols="12">
        <available-locations
          :locations="tournamentLocations"
          v-model:selectedLocations="selectedLocations"
        />
      </v-col>
    </v-row>
    <!--    <v-row v-if="locationSelected.length">-->
    <!--      <v-col cols="12">-->
    <!--        <v-tabs :mandatory="true" v-model="tab" show-arrows ref="parent2">-->
    <!--          <v-tab-->
    <!--            v-for="location in locationSelected"-->
    <!--            :key="location.id"-->
    <!--            :value="location.id"-->
    <!--          >-->
    <!--            {{ location.name }}-->
    <!--          </v-tab>-->
    <!--        </v-tabs>-->
    <!--      </v-col>-->
    <!--      <v-col>-->
    <!--        <transition-expand mode="in-out" :duration="{ enter: 800, leave: 500 }">-->
    <!--          <v-tabs-window v-model="tab">-->
    <!--            <v-tabs-window-item-->
    <!--              v-for="n in locationSelected"-->
    <!--              :key="n.id"-->
    <!--              :value="n.id"-->
    <!--            >-->
    <!--              <v-container>-->
    <!--                <v-row>-->
    <!--                  <v-col cols="12">-->
    <!--                    <span class="text-body-1"> Horarios* </span>-->
    <!--                  </v-col>-->
    <!--                  <v-col cols="12">-->
    <!--                    <v-row-->
    <!--                      v-for="schedule in schedules_available"-->
    <!--                      :key="schedule.day"-->
    <!--                    >-->
    <!--                      <v-col cols="4" lg="4" md="4">-->
    <!--                        <v-switch :label="schedule.label" />-->
    <!--                      </v-col>-->
    <!--                      <v-col cols="8" align-self="center">-->
    <!--                        <TimePicker-->
    <!--                          v-model:from="schedule.hours.from"-->
    <!--                          v-model:to="schedule.hours.to"-->
    <!--                        />-->
    <!--                      </v-col>-->
    <!--                    </v-row>-->
    <!--                  </v-col>-->
    <!--                </v-row>-->
    <!--              </v-container>-->
    <!--            </v-tabs-window-item>-->
    <!--          </v-tabs-window>-->
    <!--        </transition-expand>-->
    <!--      </v-col>-->
    <!--    </v-row>-->
  </v-container>
</template>
