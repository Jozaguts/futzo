<script lang="ts" setup>
import {useGameStore} from "~/store";
import HeaderSection from "~/components/pages/calendario/game-report/header-section.vue";
import ContentSection from "~/components/pages/calendario/game-report/ContentSection.vue";

type Props = {
  gameId: number
}
const props = defineProps<Props>()
const show = defineModel('show', {default: false})
const {game} = storeToRefs(useGameStore())
const onLeaving = () => {
  show.value = false
  // Reset any necessary state or perform cleanup here
}

watch(() => props.gameId, async (newGameId) => {
  if (newGameId) {
    await useGameStore().fetchGame(newGameId)
    if (game.value) {

    }
  }
}, {immediate: true})


</script>
<template>
  <Dialog
      title="Acta partido"
      subtitle="Registra los detalles del partido, incluyendo goles, tarjetas y otros eventos importantes."
      :model-value="show"
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