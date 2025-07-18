<script lang="ts" setup>
  import { usePlayerStore, useTeamStore } from '~/store'
  import type { TeamLineupAvailablePlayers } from '~/models/Player'
  import type { Formation, FormationPlayer } from '~/models/Game'
  import { getTeamFormation } from '~/http/api/team'
  import type { Team } from '~/models/Team'
  import { sortFormation } from '~/utils/sort-formation'
  const { defaultLineupAvailableTeamPlayers } = storeToRefs(usePlayerStore())
  const { homeFormation, awayFormation } = storeToRefs(useTeamStore())
  const { icon, field_location, number, currentPlayer } = defineProps<{
    icon: string
    number: number
    field_location: number
    currentPlayer: FormationPlayer
  }>()
  const addPlayer = async (player: TeamLineupAvailablePlayers) => {
    if (currentPlayer.default_lineup_player_id) {
      await usePlayerStore().updateDefaultLineup(
        player,
        currentPlayer,
        field_location
      )
    } else {
      await usePlayerStore().addDefaultLineupPlayer(player, field_location)
    }

    getTeamFormation({ id: player.team_id } as Team).then(
      (response: Formation) => {
        response = sortFormation(response)
        homeFormation.value = response
      }
    )
  }
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
        v-for="(player, index) in defaultLineupAvailableTeamPlayers"
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
