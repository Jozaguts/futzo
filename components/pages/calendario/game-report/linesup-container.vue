<script lang="ts" setup>
</script>
<template>
  <v-sheet class="linesup-container">
    <div class="linesup-team-container">
      <div class="heading">
        asdas
      </div>
      <div class="lineup">
        <div class="zone-1"></div>
        <div class="zone-2"></div>
        <div class="zone-3"></div>
        <div class="zone-4"></div>
        <div class="pt-6">
          <div class="row-lineup">
            <div class="players-row-container">
              <span class="goal-keeper-container">
               <v-avatar text="1" border="md" color="red" size="32"/>
              </span>
              <div>
                <span class="player-name">
                  <span class="d-inline-block text-truncate" style="max-width: 80px">B. Allan</span>
                </span>
              </div>
            </div>
          </div>
          <div class="row-lineup"></div>
          <div class="row-lineup"></div>
          <div class="row-lineup"></div>
          <div class="row-lineup"></div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="linesup-team-container">
      <div class="lineup">
        <div class="zone-1-away"></div>
        <div class="zone-2-away"></div>
        <div class="zone-3-away"></div>
        <div class="zone-4-away"></div>
      </div>
      <div class="heading">
        asdas
      </div>
    </div>
  </v-sheet>
</template>
<style lang="sass" scoped>
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
  height: 20%

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

  .lineup
    height: 88%
    position: relative
    width: 100%

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
