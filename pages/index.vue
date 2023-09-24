<template>
  <div>
      <v-btn @click="getUser"> get user</v-btn>
    <pre v-if="auth">
        {{auth}}
    </pre>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/store";
const auth = useAuthStore().auth
const headers = useRequestHeaders(['Referer','Origin'])
const getUser = async () => {
  const { data } = await useFetch('/me', {baseURL: 'http://localhost:8000/api/v1', headers:{
      Authorization: "Bearer " + useLocalStorage('token',null).value,
      Accept: 'application/json',
  } })
  console.log(data)
  useAuthStore().auth = data
}



</script>
