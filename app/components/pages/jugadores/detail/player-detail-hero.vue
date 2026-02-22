<script setup lang="ts">
import type {Team} from '~/models/Team'
import InitialsAvatar from '~/components/shared/InitialsAvatar.vue'

type HeroMetaItem = {
  label: string
  value: string
}

defineProps<{
  avatar: string
  initials: string
  playerFullName: string
  positionLabel: string
  playerTeams: Team[]
  teamCategoryLabel: string
  heroMeta: HeroMetaItem[]
}>()

const emit = defineEmits<{
  (event: 'back'): void
}>()

const goBack = () => emit('back')
</script>

<template>
  <v-card class="player-hero futzo-rounded" variant="flat" data-testid="jugador-detail-hero">
    <div class="player-hero__info">
      <InitialsAvatar size="84" rounded="lg" :image="avatar" :name="playerFullName" :initials="initials" />
      <div>
        <p class="text-overline text-medium-emphasis mb-1">Ficha del jugador</p>
        <h2 class="text-h5 mb-1 text-truncate d-inline-block w-lg-100 w-md-100 w-75">
          {{ playerFullName || 'Sin nombre registrado' }}
        </h2>
        <p class="text-body-2 text-medium-emphasis mb-2">
          {{ positionLabel }}
          <template v-if="playerTeams.length && playerTeams[0]?.name">
            · {{ playerTeams[0]?.name }}
          </template>
        </p>
        <div class="d-flex flex-wrap ga-2">
          <v-chip v-if="playerTeams.length" color="primary" variant="tonal" size="small" class="mr-2">
            {{ playerTeams[0]?.name }}
          </v-chip>
          <v-chip v-if="teamCategoryLabel" color="secondary" variant="tonal" size="small">
            {{ teamCategoryLabel }}
          </v-chip>
        </div>
      </div>
    </div>
    <div class="player-hero__meta">
      <div v-for="meta in heroMeta" :key="meta.label" class="player-hero__meta-item">
        <p>{{ meta.label }}</p>
        <span>{{ meta.value }}</span>
      </div>
      <v-btn color="primary" variant="outlined" size="small" prepend-icon="mdi-arrow-left" @click="goBack">
        Volver
      </v-btn>
    </div>
  </v-card>
</template>
