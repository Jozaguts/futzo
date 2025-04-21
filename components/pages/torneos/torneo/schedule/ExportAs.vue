<script lang="ts" setup>
</script>
<template>
  <v-select
      class="app-bar-secondary-btn mr-4"
      item-title="text"
      density="compact"
      item-value="value"
      model-value="Exportar como"
      variant="outlined"
      :items="[
      { value: 'creado', text: 'Creado' },
      { value: 'en curso', text: 'En curso' },
      { value: 'completado', text: 'Completado' },
      { value: 'cancelado', text: 'Cancelado' },
    ]"
  >
    <template #selection="{item}"><span class="app-bar-secondary-btn__input_text ">{{ item.title }}</span></template>
  </v-select>
</template>
<style></style>
