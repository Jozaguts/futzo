<script setup lang="ts">
  import GameDetailsSection from '~/components/pages/calendario/game-report/game-details-section.vue'
  import GoalsForm from '~/components/pages/calendario/game-report/sections/forms/goals.vue'
  import type { TeamType } from '~/models/Game'

  const gameStore = useGameStore()
  const { game, gamePlayers, gameEvents, penaltyShootout, isPenaltyDataValid } = storeToRefs(gameStore)
  const tab = ref(game.value.home.id)
  const penaltyResultOptions = [
    { value: true, title: 'Gol' },
    { value: false, title: 'Falló' },
  ]
  const toBoolean = (value: unknown) => value === true || value === 1 || value === '1' || value === 'true'
  const isPenaltyEligible = computed(() => Boolean(game.value?.penalty_draw_enabled))
  const matchIsDraw = computed(() => (game.value?.home?.goals ?? 0) === (game.value?.away?.goals ?? 0))
  const homePenaltyScore = computed(() =>
    penaltyShootout.value.home.reduce((total, attempt) => total + (toBoolean(attempt.score_goal) ? 1 : 0), 0)
  )
  const awayPenaltyScore = computed(() =>
    penaltyShootout.value.away.reduce((total, attempt) => total + (toBoolean(attempt.score_goal) ? 1 : 0), 0)
  )
  const renumberAttempts = (team: TeamType) => {
    penaltyShootout.value[team].forEach((attempt, index) => {
      attempt.kicks_number = index + 1
    })
  }
  const addPenaltyAttempt = (team: TeamType) => {
    const teamId = team === 'home' ? game.value?.home?.id : game.value?.away?.id
    if (!teamId) {
      return
    }
    penaltyShootout.value[team].push({
      id: null,
      player_id: null,
      team_id: teamId,
      score_goal: null,
      kicks_number: penaltyShootout.value[team].length + 1,
      player: null,
    })
    gameStore.validateGoalsForm()
  }
  const removePenaltyAttempt = (team: TeamType, index: number) => {
    penaltyShootout.value[team].splice(index, 1)
    renumberAttempts(team)
    gameStore.validateGoalsForm()
  }

  onMounted(async () => {
    gamePlayers.value = await useGameStore().getGameTeamsPlayers()
    if (gamePlayers.value.home.goals.length > 0) {
      gameEvents.value.home = gamePlayers.value.home.goals
    }
    if (gamePlayers.value.away.goals.length > 0) {
      gameEvents.value.away = gamePlayers.value.away.goals
    }
    if (penaltyShootout.value.decided) {
      if (!penaltyShootout.value.home.length) {
        addPenaltyAttempt('home')
      }
      if (!penaltyShootout.value.away.length) {
        addPenaltyAttempt('away')
      }
    }
  })

  watch(
    () => penaltyShootout.value.decided,
    (decided) => {
      if (decided) {
        if (!penaltyShootout.value.home.length) {
          addPenaltyAttempt('home')
        }
        if (!penaltyShootout.value.away.length) {
          addPenaltyAttempt('away')
        }
      } else {
        penaltyShootout.value.home = []
        penaltyShootout.value.away = []
        gameStore.validateGoalsForm()
      }
    }
  )

  watch(
    () => game.value?.penalty_draw_enabled,
    (enabled) => {
      if (!enabled) {
        penaltyShootout.value.decided = false
        penaltyShootout.value.home = []
        penaltyShootout.value.away = []
        gameStore.validateGoalsForm()
      }
    }
  )
</script>
<template>
  <v-container>
    <v-row>
      <GameDetailsSection :game />
      <v-col cols="12">
        <v-tabs align-tabs="center" v-model="tab" class="bg-background" grow>
          <v-tab class="text-uppercase" :value="game.home.id">{{ game.home.name }}</v-tab>
          <v-tab class="text-uppercase" :value="game.away.id">{{ game.away.name }}</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab" class="mt-4">
          <v-tabs-window-item :value="game.home.id" transition="fade-transition" reverse-transition="fade-transition">
            <GoalsForm :players="gamePlayers?.home?.players" v-model:events="gameEvents.home" />
          </v-tabs-window-item>
          <v-tabs-window-item :value="game.away.id" transition="fade-transition" reverse-transition="fade-transition">
            <GoalsForm :players="gamePlayers?.away?.players" v-model:events="gameEvents.away" />
          </v-tabs-window-item>
        </v-tabs-window>
        <template v-if="isPenaltyEligible">
          <v-divider class="my-6" />
          <div class="d-flex flex-column flex-md-row gap-4 align-md-center justify-space-between">
            <div>
              <h3 class="text-subtitle-1 font-weight-medium mb-1">Desempate por penales</h3>
              <p class="text-caption text-medium-emphasis mb-0">
                Disponible cuando el partido termina empatado y el torneo reparte puntos mediante penales.
              </p>
              <p v-if="!matchIsDraw" class="text-caption text-warning mt-2">
                Registra un marcador empatado para habilitar los penales.
              </p>
            </div>
            <v-switch
              v-model="penaltyShootout.decided"
              :disabled="!matchIsDraw"
              color="primary"
              inset
              class="ml-auto"
              label="Partido definido en penales"
            />
          </div>
          <v-expand-transition>
            <div v-if="penaltyShootout.decided" class="mt-4">
              <div class="text-body-2 font-weight-medium mb-4">
                Marcador de penales: {{ homePenaltyScore }} - {{ awayPenaltyScore }}
              </div>
              <v-row class="penalty-grid" align="start">
                <v-col cols="12" md="6">
                  <div class="d-flex align-center justify-space-between mb-3">
                    <h4 class="text-subtitle-2 mb-0">{{ game.home.name }}</h4>
                    <v-btn
                      :disabled="!gamePlayers?.home?.players?.length"
                      variant="text"
                      size="small"
                      color="primary"
                      prepend-icon="mdi-plus"
                      @click="addPenaltyAttempt('home')"
                    >
                      Agregar tiro
                    </v-btn>
                  </div>
                  <v-sheet
                    v-for="(attempt, index) in penaltyShootout.home"
                    :key="`home-penalty-${index}`"
                    class="penalty-attempt pa-3 mb-3"
                    rounded
                    border
                  >
                    <div class="d-flex align-center justify-space-between mb-3">
                      <span class="text-caption text-medium-emphasis">Tiro {{ attempt.kicks_number }}</span>
                      <v-btn
                        icon="mdi-close"
                        size="small"
                        variant="text"
                        color="secondary"
                        @click="removePenaltyAttempt('home', index)"
                      />
                    </div>
                    <v-autocomplete
                      v-model="attempt.player_id"
                      :items="gamePlayers?.home?.players || []"
                      item-title="name"
                      item-value="id"
                      density="compact"
                      hide-details
                      clearable
                      label="Jugador"
                    />
                    <v-select
                      class="mt-3"
                      v-model="attempt.score_goal"
                      :items="penaltyResultOptions"
                      density="compact"
                      hide-details
                      label="Resultado"
                    />
                  </v-sheet>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="d-flex align-center justify-space-between mb-3">
                    <h4 class="text-subtitle-2 mb-0">{{ game.away.name }}</h4>
                    <v-btn
                      :disabled="!gamePlayers?.away?.players?.length"
                      variant="text"
                      size="small"
                      color="primary"
                      prepend-icon="mdi-plus"
                      @click="addPenaltyAttempt('away')"
                    >
                      Agregar tiro
                    </v-btn>
                  </div>
                  <v-sheet
                    v-for="(attempt, index) in penaltyShootout.away"
                    :key="`away-penalty-${index}`"
                    class="penalty-attempt pa-3 mb-3"
                    rounded
                    border
                  >
                    <div class="d-flex align-center justify-space-between mb-3">
                      <span class="text-caption text-medium-emphasis">Tiro {{ attempt.kicks_number }}</span>
                      <v-btn
                        icon="mdi-close"
                        size="small"
                        variant="text"
                        color="secondary"
                        @click="removePenaltyAttempt('away', index)"
                      />
                    </div>
                    <v-autocomplete
                      v-model="attempt.player_id"
                      :items="gamePlayers?.away?.players || []"
                      item-title="name"
                      item-value="id"
                      density="compact"
                      hide-details
                      clearable
                      label="Jugador"
                    />
                    <v-select
                      class="mt-3"
                      v-model="attempt.score_goal"
                      :items="penaltyResultOptions"
                      density="compact"
                      hide-details
                      label="Resultado"
                    />
                  </v-sheet>
                </v-col>
              </v-row>
              <p
                v-if="!isPenaltyDataValid && penaltyShootout.decided"
                class="text-caption text-error mt-n2"
              >
                Completa los tiradores, el resultado de cada cobro y asegúrate de que exista un ganador en penales.
              </p>
            </div>
          </v-expand-transition>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
  .penalty-attempt {
    background-color: rgba(var(--v-theme-surface-variant), 0.3);
  }
</style>
