<script lang="ts" setup>
  import PlayersMenu from '~/components/pages/calendario/game-report/players-menu.vue'
  import type { FormationPlayer } from '~/models/Game'
  defineProps<{
    player: FormationPlayer
    field_location: number
    isReport: Boolean
  }>()
</script>
<template>
  <div class="dot-container">
    <div class="dot-player-container">
      <PlayersMenu
        :isReport="isReport"
        icon="tabler:switch-vertical"
        :number="player.number"
        :field_location="field_location"
        :current-player="player"
      />
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
