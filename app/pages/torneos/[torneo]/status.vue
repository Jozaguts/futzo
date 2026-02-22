<script setup lang="ts">
import TournamentHeader from '~/components/pages/torneos/status/TournamentHeader.vue'
import PublicStatsTabs from '~/components/pages/torneos/status/PublicStatsTabs.vue'
import TournamentStandingsTable from '~/components/pages/torneos/tournament-standings-table.vue'
import NextGamesToday from '~/components/pages/equipos/next-games-today.vue'
import LastGames from '~/components/pages/equipos/equipo/last-games.vue'
import StatsTableContainer from '~/components/pages/equipos/live-games.vue'
import {usePublicTournamentStatus} from '~/composables/usePublicTournamentStatus'
import ScheduleRoundsInfiniteScroll from '~/components/pages/torneos/torneo/schedule/ScheduleRoundsInfiniteScroll.vue'
import {usePublicTournamentSchedule} from '~/composables/usePublicTournamentSchedule'
import {getBySlug, getTournamentScheduleQRCode} from '~/http/api/tournament'
import {useDisplay} from 'vuetify'
import {Icon} from '#components'
import {ga4Event} from '~/utils/ga4'

useHead({
    meta: [{ name: 'robots', content: 'noindex,follow' }]
  })
  definePageMeta({
    layout: 'blank',
    sanctum: {
      excluded: true,
    },
  })
  const route = useRoute()
  const slug = computed(() => String(route.params.torneo || ''))
  const viewSource = computed(() => {
    const raw = String((route.query as any)?.source || '').toLowerCase()
    if (raw === 'qr' || raw === 'share') return raw
    return 'direct'
  })
  const hasTrackedOpen = ref(false)
  const tab = ref<'general' | 'calendario'>('general')
  const open = ref(false)
  const qr = reactive({
    show: false,
    image: '',
    isLoading: false,
    hasError: false,
  })
  const { mobile } = useDisplay()
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
  watch(
    () => slug.value,
    () => {
      load()
      resetSchedule()
      adminTournamentId.value = null
      hasTrackedOpen.value = false
    },
    { immediate: true }
  )
  watch(
    () => [slug.value, isAdmin.value, adminTournamentId.value, viewSource.value] as const,
    ([nextSlug, nextIsAdmin, nextAdminId, nextSource]) => {
      if (!nextSlug || hasTrackedOpen.value) return

      // Admins: wait for adminTournamentId so we can send tournament_id.
      // Public users: track immediately with tournament_slug.
      if (nextIsAdmin && !nextAdminId) return

      hasTrackedOpen.value = true
      ga4Event('public_calendar_opened', {
        tournament_id: nextAdminId ?? null,
        tournament_slug: nextSlug,
        source: nextSource,
      })
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
  const sections: Array<{ value: 'general' | 'calendario'; label: string }> = [
    { value: 'general', label: 'Vista General' },
    { value: 'calendario', label: 'Calendario' },
  ]

  const copyPublicLink = async () => {
    try {
      const url = new URL(publicStatusUrl.value, publicBaseUrl.value)
      if (!url.searchParams.get('source')) {
        url.searchParams.set('source', 'share')
      }
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url.toString())
      } else {
        const ta = document.createElement('textarea')
        ta.value = url.toString()
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
      ga4Event('qr_generated', {
        type: 'public_calendar',
        tournament_id: adminTournamentId.value,
      })
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
      <div class="status-page" data-testid="public-status-page">
        <section class="tournament-sections-tabs-shell">
          <div class="tournament-sections-tabs" data-testid="public-status-tabs">
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
        </section>

        <div class="status-window">
          <TransitionFade group>
            <template v-if="tab === 'general'">
              <div class="t-container">
                <div class="t-table">
                  <TournamentStandingsTable
                    :standings="data?.standings || []"
                    :loading="loading"
                    wrapper-test-id="status-standings-table-wrapper"
                    :rows-per-page="20"
                  />
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
            </template>

            <template v-else-if="tab === 'calendario'">
              <div class="status-calendar">
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
              </div>
            </template>
          </TransitionFade>
        </div>
        <footer class="status-footer futzo-rounded">
          <div class="status-footer__content">
            <div class="status-footer__left">
              <p>La información mostrada es gestionada directamente por la organización del torneo.</p>
              <div>
                ¿Organizas una liga? Crea tu torneo gratis en <nuxt-link class="text-primary" to="/">Futzo</nuxt-link>
              </div>
            </div>
            <div class="status-footer__right">
              <div class="status-footer__brand">
                <Icon name="futzo-icon:futzo-horizontal" size="60"></Icon>
                <p class="text-caption mt-2">Gestión inteligente de ligas y torneos deportivos.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </template>
    <template v-if="isAdmin && mobile" #fab>
      <v-fab color="primary" icon @click="open = !open">
        <v-progress-circular v-if="qr.isLoading" indeterminate size="18" width="2" color="white" />
        <Icon v-else name="futzo-icon:plus" class="mobile-fab" :class="open ? 'opened' : ''" size="24"></Icon>
        <v-speed-dial v-model="open" location="left center" transition="slide-y-reverse-transition" activator="parent">
          <v-btn key="1" color="secondary" icon :disabled="qr.isLoading" @click="qrCodeHandler">
            <v-progress-circular v-if="qr.isLoading" indeterminate size="18" width="2" />
            <v-icon v-else size="16">mdi-qrcode</v-icon>
          </v-btn>
          <v-btn key="2" color="secondary" icon :disabled="qr.isLoading" @click="copyPublicLink">
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

  .status-page {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
    overflow-x: hidden;
    padding-bottom: max(84px, calc(84px + env(safe-area-inset-bottom)));
  }

  .tournament-sections-tabs-shell {
    border: 1px solid var(--futzo-border);
    border-radius: 12px;
    background: var(--futzo-surface);
    padding: 8px;
  }

  .tournament-sections-tabs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    padding: 4px;
    border-radius: 10px;
    background: #f2f4f7;
  }

  .tournament-sections-tabs__item {
    appearance: none;
    border: 0;
    background: transparent;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    color: var(--futzo-on-surface-muted);
    padding: 8px 10px;
    cursor: pointer;
    transition: 0.18s ease;
  }

  .tournament-sections-tabs__item:focus-visible {
    outline: 2px solid rgba(41, 112, 255, 0.42);
    outline-offset: 1px;
  }

  .tournament-sections-tabs__item--active {
    background: var(--futzo-surface);
    color: var(--futzo-on-surface);
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.08);
  }

  .status-window {
    min-width: 0;
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
    min-width: 0;
  }

  .t-next-games {
    grid-area: t-next-games;
    overflow-y: auto;
    padding: 16px;
  }

  .t-stats {
    grid-area: t-stats;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
  }

  .t-table {
    grid-area: t-table;
    min-width: 0;
  }

  .status-calendar {
    min-width: 0;
  }

  .t-table,
  .t-stats {
    min-height: 0;
  }

  .t-table > .v-card,
  .t-stats > .v-card,
  .t-stats > .next-games-today-table {
    height: 100%;
    min-width: 0;
  }

  .status-footer {
    padding: 14px;
  }

  .status-footer__content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .status-footer__left {
    order: 2;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 13px;
    color: var(--futzo-text-muted);
  }

  .status-footer__left p {
    margin: 0;
  }

  .status-footer__right {
    order: 1;
    display: flex;
    justify-content: flex-start;
  }

  .status-footer__brand {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

    .tournament-sections-tabs {
      max-width: 360px;
    }

    .tournament-sections-tabs__item {
      font-size: 13px;
    }

    .t-table,
    .t-stats {
      min-height: 560px;
    }

    .status-footer__content {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .status-footer__left {
      order: 1;
    }

    .status-footer__right {
      order: 2;
      justify-content: flex-end;
    }
  }
</style>
