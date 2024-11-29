<script lang="ts" setup>
import { usePlayerStore } from "~/store";

const { importModal } = storeToRefs(usePlayerStore());
</script>
<template>
  <SecondaryBtn
    text="Import .csv"
    class="mr-4"
    @btn-click="importModal = !importModal"
  />
</template>
