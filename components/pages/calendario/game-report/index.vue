<script lang="ts" setup>
  import { useGameStore } from '~/store'
  import ContentSection from '~/components/pages/calendario/game-report/ContentSection.vue'
  import type { GameDetailsRequest } from '~/models/Game'

  const { gameReportDialog, gameDetailsRequest, game } = storeToRefs(useGameStore())
  const onLeaving = () => {
    gameReportDialog.value = false
    gameDetailsRequest.value = null as unknown as GameDetailsRequest
  }

  watch(
    () => gameDetailsRequest.value?.game_id,
    async (newGameId) => {
      if (newGameId) {
        await useGameStore().getGameDetails()
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
    min-height="95vh"
    max-height="95vh"
    width="800"
  >
    <template #v-card-text>
      <ContentSection />
    </template>
    <template #actions>
      <v-container class="py-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              :disabled="game?.status === 'completado'"
              text="Marcar como finalizado"
              variant="outlined"
              block
              @click="useGameStore().markAsComplete"
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </Dialog>
</template>
