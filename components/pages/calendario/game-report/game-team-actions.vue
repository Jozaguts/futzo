<script lang="ts" setup>

import InfoHeaderSection from "~/components/pages/calendario/game-report/info-header-section.vue";

const changes = ref([
  {in: 'Juan Pérez', out: 'Carlos Gómez', minute: 45, type: 'Sustitución'},
  {in: 'Andrés Martínez', out: 'Miguel Torres', minute: 60, type: 'Sustitución'},
  {in: 'José Rodríguez', out: 'Luis Fernández', minute: 75, type: 'Sustitución'},
]);
const cards = ref([
  {player: 'Juan Pérez', minute: 30, type: 'Amarilla'},
  {player: 'Carlos Gómez', minute: 70, type: 'Roja directa'},
  {player: 'Andrés Martínez', minute: 80, type: 'Roja por doble Amarilla'},
]);
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <span class="text-subtitle-2 font-weight-bold">Cambios</span>
        <v-list density="compact" mx-height="200">
          <v-list-item v-for="change in changes" :key="change.in">

            <v-list-item-title>{{ change.in }} → {{ change.out }}</v-list-item-title>
            <v-list-item-subtitle>{{ change.minute }}'</v-list-item-subtitle>

            <v-list-item-action>
              <span class="text-caption text-medium-emphasis">{{ change.type }}</span>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="6">
        <span class="text-subtitle-2 font-weight-bold">Tarjetas</span>
        <v-list density="compact" mx-height="200">
          <v-list-item v-for="card in cards" :key="card.player">
            <v-list-item-title>{{ card.player }}</v-list-item-title>
            <v-list-item-subtitle>{{ card.minute }}'</v-list-item-subtitle>
            <v-list-item-action>
              <span class="text-caption text-medium-emphasis">{{ card.type }}</span>
              <div v-if="card.type ==='Amarilla'">
                <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
              </div>
              <div v-else-if="card.type === 'Roja directa'">
                <Icon name="mdi:cards" class="bg-red-lighten-1" size="16"></Icon>
              </div>
              <div v-else-if="card.type === 'Roja por doble Amarilla'">
                <Icon name="mdi:cards" class="bg-red-lighten-1" size="16"></Icon>
              </div>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>