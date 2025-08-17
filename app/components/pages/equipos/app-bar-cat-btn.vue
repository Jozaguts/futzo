<script lang="ts" setup>
  const { dialog } = storeToRefs(useTeamStore())
  const toggleDialog = () => {
    dialog.value = !dialog.value
  }
</script>
<template>
  <PrimaryBtn variant="elevated" text="Crear Equipo" icon="futzo-icon:plus" class="mr-8" @click="toggleDialog" />
</template>
