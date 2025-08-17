<script lang="ts" setup>
  const updateSearchModel = useDebounceFn((searchValue: string) => {
    useTeamStore().searchTeams(searchValue)
  }, 500)
</script>

<template>
  <SearchInput :min-width="300" placeholder="Buscar un Equipo" class="mr-4" @searching="updateSearchModel" />
</template>
