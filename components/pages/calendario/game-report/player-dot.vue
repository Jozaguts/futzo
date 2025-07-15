<script lang="ts" setup>
  import type { FormationPlayer } from '~/models/Game'
  defineProps<{
    player: FormationPlayer
    id: String
  }>()
  const emits = defineEmits(['addPlayer'])
</script>
<template>
  <div class="dot-container">
    <span class="dot-player-container">
      <v-avatar
        :text="player?.number?.toString()"
        size="32"
        border="lg"
        color="red"
        v-if="player?.name"
      />
      <v-btn icon density="compact" border="md" @click="$emit('addPlayer', id)">
        +
      </v-btn>
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
    </span>
    <div>
      <span class="player-name">
        <span class="d-inline-block text-truncate" style="max-width: 80px">{{
          player?.name
        }}</span>
      </span>
    </div>
  </div>
</template>
