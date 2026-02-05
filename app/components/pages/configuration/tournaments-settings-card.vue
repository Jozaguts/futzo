<script setup lang="ts">
import type {TournamentConfigurationSettings} from '~/models/settings'
import {useToast} from '~/composables/useToast'
import * as settingsAPI from '~/http/api/settings'

const { toast } = useToast()
  const tournamentStore = useTournamentStore()
  const { tournaments } = storeToRefs(tournamentStore)
  const { formats } = storeToRefs(useCategoryStore())
  const { footballTypes } = storeToRefs(useLeaguesStore())
  const selectedTournamentId = ref<number | null>(null)
  const configuration = ref<TournamentConfigurationSettings | null>(null)
  const loadingTournaments = ref(false)
  const loadingConfig = ref(false)
  const saving = ref(false)
  const section = ref('base')

  const verificationOptions = [{ title: 'CURP', value: 'curp' }]
  const sections = [
    { value: 'base', label: 'Reglas base' },
    { value: 'teams', label: 'Equipos y jugadores' },
    { value: 'verification', label: 'Bloqueo y validación' },
    { value: 'format', label: 'Formato y fases' },
  ]

  const buildEmptyConfiguration = (tournamentId: number): TournamentConfigurationSettings => ({
    tournament_id: tournamentId,
    tournament_format_id: null,
    football_type_id: null,
    substitutions_per_team: null,
    max_teams: null,
    min_teams: null,
    time_between_games: null,
    max_players_per_team: null,
    min_players_per_team: null,
    max_teams_per_player: null,
    player_lock_duration_days: null,
    requires_player_verification: false,
    player_verification_method: 'curp',
    game_time: null,
    round_trip: false,
    group_stage: false,
    elimination_round_trip: false,
  })

  const fetchTournaments = async () => {
    loadingTournaments.value = true
    try {
      await tournamentStore.fetchTournamentsByLeagueId()
      const list = tournaments.value ?? []
      if (!selectedTournamentId.value && list.length > 0) {
        selectedTournamentId.value = list[0]?.id as number
      }
    } catch (error: any) {
      toast({
        type: 'error',
        msg: 'No se pudieron cargar torneos',
        description: error?.data?.message ?? 'Inténtalo nuevamente.',
      })
    } finally {
      loadingTournaments.value = false
    }
  }

  const fetchConfiguration = async (tournamentId: number) => {
    loadingConfig.value = true
    configuration.value = null
    try {
      const response = await settingsAPI.getTournamentConfiguration(tournamentId)
      configuration.value = {
        ...buildEmptyConfiguration(tournamentId),
        ...response,
        tournament_id: tournamentId,
        requires_player_verification: response.requires_player_verification ?? false,
        player_verification_method: response.player_verification_method ?? 'curp',
        round_trip: response.round_trip ?? false,
        group_stage: response.group_stage ?? false,
        elimination_round_trip: response.elimination_round_trip ?? false,
      }
    } catch (error: any) {
      configuration.value = buildEmptyConfiguration(tournamentId)
      toast({
        type: 'error',
        msg: 'No se pudo cargar la configuración',
        description: error?.data?.message ?? 'Inténtalo nuevamente.',
      })
    } finally {
      loadingConfig.value = false
    }
  }

  const saveConfiguration = async () => {
    if (!configuration.value || !selectedTournamentId.value) return
    saving.value = true
    try {
      const payload: TournamentConfigurationSettings = {
        ...configuration.value,
        player_verification_method: configuration.value.requires_player_verification ? 'curp' : null,
      }
      configuration.value = await settingsAPI.updateTournamentConfiguration(selectedTournamentId.value, payload)
      toast({
        type: 'success',
        msg: 'Configuración guardada',
        description: 'Los ajustes del torneo se actualizaron correctamente.',
      })
    } catch (error: any) {
      toast({
        type: 'error',
        msg: 'No se pudo guardar',
        description: error?.data?.message ?? 'Inténtalo nuevamente.',
      })
    } finally {
      saving.value = false
    }
  }

  watch(selectedTournamentId, (value) => {
    section.value = 'base'
    if (!value) {
      configuration.value = null
      return
    }
    fetchConfiguration(value)
  })

  watch(
    () => configuration.value?.requires_player_verification,
    (value) => {
      if (!configuration.value) return
      configuration.value.player_verification_method = value ? 'curp' : null
    }
  )

  onMounted(async () => {
    await useCategoryStore().fetchFormats()
    await useLeaguesStore().getFootballTypes()
    await fetchTournaments()
  })
</script>

<template>
  <v-card class="secondary-card pa-6" variant="text">
    <v-card-item class="secondary-card-item">
      <v-card-text class="secondary-card__title">Configuración por torneo</v-card-text>
      <v-card-subtitle class="secondary-card__subtitle">
        Selecciona un torneo y ajusta la configuración completa.
      </v-card-subtitle>
    </v-card-item>
    <v-card-text class="pt-6">
      <BaseInput label="Torneo" sublabel="Selecciona el torneo a configurar">
        <template #input>
          <v-select
            v-model="selectedTournamentId"
            :items="tournaments"
            item-title="name"
            item-value="id"
            density="compact"
            variant="outlined"
            placeholder="Selecciona un torneo"
            :loading="loadingTournaments"
          />
        </template>
      </BaseInput>

      <div class="tournaments-settings mt-4">
        <div v-if="loadingTournaments || loadingConfig" class="tournaments-settings__state">
          <v-skeleton-loader type="heading, text, text, actions" class="tournaments-settings__skeleton" />
        </div>

        <div v-else-if="!selectedTournamentId" class="tournaments-settings__state text-body-2 text-medium-emphasis">
          No hay torneos disponibles.
        </div>

        <div v-else-if="configuration" class="tournaments-settings__layout">
          <div class="tournaments-settings__nav">
            <v-list class="tournaments-settings__nav-list" density="compact" nav>
              <v-list-item
                v-for="item in sections"
                :key="item.value"
                :active="section === item.value"
                class="tournaments-settings__nav-item"
                @click="section = item.value"
              >
                <v-list-item-title>{{ item.label }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </div>
          <div class="tournaments-settings__content">
            <v-window v-model="section" class="tournaments-settings__window">
              <v-window-item value="base" transition="fade-transition" reverse-transition="fade-transition">
                <div class="tournaments-settings__section d-flex flex-column ga-4">
                  <div class="text-subtitle-1">Reglas base</div>
                  <BaseInput label="Formato del torneo">
                    <template #input>
                      <v-select
                        v-model="configuration.tournament_format_id"
                        :items="formats"
                        item-title="name"
                        item-value="id"
                        density="compact"
                        variant="outlined"
                        placeholder="Selecciona un formato"
                      />
                    </template>
                  </BaseInput>
                  <BaseInput label="Tipo de torneo">
                    <template #input>
                      <v-select
                        v-model="configuration.football_type_id"
                        :items="footballTypes"
                        item-title="name"
                        item-value="id"
                        density="compact"
                        variant="outlined"
                        placeholder="Selecciona un tipo"
                      />
                    </template>
                  </BaseInput>
                  <BaseInput label="Cambios permitidos">
                    <template #input>
                      <v-text-field
                        v-model.number="configuration.substitutions_per_team"
                        type="number"
                        density="compact"
                        variant="outlined"
                      />
                    </template>
                  </BaseInput>
                  <BaseInput label="Tiempo de juego (min)">
                    <template #input>
                      <v-text-field
                        v-model.number="configuration.game_time"
                        type="number"
                        density="compact"
                        variant="outlined"
                      />
                    </template>
                  </BaseInput>
                  <BaseInput label="Tiempo entre juegos (min)">
                    <template #input>
                      <v-text-field
                        v-model.number="configuration.time_between_games"
                        type="number"
                        density="compact"
                        variant="outlined"
                      />
                    </template>
                  </BaseInput>
                </div>
              </v-window-item>

              <v-window-item value="teams" transition="fade-transition" reverse-transition="fade-transition">
                <div class="tournaments-settings__section d-flex flex-column ga-4">
                  <div class="text-subtitle-1">Equipos y jugadores</div>
                  <BaseInput label="Mínimo de equipos">
                    <template #input>
                      <v-text-field
                        v-model.number="configuration.min_teams"
                        type="number"
                        density="compact"
                        variant="outlined"
                      />
                    </template>
                  </BaseInput>
                  <BaseInput label="Máximo de equipos">
                    <template #input>
                      <v-text-field
                        v-model.number="configuration.max_teams"
                        type="number"
                        density="compact"
                        variant="outlined"
                      />
                    </template>
                  </BaseInput>
                  <BaseInput label="Mínimo de jugadores por equipo">
                    <template #input>
                      <v-text-field
                        v-model.number="configuration.min_players_per_team"
                        type="number"
                        density="compact"
                        variant="outlined"
                      />
                    </template>
                  </BaseInput>
                  <BaseInput label="Máximo de jugadores por equipo">
                    <template #input>
                      <v-text-field
                        v-model.number="configuration.max_players_per_team"
                        type="number"
                        density="compact"
                        variant="outlined"
                      />
                    </template>
                  </BaseInput>
                  <BaseInput label="Máximo de equipos por jugador">
                    <template #input>
                      <v-text-field
                        v-model.number="configuration.max_teams_per_player"
                        type="number"
                        density="compact"
                        variant="outlined"
                      />
                    </template>
                  </BaseInput>
                </div>
              </v-window-item>

              <v-window-item value="verification" transition="fade-transition" reverse-transition="fade-transition">
                <div class="tournaments-settings__section d-flex flex-column ga-4">
                  <div class="text-subtitle-1">Bloqueo y validación</div>
                  <BaseInput label="Bloqueo por tiempo (días)">
                    <template #input>
                      <v-text-field
                        v-model.number="configuration.player_lock_duration_days"
                        type="number"
                        density="compact"
                        variant="outlined"
                      />
                    </template>
                  </BaseInput>
                  <BaseInput label="Verificación de jugador">
                    <template #input>
                      <v-switch density="compact" v-model="configuration.requires_player_verification" color="primary"  />
                    </template>
                  </BaseInput>
                  <BaseInput label="Método de verificación">
                    <template #input>
                      <v-select
                        v-model="configuration.player_verification_method"
                        :items="verificationOptions"
                        item-title="title"
                        item-value="value"
                        density="compact"
                        variant="outlined"
                        :disabled="!configuration.requires_player_verification"
                        placeholder="Selecciona un método"
                      />
                    </template>
                  </BaseInput>
                </div>
              </v-window-item>

              <v-window-item value="format" transition="fade-transition" reverse-transition="fade-transition">
                <div class="tournaments-settings__section d-flex flex-column ga-4">
                  <div class="text-subtitle-1">Formato y fases</div>
                  <BaseInput label="Ida y vuelta">
                    <template #input>
                      <v-switch density="compact" v-model="configuration.round_trip" color="primary"  />
                    </template>
                  </BaseInput>
                  <BaseInput label="Fase de grupos">
                    <template #input>
                      <v-switch density="compact" v-model="configuration.group_stage" color="primary"  />
                    </template>
                  </BaseInput>
                  <BaseInput label="Eliminación ida y vuelta">
                    <template #input>
                      <v-switch density="compact" v-model="configuration.elimination_round_trip" color="primary"  />
                    </template>
                  </BaseInput>
                </div>
              </v-window-item>
            </v-window>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" variant="elevated" :loading="saving" :disabled="!configuration" @click="saveConfiguration">
        Guardar cambios
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
