<script setup lang="ts">
import AuthForm from '~/components/authentication/AuthForm.vue'

const { errorMessage } = storeToRefs(useAuthStore())
  const { toast } = useToast()
  const loadingPage = ref(true)
  definePageMeta({
    layout: 'blank',
    bodyAttrs: {
      class: 'd-none',
    },
  })
  onMounted(() => {
    if (errorMessage.value) {
      toast({
        type: 'info',
        msg: 'Suscripción activa',
        description: errorMessage.value,
      })
    }
    loadingPage.value = false
  })
  onUnmounted(() => {
    errorMessage.value = ''
  })
</script>
<template>
  <v-container fluid class="fill-height py-0 login-page-container" v-if="!loadingPage">
    <v-row class="fill-height">
      <v-col cols="12" class="d-flex justify-center align-center py-4">
        <AuthForm />
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
  @use '@/assets/scss/pages/page-auth.scss';

  .login-page-container {
    overflow-y: auto;
  }
</style>
