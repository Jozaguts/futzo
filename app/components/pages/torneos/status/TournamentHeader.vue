<script setup lang="ts">
  import type { PublicTournamentHeader } from '~/models/PublicTournament'
  import { useDisplay } from 'vuetify'
  const { isAuthenticated } = useSanctumAuth()
  const { mobile } = useDisplay()

  const props = defineProps<{
    header: PublicTournamentHeader
    showShare?: boolean
    shareLoading?: boolean
  }>()
  const emit = defineEmits<{
    (e: 'share', value: 'link' | 'qr'): void
  }>()
  const route = computed(() => {
    return isAuthenticated.value ? '/dashboard' : '/'
  })
  const shareModel = ref<string | null>(null)
  const shareOptions = [
    { title: 'Enlace', value: 'link' },
    { title: 'QR', value: 'qr' },
  ]
  const onShareChange = (value: 'link' | 'qr' | null) => {
    if (!value) return
    emit('share', value)
    shareModel.value = null
  }
</script>

<template>
  <v-card class="pa-6 futzo-rounded" variant="outlined">
    <div class="d-flex flex-column flex-md-row align-center justify-space-between ga-4">
      <div class="d-flex align-center ga-4">
        <v-avatar image="/images/futzo-icon.png" size="64" @click="$router.push(route)"> </v-avatar>
        <div>
          <div class="text-h5 font-weight-bold">{{ header.name }}</div>
          <div class="d-flex align-center ga-2 mt-1">
            <v-chip size="small" variant="tonal" color="primary">{{ header.tournamentName }}</v-chip>
          </div>
        </div>
      </div>
      <div class="d-flex flex-wrap align-center justify-end ga-4 text-body-2 text-medium-emphasis">
        <div class="d-flex align-center ga-2">
          <Icon name="mdi-calendar" size="18" />
          <span>Inicio: {{ header.startDate }}</span>
        </div>
        <div class="d-flex align-center ga-2">
          <Icon name="mdi-account-group" size="18" />
          <span>{{ header.teams }} equipos</span>
        </div>
        <v-select
          v-if="props.showShare && !mobile"
          v-model="shareModel"
          class="share-select"
          label="Compartir"
          :items="shareOptions"
          item-title="title"
          item-value="value"
          variant="outlined"
          :loading="props.shareLoading"
          hide-details
          density="compact"
          @update:model-value="onShareChange"
        />
      </div>
    </div>
  </v-card>
</template>
<style scoped>
  .share-select {
    min-width: 160px;
  }
</style>
