<script lang="ts" setup>
import ReScheduleGame from '~/components/pages/calendario/re-schedule-game.vue'
import GameReport from '~/components/pages/calendario/game-report/index.vue'
import PhaseProgressCard from './phase-progress-card.vue'
import BracketSchedulerDialog from './bracket-scheduler-dialog.vue'
import ScheduleRoundsInfiniteScroll from './ScheduleRoundsInfiniteScroll.vue'
import {useToast} from '~/composables/useToast'
import {useSchedulePenaltyRules} from '~/composables/useSchedulePenaltyRules'
import type {Match, MatchAway, RoundStatus, ScheduleRoundDetails} from '~/models/Schedule'
import NoCalendar from '~/components/pages/torneos/no-calendar.vue'
import RegeneateRoundModalComponent from '~/components/pages/calendario/RegeneateRoundModalComponent.vue'
import {getScheduleRoundDetails, updateScheduleRoundDetails} from '~/http/api/schedule'

const { tournamentId, loading, tournament } = storeToRefs(useTournamentStore())
  const { gameReportDialog, showReScheduleDialog, gameDetailsRequest } = storeToRefs(useGameStore())
  const scheduleStore = useScheduleStore()
  const {
    schedulePagination,
    isLoadingSchedules,
    schedules,
    scheduleRoundStatus,
    isExporting,
    noSchedules,
    regenerationBanner,
    regeneratedFromRound,
    regenerateRoundDialog,
    scheduleSettings,
    scheduleDrawerOpen,
  } = storeToRefs(scheduleStore)
  const roundState = ref<{ round: number | null; fetching: boolean; data: ScheduleRoundDetails }>({
    round: null,
    fetching: false,
    data: {} as ScheduleRoundDetails,
  })
  const { toast } = useToast()
  const {
    ensurePenaltyStructure,
    requiresPenalty,
    shouldShowPenaltyInputs,
    resetPenaltyData,
    penaltyWinnerName,
    buildPenaltyPayload,
  } = useSchedulePenaltyRules(tournament)

  const handleDismissBanner = () => {
    scheduleStore.clearRegenerationBanner()
  }
  const showOnlyPendingManual = ref(false)

  const load = async ({ done }: { done: (status: 'ok' | 'empty' | 'error') => void }) => {
    if (schedulePagination.value.current_page > schedulePagination.value.last_page) {
      done('empty')
      return
    }

    isLoadingSchedules.value = true
    try {
      await useScheduleStore().getTournamentSchedules()
      done('ok')
    } catch (error) {
      console.error('Error cargando más jornadas:', error)
      done('error')
    } finally {
      isLoadingSchedules.value = false
    }
  }
  const updateGame = (action: 'up' | 'down', gameId: number, type: 'home' | 'away', roundId: number) => {
    schedules.value.rounds.forEach((round) => {
      if (roundId === round.round) {
        round.matches.forEach((game) => {
          if (game.id === gameId) {
            ensurePenaltyStructure(game)
            if (action === 'up') {
              game[type].goals += 1
            } else {
              if (game[type].goals > 0) {
                game[type].goals -= 1
              }
            }

            if (!requiresPenalty(game)) {
              resetPenaltyData(game)
            }
          }
        })
      }
    })
  }
  const editRound = (roundId: number) => {
    const round = schedules.value.rounds.find((round) => round.round === roundId)
    if (round) {
      round.isEditable = !round.isEditable
      if (round.isEditable) {
        round.matches.forEach((game) => ensurePenaltyStructure(game))
      }
    }
  }
  const saveHandler = (roundId: number) => {
    loading.value = true
    const round = schedules.value.rounds.find((round) => round.round === roundId)
    if (round) {
      for (const game of round.matches) {
        ensurePenaltyStructure(game)
        if (requiresPenalty(game)) {
          const homeGoals = Number(game.penalties?.home_goals)
          const awayGoals = Number(game.penalties?.away_goals)
          const winnerId = game.penalties?.winner_team_id

          const validWinner = [game.home.id, game.away.id].includes(Number(winnerId))
          const validGoals = Number.isFinite(homeGoals) && Number.isFinite(awayGoals)
          const consistent = validWinner
            ? (winnerId === game.home.id && homeGoals > awayGoals) ||
              (winnerId === game.away.id && awayGoals > homeGoals)
            : false
          if (!validGoals || !consistent) {
            toast({
              type: 'error',
              msg: 'Penales requeridos',
              description: `Completa el marcador de penales y el ganador para ${game.home.name} vs ${game.away.name}.`,
            })
            loading.value = false
            return
          }
          game.penalties.decided = true
        }
      }

      const games = round.matches.map((game) => {
        const penalties = buildPenaltyPayload(game)
        return {
          id: game.id,
          home: {
            id: game.home.id,
            goals: game.home.goals,
          },
          away: {
            id: game.away.id,
            goals: game.away.goals,
          },
          ...(penalties ? { penalties } : {}),
        }
      })
      const client = useSanctumClient()
      client(`/api/v1/admin/tournaments/${tournamentId.value}/rounds/${roundId}`, {
        method: 'POST',
        body: {
          matches: games,
        },
      })
        .then(() => {
          round.isEditable = !round?.isEditable
          toast({
            type: 'success',
            msg: 'Marcador',
            description: 'Actualizado correctamente',
          })
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => (loading.value = false))
    }
  }
  const statusHandler = (status: RoundStatus, roundId: number) => {
    loading.value = true
    useScheduleStore()
      .updateStatusGame(roundId, status, tournamentId.value as number)
      .then(() => {
        toast({
          type: 'success',
          msg: 'Jornada',
          description: 'Actualizada correctamente',
        })
      })
      .finally(() => (loading.value = false))
  }
  onBeforeMount(async () => {
    schedulePagination.value.current_page = 1
    await useScheduleStore().refreshScheduleSettings()
  })
  onBeforeUnmount(async () => {
    schedulePagination.value.current_page = 1
  })
  const openModal = (
    type: 'GameReport' | 'ReScheduleGame',
    _gameId: number,
    fieldId: number | null,
    date: string | null,
    locationId: number | null
  ) => {
    const safeFieldId = fieldId ?? 0
    const safeDate = date ?? ''
    const safeLocationId = locationId ?? null
    gameDetailsRequest.value = {
      id: gameDetailsRequest.value?.id,
      game_id: _gameId,
      field_id: safeFieldId,
      date: safeDate,
      location_id: safeLocationId,
    }
    if (type === 'GameReport') {
      gameReportDialog.value = true
    } else if (type === 'ReScheduleGame') {
      showReScheduleDialog.value = true
    }
  }
  const showBracketDialog = ref(false)
  const openBracketDialog = () => {
    showBracketDialog.value = true
  }

  const showRoundModalEdit = async (round: number) => {
    roundState.value.fetching = true
    regenerateRoundDialog.value = true
    roundState.value.round = round
    roundState.value.data = await getScheduleRoundDetails(tournamentId.value as number, round)
    roundState.value.fetching = false
  }

  const handleRoundSave = async (payload: { matches: Match[]; restingTeam: MatchAway | null }) => {
    if (!tournamentId.value || !roundState.value.round) {
      return
    }

    const roundStatus = String(roundState.value.data?.status ?? '').toLowerCase()
    if (roundStatus === 'completado') {
      toast({
        type: 'error',
        msg: 'Jornada completada',
        description: 'No se puede editar una jornada que ya fue completada.',
      })
      return
    }

    const totalTeams = Number(scheduleSettings.value?.teams ?? tournament.value?.teams?.length ?? 0)
    const requiresBye = totalTeams % 2 === 1
    const byeTeamId = payload.restingTeam?.id ?? null

    if (requiresBye && !byeTeamId) {
      toast({
        type: 'error',
        msg: 'Equipo en descanso requerido',
        description: 'El torneo tiene número impar de equipos. Selecciona el equipo que descansa.',
      })
      return
    }

    const matchesPayload = payload.matches.map((match) => ({
      home_team_id: match.home.id,
      away_team_id: match.away.id,
    }))

    const updatePayload: { matches: { home_team_id: number; away_team_id: number }[]; bye_team_id?: number | null } = {
      matches: matchesPayload,
    }

    if (requiresBye || byeTeamId) {
      updatePayload.bye_team_id = byeTeamId
    }

    try {
      roundState.value.fetching = true
      await updateScheduleRoundDetails(tournamentId.value as number, roundState.value.round, updatePayload)
      toast({
        type: 'success',
        msg: 'Jornada actualizada',
        description: 'Los cambios se guardaron correctamente.',
      })
      roundState.value.data = await getScheduleRoundDetails(tournamentId.value as number, roundState.value.round)
    } catch {
    } finally {
      roundState.value.fetching = false
    }
  }
  const drawer = computed({
    get: () => scheduleDrawerOpen.value,
    set: (value) => {
      scheduleDrawerOpen.value = value
    },
  })
  const regenerationBannerTone = computed(() => regenerationBanner.value?.type ?? 'success')
</script>
<template>
  <section class="schedule-board" data-testid="schedule-board">
    <div
      v-if="regenerationBanner"
      class="schedule-board__banner futzo-rounded"
      :class="`schedule-board__banner--${regenerationBannerTone}`"
      data-testid="schedule-regeneration-banner"
    >
      <div class="schedule-board__banner-main">
        <Icon name="lucide:history" size="15" />
        <span>{{ regenerationBanner.message }}</span>
      </div>
      <v-btn icon variant="text" size="x-small" class="schedule-board__banner-close" @click="handleDismissBanner">
        <Icon name="lucide:x" size="14" />
      </v-btn>
    </div>

    <NoCalendar v-if="noSchedules" />

    <ScheduleRoundsInfiniteScroll
      v-else
      :rounds="schedules.rounds"
      :schedule-round-status="scheduleRoundStatus"
      :loading="loading"
      :is-exporting="isExporting"
      :show-only-pending-manual="showOnlyPendingManual"
      :regenerated-from-round="regeneratedFromRound"
      :should-show-penalty-inputs="shouldShowPenaltyInputs"
      :penalty-winner-name="penaltyWinnerName"
      height="auto"
      @load="load"
      @save-round="saveHandler"
      @edit-round="editRound"
      @open-round-edit="showRoundModalEdit"
      @status-change="({ status, round }) => statusHandler(status, round)"
      @export-round="({ type, round }) => scheduleStore.exportTournamentRoundScheduleAs(type, round)"
      @update-game="({ action, gameId, type, roundId }) => updateGame(action, gameId, type, roundId)"
      @open-modal="
        ({ type, gameId, fieldId, date, locationId }) => openModal(type, gameId, fieldId, date, locationId)
      "
    />

    <v-navigation-drawer v-model="drawer" location="right" temporary width="400">
      <PhaseProgressCard @open-bracket="openBracketDialog" />
    </v-navigation-drawer>
  </section>

  <ReScheduleGame v-model:show="showReScheduleDialog" />
  <GameReport />
  <BracketSchedulerDialog v-model="showBracketDialog" />
  <RegeneateRoundModalComponent
    v-model="regenerateRoundDialog"
    :data="roundState.data"
    :is-fetching="roundState.fetching"
    @save="handleRoundSave"
  />
</template>

<style lang="sass" scoped>
  .schedule-board
    display: flex
    flex-direction: column
    gap: 12px
    min-width: 0

  .schedule-board__banner
    margin-bottom: 0
    min-height: 40px
    border: 1px solid var(--futzo-border)
    background: #f8fafc
    color: var(--futzo-on-surface)
    display: flex
    align-items: center
    justify-content: space-between
    gap: 8px
    padding: 0 8px 0 12px
    font-size: 13px

  .schedule-board__banner-main
    display: inline-flex
    align-items: center
    gap: 8px
    min-width: 0

  .schedule-board__banner-main span
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  .schedule-board__banner--warning
    border-left: 3px solid #fdb022

  .schedule-board__banner--success
    border-left: 3px solid #12b76a

  .schedule-board__banner-close
    color: var(--futzo-on-surface-muted)
</style>
