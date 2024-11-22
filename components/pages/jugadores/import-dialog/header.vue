<script lang="ts" setup>
const emits = defineEmits(["close"]);
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
        <Icon name="futzo-icon:file"></Icon>
      </v-sheet>
    </template>
    <template #title><span class="">Importar XLS</span></template>
    <template #subtitle
      >Importa tu documento .xls/x o descarga la plantilla y arrástralo aquí
      para
    </template>
    <template #append>
      <Icon name="futzo-icon:x-dialog" @click="() => emits('close')" />
    </template>
  </v-card-item>
  <v-divider></v-divider>
</template>
