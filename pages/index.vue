<script setup lang="ts">
  import { useDashboardStore } from '~/store'
  import AppBar from '~/components/layout/AppBar.vue'
  import AppBarBtn from '~/components/pages/dashboard/app-bar-btn.vue'
  import StatsCard from '~/components/pages/dashboard/stats-card.vue'
  import LastTeamsTable from '~/components/pages/dashboard/last-teams.vue'
  import DashboardNextGames from '~/components/pages/dashboard/dashboard-next-games.vue'
  import NoGames from '~/components/shared/empty-states/NoGames.vue'

  const { teamStats, nextGames } = storeToRefs(useDashboardStore())

  watchEffect(() => {
    const route = useRoute()
    const router = useRouter()
    if (route.query?.code === 'USER_NOT_VERIFIED') {
      useToast().toast(
        'error',
        'Correo No Verificado',
        'Tu correo electrónico no ha sido verificado. Por favor, revisa tu bandeja de entrada.'
      )
      router.replace('/')
    }
  })
  onMounted(() => {
    console.log(useAuth().isSignUp.value)
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
      <v-container fluid class="pa-0 mx-0 mt-4 mt-md-0 mt-lg-0">
        <v-row>
          <v-col>
            <StatsCard
              title="Equipos totales"
              :values="teamStats.registeredTeams"
              :isPositive="teamStats.registeredTeams.current > 0"
            ></StatsCard>
          </v-col>
          <v-col>
            <StatsCard
              title="jugadores activos"
              :values="teamStats.activePlayers"
              :isPositive="teamStats.activePlayers.current > 0"
            ></StatsCard>
          </v-col>
          <v-col>
            <StatsCard
              title="juegos finalizados"
              :values="teamStats.completedGames"
              :isPositive="teamStats.completedGames.current > 0"
            ></StatsCard>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h2 class="dashboard subtitle">Últimos equipos inscritos</h2>
          </v-col>
          <v-col cols="12">
            <LastTeamsTable />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="dashboard subtitle-container">
              <h2 class="dashboard subtitle">Próximos partidos</h2>
              <v-btn variant="text" to="/torneos">Ver todos</v-btn>
            </div>
            <div v-if="nextGames.length === 0" class="text-center">
              <NoGames />
            </div>
            <dashboard-next-games v-else v-for="game in nextGames" :key="game.id" :game="game" />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </PageLayout>
</template>
<style lang="scss">
  @use 'assets/scss/pages/dashboard.scss';
</style>
