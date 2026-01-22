<script lang="ts" setup>
  const route = useRoute()
</script>
<template>
  <PrimaryBtn
    variant="elevated"
    icon="futzo-icon:calendar-white"
    text="Ver calendario"
    :disabled="route.name === 'torneos-torneo-calendario'"
    @click="
      $router.push({
        name: 'torneos-torneo-calendario',
        params: { torneo: route.params.torneo },
      })
    "
  />
</template>
