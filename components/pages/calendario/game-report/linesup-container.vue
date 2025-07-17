<script lang="ts" setup>
  import PlayerDot from '~/components/pages/calendario/game-report/player-dot.vue'
  import type { Team } from '~/models/Team'
  import type { Formation, FormationPlayer } from '~/models/Game'
  import { getTeamFormation } from '~/http/api/team'
  const { home } = defineProps({
    showComplete: Boolean,
    home: {
      type: Object as PropType<Team>,
    },
    away: {
      type: Object as PropType<Team>,
    },
  })
  const formation = ref<Formation>({} as Formation)
  const goalKeeper = ref<FormationPlayer[]>([] as FormationPlayer[])
  const midfielders = ref<FormationPlayer[]>([] as FormationPlayer[])
  const defenders = ref<FormationPlayer[]>([] as FormationPlayer[])
  const forwards = ref<FormationPlayer[]>([] as FormationPlayer[])
  const updateFormation = (value: Formation) => {
    const _formation = value.formation.split('-')
    const allPlayers = [
      ...goalKeeper.value,
      ...defenders.value,
      ...midfielders.value,
      ...forwards.value,
    ]

    goalKeeper.value = allPlayers.slice(0, 1)
    defenders.value = allPlayers.slice(1, 1 + parseInt(_formation[0]))
    midfielders.value = allPlayers.slice(
      1 + parseInt(_formation[0]),
      1 + parseInt(_formation[0]) + parseInt(_formation[1])
    )
    forwards.value = allPlayers.slice(
      1 + parseInt(_formation[0]) + parseInt(_formation[1]),
      allPlayers.length
    )
  }
  const addPlayer = (id: string) => {
    console.log(id)
  }
  watchEffect(async () => {
    if (home) {
      getTeamFormation(home).then((response: Formation) => {
        goalKeeper.value = response.goalkeeper
        midfielders.value = response.midfielders
        defenders.value = response.defenses
        forwards.value = response.forwards
      })
    }
  })
</script>
<template>
  <v-sheet class="linesup-container">
    <div class="linesup-team-container">
      <div class="heading">
        <v-avatar :image="home?.image" class="mx-4" size="32"></v-avatar>
        <span class="mx-2"> {{ home?.name }}</span>
        <span class="formation">
          <v-select
            :items="formations"
            item-title="formation"
            return-object
            v-model="formation"
            min-width="100"
            densityc="compact"
            variant="plain"
            @update:model-value="updateFormation"
          >
          </v-select
        ></span>
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
                v-for="(player, index) in goalKeeper"
                :key="index"
                :player="player"
                :id="`${player.abbr}-${index + 1}`"
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
                  v-for="(player, index) in defenders"
                  :key="index"
                  :player="player"
                  :id="`${player.abbr}-${index + 1}`"
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
                v-for="(player, index) in midfielders"
                :key="index"
                :player="player"
                :id="`${player.abbr}-${index + 1}`"
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
                v-for="(player, index) in forwards"
                :key="index"
                :player="player"
                :id="`${player.abbr}-${index + 1}`"
                @addPlayer="addPlayer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showComplete" class="line"></div>
    <div v-if="showComplete" class="linesup-team-container">
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
            item-title="formation"
            return-object
            v-model="formation"
            min-width="100"
            densityc="compact"
            center-affix
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
