<template>
  <div>
      <v-btn @click="getUser"> get user</v-btn>
    <pre v-if="authStore">
        {{authStore.auth.user}}
    </pre>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
import {useAuthStore} from "~/store";
const authStore = useAuthStore()
const getUser = async () => {
    await useNuxtApp().$api.auth.user()
}



</script>
