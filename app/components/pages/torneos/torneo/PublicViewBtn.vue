<script setup lang="ts">
  const route = useRoute()
</script>

<template>
  <SecondaryBtn
    text="Vista publica"
    icon="mdi:eye-outline"
    class="mx-2"
    iconPosition="right"
    @click="
      $router.push({
        name: 'torneos-torneo-status',
        params: { torneo: route.params.torneo },
      })
    "
  />
</template>

<style scoped></style>
