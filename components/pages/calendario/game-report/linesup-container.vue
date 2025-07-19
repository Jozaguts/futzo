<script lang="ts" setup>
  import PlayerDot from '~/components/pages/calendario/game-report/player-dot.vue'
  import type { TeamFormation } from '~/models/Game'
  import { getTeamFormation } from '~/http/api/team'
  import { usePlayerStore, useTeamStore } from '~/store'
  import type { Formation, Team } from '~/models/Team'
  import { sortFormation } from '~/utils/sort-formation'
  const { showComplete, isReport } = defineProps({
    showComplete: Boolean,
    isReport: Boolean,
  })
  const { homeTeam, awayTeam, homeFormation, awayFormation, formations } =
    storeToRefs(useTeamStore())

  watch([homeTeam, awayTeam], async ([newHomeTeam, newAwayTeam]) => {
    if (isReport) return
    if (!!newHomeTeam?.id) {
      getTeamFormation(newHomeTeam as Team).then((response: TeamFormation) => {
        response = sortFormation(response)
        homeFormation.value = response
      })
      await usePlayerStore().getDefaultLineupAvailableTeamPlayers(newHomeTeam)
    }
    if (!!newAwayTeam?.id) {
      getTeamFormation(newAwayTeam as Team).then((response: TeamFormation) => {
        awayFormation.value = response
      })
      await usePlayerStore().getDefaultLineupAvailableTeamPlayers(newAwayTeam)
    }
  })
  const formationDetails = computed(() => {
    return {
      home: formations.value.find(
        (formation) => formation.name === homeFormation.value?.name
      ),
      away: formations.value.find(
        (formation) => formation.name === awayFormation.value?.name
      ),
    }
  })
  const updateFormationType = async (team_id: number, formation_id: number) => {
    await useTeamStore()
      .updateFormationType(team_id, formation_id)
      .then(() => {
        getTeamFormation({ id: team_id } as Team).then(
          (response: TeamFormation) => {
            response = sortFormation(response)
            homeFormation.value = response
          }
        )
      })
  }
  const linesupHeightContainer = computed(() => {
    return showComplete ? '880px' : '100%'
  })
  const linesupTeamHeightContainerStyle = computed(() => {
    return showComplete ? '50%' : '100%'
  })
  onUnmounted(() => {
    homeTeam.value = {} as Team
    awayTeam.value = {} as Team
    homeFormation.value = {} as TeamFormation
    awayFormation.value = {} as TeamFormation
    formations.value = [] as Formation[]
  })
</script>
<template>
  <v-sheet class="linesup-container">
    <div class="linesup-team-container">
      <div class="heading">
        <v-avatar :image="homeTeam?.image" class="mx-4" size="32"></v-avatar>
        <span class="mx-2"> {{ homeTeam?.name }}</span>
        <span v-if="!!homeFormation" class="formation">
          <v-select
            item-title="name"
            min-width="100"
            :items="formations"
            v-model="homeFormation.name"
            densityc="compact"
            variant="plain"
            class="lineup-formation-select"
            item-value="id"
            @update:model-value="
              (value) =>
                updateFormationType(Number(homeTeam?.id), Number(value))
            "
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
                :field_location="Number(formationDetails?.home?.goalkeeper)"
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
                  :field_location="
                    Number(index + 1) +
                    Number(formationDetails?.home?.goalkeeper ?? 0)
                  "
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
                :field_location="
                  Number(index + 1) +
                  Number(formationDetails?.home?.defenses ?? 0) +
                  Number(formationDetails?.home?.goalkeeper ?? 0)
                "
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
                :field_location="
                  Number(index + 1) +
                  Number(formationDetails?.home?.defenses ?? 0) +
                  Number(formationDetails?.home?.midfielders ?? 0) +
                  Number(formationDetails?.home?.goalkeeper ?? 0)
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="linesup-team-container" v-if="showComplete">
      <div class="lineup">
        <div class="zone-1-away"></div>
        <div class="zone-2-away"></div>
        <div class="zone-3-away"></div>
        <div class="zone-4-away"></div>
      </div>
      <div class="heading">
        <v-avatar :image="awayTeam?.image" class="mx-4" size="32"></v-avatar>
        <span class="mx-2"> {{ awayTeam?.name }}</span>
        <span class="formation">
          <v-select
            item-title="name"
            min-width="100"
            :items="formations"
            densityc="compact"
            variant="plain"
            class="lineup-formation-select"
            item-value="id"
            @update:model-value="
              (value) =>
                updateFormationType(Number(awayTeam?.id), Number(value))
            "
          >
          </v-select>
        </span>
      </div>
    </div>
  </v-sheet>
</template>
<style lang="sass">
  @use '@/assets/scss/components/linesup.sass'
  .linesup-container
    height: v-bind(linesupHeightContainer)
  .linesup-team-container
    height: v-bind(linesupTeamHeightContainerStyle)
</style>
