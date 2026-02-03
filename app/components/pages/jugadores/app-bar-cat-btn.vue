<script lang="ts" setup>
  const { dialog } = storeToRefs(usePlayerStore())
</script>
<template>
  <PrimaryBtn
    variant="elevated"
    icon="futzo-icon:plus"
    text="Crear Jugador"
    class="mr-8 players-primary-btn"
    @click="dialog = !dialog"
  />
</template>
