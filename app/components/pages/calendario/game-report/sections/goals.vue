<script setup lang="ts">
  import GameDetailsSection from '~/components/pages/calendario/game-report/game-details-section.vue'
  import GoalsForm from '~/components/pages/calendario/game-report/sections/forms/goals.vue'
  const { game, gamePlayers, gameEvents } = storeToRefs(useGameStore())
  const tab = ref(game.value.home.id)

  onMounted(async () => {
    gamePlayers.value = await useGameStore().getGameTeamsPlayers()
    if (gamePlayers.value.home.goals.length > 0) {
      gameEvents.value.home = gamePlayers.value.home.goals
    }
    if (gamePlayers.value.away.goals.length > 0) {
      gameEvents.value.away = gamePlayers.value.away.goals
    }
  })
</script>
<template>
  <v-container>
    <v-row>
      <GameDetailsSection :game />
      <v-col cols="12">
        <v-tabs align-tabs="center" v-model="tab" class="bg-background" grow>
          <v-tab class="text-uppercase" :value="game.home.id">{{ game.home.name }}</v-tab>
          <v-tab class="text-uppercase" :value="game.away.id">{{ game.away.name }}</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab" class="mt-4">
          <v-tabs-window-item :value="game.home.id" transition="fade-transition" reverse-transition="fade-transition">
            <GoalsForm :players="gamePlayers?.home?.players" v-model:events="gameEvents.home" />
          </v-tabs-window-item>
          <v-tabs-window-item :value="game.away.id" transition="fade-transition" reverse-transition="fade-transition">
            <GoalsForm :players="gamePlayers?.away?.players" v-model:events="gameEvents.away" />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>
  </v-container>
</template>
