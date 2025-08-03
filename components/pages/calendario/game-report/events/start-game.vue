<script lang="ts" setup>
  const { time } = defineProps<{
    time: string
  }>()
  const timeFormatted = computed(() => {
    // time like 09:00
    const [hours, minutes] = time.split(':')
    console.log('Time:', time, 'Hours:', hours, 'Minutes:', minutes)
    // add AM or PM based on hours
    const ampm = Number(hours) >= 12 ? 'PM' : 'AM'
    return `${Number(hours) % 12 || 12}:${minutes} ${ampm}`
  })
</script>
<template>
  <div class="event-container">
    <div class="start-icon">
      <Icon name="futzo-icon:stopwatch" size="32" />
    </div>
    <div class="start-game">
      <span class="start-game__left"></span>
      <span class="start-game__text">Inicio</span>
      <span class="start-game__right"></span>
    </div>
    <div class="game-start-details">
      {{ timeFormatted }}
    </div>
  </div>
</template>
<style scoped lang="sass">
  .event-container
    margin-top: 12px
    margin-bottom: 16px
  .start-icon
    overflow: hidden
    position: relative
    display: block
    margin-left: auto
    margin-right: auto
    padding: 8px 8px 4px
    height: 40px
    width: 40px
    span
      width: 100%
      height: 100%
  .start-game
    display: flex
    justify-content: space-between
    &__left, &__right
      height: 2px
      width: 50%
      margin-top: 8px
      background: rgba(0, 0, 0, 0.1)
    &__text
      font-size: 14px
      line-height: 20px
      margin-right: 36px
      margin-left: 36px
      flex-basis: auto
      text-transform: uppercase
  .game-start-details
    opacity: 0.7
    font-size: 12px
    line-height: 16px
    padding: 4px
    text-align: center
    white-space: nowrap
    font-weight: bold
    color: #9e9e9e
    letter-spacing: 0.75px
</style>
