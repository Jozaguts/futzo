<script lang="ts" setup>
import {Icon} from '#components'
import AppBar from '~/components/layout/AppBar.vue'
import StatsTableContainer from '~/components/pages/equipos/live-games.vue'
import CreateTournamentDialog from '~/components/pages/torneos/dialog/index.vue'
import DisciplinePanel from '~/components/pages/torneos/discipline/DisciplinePanel.vue'
import StatsTable from '~/components/pages/torneos/stats-tables/index.vue'
import KpisMetricsSection from '~/components/shared/kpis-metrics-section.vue'
import PageLayout from '~/components/shared/PageLayout.vue'
import {getTournamentMetrics, getTournamentRegistrationQRCode} from '~/http/api/tournament'
import type {TournamentDetailKpis, TournamentKpiMetric} from '~/models/tournament'
import {last5Handler} from '~/utils/headers-table'
import {publicTournamentStandingsHeaders} from '~/utils/publicTournamentStandingsHeaders'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

const tournamentStore = useTournamentStore()
  const { standings, tournamentId, tournament } = storeToRefs(tournamentStore)
  const { start, finish } = useLoadingIndicator()
  const { toast } = useToast()
  const route = useRoute()
  const router = useRouter()
  const loading = ref(false)
  const tab = ref('resumen')
  const share = ref({
    image: '',
    isLoading: false,
    hasError: false,
    showQr: false,
  })

  const tournamentName = computed(() => tournament.value?.name ?? '')
  const tournamentMeta = computed(() => {
    const format = tournament.value?.format_label || tournament.value?.format?.name
    const type = tournament.value?.football_type_label || tournament.value?.football_type?.name
    const location = tournament.value?.location?.name
    return [format, type, location].filter((value) => Boolean(value)).join(' · ')
  })
  const statusLabel = computed(() => {
    switch (tournament.value?.status) {
      case 'creado':
        return { text: 'Próximo', color: 'warning' }
      case 'en curso':
        return { text: 'Activo', color: 'success' }
      case 'completado':
        return { text: 'Finalizado', color: 'grey-lighten-1' }
      case 'cancelado':
        return { text: 'Cancelado', color: 'error' }
      default:
        return { text: '-', color: 'grey-lighten-1' }
    }
  })

  const gamesProgressPercent = computed(() => {
    if (typeof tournament.value?.games_progress?.percent === 'number') {
      return tournament.value.games_progress.percent
    }
    return tournament.value?.progress?.percent ?? 0
  })
  const createZeroMetric = () => ({
    total: 0,
    current: 0,
    dailyData: [] as number[],
    label: 'vs último mes',
  })
  const createDefaultMetrics = (): TournamentDetailKpis => ({
    registeredTeams: createZeroMetric(),
    registeredPlayers: createZeroMetric(),
    matchesPlayed: {
      ...createZeroMetric(),
      targetTotal: 0,
    },
    disciplinaryCases: createZeroMetric(),
  })

  const normalizeMetric = (metric?: Partial<TournamentKpiMetric>) => ({
    total: Number(metric?.total ?? 0),
    current: Number(metric?.current ?? 0),
    dailyData: Array.isArray(metric?.dailyData) ? metric.dailyData.map((value) => Number(value ?? 0)) : [],
    label: metric?.label || 'vs último mes',
  })

  const normalizeTournamentMetrics = (metrics?: Partial<TournamentDetailKpis>): TournamentDetailKpis => ({
    registeredTeams: normalizeMetric(metrics?.registeredTeams),
    registeredPlayers: normalizeMetric(metrics?.registeredPlayers),
    matchesPlayed: {
      ...normalizeMetric(metrics?.matchesPlayed),
      targetTotal: Number(metrics?.matchesPlayed?.targetTotal ?? 0),
    },
    disciplinaryCases: normalizeMetric(metrics?.disciplinaryCases),
  })

  const tournamentMetrics = ref<TournamentDetailKpis>(createDefaultMetrics())

  const matchesPlayedValue = computed(() => {
    const played = tournamentMetrics.value.matchesPlayed.total ?? 0
    const total = tournamentMetrics.value.matchesPlayed.targetTotal ?? 0
    return `${played}/${total}`
  })
  const progressStart = computed(() => tournament.value?.start_date_to_string ?? '')
  const progressEnd = computed(() => tournament.value?.end_date_to_string ?? '')
  const currentTournamentId = computed(() => tournament.value?.id ?? tournamentId.value ?? null)
  const tournamentKpiItems = computed(() => [
    {
      title: 'Equipos',
      value: tournamentMetrics.value.registeredTeams.total,
      icon: 'futzo-icon:shirt-sharp',
      iconTone: 'green',
      trendValue: tournamentMetrics.value.registeredTeams.current,
      trendLabel: tournamentMetrics.value.registeredTeams.label,
    },
    {
      title: 'Jugadores',
      value: tournamentMetrics.value.registeredPlayers.total,
      icon: 'futzo-icon:players',
      iconTone: 'blue',
      trendValue: tournamentMetrics.value.registeredPlayers.current,
      trendLabel: tournamentMetrics.value.registeredPlayers.label,
    },
    {
      title: 'Partidos',
      value: matchesPlayedValue.value,
      icon: 'futzo-icon:calendar',
      iconTone: 'orange',
      trendValue: tournamentMetrics.value.matchesPlayed.current,
      trendLabel: tournamentMetrics.value.matchesPlayed.label,
    },
    {
      title: 'Disciplina',
      value: tournamentMetrics.value.disciplinaryCases.total,
      icon: 'mdi-shield-outline',
      iconTone: 'red',
      trendValue: tournamentMetrics.value.disciplinaryCases.current,
      trendLabel: tournamentMetrics.value.disciplinaryCases.label,
    },
  ])

  const loadTournamentMetrics = async (id: number) => {
    try {
      const response = await getTournamentMetrics(id, 'lastMonth')
      tournamentMetrics.value = normalizeTournamentMetrics(response?.data)
    } catch {
      tournamentMetrics.value = createDefaultMetrics()
      toast({
        type: 'error',
        msg: 'No se pudieron cargar las métricas del torneo',
      })
    }
  }

  onMounted(() => {
    if (tournamentId.value) {
      loading.value = true
      void Promise.all([tournamentStore.getStandings(), loadTournamentMetrics(tournamentId.value)]).finally(() => {
        loading.value = false
      })
      return
    }

    loading.value = true
    void tournamentStore
      .getTournamentBySlug(route?.params?.torneo as string)
      .then(() => {
        return Promise.all([
          tournamentStore.getStandings(),
          tournamentId.value ? loadTournamentMetrics(tournamentId.value) : Promise.resolve(),
        ])
      })
      .finally(() => {
        loading.value = false
      })
  })

  const copyRegisterLink = async () => {
    if (!tournament.value?.register_link) {
      toast({ type: 'warning', msg: 'No hay enlace de inscripción disponible' })
      return
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(tournament.value.register_link)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = tournament.value.register_link
        textArea.style.position = 'fixed'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }

      toast({ type: 'success', msg: 'Enlace copiado' })
    } catch {
      toast({ type: 'error', msg: 'No se pudo copiar el enlace' })
    }
  }

  const qrCodeHandler = async () => {
    if (!tournament.value?.id) {
      toast({ type: 'warning', msg: 'No se pudo obtener el ID del torneo' })
      return
    }

    start()
    share.value.hasError = false
    share.value.isLoading = true

    try {
      const data = await getTournamentRegistrationQRCode(tournament.value.id)
      share.value.image = data.image
      share.value.showQr = true
    } catch {
      share.value.hasError = true
      toast({ type: 'error', msg: 'No se pudo generar el QR' })
    } finally {
      share.value.isLoading = false
      finish()
    }
  }

  const downloadQR = () => {
    if (!share.value.image) {
      toast({ type: 'warning', msg: 'No hay una imagen QR para descargar' })
      return
    }

    try {
      start({ force: true })
      const anchor = document.createElement('a')
      anchor.href = share.value.image
      anchor.download = 'futzo_qr.png'
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
    } catch {
      toast({ type: 'error', msg: 'No se pudo descargar el QR' })
    } finally {
      finish()
    }
  }

  const goToCalendar = () => {
    router.push({
      name: 'torneos-torneo-calendario',
      params: { torneo: route.params.torneo },
    })
  }

  const goToPublic = () => {
    router.push({
      name: 'torneos-torneo-status',
      params: { torneo: route.params.torneo },
    })
  }

  const sections = [
    { value: 'resumen', label: 'Resumen' },
    { value: 'calendario', label: 'Calendario' },
    { value: 'disciplina', label: 'Disciplina' },
  ]
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar :extended="false" />
    </template>
    <template #default>
      <div class="tournament-page" data-testid="tournament-page-shell">
        <header class="tournament-page__intro" data-testid="tournament-page-intro">
          <div class="tournament-page__header">
            <div class="tournament-page__title">
              <p class="tournament-page__eyebrow">Gestión de torneos</p>
              <div class="title-row">
                <h1 class="tournament-page__headline">{{ tournamentName }}</h1>
                <v-chip size="small" :color="statusLabel.color" variant="tonal">{{ statusLabel.text }}</v-chip>
              </div>
              <p class="tournament-meta">{{ tournamentMeta || 'Control general del torneo, calendario y disciplina.' }}</p>
            </div>
            <div class="tournament-page__actions">
              <v-tooltip text="Copiar enlace de inscripción" location="bottom">
                <template #activator="{ props }">
                  <v-btn
                    icon
                    variant="text"
                    v-bind="props"
                    class="tournament-page__action-btn"
                    aria-label="Copiar enlace de inscripción"
                    @click="copyRegisterLink"
                  >
                    <Icon name="mdi-link" size="18" />
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="Generar QR" location="bottom">
                <template #activator="{ props }">
                  <v-btn
                    icon
                    variant="text"
                    v-bind="props"
                    class="tournament-page__action-btn"
                    aria-label="Generar código QR del torneo"
                    :disabled="share.isLoading"
                    @click="qrCodeHandler"
                  >
                    <Icon name="mdi-qrcode" size="18" />
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="Vista pública" location="bottom">
                <template #activator="{ props }">
                  <v-btn
                    icon
                    variant="text"
                    v-bind="props"
                    class="tournament-page__action-btn"
                    aria-label="Abrir vista pública del torneo"
                    @click="goToPublic"
                  >
                    <Icon name="mdi-eye-outline" size="18" />
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="Calendario" location="bottom">
                <template #activator="{ props }">
                  <v-btn
                    icon
                    variant="text"
                    v-bind="props"
                    class="tournament-page__action-btn"
                    aria-label="Abrir calendario del torneo"
                    @click="goToCalendar"
                  >
                    <Icon name="futzo-icon:calendar" size="18" />
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
          </div>
        </header>
        <div class="tournament-sections-tabs" data-testid="tournament-sections">
          <button
            v-for="section in sections"
            :key="section.value"
            type="button"
            class="tournament-sections-tabs__item"
            :class="{ 'tournament-sections-tabs__item--active': tab === section.value }"
            :aria-pressed="tab === section.value"
            @click="tab = section.value"
          >
            {{ section.label }}
          </button>
        </div>
        <div class="tournament-window">
          <TransitionFade group>
            <template v-if="tab === 'resumen'">
              <KpisMetricsSection class="tournament-kpis" :items="tournamentKpiItems" test-id-prefix="tournament-kpis" />

              <v-card class="tournament-progress-card futzo-rounded">
                <div class="progress-header">
                  <p>Progreso</p>
                  <span>{{ gamesProgressPercent }}%</span>
                </div>
                <v-progress-linear :model-value="gamesProgressPercent" height="6" rounded color="primary" />
                <div class="progress-footer">
                  <span>{{ progressStart }}</span>
                  <span>{{ progressEnd }}</span>
                </div>
              </v-card>

              <div class="tournament-content">
                <div class="tournament-standings">
                  <v-card class="futzo-rounded" height="100%">
                    <v-card-title>Tabla de posiciones</v-card-title>
                    <v-card-text>
                      <client-only>
                        <Vue3EasyDataTable
                          v-if="standings?.length"
                          header-text-direction="center"
                          class="futzo-rounded"
                          body-text-direction="center"
                          :headers="publicTournamentStandingsHeaders"
                          :items="standings"
                          hide-footer
                          :rows-per-page="standings?.length"
                          alternating
                        >
                          <template #item-team.name="values">
                            <div class="d-flex">
                              <span class="mr-2">{{ values.rank }}</span>
                              <span class="d-inline-block text-truncate" style="max-width: 100px">
                                {{ values.team.name }}
                              </span>
                            </div>
                          </template>
                          <template #item-last_5="item">
                            <span v-for="color in last5Handler(item.last_5)" :key="item.id" class="text-lowercase">
                              <v-tooltip :text="color?.label" location="bottom">
                                <template #activator="{ props }">
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
                <div class="tournament-stats">
                  <StatsTableContainer title="Líderes de estadísticas">
                    <template #content>
                      <StatsTable />
                    </template>
                  </StatsTableContainer>
                </div>
              </div>
            </template>

            <template v-else-if="tab === 'calendario'">
              <v-card class="futzo-rounded pa-6">
                <p class="text-body-2 text-medium-emphasis">Abre el calendario para editar o revisar jornadas.</p>
                <v-btn class="mt-4" color="primary" @click="goToCalendar">Ir a calendario</v-btn>
              </v-card>
            </template>

            <template v-else-if="tab === 'disciplina'">
              <div class="tournament-discipline-shell">
                <DisciplinePanel :tournament-id="currentTournamentId" />
              </div>
            </template>
          </TransitionFade>
        </div>
        <CreateTournamentDialog />
      </div>
    </template>
  </PageLayout>

  <v-dialog v-model="share.showQr" max-width="500">
    <v-card>
      <v-card-title>Compartir torneo</v-card-title>
      <v-card-text>
        <v-alert v-if="share.hasError" type="warning" variant="tonal" class="mb-4">
          No se pudo generar el código QR.
        </v-alert>
        <v-img v-if="share.image" :src="share.image" :aspect-ratio="1" cover></v-img>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="share.showQr = false">Cerrar</v-btn>
        <v-btn color="primary" :disabled="!share.image" @click="downloadQR">Descargar QR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style lang="sass" scoped>
  .tournament-page
    display: flex
    flex-direction: column
    gap: 16px

  .tournament-page__intro
    display: flex
    flex-direction: column
    gap: 10px

  .tournament-page__header
    display: flex
    flex-direction: column
    gap: 12px

  .tournament-page__title
    min-width: 0

  .title-row
    display: flex
    align-items: center
    gap: 10px
    flex-wrap: wrap

  .tournament-page__eyebrow
    margin: 0
    font-size: 12px
    font-weight: 600
    letter-spacing: .03em
    text-transform: uppercase
    color: #667085

  .tournament-page__headline
    margin: 0
    font-size: 22px
    line-height: 1.2
    font-weight: 700
    color: #101828

  .tournament-meta
    margin: 4px 0 0
    color: #667085
    font-size: 13px

  .tournament-page__actions
    display: flex
    align-items: center
    flex-wrap: wrap
    gap: 6px
    align-self: flex-start

  .tournament-page__action-btn
    width: 34px
    height: 34px
    min-width: 34px

  .tournament-sections-tabs
    display: grid
    grid-template-columns: repeat(3, minmax(0, 1fr))
    gap: 8px
    padding: 4px
    border-radius: 10px
    background: #f2f4f7

  .tournament-sections-tabs__item
    appearance: none
    border: 0
    background: transparent
    border-radius: 8px
    font-size: 12px
    font-weight: 600
    color: #667085
    padding: 8px 10px
    cursor: pointer
    transition: .18s ease

  .tournament-sections-tabs__item:focus-visible
    outline: 2px solid rgba(41, 112, 255, 0.42)
    outline-offset: 1px

  .tournament-sections-tabs__item--active
    background: #fff
    color: #101828
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.08)

  .tournament-window
    margin-top: 0

  .tournament-kpis
    margin-bottom: 16px

  .tournament-progress-card
    padding: 16px
    margin-bottom: 16px

  .progress-header
    display: flex
    justify-content: space-between
    align-items: center
    font-size: 13px
    color: #475467
    margin-bottom: 8px

  .progress-footer
    display: flex
    justify-content: space-between
    font-size: 12px
    color: #667085
    margin-top: 6px

  .tournament-content
    display: grid
    grid-template-columns: 1fr
    gap: 16px

  .tournament-stats
    min-height: 520px

  .tournament-standings
    min-height: 520px

  .tournament-discipline-shell
    display: flex
    flex-direction: column
    gap: 16px

  @media (min-width: 700px)
    .tournament-page__header
      flex-direction: row
      justify-content: space-between
      align-items: flex-start

    .tournament-page__actions
      align-self: auto

    .tournament-page__headline
      font-size: 24px

  @media (min-width: 900px)
    .tournament-content
      grid-template-columns: 70% 30%
      align-items: stretch

    .tournament-page__headline
      font-size: 26px

</style>
