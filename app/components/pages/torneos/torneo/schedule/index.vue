<script lang="ts" setup>
  import ReScheduleGame from '~/components/pages/calendario/re-schedule-game.vue'
  import GameReport from '~/components/pages/calendario/game-report/index.vue'
  import Score from './score.vue'
  import PhaseProgressCard from './phase-progress-card.vue'
  import BracketSchedulerDialog from './bracket-scheduler-dialog.vue'
  import { useToast } from '~/composables/useToast'
  import type { Match, RoundStatus } from '~/models/Schedule'
  import { useDisplay } from 'vuetify'
  import NoCalendar from '~/components/pages/torneos/no-calendar.vue'

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
    hasPendingManualMatches,
    pendingManualMatches,
  } = storeToRefs(scheduleStore)

  const eliminationPhaseNames = [
    'Dieciseisavos de Final',
    'Octavos de Final',
    'Cuartos de Final',
    'Semifinales',
    'Final',
  ]
  const pendingManualAlertMessage = computed(() => {
    const total = pendingManualMatches.value ?? 0
    const suffix = total === 1 ? '' : 's'
    return `Hay ${total} partido${suffix} pendientes de programación manual.`
  })
  const showPendingManualAlert = computed(() => hasPendingManualMatches.value)
  const handleDismissBanner = () => {
    scheduleStore.clearRegenerationBanner()
  }
  const shouldShowRegeneratedSeparator = (round: number) =>
    regeneratedFromRound.value !== null && round === regeneratedFromRound.value
  const isPendingManualMatch = (game: Match) => {
    return !game.details || !game.details.raw_date || !game.details.field?.id
  }
  const showOnlyPendingManual = ref(false)
  const togglePendingFilter = () => {
    showOnlyPendingManual.value = !showOnlyPendingManual.value
  }

  const ensurePenaltyStructure = (game: Match) => {
    if (!game.penalties) {
      game.penalties = {
        decided: false,
        home_goals: null,
        away_goals: null,
        winner_team_id: null,
      }
    }
  }

  const isEliminationGame = (game: Match) => {
    return eliminationPhaseNames.includes(game.phase?.name ?? '')
  }

  const canApplyPenaltyRule = (game: Match) => {
    return Boolean(tournament.value?.penalty_draw_enabled) && !isEliminationGame(game)
  }

  const requiresPenalty = (game: Match) => {
    return canApplyPenaltyRule(game) && game.home.goals === game.away.goals
  }

  const shouldShowPenaltyInputs = (game: Match, isEditable: boolean) => {
    return isEditable && (requiresPenalty(game) || Boolean(game.penalties?.decided))
  }

  const resetPenaltyData = (game: Match) => {
    ensurePenaltyStructure(game)
    game.penalties.decided = false
    game.penalties.home_goals = null
    game.penalties.away_goals = null
    game.penalties.winner_team_id = null
  }

  const penaltyWinnerName = (game: Match) => {
    if (game.penalties?.winner_team_id === game.home.id) {
      return game.home.name
    }
    if (game.penalties?.winner_team_id === game.away.id) {
      return game.away.name
    }
    return 'Por definir'
  }

  const buildPenaltyPayload = (game: Match) => {
    if (!canApplyPenaltyRule(game)) {
      return null
    }

    if (!(requiresPenalty(game) || game.penalties?.decided)) {
      return null
    }

    const homeGoals = Number(game.penalties?.home_goals)
    const awayGoals = Number(game.penalties?.away_goals)
    const winnerId = Number(game.penalties?.winner_team_id)

    if (!Number.isFinite(homeGoals) || !Number.isFinite(awayGoals) || !Number.isFinite(winnerId)) {
      return null
    }

    return {
      decided: true,
      home_goals: homeGoals,
      away_goals: awayGoals,
      winner_team_id: winnerId,
    }
  }
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
          console.log({ homeGoals, awayGoals, winnerId, validWinner, validGoals, consistent })
          if (!validGoals || !consistent) {
            useToast().toast({
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
          useToast().toast({
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
        useToast().toast({
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
    date: string | null
  ) => {
    const safeFieldId = fieldId ?? 0
    const safeDate = date ?? ''
    gameDetailsRequest.value = {
      id: gameDetailsRequest.value?.id,
      game_id: _gameId,
      field_id: safeFieldId,
      date: safeDate,
    }
    if (type === 'GameReport') {
      gameReportDialog.value = true
    } else if (type === 'ReScheduleGame') {
      showReScheduleDialog.value = true
    }
  }
  const { mobile } = useDisplay()
  const showBracketDialog = ref(false)
  const openBracketDialog = () => {
    showBracketDialog.value = true
  }
</script>
<template>
  <v-container fluid class="pa-0">
    <v-alert
      v-if="regenerationBanner"
      :type="regenerationBanner.type === 'warning' ? 'warning' : 'success'"
      variant="tonal"
      border="start"
      density="comfortable"
      class="mb-4"
      closable
      @click:close="handleDismissBanner"
    >
      {{ regenerationBanner.message }}
    </v-alert>
    <v-row :no-gutters="mobile">
      <v-col cols="12" md="8" lg="8" v-if="noSchedules"> <NoCalendar /></v-col>
      <v-col v-else cols="12" md="8" lg="8">
        <v-infinite-scroll
          :items="schedules.rounds"
          @load="load"
          height="80vh"
          class="bg-surface pa-4 futzo-rounded"
          empty-text="No hay mas jornadas"
        >
          <template v-for="item in schedules.rounds" :key="item.id">
            <v-container fluid>
              <v-row>
                <v-col v-if="shouldShowRegeneratedSeparator(item.round)" cols="12" class="pt-0 pb-4">
                  <v-alert variant="tonal" type="info" density="comfortable" border="start" icon="mdi-calendar-refresh">
                    📅 A partir de aquí, se muestran los partidos regenerados por registro tardío.
                  </v-alert>
                </v-col>
                <v-col cols="12" class="pa-0">
                  <div class="title-container">
                    <p class="title">
                      Jornada: {{ item.round }}
                      <span class="title">Fecha: {{ item.date }}</span>
                    </p>
                    <div class="d-flex align-center" v-auto-animate>
                      <v-btn
                        variant="outlined"
                        v-if="item.isEditable"
                        :loading="loading"
                        @click="() => saveHandler(item.round)"
                        >Guardar cambios
                      </v-btn>
                      <v-menu location="bottom" transition="slide-x-transition" :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                          <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                        </template>
                        <v-list density="compact" nav v-model:selected="item.status" v-auto-animate>
                          <v-list-subheader>Exportar</v-list-subheader>
                          <v-list-item
                            @click="() => useScheduleStore().exportTournamentRoundScheduleAs('excel', item.round)"
                          >
                            <template #prepend>
                              <Icon name="futzo-icon:file-type-excel" class="mr-2"></Icon>
                            </template>
                            <v-list-item-title>Excel </v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            @click="() => useScheduleStore().exportTournamentRoundScheduleAs('img', item.round)"
                          >
                            <template #prepend>
                              <Icon name="futzo-icon:file-type-img-primary" class="mr-2"></Icon>
                            </template>
                            <v-list-item-title>Imagen </v-list-item-title>
                          </v-list-item>
                          <v-progress-linear indeterminate v-show="isExporting" height="2" />
                          <v-list-subheader>Actualizar</v-list-subheader>
                          <v-list-item @click="editRound(item.round)">
                            <v-list-item-title>Resultados </v-list-item-title>
                          </v-list-item>
                          <v-list-subheader>Marcar Jornada como </v-list-subheader>
                          <v-list-item
                            :active="true"
                            :value="item.status"
                            active-class="text-primary"
                            :disabled="true"
                            >{{ item.status }}</v-list-item
                          >
                          <v-list-item
                            :active="status.value == item.status"
                            v-for="(status, index) in scheduleRoundStatus.filter((s) => s.value !== item.status)"
                            :key="index"
                            :value="status.value"
                            active-class="text-primary"
                            :disabled="item.status === 'completado'"
                            @click="() => statusHandler(status.value, item.round)"
                          >
                            <v-list-item-title>{{ status.text }} </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                  </div>
                </v-col>
                <v-col v-if="item.bye_team" cols="12" class="pt-0 pb-4 pl-0">
                  <v-alert variant="plain" density="compact" border="start" border-color="primary" class="pr-0">
                    {{ item.bye_team.name }} descansa esta jornada.
                  </v-alert>
                </v-col>
                <v-col
                  v-for="game in item.matches"
                  :key="game.id"
                  v-if="!showOnlyPendingManual || isPendingManualMatch(game)"
                  cols="12"
                  md="2"
                  lg="4"
                  class="game-container"
                >
                  <div class="game">
                    <div class="team home">
                      <v-avatar :image="game.home.image" size="24" class="image" />
                      <span class="name d-inline-block text-truncate" style="max-width: 150px">
                        {{ game.home.name }}</span
                      >
                      <Score
                        :gameId="game.id"
                        :roundId="item.round"
                        :is-editable="item.isEditable"
                        @update:game="updateGame"
                        type="home"
                        :value="game.home.goals"
                      />
                    </div>
                    <div class="team away">
                      <v-avatar class="image" size="24" :image="game.away.image" />

                      <span class="name d-inline-block text-truncate" style="max-width: 150px">
                        {{ game.away.name }}</span
                      >
                      <Score
                        :gameId="game.id"
                        :value="game.away.goals"
                        :roundId="item.round"
                        :is-editable="item.isEditable"
                        @update:game="updateGame"
                        type="away"
                      />
                      <Icon class="flag" name="futzo-icon:match-polygon" />
                    </div>
                    <div v-if="shouldShowPenaltyInputs(game, item.isEditable)" class="penalty-container">
                      <p class="text-body-2 font-weight-medium mb-2">Desempate por penales</p>
                      <div class="d-flex flex-column mb-2">
                        <div class="d-flex justify-space-between">
                          <span class="mr-2 text-body-2">{{ game.home.name }}</span>
                          <v-text-field
                            v-model.number="game.penalties.home_goals"
                            type="number"
                            min="0"
                            density="compact"
                            hide-details
                            class="penalty-input"
                          ></v-text-field>
                        </div>
                        <div class="d-flex justify-space-between">
                          <span class="mr-2 text-body-2">{{ game.away.name }}</span>
                          <v-text-field
                            v-model.number="game.penalties.away_goals"
                            type="number"
                            min="0"
                            density="compact"
                            hide-details
                            class="penalty-input"
                          ></v-text-field>
                        </div>
                      </div>
                      <p class="text-body-2 font-weight-medium mb-2">Ganador</p>
                      <v-radio-group v-model="game.penalties.winner_team_id" density="compact" class="mt-1">
                        <v-radio :value="game.home.id" :label="game.home.name" />
                        <v-radio :value="game.away.id" :label="game.away.name" />
                      </v-radio-group>
                      <p class="text-caption text-medium-emphasis mt-2">
                        El ganador suma 2 puntos; el otro equipo suma 1 punto.
                      </p>
                    </div>
                    <div v-else-if="game.penalties?.decided" class="penalty-summary">
                      Penales: {{ game.penalties.home_goals }} - {{ game.penalties.away_goals }} · Ganador:
                      {{ penaltyWinnerName(game) }}
                    </div>
                    <div class="details" :class="{ 'details--pending': isPendingManualMatch(game) }">
                      <template v-if="!isPendingManualMatch(game)">
                        <p>
                          {{ game.details?.date }}
                          <span>{{ game.details?.raw_time }}</span>
                        </p>
                        <p>{{ game.details?.location?.name }}</p>
                        <p>{{ game.details?.field?.name }}</p>
                      </template>
                      <div class="d-flex justify-space-between w-75 align-center">
                        <v-btn
                          icon
                          v-tooltip:bottom="'Reprogramar'"
                          variant="text"
                          density="compact"
                          size="small"
                          :ripple="true"
                          :disabled="
                            (game.status as RoundStatus) === 'en_progreso' ||
                            (game.status as RoundStatus) === 'completado' ||
                            (game.status as RoundStatus) === 'cancelado'
                          "
                          @click="
                            openModal(
                              'ReScheduleGame',
                              game.id,
                              game.details?.field?.id ?? null,
                              game.details?.raw_date ?? null
                            )
                          "
                        >
                          <Icon name="ant-design:schedule-twotone" size="25"></Icon>
                        </v-btn>
                        <v-btn
                          icon
                          v-tooltip:bottom-left="'Actualizar marcador'"
                          variant="text"
                          density="compact"
                          :ripple="true"
                          :disabled="isPendingManualMatch(game)"
                          @click="
                            openModal(
                              'GameReport',
                              game.id,
                              game.details?.field?.id ?? null,
                              game.details?.raw_date ?? null
                            )
                          "
                        >
                          <Icon name="carbon:result-draft" size="25"></Icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-infinite-scroll>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <PhaseProgressCard class="mb-6" @open-bracket="openBracketDialog" />
      </v-col>
    </v-row>
    <ReScheduleGame v-model:show="showReScheduleDialog" />
    <GameReport />
    <BracketSchedulerDialog v-model="showBracketDialog" />
  </v-container>
</template>
<style lang="sass" scoped>
  @use '~/assets/scss/pages/schedule.sass'

  .penalty-container
    background-color: rgba(var(--v-theme-surface-variant), 0.3)
    border-radius: 8px
    padding: 12px
    margin-bottom: 12px

  .penalty-input
    max-width: 80px

  .penalty-summary
    margin-bottom: 12px
    font-size: .85rem
    font-weight: 500
    color: rgba(var(--v-theme-on-surface), 0.65)

  .details--pending
    background-color: rgba(var(--v-theme-warning), 0.12)
    border-radius: 8px
    padding: 12px
</style>
