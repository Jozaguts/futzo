<script setup lang="ts">
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
  onMounted(() => {
    const identifier = useRoute()?.query?.identifier
    const plan = useRoute()?.query?.plan
    console.log({ identifier, plan })
    if (!identifier || !plan) {
      const { $toast } = useNuxtApp()
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
