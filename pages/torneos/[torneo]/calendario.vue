<script lang="ts" setup>
  import AppBar from '~/components/layout/AppBar.vue'
  import PageLayout from '~/components/shared/PageLayout.vue'
  import AppBarBtn from '~/components/pages/torneos/torneo/schedule/AppBarBtn.vue'
  import NoCalendar from '~/components/pages/torneos/no-calendar.vue'
  import Schedule from '~/components/pages/torneos/torneo/schedule/index.vue'
  import { useScheduleStore } from '~/store'

  definePageMeta({
    middleware: ['check-tournament'],
  })
  onMounted(async () => {
    await useScheduleStore().getTournamentSchedules()
  })
  onBeforeUnmount(() => {
    useScheduleStore().$resetScheduleStore()
  })
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar>
        <template #buttons>
          <AppBarBtn />
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
