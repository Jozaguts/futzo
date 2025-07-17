<script lang="ts" setup>
  import PlayerDot from '~/components/pages/calendario/game-report/player-dot.vue'
  import type { Team } from '~/models/Team'
  import type { Formation, FormationPlayer } from '~/models/Game'
  import { getTeamFormation } from '~/http/api/team'
  import type { Player } from '~/models/Player'
  import { usePlayerStore } from '~/store'
  const { home, away } = defineProps({
    showComplete: Boolean,
    home: {
      type: Object as PropType<Team>,
    },
    away: {
      type: Object as PropType<Team>,
    },
  })
  const homeFormation = ref<Formation>()
  const awayFormation = ref<Formation>()
  const addPlayer = (playerData: Partial<Player>) => {
    const abbr = String(playerData?.id).split('-')[0]
    const position = String(playerData?.id).split('-')[1] // posicion donde quieor que se agrege el jugador dentro del array ejemplo si postion es 1 se colocarion en  en position 2[1,'aqui']
    const player = {
      abbr: playerData?.player.position,
      number: playerData?.player.number,
      name: playerData?.player?.name,
      goals: 0,
      cards: {
        red: false,
        yellow: false,
        doble_yellow_card: false,
      },
      substituted: false,
    } as FormationPlayer
    if (abbr === 'GP') {
      homeFormation.value?.goalkeeper.splice(Number(position) - 1, 1, player)
    } else if (abbr === 'DF') {
      homeFormation.value?.defenses.splice(Number(position) - 1, 1, player)
    } else if (abbr === 'MD') {
      homeFormation.value?.midfielders.splice(Number(position) - 1, 1, player)
    } else if (abbr === 'FW') {
      homeFormation.value?.forwards.splice(Number(position) - 1, 1, player)
    }
  }
  watchEffect(async () => {
    if (home) {
      getTeamFormation(home).then((response: Formation) => {
        home?.id === response.team_id
          ? (homeFormation.value = response)
          : (awayFormation.value = response)
      })
      if (!!home) {
        await usePlayerStore().getDefaultLineupAvailableTeamPlayers(home)
      }
    }
  })
</script>
<template>
  <v-sheet class="linesup-container">
    <div class="linesup-team-container">
      <div class="heading">
        <v-avatar :image="home?.image" class="mx-4" size="32"></v-avatar>
        <span class="mx-2"> {{ home?.name }}</span>
        <span v-if="!!homeFormation" class="formation">
          <v-select
            item-title="name"
            min-width="100"
            v-model="homeFormation.name"
            densityc="compact"
            variant="plain"
          >
          </v-select>
        </span>
      </div>
      <div class="lineup">
        <div class="zone-1"></div>
        <div class="zone-2"></div>
        <div class="zone-3"></div>
        <div class="zone-4"></div>
        <div class="midfield">
          <div class="row-lineup">
            <div class="players-row-container">
              <PlayerDot
                v-for="(player, index) in homeFormation?.goalkeeper"
                :key="index"
                :player="player"
                :id="`GP-${index + 1}`"
                @addPlayer="addPlayer"
              />
            </div>
          </div>
          <div class="row-lineup">
            <div class="players-row-container">
              <div
                class="d-flex justify-center justify-space-around"
                v-auto-animate
              >
                <PlayerDot
                  v-for="(player, index) in homeFormation?.defenses"
                  :key="index"
                  :player="player"
                  :id="`DF-${index + 1}`"
                  @addPlayer="addPlayer"
                />
              </div>
            </div>
          </div>
          <div class="row-lineup">
            <div
              class="d-flex justify-center justify-space-around"
              v-auto-animate
            >
              <PlayerDot
                v-for="(player, index) in homeFormation?.midfielders"
                :key="index"
                :player="player"
                :id="`MD-${index + 1}`"
                @addPlayer="addPlayer"
              />
            </div>
          </div>
          <div class="row-lineup">
            <div
              class="d-flex justify-center justify-space-around"
              v-auto-animate
            >
              <PlayerDot
                v-for="(player, index) in homeFormation?.forwards"
                :key="index"
                :player="player"
                :id="`FW-${index + 1}`"
                @addPlayer="addPlayer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!!away" class="line"></div>
    <div v-if="!!away" class="linesup-team-container">
      <div class="lineup">
        <div class="zone-1-away"></div>
        <div class="zone-2-away"></div>
        <div class="zone-3-away"></div>
        <div class="zone-4-away"></div>
      </div>
      <div class="heading">
        <v-avatar :image="away?.image" class="mx-4" size="32"></v-avatar>
        <span class="mx-2"> {{ away?.name }}</span>
        <span class="formation">
          <v-select
            :items="formations"
            item-title="name"
            return-object
            v-model="awayFormation"
            min-width="100"
            densityc="compact"
            variant="plain"
          >
          </v-select>
        </span>
      </div>
    </div>
  </v-sheet>
</template>
<style lang="sass">
  @use '@/assets/scss/components/linesup.sass'
</style>
