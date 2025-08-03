<script lang="ts" setup>
  import type { GameEvents } from '~/models/Game'

  const { event } = defineProps<{ event: GameEvents }>()
  const eventType = computed(() => {
    return event.type === 'yellow_card' ? 'Tarjeta Amarilla' : 'Tarjeta Roja'
  })
</script>

<template>
  <v-card class="futzo-rounded">
    <v-card-item>
      <template #prepend>
        <Icon name="futzo-icon:yellow-card" mode="svg" size="32"></Icon>
      </template>
      <template #title>
        <div class="event-title-container">
          <span class="event-title-container__title">{{ eventType }}</span>
          <span> {{ event.minute }}'</span>
        </div>
      </template>
    </v-card-item>
    <v-divider />
    <v-card-text>
      <div class="event-details-container">
        <div class="event-details-container__details">
          <div class="event-details-container__details__player">
            <div class="event-details-container__details__player__player-name">
              {{ event?.player.user.name }} {{ event.player?.user?.last_name }}
            </div>
            <div class="event-details-container__details__player__player-details">
              {{ event?.team?.name }}· {{ event?.player?.position?.name }} #{{ event?.player?.number }}
            </div>
          </div>
          <div class="event-details-container__details__team-image">
            <v-img :src="event?.team?.image" width="48" height="47" contain rounded="lg" border="lg"> </v-img>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<style scoped lang="sass">
  .event-title-container
    display: flex
    justify-content: space-between
    align-items: center
    flex-grow: 1
    padding: 8px 8px 8px 0
    &__title
      flex-grow: 1
      text-transform: uppercase
      font-weight: bold
      font-size: 12px
      letter-spacing: 0.75px
      line-height: 16px
  .event-details-container
    padding: 16px 0
    &__details
      display: flex
      justify-content: space-between
      align-items: center
      &__team-image
        margin-left: 16px
        margin-right: 16px
      &__player
        margin-left: 16px
        margin-right: 16px
        overflow: hidden
        &__player-name
          max-width: 100%
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        &__player-details
          display: flex
          flex-direction: row
          align-items: center
          max-width: 100%
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
          color: #9e9e9e
</style>
