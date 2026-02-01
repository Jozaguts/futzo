<script lang="ts" setup>
  import Filter from '~/components/pages/torneos/torneo/schedule/Filter.vue'
  import SearchGame from '~/components/pages/torneos/torneo/schedule/SearchGame.vue'

  const { hasSchedule, scheduleDrawerOpen } = storeToRefs(useScheduleStore())
  const openCalendarSettings = () => {
    if (!hasSchedule.value) {
      return
    }
    scheduleDrawerOpen.value = true
  }
</script>
<template>
  <div class="d-md-flex d-lg-flex mr-8 d-none">
    <SecondaryBtn
      text="Configurar calendario"
      icon="mdi:settings-outline"
      class="mx-2"
      iconPosition="right"
      :disabled="!hasSchedule"
      @click="openCalendarSettings"
    >
    </SecondaryBtn>
    <Filter />
    <SearchGame />
  </div>
</template>
