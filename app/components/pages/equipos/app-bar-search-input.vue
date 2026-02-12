<script lang="ts" setup>
  const props = withDefaults(defineProps<{
    placeholder?: string
    minWidth?: number | string
  }>(), {
    placeholder: 'Buscar un Equipo',
    minWidth: 300,
  })

  const updateSearchModel = useDebounceFn((searchValue: string) => {
    useTeamStore().searchTeams(searchValue)
  }, 500)
</script>

<template>
  <SearchInput :min-width="props.minWidth" :placeholder="props.placeholder" @searching="updateSearchModel" />
</template>
