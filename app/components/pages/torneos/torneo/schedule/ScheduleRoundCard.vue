<script setup lang="ts">
  import type { Match, Round, RoundStatus, ScheduleRoundStatus } from '~/models/Schedule'
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
</script>

<template>
  <v-container fluid>
    <v-row>
      <!--      <v-col v-if="showRegeneratedSeparator" cols="12" class="pt-0 pb-4">-->
      <!--        <v-alert variant="tonal" type="info" density="comfortable" border="start" icon="mdi-calendar-refresh">-->
      <!--          📅 A partir de aquí, se muestran los partidos regenerados por registro tardío.-->
      <!--        </v-alert>-->
      <!--      </v-col>-->
      <v-col cols="12" class="pa-0">
        <div class="title-container">
          <p class="title">
            Jornada: {{ round.round }}
            <span class="title">Fecha: {{ round.date }}</span>
          </p>
          <div class="d-flex align-center" v-auto-animate>
            <v-btn variant="outlined" v-if="showSave" :loading="loading" @click="emit('save-round', round.round)">
              Guardar cambios
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
        </div>
      </v-col>
      <v-col v-if="round.bye_team" cols="12" class="pt-0 pb-4 pl-0">
        <v-alert variant="plain" density="compact" border="start" border-color="primary" class="pr-0">
          {{ round.bye_team.name }} descansa esta jornada.
        </v-alert>
      </v-col>
      <v-col v-for="game in matchesToShow" :key="game.id" cols="12" md="2" lg="4" class="game-container">
        <ScheduleRoundMatchCard
          :game="game"
          :round-id="round.round"
          :is-editable="isEditable"
          :public="public"
          :should-show-penalty-inputs="shouldShowPenaltyInputs"
          :penalty-winner-name="penaltyWinnerName"
          @update-game="emit('update-game', $event)"
          @open-modal="emit('open-modal', $event)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="sass" scoped>
  @use '~/assets/scss/pages/schedule.sass'
</style>
