<script setup lang="ts">
  import type { Tournament } from '~/models/tournament'
  import type { TournamentVerificationOverride } from '~/models/settings'
  import { useToast } from '~/composables/useToast'
  import * as settingsAPI from '~/http/api/settings'

  type TournamentRow = {
    id: number
    name: string
    player_lock_duration_days: number
    verification_override: TournamentVerificationOverride
  }

  const { toast } = useToast()
  const tournamentStore = useTournamentStore()
  const { tournaments } = storeToRefs(tournamentStore)
  const rows = ref<TournamentRow[]>([])
  const loading = ref(false)
  const savingMap = ref<Record<number, boolean>>({})

  const overrideOptions = [
    { value: 'inherit', title: 'Heredar de la liga' },
    { value: 'required', title: 'Requerir CURP' },
    { value: 'not_required', title: 'No requerir' },
  ]

  const toOverride = (value: boolean | null | undefined): TournamentVerificationOverride => {
    if (value === null || value === undefined) return 'inherit'
    return value ? 'required' : 'not_required'
  }

  const buildRows = (data: Tournament[]) => {
    rows.value = data.map((tournament) => ({
      id: tournament.id as number,
      name: tournament.name,
      player_lock_duration_days: Number(tournament.player_lock_duration_days ?? 0),
      verification_override: toOverride(tournament.requires_player_verification),
    }))
  }

  const fetchTournaments = async () => {
    loading.value = true
    try {
      await tournamentStore.fetchTournamentsByLeagueId()
      buildRows(tournaments.value || [])
    } catch (error: any) {
      toast({
        type: 'error',
        msg: 'No se pudieron cargar torneos',
        description: error?.data?.message ?? 'Inténtalo nuevamente.',
      })
    } finally {
      loading.value = false
    }
  }

  const resolveVerificationPayload = (override: TournamentVerificationOverride) => {
    if (override === 'inherit') {
      return { requires_player_verification: null, player_verification_method: null }
    }
    if (override === 'required') {
      return { requires_player_verification: true, player_verification_method: 'curp' }
    }
    return { requires_player_verification: false, player_verification_method: null }
  }

  const saveRow = async (row: TournamentRow) => {
    savingMap.value[row.id] = true
    try {
      await settingsAPI.updatePlayerTransferLock(row.id, Number(row.player_lock_duration_days ?? 0))
      const verificationPayload = resolveVerificationPayload(row.verification_override)
      await settingsAPI.updateTournamentVerificationSettings(row.id, verificationPayload)
      toast({
        type: 'success',
        msg: 'Configuración guardada',
        description: `Se actualizó ${row.name}.`,
      })
      await fetchTournaments()
    } catch (error: any) {
      toast({
        type: 'error',
        msg: 'No se pudo guardar',
        description: error?.data?.message ?? 'Inténtalo nuevamente.',
      })
    } finally {
      savingMap.value[row.id] = false
    }
  }

  onMounted(fetchTournaments)
</script>

<template>
  <v-card class="secondary-card futzo-rounded pa-6">
    <v-card-item class="secondary-card-item">
      <v-card-text class="secondary-card__title">Configuración por torneo</v-card-text>
      <v-card-subtitle class="secondary-card__subtitle">
        Ajusta el bloqueo por tiempo y la verificación de jugadores.
      </v-card-subtitle>
    </v-card-item>
    <v-card-text class="pt-6">
      <v-alert v-if="loading" type="info" variant="tonal" class="mb-4">Cargando torneos...</v-alert>
      <div v-if="!loading && rows.length === 0" class="text-body-2 text-medium-emphasis">
        No hay torneos disponibles.
      </div>
      <div v-else class="d-flex flex-column ga-4">
        <v-card
          v-for="row in rows"
          :key="row.id"
          variant="outlined"
          class="pa-4 futzo-rounded"
        >
          <div class="d-flex flex-column flex-md-row ga-4 align-center justify-space-between">
            <div class="flex-grow-1">
              <p class="text-subtitle-2 mb-1">{{ row.name }}</p>
              <p class="text-body-2 text-medium-emphasis">Configura bloqueo y verificación para este torneo.</p>
            </div>
            <div class="d-flex flex-column flex-sm-row ga-3 align-center">
              <v-text-field
                v-model.number="row.player_lock_duration_days"
                type="number"
                min="0"
                density="compact"
                variant="outlined"
                label="Bloqueo (días)"
                style="max-width: 150px"
              />
              <v-select
                v-model="row.verification_override"
                :items="overrideOptions"
                item-title="title"
                item-value="value"
                density="compact"
                variant="outlined"
                label="Verificación"
                style="min-width: 200px"
              />
              <v-btn
                color="primary"
                variant="elevated"
                :loading="savingMap[row.id]"
                @click="saveRow(row)"
              >
                Guardar
              </v-btn>
            </div>
          </div>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>
