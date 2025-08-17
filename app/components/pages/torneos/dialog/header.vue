<script lang="ts" setup>
  const { dialog, isEdition } = storeToRefs(useTournamentStore())
  const title = isEdition.value ? 'Editar Torneo' : 'Crear un torneo'
  const subtitle = isEdition.value ? 'Modifica los detalles del torneo.' : 'Completa los detalles del torneo.'
</script>
<template>
  <v-card-item>
    <template #prepend>
      <v-sheet
        border="primary thin"
        class="mx-auto d-flex justify-center align-center mr-2 rounded-lg"
        height="45"
        width="45"
      >
        <Icon name="mdi-light:trophy"></Icon>
      </v-sheet>
    </template>
    <template #title
      ><span class="">{{ title }}</span></template
    >
    <template #subtitle>{{ subtitle }}</template>
    <template #append>
      <Icon name="futzo-icon:x-dialog" class="cursor-pointer" @click="dialog = false" />
    </template>
  </v-card-item>
  <v-divider></v-divider>
</template>
