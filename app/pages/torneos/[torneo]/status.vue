<script setup lang="ts">
  import TournamentHeader from '~/components/pages/torneos/status/TournamentHeader.vue'
  import PublicStatsTabs from '~/components/pages/torneos/status/PublicStatsTabs.vue'
  import NextGamesToday from '~/components/pages/equipos/next-games-today.vue'
  import LastGames from '~/components/pages/equipos/equipo/last-games.vue'
  import StatsTableContainer from '~/components/pages/equipos/live-games.vue'
  import { usePublicTournamentStatus } from '~/composables/usePublicTournamentStatus'
  import ScheduleRoundsInfiniteScroll from '~/components/pages/torneos/torneo/schedule/ScheduleRoundsInfiniteScroll.vue'
  import { usePublicTournamentSchedule } from '~/composables/usePublicTournamentSchedule'
  import { publicTournamentStandingsHeaders } from '~/utils/publicTournamentStandingsHeaders'
  import { Icon } from '#components'
  definePageMeta({
    layout: 'blank',
    sanctum: {
      excluded: true,
    },
  })
  const route = useRoute()
  const slug = computed(() => String(route.params.torneo || ''))
  const tab = ref('general')

  const { data, loading, error, load } = usePublicTournamentStatus(slug)
  const {
    rounds: scheduleRounds,
    loading: scheduleLoading,
    error: scheduleError,
    loadMore: loadSchedule,
    reset: resetSchedule,
  } = usePublicTournamentSchedule(slug)
  const hasStandings = computed(() => Boolean(data.value?.standings?.length))
  watch(
    () => slug.value,
    () => {
      load()
      resetSchedule()
    },
    { immediate: true }
  )
  watch(
    () => tab.value,
    (newTab) => {
      if (process.client) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      if (newTab === 'calendario' && scheduleRounds.value.length === 0) {
        loadSchedule({ done: () => {} })
      }
    }
  )
  const last5Handler = (last_5: string) => {
    return last_5.split('').map((value: string) => {
      switch (value) {
        case '-':
          return { icon: 'mdi:checkbox-blank-circle-outline', color: 'gray', label: 'No jugó' }
        case 'W':
          return { icon: 'mdi:checkbox-marked-circle', color: 'green', label: 'Ganó' }
        case 'L':
          return { icon: 'mdi:close-circle', color: 'red', label: 'Perdió' }
        case 'D':
          return { icon: 'ic:outline-remove-circle', color: 'gray', label: 'Empate' }
      }
    })
  }
</script>

<template>
  <PageLayout styles="main pa-4">
    <template #app-bar>
      <v-container class="bg-white pa-0" fluid>
        <v-row>
          <v-col>
            <TournamentHeader v-if="data" :header="data.header" />
            <v-skeleton-loader v-else-if="loading" type="card" />
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #default>
      <v-container fluid class="pa-0">
        <v-card>
          <v-tabs v-model="tab" color="primary">
            <v-tab value="general">Vista General</v-tab>
            <v-tab value="calendario">Calendario</v-tab>
          </v-tabs>
        </v-card>
        <v-window v-model="tab" class="mt-6">
          <v-window-item value="general">
            <div class="t-container">
              <div class="t-table">
                <v-card class="futzo-rounded" height="100%">
                  <v-card-title>Tabla de posiciones</v-card-title>
                  <v-card-text>
                    <client-only>
                      <e-data-table
                        v-if="data && hasStandings"
                        header-text-direction="center"
                        body-text-direction="center"
                        :headers="publicTournamentStandingsHeaders"
                        :items="data.standings"
                        hide-footer
                        :rows-per-page="20"
                        alternating
                      >
                        <template #item-team.name="values">
                          <div class="d-flex">
                            <span class="mr-2">{{ values.rank }}</span>
                            <span>
                              {{ values.team.name }}
                            </span>
                          </div>
                        </template>
                        <template #item-last_5="item">
                          <span v-for="color in last5Handler(item.last_5)" :key="item.id" class="text-lowercase">
                            <v-tooltip :text="color?.label" location="bottom">
                              <template v-slot:activator="{ props }">
                                <Icon
                                  v-bind="props"
                                  :name="color?.icon"
                                  :class="`text-${color?.color}`"
                                  :size="$vuetify.mobile ? 15 : 20"
                                  class="cursor-pointer"
                                />
                              </template>
                            </v-tooltip>
                          </span>
                          {{ values }}
                        </template>
                      </e-data-table>

                      <v-skeleton-loader v-else-if="loading" type="table" class="mb-6" />
                      <v-empty-state
                        v-else
                        title="Tabla de posiciones no disponible"
                        text="La tabla aún no está lista. Vuelve más tarde."
                        image="/junior-soccer.svg"
                      />
                    </client-only>
                  </v-card-text>
                </v-card>
              </div>
              <div class="t-stats">
                <NextGamesToday title="Últimos resultados">
                  <template #content>
                    <LastGames v-if="data" :last-games="data.lastResults" />
                  </template>
                </NextGamesToday>
                <StatsTableContainer title="Líderes de estadísticas" :show-export="false">
                  <template #content>
                    <PublicStatsTabs
                      v-if="data"
                      :goals="data.stats.goals"
                      :assistance="data.stats.assistance"
                      :yellow-cards="data.stats.yellow_cards"
                      :red-cards="data.stats.red_cards"
                    />
                  </template>
                </StatsTableContainer>
              </div>
            </div>
          </v-window-item>
          <v-window-item value="calendario">
            <v-alert v-if="scheduleError" type="warning" variant="tonal" class="mb-4">
              {{ scheduleError }}
            </v-alert>
            <ScheduleRoundsInfiniteScroll
              v-if="tab === 'calendario'"
              :rounds="scheduleRounds"
              :public="true"
              :loading="scheduleLoading"
              @load="loadSchedule"
            />
          </v-window-item>
        </v-window>
      </v-container>
    </template>
    <template #footer>
      <v-footer height="100%">
        <div class="d-flex flex-column flex-md-row flex-lg-row justify-space-between align-items-center w-100 px-4">
          <div class="d-flex order-2 order-md-1 order-lg-1 flex-column my-2 my-md-0 my-lg-0 text-body-2">
            <p>La información mostrada es gestionada directamente por la organización del torneo.</p>
            <div>
              ¿Organizas una liga? Crea tu torneo gratis en <nuxt-link class="text-primary" to="/">Futzo</nuxt-link>
            </div>
          </div>
          <div class="d-flex order-1 order-md-2 order-lg-2 flex-column align-items-end text-body-2">
            <div class="d-flex flex-column align-end mb-2 pr-2">
              <Icon name="futzo-icon:futzo-horizontal" size="60"></Icon>
              <p class="text-caption mt-2">Gestión inteligente de ligas y torneos deportivos.</p>
            </div>
          </div>
        </div>
      </v-footer>
    </template>
  </PageLayout>
</template>
<style scoped>
  .futzo-page-container {
    grid-template-rows: auto;
  }
  .t-container {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto;
    gap: 16px;
    grid-template-areas:
      't-table'
      't-stats';
    align-items: stretch;
  }
  .t-next-games {
    grid-area: t-next-games;
    overflow-y: scroll;
    padding: 16px;
  }
  .t-stats {
    grid-area: t-stats;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .t-table {
    grid-area: t-table;
  }
  .t-table,
  .t-stats {
    min-height: 520px;
  }
  .t-table > .v-card,
  .t-stats > .v-card,
  .t-stats > .next-games-today-table {
    height: 100%;
  }
  @media (width > 600px) {
    .t-container {
      display: grid;
      grid-template-columns: 70% 30%;
      grid-template-rows: auto;
      gap: 16px;
      grid-template-areas:
        't-table t-stats'
        't-table t-stats';
    }
    .t-table,
    .t-stats {
      min-height: 560px;
    }
  }
</style>
