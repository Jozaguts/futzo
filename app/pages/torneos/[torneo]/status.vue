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
  import { getBySlug, getTournamentScheduleQRCode } from '~/http/api/tournament'
  import Vue3EasyDataTable from 'vue3-easy-data-table'
  import 'vue3-easy-data-table/dist/style.css'
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
  const open = ref(false)
  const qr = reactive({
    show: false,
    image: '',
    isLoading: false,
    hasError: false,
  })
  const user = useSanctumUser()
  const isAdmin = computed(() => {
    const roles = user.value?.roles || []
    return roles.some((role) => role.toLowerCase().includes('admin'))
  })
  const { toast } = useToast()
  const runtimeConfig = useRuntimeConfig()
  const publicBaseUrl = computed(() => runtimeConfig.public.baseUrl || useRequestURL().origin)
  const publicStatusUrl = computed(() => `${publicBaseUrl.value}/torneos/${slug.value}/status`)
  const adminTournamentId = ref<number | null>(null)

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
      adminTournamentId.value = null
    },
    { immediate: true }
  )
  watch(
    () => isAdmin.value,
    async (authed) => {
      if (!authed || adminTournamentId.value) return
      try {
        const data = await getBySlug(slug.value)
        adminTournamentId.value = data.id as number
      } catch {
        adminTournamentId.value = null
      }
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

  const copyPublicLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(publicStatusUrl.value)
      } else {
        const ta = document.createElement('textarea')
        ta.value = publicStatusUrl.value
        ta.style.position = 'fixed'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      toast({ type: 'success', msg: 'Enlace copiado' })
    } catch {
      toast({ type: 'error', msg: 'No se pudo copiar el enlace' })
    }
  }

  const qrCodeHandler = async () => {
    if (!adminTournamentId.value) {
      toast({ type: 'warning', msg: 'No se pudo obtener el ID del torneo' })
      return
    }
    qr.hasError = false
    qr.isLoading = true
    try {
      const data = await getTournamentScheduleQRCode(adminTournamentId.value, 'tournament_status')
      qr.image = data.image
      qr.show = true
    } catch {
      qr.hasError = true
      toast({ type: 'error', msg: 'No se pudo generar el QR' })
    } finally {
      qr.isLoading = false
    }
  }

  const downloadQR = () => {
    if (!qr.image) return
    const a = document.createElement('a')
    a.href = qr.image
    a.download = 'futzo_qr.png'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const handleShare = async (value: 'link' | 'qr') => {
    if (value === 'link') {
      await copyPublicLink()
      return
    }
    await qrCodeHandler()
  }
</script>

<template>
  <PageLayout styles="main pa-4">
    <template #app-bar>
      <v-container class="bg-white pa-0" fluid>
        <v-row>
          <v-col>
            <TournamentHeader
              v-if="data"
              :header="data.header"
              :show-share="isAdmin"
              :share-loading="qr.isLoading"
              @share="handleShare"
            />
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
        <v-window v-model="tab" class="mt-4">
          <v-window-item value="general">
            <div class="t-container">
              <div class="t-table">
                <v-card class="futzo-rounded" height="100%">
                  <v-card-title>Tabla de posiciones</v-card-title>
                  <v-card-text>
                    <client-only>
                      <Vue3EasyDataTable
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
                                  :size="16"
                                  class="cursor-pointer"
                                />
                              </template>
                            </v-tooltip>
                          </span>
                        </template>
                      </Vue3EasyDataTable>

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
    <template v-if="isAdmin" #fab>
      <v-fab color="primary" icon @click="open = !open">
        <Icon name="futzo-icon:plus" class="mobile-fab" :class="open ? 'opened' : ''" size="24"></Icon>
        <v-speed-dial v-model="open" location="left center" transition="slide-y-reverse-transition" activator="parent">
          <v-btn key="1" color="secondary" icon :loading="qr.isLoading" @click="qrCodeHandler">
            <v-icon size="16">mdi-qrcode</v-icon>
          </v-btn>
          <v-btn key="2" color="secondary" icon @click="copyPublicLink">
            <v-icon size="16">mdi-link</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-fab>
    </template>
  </PageLayout>
  <v-dialog v-model="qr.show" max-width="500">
    <v-card>
      <v-card-title>Compartir torneo</v-card-title>
      <v-card-text>
        <v-alert v-if="qr.hasError" type="warning" variant="tonal" class="mb-4">
          No se pudo generar el código QR.
        </v-alert>
        <v-img v-if="qr.image" :src="qr.image" :aspect-ratio="1" cover></v-img>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="qr.show = false">Cerrar</v-btn>
        <v-btn color="primary" variant="outlined" :disabled="!qr.image" @click="downloadQR">Descargar QR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
