<script setup lang="ts">
import {useTeamStore} from '~/store/useTeamStore';
import {storeToRefs} from "pinia";

const {importModal} = storeToRefs(useTeamStore())
</script>

<template>
  <SecondaryBtn text="Importar Equipos" class="mr-4" @click="() => importModal = !importModal"></SecondaryBtn>
</template>
