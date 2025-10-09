<script lang="ts" setup>
  import AppBar from '~/components/layout/AppBar.vue'
  import PlayersNavbarButtons from '~/components/pages/jugadores/players-navbar-buttons.vue'
  import NoPlayers from '~/components/pages/jugadores/no-players.vue'
  import PlayersDialog from '~/components/pages/jugadores/dialog/index.vue'
  import PlayersTable from '~/components/pages/jugadores/players-table.vue'
  import ImportDialog from '@/components/pages/jugadores/import-dialog/index.vue'
  import AssignTeamDialog from '@/components/pages/jugadores/assign-team-dialog.vue'
  import SearchInput from '@/components/pages/jugadores/app-bar-search-input.vue'
  import { useDisplay } from 'vuetify'
  onMounted(() => {
    usePlayerStore().getPlayers()
  })
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
  const { mobile } = useDisplay()
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar :extended="mobile">
        <template #buttons>
          <PlayersNavbarButtons />
        </template>
        <template #extension>
          <div class="d-flex d-md-none d-lg-none flex-column w-100">
            <SearchInput class="mx-4" />
          </div>
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
