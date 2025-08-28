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
    if (errorMessage) {
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
  useHead({
    meta: [
      {
        property: 'og:url',
        content: 'https://futzo.io' + useRoute().path,
      },
    ],
  })
</script>
<template>
  <v-container fluid class="fill-height py-0" v-if="!loadingPage">
    <v-row class="fill-height">
      <v-col cols="12" class="d-flex justify-center align-center">
        <AuthForm />
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
  @use '@/assets/scss/pages/page-auth.scss';
</style>
