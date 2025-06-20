<script lang="ts" setup>
import type {Game} from "~/models/Game";
import InfoHeaderSection from "~/components/pages/calendario/game-report/info-header-section.vue";

type Props = {
  game?: Game
}
defineProps<Props>()
</script>
<template>
  <v-row>
    <v-col cols="3">
      <info-header-section :text="game?.details?.tournament" label="Torneo"/>
    </v-col>
    <v-col cols="3">
      <info-header-section :text="game?.round.toString()" label="Jornada"/>
    </v-col>
    <v-col cols="3">
      <info-header-section :text="game?.details?.field.name" label="Campo"/>
    </v-col>
    <v-col cols="3">
      <info-header-section :text="`${game?.details?.date} ${game?.details?.raw_time}`" label="Horario"/>
    </v-col>
  </v-row>
</template>