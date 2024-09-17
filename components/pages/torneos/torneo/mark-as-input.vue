<script lang="ts" setup></script>
<template>
  <v-select
    class="app-bar-secondary-btn mr-4"
    width="170"
    item-title="text"
    density="compact"
    item-value="value"
    model-value="Marcar como"
    variant="outlined"
    :items="[
      { value: 'creado', text: 'Creado' },
      { value: 'en curso', text: 'En curso' },
      { value: 'completado', text: 'Completado' },
      { value: 'cancelado', text: 'Cancelado' },
    ]"
  >
  </v-select>
</template>
<style></style>
