<script lang="ts" setup>
import {usePlayerStore} from "~/store";

const {importModal} = storeToRefs(usePlayerStore());
</script>
<template>
  <SecondaryBtn
      text="Importar Jugadores"
      class="mr-4"
      @btn-click="importModal = !importModal"
  />
</template>
