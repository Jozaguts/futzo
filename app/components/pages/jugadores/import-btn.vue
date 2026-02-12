<script lang="ts" setup>
  const { importModal } = storeToRefs(usePlayerStore())
</script>
<template>
  <SecondaryBtn text="Importar Jugadores" class="mr-4" @btn-click="importModal = !importModal" icon="lucide:import" icon-position="right"/>
</template>
