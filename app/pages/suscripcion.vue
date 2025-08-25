<script setup lang="ts">
  import checkout from '~/http/api/checkout'
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
    console.log({ identifier, plan, period })
    if (identifier || plan || period) {
      await checkout(identifier, plan, period).then((response) => {
        window.location.href = response.url
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
