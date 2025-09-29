<script lang="ts" setup>
  import AppBar from '~/components/layout/AppBar.vue'
  import PageLayout from '~/components/shared/PageLayout.vue'
  import AppBarBtn from '~/components/pages/torneos/torneo/schedule/AppBarBtn.vue'
  import NoCalendar from '~/components/pages/torneos/no-calendar.vue'
  import Schedule from '~/components/pages/torneos/torneo/schedule/index.vue'
  import SearchGame from '~/components/pages/torneos/torneo/schedule/SearchGame.vue'
  import { useDisplay } from 'vuetify'

  definePageMeta({
    middleware: ['check-tournament'],
  })
  onMounted(async () => {
    await useScheduleStore().getTournamentSchedules()
  })
  onBeforeUnmount(() => {
    useScheduleStore().$resetScheduleStore()
  })
  const { mobile } = useDisplay()
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar :extended="mobile">
        <template #buttons>
          <AppBarBtn />
        </template>
        <template #extension>
          <div class="d-flex d-md-none d-lg-none flex-column w-100">
            <SearchGame class="mx-4" />
          </div>
        </template>
      </AppBar>
    </template>
    <template #default>
      <NoCalendar />
      <LazyPagesTorneosCalendarioDialog />
      <Schedule />
    </template>
  </PageLayout>
</template>
