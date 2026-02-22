<script lang="ts" setup>
import {Icon} from '#components'
import AppBar from '~/components/layout/AppBar.vue'
import CreateTeamDialog from '~/components/pages/equipos/CreateTeamDialog/index.vue'
import StatsTableContainer from '~/components/pages/equipos/live-games.vue'
import CreateTournamentDialog from '~/components/pages/torneos/dialog/index.vue'
import DisciplinePanel from '~/components/pages/torneos/discipline/DisciplinePanel.vue'
import TournamentCalendarTab from '~/components/pages/torneos/torneo/calendar-tab.vue'
import TournamentDetailTopShell from '~/components/pages/torneos/torneo/TournamentDetailTopShell.vue'
import TournamentStandingsTable from '~/components/pages/torneos/tournament-standings-table.vue'
import StatsTable from '~/components/pages/torneos/stats-tables/index.vue'
import KpisMetricsSection from '~/components/shared/kpis-metrics-section.vue'
import PageLayout from '~/components/shared/PageLayout.vue'
import QuickActionsPanel from '~/components/shared/quick-actions-panel.vue'
import {useTournamentDetailPage} from '~/composables/tournaments/useTournamentDetailPage'

definePageMeta({
  middleware: ['sanctum:auth'],
})

const {
  standings,
  loading,
  tab,
  sections,
  share,
  mobile,
  tournamentName,
  tournamentMeta,
  statusLabel,
  shareActionHandler,
  goToPublic,
  goToCalendar,
  hasGeneratedSchedule,
  tournamentKpiItems,
  gamesProgressPercent,
  progressStart,
  progressEnd,
  tournamentQuickActions,
  handleTournamentQuickAction,
  currentTournamentId,
  competitionManagementDialog,
  retireCompetitionDialog,
  competitionConfigContext,
  selectedCompetitionTeamId,
  tournamentTeamOptions,
  isUpdatingCompetitionStatus,
  competitionStatusSummary,
  isSelectedTeamActive,
  competitionActionLabel,
  canToggleTeamCompetitionStatus,
  requestToggleTeamCompetitionStatus,
  closeCompetitionManagementDialog,
  closeRetireCompetitionDialog,
  confirmRetireCompetitionTeam,
  selectedCompetitionTeamName,
  downloadQR,
} = useTournamentDetailPage()
</script>

<template>
  <PageLayout>
    <template #app-bar>
      <AppBar :extended="false" />
    </template>

    <template #default>
      <div class="tournament-page" data-testid="tournament-page-shell">
        <TournamentDetailTopShell
          :tournament-name="tournamentName"
          :tournament-meta="tournamentMeta"
          :status-label="statusLabel"
          :mobile="mobile"
          :share-loading="share.isLoading"
          :sections="sections"
          :active-tab="tab"
          @share="shareActionHandler"
          @go-public="goToPublic"
          @go-calendar="goToCalendar"
          @update:active-tab="(value) => (tab = value)"
        />

        <div class="tournament-window">
          <TransitionFade group>
            <template v-if="tab === 'resumen'">
              <KpisMetricsSection class="tournament-kpis" :items="tournamentKpiItems" test-id-prefix="tournament-kpis" />

              <div class="tournament-resume-top" :class="{ 'tournament-resume-top--split': hasGeneratedSchedule }">
                <v-card class="tournament-progress-card futzo-rounded">
                  <div class="progress-header">
                    <p>Progreso</p>
                    <span>{{ gamesProgressPercent }}%</span>
                  </div>
                  <v-progress-linear :model-value="gamesProgressPercent" height="6" rounded color="primary" />
                  <div class="progress-footer">
                    <span>{{ progressStart }}</span>
                    <span>{{ progressEnd }}</span>
                  </div>
                </v-card>

                <QuickActionsPanel
                  v-if="hasGeneratedSchedule"
                  class="futzo-rounded"
                  test-id="tournament-competition-config"
                  title="Acciones Rápidas"
                  :actions="tournamentQuickActions"
                  primary-action-id="register_team"
                  @action="handleTournamentQuickAction"
                />
              </div>

              <div class="tournament-content">
                <div class="tournament-standings">
                  <TournamentStandingsTable
                    :standings="standings"
                    :loading="loading"
                    wrapper-test-id="tournament-standings-table-wrapper"
                    :rows-per-page="standings?.length || 0"
                    navigate-to-team-on-row-click
                  />
                </div>
                <div class="tournament-stats">
                  <StatsTableContainer title="Líderes de estadísticas">
                    <template #content>
                      <StatsTable />
                    </template>
                  </StatsTableContainer>
                </div>
              </div>
            </template>

            <template v-else-if="tab === 'calendario'">
              <TournamentCalendarTab />
            </template>

            <template v-else-if="tab === 'disciplina'">
              <div class="tournament-discipline-shell">
                <DisciplinePanel :tournament-id="currentTournamentId" />
              </div>
            </template>
          </TransitionFade>
        </div>

        <CreateTournamentDialog />
        <CreateTeamDialog />
      </div>
    </template>
  </PageLayout>

  <v-dialog v-model="share.showQr" max-width="500">
    <v-card>
      <v-card-title>{{ share.title || 'Compartir torneo' }}</v-card-title>
      <v-card-text>
        <v-alert v-if="share.hasError" type="warning" variant="tonal" class="mb-4">
          No se pudo generar el código QR.
        </v-alert>
        <v-img v-if="share.image" :src="share.image" :aspect-ratio="1" cover></v-img>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="share.showQr = false">Cerrar</v-btn>
        <v-btn color="primary" :disabled="!share.image" @click="downloadQR">Descargar QR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="competitionManagementDialog" max-width="560">
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
          v-model="selectedCompetitionTeamId"
          :items="tournamentTeamOptions"
          item-title="title"
          item-value="value"
          density="compact"
          variant="outlined"
          hide-details
          label="Equipo del torneo"
          :disabled="!tournamentTeamOptions.length || isUpdatingCompetitionStatus"
          data-testid="tournament-competition-team-select"
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
            @click="requestToggleTeamCompetitionStatus"
          >
            {{ competitionActionLabel }}
          </v-btn>
        </template>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" :disabled="isUpdatingCompetitionStatus" @click="closeCompetitionManagementDialog">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="retireCompetitionDialog" max-width="520">
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
          @click="closeRetireCompetitionDialog"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="error"
          :loading="isUpdatingCompetitionStatus"
          data-testid="tournament-competition-confirm-submit"
          @click="confirmRetireCompetitionTeam"
        >
          Sí, retirar equipo
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="sass" scoped>
@use '~/assets/scss/pages/tournament-detail.sass'
</style>
