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
<!--  <div>-->
<!--      <v-btn @click="getUser"> get user</v-btn>-->
<!--      <pre v-if="authStore">-->
<!--        {{authStore.auth.user}}-->
<!--      </pre>-->
<!--  </div>-->
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
