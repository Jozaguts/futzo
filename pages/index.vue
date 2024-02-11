<template>
 <v-app>
   <div>
     index
   </div>
 </v-app>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ['sanctum:auth']
});
</script>
