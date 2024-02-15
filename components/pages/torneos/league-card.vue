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
const leagueModel = ref({
  id: 1,
  name: 'English Premier League',
  teams: 18,
  players: 450,
  matches: 102,
  image: 'https://ligasoccer.merku.love/static/media/english_premier.e6ab54e0a7667f2d1287.webp'
})

const leagues = ref([
  {
    id: 1,
    name: 'English Premier League',
    teams: 18,
    players: 450,
    matches: 102,
    image: 'https://ligasoccer.merku.love/static/media/english_premier.e6ab54e0a7667f2d1287.webp'
  },
  {
    id: 2,
    name: 'La Liga',
    teams: 20,
    players: 500,
    matches: 120,
    image: 'https://1000marcas.net/wp-content/uploads/2020/03/Spanish-La-Liga-logo-600x338.png'
  },
  {
    id: 3,
    name: 'Serie A',
    teams: 20,
    players: 500,
    matches: 120,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Serie_A_logo_2022.svg/150px-Serie_A_logo_2022.svg.png'
  },
  {
    id: 4,
    name: 'Bundesliga',
    teams: 18,
    players: 450,
    matches: 102,
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/170px-Bundesliga_logo_%282017%29.svg.png',
  },
  {
    id: 5,
    name: 'Ligue 1',
    teams: 20,
    players: 500,
    matches: 120,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Ligue_1_Uber_Eats_logo.svg/140px-Ligue_1_Uber_Eats_logo.svg.png'
  }
])
const changeLeague = (id: number) => {
  const foundLeague = leagues.value.find(league => league.id === id);
  if (foundLeague) {
    leagueModel.value = { ...foundLeague };
  }
}
watch(selectedLeagueId, (newId) => {
  changeLeague(newId);
});
</script>