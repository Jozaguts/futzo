<script lang="ts" setup>
  const { dialog, isEdition } = storeToRefs(usePlayerStore())
  const title = isEdition.value ? 'Editar jugadores' : 'Registrar jugador'
  const subtitle = isEdition.value ? 'Modifica los detalles del jugador.' : 'Completa los detalles del jugador.'
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
        <Icon name="futzo-icon:football"></Icon>
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
