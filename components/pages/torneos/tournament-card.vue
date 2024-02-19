<template>
  <v-card  rounded elevation="10" width="100%">
    <v-card-item>
      <div class="d-flex justify-end position-relative">
        <tournamentForm ></tournamentForm>
      </div>
      <v-card-title>
        <span class="d-inline-block text-truncate text-subtitle-1"  :style="[$vuetify.display.mobile ? 'max-width: 180px': '']">{{leagueName}}</span>
      </v-card-title>
      <v-card-subtitle class="text-subtitle-2"><h2 class="text-body-1">{{tournament?.name}}</h2></v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-container fluid class="pa-0">
        <v-row class="py-3">
          <v-col cols="6" class="d-flex justify-start">
           <p class="text-subtitle-2 text-capitalize">equipos</p>
          </v-col>
          <v-col class="d-flex justify-end" cols="6" >
            <p class="text-subtitle-2 text-capitalize">{{tournament?.teams}}</p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="py-3">
          <v-col cols="6" class="d-flex justify-start">
            <p class="text-subtitle-2 text-capitalize">jugadores</p>
          </v-col>
          <v-col class="d-flex justify-end" cols="6">
            <p class="text-subtitle-2 text-capitalize">{{tournament?.players}}</p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="py-3">
          <v-col cols="6" class="d-flex justify-start">
            <p class="text-subtitle-2 text-capitalize">partidos jugados</p>
          </v-col>
          <v-col class="d-flex justify-end" cols="6" >
            <p class="text-subtitle-2 text-capitalize">{{tournament?.matches}}</p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-container class="pa-0" fluid>
        <v-row no-gutters>
          <v-col cols="12">
            <v-pagination
                :model-value="page"
                :length="tournaments.length"
                @update:modelValue="changePage"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts" setup>
import tournamentForm from '~/components/pages/torneos/tournament-form.vue'
const page = ref(1);
import {useTournamentStore} from "~/store";
import {storeToRefs} from "pinia";
const tournamentStore = useTournamentStore();
const { tournaments, tournament} = storeToRefs(tournamentStore);
const changePage = (nextPage: number) => {
  if (nextPage > 0 && nextPage <= tournaments.value.length) {
    tournament.value = tournaments.value[nextPage - 1];
    page.value = nextPage;
  }
}
const leagueName = computed(() => {
  return tournament.value?.league ? `Partidos de Liga ${tournament.value?.league}`:'Crea tu primer torneo';
});
watch(page, (newId) => {
  changePage(newId);
});


</script>