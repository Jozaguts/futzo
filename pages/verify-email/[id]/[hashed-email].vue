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
const routerId = ref( null as number)

const { data, error } = await useAsyncData('verify-email', () => {
    return client(`/verify-email/${id}/${hashedemail}?expires=${queryString.expires}&signature=${queryString.signature}`)
        .then((response) => {
          console.log(response)
          status.value = 'Correo verificado'
          routerId.value =   setTimeout(() => {
           useRouter().push({name: 'ligas'})
         }, 2000)
        })
        .catch((error) => {
          console.log(error)
          status.value = 'Error al verificar el correo'
        })
});
onUnmounted(() => {
  clearTimeout(routerId.value)
});
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
