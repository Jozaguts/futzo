<script lang="ts" setup>
import AppBarCatBtn from "~/components/shared/app-bar-cat-btn.vue";

const route = useRoute();
</script>
<template>
  <AppBarCatBtn
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
