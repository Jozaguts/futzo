<script setup lang="ts">
  import { onMounted } from '#imports'
  import AppBar from '~/components/layout/AppBar.vue'
  import TournamentAppBarButtons from '~/components/pages/torneos/tournament-app-bar-buttons.vue'
  import TournamentTable from '~/components/pages/torneos/tournament-table.vue'
  import NoTournaments from '~/components/pages/torneos/no-tournament.vue'
  import TournamentDialog from '~/components/pages/torneos/dialog/index.vue'
  import { useDisplay } from 'vuetify'
  import SearchInput from '~/components/pages/torneos/app-bar-search-input.vue'
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
  const { mobile } = useDisplay()
  onMounted(() => {
    useTournamentStore().tournamentId = undefined
    useTournamentStore().loadTournaments()
  })
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar :extended="mobile">
        <template #buttons>
          <TournamentAppBarButtons />
        </template>
        <template #extension>
          <div class="d-flex d-md-none d-lg-none flex-column w-100">
            <SearchInput class="mx-4" />
          </div>
        </template>
      </AppBar>
    </template>
    <template #default>
      <NoTournaments />
      <div class="table" style="height: 100%">
        <div class="table-wrapper">
          <TournamentTable />
        </div>
      </div>
      <TournamentDialog />
    </template>
    <template #footer>
      <v-bottom-navigation horizontal bg-color="primary">
        <v-btn @click="useTournamentStore().dialog = !useTournamentStore().dialog">
          <v-icon>mdi-plus</v-icon> Crear torneo</v-btn
        >
      </v-bottom-navigation>
    </template>
  </PageLayout>
</template>
<style scoped>
  .table-wrapper {
    max-height: 100%;
  }
</style>
