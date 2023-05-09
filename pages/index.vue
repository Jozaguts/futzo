<template>
  <div>
      <v-btn @click="getUser"> get user</v-btn>
    <pre v-if="user">
        {{user}}
    </pre>
  </div>
</template>

<script setup lang="ts">

const user = ref(null)
const getUser = async () =>{
 user.value = await useNuxtApp().$api?.auth.user()
}
</script>
