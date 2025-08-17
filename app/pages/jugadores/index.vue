<script lang="ts" setup>
  import AppBar from '~/components/layout/AppBar.vue'
  import PlayersNavbarButtons from '~/components/pages/jugadores/players-navbar-buttons.vue'
  import NoPlayers from '~/components/pages/jugadores/no-players.vue'
  import PlayersDialog from '~/components/pages/jugadores/dialog/index.vue'
  import PlayersTable from '~/components/pages/jugadores/players-table.vue'
  import ImportDialog from '@/components/pages/jugadores/import-dialog/index.vue'
  import AssignTeamDialog from '@/components/pages/jugadores/assign-team-dialog.vue'

  onMounted(() => {
    usePlayerStore().getPlayers()
  })
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar>
        <template #buttons>
          <PlayersNavbarButtons />
        </template>
      </AppBar>
    </template>
    <template #default>
      <NoPlayers />
      <PlayersTable />
      <PlayersDialog />
      <ImportDialog />
      <AssignTeamDialog />
    </template>
  </PageLayout>
</template>
