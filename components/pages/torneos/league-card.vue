<template>
  <v-card  rounded elevation="10" width="100%">
    <v-card-item>
      <div class="d-flex justify-end position-relative">
        <tournamentForm ></tournamentForm>
      </div>
      <template #prepend>
        <v-img width="80" height="80" :src="leagueModel.image" ></v-img>
      </template>
      <v-card-title> <span class="d-inline-block text-truncate"  :style="[$vuetify.display.mobile ? 'max-width: 180px': '']">{{leagueModel.name}}</span></v-card-title>
    </v-card-item>
    <v-card-text>
      <v-container fluid class="pa-0">
        <v-row class="py-3">
          <v-col cols="6" class="d-flex justify-start">
           <p class="text-subtitle-2 text-capitalize">equipos</p>
          </v-col>
          <v-col class="d-flex justify-end" cols="6" >
            <p class="text-subtitle-2 text-capitalize">{{leagueModel.teams}}</p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="py-3">
          <v-col cols="6" class="d-flex justify-start">
            <p class="text-subtitle-2 text-capitalize">jugadores</p>
          </v-col>
          <v-col class="d-flex justify-end" cols="6">
            <p class="text-subtitle-2 text-capitalize">{{leagueModel.players}}</p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="py-3">
          <v-col cols="6" class="d-flex justify-start">
            <p class="text-subtitle-2 text-capitalize">partidos jugados</p>
          </v-col>
          <v-col class="d-flex justify-end" cols="6" >
            <p class="text-subtitle-2 text-capitalize">{{leagueModel.matches}}</p>
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
                v-model="selectedLeagueId"
                :length="leagues.length"
                @update:model-value="changeLeague"
            ></v-pagination>
          </v-col>
          <v-col cols="12">
            <tournamentForm ></tournamentForm>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts" setup>
import tournamentForm from '~/components/pages/torneos/form.vue'
const selectedLeagueId = ref(1);
const leagueModel = ref({} );
const leagues = ref([])

const changeLeague = (id: number) => {
  const foundLeague = leagues.value.find(league => league.id === id);
  if (foundLeague) {
    leagueModel.value = { ...foundLeague };
  }
}

const client = useSanctumClient();

const { pending, error} = await useAsyncData('tournaments', async () => {
  leagues.value = await client('/api/v1/admin/tournaments');
  leagueModel.value = leagues.value[0];
});

watch(selectedLeagueId, (newId) => {
  changeLeague(newId);
});

</script>