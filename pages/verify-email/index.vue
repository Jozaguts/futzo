<script lang="ts" setup>

definePageMeta({
  layout: 'blank',
  bodyAttrs: {
    class: 'd-none'
  }
});
const status = ref({
  message: 'verificando...',
  status: 200,
})
const queryString = useRoute().query
const client = useSanctumClient();
const routerId = ref( null as number)
const verifyEmail = async () =>{
  return await client(`/verify-email?token=${queryString.token}`)
      .then(() => {
        status.value.message = 'Correo verificado'
        status.value.status = 200
      })
      .catch((error) => {
        status.value.message = error.data.message
      })
      .finally(() => {
        if (status.value.status === 200  || status.value.message === 'Email already verified.') {
          status.value.message = 'Redireccionando...'
          routerId.value =   setTimeout(() => {
            useRouter().push({name: 'liga'})
          }, 2000)
        }
      })
}
onMounted(() => {
  verifyEmail()
});
onUnmounted(() => {
  clearTimeout(routerId.value)
});
</script>
<template>
  <div class="verify-container">
    <h1>{{status.message}}</h1>
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
