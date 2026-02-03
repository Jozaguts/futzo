<script lang="ts" setup>
import SearchButton from '~/components/pages/equipos/app-bar-search-input.vue'
// import ExportBtn from "~/components/pages/equipos/export-btn.vue";
import ImportBtn from '~/components/pages/equipos/import-btn.vue'
import CatBtn from '~/components/pages/equipos/app-bar-cat-btn.vue'
</script>
<template>
  <div class="d-none d-md-flex d-lg-flex">
    <SearchButton />
    <ImportBtn />
    <CatBtn/>
  </div>
</template>
