<script lang="ts" setup>
import type {Player} from '~/models/Player'
import {Icon} from '#components'
import InitialsAvatar from '~/components/shared/InitialsAvatar.vue'

const props = withDefaults(
  defineProps<{
    teamFilter?: number | 'all'
    positionFilter?: string | 'all'
  }>(),
  {
    teamFilter: 'all',
    positionFilter: 'all',
  }
)

const playerStore = usePlayerStore()
const { players, playerId, pagination, showAssignTeam, noPlayers } = storeToRefs(playerStore)
const router = useRouter()
const { teams } = storeToRefs(useTeamStore())

const areThereTeams = computed(() => teams.value?.length > 0)

const fullName = (player: any) => [player?.name, player?.last_name].filter(Boolean).join(' ').trim() || 'Sin nombre'

const toNumber = (value: unknown) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const resolveGoals = (player: any) => toNumber(player?.stats?.goals ?? player?.number_of_goals ?? 0)
const resolveAssists = (player: any) => toNumber(player?.stats?.assists ?? 0)
const resolveYellowCards = (player: any) => toNumber(player?.stats?.yellow_cards ?? 0)
const resolveRedCards = (player: any) => toNumber(player?.stats?.red_cards ?? 0)
const resolvePosition = (player: any) => player?.position?.name ?? player?.position?.abbr ?? 'Sin posición'
const resolveTeam = (player: any) => player?.team?.name ?? 'Sin equipo'
const resolvePlayerImage = (player: any) => player?.image ?? player?.user?.image ?? null
const resolvePlayerInitials = (player: any) => {
  const words = fullName(player)
    .split(' ')
    .map((part) => part.trim())
    .filter(Boolean)
  if (!words.length) {
    return 'J'
  }
  return words
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
}
const resolvePlayerAvatarColor = (player: any) => player?.team?.colors?.home?.primary ?? ''

const positionBadgeClass = (position: string) => {
  const normalized = String(position).toLowerCase()
  if (normalized.includes('port')) return 'player-row__badge--goalkeeper'
  if (normalized.includes('def')) return 'player-row__badge--defense'
  if (normalized.includes('medio')) return 'player-row__badge--midfield'
  if (normalized.includes('del')) return 'player-row__badge--forward'
  return 'player-row__badge--neutral'
}

const filteredPlayers = computed(() => {
  return players.value.filter((player: any) => {
    const teamMatch = props.teamFilter === 'all' || Number(player?.team?.id) === Number(props.teamFilter)
    const currentPosition = String(player?.position?.name ?? player?.position?.abbr ?? '').toLowerCase()
    const requestedPosition = String(props.positionFilter ?? '').toLowerCase()
    const positionMatch = props.positionFilter === 'all' || currentPosition === requestedPosition
    return teamMatch && positionMatch
  })
})

const showPlayerHandler = (player: Player) => {
  if (!player?.id) return
  router.push({ name: 'jugadores-jugador', params: { jugador: player.id } })
}

const configurePlayerHandler = async (player: Player) => {
  if (!player?.id) return
  await playerStore.openPlayerEdition(Number(player.id))
}

const assignTeam = (player: Player) => {
  if (!player?.id) return
  playerId.value = Number(player.id)
  showAssignTeam.value = true
}

const handlePageChange = async (page: number) => {
  pagination.value.current_page = page
  await playerStore.getPlayers()
}
</script>

<template>
  <div v-if="!noPlayers" class="players-list" data-testid="players-table">
    <div class="players-list__scroll">
      <article v-for="player in filteredPlayers" :key="player.id" class="player-row futzo-rounded" data-testid="player-row-card">
        <button type="button" class="player-row__main" @click="showPlayerHandler(player as Player)">
          <InitialsAvatar
            class="player-row__avatar"
            size="42"
            rounded="lg"
            :image="resolvePlayerImage(player)"
            :name="fullName(player)"
            :initials="resolvePlayerInitials(player)"
            :fallback-color="resolvePlayerAvatarColor(player)"
          />
          <div class="player-row__identity">
            <h3>{{ fullName(player) }}</h3>
            <div class="player-row__meta">
              <span class="player-row__team">
                <Icon name="lucide:shield" size="13" />
                {{ resolveTeam(player) }}
              </span>
              <span :class="['player-row__badge', positionBadgeClass(resolvePosition(player))]">
                {{ resolvePosition(player) }}
              </span>
            </div>
          </div>
          <div class="player-row__stats">
            <span class="player-row__stat" title="Goles">
              <Icon name="lucide:goal" size="13" />
              {{ resolveGoals(player) }}
            </span>
            <span class="player-row__stat" title="Asistencias">
              <Icon name="lucide:swords" size="13" />
              {{ resolveAssists(player) }}
            </span>
            <span class="player-row__cards" v-if="resolveYellowCards(player) > 0 || resolveRedCards(player) > 0">
              <i v-if="resolveYellowCards(player) > 0" class="player-row__card player-row__card--yellow"></i>
              <i v-if="resolveRedCards(player) > 0" class="player-row__card player-row__card--red"></i>
            </span>
          </div>
        </button>

        <div class="player-row__actions">
          <v-btn
            size="small"
            rounded="md"
            variant="text"
            color="primary"
            data-testid="player-action-view"
            @click.stop="showPlayerHandler(player as Player)"
          >
            Ver jugador
          </v-btn>
          <v-btn
            size="small"
            rounded="md"
            variant="outlined"
            color="primary"
            data-testid="player-action-configure"
            @click.stop="configurePlayerHandler(player as Player)"
          >
            Configurar
          </v-btn>
          <v-btn
            v-if="!player?.team?.id"
            size="small"
            rounded="md"
            variant="text"
            color="secondary"
            :disabled="!areThereTeams"
            data-testid="player-action-assign-team"
            @click.stop="assignTeam(player as Player)"
          >
            Asignar equipo
          </v-btn>
        </div>
      </article>

      <div v-if="!filteredPlayers.length" class="players-list__empty">No se encontraron jugadores con los filtros aplicados.</div>
    </div>

    <div v-if="pagination.last_page > 1" class="players-list__footer">
      <v-divider />
      <v-pagination
        v-model="pagination.current_page"
        :length="pagination.last_page"
        :total-visible="$vuetify.display.mobile ? 3 : 8"
        @update:model-value="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped>
.players-list {
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  width: 100%;
}

.players-list__scroll {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  overflow-y: auto;
  padding: 12px;
}

.players-list__footer {
  background: var(--futzo-surface);
}

.players-list__empty {
  min-height: 140px;
  border: 1px dashed var(--futzo-border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--futzo-on-surface-muted);
  font-size: 14px;
  text-align: center;
  padding: 12px;
}

.player-row {
  border: 1px solid var(--futzo-border);
  background: var(--futzo-surface);
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px;
  padding: 14px 16px;
}

.player-row__main {
  border: 0;
  background: transparent;
  padding: 0;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  text-align: left;
  cursor: pointer;
}

.player-row__avatar {
  flex-shrink: 0;
}

.player-row__identity {
  min-width: 0;
}

.player-row__identity h3 {
  margin: 0;
  color: var(--futzo-on-surface);
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-row__meta {
  margin-top: 3px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.player-row__team {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--futzo-on-surface-muted);
  font-size: 12px;
}

.player-row__badge {
  border-radius: 999px;
  padding: 1px 8px;
  font-size: 10px;
  font-weight: 600;
  border: 1px solid transparent;
}

.player-row__badge--goalkeeper {
  color: #b54708;
  background: #fff4ed;
  border-color: #fed7aa;
}

.player-row__badge--defense {
  color: #175cd3;
  background: #eff4ff;
  border-color: #bfdbfe;
}

.player-row__badge--midfield {
  color: #027a48;
  background: #ecfdf3;
  border-color: #a6f4c5;
}

.player-row__badge--forward {
  color: #b42318;
  background: #fef3f2;
  border-color: #fecaca;
}

.player-row__badge--neutral {
  color: var(--futzo-text-muted);
  background: #f2f4f7;
  border-color: var(--futzo-border-strong);
}

.player-row__stats {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #344054;
}

.player-row__stat {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
}

.player-row__cards {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.player-row__card {
  width: 10px;
  height: 14px;
  border-radius: 2px;
}

.player-row__card--yellow {
  background: #fdb022;
}

.player-row__card--red {
  background: #f04438;
}

.player-row__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

@media (min-width: 960px) {
  .player-row {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
  }

  .player-row__actions {
    justify-content: flex-end;
  }
}
</style>
