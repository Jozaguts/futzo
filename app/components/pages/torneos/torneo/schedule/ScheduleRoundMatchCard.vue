<script setup lang="ts">
import type {Match, RoundStatus} from '~/models/Schedule'
import InitialsAvatar from '~/components/shared/InitialsAvatar.vue'
import Score from './score.vue'

const props = defineProps<{
    game: Match
    roundId: number
    isEditable: boolean
    public: boolean
    shouldShowPenaltyInputs: (game: Match, isEditable: boolean) => boolean
    penaltyWinnerName: (game: Match) => string
  }>()

  const emit = defineEmits<{
    (
      event: 'update-game',
      payload: { action: 'up' | 'down'; gameId: number; type: 'home' | 'away'; roundId: number }
    ): void
    (
      event: 'open-modal',
      payload: {
        type: 'GameReport' | 'ReScheduleGame'
        gameId: number
        fieldId: number | null
        date: string | null
        locationId: number | null
      }
    ): void
  }>()

  const isPendingManualMatch = computed(() => {
    return !props.game.details || !props.game.details.raw_date || !props.game.details.field?.id
  })

  const winnerSide = computed<'home' | 'away' | null>(() => {
    if (props.game.home.goals > props.game.away.goals) return 'home'
    if (props.game.away.goals > props.game.home.goals) return 'away'
    return null
  })

  const onUpdateGame = (action: 'up' | 'down', gameId: number, type: 'home' | 'away', roundId: number) => {
    emit('update-game', { action, gameId, type, roundId })
  }

  const openModal = (type: 'GameReport' | 'ReScheduleGame') => {
    emit('open-modal', {
      type,
      gameId: props.game.id,
      fieldId: props.game.details?.field?.id ?? null,
      date: (props.game.details?.raw_date as unknown as string) ?? null,
      locationId: props.game.details?.location?.id ?? null,
    })
  }
</script>

<template>
  <article class="schedule-match-card futzo-rounded" data-testid="schedule-match-card">
    <div class="schedule-match-card__teams">
      <div class="schedule-match-card__team">
        <div class="schedule-match-card__team-main">
          <InitialsAvatar :image="game.home.image" :name="game.home.name" size="30" class="schedule-match-card__avatar" />
          <span class="schedule-match-card__team-name">{{ game.home.name }}</span>
          <Icon v-if="winnerSide === 'home'" class="schedule-match-card__winner" name="lucide:flag" size="12" />
        </div>
        <Score
          :game-id="game.id"
          :round-id="roundId"
          :is-editable="isEditable"
          type="home"
          :value="game.home.goals"
          @update:game="onUpdateGame"
        />
      </div>

      <div class="schedule-match-card__team">
        <div class="schedule-match-card__team-main">
          <InitialsAvatar class="schedule-match-card__avatar" size="30" :image="game.away.image" :name="game.away.name" />
          <span class="schedule-match-card__team-name">{{ game.away.name }}</span>
          <Icon v-if="winnerSide === 'away'" class="schedule-match-card__winner" name="lucide:flag" size="12" />
        </div>
        <Score
          :game-id="game.id"
          :round-id="roundId"
          :is-editable="isEditable"
          type="away"
          :value="game.away.goals"
          @update:game="onUpdateGame"
        />
      </div>
    </div>

    <div v-if="shouldShowPenaltyInputs(game, isEditable)" class="schedule-match-card__penalties">
      <p class="schedule-match-card__penalties-title">Desempate por penales</p>
      <div class="schedule-match-card__penalty-row">
        <span>{{ game.home.name }}</span>
        <v-text-field
          v-model.number="game.penalties.home_goals"
          type="number"
          min="0"
          density="compact"
          hide-details
          class="schedule-match-card__penalty-input"
        />
      </div>
      <div class="schedule-match-card__penalty-row">
        <span>{{ game.away.name }}</span>
        <v-text-field
          v-model.number="game.penalties.away_goals"
          type="number"
          min="0"
          density="compact"
          hide-details
          class="schedule-match-card__penalty-input"
        />
      </div>
      <v-radio-group v-model="game.penalties.winner_team_id" density="compact" hide-details class="mt-2">
        <v-radio :value="game.home.id" :label="game.home.name" />
        <v-radio :value="game.away.id" :label="game.away.name" />
      </v-radio-group>
    </div>

    <div v-else-if="game.penalties?.decided" class="schedule-match-card__penalty-summary">
      Penales: {{ game.penalties.home_goals }} - {{ game.penalties.away_goals }} · Ganador: {{ penaltyWinnerName(game) }}
    </div>

    <footer class="schedule-match-card__footer" :class="{ 'schedule-match-card__footer--pending': isPendingManualMatch }">
      <div class="schedule-match-card__details">
        <template v-if="!isPendingManualMatch">
          {{ game.details?.date }} · {{ game.details?.raw_time }} · {{ game.details?.location?.name }} · {{ game.details?.field?.name }}
        </template>
        <template v-else>Horario por confirmar.</template>
      </div>

      <div v-if="!public" class="schedule-match-card__actions">
        <v-tooltip text="Reprogramar partido" location="bottom">
          <template #activator="{ props: tooltipProps }">
            <v-btn
              icon
              variant="text"
              density="compact"
              size="small"
              v-bind="tooltipProps"
              :disabled="
                (game.status as RoundStatus) === 'en_progreso' ||
                (game.status as RoundStatus) === 'completado' ||
                (game.status as RoundStatus) === 'cancelado'
              "
              @click="openModal('ReScheduleGame')"
            >
              <Icon name="lucide:calendar-clock" size="17" />
            </v-btn>
          </template>
        </v-tooltip>

        <v-tooltip text="Acta de partido" location="bottom">
          <template #activator="{ props: tooltipProps }">
            <v-btn
              icon
              variant="text"
              density="compact"
              size="small"
              v-bind="tooltipProps"
              :disabled="isPendingManualMatch"
              @click="openModal('GameReport')"
            >
              <Icon name="lucide:notebook-pen" size="17" />
            </v-btn>
          </template>
        </v-tooltip>
      </div>
    </footer>
  </article>
</template>

<style lang="sass" scoped>
  .schedule-match-card
    border: 1px solid var(--futzo-border)
    background: var(--futzo-surface)
    display: flex
    flex-direction: column
    overflow: hidden
    min-width: 0

  .schedule-match-card__teams
    padding: 12px
    display: flex
    flex-direction: column
    gap: 10px

  .schedule-match-card__team
    display: flex
    align-items: center
    justify-content: space-between
    gap: 8px

  .schedule-match-card__team-main
    display: flex
    align-items: center
    gap: 8px
    min-width: 0

  .schedule-match-card__avatar
    flex-shrink: 0

  .schedule-match-card__team-name
    font-size: 14px
    font-weight: 500
    line-height: 1.2
    color: #1d2939
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap

  .schedule-match-card__winner
    color: #6941c6
    flex-shrink: 0

  .schedule-match-card__penalties
    border-top: 1px solid var(--futzo-border-strong)
    padding: 10px 12px 0
    background: #f9fafb

  .schedule-match-card__penalties-title
    margin: 0 0 8px
    color: #344054
    font-size: 12px
    font-weight: 600

  .schedule-match-card__penalty-row
    display: flex
    align-items: center
    justify-content: space-between
    gap: 8px
    margin-bottom: 8px
    font-size: 12px
    color: #344054

  .schedule-match-card__penalty-input
    max-width: 88px

  .schedule-match-card__penalty-summary
    border-top: 1px solid var(--futzo-border-strong)
    background: #f9fafb
    color: var(--futzo-text-muted)
    font-size: 12px
    padding: 8px 12px

  .schedule-match-card__footer
    border-top: 1px solid var(--futzo-border-strong)
    background: #fcfcfd
    padding: 8px 10px
    display: flex
    align-items: center
    justify-content: space-between
    gap: 8px

  .schedule-match-card__footer--pending
    background: #f8fafc
    border-top-color: var(--futzo-border-strong)

  .schedule-match-card__details
    font-size: 12px
    color: var(--futzo-on-surface-muted)
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap

  .schedule-match-card__actions
    display: flex
    align-items: center
    gap: 2px
</style>
