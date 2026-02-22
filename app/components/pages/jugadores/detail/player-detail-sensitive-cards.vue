<script setup lang="ts">
type StatItem = {
  label: string
  value: string
}

defineProps<{
  canManageSensitivePlayerActions: boolean
  statsHighlights: StatItem[]
  verificationStatusLabel: string
  verificationNotes: string
  verificationDocumentUrl: string | null
  verificationPhotoUrl: string | null
  verificationDocument: File | File[] | null
  verificationPhoto: File | File[] | null
  isUploadingVerification: boolean
  isApprovingVerification: boolean
  isReleasingLock: boolean
  lockStatusLabel: string
  isLockActive: boolean
}>()

const emit = defineEmits<{
  (event: 'update:verificationDocument', value: File | File[] | null): void
  (event: 'update:verificationPhoto', value: File | File[] | null): void
  (event: 'submit-verification'): void
  (event: 'approve-verification'): void
  (event: 'request-reject'): void
  (event: 'release-lock'): void
}>()

const updateVerificationDocument = (value: File | File[] | null) => emit('update:verificationDocument', value)
const updateVerificationPhoto = (value: File | File[] | null) => emit('update:verificationPhoto', value)
const submitVerification = () => emit('submit-verification')
const approveVerification = () => emit('approve-verification')
const requestReject = () => emit('request-reject')
const releaseLock = () => emit('release-lock')
</script>

<template>
  <template v-if="canManageSensitivePlayerActions">
    <v-card class="detail-card futzo-rounded" variant="flat">
      <div class="detail-card__header">
        <div>
          <h3 class="text-subtitle-1 mb-1">Estadísticas</h3>
          <p class="text-body-2 text-medium-emphasis">Resumen de rendimiento acumulado.</p>
        </div>
      </div>
      <div class="player-stats">
        <div v-for="stat in statsHighlights" :key="stat.label" class="player-stats__item">
          <p>{{ stat.label }}</p>
          <span>{{ stat.value }}</span>
        </div>
      </div>
    </v-card>

    <v-card class="detail-card futzo-rounded" variant="flat">
      <div class="detail-card__header">
        <div>
          <h3 class="text-subtitle-1 mb-1">Verificación</h3>
          <p class="text-body-2 text-medium-emphasis">Estado de validación del jugador.</p>
        </div>
      </div>
      <div class="player-stats">
        <div class="player-stats__item">
          <p>Estado</p>
          <span>{{ verificationStatusLabel }}</span>
        </div>
        <div v-if="verificationNotes" class="player-stats__item">
          <p>Notas</p>
          <span>{{ verificationNotes }}</span>
        </div>
        <div v-if="verificationDocumentUrl" class="player-stats__item">
          <p>Documento</p>
          <a :href="verificationDocumentUrl" target="_blank" rel="noopener">Ver documento</a>
        </div>
        <div v-if="verificationPhotoUrl" class="player-stats__item">
          <p>Foto</p>
          <a :href="verificationPhotoUrl" target="_blank" rel="noopener">Ver foto</a>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="d-flex flex-column ga-3">
        <template v-if="!verificationDocumentUrl">
          <v-file-input
            :model-value="verificationDocument"
            density="comfortable"
            label="Documento oficial"
            variant="outlined"
            accept=".jpg,.jpeg,.png,.pdf"
            @update:model-value="updateVerificationDocument"
          />
          <v-file-input
            :model-value="verificationPhoto"
            density="comfortable"
            label="Foto del jugador (opcional)"
            variant="outlined"
            accept=".jpg,.jpeg,.png"
            @update:model-value="updateVerificationPhoto"
          />
          <v-btn
            color="primary"
            variant="elevated"
            :loading="isUploadingVerification"
            :disabled="!verificationDocument"
            @click="submitVerification"
          >
            Subir documentos
          </v-btn>
        </template>
        <div class="d-flex ga-2">
          <v-btn
            color="success"
            variant="tonal"
            :loading="isApprovingVerification"
            :disabled="!verificationDocumentUrl"
            @click="approveVerification"
          >
            Aprobar
          </v-btn>
          <v-btn color="error" variant="tonal" @click="requestReject">Rechazar</v-btn>
        </div>
      </div>
    </v-card>

    <v-card class="detail-card futzo-rounded" variant="flat">
      <div class="detail-card__header">
        <div>
          <h3 class="text-subtitle-1 mb-1">Bloqueo de transferencia</h3>
          <p class="text-body-2 text-medium-emphasis">Restricciones para registrar al jugador en otro equipo.</p>
        </div>
      </div>
      <div class="player-stats">
        <div class="player-stats__item">
          <p>Estado</p>
          <span>{{ lockStatusLabel }}</span>
        </div>
      </div>
      <v-btn
        class="mt-3"
        color="primary"
        variant="outlined"
        :loading="isReleasingLock"
        :disabled="!isLockActive"
        @click="releaseLock"
      >
        Liberar jugador
      </v-btn>
    </v-card>
  </template>
</template>
