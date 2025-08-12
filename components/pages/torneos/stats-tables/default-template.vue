<script lang="ts" setup>
  import type { PlayerStats } from '~/models/tournament'
  const { type, data, content } = defineProps<{
    type: String
    data: PlayerStats[]
    content: { title: string; text: string; actioText: string }
  }>()
</script>
<template>
  <section v-if="data.length">
    <header class="mx-6">
      <div class="d-flex justify-space-between px-2">
        <p class="text-body-2 text-medium-emphasis">Jugador</p>
        <p class="text-body-2 text-medium-emphasis">{{ type }}</p>
      </div>
      <v-divider />
    </header>
    <main>
      <v-container>
        <v-row v-for="(stats, index) in data" :key="stats.player_id">
          <v-col>
            <div class="d-flex align-center mx-6">
              <span class="mr-4 text-subtitle-2">{{ index + 1 }}</span>
              <v-avatar :image="stats.user_image" density="compact" size="50" class="mr-2" />
              <div class="d-flex flex-column ml-2">
                <p class="text-subtitle-2">{{ stats.player_name }}</p>
                <div class="d-flex">
                  <v-avatar :image="stats.team_image" density="compact" size="20" class="mr-2" />
                  <span class="text-caption text-medium-emphasis">{{ stats.team_name }}</span>
                </div>
              </div>
              <span class="text-subtitle-2 ml-auto mx-2">{{ stats.total }}</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </main>
  </section>
  <v-empty-state
    v-else
    size="200"
    :title="content.title"
    :text="content.text"
    :action-text="content.actionText"
    image="/junior-soccer.svg"
  >
  </v-empty-state>
</template>
