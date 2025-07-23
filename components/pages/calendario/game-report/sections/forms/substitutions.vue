<script setup lang="ts">
  import type { TeamLineupAvailablePlayers } from '~/models/Player'
  const { players } = defineProps<{ players: TeamLineupAvailablePlayers[] }>()
  const changes = ref([
    {
      in: null,
      out: null,
      minute: null,
    },
    {
      in: null,
      out: null,
      minute: null,
    },
    {
      in: null,
      out: null,
      minute: null,
    },
  ])
</script>
<template>
  <v-container class="positon-relative" v-auto-animate>
    <v-row v-for="(change, index) in changes" :key="index">
      <v-col cols="12" md="4" lg="4">
        <v-autocomplete
          label="Entra"
          min-width="100%"
          placeholder="Selecciona un jugador"
          return-object
          density="compact"
          item-title="name"
          v-model="change.in"
          :items="players"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <v-autocomplete
          min-width="100%"
          return-object
          label="Sale"
          placeholder="Selecciona un jugador"
          density="compact"
          item-title="name"
          v-model="change.out"
          :items="players"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <div class="d-flex align-center justify-center">
          <v-text-field
            label="Minuto"
            v-model="change.minute"
            placeholder="Minuto"
            type="number"
            step="5"
            min="1"
            density="compact"
            :max="120"
          ></v-text-field>
          <v-btn
            v-if="index === changes.length - 1"
            icon="mdi-plus"
            variant="text"
            density="compact"
            class="ml-2"
            @click="changes.push({ in: null, out: null, minute: null })"
          ></v-btn>
          <v-btn
            v-if="index !== changes.length - 1"
            icon="mdi-minus"
            color="secondary"
            variant="text"
            density="compact"
            class="ml-2"
            @click="changes.splice(index, 1)"
          ></v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
