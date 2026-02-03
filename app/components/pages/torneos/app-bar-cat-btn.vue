<script lang="ts" setup>
  const { dialog } = storeToRefs(useTournamentStore())
</script>
<template>
  <PrimaryBtn variant="elevated" icon="futzo-icon:plus" text="Crear torneo" class="mr-8 tournament-primary-btn" @click="dialog = !dialog" />
</template>
