<script lang="ts" setup>
definePageMeta({
  layout: 'blank',
  bodyAttrs: {
    class: 'd-none'
  }
});
const status = ref('verificando...')
const { id, hashedemail } = useRoute().params
const queryString = useRoute().query
const client = useSanctumClient();

const { data, pending, error, refresh } = await useAsyncData('verify-email', () => {
    return client(`/verify-email/${id}/${hashedemail}?expires=${queryString.expires}&signature=${queryString.signature}`)
        .catch((error) => {
          console.log(error)
            status.value = 'Error al verificar el correo'
        })
        .then((response) => {
          console.log(response)
            status.value = 'Correo verificado'
        })
});
console.log(data)
console.log(pending)
console.log(error)
</script>
<template>
  <div class="verify-container">
    <h1>{{status}}</h1>
  </div>
</template>
<style>
  .verify-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
