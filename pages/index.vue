<template>
  <div>
      <v-btn @click="useNuxtApp().$api?.auth.user()"> get user</v-btn>
    <pre v-if="auth">dasd
        {{auth}}
    </pre>
  </div>
</template>

<script setup lang="ts">

import {Auth} from "~/interfaces";

const auth =  useState<Auth>(`futzo_auth`)
console.log(auth.value)
</script>
