<script setup lang="ts">
  import GameDetailsSection from '~/components/pages/calendario/game-report/game-details-section.vue'
  import SubstitutionsForm from '~/components/pages/calendario/game-report/sections/forms/substitutions.vue'
  import { useGameStore } from '~/store'
  const { game, headAndSubsGamePlayers } = storeToRefs(useGameStore())
  const tab = ref(game.value.home.id)

  onMounted(async () => {
    await useGameStore().getHeadAndSubsGamePlayers()
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
            <SubstitutionsForm
              :headlines="headAndSubsGamePlayers?.home?.headlines"
              :substitutes="headAndSubsGamePlayers?.home?.substitutes"
            />
          </v-tabs-window-item>
          <v-tabs-window-item :value="game.away.id" transition="fade-transition" reverse-transition="fade-transition">
            <SubstitutionsForm
              :headlines="headAndSubsGamePlayers?.away?.headlines"
              :substitutes="headAndSubsGamePlayers?.away?.substitutes"
            />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>
  </v-container>
</template>
