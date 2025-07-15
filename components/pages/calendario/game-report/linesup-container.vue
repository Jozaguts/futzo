<script lang="ts" setup>
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

  const formations = ref<Formation[]>([
    {
      name: '4-4-2',
      defenses: 4,
      midfielders: 4,
      forwards: 2,
    },
    {
      name: '4-3-3',
      defenses: 4,
      midfielders: 3,
      forwards: 3,
    },
    {
      name: '4-5-1',
      defenses: 4,
      midfielders: 5,
      forwards: 1,
    },
    {
      name: '3-5-2',
      defenses: 3,
      midfielders: 5,
      forwards: 2,
    },
    {
      name: '4-1-2-1-2',
      defenses: 4,
      midfielders: 4,
      forwards: 2,
    },
    {
      name: '4-2-3-1',
      defenses: 4,
      midfielders: 5,
      forwards: 1,
    },
    {
      name: '4-4-1-1',
      defenses: 4,
      midfielders: 4,
      forwards: 2,
    },
    {
      name: '4-1-3-2',
      defenses: 4,
      midfielders: 4,
      forwards: 2,
    },
    {
      name: '3-4-3',
      defenses: 3,
      midfielders: 4,
      forwards: 3,
    },
    {
      name: '5-4-1',
      defenses: 5,
      midfielders: 4,
      forwards: 1,
    },
    {
      name: '3-5-1-1',
      defenses: 3,
      midfielders: 5,
      forwards: 1,
    },
    {
      name: '4-1-4-1',
      defenses: 4,
      midfielders: 5,
      forwards: 1,
    },
    {
      name: '4-3-1-2',
      defenses: 4,
      midfielders: 4,
      forwards: 2,
    },
    {
      name: '4-1-2-3',
      defenses: 4,
      midfielders: 5,
      forwards: 1,
    },
    {
      name: '5-3-2',
      defenses: 5,
      midfielders: 3,
      forwards: 2,
    },
  ])
  const formation = ref<Formation>({
    name: '4-4-2',
    defenses: 4,
    midfielders: 4,
    forwards: 2,
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
                <PlayerDot v-for="item in formation.defenses" :key="item" />
              </div>
            </div>
          </div>
          <div class="row-lineup">
            <div class="d-flex justify-center justify-space-around">
              <PlayerDot v-for="item in formation.midfielders" :key="item" />
            </div>
          </div>
          <div class="row-lineup">
            <div class="d-flex justify-center justify-space-around">
              <PlayerDot v-for="item in formation.forwards" :key="item" />
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
  .players-row-container
    top: 50%
    transform: translateY(-50%)
    position: absolute
    width: 100%

    .goal-keeper-container
      width: 100%
      display: inline-block
      text-align: center

    div
      > .player-name
        margin-top: 4px
        width: 98%
        overflow: hidden
        display: inline-block
        text-overflow: ellipsis
        white-space: nowrap
        text-align: center

  .row-lineup
    position: relative
    height: 25%

  .linesup-container
    margin: 0 -16px 0
    font-size: 14px
    height: 880px
    position: relative

    .line
      position: absolute
      width: 100%
      height: 1px
      background-color: rgba(255, 255, 255, .3)
      margin-top: auto
      margin-bottom: auto
      top: 0
      bottom: 0
      z-index: 1
      user-select: none
      font-size: 14px
      white-space: normal

  .linesup-team-container
    color: #fff
    background-color: #34a853
    position: relative
    height: 50%

    .heading
      background-color: #188038
      color: #fff
      font-size: 14px
      height: 12%
      display: flex
      justify-content: start
      align-items: center
      padding: 0 16px
      .formation
        margin-left: auto
        font-weight: 600
        font-size: 16px

    .lineup
      height: 88%
      position: relative
      width: 100%
      .midfield
        height: 100%

  .zone-1
    top: 13.6%
    position: absolute
    border: 2px solid rgba(255, 255, 255, .3)
    border-radius: 48%
    height: 16%
    margin-left: 40%
    width: 20%
    color: #fff

  .zone-2
    background-color: #34a853
    border: 2px solid rgba(255, 255, 255, .3)
    border-top-color: rgba(255, 255, 255, .0)
    position: absolute
    margin-left: 25%
    width: 50%
    height: 25%

  .zone-3
    border: 2px solid rgba(255, 255, 255, .3)
    border-top-color: rgba(255, 255, 255, .0)
    position: absolute
    margin-left: 40%
    width: 20%
    height: 10.3%

  .zone-4
    border: 2px solid rgba(255, 255, 255, .3)
    border-bottom-color: transparent
    border-left-color: transparent
    bottom: 0
    transform: translateY(50%) rotate(-45deg)
    margin-left: 40%
    width: 20%
    height: 0
    padding-top: 20%
    border-radius: 50%
    position: absolute

  .zone-1-away
    border: 2px solid rgba(255, 255, 255, .3)
    border-right-color: transparent
    border-top-color: transparent
    top: 0
    transform: translateY(-50%) rotate(-45deg)
    margin-left: 40%
    width: 20%
    height: 0
    padding-top: 20%
    border-radius: 50%
    position: absolute

  .zone-2-away
    bottom: 13.6%
    position: absolute
    border: 2px solid rgba(255, 255, 255, .3)
    border-radius: 48%
    height: 16%
    margin-left: 40%
    width: 20%

  .zone-3-away
    bottom: 0
    border: 2px solid rgba(255, 255, 255, .3)
    background-color: #34a853
    border-bottom-color: rgba(255, 255, 255, .0)
    position: absolute
    margin-left: 25%
    width: 50%
    height: 25%

  .zone-4-away
    bottom: 0
    border: 2px solid rgba(255, 255, 255, .3)
    border-bottom-color: rgba(255, 255, 255, .0)
    position: absolute
    margin-left: 40%
    width: 20%
    height: 10.3%
</style>
