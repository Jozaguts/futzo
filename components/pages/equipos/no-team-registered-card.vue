<script lang="ts" setup>
import AddTeam from "~/components/pages/equipos/add-team.vue";
</script>
<template>
  <v-alert
      icon="mdi-info"
      closable
      type="info"
      color="surface"

  >
    <template #title>
      <h1 class="text-body-1">No se encontraron equipos inscritos en tu liga</h1>
    </template>

  </v-alert>

<!--  <v-card variant="text">-->
<!--    <v-card-item>-->
<!--      <v-card-title>-->
<!--        <h1 class="text-h3">{{'No hay equipos inscritos'}}</h1>-->
<!--      </v-card-title>-->
<!--    </v-card-item>-->
<!--    <v-card-text>-->
<!--    </v-card-text>-->
<!--    <v-card-actions class="d-flex justify-center align-center">-->
<!--      <AddTeam />-->
<!--    </v-card-actions>-->
<!--  </v-card>-->
</template>
