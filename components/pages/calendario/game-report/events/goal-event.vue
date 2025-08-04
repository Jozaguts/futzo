<script lang="ts" setup>
  import type { GameEvents } from '~/models/Game'

  const { event } = defineProps<{ event: GameEvents }>()
  const eventType = computed(() => {
    return event.type === 'goal'
      ? '¡GOOOOL!'
      : event.type === 'own_goal'
        ? 'Autogol'
        : event.type === 'penalty_kick'
          ? 'Penal'
          : 'Gol'
  })
  const textColor = computed(() => {
    const [r, g, b] = event.team?.rgba_color
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luminance > 128 ? 'black' : 'white'
  })
  const itemContainerColor = computed(() => {
    return event.team?.colors.home.primary
  })
</script>
<template>
  <v-card class="futzo-rounded">
    <div class="event-main-container">
      <div class="item-container">
        <div class="img-container">
          <Icon name="futzo-icon:event-goal" mode="svg" size="32"></Icon>
        </div>
        <div class="event-title">
          <span>{{ eventType }}</span>
        </div>
        <div class="event-subtitle">
          <span> {{ event.minute }}'</span>
        </div>
      </div>
      <div class="event-score-container">
        <div class="home-score-container">
          <div class="home">Cruz Azul</div>
          <div class="score">0</div>
        </div>
        <div class="separator">-</div>
        <div class="away-score-container">
          <div class="score">7</div>
          <div class="away">Seattle Sounders</div>
        </div>
      </div>
    </div>
    <div class="event-player-details">
      <div class="player-details">
        <p class="name">{{ event.player.user.name }}</p>
        <p class="details">
          <span>{{ event.team.name }}</span> · <span>{{ event.player.position.name }}</span> #<span>{{
            event.player.number
          }}</span>
        </p>
        <p class="details">Asistió: {{ event?.related_player?.user?.name }}</p>
      </div>
      <div class="team-details">
        <v-img :src="event?.team?.image" width="48" height="47" contain rounded="lg" border="lg"> </v-img>
      </div>
    </div>
  </v-card>
</template>
<style scoped lang="sass">
    .event-main-container
      background-color: v-bind(itemContainerColor)
      .event-score-container
        display: flex
        background-color: rgba(255, 255, 255, 0.16)
        padding: 12px 0
        color: v-bind(textColor)
        > .home-score-container, > .away-score-container
          flex: 1 1 50%
          display: flex
        > .home-score-container
          justify-content: flex-end
          > .score
            margin: 0 8px
        > .away-score-container
          justify-content: flex-start
          > .score
            margin: 0 8px
        > .separator
          opacity: 0.7
      .item-container
        text-align: center
        background: v-bind(itemContainerColor)
        color: v-bind(textColor)
      .img-container
        padding: 16px 0 8px 0
        position: relative
        overflow: hidden
        display: block
        margin-left: auto
        margin-right: auto
    .event-player-details
      display: flex
      justify-content: space-between
      align-items: center
      > .player-details
        padding: 16px 0
        overflow: hidden
        > .details
          color: #9e9e9e
          font-size: 14px
        > p
          margin: 0 16px
        >.name
          font-size: 16px
          padding-top: 4px
  .team-details
    margin: 0 32px
</style>
