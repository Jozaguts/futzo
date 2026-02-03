<script setup lang="ts">
import AppBar from '~/components/layout/AppBar.vue'
import AppBarBtn from '~/components/pages/dashboard/app-bar-btn.vue'
import StatsCard from '~/components/pages/dashboard/stats-card.vue'
import LastTeamsTable from '~/components/pages/dashboard/last-teams.vue'
import DashboardNextGames from '~/components/pages/dashboard/dashboard-next-games.vue'
import NoGames from '~/components/shared/empty-states/NoGames.vue'
import {useDisplay} from 'vuetify'
import {useGlobalStore} from '~/stores/useGlobalStore'

const { rail } = storeToRefs(useGlobalStore())
const dashboardStore = useDashboardStore()
const { teamStats, nextGames, tourSteps } = storeToRefs(dashboardStore)
const { registerTourRef, startTour, resetTour, recalculateTour } = dashboardStore
const { setActiveController, clearActiveController } = useTourHub()
const tourController = { registerTourRef, startTour, resetTour, recalculateTour }
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
  watchEffect(() => {
    const route = useRoute()
    const router = useRouter()
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
    }
    setActiveController(tourController)
  })
  onBeforeUnmount(() => {
    clearActiveController(tourController)
  })
  const { mobile } = useDisplay()
  const page = ref(1)
  const nextGamePage = ref(1)
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar :extended="mobile">
        <template #buttons>
          <div class="d-none d-lg-block d-md-block">
            <AppBarBtn />
          </div>
        </template>
        <template #extension>
          <div class="d-block d-lg-none d-md-none" v-if="rail">
            <AppBarBtn />
          </div>
        </template>
      </AppBar>
    </template>
    <template #default>
      <client-only>
        <div class="dashboard-container">
          <div class="dashboard-cards-container" v-if="!$vuetify.display.mobile">
            <div class="card-1">
              <StatsCard
                  title="Equipos totales"
                  :values="teamStats.registeredTeams"
                  :isPositive="teamStats.registeredTeams.current > 0"
              ></StatsCard>
            </div>
            <div class="card-2">
              <StatsCard
                  title="jugadores activos"
                  :values="teamStats.activePlayers"
                  :isPositive="teamStats.activePlayers.current > 0"
              ></StatsCard>
            </div>
            <div class="card-3">
              <StatsCard
                  title="juegos finalizados"
                  :values="teamStats.completedGames"
                  :isPositive="teamStats.completedGames.current > 0"
              ></StatsCard>
            </div>
          </div>
          <v-data-iterator
              class="data-iterator-container"
              v-else
              :items-per-page="1"
              :items="[
            {
              title: 'Equipos totales',
              values: teamStats.registeredTeams,
              isPositive: teamStats.registeredTeams.current > 0,
            },
            {
              title: 'jugadores activos',
              values: teamStats.activePlayers,
              isPositive: teamStats.activePlayers.current > 0,
            },
            {
              title: 'juegos finalizados',
              values: teamStats.completedGames,
              isPositive: teamStats.completedGames.current > 0,
            },
          ]"
              :page="page"
          >
            <template #default="{ items }">
              <template v-for="(item, i) in items" :key="i">
                <StatsCard
                    :title="item.raw.title"
                    :values="item.raw.values"
                    :isPositive="item.raw.isPositive"
                ></StatsCard>
              </template>
            </template>
            <template #footer>
              <v-pagination
                  density="compact"
                  :length="3"
                  v-model="page"
                  variant="text"
                  elevation="5"
                  class="mt-2"
              ></v-pagination>
            </template>
          </v-data-iterator>
          <div class="next-games">
            <div class="next-game-wrapper">
              <div class="dashboard subtitle-container">
                <h2 class="dashboard subtitle">Próximos partidos</h2>
                <v-btn variant="text" to="/torneos">Ver todos</v-btn>
              </div>
              <div v-if="nextGames.length === 0" class="text-center">
                <NoGames />
              </div>
              <v-data-iterator
                  class="data-iterator-container no-border"
                  v-else-if="$vuetify.display.mobile"
                  :items-per-page="1"
                  :items="nextGames"
                  :page="nextGamePage"
              >
                <template #default="{ items }">
                  <template v-for="(item, i) in items" :key="i">
                    <dashboard-next-games :class="[i === 0 ? 'mt-0' : '']" :game="item.raw" />
                  </template>
                </template>
                <template #footer>
                  <v-pagination
                      density="compact"
                      :length="nextGames?.length ?? 0"
                      v-model="nextGamePage"
                      variant="text"
                      total-visible="3"
                      elevation="5"
                      class="mt-2"
                  ></v-pagination>
                </template>
              </v-data-iterator>
              <dashboard-next-games
                  :class="[index === 0 ? 'mt-0' : '']"
                  v-else-if="!$vuetify.display.mobile"
                  v-for="(game, index) in nextGames"
                  :key="game.id"
                  :game="game"
              />
            </div>
          </div>
          <div class="table">
            <div class="table-wrapper">
              <h2 class="dashboard subtitle">Últimos equipos inscritos</h2>
              <LastTeamsTable />
            </div>
          </div>
        </div>
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
