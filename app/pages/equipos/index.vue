<script lang="ts" setup>
  import AppBar from '~/components/layout/AppBar.vue'
  import AppBarButtons from '~/components/pages/equipos/team-navbar-buttons.vue'
  import NoTeams from '~/components/pages/equipos/NoTeams.vue'
  import CreateTeamDialog from '~/components/pages/equipos/CreateTeamDialog/index.vue'
  import TeamsTable from '~/components/pages/equipos/teams-table.vue'
  import ImportDialog from '~/components/pages/equipos/import-dialog/index.vue'
  import { useDisplay } from 'vuetify'
  import SearchInput from '~/components/pages/equipos/app-bar-search-input.vue'
  const teamStore = useTeamStore()
  onMounted(() => {
    teamStore.getTeams()
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
        <template #buttons> </template>
        <template #extension>
          <div class="d-flex d-md-none d-lg-none flex-column w-100">
            <SearchInput class="mx-4" />
          </div>
        </template>
      </AppBar>
    </template>
    <template #default>
      <NoTeams />
      <div class="table" style="height: 100%">
        <div class="table-wrapper">
          <TeamsTable />
        </div>
      </div>
      <CreateTeamDialog />
      <ImportDialog />
    </template>
    <template #footer>
      <v-bottom-navigation horizontal bg-color="primary" class="d-block d-md-none d-lg-none">
        <v-btn @click="teamStore.dialog = !teamStore.dialog">
          <v-icon>mdi-plus</v-icon>
          Crear Equipo</v-btn
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
