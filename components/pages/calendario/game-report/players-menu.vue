<script lang="ts" setup>
  import { usePlayerStore, useTeamStore } from '~/store'
  import type { TeamLineupAvailablePlayers } from '~/models/Player'
  import type { TeamFormation, FormationPlayer } from '~/models/Game'
  import { getTeamFormation } from '~/http/api/team'
  import type { Team } from '~/models/Team'
  import { sortFormation } from '~/utils/sort-formation'
  const { homeFormation } = storeToRefs(useTeamStore())
  const { icon, field_location, number, currentPlayer, isReport } =
    defineProps<{
      icon: string
      number: number
      field_location: number
      currentPlayer: FormationPlayer
      isReport: Boolean
    }>()
  const emits = defineEmits(['updatePlayerList'])
</script>
<template>
  <v-menu max-height="250" location="start">
    <template v-slot:activator="{ props }">
      <v-btn
        staked
        v-bind="props"
        icon
        size="40"
        border="lg"
        :color="!!currentPlayer.name ? 'primary' : 'secondary'"
        :readonly="!!currentPlayer.name"
      >
        <v-badge
          v-bind="props"
          offset-x="-10"
          offset-y="-10"
          location="top end"
          color="info"
          :model-value="!!currentPlayer.name"
        >
          <template #badge>
            <Icon :name="icon"></Icon>
          </template>
          {{ !!currentPlayer.name ? number : '+' }}</v-badge
        >
      </v-btn>
    </template>
    <v-list density="compact">
      <v-list-item
        v-for="(player, index) in players"
        :key="index"
        :value="player"
        @click="addPlayer(player)"
      >
        <v-list-item-title
          >{{ player?.name }} | {{ player?.position }}</v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-menu>
</template>
