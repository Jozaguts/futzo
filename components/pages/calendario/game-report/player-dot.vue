<script lang="ts" setup>
  import PlayersMenu from '~/components/pages/calendario/game-report/players-menu.vue'
  import type { FormationPlayer, TeamFormation } from '~/models/Game'
  import type { TeamLineupAvailablePlayers } from '~/models/Player'
  import { usePlayerStore } from '~/store'
  import { getTeamFormation } from '~/http/api/team'
  import type { Team } from '~/models/Team'
  import { sortFormation } from '~/utils/sort-formation'
  const { isReport, players, isHomeTeam, field_location, player } =
    defineProps<{
      player: FormationPlayer
      field_location: number
      isReport: Boolean
      players: Array<TeamLineupAvailablePlayers>
      isHomeTeam: Boolean
    }>()
  const addPlayer = async (newPlayer: TeamLineupAvailablePlayers) => {
    if (!isReport) {
      if (player.default_lineup_player_id) {
        await usePlayerStore().updateDefaultLineup(
          newPlayer,
          player,
          field_location
        )
      } else {
        await usePlayerStore().addDefaultLineupPlayer(newPlayer, field_location)
      }
    } else {
      if (player.lineup_player_id) {
        await usePlayerStore().updateLineup(newPlayer, player, field_location)
      } else {
        await usePlayerStore().addLineupPlayer(newPlayer, field_location)
      }
    }
  }
</script>
<template>
  <div class="dot-container">
    <div class="dot-player-container">
      <v-menu max-height="250" location="start">
        <template v-slot:activator="{ props }">
          <v-btn
            staked
            v-bind="props"
            icon
            size="40"
            border="lg"
            :color="!!player.name ? 'primary' : 'secondary'"
            :readonly="!!player.name"
          >
            <v-badge
              v-bind="props"
              offset-x="-10"
              offset-y="-10"
              location="top end"
              color="info"
              :model-value="!!player.name"
            >
              <template #badge>
                <Icon name="tabler:switch-vertical"></Icon>
              </template>
              {{ !!player.name ? player.number : '+' }}</v-badge
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
      <Icon
        name="futzo-icon:dot-player-yellow-card"
        class="dot-player-card"
        mode="svg"
        size="24"
        v-if="
          player?.cards?.yellow &&
          !player?.cards?.red &&
          !player?.cards?.doble_yellow_card
        "
      />
      <Icon
        name="futzo-icon:dot-player-red-card"
        class="dot-player-card"
        mode="svg"
        size="24"
        v-if="player?.cards?.red || player?.cards?.doble_yellow_card"
      />
      <Icon
        name="futzo-icon:dot-player-out"
        class="dot-player-out"
        mode="svg"
        size="24"
        v-if="player?.substituted"
      />
      <Icon
        name="futzo-icon:dot-player-goal"
        class="dot-player-goal"
        mode="svg"
        size="24"
        v-if="player?.goals && player?.goals > 0"
      />
    </div>
    <div>
      <span class="player-name">
        <span class="d-inline-block text-truncate" style="max-width: 80px">{{
          player?.name
        }}</span>
      </span>
    </div>
  </div>
</template>
