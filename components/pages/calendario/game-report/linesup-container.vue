<script lang="ts" setup>
  import { formations } from '~/utils/constants'
  import PlayerDot from '~/components/pages/calendario/game-report/player-dot.vue'
  import type { Team } from '~/models/Team'
  import type { Formation } from '~/models/Game'
  defineProps({
    showComplete: Boolean,
    home: {
      type: Object as PropType<Team>,
    },
    away: {
      type: Object as PropType<Team>,
    },
  })
  const formation = ref<Formation>(formations.value[0])
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
            item-title="name"
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
      <div class="lineup">
        <div class="zone-1"></div>
        <div class="zone-2"></div>
        <div class="zone-3"></div>
        <div class="zone-4"></div>
        <div class="midfield">
          <div class="row-lineup">
            <div class="players-row-container">
              <PlayerDot />
            </div>
          </div>
          <div class="row-lineup">
            <div class="players-row-container">
              <div class="d-flex justify-center justify-space-around">
                <PlayerDot
                  v-for="item in formation.defenses.length"
                  :key="item"
                />
              </div>
            </div>
          </div>
          <div class="row-lineup">
            <div class="d-flex justify-center justify-space-around">
              <PlayerDot
                v-for="item in formation.midfielders.length"
                :key="item"
              />
            </div>
          </div>
          <div class="row-lineup">
            <div class="d-flex justify-center justify-space-around">
              <PlayerDot
                v-for="item in formation.forwards.length"
                :key="item"
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
      <div class="heading">asdas</div>
    </div>
  </v-sheet>
</template>
<style lang="sass">
  @use '@/assets/scss/components/linesup.sass'
</style>
