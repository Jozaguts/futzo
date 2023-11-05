<template>
  <v-text-field density="compact" label="Buscar" variant="filled" @keyup="searching"></v-text-field>
</template>
<script setup lang="ts">
const emits = defineEmits(['onSearch'])

const searching = event => emits('onSearch', event.target.value)
</script>