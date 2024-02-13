<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3" lg="3">

        <LeagueCard />

      </v-col>
      <v-col cols="12" md="6" lg="6">


      </v-col>
      <v-col cols="12" md="3" lg="3">


      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import LeagueCard from "~/components/pages/torneos/league-card.vue";
</script>