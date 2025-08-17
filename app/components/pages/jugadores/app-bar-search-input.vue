<script lang="ts" setup>
  const searchHandler = useDebounceFn(async (search: string) => {
    await usePlayerStore().getPlayers(search)
  }, 600)
</script>
<template>
  <SearchInput :min-width="300" placeholder="Buscar Jugador" class="mr-4" @searching="searchHandler" />
</template>
