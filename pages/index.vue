<template>
  <div>
    <h1>hola mundo</h1>
    <form>
      <input type="text">
      <input type="text">
      <button type="button" @click="$api.auth.login({email: 'twindler@example.com', password: 'password'})">aceptar </button>
      <button type="button" @click="$api.auth.logout()">logout </button>
    </form>
    <div>
      <pre v-if="user">
        {{ user }}
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
  const user = ref()

// try {
//   user.value = await useNuxtApp().$api?.auth.user()
// } catch (error) {
//   console.error(error)
// }

</script>
