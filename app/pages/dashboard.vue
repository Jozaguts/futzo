<script setup lang="ts">
import AppBar from '~/components/layout/AppBar.vue'
import DashboardNextGames from '~/components/pages/dashboard/dashboard-next-games.vue'
import ActivityFeed from '~/components/pages/dashboard/activity-feed.vue'
import TournamentDialog from '~/components/pages/torneos/dialog/index.vue'
import CreateTeamDialog from '~/components/pages/equipos/CreateTeamDialog/index.vue'
import JugadoresForm from '~/components/pages/jugadores/form/index.vue'
import NoGames from '~/components/shared/empty-states/NoGames.vue'
import KpisMetricsSection from '~/components/shared/kpis-metrics-section.vue'
import type {Tournament} from '~/models/tournament'

const dashboardStore = useDashboardStore()
const { teamStats, nextGames, activity, tourSteps } = storeToRefs(dashboardStore)
const { registerTourRef, startTour, resetTour, recalculateTour } = dashboardStore
const { setActiveController, clearActiveController } = useTourHub()
const tourController = { registerTourRef, startTour, resetTour, recalculateTour }
const router = useRouter()

const tournamentStore = useTournamentStore()
const teamStore = useTeamStore()
const playerStore = usePlayerStore()
const { tournaments, dialog: tournamentDialog } = storeToRefs(tournamentStore)
const { dialog: teamDialog } = storeToRefs(teamStore)
const { dialog: playerDialog } = storeToRefs(playerStore)

const scheduleDialog = ref(false)
const scheduleLoading = ref(false)
const selectedTournament = ref<Tournament | null>(null)

type ActivityItem = {
  id: number | string
  title: string
  subtitle?: string
  time?: string
  icon?: string
  tone?: 'purple' | 'green' | 'orange' | 'blue'
}

const activityIconMap: Record<string, { icon: string; tone: ActivityItem['tone'] }> = {
  game_result: { icon: 'futzo-icon:calendar', tone: 'orange' },
  tournament_created: { icon: 'futzo-icon:trophy', tone: 'purple' },
  team_registered: { icon: 'futzo-icon:shirt-sharp', tone: 'green' },
  player_registered: { icon: 'futzo-icon:players', tone: 'blue' },
}

const formatActivityTime = (value?: string) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  const diff = Date.now() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  if (seconds < 60) return 'Hace unos segundos'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `Hace ${minutes} minuto${minutes === 1 ? '' : 's'}`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `Hace ${hours} hora${hours === 1 ? '' : 's'}`
  const days = Math.floor(hours / 24)
  if (days < 7) return `Hace ${days} día${days === 1 ? '' : 's'}`
  return date.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })
}

const activityItems = computed<ActivityItem[]>(() =>
  (activity.value ?? []).map((item: any, index: number) => {
    const typeKey = String(item?.type ?? item?.event_type ?? '').toLowerCase()
    const meta = activityIconMap[typeKey]
    return {
      id: item?.id ?? `${typeKey}-${index}`,
      title: item?.title ?? item?.message ?? 'Actividad reciente',
      subtitle: item?.subtitle ?? item?.tournament?.name ?? item?.team?.name ?? '',
      time: item?.time ?? item?.time_label ?? formatActivityTime(item?.created_at),
      icon: meta?.icon,
      tone: meta?.tone,
    }
  })
)

const metrics = computed(() => {
  const { registeredTeams, activePlayers, completedGames, activeTournaments, matchesThisWeek } = teamStats.value
  const tournamentsValue =
    activeTournaments?.total !== undefined && activeTournaments?.total !== null ? activeTournaments.total : '—'
  const matchesValue =
    matchesThisWeek?.total !== undefined && matchesThisWeek?.total !== null ? matchesThisWeek.total : completedGames.total
  return [
    {
      title: 'Torneos Activos',
      value: tournamentsValue,
      trendValue: activeTournaments?.current ?? null,
      trendLabel: activeTournaments?.label ?? '',
      icon: 'futzo-icon:trophy',
      iconTone: 'purple',
    },
    {
      title: 'Equipos Registrados',
      value: registeredTeams.total,
      trendValue: registeredTeams.current,
      trendLabel: registeredTeams.label,
      icon: 'futzo-icon:shirt-sharp',
      iconTone: 'green',
    },
    {
      title: 'Jugadores',
      value: activePlayers.total,
      trendValue: activePlayers.current,
      trendLabel: activePlayers.label,
      icon: 'futzo-icon:players',
      iconTone: 'blue',
    },
    {
      title: 'Partidos Esta Semana',
      value: matchesValue,
      trendValue: matchesThisWeek?.current ?? completedGames.current,
      trendLabel: matchesThisWeek?.label ?? completedGames.label,
      icon: 'futzo-icon:calendar',
      iconTone: 'orange',
    },
  ]
})

definePageMeta({
  middleware: ['sanctum:auth'],
})

watchEffect(() => {
  const route = useRoute()
  if (route.query?.code === 'USER_NOT_VERIFIED') {
    useToast().toast({
      type: 'error',
      msg: 'Correo No Verificado',
      description: 'Tu correo electrónico no ha sido verificado. Por favor, revisa tu bandeja de entrada.',
    })
    router.replace('/')
  }
})

onMounted(() => {
  if (useAuth().isSignUp.value) {
    useDashboardStore().byRange()
    useDashboardStore().getNextGames()
    useDashboardStore().getActivity()
  }
  setActiveController(tourController)
})

onBeforeUnmount(() => {
  clearActiveController(tourController)
})

const openScheduleDialog = async () => {
  scheduleDialog.value = true
  selectedTournament.value = null
  if (!tournaments.value.length) {
    scheduleLoading.value = true
    await tournamentStore.fetchTournamentsByLeagueId()
    scheduleLoading.value = false
  }
}

const goToSchedule = () => {
  if (!selectedTournament.value) {
    return
  }
  scheduleDialog.value = false
  router.push(`/torneos/${selectedTournament.value.slug}/calendario`)
}
</script>
<template>
  <PageLayout styles="main dashboard-main">
    <template #app-bar>
      <AppBar :extended="false" />
    </template>
    <template #default>
      <client-only>
        <div class="dashboard-shell">
          <KpisMetricsSection :items="metrics" test-id-prefix="dashboard-metrics" />
          <div class="dashboard-body">
            <section class="panel panel--next-games" data-testid="dashboard-next-games">
              <div class="panel__header">
                <h2 class="panel__title">Próximos partidos</h2>
                <v-btn variant="text" to="/torneos">Ver todos</v-btn>
              </div>
              <div class="panel__body">
                <div v-if="nextGames.length === 0" class="panel__empty">
                  <NoGames />
                </div>
                <div v-else class="next-games-list">
                  <DashboardNextGames v-for="game in nextGames" :key="game.id" :game="game" />
                </div>
              </div>
            </section>
            <div class="dashboard-side">
              <section class="panel panel--actions" data-testid="dashboard-actions">
                <div class="panel__header">
                  <h2 class="panel__title">Acciones Rápidas</h2>
                </div>
                <div class="panel__body">
                  <div class="actions-grid">
                    <PrimaryBtn
                        text="Nuevo torneo"
                        icon="mdi:trophy-outline"
                        icon-position="right"
                        @click="tournamentDialog = true"

                    >
                    </PrimaryBtn>
                    <SecondaryBtn @click="teamDialog = true" icon="futzo-icon:shirt-sharp" text="Agregar Equipo" icon-position="right" />
                    <SecondaryBtn @click="playerDialog = true" icon="futzo-icon:players" text="Registrar Jugador" icon-position="right" />
                    <SecondaryBtn @click="openScheduleDialog" icon="mdi-warning" text="Aplicar Sanción" icon-position="right" />
                  </div>
                </div>
              </section>
              <section class="panel panel--activity" data-testid="dashboard-activity">
                <div class="panel__header">
                  <h2 class="panel__title">Actividad Reciente</h2>
                </div>
                <div class="panel__body">
                  <ActivityFeed :items="activityItems" />
                </div>
              </section>
            </div>
          </div>
        </div>
        <TournamentDialog />
        <CreateTeamDialog />
        <JugadoresForm />
        <v-dialog v-model="scheduleDialog" max-width="520">
          <v-card>
            <v-card-title>Programar Partido</v-card-title>
            <v-card-text>
              <div class="text-body-2 mb-3">Selecciona el torneo para abrir su calendario.</div>
              <v-select
                v-model="selectedTournament"
                :items="tournaments"
                :loading="scheduleLoading"
                item-title="name"
                item-value="id"
                return-object
                label="Torneo"
                variant="outlined"
              />
              <v-empty-state
                v-if="!scheduleLoading && !tournaments.length"
                image="/no-data.svg"
                size="80"
                title="Sin torneos"
                text="Crea un torneo para programar partidos."
              ></v-empty-state>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn variant="text" @click="scheduleDialog = false">Cancelar</v-btn>
              <v-btn color="primary" :disabled="!selectedTournament" @click="goToSchedule">Ir al calendario</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </client-only>
    </template>
    <template #tour>
      <LazyTour name="dashboard" :steps="tourSteps" @register="registerTourRef" />
    </template>
  </PageLayout>
</template>
<style lang="scss">
  @use '~/assets/scss/pages/dashboard.scss';
</style>
