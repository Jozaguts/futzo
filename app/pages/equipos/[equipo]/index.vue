<script lang="ts" setup>
import AppBar from '~/components/layout/AppBar.vue'
import CreateTeamDialog from '~/components/pages/equipos/CreateTeamDialog/index.vue'
import LinesupContainer from '~/components/pages/calendario/game-report/linesup-container.vue'
import TournamentShareMenu from '~/components/pages/torneos/tournament-share-menu.vue'
import KpisMetricsSection from '~/components/shared/kpis-metrics-section.vue'
import PageLayout from '~/components/shared/PageLayout.vue'
import {getTeamFormation, getTeamRegistrationQRCode} from '~/http/api/team'
import type {TeamFormation} from '~/models/Game'
import type {Team} from '~/models/Team'
import type {TeamLineupAvailablePlayers} from '~/models/Player'
import type {TournamentShareAction} from '~/models/tournament'
import {sortFormation} from '~/utils/sort-formation'
import {Icon} from '#components'
import {useDisplay} from 'vuetify'

definePageMeta({
  middleware: ['sanctum:auth'],
})

const teamStore = useTeamStore()
const playerStore = usePlayerStore()
const route = useRoute()
const router = useRouter()
const { toast } = useToast()
const runtimeConfig = useRuntimeConfig()
const requestUrl = useRequestURL()
const { mobile } = useDisplay()

const { homeTeam, formations, homeFormation, homePlayers } = storeToRefs(teamStore)

const loading = ref(false)
const share = ref({
  showQr: false,
  image: '',
  title: '',
  hasError: false,
  isLoading: false,
})

const teamPlayers = computed<TeamLineupAvailablePlayers[]>(() => {
  const value = homePlayers.value as unknown
  if (Array.isArray(value)) return value as TeamLineupAvailablePlayers[]
  if (Array.isArray((value as { data?: TeamLineupAvailablePlayers[] })?.data)) {
    return (value as { data: TeamLineupAvailablePlayers[] }).data
  }
  return []
})

const teamName = computed(() => homeTeam.value?.name || 'Equipo')
const teamAvatarImage = computed(() => homeTeam.value?.image || '')
const teamShortName = computed(() => {
  const fallback = teamName.value
  const shortName = homeTeam.value?.short_name?.trim()
  if (shortName) return shortName.toUpperCase().slice(0, 3)
  return fallback.slice(0, 3).toUpperCase() || 'EQ'
})
const captainName = computed(() => homeTeam.value?.coach?.name || homeTeam.value?.president?.name || 'Sin capitán')
const currentTournamentName = computed(() => {
  const direct = homeTeam.value?.tournament?.name
  if (direct) return direct
  const firstBadge = homeTeam.value?.tournaments?.[0]?.name
  return firstBadge || 'Sin torneo activo'
})
const teamRouteParam = computed(() => {
  const slug = String(homeTeam.value?.slug || '').trim()
  if (slug) {
    return slug
  }
  const rawParam = String(route.params.equipo || '').trim()
  return rawParam
})
const publicBaseUrl = computed(() => runtimeConfig.public.baseUrl || requestUrl.origin)
const registrationLink = computed(() => {
  const directLink = String(homeTeam.value?.register_link || '').trim()
  if (directLink) {
    return directLink
  }
  if (!teamRouteParam.value) {
    return ''
  }
  return `${publicBaseUrl.value}/equipos/${encodeURIComponent(teamRouteParam.value)}/jugadores/inscripcion`
})

const toNumber = (value: unknown) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const teamStats = computed(() => {
  const wins = toNumber(homeTeam.value?.wins)
  const draws = toNumber(homeTeam.value?.draws)
  const losses = toNumber(homeTeam.value?.losses)
  const goalsFor = toNumber(homeTeam.value?.goals_for)
  const goalsAgainst = toNumber(homeTeam.value?.goals_against)
  const goalDifference =
    homeTeam.value?.goal_difference !== null && homeTeam.value?.goal_difference !== undefined
      ? toNumber(homeTeam.value?.goal_difference)
      : goalsFor - goalsAgainst
  const matchesPlayed =
    homeTeam.value?.matches_played !== null && homeTeam.value?.matches_played !== undefined
      ? toNumber(homeTeam.value?.matches_played)
      : wins + draws + losses
  const points =
    homeTeam.value?.points !== null && homeTeam.value?.points !== undefined
      ? toNumber(homeTeam.value?.points)
      : wins * 3 + draws

  return {
    matchesPlayed,
    wins,
    draws,
    losses,
    goalsFor,
    goalsAgainst,
    goalDifference,
    points,
  }
})

const pointsTotal = computed(() => teamStats.value.points)
const rosterCount = computed(() => teamPlayers.value.length)

const teamKpiItems = computed(() => [
  {
    title: 'PJ',
    value: teamStats.value.matchesPlayed,
    icon: 'lucide:calendar-days',
    iconTone: 'blue' as const,
  },
  {
    title: 'G',
    value: teamStats.value.wins,
    icon: 'lucide:badge-check',
    iconTone: 'green' as const,
  },
  {
    title: 'E',
    value: teamStats.value.draws,
    icon: 'lucide:equal',
    iconTone: 'purple' as const,
  },
  {
    title: 'P',
    value: teamStats.value.losses,
    icon: 'lucide:circle-x',
    iconTone: 'red' as const,
  },
  {
    title: 'GF',
    value: teamStats.value.goalsFor,
    icon: 'lucide:crosshair',
    iconTone: 'orange' as const,
  },
  {
    title: 'GC',
    value: teamStats.value.goalsAgainst,
    icon: 'lucide:shield-alert',
    iconTone: 'blue' as const,
  },
  {
    title: 'DG',
    value: teamStats.value.goalDifference > 0 ? `+${teamStats.value.goalDifference}` : teamStats.value.goalDifference,
    icon: 'lucide:activity',
    iconTone: teamStats.value.goalDifference >= 0 ? ('green' as const) : ('red' as const),
  },
])

const positionBadgeClass = (position: string) => {
  const normalized = String(position || '').toLowerCase()
  if (normalized.includes('port')) return 'team-position-badge--goalkeeper'
  if (normalized.includes('def')) return 'team-position-badge--defense'
  if (normalized.includes('medio')) return 'team-position-badge--midfield'
  if (normalized.includes('del')) return 'team-position-badge--forward'
  return 'team-position-badge--neutral'
}

const leaving = () => {
  homeTeam.value = {} as Team
  homeFormation.value = {} as TeamFormation
}

const updateFormationType = (isHome: boolean, teamId: number, formationId: number) => {
  teamStore.updateDefaultFormationType(teamId, formationId).then(async () => {
    const formationResponse = await getTeamFormation({ id: teamId } as Team)
    const sortedFormation = sortFormation(formationResponse)
    if (isHome) {
      homeFormation.value = sortedFormation
    }
  })
}

const normalizeTeamLookupTerm = (value: string): string | number => {
  const normalized = String(value || '').trim()
  if (/^\d+$/.test(normalized)) {
    return Number(normalized)
  }
  return normalized
}

const loadTeamDetail = async (term: string | number) => {
  if (!term) return
  loading.value = true
  try {
    const teamData = (await teamStore.getTeam(term)) as Team
    homeTeam.value = teamData

    if (!teamData?.id) {
      return
    }

    homePlayers.value = await playerStore.getDefaultLineupAvailableTeamPlayers(teamData)

    await Promise.all([teamStore.getFormations()])

    const formationResponse = await getTeamFormation(teamData)
    homeFormation.value = sortFormation(formationResponse)
  } catch {
    toast({
      type: 'error',
      msg: 'No se pudo cargar la información del equipo',
    })
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.equipo,
  (rawTeamParam) => {
    if (typeof rawTeamParam === 'string') {
      const lookupTerm = normalizeTeamLookupTerm(rawTeamParam)
      void loadTeamDetail(lookupTerm)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  leaving()
})

const goBack = () => {
  if (process.client && window.history.length > 1) {
    router.back()
    return
  }
  router.push('/equipos')
}

const editTeam = () => {
  teamStore.showTeamHandler(String(route.params.equipo || ''))
}

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
  if (!registrationLink.value) {
    toast({ type: 'warning', msg: 'No hay enlace de inscripción disponible' })
    return
  }
  try {
    await copyTextToClipboard(registrationLink.value)
    toast({ type: 'success', msg: 'Enlace de inscripción copiado' })
  } catch {
    toast({ type: 'error', msg: 'No se pudo copiar el enlace de inscripción' })
  }
}

const openTeamRegistrationPage = () => {
  if (!teamRouteParam.value) {
    toast({ type: 'warning', msg: 'No se pudo abrir la inscripción pública del equipo' })
    return
  }
  router.push({
    name: 'equipos-equipo-jugadores-inscripcion',
    params: { equipo: teamRouteParam.value },
  })
}

const openRegistrationQr = async () => {
  if (!homeTeam.value?.id) {
    toast({ type: 'warning', msg: 'No se pudo obtener el ID del equipo' })
    return
  }
  share.value.hasError = false
  share.value.image = ''
  share.value.isLoading = true
  try {
    const data = await getTeamRegistrationQRCode(homeTeam.value.id)
    if (data?.image) {
      share.value.image = data.image
      share.value.title = 'QR de inscripción'
      share.value.showQr = true
      return
    }
    throw new Error('QR no disponible')
  } catch {
    share.value.hasError = true
    toast({ type: 'error', msg: 'No se pudo generar el QR de inscripción' })
  } finally {
    share.value.isLoading = false
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
    default:
      return
  }
}

const downloadQR = () => {
  if (!share.value.image) {
    toast({ type: 'warning', msg: 'No hay una imagen QR para descargar' })
    return
  }

  try {
    const anchor = document.createElement('a')
    anchor.href = share.value.image
    anchor.download = 'futzo_qr.png'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  } catch {
    toast({ type: 'error', msg: 'No se pudo descargar el QR' })
  }
}
</script>

<template>
  <PageLayout styles="main equipos-team-page">
    <template #app-bar>
      <AppBar :extended="false" />
    </template>

    <template #default>
      <div class="team-detail-page" data-testid="team-detail-page">
        <header class="team-detail-header futzo-rounded" data-testid="team-detail-header">
          <button type="button" class="team-detail-header__back" aria-label="Volver a equipos" @click="goBack">
            <Icon name="lucide:arrow-left" size="18" />
          </button>

          <div class="team-detail-header__avatar">
            <img v-if="teamAvatarImage" :src="teamAvatarImage" :alt="teamName" />
            <span v-else>{{ teamShortName }}</span>
          </div>

          <div class="team-detail-header__meta">
            <h1 class="team-detail-header__title">{{ teamName }}</h1>
            <div class="team-detail-header__subtitle-row">
              <p class="team-detail-header__subtitle">Cap: {{ captainName }}</p>
              <v-chip size="x-small" variant="tonal" color="primary">{{ currentTournamentName }}</v-chip>
            </div>
          </div>

          <div class="team-detail-header__actions">
            <TournamentShareMenu
              label="Compartir"
              test-id="team-header-share"
              :icon-only="mobile"
              :loading="share.isLoading"
              :show-public-actions="false"
              @select="shareActionHandler"
            />
            <v-tooltip text="Inscripción pública" location="bottom">
              <template #activator="{ props }">
                <v-btn
                  icon
                  variant="text"
                  v-bind="props"
                  class="team-detail-header__action-btn"
                  aria-label="Abrir inscripción pública del equipo"
                  :disabled="!teamRouteParam"
                  @click="openTeamRegistrationPage"
                >
                  <Icon name="lucide:eye" size="18" />
                </v-btn>
              </template>
            </v-tooltip>
          </div>
        </header>

        <KpisMetricsSection class="team-detail-kpis" :items="teamKpiItems" test-id-prefix="team-detail-kpis" />

        <section class="team-points-card futzo-rounded" data-testid="team-detail-points">
          <div class="team-points-card__content">
            <p>Puntos totales</p>
            <strong>{{ pointsTotal }}</strong>
          </div>
          <div class="team-points-card__icon" aria-hidden="true">
            <Icon name="lucide:trophy" size="24" />
          </div>
        </section>

        <section class="team-detail-actions" data-testid="team-detail-actions">
          <v-btn
            variant="outlined"
            color="primary"
            rounded="lg"
            size="default"
            class="team-edit-btn"
            @click="editTeam"
          >
            <Icon name="lucide:pencil" size="16" />
            Editar equipo
          </v-btn>
        </section>

        <section class="team-detail-workspace" data-testid="team-detail-workspace">
          <article class="team-roster-card futzo-rounded">
            <header class="team-card-heading">
              <div class="team-card-heading__title">
                <Icon name="lucide:users" size="16" />
                <span>Plantilla ({{ rosterCount }})</span>
              </div>
            </header>

            <div v-if="loading" class="team-roster-state">
              <v-skeleton-loader type="list-item-two-line@6" />
            </div>

            <div v-else-if="teamPlayers.length" class="team-roster-list" data-testid="team-roster-list">
              <div v-for="player in teamPlayers" :key="player.player_id" class="team-roster-item">
                <div class="team-roster-item__identity">
                  <span class="team-roster-item__number">{{ player.number || '—' }}</span>
                  <span class="team-roster-item__name">{{ player.name }}</span>
                </div>

                <div class="team-roster-item__meta">
                  <span :class="['team-position-badge', positionBadgeClass(player.position)]">
                    {{ player.position || 'Jugador' }}
                  </span>
                  <span class="team-roster-item__stat">
                    <Icon name="lucide:crosshair" size="12" />
                    0
                  </span>
                  <span class="team-roster-item__stat">
                    <Icon name="lucide:swords" size="12" />
                    0
                  </span>
                  <Icon name="lucide:chevron-right" size="14" class="team-roster-item__chevron" />
                </div>
              </div>
            </div>

            <div v-else class="team-empty-state team-empty-state--compact">
              <Icon name="lucide:users-round" size="20" />
              <p>No hay jugadores registrados</p>
            </div>
          </article>

          <article class="team-field-card futzo-rounded">
            <header class="team-card-heading">
              <div class="team-card-heading__title">
                <Icon name="lucide:map" size="16" />
                <span>Alineación titular</span>
              </div>
            </header>

            <div class="team-field-card__body" data-testid="team-field-wrapper">
              <div class="team-field-wrapper">
                <LinesupContainer
                  :show-complete="false"
                  :is-report="false"
                  :home-team="homeTeam"
                  :home-formation="homeFormation"
                  :formations="formations"
                  :home-players="teamPlayers"
                  @update-formation-type="updateFormationType"
                  @leaving="leaving"
                />
              </div>
            </div>
          </article>
        </section>

        <CreateTeamDialog />
      </div>
    </template>
  </PageLayout>

  <v-dialog v-model="share.showQr" max-width="500">
    <v-card>
      <v-card-title>{{ share.title || 'Compartir equipo' }}</v-card-title>
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
  .team-detail-page
    display: flex
    flex-direction: column
    gap: 10px
    min-width: 0
    padding-bottom: 20px

  .team-detail-header
    display: flex
    align-items: center
    flex-wrap: wrap
    gap: 12px
    padding: 12px 14px

  .team-detail-header__back
    width: 34px
    height: 34px
    min-width: 34px
    border: 0
    border-radius: 10px
    background: transparent
    color: #344054
    display: inline-flex
    align-items: center
    justify-content: center
    cursor: pointer
    transition: .2s ease

  .team-detail-header__back:hover
    background: #f2f4f7

  .team-detail-header__avatar
    width: 42px
    height: 42px
    border-radius: 12px
    background: linear-gradient(135deg, #ef4444, #dc2626)
    color: #fff
    font-size: 13px
    font-weight: 700
    display: inline-flex
    align-items: center
    justify-content: center
    flex-shrink: 0
    overflow: hidden

  .team-detail-header__avatar img
    width: 100%
    height: 100%
    object-fit: cover

  .team-detail-header__meta
    min-width: 0
    flex: 1 1 auto
    display: flex
    flex-direction: column
    gap: 2px

  .team-detail-header__actions
    margin-left: auto
    display: inline-flex
    align-items: center
    gap: 2px

  .team-detail-header__action-btn
    min-width: 34px

  .team-detail-header__title
    margin: 0
    color: #101828
    font-size: 24px
    line-height: 1.2
    font-weight: 700
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap

  .team-detail-header__subtitle-row
    display: flex
    align-items: center
    gap: 8px
    flex-wrap: wrap

  .team-detail-header__subtitle
    margin: 0
    color: #667085
    font-size: 13px

  .team-points-card
    border: none !important
    background: linear-gradient(90deg, #6d28d9 0%, #7c3aed 45%, #9333ea 100%)
    color: #fff
    padding: 12px 14px
    display: flex
    align-items: center
    justify-content: space-between
    gap: 12px

  .team-points-card__content p
    margin: 0
    font-size: 12px
    opacity: .82

  .team-points-card__content strong
    display: block
    font-size: 34px
    font-weight: 700
    line-height: 1.05

  .team-points-card__icon
    opacity: .55

  .team-detail-workspace
    display: grid
    grid-template-columns: minmax(0, 1fr)
    gap: 10px
    align-items: stretch
    min-width: 0

  .team-detail-actions
    display: flex
    justify-content: flex-end
    align-items: center
    min-width: 0

  .team-edit-btn
    border-color: #d0d5dd
    background: #fff
    font-weight: 600
    min-height: 38px
    display: inline-flex
    align-items: center
    gap: 8px

  .team-roster-card,
  .team-field-card
    display: flex
    flex-direction: column
    min-width: 0
    overflow: hidden

  .team-roster-card,
  .team-field-card
    min-height: 320px
    height: clamp(340px, 44vh, 480px)

  .team-card-heading
    display: flex
    align-items: center
    justify-content: space-between
    gap: 10px
    padding: 12px 14px
    border-bottom: 1px solid #eaecf0
    background: #fff

  .team-card-heading__title
    display: inline-flex
    align-items: center
    gap: 8px
    color: #101828
    font-size: 14px
    font-weight: 600

  .team-roster-state
    padding: 12px 14px

  .team-roster-list
    flex: 1 1 auto
    min-height: 0
    overflow-y: auto
    overscroll-behavior: contain

  .team-roster-item
    display: flex
    align-items: center
    justify-content: space-between
    gap: 10px
    padding: 9px 14px
    border-bottom: 1px solid #f2f4f7
    transition: background .16s ease

  .team-roster-item:hover
    background: #f8faff

  .team-roster-item__identity
    min-width: 0
    display: flex
    align-items: center
    gap: 8px

  .team-roster-item__number
    width: 22px
    height: 22px
    border-radius: 999px
    background: #f2f4f7
    color: #667085
    font-size: 11px
    font-weight: 700
    display: inline-flex
    align-items: center
    justify-content: center

  .team-roster-item__name
    color: #101828
    font-size: 13px
    font-weight: 500
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  .team-roster-item__meta
    display: inline-flex
    align-items: center
    gap: 8px
    flex-shrink: 0

  .team-position-badge
    border-radius: 999px
    padding: 2px 8px
    font-size: 10px
    font-weight: 600
    border: 1px solid transparent

  .team-position-badge--goalkeeper
    color: #b54708
    background: #fff4ed
    border-color: #fed7aa

  .team-position-badge--defense
    color: #175cd3
    background: #eff4ff
    border-color: #bfdbfe

  .team-position-badge--midfield
    color: #027a48
    background: #ecfdf3
    border-color: #a6f4c5

  .team-position-badge--forward
    color: #b42318
    background: #fef3f2
    border-color: #fecaca

  .team-position-badge--neutral
    color: #475467
    background: #f2f4f7
    border-color: #eaecf0

  .team-roster-item__stat
    display: inline-flex
    align-items: center
    gap: 4px
    color: #667085
    font-size: 11px

  .team-roster-item__chevron
    color: #98a2b3

  .team-field-card__body
    flex: 1 1 auto
    min-height: 0
    padding: 10px
    background: linear-gradient(180deg, #f8fafc 0%, #f2f4f7 100%)

  .team-field-wrapper
    height: 100%
    border-radius: 12px
    border: 1px solid #d0d5dd
    background: linear-gradient(155deg, #121826 0%, #1f2937 100%)
    padding: 8px
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06)
    overflow: hidden

  .team-field-wrapper :deep(.linesup-container)
    height: 100% !important
    border-radius: 10px
    overflow: hidden

  .team-field-wrapper :deep(.linesup-team-container)
    background-color: #1f8a4d

  .team-field-wrapper :deep(.linesup-team-container .heading)
    background-color: #156f3f
    border-radius: 0 !important

  .team-field-wrapper :deep(.zone-2),
  .team-field-wrapper :deep(.zone-3-away)
    background-color: #1f8a4d

  .team-field-wrapper :deep(.zone-1),
  .team-field-wrapper :deep(.zone-2),
  .team-field-wrapper :deep(.zone-3),
  .team-field-wrapper :deep(.zone-4),
  .team-field-wrapper :deep(.zone-1-away),
  .team-field-wrapper :deep(.zone-2-away),
  .team-field-wrapper :deep(.zone-3-away),
  .team-field-wrapper :deep(.zone-4-away)
    border-color: rgba(255, 255, 255, 0.38)

  .team-field-wrapper :deep(.line)
    background-color: rgba(255, 255, 255, .32)

  .team-empty-state
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    gap: 6px
    color: #667085
    text-align: center

  .team-empty-state p
    margin: 0
    font-size: 13px

  .team-empty-state--compact
    min-height: 86px
    padding: 10px 12px 14px

  @media (min-width: 600px)
    .team-detail-page
      gap: 12px

    .team-detail-header
      flex-wrap: nowrap
      padding: 14px 16px

    .team-detail-header__avatar
      width: 46px
      height: 46px

    .team-detail-header__title
      font-size: 26px

    .team-detail-workspace
      gap: 12px

    .team-detail-actions
      justify-content: flex-start

    .team-edit-btn
      width: 100%

  @media (min-width: 960px)
    .team-detail-actions
      justify-content: flex-end

    .team-edit-btn
      width: auto

    .team-detail-workspace
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)
      min-height: 0

    .team-roster-card,
    .team-field-card
      min-height: 360px
      height: clamp(380px, 48vh, 540px)

  @media (min-width: 1200px)
    .team-detail-workspace
      grid-template-columns: minmax(0, 7fr) minmax(0, 5fr)
</style>
