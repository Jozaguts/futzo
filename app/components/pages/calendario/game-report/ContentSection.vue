<script setup lang="ts">
import GameDetailsSection from '~/components/pages/calendario/game-report/game-details-section.vue'
import GameEvents from '~/components/pages/calendario/game-report/game-events.vue'
import LinesupContainer from '~/components/pages/calendario/game-report/linesup-container.vue'
import type {DialogHandlerActionsNames, Game} from '~/models/Game'
import {CARDS, GOALS, SUBSTITUTIONS} from '~/utils/constants'
import {useGame} from '~/composables/useGame'
import {storeToRefs, useToast} from '#imports'

const gameStoreInstance = useGameStore()
  const teamStore = useTeamStore()
  const { game, gameActionFormRequest } = storeToRefs(gameStoreInstance)
  const { homeTeam, awayTeam, homeFormation, awayFormation, formations, homePlayers, awayPlayers } = storeToRefs(teamStore)
  const { dialogState, currentComponent, dialogHandler, updateDefaultFormationType } = useGame()
  const { toast } = useToast()

  const tab = ref<'timeline' | 'lineup'>('timeline')
  const addEventMenu = ref(false)

  const eventActions: Array<{ label: string; value: DialogHandlerActionsNames; icon: string }> = [
    { label: 'Registrar gol', value: GOALS, icon: 'lucide:circle-dot' },
    { label: 'Registrar tarjeta', value: CARDS, icon: 'lucide:square' },
    { label: 'Registrar sustitución', value: SUBSTITUTIONS, icon: 'lucide:refresh-cw' },
  ]

  const isCompleted = computed(() => game.value?.status === 'completado')

  const openActionDialog = (action: DialogHandlerActionsNames) => {
    addEventMenu.value = false
    dialogHandler(action)
  }

  watch(
    game,
    async (newGame) => {
      if (!newGame?.home?.id || !newGame?.away?.id) {
        return
      }
      try {
        const initialize = await gameStoreInstance.initializeGameReport(newGame.id)
        teamStore.initReportHandler(initialize)
      } catch {
        toast({
          type: 'error',
          msg: 'Acta de partido',
          description: 'No pudimos cargar la información de alineaciones para este partido.',
        })
      }
    },
    { deep: true }
  )

  onMounted(async () => {
    try {
      await teamStore.getFormations()
    } catch {
      toast({
        type: 'error',
        msg: 'Formaciones',
        description: 'No se pudieron obtener las formaciones disponibles.',
      })
    }
  })

  onUnmounted(() => {
    game.value = {} as Game
    gameStoreInstance.resetPenaltyShootout()
  })
</script>

<template>
  <v-sheet class="game-report-content futzo-rounded" data-testid="game-report-content">
    <v-container class="game-report-content__container">
      <v-row class="game-report-content__row">
        <v-col cols="12">
          <GameDetailsSection :game="game" />
        </v-col>

        <v-col cols="12">
          <div class="game-report-tabs" data-testid="game-report-tabs">
            <button
              class="game-report-tabs__item"
              :class="{ 'game-report-tabs__item--active': tab === 'timeline' }"
              type="button"
              @click="tab = 'timeline'"
            >
              Cronología
            </button>
            <button
              class="game-report-tabs__item"
              :class="{ 'game-report-tabs__item--active': tab === 'lineup' }"
              type="button"
              @click="tab = 'lineup'"
            >
              Alineaciones
            </button>
          </div>
        </v-col>

        <v-col v-if="tab === 'timeline'" cols="12">
          <div class="game-report-content__pane">
            <GameEvents />

            <v-menu v-model="addEventMenu" location="top" offset="8" :close-on-content-click="true">
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  block
                  variant="outlined"
                  color="secondary"
                  rounded="lg"
                  class="game-report-content__add-event"
                  data-testid="game-report-add-event"
                  :disabled="isCompleted"
                >
                  + Agregar evento
                </v-btn>
              </template>

              <v-list density="comfortable" class="game-report-content__menu">
                <v-list-item
                  v-for="action in eventActions"
                  :key="action.value"
                  :title="action.label"
                  data-testid="game-report-add-event-option"
                  @click="openActionDialog(action.value)"
                >
                  <template #prepend>
                    <Icon :name="action.icon" size="16" />
                  </template>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-col>

        <v-col v-else cols="12">
          <LinesupContainer
            show-complete
            is-report
            :home-team="homeTeam"
            :away-team="awayTeam"
            :formations="formations"
            :away-formation="awayFormation"
            :home-formation="homeFormation"
            :home-players="homePlayers"
            :away-players="awayPlayers"
            @update-formation-type="updateDefaultFormationType"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>

  <Dialog
    :model-value="dialogState.show"
    :title="dialogState.title"
    :loading="false"
    :subtitle="dialogState.subtitle"
    icon-name="lucide:clipboard-plus"
    min-height="700"
    width="780px"
    @leaving="dialogState.show = false"
  >
    <template #v-card-text>
      <component :is="currentComponent" />
    </template>

    <template #actions>
      <v-row class="w-100 ma-0">
        <v-col cols="6" class="px-1">
          <v-btn
            variant="outlined"
            block
            color="secondary"
            density="comfortable"
            size="large"
            @click="dialogState.show = false"
          >
            Cerrar
          </v-btn>
        </v-col>
        <v-col cols="6" class="px-1">
          <v-btn
            variant="elevated"
            block
            color="primary"
            density="comfortable"
            size="large"
            :disabled="gameActionFormRequest.disabled"
            :loading="gameActionFormRequest.loading"
            @click="useGameStore().saveEventGameHandler"
          >
            Guardar
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </Dialog>
</template>

<style scoped lang="sass">
  .game-report-content
    border: 1px solid var(--futzo-border)
    background: var(--futzo-surface)

  .game-report-content__container
    padding: 0

  .game-report-content__row
    margin: 0

  .game-report-content__row > [class*="v-col"]
    padding-top: 0
    padding-bottom: 12px

  .game-report-tabs
    display: grid
    grid-template-columns: repeat(2, minmax(0, 1fr))
    gap: 8px
    padding: 4px
    border-radius: 10px
    background: #f2f4f7

  .game-report-tabs__item
    appearance: none
    border: 0
    background: transparent
    border-radius: 8px
    font-size: 13px
    font-weight: 600
    color: var(--futzo-on-surface-muted)
    padding: 9px 12px
    cursor: pointer
    transition: .18s ease

  .game-report-tabs__item--active
    background: var(--futzo-surface)
    color: var(--futzo-on-surface)
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.08)

  .game-report-content__pane
    display: flex
    flex-direction: column
    gap: 12px

  .game-report-content__add-event
    text-transform: none
    font-weight: 600

  .game-report-content__menu
    min-width: 220px

  @media (max-width: 600px)
    .game-report-tabs__item
      font-size: 12px
</style>
