<script lang="ts" setup>
import AddTeam from "~/components/pages/equipos/add-team.vue";
</script>
<template>
  <v-card variant="text">
    <v-card-item>
      <v-card-title>
        <h1 class="text-h3">{{'No hay equipos registrados'}}</h1>
      </v-card-title>
    </v-card-item>
    <v-card-text>
    </v-card-text>
    <v-card-actions class="d-flex justify-center align-center">
      <v-btn
          variant="outlined"
          color="primary"
      >
        Agregar equipo
      </v-btn>
      <AddTeam />
    </v-card-actions>
  </v-card>
</template>
