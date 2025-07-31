<script setup lang="ts">
  import { useTournamentStore } from '~/store'
  import { onMounted } from '#imports'
  import AppBar from '~/components/layout/AppBar.vue'
  import TournamentAppBarButtons from '~/components/pages/torneos/tournament-app-bar-buttons.vue'
  import TournamentTable from '~/components/pages/torneos/tournament-table.vue'
  import NoTournaments from '~/components/pages/torneos/no-tournament.vue'
  import TournamentDialog from '~/components/pages/torneos/dialog/index.vue'
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
  onMounted(() => {
    useTournamentStore().tournamentId = undefined
    useTournamentStore().loadTournaments()
  })
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar>
        <template #buttons>
          <TournamentAppBarButtons />
        </template>
      </AppBar>
    </template>
    <template #default>
      <NoTournaments />
      <TournamentTable />
      <TournamentDialog />
    </template>
  </PageLayout>
</template>
