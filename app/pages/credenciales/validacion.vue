<script setup lang="ts">
import CredentialsModuleShell from '~/components/pages/credentials/CredentialsModuleShell.vue'
import CredentialsValidationView from '~/components/pages/credentials/CredentialsValidationView.vue'
import InlineForbiddenState from '~/components/shared/InlineForbiddenState.vue'
import { useCredentialsAccess } from '~/composables/credentials/useCredentialsAccess'
import { useCredentialsForbidden } from '~/composables/credentials/useCredentialsForbidden'

definePageMeta({
  middleware: ['sanctum:auth'],
})

const { canValidateCredentials } = useCredentialsAccess()
const { notifyOnce } = useCredentialsForbidden()

watchEffect(() => {
  if (!canValidateCredentials.value) {
    notifyOnce()
  }
})
</script>

<template>
  <PageLayout styles="main credentials-main">
    <template #default>
      <div class="credentials-page" data-testid="credentials-page-validacion">
        <InlineForbiddenState
          v-if="!canValidateCredentials"
          title="Acceso restringido"
          description="No tienes permisos para validar credenciales."
        />
        <CredentialsModuleShell v-else current="validacion">
          <CredentialsValidationView />
        </CredentialsModuleShell>
      </div>
    </template>
  </PageLayout>
</template>

<style lang="sass">
  @use '~/assets/scss/pages/credentials'
</style>
