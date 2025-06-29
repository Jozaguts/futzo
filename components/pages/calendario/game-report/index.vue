<script lang="ts" setup>
import {useGameStore} from "~/store";
import HeaderSection from "~/components/pages/calendario/game-report/header-section.vue";
import ContentSection from "~/components/pages/calendario/game-report/ContentSection.vue";
import type {GameDetailsRequest} from "~/models/Game";

const {game, gameReportDialog, gameId, gameDetailsRequest} = storeToRefs(useGameStore())
const onLeaving = () => {
  gameReportDialog.value = false
  gameDetailsRequest.value = null as unknown as GameDetailsRequest
  gameId.value = null as unknown as number
}

watch(() => gameId.value, async (newGameId) => {
  if (newGameId) {
    game.value = await useGameStore().getGame()
  }
}, {immediate: true})
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
      <v-container class="futzo-rounded">
        <HeaderSection :game="game"/>
        <ContentSection :game="game"/>
      </v-container>
    </template>
  </Dialog>
</template>