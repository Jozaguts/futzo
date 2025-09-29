<script setup lang="ts">
  import AppBar from '~/components/layout/AppBar.vue'
  import AppBarBtn from '~/components/pages/dashboard/app-bar-btn.vue'
  import StatsCard from '~/components/pages/dashboard/stats-card.vue'
  import LastTeamsTable from '~/components/pages/dashboard/last-teams.vue'
  import DashboardNextGames from '~/components/pages/dashboard/dashboard-next-games.vue'
  import NoGames from '~/components/shared/empty-states/NoGames.vue'
  import { useDisplay } from 'vuetify'

  const { teamStats, nextGames } = storeToRefs(useDashboardStore())
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
  })
  const { mobile } = useDisplay()
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar :extended="mobile">
        <template #buttons>
          <AppBarBtn v-if="!mobile" />
        </template>
        <template #extension>
          <AppBarBtn v-if="mobile" />
        </template>
      </AppBar>
    </template>
    <template #default>
      <div class="dashboard-container">
        <div class="dashboard-cards-container">
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
        <div class="next-games">
          <div class="next-game-wrapper">
            <div class="dashboard subtitle-container">
              <h2 class="dashboard subtitle">Próximos partidos</h2>
              <v-btn variant="text" to="/torneos">Ver todos</v-btn>
            </div>
            <div v-if="nextGames.length === 0" class="text-center">
              <NoGames />
            </div>
            <dashboard-next-games
              :class="[index === 0 ? 'mt-0' : '']"
              v-else
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
    </template>
  </PageLayout>
</template>
<style lang="scss">
  @use '~/assets/scss/pages/dashboard.scss';
</style>
