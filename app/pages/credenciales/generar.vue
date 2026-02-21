<script setup lang="ts">
import CredentialsModuleShell from '~/components/pages/credentials/CredentialsModuleShell.vue'
import CredentialsGenerateView from '~/components/pages/credentials/CredentialsGenerateView.vue'
import InlineForbiddenState from '~/components/shared/InlineForbiddenState.vue'
import { useCredentialsAccess } from '~/composables/credentials/useCredentialsAccess'
import { useCredentialsForbidden } from '~/composables/credentials/useCredentialsForbidden'

definePageMeta({
  middleware: ['sanctum:auth'],
})

const { canManageCredentials } = useCredentialsAccess()
const { notifyOnce } = useCredentialsForbidden()

watchEffect(() => {
  if (!canManageCredentials.value) {
    notifyOnce()
  }
})
</script>

<template>
  <PageLayout styles="main credentials-main">
    <template #default>
      <div class="credentials-page" data-testid="credentials-page-generar">
        <InlineForbiddenState
          v-if="!canManageCredentials"
          title="Acceso restringido"
          description="No tienes permisos para generar credenciales."
        />
        <CredentialsModuleShell v-else current="generar">
          <CredentialsGenerateView />
        </CredentialsModuleShell>
      </div>
    </template>
  </PageLayout>
</template>

<style lang="sass">
  @use '~/assets/scss/pages/credentials'
</style>
