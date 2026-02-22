<script lang="ts" setup>
import AppBar from '~/components/layout/AppBar.vue'
import PageLayout from '~/components/shared/PageLayout.vue'
import PlayerDetailAssociations from '~/components/pages/jugadores/detail/player-detail-associations.vue'
import PlayerDetailHero from '~/components/pages/jugadores/detail/player-detail-hero.vue'
import PlayerDetailSections from '~/components/pages/jugadores/detail/player-detail-sections.vue'
import PlayerDetailSensitiveCards from '~/components/pages/jugadores/detail/player-detail-sensitive-cards.vue'
import type {DetailSectionItem} from '~/composables/players/usePlayerDetailPage'
import {formatPlayerDate, usePlayerDetailPage} from '~/composables/players/usePlayerDetailPage'

definePageMeta({
  middleware: ['sanctum:auth'],
})

const {
  loading,
  isEmptyState,
  avatar,
  initials,
  playerFullName,
  positionLabel,
  playerTeams,
  teamCategoryLabel,
  heroMeta,
  detailSections,
  positions,
  editableFields,
  isSectionEditing,
  isSectionSaving,
  canSectionBeEdited,
  isItemEditable,
  getFieldDisplayValue,
  handleFieldInput,
  toggleSectionEditing,
  canManageSensitivePlayerActions,
  statsHighlights,
  verificationStatusLabel,
  verificationNotes,
  verificationDocumentUrl,
  verificationPhotoUrl,
  verificationDocument,
  verificationPhoto,
  isUploadingVerification,
  isApprovingVerification,
  isRejectingVerification,
  isReleasingLock,
  submitVerification,
  approveVerificationHandler,
  releaseLockHandler,
  rejectDialog,
  rejectNotes,
  openRejectDialog,
  rejectVerificationHandler,
  lockStatusLabel,
  isLockActive,
  tournamentList,
  goBack,
} = usePlayerDetailPage()

const onSectionToggle = async (sectionId: string) => {
  await toggleSectionEditing(sectionId)
}

const onSectionFieldUpdate = (payload: { field: DetailSectionItem['field']; value: string | number | null }) => {
  handleFieldInput(payload.field, payload.value)
}

const onVerificationDocumentUpdate = (value: File | File[] | null) => {
  verificationDocument.value = value
}

const onVerificationPhotoUpdate = (value: File | File[] | null) => {
  verificationPhoto.value = value
}
</script>

<template>
  <PageLayout>
    <template #app-bar>
      <AppBar :extended="false" />
    </template>

    <template #default>
      <div class="player-detail-page" data-testid="jugador-detail-page">
        <v-skeleton-loader
          v-if="loading"
          type="card, list-item-two-line@3, image"
          class="rounded-lg"
        ></v-skeleton-loader>

        <v-empty-state
          v-else-if="isEmptyState"
          title="No encontramos al jugador"
          text="Regresa a la tabla de jugadores e inténtalo nuevamente."
          image="/no-data.svg"
        ></v-empty-state>

        <div v-else class="player-detail-grid">
          <div class="player-detail-grid__main d-flex flex-column ga-4">
            <PlayerDetailHero
              :avatar="avatar"
              :initials="initials"
              :player-full-name="playerFullName"
              :position-label="positionLabel"
              :player-teams="playerTeams"
              :team-category-label="teamCategoryLabel"
              :hero-meta="heroMeta"
              @back="goBack"
            />

            <PlayerDetailSections
              :detail-sections="detailSections"
              :positions="positions"
              :editable-fields="editableFields"
              :is-section-editing="isSectionEditing"
              :is-section-saving="isSectionSaving"
              :can-section-be-edited="canSectionBeEdited"
              :is-item-editable="isItemEditable"
              :get-field-display-value="getFieldDisplayValue"
              @toggle-section="onSectionToggle"
              @update-field="onSectionFieldUpdate"
            />
          </div>

          <div class="player-detail-grid__aside d-flex flex-column ga-4">
            <PlayerDetailSensitiveCards
              :can-manage-sensitive-player-actions="canManageSensitivePlayerActions"
              :stats-highlights="statsHighlights"
              :verification-status-label="verificationStatusLabel"
              :verification-notes="verificationNotes"
              :verification-document-url="verificationDocumentUrl"
              :verification-photo-url="verificationPhotoUrl"
              :verification-document="verificationDocument"
              :verification-photo="verificationPhoto"
              :is-uploading-verification="isUploadingVerification"
              :is-approving-verification="isApprovingVerification"
              :is-releasing-lock="isReleasingLock"
              :lock-status-label="lockStatusLabel"
              :is-lock-active="isLockActive"
              @update:verification-document="onVerificationDocumentUpdate"
              @update:verification-photo="onVerificationPhotoUpdate"
              @submit-verification="submitVerification"
              @approve-verification="approveVerificationHandler"
              @request-reject="openRejectDialog"
              @release-lock="releaseLockHandler"
            />

            <PlayerDetailAssociations
              :player-teams="playerTeams"
              :tournament-list="tournamentList"
              :format-date="formatPlayerDate"
            />
          </div>
        </div>
      </div>
    </template>
  </PageLayout>

  <v-dialog v-model="rejectDialog" max-width="520">
    <v-card class="futzo-rounded pa-4">
      <v-card-title class="text-subtitle-1">Rechazar verificación</v-card-title>
      <v-card-text>
        <v-textarea
          v-model="rejectNotes"
          label="Motivo del rechazo"
          variant="outlined"
          rows="4"
          auto-grow
        />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="rejectDialog = false">Cancelar</v-btn>
        <v-btn
          color="error"
          variant="elevated"
          :loading="isRejectingVerification"
          :disabled="!rejectNotes"
          @click="rejectVerificationHandler"
        >
          Rechazar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="sass">
@use '~/assets/scss/pages/player-detail.sass'
</style>
