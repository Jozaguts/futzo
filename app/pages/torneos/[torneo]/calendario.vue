<script lang="ts" setup>
  import AppBar from '~/components/layout/AppBar.vue'
  import PageLayout from '~/components/shared/PageLayout.vue'
  import AppBarBtn from '~/components/pages/torneos/torneo/schedule/AppBarBtn.vue'
  import Schedule from '~/components/pages/torneos/torneo/schedule/index.vue'
  import ScheduleRoundsInfiniteScroll from '~/components/pages/torneos/torneo/schedule/ScheduleRoundsInfiniteScroll.vue'
  import SearchGame from '~/components/pages/torneos/torneo/schedule/SearchGame.vue'
  import { usePublicTournamentSchedule } from '~/composables/usePublicTournamentSchedule'
  import { useDisplay } from 'vuetify'
  import { Icon } from '#components'
  import type { User } from '~/models/User'

  definePageMeta({
    middleware: ['check-tournament'],
  })
  const { hasSchedule, scheduleDrawerOpen } = storeToRefs(useScheduleStore())
  const slug = computed(() => String(useRoute().params?.torneo ?? ''))
  const user = useSanctumUser<User>()
  const isGuest = computed(() => !user.value?.email && !user.value?.phone)
  const {
    rounds: publicRounds,
    loading: publicLoading,
    error: publicError,
    loadMore: loadPublicSchedule,
    reset: resetPublicSchedule,
  } = usePublicTournamentSchedule(slug)
  onMounted(async () => {
    if (isGuest.value) {
      resetPublicSchedule()
      loadPublicSchedule({ done: () => {} })
      return
    }
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
        <template v-if="!isGuest" #buttons>
          <AppBarBtn />
        </template>
        <template v-if="!isGuest" #extension>
          <div class="d-flex d-md-none d-lg-none flex-column w-100">
            <SearchGame class="mx-4" />
          </div>
        </template>
      </AppBar>
    </template>
    <template #default>
      <LazyPagesTorneosCalendarioDialog v-if="!isGuest" />
      <Schedule v-if="!isGuest" />
      <div v-else class="public-schedule">
        <v-alert v-if="publicError" type="error" variant="tonal" class="mb-4">
          {{ publicError }}
        </v-alert>
        <ScheduleRoundsInfiniteScroll
          :rounds="publicRounds"
          :loading="publicLoading"
          :public="true"
          empty-text="No hay jornadas publicadas"
          @load="loadPublicSchedule"
        />
      </div>
    </template>
    <template #fab>
      <v-fab v-if="hasSchedule && !isGuest" color="primary" icon @click="open = !open">
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
