<script lang="ts" setup>
import {useLocationStore} from "~/store";
import LocationCard from "~/components/pages/ubicaciones/LocationCard.vue";

const {locations} = storeToRefs(useLocationStore())
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" lg="3" v-for="location in locations">
        <LocationCard :location="location"/>
      </v-col>
    </v-row>
  </v-container>
</template>
