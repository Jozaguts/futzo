<script setup lang="ts">
  import type { Match, Round, RoundStatus, ScheduleRoundStatus } from '~/models/Schedule'
  import ScheduleRoundCard from './ScheduleRoundCard.vue'

  const props = withDefaults(
    defineProps<{
      rounds: Round[]
      scheduleRoundStatus?: ScheduleRoundStatus[]
      loading?: boolean
      isExporting?: boolean
      showOnlyPendingManual?: boolean
      regeneratedFromRound?: number | null
      public?: boolean
      height?: string | number
      emptyText?: string
      shouldShowPenaltyInputs?: (game: Match, isEditable: boolean) => boolean
      penaltyWinnerName?: (game: Match) => string
    }>(),
    {
      loading: false,
      isExporting: false,
      showOnlyPendingManual: false,
      regeneratedFromRound: null,
      public: false,
      scheduleRoundStatus: () => [],
      height: '80vh',
      emptyText: 'No hay mas jornadas',
    }
  )

  const emit = defineEmits<{
    (event: 'load', payload: { done: (status: 'ok' | 'empty' | 'error') => void }): void
    (event: 'save-round', round: number): void
    (event: 'edit-round', round: number): void
    (event: 'open-round-edit', round: number): void
    (event: 'status-change', payload: { status: RoundStatus; round: number }): void
    (event: 'export-round', payload: { type: 'excel' | 'img'; round: number }): void
    (event: 'update-game', payload: {
      action: 'up' | 'down'
      gameId: number
      type: 'home' | 'away'
      roundId: number
    }): void
    (event: 'open-modal', payload: {
      type: 'GameReport' | 'ReScheduleGame'
      gameId: number
      fieldId: number | null
      date: string | null
      locationId: number | null
    }): void
  }>()

  const defaultPenaltyName = () => ''
  const defaultPenaltyInputs = () => false

  const penaltyWinnerName = computed(() => props.penaltyWinnerName ?? defaultPenaltyName)
  const shouldShowPenaltyInputs = computed(() => props.shouldShowPenaltyInputs ?? defaultPenaltyInputs)
</script>

<template>
  <v-infinite-scroll
    :items="rounds"
    @load="emit('load', $event)"
    :height="height"
    class="bg-surface pa-4 futzo-rounded"
    :empty-text="emptyText"
  >
    <template v-for="round in rounds" :key="round.round">
      <ScheduleRoundCard
        :round="round"
        :schedule-round-status="scheduleRoundStatus"
        :loading="loading"
        :is-exporting="isExporting"
        :show-only-pending-manual="showOnlyPendingManual"
        :regenerated-from-round="regeneratedFromRound"
        :public="public"
        :should-show-penalty-inputs="shouldShowPenaltyInputs"
        :penalty-winner-name="penaltyWinnerName"
        @save-round="emit('save-round', $event)"
        @edit-round="emit('edit-round', $event)"
        @open-round-edit="emit('open-round-edit', $event)"
        @status-change="emit('status-change', $event)"
        @export-round="emit('export-round', $event)"
        @update-game="emit('update-game', $event)"
        @open-modal="emit('open-modal', $event)"
      />
    </template>
  </v-infinite-scroll>
</template>
