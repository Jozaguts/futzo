<script setup lang="ts">
import type {Match, Round, RoundStatus, ScheduleRoundStatus} from '~/models/Schedule'
import ScheduleRoundActionsMenu from './ScheduleRoundActionsMenu.vue'
import ScheduleRoundMatchCard from './ScheduleRoundMatchCard.vue'

const props = withDefaults(
    defineProps<{
      round: Round
      scheduleRoundStatus?: ScheduleRoundStatus[]
      loading?: boolean
      isExporting?: boolean
      showOnlyPendingManual?: boolean
      regeneratedFromRound?: number | null
      public?: boolean
      shouldShowPenaltyInputs: (game: Match, isEditable: boolean) => boolean
      penaltyWinnerName: (game: Match) => string
    }>(),
    {
      loading: false,
      isExporting: false,
      showOnlyPendingManual: false,
      regeneratedFromRound: null,
      public: false,
      scheduleRoundStatus: () => [],
    }
  )

  const emit = defineEmits<{
    (event: 'save-round', round: number): void
    (event: 'edit-round', round: number): void
    (event: 'open-round-edit', round: number): void
    (event: 'status-change', payload: { status: RoundStatus; round: number }): void
    (event: 'export-round', payload: { type: 'excel' | 'img'; round: number }): void
    (
      event: 'update-game',
      payload: {
        action: 'up' | 'down'
        gameId: number
        type: 'home' | 'away'
        roundId: number
      }
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

  const isEditable = computed(() => (props.public ? false : Boolean(props.round.isEditable)))
  const showSave = computed(() => isEditable.value && !props.public)
  const showRegeneratedSeparator = computed(
    () => props.regeneratedFromRound !== null && props.round.round === props.regeneratedFromRound
  )

  const isPendingManualMatch = (game: Match) => !game.details || !game.details.raw_date || !game.details.field?.id

  const matchesToShow = computed(() => {
    if (!props.showOnlyPendingManual) {
      return props.round.matches
    }
    return props.round.matches.filter((game) => isPendingManualMatch(game))
  })

  const roundStatus = computed(() => {
    switch (props.round.status) {
      case 'completado':
        return { text: 'Completada', color: 'success' as const }
      case 'en_progreso':
        return { text: 'En progreso', color: 'warning' as const }
      case 'cancelado':
        return { text: 'Cancelada', color: 'error' as const }
      case 'aplazado':
        return { text: 'Aplazada', color: 'orange' as const }
      default:
        return { text: 'Programada', color: 'grey-lighten-1' as const }
    }
  })

  const parsedRoundDate = computed(() => {
    if (!props.round?.date) {
      return '-'
    }
    if (typeof props.round.date === 'string') {
      return props.round.date
    }
    try {
      return new Date(props.round.date).toISOString().slice(0, 10)
    } catch {
      return '-'
    }
  })
</script>

<template>
  <article class="schedule-round-card futzo-rounded" data-testid="schedule-round-card">
    <div v-if="showRegeneratedSeparator" class="schedule-round-card__regenerated-note">
      <Icon name="lucide:sparkles" size="14" />
      <span>A partir de esta jornada se muestran los partidos regenerados por registro tardío.</span>
    </div>

    <header class="schedule-round-card__header">
      <div class="schedule-round-card__meta">
        <div class="schedule-round-card__title-row">
          <h3 class="schedule-round-card__title">Jornada {{ round.round }}</h3>
          <v-chip :color="roundStatus.color" size="small" variant="tonal" class="schedule-round-card__status">
            {{ roundStatus.text }}
          </v-chip>
        </div>
        <p class="schedule-round-card__subtitle">Fecha: {{ parsedRoundDate }}</p>
      </div>

      <div class="schedule-round-card__actions" v-auto-animate>
        <v-btn
          v-if="!public && !showSave"
          variant="text"
          color="primary"
          size="small"
          class="schedule-round-card__edit"
          @click="emit('edit-round', round.round)"
        >
          <template #prepend>
            <Icon name="lucide:pencil" size="14" />
          </template>
          Editar
        </v-btn>
        <v-btn
          v-if="showSave"
          variant="elevated"
          color="primary"
          size="small"
          :loading="loading"
          @click="emit('save-round', round.round)"
        >
          <template #prepend>
            <Icon name="lucide:save" size="14" />
          </template>
          Guardar
        </v-btn>
        <ScheduleRoundActionsMenu
          :round="round"
          :schedule-round-status="scheduleRoundStatus"
          :is-exporting="isExporting"
          :public="public"
          @export-round="emit('export-round', $event)"
          @edit-round="emit('edit-round', $event)"
          @open-round-edit="emit('open-round-edit', $event)"
          @status-change="emit('status-change', $event)"
        />
      </div>
    </header>

    <div v-if="round.bye_team" class="schedule-round-card__bye">
      {{ round.bye_team.name }} descansa esta jornada.
    </div>

    <div class="schedule-round-card__matches">
      <ScheduleRoundMatchCard
        v-for="game in matchesToShow"
        :key="game.id"
        :game="game"
        :round-id="round.round"
        :is-editable="isEditable"
        :public="public"
        :should-show-penalty-inputs="shouldShowPenaltyInputs"
        :penalty-winner-name="penaltyWinnerName"
        @update-game="emit('update-game', $event)"
        @open-modal="emit('open-modal', $event)"
      />
    </div>
  </article>
</template>

<style lang="sass" scoped>
  .schedule-round-card
    border: 1px solid var(--futzo-border)
    background: var(--futzo-surface)
    overflow: hidden
    min-width: 0

  .schedule-round-card__header
    display: flex
    gap: 8px
    justify-content: space-between
    align-items: center
    border-bottom: 1px solid var(--futzo-border-strong)
    background: #fcfcfd
    padding: 10px 14px
    flex-wrap: wrap

  .schedule-round-card__meta
    min-width: 0

  .schedule-round-card__title-row
    display: flex
    align-items: center
    gap: 8px
    flex-wrap: wrap

  .schedule-round-card__title
    margin: 0
    font-size: 18px
    line-height: 1
    font-weight: 700
    color: #1d2939

  .schedule-round-card__subtitle
    margin: 4px 0 0
    color: var(--futzo-on-surface-muted)
    font-size: 12px

  .schedule-round-card__status
    font-size: 11px
    font-weight: 600

  .schedule-round-card__actions
    display: flex
    align-items: center
    gap: 4px

  .schedule-round-card__edit
    text-transform: none
    letter-spacing: normal

  .schedule-round-card__regenerated-note
    border: 1px solid var(--futzo-border)
    background: #f8fafc
    border-radius: 10px
    min-height: 34px
    display: flex
    align-items: center
    gap: 8px
    font-size: 12px
    color: var(--futzo-text-muted)
    padding: 0 10px
    margin-bottom: 10px

  .schedule-round-card__bye
    border-bottom: 1px solid var(--futzo-border-strong)
    background: #f8fafc
    color: var(--futzo-text-muted)
    font-size: 13px
    font-style: italic
    padding: 8px 14px

  .schedule-round-card__matches
    display: grid
    grid-template-columns: minmax(0, 1fr)
    gap: 12px
    padding: 12px

  @media (min-width: 900px)
    .schedule-round-card__matches
      grid-template-columns: repeat(2, minmax(0, 1fr))

  @media (min-width: 1260px)
    .schedule-round-card__matches
      grid-template-columns: repeat(3, minmax(0, 1fr))

  @media (max-width: 600px)
    .schedule-round-card__title
      font-size: 16px
</style>
