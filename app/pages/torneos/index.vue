<script setup lang="ts">
  import AppBar from '~/components/layout/AppBar.vue'
  import TournamentAppBarButtons from '~/components/pages/torneos/tournament-app-bar-buttons.vue'
  import TournamentTable from '~/components/pages/torneos/tournament-table.vue'
  import NoTournaments from '~/components/pages/torneos/no-tournament.vue'
  import TournamentDialog from '~/components/pages/torneos/dialog/index.vue'
  import { useDisplay } from 'vuetify'
  import SearchInput from '~/components/pages/torneos/app-bar-search-input.vue'
  import { storeToRefs } from '#imports'
  import { Icon } from '#components'
  const { dialog, tournamentId, noTournaments } = storeToRefs(useTournamentStore())
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
  onMounted(() => {
    tournamentId.value = undefined
    useTournamentStore().loadTournaments()
  })
  const { mobile } = useDisplay()
  const open = ref(false)
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
      <div v-if="!noTournaments" class="table" style="height: 100%">
        <div class="table-wrapper">
          <TournamentTable />
        </div>
      </div>
      <TournamentDialog />
    </template>
    <template #fab>
      <v-fab color="primary" icon @click="open = !open">
        <Icon name="futzo-icon:plus" class="mobile-fab" :class="open ? 'opened' : ''" size="24"></Icon>
        <v-speed-dial v-model="open" location="left center" transition="slide-y-reverse-transition" activator="parent">
          <v-btn key="1" color="secondary" icon @click="dialog = !dialog">
            <v-icon size="16">mdi-trophy</v-icon>
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
