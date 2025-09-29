<script lang="ts" setup>
  const { locationDialog, isEdition } = storeToRefs(useLocationStore())
  const title = isEdition.value
    ? ' Edita una Ubicación y Campos de Juego'
    : ' Registrar una Ubicación y Campos de Juego'
  const subtitle = isEdition.value
    ? 'En cada ubicación puedes añadir uno o más campos, <br />cada uno con su disponibilidad.'
    : 'En cada ubicación puedes registrar uno o más campos <br /> cada uno con su disponibilidad.'
</script>
<template>
  <v-card-item class="custom-card-item">
    <template #prepend>
      <v-sheet
        border="primary thin"
        class="mx-auto d-flex justify-center align-center mr-2 rounded-lg"
        height="48"
        width="48"
      >
        <Icon size="24" name="futzo-icon:marker-pin"></Icon>
      </v-sheet>
    </template>
    <template #title
      ><span class="title-dialog">{{ title }}</span></template
    >
    <template #subtitle>
      <span v-html="subtitle" class="subtitle-dialog" />
    </template>
    <template #append class="test">
      <Icon
        size="24"
        class="cursor-pointer custom-close-icon"
        name="futzo-icon:x-dialog"
        @click="locationDialog = false"
      />
    </template>
  </v-card-item>
  <v-divider></v-divider>
</template>
<style scoped>
  .title-dialog {
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    color: #101828ff;
  }

  .subtitle-dialog {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #475467ff;
  }

  .custom-card-item {
    padding: 16px 24px !important;
  }

  .custom-close-icon {
    position: absolute;
    top: 18px;
    right: 16px;
  }
</style>
