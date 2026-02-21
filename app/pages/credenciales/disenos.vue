<script setup lang="ts">
import CredentialsModuleShell from '~/components/pages/credentials/CredentialsModuleShell.vue'
import CredentialsDesignsView from '~/components/pages/credentials/CredentialsDesignsView.vue'
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
      <div class="credentials-page" data-testid="credentials-page-disenos">
        <InlineForbiddenState
          v-if="!canManageCredentials"
          title="Acceso restringido"
          description="No tienes permisos para administrar diseños de credenciales."
        />
        <CredentialsModuleShell v-else current="disenos">
          <CredentialsDesignsView />
        </CredentialsModuleShell>
      </div>
    </template>
  </PageLayout>
</template>

<style lang="sass">
  @use '~/assets/scss/pages/credentials'
</style>
