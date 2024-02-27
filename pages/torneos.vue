<script lang="ts" setup>
// todo esto queda en pausa hasta tener terminado la generacion de los partiods y equipos
// todo hacer la logica para generar los partidos
import TournamentCard from "~/components/pages/torneos/tournament-card.vue";
import GamesCard from "~/components/pages/torneos/games-card.vue";
import {useTournamentStore} from "~/store";
const tournamentStore = useTournamentStore();
const pending = ref(true);
onMounted(async () => {
  await tournamentStore.loadTournaments();
  pending.value = false
});
let   headers = [
  { title: 'Club', align: 'start', key: 'name' },
  { title: 'PJ', align: 'start', key: 'speed' },
  { title: 'G', align: 'start', key: 'length' },
  { title: 'E', align: 'start', key: 'price' },
  { title: 'P', align: 'start', key: 'year' },
  { title: 'GF', align: 'start', key: 'year' },
  { title: 'GC', align: 'start', key: 'year' },
  { title: 'DG', align: 'start', key: 'year' },
  { title: 'Pts', align: 'start', key: 'year' },
  { title: 'Últimos 5', align: 'end', key: 'year' },
]
const teams =  [
  {
    name: 'Speedster',
    speed: 35,
    length: 22,
    price: 1,
    year: 32,
  },
  {
    name: 'OceanMaster',
    speed: 25,
    length: 35,
    price: 2,
    year: 11,
  },
  {
    name: 'Voyager',
    speed: 20,
    length: 45,
    price: 3,
    year: 11,
  },
  {
    name: 'WaveRunner',
    speed: 40,
    length: 19,
    price: 4,
    year: 67,
  },
  {
    name: 'SeaBreeze',
    speed: 28,
    length: 31,
    price: 6,
    year: 43,
  },
  {
    name: 'HarborGuard',
    speed: 18,
    length: 50,
    price: 8,
    year: 3,
  },
  {
    name: 'SlickFin',
    speed: 33,
    length: 24,
    price: 5,
    year: 12,
  },
  {
    name: 'StormBreaker',
    speed: 22,
    length: 38,
    price: 0,
    year: 78,
  },
  {
    name: 'WindSail',
    speed: 15,
    length: 55,
    price: 8,
    year: 3,
  },
  {
    name: 'FastTide',
    speed: 37,
    length: 20,
    price: 7,
    year: 22,
  },
]


</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3" lg="3" class="d-flex flex-column justify-space-between">
        <TournamentCard class="mb-5 mb-lg-0 mb-md-0"/>
        <GamesCard />
      </v-col>
      <v-col cols="12" md="6" lg="6">
       <v-card class="pa-0">
         <v-card-item>
           <v-card-title>
             Tabla de posisiones
           </v-card-title>
         </v-card-item>
         <v-card-text>
           <v-data-table-virtual
               :headers="headers"
               :items="teams"
               height="100%"
               item-value="name"
           >
             <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
               <tr>
                 <template v-for="column in columns" :key="column.key">
                   <td>
                     <span class="cursor-pointer" @click="() => toggleSort(column)">{{ column.title }}</span>
                     <template v-if="isSorted(column)">
                       <v-icon :icon="getSortIcon(column)"></v-icon>
                     </template>
                   </td>
                 </template>
               </tr>
             </template>
           </v-data-table-virtual>
         </v-card-text>
       </v-card>
      </v-col>
      <v-col cols="12" md="3" lg="3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, placeat.
      </v-col>
    </v-row>
  </v-container>
</template>
