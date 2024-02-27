<template>
  <div>
    <v-skeleton-loader v-if="!tournaments.length" type="heading,table-row-divider@3"></v-skeleton-loader>
    <v-card v-else rounded elevation="10" width="100%" height="100%">
      <v-card-item>
        <v-card-title>
          <span class="d-inline-block text-truncate text-subtitle-1"  :style="[$vuetify.display.mobile ? 'max-width: 180px': '']">{{props.title}}</span>
        </v-card-title>
        <v-card-subtitle class="text-subtitle-2"><h2 class="text-body-1">{{tournament?.name}} Jornada 1  de 20</h2></v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <v-virtual-scroll
            :height="props.height"
            :items="props.items"
        >
          <template v-slot:default="{ item }">
            <v-card width="100%" height="100%" :ripple="{class: 'circle'}">
              <v-card-text>
                <div class="game-card">
                 <div class="teams">
                   <div class="team home-team">
                     <v-img width="20" height="20" class="team-img" :src="item.home.img"></v-img>
                     <span class="team-name">{{item.home.name}}</span>
                   </div>
                   <div class="team away-team">
                     <v-img width="20" height="20" class="team-img" :src="item.away.img"></v-img>
                     <span class="team-name">{{item.away.name}}</span>
                   </div>
                 </div>
                  <div class="game-result">
                    <span class="text-caption" v-if="item.result">{{item.result}}</span>
                    <div class="text-caption text-center" v-else>
                      <p>{{item.schedule.day}}</p>
                      <span>{{item.schedule.hour}}</span>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </template>
        </v-virtual-scroll>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts" setup>
import {useTournamentStore} from "~/store";
import {storeToRefs} from "pinia";
const tournamentStore = useTournamentStore();
const { tournaments, tournament} = storeToRefs(tournamentStore);
const props = defineProps<{
  items: any[],
  title: String,
  height: {
    type: String | Number | undefined,
    default: '380'
  }
}>();
</script>
<style scoped>
/* Estilo para todos los navegadores */
.v-virtual-scroll::-webkit-scrollbar {
  width: 3px;
}

/* Track */
.v-virtual-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.v-virtual-scroll::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.v-virtual-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.game-card{
  display: grid;
  grid-template-columns: 2fr 1fr;
  border: 1px solid #e0e0e0;
  border-radius: .5rem;
  padding: 1rem;
}
.teams {
  //background: yellow;
  display: flex;
  flex-direction: column;
  align-items: start;
}
.team {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: .3rem 0
}
.game-result{
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  min-width: 3rem;
  border-radius: .5rem;
}
.game-result::before{
  content: '';
  width: 1px;
  height: 100%;
  background: #e0e0e0;
}
.team-img{
  margin-right: .5rem;
}
</style>