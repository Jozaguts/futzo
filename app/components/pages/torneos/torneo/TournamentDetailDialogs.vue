<script setup lang="ts">
type TeamOption = {
  title: string
  value: number
}

const props = defineProps<{
  shareShowQr: boolean
  shareTitle: string
  shareImage: string
  shareHasError: boolean
  competitionManagementDialog: boolean
  retireCompetitionDialog: boolean
  competitionConfigContext: string
  selectedCompetitionTeamId: number | null
  tournamentTeamOptions: TeamOption[]
  isUpdatingCompetitionStatus: boolean
  competitionStatusSummary: string
  isSelectedTeamActive: boolean
  competitionActionLabel: string
  canToggleTeamCompetitionStatus: boolean
  selectedCompetitionTeamName: string
}>()

const emit = defineEmits<{
  (event: 'update:shareShowQr', value: boolean): void
  (event: 'downloadQr'): void
  (event: 'closeCompetitionManagementDialog'): void
  (event: 'closeRetireCompetitionDialog'): void
  (event: 'confirmRetireCompetitionTeam'): void
  (event: 'requestToggleTeamCompetitionStatus'): void
  (event: 'update:selectedCompetitionTeamId', value: number | null): void
}>()

const shareDialog = computed({
  get: () => props.shareShowQr,
  set: (value: boolean) => emit('update:shareShowQr', value),
})

const updateSelectedTeamId = (value: number | null) => emit('update:selectedCompetitionTeamId', value)
const closeCompetitionDialog = () => emit('closeCompetitionManagementDialog')
const closeRetireDialog = () => emit('closeRetireCompetitionDialog')
const confirmRetire = () => emit('confirmRetireCompetitionTeam')
const requestToggleTeamStatus = () => emit('requestToggleTeamCompetitionStatus')
const downloadQr = () => emit('downloadQr')
</script>

<template>
  <v-dialog v-model="shareDialog" max-width="500">
    <v-card>
      <v-card-title>{{ shareTitle || 'Compartir torneo' }}</v-card-title>
      <v-card-text>
        <v-alert v-if="shareHasError" type="warning" variant="tonal" class="mb-4">
          No se pudo generar el código QR.
        </v-alert>
        <v-img v-if="shareImage" :src="shareImage" :aspect-ratio="1" cover></v-img>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="shareDialog = false">Cerrar</v-btn>
        <v-btn color="primary" :disabled="!shareImage" @click="downloadQr">Descargar QR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    :model-value="competitionManagementDialog"
    max-width="560"
    @update:model-value="(value) => (!value ? closeCompetitionDialog() : null)"
  >
    <v-card v-if="competitionManagementDialog" data-testid="tournament-competition-management-dialog">
      <v-card-title>Remover equipo de la competencia</v-card-title>
      <v-card-text>
        <div class="competition-config__header mb-3">
          <h3 class="competition-config__title">Configuración del torneo</h3>
          <p class="competition-config__subtitle">Activa o retira equipos de la competencia.</p>
        </div>

        <div class="competition-config__context mb-4">
          <Icon name="lucide:info" size="15" />
          <span>{{ competitionConfigContext }}</span>
        </div>

        <v-select
          :model-value="selectedCompetitionTeamId"
          :items="tournamentTeamOptions"
          item-title="title"
          item-value="value"
          density="compact"
          variant="outlined"
          hide-details
          label="Equipo del torneo"
          :disabled="!tournamentTeamOptions.length || isUpdatingCompetitionStatus"
          data-testid="tournament-competition-team-select"
          @update:model-value="updateSelectedTeamId"
        />

        <template v-if="tournamentTeamOptions.length">
          <p class="competition-config__status mt-3">{{ competitionStatusSummary }}</p>
          <v-btn
            :color="isSelectedTeamActive ? 'error' : 'success'"
            variant="tonal"
            block
            class="mt-3"
            :loading="isUpdatingCompetitionStatus"
            :disabled="!canToggleTeamCompetitionStatus"
            data-testid="tournament-competition-toggle-btn"
            @click="requestToggleTeamStatus"
          >
            {{ competitionActionLabel }}
          </v-btn>
        </template>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" :disabled="isUpdatingCompetitionStatus" @click="closeCompetitionDialog">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    :model-value="retireCompetitionDialog"
    max-width="520"
    @update:model-value="(value) => (!value ? closeRetireDialog() : null)"
  >
    <v-card v-if="retireCompetitionDialog" data-testid="tournament-competition-confirm-dialog">
      <v-card-title>Retirar equipo de la competencia</v-card-title>
      <v-card-text class="text-body-2">
        Vas a retirar a {{ selectedCompetitionTeamName }} de la competencia. Esta acción lo desactiva desde la
        siguiente jornada disponible, regenera el calendario pendiente y recalcula la tabla de posiciones. Los
        partidos ya jugados y los puntos acumulados no se eliminan.
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          variant="text"
          :disabled="isUpdatingCompetitionStatus"
          data-testid="tournament-competition-confirm-cancel"
          @click="closeRetireDialog"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="error"
          :loading="isUpdatingCompetitionStatus"
          data-testid="tournament-competition-confirm-submit"
          @click="confirmRetire"
        >
          Sí, retirar equipo
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="sass">
.competition-config__header
  display: flex
  flex-direction: column
  gap: 4px

.competition-config__title
  margin: 0
  font-size: 14px
  font-weight: 700
  color: var(--futzo-on-surface)

.competition-config__subtitle
  margin: 0
  font-size: 12px
  color: var(--futzo-on-surface-muted)

.competition-config__status
  margin: 0
  font-size: 12px
  color: var(--futzo-text-muted)

.competition-config__context
  border: 1px solid var(--futzo-border)
  background: #f8fafc
  border-radius: 10px
  min-height: 36px
  display: flex
  align-items: center
  gap: 8px
  padding: 8px 12px
  font-size: 12px
  color: #344054
</style>
