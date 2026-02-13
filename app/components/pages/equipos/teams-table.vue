<script setup lang="ts">
import {Icon} from '#components'
import type {Team} from '~/models/Team'
import {getTeamRegistrationQRCode, updateHomePreferences} from '~/http/api/team'
import {useLeaguesStore} from '~/stores/useLeaguesStore'

type LeagueLocationOption = {
  id: number
  name: string
}

type TeamMetricSummary = {
  played: string
  points: string
  goalDiff: string
  goalDiffTone: 'positive' | 'negative' | 'neutral'
}

const teamStore = useTeamStore()
const { teams, pagination } = storeToRefs(teamStore)
const router = useRouter()
const { getLeagueLocations } = useLeaguesStore()
const { toast } = useToast()

const leagueLocations = ref<LeagueLocationOption[]>([])
const assignDialog = ref(false)
const assignLoading = ref(false)
const selectedTeam = ref<Team | null>(null)
const homePreferenceForm = reactive({
  home_location_id: null as number | null,
  home_day_of_week: null as number | null,
  home_start_time: null as string | null,
})

const dayOptions = [
  { label: 'Domingo', value: 0 },
  { label: 'Lunes', value: 1 },
  { label: 'Martes', value: 2 },
  { label: 'Miércoles', value: 3 },
  { label: 'Jueves', value: 4 },
  { label: 'Viernes', value: 5 },
  { label: 'Sábado', value: 6 },
]

const isLocationSelected = computed(() => homePreferenceForm.home_location_id !== null)
const isSaveDisabled = computed(() => {
  if (assignLoading.value) {
    return true
  }
  if (!isLocationSelected.value) {
    return false
  }
  return homePreferenceForm.home_day_of_week === null || !homePreferenceForm.home_start_time
})

const homeStartTimeProxy = computed({
  get: () => {
    if (!homePreferenceForm.home_start_time) {
      return null
    }
    const [hours, minutes] = homePreferenceForm.home_start_time.split(':')
    if (hours === undefined || minutes === undefined) {
      return null
    }
    const date = new Date()
    date.setHours(Number(hours), Number(minutes), 0, 0)
    return date
  },
  set: (val: any) => {
    if (!val) {
      homePreferenceForm.home_start_time = null
      return
    }
    if (val instanceof Date) {
      const hours = String(val.getHours()).padStart(2, '0')
      const minutes = String(val.getMinutes()).padStart(2, '0')
      homePreferenceForm.home_start_time = `${hours}:${minutes}`
      return
    }
    if (typeof val === 'object' && val !== null && 'hours' in val && 'minutes' in val) {
      const hours = String((val as { hours: number }).hours).padStart(2, '0')
      const minutes = String((val as { minutes: number }).minutes).padStart(2, '0')
      homePreferenceForm.home_start_time = `${hours}:${minutes}`
      return
    }
    if (typeof val === 'string') {
      const [hours, minutes] = val.split(':')
      if (hours !== undefined && minutes !== undefined) {
        homePreferenceForm.home_start_time = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
      }
    }
  },
})

const qr = ref({
  image: '',
  loadingTeamId: null as number | null,
  hasError: false,
  showQrCode: false,
})

const toNumber = (value: unknown): number | null => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const truncateLabel = (value: string, maxLength: number = 16) => {
  if (value.length <= maxLength) {
    return value
  }
  return `${value.slice(0, maxLength)}...`
}

const resolveTeamShortName = (team: Team) => {
  const explicit = String(team.short_name ?? '').trim()
  if (explicit) {
    return explicit.slice(0, 3).toUpperCase()
  }
  const words = String(team.name ?? '')
    .split(' ')
    .map((word) => word.trim())
    .filter(Boolean)
  if (words.length >= 2) {
    return `${words[0][0] ?? ''}${words[1][0] ?? ''}${words[2]?.[0] ?? ''}`.toUpperCase()
  }
  return String(team.name ?? '').replace(/\s+/g, '').slice(0, 3).toUpperCase()
}

const resolveTeamBadgeColor = (team: Team) => {
  return team.colors?.home?.primary || '#9155fd'
}

const resolvePlayersCount = (team: Team) => {
  if (typeof team.players_count === 'number') {
    return team.players_count
  }
  const players = (team as any)?.players
  if (Array.isArray(players)) {
    return players.length
  }
  return 0
}

const resolveTournamentBadges = (team: Team) => {
  const tournamentList = Array.isArray(team.tournaments)
    ? team.tournaments
        .map((tournament) => String(tournament?.name ?? '').trim())
        .filter(Boolean)
    : []

  if (tournamentList.length > 0) {
    return tournamentList.slice(0, 2).map((name) => truncateLabel(name))
  }

  if (team.tournament?.name) {
    return [truncateLabel(team.tournament.name)]
  }

  return []
}

const resolveTeamMetrics = (team: Team): TeamMetricSummary => {
  const wins = toNumber(team.wins)
  const draws = toNumber(team.draws)
  const losses = toNumber(team.losses)
  const goalsFor = toNumber(team.goals_for)
  const goalsAgainst = toNumber(team.goals_against)

  const played = toNumber(team.matches_played) ?? (wins !== null && draws !== null && losses !== null ? wins + draws + losses : null)
  const points = toNumber(team.points) ?? (wins !== null && draws !== null ? wins * 3 + draws : null)
  const goalDiff = toNumber(team.goal_difference) ?? (goalsFor !== null && goalsAgainst !== null ? goalsFor - goalsAgainst : null)

  const goalDiffTone: TeamMetricSummary['goalDiffTone'] =
    goalDiff === null ? 'neutral' : goalDiff > 0 ? 'positive' : goalDiff < 0 ? 'negative' : 'neutral'

  return {
    played: played === null ? '—' : String(played),
    points: points === null ? '—' : String(points),
    goalDiff: goalDiff === null ? '—' : goalDiff > 0 ? `+${goalDiff}` : String(goalDiff),
    goalDiffTone,
  }
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

const copyRegistrationLink = async (team: Team) => {
  if (!team.register_link) {
    toast({
      type: 'warning',
      msg: 'Sin enlace disponible',
      description: 'Este equipo no tiene enlace de registro disponible.',
    })
    return
  }
  try {
    await copyTextToClipboard(team.register_link)
    toast({
      type: 'success',
      msg: 'Enlace copiado',
      description: 'Copiamos el enlace de registro del equipo.',
    })
  } catch {
    toast({
      type: 'error',
      msg: 'No se pudo copiar',
      description: 'No pudimos copiar el enlace. Intenta nuevamente.',
    })
  }
}

const ensureLeagueLocations = async () => {
  if (leagueLocations.value.length > 0) {
    return
  }
  try {
    const data = await getLeagueLocations()
    leagueLocations.value = (data ?? []).map((location: any) => ({
      id: location.id,
      name: location.name,
    }))
  } catch {
    toast({
      type: 'error',
      msg: 'Error al cargar sedes',
      description: 'No pudimos obtener la lista de sedes. Intenta nuevamente.',
    })
  }
}

watch(assignDialog, (value) => {
  if (!value) {
    resetHomePreferencesForm()
  }
})

const resetHomePreferencesForm = () => {
  selectedTeam.value = null
  homePreferenceForm.home_location_id = null
  homePreferenceForm.home_day_of_week = null
  homePreferenceForm.home_start_time = null
}

const openAssignModal = async (team: Team) => {
  await ensureLeagueLocations()
  selectedTeam.value = team
  homePreferenceForm.home_location_id = team.home_preferences?.location_id ?? null
  homePreferenceForm.home_day_of_week = team.home_preferences?.day_of_week ?? null
  homePreferenceForm.home_start_time = team.home_preferences?.start_time ?? null
  assignDialog.value = true
}

const closeAssignModal = () => {
  assignDialog.value = false
}

const saveHomePreferences = async () => {
  if (!selectedTeam.value) {
    return
  }
  if (isSaveDisabled.value) {
    toast({
      type: 'warning',
      msg: 'Información incompleta',
      description: 'Selecciona el día y el horario preferido antes de guardar.',
    })
    return
  }
  assignLoading.value = true
  try {
    const payload = {
      home_location_id: homePreferenceForm.home_location_id,
      home_day_of_week: isLocationSelected.value ? homePreferenceForm.home_day_of_week : null,
      home_start_time: homePreferenceForm.home_start_time,
    }
    await updateHomePreferences(selectedTeam.value.id, payload)
    await teamStore.getTeams()
    toast({
      type: 'success',
      msg: 'Sede actualizada',
      description: 'Guardamos las preferencias de localía del equipo.',
    })
    assignDialog.value = false
  } catch (error: any) {
    toast({
      type: 'error',
      msg: 'Error al guardar',
      description: error?.data?.message ?? 'No pudimos guardar las preferencias. Intenta nuevamente.',
    })
  } finally {
    assignLoading.value = false
  }
}

const qrCodeHandler = async (team: Team) => {
  qr.value.hasError = false
  qr.value.loadingTeamId = team.id
  try {
    const data = await getTeamRegistrationQRCode(team.id as number)
    if (data.image) {
      qr.value.image = data.image
      qr.value.showQrCode = true
      return
    }
    throw new Error('QR no disponible')
  } catch {
    qr.value.hasError = true
    toast({
      type: 'error',
      msg: 'No se pudo generar el QR',
      description: 'Intenta nuevamente en unos momentos.',
    })
  } finally {
    qr.value.loadingTeamId = null
  }
}

const downloadQR = () => {
  if (!qr.value.image) {
    toast({
      type: 'warning',
      msg: 'QR no disponible',
      description: 'No hay una imagen QR lista para descargar.',
    })
    return
  }
  const a = document.createElement('a')
  a.href = qr.value.image
  a.download = 'futzo_qr.png'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const clickHandler = (team: Team) => {
  if (team.slug) {
    router.push({ name: 'equipos-equipo', params: { equipo: team.slug } })
  }
}

const handlePageChange = async (page: number) => {
  pagination.value.current_page = page
  await teamStore.getTeams()
}
</script>

<template>
  <div v-if="teams?.length" class="teams-list" data-testid="teams-table">
    <div class="teams-list__scroll">
      <article
        v-for="team in teams"
        :key="team.id"
        class="team-card futzo-rounded"
        data-testid="team-row-card"
        @click="clickHandler(team)"
      >
        <div class="team-card__main">
          <div class="team-card__badge" :style="{ backgroundColor: resolveTeamBadgeColor(team) }">
            {{ resolveTeamShortName(team) }}
          </div>

          <div class="team-card__content">
            <h3 class="team-card__name">{{ team.name }}</h3>
            <div class="team-card__meta">
              <span class="team-card__players">
                <Icon name="lucide:users" size="14" />
                {{ resolvePlayersCount(team) }}
              </span>
              <v-chip
                v-for="badge in resolveTournamentBadges(team)"
                :key="`${team.id}-${badge}`"
                size="x-small"
                variant="tonal"
                class="team-card__chip"
              >
                {{ badge }}
              </v-chip>
            </div>
          </div>
        </div>

        <div class="team-card__aside">
          <div class="team-card__stats">
            <div class="team-stat">
              <span class="team-stat__label">PJ</span>
              <strong class="team-stat__value">{{ resolveTeamMetrics(team).played }}</strong>
            </div>
            <div class="team-stat">
              <span class="team-stat__label">PTS</span>
              <strong class="team-stat__value team-stat__value--points">{{ resolveTeamMetrics(team).points }}</strong>
            </div>
            <div class="team-stat">
              <span class="team-stat__label">DG</span>
              <strong class="team-stat__value" :class="`team-stat__value--${resolveTeamMetrics(team).goalDiffTone}`">
                {{ resolveTeamMetrics(team).goalDiff }}
              </strong>
            </div>
          </div>

          <div class="team-card__actions">
            <v-tooltip text="Ver equipo" location="top">
              <template #activator="{ props }">
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  class="team-action-btn"
                  v-bind="props"
                  data-testid="team-action-view"
                  @click.stop="clickHandler(team)"
                >
                  <Icon name="lucide:eye" size="18" />
                </v-btn>
              </template>
            </v-tooltip>

            <v-tooltip text="Copiar enlace" location="top">
              <template #activator="{ props }">
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  class="team-action-btn"
                  v-bind="props"
                  data-testid="team-action-link"
                  @click.stop="copyRegistrationLink(team)"
                >
                  <Icon name="lucide:link-2" size="18" />
                </v-btn>
              </template>
            </v-tooltip>

            <v-tooltip text="Ver QR" location="top">
              <template #activator="{ props }">
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  class="team-action-btn"
                  :loading="qr.loadingTeamId === team.id"
                  v-bind="props"
                  data-testid="team-action-qr"
                  @click.stop="qrCodeHandler(team)"
                >
                  <Icon name="lucide:qr-code" size="18" />
                </v-btn>
              </template>
            </v-tooltip>

            <v-tooltip text="Asignar sede" location="top">
              <template #activator="{ props }">
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  class="team-action-btn"
                  v-bind="props"
                  data-testid="team-action-assign"
                  @click.stop="openAssignModal(team)"
                >
                  <Icon name="lucide:map-pin" size="18" />
                </v-btn>
              </template>
            </v-tooltip>
          </div>
        </div>
      </article>
    </div>

    <div v-if="pagination.last_page > 1" class="teams-list__footer">
      <v-divider />
      <v-pagination
        v-model="pagination.current_page"
        :length="pagination.last_page"
        :total-visible="$vuetify.display.mobile ? 3 : 8"
        @update:model-value="handlePageChange"
      />
    </div>
  </div>

  <v-dialog v-model="assignDialog" max-width="480">
    <v-card class="futzo-rounded">
      <v-card-title class="text-h6">Preferencias de localía</v-card-title>
      <v-card-text>
        <v-select
          v-model="homePreferenceForm.home_location_id"
          :items="leagueLocations"
          item-title="name"
          item-value="id"
          density="compact"
          variant="outlined"
          label="Sede"
          placeholder="Selecciona una sede"
          clearable
        />
        <v-select
          v-model="homePreferenceForm.home_day_of_week"
          :items="dayOptions"
          item-title="label"
          item-value="value"
          density="compact"
          variant="outlined"
          label="Día preferido"
          placeholder="Selecciona un día"
          class="mt-4"
          clearable
        />
        <div class="mt-4">
          <v-time-picker v-model="homeStartTimeProxy" format="24hr" hide-title></v-time-picker>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="closeAssignModal">Cancelar</v-btn>
        <v-btn color="primary" :loading="assignLoading" :disabled="isSaveDisabled" @click="saveHomePreferences">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="qr.showQrCode" max-width="500">
    <v-card class="futzo-rounded">
      <v-card-title>QR de registro</v-card-title>
      <v-card-text class="text-center">
        <v-alert v-if="qr.hasError" type="warning" variant="tonal" class="mb-4">
          No se pudo generar el código QR.
        </v-alert>
        <v-img v-if="qr.image" :src="qr.image" :aspect-ratio="1" cover></v-img>
      </v-card-text>
      <v-card-actions>
        <v-btn width="200" variant="outlined" @click="downloadQR">Descargar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.teams-list {
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
}

.teams-list__scroll {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  overflow: auto;
  padding: 2px;
}

.team-card {
  border-radius: 14px !important;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
}

.team-card__main {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
}

.team-card__badge {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.team-card__content {
  min-width: 0;
  flex: 1;
}

.team-card__name {
  margin: 0;
  font-size: 14px;
  line-height: 1.3;
  color: #101828;
  font-weight: 700;
}

.team-card__meta {
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.team-card__players {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #667085;
  font-size: 12px;
}

.team-card__chip {
  color: #475467;
  font-size: 10px;
}

.team-card__aside {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 56px;
}

.team-card__stats {
  display: flex;
  align-items: center;
  gap: 14px;
}

.team-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 32px;
}

.team-stat__label {
  font-size: 11px;
  color: #667085;
  font-weight: 600;
}

.team-stat__value {
  font-size: 14px;
  line-height: 1.2;
  color: #475467;
  font-weight: 700;
}

.team-stat__value--points {
  color: #7c3aed;
}

.team-stat__value--positive {
  color: #16a34a;
}

.team-stat__value--negative {
  color: #d92d20;
}

.team-stat__value--neutral {
  color: #667085;
}

.team-card__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}

.team-action-btn {
  width: 32px;
  height: 32px;
  min-width: 32px;
}

.teams-list__footer {
  margin-top: 10px;
}

@media (width >= 960px) {
  .team-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 16px;
  }

  .team-card__aside {
    padding-left: 0;
    flex-direction: row;
    align-items: center;
    gap: 14px;
    margin-left: auto;
  }

  .team-card__stats {
    gap: 18px;
  }

  .team-card__actions {
    flex-wrap: nowrap;
    justify-content: flex-end;
  }
}
</style>
