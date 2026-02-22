<script lang="ts" setup>
import NoTeamsSvg from '~/components/pages/equipos/noTeamsSvg.vue'

const { dialog, teams } = storeToRefs(useTeamStore())
  const toggleDialog = () => {
    dialog.value = !dialog.value
  }
  const noTeams = computed(() => teams.value?.length === 0)
</script>
<template>
  <v-sheet v-if="noTeams" class="no-teams-v-sheet d-flex justify-center align-center fill-height">
    <div class="d-flex flex-column align-center">
      <h2 class="card-title">No hay equipos aún</h2>
      <NoTeamsSvg class="img-responsive" />
      <p class="card-sub-title">Crea un torneo para verlo aquí.</p>
      <v-btn color="primary" variant="elevated" class="mt-4 text-body-1" @click="toggleDialog"> Crear Equipo </v-btn>
    </div>
  </v-sheet>
</template>
<style>
  .img-responsive {
    width: 100%;
  }
  .no-teams-v-sheet {
    border-radius: 12px;
    border: 1px solid var(--futzo-border);
    background: var(--futzo-surface);
    box-shadow:
      012px 16px -4px rgba(16, 24, 40, 0.08),
      0 4px 6px -2px rgba(16, 24, 40, 0.03);
  }

  .card-title {
    color: #111927;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px;
  }

  .card-sub-title {
    color: #1f2a37;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
</style>
