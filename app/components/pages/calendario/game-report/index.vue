<script lang="ts" setup>
import ContentSection from '~/components/pages/calendario/game-report/ContentSection.vue'
import type { GameDetailsRequest } from '~/models/Game'

const gameStore = useGameStore()
const { gameReportDialog, gameDetailsRequest, game } = storeToRefs(gameStore)
const completing = ref(false)
const completeButtonLabel = computed(() =>
  game.value?.status === 'completado' ? 'Partido finalizado' : 'Marcar como finalizado'
)

  const onLeaving = () => {
    gameReportDialog.value = false
    gameDetailsRequest.value = null as unknown as GameDetailsRequest
  }

  watch(
    () => gameDetailsRequest.value?.game_id,
    async (newGameId) => {
      if (newGameId) {
        await gameStore.getGameDetails()
      }
    },
    { immediate: true }
  )

  const markAsCompletedHandler = async () => {
    if (game.value?.status === 'completado') {
      return
    }
    completing.value = true
    try {
      await gameStore.markAsComplete()
      gameReportDialog.value = false
    } finally {
      completing.value = false
    }
  }
</script>
<template>
  <Dialog
    title="Acta de partido"
    subtitle="Registra goles, tarjetas y eventos del partido."
    :model-value="gameReportDialog"
    @leaving="onLeaving"
    icon-name="lucide:calendar-days"
    min-height="90vh"
    width="720px"
    data-testid="game-report-dialog"
  >
    <template #v-card-text>
      <ContentSection />
    </template>
    <template #actions>
      <div class="game-report-dialog__actions">
        <v-btn
          :disabled="game?.status === 'completado' || completing"
          :loading="completing"
          :text="completeButtonLabel"
          variant="outlined"
          block
          @click="markAsCompletedHandler"
        />
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="sass">
  .game-report-dialog__actions
    width: 100%
    border-top: 1px solid #eaecf0
    padding-top: 4px
</style>
