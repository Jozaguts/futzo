<script setup lang="ts">
import {
  getCredentialSettings,
  getCredentialTournamentSettings,
  updateCredentialSettings,
  updateCredentialTournamentSettings,
} from '~/http/api/credentials'
import type {CredentialSettingsResource} from '~/types/credentials'
import CredentialsPaywallAlert from '~/components/pages/credentials/CredentialsPaywallAlert.vue'
import {useCredentialsErrors} from '~/composables/credentials/useCredentialsErrors'
import {useCredentialsAccess} from '~/composables/credentials/useCredentialsAccess'
import InlineForbiddenState from '~/components/shared/InlineForbiddenState.vue'

const { toast } = useToast()
const { parseError } = useCredentialsErrors()
const { canConfigureCredentials } = useCredentialsAccess()
const client = useSanctumClient()

const loading = ref(false)
const savingGlobal = ref(false)
const savingOverride = ref(false)
const paywallCheckoutUrl = ref<string | null>(null)

const tournaments = ref<Array<{ id: number; name: string }>>([])
const selectedTournamentId = ref<number | null>(null)

const globalSettings = reactive<CredentialSettingsResource>({
  requires_registered_player: true,
  allow_unverified_players: true,
  allow_suspended_players: true,
  block_if_team_sanctioned: false,
  expiry_by_tournament: false,
  show_warnings_on_card: true,
  qr_enabled_by_default: true,
  allow_digital_credential: true,
  watermark_mode: 'optional',
  watermark_locked_by_plan: false,
})

const overrideSettings = reactive<CredentialSettingsResource>({
  requires_registered_player: true,
  allow_unverified_players: true,
  allow_suspended_players: true,
  block_if_team_sanctioned: false,
  expiry_by_tournament: false,
  show_warnings_on_card: true,
  qr_enabled_by_default: true,
  allow_digital_credential: true,
  watermark_mode: 'optional',
  watermark_locked_by_plan: false,
  is_override: false,
})

const watermarkOptions = [
  { title: 'Forzado', value: 'forced' },
  { title: 'Opcional', value: 'optional' },
  { title: 'Desactivado', value: 'disabled' },
]

const mapSettings = (target: CredentialSettingsResource, source: CredentialSettingsResource) => {
  target.requires_registered_player = Boolean(source.requires_registered_player)
  target.allow_unverified_players = Boolean(source.allow_unverified_players)
  target.allow_suspended_players = Boolean(source.allow_suspended_players)
  target.block_if_team_sanctioned = Boolean(source.block_if_team_sanctioned)
  target.expiry_by_tournament = Boolean(source.expiry_by_tournament)
  target.show_warnings_on_card = Boolean(source.show_warnings_on_card)
  target.qr_enabled_by_default = Boolean(source.qr_enabled_by_default)
  target.allow_digital_credential = Boolean(source.allow_digital_credential)
  target.watermark_mode = source.watermark_mode
  target.watermark_locked_by_plan = Boolean(source.watermark_locked_by_plan)
  target.is_override = source.is_override
  target.source = source.source
}

const toPayload = (source: CredentialSettingsResource) => ({
  requires_registered_player: source.requires_registered_player,
  allow_unverified_players: source.allow_unverified_players,
  allow_suspended_players: source.allow_suspended_players,
  block_if_team_sanctioned: source.block_if_team_sanctioned,
  expiry_by_tournament: source.expiry_by_tournament,
  show_warnings_on_card: source.show_warnings_on_card,
  qr_enabled_by_default: source.qr_enabled_by_default,
  allow_digital_credential: source.allow_digital_credential,
  watermark_mode: source.watermark_mode,
})

const loadTournaments = async () => {
  const response = await client<{ data?: Array<{ id: number; name: string }> }>('/api/v1/admin/tournaments', {
    query: { per_page: 100, page: 1 },
  })

  const list = Array.isArray(response?.data) ? response.data : []
  tournaments.value = list
}

const loadGlobal = async () => {
  const response = await getCredentialSettings()
  mapSettings(globalSettings, response)
}

const loadOverride = async () => {
  if (!selectedTournamentId.value) return
  const response = await getCredentialTournamentSettings(selectedTournamentId.value)
  mapSettings(overrideSettings, response)
}

const loadAll = async () => {
  loading.value = true
  paywallCheckoutUrl.value = null

  try {
    await Promise.all([loadGlobal(), loadTournaments()])
    if (selectedTournamentId.value) {
      await loadOverride()
    }
  } catch (error: any) {
    const parsed = parseError(error)
    if (parsed.status === 402) {
      paywallCheckoutUrl.value = parsed.checkoutUrl
    }
  } finally {
    loading.value = false
  }
}

const saveGlobal = async () => {
  savingGlobal.value = true
  try {
    const response = await updateCredentialSettings(toPayload(globalSettings))
    mapSettings(globalSettings, response)
    toast({ type: 'success', msg: 'Configuración global guardada' })
  } catch (error: any) {
    const parsed = parseError(error)
    if (parsed.status === 402) {
      paywallCheckoutUrl.value = parsed.checkoutUrl
    }
  } finally {
    savingGlobal.value = false
  }
}

const saveOverride = async () => {
  if (!selectedTournamentId.value) return

  savingOverride.value = true
  try {
    const response = await updateCredentialTournamentSettings(selectedTournamentId.value, toPayload(overrideSettings))
    mapSettings(overrideSettings, response)
    toast({ type: 'success', msg: 'Override de torneo guardado' })
  } catch (error: any) {
    const parsed = parseError(error)
    if (parsed.status === 402) {
      paywallCheckoutUrl.value = parsed.checkoutUrl
    }
  } finally {
    savingOverride.value = false
  }
}

watch(selectedTournamentId, () => {
  void loadOverride()
})

onMounted(() => {
  if (!canConfigureCredentials.value) return
  void loadAll()
})
</script>

<template>
  <div class="credentials-settings" data-testid="credentials-settings-card">
    <InlineForbiddenState
      v-if="!canConfigureCredentials"
      title="Acceso restringido"
      description="Solo administradores pueden modificar estas reglas."
      cta-label="Ir a credenciales"
      cta-to="/credenciales"
    />

    <template v-else>
    <CredentialsPaywallAlert :checkout-url="paywallCheckoutUrl" />

    <v-skeleton-loader v-if="loading" type="card, card" />

    <template v-else>
      <v-card class="credentials-settings__panel" variant="flat">
        <v-card-title class="credentials-settings__title">Configuración global</v-card-title>
        <v-card-subtitle class="credentials-settings__subtitle">
          Define reglas por defecto para la emisión de credenciales.
        </v-card-subtitle>
        <v-card-text class="credentials-settings__content">
          <div class="credentials-settings__switches">
            <v-switch v-model="globalSettings.requires_registered_player" hide-details>
              <template #label>Requiere jugador registrado</template>
            </v-switch>
            <v-switch v-model="globalSettings.allow_unverified_players" hide-details>
              <template #label>Permitir no verificados</template>
            </v-switch>
            <v-switch v-model="globalSettings.allow_suspended_players" hide-details>
              <template #label>Permitir suspendidos</template>
            </v-switch>
            <v-switch v-model="globalSettings.block_if_team_sanctioned" hide-details>
              <template #label>Bloquear por sanción de equipo</template>
            </v-switch>
            <v-switch v-model="globalSettings.expiry_by_tournament" hide-details>
              <template #label>Vigencia por torneo</template>
            </v-switch>
            <v-switch v-model="globalSettings.show_warnings_on_card" hide-details>
              <template #label>Mostrar advertencias en credencial</template>
            </v-switch>
            <v-switch v-model="globalSettings.qr_enabled_by_default" hide-details>
              <template #label>QR habilitado por defecto</template>
            </v-switch>
            <v-switch v-model="globalSettings.allow_digital_credential" hide-details data-testid="credentials-settings-global-digital">
              <template #label>Permitir credencial digital</template>
            </v-switch>
          </div>

          <v-select
            v-model="globalSettings.watermark_mode"
            :items="watermarkOptions"
            item-title="title"
            item-value="value"
            :disabled="Boolean(globalSettings.watermark_locked_by_plan)"
            variant="outlined"
            density="compact"
            label="Marca de agua"
            data-testid="credentials-settings-global-watermark"
          />

          <v-chip v-if="globalSettings.watermark_locked_by_plan" color="warning" variant="tonal" size="small" data-testid="credentials-settings-watermark-lock">
            Bloqueado por plan
          </v-chip>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" :loading="savingGlobal" @click="saveGlobal">Guardar global</v-btn>
        </v-card-actions>
      </v-card>

      <v-card class="credentials-settings__panel" variant="flat">
        <v-card-title class="credentials-settings__title">Override por torneo</v-card-title>
        <v-card-subtitle class="credentials-settings__subtitle">
          Ajusta reglas específicas para un torneo y sobrescribe la configuración global.
        </v-card-subtitle>
        <v-card-text class="credentials-settings__content">
          <v-select
            v-model="selectedTournamentId"
            :items="tournaments"
            item-title="name"
            item-value="id"
            clearable
            variant="outlined"
            density="compact"
            label="Torneo"
          />

          <div v-if="selectedTournamentId" class="credentials-settings__switches">
            <v-switch v-model="overrideSettings.requires_registered_player" hide-details>
              <template #label>Requiere jugador registrado</template>
            </v-switch>
            <v-switch v-model="overrideSettings.allow_unverified_players" hide-details>
              <template #label>Permitir no verificados</template>
            </v-switch>
            <v-switch v-model="overrideSettings.allow_suspended_players" hide-details>
              <template #label>Permitir suspendidos</template>
            </v-switch>
            <v-switch v-model="overrideSettings.block_if_team_sanctioned" hide-details>
              <template #label>Bloquear por sanción de equipo</template>
            </v-switch>
            <v-switch v-model="overrideSettings.expiry_by_tournament" hide-details>
              <template #label>Vigencia por torneo</template>
            </v-switch>
            <v-switch v-model="overrideSettings.show_warnings_on_card" hide-details>
              <template #label>Mostrar advertencias en credencial</template>
            </v-switch>
            <v-switch v-model="overrideSettings.qr_enabled_by_default" hide-details>
              <template #label>QR habilitado por defecto</template>
            </v-switch>
            <v-switch v-model="overrideSettings.allow_digital_credential" hide-details>
              <template #label>Permitir credencial digital</template>
            </v-switch>

            <v-select
              v-model="overrideSettings.watermark_mode"
              :items="watermarkOptions"
              item-title="title"
              item-value="value"
              :disabled="Boolean(overrideSettings.watermark_locked_by_plan)"
              variant="outlined"
              density="compact"
              label="Marca de agua"
            />

            <v-chip v-if="overrideSettings.is_override" size="small" color="primary" variant="tonal">
              Sobrescribe global
            </v-chip>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" :loading="savingOverride" :disabled="!selectedTournamentId" @click="saveOverride">
            Guardar override
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
    </template>
  </div>
</template>

<style scoped>
.credentials-settings {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.credentials-settings__panel {
  border: 1px solid var(--futzo-border);
  border-radius: 14px;
}

.credentials-settings__title {
  color: var(--futzo-on-surface);
  font-weight: 700;
}

.credentials-settings__subtitle {
  color: var(--futzo-on-surface-muted);
}

.credentials-settings__content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.credentials-settings__switches {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
}

@media (width > 960px) {
  .credentials-settings__switches {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
