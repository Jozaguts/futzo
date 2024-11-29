<script lang="ts" setup>
import { useTournamentStore } from "~/store";

const { search } = storeToRefs(useTournamentStore());
const updateSearchModel = (searchValue: string) => {
  search.value = searchValue;
};
</script>
<template>
  <SearchInput
    :min-width="300"
    placeholder="Buscar torneo"
    class="mr-4"
    @searching="updateSearchModel"
  />
</template>
