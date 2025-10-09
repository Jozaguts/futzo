<script lang="ts" setup>
  import CATBtn from '@/components/pages/jugadores/app-bar-cat-btn.vue'
  import SearchInput from '@/components/pages/jugadores/app-bar-search-input.vue'
  import ImportBtn from '@/components/pages/jugadores/import-btn.vue'
  import ExportBtn from '@/components/pages/jugadores/export-btn.vue'
</script>
<template>
  <div class="d-none d-md-flex d-lg-flex">
    <SearchInput />
    <ImportBtn />
    <!--  <ExportBtn />-->
    <CATBtn />
  </div>
</template>
