<script setup lang="ts">
import type {PlayerVerificationSettings} from '~/models/settings'
import {useToast} from '~/composables/useToast'
import * as settingsAPI from '~/http/api/settings'

const { toast } = useToast()
  const loading = ref(false)
  const saving = ref(false)
  const settings = ref<PlayerVerificationSettings>({
    requires_player_verification: false,
    player_verification_methods: [],
    player_lock_duration_days: null,
  })
  const verificationOptions = [
    { title: 'CURP', value: 'curp' },
    { title: 'INE', value: 'ine' },
    { title: 'Pasaporte', value: 'passport' },
    { title: 'Otro', value: 'other' },
  ]

  const normalizeMethods = (value?: PlayerVerificationSettings['player_verification_methods'] | null) => {
    if (Array.isArray(value)) return value
    return []
  }

  const fetchSettings = async () => {
    loading.value = true
    try {
      const response = await settingsAPI.getPlayerVerificationSettings()
      settings.value = {
        requires_player_verification: response.requires_player_verification ?? false,
        player_verification_methods: normalizeMethods(
          response.player_verification_methods ?? (response.player_verification_method ? [response.player_verification_method] : [])
        ),
        player_lock_duration_days: response.player_lock_duration_days ?? null,
      }
    } catch {
    } finally {
      loading.value = false
    }
  }

  const saveSettings = async () => {
    saving.value = true
    try {
      const payload: PlayerVerificationSettings = {
        requires_player_verification: settings.value.requires_player_verification,
        player_verification_methods: settings.value.requires_player_verification
          ? normalizeMethods(settings.value.player_verification_methods)
          : [],
        player_lock_duration_days: settings.value.player_lock_duration_days ?? null,
      }
      await settingsAPI.updatePlayerVerificationSettings(payload)
      toast({
        type: 'success',
        msg: 'Configuración guardada',
        description: 'Los ajustes de jugadores se actualizaron correctamente.',
      })
    } catch {
    } finally {
      saving.value = false
    }
  }

  onMounted(fetchSettings)
  watch(
    () => settings.value.requires_player_verification,
    (value) => {
      if (!value) {
        settings.value.player_verification_methods = []
      }
    }
  )
</script>

<template>
  <v-card class="secondary-card pa-6" max-width="720" variant="text">
    <v-card-item class="secondary-card-item">
      <v-card-text class="secondary-card__title">Validación de jugadores</v-card-text>
      <v-card-subtitle class="secondary-card__subtitle">
        Configura si la liga requiere verificación y los métodos permitidos.
      </v-card-subtitle>
    </v-card-item>
    <v-card-text class="pt-6">
      <v-skeleton-loader v-if="loading" type="heading, text, actions" />
      <div v-else class="d-flex flex-column ga-4">
        <BaseInput label="Requerir validación de jugador" sublabel="Aplica para todos los jugadores de la liga">
          <template #input>
            <v-switch
                v-model="settings.requires_player_verification"
                color="primary"
            />
          </template>
        </BaseInput>

        <BaseInput label="Métodos de validación" sublabel="Selecciona los métodos permitidos">
          <template #input>
            <v-select
              v-model="settings.player_verification_methods"
              :items="verificationOptions"
              item-title="title"
              item-value="value"
              multiple
              chips
              density="compact"
              variant="outlined"
              :disabled="!settings.requires_player_verification"
              placeholder="Selecciona uno o varios métodos"
            />
          </template>
        </BaseInput>
        <BaseInput label="Bloqueo de jugador (días)" sublabel="Tiempo de bloqueo para cambiar de equipo">
          <template #input>
            <v-text-field
              v-model.number="settings.player_lock_duration_days"
              type="number"
              density="compact"
              variant="outlined"
              min="0"
              placeholder="Ej. 7"
            />
          </template>
        </BaseInput>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" variant="elevated" :loading="saving" @click="saveSettings">Guardar cambios</v-btn>
    </v-card-actions>
  </v-card>
</template>
