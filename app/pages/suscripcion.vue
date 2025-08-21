<script setup lang="ts">
  const hydrated = ref(false)
  definePageMeta({
    layout: 'blank',
    bodyAttrs: {
      class: 'd-none',
    },
  })
  onMounted(() => {
    hydrated.value = true
  })
</script>

<template>
  <v-container class="mx-auto my-auto" v-if="hydrated">
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center"><div class="dot-collision"></div></v-col>
    </v-row>
  </v-container>
</template>
<style lang="sass">
  @use 'three-dots' with (
      $dot-width: 20px,
      $dot-height: 20px
  )
</style>
