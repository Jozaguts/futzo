<script lang="ts" setup>
  import type { FormationPlayer } from '~/models/Game'
  import type { Player } from '~/models/Player'
  defineProps<{
    player: FormationPlayer
    id: String
    players: Player[]
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
      <v-menu v-else max-height="150" location="start">
        <template v-slot:activator="{ props }"
          ><v-btn
            v-bind="props"
            icon
            density="compact"
            border="md"
            @click="$emit('addPlayer', id)"
            >+</v-btn
          >
        </template>
        <v-list density="compact" variant="text">
          <v-list-item
            v-for="(item, index) in players"
            :key="index"
            :value="item.id"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
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
