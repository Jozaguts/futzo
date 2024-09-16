<script lang="ts" setup>
import SearchButton from "~/components/shared/SearchInput.vue";

import { useTeamStore } from "~/store";

const { search } = storeToRefs(useTeamStore());
const updateSearchModel = (searchValue: string) => {
  search.value = searchValue;
};
</script>

<template>
  <SearchButton
    :min-width="300"
    placeholder="Buscar un Equipo"
    class="mr-4"
    @searching="updateSearchModel"
  />
</template>
