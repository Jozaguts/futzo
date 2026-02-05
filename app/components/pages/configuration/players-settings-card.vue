<script setup lang="ts">
  import type { PlayerVerificationSettings } from '~/models/settings'
  import { useToast } from '~/composables/useToast'
  import * as settingsAPI from '~/http/api/settings'

  const { toast } = useToast()
  const loading = ref(false)
  const saving = ref(false)
  const settings = ref<PlayerVerificationSettings>({
    requires_player_verification: false,
    player_verification_method: 'curp',
  })

  const fetchSettings = async () => {
    loading.value = true
    try {
      const response = await settingsAPI.getPlayerVerificationSettings()
      settings.value = {
        requires_player_verification: response.requires_player_verification ?? false,
        player_verification_method: response.player_verification_method ?? 'curp',
      }
    } catch (error: any) {
      toast({
        type: 'error',
        msg: 'No se pudieron cargar ajustes',
        description: error?.data?.message ?? 'Inténtalo nuevamente.',
      })
    } finally {
      loading.value = false
    }
  }

  const saveSettings = async () => {
    saving.value = true
    try {
      const payload: PlayerVerificationSettings = {
        requires_player_verification: settings.value.requires_player_verification,
        player_verification_method: settings.value.requires_player_verification ? 'curp' : null,
      }
      await settingsAPI.updatePlayerVerificationSettings(payload)
      toast({
        type: 'success',
        msg: 'Configuración guardada',
        description: 'Los ajustes de jugadores se actualizaron correctamente.',
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

  onMounted(fetchSettings)
</script>

<template>
  <v-card class="secondary-card futzo-rounded pa-6" max-width="720">
    <v-card-item class="secondary-card-item">
      <v-card-text class="secondary-card__title">Validación de jugadores</v-card-text>
      <v-card-subtitle class="secondary-card__subtitle">
        Configura si la liga requiere verificación con CURP.
      </v-card-subtitle>
    </v-card-item>
    <v-card-text class="pt-6">
      <v-alert v-if="loading" type="info" variant="tonal" class="mb-4">Cargando configuración...</v-alert>
      <v-switch
        v-model="settings.requires_player_verification"
        color="primary"
        label="Requerir validación de jugador"
        inset
      />
      <BaseInput label="Método de validación" sublabel="Disponible: CURP">
        <template #input>
          <v-text-field
            :model-value="settings.requires_player_verification ? 'CURP' : 'No requerido'"
            variant="outlined"
            density="compact"
            readonly
          />
        </template>
      </BaseInput>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" variant="elevated" :loading="saving" @click="saveSettings">Guardar cambios</v-btn>
    </v-card-actions>
  </v-card>
</template>
