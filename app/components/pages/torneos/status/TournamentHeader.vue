<script setup lang="ts">
  import type { PublicTournamentHeader } from '~/models/PublicTournament'

  defineProps<{
    header: PublicTournamentHeader
  }>()
</script>

<template>
  <v-card class="pa-6 futzo-rounded" variant="outlined">
    <div class="d-flex flex-column flex-md-row align-center justify-space-between ga-4">
      <div class="d-flex align-center ga-4">
        <v-avatar size="64" class="header-icon">
          <Icon name="mdi-trophy" size="30" class="text-primary" />
        </v-avatar>
        <div>
          <div class="text-h5 font-weight-bold">{{ header.name }}</div>
          <div class="d-flex align-center ga-2 mt-1">
            <v-chip size="small" variant="tonal" color="primary">{{ header.tournamentName }}</v-chip>
          </div>
        </div>
      </div>
      <div class="d-flex flex-wrap ga-4 text-body-2 text-medium-emphasis">
        <div class="d-flex align-center ga-2">
          <Icon name="mdi-calendar" size="18" />
          <span>Inicio: {{ header.startDate }}</span>
        </div>
        <div class="d-flex align-center ga-2">
          <Icon name="mdi-account-group" size="18" />
          <span>{{ header.teams }} equipos</span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
  .header-icon {
    background: rgba(var(--v-theme-primary), 0.12);
    border: 2px solid rgba(var(--v-theme-primary), 0.35);
  }
</style>
