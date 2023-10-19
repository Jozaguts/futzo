<template>
    <VRow class="match-height">
      <VCol
          cols="12"
          md="4"
      >
        test
      </VCol>
    </VRow>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
</script>
