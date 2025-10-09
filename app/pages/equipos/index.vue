<script lang="ts" setup>
  import AppBar from '~/components/layout/AppBar.vue'
  import AppBarButtons from '~/components/pages/equipos/team-navbar-buttons.vue'
  import NoTeams from '~/components/pages/equipos/NoTeams.vue'
  import CreateTeamDialog from '~/components/pages/equipos/CreateTeamDialog/index.vue'
  import TeamsTable from '~/components/pages/equipos/teams-table.vue'
  import ImportDialog from '~/components/pages/equipos/import-dialog/index.vue'
  import { useDisplay } from 'vuetify'
  import SearchInput from '~/components/pages/equipos/app-bar-search-input.vue'
  import { Icon } from '#components'
  const teamStore = useTeamStore()
  onMounted(() => {
    teamStore.getTeams()
  })
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
  const { mobile } = useDisplay()
  const open = ref(false)
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar :extended="mobile">
        <template #buttons> <AppBarButtons /></template>
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
    <template #fab>
      <v-fab color="primary" icon @click="open = !open">
        <Icon name="futzo-icon:plus" class="mobile-fab" :class="open ? 'opened' : ''" size="24"></Icon>
        <v-speed-dial v-model="open" location="left center" transition="slide-y-reverse-transition" activator="parent">
          <v-btn key="1" color="secondary" icon @click="teamStore.dialog = !teamStore.dialog">
            <Icon name="fluent:people-team-20-regular" size="24"></Icon>
          </v-btn>
        </v-speed-dial>
      </v-fab>
    </template>
  </PageLayout>
</template>
<style scoped>
  .table-wrapper {
    max-height: 100%;
  }
</style>
