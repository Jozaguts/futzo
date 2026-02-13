<script lang="ts" setup>
import AppBar from '~/components/layout/AppBar.vue'
import CreateTeamDialog from '~/components/pages/equipos/CreateTeamDialog/index.vue'
import LinesupContainer from '~/components/pages/calendario/game-report/linesup-container.vue'
import KpisMetricsSection from '~/components/shared/kpis-metrics-section.vue'
import PageLayout from '~/components/shared/PageLayout.vue'
import {getTeamFormation} from '~/http/api/team'
import type {TeamFormation} from '~/models/Game'
import type {Team} from '~/models/Team'
import type {TeamLineupAvailablePlayers} from '~/models/Player'
import {sortFormation} from '~/utils/sort-formation'
import {Icon} from '#components'

definePageMeta({
  middleware: ['sanctum:auth'],
})

const teamStore = useTeamStore()
const playerStore = usePlayerStore()
const route = useRoute()
const router = useRouter()
const { toast } = useToast()

const { homeTeam, formations, homeFormation, homePlayers } = storeToRefs(teamStore)

const loading = ref(false)

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

const loadTeamDetail = async (slug: string) => {
  if (!slug) return
  loading.value = true
  try {
    const teamData = (await teamStore.getTeam(slug)) as Team
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
  (slug) => {
    if (typeof slug === 'string') {
      void loadTeamDetail(slug)
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
    display: flex
    flex-direction: column
    gap: 2px

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
