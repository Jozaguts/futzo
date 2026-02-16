<script setup lang="ts">
import checkout from '~/http/api/checkout'
import {FetchError} from 'ofetch'

const hydrated = ref(false)
  const loading = ref(true)
  definePageMeta({
    layout: 'blank',
    bodyAttrs: {
      class: 'd-none',
    },
  })
  onMounted(() => {
    hydrated.value = true
  })
  onMounted(async () => {
    const identifier = useRoute()?.query?.identifier
    const plan = useRoute()?.query?.plan
    const period = useRoute()?.query?.period
    if (identifier || plan || period) {
      await checkout(identifier, plan, period)
        .then((response) => {
          console.log(response)
          window.location.href = response.url
        })
        .catch((error: FetchError) => {
          const { message } = useApiError(error)
          if (error?.data?.error === 'already_has_account') {
            useAuthStore().errorMessage = message
            useRouter().push({ name: 'login', query: { email: error?.data?.identifier } })
            return
          }
        })
    }
  })
</script>

<template>
  <v-container class="mx-auto my-auto" v-if="hydrated">
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <div v-if="loading" class="dot-collision"></div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="sass">
  @use 'three-dots' with (
      $dot-width: 20px,
      $dot-height: 20px
  )
</style>
