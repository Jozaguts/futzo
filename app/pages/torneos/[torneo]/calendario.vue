<script lang="ts" setup>
  import AppBar from '~/components/layout/AppBar.vue'
  import PageLayout from '~/components/shared/PageLayout.vue'
  import AppBarBtn from '~/components/pages/torneos/torneo/schedule/AppBarBtn.vue'
  import Schedule from '~/components/pages/torneos/torneo/schedule/index.vue'
  import SearchGame from '~/components/pages/torneos/torneo/schedule/SearchGame.vue'
  import { useDisplay } from 'vuetify'
  import { Icon } from '#components'

  definePageMeta({
    middleware: ['check-tournament'],
  })
  const { hasSchedule, scheduleDrawerOpen } = storeToRefs(useScheduleStore())
  onMounted(async () => {
    await useScheduleStore().getTournamentSchedules()
  })
  onBeforeUnmount(() => {
    useScheduleStore().$resetScheduleStore()
  })
  const { mobile } = useDisplay()
  const open = ref(false)
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
      <LazyPagesTorneosCalendarioDialog />
      <Schedule />
    </template>
    <template #fab>
      <v-fab v-if="hasSchedule" color="primary" icon @click="open = !open">
        <Icon name="futzo-icon:plus" class="mobile-fab" :class="open ? 'opened' : ''" size="24"></Icon>
        <v-speed-dial v-model="open" location="left center" transition="slide-y-reverse-transition" activator="parent">
          <v-btn key="1" color="secondary" icon @click="scheduleDrawerOpen = true">
            <v-icon size="16">mdi-cog</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-fab>
    </template>
  </PageLayout>
</template>
