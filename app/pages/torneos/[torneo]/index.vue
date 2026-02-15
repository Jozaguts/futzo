<script lang="ts" setup>
import {Icon} from '#components'
import AppBar from '~/components/layout/AppBar.vue'
import StatsTableContainer from '~/components/pages/equipos/live-games.vue'
import CreateTournamentDialog from '~/components/pages/torneos/dialog/index.vue'
import DisciplinePanel from '~/components/pages/torneos/discipline/DisciplinePanel.vue'
import TournamentCalendarTab from '~/components/pages/torneos/torneo/calendar-tab.vue'
import TournamentShareMenu from '~/components/pages/torneos/tournament-share-menu.vue'
import TournamentStandingsTable from '~/components/pages/torneos/tournament-standings-table.vue'
import StatsTable from '~/components/pages/torneos/stats-tables/index.vue'
import KpisMetricsSection from '~/components/shared/kpis-metrics-section.vue'
import PageLayout from '~/components/shared/PageLayout.vue'
import {getTournamentMetrics, getTournamentRegistrationQRCode, getTournamentScheduleQRCode} from '~/http/api/tournament'
import type {TournamentDetailKpis, TournamentKpiMetric, TournamentShareAction} from '~/models/tournament'
import {useDisplay} from 'vuetify'
import {ga4Event} from '~/utils/ga4'

const tournamentStore = useTournamentStore()
  const { standings, tournamentId, tournament } = storeToRefs(tournamentStore)
  const { start, finish } = useLoadingIndicator()
  const { toast } = useToast()
  const route = useRoute()
  const router = useRouter()
  const runtimeConfig = useRuntimeConfig()
  const { mobile } = useDisplay()
  const loading = ref(false)
  const validSectionTabs = ['resumen', 'calendario', 'disciplina'] as const
  type SectionTab = (typeof validSectionTabs)[number]
  const resolveSectionTab = (value: unknown): SectionTab => {
    if (typeof value !== 'string') {
      return 'resumen'
    }
    return (validSectionTabs as readonly string[]).includes(value) ? (value as SectionTab) : 'resumen'
  }
  const tab = ref<SectionTab>(resolveSectionTab(route.query.tab))
  const share = ref({
    title: '',
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
  const publicBaseUrl = computed(() => runtimeConfig.public.baseUrl || useRequestURL().origin)
  const tournamentSlug = computed(() => tournament.value?.slug ?? String(route.params.torneo ?? ''))
  const publicStatusUrl = computed(() => `${publicBaseUrl.value}/torneos/${tournamentSlug.value}/status`)
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
      icon: 'lucide:shirt',
      iconTone: 'green',
      trendValue: tournamentMetrics.value.registeredTeams.current,
      trendLabel: tournamentMetrics.value.registeredTeams.label,
    },
    {
      title: 'Jugadores',
      value: tournamentMetrics.value.registeredPlayers.total,
      icon: 'lucide:users',
      iconTone: 'blue',
      trendValue: tournamentMetrics.value.registeredPlayers.current,
      trendLabel: tournamentMetrics.value.registeredPlayers.label,
    },
    {
      title: 'Partidos',
      value: matchesPlayedValue.value,
      icon: 'lucide:calendar-days',
      iconTone: 'orange',
      trendValue: tournamentMetrics.value.matchesPlayed.current,
      trendLabel: tournamentMetrics.value.matchesPlayed.label,
    },
    {
      title: 'Disciplina',
      value: tournamentMetrics.value.disciplinaryCases.total,
      icon: 'lucide:shield',
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

  const copyTextToClipboard = async (text: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return
    }
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }

  const copyRegistrationLink = async () => {
    if (!tournament.value?.register_link) {
      toast({ type: 'warning', msg: 'No hay enlace de inscripción disponible' })
      return
    }
    try {
      await copyTextToClipboard(tournament.value.register_link)
      toast({ type: 'success', msg: 'Enlace de inscripción copiado' })
    } catch {
      toast({ type: 'error', msg: 'No se pudo copiar el enlace de inscripción' })
    }
  }

  const copyPublicLink = async () => {
    if (!tournamentSlug.value) {
      toast({ type: 'warning', msg: 'No se pudo generar el enlace público' })
      return
    }
    try {
      const url = new URL(publicStatusUrl.value, publicBaseUrl.value)
      if (!url.searchParams.get('source')) {
        url.searchParams.set('source', 'share')
      }
      await copyTextToClipboard(url.toString())
      toast({ type: 'success', msg: 'Enlace público copiado' })
    } catch {
      toast({ type: 'error', msg: 'No se pudo copiar el enlace público' })
    }
  }

  const openRegistrationQr = async () => {
    if (!tournament.value?.id) {
      toast({ type: 'warning', msg: 'No se pudo obtener el ID del torneo' })
      return
    }
    start()
    share.value.hasError = false
    share.value.image = ''
    share.value.isLoading = true
    try {
      const data = await getTournamentRegistrationQRCode(tournament.value.id)
      if (data?.image) {
        share.value.image = data.image
        share.value.title = 'QR de inscripción'
        share.value.showQr = true
        ga4Event('qr_generated', {
          type: 'registration',
          tournament_id: tournament.value.id,
        })
        return
      }
      throw new Error('QR no disponible')
    } catch {
      share.value.hasError = true
      toast({ type: 'error', msg: 'No se pudo generar el QR de inscripción' })
    } finally {
      share.value.isLoading = false
      finish()
    }
  }

  const openPublicQr = async () => {
    if (!tournament.value?.id) {
      toast({ type: 'warning', msg: 'No se pudo obtener el ID del torneo' })
      return
    }
    start()
    share.value.hasError = false
    share.value.image = ''
    share.value.isLoading = true
    try {
      const data = await getTournamentScheduleQRCode(tournament.value.id, 'tournament_status')
      if (data?.image) {
        share.value.image = data.image
        share.value.title = 'QR de página pública'
        share.value.showQr = true
        ga4Event('qr_generated', {
          type: 'public_calendar',
          tournament_id: tournament.value.id,
        })
        return
      }
      throw new Error('QR no disponible')
    } catch {
      share.value.hasError = true
      toast({ type: 'error', msg: 'No se pudo generar el QR de página pública' })
    } finally {
      share.value.isLoading = false
      finish()
    }
  }

  const shareActionHandler = async (action: TournamentShareAction) => {
    switch (action) {
      case 'registration_link':
        await copyRegistrationLink()
        return
      case 'registration_qr':
        await openRegistrationQr()
        return
      case 'public_link':
        await copyPublicLink()
        return
      case 'public_qr':
        await openPublicQr()
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
    tab.value = 'calendario'
  }

  const goToPublic = () => {
    router.push({
      name: 'torneos-torneo-status',
      params: { torneo: route.params.torneo },
    })
  }

  watch(
    () => route.query.tab,
    (queryTab) => {
      const nextTab = resolveSectionTab(queryTab)
      if (tab.value !== nextTab) {
        tab.value = nextTab
      }
    }
  )

  watch(tab, (currentTab) => {
    const tabQuery = currentTab === 'resumen' ? undefined : currentTab
    const currentQueryTab = typeof route.query.tab === 'string' ? route.query.tab : undefined
    if (currentQueryTab === tabQuery) {
      return
    }
    const nextQuery: Record<string, unknown> = { ...route.query }
    if (tabQuery) {
      nextQuery.tab = tabQuery
    } else {
      delete nextQuery.tab
    }
    router.replace({
      query: nextQuery,
    })
  })

  const sections: Array<{ value: SectionTab; label: string }> = [
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
        <section class="tournament-page__top-shell futzo-rounded" data-testid="tournament-page-top-shell">
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
                <TournamentShareMenu
                  label="Compartir"
                  test-id="tournament-header-share"
                  :icon-only="mobile"
                  :loading="share.isLoading"
                  @select="shareActionHandler"
                />
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
                      <Icon name="lucide:eye" size="18" />
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
                      <Icon name="lucide:calendar-days" size="18" />
                    </v-btn>
                  </template>
                </v-tooltip>
              </div>
            </div>
          </header>
          <div class="tournament-page__top-divider" aria-hidden="true"></div>
          <div class="tournament-sections-tabs-shell">
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
          </div>
        </section>
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
                  <TournamentStandingsTable
                    :standings="standings"
                    :loading="loading"
                    wrapper-test-id="tournament-standings-table-wrapper"
                    :rows-per-page="standings?.length || 0"
                  />
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
              <TournamentCalendarTab />
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
      <v-card-title>{{ share.title || 'Compartir torneo' }}</v-card-title>
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
    padding-bottom: 20px

  .tournament-page__top-shell
    display: flex
    flex-direction: column
    gap: 12px
    padding: 14px

  .tournament-page__intro
    display: flex
    flex-direction: column
    gap: 8px

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

  .tournament-page__top-divider
    width: 100%
    height: 1px
    background: #f2f4f7

  .tournament-sections-tabs-shell
    border: 1px solid #eaecf0
    border-radius: 12px
    background: #fff
    padding: 8px

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
    display: flex
    flex-direction: column
    gap: 16px

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
    grid-template-columns: minmax(0, 1fr)
    gap: 16px

  .tournament-stats
    min-height: 520px
    min-width: 0

  .tournament-standings
    min-height: 520px
    min-width: 0

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
      grid-template-columns: minmax(0, 7fr) minmax(0, 3fr)
      align-items: stretch

    .tournament-page__headline
      font-size: 26px

</style>
