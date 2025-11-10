<script lang="ts" setup>
  import dayjs from 'dayjs'
  import AppBar from '~/components/layout/AppBar.vue'
  import PageLayout from '~/components/shared/PageLayout.vue'
  import type { Player } from '~/models/Player'
  import type { Team } from '~/models/Team'
  import type { Tournament } from '~/models/tournament'

  definePageMeta({
    middleware: ['sanctum:auth'],
  })

  type PlayerPerformanceStats = {
    games_played?: number
    games?: number
    goals?: number
    assists?: number
    yellow_cards?: number
    red_cards?: number
    fouls?: number
    fouls_committed?: number
    tournaments?: number
    tournaments_played?: number
    minutes_played?: number
    clean_sheets?: number
  }

  type PlayerExtended = Player & {
    last_name?: string | null
    birthdate?: string | Date | null
    nationality?: string | null
    image?: string | null
    dominant_foot?: string | null
    medical_notes?: string | null
    notes?: string | null
    iso_code?: number | string | null
    height?: number | null
    weight?: number | null
    stats?: PlayerPerformanceStats
    teams?: Team[]
    tournaments?: Tournament[]
    category?: Team['category'] | null
    number_of_goals?: number | null
  }

  const route = useRoute()
  const router = useRouter()
  const playerStore = usePlayerStore()
  const { player } = storeToRefs(playerStore)
  const loading = ref(true)

  const fetchPlayer = async () => {
    if (!route.params.jugador) {
      loading.value = false
      return
    }
    loading.value = true
    await playerStore.getPlayer(route.params.jugador as string)
    loading.value = false
  }

  watch(
    () => route.params.jugador,
    async (value, oldValue) => {
      if (value && value !== oldValue) {
        await fetchPlayer()
      }
    }
  )

  const currentPlayer = computed<PlayerExtended | null>(() => {
    return player.value ? (player.value as PlayerExtended) : null
  })

  const formatText = (value: string | number | null | undefined, suffix = '') => {
    if (value === null || value === undefined) return 'Sin registro'
    const parsed = typeof value === 'string' ? value.trim() : value
    if (parsed === '') return 'Sin registro'
    return suffix ? `${parsed} ${suffix}` : `${parsed}`
  }

  const numberFormatter = new Intl.NumberFormat('es-MX')
  const toNumber = (value?: number | string | null) => {
    if (value === null || value === undefined) return 0
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }
  const formatNumeric = (value?: number | string | null) => numberFormatter.format(toNumber(value))

  const playerFullName = computed(() => {
    if (!currentPlayer.value) return ''
    return [currentPlayer.value.name, currentPlayer.value.last_name].filter(Boolean).join(' ').trim()
  })

  const initials = computed(() => {
    if (!playerFullName.value) return currentPlayer.value?.name?.[0]?.toUpperCase() ?? 'J'
    return playerFullName.value
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase()
  })

  const avatar = computed(
    () => currentPlayer.value?.image ?? currentPlayer.value?.user?.image ?? currentPlayer.value?.team?.image ?? ''
  )

  const formatDate = (value?: string | Date | null) => {
    if (!value) return 'Sin registro'
    const parsed = dayjs(value)
    return parsed.isValid() ? parsed.format('DD MMM YYYY') : 'Sin registro'
  }

  const playerAge = computed(() => {
    const birthdate = currentPlayer.value?.birthdate
    if (!birthdate) return null
    const parsed = dayjs(birthdate)
    if (!parsed.isValid()) return null
    const diff = dayjs().diff(parsed, 'year')
    return diff > 0 ? diff : null
  })

  const heroMeta = computed(() => [
    {
      label: 'Edad',
      value: playerAge.value ? `${playerAge.value} años` : 'Sin registro',
    },
    {
      label: 'Altura',
      value: formatText(currentPlayer.value?.height, 'cm'),
    },
    {
      label: 'Peso',
      value: formatText(currentPlayer.value?.weight, 'kg'),
    },
  ])

  const playerTeams = computed<Team[]>(() => {
    if (!currentPlayer.value) return []
    if (currentPlayer.value?.teams?.length) return currentPlayer.value.teams
    return currentPlayer.value.team ? [currentPlayer.value.team] : []
  })

  const teamCategoryLabel = computed(() => {
    if (!currentPlayer.value) return ''
    return playerTeams.value[0]?.category?.name ?? currentPlayer.value?.category?.name ?? ''
  })

  const phoneValue = computed(() => {
    const iso = currentPlayer.value?.iso_code
    const phone = currentPlayer.value?.phone
    if (!phone) return 'Sin registro'
    const normalized = phone.replace(/\s+/g, '')
    return iso ? `+${iso} ${normalized}` : normalized
  })

  const tournamentList = computed<Tournament[]>(() => {
    const tournaments = currentPlayer.value?.tournaments?.length
      ? currentPlayer.value.tournaments
      : playerTeams.value
          .map((team) => team.tournament)
          .filter((tournament): tournament is Tournament => Boolean(tournament))
    const unique = new Map<number, Tournament>()
    tournaments?.forEach((tournament) => unique.set(tournament.id, tournament))
    return Array.from(unique.values())
  })

  const statsHighlights = computed(() => {
    const stats = currentPlayer.value?.stats ?? {}
    const tournamentsCount = stats.tournaments ?? stats.tournaments_played ?? tournamentList.value.length
    const items = [
      { label: 'Partidos jugados', value: stats.games_played ?? stats.games ?? 0 },
      { label: 'Torneos', value: tournamentsCount ?? 0 },
      { label: 'Goles', value: stats.goals ?? currentPlayer.value?.number_of_goals ?? 0 },
      { label: 'Asistencias', value: stats.assists ?? 0 },
      { label: 'Faltas', value: stats.fouls ?? stats.fouls_committed ?? 0 },
      { label: 'Tarjetas amarillas', value: stats.yellow_cards ?? 0 },
      { label: 'Tarjetas rojas', value: stats.red_cards ?? 0 },
      { label: 'Minutos jugados', value: stats.minutes_played ?? 0 },
      { label: 'Porterías en cero', value: stats.clean_sheets ?? 0 },
    ]
    return items.map((item) => ({
      ...item,
      value: formatNumeric(item.value),
    }))
  })

  const positionLabel = computed(() => currentPlayer.value?.position?.name ?? 'Posición sin asignar')

  const detailSections = computed(() => [
    {
      id: 'basic',
      title: 'Información básica',
      description: 'Datos generales proporcionados durante el registro.',
      items: [
        { label: 'Nombre(s)', value: formatText(currentPlayer.value?.name) },
        { label: 'Apellido(s)', value: formatText(currentPlayer.value?.last_name) },
        { label: 'Fecha de nacimiento', value: formatDate(currentPlayer.value?.birthdate ?? null) },
        { label: 'Nacionalidad', value: formatText(currentPlayer.value?.nationality) },
        { label: 'Equipo actual', value: playerTeams.value[0]?.name ?? 'Sin registro' },
        { label: 'Categoría', value: teamCategoryLabel.value || 'Sin registro' },
      ],
    },
    {
      id: 'details',
      title: 'Detalles del jugador',
      description: 'Información deportiva y física del jugador.',
      items: [
        { label: 'Posición', value: positionLabel.value },
        { label: 'Dorsal', value: formatText(currentPlayer.value?.number) },
        { label: 'Altura', value: formatText(currentPlayer.value?.height, 'cm') },
        { label: 'Peso', value: formatText(currentPlayer.value?.weight, 'kg') },
        { label: 'Pierna dominante', value: formatText(currentPlayer.value?.dominant_foot) },
        { label: 'Notas médicas', value: formatText(currentPlayer.value?.medical_notes), fullWidth: true },
      ],
    },
    {
      id: 'contact',
      title: 'Información de contacto',
      description: 'Datos de comunicación registrados.',
      items: [
        {
          label: 'Correo electrónico',
          value: formatText(currentPlayer.value?.email ?? currentPlayer.value?.user?.email),
        },
        { label: 'Teléfono', value: phoneValue.value },
        { label: 'Notas adicionales', value: formatText(currentPlayer.value?.notes), fullWidth: true },
      ],
    },
  ])

  const goBack = () => {
    router.push('/jugadores')
  }

  const isCurrentPlayer = computed(() => {
    if (!currentPlayer.value?.id) return false
    return currentPlayer.value.id?.toString() === (route.params.jugador as string)
  })

  const isEmptyState = computed(() => !loading.value && !isCurrentPlayer.value)
  onMounted(async () => {
    await fetchPlayer()
  })
</script>

<template>
  <PageLayout>
    <template #app-bar>
      <AppBar :extended="false">
        <template #buttons>
          <v-btn variant="text" prepend-icon="mdi-arrow-left" class="text-capitalize" @click="goBack">Volver</v-btn>
        </template>
      </AppBar>
    </template>
    <template #default>
      <div class="player-detail-page">
        <v-skeleton-loader
          v-if="loading"
          type="card, list-item-two-line@3, image"
          class="rounded-lg"
        ></v-skeleton-loader>
        <v-empty-state
          v-else-if="isEmptyState"
          title="No encontramos al jugador"
          text="Regresa a la tabla de jugadores e inténtalo nuevamente."
          image="/no-data.svg"
        ></v-empty-state>
        <div v-else class="player-detail-grid">
          <div class="player-detail-grid__main d-flex flex-column ga-4">
            <v-card class="player-hero futzo-rounded" variant="flat">
              <div class="player-hero__info">
                <v-avatar size="84" rounded="lg" :image="avatar" color="primary" variant="tonal">
                  <span class="text-h5">{{ initials }}</span>
                </v-avatar>
                <div>
                  <p class="text-overline text-medium-emphasis mb-1">Ficha del jugador</p>
                  <h2 class="text-h5 mb-1">{{ playerFullName || 'Sin nombre registrado' }}</h2>
                  <p class="text-body-2 text-medium-emphasis mb-2">
                    {{ positionLabel }}
                    <template v-if="playerTeams.length && playerTeams[0]?.name">
                      · {{ playerTeams[0]?.name }}
                    </template>
                  </p>
                  <div class="d-flex flex-wrap ga-2">
                    <v-chip v-if="playerTeams.length" color="primary" variant="tonal" size="small" class="mr-2">
                      {{ playerTeams[0]?.name }}
                    </v-chip>
                    <v-chip v-if="teamCategoryLabel" color="secondary" variant="tonal" size="small">
                      {{ teamCategoryLabel }}
                    </v-chip>
                  </div>
                </div>
              </div>
              <div class="player-hero__meta">
                <div v-for="meta in heroMeta" :key="meta.label" class="player-hero__meta-item">
                  <p>{{ meta.label }}</p>
                  <span>{{ meta.value }}</span>
                </div>
                <v-btn color="primary" variant="outlined" size="small" prepend-icon="mdi-arrow-left" @click="goBack">
                  Volver
                </v-btn>
              </div>
            </v-card>

            <v-card
              v-for="section in detailSections"
              :key="section.id"
              class="detail-card futzo-rounded"
              variant="flat"
            >
              <div class="detail-card__header">
                <div>
                  <h3 class="text-subtitle-1 mb-1">{{ section.title }}</h3>
                  <p class="text-body-2 text-medium-emphasis">{{ section.description }}</p>
                </div>
              </div>
              <div class="detail-card__grid">
                <div
                  v-for="item in section.items"
                  :key="`${section.id}-${item.label}`"
                  class="detail-item"
                  :class="{ 'detail-item--full': item.fullWidth }"
                >
                  <p class="detail-item__label">{{ item.label }}</p>
                  <p class="detail-item__value text-body-1">{{ item.value }}</p>
                </div>
              </div>
            </v-card>
          </div>

          <div class="player-detail-grid__aside d-flex flex-column ga-4">
            <v-card class="detail-card futzo-rounded" variant="flat">
              <div class="detail-card__header">
                <div>
                  <h3 class="text-subtitle-1 mb-1">Estadísticas</h3>
                  <p class="text-body-2 text-medium-emphasis">Resumen de rendimiento acumulado.</p>
                </div>
              </div>
              <div class="player-stats">
                <div v-for="stat in statsHighlights" :key="stat.label" class="player-stats__item">
                  <p>{{ stat.label }}</p>
                  <span>{{ stat.value }}</span>
                </div>
              </div>
            </v-card>

            <v-card class="detail-card futzo-rounded" variant="flat">
              <div class="detail-card__header">
                <div>
                  <h3 class="text-subtitle-1 mb-1">Equipos</h3>
                  <p class="text-body-2 text-medium-emphasis">Historial de equipos vinculados.</p>
                </div>
              </div>
              <div v-if="playerTeams.length" class="player-lists">
                <div v-for="team in playerTeams" :key="team.id" class="player-list-item">
                  <div>
                    <p class="mb-1 text-body-1 font-weight-medium">{{ team.name }}</p>
                    <p class="text-body-2 text-medium-emphasis mb-0">
                      {{ team.category?.name ?? 'Sin categoría' }}
                      <span v-if="team.tournament?.name"> · {{ team.tournament?.name }}</span>
                    </p>
                  </div>
                  <v-avatar v-if="team.image" size="36" :image="team.image" />
                  <v-avatar v-else size="36" color="primary" variant="tonal">
                    {{ team.name?.charAt(0) }}
                  </v-avatar>
                </div>
              </div>
              <div v-else class="player-empty">Este jugador aún no tiene equipos registrados.</div>
            </v-card>

            <v-card class="detail-card futzo-rounded" variant="flat">
              <div class="detail-card__header">
                <div>
                  <h3 class="text-subtitle-1 mb-1">Torneos</h3>
                  <p class="text-body-2 text-medium-emphasis">Participaciones reportadas por la liga.</p>
                </div>
              </div>
              <div v-if="tournamentList.length" class="player-lists">
                <div v-for="tournament in tournamentList" :key="tournament.id" class="player-list-item">
                  <div>
                    <p class="mb-1 text-body-1 font-weight-medium">{{ tournament.name }}</p>
                    <p class="text-body-2 text-medium-emphasis mb-0">
                      {{ tournament.category?.name ?? 'Sin categoría' }}
                      <span v-if="tournament.start_date"> · {{ formatDate(tournament.start_date) }}</span>
                    </p>
                  </div>
                  <v-chip variant="tonal" color="primary" size="small" class="text-uppercase">
                    {{ tournament.status ?? 'En curso' }}
                  </v-chip>
                </div>
              </div>
              <div v-else class="player-empty">No tenemos torneos asociados a este jugador todavía.</div>
            </v-card>
          </div>
        </div>
      </div>
    </template>
  </PageLayout>
</template>
<style lang="sass">
  @use '~/assets/scss/pages/player-detail.sass'
</style>
