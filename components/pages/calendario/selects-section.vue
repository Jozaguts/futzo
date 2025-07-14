<script lang="ts" setup>
import CustomDaysSelectComponent from "~/components/pages/calendario/custom-days-select-component.vue";
import { storeToRefs } from "pinia";
import { useLeaguesStore } from "~/store/useLeaguesStore";
import { useScheduleStore } from "~/store/useScheduleStore";
import { useAuthStore, useTournamentStore } from "~/store";

const { tournaments } = storeToRefs(useTournamentStore());
const { leagues } = storeToRefs(useLeaguesStore());
const { isSuperAdmin } = storeToRefs(useAuthStore());
const { scheduleParams, schedules, daysToPlay, daysToPlaySelected } =
  storeToRefs(useScheduleStore());
const loadingTournaments = ref(false);
watch(
  () => scheduleParams.value.leagueId,
  async (newValue) => {
    if (newValue) {
      try {
        loadingTournaments.value = true;
        scheduleParams.value.tournamentId = null as number;
        //  todo debe cargar solo las ligas y nada mas
        await useTournamentStore().fetchTournamentsByLeagueId();
      } catch (e) {
        console.error(e);
      } finally {
        scheduleParams.value.tournamentId = null as number;
        loadingTournaments.value = false;
      }
    }
  },
);

onBeforeRouteLeave((to, from, next) => {
  if (to.name !== "calendario") {
    scheduleParams.value.tournamentId = null as number;
  }
  next();
});
watch(
  () => leagues.value,
  async (newValue) => {
    if (!isSuperAdmin.value && newValue.length) {
      scheduleParams.value.leagueId = newValue[0].id;
    }
  },
);
const numberOfColumns = computed(() => {
  return showCustomDaysSelect.value ? 6 : 4;
});
const showCustomDaysSelect = computed(() => {
  return (
    daysToPlaySelected.value?.key === "other" &&
    !!scheduleParams.value.tournamentId
  );
});
</script>
<template>
  <v-row>
    <v-col cols="12" :md="numberOfColumns" :lg="numberOfColumns">
      <v-select
        :disabled="!isSuperAdmin"
        label="Selecciona una liga"
        v-model="scheduleParams.leagueId"
        item-value="id"
        item-title="name"
        variant="outlined"
        :items="leagues"
      >
      </v-select>
    </v-col>
    <v-col cols="12" :md="numberOfColumns" :lg="numberOfColumns">
      <v-select
        v-model="scheduleParams.tournamentId"
        label="Selecciona un torneo"
        item-value="id"
        item-title="name"
        variant="outlined"
        :items="tournaments"
        :loading="loadingTournaments"
        clearable
      >
      </v-select>
    </v-col>
    <v-col cols="12" :md="numberOfColumns" :lg="numberOfColumns" v-auto-animate>
      <v-select
        label="Dias de juego"
        placeholder="Selecciona los dias de juego"
        v-if="scheduleParams.tournamentId"
        v-model="daysToPlaySelected"
        :items="daysToPlay"
        return-object
        item-title="text"
      >
      </v-select>
    </v-col>
    <CustomDaysSelectComponent
      :cols="numberOfColumns"
      :show="showCustomDaysSelect"
    />
  </v-row>
</template>
<!--    solo se muestra si hay jornadas generadas-->
<!--    esto ya no tiene que ir acqui la logica ha cambiado-->
<!--      <v-select-->
<!--          v-if="theAreSchedules"-->
<!--          label="Jornada"-->
<!--          :item-props="itemProps"-->
<!--          item-value="id"-->
<!--          variant="filled"-->
<!--          :items="schedules"-->
<!--          -->
<!--      >-->
<!--      </v-select>-->
<!--    ##################################3-->
