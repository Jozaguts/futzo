<script lang="ts" setup>
  const route = useRoute()
  const isCalendarTabActive = computed(() => route.name === 'torneos-torneo' && route.query.tab === 'calendario')
</script>
<template>
  <PrimaryBtn
    variant="elevated"
    icon="futzo-icon:calendar-white"
    text="Calendario"
    iconPosition="right"
    :disabled="isCalendarTabActive"
    @click="
      $router.push({
        name: 'torneos-torneo',
        params: { torneo: route.params.torneo },
        query: { tab: 'calendario' },
      })
    "
  />
</template>
