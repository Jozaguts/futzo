<script lang="ts" setup>
  import AppBar from '~/components/layout/AppBar.vue'
  import AppBarButtons from '~/components/pages/equipos/team-navbar-buttons.vue'
  import NoTeams from '~/components/pages/equipos/NoTeams.vue'
  import CreateTeamDialog from '~/components/pages/equipos/CreateTeamDialog/index.vue'
  import TeamsTable from '~/components/pages/equipos/teams-table.vue'
  import ImportDialog from '~/components/pages/equipos/import-dialog/index.vue'

  const teamStore = useTeamStore()
  onMounted(() => {
    teamStore.getTeams()
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
          <AppBarButtons />
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
  </PageLayout>
</template>
