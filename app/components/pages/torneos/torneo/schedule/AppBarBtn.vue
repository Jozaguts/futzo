<script lang="ts" setup>
import ExportAs from "~/components/pages/torneos/torneo/schedule/ExportAs.vue";
import Filter from "~/components/pages/torneos/torneo/schedule/Filter.vue";
import SearchGame from "~/components/pages/torneos/torneo/schedule/SearchGame.vue";
</script>
<template>
  <div class="d-md-flex d-lg-flex mr-8 d-none">
    <Filter/>
    <ExportAs/>
    <SearchGame/>
  </div>
</template>
