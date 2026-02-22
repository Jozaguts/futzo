<script lang="ts" setup>
import AppBar from '~/components/layout/AppBar.vue'
import CreateTeamDialog from '~/components/pages/equipos/CreateTeamDialog/index.vue'
import StatsTableContainer from '~/components/pages/equipos/live-games.vue'
import CreateTournamentDialog from '~/components/pages/torneos/dialog/index.vue'
import DisciplinePanel from '~/components/pages/torneos/discipline/DisciplinePanel.vue'
import TournamentCalendarTab from '~/components/pages/torneos/torneo/calendar-tab.vue'
import TournamentDetailDialogs from '~/components/pages/torneos/torneo/TournamentDetailDialogs.vue'
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

  <TournamentDetailDialogs
    :share-show-qr="share.showQr"
    :share-title="share.title"
    :share-image="share.image"
    :share-has-error="share.hasError"
    :competition-management-dialog="competitionManagementDialog"
    :retire-competition-dialog="retireCompetitionDialog"
    :competition-config-context="competitionConfigContext"
    :selected-competition-team-id="selectedCompetitionTeamId"
    :tournament-team-options="tournamentTeamOptions"
    :is-updating-competition-status="isUpdatingCompetitionStatus"
    :competition-status-summary="competitionStatusSummary"
    :is-selected-team-active="isSelectedTeamActive"
    :competition-action-label="competitionActionLabel"
    :can-toggle-team-competition-status="canToggleTeamCompetitionStatus"
    :selected-competition-team-name="selectedCompetitionTeamName"
    @update:share-show-qr="(value) => (share.showQr = value)"
    @download-qr="downloadQR"
    @close-competition-management-dialog="closeCompetitionManagementDialog"
    @close-retire-competition-dialog="closeRetireCompetitionDialog"
    @confirm-retire-competition-team="confirmRetireCompetitionTeam"
    @request-toggle-team-competition-status="requestToggleTeamCompetitionStatus"
    @update:selected-competition-team-id="(value) => (selectedCompetitionTeamId = value)"
  />
</template>

<style lang="sass" scoped>
@use '~/assets/scss/pages/tournament-detail.sass'
</style>
