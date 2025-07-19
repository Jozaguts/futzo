<script lang="ts" setup>
  import { useGameStore } from '~/store'
  import ContentSection from '~/components/pages/calendario/game-report/ContentSection.vue'
  import type { GameDetailsRequest } from '~/models/Game'

  const { game, gameReportDialog, gameDetailsRequest, gamePlayers } =
    storeToRefs(useGameStore())
  const onLeaving = () => {
    gameReportDialog.value = false
    gameDetailsRequest.value = null as unknown as GameDetailsRequest
  }

  watch(
    () => gameDetailsRequest.value?.game_id,
    async (newGameId) => {
      console.log(newGameId)
      console.log({
        game: game.value,
        gameDetailsRequest: gameDetailsRequest.value,
        gamePlayers: gamePlayers.value,
      })
      if (newGameId) {
        const promises = [
          await useGameStore().getGame(),
          await useGameStore().getGameTeamsPlayers(),
        ]
        const [_game, players] = await Promise.all(promises)
        game.value = _game
        gamePlayers.value = players
      }
    },
    { immediate: true }
  )
</script>
<template>
  <Dialog
    title="Acta partido"
    subtitle="Registra los detalles del partido, incluyendo goles, tarjetas y otros eventos importantes."
    :model-value="gameReportDialog"
    @leaving="onLeaving"
    icon-name="uil:schedule"
    min-height="910"
    max-height="910"
    width="800"
  >
    <template #v-card-text>
      <ContentSection />
    </template>
  </Dialog>
</template>
