<script setup lang="ts">
import CredentialsSettingsCard from '~/components/pages/configuration/credentials-settings-card.vue'
import InlineForbiddenState from '~/components/shared/InlineForbiddenState.vue'
import { useCredentialsAccess } from '~/composables/credentials/useCredentialsAccess'
import { useCredentialsForbidden } from '~/composables/credentials/useCredentialsForbidden'

definePageMeta({
  middleware: ['sanctum:auth'],
})

const { canConfigureCredentials } = useCredentialsAccess()
const { notifyOnce } = useCredentialsForbidden()

watchEffect(() => {
  if (!canConfigureCredentials.value) {
    notifyOnce()
  }
})
</script>

<template>
  <PageLayout>
    <template #default>
      <v-container class="pa-0" fluid>
        <div class="configuration-page">
          <div class="configuration-page__header">
            <h2 class="configuration-page__title">Configuración de credenciales</h2>
          </div>
          <v-divider class="configuration-page__divider" />

          <InlineForbiddenState
            v-if="!canConfigureCredentials"
            title="Acceso restringido"
            description="Solo administradores pueden modificar la configuración de credenciales."
            cta-to="/credenciales"
            cta-label="Volver a credenciales"
          />
          <CredentialsSettingsCard v-else />
        </div>
      </v-container>
    </template>
  </PageLayout>
</template>

<style lang="sass">
  @use '~/assets/scss/pages/configuration'
</style>
