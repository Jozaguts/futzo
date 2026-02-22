<script setup lang="ts">
import type {Team} from '~/models/Team'
import type {Tournament} from '~/models/tournament'
import InitialsAvatar from '~/components/shared/InitialsAvatar.vue'

defineProps<{
  playerTeams: Team[]
  tournamentList: Tournament[]
  formatDate: (value?: string | Date | null) => string
}>()
</script>

<template>
  <v-card class="detail-card futzo-rounded" variant="flat">
    <div class="detail-card__header">
      <div>
        <h3 class="text-subtitle-1 mb-1">Equipos</h3>
        <p class="text-body-2 text-medium-emphasis">Historial de equipos vinculados.</p>
      </div>
    </div>
    <div v-if="playerTeams.length" class="player-lists">
      <div v-for="team in playerTeams" :key="team.id" class="player-list-item">
        <div>
          <p class="mb-1 text-body-1 font-weight-medium">{{ team.name }}</p>
          <p class="text-body-2 text-medium-emphasis mb-0">
            {{ team.category?.name ?? 'Sin categoría' }}
            <span v-if="team.tournament?.name"> · {{ team.tournament?.name }}</span>
          </p>
        </div>
        <InitialsAvatar size="36" :name="team.name" :image="team.image" :fallback-color="team?.colors?.home?.primary" />
      </div>
    </div>
    <div v-else class="player-empty">Este jugador aún no tiene equipos registrados.</div>
  </v-card>

  <v-card class="detail-card futzo-rounded" variant="flat">
    <div class="detail-card__header">
      <div>
        <h3 class="text-subtitle-1 mb-1">Torneos</h3>
        <p class="text-body-2 text-medium-emphasis">Participaciones reportadas por la liga.</p>
      </div>
    </div>
    <div v-if="tournamentList.length" class="player-lists">
      <div v-for="tournament in tournamentList" :key="tournament.id" class="player-list-item">
        <div>
          <p class="mb-1 text-body-1 font-weight-medium">{{ tournament.name }}</p>
          <p class="text-body-2 text-medium-emphasis mb-0">
            {{ tournament.category?.name ?? 'Sin categoría' }}
            <span v-if="tournament.start_date"> · {{ formatDate(tournament.start_date) }}</span>
          </p>
        </div>
        <v-chip variant="tonal" color="primary" size="small" class="text-uppercase">
          {{ tournament.status ?? 'En curso' }}
        </v-chip>
      </div>
    </div>
    <div v-else class="player-empty">No tenemos torneos asociados a este jugador todavía.</div>
  </v-card>
</template>
