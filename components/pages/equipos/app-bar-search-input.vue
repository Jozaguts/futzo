<script lang="ts" setup>
import { useTeamStore } from "~/store";

const { search } = storeToRefs(useTeamStore());
const updateSearchModel = (searchValue: string) => {
  search.value = searchValue;
};
</script>

<template>
  <SearchInput
    :min-width="300"
    placeholder="Buscar un Equipo"
    class="mr-4"
    @searching="updateSearchModel"
  />
</template>
