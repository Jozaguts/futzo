<script setup lang="ts">
  import type { Match, RoundStatus } from '~/models/Schedule'
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
  <div class="game">
    <div class="team home">
      <v-avatar :image="game.home.image" size="24" class="image" />
      <span class="name d-inline-block text-truncate" style="max-width: 150px">{{ game.home.name }}</span>
      <Score
        :game-id="game.id"
        :round-id="roundId"
        :is-editable="isEditable"
        @update:game="onUpdateGame"
        type="home"
        :value="game.home.goals"
      />
      <Icon v-if="winnerSide === 'home'" class="flag bg-primary" name="futzo-icon:match-polygon" />
    </div>
    <div class="team away">
      <v-avatar class="image" size="24" :image="game.away.image" />
      <span class="name d-inline-block text-truncate" style="max-width: 150px">{{ game.away.name }}</span>
      <Score
        :game-id="game.id"
        :value="game.away.goals"
        :round-id="roundId"
        :is-editable="isEditable"
        @update:game="onUpdateGame"
        type="away"
      />
      <Icon v-if="winnerSide === 'away'" class="flag bg-primary" name="futzo-icon:match-polygon" />
    </div>
    <div v-if="shouldShowPenaltyInputs(game, isEditable)" class="penalty-container">
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
          />
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
          />
        </div>
      </div>
      <p class="text-body-2 font-weight-medium mb-2">Ganador</p>
      <v-radio-group v-model="game.penalties.winner_team_id" density="compact" class="mt-1">
        <v-radio :value="game.home.id" :label="game.home.name" />
        <v-radio :value="game.away.id" :label="game.away.name" />
      </v-radio-group>
      <p class="text-caption text-medium-emphasis mt-2">El ganador suma 2 puntos; el otro equipo suma 1 punto.</p>
    </div>
    <div v-else-if="game.penalties?.decided" class="penalty-summary">
      Penales: {{ game.penalties.home_goals }} - {{ game.penalties.away_goals }} · Ganador:
      {{ penaltyWinnerName(game) }}
    </div>
    <div class="details" :class="{ 'details--pending': isPendingManualMatch }">
      <template v-if="!isPendingManualMatch">
        <p>
          {{ game.details?.date }}
          <span>{{ game.details?.raw_time }}</span>
        </p>
        <p>{{ game.details?.location?.name }}</p>
        <p>{{ game.details?.field?.name }}</p>
      </template>
      <template v-else>
        <p class="text-body-2 font-weight-medium mb-2">Horario por confirmar.</p>
      </template>
      <div v-if="!public" class="d-flex justify-space-between w-75 align-center">
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
          @click="openModal('ReScheduleGame')"
        >
          <Icon name="ant-design:schedule-twotone" size="25" />
        </v-btn>
        <v-btn
          icon
          v-tooltip:bottom-left="'Actualizar marcador'"
          variant="text"
          density="compact"
          :ripple="true"
          :disabled="isPendingManualMatch"
          @click="openModal('GameReport')"
        >
          <Icon name="carbon:result-draft" size="25" />
        </v-btn>
      </div>
    </div>
  </div>
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
